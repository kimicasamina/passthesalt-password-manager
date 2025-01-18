import React from "react";

const ListItem = React.memo(
  ({ item, onSelectType, selectedItem, onSelect }) => {
    const isSelected = selectedItem && selectedItem === item.id;

    console.log("Is seLected:", isSelected);

    const handleOnClick = () => {
      onSelect(item.id);
      if (item.content) {
        console.log("this is a note type");
        onSelectType("notes");
      } else {
        console.log("this is a password type");
        onSelectType("logins");
      }
    };

    return (
      <li className="w-full flex">
        <span
          className={`w-full hover:text-secondary cursor-pointer ${
            isSelected ? "text-secondary font-semibold" : "text-lightText"
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
