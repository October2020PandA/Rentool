import React, {useEffect, useState, useReducer} from 'react'
import {navigate} from '@reach/router'
import axios from 'axios'

const ToolDetail = (props) => {
    const [tool, setTool] = useState({})
    const [like, setLike] = useState(0);
    useEffect(() => {
        axios.get(`http://localhost:8000/api/tool/${props.id}`)
        .then(res => setTool(res.data))
        .catch(err =>  console.log(err))
    },[props.id])
    const deleteTool = () => {
        axios.delete(`http://localhost:8000/api/tool/delete/${props.id}`)
        .then(res => navigate("/products"))
        .catch(err => console.log(err))

    }
    return(
        <div className="container">
                <ul className="nav justify-content-end">
                <li className="nav-item">
                    <button className="btn btn-secondary btn-m" onClick={() => navigate(`/`)}>Back to Home</button>
                </li>
            </ul>
            <h1 className="font-weight-bold">RenTool</h1>
            <hr/>
            <h3 className="card">Tool Description :{tool.description}</h3>
            <div className="card text-center">
                <div className="card-header font-weight-bold">{tool.name}</div>
                <div className="card-body">
                    <dl className="row card-text">
                        <dt className="col-sm"> Owner Name :</dt>
                        <dd className="col-sm">{}</dd>
                    </dl>
                    <dl className="row card-text">
                        <dt className="col-sm">Address :</dt>
                        <dd className="col-sm">{}</dd>
                    </dl>
                    <dl className="row card-text">
                        <dt className="col-sm">Email :</dt>
                        <dd className="col-sm">{}</dd>
                    </dl>
                    <dl className="row card-text">
                        <dt className="col-sm">Price :</dt>
                        <dd className="col-sm">{tool.price}</dd>
                    </dl>
                    <button className="btn btn-success m-1" onClick={deleteTool}>Rent {tool.name}</button>
                </div>
            </div>
        </div>
    )
}

export default ToolDetail;