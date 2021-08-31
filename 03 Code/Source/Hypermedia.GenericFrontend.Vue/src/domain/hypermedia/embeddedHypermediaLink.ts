import HypermediaLink from '@/domain/hypermedia/hypermediaLink';

export default class EmbeddedHypermediaLink extends HypermediaLink {
  public readonly classes: string[];

  constructor(hyperlink: string, relations: string[], classes: string[]) {
    super(hyperlink, relations);
    this.classes = classes;
  }
}
