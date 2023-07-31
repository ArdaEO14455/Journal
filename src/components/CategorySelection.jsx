import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CategorySelection = () => {
    const [categories, setCategories] = useState(['Food', 'Gaming', 'Coding', 'Other'])
  
    return (
    <>
        <h2>Please select a category</h2>
        <ul>
            {categories.map(cat => (
            <li key={cat}>
                <Link to={`/entry/new/${cat}`}>{cat}</Link>
            </li>
            ))}
        </ul>
    </>
    )
}


export default CategorySelection