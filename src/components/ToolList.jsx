import React, {useEffect, useState} from 'react'
import {Link, navigate} from '@reach/router'
import axios from 'axios'

const ToolList = () => {
    const [tools, setTools] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)

    useEffect(() => {
        const getTools = async () => {
            const response = await axios.get(`http://localhost:8080/api/tools/page/${page}`)
            console.log(response.data.content);
            setTools(response.data.content)
        }
        getTools()
    },[page])



    return(
        <div className="container mt-3">
            <div id="nav"></div>
            <ul className="nav justify-content-end">
                <li className="nav-item">
                    <button className="btn btn-secondary btn-m" onClick={() => navigate(`dashboard/new`)}>Post Item</button>
                </li>
            </ul>

            <h1 className="main_title">RentTool</h1>
                  
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
                        <div key={tool.id}>
                            {tool.name}
                        </div>
                    ))
                }
            </div>
        </div>

    )
}

export default ToolList;