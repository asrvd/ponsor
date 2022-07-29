/* eslint-disable @next/next/no-img-element */
import { useState, useRef, useEffect } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { FiHome, FiLogOut, FiSliders } from "react-icons/fi";
import { memo } from "react";

interface HeaderProps {
  name: string | any;
  image: string | any;
}

export default memo(function Header(props: HeaderProps) {
  const router = useRouter();
  const ref = useRef<any>();
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const currentLocation = router.pathname;

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current?.contains(event.target)) {
        setDrawerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [drawerOpen]);

  return (
    <div
      className="flex justify-between items-center p-3 w-full h-full text-gray-200"
      ref={ref}
    >
      <h2 className="cursor-pointer" onClick={() => router.push("/")}>
        ponsor
      </h2>
      <div
        className="relative flex flex-col justify-center items-center gap-3 cursor-pointer"
        onClick={() => {
          setDrawerOpen(!drawerOpen);
        }}
      >
        <div className="flex gap-3 w-full h-full justify-center items-center duration-500 hover:bg-gray-800 px-2 py-1 rounded">
          <img
            src={props?.image}
            alt={props?.name}
            className="w-10 h-10 rounded-full"
          />
          <h2>{props?.name}</h2>
        </div>
        {drawerOpen && (
          <motion.div
            animate={{
              opacity: drawerOpen
                ? [0, 0.2, 0.5, 0.8, 1]
                : [1, 0.8, 0.5, 0.2, 0],
            }}
            transition={{ duration: 0.5 }}
            // variants={dropdownAnimation}
            className="absolute right-0 -bottom-[5.5rem] mt-2 py-1 bg-gray-800 w-full flex flex-col justify-center items-center shadow-xl rounded"
          >
            <button
              onClick={() => signOut()}
              className="flex justify-start pl-2 gap-3 items-center text-sm w-full py-2 hover:bg-gray-700 duration-300"
            >
              <FiLogOut />
              Sign out
            </button>
            <button
              onClick={() =>
                router.push(currentLocation === "/" ? "/dashboard" : "/")
              }
              className="flex justify-start duration-300 gap-3 pl-2 items-center text-sm w-full py-2 hover:bg-gray-700"
            >
              {currentLocation === "/" ? <FiSliders /> : <FiHome />}
              {currentLocation === "/" ? "Dashboard" : "Home"}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
});
