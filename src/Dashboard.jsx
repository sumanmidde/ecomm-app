import React, { useEffect, useContext } from 'react';
import { UserContext } from "./UserContext";

let Dashboard = () => {
    useEffect(() => {
        // Ex : load for db connection 
        document.title = "Dashboard-eCommerce";
    }, []);
    let userContext = useContext(UserContext);
    console.log(userContext);
    return (
        <div>
            <h2>Dashboard</h2>
        </div>
    );
}
export default Dashboard;