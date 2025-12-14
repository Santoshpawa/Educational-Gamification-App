import { Link } from "react-router-dom";
import leetcode from "/leetcode.jpg";
import profile from "/profile.jpg";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { logout, setUser } from "../utils/userSlice";
import { baseAPI } from "../utils/backendAPI";



function Navbar() {
  const { user } = useSelector((state) => state.user);
  const [isDropDown, setDropDown] = useState(false);
  const dispatch = useDispatch()

  

    const toggleDropDown = () => {
    setDropDown((prev) => !prev);
  };

  const handleLogout = async () => {
    let response = await fetch(`${baseAPI}/api/user/logout`, {
      method: "GET",
      credentials: "include",
    });
     dispatch(logout());
    setDropDown(false);
    console.log("User after logout:", user);
  };

  return (
    <div className="w-full h-14 flex justify-center items-center bg-[#0a0706]">
      <div className="flex justify-center items-center font-sans text-2xl mr-auto ">
        <div>
          <img
            src={leetcode}
            alt="leetcode"
            className="mx-2 h-10 w-auto cursor-pointer hover:scale-110 transition duration-300"
          />
        </div>
        <div className="mx-2 px-2">
          <Link to="/" className="px-2 text-gray-500 hover:text-gray-400">
            About
          </Link>
        </div>
        <div className="mx-2 px-2">
          <Link
            to="/problem"
            className="px-2 text-gray-500 hover:text-gray-400"
          >
            Problem
          </Link>
        </div>
        <div className="mx-2 px-2">
          <Link
            to="/discuss"
            className="px-2 text-gray-500 hover:text-gray-400"
          >
            Discuss
          </Link>
        </div>
      </div>
      <div className="flex justify-center">
        {user ? (
          <>
            <img
              src={profile}
              alt="profile"
              className="w-8 h-8 rounded-full mx-5 cursor-pointer relative "
              onClick={toggleDropDown}
            />
            {isDropDown && (
              <div className="absolute right-10 top-16 flex flex-col transition duration-500 rounded-sm bg-[#0a0706] z-10">
                <Link
                  to="/profile"
                  onClick={toggleDropDown}
                  className="text-gray-500 hover:text-gray-400 mx-4"
                >
                  My Profile
                </Link>
                <Link
                  to="/"
                  onClick={handleLogout}
                  className="text-gray-500  hover:text-gray-400 mx-4 mb-2"
                >
                  Logout
                </Link>
              </div>
            )}
          </>
        ) : (
          <Link
            to="/user/signup"
            className="px-2 text-gray-500 hover:text-gray-400"
          >
            Signup/Login
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
