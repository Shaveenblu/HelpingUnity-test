import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import FundList from './pages/FundList';
import FundRaiseForm from './pages/FundRaiseForm';
import UpdateFund from './pages/UpdateFund';

const root = ReactDOM.createRoot(document.getElementById('root'));

const RootComponent = () => {
    const [userId, setUserId] = useState(null); // Manage userId in the root

    return (
        <React.StrictMode>
            <UserProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login setUserId={setUserId} />} />
                    <Route path="/Funds" element={<FundList />} />
                    <Route path="/Funds/new" element={<FundRaiseForm userId={userId}/>} />

                    <Route path="/Funds/update/:id" element={<UpdateFund userId={userId} />} />
                </Routes>
            </Router>
            </UserProvider>
        </React.StrictMode>
    );
};

root.render(<RootComponent />);

// Log performance metrics (optional)
reportWebVitals();
