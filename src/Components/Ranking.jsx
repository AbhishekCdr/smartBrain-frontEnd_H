import { useContext } from "react";
import { GeneralContext } from "../contexts/generalContext";

const Ranking = () => {
  const { loadUser } = useContext(GeneralContext);
  return (
    <div className="text-white mb-8">
      <p className="text-3xl mb-3">{loadUser.name}, Your current rank is...</p>
      <p className="text-4xl text-gray-200">#{loadUser.entries}</p>
    </div>
  );
};

export default Ranking;
