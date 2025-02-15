import LayoutEmpty from "../layout/LayoutEmpty";
import LayoutMain from "../layout/LayoutMain";
import Login from "../page/Login";
import Register from "../page/Register";
import room from "../page/room";

const publicRouter = [
  { path: "/", component: room, layout: LayoutMain, isPrivate: true },
  { path: "/:id", component: room, layout: LayoutMain, isPrivate: true },
  {
    path: "/auth/login",
    component: Login,
    layout: LayoutEmpty,
    isPrivate: false,
  },
  {
    path: "/auth/register",
    component: Register,
    layout: LayoutEmpty,
    isPrivate: false,
  },
];

export default publicRouter;
