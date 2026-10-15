interface LogoProps {
  size?: "sm" | "lg";
}

const SIZES = {
  sm: { icon: 22, text: "text-xl" },
  lg: { icon: 32, text: "text-3xl" },
};

const Logo = ({ size = "sm" }: LogoProps) => {
  const { icon, text } = SIZES[size];

  return (
    <div className="flex items-center gap-2">
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M4 18V9l8-5 8 5v9"
          stroke="#34d399"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 18v-6h6v6"
          stroke="#34d399"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className={`${text} text-white tracking-wider font-bold uppercase select-none`}>
        FISC
      </span>
    </div>
  );
};

export default Logo;
