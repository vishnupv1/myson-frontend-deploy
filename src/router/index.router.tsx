import { createBrowserRouter, Navigate } from "react-router";
import { Outlet } from "react-router";
import { Home } from "../pages/home";
import { Navbar } from "../components/layout/navbar";
import { Footer } from "../components/layout/footer";
import Products from "../pages/product";
import ProductDetail from "../pages/productDetail";
import AdminLayout from "../components/layout/admin/AdminLayout";
import LoginPage from "../pages/admin/LoginPage";
import DashboardPage from "../pages/admin/DashboardPage";
import ProductsPage from "../pages/admin/ProductsPage";
import ProductFormPage from "../pages/admin/ProductFormPage";
import CategoriesPage from "../pages/admin/CategoriesPage";
import BrandsPage from "../pages/admin/BrandsPage";
import { useAuth } from "../contexts/AuthContext";
import { Toaster } from "react-hot-toast";
import { ScrollToTop } from "../util/scrollToTop";
import { About } from "../pages/about";
import NotFound from "../pages/NotFound";

const Layout = () => (
    <div className="h-dvh max-w-[1920px]">
        <Navbar />
        <ScrollToTop/>
        <Outlet />
        <Footer />
    </div>
);

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAuth();
    
    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }
    
    return <>{children}</>;
};

// Admin Routes Component
const AdminRoutes = () => (
    <ProtectedRoute>
        <AdminLayout />
    </ProtectedRoute>
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
                element: <Products />
            },
            {
                path: "products/:id",
                element: <ProductDetail />
            },
            {
                path: "about",
                element: <About />
            },
            {
                path: "*",
                element: <NotFound />
            }
        ],
    },
    {
        path: "/admin",
        children: [
            {
                path: "login",
                element: <LoginPage />
            },
            {
                path: "",
                element: <AdminRoutes />,
                children: [
                    {
                        index: true,
                        element: <DashboardPage />
                    },
                    {
                        path: "products",
                        element: <ProductsPage />
                    },
                    {
                        path: "products/new",
                        element: <ProductFormPage />
                    },
                    {
                        path: "products/:id",
                        element: <ProductFormPage />
                    },
                    {
                        path: "products/:id/edit",
                        element: <ProductFormPage />
                    },
                    {
                        path: "categories",
                        element: <CategoriesPage />
                    },
                    {
                        path: "brands",
                        element: <BrandsPage />
                    }
                ]
            }
        ]
    }
]);

// Toaster component
export const AppToaster = () => (
    <Toaster 
        position="top-right"
        toastOptions={{
            duration: 4000,
            style: {
                background: '#363636',
                color: '#fff',
            },
            success: {
                duration: 3000,
                iconTheme: {
                    primary: '#10B981',
                    secondary: '#fff',
                },
            },
            error: {
                duration: 5000,
                iconTheme: {
                    primary: '#EF4444',
                    secondary: '#fff',
                },
            },
        }}
    />
);