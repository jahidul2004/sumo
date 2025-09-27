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
import FavoriteBooks from "../pages/favoriteBooks/FavoriteBooks";
import LoginRegistrationLayout from "../layouts/LoginRegistrationLayout";
import Login from "../auth/Login";
import Register from "../auth/Register";
import UnAuthRoute from "./authRoute/UnAuthRoute";
import AuthRoute from "./authRoute/AuthRoute";
import Profile from "../pages/profile/Profile";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <AuthRoute>
                <MainLayout></MainLayout>
            </AuthRoute>
        ),
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
            {
                path: "/favorite-books",
                element: <FavoriteBooks></FavoriteBooks>,
            },
            {
                path: "/profile",
                element: <Profile></Profile>,
            },
        ],
    },
    {
        path: "/auth",
        element: (
            <UnAuthRoute>
                <LoginRegistrationLayout></LoginRegistrationLayout>
            </UnAuthRoute>
        ),
        children: [
            {
                path: "login",
                element: <Login></Login>,
            },
            {
                path: "register",
                element: <Register></Register>,
            },
        ],
    },
]);

export default router;
