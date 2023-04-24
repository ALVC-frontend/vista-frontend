import React from "react";

interface LoaderProps {
  variable: string;
}

export default function Loader({ variable }: LoaderProps) {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <p>Loading {variable} ...</p>
    </div>
  );
}
