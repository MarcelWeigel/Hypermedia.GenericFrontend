import SirenLink from '@/domain/siren/sirenLink';

export default interface SirenHypermediaLink extends SirenLink {
  class: string[];
}
