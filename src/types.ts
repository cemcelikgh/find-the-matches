export type CardObjectType = {
  name: string,
  id: string,
  status: boolean,
  match: boolean,
  color: string
}

export type CardObjectsType = CardObjectType[];

import { JSX } from "react";
export type ImageFn = (name: string) => JSX.Element;
