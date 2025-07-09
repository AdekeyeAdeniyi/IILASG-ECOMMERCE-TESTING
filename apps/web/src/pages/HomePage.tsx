// src/pages/Homepage.tsx
import { Link } from "react-router-dom";
import Banner from "@/assets/HomeBanner.svg";
import footerBanner from "@/assets/LowerBanner.svg";
import ProductSection from "@/components/custom/ProductSection";
import { featuredProducts, recentProducts, bestSellers, categories } from "@/data/database";
import { Messages2 } from "iconsax-reactjs";

const Homepage = () => {
  return (
    <div className="w-full">
      {/* Banner */}
      <section
        className="
          w-full rounded-xl 
          bg-cover bg-no-repeat 
          bg-center lg:bg-top
          flex items-center justify-between 
          px-4 sm:px-6 lg:px-36 
          text-white 
          h-96 lg:h-[320px] xl:h-[450px] mb-8
        "
        style={{ backgroundImage: `url(${Banner})` }}
      >
        <div className="z-10 max-w-[480px]">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium mb-3 leading-snug">
            Enjoy Exclusive Benefits as a <br />
            <span className="font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              Verified Indigenous Lagosian!
            </span>
          </h2>
          <p className="text-sm md:text-base mb-6 font-normal text-success-50">
            Get access to special discounts, priority deliveries, and verified vendor deals tailored for our very own Lagosians.
          </p>
          <button className="cursor-pointer bg-transparent border border-white px-5 py-2 rounded-full text-sm hover:bg-white hover:text-green-700 transition">
            Verify Your Indigene Status
          </button>
        </div>
      </section>
      {/* Category Section */}
      <section className="w-full mb-8">
        <h3 className="text-lg text-primary-600 font-medium mb-4">Shop by Category</h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.map((category, index) => (
            <Link to="/categories" key={index}>
              <div
                className="relative rounded-xl overflow-hidden group cursor-pointer"
                style={{ aspectRatio: "1 / 1" }}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute bottom-8 left-2 right-2 text-center text-bodies text-sm font-normal z-10">
                  {category.name}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <ProductSection title="Featured Products" products={featuredProducts} />
      <ProductSection title="Based on your recent visits" products={recentProducts} />
      <ProductSection title="Best Sellers" products={bestSellers} />
      {/* Footer Banner */}
      <section className="relative w-full rounded-xl overflow-hidden h-96 lg:h-[312px] mb-8">
        <img
          src={footerBanner}
          alt="Banner"
          className="w-full h-full object-cover"
        />

        {/* Text Overlay */}
        <div className="absolute inset-0 flex items-center justify-end px-4 sm:px-6 lg:px-36 text-grey-950 z-10 text-right">
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-medium leading-snug">
              Find Your Tribe, Right Here!
            </h2>
            <p className="text-base/7 font-normal w-[400px] text-grey-800">
              Join vibrant forums where Lagosians with shared interests connect, collaborate, and grow together.
            </p>
            <div className="flex justify-end">
              <Link to={'/explore'} className="bg-bodies rounded-full flex items-center gap-2 w-fit text-primary-500 py-3 px-6 transition-transform duration-300 transform hover:scale-105">
                <Messages2/>
                <p>Explore Forums</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div >
  );
};

export default Homepage;
