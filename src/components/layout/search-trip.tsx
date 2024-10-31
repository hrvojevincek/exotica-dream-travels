"use client";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { useSearch } from "@/lib/context/search-context";

const SearchTrip = () => {
  const { searchQuery, setSearchQuery } = useSearch();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col gap-5 w-[400px] h-40 mt-16 mx-auto">
      <div className="flex flex-col space-y-1 text-center">
        <h1 className="text-4xl font-normal">The places you dream of</h1>
        <p className="text-xl">Let&apos;s live new adventures</p>
      </div>
      <form
        onSubmit={handleSearch}
        className="flex items-center justify-center"
      >
        <div className="flex items-center justify-center border border-gray-300 w-full rounded-full gap-2 h-12 focus-within:border-black">
          <Input
            placeholder="Search trips"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-none focus:outline-none focus-visible:ring-0"
          />
          <div className="rounded-full p-1">
            <Button type="submit" className="rounded-full">
              <Search className="size-4" />
              Search
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchTrip;
