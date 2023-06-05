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
  Email: dynamic(() => import("./envelope.svg")),
  Password: dynamic(() => import("./lock.svg")),
  Spinner: dynamic(() => import("./spinner.svg")),
  Plus: dynamic(() => import("./plus.svg")),
  Minus: dynamic(() => import("./minus.svg")),
  FullStar: dynamic(() => import("./fullStar.svg")),
  EmptyStar: dynamic(() => import("./emptyStar.svg")),
  AddToCart: dynamic(() => import("./add-to-cart.svg")),
  RemoveFromCart: dynamic(() => import("./remove-from-cart.svg")),
  AddToWishlist: dynamic(() => import("./add-to-wishlist.svg")),
  RemoveFromWishlist: dynamic(() => import("./remove-from-wishlist.svg")),
  ArrowRight: dynamic(() => import("./arrow_right.svg")),
  Edit: dynamic(() => import("./edit.svg")),
  Remove: dynamic(() => import("./remove.svg")),
  Order: dynamic(() => import("./orders.svg")),
  Address: dynamic(() => import("./address.svg")),
  TotalOrder: dynamic(() => import("./totalOrder.svg")),
  PendingOrder: dynamic(() => import("./pendingOrder.svg")),
  ProcessingOrder: dynamic(() => import("./processingOrder.svg")),
  CompleteOrder: dynamic(() => import("./completeOrder.svg")),
  EmptyHeart: dynamic(() => import("./empty_heart.svg")),
  FillHeart: dynamic(() => import("./fill_heart.svg")),
  Filter: dynamic(() => import("./filter.svg")),
  Download: dynamic(() => import("./download.svg")),
};

export type Icon = React.ComponentType<React.SVGProps<SVGSVGElement>>;
export type IconK = keyof typeof iconsMap;

export const Icons: IconsMap = new Proxy(iconsMap, {
  get(target, name: IconK) {
    return target[name];
  },
});
