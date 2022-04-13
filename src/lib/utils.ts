import type { Attributes } from './types';

interface getDomAttributesParams {
  props: Attributes,
  classes: string,
  toOmit?: string[]
}

const propToClass: Record<string, (prefix: string, val: any) => string> = {
  size: (pf, val) => `${pf}-${val}`,
  block: (pf, _val) => `${pf}-block`,
  type: (pf, val) => `${pf}-${val}`,
  outline: (pf, val) => `${pf}-${val}-outline`,
};

function omit(
  obj: Record<string, any>,
  properties: string[]
): Record<string, any> {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([key, _val]) => !properties.includes(key))
  );
}

export function computeClasses(
  elPrefix: string,
  props: Record<string, any>
): string {
  return Object.entries(props)
    .filter(([_prop, val]) => val)
    .map(([prop, val]) => propToClass[prop](elPrefix, val))
    .join(' ');
};

export function getDomAttributes({
  props, classes, toOmit=[]
}: getDomAttributesParams): Attributes {
  return {
    ...omit(props, toOmit), class: classes
  };
}

export type ComponentProps<
  T extends { $set: (...args: any) => any }
> = NonNullable<Parameters<T['$set']>[0]>;
