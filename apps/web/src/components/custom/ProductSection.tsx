import { ShoppingCart, ArrowRight2, Star1, Heart } from "iconsax-reactjs";
import { useNavigate } from "react-router-dom";

type Product = {
    [x: string]: any;
    name: string;
    image: string;
    price: number;
    rating: number;
    reviews: number;
    discount?: number;
};

type SectionProps = {
    title: string;
    products: Product[];
};

const ProductSection = ({ title, products }: SectionProps) => {
    const navigate = useNavigate();

    return (
        <section className="mb-10">
            <div className="flex justify-between items-center bg-primary-500 px-6 py-2 gap-1 rounded-lg">
                <h3 className="text-base font-normal text-grey-950">{title}</h3>
                <div className="flex items-center text-bodies hover:text-primary-700 cursor-pointer">
                    <p className="text-sm">View all</p>
                    <ArrowRight2 />
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 py-4 rounded-b-md">
                {products.map((product, index) => (
                    <div
                        key={index}
                        onClick={() => navigate(`/products/${product.id}`)}
                        className="relative group overflow-hidden rounded-xl cursor-pointer transition-all duration-300"
                    >
                        {/* Discount badge */}
                        {product.discount && (
                            <span className="absolute top-5 right-5 bg-white text-sm font-medium text-grey-900 px-4 py-1 rounded-full z-20">
                                {product.discount}% Off
                            </span>
                        )}

                        <div className="flex flex-col gap-4 py-2">
                            {/* Image Container */}
                            <div className="relative bg-[#F6F6F6] h-60 w-full rounded-xl flex items-center justify-center overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-40 w-full object-contain transition-transform duration-300 group-hover:scale-105"
                                />

                                {/* Gradient overlay only on hover */}
                                <div className="absolute inset-0 bg-gradient-to-b from-gray-400/40 to-gray-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl z-10" />
                            </div>

                            {/* Product Info */}
                            <div className="flex flex-col gap-2">
                                <div className="text-base font-medium text-grey-900">
                                    {product.name}
                                </div>
                                <div className="text-xs flex items-center gap-1">
                                    <Star1 className="w-2.5 text-primary-500" variant="Bold" />
                                    <p className="text-grey-800 cursor-pointer">
                                        {product.rating.toFixed(1)} ({product.reviews.toLocaleString()} Reviews)
                                    </p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="text-base font-semibold text-grey-900">
                                        ₦{product.price.toLocaleString()}
                                    </div>
                                    <div className="flex gap-4 text-gray-600">
                                        <ShoppingCart variant="Bold" className="cursor-pointer text-grey-900" />
                                        <Heart className="cursor-pointer text-grey-900" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProductSection;
