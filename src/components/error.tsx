import React from "react";

const Error = ({ error }: { error: Error }) => {
  return (
    <div className="h-24 mt-6 w-full flex items-center justify-center">
      <h1 className="text-red-500 text-2xl font-bold">Error:</h1>
      <p className="text-red-500 text-2xl font-bold">{error.message}</p>
    </div>
  );
};

export default Error;
