import React, { useEffect, useState } from "react";
import Dashboard from "../features/dashboard";
import { useDispatch } from "react-redux";

export default function Home() {
  const [selectedMenu, setSelectedMenu] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null); // Set to null for better state control
  const dispatch = useDispatch();
  const handleSelectMenu = (menu) => {
    setSelectedMenu(menu);
    setSelectedItem(null); // Reset selected item when menu changes
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item); // Set selected item
  };

  return <Dashboard />;
}
