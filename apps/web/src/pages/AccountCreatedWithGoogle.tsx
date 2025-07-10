import React from 'react';
import Logo from "@/assets/Main-logo.svg";
import { ArrowRight2, ArrowRight } from "iconsax-reactjs";
import { useNavigate } from "react-router-dom";

const AccountCreatedWithGoogle = () => {
    const [step, setStep] = React.useState(1);
    const [showModal, setShowModal] = React.useState(false);
    const navigate = useNavigate();

    const [form, setForm] = React.useState({
        firstName: "",
        lastName: "",
        number: "",
        isLagosian: "",
        localGovernment: "",
    });

    const lagosLGAs = [
        "Agege", "Ajeromi-Ifelodun", "Alimosho", "Amuwo-Odofin", "Apapa",
        "Badagry", "Epe", "Eti-Osa", "Ibeju-Lekki", "Ifako-Ijaiye",
        "Ikeja", "Ikorodu", "Kosofe", "Lagos Island", "Lagos Mainland",
        "Mushin", "Ojo", "Oshodi-Isolo", "Shomolu", "Surulere"
    ];

    const isStep1Filled =
        form.firstName.trim() !== "" &&
        form.lastName.trim() !== "" &&
        form.number.trim() !== "";

    const isStep2Filled =
        form.isLagosian === "yes"
            ? form.localGovernment.trim() !== ""
            : form.isLagosian.trim() !== "";

    const handleNext = () => {
        if (step === 1 && isStep1Filled) {
            setStep(2);
        }
    };

    const handleBack = () => {
        if (step === 2) {
            setStep(1);
        }
    };

    const handleFinalAction = () => {
        if (form.isLagosian === "yes") {
            setShowModal(true);
        } else {
            navigate("/");
        }
    };

    return (
        <div className='h-auto flex justify-center py-16'>
            <div className="flex flex-col items-center gap-16 relative">
                {/* Logo */}
                <div>
                    <img src={Logo} alt="logo" />
                </div>

                {/* Title */}
                <div className='flex flex-col gap-1 w-xl text-center'>
                    <h1 className='text-2xl font-semibold text-grey-900'>
                        Your Account Has Been Created
                    </h1>
                    <p className='text-grey-500 font-normal text-lg'>
                        You’re in! Now let’s setup your profile in 2 simple steps to personalize your experience.
                    </p>
                </div>

                {/* Card */}
                <div className='w-[666px] bg-grey-50 flex flex-col gap-12 py-8 px-12 rounded-2xl'>
                    {/* Progress Bar */}
                    <div className="w-full h-1 rounded-full overflow-hidden bg-[#D1D1D1]">
                        <div
                            className="h-full transition-all duration-300"
                            style={{
                                width: step === 1 ? "50%" : "100%",
                                backgroundColor: "#FFBF00"
                            }}
                        />
                    </div>

                    {/* Step Content */}
                    <div className='flex flex-col gap-8'>
                        <p className='text-grey-900 text-base font-normal'>
                            {step === 1
                                ? "Help us get to know you better. Fill in your personal details"
                                : "Indigenous Lagosians earn extra points and badges. Confirm your status to unlock special benefits."}
                        </p>

                        {/* Form */}
                        <form className='flex flex-col gap-6'>
                            {step === 1 ? (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-sm font-normal text-grey-800">
                                                First Name <span className='text-error-500'>*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="e.g Adesanya"
                                                value={form.firstName}
                                                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                                                className="w-full border border-grey-100 rounded-full px-3 py-2 text-base text-grey-900 bg-white placeholder:text-grey-300 outline-none"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-sm font-normal text-grey-800">
                                                Last Name <span className='text-error-500'>*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="e.g Michael"
                                                value={form.lastName}
                                                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                                                className="w-full border border-grey-100 rounded-full px-3 py-2 text-base text-grey-900 bg-white placeholder:text-grey-300 outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-normal text-grey-800">
                                            Phone Number <span className='text-error-500'>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g 08123456789"
                                            value={form.number}
                                            onChange={(e) => setForm({ ...form, number: e.target.value })}
                                            className="w-full border border-grey-100 rounded-full px-3 py-2 text-base text-grey-900 bg-white placeholder:text-grey-300 outline-none"
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-normal text-grey-800">
                                            Are You an Indigenous Lagosian?
                                        </label>
                                        <select
                                            value={form.isLagosian}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    isLagosian: e.target.value,
                                                    localGovernment: "",
                                                })
                                            }
                                            className="w-full border border-grey-100 rounded-full px-3 py-2 text-base text-grey-800 bg-white outline-none"
                                        >
                                            <option value="">Select option</option>
                                            <option value="yes">Yes, I’m a Lagosian</option>
                                            <option value="no">No, I’m not a Lagosian</option>
                                        </select>
                                    </div>

                                    {form.isLagosian === "yes" && (
                                        <div className="flex flex-col gap-2">
                                            <label className="text-sm font-normal text-grey-800">
                                                What Local Government Area are you from?
                                            </label>
                                            <select
                                                value={form.localGovernment}
                                                onChange={(e) =>
                                                    setForm({ ...form, localGovernment: e.target.value })
                                                }
                                                className="w-full border border-grey-100 rounded-full px-3 py-2 text-base text-grey-800 bg-white outline-none"
                                            >
                                                <option value="">Select LGA</option>
                                                {lagosLGAs.map((lga) => (
                                                    <option key={lga} value={lga}>
                                                        {lga}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    )}
                                </>
                            )}
                        </form>
                    </div>

                    {/* Bottom Action Buttons */}
                    <div className='flex items-center gap-4'>
                        {step === 2 && (
                            <button
                                onClick={handleBack}
                                className='text-sm font-normal text-grey-700 hover:text-primary-500 transition cursor-pointer'
                            >
                                Go back
                            </button>
                        )}

                        {step === 1 && (
                            <p className='text-sm text-grey-500 font-normal cursor-pointer hover:text-primary-500 transition'>
                                Skip
                            </p>
                        )}

                        {step === 1 ? (
                            <button
                                disabled={!isStep1Filled}
                                onClick={handleNext}
                                className={`flex items-center gap-2 py-3 px-6 rounded-full text-base font-normal transition ${isStep1Filled
                                    ? "bg-primary-500 text-white hover:bg-primary-600"
                                    : "bg-grey-100 text-grey-300 cursor-not-allowed"
                                    }`}
                            >
                                Continue
                                <ArrowRight2 />
                            </button>
                        ) : (
                            <button
                                disabled={!isStep2Filled}
                                onClick={handleFinalAction}
                                className={`flex items-center gap-2 py-3 px-6 rounded-full text-base font-normal transition ${isStep2Filled
                                    ? "bg-primary-500 text-white hover:bg-primary-600"
                                    : "bg-grey-100 text-grey-300 cursor-not-allowed"
                                    }`}
                            >
                                {form.isLagosian === "yes" ? "Verify indigene status" : "Start shopping"}
                                <ArrowRight />
                            </button>
                        )}
                    </div>
                </div>

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white rounded-xl p-8 w-[400px] text-center flex flex-col gap-4">
                            <h2 className="text-lg font-semibold text-grey-900">Verification Submitted</h2>
                            <p className="text-grey-600 text-sm">
                                Thank you! We’ll review your submitted information and get back to you soon.
                            </p>
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-primary-500 text-white rounded-full px-6 py-2 mt-4 hover:bg-primary-600 transition"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AccountCreatedWithGoogle;
