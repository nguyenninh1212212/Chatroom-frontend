import React, { ReactNode } from "react";
import ListMember from "../components/ListRoom";
import InfoRoom from "../components/InfoRoom";

interface LayoutProps {
  children: ReactNode;
}
const LayoutMain: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex justify-around gap-3 p-6 bg-stone-300 h-screen text-white ">
      <ListMember />
      <div className="w-full overflow-hidden border border-gray-400 rounded-lg bg-white">
        {children}
      </div>
      <InfoRoom />
    </div>
  );
};

export default LayoutMain;
