type GroupBy<T> = { [property: string]: T[] };

const readProperty = function<TElement>(element: TElement, property: string) {
  return (element as any)[property];
};

export const groupBy = function<TElement>(source: TElement[], key: string): GroupBy<TElement> {
  return source.reduce((rv: GroupBy<TElement>, x: TElement) => {
    (rv[readProperty(x, key)] = rv[readProperty(x, key)] || []).push(x);
    return rv;
  }, {});
};

export default groupBy;
