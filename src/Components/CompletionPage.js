// CODE BY SAM CLARK - w1854525

import '../App.css'
import React, { useState } from 'react'
import { Panel, Button } from 'govuk-react'
import jq from 'jquery'
import { Link } from 'react-router-dom'

function CompletionPage() {
    const nhsNum = localStorage.getItem('Number')
    const [dataRetrieved, setDataRetrieved] = useState(false)
    const [idNumber, setIdNumber] = useState('')

    // When user returns to home page, clear localstorage data and temporary table in the database
    const pageChange = (event) => {
        localStorage.clear()
        wipeTempData()
    };

    // Calls account database to get the user's ID to display on the page
    function callDatabase() {
        getIdNumber(function (requestResult) {
            if (requestResult) {
                setDataRetrieved(true)
            }
        })
    }

    // Only allows the database call to happen once
    if (!dataRetrieved) {
        callDatabase()
    }

    // Wipes the TempData table on the database
    function wipeTempData() {
        const url_GPdatabase = 'http://localhost:4000/wipeTempData.php'

        jq.ajax({
            url: url_GPdatabase,
            type: "POST",
            success: function (response) {
                console.log(response)
            }
        })
    }

    return (
        <div>
            <Panel title="Account created">
                Your Account ID Number
                <br />
                <br />
                <strong>
                    {idNumber}
                </strong>
                <br />
                
            </Panel>
            <br></br>
            <div>
                <Link onClick={pageChange} to={{ pathname: '/' }}>
                    <Button start>Return to Home Page</Button>
                </Link>
            </div>
        </div>
    )

    // Gets the ID number from the database by a server-side query using the NHS number provided previously
    function getIdNumber(callback) {
        var url_getData = 'http://localhost:4000/getIdNumber.php'

        var data = {
            "nhsNum": nhsNum
        }

        jq.ajax({
            type: "POST",
            url: url_getData,
            mode: "no-core",
            data: data,
            dataType: 'json',
            success(data) {
                if (data === "No value found") {
                    callback(false);
                }
                else {
                    if (data[0].NHSNumber == nhsNum) {
                        const retrievedIdNum = data[0].IDNumber
                        setIdNumber(retrievedIdNum)
                        callback(true)
                    }
                    else {
                        callback(false)
                    }
                }
            },
            error: function (error) {
                callback(false)
            }
        });
    }
}
export default CompletionPage;