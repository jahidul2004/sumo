import React, { useState, useMemo, useRef, useCallback } from "react";
import {
    FaBookReader,
    FaHeart,
    FaStar,
    FaPlus,
    FaSearch,
    FaTrash,
    FaEdit,
} from "react-icons/fa";
import { CgCloseO } from "react-icons/cg";

// --- কনস্ট্যান্টস ---
const PRIMARY_COLOR = "#f88833";
const PRIMARY_GRADIENT = "from-[#f88833] to-orange-400";
const TEXT_PRIMARY_COLOR_CLASS = "text-[#f88833]";

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

// --- ডেমো ডেটা ---
const initialBooks = [
    {
        id: 1,
        title: "দি প্রফেট",
        author: "খালিল জিবরান",
        rating: 5,
        genre: "দর্শন",
        summary: "জীবন, প্রেম, কাজ এবং মৃত্যুর উপর একটি কাব্যিক আলোচনা।",
    },
    {
        id: 2,
        title: "হিমু সমগ্র",
        author: "হুমায়ূন আহমেদ",
        rating: 4,
        genre: "উপন্যাস",
        summary: "হলুদ পাঞ্জাবি পরা এক ভবঘুরে যুবকের অদ্ভুত জীবনের গল্প।",
    },
    {
        id: 3,
        title: "The Alchemist",
        author: "পাওলো কোয়েলহো",
        rating: 5,
        genre: "ঐন্দ্রজালিক বাস্তবতা",
        summary:
            "নিজের স্বপ্ন পূরণের জন্য মিশরীয় পিরামিডের দিকে যাত্রা করা এক রাখালের গল্প।",
    },
];

// --- 1. যোগ/আপডেট Modal ---
const BookModal = ({ modalRef, closeModal, handleSave, editingBook }) => {
    const isEditing = !!editingBook;

    // ফর্ম স্টেট
    const [title, setTitle] = useState(editingBook?.title || "");
    const [author, setAuthor] = useState(editingBook?.author || "");
    const [rating, setRating] = useState(editingBook?.rating || 3); // ডিফল্ট রেটিং
    const [summary, setSummary] = useState(editingBook?.summary || "");

    // Modal খোলার সাথে সাথে স্টেট রিসেট করা
    React.useEffect(() => {
        if (editingBook) {
            setTitle(editingBook.title);
            setAuthor(editingBook.author);
            setRating(editingBook.rating);
            setSummary(editingBook.summary);
        } else {
            setTitle("");
            setAuthor("");
            setRating(3);
            setSummary("");
        }
    }, [editingBook]);

    const handleSubmit = (e) => {
        e.preventDefault();

        handleSave(
            {
                id: isEditing ? editingBook.id : Date.now(),
                title,
                author,
                rating,
                genre: editingBook?.genre || "সাধারণ", // জেনার ফিক্সড রাখা
                summary,
            },
            isEditing
        );
        closeModal();
    };

    return (
        <dialog ref={modalRef} className="modal">
            <div className="modal-box bg-white/80 backdrop-blur-lg p-6 max-w-sm mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-bold text-gray-800">
                        {isEditing ? "বই আপডেট করুন" : "নতুন বই যোগ করুন"}
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

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="বইয়ের নাম"
                        className="input input-bordered w-full my-2 bg-white/90 border-gray-300 focus:border-[#f88833]"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="লেখকের নাম"
                        className="input input-bordered w-full my-2 bg-white/90 border-gray-300 focus:border-[#f88833]"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />

                    {/* রেটিং ইনপুট */}
                    <div className="flex items-center justify-between my-4 bg-white/90 p-3 rounded-lg border border-gray-300">
                        <label className="font-semibold text-gray-700">
                            আপনার রেটিং (৫-এর মধ্যে):
                        </label>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <FaHeart
                                    key={star}
                                    className={`text-2xl cursor-pointer transition-colors ${
                                        star <= rating
                                            ? "text-red-500"
                                            : "text-gray-300"
                                    }`}
                                    onClick={() => setRating(star)}
                                />
                            ))}
                        </div>
                    </div>

                    <textarea
                        placeholder="সংক্ষিপ্ত বিবরণ বা আপনার মন্তব্য (ঐচ্ছিক)"
                        className="textarea textarea-bordered w-full my-2 bg-white/90 border-gray-300 focus:border-[#f88833]"
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        rows={3}
                    />

                    <button
                        type="submit"
                        style={{ backgroundColor: PRIMARY_COLOR }}
                        className="btn w-full my-3 text-white border-0 shadow-lg hover:bg-opacity-90"
                    >
                        {isEditing ? "আপডেট করুন" : "সেভ করুন"}
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

