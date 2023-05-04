// CODE BY SAM CLARK - w1854525

import '../App.css'
import React, { useState } from 'react';
import { Button, InputField, ErrorText } from 'govuk-react';
import { Link } from 'react-router-dom';
import jq from 'jquery';

function EmergencyContact() {
    const nhsNum = localStorage.getItem("Number")
    const [emergencyName, setEmergencyName] = useState('')
    const [isNameValid, setNameValid] = useState(false)
    const [emergencyNum, setEmergencyNum] = useState('')
    const [buttonPressed, setButtonPressed] = useState(false)

    // Checks if a name has been input
    const isNameEmpty = emergencyName === ''

    // Checks that the mobile number is the correct length and has the correct UK starting area code prefix
    const validMobileLength = emergencyNum.length === 11;
    const validMobilePrefix = emergencyNum.substring(0, 2) === '07';

    // Handles the name change and checks if it correctly is at minimum two words in length (forename and surname)
    const handleNameChange = (event) => {
        setEmergencyName(event.target.value)
        setButtonPressed(false)

        /* 
        Regex to validate full name, should require at least two words minimum, and allow for forename or surname to be two words connected by a hyphen or apostrophe.
        Does not support accented characters in current form
        */
        const nameValidity = /^[a-zA-Z]+(?:['-][a-zA-Z]+)?(?:\s+[a-zA-Z]+(?:['-][a-zA-Z]+)?)+$/
        setNameValid(nameValidity.test(emergencyName))
    }

    // Handles mobile number variable updating
    const handleMobileChange = (event) => {
        setEmergencyNum(event.target.value)
        setButtonPressed(false)
    }

    // Handles displaying error messages if user has pressed continue with invalid input
    const handleClick = () => {
        setButtonPressed(true)
    };

    // Handles only changing the page if the user's input is valid 
    const pageChange = (event) => {
        if ((isNameEmpty || !isNameValid || !validMobileLength || !validMobilePrefix)) {
            event.preventDefault();
        }
        else {
            addEmergencyContact();
        }
    };

    return (
        <div>
            <h1 style={{ fontSize: "3rem" }}>
                Who is your emergency contact?
            </h1>

            <InputField
                hint={<>This individual will be contacted in case of emergency</>}
                input={{
                    id: 'emergencyName',
                    onChange: handleNameChange
                }}
            >
                Enter emergency contact's full name
            </InputField>
            <br></br>

            {buttonPressed && (isNameEmpty || !isNameValid) && (
                <ErrorText>
                    Please enter a valid full name
                </ErrorText>
            )}

            <br></br>

            <InputField
                hint={<>11-digit number starting with '07'</>}
                input={{
                    id: 'emergencyMobile',
                    onChange: handleMobileChange
                }}
            >
                Enter emergency contact's UK mobile phone number
            </InputField>

            <br></br>

            {buttonPressed && (!validMobileLength) && (
                <ErrorText>
                    Mobile number must be 11-digits in length
                </ErrorText>
            )}
            {buttonPressed && (!validMobilePrefix) && (
                <ErrorText>
                    Mobile number must start with '07'
                </ErrorText>
            )}

            <br></br>

            <Link onClick={pageChange} to={{ pathname: '/account-type' }}>
                <Button onClick={handleClick}>Continue</Button>
            </Link>
        </div>
    );

    function addEmergencyContact() {
        var url_GPdatabase = 'http://localhost:4000/addEmergencyContact.php'

        var data = {
            "nhsNum": nhsNum,
            "emergencyName": emergencyName,
            "emergencyNo": emergencyNum
        }

        jq.ajax({
            type: "POST",
            url: url_GPdatabase,
            mode: "no-core",
            data: data,
            dataType: "json",
            success(data) {
                if (data === "Row updated successfully") {
                    console.log("updated")
                }
            },
            error: function (error) {
            }
        })
    }
}
export default EmergencyContact;