import Logo from "@/assets/Main-logo.svg";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { SearchNormal1, ShoppingCart, NotificationBing, User, ArrowDown2 } from "iconsax-reactjs";

const Navigation = () => {
  return (
    <div className="sticky top-0 bg-bodies z-40 border-b border-b-grey-100 py-4 px-6">
      <div className="flex items-center justify-between">
        {/* Left Side: Logo + Nav Links */}
        <div className="flex items-center gap-8">
          <div>
            <img src={Logo} alt="Oja Eko Logo" />
          </div>

          {/* SHOP Dropdown with React Icon */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 font-normal text-sm text-grey-900 hover:text-primary-500 transition-all duration-300 focus:outline-none">
                Shop <ArrowDown2 className="text-xs mt-0.5 h-3 w-3" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link to="/shop/men">Men</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/shop/women">Women</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/shop/kids">Kids</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link to="/orders" className="font-normal text-sm text-grey-900 hover:text-primary-500 transition-all duration-300">
            My Orders
          </Link>
          <Link to="/forums" className="font-normal text-sm text-grey-900 hover:text-primary-500 transition-all duration-300">
            Forums
          </Link>
        </div>

        {/* Right Side: Search Input + Icons */}
        <div className="flex items-center gap-3">
          {/* Search Input */}
          <div className="flex items-center bg-bodies border border-grey-100 rounded-full px-4 py-2 w-[280px] transition-all duration-300 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-100">
            <SearchNormal1 className="text-grey-800 text-sm mr-2 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products and categories"
              className="bg-transparent text-xs text-grey-800 placeholder-grey-300 focus:outline-none w-full"
            />
          </div>

          {/* Icons */}
          <Link
            to="/cart"
            className="text-grey-800 hover:text-bodies flex items-center gap-1 border transition-all duration-300 border-grey-100 rounded-full p-2 hover:bg-primary-500 hover:border-bodies"
          >
            <ShoppingCart className=" w-5 h-5" />
            <span className="text-base font-normal">(0)</span>
          </Link>

          <Link
            to="/notifications"
            className="text-grey-800 hover:text-bodies border transition-all duration-300 border-grey-100 rounded-full p-2 hover:bg-primary-500 hover:border-bodies"
          >
            <NotificationBing className="w-5 h-5" />
          </Link>

          <Link
            to="/signin"
            className="text-grey-800 hover:text-bodies border transition-all duration-300 border-grey-100 rounded-full p-2 hover:bg-primary-500 hover:border-bodies"
          >
            <User className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
