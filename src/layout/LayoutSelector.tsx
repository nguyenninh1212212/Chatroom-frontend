import React from "react";

interface LayoutSelectorProps {
  children: React.ReactNode;
}

const LayoutSelector: React.FC<LayoutSelectorProps> = ({ children }) => {
  return <>{children}</>;
};

export default React.memo(LayoutSelector);
