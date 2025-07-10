import { Box1, User, ArrowRight2 } from "iconsax-reactjs";
import AuthLayout from "@/layouts/AuthLayout";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  return (
    <AuthLayout>
      <div className="flex flex-col gap-8">
        {/* Form Title */}
        <div className="flex flex-col gap-1">
          <h1 className="font-medium text-grey-900 text-2xl">
            <span className="text-primary-500">Welcome to IILASG Marketplace</span>, where community meets commerce.
          </h1>
          <p className="text-grey-500 text-lg font-normal">Who are you signing up as?</p>
        </div>

        {/* Form Container Main */}
        <div className="flex flex-col gap-8">
          <Link to="/signup/buyer">
            <div className="bg-grey-50 py-4 px-6 rounded-lg cursor-pointer flex justify-between items-center hover:shadow-md transition">
              <div className="flex items-start gap-5">
                <User className="bg-primary-500 rounded-full p-3 w-12 h-12" color="#FFF" variant="Bold" />
                <div className="flex flex-col gap-1 w-64">
                  <h3 className="text-grey-950 font-medium text-xl">Buyer</h3>
                  <p className="text-sm font-normal text-grey-600">Shop smart. Earn rewards. Support your community.</p>
                </div>
              </div>
              <ArrowRight2 color="#101010" variant="Bold" size="24" />
            </div>
          </Link>

          <Link to="/signup/vendor">
            <div className="bg-grey-50 py-4 px-6 rounded-lg cursor-pointer flex justify-between items-center hover:shadow-md transition">
              <div className="flex items-start gap-5">
                <Box1 className="bg-primary-500 rounded-full p-3 w-12 h-12" color="#FFF" variant="Bold" />
                <div className="flex flex-col gap-1 w-64">
                  <h3 className="text-grey-950 font-medium text-xl">Vendor</h3>
                  <p className="text-sm font-normal text-grey-600">Grow your business. Reach more customers. Get rewarded.</p>
                </div>
              </div>
              <ArrowRight2 color="#101010" variant="Bold" size="24" />
            </div>
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignUpPage;
