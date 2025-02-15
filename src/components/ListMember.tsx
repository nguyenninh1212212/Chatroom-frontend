import React from "react";
import CardMember from "./Card/CardMember";
import { ListMembers } from "../type/member";

const ListMember: React.FC<ListMembers> = ({ data }) => {
  return (
    <>
      {data ? (
        data.map((e) => <CardMember data={e} />)
      ) : (
        <center>
          <p>Loading</p>
        </center>
      )}
    </>
  );
};

export default ListMember;
