import SirenObject from '@/domain/siren/sirenObject';
import HypermediaObject from '@/domain/hypermedia/hypermediaObject';
import SirenLink from '@/domain/siren/sirenLink';
import HypermediaLink from '@/domain/hypermedia/hypermediaLink';
import Dictionary from '@/utils/dictionary';
import SirenAction from '@/domain/siren/sirenAction';
import HypermediaAction, {HttpMethodType} from '@/domain/hypermedia/hypermediaAction';
import SirenEmbeddedObject from '@/domain/siren/sirenEmbeddedObject';
import SirenEmbeddedHypermediaLink from '@/domain/siren/sirenEmbeddedHypermediaLink';
import EmbeddedHypermediaObject from '@/domain/hypermedia/embeddedHypermediaObject';
import EmbeddedHypermediaLink from '@/domain/hypermedia/embeddedHypermediaLink';
import SirenField from '@/domain/siren/sirenField';
import HypermediaActionParameter from '@/domain/hypermedia/hypermediaActionParamter';
import HypermediaActionWithParameters from '@/domain/hypermedia/hypermediaActionWithParameters';
import Guid from '@/utils/guid';
import ObjectPropertyInfo from '@/domain/hypermedia/objectPropertyInfo';
import ValuePropertyInfo, {PropertyType} from '@/domain/hypermedia/valuePropertyInfo';

export default class SirenToHypermediaMapper {
    public static mapObject(sirenObject: SirenObject): HypermediaObject {
        return new HypermediaObject(
            [...sirenObject.class],
            sirenObject.title,
            SirenToHypermediaMapper.mapLinks(sirenObject.links),
            SirenToHypermediaMapper.mapProperties(sirenObject.properties),
            SirenToHypermediaMapper.mapActions(sirenObject.actions),
            SirenToHypermediaMapper.mapActionsWithParameters(sirenObject.actions),
            SirenToHypermediaMapper.mapEmbeddedHypermediaObjects(sirenObject.entities),
            SirenToHypermediaMapper.mapEmbeddedHypermediaLinks(sirenObject.entities),
        );
    }

    private static mapLinks(sirenLinks: SirenLink[]): HypermediaLink[] {
        return sirenLinks ? sirenLinks.map(SirenToHypermediaMapper.mapLink) : [];
    }

    private static mapLink(sirenLink: SirenLink): HypermediaLink {
        return new HypermediaLink(sirenLink.href, [...sirenLink.rel]);
    }

    private static mapProperties(properties: Dictionary<any>): (ObjectPropertyInfo | ValuePropertyInfo)[] {
        return Object.keys(properties).map((key) => SirenToHypermediaMapper.mapProperty(key, properties[key]));
    }

    // private static mapProperties(properties: Dictionary<any>): PropertyInfo[] {
    //   return Object.keys(properties).map((key) => SirenToHypermediaMapper.mapProperty(key, properties[key]));
    // }

    private static mapProperty(name: string, value: any): ObjectPropertyInfo | ValuePropertyInfo {
        if (SirenToHypermediaMapper.isObjectProperty(value)) {
            return new ObjectPropertyInfo(Guid.newGuid(), name, SirenToHypermediaMapper.mapProperties(value));
        }
        return new ValuePropertyInfo(Guid.newGuid(), name, value, SirenToHypermediaMapper.mapPropertyType(value));
        // return new PropertyInfo(
        //   name,
        //   value,
        //   SirenToHypermediaMapper.mapPropertyType(value),
        //   SirenToHypermediaMapper.hasNestedProperties(value),
        //   SirenToHypermediaMapper.mapNestedPropertyInfo(value),
        // );
    }

    // private static mapProperty(name: string, value: any): PropertyInfo {
    //   return new PropertyInfo(
    //     name,
    //     value,
    //     SirenToHypermediaMapper.mapPropertyType(value),
    //     SirenToHypermediaMapper.hasNestedProperties(value),
    //     SirenToHypermediaMapper.mapNestedPropertyInfo(value),
    //   );
    // }

    private static mapPropertyType(value: any): PropertyType {
        const propertyType = typeof value;
        switch (propertyType) {
            case 'number':
                return PropertyType.number;
            case 'boolean':
                return PropertyType.boolean;
            case 'string':
                return PropertyType.string;
            case 'object':
                if (Array.isArray(value)) {
                    return PropertyType.array;
                } else {
                    return PropertyType.object;
                }
            case 'undefined':
            case 'function':
            case 'symbol':
            default:
                return PropertyType.nullvalue;
        }
    }

    private static isObjectProperty(value: any): boolean {
        if (value == null) {
            return false;
        }
        const propertyType = typeof value;
        if (propertyType === 'object' && !Array.isArray(value)) {
            return Object.keys(value).length !== 0;
        }
        return false;
    }

    // private static mapNestedPropertyInfo(value: any): PropertyInfo[] {
    //   const propertyType = typeof value;
    //   if (propertyType === 'object' && !Array.isArray(value)) {
    //     return Object.keys(value).map((name) => SirenToHypermediaMapper.mapProperty(name, value[name]));
    //   }
    //   return [];
    // }

