import LoginPage from "components/LoginPage";
import LogoutPage from "components/LogoutPage";
import TodoPage from "components/TodoPage";

export const publicRoutes = [
  {
    label: "Login Page",
    path: "/",
    component: LoginPage,
  },
  {
    label: "Logout Page",
    path: "/logout",
    component: LogoutPage,
  },
];

export const privateRoutes = [
  {
    label: "Todo Page",
    path: "/todo",
    component: TodoPage,
  },
];
