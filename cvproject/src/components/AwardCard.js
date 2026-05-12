const AwardCard = ({ title, year, description }) => {
  return (
    <ul className="flex flex-col gap-3 pl-1 mt-5">
      <li>
        <p className="text-[#ACB5C3] flex justify-between text-[14px]">
          {title}

          <span>{year}</span>
        </p>
      </li>

      <li>
        <p className="text-[#ACB5C3] text-[12px]">{description}</p>
      </li>
    </ul>
  );
};

export default AwardCard;
