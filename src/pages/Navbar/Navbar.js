import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";

const Navbar = () => {
  const { user, logoutUserAccount } = useContext(AuthContext);
  const manueItems = (
    <>
      <li>
        <Link to="/home">Home</Link>
      </li>
      <li>
        <Link to="/media">Media</Link>
      </li>
      <li>
        <Link to="/messages">Messages</Link>
      </li>
      <li>
        <Link to="/friends">Friends</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
    </>
  );
  const logOut = () => {
    logoutUserAccount()
      .then((res) => {
        toast.success(res);
      })
      .catch((err) => console.log(err));
  };
  const loginOrProfile = (
    <>
      {user ? (
        <>
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src={user?.photoURL} alt="profile img" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/profile" className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
            <li>
              <button onClick={logOut}>Logout</button>
            </li>
          </ul>
        </>
      ) : (
        <ul className="flex gap-3">
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {manueItems}
          </ul>
        </div>
        <Link to="/" className="normal-case text-3xl font-bold">
          Social
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{manueItems}</ul>
      </div>
      <div className="navbar-end">
        <div className="form-control sm:hidden md:block">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-7/12"
          />
        </div>
        <div className="dropdown dropdown-end">{loginOrProfile}</div>
      </div>
    </div>
  );
};

export default Navbar;
