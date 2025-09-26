import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import {
    FaTasks,
    FaMoneyBillWave,
    FaCalendarAlt,
    FaCheckCircle,
    FaBookOpen,
} from "react-icons/fa";
import {
    MdOutlineNoteAlt,
    MdAttachMoney,
    MdOutlineEventNote,
    MdHistory,
    MdCheckCircle,
    MdToday,
} from "react-icons/md";
import { IoIosTimer } from "react-icons/io";
import { LuMessageCircleHeart } from "react-icons/lu";
import { RiMusicAiFill } from "react-icons/ri";

const PRIMARY_COLOR = "#f88833";
const PRIMARY_GRADIENT = "from-[#f88833] to-orange-400";
const TEXT_PRIMARY_COLOR_CLASS = "text-[#f88833]";

// Glass Card Component
const GlassCard = ({ children, className = "" }) => (
    <div
        className={`
        bg-white/50 backdrop-blur-lg rounded-xl p-4 shadow-lg border border-white/70 transition-all duration-300
        ${className}
    `}
    >
        {children}
    </div>
);

const dailyMessages = [
    {
        id: 1,
        text: "নিশ্চয়ই কষ্টের সঙ্গেই রয়েছে স্বস্তি।",
        source: "কুরআন",
        reference: "সূরা আশ-শারহ (৯৪:৫-৬)",
    },
    {
        id: 6,
        text: "আর যে আল্লাহর উপর ভরসা করে, তিনি তার জন্য যথেষ্ট।",
        source: "কুরআন",
        reference: "সূরা আত-তালাক (৬৫:৩)",
    },
    {
        id: 17,
        text: "আর তোমরা ধৈর্য্য ও সালাতের মাধ্যমে সাহায্য প্রার্থনা করো।",
        source: "কুরআন",
        reference: "সূরা আল-বাকারা (২:১৫৩)",
    },
    {
        id: 18,
        text: "জ্ঞান অর্জন করা প্রতিটি মুসলিম নর-নারীর উপর ফরজ।",
        source: "হাদিস",
        reference: "সুনান ইবনে মাজাহ",
    },
    {
        id: 2,
        text: "সর্বোত্তম সেই, যার চরিত্র সর্বোত্তম।",
        source: "হাদিস",
        reference: "সহীহ আল-বুখারী",
    },
    {
        id: 7,
        text: "রাগ করো না।",
        source: "হাদিস",
        reference: "সহীহ আল-বুখারী",
    },
    {
        id: 9,
        text: "শিক্ষা হলো সবচেয়ে শক্তিশালী অস্ত্র।",
        source: "নেলসন ম্যান্ডেলা",
        reference: "–",
    },
    {
        id: 10,
        text: "তুমি পৃথিবীতে যে পরিবর্তন দেখতে চাও, নিজে সেই পরিবর্তন হও।",
        source: "মহাত্মা গান্ধী",
        reference: "–",
    },
];

const demoData = {
    user: {
        name: "জিহাদ",
        greeting: "শুভ সন্ধ্যা",
    },
    todaySummary: {
        pendingTasks: 3,
        completedTasks: 5,
        totalExpenses: 1250,
        upcomingEvents: 2,
    },
    recentActivities: [
        {
            type: "task",
            title: "প্রোফাইল আপডেট করা",
            time: "10:00 AM",
            icon: <FaCheckCircle className="text-green-500" />,
            status: "completed",
        },
        {
            type: "expense",
            title: "লাঞ্চ বিল",
            amount: "500 Tk",
            time: "1:15 PM",
            icon: <MdAttachMoney className="text-red-500" />,
        },
        {
            type: "event",
            title: "আব্বার জন্মদিন",
            time: "7:00 PM",
            icon: <MdOutlineEventNote className="text-blue-500" />,
        },
        {
            type: "note",
            title: "গ্রোসারি লিস্ট",
            time: "9:30 AM",
            icon: <MdOutlineNoteAlt className="text-yellow-500" />,
        },
    ],
};

