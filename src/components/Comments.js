import { format } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../contexts/AuthProvider";
import Comment from "./Comment";
import PrimaryButton from "./PrimaryButton";

const Comments = () => {
  const { user } = useContext(AuthContext);
  // const [getUser, setGetUser] = useState({});
  // const { _id, name, email, picture } = getUser;
  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_API_URL}/user/${user?.email}`)
  //     .then((res) => res.json())
  //     .then((data) => setGetUser(data));
  // }, [user?.email]);
  const date = format(new Date(), "PP");

  const { register, handleSubmit } = useForm({
    defaultValues: {
      date,
    },
  });
  const { data: comments } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const req = await fetch(`${process.env.REACT_APP_API_URL}/comments`);
      const data = await req.json();
      return data;
    },
  });
  console.log(comments);
  const onSubmit = (data) => {
    const commentInfo = {
      name: user?.displayName,
      email: user?.email,
      date,
      picture: user.photoURL,
      comment: data?.comment,
    };
    console.log(commentInfo);

    fetch(`${process.env.REACT_APP_API_URL}/comments`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("socialUserToken")}`,
      },
      body: JSON.stringify(commentInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success(`${user?.displayName} added a new comment`);
      });
  };
  return (
    <section className="bg-white dark:bg-gray-900 py-8 lg:py-16">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            Discussion (20)
          </h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
          <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              {...register("comment")}
              id="comment"
              rows="6"
              className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
              placeholder="Write a comment..."
              required
            ></textarea>
          </div>

          <PrimaryButton
            type="submit"
            classes="w-full px-8 py-3 font-semibold rounded-md bg-gray-900 hover:bg-gray-700 hover:text-white text-gray-100"
          >
            Post comment
          </PrimaryButton>
        </form>
        {comments &&
          comments.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))}
      </div>
    </section>
  );
};

export default Comments;
