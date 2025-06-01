import React, { createContext, useState } from "react";

// Create the context
export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState({
    email: "",
    fullName: {
      firstName: "",
      lastName: "",
    },
    vehicle: {
      color: "",
      plate: "",
      type: "",
      capacity: 0,
    },
  });

  return (
    <CaptainDataContext.Provider value={{ captain, setCaptain }}>
      {children}
    </CaptainDataContext.Provider>
  );
};

export default CaptainContext;