const Home = () => {
    const [randomMessage, setRandomMessage] = useState({});

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * dailyMessages.length);
        setRandomMessage(dailyMessages[randomIndex]);
    }, []);

    const isMessageLoaded = useMemo(
        () => Object.keys(randomMessage).length > 0,
        [randomMessage]
    );

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* 1. Greetings & Quote Section */}
            <div className="p-4">
                <div
                    className={`bg-gradient-to-l ${PRIMARY_GRADIENT} rounded-3xl p-5 shadow-2xl`}
                >
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-white">
                                {demoData.user.greeting}, {demoData.user.name}!
                            </h2>
                            <Link
                                to={"/profile"}
                                className="w-12 h-12 flex items-center justify-center bg-white/30 hover:bg-white/50 rounded-full transition-colors shadow-lg"
                            >
                                <CgProfile className="text-white" size={30} />
                            </Link>
                        </div>

                        {/* Daily Motivational Message */}
                        {isMessageLoaded && (
                            <GlassCard className="max-w-xl text-center p-6">
                                <p
                                    className={`text-lg font-bold ${TEXT_PRIMARY_COLOR_CLASS} mb-2`}
                                >
                                    {randomMessage.text}
                                </p>
                                <p className="text-xs text-gray-700">
                                    {randomMessage.source} |{" "}
                                    {randomMessage.reference}
                                </p>
                            </GlassCard>
                        )}
                    </div>
                </div>
            </div>

            {/* 2. Quick Actions */}
            <div className="px-4 mt-8">
                <h2
                    className={`flex items-center gap-2 text-xl font-bold text-gray-800 mb-3 ${TEXT_PRIMARY_COLOR_CLASS}`}
                >
                    <MdCheckCircle className="text-[24px] text-[#f88833]" />{" "}
                    কুইক অ্যাকশন
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <Link to={"/"}>
                        <GlassCard className="flex flex-col items-center justify-center text-center p-4 hover:scale-[1.03]">
                            <FaTasks className="text-[#f88833]" size={30} />
                            <p className="mt-2 text-sm font-semibold text-gray-700">
                                সুমুর কাজের তালিকা
                            </p>
                        </GlassCard>
                    </Link>
                    <Link to={"/"}>
                        <GlassCard className="flex flex-col items-center justify-center text-center p-4 hover:scale-[1.03]">
                            <FaBookOpen className="text-[#f88833]" size={30} />
                            <p className="mt-2 text-sm font-semibold text-gray-700">
                                ডায়েরি লিখুন
                            </p>
                        </GlassCard>
                    </Link>
                    <Link to={"/"}>
                        <GlassCard className="flex flex-col items-center justify-center text-center p-4 hover:scale-[1.03]">
                            <LuMessageCircleHeart
                                className="text-[#f88833]"
                                size={30}
                            />
                            <p className="mt-2 text-sm font-semibold text-gray-700">
                                মনের কথা
                            </p>
                        </GlassCard>
                    </Link>
                    <Link to={"/"}>
                        <GlassCard className="flex flex-col items-center justify-center text-center p-4 hover:scale-[1.03]">
                            <RiMusicAiFill
                                className="text-[#f88833]"
                                size={30}
                            />
                            <p className="mt-2 text-sm font-semibold text-gray-700">
                                গানের প্লে-লিস্ট
                            </p>
                        </GlassCard>
                    </Link>
                </div>
            </div>

            {/* 3. Today's Overview (Summary) */}
            <div className="px-4 mt-8">
                <h2
                    className={`flex items-center gap-2 text-xl font-bold text-gray-800 mb-3 ${TEXT_PRIMARY_COLOR_CLASS}`}
                >
                    <MdToday className="text-[24px] text-[#f88833]" /> আজকের
                    সারাংশ
                </h2>
                <div className="grid grid-cols-2 gap-4">
                    {/* পেন্ডিং টাস্ক */}
                    <GlassCard className="bg-red-500/10 border-red-500/30">
                        <div className="text-red-600 text-sm opacity-90 mb-2">
                            সুমুর বাকি কাজ
                        </div>
                        <div className="text-gray-800 text-3xl font-bold">
                            {demoData.todaySummary.pendingTasks}
                        </div>
                    </GlassCard>
                    {/* সম্পন্ন টাস্ক */}
                    <GlassCard className="bg-green-500/10 border-green-500/30">
                        <div className="text-green-600 text-sm opacity-90">
                            আজকে সম্পন্ন করেছেন
                        </div>
                        <div className="text-gray-800 text-3xl font-bold">
                            {demoData.todaySummary.completedTasks}
                        </div>
                    </GlassCard>
                    {/* মোট খরচ */}
                    <GlassCard className="bg-yellow-500/10 border-yellow-500/30">
                        <div className="text-yellow-600 text-sm opacity-90">
                            আজকের ডায়েরি
                        </div>
                        <div className="text-gray-800 text-3xl font-bold">
                            {demoData.todaySummary.totalExpenses}
                        </div>
                    </GlassCard>
                    {/* আসন্ন ঘটনা */}
                    <GlassCard className="bg-blue-500/10 border-blue-500/30">
                        <div className="text-blue-600 text-sm opacity-90">
                            আসন্ন ঘটনা
                        </div>
                        <div className="text-gray-800 text-3xl font-bold">
                            {demoData.todaySummary.upcomingEvents}
                        </div>
                    </GlassCard>
                </div>
            </div>

            {/* 4. Recent Activity (History) */}
            <div className="px-4 mt-8">
                <h2
                    className={`text-xl font-bold text-gray-800 mb-3 ${TEXT_PRIMARY_COLOR_CLASS} flex items-center gap-2`}
                >
                    <MdHistory className="text-[24px] text-[#f88833]" />{" "}
                    সাম্প্রতিক কার্যকলাপ
                </h2>
                <div className="space-y-3">
                    {demoData.recentActivities.map((activity, index) => (
                        <GlassCard
                            key={index}
                            className="p-3 border-gray-300/50 hover:border-[#f88833]/50 active:scale-[0.99]"
                        >
                            <div className="flex items-center space-x-3">
                                <div className="text-2xl">{activity.icon}</div>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-800">
                                        {activity.title}
                                    </p>
                                    <p className="text-xs text-gray-600">
                                        {activity.amount &&
                                            `${activity.amount} • `}
                                        {activity.time}
                                    </p>
                                </div>
                                {activity.status === "completed" && (
                                    <span className="text-xs font-semibold text-green-600">
                                        সম্পন্ন
                                    </span>
                                )}
                            </div>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
