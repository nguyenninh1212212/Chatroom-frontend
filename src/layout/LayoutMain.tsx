import React, { ReactNode } from "react";
import ListRooms from "../components/ListRoom";
// import InfoRoom from "../components/InfoRoom";

interface LayoutProps {
  children: ReactNode;
}

const LayoutMain: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex justify-around gap-3 p-6 bg-stone-300 h-screen text-white ">
      <ListRooms />
      {children}
    </div>
  );
};

export default LayoutMain;
