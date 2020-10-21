import React, {useEffect, useState} from 'react'
import {navigate} from '@reach/router'
import axios from 'axios'

const ToolDetail = (props) => {
    const [tool, setTool] = useState({})
    const [like, setLike] = useState(0);
    useEffect(() => {
        axios.get(`http://localhost:8000/api/tool/${props.id}`)
        .then(res => setTool(res.data))
        .catch(err =>  console.log(err))
    },[])
    const deleteTool = () => {
        axios.delete(`http://localhost:8000/api/pet/delete/${props.id}`)
        .then(res => navigate("/products"))
        .catch(err => console.log(err))
    }
    const likeCount = (e) => {
        setLike(like +1);
        e.target.disabled = true
    }
    return(
        <div className="container">
            <h1 className="main_title">RenTool</h1>
            <hr/>
            <h4>Details about : {tool.name}</h4>
        <div className="card text-center">
        <div className="card-header font-weight-bold">{tool.name}</div>
        <div className="card-body">
        <dl className="row card-text">
            <dt className="col-sm">Tool Type :</dt>
            <dd className="col-sm">{tool.type}</dd>
        </dl>
        <dl className="row card-text">
            <dt className="col-sm">Description :</dt>
            <dd className="col-sm">{tool.description}</dd>
        </dl>
        <dl className="row card-text">
            <dt className="col-sm-6">Skills :</dt>
            <dd className="col-sm-6">{tool.skill1}</dd>
            <dt className="col-sm-6"></dt>
            <dd className="col-sm-6">{tool.skill2}</dd>
            <dt className="col-sm-6"></dt>
            <dd className="col-sm-6">{tool.skill3}</dd>
        </dl>
            <button className="btn btn-danger m-1" onClick={deleteTool}>Adopt {tool.name}</button>
            <button className="btn btn-secondary m-1" onClick={() => navigate("/")}>Back to Home</button>
            <button className="btn btn-success m-1" onClick={likeCount}>Like {tool.name}</button>
            <p>{like} like(s)</p>
        </div>
        </div>
        </div>
    )
}

export default ToolDetail;