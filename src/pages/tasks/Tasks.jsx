import React, { useContext, useEffect, useState } from "react";
import { CgCloseO } from "react-icons/cg";
import {
    MdOutlineAddTask,
    MdDeleteForever,
    MdOutlineEdit,
} from "react-icons/md";
import { IoIosHeart } from "react-icons/io";
import AuthContext from "../../context/AuthContext/AuthContext";

// আপনার নতুন প্রাইমারি কালার
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

// --- 1. টাস্ক ডিটেইলস Modal ---
const TaskDetailsModal = ({ task, closeModal, handleDelete }) => {
    if (!task) return null;

    const getPriorityStyle = (priority) => {
        if (priority === "High") return "bg-red-400 text-white";
        if (priority === "Medium") return "bg-yellow-400 text-gray-800";
        return "bg-green-400 text-white";
    };

    return (
        <dialog id="task_details_modal" className="modal">
            <div className="modal-box bg-white/70 backdrop-blur-lg p-6">
                <div className="flex justify-between items-start mb-4">
                    <h1 className="text-2xl font-bold text-gray-800">
                        {task.title}
                    </h1>
                    <button
                        onClick={closeModal}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <CgCloseO size={24} />
                    </button>
                </div>

                <p className="text-sm text-gray-600 mb-4">{task.description}</p>

                <div className="space-y-3 border-t pt-3">
                    <div className="flex justify-between items-center text-sm">
                        <span className="font-medium text-gray-700">
                            প্রাধিকার (Priority)
                        </span>
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityStyle(
                                task.priority
                            )}`}
                        >
                            {task.priority}
                        </span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                        <span className="font-medium text-gray-700">
                            শেষ সময় (Due Date)
                        </span>
                        <span className="text-gray-600">{task.dueDate}</span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                        <span className="font-medium text-gray-700">
                            অবস্থা (Status)
                        </span>
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                task.completed
                                    ? "bg-green-500 text-white"
                                    : "bg-red-500 text-white"
                            }`}
                        >
                            {task.completed ? "সম্পন্ন" : "অসম্পন্ন"}
                        </span>
                    </div>

                    {task.completed && (
                        <div className="flex justify-between items-center text-sm">
                            <span className="font-medium text-gray-700">
                                সম্পন্নের তারিখ
                            </span>
                            <span className="text-gray-600">
                                {task.completedAt}
                            </span>
                        </div>
                    )}
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={() => handleDelete(task.id)}
                        className="flex items-center gap-1 px-4 py-2 rounded-lg text-white bg-red-500 hover:bg-red-600 transition-colors"
                    >
                        <MdDeleteForever size={20} /> ডিলিট
                    </button>
                    {/* এখানে Edit/Complete বাটন যোগ করা যেতে পারে */}
                    <button
                        className="flex items-center gap-1 px-4 py-2 rounded-lg text-white bg-gray-500 hover:bg-gray-600 transition-colors"
                        disabled
                    >
                        <MdOutlineEdit size={20} /> এডিট
                    </button>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button onClick={closeModal}>বন্ধ করুন</button>
            </form>
        </dialog>
    );
};

// --- 2. টাস্ক যোগ করার Modal ---
const AddTaskModal = ({ closeModal, handleAddTask }) => {
    // এখানে ফর্ম স্টেট এবং লজিক যোগ হবে

    return (
        <dialog id="task_adding_modal" className="modal">
            <div className="modal-box bg-white/70 backdrop-blur-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-bold text-gray-800">
                        নতুন কাজ যুক্ত করুন
                    </h1>
                    <button
                        onClick={closeModal}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <CgCloseO size={24} />
                    </button>
                </div>

                <form onSubmit={handleAddTask}>
                    {" "}
                    {/* আসল সাবমিট লজিক যোগ করুন */}
                    <input
                        type="text"
                        placeholder="কাজের শিরোনাম (যেমন: মিটিং প্রিপারেশন)"
                        className="input w-full my-2 bg-white/80 border-gray-300 focus:border-[#f88833]"
                        required
                    />
                    <textarea
                        placeholder="কাজের বিবরণ"
                        className="textarea w-full my-2 bg-white/80 border-gray-300 focus:border-[#f88833]"
                        required
                    ></textarea>
                    <input
                        type="date"
                        className="input w-full my-2 bg-white/80 border-gray-300 focus:border-[#f88833]"
                        required
                    />
                    <select
                        className="select w-full my-2 bg-white/80 border-gray-300 focus:border-[#f88833]"
                        required
                        defaultValue={"Medium"}
                    >
                        <option value="High">উচ্চ প্রাধিকার</option>
                        <option value="Medium">মধ্যম প্রাধিকার</option>
                        <option value="Low">নিম্ন প্রাধিকার</option>
                    </select>
                    <button
                        type="submit"
                        style={{ backgroundColor: PRIMARY_COLOR }}
                        className="btn w-full my-2 text-white border-0 shadow-lg hover:bg-opacity-90"
                    >
                        কাজ যুক্ত করুন
                    </button>
                </form>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button onClick={closeModal}>বন্ধ করুন</button>
            </form>
        </dialog>
    );
};

