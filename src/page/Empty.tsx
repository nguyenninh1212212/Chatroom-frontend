import React from "react";
import { img } from "../constanst";

const Empty = () => {
  return (
    <div className="h-full w-full bg-primary_100 flex justify-center items-center rounded-lg">
      <img src={img.theme} alt="" className="w-1/3  rounded-lg" />
    </div>
  );
};

export default Empty;
