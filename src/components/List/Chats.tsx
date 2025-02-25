import { useMutation, useQuery } from "@tanstack/react-query";
import React, { use, useMemo, useState } from "react";
import { decodeToken } from "../../api";
import { createRoom, getRooms } from "../../api/room";
import CardRoom from "../Card/CardRoom";
import { useParams } from "react-router-dom";
import { create } from "domain";

interface payLoad {
  showDiagram: boolean;
  setShowDiagram: React.Dispatch<React.SetStateAction<boolean>>;
}

const Chats: React.FC<payLoad> = ({ showDiagram, setShowDiagram }) => {
  const { id } = useParams();
  const user_id = decodeToken()?.sub2;
  const [page, setPage] = useState<number>(1);

  const { data, isLoading } = useQuery({
    queryKey: ["rooms", id || user_id],
    queryFn: () => (user_id ? getRooms(user_id, 10, 1) : Promise.resolve(null)),
    enabled: !!user_id,
  });

  const memoizedRooms = useMemo(() => data?.data?.data || [], [data]);
  if (!data) return <p>No data</p>;

  return (
    <>
      {isLoading ? (
        "is Loading"
      ) : (
        <>
          <div className="flex justify-end relative bottom-5">
            <button
              className="text-blue-500 "
              onClick={() => setShowDiagram(!showDiagram)}
            >
              Create new room +
            </button>
          </div>
          {memoizedRooms.map((e, _i) => (
            <CardRoom key={_i} data={e} target={id || ""} />
          ))}
        </>
      )}
    </>
  );
};

export default Chats;