// --- 3. মূল Tasks কম্পোনেন্ট ---
const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const { user } = useContext(AuthContext);

    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/api/tasks/by-email/${user?.email}`)
            .then((res) => res.json())
            .then((data) => {
                setTasks(data);
                console.log("Data Vhai", data);
            })
            .catch((error) => {
                console.error("Error fetching tasks:", error);
            });
    }, [tasks, user?.email]);

    // টাস্ক ডিলিট হ্যান্ডলার
    const handleDeleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
        closeDetailsModal();
        // ডিলিট করার পর একটি সফল বার্তা দেখানো যেতে পারে
    };

    // টাস্ক যোগ করার ডেমো হ্যান্ডলার (ফর্ম লজিক যোগ করুন)
    const handleAddTask = (e) => {
        e.preventDefault();
        // নতুন টাস্ক তৈরি করে setTasks-এ যোগ করার লজিক এখানে
        console.log("Adding new task...");
        closeAddModal();
    };

    // Modal ওপেন/ক্লোজ ফাংশন
    const openAddModal = () =>
        document.getElementById("task_adding_modal").showModal();
    const closeAddModal = () =>
        document.getElementById("task_adding_modal").close();

    const openDetailsModal = (task) => {
        setSelectedTask(task);
        document.getElementById("task_details_modal").showModal();
    };
    const closeDetailsModal = () => {
        setSelectedTask(null);
        document.getElementById("task_details_modal").close();
    };

    const getPriorityIcon = (priority) => {
        if (priority === "High") return <IoIosHeart className="text-red-500" />;
        if (priority === "Medium")
            return <span className="text-yellow-500">•</span>;
        return <span className="text-green-500">•</span>;
    };

    const getPriorityTextColor = (priority) => {
        if (priority === "High") return "text-red-500";
        if (priority === "Medium") return "text-yellow-500";
        return "text-green-500";
    };

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {" "}
            <div className="p-4 sticky top-0 bg-gray-50/80 backdrop-blur-sm z-30">
                {" "}
                <div
                    style={{ backgroundColor: PRIMARY_COLOR }}
                    className="rounded-2xl shadow-xl py-3 px-4 max-w-lg mx-auto flex justify-between items-center"
                >
                    <h1 className="text-white text-2xl font-bold">
                        সুমুর কাজের বই
                    </h1>
                    <button
                        onClick={openAddModal}
                        className="bg-white/30 p-3 rounded-xl hover:bg-white/50 transition-colors shadow-md"
                    >
                        <MdOutlineAddTask className="text-white text-[28px]" />
                    </button>
                </div>
            </div>
            {/* 2. Tasks List (Main Content) */}
            <div className="max-w-lg mx-auto px-4 mt-4">
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <GlassCard
                            key={task.id}
                            onClick={() => openDetailsModal(task)}
                            className="my-3 cursor-pointer active:scale-[0.99] hover:shadow-2xl"
                        >
                            <div className="flex justify-between items-start">
                                {/* টাস্ক টাইটেল ও স্ট্যাটাস */}
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                        {task.completed && (
                                            <span className="text-green-500">
                                                ✓
                                            </span>
                                        )}
                                        {task.title}
                                    </h2>
                                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                        {task.description}
                                    </p>
                                </div>
                                {/* প্রায়োরিটি আইকন */}
                                <div
                                    className={`p-2 rounded-full ${getPriorityTextColor(
                                        task.priority
                                    )}`}
                                >
                                    {getPriorityIcon(task.priority)}
                                </div>
                            </div>

                            <div className="flex justify-between items-center mt-3 border-t border-white/50 pt-2">
                                {/* ডিউ ডেট */}
                                <span className="text-xs text-gray-600 font-medium">
                                    শেষ: {task.dueDate}
                                </span>
                                {/* স্ট্যাটাস */}
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                                        task.completed
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                    }`}
                                >
                                    {task.completed ? "সম্পন্ন" : "অসম্পন্ন"}
                                </span>
                            </div>
                        </GlassCard>
                    ))
                ) : (
                    <div className="text-center p-10 text-gray-500">
                        <p>কোনো কাজ নেই। নতুন কাজ যোগ করুন!</p>
                    </div>
                )}
            </div>
            {/* 3. Modals */}
            <AddTaskModal
                closeModal={closeAddModal}
                handleAddTask={handleAddTask}
            />
            <TaskDetailsModal
                task={selectedTask}
                closeModal={closeDetailsModal}
                handleDelete={handleDeleteTask}
            />
        </div>
    );
};

export default Tasks;
