import React, { useState } from "react";
import { IInvitaion } from "../../type/friends";
import {
  getFirstLetterOfLastWord,
  getTailwindBgColor,
} from "../../util/BgColorAlpha";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { respondInvitationRequest } from "../../api/friends";

interface payload {
  data: IInvitaion;
}

const CardInvitation: React.FC<payload> = ({ data }) => {
  const { isMe, receiver, sender, id } = data;
  const [appect, setAppect] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (appect: boolean) => respondInvitationRequest(id, appect),
    onSuccess: () => {
      alert(appect ? "Success!!" : "Rejected");
      queryClient.invalidateQueries({ queryKey: ["InvitaionReceiver"] });
    },
    onError: () => {
      alert("Fail!!");
    },
  });

  const respondClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;
    const isAppected = name === "confirm";
    setAppect(isAppected);
    mutation.mutate(isAppected);
  };

  return (
    <div>
      <div className="flex justify-between mt-3">
        <div className="flex gap-2">
          <div
            className={`${getTailwindBgColor(
              isMe ? receiver.fullname : sender.fullname
            )} w-12 h-12 rounded-full items-center justify-center flex`}
          >
            <p className="text-xl">
              {" "}
              {getFirstLetterOfLastWord(
                isMe ? receiver.fullname : sender.fullname
              )}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="font-bold line-clamp-1 text-left text-black">
              {isMe ? receiver.fullname : sender.fullname}
            </p>
            {isMe ? (
              ""
            ) : (
              <p className="text-xs line-clamp-1 text-left text-stone-400">
                Friend request sent.
              </p>
            )}
          </div>
        </div>

        <div>
          {isMe ? (
            <>
              <button
                className=" px-6 py-2 rounded-lg bg-red-400"
                name="reject"
                onClick={respondClick}
              >
                Delete
              </button>
            </>
          ) : (
            <div className="flex gap-2">
              <button
                className=" px-1 py-2 rounded-lg bg-blue-500"
                name="confirm"
                onClick={respondClick}
              >
                Confirm
              </button>
              <button
                className=" px-2 py-2 rounded-lg bg-red-400"
                onClick={respondClick}
                name="reject"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardInvitation;
