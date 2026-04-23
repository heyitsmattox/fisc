import { useState } from "react";
import { Link } from "react-router";
import UserSessionBtn from "../ui/UserSessionBtn";




interface NavbarProps {
  fiscImageLogo?: string;
  showFiscImageLogo: boolean;
  navbarMenuIcon?: string;
  showNavbarMenuIcon: boolean;
}

const Navbar = ({
  fiscImageLogo = "src/assets/logo.png",
  navbarMenuIcon = "fa-solid fa-bars text-slate-400 text-2xl cursor-pointer",
  showNavbarMenuIcon = true,
}: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);


  const handleMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };



return (
    <nav className="w-full px-4 py-2 relative">
      {/* 1. The Outer Container (Constraints the width of the navbar content) */}
      <div className="max-w-7xl mx-auto min-h-[64px] relative">
        
        {/* 2. THE MASTER WRAPPER (This fixes the horizontal alignment) */}
        <div className="flex items-center justify-between w-full min-h-[64px]">
          
          {/* LOGO SECTION */}
          <div className="flex items-center z-10">
            <div className="flex items-center relative">
              <img
                src={fiscImageLogo}
                className="w-[262px] h-auto object-contain block"
                alt="Logo"
              />
              <span
                className="
                  text-2xl text-white tracking-wider 
                  -ml-[122px] select-none
                  font-bold uppercase font-inter
                  /* This nudge ensures the text baseline matches the logo icon */
                  transform translate-y-[2px]
                "
              >
                FISC
              </span>
            </div>
          </div>

          {/* CENTER NAVIGATION LINKS (Desktop) */}
          <div 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-8 text-sky-300 z-0"
          >
            <Link 
              to="/dashboard" 
              className={`text-xs font-bold uppercase tracking-widest transition-colors py-1 border-b-2 ${
                location.pathname === '/dashboard' ? 'text-white border-emerald-400' : 'border-transparent hover:text-white hover:border-emerald-400'
              }`}
            >
              Dashboard
            </Link>
            <Link 
              to="/inventory" 
              className={`text-xs font-bold uppercase tracking-widest transition-colors py-1 border-b-2 ${
                location.pathname === '/inventory' ? 'text-white border-emerald-400' : 'border-transparent hover:text-white hover:border-emerald-400'
              }`}
            >
              Inventory
            </Link>
            <Link 
              to="/reports" 
              className={`text-xs font-bold uppercase tracking-widest transition-colors py-1 border-b-2 ${
                location.pathname === '/reports' ? 'text-white border-emerald-400' : 'border-transparent hover:text-white hover:border-emerald-400'
              }`}
            >
              Reports
            </Link>
          </div>

          {/* HAMBURGER TRIGGER SECTION */}
          <div className="flex items-center z-10">
            {showNavbarMenuIcon && (
              <button
                onClick={handleMenuOpen}
                className="flex items-center justify-center p-2 transition-colors hover:bg-zinc-800 rounded-md group"
                aria-label="Open Menu"
              >
                <i className={`${navbarMenuIcon} text-zinc-400 group-hover:text-white text-2xl`}></i>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3. SIDE MENU DRAWER & OVERLAY */}
      {isMenuOpen && (
        <>
          {/* Background Overlay */}
          <div
            className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm transition-opacity duration-300"
            onClick={handleMenuOpen}
          />

          {/* Drawer Panel */}
          <div
            className={`
              fixed top-0 right-0 h-full w-72 bg-[#161B22] border-l border-zinc-800 shadow-2xl z-50
              transform transition-transform duration-300 ease-in-out
              ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
            `}
          >
            <div className="flex justify-between items-center p-6 border-b border-zinc-800">
              <span className="text-zinc-400 font-bold tracking-tighter uppercase text-sm">
                fisc
              </span>
              <button
                onClick={handleMenuOpen}
                className="text-2xl text-zinc-500 hover:text-rose-400 transition-colors"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            {/* Side Menu Navigation */}
            <nav className="p-8 " >
              <ul className="flex flex-col gap-8 text-xl font-semibold tracking-tight text-zinc-300">
                <li className="hover:text-emerald-400 transition-colors">
                  <i className="pr-2 fa-solid fa-chart-line"></i>
                  <Link to="/dashboard" onClick={handleMenuOpen}>Dashboard</Link>
                </li>
                <li className="hover:text-emerald-400 transition-colors">
                  <i className="pr-2 fa-regular fa-clipboard"></i>
                  <Link to="/inventory" onClick={handleMenuOpen}>Inventory</Link>
                </li>
                <li className="hover:text-emerald-400 transition-colors">
                  <i className="pr-2 fa-regular fa-user"></i>
                  <Link to="/portfolio" onClick={handleMenuOpen}>Portfolio</Link>
                </li>
                <li className="hover:text-emerald-400 transition-colors">
                  <i className="pr-2 fa-solid fa-gear"></i>
                  <Link to="/settings" onClick={handleMenuOpen}>Settings</Link>
                </li>
                 <li >
                  <UserSessionBtn />
                </li>
              </ul>
            </nav>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
