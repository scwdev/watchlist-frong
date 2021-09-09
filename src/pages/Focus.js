import React from "react"

const Focus = ({ focus, destroy, history, match }) => {

    const handleDelete = () => {
        window.confirm("Are you sure?")
        destroy(focus)
        history.push("/")
    }

    const handleEdit = () => {
        history.push(`/${focus.title}/edit`)
    }

    return ( 
        <main>
            <h2>{focus.title}</h2>
            <h3>{focus.genre}</h3>
            <h4>{focus.runtime}</h4>
            <p>{focus.notes}</p>
            <h5>{focus.medium} / {focus.source}</h5>
            <button onClick={handleEdit} >EDIT</button>
            <button onClick={handleDelete}>DELETE</button>
        </main>
    )
}

export default Focus