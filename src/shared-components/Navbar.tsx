import React, { useState } from "react";
import { Link } from "react-router";

interface NavbarProps {
  fiscImageLogo?: string;
  showFiscImageLogo: boolean
  navbarMenuIcon?: string;
  showNavbarMenuIcon: boolean;
}

const Navbar = ({
  fiscImageLogo = "src/assets/fiscLogo.png",
  showFiscImageLogo = true,
  navbarMenuIcon = "fa-solid fa-bars text-slate-400 text-2xl cursor-pointer",
  showNavbarMenuIcon = true

}: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className=" rounded-lg p-4">
      {/* Parent Div Tag */}
      <div className="flex items-center justify-between">
        <div className="w-10"></div>
        <div className="flex items-center">
          {
            showFiscImageLogo && (
              <img src={fiscImageLogo} className="w-32" />
            )
          }
          </div>
        <div className="w-8 flex justify-end pr-2">
          {showNavbarMenuIcon && (
            <button onClick={handleMenuOpen}>
              <i
                className={`${navbarMenuIcon} text-slate-500 hover:text-slate-700 text-2xl cursor-pointer`}
              ></i>
            </button>
          )}
          {isMenuOpen && (
            <div className="relative">
              {/* The Side Menu Drawer */}
              <div
                className={`
      fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-50
      transform transition-transform duration-300 ease-in-out
      ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
    `}
              >
                {/* Close Button */}
                <div className="flex justify-end p-4">
                  <button
                    onClick={handleMenuOpen}
                    className="text-2xl text-slate-500 hover:text-red-500"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
                <ul className="flex flex-col gap-6 p-8 text-lg font-medium text-slate-700">
                  <li className="hover:text-blue-500 transition-colors">
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li className="hover:text-blue-500 transition-colors">
                    <Link to="/inventory">Inventory</Link>
                  </li>
                  <li className="hover:text-blue-500 transition-colors">
                    <Link to="/portfolio">Portfolio</Link>
                  </li>
                  <li className="hover:text-blue-500 transition-colors">
                    <Link to="/settings">Settings</Link>
                  </li>
                </ul>
              </div>

              {/* Background Overlay*/}
              {isMenuOpen && (
                <div
                  className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity"
                  onClick={handleMenuOpen}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
