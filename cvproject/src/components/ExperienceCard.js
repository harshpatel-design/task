const ExperienceCard = ({ logo, company, role, duration, description }) => {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-3 flex justify-center">
        <div className="text-[#334869] w-[35px] h-[35px] rounded-sm bg-[#E8E8E8] flex items-center justify-center p-1">
          <img
            src={logo}
            alt={company}
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <div className="col-span-9 flex flex-col gap-2">
        <div className="flex gap-2">
          <span className="h-[10px] min-w-[10px] rounded-full bg-slate-300 mt-1"></span>

          <div className="flex flex-col gap-[3px]">
            <p className="text-[#393939] font-[700] text-[14px]">{company}</p>

            <h3 className="text-[#393939] font-[500] text-[11px]">
              {role} | {duration}
            </h3>

            <p className="text-[#747D8C] font-normal text-[11px]">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
