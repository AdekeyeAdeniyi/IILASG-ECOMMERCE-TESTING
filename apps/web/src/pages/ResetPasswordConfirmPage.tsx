import React, { useState } from "react";
import AuthLayout from "@/layouts/AuthLayout";
import toast from "react-hot-toast";
import { Eye, EyeSlash } from "iconsax-reactjs";
import { useNavigate } from "react-router-dom";

const ResetPasswordConfirmPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate(); // 👈 Add this

  const passwordsMatch = password === confirmPassword;
  const isFormValid = password.length >= 6 && passwordsMatch;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isLoading) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      toast.success("Your password has been reset!", {
        style: {
          borderRadius: "999px",
          background: "#fff9e6",
          color: "#000",
          border: "1px solid #FFD300",
        },
        iconTheme: {
          primary: "#FFD300",
          secondary: "#000",
        },
      });

      // ✅ Redirect to signin page
      navigate("/signin");
    }, 1500);
  };

  return (
    <AuthLayout centerLogo>
      <div className="flex flex-col gap-8 text-center">
        <div className="flex flex-col gap-1">
          <h1 className="font-semibold text-grey-900 text-3xl">Email Verified</h1>
          <p className="text-grey-500 text-lg font-normal">
            Your email has successfully been verified.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-normal text-left text-grey-800">
              Create password *
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                className="w-full border border-grey-100 rounded-full px-4 py-2 text-base text-grey-900 outline-none focus:ring-2 focus:ring-grey-200 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-grey-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="confirmPassword" className="text-sm font-normal text-left text-grey-800">
              Confirm password *
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                className="w-full border border-grey-100 rounded-full px-4 py-2 text-base text-grey-900 outline-none focus:ring-2 focus:ring-grey-200 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-grey-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {confirmPassword && !passwordsMatch && (
              <small className="text-red-500 text-xs text-left">Passwords do not match</small>
            )}
          </div>

          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className={`py-3 px-6 rounded-full w-full text-base font-medium transition duration-200 ${
              isFormValid && !isLoading
                ? "bg-primary-500 text-white hover:bg-primary-600"
                : "bg-grey-100 text-grey-400 cursor-not-allowed"
            }`}
          >
            {isLoading ? (
              <span className="border-2 border-t-transparent border-white rounded-full w-5 h-5 animate-spin" />
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default ResetPasswordConfirmPage;
