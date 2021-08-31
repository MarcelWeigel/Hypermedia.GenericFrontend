import ValuePropertyInfo from '@/domain/hypermedia/valuePropertyInfo';

export default class ObjectPropertyInfo {
  public id: string;
  public name: string;
  public children: (ObjectPropertyInfo | ValuePropertyInfo)[];

  constructor(id: string, name: string, children: (ObjectPropertyInfo | ValuePropertyInfo)[]) {
    this.id = id;
    this.name = name;
    this.children = children;
  }
}
