/* eslint-disable no-unused-vars */
import { useState, useMemo, useRef } from "react";
import {
    MdOutlineAddTask,
    MdSearch,
    MdDateRange,
    MdEventNote,
} from "react-icons/md";
import { CgCloseO } from "react-icons/cg";
import { FaBirthdayCake, FaGift } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";

const PRIMARY_COLOR = "#f88833";
const PRIMARY_COLOR_CLASS = "text-[#f88833]";

const GlassCard = ({ children, className = "" }) => (
    <div
        className={`
        bg-white/30 backdrop-blur-md rounded-xl p-4 shadow-xl border border-white/50 transition-all duration-300
        ${className}
    `}
    >
        {children}
    </div>
);

const initialDates = [
    {
        id: 1,
        date: "2025-10-05",
        title: "ছোট বোনের জন্মদিন 🎉",
        icon: FaBirthdayCake,
    },
    {
        id: 2,
        date: "2025-10-25",
        title: "প্রজেক্ট সাবমিশন ডেডলাইন",
        icon: MdEventNote,
    },
    {
        id: 3,
        date: "2026-02-14",
        title: "ভ্যালেন্টাইনস ডে ❤️",
        icon: AiFillHeart,
    },
    {
        id: 4,
        date: "2025-09-28",
        title: "বাবার ঔষধ আনার দিন",
        icon: MdEventNote,
    },
    { id: 5, date: "2025-12-31", title: "নিউ ইয়ার'স ইভ", icon: FaGift },
    {
        id: 6,
        date: "2025-10-15",
        title: "মার্কেটিং সেমিনার",
        icon: MdEventNote,
    },
    {
        id: 7,
        date: "2025-09-27",
        title: "ইমেইল চেক করার শেষ সময়",
        icon: MdEventNote,
    },
    {
        id: 8,
        date: "2025-11-10",
        title: "ব্যাংকের কিস্তি প্রদানের তারিখ",
        icon: MdEventNote,
    },
];

const AddDateModal = ({ modalRef, closeModal }) => {
    const handleAdd = (e) => {
        e.preventDefault();
        console.log("Adding new important date...");
        closeModal();
    };

    return (
        <dialog ref={modalRef} className="modal">
            <div className="modal-box bg-white/80 backdrop-blur-lg p-6 max-w-sm mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-bold text-gray-800">
                        গুরুত্বপূর্ণ তারিখ যোগ করুন
                    </h1>
                    <button
                        onClick={closeModal}
                        className="btn btn-sm btn-ghost"
                    >
                        <CgCloseO
                            size={24}
                            className="text-gray-500 hover:text-gray-700"
                        />
                    </button>
                </div>

                <form onSubmit={handleAdd}>
                    <input
                        type="text"
                        placeholder="ইভেন্টের নাম (যেমন: বাবার জন্মদিন)"
                        className="input input-bordered w-full my-2 bg-white/90 border-gray-300 focus:border-[#f88833]"
                        required
                    />
                    <input
                        type="date"
                        className="input input-bordered w-full my-2 bg-white/90 border-gray-300 focus:border-[#f88833]"
                        required
                    />

                    <button
                        type="submit"
                        style={{ backgroundColor: PRIMARY_COLOR }}
                        className="btn w-full my-2 text-white border-0 shadow-lg hover:bg-opacity-90"
                    >
                        তারিখ সেভ করুন
                    </button>
                </form>
            </div>
            <form
                method="dialog"
                className="modal-backdrop"
                onClick={closeModal}
            >
                <button>বন্ধ করুন</button>
            </form>
        </dialog>
    );
};

