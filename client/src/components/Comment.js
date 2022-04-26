import React from "react";

function Comment(props) {
  const { comment } = props;

  return (
    <div className="comment">
      <p> ► {comment.comment}</p>
      <hr />
    </div>
  );
}

export default Comment;
