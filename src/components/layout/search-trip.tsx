import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const SearchTrip = () => {
  return (
    <div className="flex flex-col gap-5 w-[400px] h-40 mt-16 mx-auto">
      <div className="flex flex-col space-y-1 text-center">
        <h1 className="text-4xl font-normal">The places you dream of</h1>
        <p className="text-xl">Let’s live new adventures</p>
      </div>
      <div className="flex items-center justify-center border border-gray-300 w-full rounded-full gap-2 h-12 focus-within:border-black">
        <Input
          placeholder="Search trips"
          type="search"
          className="border-none focus:outline-none focus-visible:ring-0"
        />
        <div className="rounded-full p-1">
          <Button className="rounded-full">Search</Button>
        </div>
      </div>
    </div>
  );
};

export default SearchTrip;
