import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./user.css";
import { useSelector, useDispatch } from "react-redux";
import { setUserProfile, updateUserName } from "../../app/userProfileSlice";

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
            const token = localStorage.getItem("token") ? localStorage.getItem("token") : sessionStorage.getItem("token");

            if (!token) {

                navigate("/signin");
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
                dispatch(setUserProfile(data.body))
                setUserName(data.body.userName);;
            } catch (err) {
                console.error(err);
                setError("Failed to fetch user profile. Please log in again.");
                localStorage.removeItem("token");
                navigate("/signin");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate, dispatch]);

    const handleEdit = async () => {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");

        if (!token) {
            navigate("/signin");
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
                        <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <button onClick={handleEdit}>Save</button>
                        <button onClick={() => setIsEditing(false)}>Cancel</button>
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
            <h2 className="sr-only">Accounts</h2>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                    <p className="account-amount">$2,082.79</p>
                    <p className="account-amount-description">Available Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                    <p className="account-amount">$10,928.42</p>
                    <p className="account-amount-description">Available Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                    <p className="account-amount">$184.30</p>
                    <p className="account-amount-description">Current Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>
        </main>
    );
};

export default User;