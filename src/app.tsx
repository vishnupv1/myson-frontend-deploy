import { RouterProvider } from "react-router";
import { AppRouter } from "./router/index.router";

export const App = () => {
    return <RouterProvider router={AppRouter}/>
};