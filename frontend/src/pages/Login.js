import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { setUserId } = useUser();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:9092/api/HelpingUnity/login", {
                fullName,
                password,
            });
            const { userId, token } = response.data;  // Assuming userId and token are returned here
            localStorage.setItem('userId', userId);  // Store userId in localStorage
            localStorage.setItem('token', token);    // Store JWT token in localStorage
            setUserId(userId);                       
            navigate("/Funds/new");
        } catch (error) {
            alert("Login Failed: " + error.response.data);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required/>
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
