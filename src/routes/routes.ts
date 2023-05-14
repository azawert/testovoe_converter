import { FC } from "react";
import { Home } from "../pages/home/Home";
import { ConvertPage } from "../pages/convertPage/ConvertPage";

interface IRoute {
  element: FC;
  link: string;
}

export const routes: IRoute[] = [
  {
    element: Home,
    link: "/",
  },
  {
    element: ConvertPage,
    link: "/convert",
  },
];
