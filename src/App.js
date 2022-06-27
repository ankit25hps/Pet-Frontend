import "./App.css";
import React from "react";
import Navbar from "./Components/reusable-components/navbar/Navbar";
import Sidebar from "./Components/reusable-components/sidebar/Sidebar";
import style from "./Components/reusable-components/navbar/Navbar.css";
import styles from "./Components/reusable-components/sidebar/Sidebar.css";
import UserProfile from "./Components/register-pet/userprofile";
import style3 from "./Components/register-pet/userprofile.css";

const App = () => {
    return (
        <div>
            <Navbar />
            <Sidebar />
            <UserProfile />  
        </div>
    );
};

export default App;
