import React, { useState } from "react";

export default function useSubmit() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (values) => {
    setLoading(true);
    setError(null); // Reset previous errors
    try {
      if (selectedMenu == "folders") {
        const data = await addFolder(values.name, values.content);
      }
    } catch (error) {
      console.error("Submit failed:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    onSubmit,
  };
}
