import React, { useState, useMemo, useRef, useCallback } from "react";
import {
    FaPlus,
    FaSearch,
    FaUserCircle,
    FaPhone,
    FaEnvelope,
    FaEdit,
    FaTrash,
    FaSms,
    FaMobileAlt,
} from "react-icons/fa";
import { LuContact } from "react-icons/lu";
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
const initialContacts = [
    {
        id: 1,
        name: "আব্দুল্লাহ রহমান",
        phone: "+8801712345678",
        email: "abdullah@example.com",
        isFavorite: true,
    },
    {
        id: 2,
        name: "তানজিলা আক্তার",
        phone: "+8801898765432",
        email: "tanjila@example.com",
        isFavorite: false,
    },
    {
        id: 3,
        name: "ফাহিম আহমেদ",
        phone: "+8801911223344",
        email: "fahim@example.com",
        isFavorite: false,
    },
    {
        id: 4,
        name: "রিফাত জাহান",
        phone: "+8801550998877",
        email: "rifat@example.com",
        isFavorite: true,
    },
];

// --- 1. যোগ/আপডেট Modal ---
const ContactModal = ({ modalRef, closeModal, handleSave, editingContact }) => {
    const isEditing = !!editingContact;

    // ফর্ম স্টেট সেট করা
    const [name, setName] = useState(editingContact?.name || "");
    const [phone, setPhone] = useState(editingContact?.phone || "");
    const [email, setEmail] = useState(editingContact?.email || "");

    // Modal খোলার সাথে সাথে স্টেট রিসেট করা
    React.useEffect(() => {
        if (editingContact) {
            setName(editingContact.name);
            setPhone(editingContact.phone);
            setEmail(editingContact.email);
        } else {
            setName("");
            setPhone("");
            setEmail("");
        }
    }, [editingContact]);

    const handleSubmit = (e) => {
        e.preventDefault();

        handleSave(
            {
                id: isEditing ? editingContact.id : Date.now(),
                name,
                phone,
                email,
                isFavorite: editingContact?.isFavorite || false, // ফেভারিট স্ট্যাটাস বজায় রাখা
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
                        {isEditing
                            ? "কন্ট্যাক্ট আপডেট করুন"
                            : "নতুন কন্ট্যাক্ট যোগ করুন"}
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
                        placeholder="নাম (আব্দুল্লাহ রহমান)"
                        className="input input-bordered w-full my-2 bg-white/90 border-gray-300 focus:border-[#f88833]"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="tel"
                        placeholder="ফোন নম্বর (+৮৮০...)"
                        className="input input-bordered w-full my-2 bg-white/90 border-gray-300 focus:border-[#f88833]"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="ইমেইল (ঐচ্ছিক)"
                        className="input input-bordered w-full my-2 bg-white/90 border-gray-300 focus:border-[#f88833]"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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

// --- 2. মূল ContactList কম্পোনেন্ট ---
const ContactList = () => {
    const [contacts, setContacts] = useState(initialContacts);
    const [searchTerm, setSearchTerm] = useState("");
    const [editingContact, setEditingContact] = useState(null);
    const addUpdateModalRef = useRef(null);

    // Modal কন্ট্রোল
    const openModal = (contact = null) => {
        setEditingContact(contact);
        addUpdateModalRef.current?.showModal();
    };
    const closeModal = () => addUpdateModalRef.current?.close();

    // কন্ট্যাক্ট যোগ/আপডেট
    const handleSaveContact = useCallback((newContact, isEditing) => {
        setContacts((prev) => {
            if (isEditing) {
                return prev.map((c) =>
                    c.id === newContact.id ? newContact : c
                );
            } else {
                return [newContact, ...prev];
            }
        });
    }, []);

    // কন্ট্যাক্ট ডিলিট
    const handleDeleteContact = (id) => {
        if (window.confirm("আপনি কি নিশ্চিত এই কন্ট্যাক্টটি ডিলিট করতে চান?")) {
            setContacts((prev) => prev.filter((c) => c.id !== id));
        }
    };

    // --- সার্চিং, ফিল্টারিং ও সর্টিং লজিক ---
    const sortedAndFilteredContacts = useMemo(() => {
        const lowerCaseSearch = searchTerm.toLowerCase();

        const filtered = contacts.filter(
            (item) =>
                item.name.toLowerCase().includes(lowerCaseSearch) ||
                item.phone.includes(lowerCaseSearch) ||
                item.email.toLowerCase().includes(lowerCaseSearch)
        );

        // নামের আদ্যক্ষর অনুযায়ী A-Z সাজানো
        filtered.sort((a, b) =>
            a.name.localeCompare(b.name, "bn", { sensitivity: "base" })
        );

        return filtered;
    }, [contacts, searchTerm]);

    // গ্রুপ করা (A, B, C... বা বিশেষ গ্রুপ)
    const groupedContacts = useMemo(() => {
        return sortedAndFilteredContacts.reduce((acc, contact) => {
            const firstLetter = contact.name[0].toUpperCase();
            if (!acc[firstLetter]) {
                acc[firstLetter] = [];
            }
            acc[firstLetter].push(contact);
            return acc;
        }, {});
    }, [sortedAndFilteredContacts]);

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* 1. Header & Search */}
            <div className="p-4 pt-8 sticky top-0 bg-gray-50/80 backdrop-blur-sm z-30">
                <div
                    className={`bg-gradient-to-l ${PRIMARY_GRADIENT} rounded-2xl shadow-xl py-3 px-4 max-w-lg mx-auto flex justify-between items-center`}
                >
                    <h1 className="text-white text-2xl font-bold flex items-center gap-2">
                        <LuContact className="text-white text-[24px]" />
                        কন্ট্যাক্ট লিস্ট
                    </h1>
                    <button
                        onClick={() => openModal(null)}
                        className="bg-white/30 p-3 rounded-full hover:bg-white/50 transition-colors shadow-md"
                        title="নতুন কন্ট্যাক্ট যোগ করুন"
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
                        placeholder="নাম বা নম্বর দিয়ে খুঁজুন..."
                        className="input input-bordered w-full pl-10 bg-white/70 backdrop-blur-md border-gray-300 focus:border-[#f88833] focus:ring-1 focus:ring-[#f88833] transition-colors"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* 2. Contacts List */}
            <div className="max-w-lg mx-auto px-4 mt-6">
                {Object.keys(groupedContacts).length > 0 ? (
                    Object.keys(groupedContacts).map((letter) => (
                        <div key={letter} className="mb-6">
                            {/* Alphabet Header (A, B, C...) */}
                            <h3
                                className={`text-lg font-bold sticky top-[120px] bg-gray-50/90 backdrop-blur-sm pt-2 pb-1 z-20 ${TEXT_PRIMARY_COLOR_CLASS}`}
                            >
                                {letter}
                            </h3>

                            <div className="space-y-2">
                                {groupedContacts[letter].map((contact) => (
                                    <GlassCard
                                        key={contact.id}
                                        className="flex items-center p-4 hover:shadow-xl group"
                                    >
                                        <FaUserCircle className="text-4xl text-gray-400 mr-4" />

                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-gray-800 truncate">
                                                {contact.name}
                                            </p>
                                            <p className="text-sm text-gray-600 truncate flex items-center gap-1">
                                                <FaMobileAlt className="text-xs" />{" "}
                                                {contact.phone}
                                            </p>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center space-x-2 ml-4">
                                            <a
                                                href={`tel:${contact.phone}`}
                                                title="কল করুন"
                                                className="btn btn-sm btn-ghost text-gray-600 hover:text-green-500"
                                            >
                                                <FaPhone className="text-lg" />
                                            </a>
                                            <a
                                                href={`sms:${contact.phone}`}
                                                title="মেসেজ পাঠান"
                                                className="btn btn-sm btn-ghost text-gray-600 hover:text-blue-500"
                                            >
                                                <FaSms className="text-lg" />
                                            </a>
                                            <button
                                                onClick={() =>
                                                    openModal(contact)
                                                }
                                                title="এডিট করুন"
                                                className="btn btn-sm btn-ghost text-gray-600 hover:text-orange-500"
                                            >
                                                <FaEdit className="text-lg" />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDeleteContact(
                                                        contact.id
                                                    )
                                                }
                                                title="ডিলিট করুন"
                                                className="btn btn-sm btn-ghost text-gray-600 hover:text-red-500"
                                            >
                                                <FaTrash className="text-lg" />
                                            </button>
                                        </div>
                                    </GlassCard>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center p-10 text-gray-500 bg-white/70 rounded-xl backdrop-blur-sm shadow-lg mx-auto my-5">
                        <p>কোনো কন্ট্যাক্ট খুঁজে পাওয়া যায়নি।</p>
                        <button
                            onClick={() => openModal(null)}
                            style={{ backgroundColor: PRIMARY_COLOR }}
                            className="btn btn-sm text-white border-0 mt-3"
                        >
                            নতুন কন্ট্যাক্ট যোগ করুন
                        </button>
                    </div>
                )}
            </div>

            {/* Modal Component */}
            <ContactModal
                modalRef={addUpdateModalRef}
                closeModal={closeModal}
                handleSave={handleSaveContact}
                editingContact={editingContact}
            />
        </div>
    );
};

export default ContactList;
