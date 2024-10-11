import React, { useState } from "react";
import Login from "./Login";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./Dashboard";
import Register from "./Register";
import NoMatchPage from "./NoMatchPage";
import Navbar from "./Navbar";
import { UserContext } from "./UserContext";
let App = () => {
    let [user, setUser] = useState(
        {
            isLoggedIn: false,
            currentUserId: null,
            currentUserName: null

        }
    );
    return (
        <UserContext.Provider value={{ user, setUser }} >
            <BrowserRouter>
                <Navbar />
                <div className="container-fluid">
                    <Switch>
                        <Route path="/" exact={true} component={Login} />
                        <Route path="/Register" component={Register} />
                        <Route path="/dashboard" component={Dashboard} />
                        <Route path="*" component={NoMatchPage} />

                    </Switch>
                </div>
            </BrowserRouter>
        </UserContext.Provider>
    );
}

export default App;