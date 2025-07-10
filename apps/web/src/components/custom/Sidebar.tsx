import React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";


//import icon.
import { ArrowRight2, Home2, Box, Gift, Heart, Messages2, Setting2, Call, LoginCurve } from 'iconsax-reactjs';

interface SidebarItemProps {
  icon: React.ReactElement<any>;
  label: string;
  to: string;
  collapsed: boolean;
}

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleSidebar = () => setCollapsed(!collapsed);

  const iconStyle = {
    size: 20,
    className: "text-grey-900 transition-colors duration-300 group-hover:text-primary-500"
  };

  const itemsTop = [
    {
      icon: <Home2 {...iconStyle} />,
      label: "Home",
      to: "/",
    },
    {
      icon: <Box {...iconStyle} />,
      label: "My Orders",
      to: "/orders",
    },
    {
      icon: <Gift {...iconStyle} />,
      label: "Shopping Points",
      to: "/points",
    },
    {
      icon: <Heart {...iconStyle} />,
      label: "Saved Items",
      to: "/saved",
    },
    {
      icon: <Messages2 {...iconStyle} />,
      label: "Forums",
      to: "/forums",
    },
  ];

  const itemsBottom = [
    {
      icon: <Setting2 {...iconStyle} />,
      label: "Settings",
      to: "/settings",
    },
    {
      icon: <Call {...iconStyle} />,
      label: "Help & Support",
      to: "/support",
    },
    {
      icon: <LoginCurve {...iconStyle} />,
      label: "Log out",
      to: "/logout",
    },
  ];

  return (
    <aside
      className={`sticky top-[70px] bg-bodies border-r border-grey-100 transition-all duration-300 flex flex-col justify-between overflow-hidden ${collapsed ? "w-[72px]" : "w-[260px]"
        } max-h-[calc(100vh-70px)]`}
    >
      {/* Top Section */}
      <div className="px-2 py-4">
        <button
          onClick={toggleSidebar}
          className={`
            group w-full px-3 py-2 mb-4 text-grey-400 text-sm transition-all duration-300 
            flex items-center ${collapsed ? "justify-center" : "gap-3"}
          `}
        >
          <div className="flex-shrink-0">
            <ArrowRight2
              size={18}
              className={`text-grey-400 transition-transform duration-300 ${collapsed ? "rotate-180" : "rotate-0"
                }`}
            />
          </div>

          {!collapsed && (
            <p className="text-sm sm:text-base transition-all duration-300">
              Collapse
            </p>
          )}
        </button>


        <div className="space-y-4">
          {itemsTop.map(({ icon, label, to }) => (
            <SidebarItem
              key={label}
              icon={icon}
              label={label}
              to={to}
              collapsed={collapsed}
            />
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="px-2 py-4 space-y-4">
        {itemsBottom.map(({ icon, label, to }) => (
          <SidebarItem
            key={label}
            icon={icon}
            label={label}
            to={to}
            collapsed={collapsed}
          />
        ))}
      </div>
    </aside>
  );
};

const SidebarItem = ({ icon, label, to, collapsed }: SidebarItemProps) => {
  const { pathname } = useLocation();
  const isActive = pathname === to;

  // Conditionally style icon
  const styledIcon = React.isValidElement(icon)
    ? React.cloneElement(icon as React.ReactElement<any>, {
        className: isActive
          ? "text-primary-500"
          : "text-grey-900 transition-colors duration-300 group-hover:text-primary-500",
      })
    : icon;

  return (
    <Link
      to={to}
      className={`
        group flex items-center px-3 py-2 transition-all duration-300 
        border rounded-[100px]
        ${collapsed ? "justify-center" : "gap-3"}
        ${isActive
          ? "bg-primary-50 border-primary-500 text-primary-500"
          : "border-white text-grey-900 hover:text-primary-500 hover:bg-primary-50 hover:border-primary-500"}
      `}
    >
      <span className="flex-shrink-0 transition-colors duration-300">
        {styledIcon}
      </span>

      {!collapsed && (
        <span
          className={`whitespace-nowrap text-sm sm:text-base font-normal transition-colors duration-300 ${isActive ? "text-primary-500" : "group-hover:text-primary-500"
            }`}
        >
          {label}
        </span>
      )}
    </Link>
  );
};



export default Sidebar;
