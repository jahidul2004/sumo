import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import More from "../pages/more/More";
import Tasks from "../pages/tasks/Tasks";

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
                element: <div>Events Page</div>,
            },
            {
                path: "/dates",
                element: <div>Dates Page</div>,
            },
        ],
    },
]);

export default router;
