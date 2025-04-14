"use client";
import { Separator } from "@/components/ui/separator";
import clsx from "clsx";
import { useState } from "react";

const FileTabs = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <div className="text-sm flex w-max">
      {[1, 2, 3, 5].map((_, i) => (
        <div className={"flex items-center flex-1 w-full select-none"} key={i}>
          <div
            onClick={() => setSelectedIndex(i)}
            className={clsx("p-1.5 rounded-sm w-40", {
              "bg-white border relative after:content-[' '] after:w-full after:h-2 after:bg-white after:border after:border-white after:absolute after:-bottom-[3px] after:border-l-gray-50 after:border-r-0 after:left-0":
                selectedIndex === i,

              "hover:bg-gray-200": selectedIndex !== i,
            })}
          >
            JS Project
          </div>
          <Separator
            orientation="vertical"
            className="mx-0.5 data-[orientation=vertical]:h-4"
          />
        </div>
      ))}
    </div>
  );
};

export default FileTabs;
