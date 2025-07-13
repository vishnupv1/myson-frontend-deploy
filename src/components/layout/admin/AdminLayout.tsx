import type { ReactNode } from 'react';
import { Link, useLocation, Outlet } from 'react-router';
import { useAuth } from '../../../contexts/AuthContext';
import { 
    LayoutDashboard, 
    Package, 
    Tag, 
    Building2, 
    LogOut, 
    Menu,
    X
} from 'lucide-react';
import { useState } from 'react';

interface AdminLayoutProps {
    children?: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
    const { logout } = useAuth();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navigation = [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Products', href: '/admin/products', icon: Package },
        { name: 'Categories', href: '/admin/categories', icon: Tag },
        { name: 'Brands', href: '/admin/brands', icon: Building2 },
    ];

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile sidebar */}
            <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
                <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white">
                    <div className="flex h-16 items-center justify-between px-4">
                        <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <X size={24} />
                        </button>
                    </div>
                    <nav className="flex-1 space-y-1 px-2 py-4">
                        {navigation.map((item) => {
                            const isActive = location.pathname.endsWith(item.href) || location.pathname.includes(item.href + "/new");
                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                                        isActive
                                            ? 'bg-indigo-100 text-indigo-700'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <item.icon
                                        className={`mr-3 h-5 w-5 ${
                                            isActive ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500'
                                        }`}
                                    />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                    <div className="border-t border-gray-200 p-4">
                        <button
                            onClick={handleLogout}
                            className="flex w-full items-center px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md"
                        >
                            <LogOut className="mr-3 h-5 w-5 text-gray-400" />
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* Desktop sidebar */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
                <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
                    <div className="flex h-16 items-center px-4">
                        <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
                    </div>
                    <nav className="flex-1 space-y-1 px-2 py-4">
                        {navigation.map((item) => {
                            const isActive = location.pathname.endsWith(item.href) || location.pathname.includes(item.href + "/new");
                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                                        isActive
                                            ? 'bg-indigo-100 text-indigo-700'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                                >
                                    <item.icon
                                        className={`mr-3 h-5 w-5 ${
                                            isActive ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500'
                                        }`}
                                    />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                    <div className="border-t border-gray-200 p-4">
                        <button
                            onClick={handleLogout}
                            className="flex w-full items-center px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md"
                        >
                            <LogOut className="mr-3 h-5 w-5 text-gray-400" />
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="lg:pl-64">
                {/* Mobile header */}
                <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Menu size={24} />
                    </button>
                    <div className="flex flex-1 gap-x-4 lg:gap-x-6">
                        <h1 className="text-lg font-semibold text-gray-900">Admin Panel</h1>
                    </div>
                </div>

                {/* Page content */}
                <main className="py-6">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        {children || <Outlet />}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout; 