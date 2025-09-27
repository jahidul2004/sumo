import { useState, useCallback, useContext } from "react";
import {
    FaUserCircle,
    FaEdit,
    FaSignOutAlt,
    FaChevronRight,
    FaMoon,
    FaLock,
    FaSun,
} from "react-icons/fa";
import { MdOutlineEmail, MdSettings } from "react-icons/md";
import AuthContext from "../../context/AuthContext/AuthContext";
import Swal from "sweetalert2";

const PRIMARY_COLOR = "#f88833";
const PRIMARY_GRADIENT = "from-[#f88833] to-orange-400";
const TEXT_PRIMARY_COLOR_CLASS = "text-[#f88833]";

const GlassCard = ({ children, className = "" }) => (
    <div
        className={`
        bg-white/30 backdrop-blur-md rounded-2xl p-5 shadow-xl border border-white/50 transition-all duration-300
        ${className}
    `}
    >
        {children}
    </div>
);

// eslint-disable-next-line no-unused-vars
const SettingsItem = ({ icon: Icon, title, description, onClick }) => (
    <div
        onClick={onClick}
        className="flex items-center justify-between p-3 cursor-pointer hover:bg-white/50 rounded-lg transition-colors border-b border-white/50 last:border-b-0"
    >
        <div className="flex items-center space-x-4">
            <div
                className={`p-2 rounded-full ${TEXT_PRIMARY_COLOR_CLASS} bg-white/50`}
            >
                <Icon size={20} />
            </div>
            <div>
                <p className="font-medium text-gray-800">{title}</p>
                <p className="text-xs text-gray-600">{description}</p>
            </div>
        </div>
        <FaChevronRight className="text-gray-500 text-sm" />
    </div>
);

// --- মূল Profile কম্পোনেন্ট ---
const Profile = () => {
    const [currentTheme, setCurrentTheme] = useState("Light");
    const { user, logout } = useContext(AuthContext);

    // সেটিংস আইটেমে ক্লিক করার হ্যান্ডেলার (ডেমো)
    const handleSettingClick = (settingName) => {
        alert(`${settingName} সেটিংসে নেভিগেট করা হবে বা Modal খোলা হবে।`);
    };

    // থিম টগল
    const toggleTheme = useCallback(() => {
        setCurrentTheme((prev) => {
            const newTheme = prev === "Light" ? "Dark" : "Light";
            alert(`থিম পরিবর্তন করা হলো: ${newTheme}`);
            return newTheme;
        });
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 pb-30">
            {/* 1. Header & Title */}
            <div className="p-4 sticky top-0 bg-gray-50/80 backdrop-blur-sm z-30">
                <div
                    className={`bg-gradient-to-l ${PRIMARY_GRADIENT} rounded-2xl shadow-xl py-3 px-4 max-w-lg mx-auto flex items-center`}
                >
                    <h1 className="text-white text-2xl font-bold flex items-center gap-2">
                        <FaUserCircle className="text-white text-[24px]" />
                        প্রোফাইল ও সেটিংস
                    </h1>
                </div>
            </div>

            {/* 2. Profile Card */}
            <div className="max-w-lg mx-auto px-4 mt-6">
                <GlassCard className="text-center p-6">
                    <div className="relative inline-block">
                        <img
                            src={
                                user.profilePic ||
                                "https://cdn-icons-png.flaticon.com/128/5987/5987811.png"
                            }
                            alt="Profile"
                            className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
                        />
                        <button
                            onClick={() =>
                                handleSettingClick("প্রোফাইল পিকচার এডিট")
                            }
                            className={`absolute bottom-0 right-0 p-2 rounded-full bg-white/70 border border-gray-300 hover:bg-white transition-colors ${TEXT_PRIMARY_COLOR_CLASS}`}
                            title="ছবি পরিবর্তন"
                        >
                            <FaEdit className="text-sm" />
                        </button>
                    </div>

                    <h2 className="text-xl font-bold text-gray-800 mt-4">
                        {user.displayName}
                    </h2>
                    <p className="text-sm text-gray-600 flex items-center justify-center gap-1 mt-1">
                        <MdOutlineEmail className="text-sm" /> {user.email}
                    </p>

                    <button
                        onClick={() =>
                            handleSettingClick("সম্পূর্ণ প্রোফাইল এডিট")
                        }
                        style={{ backgroundColor: PRIMARY_COLOR }}
                        className="btn btn-sm text-white border-0 mt-4 shadow-md hover:bg-opacity-90"
                    >
                        <FaEdit /> প্রোফাইল এডিট
                    </button>
                </GlassCard>
            </div>

            {/* 3. Basic Settings List */}
            <div className="max-w-lg mx-auto px-4 mt-8">
                <h3
                    className={`text-lg font-bold text-gray-800 mb-3 flex items-center gap-2 ${TEXT_PRIMARY_COLOR_CLASS}`}
                >
                    <MdSettings /> সাধারণ সেটিংস
                </h3>

                <GlassCard className="p-0">
                    <SettingsItem
                        icon={FaLock}
                        title="পাসওয়ার্ড ও নিরাপত্তা"
                        description="পাসওয়ার্ড পরিবর্তন করুন বা টু-ফ্যাক্টর প্রমাণীকরণ সেট করুন।"
                        onClick={() =>
                            handleSettingClick("পাসওয়ার্ড ও নিরাপত্তা")
                        }
                    />

                    {/* থিম সেটিংস - টগল ফাংশনালিটি সহ */}
                    <div className="flex items-center justify-between p-3 hover:bg-white/50 rounded-lg transition-colors border-b border-white/50">
                        <div className="flex items-center space-x-4">
                            <div
                                className={`p-2 rounded-full ${TEXT_PRIMARY_COLOR_CLASS} bg-white/50`}
                            >
                                {currentTheme === "Light" ? (
                                    <FaSun size={20} />
                                ) : (
                                    <FaMoon size={20} />
                                )}
                            </div>
                            <div>
                                <p className="font-medium text-gray-800">
                                    থিম ({currentTheme})
                                </p>
                                <p className="text-xs text-gray-600">
                                    অ্যাপের চেহারা পরিবর্তন করুন (লাইট/ডার্ক
                                    মোড)
                                </p>
                            </div>
                        </div>
                        <input
                            type="checkbox"
                            className="toggle"
                            checked={currentTheme === "Dark"}
                            onChange={toggleTheme}
                        />
                    </div>
                </GlassCard>
            </div>

            {/* 4. Logout Button */}
            <div className="max-w-lg mx-auto px-4 mt-8 text-center">
                <button
                    onClick={() => {
                        logout();
                        Swal.fire({
                            icon: "success",
                            title: "সফলভাবে লগআউট হয়েছে",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    }}
                    className="btn w-full max-w-xs bg-red-500 text-white border-0 shadow-lg hover:bg-red-600"
                >
                    <FaSignOutAlt /> লগআউট
                </button>
            </div>
        </div>
    );
};

export default Profile;
