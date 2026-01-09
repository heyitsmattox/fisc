interface NavbarProps {
  img?: string;
  menuIcon?: string
  showIcon: boolean
}

const Navbar = ({
  img = "src/assets/fiscLogo.png", 
  menuIcon="fa-solid fa-bars text-slate-400 text-2xl cursor-pointer",
  showIcon = true
}: NavbarProps) => {
  return (
    <div className=" rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="w-10"></div>
          <div className="flex items-center">
            <img 
            src={img}
            className="w-32"
            />
          </div> 
        <div className="w-8 flex justify-end pr-2">
          {showIcon && (
            <i className={`${menuIcon} text-slate-400 text-2xl cursor-pointer`}></i>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;