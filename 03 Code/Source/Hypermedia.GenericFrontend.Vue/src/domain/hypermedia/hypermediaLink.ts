import Link from '@/domain/hypermedia/link';

export default class HypermediaLink extends Link {
  public readonly relations: string[];

  constructor(hyperlink: string, relations: string[]) {
    super(hyperlink);
    this.relations = relations;
  }
}
