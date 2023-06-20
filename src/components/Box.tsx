import React, { useState } from "react";

type Props = {
  currBar: number;
  bar: number;
  pitch: number;
  toggle: (bar: number, pitch: number) => void;
};

export default function Box({ currBar, bar, pitch, toggle }: Props) {
  const [isSelected, setIsSelected] = useState(false);
  const toggleSelected = () => {
    setIsSelected(!isSelected);
    toggle(bar, pitch);
  };

  const getClassName = ({
    isSelected,
    currBar,
    bar,
  }: {
    isSelected: boolean;
    currBar: number;
    bar: number;
  }) => {
    if (!isSelected) return "rounded-full w-16 h-16 bg-blue-500";
    if (currBar === bar)
      return "rounded-full w-16 h-16 bg-slate-800 ring-2 ring-gray-500";
    return "rounded-full w-16 h-16 bg-black";
  };

  return (
    <div
      className={getClassName({ isSelected, currBar, bar })}
      color={isSelected ? "red" : "green"}
      onClick={toggleSelected}
    />
  );
}
