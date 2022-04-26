import React, { useState } from "react";
import axios from "axios";

export const IssueContext = React.createContext();

const userAxios = axios.create();

userAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  //   console.log(config.headers)
  return config;
});

function IssueProvider(props) {
  const initInputs = {
    title: "",
    description: "",
    votes: 0,
    voters: [],
  };

  const commentsInput = {
    comment: "",
    issue_id: "",
  };

  const [comments, setComments] = useState(commentsInput);
  const [inputs, setInputs] = useState(initInputs);

  const initState = {
    user: JSON.parse(localStorage.getItem("user")) || {},
    token: localStorage.getItem("token") || "",
    issues: [],
    errMsg: "",
  };
  //   console.log(initState)

  const [userState, setUserState] = useState(initState);

  function getUserIssues() {
    userAxios
      .get("/api/issue/user")
      .then(async (res) => {
        let tempComments = await getIssueComments2()
        Promise.all(res.data.map(i => {
          return {
            ...i,
            comments: tempComments.filter(x => x.issue_id === i._id)
          }
        }))
        .then(data => {
          setUserState((prevState) => ({
            ...prevState,
            issues: data,
          }));
        })
        // Promise.all(
        //   res.data.map(async (issue) => {
        //     return {
        //       ...issue,
        //       comments: await getIssueComments(issue._id).then((comments) => {
        //         issue.comments = comments;
        //         return comments;
        //       }),
        //     };
        //   })
        // ).then((res) => {
        //   console.log("Issue with Comments", res);
          // setUserState((prevState) => ({
          //   ...prevState,
          //   issues: res,
          // }));
        // });
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  async function getIssues() {
    userAxios
      .get("/api/issue")
      .then(async (res) => {
        let tempComments = await getIssueComments2()
        Promise.all(res.data.map(i => {
          return {
            ...i,
            comments: tempComments.filter(x => x.issue_id === i._id)
          }
        })).then(data => {
          console.log(data)
          setUserState((prevState) => ({
            ...prevState,
            issues: data,
          }));
        })
        // getIssueComments2().then(data => {
        //   console.log(data)
        // })
        // console.log(tempComments)
        // Promise.all(
        //   res.data.map(async (issue) => {
        //     return {
        //       ...issue,
        //       comments: await getIssueComments(issue._id).then((comments) => {
        //         issue.comments = comments;
        //         return comments;
        //       }),
        //     };
        //   })
        // ).then((res) => {
        //   // console.log("Issue with Comments", res);
        //   setUserState((prevState) => ({
        //     ...prevState,
        //     issues: res,
        //   }));
        // });
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  async function getIssueComments2() {
    const commentsData = await userAxios.get("/api/comment")
    return commentsData.data
  }

  function getIssueComments(userId) {
    const userData = userAxios
      .get(`/api/comment/${userId}`)
      .then((res) => {
        setUserState((prevState) => ({
          ...prevState,
        }));
        return res.data;
      })
      .catch((err) => console.log(err.response.data.errMsg));
    return userData;
  }

  function addComment() {
    console.log(comments);
    userAxios
      .post(`/api/comment/${comments.issue_id}`, comments)
      .then((res) => {
        console.log(res.data);
        setUserState((prevState) => {
          // console.log('prevState', prevState)
          const issues = prevState.issues.find(
            (issue) => issue._id === res.data.issue_id
          );
          console.log(issues)
          issues.comments.push(res.data);
          console.log(res.data + "Line 113 test");
          return {
            ...prevState,
          };
        });
      })

      .catch((err) => console.log(err.response.data.errMsg));
  }

  function addIssue(newIssue) {
    userAxios
      .post("/api/issue", newIssue)
      .then((res) => {
        setUserState((prevState) => ({
          ...prevState,
          issues: [...prevState.issues, res.data],
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  const handleDelete = (issueId) => {
    userAxios
      .delete(`/api/issue/${issueId}`)
      .then((res) => {
        console.log(res);
        return setUserState((prevInputs) => ({
          ...prevInputs,
          issues: [
            ...prevInputs.issues.filter((issue) => issue._id !== issueId),
          ],
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  };

  function handleVote(vote, issueId) {
    userAxios
      .put(`/api/issue/vote/${issueId}?voteType=${vote}`)
      .then((res) => {
        setUserState((prevState) => ({
          ...prevState,
          issues: prevState.issues.map(i => i._id !== issueId ? i : res.data ),
        }));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  }

  return (
    <IssueContext.Provider
      value={{
        ...userState,
        addIssue,
        addComment,
        handleDelete,
        setInputs,
        inputs,
        initInputs,
        comments,
        setComments,
        getUserIssues,
        getIssues,
        handleVote,
      }}
    >
      {props.children}
    </IssueContext.Provider>
  );
}

export default IssueProvider;
