import React, { useContext, useEffect, useRef } from 'react'
import IssueList from './IssueList'
import { IssueContext } from '../context/IssueProvider'

function Public() {
    const hasFetchedData = useRef(false)
    const {
        user: {
            username
        },
        issues,
        getIssues
    } = useContext(IssueContext)

    useEffect(() => {
        if (!hasFetchedData.current) {
            getIssues()
            hasFetchedData.current = true
        }
    }, [getIssues])

    return (
        <div className="public">
            <h1>Welcome {username}!</h1>
            <h3>Issues</h3>
            <IssueList issues={issues} />
        </div>
    )
}

export default Public
