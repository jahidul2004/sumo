import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";

const Home = () => {
    const dailyMessages = [
        {
            id: 1,
            text: "নিশ্চয়ই কষ্টের সঙ্গেই রয়েছে স্বস্তি।",
            source: "কুরআন",
            reference: "সূরা আশ-শারহ (৯৪:৫-৬)",
        },
        {
            id: 2,
            text: "সর্বোত্তম সেই, যার চরিত্র সর্বোত্তম।",
            source: "হাদিস",
            reference: "সহীহ আল-বুখারী",
        },
        {
            id: 3,
            text: "আর নিশ্চয়ই আমি মানুষকে সৃষ্টি করেছি কষ্টের মধ্যে।",
            source: "কুরআন",
            reference: "সূরা আল-বালাদ (৯০:৪)",
        },
        {
            id: 4,
            text: "একজন শক্তিশালী মুমিন আল্লাহর নিকট দুর্বল মুমিনের চেয়ে উত্তম।",
            source: "হাদিস",
            reference: "সহীহ মুসলিম",
        },
        {
            id: 5,
            text: "দুনিয়া মুমিনের জন্য কারাগার এবং কাফিরের জন্য জান্নাত।",
            source: "হাদিস",
            reference: "সহীহ মুসলিম",
        },
        {
            id: 6,
            text: "আর যে আল্লাহর উপর ভরসা করে, তিনি তার জন্য যথেষ্ট।",
            source: "কুরআন",
            reference: "সূরা আত-তালাক (৬৫:৩)",
        },
        {
            id: 7,
            text: "রাগ করো না।",
            source: "হাদিস",
            reference: "সহীহ আল-বুখারী",
        },
        {
            id: 8,
            text: "পরিষ্কার-পরিচ্ছন্নতা ঈমানের অঙ্গ।",
            source: "হাদিস",
            reference: "সহীহ মুসলিম",
        },
        {
            id: 9,
            text: "শিক্ষা হলো সবচেয়ে শক্তিশালী অস্ত্র।",
            source: "নেলসন ম্যান্ডেলা",
            reference: "–",
        },
        {
            id: 10,
            text: "তুমি পৃথিবীতে যে পরিবর্তন দেখতে চাও, নিজে সেই পরিবর্তন হও।",
            source: "মহাত্মা গান্ধী",
            reference: "–",
        },
        {
            id: 11,
            text: "সাফল্য আসে প্রস্তুতি এবং সুযোগের মিলনে।",
            source: "সেনেকা",
            reference: "–",
        },
        {
            id: 12,
            text: "কষ্ট ছাড়া সাফল্য আসে না।",
            source: "অজানা",
            reference: "–",
        },
        {
            id: 13,
            text: "হাল ছেড়ো না। পরের মুহূর্তে পরিবর্তন আসতে পারে।",
            source: "অজানা",
            reference: "–",
        },
        {
            id: 14,
            text: "সদাচরণ করো মানুষের প্রতি।",
            source: "হাদিস",
            reference: "সহীহ মুসলিম",
        },
        {
            id: 15,
            text: "যারা ঈমান আনে ও সৎকর্ম করে, তাদের জন্য সুসংবাদ রয়েছে।",
            source: "কুরআন",
            reference: "সূরা আর-রা'দ (১৩:২৯)",
        },
        {
            id: 16,
            text: "ধন্যবাদ প্রকাশ না করা কুফর এর অংশ।",
            source: "হাদিস",
            reference: "সুনান আত-তিরমিজী",
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
            id: 19,
            text: "আর আল্লাহ তোমাদের জন্য সহজ করতে চান, কঠিন করতে চান না।",
            source: "কুরআন",
            reference: "সূরা আল-বাকারা (২:১৮৫)",
        },
        {
            id: 20,
            text: "সফলতার জন্য কল্পনা এবং চেষ্টা জরুরি।",
            source: "আলবার্ট আইনস্টাইন",
            reference: "–",
        },
    ];

    const [randomMessage, setRandomMessage] = useState("");

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * dailyMessages.length);
        setRandomMessage(dailyMessages[randomIndex]);
    }, []);
    // Demo data
    const demoData = {
        user: {
            name: "Jihad",
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
                type: "note",
                title: "Buy Groceries",
                time: "9:30 AM",
                icon: "📝",
                date: "2024-06-21",
            },
            {
                type: "expense",
                title: "Lunch",
                amount: "500 Tk",
                time: "1:15 PM",
                icon: "💰",
            },
            {
                type: "event",
                title: "Mom's Birthday",
                time: "7:00 PM",
                icon: "❤️",
            },
            {
                type: "task",
                title: "Finish Report",
                status: "completed",
                time: "10:00 AM",
                icon: "✅",
            },
        ],
    };

    return (
        <div className="min-h-screen bg-base-100 pb-20">
            {/* Greetings */}
            <div className="m-4 bg-gradient-to-l from-[#f88833] to-secondary rounded-2xl p-5 shadow-lg">
                <div className="bg-base-100/20 backdrop-blur-sm rounded-xl p-3">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-2xl font-bold text-white">
                            {demoData.user.greeting}, {demoData.user.name}!
                        </h2>
                        <Link
                            to={"/tasks"}
                            className="w-10 h-10 flex items-center justify-center bg-base-100/30 rounded-full"
                        >
                            <CgProfile className="text-white" size={30} />
                        </Link>
                    </div>
                    <div className="bg-base-100/30 bg-opacity-90 rounded-xl shadow-lg p-6 max-w-xl text-center">
                        <p className="text-lg font-medium text-[#f88833] mb-2">
                            {randomMessage.text}
                        </p>
                        <p className="text-sm text-gray-700">
                            {randomMessage.source} | {randomMessage.reference}
                        </p>
                    </div>
                </div>
            </div>
            {/* Today's Overview */}
            <div className="px-4 mt-4">
                <div className="bg-gradient-to-r from-[#f88833] to-secondary rounded-2xl p-5 shadow-lg">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-base-100/20 backdrop-blur-sm rounded-xl p-3">
                            <div className="text-base-100 text-sm opacity-90">
                                পেন্ডিং টাস্ক
                            </div>
                            <div className="text-base-100 text-2xl font-bold">
                                {demoData.todaySummary.pendingTasks}
                            </div>
                        </div>
                        <div className="bg-base-100/20 backdrop-blur-sm rounded-xl p-3">
                            <div className="text-base-100 text-sm opacity-90">
                                আজকের তারিখ
                            </div>
                            <div className="text-base-100 text-2xl font-bold">
                                {demoData.todaySummary.completedTasks}
                            </div>
                        </div>
                        <div className="bg-base-100/20 backdrop-blur-sm rounded-xl p-3">
                            <div className="text-base-100 text-sm opacity-90">
                                পাওনা টাকা
                            </div>
                            <div className="text-base-100 text-2xl font-bold">
                                {demoData.todaySummary.totalExpenses}৳
                            </div>
                        </div>
                        <div className="bg-base-100/20 backdrop-blur-sm rounded-xl p-3">
                            <div className="text-base-100 text-sm opacity-90">
                                গুরত্বপূর্ণ ঘটনা
                            </div>
                            <div className="text-base-100 text-2xl font-bold">
                                {demoData.todaySummary.upcomingEvents}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="px-6 mt-8">
                <h2 className="text-lg font-semibold text-base-content mb-4">
                    আজকের বিশেষ কি?
                </h2>
                <div className="space-y-3">
                    {demoData.recentActivities.map((activity, index) => (
                        <div
                            key={index}
                            className="bg-base-200 rounded-2xl p-4 shadow-sm border border-[#f0f0f0]"
                        >
                            <div className="flex items-center space-x-3">
                                <div className="text-2xl">{activity.icon}</div>
                                <div className="flex-1">
                                    <p className="font-medium text-base-content">
                                        {activity.title}
                                    </p>
                                    <p className="text-sm text-base-content/60">
                                        {activity.amount &&
                                            `${activity.amount} • `}
                                        {activity.time}
                                    </p>
                                </div>
                                {activity.status === "completed" && (
                                    <div className="badge badge-success badge-sm"></div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
