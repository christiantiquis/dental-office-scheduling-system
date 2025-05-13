import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "@/pages/home.page";
import LoginPage from "@/pages/login.page";
import SignupPage from "@/pages/signup.page";
import BookingPage from "@/pages/booking.page";

const RouteComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/appointment" element={<HomePage />} />
        <Route path="/appointment/booking" element={<BookingPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteComponent;
