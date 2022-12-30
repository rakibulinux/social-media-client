import { useQuery } from "@tanstack/react-query";
import React from "react";
import Spinner from "../../../components/Spinner";
import MostPopularDetails from "./MostPopularDetails";

const MostPopular = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/posts`);
      const data = res.json();
      return data;
    },
  });
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="grid grid-flow-row gap-5 w-7/12 mx-auto">
      {posts?.map((post) => (
        <MostPopularDetails key={post._id} post={post} />
      ))}
    </div>
  );
};

export default MostPopular;
