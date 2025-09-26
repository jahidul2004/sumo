import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import More from "../pages/more/More";
import Tasks from "../pages/tasks/Tasks";
import Events from "../pages/diary/Diary";
import ImportantDates from "../pages/importantDates/ImportantDates";
import SalahStreak from "../pages/salahStreak/SalahStreak";
import Credential from "../pages/credential/Credential";
import Files from "../pages/files/Files";
import ContactList from "../pages/contactList/ContactList";

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
            {
                path: "/salahStreak",
                element: <SalahStreak></SalahStreak>,
            },
            {
                path: "/credentials",
                element: <Credential></Credential>,
            },
            {
                path: "/files",
                element: <Files></Files>,
            },
            {
                path: "/contacts",
                element: <ContactList></ContactList>,
            },
        ],
    },
]);

export default router;
