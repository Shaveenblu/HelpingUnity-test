import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";

const DonationForm = () => {
    const [title, setTitle] = useState("");
    const [country, setCountry] = useState("");
    const [zipcode, setZipCode] = useState("");
    const [reason, setReason] = useState("");
    const [amount, setAmount] = useState("");
    const [story, setStory] = useState("");
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState("");
    const { userId } = useUser(); 
    // Get userId from localStorage

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userId) {
            setMessage("Error: User ID is missing.");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("country", country);
        formData.append("zipcode", zipcode);
        formData.append("reason", reason);
        formData.append("amount", amount);
        formData.append("story", story);
        formData.append("image", image);
        formData.append("userId", userId);

        try {
            const response = await axios.post("http://localhost:9092/api/Fundraisers", formData);
            setMessage(response.data);
        } catch (error) {
            setMessage(error.response?.data || "Error occurred");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Donation</h2>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
            />
            <input
                type="text"
                placeholder="zipcode"
                value={zipcode}
                onChange={(e) => setZipCode(e.target.value)}
            />
            <input
                type="text"
                placeholder="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <input
                type="text"
                placeholder="story"
                value={story}
                onChange={(e) => setStory(e.target.value)}
            />
            <textarea
                placeholder="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
            />
            <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
            />
            <button type="submit">Submit</button>
            <p>{message}</p>
        </form>
    );
};

export default DonationForm;