    private static mapActions(sirenActions: SirenAction[]): HypermediaAction[] {
        return sirenActions
            ? sirenActions.filter(SirenToHypermediaMapper.isActionWithoutParameters).map(SirenToHypermediaMapper.mapAction)
            : [];
    }

    private static isActionWithoutParameters(sirenActions: SirenAction): boolean {
        return !SirenToHypermediaMapper.isActionWithParameters(sirenActions);
    }

    private static mapActionsWithParameters(sirenActions: SirenAction[]): HypermediaActionWithParameters[] {
        return sirenActions
            ? sirenActions
                .filter(SirenToHypermediaMapper.isActionWithParameters)
                .map(SirenToHypermediaMapper.mapActionWithParameters)
            : [];
    }

    private static isActionWithParameters(sirenActions: SirenAction): boolean {
        return sirenActions['fields'] && sirenActions.fields.length !== 0;
    }

    private static mapAction(sirenAction: SirenAction): HypermediaAction {
        return new HypermediaAction(
            sirenAction.name,
            SirenToHypermediaMapper.mapHttpMethodTyp(sirenAction.method),
            sirenAction.href,
            sirenAction.title,
        );
    }

    private static mapActionWithParameters(sirenAction: SirenAction): HypermediaActionWithParameters {
        return new HypermediaActionWithParameters(
            sirenAction.name,
            SirenToHypermediaMapper.mapHttpMethodTyp(sirenAction.method),
            sirenAction.href,
            sirenAction.title,
            SirenToHypermediaMapper.mapParameter(sirenAction.fields),
        );
    }

    private static mapParameter(fields: SirenField[]): HypermediaActionParameter {
        const field = fields[0];
        return new HypermediaActionParameter(field?.name, field?.class[0], field?.class[0], field?.value);
    }

    private static mapHttpMethodTyp(method: string): HttpMethodType {
        switch (method) {
            case 'PATCH':
                return HttpMethodType.PATCH;
            case 'DELETE':
                return HttpMethodType.DELETE;
            case 'PUT':
                return HttpMethodType.PUT;
            case 'POST':
                return HttpMethodType.POST;
            case 'GET':
            default:
                return HttpMethodType.GET;
        }
    }

    private static mapEmbeddedHypermediaObjects(
        entities: (SirenEmbeddedObject | SirenEmbeddedHypermediaLink)[],
    ): EmbeddedHypermediaObject[] {
        return entities
            .filter(SirenToHypermediaMapper.isEmbeddedHypermediaObject)
            .map(SirenToHypermediaMapper.castToSirenEmbeddedObject)
            .map(SirenToHypermediaMapper.mapEmbeddedHypermediaObject);
    }

    private static isEmbeddedHypermediaObject(entity: SirenEmbeddedObject | SirenEmbeddedHypermediaLink): boolean {
        return !SirenToHypermediaMapper.isEmbeddedLinkEntity(entity);
    }

    private static isEmbeddedLinkEntity(entity: SirenEmbeddedObject | SirenEmbeddedHypermediaLink): boolean {
        return 'href' in entity;
    }

    private static castToSirenEmbeddedObject(
        entity: SirenEmbeddedObject | SirenEmbeddedHypermediaLink,
    ): SirenEmbeddedObject {
        return entity as SirenEmbeddedObject;
    }

    private static mapEmbeddedHypermediaObject(sirenObject: SirenEmbeddedObject): EmbeddedHypermediaObject {
        return new EmbeddedHypermediaObject(
            [...sirenObject.class],
            sirenObject.title,
            SirenToHypermediaMapper.mapLinks(sirenObject.links),
            SirenToHypermediaMapper.mapProperties(sirenObject.properties),
            SirenToHypermediaMapper.mapActions(sirenObject.actions),
            SirenToHypermediaMapper.mapActionsWithParameters(sirenObject.actions),
            SirenToHypermediaMapper.mapEmbeddedHypermediaObjects(sirenObject.entities),
            SirenToHypermediaMapper.mapEmbeddedHypermediaLinks(sirenObject.entities),
            [...sirenObject.rel],
        );
    }

    private static mapEmbeddedHypermediaLinks(
        entities: (SirenEmbeddedObject | SirenEmbeddedHypermediaLink)[],
    ): EmbeddedHypermediaLink[] {
        return entities
            .filter(SirenToHypermediaMapper.isEmbeddedLinkEntity)
            .map(SirenToHypermediaMapper.castToSirenEmbeddedHypermediaLink)
            .map(SirenToHypermediaMapper.mapEmbeddedHypermediaLink);
    }

    private static castToSirenEmbeddedHypermediaLink(entity: SirenEmbeddedObject | SirenEmbeddedHypermediaLink) {
        return entity as SirenEmbeddedHypermediaLink;
    }

    private static mapEmbeddedHypermediaLink(sirenLink: SirenEmbeddedHypermediaLink): EmbeddedHypermediaLink {
        return new EmbeddedHypermediaLink(sirenLink.href, [...sirenLink.rel], [...sirenLink.class]);
    }
}
