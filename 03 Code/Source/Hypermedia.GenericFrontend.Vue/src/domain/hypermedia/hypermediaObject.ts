import HypermediaLink from '@/domain/hypermedia/hypermediaLink';
import HypermediaAction from '@/domain/hypermedia/hypermediaAction';
import EmbeddedHypermediaObject from '@/domain/hypermedia/embeddedHypermediaObject';
import EmbeddedHypermediaLink from '@/domain/hypermedia/embeddedHypermediaLink';
import HypermediaActionWithParameters from '@/domain/hypermedia/hypermediaActionWithParameters';
import ObjectPropertyInfo from '@/domain/hypermedia/objectPropertyInfo';
import ValuePropertyInfo from '@/domain/hypermedia/valuePropertyInfo';

export default class HypermediaObject {
  public readonly classes: string[];
  public readonly title: string;
  public readonly links: HypermediaLink[];
  public readonly properties: (ObjectPropertyInfo | ValuePropertyInfo)[];
  public readonly actions: HypermediaAction[];
  public readonly actionsWithParameters: HypermediaActionWithParameters[];
  public readonly embeddedObjects: EmbeddedHypermediaObject[];
  public readonly embeddedLinks: EmbeddedHypermediaLink[];

  constructor(
    classes: string[],
    title: string,
    links: HypermediaLink[],
    properties: (ObjectPropertyInfo | ValuePropertyInfo)[],
    actions: HypermediaAction[],
    actionsWithParameters: HypermediaActionWithParameters[],
    embeddedObjects: EmbeddedHypermediaObject[],
    embeddedLinks: EmbeddedHypermediaLink[],
  ) {
    this.classes = classes;
    this.title = title;
    this.links = links;
    this.properties = properties;
    this.actions = actions;
    this.actionsWithParameters = actionsWithParameters;
    this.embeddedObjects = embeddedObjects;
    this.embeddedLinks = embeddedLinks;
  }

  public getSelfLink(): HypermediaLink {
    return this.links.filter((l) => l.relations.some((r) => r === 'self'))[0];
  }
}
