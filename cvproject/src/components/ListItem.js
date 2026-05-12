const ListItem = ({ items }) => {
  return (
    <ul className="flex flex-col gap-1 mt-4 pl-5 list-disc">
      {items.map((item, index) => (
        <li key={index}>
          <p className="text-[#ACB5C3] text-[12px]">
            {item}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default ListItem;