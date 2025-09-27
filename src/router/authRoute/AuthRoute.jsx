import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "../../context/AuthContext/AuthContext";

const AuthRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return (
            <div className="text-center h-screen flex items-center justify-center">
                <span className="loading loading-ring loading-5xl"></span>
            </div>
        );
    }

    if (user) {
        return children;
    }

    // user না থাকলে login এ পাঠাও
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
};

export default AuthRoute;
