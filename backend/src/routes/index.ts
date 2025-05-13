import { Router } from "express";
import authRoute from "./auth.route";
import userRoute from "./user.route";
import doctorRoute from "./doctor.route";
import appointmentRoute from "./appointment.route";

const router = Router();

const defaultRoutes = [
  { path: "/auth", route: authRoute },
  { path: "/user", route: userRoute },
  { path: "/doctor", route: doctorRoute },
  { path: "/appointment", route: appointmentRoute },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
