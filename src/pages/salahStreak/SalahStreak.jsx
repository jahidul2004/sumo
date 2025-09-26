import React, { useState, useMemo } from "react";
import {
    FaPrayingHands,
    FaCheckCircle,
    FaTimesCircle,
    FaFire,
    FaCalendarDay,
} from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";

// --- কনস্ট্যান্টস ---
const PRIMARY_COLOR = "#f88833";
const PRIMARY_GRADIENT = "from-[#f88833] to-orange-400";
const TEXT_PRIMARY_COLOR_CLASS = "text-[#f88833]";

// ৫ ওয়াক্তের তালিকা
const salahTimes = [
    { name: "ফজর", key: "fajr" },
    { name: "যোহর", key: "zuhr" },
    { name: "আসর", key: "asr" },
    { name: "মাগরিব", key: "maghrib" },
    { name: "এশা", key: "isha" },
];

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

// ডেমো ডেটা: নামাজের ইতিহাস
const initialSalahHistory = {
    "2025-09-27": {
        fajr: true,
        zuhr: true,
        asr: true,
        maghrib: true,
        isha: true,
        total: 5,
    },
    "2025-09-26": {
        fajr: true,
        zuhr: true,
        asr: false,
        maghrib: true,
        isha: true,
        total: 4,
    },
    "2025-09-25": {
        fajr: true,
        zuhr: true,
        asr: true,
        maghrib: true,
        isha: false,
        total: 4,
    },
    "2025-09-24": {
        fajr: true,
        zuhr: true,
        asr: true,
        maghrib: true,
        isha: true,
        total: 5,
    },
    "2025-09-23": {
        fajr: false,
        zuhr: true,
        asr: true,
        maghrib: true,
        isha: true,
        total: 4,
    },
};

