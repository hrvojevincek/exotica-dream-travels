"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";

import Logo from "../../../public/icons/logo";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between h-20 gap-2 bg-black rounded-lg p-4">
        <div className="bg-white rounded-full">
          <Logo />
        </div>

        <Button
          className="bg-white rounded-full text-black h-12 hover:bg-white/80 text-base"
          onClick={() => setIsModalOpen(true)}
        >
          Create new trip
        </Button>
      </div>
    </>
  );
};

export default Header;
