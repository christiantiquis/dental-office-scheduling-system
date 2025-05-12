import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "@/app/pages/home.page";
import LoginPage from "@/app/pages/login.page";
import SignupPage from "@/app/pages/signup.page";
import BookingPage from "@/app/pages/booking.page";

const RouteComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/booking" element={<BookingPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteComponent;
