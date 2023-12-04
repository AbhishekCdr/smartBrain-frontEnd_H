import { Link, Outlet } from "react-router-dom";
import { LuUser } from "react-icons/lu";
import { useContext } from "react";
import { GeneralContext } from "../contexts/generalContext";

import Logo from "../Components/Logo";
import Particle from "../Components/Particle";

const Navigation = () => {
  const { isSigned, setIsSigned, loadUser, setLoadUser, setImageResult } =
    useContext(GeneralContext);

  const removeImgHandler = () => {
    setImageResult("");
  };

  const signoutUser = () => {
    setIsSigned(false);
    removeImgHandler();
    setLoadUser({
      id: 0,
      name: "Guest",
      email: "",
      entries: 0,
      joined: "",
    });
  };
  return (
    <>
      <Particle />
      <header>
        <nav className="flex justify-end items-center max-container py-5 mt-2 max-w-5xl">
          <Link to="/" className=" text-lg text-gray-100 ">
            <p className="flex items-center pr-8 text-lg hover:text-gray-300 ">
              {" "}
              <LuUser className="mr-2" />
              {isSigned ? loadUser.name : "Guest"}
            </p>
          </Link>
          {isSigned ? (
            <a
              onClick={signoutUser}
              className="px-4 text-lg text-gray-100 hover:text-gray-300 cursor-pointer"
            >
              Sign Out
            </a>
          ) : (
            <>
              <Link
                to="/signin"
                className="px-4 text-lg text-gray-100 hover:text-gray-300"
                onClick={removeImgHandler}
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="px-4 text-lg text-gray-100 hover:text-gray-300"
                onClick={removeImgHandler}
              >
                Rigster
              </Link>
            </>
          )}
        </nav>

        <Logo />
      </header>
      <Outlet />
    </>
  );
};

export default Navigation;
