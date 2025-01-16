import React from "react";

const ListItem = React.memo(
  ({ item, onSelectType, selectedItem, onSelect }) => {
    const isSelected = selectedItem && selectedItem.id === item.id;

    console.log("LIST ITEM:", item);

    const handleOnClick = () => {
      onSelect(item);
      if (item.content) {
        console.log("this is a note type");
        onSelectType("note");
      } else {
        console.log("this is a password type");
        onSelectType("password");
      }
    };

    return (
      <li className="w-full flex">
        <span
          className={`w-full mb-2 hover:text-accent cursor-pointer ${
            isSelected ? "text-accent" : "text-blue-500"
          }`}
          onClick={handleOnClick}
        >
          {item.name}
        </span>
      </li>
    );
  }
);

export default ListItem;
