import React, { useState, useMemo, useRef, useCallback } from "react";
import {
    FaKey,
    FaSearch,
    FaEye,
    FaEyeSlash,
    FaEdit,
    FaTrash,
    FaPlus,
    FaCopy,
} from "react-icons/fa";
import { CgCloseO } from "react-icons/cg";
import { MdVerifiedUser } from "react-icons/md";

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
const initialCredentials = [
    {
        id: 1,
        siteName: "Google",
        identifier: "user.jihad@gmail.com",
        encryptedPass: btoa("MySecurePass123"),
        lastUpdated: "2025-09-20",
    },
    {
        id: 2,
        siteName: "Facebook",
        identifier: "+88017XXXXXXXX",
        encryptedPass: btoa("FbPass@2025"),
        lastUpdated: "2025-09-15",
    },
    {
        id: 3,
        siteName: "GitHub",
        identifier: "jihad_dev",
        encryptedPass: btoa("GitCode#101"),
        lastUpdated: "2025-08-01",
    },
];

// Base64 এনকোডিং/ডিকোডিং ফাংশন
const encodePassword = (password) => btoa(password);
const decodePassword = (encryptedPass) => atob(encryptedPass);

// --- 1. যোগ/আপডেট Modal ---
const CredentialModal = ({
    modalRef,
    closeModal,
    handleSave,
    editingCredential,
}) => {
    const isEditing = !!editingCredential;

    // ফর্ম স্টেট সেট করা
    const [siteName, setSiteName] = useState(editingCredential?.siteName || "");
    const [identifier, setIdentifier] = useState(
        editingCredential?.identifier || ""
    );
    const [password, setPassword] = useState(
        editingCredential ? decodePassword(editingCredential.encryptedPass) : ""
    );
    const [showPassword, setShowPassword] = useState(false);

    // Modal খোলার সাথে সাথে স্টেট রিসেট করা
    React.useEffect(() => {
        if (editingCredential) {
            setSiteName(editingCredential.siteName);
            setIdentifier(editingCredential.identifier);
            setPassword(decodePassword(editingCredential.encryptedPass));
        } else {
            setSiteName("");
            setIdentifier("");
            setPassword("");
        }
    }, [editingCredential]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const encryptedPass = encodePassword(password);

        handleSave(
            {
                id: isEditing ? editingCredential.id : Date.now(),
                siteName,
                identifier,
                encryptedPass,
                lastUpdated: new Date().toISOString().slice(0, 10),
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
                            ? "ক্রেডেনশিয়াল আপডেট করুন"
                            : "নতুন ক্রেডেনশিয়াল যোগ করুন"}
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
                        placeholder="সাইটের নাম (যেমন: Google, Facebook)"
                        className="input input-bordered w-full my-2 bg-white/90 border-gray-300 focus:border-[#f88833]"
                        value={siteName}
                        onChange={(e) => setSiteName(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="ইউজারনেম/ইমেইল/ফোন"
                        className="input input-bordered w-full my-2 bg-white/90 border-gray-300 focus:border-[#f88833]"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        required
                    />

                    <div className="relative my-2">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="পাসওয়ার্ড"
                            className="input input-bordered w-full pr-12 bg-white/90 border-gray-300 focus:border-[#f88833]"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-0 top-0 h-full p-3 text-gray-500 hover:text-gray-700"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

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

// --- 2. মূল Credential কম্পোনেন্ট ---
const Credential = () => {
    const [credentials, setCredentials] = useState(initialCredentials);
    const [searchTerm, setSearchTerm] = useState("");
    const [editingCredential, setEditingCredential] = useState(null);
    const addUpdateModalRef = useRef(null);

    // Modal কন্ট্রোল
    const openModal = (credential = null) => {
        setEditingCredential(credential);
        addUpdateModalRef.current?.showModal();
    };
    const closeModal = () => addUpdateModalRef.current?.close();

    // ক্রেডেনশিয়াল যোগ/আপডেট
    const handleSaveCredential = useCallback((newCredential, isEditing) => {
        setCredentials((prev) => {
            if (isEditing) {
                return prev.map((c) =>
                    c.id === newCredential.id ? newCredential : c
                );
            } else {
                return [newCredential, ...prev];
            }
        });
    }, []);

    // ক্রেডেনশিয়াল ডিলিট
    const handleDeleteCredential = (id) => {
        if (window.confirm("আপনি কি নিশ্চিত এটি ডিলিট করতে চান?")) {
            setCredentials((prev) => prev.filter((c) => c.id !== id));
        }
    };

    // --- সার্চিং লজিক ---
    const filteredCredentials = useMemo(() => {
        if (!searchTerm.trim()) return credentials;
        const lowerCaseSearch = searchTerm.toLowerCase();

        return credentials
            .filter(
                (item) =>
                    item.siteName.toLowerCase().includes(lowerCaseSearch) ||
                    item.identifier.toLowerCase().includes(lowerCaseSearch)
            )
            .sort((a, b) => a.siteName.localeCompare(b.siteName)); // সাইটের নাম অনুযায়ী সাজানো
    }, [credentials, searchTerm]);

    // কপি ফাংশন (ডেমো)
    const handleCopy = (encryptedPass) => {
        const password = decodePassword(encryptedPass);
        // বাস্তব কপি লজিক
        navigator.clipboard.writeText(password).then(() => {
            alert("পাসওয়ার্ড কপি করা হয়েছে!");
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* 1. Header & Search */}
            <div className="p-4 pt-8 sticky top-0 bg-gray-50/80 backdrop-blur-sm z-30">
                <div
                    className={`bg-gradient-to-l ${PRIMARY_GRADIENT} rounded-2xl shadow-xl py-3 px-4 max-w-lg mx-auto flex justify-between items-center`}
                >
                    <h1 className="text-white text-2xl font-bold flex items-center gap-2">
                        <MdVerifiedUser className="text-white text-[24px]" />
                        ক্রেডেনশিয়াল ম্যানেজার
                    </h1>
                    <button
                        onClick={() => openModal(null)}
                        className="bg-white/30 p-3 rounded-xl hover:bg-white/50 transition-colors shadow-md"
                    >
                        <FaPlus className="text-white text-[20px]" />
                    </button>
                </div>

                {/* Search Bar */}
                <div className="max-w-lg mx-auto mt-4 relative">
                    <FaSearch
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-xl ${TEXT_PRIMARY_COLOR_CLASS}`}
                    />
                    <input
                        type="text"
                        placeholder="সাইটের নাম বা ইমেইল দিয়ে খুঁজুন..."
                        className="input input-bordered w-full pl-10 bg-white/70 backdrop-blur-md border-gray-300 focus:border-[#f88833] focus:ring-1 focus:ring-[#f88833] transition-colors"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* 2. Credentials List */}
            <div className="max-w-lg mx-auto px-4 mt-6">
                {filteredCredentials.length > 0 ? (
                    filteredCredentials.map((item) => (
                        <GlassCard
                            key={item.id}
                            className="my-3 flex justify-between items-center p-5 hover:shadow-xl cursor-pointer"
                        >
                            <div className="flex items-center space-x-4 flex-1 min-w-0">
                                <FaKey
                                    className={`text-3xl ${TEXT_PRIMARY_COLOR_CLASS}`}
                                />
                                <div className="flex-1 min-w-0">
                                    <h2 className="text-lg font-bold text-gray-800 truncate">
                                        {item.siteName}
                                    </h2>
                                    <p className="text-sm text-gray-600 truncate">
                                        {item.identifier}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        আপডেট: {item.lastUpdated}
                                    </p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center space-x-2 ml-4">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleCopy(item.encryptedPass);
                                    }}
                                    title="পাসওয়ার্ড কপি করুন"
                                    className="btn btn-sm btn-ghost text-gray-600 hover:text-green-500"
                                >
                                    <FaCopy className="text-lg" />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openModal(item);
                                    }}
                                    title="এডিট করুন"
                                    className="btn btn-sm btn-ghost text-gray-600 hover:text-blue-500"
                                >
                                    <FaEdit className="text-lg" />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteCredential(item.id);
                                    }}
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
                        <p>কোনো ক্রেডেনশিয়াল খুঁজে পাওয়া যায়নি।</p>
                    </div>
                )}
            </div>

            {/* Modal Component */}
            <CredentialModal
                modalRef={addUpdateModalRef}
                closeModal={closeModal}
                handleSave={handleSaveCredential}
                editingCredential={editingCredential}
            />
        </div>
    );
};

export default Credential;
