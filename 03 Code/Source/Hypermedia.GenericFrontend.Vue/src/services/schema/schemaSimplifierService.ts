// const find = require('simple-object-query').find;
import { find } from 'simple-object-query';

export default class SchemaSimplifierService {
    public static simplifySchema(schema: any): any {
        // normalize sirenObject so ui component can render propperly, if component improves this may be vanish:
        // sub schemas, definitions + ref: not resolved
        // format: unknown "int32", "int64"
        // oneOf: not handled-> will not show

        schema = SchemaSimplifierService.flattenRootElement(schema);
        SchemaSimplifierService.resolveLocalReferences(schema);
        SchemaSimplifierService.fixNullablesInOneOf(schema);
        SchemaSimplifierService.flattenOneOf(schema);
        SchemaSimplifierService.fixUnknownFormats(schema);

        // angular2-json-sirenObject-form: 0.7.0-alpha.1 leaves sirenObject version in
        // sirenObject object when translating from sirenObject 4 to 6
        // until fixed remove sirenObject version
        SchemaSimplifierService.removeSchemaSpecification(schema);

        return schema;
    }

    private static flattenRootElement(schema: any): any {
        if (schema && schema['RootElement']) {
            schema = schema.RootElement;
        }
        return schema;
    }

    private static removeSchemaSpecification(schema: any): void {
        if (!schema) {
            return;
        }
        const schemaProperty = '$schema';
        if (schema[schemaProperty]) {
            delete schema[schemaProperty];
        }
    }

    private static fixUnknownFormats(object: any): any {
        if (!object) {
            return;
        }
        Object.keys(object).forEach((propertyName) => {
            if (object[propertyName]) {
                if (propertyName === 'format' && (object[propertyName] === 'int32' || object[propertyName] === 'int64')) {
                    delete object[propertyName];
                }

                // recursion
                if (typeof object[propertyName] === 'object') {
                    SchemaSimplifierService.fixUnknownFormats(object[propertyName]);
                }
            }
        });
    }

    private static flattenOneOf(schema: any): void {
        if (!schema.properties) {
            return;
        }
        Object.keys(schema.properties).forEach((propertyName) => {
            if (schema.properties[propertyName]) {
                const oneOf = schema.properties[propertyName].oneOf;
                if (oneOf && Array.isArray(oneOf)) {
                    if (oneOf.length > 1) {
                        throw new Error('Can not flatten oneOf in sirenObject because mre than one element remaining.');
                    }

                    const containedSchema = oneOf[0];
                    delete schema.properties[propertyName].oneOf;
                    if (containedSchema) {
                        schema.properties[propertyName] = containedSchema;

                        // recursion
                        SchemaSimplifierService.flattenOneOf(schema.properties[propertyName]);
                    }
                }
            }
        });
    }

    private static fixNullablesInOneOf(schema: any): void {
        if (!schema.properties) {
            return;
        }
        Object.keys(schema.properties).forEach((propertyName) => {
            if (schema.properties[propertyName]) {
                const oneOf = schema.properties[propertyName].oneOf;
                if (oneOf && Array.isArray(oneOf)) {
                    SchemaSimplifierService.removeNullType(oneOf);

                    // recursion
                    oneOf.forEach((element) => {
                        SchemaSimplifierService.fixNullablesInOneOf(element);
                    });
                }
            }
        });
    }

    private static removeNullType(oneOf: Array<any>): void {
        let nullTypeCount = 0;
        let nullTypeItemIndex = -1;
        let index = 0;
        oneOf.forEach((item) => {
            const type = item.type;
            if (type && type === 'null') {
                nullTypeCount++;
                nullTypeItemIndex = index;
            }
            index++;
        });

        if (nullTypeCount > 1) {
            throw new Error(`Too much null types in schema (${nullTypeCount})`);
        }

        if (nullTypeItemIndex === -1) {
            return;
        }

        oneOf.splice(nullTypeItemIndex, 1);
    }

    private static resolveLocalReferences(schema: any): void {
        // could have replaced a ref with something that contained a ref
        let iteration = 0;
        const maxTrys = 50;
        while (iteration < maxTrys) {
            const foundRefs = <Array<any>>find(schema, {
                $ref: /\.*/,
            });

            if (foundRefs.length === 0) {
                break;
            }

            SchemaSimplifierService.replaceRefs(foundRefs, schema);

            iteration++;
        }
        if (iteration === maxTrys) {
            console.error(`Could not resolve all schema refs in ${maxTrys} trys.`);
            return;
        }

        delete schema.definitions; 
        return;
    }

    private static replaceRefs(foundRefs: any[], schema: any): void {
        foundRefs.forEach((refParent) => {
            const definitionKey = (<string>refParent.$ref).replace('#/definitions/', '');
            const replacement = schema.definitions[definitionKey];
            if (!replacement) {
                throw new Error(`Can not resolve schema reference: ${refParent.$ref}`);
            }
            delete refParent.$ref;
            Object.assign(refParent, replacement);
        });
    }
}
