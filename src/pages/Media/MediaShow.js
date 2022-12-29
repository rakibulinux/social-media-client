import React from "react";
import PrimaryButton from "../../components/PrimaryButton";

const MediaShow = ({ post }) => {
  const { name, postDetails, picture, photoURL } = post;
  return (
    <div className="card bg-base-100 shadow-xl">
      {/* <div class="flex justify-end px-4 pt-4"> */}
      <div class="flex flex-col">
        <img
          class="w-10 h-10 mb-3 rounded-full shadow-lg"
          src={photoURL}
          alt="Bonnie imag"
        />
        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {name}
        </h5>
      </div>

      <div className="">
        <p>{postDetails}</p>
      </div>
      <div className="card-actions flex justify-end pr-4">
        <PrimaryButton classes="p-2 rounded-xl">Details</PrimaryButton>
      </div>
      <figure>
        <img className="w-52" src={picture} alt="Shoes" />
      </figure>
    </div>
  );
};

export default MediaShow;
