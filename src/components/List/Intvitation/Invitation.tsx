import { useState } from "react";
import { decodeToken } from "../../../api";
import { SwitchButton } from "../../Button/SwitchButton";
import InvitationSender from "./InvitationSender";
import InvitaionReceiver from "./InvitaionReceiver";

const Invitation = () => {
  const user_id = decodeToken()?.sub2;
  const switchValue = ["Request", "Confirmation"];
  const [status, setStatus] = useState<string>("Request");
  const switchList = [
    {
      status: "Request",
      component: <InvitationSender user_id={user_id || ""} />,
    },
    {
      status: "Confirmation",
      component: <InvitaionReceiver user_id={user_id || ""} />,
    },
  ];

  return (
    <div>
      {
        <div className="mb-10">
          <SwitchButton
            background={{
              target:
                "border-b-2 font-bold border-b-blue-500 rounded-none relative bottom-1 ",
              untarget: "border-b border-b-stone-400 rounded-none ",
            }}
            firstButton="Request"
            setStatus={setStatus}
            text={{ target: "text-blue-500", untarget: "text-stone-400" }}
            value={switchValue}
          />
        </div>
      }
      {switchList.find((e) => e.status === status)?.component || ""}
    </div>
  );
};

export default Invitation;
