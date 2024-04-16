import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useConnect } from "@connect2ic/react";

function Protected({ children }) {
  const { isConnected } = useConnect();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating an asynchronous check for connection status
    const checkConnection = async () => {
      // Replace the setTimeout with your actual connection check logic
      setTimeout(() => {
        setLoading(false);
      }, 3000); // Simulating a 3-second delay
    };

    checkConnection();
  }, []);

  if (loading) {
    // You can replace this with your loading indicator component
    return <h1>loading...</h1>;
  }

  if (!isConnected) {
    return <Navigate to="/" replace={true} />;
  }

  return children;
}

export default Protected;
