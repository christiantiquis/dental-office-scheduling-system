import { useCallback, useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/slices/user.slice";
import { getUserData } from "@/api/user.api";
import { toast } from "sonner";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const fetchUserData = useCallback(
    async (id: string) => {
      const user = await getUserData(id);
      dispatch(setUser(user));
    },
    [dispatch]
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("username");
    const userId = localStorage.getItem("userId");
    if (token && name && userId) {
      setIsLoggedIn(true);
      setUsername(name);
      fetchUserData(userId);
    }
  }, [dispatch, fetchUserData]);

  const handleLogin = () => {
    navigate("/login", { replace: true });
  };

  const handleSignup = () => {
    navigate("/signup", { replace: true });
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/", { replace: true });
    toast.success("Logout successful!");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur flex justify-center bg-[#C2EAF9] px-3">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <a href="/" className="flex items-center gap-2">
            <img src="/logo-removebg.png" className="w-10" alt="" />
            <span className="text-xl font-bold">Chris Dental Clinic</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="block md:hidden mr-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {isLoggedIn && (
            <div className="pointer-events-none border-r-2 border-r-blue-950">
              Hello,{"  "}
              <span className="font-bold underline uppercase mr-4">
                {username}
              </span>
            </div>
          )}
          <div
            className="text-sm font-medium hover:text-sky-600 transition-colors cursor-pointer"
            onClick={() => navigate("/", { replace: true })}
          >
            Home
          </div>
          <div
            className="text-sm font-medium hover:text-sky-600 transition-colors cursor-pointer"
            onClick={() => navigate("/appointment", { replace: true })}
          >
            Appointment
          </div>
          {!isLoggedIn && (
            <div className="flex items-center gap-2">
              <Button asChild variant="outline" size="sm" onClick={handleLogin}>
                <div className="cursor-pointer">Login</div>
              </Button>
              <Button
                asChild
                className="bg-sky-600 hover:bg-sky-700"
                size="sm"
                onClick={handleSignup}
              >
                <div className="cursor-pointer">Sign Up</div>
              </Button>
            </div>
          )}
          {isLoggedIn && (
            <div className="flex items-center gap-2">
              <Button
                asChild
                className="bg-sky-600 hover:bg-sky-700"
                size="sm"
                onClick={handleLogout}
              >
                <div className="cursor-pointer">Logout</div>
              </Button>
            </div>
          )}
        </nav>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-background border-b md:hidden">
            <div className="container py-4 space-y-4 text-center">
              <div
                className="block text-sm font-medium hover:text-sky-600 transition-colors cursor-pointer"
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate("/", { replace: true });
                }}
              >
                Home
              </div>
              <div
                className="block text-sm font-medium hover:text-sky-600 transition-colors cursor-pointer"
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate("/appointment", { replace: true });
                }}
              >
                Appointment
              </div>
              {!isLoggedIn && (
                <div className="flex items-center gap-2 justify-center">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    onClick={handleLogin}
                  >
                    <div className="cursor-pointer">Login</div>
                  </Button>
                  <Button
                    asChild
                    className="bg-sky-600 hover:bg-sky-700"
                    size="sm"
                    onClick={handleSignup}
                  >
                    <div className="cursor-pointer">Sign Up</div>
                  </Button>
                </div>
              )}
              {isLoggedIn && (
                <div className="flex items-center gap-2">
                  <Button
                    asChild
                    className="bg-sky-600 hover:bg-sky-700"
                    size="sm"
                    onClick={handleLogout}
                  >
                    <div className="cursor-pointer pointer-events-none">
                      Logout
                    </div>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