// --- মূল SalahStreak কম্পোনেন্ট ---
const SalahStreak = () => {
    // আজকের তারিখ (Y-M-D ফরমেট)
    const today = new Date().toISOString().slice(0, 10);

    const [selectedDate, setSelectedDate] = useState(today);
    const [salahHistory, setSalahHistory] = useState(initialSalahHistory);
    // স্ট্রিক ডেমো
    const [currentStreak, setCurrentStreak] = useState(3);

    // বর্তমানে নির্বাচিত দিনের ডেটা
    const currentDayData = useMemo(() => {
        return (
            salahHistory[selectedDate] || {
                fajr: false,
                zuhr: false,
                asr: false,
                maghrib: false,
                isha: false,
                total: 0,
            }
        );
    }, [salahHistory, selectedDate]);

    // নামাজ টগল করার ফাংশন
    const handleToggleSalah = (key) => {
        const updatedHistory = { ...salahHistory };
        const currentData = updatedHistory[selectedDate] || {
            fajr: false,
            zuhr: false,
            asr: false,
            maghrib: false,
            isha: false,
            total: 0,
        };

        // নতুন স্টেট
        const newStatus = !currentData[key];
        currentData[key] = newStatus;

        // মোট সংখ্যা আপডেট করা
        currentData.total = Object.values(currentData).filter(
            (val) => typeof val === "boolean" && val
        ).length;

        updatedHistory[selectedDate] = currentData;
        setSalahHistory(updatedHistory);

        // Note: রিয়েল অ্যাপে এখানে ডেটাবেসে আপডেট করার লজিক লিখতে হবে।
        console.log(`Updated ${key} for ${selectedDate} to ${newStatus}`);
    };

    // ইতিহাস থেকে ক্যালেন্ডার ডেটা তৈরি করা
    const historyDates = useMemo(() => {
        return Object.keys(salahHistory).sort(
            (a, b) => new Date(b) - new Date(a)
        );
    }, [salahHistory]);

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* 1. Header & Streak Summary */}
            <div className="p-4 pt-8 sticky top-0 bg-gray-50/80 backdrop-blur-sm z-30">
                <div
                    className={`bg-gradient-to-l ${PRIMARY_GRADIENT} rounded-2xl shadow-xl py-3 px-4 max-w-lg mx-auto flex justify-between items-center`}
                >
                    <h1 className="text-white text-2xl font-bold flex items-center gap-2">
                        <FaPrayingHands className="text-white text-[24px]" />
                        নামাজের স্ট্রিক
                    </h1>
                </div>

                {/* Streak Card */}
                <GlassCard className="max-w-lg mx-auto mt-4 p-5 text-center">
                    <FaFire className="text-4xl text-red-500 mx-auto mb-2" />
                    <h2 className="text-xl font-bold text-gray-800">
                        আপনার বর্তমান স্ট্রিক
                    </h2>
                    <p
                        className={`text-5xl font-extrabold ${TEXT_PRIMARY_COLOR_CLASS} mt-1`}
                    >
                        {currentStreak}{" "}
                        <span className="text-2xl text-gray-700">দিন</span>
                    </p>
                    <p className="text-xs text-gray-600 mt-2">
                        প্রতিদিনের ৫ ওয়াক্ত নামাজ আদায়ের ধারাবাহিকতা
                    </p>
                </GlassCard>
            </div>

            {/* 2. Today's Tracker / Selected Day */}
            <div className="px-4 mt-6 max-w-lg mx-auto">
                <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <MdOutlineDateRange />
                    {selectedDate === today
                        ? "আজকের ওয়াক্তসমূহ"
                        : `${selectedDate} এর ট্র্যাকিং`}
                </h2>

                {/* ডেট পিকার (ডেমো) */}
                <input
                    type="date"
                    className={`input input-bordered w-full mb-4 bg-white/70 backdrop-blur-md border-gray-300 focus:border-[#f88833] ${TEXT_PRIMARY_COLOR_CLASS}`}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    max={today}
                />

                <GlassCard className="p-5">
                    <div className="grid grid-cols-2 gap-4">
                        {salahTimes.map((salah) => (
                            <button
                                key={salah.key}
                                onClick={() => handleToggleSalah(salah.key)}
                                className={`
                                    flex items-center justify-between p-3 rounded-xl transition-all duration-200 shadow-sm
                                    ${
                                        currentDayData[salah.key]
                                            ? "bg-green-500 text-white hover:bg-green-600"
                                            : "bg-white/80 text-gray-800 border border-gray-300 hover:bg-gray-100"
                                    }
                                `}
                            >
                                <span className="font-semibold">
                                    {salah.name}
                                </span>
                                {currentDayData[salah.key] ? (
                                    <FaCheckCircle className="text-lg" />
                                ) : (
                                    <FaTimesCircle className="text-lg text-gray-500" />
                                )}
                            </button>
                        ))}
                    </div>
                </GlassCard>

                <p className="text-center text-sm text-gray-600 mt-3">
                    আজ মোট {currentDayData.total} / ৫ ওয়াক্ত নামাজ আদায় করা
                    হয়েছে।
                </p>
            </div>

            {/* 3. History Section */}
            <div className="px-4 mt-8 max-w-lg mx-auto">
                <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <FaCalendarDay />
                    সাম্প্রতিক ইতিহাস
                </h2>
                <div className="space-y-3">
                    {historyDates.slice(0, 7).map((date) => {
                        const data = salahHistory[date];
                        const isFull = data.total === 5;
                        const cardClass = isFull
                            ? "bg-green-500/10 border-green-500/30"
                            : "bg-red-500/10 border-red-500/30";

                        return (
                            <GlassCard
                                key={date}
                                className={`flex justify-between items-center p-4 ${cardClass}`}
                                onClick={() => setSelectedDate(date)}
                            >
                                <div className="flex flex-col">
                                    <span className="font-semibold text-gray-800">
                                        {date === today ? "আজকে" : date}
                                    </span>
                                    <span
                                        className={`text-xs font-medium ${
                                            isFull
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }`}
                                    >
                                        {isFull
                                            ? "সম্পূর্ণ ৫ ওয়াক্ত আদায়"
                                            : "কিছু ওয়াক্ত বাকি"}
                                    </span>
                                </div>
                                <div
                                    className={`text-xl font-bold ${
                                        isFull
                                            ? "text-green-700"
                                            : "text-red-700"
                                    }`}
                                >
                                    {data.total} / ৫
                                </div>
                            </GlassCard>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default SalahStreak;
