import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getFriends } from "../../api/friends";
import CardUserInfo from "../Card/CardUserInfo";

const Friends = ({ user_id }: { user_id: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["friends", user_id],
    queryFn: () => getFriends(user_id),
    
  });
  console.log("🚀 ~ Friends ~ data:", data);

  return (
    <>
      {isLoading
        ? "isLoading"
        : data?.data.map((e, _i) => <CardUserInfo data={e} key={_i} />)}
    </>
  );
};

export default Friends;
