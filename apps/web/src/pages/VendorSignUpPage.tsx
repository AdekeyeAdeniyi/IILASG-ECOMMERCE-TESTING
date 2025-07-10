import AccountCreationForm from "@/components/custom/AccountCreationForm";

const VendorSignUpPage = () => {
interface VendorFormData {
    [key: string]: any;
}

const handleVendorSubmit = (formData: VendorFormData): void => {
    console.log("Vendor form submitted:", formData);
    // Submit to backend or redirect...
};

  return <AccountCreationForm accountType="Vendor" onSubmit={handleVendorSubmit} />;
};

export default VendorSignUpPage;
