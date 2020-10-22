import React, { useState, useContext } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form';
import {navigate} from "@reach/router"
import { UserContext } from '../provider/Provider';

const ToolAdd = (props) => {
    const {register, handleSubmit } = useForm();
    const [errs, setErrs] = useState("");
    const [user] = useContext(UserContext);

    const onSubmit = async(data) =>{
        const formData = new FormData();
        formData.append("name", data.name)
        formData.append("description", data.description)
        formData.append("price", data.price)
        formData.append("image", data.image[0])
        

        await axios.post(`http://localhost:8080/api/tool/${user.id}`, formData)
        .then(res => {
            if(res.data.error){
                setErrs(res.data.error.errors);
            }else{
                navigate(`/`)
            }
        })
        .catch(err => console.log(err))
    }
    return(
        <div className="container">
            <h1>RenTool</h1>
            <h4>Post an Tool</h4>
            <ul className="nav justify-content-end">
                <li className="nav-item">
                    <button className="btn btn-secondary btn-m" onClick={() => navigate(`/`)}>Back to Home</button>
                </li>
            </ul>
            <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group col-md-6">
                        <label>Name</label>
                        <input className="form-control form-control-sm w-50" type="text" name="name" ref={register}/>
                        {errs.name ? <p className="text-danger small">{errs.name.message}</p>: null}
                    </div>
                    <div className="form-group col-md-6">
                        <label>Description</label>
                        <input className="form-control form-control-sm w-50" type="text" name="description" ref={register}/>
                        {errs.description ? <p className="text-danger small">{errs.description.message}</p>: null}
                    </div>
                    <div className="form-group col-md-6">
                        <label>Price</label>
                        <input className="form-control form-control-sm w-50" type="text" name="price" ref={register}/>
                        {errs.price ? <p className="text-danger small">{errs.price.message}</p>: null}
                    </div>
                    <div className="form-group col-md-6">
                        <label>Photo</label>
                        <input className="form-control form-control-sm w-50" type="file" name="image" ref={register}/>
                        {errs.price ? <p className="text-danger small">{errs.price.message}</p>: null}
                    </div>

                <input className="btn btn-primary btn-lg" type="submit" value="Post"/>
            </form>
        </div>
    )
}

export default ToolAdd;