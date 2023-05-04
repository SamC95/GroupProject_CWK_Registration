// CODE BY SAM CLARK - w1854525

import '../App.css'
import React from 'react'
import { Panel, Button } from 'govuk-react'
import { Link } from 'react-router-dom'

function DeletionConfirm() {
    return (
        <div>
            <Panel title="Account Successfully Deleted"/>
            <br></br>
            <div>
                <Link to={{ pathname: '/' }}>
                    <Button start>Return to Home Page</Button>
                </Link>
            </div>
        </div>
    )
}
export default DeletionConfirm;