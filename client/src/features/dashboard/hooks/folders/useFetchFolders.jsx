import React, { useState, useEffect } from "react";
import FolderService from "../../../../services/folderService";

export default function useFetchFolders() {
  const [folders, setFolders] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await FolderService.getAllFolders();
      console.log("FETCHING ALL FOLDERS...", data);
      setFolders(data.folders);
    };

    fetchData();
  }, []);

  return {
    folders,
  };
}