// --- 2. মূল FavoriteBooks কম্পোনেন্ট ---
const FavoriteBooks = () => {
    const [books, setBooks] = useState(initialBooks);
    const [searchTerm, setSearchTerm] = useState("");
    const [editingBook, setEditingBook] = useState(null);
    const addUpdateModalRef = useRef(null);

    // Modal কন্ট্রোল
    const openModal = (book = null) => {
        setEditingBook(book);
        addUpdateModalRef.current?.showModal();
    };
    const closeModal = () => addUpdateModalRef.current?.close();

    // বই যোগ/আপডেট
    const handleSaveBook = useCallback((newBook, isEditing) => {
        setBooks((prev) => {
            if (isEditing) {
                return prev.map((b) => (b.id === newBook.id ? newBook : b));
            } else {
                return [newBook, ...prev];
            }
        });
    }, []);

    // বই ডিলিট
    const handleDeleteBook = (id) => {
        if (
            window.confirm(
                "আপনি কি নিশ্চিত এই বইটি তালিকা থেকে মুছে ফেলতে চান?"
            )
        ) {
            setBooks((prev) => prev.filter((b) => b.id !== id));
        }
    };

    // --- সার্চিং লজিক ---
    const filteredBooks = useMemo(() => {
        if (!searchTerm.trim()) return books;
        const lowerCaseSearch = searchTerm.toLowerCase();

        return books.filter(
            (item) =>
                item.title.toLowerCase().includes(lowerCaseSearch) ||
                item.author.toLowerCase().includes(lowerCaseSearch)
        );
    }, [books, searchTerm]);

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* 1. Header & Search */}
            <div className="p-4 pt-8 sticky top-0 bg-gray-50/80 backdrop-blur-sm z-30">
                <div
                    className={`bg-gradient-to-l ${PRIMARY_GRADIENT} rounded-2xl shadow-xl py-3 px-4 max-w-lg mx-auto flex justify-between items-center`}
                >
                    <h1 className="text-white text-2xl font-bold flex items-center gap-2">
                        <FaBookReader className="text-white text-[24px]" />
                        পছন্দের বই
                    </h1>
                    <button
                        onClick={() => openModal(null)}
                        className="bg-white/30 p-3 rounded-full hover:bg-white/50 transition-colors shadow-md"
                        title="নতুন বই যোগ করুন"
                    >
                        <FaPlus className="text-white text-[20px]" />
                    </button>
                </div>

                {/* Search Bar */}
                <div className="max-w-lg mx-auto mt-4 relative">
                    <FaSearch
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-400`}
                    />
                    <input
                        type="text"
                        placeholder="বইয়ের নাম বা লেখক দিয়ে খুঁজুন..."
                        className="input input-bordered w-full pl-10 bg-white/70 backdrop-blur-md border-gray-300 focus:border-[#f88833] focus:ring-1 focus:ring-[#f88833] transition-colors"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* 2. Books List */}
            <div className="max-w-lg mx-auto px-4 mt-6">
                {filteredBooks.length > 0 ? (
                    filteredBooks.map((book) => (
                        <GlassCard
                            key={book.id}
                            className="my-3 p-5 flex flex-col hover:shadow-xl"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800">
                                        {book.title}
                                    </h2>
                                    <p className="text-sm text-gray-600 italic">
                                        লেখক: {book.author}
                                    </p>
                                </div>
                                {/* রেটিং ডিসপ্লে */}
                                <div className="flex items-center space-x-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <FaHeart
                                            key={star}
                                            className={`text-lg ${
                                                star <= book.rating
                                                    ? "text-red-500"
                                                    : "text-gray-300"
                                            }`}
                                        />
                                    ))}
                                    <span className="text-xs text-gray-500 ml-1">
                                        ({book.rating}/5)
                                    </span>
                                </div>
                            </div>

                            <p className="text-sm text-gray-700 mt-2 border-l-2 border-gray-300 pl-3">
                                {book.summary ||
                                    "কোনো সংক্ষিপ্ত বিবরণ দেওয়া হয়নি।"}
                            </p>

                            {/* Actions */}
                            <div className="flex justify-end space-x-2 mt-4 pt-3 border-t border-gray-200">
                                <button
                                    onClick={() => openModal(book)}
                                    title="এডিট করুন"
                                    className="btn btn-sm btn-ghost text-gray-600 hover:text-orange-500"
                                >
                                    <FaEdit className="text-lg" />
                                </button>
                                <button
                                    onClick={() => handleDeleteBook(book.id)}
                                    title="ডিলিট করুন"
                                    className="btn btn-sm btn-ghost text-gray-600 hover:text-red-500"
                                >
                                    <FaTrash className="text-lg" />
                                </button>
                            </div>
                        </GlassCard>
                    ))
                ) : (
                    <div className="text-center p-10 text-gray-500 bg-white/70 rounded-xl backdrop-blur-sm shadow-lg mx-auto my-5">
                        <p>
                            আপনার পছন্দের বইয়ের তালিকায় কোনো বই খুঁজে পাওয়া
                            যায়নি।
                        </p>
                    </div>
                )}
            </div>

            {/* Modal Component */}
            <BookModal
                modalRef={addUpdateModalRef}
                closeModal={closeModal}
                handleSave={handleSaveBook}
                editingBook={editingBook}
            />
        </div>
    );
};

export default FavoriteBooks;
