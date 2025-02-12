import React from "react";
import CardMember from "./Card/CardMember";
import { useQuery } from "@tanstack/react-query";
import { getMembers } from "../api/member";

const ListMember = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["member"],
    queryFn: () => getMembers("c157e0a6-297d-4f81-a93d-910d9074f02b"),
  });

  console.log(data);

  return (
    <>
      {isLoading ? (
        <center>
          <p>Loading</p>
        </center>
      ) : (
        data?.data.map((e, _i) => <CardMember key={_i} data={e} />)
      )}
    </>
  );
};

export default ListMember;
