import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaNotesMedical } from "react-icons/fa";
import { MdOutlineTaskAlt } from "react-icons/md";
import { PiCalendarHeartBold } from "react-icons/pi";
import { RiHome9Line } from "react-icons/ri";
import { HiOutlineViewGrid } from "react-icons/hi";

const navItems = [
    { name: "Task", icon: MdOutlineTaskAlt, path: "/tasks" },
    { name: "Medical", icon: FaNotesMedical, path: "/events" },
    { name: "Home", icon: RiHome9Line, path: "/" },
    { name: "Calendar", icon: PiCalendarHeartBold, path: "/dates" },
    { name: "Coin", icon: HiOutlineViewGrid, path: "/others" },
];

const Navbar = () => {
    const location = useLocation();
    const [activeItem, setActiveItem] = useState("Home");

    // auto detect active from current url
    React.useEffect(() => {
        const current = navItems.find(
            (item) => item.path === location.pathname
        );
        if (current) setActiveItem(current.name);
    }, [location.pathname]);

    return (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[95%] md:w-[60%] lg:w-[45%] mx-auto rounded-3xl p-3 bg-[#fa6c00] grid grid-cols-5 gap-3">
            {navItems.map((item) => {
                const isCurrentActive = item.name === activeItem;
                const IconComponent = item.icon;

                return (
                    <Link
                        key={item.name}
                        to={item.path}
                        onClick={() => setActiveItem(item.name)}
                        className={`
              flex flex-col items-center justify-center p-3 rounded-full transition-all duration-300 cursor-pointer
              ${
                  isCurrentActive
                      ? "bg-white text-[#fa6c00] shadow-xl border-2 border-[#f88833]"
                      : "bg-[#f88833] text-white hover:bg-[#ff8f3e]"
              }
            `}
                        aria-label={item.name}
                    >
                        <IconComponent className="text-[26px] md:text-[32px]" />
                    </Link>
                );
            })}
        </div>
    );
};

export default Navbar;
