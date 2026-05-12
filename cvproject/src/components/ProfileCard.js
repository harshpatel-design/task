const ProfileCard = ({ logo, name, role }) => {
  return (
    <ul className="flex flex-col gap-4">
      <li className="logo">
        <img src={logo} alt={name} className="w-full h-full rounded-full" />
      </li>

      <li className="w-full">
        <div className="w-full flex flex-col gap-1">
          <h1 className="text-3xl w-full font-bold">{name}</h1>

          <p className="text-md w-full text-gray-400">{role}</p>
        </div>
      </li>
    </ul>
  );
};

export default ProfileCard;
