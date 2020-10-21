

import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { UserContext } from '../provider/Provider';
import {navigate} from "@reach/router"

const Login = (props) => {
    const { register, handleSubmit } = useForm();
    const [user, setUser] = useContext(UserContext);
    const [viewLogin, setViewLogin] = useState(true);

    const registerUser = async (data) => {
        const response = await axios.post("http://localhost:8080/api/register", data);
        // console.log(response.data);
        setUser(response.data)
        // console.log(user);
    }

    const login = async (data) => {
        const response = await axios.post("http://localhost:8080/api/login", data);
        if (response.data) {
            console.log("login: ", response.data);
            setUser(response.data)
            navigate(`/dashboard/new`)

            // console.log(user);
        } else {
            //TODO: Tell user does not exist
            // console.log("errrrrorrr");
        }
    }

    return (
        <div className="home column">
            <h1>RentTool</h1>
            {
                viewLogin
                    ?
                    <form onSubmit={handleSubmit(login)} className="column">
                        <label>Email: <input name="email" ref={register} /></label>
                        <label>Password: <input type="password" name="password" ref={register} /></label>
                        <button className="btn">Login</button>
                        <span onClick={() => setViewLogin(prevState => !prevState)}>No Account? Register</span>
                    </form>
                    :
                    <form onSubmit={handleSubmit(registerUser)} className="column">
                        <label>Name:</label> <input name="name" ref={register} />
                        <label>Email:</label><input name="email" ref={register} />
                        <label>Password:</label> <input name="password" type="password"  ref={register} />
                        <label>Zip Code:</label> <input type="text" name="zip" ref={register} />
                        <label>State: </label><input type="text" name="state" ref={register} />
                        <button className="btn">Register</button>
                        <span onClick={() => setViewLogin(prevState => !prevState)}>Have an account? Login</span>
                    </form>
            }
            <div className="terms-of-service">
                <span>Terms of Service</span>
                <span>Contact</span>
            </div>
        </div>
    )
}

export default Login;