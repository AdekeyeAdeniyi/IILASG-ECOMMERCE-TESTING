import { Routes, Route } from "react-router-dom";

// Layout
import MainLayout from "@/layouts/MainLayouts";

// Pages
import Homepage from "@/pages/HomePage";
import OrdersPage from "@/pages/OrdersPage";
import PointsPage from "@/pages/PointsPage";
import SavedItemsPage from "@/pages/SavedItemsPage";
import ForumsPage from "@/pages/ForumsPage";
import SettingsPage from "@/pages/SettingsPage";
import SupportPage from "@/pages/SupportPage";
import LogoutPage from "@/pages/LogoutPage";
import SignInPage from "@/pages/SignInPage";
import SignUpPage from "@/pages/SignUpPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import VerifyEmailPage from "./pages/VerifyPage";
import ResetPasswordConfirmPage from "./pages/ResetPasswordConfirmPage";

const App = () => {
  return (
    <Routes>
      {/* Auth Routes (no layout) */}
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/verify-email" element={ <VerifyEmailPage/> } />
      <Route path="/new-password" element={ <ResetPasswordConfirmPage /> } />

      {/* Routes using Main Layout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Homepage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="points" element={<PointsPage />} />
        <Route path="saved" element={<SavedItemsPage />} />
        <Route path="forums" element={<ForumsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="support" element={<SupportPage />} />
        <Route path="logout" element={<LogoutPage />} />
      </Route>
    </Routes>
  );
};

export default App;
