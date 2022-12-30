import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import Comments from "../../components/Comments";
import PrimaryButton from "../../components/PrimaryButton";

const PostDetails = () => {
  const post = useLoaderData();
  const { _id, name, postDetails, picture, photoURL, publishedDate, reaction } =
    post;
  return (
    <div className="card bg-base-100 shadow-xl my-3 p-2">
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
        <Link to={`/posts/${_id}`}>
          <PrimaryButton classes="p-2 b rounded-xl">Details</PrimaryButton>
        </Link>
      </div>
      <figure>
        <img className="" src={picture} alt="Shoes" />
      </figure>

      <div className="flex gap-4 my-4">
        <button
          //   onClick={() => {
          //     increaseReaction(reaction);
          //     handleReactionUpdate(_id);
          //   }}
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
      <Comments />
    </div>
  );
};

export default PostDetails;
