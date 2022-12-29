import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import PrimaryButton from "../../../components/PrimaryButton";
import { FaPenNib } from "react-icons/fa";
import { AuthContext } from "../../../contexts/AuthProvider";
import Spinner from "../../../components/Spinner";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
const AddPost = () => {
  const { user, isLoading } = useContext(AuthContext);
  const imageHostKey = process.env.REACT_APP_IMG_BB_KEY;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const navigate = useNavigate();
  const date = format(new Date(), "PP");
  const handleAddPost = (data) => {
    console.log(data);
    const postDetails = data.postDetails;
    // console.log(postDetails);
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          toast.success("Image upload success");
          const post = {
            name: user?.displayName,
            photoURL: user?.photoURL,
            email: user?.email,
            postDetails,
            picture: imgData.data.url,
            publishedDate: date,
          };
          // Update in database
          fetch(`${process.env.REACT_APP_API_URL}/add-post`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `bearer ${localStorage.getItem(
                "socialUserToken"
              )}`,
            },
            body: JSON.stringify(post),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              toast.success(`${user?.displayName} added a new post`);
              //   navigate("/");
            });
        }
      });
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <form
      onSubmit={handleSubmit(handleAddPost)}
      className="flex flex-col gap-4 items-center"
    >
      <div className="flex items-center gap-2">
        <>
          <FaPenNib className="bg-gray-200 rounded-full w-10 h-10 p-2" />
          Create Post
        </>
      </div>
      <>
        <figure className="avatar right-[18rem] top-14 w-8 h-8">
          <img
            src={user?.photoURL}
            alt="icon"
            className="shadow-sm rounded-full w-6 h-6"
          />
        </figure>
        <textarea
          {...register("postDetails", { require: true })}
          type="text"
          name="postDetails"
          id="post"
          cols="30"
          rows="5"
          placeholder="What's on your mind?"
          className="w-6/12 rounded-xl bg-gray-200 p-4 pl-10"
        ></textarea>
      </>
      <div>
        <label htmlFor="image" className="block mb-2 text-sm">
          Add An Image:
        </label>
        <input
          {...register("image", { required: true })}
          type="file"
          id="image"
          name="image"
          accept="image/*"
          required
        />
      </div>
      <PrimaryButton
        type="submit"
        classes="w-2/12 px-8 py-3 font-semibold rounded-md bg-gray-900 hover:bg-gray-700 hover:text-white text-gray-100 mb-4"
      >
        Add Post
      </PrimaryButton>
    </form>
  );
};

export default AddPost;
