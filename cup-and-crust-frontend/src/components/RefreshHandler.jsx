import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RefreshHandler = ({ setIsAuthenticated }) => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            // User IS logged in
            setIsAuthenticated(true);

            // Prevent logged-in users from opening login/signup
            if (location.pathname === "/login" || location.pathname === "/signup") {
                navigate("/", { replace: true });
            }
        } else {
            // User NOT logged in
            setIsAuthenticated(false);
        }
    }, [location.pathname]);

    return null;
};

export default RefreshHandler;
