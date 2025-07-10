import { useState } from "react";
import { Eye, EyeSlash, Google, ArrowLeft } from "iconsax-reactjs";
import { Link } from "react-router-dom";
import AuthLayout from "@/layouts/AuthLayout";
import CustomFormImage from "@/assets/BuyerOrVendorImage.svg";

type AccountCreationFormProps = {
    accountType?: string;
    onSubmit: (form: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        confirm: string;
    }) => void;
};

const AccountCreationForm = ({ accountType = "User", onSubmit }: AccountCreationFormProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirm: "",
    });

    const isFormValid =
        form.firstName &&
        form.lastName &&
        form.email &&
        form.password &&
        form.confirm &&
        form.password === form.confirm;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isFormValid) return;

        // Pass form data to parent handler
        onSubmit(form);
    };

    return (
        <AuthLayout imageSrc={CustomFormImage} hideLogo>
            <div className="flex flex-col gap-8">
                {/* Back Button */}
                <Link to="/signup" className="text-sm text-grey-400 hover:text-primary-500 flex items-center gap-2">
                    <ArrowLeft />
                    <p>Back</p>
                </Link>

                {/* Title */}
                <div className="flex flex-col gap-2">
                    <h1 className="font-semibold text-grey-900 text-3xl">
                        Create Your {accountType} Account
                    </h1>
                    <p className="text-grey-500 text-base font-normal">
                        Fill in your details to join the ILLASG community and unlock a world of
                        opportunity, rewards, and connection.
                    </p>
                </div>

                {/* Google Auth */}
                <button className="w-full flex items-center justify-center gap-2 bg-primary-50 text-primary-700 border border-primary-500 hover:border-primary-50 text-base font-normal rounded-full py-3 px-6 transition">
                    <Google variant="Bold" />
                    <span>Sign up with Google</span>
                </button>

                {/* OR Divider */}
                <div className="flex items-center gap-4 my-6">
                    <hr className="flex-grow border-t border-grey-100" />
                    <span className="text-grey-600 text-sm">OR</span>
                    <hr className="flex-grow border-t border-grey-100" />
                </div>

                {/* Form */}
                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-normal text-grey-800">First Name *</label>
                            <input
                                type="text"
                                placeholder="e.g Adesanya"
                                value={form.firstName}
                                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                                className="w-full border border-grey-100 rounded-full px-3 py-2 text-base text-grey-900 outline-none focus:ring-2 focus:ring-grey-200"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-normal text-grey-800">Last Name *</label>
                            <input
                                type="text"
                                placeholder="e.g Michael"
                                value={form.lastName}
                                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                                className="w-full border border-grey-100 rounded-full px-3 py-2 text-base text-grey-900 outline-none focus:ring-2 focus:ring-grey-200"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-normal text-grey-800">Email *</label>
                        <input
                            type="email"
                            placeholder="e.g AdesanyaM@gmail.com"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full border border-grey-100 rounded-full px-3 py-2 text-base text-grey-900 outline-none focus:ring-2 focus:ring-grey-200"
                        />
                    </div>

                    {/* Password Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="relative">
                            <label className="text-sm font-normal text-grey-800">Create Password *</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="********"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                className="w-full border border-grey-100 rounded-full px-3 py-2 pr-10 text-base text-grey-900 outline-none focus:ring-2 focus:ring-grey-200"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-9 text-grey-500"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        <div className="relative">
                            <label className="text-sm font-normal text-grey-800">Confirm Password *</label>
                            <input
                                type={showConfirm ? "text" : "password"}
                                placeholder="********"
                                value={form.confirm}
                                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                                className="w-full border border-grey-100 rounded-full px-3 py-2 pr-10 text-base text-grey-900 outline-none focus:ring-2 focus:ring-grey-200"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-9 text-grey-500"
                                onClick={() => setShowConfirm(!showConfirm)}
                            >
                                {showConfirm ? <EyeSlash size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={!isFormValid}
                        className={`w-full rounded-full py-3 px-6 text-base font-normal transition ${isFormValid
                            ? "bg-primary-500 text-white hover:bg-primary-600"
                            : "bg-grey-100 text-grey-300 cursor-not-allowed"
                            }`}
                    >
                        Create {accountType} Account
                    </button>

                    {/* Already Have an Account */}
                    <p className="text-sm text-center text-[#202020]">
                        Already have an account?{" "}
                        <Link to="/signin" className="text-primary-500 hover:underline">
                            Log in
                        </Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    );
};

export default AccountCreationForm;
