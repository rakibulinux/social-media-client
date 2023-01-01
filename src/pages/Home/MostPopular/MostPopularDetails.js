import React from "react";
import { Link } from "react-router-dom";
import Comments from "../../../components/Comments";
import PrimaryButton from "../../../components/PrimaryButton";

const MostPopularDetails = ({
  post,
  handleReactionUpdate,
  increaseReaction,
}) => {
  const { _id, name, postDetails, picture, photoURL, publishedDate, reaction } =
    post;
  return (
    <div className="card bg-base-100 shadow-xl p-3 my-5">
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
        <PrimaryButton classes="p-2 b rounded-xl">
          <Link to={`/posts/${_id}`}>Details</Link>
        </PrimaryButton>
      </div>
      <figure>
        <img className="" src={picture} alt="Shoes" />
      </figure>

      <div className="flex gap-4 my-4">
        <button
          onClick={() => {
            increaseReaction();
            handleReactionUpdate(_id);
          }}
          className="btn bg-blue-500 hover:bg-blue-700 border-none"
        >
          <span className="mr-2">{reaction}</span> Like
        </button>
        <button className="btn bg-pink-500 hover:bg-pink-700 border-none">
          Love
        </button>
        <button className="btn bg-cyan-500 hover:bg-cyan-700 border-none">
          Care
        </button>
      </div>
      <Comments _id={_id} />
    </div>
  );
};

export default MostPopularDetails;
