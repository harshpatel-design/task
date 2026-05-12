const EducationCard = ({ year, university, degree, description }) => {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-3">
        <p className="text-[#334869] text-[12px]">{year}</p>
      </div>

      <div className="col-span-9 flex flex-col gap-2">
        <div className="flex gap-2">
          <span className="h-[10px] min-w-[10px] rounded-full bg-slate-300 mt-1"></span>

          <div className="flex flex-col gap-[3px]">
            <p className="text-[#393939] font-normal text-[14px]">
              {university}
            </p>

            <h3 className="text-[#393939] font-[700] text-[11px]">{degree}</h3>

            <p className="text-[#747D8C] font-normal text-[11px]">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationCard;
