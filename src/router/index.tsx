import LayoutEmpty from "../layout/LayoutEmpty";
import ListMember from "../layout/LayoutMain";
import Login from "../page/Login";
import Register from "../page/Register";
import room from "../page/room";

const publicRouter = [
  { path: "/", component: room, layout: ListMember, isPrivate: true },
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
