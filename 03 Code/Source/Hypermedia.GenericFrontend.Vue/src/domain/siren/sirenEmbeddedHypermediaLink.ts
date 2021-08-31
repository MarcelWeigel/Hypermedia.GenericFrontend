import SirenHypermediaLink from '@/domain/siren/sirenHypermediaLink';

export default interface SirenEmbeddedHypermediaLink extends SirenHypermediaLink {
  class: string[];
}
