import React from "react";
import { BiSolidMoviePlay } from "react-icons/bi";
import {
    FaBookReader,
    FaHeart,
    FaKey,
    FaPrayingHands,
    FaFileAlt,
} from "react-icons/fa";
import { LuContact } from "react-icons/lu";
import { MdOutlineLightbulb } from "react-icons/md";
import { Link } from "react-router-dom";

// --- কনস্ট্যান্টস ---
const PRIMARY_COLOR = "#f88833";
const PRIMARY_GRADIENT = "from-[#f88833] to-orange-400"; // গ্রেডিয়েন্ট সুন্দর করার জন্য

// Glass Card Component
const GlassCard = ({ children, className = "" }) => (
    <div
        className={`
        bg-white/30 backdrop-blur-md rounded-xl p-4 shadow-md border border-white/50 transition-all duration-300
        ${className}
    `}
    >
        {children}
    </div>
);

// মেনু ডেটা
const moreMenuItems = [
    {
        title: "নামাজের স্ট্রিক",
        icon: FaPrayingHands,
        to: "/salahStreak",
        color: "text-green-500",
    },
    {
        title: "ক্রেডেনশিয়াল",
        icon: FaKey,
        to: "/credentials",
        color: "text-blue-500",
    },
    {
        title: "গুরুত্বপূর্ণ ফাইল",
        icon: FaFileAlt,
        to: "/files",
        color: "text-red-500",
    },
    {
        title: "কন্ট্যাক্ট লিস্ট",
        icon: LuContact,
        to: "/contacts",
        color: "text-purple-500",
    },
    {
        title: "পছন্দের বই",
        icon: FaBookReader,
        to: "/favorite-books",
        color: "text-yellow-600",
    },
    {
        title: "পছন্দের মুভি",
        icon: BiSolidMoviePlay,
        to: "/favorite-movies",
        color: "text-indigo-500",
    },
    {
        title: "মনের কথা",
        icon: FaHeart,
        to: "/personal-thoughts",
        color: "text-pink-500",
    },
    {
        title: "নতুন শেখা",
        icon: MdOutlineLightbulb,
        to: "/new-learnings",
        color: "text-cyan-500",
    },
];

// --- মূল More কম্পোনেন্ট ---
const More = () => {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* 1. Header Section (Sticky) */}
            <div className="p-4 pt-8 sticky top-0 bg-gray-50/80 backdrop-blur-sm z-30">
                <div
                    style={{ backgroundColor: PRIMARY_COLOR }}
                    className="rounded-2xl shadow-xl py-3 px-4 max-w-lg mx-auto flex justify-between items-center"
                >
                    <h1 className="text-white text-2xl font-bold">অন্যান্য</h1>
                </div>
            </div>

            {/* 2. Menu Grid */}
            <div className={`p-4 max-w-lg mx-auto mt-4`}>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {moreMenuItems.map((item, index) => (
                        <Link to={item.to} key={index}>
                            <GlassCard className="h-full flex flex-col items-center justify-center p-6 text-center hover:shadow-xl hover:scale-[1.03] active:scale-[0.98] cursor-pointer">
                                <item.icon
                                    className={`text-3xl mb-2 ${item.color}`}
                                />
                                <p className="text-sm font-semibold text-gray-800">
                                    {item.title}
                                </p>
                            </GlassCard>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="p-4 max-w-lg mx-auto">
                <div
                    className={`bg-gradient-to-r ${PRIMARY_GRADIENT} rounded-2xl shadow-xl p-5`}
                >
                    <div className="text-white">
                        <h3 className="text-lg font-bold">সেটিংস ও সাহায্য</h3>
                        <p className="text-sm opacity-80 mt-1">
                            অ্যাপ্লিকেশন সেটিংস, প্রোফাইল ব্যবস্থাপনা এবং
                            সহায়তার জন্য এখানে দেখুন।
                        </p>
                        <Link
                            to="/settings"
                            className="btn btn-sm bg-white/30 text-white border-0 hover:bg-white/50 mt-3"
                        >
                            সেটিংস দেখুন
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default More;
