export const FancyButton = ({text}) => {
  return (
    <button
      className="
        relative px-6 py-3 rounded-[15px] font-extrabold text-[17px] text-emerald-50 hover:text-emerald-800 
        bg-emerald-700 hover:shadow-[0_8px_10px_rgba(0,0,0,0.2)] 
        transition-all duration-300 overflow-hidden group
      "
    >
      <span
        className="relative z-10"
      >
        {text}
      </span>

      {/* Background overlay (acts like ::before) */}
      <span
        className="
          absolute left-0 top-0 h-full w-0 bg-emerald-200 rounded-[15px] 
          shadow-[0_6px_16px_rgba(0,0,0,0.25)]
          transition-all duration-300 group-hover:w-full
        "
      ></span>
    </button>
  );
};
