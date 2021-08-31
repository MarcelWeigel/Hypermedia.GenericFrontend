import Dictionary from '@/utils/dictionary';
import SirenAction from '@/domain/siren/sirenAction';
import SirenLink from '@/domain/siren/sirenLink';
import SirenEmbeddedObject from '@/domain/siren/sirenEmbeddedObject';
import sirenEmbeddedHypermediaLink from '@/domain/siren/sirenEmbeddedHypermediaLink';

export default interface SirenObject {
  actions: SirenAction[];
  class: string[];
  entities: SirenEmbeddedObject[] | sirenEmbeddedHypermediaLink[];
  links: SirenLink[];
  properties: Dictionary<any>;
  title: string;
}
