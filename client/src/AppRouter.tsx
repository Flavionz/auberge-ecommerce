import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { FrontendLayout } from './App';
import { AdminRouteProtector } from './pages/auth/AdminRouteProtector';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/auth/LoginPage';
import { BoutiquePage } from './pages/shop/BoutiquePage';
import { AddProductPage } from './pages/admin/AddProductPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { ManageProductsPage } from './pages/admin/ManageProductsPage';
import { UsersPage } from './pages/admin/UsersPage';
import { OrdersPage } from './pages/admin/OrdersPage';
import { CartPage } from './pages/shop/CartPage';


export const AppRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={
                <FrontendLayout>
                    <HomePage />
                </FrontendLayout>
            } />

            <Route path="/login" element={<LoginPage />} />

            <Route path="/boutique" element={
                <FrontendLayout>
                    <BoutiquePage />
                </FrontendLayout>
            } />

            <Route path="/cart" element={
                <FrontendLayout>
                    <CartPage />
                </FrontendLayout>
            } />

            <Route path="/admin/dashboard" element={
                <AdminRouteProtector>
                    <AdminDashboardPage />
                </AdminRouteProtector>
            } />

            <Route path="/admin/add-product" element={
                <AdminRouteProtector>
                    <AddProductPage />
                </AdminRouteProtector>
            } />

            <Route path="/admin/products" element={
                <AdminRouteProtector>
                    <ManageProductsPage />
                </AdminRouteProtector>
            } />

            <Route path="/admin/products/edit/:id" element={
                <AdminRouteProtector>
                    <AddProductPage />
                </AdminRouteProtector>
            } />

            <Route path="/admin/orders" element={
                <AdminRouteProtector>
                    <OrdersPage />
                </AdminRouteProtector>
            } />

            <Route path="/admin/users" element={
                <AdminRouteProtector>
                    <UsersPage />
                </AdminRouteProtector>
            } />
        </Routes>
    );
};