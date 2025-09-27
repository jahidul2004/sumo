import { useContext, useState } from "react";
import {
    FaLock,
    FaEnvelope,
    FaSignInAlt,
    FaUserPlus,
    FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext/AuthContext";
import Swal from "sweetalert2";

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

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { login, setUser } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        login(email, password)
            .then((user) => {
                setUser(user);
                Swal.fire({
                    icon: "success",
                    title: "সফলভাবে লগইন হয়েছে!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setLoading(false);
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "লগইন ব্যর্থ হয়েছে!",
                    text: error.message,
                });
                setError("ইমেইল বা পাসওয়ার্ড সঠিক নয়। আবার চেষ্টা করুন।");
                setLoading(false);
            });
    };

    // **Firebase ইন্টিগ্রেশন পয়েন্ট:** পাসওয়ার্ড রিসেট হ্যান্ডেলার
    const handleForgotPassword = () => {
        if (!email) {
            setError("পাসওয়ার্ড রিসেট করতে অনুগ্রহ করে ইমেইল ইনপুট করুন।");
            return;
        }

        // ----------------------------------------------------
        // !! এখানে আপনার Firebase Password Reset লজিক যোগ করুন !!
        // ----------------------------------------------------

        // sendPasswordResetEmail(auth, email)
        alert(`পাসওয়ার্ড রিসেটের লিংক এই ইমেইলে পাঠানো হবে: ${email}`);
        setError("");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="max-w-md w-full">
                <h1
                    className={`text-4xl font-extrabold text-center mb-6 ${TEXT_PRIMARY_COLOR_CLASS}`}
                >
                    লগইন
                </h1>

                <GlassCard className="w-full">
                    <form onSubmit={handleLogin} className="space-y-4">
                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative text-sm">
                                {error}
                            </div>
                        )}

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

                        {/* Forgot Password Link */}
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={handleForgotPassword}
                                disabled={loading}
                                className="text-sm font-semibold text-gray-700 hover:text-red-500 transition-colors"
                            >
                                পাসওয়ার্ড ভুলে গেছেন?
                            </button>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            style={{ backgroundColor: PRIMARY_COLOR }}
                            className="btn btn-lg w-full text-white border-0 shadow-lg hover:bg-opacity-90 disabled:bg-gray-400"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <span className="loading loading-spinner loading-sm"></span>
                                    প্রবেশ করা হচ্ছে...
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <FaSignInAlt /> লগইন করুন
                                </span>
                            )}
                        </button>
                    </form>
                </GlassCard>

                {/* Sign Up Link */}
                <div className="mt-6 text-center text-gray-700">
                    <p>
                        আপনার অ্যাকাউন্ট নেই?{" "}
                        {/* Link কম্পোনেন্ট ব্যবহার করুন যদি আপনি react-router-dom ব্যবহার করেন */}
                        <Link
                            to="/auth/register"
                            className={`font-bold ${TEXT_PRIMARY_COLOR_CLASS} hover:underline flex items-center justify-center gap-1 mt-2`}
                        >
                            <FaUserPlus className="text-sm" /> নতুন অ্যাকাউন্ট
                            তৈরি করুন <FaArrowRight className="text-xs" />
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
