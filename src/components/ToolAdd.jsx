import React, { useState, useContext } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form';
import {navigate} from "@reach/router"
import { UserContext } from '../provider/Provider';

const ToolAdd = (props) => {
    const {register, handleSubmit } = useForm();
    const [errs, setErrs] = useState("");
    const [user] = useContext(UserContext);
    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [selectedFile, setSelectedFile] = useState();

    const onSubmit = (data, e) =>{
        e.preventDefault();
        if (!selectedFile) return;

        console.log(data)

        const formData = new FormData()
        console.log(selectedFile);
        formData.append('file', selectedFile)
        formData.append('upload_preset', 'tpgtfsjg')
    
        axios({
            url: 'https://api.cloudinary.com/v1_1/ericyoary/upload',
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: formData
        }).then((res) => {
            console.log(res);
            let imageUrl = res.data.url
            axios.post(`http://localhost:8080/api/tools/${user.id}`, {
                name: data.name,
                description: data.description,
                price: data.price,
                image: imageUrl,
            })
            .then(res => {
                if(res.data.error){
                    setErrs(res.data.error.errors);
                }else{
                    navigate(`/`)
                console.log(res.data)
                }
            })
        })
    }

        

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(e.target.value);
    };

    return(
        <div className="container">
            <ul className="nav justify-content-end">
                <li className="nav-item">
                    <button className="btn btn-secondary btn-m" onClick={() => navigate(`/`)}>Back to Home</button>
                </li>
            </ul>
            <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="font-weight-bold">RenTool</h1>
            <hr/>
            <h4>Post a Tool</h4>
                
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
    
                    <div className="upload-image">
                        <h1 className="title">Upload an Image</h1>

                            <input
                                id="fileInput"
                                type="file"
                                name="image"
                                onChange={handleFileInputChange}
                                value={fileInputState}
                                className="form-input"
                            />
                    
                        {previewSource && (
                            <img
                                src={previewSource}
                                alt="chosen"
                                style={{ height: '300px' }}
                            />
                        )}
                    </div>
                <input className="btn btn-primary btn-lg" type="submit" value="Post"/>
            </form>
        </div>
    )
}

export default ToolAdd;