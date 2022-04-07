import React, { useContext, useEffect, useRef } from 'react'
import IssueForm from './IssueForm'
import IssueList from './IssueList'
import { IssueContext } from '../context/IssueProvider'

function Profile() {
    const hasFetchedData = useRef(false)
    const {
        user: {
            username
        },
        addIssue,
        issues,
        getUserIssues
    } = useContext(IssueContext)

    useEffect(() => {
        if (!hasFetchedData.current) {
            getUserIssues()
            hasFetchedData.current = true
        }
    }, [getUserIssues])

    return (
        <div className="profile">
            <h1>Welcome {username}!</h1>
            <h3>Add A Issue</h3>
            <IssueForm addIssue={addIssue} />
            <h3>Your Issues</h3>
            <IssueList issues={issues} />
        </div>
    )
}
export default Profile
