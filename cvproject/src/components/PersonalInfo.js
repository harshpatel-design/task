const PersonalInfo = ({ items }) => {
  return (
    <ul className="flex flex-col gap-2 mt-4">
      
      {items.map((item, index) => (
        <li
          key={index}
          className="bg-[#E5E5E5] p-2 pt-1 pb-1 rounded-lg"
        >
          <h2 className="text-[#334869] font-medium text-[12px]">
            {item}
          </h2>
        </li>
      ))}

    </ul>
  );
};

export default PersonalInfo;