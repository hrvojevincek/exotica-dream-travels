import { LoaderIcon } from "lucide-react";
import React from "react";

const Loader = () => {
  return (
    <div className="h-96 mt-6 w-full flex items-center justify-center">
      <LoaderIcon className="size-6 animate-spin text-black" />
    </div>
  );
};

export default Loader;
