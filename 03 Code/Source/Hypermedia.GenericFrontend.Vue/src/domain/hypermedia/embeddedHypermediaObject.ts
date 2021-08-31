import HypermediaObject from '@/domain/hypermedia/hypermediaObject';
import HypermediaLink from '@/domain/hypermedia/hypermediaLink';
import HypermediaAction from '@/domain/hypermedia/hypermediaAction';
import EmbeddedHypermediaLink from '@/domain/hypermedia/embeddedHypermediaLink';
import HypermediaActionWithParameters from '@/domain/hypermedia/hypermediaActionWithParameters';

export default class EmbeddedHypermediaObject extends HypermediaObject {
  public readonly relations: string[];

  constructor(
    classes: string[],
    title: string,
    links: HypermediaLink[],
    properties: any,
    actions: HypermediaAction[],
    actionsWithParameters: HypermediaActionWithParameters[],
    embeddedObjects: EmbeddedHypermediaObject[],
    embeddedLinks: EmbeddedHypermediaLink[],
    relations: string[],
  ) {
    super(classes, title, links, properties, actions, actionsWithParameters, embeddedObjects, embeddedLinks);
    this.relations = relations;
  }
}
