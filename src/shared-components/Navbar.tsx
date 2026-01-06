
interface NavbarProps {
  title: string; 
  description?: string;
}

const Navbar = ({ title = "Fisc", description = "Default description" }: NavbarProps) => {
  return (
    <div className=" rounded-lg p-4">
      {/* Top Row: Title and Icon */}
      <div className="flex items-center justify-between">
        {/* Invisible spacer to keep the title perfectly centered */}
        <div className="w-10"></div> 

        <h1 className="text-4xl font-bold text-blue-500">{title}</h1>

        {/* The Icon with padding-right (pr-4) */}
        <div className="w-8 flex justify-end pr-2">
          <i className="fa-solid fa-bars text-red-500 text-2xl cursor-pointer"></i>
        </div>
      </div>

      {/* Description below */}
      <div className="text-center mt-2">
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default Navbar;