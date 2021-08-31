﻿export enum PropertyType {
  nullvalue = 'nullvalue',
  boolean = 'boolean',
  number = 'number',
  string = 'string',
  object = 'object',
  array = 'array',
}

export default class ValuePropertyInfo {
  public id: string;
  public name: string;
  public value: any;
  public type: PropertyType;

  constructor(id: string, name: string, value: any, type: PropertyType) {
    this.id = id;
    this.name = name;
    this.value = value;
    this.type = type;
  }
}
