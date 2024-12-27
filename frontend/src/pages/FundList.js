import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DonationList = () => {
    const [Funds, setFunds] = useState([]);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFunds = async () => {
            const response = await axios.get("http://localhost:9092/api/Fundraisers");
            setFunds(response.data);
        };
        fetchFunds();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this fund?")) {
            try {
                await axios.delete(`http://localhost:9092/api/Fundraisers/${id}`);
                setFunds(Funds.filter((Funds) => Funds.id !== id));
                setMessage("Fund deleted successfully!");
            } catch (error) {
                setMessage("Error deleting Fund: " + error.response?.data || "Unknown error");
            }
        }
    };

    const handleEdit = (id) => {
        navigate(`/Funds/update/${id}`); // Redirect to the edit page with donation id
    };

    return (
        <div>
            <h2>Funds</h2>
            {Funds.map((Funds) => (
                <div key={Funds.id}>
                    <h3>{Funds.title}</h3>
                    <p>{Funds.country}</p>
                    <p>{Funds.zipcode}</p>
                    <p>{Funds.reason}</p>
                    <p>{Funds.amount}</p>
                    <p>{Funds.story}</p>
                    {Funds.imageUrl && <img src={`http://localhost:9092/${Funds.imageUrl}`} alt="Funds" />}
                    <button onClick={() => handleEdit(Funds.id)}>Edit</button>
                    <button onClick={() => handleDelete(Funds.id)}>Delete</button>
                </div>

            ))}

        </div>
    );
};

export default DonationList;
