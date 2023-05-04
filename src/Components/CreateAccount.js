// CODE BY SAM CLARK - w1854525

import '../App.css'
import React, { useState } from 'react';
import { LabelText, Label, HintText, Button } from 'govuk-react';
import jq from 'jquery';
import { Link } from 'react-router-dom';

function CreateAccount() {
    // Clears local storage of anything currently stored in it
    localStorage.clear();

    const [tempDataCall, setTempDataCall] = useState('')

    // Wipes the TempData table on the database
    function wipeTempData() {
        const url_GPdatabase = 'http://localhost:4000/wipeTempData.php'

        jq.ajax({
            url: url_GPdatabase,
            type: "POST",
            success: function (response) {
                console.log(response)
                setTempDataCall(true)
            }
        })
    }
    // Calls the function to wipe temporary data once
    if (!tempDataCall) {
        wipeTempData()
    }

    return (
        <div>
            <h1 style={{ fontSize: "3rem" }}>
                Create an Account
            </h1>

            <Label>
                <LabelText>
                    Create an account using an NHS number
                </LabelText>

                <HintText>
                    Select this option if you know your NHS number
                </HintText>
            </Label>
            <p></p>

            <div>
                <Link to="/nhs-input">
                    <Button start>Start</Button>
                </Link>
            </div>


            <Label>
                <LabelText>
                    Create an account using a postcode and name
                </LabelText>

                <HintText>
                    Select this option if you do not know your NHS number
                </HintText>
            </Label>
            <p></p>

            <div>
                <Link to="/address-details">
                    <Button start>Start</Button>
                </Link>
            </div>
        </div> 
    );
}
export default CreateAccount;