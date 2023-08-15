import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const CategorySelection = () => {
    const [categories, setCategories] = useState([])
    
    useEffect( () => {
        const getCats = async () => {
        const res = await fetch(`${import.meta.env.VITE_API_HOST}/categories`) //taken from port number from API
        const data = await res.json() //parse json data
        setCategories(data)
    } //set the entries used
    getCats()
      }, []) //always start with an empty array
    
    return (
    <>
        <h3>Please select a category:</h3>
        <ul>
            {categories.map(cat => (
            <li key={cat._id}>
                <Link to={`/entry/new/${cat.name}`}>{cat.name}</Link>
            </li>
            ))}
        </ul>
    </>
    )
}


export default CategorySelection