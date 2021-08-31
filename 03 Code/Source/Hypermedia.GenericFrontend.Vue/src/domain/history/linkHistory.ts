import HypermediaLink from '@/domain/hypermedia/hypermediaLink';

export default class LinkHistory {
  public readonly hyperlinks: string[];

  constructor(hyperlinks: string[]) {
    this.hyperlinks = hyperlinks;
  }
}
