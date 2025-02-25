import React from "react";

interface payLoad {
  showgram: boolean;
  setShowgram: React.Dispatch<React.SetStateAction<boolean>>;
  component: React.ReactNode;
}

const DiagramLayout: React.FC<payLoad> = ({
  showgram,
  setShowgram,
  component,
}) => {
  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center transition-all ${
        showgram ? "visible" : "invisible"
      }`}
      onClick={() => setShowgram(!showgram)}
    >
      <div
        className="bg-white h-5/6 w-2/5 p-4 rounded-lg  border border-stone-500 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {component}
      </div>
    </div>
  );
};

export default DiagramLayout;
