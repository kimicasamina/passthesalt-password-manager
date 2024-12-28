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

export default function ItemList({ selectedMenu, onSelect }) {
  const { user } = useAuth();

  return (
    <>
      {selectedMenu ? (
        selectedMenu == "all" && (
          <ul className="w-full flex flex-col">
            {user.logins ? (
              user.logins.map((item) => (
                <div className="w-full flex" key={item.id}>
                  <span
                    className="w-full mb-2 hover:text-accent cursor-pointer"
                    onClick={() => onSelect(item)}
                  >
                    {item.name}
                  </span>
                  {/* <span className="">{item.username}</span>
                  <span className="">{item.createAt}</span> */}
                </div>
              ))
            ) : (
              <span className="w-full">Password is empty</span>
            )}
          </ul>
        )
      ) : (
        <p className="w-full">No item selected</p>
      )}
    </>
  );
}
