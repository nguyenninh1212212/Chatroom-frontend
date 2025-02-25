import { useQuery } from "@tanstack/react-query";
import { getInvitationReceiver } from "../../../api/friends";
import CardInvitation from "../../Card/CardInvitation";

const InvitaionReceiver = ({ user_id }: { user_id: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["InvitaionReceiver", user_id],
    queryFn: () => getInvitationReceiver(user_id),
  });

  return (
    <div className="mt-6">
      {isLoading
        ? "Loading..."
        : data?.data.map((e, _i) => <CardInvitation data={e} key={_i} />)}
    </div>
  );
};

export default InvitaionReceiver;
