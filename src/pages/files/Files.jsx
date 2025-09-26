import React, { useState, useMemo } from "react";
// FaFileAlt আইকনটি এখানে যুক্ত করা হয়েছে
import {
    FaFileUpload,
    FaImage,
    FaFilePdf,
    FaVideo,
    FaMusic,
    FaDownload,
    FaTrash,
    FaCheckCircle,
    FaFileAlt,
} from "react-icons/fa";
import { MdOutlineCloudUpload } from "react-icons/md";
import { SiGooglecloud } from "react-icons/si";

// --- কনস্ট্যান্টস ---
const PRIMARY_COLOR = "#f88833";
const PRIMARY_GRADIENT = "from-[#f88833] to-orange-400";
const TEXT_PRIMARY_COLOR_CLASS = "text-[#f88833]";
const MAX_IMAGE_SIZE_MB = 32;
const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;

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
const initialFiles = [
    {
        id: 1,
        name: "Family_Vacation.jpg",
        type: "image/jpeg",
        size: "15MB",
        url: "#",
        platform: "ImageBB",
    },
    {
        id: 2,
        name: "Important_Report.pdf",
        type: "application/pdf",
        size: "3.5MB",
        url: "#",
        platform: "Cloudinary",
    },
    {
        id: 3,
        name: "Project_Video.mp4",
        type: "video/mp4",
        size: "55MB",
        url: "#",
        platform: "Cloudinary",
    },
];

// --- ফাইল আইকন রেন্ডারার ---
const getFileIcon = (mimeType) => {
    if (mimeType.startsWith("image/"))
        return <FaImage className="text-blue-500" />;
    if (mimeType.startsWith("video/"))
        return <FaVideo className="text-red-500" />;
    if (mimeType.startsWith("audio/"))
        return <FaMusic className="text-purple-500" />;
    if (mimeType.includes("pdf")) return <FaFilePdf className="text-red-700" />;
    return <FaFileUpload className="text-gray-500" />;
};

// প্ল্যাটফর্মের জন্য কালার ইউটিলিটি
const platformColor = (platform) => {
    switch (platform) {
        case "ImageBB":
            return "hsl(34, 100%, 50%)"; // Orange-Yellow
        case "Cloudinary":
            return "hsl(210, 80%, 50%)"; // Blue
        default:
            return "hsl(0, 0%, 80%)";
    }
};

