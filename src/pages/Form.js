import React, { useState } from "react"


const Form = ({focus, setFocus, createUpdate, history}) => {
    const [ dropdown, setDropdown ] = useState([])

    const apikey = process.env.REACT_APP_APIKEY
    const omdbUrl = `https://www.omdbapi.com/?apikey=${apikey}&`

    const fillForm = async (event) => {
        event.preventDefault()
        const response = await fetch(omdbUrl + "s=" + focus.title)
        const data = await response.json()
        if (data.Search) {
            setDropdown([...data?.Search])
        }
    }

    const selectOption = (
            <select onChange={handleSelect} >
                <option value="">Which one?</option>
                {dropdown.map((item, index) => (<option value={item.Title} >{item.Title} ({item.Year} {item.Type})</option>))}
            </select>
        )

    const handleSelect = async (event) => {
        console.log(event.target.value)
        const response = await fetch(omdbUrl + "t=" + event.target.value)
        const data = await response.json()
        setFocus({...focus, 
            imgurl: data.Poster,
            title: data.Title,
            runtime: data.Runtime,
            medium: data.Type,
            genre: data.Genre
        })
    }

    const handleChange = (event) => {
        if (event.target.type === "checkbox") {
            setFocus({...focus, [event.target.name]: event.target.checked})
        } else {
            setFocus({...focus, [event.target.name]: event.target.value})
        }
    }
    
    const handleSubmit = (event) => {
        event.preventDefault()
        createUpdate(focus)
        history.push("/")
    }

    return (
        <div>
            <form onSubmit={fillForm}>
                <h3>Form Component</h3>
                <label>Title
                    <input type="text" name="title" value={focus.title} onChange={handleChange} />
                </label>
                <input type="submit" value="Search?" />
            </form>
            {dropdown.length > 0 && selectOption}
            <form  onSubmit={handleSubmit}>
                <label>Image URL
                    <input type="text" name="imgurl" value={focus.imgurl} onChange={handleChange} />
                </label>
                <img src={focus.imgurl} style={{"height": "100px"}} />
                <label>Genre
                    <input type="text" name="genre" value={focus.genre} onChange={handleChange} />
                </label>
                <label>Run Time
                    <input type="text" name="runtime" value={focus.runtime} onChange={handleChange} />
                </label>
                <label>Medium
                    <input type="text" name="medium" value={focus.medium} onChange={handleChange} />
                </label>
                <label>Source
                    <input type="text" name="source" value={focus.source} onChange={handleChange} />
                </label>
                <label>Notes
                    <input type="text" name="notes" value={focus.notes} onChange={handleChange} />
                </label>
                <label>Watched?
                    <input type="checkbox" name="watched" checked={focus.watched} onChange={handleChange} />
                </label>
                <input type="submit"/>
            </form>
        </div>
    )
}

export default Form


  