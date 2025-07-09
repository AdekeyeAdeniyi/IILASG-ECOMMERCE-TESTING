import LogoWhite from "@/assets/Logo-White.svg";
import Facebook from "@/assets/icons/facebook.svg";
import LinkedIn from "@/assets/icons/linkedin.svg";
import X from "@/assets/icons/x.svg";
import Instagram from "@/assets/icons/instagram.svg";

const Footer = () => {
  return (
    <footer className="bg-grey-950 p-20 w-full text-bodies flex flex-col gap-16">
      {/* Footer Up */}
      <div className="flex justify-between">
        {/* Footer Intro */}
        <div className="flex flex-col gap-8 w-[422px]">
          <div className="w-32">
            <img src={LogoWhite} className="w-full" alt="" />
          </div>
          <div>
            <p className="text-grey-200">A vibrant online marketplace connecting buyers and sellers across Lagos and beyond.</p>
          </div>
        </div>
        {/* footer List */}
        <div className="flex flex-col gap-4">
          <h3 className="text text-sm text-grey-300 font-semibold">Ojaeko</h3>
          {/* Footer Main List */}
          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-2 text-base font-normal text-grey-50 hover:text-primary-400 transition duration-300">
              <a href="#">About Us</a>
            </li>
            <li className="flex items-center gap-2 text-base font-normal text-grey-50 hover:text-primary-400 transition duration-300">
              <a href="#">Contact Us</a>
            </li>
          </ul>
        </div>
        {/* Footer List */}
        <div className="flex flex-col gap-4">
          <h3 className="text text-sm text-grey-300 font-semibold">Terms</h3>
          {/* Footer Main List */}
          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-2 text-base font-normal text-grey-50 hover:text-primary-400 transition duration-300">
              <a href="#">Terms & Condition</a>
            </li>
            <li className="flex items-center gap-2 text-base font-normal text-grey-50 hover:text-primary-400 transition duration-300">
              <a href="#">Shipping & Delivery</a>
            </li>
            <li className="flex items-center gap-2 text-base font-normal text-grey-50 hover:text-primary-400 transition duration-300">
              <a href="#">Return & Refund Policy</a>
            </li>
            <li className="flex items-center gap-2 text-base font-normal text-grey-50 hover:text-primary-400 transition duration-300">
              <a href="#">Privacy Policy</a>
            </li>
          </ul>
        </div>
        {/* Footer List */}
        <div className="flex flex-col gap-4">
          <h3 className="text text-sm text-grey-300 font-semibold">Follow Us</h3>
          {/* Footer Main List */}
          <ul className="flex flex-col gap-3">
            <a href="#" target="_blank" className="flex items-center gap-2">
              <div>
                <img src={Facebook} alt="social icon facebook" />
              </div>
              <p className="text-base font-normal text-grey-50">Facebook</p>
            </a>
            <a href="#" target="_blank" className="flex items-center gap-2">
              <div>
                <img src={Instagram} alt="social icon instagram" />
              </div>
              <p className="text-base font-normal text-grey-50">Instagram</p>
            </a>
            <a href="#" target="_blank" className="flex items-center gap-2">
              <div>
                <img src={LinkedIn} alt="social icon linkedin" />
              </div>
              <p className="text-base font-normal text-grey-50">LinkedIn</p>
            </a>
            <a href="#" target="_blank" className="flex items-center gap-2">
              <div>
                <img src={X} alt="social icon x.com" />
              </div>
              <p className="text-base font-normal text-grey-50">X</p>
            </a>
          </ul>
        </div>
      </div>
      {/* Footer Down */}
      <div className="border-t border-t-grey-500 text-center pt-8">
        <p className="text-grey-200">&copy; {new Date().getFullYear()} Ojaeko. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
