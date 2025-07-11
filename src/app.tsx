import { RouterProvider } from "react-router";
import { AppRouter, AppToaster } from "./router/index.router";
import { AuthProvider } from "./contexts/AuthContext";

export const App = () => {
    return (
        <AuthProvider>
            <RouterProvider router={AppRouter}/>
            <AppToaster />
        </AuthProvider>
    );
};