import React, { useState } from "react"
import { useParams } from "react-router-dom"

const NewEntry = ({ entries, setEntries }) => {
  const { category , useNavigate} = useParams()
  const [content, setContent] = useState('')
  const nav = useNavigate()

  function submit(e) {
    e.preventDefault()
    // Add a new entry
    const newEntry = { category, content }
    setEntries([...entries, newEntry])
    nav('/')
  }

  return (
    <>
      <h3>New entry in {category} category</h3>
      <form className="container" onSubmit={submit}>
        <div>
          <textarea value={content} onChange={e => setContent(e.target.value)} className="form-control" rows="8"></textarea>
        </div>
        <button className="btn btn-primary mt-3">Create Entry</button>
      </form>
    </>
  )
}

export default NewEntry