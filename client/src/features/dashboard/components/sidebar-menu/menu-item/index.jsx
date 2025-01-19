import React from "react";

export default function MenuItem({ item, selectedMenu, onSelect }) {
  return (
    <div onClick={() => onSelect(item.id)} className="cursor-pointer">
      <span
        className={`text-xs hover:text-secondary ${
          selectedMenu === item.id
            ? "text-primary font-semibold"
            : "text-darkText"
        }`}
      >
        {item.name}
      </span>
    </div>
  );
}
