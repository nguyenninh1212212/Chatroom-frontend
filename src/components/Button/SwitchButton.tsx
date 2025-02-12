import React, { useState } from "react";

interface SwitchButtonProps {
  firstButton: string;
  value: string[];
  text: {
    target: string;
    untarget: string;
  };
  background: {
    target: string;
    untarget: string;
  };
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}

export const SwitchButton = ({
  firstButton,
  value,
  background,
  text,
  setStatus,
}: SwitchButtonProps) => {
  const [type, setType] = useState(firstButton);

  const targetValue = (e: React.MouseEvent<HTMLButtonElement>) => {
    setType(e.currentTarget.value);
    setStatus(e.currentTarget.value);
  };

  return (
    <div className="flex gap-2 mt-3">
      {value.map((item, index) => (
        <button
          value={item}
          key={index}
          onClick={targetValue}
          className={`w-full h-10 rounded-lg transition-all 
            ${
              item === type
                ? `${background.target} ${text.target}`
                : `${background.untarget} ${text.untarget}`
            }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
};
