import React, { useState, useEffect } from 'react';
let Register = () => {
    useEffect(() => {
        // Ex : loadfor db connection 
        document.title = "Register-eCommerce";
    }, []);
    let [state, setState] = useState({
        email: "",
        password: "",
        fullName: "",
        dateOfBirth: "",
        gender: "",
        country: "",
        receiveNewLetters: ""
    });
    let [errors, setErrors] = useState({
        email: [],
        password: [],
        fullName: [],
        dateOfBirth: [],
        gender: [],
        country: [],
        receiveNewLetters: []
    });
    //dirty is nothing but a current field behaviour
    let [dirty, setDirty] = useState({
        email: false,
        password: false,
        fullName: false,
        dateOfBirth: false,
        gender: false,
        country: false,
        receiveNewLetters: false
    });
    let [message, setMessage] = useState("");
    //validate for all feilds
    let validate = () => {
        let errorsData = {};
        //email check
        errorsData.email = [];
        //email can't empty
        if (!state.email) {
            errorsData.email.push("Email can't empty");
            //console.log(errorsData);
        }
        //email regex
        const validEmailRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (state.email) {
            if (!validEmailRegex.test(state.email)) {
                errorsData.email.push("email must proper way");
            }
        }
        //password check
        errorsData.password = [];
        //email can't empty
        if (!state.password) {
            errorsData.password.push("password can't empty");
        }
        //email regex
        const validPasswordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15})/;
        if (state.password) {
            if (!validPasswordRegex.test(state.password)) {
                errorsData.password.push("email must proper way");
            }
        }
        //fullName check
        errorsData.fullName = [];
        //email can't empty
        if (!state.fullName) {
            errorsData.fullName.push("fullname can't empty");
        }
        //dateofbirth check        
        errorsData.dateOfBirth = [];
        //dateofBirth can't empty
        if (!state.dateOfBirth) {
            errorsData.dateOfBirth.push("dateOfBirth can't empty");
        }
        // //gender check        
        // errorsData.gender = [];
        // //gender can't empty
        // if (!state.gender) {
        //     errorsData.gender.push("gender can't empty");
        // }
        // //country check        
        // errorsData.country = [];
        // //gender can't empty
        // if (!state.country) {
        //     errorsData.country.push("gender can't empty");
        // }


        setErrors(errorsData);
    };
    // when ever the state updated validate function calls
    useEffect(validate, [state]);
    //dropdown read from here
    let [countries] = useState(["india", "usa", "aus"]);
    useEffect(() => {
        console.log(state.email);
    }, [state.email]);
    //click the Register button
    let onRegisterClick = async () => {
        let dirtyData = dirty;
        Object.keys(dirty).forEach((control) => {
            dirtyData[control] = true;
        });
        setDirty(dirtyData);
        validate();
        if (isValid()) {

            let response = await fetch(`http://localhost:5000/users`, {
                method: "POST",
                "body": JSON.stringify(
                    {
                        email: state.email,
                        password: state.password,
                        fullName: state.fullName,
                        dateOfBirth: state.dateOfBirth,
                        gender: state.gender,
                        country: state.country,
                        receiveNewLetters: state.receiveNewLetters

                    }),
                content: {
                    "Content-type": "application/json",
                }
            });
            if (response.ok) {
                setMessage(<span className="text-success"> Register successfull</span>);
            }
        }
        else {
            setMessage(<span>please enter all fields </span>);
        }
    };
    // when ever the all fields is valid then this method is valid
    let isValid = () => {
        let valid = true;

        for (let control in errors) {
            if (errors[control].length > 0) valid = false;
        }
        return valid;
    };
    return (
        <div className="row">
            <div className="col-lg-6 col-md-7 mx-auto">
                <div className="card border-bottom shadow my-2">
                    <div className="card-header border-bottom border-primary">
                        <h4 style={{ fontSize: 30 }} className="text-center text-primary">Register</h4>
                        {/* this for error messages */}
                        <ul className="text-danger">
                            {Object.keys(errors).map((control) => {
                                // console.log(control, "error");
                                if (dirty[control]) {
                                    return errors[control].map((err) => { return <li >{err}</li>; });
                                }
                                else {
                                    return "";
                                }
                            })}
                        </ul>
                    </div>
                    <div className="card-body border-bottom border-primary">
                        {/* email start */}
                        <div className="form-group form-row">
                            <label className="col-lg-4" htmlFor="email">Email</label>
                            <div className="col-lg-8">
                                <input type="text" className="form-control" id="email" value={state.email} name="email"
                                    onChange={(event) => { setState({ ...state, [event.target.name]: event.target.value }); }}
                                    onBlur={(event) => { setDirty({ ...dirty, email: true }); }}>
                                </input>
                                <div className="text-danger"> {dirty["email"] && errors["email"][0] ? errors["email"] : ""}</div>
                            </div>
                        </div>
                        {/* email end */}
                        {/* password start */}
                        <div className="form-group form-row">
                            <label className="col-lg-4" htmlFor="password">Password</label>
                            <div className="col-lg-8">
                                <input type="password" className="form-control" id="password" value={state.password} name="password"
                                    onChange={(event) => { setState({ ...state, [event.target.name]: event.target.value }); }}
                                    onBlur={(event) => { setDirty({ ...dirty, password: true }); }}>
                                </input>
                                <div className="text-danger"> {dirty["password"] && errors["password"][0] ? errors["password"] : ""}</div>
                            </div>
                        </div>
                        {/* password end */}

                        {/* fullName start */}
                        <div className="form-group form-row">
                            <label className="col-lg-4" htmlFor="fullName">FullName</label>
                            <div className="col-lg-8">
                                <input type="text" className="form-control" id="fullName" value={state.fullName} name="fullName"
                                    onChange={(event) => { setState({ ...state, [event.target.name]: event.target.value }); }}
                                    onBlur={(event) => { setDirty({ ...dirty, fullName: true }); }}>
                                </input>
                                <div className="text-danger"> {dirty["fullName"] && errors["fullName"][0] ? errors["fullName"] : ""}</div>
                            </div>
                        </div>
                        {/* fullName end */}
                        {/* dateOfBirth start */}
                        <div className="form-group form-row">
                            <label className="col-lg-4" htmlFor="dob">Date Of Birth</label>
                            <div className="col-lg-8">
                                <input type="date" className="form-control" id="dob" value={state.dateOfBirth} name="dateOfBirth"
                                    onChange={(event) => { setState({ ...state, [event.target.name]: event.target.value }); }}
                                    onBlur={(event) => { setDirty({ ...dirty, dateOfBirth: true }); }}>
                                </input>
                                <div className="text-danger"> {dirty["dateOfBirth"] && errors["dateOfBirth"][0] ? errors["dateOfBirth"] : ""}</div>
                            </div>
                        </div>
                        {/* dateOfB end */}
                        {/* gender start */}
                        <div className="form-group form-row">
                            <label className="col-lg-4">Gender</label>
                            <div className="col-lg-8">
                                <div className="form-check">
                                    <input type="radio" value="male" name="gender" id="male" className="form-checked-input"
                                        checked={state.gender === "male" ? true : false}
                                        onChange={(event) => { setState({ ...state, [event.target.name]: event.target.checked }); }} >
                                    </input>
                                    <label className="form-check-inline" htmlFor="male">Male</label>
                                </div>
                                <div className="form-check">
                                    <input type="radio" value="female" name="gender" id="female" className="form-checked-input"
                                        checked={state.gender === "female" ? true : false}
                                        onChange={(event) => { setState({ ...state, [event.target.name]: event.target.checked }); }} >
                                    </input>
                                    <label className="form-check-inline" htmlFor="female">Female</label>
                                </div>
                            </div>
                        </div>
                        {/* gender end */}
                        {/* countries drop down start */}
                        <div className="form-group form-row">
                            <label className="col-lg-4" htmlFor="country">Country</label>
                            <div className="col-lg-8">
                                <select className="form-control" id="country" name="country" value={state.country}
                                    onChange={(event) => { setState({ ...state, [event.target.name]: event.target.value }) }}>
                                    {countries.map((country) => <option key="country" >{country}</option>)}

                                </select>
                            </div>
                        </div>
                        {/* drop down end */}
                        {/* check-box start */}
                        <div className="form-group form-row">
                            <label className="col-lg-4"></label>
                            <div className="col-lg-8">
                                <div className="form-check">
                                    <input type="checkbox" id="receiveNewLetters" value="true" name="gereceiveNewLetters" className="form-checked-input"
                                        checked={state.receiveNewLetters === true ? true : false}
                                        onChange={(event) => { setState({ ...state, [event.target.name]: event.target.checked }); }} >
                                    </input>
                                    <label className="form-check-inline" htmlFor="receiveNewLetters">Receive News Letters</label>
                                </div>

                            </div>
                        </div>

                        {/* check-box end */}

                    </div>
                    {/* footer */}
                    <div className="card-footer text-center">
                        <div className="m-1 text-danger" >{message}</div>
                        <button className="btn btn-primary m-2" onClick={onRegisterClick}>Register</button>
                    </div>

                </div>


            </div>
        </div>
    );
}
export default Register;