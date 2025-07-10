import AccountCreationForm from "@/components/custom/AccountCreationForm";

const BuyerSignUpPage = () => {
interface BuyerFormData {
    [key: string]: any;
}

const handleBuyerSubmit = (formData: BuyerFormData): void => {
    console.log("Buyer form submitted:", formData);
    // Submit to backend or redirect...
};

  return <AccountCreationForm accountType="Buyer" onSubmit={handleBuyerSubmit} />;
};

export default BuyerSignUpPage;
