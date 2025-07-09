import React, { useState, useRef } from "react";
import AuthLayout from "@/layouts/AuthLayout";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const email = location.state?.email || "[email protected]"; // fallback

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 4) return;

    toast.success("Email verified successfully!", {
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

    navigate("/new-password");
  };

  return (
    <AuthLayout centerLogo>
      <div className="flex flex-col gap-6 items-center text-center">
        <div className="flex flex-col gap-1">
          <h1 className="font-semibold text-grey-900 text-3xl">Check your email</h1>
          <p className="text-grey-500 text-lg font-normal">
            We sent a verification link to <br />
            <span className="font-medium">[{email}]</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6 w-full">
          <div className="flex gap-3 justify-center">
            {otp.map((digit, i) => (
              <input
                key={i}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                ref={(el) => {
                  inputsRef.current[i] = el;
                }}
                className="w-20 h-20 py-4 px-2 border-2 border-grey-100 text-center text-4xl font-medium rounded-md focus:ring-2 focus:ring-primary-300 outline-none"
                aria-label={`OTP digit ${i + 1}`}
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={otp.some((digit) => digit === "")}
            className={`py-3 px-6 w-80 rounded-full text-base font-medium flex items-center justify-center transition duration-200 ${
              otp.every((d) => d !== "") ? "bg-primary-500 text-white hover:bg-primary-600" : "bg-grey-100 text-grey-400 cursor-not-allowed"
            }`}>
            Verify email
          </button>
        </form>

        <p className="text-sm text-[#202020]">
          Didn’t receive the email?{" "}
          <button type="button" onClick={() => toast.success("Verification link resent")} className="text-primary-500 font-medium">
            Click to resend
          </button>
        </p>
      </div>
    </AuthLayout>
  );
};

export default VerifyEmailPage;
