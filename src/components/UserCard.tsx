import { useRouter } from "next/navigation";
import React from "react";
import { FaUserCircle } from "react-icons/fa";

interface User {
  matricula: string;
  nome: string;
  email: string;
  foto: string;
}

const UserCard: React.FC<User> = ({ matricula, nome, email, foto }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/pages/userinformations");
  };

  return (
    <div className="max-w-xs bg-white rounded-lg overflow-hidden shadow-md transition-all hover:shadow-lg">
      <div className="px-4 py-2">
        <div className="flex justify-center">
          {/* {foto ? (
            <img
              className="w-32 h-32 object-cover rounded-full border-2 cursor-pointer border-blue-500"
              src={foto}
              alt={`Foto de ${nome}`}
              onClick={handleClick}
            />
          ) : ( */}
            <FaUserCircle
              onClick={handleClick}
              className="cursor-pointer text-gray-500 w-32 h-32"
              aria-label="User profile picture"
            />
          {/* )} */}
        </div>
        <div className="mt-4 mb-4 text-center">
          <p className="text-lg font-semibold text-gray-800">{nome}</p>
          <p className="text-sm text-gray-600">Matrícula: {matricula}</p>
          <p className="text-sm text-gray-600">Email: {email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
