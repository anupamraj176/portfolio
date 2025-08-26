export const FancyButton = ({ link, text, Icon }) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <button
        className="
          relative px-4 py-2 text-sm 
          sm:px-6 sm:py-3 sm:text-base md:text-lg 
          rounded-[15px] font-extrabold 
          text-emerald-50 hover:text-emerald-800 
          bg-emerald-700 hover:shadow-[0_8px_10px_rgba(0,0,0,0.2)] 
          transition-all duration-300 overflow-hidden group
        "
      >
        <span className="relative z-10 flex gap-2 items-center">
          {text}
          {Icon && <Icon />}
        </span>
        <span
          className="
            absolute left-0 top-0 h-full w-0 bg-emerald-200 rounded-[15px] 
            shadow-[0_6px_16px_rgba(0,0,0,0.25)]
            transition-all duration-300 group-hover:w-full
          "
        ></span>
      </button>
    </a>
  );
};
