import React from "react";

interface LayoutEmptyProps {
  children: React.ReactNode;
}
const LayoutEmpty: React.FC<LayoutEmptyProps> = ({ children }) => {
  return <>{children}</>;
};

export default LayoutEmpty;
