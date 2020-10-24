import React, {useEffect, useState, useContext} from 'react'
import {Link, navigate} from '@reach/router'
import axios from 'axios'
import {UserContext} from '../provider/Provider'

const ToolList = () => {
    const [tools, setTools] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [user, setUser] = useContext(UserContext);
    const [totalPages, setTotalPages] = useState([{}])

    useEffect(() => {
        const getTools = async () => {
            const response = await axios.get(`http://localhost:8080/api/tools/page/${page}`)
            console.log(response.data.content);
            console.log(response.data)
            setTools(response.data.content)
            let arr = []
            for (let i = 0; i < response.data.totalPages; i++) {
                arr.push({})
            }
            setTotalPages(arr)
        }
        getTools()
    },[page])

    const postItemClick = () => {
        if (user.id) {
            navigate('/dashboard/new')
        } else {
            navigate('/signin')
        }
    }

    const getNewPage = async (pageNumber) => {
        if (pageNumber === page) return
        const response = await axios.get(`http://localhost:8080/api/tools/page/${pageNumber}`)
        setTools(response.data.content)
        setPage(pageNumber)
    }

    return(
        <div className="container mt-3">
            <ul className="nav justify-content-end">
                <li className="nav-item">
                    <button className="btn btn-secondary btn-m" onClick={postItemClick}>Post Item</button>
                </li>
            </ul>
    
            <h1 className="font-weight-bold">RenTool</h1>
                  
            <div className="search">
            <label className="search-label" htmlFor="search-input">
                <input
                    type="text"
                    name="query"
                    id="search-input"
                    placeholder="Search..."
                    onChange={ e => setSearch(e.target.value) }
                />
                <i className="fa fa-search search-icon" aria-hidden="true"/>
            </label>
                <div className="col">
    
                </div>
            </div>
            <hr/>
            <div>
                {
                    tools.map(tool => (
                        <div className="" key={tool.id} onClick={() => navigate(`/dashboard/${tool.id}`)}>
                            <img src={tool.image} alt="tool"/>
                            <span>{tool.name}</span>
                            <span>${tool.price}</span>
                        </div>
                    ))
                }
            </div>
            <div>
                {
                    totalPages.map((page, i) => (
                        <span key={i} onClick={() => getNewPage(i + 1)}>{i + 1}</span>
                    ))
                }
                <span>Viewing Page: {page}</span>
            </div>
            
            
        </div>

    )
}

export default ToolList;