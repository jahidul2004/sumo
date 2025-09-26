import React from "react";
import { BiSolidMoviePlay } from "react-icons/bi";
import { BsChatHeart } from "react-icons/bs";
import { FaBookReader } from "react-icons/fa";
import { LuContact } from "react-icons/lu";

const More = () => {
    return (
        <div className="bg-gradient-to-l from-[#f88833] to-secondary rounded-xl shadow-lg p-6 max-w-xl text-center m-2 grid grid-cols-2 gap-4">
            <div className="bg-base-100/30 p-4 rounded-xl flex flex-col items-center justify-center">
                <LuContact className="text-white text-[24px]" />
                <p className="mt-2">কন্ট্যাক্ট লিস্ট</p>
            </div>
            <div className="bg-base-100/30 p-4 rounded-xl flex flex-col items-center justify-center">
                <FaBookReader className="text-white text-[24px]" />
                <p className="mt-2">পছন্দের বই</p>
            </div>
            <div className="bg-base-100/30 p-4 rounded-xl flex flex-col items-center justify-center">
                <BiSolidMoviePlay className="text-white text-[24px]" />
                <p className="mt-2">পছন্দের মুভি</p>
            </div>
            <div className="bg-base-100/30 p-4 rounded-xl flex flex-col items-center justify-center">
                <BsChatHeart className="text-white text-[24px]" />
                <p className="mt-2">মনের কথা</p>
            </div>
        </div>
    );
};

export default More;
