import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import FolderService from "../../services/folderService";

export default function useFoldersHook() {
  const queryClient = useQueryClient();
  const { data: folders, isLoading } = useQuery({
    queryFn: () => FolderService.getAllFolders(),
    queryKey: ["folders"],
  });

  const { mutateAsync: addFolderMutation } = useMutation({
    mutationFn: FolderService.addNewFolder,
    onSuccess: () => {
      queryClient.invalidateQueries(["folders"]);
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addFolder = async (name, content) => {
    setLoading(true);
    setError(null); // Reset previous errors
    try {
      const data = await addFolderMutation(name, content);
      return data;
    } catch (error) {
      console.error("Submit failed:", error);
      setError(error);
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    folders,
    isLoading,
    // addFolderMutation(),
    addFolder,
    error,
    isLoading,
  };
}
