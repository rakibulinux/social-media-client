import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FaUserAlt } from "react-icons/fa";
import PrimaryButton from "../../components/PrimaryButton";
import { AuthContext } from "../../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
const About = () => {
  const { user } = useContext(AuthContext);
  const [getUser, setGetUser] = useState({});
  const navigate = useNavigate();
  const { _id, name, email, address, picture, university } = getUser;
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/user/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setGetUser(data));
  }, [user?.email]);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name,
      email,
      address,
      university,
    },
  });
  const onSubmit = (data) => {
    console.log(data);
    fetch(`${process.env.REACT_APP_API_URL}/updateAbout/${_id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("socialUserToken")}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success(`${user?.displayName} added a new post`);
        navigate("/");
      });
  };
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 my-4">
      <div className="flex flex-col items-center pb-10">
        {user ? (
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src={picture}
            alt="Bonnie imag"
          />
        ) : (
          <FaUserAlt />
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your Name</span>
            </label>
            <label className="input-group">
              <span className="bg-cyan-500">Name</span>
              <input
                {...register("name")}
                defaultValue={name}
                type="text"
                name="name"
                placeholder="Your Name"
                className="input input-bordered"
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your Email</span>
            </label>
            <label className="input-group">
              <span className="bg-cyan-500">Email</span>
              <input
                {...register("email")}
                defaultValue={email}
                readOnly
                disabled
                type="email"
                name="email"
                placeholder="info@youremail.com"
                className="input input-bordered"
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your Address</span>
            </label>
            <label className="input-group">
              <span className="bg-cyan-500">Address</span>
              <input
                {...register("address")}
                defaultValue={address}
                type="text"
                name="address"
                placeholder="Address"
                className="input input-bordered"
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your University</span>
            </label>
            <label className="input-group">
              <span className="bg-cyan-500">University</span>
              <input
                {...register("university")}
                defaultValue={university}
                type="text"
                name="university"
                placeholder="Your University"
                className="input input-bordered"
              />
            </label>
          </div>
          <PrimaryButton classes="py-2 rounded" type="submit">
            Save
          </PrimaryButton>
        </form>
      </div>
    </div>
  );
};

export default About;
