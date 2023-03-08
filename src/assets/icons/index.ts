import React from 'react';

import dynamic from 'next/dynamic';

type IconsMap = Record<
  keyof typeof iconsMap,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
>;

const iconsMap = {
  Truck: dynamic(() => import("./truck-fast.svg")),
};

export type Icon = React.ComponentType<React.SVGProps<SVGSVGElement>>;
export type IconK = keyof typeof iconsMap;

export const Icons: IconsMap = new Proxy(iconsMap, {
  get(target, name: IconK) {
    return target[name];
  },
});
