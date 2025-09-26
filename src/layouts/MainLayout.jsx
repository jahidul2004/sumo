import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar/Navbar";

const MainLayout = () => {
    return (
        <div>
            {/* Outlet */}
            <Outlet />
            {/* Outlet end */}

            {/* Navigation */}
            <Navbar />
            {/* Navigation end */}
        </div>
    );
};

export default MainLayout;
