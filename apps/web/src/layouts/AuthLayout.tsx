// components/AuthLayout.tsx
import React from "react";
import FormImage from "@/assets/FormAvatar.svg";
import Logo from "@/assets/Main-logo.svg";

type Props = {
    children: React.ReactNode;
    centerLogo?: boolean;
};

const AuthLayout = ({ children, centerLogo = false }: Props) => {
    return (
        <section className="w-full h-screen bg-bodies p-5 flex justify-between">
            {/* Sticky Left Image */}
            <div className="w-2/5 h-full sticky top-5">
                <img
                    src={FormImage}
                    alt="Form Avatar"
                    className="h-full w-full object-cover rounded-2xl"
                />
            </div>

            {/* Right Form */}
            <div className="w-3/5 flex justify-center overflow-y-auto px-4">
                <div className="w-3/4 py-20 flex flex-col gap-16">
                    {/* Logo */}
                    <div className={`w-32 ${centerLogo ? "mx-auto" : ""}`}>
                        <img src={Logo} alt="Logo" className="w-full" />
                    </div>

                    {/* Page Content */}
                    {children}
                </div>
            </div>
        </section>
    );
};

export default AuthLayout;
