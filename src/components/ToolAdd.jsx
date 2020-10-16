import React, { useState } from 'react'
import axios from 'axios'
import {navigate} from "@reach/router"

const ToolAdd = () => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("")
    const [location, setLocation] = useState("")
    const [dateStart, setDateStart] = useState("")
    const [dateEnd, setDateEnd] = useState("")
    const [errs, setErrs] = useState("");

    const onSubmit = e =>{
        e.preventDefault();
        axios.post('http://localhost:8000/api/tool/new', {
            title,
            category,
            description,
            price,
            location,
            dateStart,
            dateEnd
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
            <h1>RenTool</h1>
            <h4>Post an Item</h4>
            <ul className="nav justify-content-end">
                <li className="nav-item">
                    <button className="btn btn-secondary btn-m" onClick={() => navigate(`/`)}>Back to Home</button>
                </li>
            </ul>
            <form onSubmit={onSubmit}>
                
                    <div className="form-group col-md-6">
                        <label>Title</label>
                        <input className="form-control form-control-sm w-50" type="text" name="title" onChange={(e) => setTitle(e.target.value)}/>
                        {errs.title ? <p className="text-danger small">{errs.title.message}</p>: null}
                    </div>
                    <div className="form-group col-md-6">
                        <label>category</label>
                        <input className="form-control form-control-sm w-50" type="text" name="category" onChange={(e) => setCategory(e.target.value)}/>
                        {errs.category ? <p className="text-danger small">{errs.category.message}</p>: null}
                    </div>
                    <div className="form-group col-md-6">
                        <label>Description</label>
                        <input className="form-control form-control-sm w-50" type="text" name="description" onChange={(e) => setDescription(e.target.value)}/>
                        {errs.description ? <p className="text-danger small">{errs.description.message}</p>: null}
                    </div>
                    <div className="form-group col-md-6">
                        <label>price</label>
                        <input className="form-control form-control-sm w-50" type="text" name="price" onChange={(e) => setPrice(e.target.value)}/>
                        {errs.price ? <p className="text-danger small">{errs.price.message}</p>: null}
                    </div>
                    <div className="form-group col-md-6">
                        <label>location</label>
                        <input className="form-control form-control-sm w-50" type="text" name="location" onChange={(e) => setLocation(e.target.value)}/>
                        {errs.location ? <p className="text-danger small">{errs.location.message}</p>: null}
                    </div>
                    <div className="form-group col-md-6">
                        <label>dateStart</label>
                        <input className="form-control form-control-sm w-50" type="date" name="dateStart" onChange={(e) => setDateStart(e.target.value)}/>
                        {errs.dateStart ? <p className="text-danger small">{errs.dateStart.message}</p>: null}
                    </div>
                    <div className="form-group col-md-6">
                        <label>dateEnd</label>
                        <input className="form-control form-control-sm w-50" type="date" name="dateEnd" onChange={(e) => setDateEnd(e.target.value)}/>
                        {errs.dateEnd ? <p className="text-danger small">{errs.dateEnd.message}</p>: null}
                    </div>
            
                <input className="btn btn-primary btn-lg" type="submit" value="Post"/>
            </form>
        </div>
    )
}

export default ToolAdd;