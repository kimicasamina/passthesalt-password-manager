import React, { useState, useEffect } from "react";
import PasswordService from "../../../../services/passwordService";

export default function useFetchPasswords() {
  const [passwords, setPasswords] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await PasswordService.getAllPassword();
      console.log("FETCHING ALL PASSWORDS...", data);
      setPasswords([...data.logins]);
    };

    fetchData();
  }, []);

  return {
    passwords,
  };
}
