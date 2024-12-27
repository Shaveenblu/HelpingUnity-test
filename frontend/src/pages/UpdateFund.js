import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateDonation = () => {
    const { id } = useParams();
    const [country, setCountry] = useState("");
    const [zipcode, setZipCode] = useState("");
    const [reason, setReason] = useState("");
    const [amount, setAmount] = useState("");
    const [story, setStory] = useState("");
    const [title, setTitle] = useState("");
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDonation = async () => {
            try {
                const response = await axios.get(`http://localhost:9092/api/Fundraisers/${id}`);
                const { title, country, zipcode, reason, amount, story, imageUrl } = response.data;
                setTitle(title);
                setDescription(country);
                setDescription(zipcode);
                setDescription(reason);
                setDescription(amount);
                setDescription(story);
            } catch (error) {
                setMessage("Error fetching donation details.");
            }
        };

        fetchDonation();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("country", country);
        formData.append("zipcode", zipcode);
        formData.append("reason", reason);
        formData.append("amount", amount);
        formData.append("story", story);

        if (image) formData.append("image", image);

        try {
            await axios.put(`http://localhost:9092/api/Fundraisers/${id}`, formData);
            setMessage("Fund updated successfully!");
            navigate("/donations");
        } catch (error) {
            setMessage("Error updating Fund: " + error.response?.data || "Unknown error");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Donation</h2>
            {message && <p>{message}</p>}
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
            <button type="submit">Update</button>
        </form>
    );
};

export default UpdateDonation;
