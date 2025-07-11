import { createBrowserRouter } from "react-router";
import { Outlet } from "react-router";
import { Home } from "../pages/home";
import { Navbar } from "../components/layout/navbar";
import { Footer } from "../components/layout/footer";
import ProductsGrid from "../pages/ProductsGrid";

const Layout = () => (
    <div className="h-dvh max-w-[1920px]">
        <Navbar />
        <Outlet />
        <Footer />
    </div>
);

export const AppRouter = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "products",
                element: <ProductsGrid />
            }
        ],
    },
]);