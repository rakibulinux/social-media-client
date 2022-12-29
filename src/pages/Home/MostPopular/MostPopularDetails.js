import React from "react";
import PrimaryButton from "../../../components/PrimaryButton";

const MostPopularDetails = ({ post }) => {
  const { name, postDetails, picture, photoURL, publishedDate } = post;
  return (
    <div className="card bg-base-100 shadow-xl">
      {/* <div className="flex justify-end px-4 pt-4"> */}
      <div className="flex gap-2 items-center">
        <img
          className="w-11 h-11 rounded-full shadow-lg"
          src={photoURL}
          alt="Bonnie imag"
        />
        <div>
          <h5 className="mb-1 font-bold text-gray-900 dark:text-white">
            {name}
          </h5>
          <p>{publishedDate}</p>
        </div>
      </div>

      <div className="">
        <p>{postDetails}</p>
      </div>
      <div className="card-actions flex justify-end pr-4 pb-3">
        <PrimaryButton classes="p-2 b rounded-xl">Details</PrimaryButton>
      </div>
      <figure>
        <img className="" src={picture} alt="Shoes" />
      </figure>
    </div>
  );
};

export default MostPopularDetails;
