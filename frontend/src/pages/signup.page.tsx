import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { userSignup } from "@/api/user.api";
import { toast } from "sonner";

export default function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const validatePasswords = () => {
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return false;
    }
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    if (!validatePasswords()) return;
    setIsLoading(true);

    // In a real app, you would handle registration here
    try {
      const { user, token } = await userSignup(
        firstName,
        lastName,
        email,
        password
      );
      if (user) {
        // Handle successful signup (e.g., save token to localStorage)
        localStorage.setItem("token", token ?? "");
        localStorage.setItem("username", user.first_name ?? "");
        localStorage.setItem("userId", user.id ?? "");
      } else {
        toast.error("Registration Failed: Unexpected Error Occurred!");
        throw new Error("Registration Failed");
      }
      navigate("/", { replace: true });
      toast.success("User successfully created an account.");
    } catch (e) {
      toast.error("Registration Failed: Email already exists. Please login!");
      console.log(e);
    }

    setIsLoading(false);
  };

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)] py-12 m-auto h-screen">
      <Card className="flex">
        <div className="flex flex-wrap items-center bg-[#D3EDF8] rounded-xl">
          <img
            className="h-120 w-100 object-cover align-middle"
            src="/logo_big.png"
            onClick={() => navigate("/", { replace: true })}
          />
        </div>
        <div className="">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">
              Create an account
            </CardTitle>
            <CardDescription>
              Enter your information to create your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input
                    id="first-name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    placeholder="First Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input
                    id="last-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    placeholder="Last Name"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="* * * * * * * *"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="* * * * * * * *"
                />
                {passwordError && (
                  <p className="text-sm text-red-500">{passwordError}</p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button
                type="submit"
                className="w-full bg-sky-600 hover:bg-sky-700 cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
              <p className="mt-4 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <a
                  onClick={() => navigate("/login", { replace: true })}
                  className="text-sky-600 hover:text-sky-700 cursor-pointer"
                >
                  Sign in
                </a>
              </p>
            </CardFooter>
          </form>
        </div>
      </Card>
    </div>
  );
}
