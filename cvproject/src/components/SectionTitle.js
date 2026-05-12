const SectionTitle = ({ title }) => {
  return (
    <>
      <h1 className="font-bold text-[16px] w-fit text-[#334869]">
        {title}
      </h1>
      <div className="w-3/5 border-b-[3px] border-[#334869] mt-1"></div>
    </>
  );
};

export default SectionTitle;