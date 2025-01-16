import React, { useState, useEffect } from "react";
import NoteService from "../../../../services/noteService";

export default function useNotes() {
  const [notes, setNotes] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await NoteService.getAllNote();
      console.log("FETCHING ALL NOTES...", data);
      setNotes(data.notes);
    };

    fetchData();
  }, []);

  return {
    notes,
  };
}
