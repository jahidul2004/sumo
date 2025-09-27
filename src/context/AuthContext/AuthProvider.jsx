import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import auth from "../../firebase/firebase.init";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    const login = async (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUser(userCredential.user);
                return userCredential.user;
            })
            .catch((error) => {
                console.error("Error signing in:", error);
                throw error;
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const register = async (email, password, displayName) => {
        setLoading(true);
        // Registration logic using Firebase Auth
        return createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const newUser = userCredential.user;
                // Update the display name
                return updateProfile(newUser, { displayName }).then(() => {
                    setUser({ ...newUser, displayName });
                    return { ...newUser, displayName };
                });
            })
            .catch((error) => {
                console.error("Error registering:", error);
                throw error;
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const logout = async () => {
        setLoading(true);
        return auth
            .signOut()
            .then(() => {
                setUser(null);
            })
            .catch((error) => {
                console.error("Error signing out:", error);
                throw error;
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const updateUserProfile = async (newUserData) => {
        setLoading(true);
        try {
            await updateProfile(auth.currentUser, newUserData);
        } catch (error) {
            console.error("Error updating profile:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const data = {
        user,
        loading,
        login,
        setUser,
        setLoading,
        logout,
        updateUserProfile,
        register,
    };

    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
