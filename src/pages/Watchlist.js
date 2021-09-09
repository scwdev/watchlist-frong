import React from "react"

import { Link } from "react-router-dom"

const Watchlist = ({ watchlist, setFocus }) => {

    const selectItem = (input) => {
        setFocus(input)
    }

    const listMap = watchlist.map((item, index) => {
        return (
            <Link key={index + item.title} to={`/${item.title}`} onClick={() => {setFocus(item)}}>
                <h3>{item.title}</h3>
                <img src={item.imgurl}/>
            </Link>
        )
    })

    return (
        <main className="watchlist">
            {listMap}
        </main>
    )

}

export default Watchlist