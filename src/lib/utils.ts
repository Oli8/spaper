import omit from 'lodash.omit';
import type { Attributes } from './types';

const propToClass: Record<string, (prefix: string, val: any) => string> = {
  size: (pf, val) => `${pf}-${val}`,
  block: (pf, _val) => `${pf}-block`,
  type: (pf, val) => `${pf}-${val}`,
  outline: (pf, val) => `${pf}-${val}-outline`,
};

export function computeClasses(
  elPrefix: string,
  props: Record<string, any>
): string {
  return Object.entries(props)
    .filter(([_prop, val]) => val)
    .map(([prop, val]) => propToClass[prop](elPrefix, val))
    .join(' ');
};

export function getDomAttributes(
  props: Attributes,
  classes: string,
  toOmit: string[]
): SvelteAllProps {
  return {
    ...omit(props, toOmit), class: classes
  };
}
