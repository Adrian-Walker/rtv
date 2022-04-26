import React, { useContext, useState } from 'react'
import { IssueContext } from '../context/IssueProvider'
import { UserContext } from '../context/UserProvider'

function Comment(props) {
    const { issueId } = props
    const { setComments, addComment } = useContext(IssueContext)
    const [comment, setComment] = useState('')

    // const {
    //     user: {
    //         username
    //     }
    // } = useContext(UserContext)

    function handleChange(e) {
        const { name, value } = e.target
        setComments(prevInputs => ({
            ...prevInputs,
            [name]: value,
            issue_id: issueId
        }))
        setComment(value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        addComment(comment)
        setComment('')
    }
    return (
        <form onSubmit={handleSubmit} className="add-comment-form">
            <input
                type="text"
                name="comment"
                autoComplete='off'
                value={comment}
                onChange={handleChange}
                placeholder="Comment" />
            <button>Comment</button>
        </form>
    )
}

export default Comment
