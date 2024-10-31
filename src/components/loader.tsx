import { LoaderIcon } from "lucide-react";

const Loader = () => {
  return (
    <div data-testid="loader" className="h-96 mt-6 w-full flex items-center justify-center">
      <LoaderIcon className="size-10 animate-spin text-black" />
    </div>
  );
};

export default Loader;
