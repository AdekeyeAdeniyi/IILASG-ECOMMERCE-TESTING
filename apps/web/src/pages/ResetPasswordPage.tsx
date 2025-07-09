import React, { useState } from "react";
import AuthLayout from "@/layouts/AuthLayout";
import { ArrowLeft } from "iconsax-reactjs";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isFormValid = email.trim() !== "" && isValidEmail(email);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isLoading) return;

    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);

      toast.success(`An OTP has been sent to ${email}`, {
        style: {
          borderRadius: '999px',
          background: '#fff9e6',
          color: '#000',
          border: '1px solid #FFD300',
        },
        iconTheme: {
          primary: '#FFD300',
          secondary: '#000',
        },
      });

      navigate("/verify-email");
    }, 1500);
  };

  return (
    <AuthLayout centerLogo>
      <div className="flex flex-col gap-8 text-center">
        <div className="flex flex-col gap-1">
          <h1 className="font-semibold text-grey-900 text-3xl">Reset your password</h1>
          <p className="text-grey-500 text-lg font-normal">
            Enter your email to receive a password reset link.
          </p>
        </div>

        <form onSubmit={handleSendOTP} className="flex flex-col gap-6 items-center w-full">
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-normal text-grey-800 text-left">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="e.g. example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              aria-describedby="emailHelp"
              aria-invalid={email !== "" && !isValidEmail(email)}
              className="w-full border border-grey-100 rounded-full px-3 py-2 text-base text-grey-900 outline-none focus:ring-2 focus:ring-grey-200 transition duration-150"
            />
            <small
              id="emailHelp"
              className={`text-xs mt-1 text-left ${
                email !== "" && !isValidEmail(email) ? "text-red-500" : "invisible"
              }`}
            >
              Please enter a valid email address.
            </small>
          </div>

          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className={`py-3 px-6 rounded-full w-full text-base font-normal transition duration-200 flex items-center justify-center gap-2 ${
              isFormValid && !isLoading
                ? "bg-primary-500 text-white hover:bg-primary-600"
                : "bg-grey-100 text-grey-400 cursor-not-allowed"
            }`}
          >
            {isLoading ? (
              <span className="border-2 border-t-transparent border-white rounded-full w-5 h-5 animate-spin" />
            ) : (
              "Send OTP"
            )}
          </button>
        </form>

        <Link to="/signin" className="flex items-center gap-2 justify-center text-grey-900 text-sm">
          <ArrowLeft size={20} />
          Back
        </Link>
      </div>
    </AuthLayout>
  );
};

export default ResetPasswordPage;