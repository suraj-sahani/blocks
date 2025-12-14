"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Car,
  Zap,
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  User,
  Building2,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const SignIn = () => {
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type") === "host" ? "host" : "user";
  const [userType, setUserType] = useState<"user" | "host">(initialType);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signin logic
  };

  return (
    <div className="min-h-screen flex gradient-hero">
      {/* Left Panel - Visual */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-linear-to-br from-primary to-teal-600 p-12 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-black/10 rounded-full blur-3xl" />
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative z-10 text-center max-w-lg"
        >
          <div className="w-32 h-32 mx-auto mb-8 rounded-3xl bg-white/20 backdrop-blur-xl flex items-center justify-center">
            {userType === "host" ? (
              <Building2 className="w-16 h-16 text-white" />
            ) : (
              <Car className="w-16 h-16 text-white" />
            )}
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Welcome Back!</h2>
          <p className="text-white/80 text-lg">
            {userType === "host"
              ? "Access your dashboard to manage listings and track your earnings."
              : "Pick up where you left off and find your next parking spot."}
          </p>
        </motion.div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mb-8">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary to-teal-400 flex items-center justify-center shadow-lg">
                <Car className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-accent flex items-center justify-center">
                <Zap className="w-2.5 h-2.5 text-accent-foreground" />
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight">
              Park<span className="text-primary">Volt</span>
            </span>
          </Link>

          <h1 className="text-3xl font-bold mb-2">Sign in to your account</h1>
          <p className="text-muted-foreground mb-8">
            Enter your credentials to access your account.
          </p>

          {/* User Type Toggle */}
          <div className="flex gap-3 mb-8">
            <button
              onClick={() => setUserType("user")}
              className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all duration-300 ${
                userType === "user"
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/50"
              }`}
            >
              <User className="w-5 h-5" />
              <span className="font-medium">User</span>
            </button>
            <button
              onClick={() => setUserType("host")}
              className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all duration-300 ${
                userType === "host"
                  ? "border-accent bg-accent/5 text-accent"
                  : "border-border text-muted-foreground hover:border-accent/50"
              }`}
            >
              <Building2 className="w-5 h-5" />
              <span className="font-medium">Host</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-12"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-12 pr-12"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Checkbox
                id="remember"
                checked={formData.rememberMe}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, rememberMe: checked as boolean })
                }
              />
              <Label
                htmlFor="remember"
                className="text-sm text-muted-foreground cursor-pointer"
              >
                Remember me for 30 days
              </Label>
            </div>

            <Button
              type="submit"
              variant={userType === "host" ? "accent" : "hero"}
              size="lg"
              className="w-full"
            >
              Sign In
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </form>

          <p className="text-center text-muted-foreground mt-8">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-primary font-medium hover:underline"
            >
              Create one
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SignIn;
