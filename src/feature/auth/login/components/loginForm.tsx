"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import Image from "next/image";
import image from "../../../../../public/img_branding.png"; // Adjust the path to your image as needed
import {useRouter} from "next/navigation";

// Zod validation schema
const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });


  // Replace this function with your actual API endpoint
  const loginAPI = async (username: string, password: string) => {
    // EXAMPLE: Replace with your API endpoint
    // const response = await fetch('/api/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ username, password }),
    // });
    // if (!response.ok) throw new Error('Login failed');
    // return await response.json();
    console.log("Mock API call with:", { username, password });

    // For now, return mock data
    return { success: true, token: "mock-token" };
  };

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

      await new Promise(resolve => setTimeout(resolve, 2000));

      // Call your API
      const result = await loginAPI(data.username, data.password);

      // Handle successful login
      // setSuccessMessage("Login successful! Redirecting...");
      console.log("Login result:", result);

      // Clear form fields
      reset();

      // Redirect or store token here
      // window.location.href = '/dashboard';
      // or: localStorage.setItem('token', result.token);
      
        if(isLogin==true){ 
          router.push('/dashboard/overview');
        }else{
          router.push('/login');
        }
      
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "An error occurred",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4"
    style={{
              backgroundImage: "url('/master_bg2.png')", // Adjust the path to your background image as needed
              backgroundSize: "cover",
              backgroundPosition: "right",
            }}>
      <div className="w-full max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left side - Logo and Visual */}
          <div className="hidden lg:flex flex-col bg-white rounded-l-2xl border border-r-0 border-border shadow-lg">
            <Image
              src={image}
              alt="Chhong Cafe & BBQ"
              className="w-full h-full rounded-l-2xl object-cover"
              priority
            />
          </div>

          {/* Right side - Login Form */}
          <div
            className="flex flex-col justify-center bg-card rounded-r-2xl lg:rounded-l-none rounded-l-2xl border border-l-0 lg:border-l border-border shadow-lg inset-shadow-sm p-8"
            style={{
              backgroundImage: "url('/bg_right_side.png')", // Adjust the path to your background image as needed
              backgroundSize: "cover",
              backgroundPosition: "right",
            }}
          >
            <div className="space-y-6">
              {/* Header */}
              <div className="space-y-2">
                <h1 className="text-3xl font-poppins font-semibold text-primary tracking-tight text-center">
                  Welcome Back!
                </h1>
                <p className="text-sm text-primary text-center">
                  Sign in to your account
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Username Input */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="username"
                    className="block text-xs font-semibold text-primary uppercase tracking-wide"
                  >
                    Username
                  </label>
                  <input
                    {...register("username")}
                    type="text"
                    id="username"
                    placeholder="username"
                    className={`w-full px-3 py-2.5 rounded-lg border bg-secondary-brand text-foreground placeholder-muted-foreground focus:outline-none transition duration-300 text-sm shadow-lg hover:shadow-xl ${
                      errors.username
                        ? "border-destructive focus:ring-2 focus:ring-destructive/20"
                        : "border-border focus:ring-2 focus:ring-primary/20 focus:border-primary focus:scale-105 focus:-translate-y-1"
                    }`}
                  />
                  {errors.username && (
                    <p className="text-destructive text-xs font-medium">
                      {errors.username.message}
                    </p>
                  )}
                </div>

                {/* Password Input */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="password"
                    className="block text-xs font-semibold text-primary uppercase tracking-wide"
                  >
                    Password
                  </label>
                  <input
                    {...register("password")}
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    className={`w-full px-3 py-2.5 rounded-lg border bg-secondary-brand text-foreground placeholder-muted-foreground focus:outline-none transition duration-300 text-sm shadow-lg hover:shadow-xl ${
                      errors.password
                        ? "border-destructive focus:ring-2 focus:ring-destructive/20"
                        : "border-border focus:ring-2 focus:ring-primary/20 focus:border-primary focus:scale-105 focus:-translate-y-1"
                    }`}
                  />
                  {errors.password && (
                    <p className="text-destructive text-xs font-medium">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Error Message */}
                {/* {errorMessage && (
                  <div className="p-1 bg-destructive/5 border border-destructive/20 rounded-lg text-destructive text-xs font-medium">
                    {errorMessage}
                  </div>
                )} */}

                {/* Success Message */}
                {successMessage && (
                  <div className="p-1 bg-accent/5 border border-accent/20 rounded-lg text-green-600 text-xs font-medium">
                    {successMessage}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-brand hover:bg-brand-hover disabled:bg-muted disabled:text-muted-foreground text-primary-foreground font-semibold py-2.5 rounded-lg transition duration-200 mt-4 shadow-md hover:shadow-lg text-sm"
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </button>
              </form>

              {/* Footer Links */}
              <div className="text-center">
                <a
                  href="#"
                  className="text-xs text-brand hover:text-primary/80 font-medium transition"
                >
                  Forgot password?
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
