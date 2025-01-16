// export default function MenuItem({ item, selectedMenu, onSelect }){

// } (
//   <div onClick={() => onSelect(item.id)} className="cursor-pointer">
//     <span
//       className={`text-sm hover:text-accent ${
//         selectedMenu === item.id ? "text-accent" : "text-text"
//       }`}
//     >
//       {item.name}
//     </span>
//   </div>
// );

import React from "react";

export default function MenuItem({ item, selectedMenu, onSelect }) {
  return (
    <div onClick={() => onSelect(item.id)} className="cursor-pointer">
      <span
        className={`text-sm hover:text-accent ${
          selectedMenu === item.id ? "text-accent" : "text-text"
        }`}
      >
        {item.name}
      </span>
    </div>
  );
}
