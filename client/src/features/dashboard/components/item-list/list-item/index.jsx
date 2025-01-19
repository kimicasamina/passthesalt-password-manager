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
          className={`py-4 px-2 shadow-trello w-full rounded-sm cursor-pointer ${
            isSelected
              ? "text-darkText rounded-sm font-semibold bg-secondary border-secondary"
              : "text-lightText hover:text-secondary"
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
