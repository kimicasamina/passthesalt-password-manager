import React from "react";
import FormattedDate from "../../../../../components/FormattedDate";

export default function Notes({ selectedItem }) {
  return (
    <div className="h-full w-full bg-white space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">{selectedItem?.name}</h2>
      <div className="space-y-2">
        <p>{selectedItem?.content}</p>
        {/* <p>{selectedItem.email}</p> */}
      </div>
      <div className="flex flex-col space-y-2">
        <div>
          Created At: <FormattedDate date={selectedItem?.createdAt} />
        </div>
        <div>
          Updated At: <FormattedDate date={selectedItem?.updatedAt} />
        </div>
      </div>
    </div>
  );
}
