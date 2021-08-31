import axios from 'axios';
import SchemaSimplifierService from '@/services/schema/schemaSimplifierService';

export default class ActionFormSchemaLoaderService {
  public static async load(url: string) {
    const response = await axios.get<string>(url);
    return SchemaSimplifierService.simplifySchema(response.data);
  }
}
