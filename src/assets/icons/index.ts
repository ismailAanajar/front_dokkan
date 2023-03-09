import React from 'react';

import dynamic from 'next/dynamic';

type IconsMap = Record<
  keyof typeof iconsMap,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
>;

const iconsMap = {
  User: dynamic(() => import("./user.svg")),
  WhishList: dynamic(() => import("./whishlist.svg")),
  Cart: dynamic(() => import("./cart.svg")),
  OpenMenu: dynamic(() => import("./openMenu.svg")),
  CloseMenu: dynamic(() => import("./closeMenu.svg")),
  Facebook: dynamic(() => import("./facebook.svg")),
  Instagram: dynamic(() => import("./instagram.svg")),
  Twitter: dynamic(() => import("./twitter.svg")),
  Youtube: dynamic(() => import("./youtube.svg")),
};

export type Icon = React.ComponentType<React.SVGProps<SVGSVGElement>>;
export type IconK = keyof typeof iconsMap;

export const Icons: IconsMap = new Proxy(iconsMap, {
  get(target, name: IconK) {
    return target[name];
  },
});
