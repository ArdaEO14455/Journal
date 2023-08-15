import React, { useEffect, useState } from "react"
import Home from "./Home"
import CategorySelection from "./CategorySelection"
import NewEntry from "./NewEntry"
import { Routes, Route, useParams, useNavigate } from "react-router-dom"
import NavBar from "./NavBar"
import ShowEntry from "./ShowEntry"

// const seedEntries = [
//   { category: "Food", content: "Pizza is yummy!" },
//   { category: "Coding", content: "Coding is fun!" },
//   { category: "Gaming", content: "Skyrim is for the Nords!" },
// ]

const App = () => {
  const nav = useNavigate()
  const [entries, setEntries] = useState([])
  // console.log(`id: ${id}`)

  useEffect( () => {
    (async () => { //async functions return a promise, but they cannot be used in useEffect, so we need to wrap it in a function
    const res = await fetch(`${import.meta.env.VITE_API_HOST/entries') //taken from port number from API
    const data = await res.json() //parse json data
    setEntries(data)
  })()//set the entries used
  // getEntries()
  }, [])
  // HOC (higher-order component)
  function ShowEntryWrapper() {
    const { id } = useParams()
    return <ShowEntry entry={entries[id]} />
  }

  async function addEntry(category, content) {
    const id = entries.length
    // Add a new entry
      const returnedEntry= await fetch(`${import.meta.env.VITE_API_HOST/entries', {
        method: 'POST',
        body: JSON.stringify({ category, content }),
        headers: { "Content-Type": "application/json" }
      })
      //we do a fetch with a POST request, passing in the category and content, and putting the returned value into the variable returnedEntry

    const newEntry = { category, content }
    setEntries([...entries, await returnedEntry.json()])
    nav(`/entry/${id}`)
  }

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home entries={entries} />} />
        <Route path="/category" element={<CategorySelection />} />
        <Route path="/entry">
          <Route path=":id" element={<ShowEntryWrapper />} />
          <Route path="new/:category" element={<NewEntry addEntry={addEntry} />} />
        </Route>
        <Route path="*" element={<h3>Page not found</h3>} />
      </Routes>
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

// Unit Testing
// Test Framework: Vitest is the framework that allows us to do the test
// Testing library - a library of tests executeed by Vitest
// when installing vitest use 'npm i -D', because -D means its installed as a dev tool, rather than as a part of the final software. this is because its not required in the final version, as it is just for unit testing
// when installing vitest, be sure to use 'jsdom', meaning that its used in a virtual browser environment
// in the command, we ensure we install the different testing components: react (includes hooks) user-inputs (use-event), and glue it all together (jest-dom)
// npm i -D vitest jsdom @testing-library/react @testing-library/user-event @testing-library/jest-dom