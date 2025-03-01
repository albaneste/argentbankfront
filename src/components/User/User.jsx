import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUserProfile, updateUserName } from "../../app/userProfileSlice";
import "./user.css";

const User = () => {
    const userData = useSelector((state) => state.userProfile.profile);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [userName, setUserName] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("token") || sessionStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const response = await fetch("http://localhost:3001/api/v1/user/profile", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch user profile");
                }

                const data = await response.json();
                dispatch(setUserProfile(data.body));
                setUserName(data.body.userName);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch user profile. Please log in again.");
                localStorage.removeItem("token");
                navigate("/login");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate, dispatch]);

    const handleEdit = async () => {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        try {
            const response = await fetch("http://localhost:3001/api/v1/user/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ userName }),
            });

            if (!response.ok) {
                throw new Error("Failed to update user profile");
            }

            dispatch(updateUserName({ userName }));
            setIsEditing(false);
        } catch (err) {
            console.error(err);
            setError("Failed to update profile.");
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    return (
        <main className="main bg-dark">
            <div className="main-header">
                {isEditing ? (
                    <div className="edit-form">
                        <h2>Edit user info</h2>
                        <label htmlFor="userName">
                            User Name:
                            <input
                                type="text"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                className="form-user"
                            />
                        </label>
                        <div className="form-box">
                            <label htmlFor="firstName">
                                First Name:
                                <input
                                    type="text"
                                    name="firstName"
                                    value={userData.firstName}
                                    readOnly
                                    className="form-input"
                                />
                            </label>
                        </div>

                        <div className="form-box">
                            <label htmlFor="lastName">
                                Last Name:
                                <input
                                    type="text"
                                    name="lastName"
                                    value={userData.lastName}
                                    readOnly
                                    className="form-input"
                                />
                            </label>
                        </div>
                        <button className="button-edit" onClick={handleEdit}>Save</button>
                        <button className="button-edit" onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                ) : (
                    <>
                        <h1>
                            Welcome back
                            <br />
                            {userData.firstName} {userData.lastName}!
                        </h1>
                        <button className="edit-button" onClick={() => setIsEditing(true)}>
                            Edit Name
                        </button>
                    </>
                )}
            </div>
        </main>
    );
};

export default User;