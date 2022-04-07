import React, { useContext } from 'react'
import { IssueContext } from '../context/IssueProvider'




function IssueForm(props) {
    const { addIssue } = props
    const { inputs, setInputs, initInputs } = useContext(IssueContext)


    function handleChange(e) {
        const { name, value } = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        addIssue(inputs)
        setInputs(initInputs)
    }

    const { title, description } = inputs
    return (
        <form onSubmit={handleSubmit} className="add-issue-form">
            <input
                type="text"
                name="title"
                value={title}
                onChange={handleChange}
                placeholder="Title" />
            <input
                type="text"
                name="description"
                value={description}
                onChange={handleChange}
                placeholder="Description" />
            <button>Add Issue</button>
        </form>
    )
}

export default IssueForm
