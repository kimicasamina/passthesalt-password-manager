import React from "react";
import SidebarMenu from "../components/SidebarMenu/SidebarMenu";
import ItemList from "../components/ItemList/ItemList";
import ItemDetails from "../components/ItemDetails/ItemDetails";

export default function Home() {
  return (
    <div className="flex">
      {/* Left Column: Sidebar */}
      <SidebarMenu />

      {/* Middle Column: Item List */}
      <div className="flex-1 p-4">
        <ItemList />
      </div>

      {/* Right Column: Item Details */}
      <div className="w-1/3 p-4">
        <ItemDetails />
      </div>
    </div>
  );
}
