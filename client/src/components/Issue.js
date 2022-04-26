import React, { useContext, useState } from "react";
import { IssueContext } from "../context/IssueProvider";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { UserContext } from "../context/UserProvider";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiTwotoneDislike, AiTwotoneLike } from "react-icons/ai";

function Issue(props) {
  const { issue } = props;
  const { handleDelete, handleVote } = useContext(IssueContext);
  const [count, setCount] = useState(0);

  const { user } = useContext(UserContext);

  const postedBy = `Posted By: ${issue.username} on ${issue.dateCreated.slice(
    0,
    10
  )} @ ${issue.dateCreated.slice(11, 16)}`;

  const likes = () => {
    let newDislike = count + 1;
    setCount(newDislike);
  };
  const dislikes = () => {
    let newLike = count - 1;
    setCount(newLike);
  };

  function voting(vote, id, username) {
    const voted = issue.votedUsers.includes(username);
    if(voted) return alert("You have already voted")
    handleVote(vote, id)
  }

  return (
    <div className="issues">
      {user._id === issue.user && (
        <i className="delete-btn" onClick={() => handleDelete(issue._id)}>
          {" "}
          <RiDeleteBin6Line />
        </i>
      )}
      <h1>{issue.title}</h1>
      <hr />
      <p>{issue.description}</p>
      <hr />
      <p className="posted-by">{postedBy}</p>
      <div className="votes">
        <i
          style={{ color: "blue" }}
          onClick={() => voting("upVote", issue._id, user.username)}
        >
          {/* {console.log(issue.upVote)} */}
          <AiTwotoneLike />
        </i>
        <p>{issue.upvote}</p>
        <i
          style={{ color: "red" }}
          onClick={() => voting("downVote", issue._id, user.username)}
        >
          <AiTwotoneDislike />
          {dislikes}
        </i>
        <p>Total Score: {(issue.upVote - issue.downVote)}</p>
      </div>
      <h1>Comments: </h1>
      <CommentList issueId={issue._id} comments={issue.comments} />
      <CommentForm issueId={issue._id} />
    </div>
  );
}

export default Issue;
