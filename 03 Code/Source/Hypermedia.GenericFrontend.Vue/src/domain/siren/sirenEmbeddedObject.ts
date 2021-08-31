import SirenObject from '@/domain/siren/sirenObject';

export default interface SirenEmbeddedObject extends SirenObject {
  rel: string[];
}
