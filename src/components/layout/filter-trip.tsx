"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FilterTrip() {
  const pathname = usePathname();

  return (
    <div className="w-[305px] h-12 flex items-center bg-white border border-[#D8D8D8] rounded-full mt-16 mx-auto">
      <Link
        href="/"
        className={`flex-1 h-full rounded-s-full text-sm transition-colors flex items-center justify-center ${
          pathname === "/" ? "bg-[#F3F3F3]" : "hover:bg-[#F3F3F3]/50"
        }`}
      >
        All
      </Link>
      <Link
        href="/todo"
        className={`flex-1 h-full border-l border-r border-[#D8D8D8] text-sm transition-colors flex items-center justify-center ${
          pathname === "/todo" ? "bg-[#F3F3F3]" : "hover:bg-[#F3F3F3]/50"
        }`}
      >
        Upcoming
      </Link>
      <Link
        href="/done"
        className={`flex-1 h-full rounded-r-full text-sm transition-colors flex items-center justify-center ${
          pathname === "/done" ? "bg-[#F3F3F3]" : "hover:bg-[#F3F3F3]/50"
        }`}
      >
        Completed
      </Link>
    </div>
  );
}