// --- মূল Files কম্পোনেন্ট ---
const Files = () => {
    const [files, setFiles] = useState(initialFiles);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [selectedFiles, setSelectedFiles] = useState([]);

    // ডেমো আপলোড ফাংশন
    const handleFileUpload = async () => {
        if (selectedFiles.length === 0) return;

        setUploading(true);
        setUploadProgress(0);

        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];

            // 1. ফাইল টাইপ এবং সাইজ নির্ধারণ
            const isImage = file.type.startsWith("image/");
            const isOversized = isImage && file.size > MAX_IMAGE_SIZE_BYTES;
            const platform = isImage ? "ImageBB" : "Cloudinary";

            let uploadMessage = `${file.name}: ${
                isImage
                    ? isOversized
                        ? "রিসাইজ করে ImageBB-তে"
                        : "ImageBB-তে"
                    : "Cloudinary-তে"
            } আপলোড করা হচ্ছে...`;

            console.log(uploadMessage); // ডেমো কনসোল লগ

            // 2. আপলোড সিমুলেশন
            await new Promise((resolve) => setTimeout(resolve, 1000)); // ১ সেকেন্ড অপেক্ষা

            // 3. ডেমো আপলোড ইতিহাস আপডেট
            const newFile = {
                id: Date.now() + i,
                name: file.name,
                type: file.type,
                size: `${(file.size / 1024 / 1024).toFixed(2)}MB`,
                url: "#", // ডেমো URL
                platform: platform,
            };

            setFiles((prev) => [newFile, ...prev]);
            setUploadProgress(((i + 1) / selectedFiles.length) * 100);
        }

        setUploading(false);
        setSelectedFiles([]);
        alert(`${selectedFiles.length} টি ফাইল সফলভাবে আপলোড করা হয়েছে!`);
    };

    // ফাইল ইনপুট থেকে ফাইল নির্বাচন
    const handleFileChange = (e) => {
        const filesArray = Array.from(e.target.files);
        setSelectedFiles(filesArray);
        setUploadProgress(0);
    };

    // ফাইল ডিলিট
    const handleDeleteFile = (id) => {
        if (window.confirm("আপনি কি নিশ্চিত এই ফাইলটি ডিলিট করতে চান?")) {
            setFiles((prev) => prev.filter((f) => f.id !== id));
        }
    };

    // --- ইউটিলিটি রেন্ডারার ---
    const formatSize = (bytes) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* 1. Header & Upload Section */}
            <div className="p-4 pt-8 sticky top-0 bg-gray-50/80 backdrop-blur-sm z-30">
                <div
                    className={`bg-gradient-to-l ${PRIMARY_GRADIENT} rounded-2xl shadow-xl py-3 px-4 max-w-lg mx-auto flex justify-between items-center`}
                >
                    <h1 className="text-white text-2xl font-bold flex items-center gap-2">
                        <FaFileUpload className="text-white text-[24px]" />
                        ফাইল ম্যানেজার
                    </h1>
                </div>

                {/* Upload Area */}
                <GlassCard className="max-w-lg mx-auto mt-4 p-5">
                    <h2 className="text-lg font-bold text-gray-800 mb-3">
                        ফাইল আপলোড করুন
                    </h2>

                    <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        disabled={uploading}
                        className="file-input file-input-bordered file-input-sm w-full bg-white/70 border-gray-300 focus:border-[#f88833] focus:ring-0"
                    />

                    {selectedFiles.length > 0 && (
                        <div className="mt-3 text-sm text-gray-600">
                            <p>
                                {selectedFiles.length} টি ফাইল নির্বাচিত। মোট
                                সাইজ:{" "}
                                {formatSize(
                                    selectedFiles.reduce(
                                        (acc, file) => acc + file.size,
                                        0
                                    )
                                )}
                            </p>
                        </div>
                    )}

                    <button
                        onClick={handleFileUpload}
                        disabled={selectedFiles.length === 0 || uploading}
                        style={{ backgroundColor: PRIMARY_COLOR }}
                        className="btn w-full mt-4 text-white border-0 shadow-lg hover:bg-opacity-90 disabled:bg-gray-400"
                    >
                        {uploading ? (
                            <span className="flex items-center gap-2">
                                <span className="loading loading-spinner"></span>
                                আপলোড হচ্ছে ({uploadProgress.toFixed(0)}%)
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <MdOutlineCloudUpload size={20} />
                                ফাইল আপলোড শুরু করুন
                            </span>
                        )}
                    </button>

                    {/* আপলোড লজিক সারসংক্ষেপ */}
                    <div className="mt-3 text-xs text-center text-gray-500">
                        <p>
                            ইমেজ ({MAX_IMAGE_SIZE_MB}MB): ImageBB | ইমেজ (
                            {MAX_IMAGE_SIZE_MB}MB): Resize & ImageBB | অন্যান্য
                            (Video, PDF): Cloudinary
                        </p>
                    </div>
                </GlassCard>
            </div>

            {/* 2. File List */}
            <div className="max-w-lg mx-auto px-4 mt-8">
                <h2
                    className={`text-xl font-bold text-gray-800 mb-3 flex items-center gap-2 ${TEXT_PRIMARY_COLOR_CLASS}`}
                >
                    <FaFileAlt /> আমার আপলোডসমূহ ({files.length})
                </h2>

                <div className="space-y-3">
                    {files.length > 0 ? (
                        files.map((file) => (
                            <GlassCard
                                key={file.id}
                                className="flex justify-between items-center p-4 hover:shadow-xl active:scale-[0.99]"
                            >
                                <div className="flex items-center space-x-3 flex-1 min-w-0">
                                    <div className="text-3xl">
                                        {getFileIcon(file.type)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-gray-800 truncate">
                                            {file.name}
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-gray-600">
                                                {file.size}
                                            </span>
                                            <span
                                                className="badge badge-xs"
                                                style={{
                                                    backgroundColor:
                                                        platformColor(
                                                            file.platform
                                                        ),
                                                }}
                                            ></span>
                                            <span className="text-xs font-semibold text-gray-700 opacity-80">
                                                {file.platform}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center space-x-2 ml-4">
                                    <a
                                        href={file.url}
                                        download
                                        title="ডাউনলোড"
                                        className="btn btn-sm btn-ghost text-gray-600 hover:text-green-500"
                                    >
                                        <FaDownload className="text-lg" />
                                    </a>
                                    <button
                                        onClick={() =>
                                            handleDeleteFile(file.id)
                                        }
                                        title="ডিলিট"
                                        className="btn btn-sm btn-ghost text-gray-600 hover:text-red-500"
                                    >
                                        <FaTrash className="text-lg" />
                                    </button>
                                </div>
                            </GlassCard>
                        ))
                    ) : (
                        <div className="text-center p-10 text-gray-500 bg-white/70 rounded-xl backdrop-blur-sm shadow-lg mx-auto my-5">
                            <p>এখনও কোনো ফাইল আপলোড করা হয়নি।</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Files;
