import React, { useContext, useState } from "react";
import {
    FaUserPlus,
    FaEnvelope,
    FaLock,
    FaUser,
    FaArrowRight,
    FaSignInAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom"; // রাউটিং ব্যবহারের জন্য
import AuthContext from "../context/AuthContext/AuthContext";
import Swal from "sweetalert2";

// --- কনস্ট্যান্টস ---
const PRIMARY_COLOR = "#f88833";
const PRIMARY_GRADIENT = "from-[#f88833] to-orange-400";
const TEXT_PRIMARY_COLOR_CLASS = "text-[#f88833]";

// Glass Card Component
const GlassCard = ({ children, className = "" }) => (
    <div
        className={`
        bg-white/30 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/50 transition-all duration-300
        ${className}
    `}
    >
        {children}
    </div>
);

// --- মূল Register কম্পোনেন্ট ---
const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { register, setUser } = useContext(AuthContext);

    // **Firebase ইন্টিগ্রেশন পয়েন্ট:** রেজিস্ট্রেশন হ্যান্ডেলার
    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("পাসওয়ার্ড এবং নিশ্চিতকরণ পাসওয়ার্ড মেলে না।");
            return;
        }

        setLoading(true);
        register(email, password, name)
            .then((user) => {
                setUser(user);
                Swal.fire({
                    icon: "success",
                    title: "সফলভাবে রেজিস্ট্রেশন হয়েছে!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setLoading(false);
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "রেজিস্ট্রেশন ব্যর্থ হয়েছে!",
                    text: error.message,
                });
                setError("রেজিস্ট্রেশন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
                setLoading(false);
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="max-w-md w-full">
                <h1
                    className={`text-4xl font-extrabold text-center mb-6 ${TEXT_PRIMARY_COLOR_CLASS}`}
                >
                    সাইন আপ
                </h1>

                <GlassCard className="w-full">
                    <form onSubmit={handleRegister} className="space-y-4">
                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative text-sm">
                                {error}
                            </div>
                        )}

                        {/* Name Input */}
                        <div className="relative">
                            <FaUser
                                className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500`}
                            />
                            <input
                                type="text"
                                placeholder="আপনার পুরো নাম"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    setError("");
                                }}
                                className="input input-lg input-bordered w-full pl-12 bg-white/70 border-gray-300 focus:border-[#f88833] focus:ring-1 focus:ring-[#f88833]"
                                required
                            />
                        </div>

                        {/* Email Input */}
                        <div className="relative">
                            <FaEnvelope
                                className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500`}
                            />
                            <input
                                type="email"
                                placeholder="ইমেইল অ্যাড্রেস"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setError("");
                                }}
                                className="input input-lg input-bordered w-full pl-12 bg-white/70 border-gray-300 focus:border-[#f88833] focus:ring-1 focus:ring-[#f88833]"
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div className="relative">
                            <FaLock
                                className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500`}
                            />
                            <input
                                type="password"
                                placeholder="পাসওয়ার্ড"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError("");
                                }}
                                className="input input-lg input-bordered w-full pl-12 bg-white/70 border-gray-300 focus:border-[#f88833] focus:ring-1 focus:ring-[#f88833]"
                                required
                            />
                        </div>

                        {/* Confirm Password Input */}
                        <div className="relative">
                            <FaLock
                                className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500`}
                            />
                            <input
                                type="password"
                                placeholder="পাসওয়ার্ড নিশ্চিত করুন"
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    setError("");
                                }}
                                className="input input-lg input-bordered w-full pl-12 bg-white/70 border-gray-300 focus:border-[#f88833] focus:ring-1 focus:ring-[#f88833]"
                                required
                            />
                        </div>

                        {/* Register Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            style={{ backgroundColor: PRIMARY_COLOR }}
                            className="btn btn-lg w-full mt-6 text-white border-0 shadow-lg hover:bg-opacity-90 disabled:bg-gray-400"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <span className="loading loading-spinner loading-sm"></span>
                                    অ্যাকাউন্ট তৈরি হচ্ছে...
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <FaUserPlus /> সাইন আপ করুন
                                </span>
                            )}
                        </button>
                    </form>
                </GlassCard>

                {/* Login Link */}
                <div className="mt-6 text-center text-gray-700">
                    <p>
                        আপনার অ্যাকাউন্ট আছে?{" "}
                        {/* Link কম্পোনেন্ট ব্যবহার করুন যদি আপনি react-router-dom ব্যবহার করেন */}
                        <Link
                            to="/auth/login"
                            className={`font-bold ${TEXT_PRIMARY_COLOR_CLASS} hover:underline flex items-center justify-center gap-1 mt-2`}
                        >
                            <FaSignInAlt className="text-sm" /> লগইন করুন{" "}
                            <FaArrowRight className="text-xs" />
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
