import React, { useState } from "react"
import Home from "./Home"
import CategorySelection from "./CategorySelection"
import NewEntry from "./NewEntry"
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom"
import NavBar from "./NavBar"
import ShowEntry from "./ShowEntry"

const seedEntries = [
  { category: 'Food', content: 'Pizza is Yummy'},
  { category: 'Coding', content: 'Coding is fun!'},
  { category: 'Gaming', content: 'Skyrim is for the Nords'}
]

const App = () => {
  const [entries, setEntries] = useState(seedEntries)

  //HOC (Higher-Order Component)
  function ShowEntryWrapper() {
    const { id } = useParams()
    return <ShowEntry entry={entries[id]}/>
  }

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home entries={entries}/>} />
          <Route path="/category" element={<CategorySelection />} />
          <Route path="/entry">
            <Route path=":id" element={<ShowEntryWrapper />}/>
            <Route path="new/:category" element={<NewEntry entries={entries} setEntries={setEntries} />} />
          </Route>
          <Route path="*" element={<h3>Page not found</h3>} />
        </Routes>
      </BrowserRouter>
      {/* <Home />
      <CategorySelection />
      <NewEntry /> */}
    </>
  )
}

export default App

//instead of navigating between pages, we will have components represent pages and swap navigate between those. it will look like the page is changing, but its still the same page.
// a 'router' can process different urls, such as http://localhost:5173/Home
// to begin we run the following command: npm i react-router-dom,
// import the above
// 'BroswerRouter' hooks into the React framework / our app, and monitors the address bar for changes
// first we create a child component of BrowserRouter -> 'Routes'. within
// Each 'Route' is a children of 'BrowserRouter' and are used to specify URLs and destination files.
//if a path doesnt display, 
// we can still add other things into the BrowserRouter component that isnt Routes.
//each individual jsx file other than app.jsx is where we do the actual modification of the HTML
// you can create sub routes by nesting a Route within a route, but when specifying the path, you need to remove the '/' in the sub route
// the last route should be <Route path='*' element{404 page(needs to be imported or created in a separate file)}>. the '*' is the 'catch-all' path, ie if the URL doesnt match any specified path, the page will render the route with the '*' path. 
