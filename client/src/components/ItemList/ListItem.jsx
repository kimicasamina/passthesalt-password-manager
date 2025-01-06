import React from "react";

const ListItem = React.memo(({ item, selectedItem, onSelect }) => {
  const isSelected = selectedItem && selectedItem.id === item.id;

  return (
    <li className="w-full flex">
      <span
        className={`w-full mb-2 hover:text-accent cursor-pointer ${
          isSelected ? "text-accent" : "text-blue-500"
        }`}
        onClick={() => onSelect(item)}
      >
        {item.name}
      </span>
    </li>
  );
});

export default ListItem;
