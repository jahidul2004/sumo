import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import More from "../pages/more/More";
import Tasks from "../pages/tasks/Tasks";
import Events from "../pages/diary/Diary";
import ImportantDates from "../pages/importantDates/ImportantDates";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/tasks",
                element: <Tasks></Tasks>,
            },
            {
                path: "/more",
                element: <More></More>,
            },
            {
                path: "/events",
                element: <Events></Events>,
            },
            {
                path: "/dates",
                element: <ImportantDates></ImportantDates>,
            },
        ],
    },
]);

export default router;
