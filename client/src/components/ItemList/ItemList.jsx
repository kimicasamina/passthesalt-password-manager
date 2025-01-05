import React from "react";
import { useAuth } from "../../context/AuthContext";

// const passwords = [
//   {
//     id: 1,
//     name: "Netflix",
//     username: "Saucebot",
//     email: "saucebot@gmail.com",
//     password: "saucebot_p4ssw0rd",
//     createAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: 2,
//     name: "Twitter",
//     username: "Saucebot",
//     email: "saucebot@gmail.com",
//     password: "saucebot_p4ssw0rd",
//     createAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: 3,
//     name: "Youtube",
//     username: "Saucebot",
//     email: "saucebot@gmail.com",
//     password: "saucebot_p4ssw0rd",
//     createAt: new Date(),
//     updatedAt: new Date(),
//   },
// ];

export default function ItemList({ selectedMenu, onSelect, selectedItem }) {
  const { user } = useAuth();

  return (
    <>
      {selectedMenu ? (
        selectedMenu === "all" && (
          <ul className="w-full h-full flex flex-col">
            {user.logins && user.logins.length > 0 ? (
              user.logins.map((item, index) => (
                <li className="w-full flex" key={index}>
                  <span
                    className={`w-full mb-2 hover:text-accent cursor-pointer ${
                      selectedItem && selectedItem.id === item.id
                        ? "text-accent"
                        : "text-blue-500"
                    }`}
                    onClick={() => onSelect(item)}
                  >
                    {item.name}
                  </span>
                  {/* Optionally display the username and creation date */}
                  {/* <span>{item.username}</span>
                <span>{new Date(item.createAt).toLocaleString()}</span> */}
                </li>
              ))
            ) : (
              <span className="w-full">No logins available</span>
            )}
          </ul>
        )
      ) : (
        <p className="w-full">No item selected</p>
      )}
    </>
  );
}
