import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from "./UserContext";

let Login = (props) => {
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let userContext = useContext(UserContext);

    let [dirty, setDirty] = useState({
        email: false,
        password: false
    });
    let [errors, setErrors] = useState({
        email: [],
        password: []
    });
    let [message, setMessage] = useState("");
    //execute each render & state update ( initial render& state update) we can use 4 ways
    useEffect(() => {
        // console.log(email, password);
    });
    //execute only on state update of email only(and also intial render )
    useEffect(() => {
        // email validation 
        if (email.indexOf("@") > 0) {
            //  console.log("valid");
        }
        else {
            //  console.log("inValid");
        }
    }, [email]);

    //execute only once on initial render=like componentDidMount()
    useEffect(() => {
        // Ex : loadfor db connection 
        document.title = "Login-eCommerce";
    }, []);
    //execute only once  on unmounting phase=componentWillUnMount()
    useEffect(() => {
        // do the ajax  cancellations
        return () => {
            console.log("componentUnMount");
        }
    });
    let validate = () => {
        // create a variables to store errorsData.
        let errorsData = {};
        errorsData.email = [];
        //email can't blank
        if (!email) {
            errorsData.email.push("email can't blank");
        }
        // email regex
        const validEmailRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (email) {
            if (!validEmailRegex.test(email)) {
                errorsData.email.push("email must be proper way");
            }
        }
        //password
        errorsData.password = [];
        //email can't blank
        if (!password) {
            errorsData.password.push("email can't blank");
        }
        // email regex
        const validPasswordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15})/;
        if (password) {
            if (!validPasswordRegex.test(password)) {
                errorsData.password.push("password must be proper way");
            }
        }
        setErrors(errorsData);
    };
    //when ever the state value chenge validate method calls
    useEffect(validate, [email, password]);
    //when ever click the login 
    let onLoginClick = async () => {
        let dirtyData = dirty;
        Object.keys(dirty).forEach((control) => {
            dirtyData[control] = true;
        });
        setDirty(dirtyData);
        //call validate
        validate();
        // 
        if (isValid()) {
            let response = await fetch(`http://localhost:5000/users?email=${email}&password=${password}`, { method: "GET" });
            if (response.ok) {
                let responseBody = await response.json();
                if (responseBody.length > 0) {
                    userContext.setUser({
                        ...userContext.user,
                        isLoggedIn: true,
                        currentUserName:responseBody[0].fullName,
                        currentUserId:responseBody[0].id


                    });
                    props.history.replace("/dashboard");
                } else {
                    setMessage(<span className="text-danger">Invalid email&password</span>)
                }
            }
            else {
                setMessage(<span className="text-danger">unable to connect db</span>)
            }
        };
    };
    let isValid = () => {
        let valid = true;
        // reading the all controls from the onLoginClick
        for (let control in errors) {
            if (errors[control].length > 0) valid = false;
        }
        return valid;
    };
    // we use the useContext for call the userContext provider value



    return (
        <div className="row">
            <div className="col-lg-5 col-md-7 mx-auto ">
                <div className="card-border-success shadow-lg my-2">
                    <div className="card-header border-bottom border-success ">
                        <h3 style={{ fontSize: "30px" }} className="text-center text-success">
                            Login
                        </h3>
                    </div>
                    {/* card body with fields */}
                    <div className="card-body border-bottom border-success">
                        {/* email start */}
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="text" id="email" name="email" className="form-control" placeholder="Email" value={email}
                                onBlur={() => { setDirty({ ...dirty, email: true }); validate(); }} onChange={(event) => { setEmail(event.target.value); }}></input>
                            <div className="text-danger">{dirty["email"] && errors["email"][0] ? errors["email"] : ""}</div>
                        </div>
                        {/* email end */}
                        {/* password start         event is an syntatic event which is created by the Broswer by default */}
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="text" id="password" name="password" className="form-control" placeholder="Password" value={password}
                                onBlur={() => { setDirty({ ...dirty, password: true }); validate(); }} onChange={(event) => { setPassword(event.target.value); }}></input>
                            <div className="text-danger">{dirty["password"] && errors["password"][0] ? errors["password"] : ""}</div>
                        </div>
                        {/* password end */}
                    </div>
                    <div className="card-footer text-center">
                        <div className="m-1">{message}</div>
                        <button className="btn btn-primary" onClick={onLoginClick}> Login </button>
                    </div>


                </div>

            </div>
        </div>
    );
}
export default Login;