import React, { useState, useEffect } from 'react'
import { Switch, Route, Link } from 'react-router-dom';

import './App.css';

import Watchlist from './pages/Watchlist';
import Focus from './pages/Focus';
import Form from './pages/Form';

function App(props) {
  
  const nullItem = {
    id: "",
    imgurl: "",
    title: "",
    runtime: "",
    medium: "",
    genre: "",
    source: "",
    watched: false,
    notes: ""
  }

  const [ watchlist, setWatchlist ] = useState([])
  const [ focus, setFocus ] = useState(nullItem)

  const url = "https://watchlist-back.herokuapp.com/watchlist/"

  const getList = async () => {
    const response = await fetch(url)
    const data = await response.json()
    setWatchlist(data)
  }

  useEffect(() => {getList()}, [])

  const addMedia = async (input) => {
    const response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(input)
    })
    getList()
  }

  const updateMedia = async (input) => {
    const response = await fetch(url + input.id + "/", {
      method: "put",
      header: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(input)
    })
    getList()
  }

  const deleteMedia = async (input) => {
    const response = await fetch(url + input.id + "/", {
      method: "delete",
      header: {
        "Content-Type": "application/json"
      }
    })
    getList()
  }

  const addNew = () => {
    setFocus(nullItem)
    props.history.push("/add-new")
  }

  return (
    <div className="App">
      <Link to="/">
        <h1>Watchlist</h1>
      </Link>
      <button onClick={() => {addNew()}}>Add Something</button>
      <Switch >
        <Route exact path="/" render={(rp) => <Watchlist {...rp} watchlist={watchlist} setFocus={setFocus} />} />
        <Route path="/add-new" render={(rp) => <Form {...rp} focus={focus} setFocus={setFocus} createUpdate={addMedia} />} />
        <Route exact path="/:name" render={(rp) => <Focus {...rp} focus={focus} destroy={deleteMedia} />} />
        <Route path="/:name/edit" render={(rp) => <Form {...rp} focus={focus} setFocus={setFocus} createUpdate={updateMedia} />} />
      </Switch>
      
      
    </div>
  );
}

export default App;
