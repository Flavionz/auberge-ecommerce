import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { LoginPage } from './pages/auth/LoginPage';
import { BoutiquePage } from './pages/shop/BoutiquePage';
import { AddProductPage } from './pages/admin/AddProductPage';

export function AppRouter() {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/boutique" element={<BoutiquePage />} />
            <Route path="/admin/add-product" element={<AddProductPage />} />
        </Routes>
    </BrowserRouter>;
}