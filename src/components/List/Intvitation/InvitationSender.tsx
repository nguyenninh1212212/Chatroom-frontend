import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getInvitationSender } from "../../../api/friends";
import CardInvitation from "../../Card/CardInvitation";

const InvitationSender = ({ user_id }: { user_id: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["intitaion sendor", user_id],
    queryFn: () => getInvitationSender(user_id || ""),
    enabled: !!user_id,
    retry: false,
  });
  return (
    <div className="mt-6">
      {isLoading
        ? "Loading..."
        : data?.data.map((e, _i) => <CardInvitation data={e} key={_i} />)}
    </div>
  );
};

export default InvitationSender;
