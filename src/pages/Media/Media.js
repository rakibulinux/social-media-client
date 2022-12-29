import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Spinner from "../../components/Spinner";
import MediaShow from "./MediaShow";
import { toast } from "react-hot-toast";
const Media = () => {
  const {
    data: posts,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/posts`);
      const data = res.json();
      return data;
    },
  });
  const [newReaction, setNewReaction] = useState(0);
  const increaseReaction = (reaction) => setNewReaction(newReaction + reaction);

  const handleReactionUpdate = (id) => {
    fetch(`${process.env.REACT_APP_API_URL}/update-post/${id}`, {
      method: "PATCH",
      headers: {
        authorization: `bearer ${localStorage.getItem("socialUserToken")}`,
      },
      body: JSON.stringify("id"),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Love react palce");
          refetch();
        }
      });
  };
  console.log(newReaction);
  console.log(posts);
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="grid grid-flow-row gap-5 w-7/12 mx-auto  my-5">
      {posts?.map((post) => (
        <MediaShow
          key={post._id}
          post={post}
          increaseReaction={increaseReaction}
          newReaction={newReaction}
          handleReactionUpdate={handleReactionUpdate}
        />
      ))}
    </div>
  );
};

export default Media;
