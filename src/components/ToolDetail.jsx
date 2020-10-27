import React, {useEffect, useState, useContext} from 'react'
import {navigate} from '@reach/router'
import axios from 'axios'
import { UserContext } from "../provider/Provider";

const ToolDetail = (props) =>{
    const [user, setUser] = useContext(UserContext);
    const [tool, setTool] = useState({})
    const [userInfo, setUserInfo] = useState({})
    useEffect(() => {
        axios.get(`http://localhost:8080/api/tools/${props.id}`)
        .then(res => {setTool(res.data)})
        .catch(err =>  console.log(err))

        axios.get(`http://localhost:8080/api/tools/user/${props.id}`)
        .then(resp => {setUserInfo(resp.data)})
        .catch(err =>  console.log(err))
        console.log("im user info", userInfo)
        console.log("im user", user)
        
    },[])
    const deleteTool = () => {
        axios.delete(`http://localhost:8080/api/tools/${props.id}`)
        .then(res => navigate("/"))
        .catch(err => console.log(err))
    }
    return(
        <div className="container">
        <h1 className="font-weight-bold">RenTool</h1>
        <h1 className='single_name' >{tool.name} :</h1>
    <div className="card text-center">
    <div className="card-body">
    <dl className="row card-text">
        <dd className="col-sm"><img className="img-details" src={tool.image} alt="tool" /></dd>
    </dl>
    <dl className="row card-text">
        <dt className="col-sm">Tool Price :</dt>
        <dd className="col-sm">{tool.price}</dd>
    </dl>
    <dl className="row card-text">
        <dt className="col-sm">Description :</dt>
        <dd className="col-sm">{tool.description}</dd>
    </dl>
    <dl className="row card-text">
        <dt className="col-sm">Owner Name:</dt>
        <dd className="col-sm">{userInfo.name}</dd>
    </dl>
    <dl className="row card-text">
        <dt className="col-sm">State/Zip:</dt>
    <dd className="col-sm">{userInfo.state} / {userInfo.zip}</dd>
    </dl>
    <dl className="row card-text">
        <dt className="col-sm">Owner email:</dt>
        <dd className="col-sm">{userInfo.email}</dd>
    </dl>
    
    { (user.id == userInfo.id)?
        <button className="btn btn-danger m-1" onClick={deleteTool}>Delete</button>    
   : null } 
        
        <button className="btn btn-secondary m-1" onClick={() => navigate("/")}>Back to Home</button>
    </div>
    </div>
    </div>
        
    )
}

export default ToolDetail;