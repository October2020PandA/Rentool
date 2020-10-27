import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormGroup } from 'reactstrap';
import axios from 'axios';
import { UserContext } from '../provider/Provider';
import {navigate} from "@reach/router"

const Login = (props) => {
    const { register, handleSubmit } = useForm();
    const [user, setUser] = useContext(UserContext);
    const [viewLogin, setViewLogin] = useState(true);

    const registerUser = async (data) => {
        const response = await axios.post("http://localhost:8080/api/register", data);
        console.log(response.data);
        setUser(response.data)
        setViewLogin(prevState => !prevState)
    }
    
    const login = async (data) => {
        const response = await axios.post("http://localhost:8080/api/login", {email: data.loginEmail, password: data.loginPassword});
        if (response.data) {
            console.log("login: ", response.data);
            setUser(response.data)
            navigate(`/dashboard/new`)
        } else {
            //TODO: Tell user does not exist
            // console.log("errrrrorrr");
        }
    }
    
    return (
        <div className="container">
            <ul className="nav justify-content-end">
                <li className="nav-item">
                    <button className="btn btn-secondary btn-m" onClick={() => navigate(`/`)}>Back to Home</button>
                </li>
            </ul>
            <h1 className="font-weight-bold">RenTool</h1>
            <hr />
            <div className="login-form">
                <h2 className="text-start">User Login</h2>
            </div>
    
            {
                viewLogin
                    ?
                    <form onSubmit={handleSubmit(login)}>
                        <FormGroup className="colum">
                            <FormGroup>
                                <i className="fas fa-user"></i>
                                <input type="text" placeholder="Email" name="loginEmail" ref={register} />
                            </FormGroup>
    
                            <FormGroup>
                                <i className="fas fa-lock"></i>
                                <input type="password" placeholder="Password" name="loginPassword" ref={register} />
                            </FormGroup>
    
                            <button className="btn-lg btn-dark btn-block">Login</button>
                            <span className="p-2" onClick={() => setViewLogin(prevState => !prevState)}>No Account? Register</span>
                        </FormGroup>
                    </form>
                    :
                    <form onSubmit={handleSubmit(registerUser)}>
                        <FormGroup className="colum">
                            <FormGroup>
                                <input type="text" placeholder="Name" name="name" ref={register} />
                            </FormGroup>
    
                            <FormGroup>
                                <input type="email" placeholder="Email" name="email" ref={register} />
                            </FormGroup>
    
                            <FormGroup>
                                <input name="password" placeholder="Password" type="password" ref={register} />
                            </FormGroup>
    
                            <FormGroup>
                                <input type="text" placeholder="Zip" name="zip" ref={register} />
                            </FormGroup>
    
                            <FormGroup>
                                <input type="text" placeholder="State" name="state" ref={register} />
                            </FormGroup>
    
                            <button className="btn-lg btn-dark btn-block">Register</button>
                            <span className="p-2" onClick={() => setViewLogin(prevState => !prevState)}>Have an account? Login</span>
                        </FormGroup>
                    </form>
            }
    
            <div className="terms-of-service">
                <span>Terms of Service | </span>
                <span>Contact</span>
            </div>
        </div>
    )
}

export default Login;