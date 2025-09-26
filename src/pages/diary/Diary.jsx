import React, { useState, useMemo, useRef } from "react";
import {
    MdOutlineAddTask,
    MdSearch,
    MdDateRange,
    MdDeleteForever,
} from "react-icons/md";
import { CgCloseO } from "react-icons/cg";
import { GiNotebook } from "react-icons/gi";

// আপনার প্রাইমারি কালার
const PRIMARY_COLOR = "#f88833";
const PRIMARY_COLOR_CLASS = "text-[#f88833]";

// iOS Waterglass (Glassmorphism) Card Style
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

// --- 1. ডায়েরি বিস্তারিত Modal ---
const DiaryDetailsModal = ({ entry, modalRef, closeModal }) => {
    if (!entry) return null;

    return (
        <dialog ref={modalRef} className="modal">
            <div className="modal-box bg-white/80 backdrop-blur-lg p-6 max-w-sm mx-auto">
                <div className="flex justify-between items-start mb-4">
                    <h1 className="text-2xl font-bold text-gray-800">
                        {entry.title}
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

                <div className="flex items-center text-sm text-gray-600 mb-4">
                    <MdDateRange className="mr-2 text-lg text-gray-500" />
                    <span className="font-medium">তারিখ: {entry.date}</span>
                </div>

                <p className="text-md text-gray-700 whitespace-pre-wrap border-t pt-4">
                    {entry.content}
                </p>

                <div className="flex justify-end gap-3 mt-6">
                    {/* এখানে এডিট বাটন বা ডিলিট বাটন যোগ করা যেতে পারে */}
                    <button
                        className="btn btn-sm flex items-center gap-1 bg-red-500 text-white hover:bg-red-600 border-0"
                        // onClick={() => handleDelete(entry.id)} // handleDelete লজিক যোগ করুন
                    >
                        <MdDeleteForever size={20} /> ডিলিট
                    </button>
                </div>
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

// --- 2. নতুন এন্ট্রি যোগ করার Modal ---
const AddDiaryModal = ({ modalRef, closeModal }) => {
    const handleAdd = (e) => {
        e.preventDefault();
        // ডেমো: এন্ট্রি যোগ করার লজিক এখানে
        console.log("Adding new diary entry...");
        closeModal();
    };

    return (
        <dialog ref={modalRef} className="modal">
            <div className="modal-box bg-white/80 backdrop-blur-lg p-6 max-w-sm mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-bold text-gray-800">
                        নতুন এন্ট্রি যোগ করুন
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
                        placeholder="শিরোনাম"
                        className="input input-bordered w-full my-2 bg-white/90 border-gray-300 focus:border-[#f88833]"
                        required
                    />
                    <input
                        type="date"
                        className="input input-bordered w-full my-2 bg-white/90 border-gray-300 focus:border-[#f88833]"
                        required
                        defaultValue={new Date().toISOString().slice(0, 10)}
                    />
                    <textarea
                        placeholder="আপনার আজকের ভাবনা..."
                        rows="6"
                        className="textarea textarea-bordered w-full my-2 bg-white/90 border-gray-300 focus:border-[#f88833]"
                        required
                    ></textarea>

                    <button
                        type="submit"
                        style={{ backgroundColor: PRIMARY_COLOR }}
                        className="btn w-full my-2 text-white border-0 shadow-lg hover:bg-opacity-90"
                    >
                        এন্ট্রি সেভ করুন
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

// --- 3. মূল Diary কম্পোনেন্ট ---
const Diary = () => {
    const [dairyEntries, setDairyEntries] = useState([
        {
            id: 1,
            date: "2024-10-01",
            title: "আজকের দিনটি",
            content:
                "আজকের দিনটি খুব ভালো কাটলো। অনেক কিছু শিখলাম এবং নতুন কিছু অভিজ্ঞতা অর্জন করলাম।",
        },
        {
            id: 2,
            date: "2024-10-02",
            title: "গুরুত্বপূর্ণ মিটিং",
            content:
                "আজকের দিনটি একটু ব্যস্ত ছিলো, কিন্তু কাজগুলো সফলভাবে সম্পন্ন করতে পেরেছি। নতুন প্রজেক্টের মিটিং দারুণ হলো।",
        },
        {
            id: 3,
            date: "2024-10-03",
            title: "শরীরচর্চা ও বিশ্রাম",
            content:
                "আজকের দিনটি একটু ক্লান্তিকর ছিলো, তবে কিছু সময় বিশ্রাম নিয়েছি এবং ভালো লাগলো। সন্ধ্যায় যোগা সেশন করলাম।",
        },
        {
            id: 4,
            date: "2024-09-30",
            title: "বন্ধুর সাথে আড্ডা",
            content:
                "গত সন্ধ্যায় বন্ধুর সাথে দেখা হলো, অনেক দিন পর সবাই মিলে দারুণ মজা করলাম।",
        },
        {
            id: 5,
            date: "2024-09-29",
            title: "নতুন দক্ষতা অর্জন",
            content:
                "নতুন করে একটি কোডিং ল্যাঙ্গুয়েজ শেখা শুরু করলাম। বেশ চ্যালেঞ্জিং তবে আনন্দদায়ক।",
        },
    ]);
    const [searchTerm, setSearchTerm] = useState("");
    const detailsModalRef = useRef(null);
    const addModalRef = useRef(null);
    const [selectedEntry, setSelectedEntry] = useState(null);

    // Modal কন্ট্রোল
    const openAddModal = () => addModalRef.current?.showModal();
    const closeAddModal = () => addModalRef.current?.close();

    const openDetailsModal = (entry) => {
        setSelectedEntry(entry);
        detailsModalRef.current?.showModal();
    };
    const closeDetailsModal = () => {
        detailsModalRef.current?.close();
        setSelectedEntry(null);
    };

    // --- সার্চিং লজিক ---
    const filteredEntries = useMemo(() => {
        let tempEntries = [...dairyEntries];
        if (searchTerm.trim()) {
            const lowerCaseSearch = searchTerm.toLowerCase();
            tempEntries = tempEntries.filter(
                (entry) =>
                    entry.title.toLowerCase().includes(lowerCaseSearch) ||
                    entry.content.toLowerCase().includes(lowerCaseSearch) ||
                    entry.date.includes(lowerCaseSearch) // তারিখ সার্চের জন্য
            );
        }
        // তারিখ অনুযায়ী ডিসেন্ডিং অর্ডারে সাজানো
        tempEntries.sort((a, b) => new Date(b.date) - new Date(a.date));

        return tempEntries;
    }, [dairyEntries, searchTerm]);

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* 1. Header Section (Sticky) */}
            <div className="p-4 sticky top-0 bg-gray-50/80 backdrop-blur-sm z-30">
                <div
                    style={{ backgroundColor: PRIMARY_COLOR }}
                    className="rounded-2xl shadow-xl py-3 px-4 max-w-lg mx-auto flex justify-between items-center"
                >
                    <h1 className="text-white text-2xl font-bold flex items-center gap-2">
                        <GiNotebook className="text-white text-[28px]" />
                        সুমুর ডায়েরি
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
                        placeholder="শিরোনাম বা তারিখ দিয়ে খুঁজুন..."
                        className="input input-bordered w-full pl-10 bg-white/70 backdrop-blur-md border-gray-300 focus:border-[#f88833] focus:ring-1 focus:ring-[#f88833] transition-colors"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* 3. Diary Entry List */}
            <div className="max-w-lg mx-auto px-4 mt-4">
                {filteredEntries.length > 0 ? (
                    filteredEntries.map((entry) => (
                        <GlassCard
                            key={entry.id}
                            onClick={() => openDetailsModal(entry)}
                            className="my-3 cursor-pointer active:scale-[0.99] hover:shadow-2xl"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <h2 className="text-lg font-semibold text-gray-800">
                                    {entry.title}
                                </h2>
                                <div className="flex items-center text-sm text-gray-600">
                                    <MdDateRange className="mr-1 text-base text-gray-500" />
                                    {entry.date}
                                </div>
                            </div>

                            <p className="text-sm text-gray-600 line-clamp-2">
                                {entry.content}
                            </p>
                        </GlassCard>
                    ))
                ) : (
                    <div className="text-center p-10 text-gray-500 bg-white/70 rounded-xl backdrop-blur-sm shadow-lg mx-auto my-5">
                        <p>
                            আপনার সার্চ অনুযায়ী কোনো ডায়েরি এন্ট্রি খুঁজে পাওয়া
                            যায়নি।
                        </p>
                    </div>
                )}
            </div>

            {/* Modals */}
            <AddDiaryModal modalRef={addModalRef} closeModal={closeAddModal} />
            <DiaryDetailsModal
                entry={selectedEntry}
                modalRef={detailsModalRef}
                closeModal={closeDetailsModal}
            />
        </div>
    );
};

export default Diary;
