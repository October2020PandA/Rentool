import React, {useEffect, useState} from 'react'
import {navigate} from '@reach/router'
import axios from 'axios'

const ToolDetail = (props) =>{
    const [tool, setTool] = useState({})
    useEffect(() => {
        axios.get(`http://localhost:8000/api/tools/${props.id}`)
        .then(res => setTool(res.data))
        .catch(err =>  console.log(err))
    },[])
    const deleteTool = () => {
        axios.delete(`http://localhost:8000/api/tools/${props.id}`)
        .then(res => navigate("/"))
        .catch(err => console.log(err))
    }
    return(
        <div className="container">
        <h1>{tool.name}</h1>
    <div className="card text-center">
    <div className="card-header font-weight-bold">{tool.name}</div>
    <div className="card-body">
    <dl className="row card-text">
        <dt className="col-sm">Photo:</dt>
        <dd className="col-sm">{tool.photo}</dd>
    </dl>
    <dl className="row card-text">
        <dt className="col-sm">Tool Price :</dt>
        <dd className="col-sm">{tool.price}</dd>
    </dl>
    <dl className="row card-text">
        <dt className="col-sm">Description :</dt>
        <dd className="col-sm">{tool.description}</dd>
    </dl>
        <button className="btn btn-danger m-1" onClick={deleteTool}>Save</button>
        <button className="btn btn-secondary m-1" onClick={() => navigate("/")}>Back to Home</button>
    </div>
    </div>
    </div>
        
    )
}

export default ToolDetail;