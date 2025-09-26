import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";

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
                element: <div>Tasks Page</div>,
            },
            {
                path: "/others",
                element: <div>Others Page</div>,
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