const ImportantDates = () => {
    const [dates, setDates] = useState(initialDates);
    const [searchTerm, setSearchTerm] = useState("");
    const addModalRef = useRef(null);

    const openAddModal = () => addModalRef.current?.showModal();
    const closeAddModal = () => addModalRef.current?.close();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sortedAndFilteredDates = useMemo(() => {
        let tempDates = [...dates];

        if (searchTerm.trim()) {
            const lowerCaseSearch = searchTerm.toLowerCase();
            tempDates = tempDates.filter(
                (item) =>
                    item.title.toLowerCase().includes(lowerCaseSearch) ||
                    item.date.includes(lowerCaseSearch)
            );
        }

        tempDates.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);

            const isFutureA = dateA >= today;
            const isFutureB = dateB >= today;

            if (isFutureA && !isFutureB) return -1;
            if (!isFutureA && isFutureB) return 1;

            if (isFutureA && isFutureB) {
                return dateA - dateB;
            } else {
                return dateB - dateA;
            }
        });

        return tempDates;
    }, [dates, searchTerm, today]);

    const IconRenderer = ({ date, icon: Icon }) => {
        const dateObj = new Date(date);
        const diffTime = dateObj.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        let daysText;
        if (diffDays === 0) {
            daysText = "আজকে!";
        } else if (diffDays === 1) {
            daysText = "আগামীকাল";
        } else if (diffDays > 0) {
            daysText = `${diffDays} দিন বাকি`;
        } else {
            daysText = "অতীত";
        }

        return (
            <div className="flex flex-col items-center justify-center space-y-1">
                <div
                    style={{ color: PRIMARY_COLOR }}
                    className="p-2 rounded-full bg-white shadow-md"
                >
                    <Icon className="text-2xl" />
                </div>
                <span
                    className={`text-xs font-semibold ${
                        diffDays >= 0 ? PRIMARY_COLOR_CLASS : "text-gray-500"
                    }`}
                >
                    {daysText}
                </span>
            </div>
        );
    };

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            <div className="p-4 pt-8 sticky top-0 bg-gray-50/80 backdrop-blur-sm z-30">
                <div
                    style={{ backgroundColor: PRIMARY_COLOR }}
                    className="rounded-2xl shadow-xl py-3 px-4 max-w-lg mx-auto flex justify-between items-center"
                >
                    <h1 className="text-white text-2xl font-bold flex items-center gap-2">
                        <MdDateRange className="text-white text-[28px]" />
                        গুরুত্বপূর্ণ তারিখ
                    </h1>
                    <button
                        onClick={openAddModal}
                        className="bg-white/30 p-3 rounded-xl hover:bg-white/50 transition-colors shadow-md"
                    >
                        <MdOutlineAddTask className="text-white text-[28px]" />
                    </button>
                </div>

                {/* 2. Search Bar (Glass Style) */}
                <div className="max-w-lg mx-auto mt-4 relative">
                    <MdSearch
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-xl ${PRIMARY_COLOR_CLASS}`}
                    />
                    <input
                        type="text"
                        placeholder="তারিখ বা ইভেন্টের নাম দিয়ে খুঁজুন..."
                        className="input input-bordered w-full pl-10 bg-white/70 backdrop-blur-md border-gray-300 focus:border-[#f88833] focus:ring-1 focus:ring-[#f88833] transition-colors"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* 3. Important Dates List */}
            <div className="max-w-lg mx-auto px-4 mt-4">
                {sortedAndFilteredDates.length > 0 ? (
                    sortedAndFilteredDates.map((item) => (
                        <GlassCard
                            key={item.id}
                            className="my-3 flex justify-between items-center cursor-pointer active:scale-[0.99] hover:shadow-2xl"
                        >
                            <div className="flex-1 mr-4">
                                <h2 className="text-lg font-semibold text-gray-800">
                                    {item.title}
                                </h2>
                                <p className="text-sm text-gray-600 flex items-center gap-1">
                                    <MdDateRange className="text-base text-gray-500" />
                                    {item.date}
                                </p>
                            </div>
                            <IconRenderer
                                date={item.date}
                                icon={item.icon || MdEventNote}
                            />
                        </GlassCard>
                    ))
                ) : (
                    <div className="text-center p-10 text-gray-500 bg-white/70 rounded-xl backdrop-blur-sm shadow-lg mx-auto my-5">
                        <p>
                            আপনার সার্চ অনুযায়ী কোনো গুরুত্বপূর্ণ তারিখ খুঁজে
                            পাওয়া যায়নি।
                        </p>
                    </div>
                )}
            </div>

            {/* Modal */}
            <AddDateModal modalRef={addModalRef} closeModal={closeAddModal} />
        </div>
    );
};

export default ImportantDates;
