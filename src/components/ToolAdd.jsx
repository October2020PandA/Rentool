import React, { useState } from 'react'
import axios from 'axios'
import {navigate} from "@reach/router"
import Upload from './UploadFile'

const ToolAdd = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("")
    const [image, setImage] = useState("")
    const [errs, setErrs] = useState("");

    const onSubmit = e =>{
        e.preventDefault();
        axios.post('http://localhost:8000/api/tool/new', {
            name,
            description,
            price,
            image,
        })
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
            <div id="nav"></div>
            <ul className="nav justify-content-end">
                <li className="nav-item">
                    <button className="btn btn-secondary btn-m" onClick={() => navigate(`/`)}>Back to Home</button>
                </li>
            </ul>
            <form onSubmit={onSubmit}>
            <h1 className="main_title">RentTool</h1>
            <hr/>
            <h4>Post a Tool</h4>
                
                    <div className="form-group col-md-6">
                        <label>Name</label>
                        <input className="form-control form-control-sm w-50" type="text" value={name} name="name" onChange={(e) => setName(e.target.value)}/>
                        {errs.name ? <p className="text-danger small">{errs.name.message}</p>: null}
                    </div>
                    <div className="form-group col-md-6">
                        <label>Description</label>
                        <input className="form-control form-control-sm w-50" type="text" value={description} name="description" onChange={(e) => setDescription(e.target.value)}/>
                        {errs.description ? <p className="text-danger small">{errs.description.message}</p>: null}
                    </div>
                    <div className="form-group col-md-6">
                        <label>Price</label>
                        <input className="form-control form-control-sm w-50" type="text" value={price} name="price" onChange={(e) => setPrice(e.target.value)}/>
                        {errs.price ? <p className="text-danger small">{errs.price.message}</p>: null}
                    </div>
                    <Upload/>

                <input className="btn btn-primary btn-lg" type="submit" value="Post"/>
            </form>
        </div>
    )
}

export default ToolAdd;