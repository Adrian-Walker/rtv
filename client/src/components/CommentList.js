import React from 'react'
import Comment from './Comment'

function CommentList(props) {
    const { comments } = props

    return (
        <div className="comment-list">
            {(comments) ? comments.map(com => (<Comment comment={com} issueId={com.issueId} key={com._id}>{com.comment}</Comment>)) : console.log("fail")}
        </div>
    )
}

export default CommentList
