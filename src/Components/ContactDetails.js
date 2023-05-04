// CODE BY SAM CLARK - w1854525

import '../App.css'
import React, { useState } from 'react'
import { Button, InputField, ErrorText } from 'govuk-react';
import { Link } from 'react-router-dom';
import jq from 'jquery';

function ContactDetails() {
    const nhsNum = localStorage.getItem("Number")
    const [emailAddress, setEmailAddress] = useState('')
    const [isEmailValid, setIsEmailValid] = useState(true)
    const [mobileNum, setMobileNum] = useState('')
    const [landlineNum, setLandlineNum] = useState('')
    const [buttonPressed, setButtonPressed] = useState(false)

    // Checks if email address field is empty
    const isEmailEmpty = emailAddress === ''

    // Checks that the mobile number is the correct length and has the correct UK starting area code prefix
    const validMobileLength = mobileNum.length === 11;
    const validMobilePrefix = mobileNum.substring(0, 2) === '07';

    // Checks that the landline is the correct length, and also checks if the user has included any input
    const validLandlineLength = (landlineNum.length === 10 || landlineNum.length === 11)
    const isLandlineEmpty = landlineNum === ''

    // Stores the current email address input and checks if it meets required email formatting
    const handleEmailChange = (event) => {
        setEmailAddress(event.target.value)
        setButtonPressed(false)

        // Email format referenced from https://www.w3resource.com/javascript/form/email-validation.php
        const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        setIsEmailValid(emailFormat.test(event.target.value))
    }

    // Handles mobile number variable updating
    const handleMobileChange = (event) => {
        setMobileNum(event.target.value)
        setButtonPressed(false)
    }

    // Handles landline number variable updating
    const handleLandlineChange = (event) => {
        setLandlineNum(event.target.value)
        setButtonPressed(false)
    }

    // Handles displaying error messages if user has pressed continue with invalid input
    const handleClick = () => {
        setButtonPressed(true)
    };

    // Handles only changing the page if the user's input is valid 
    const pageChange = (event) => {
        if ((isEmailEmpty || !isEmailValid || !validMobileLength || !validMobilePrefix) || (!isLandlineEmpty && !validLandlineLength)) {
            event.preventDefault();
        }
        else {
            addContactDetails();
        }
    };

    return (
        <div>
            <h1 style={{ fontSize: "3rem" }}>
                What are your contact details?
            </h1>

            <InputField
                hint={<>For example, email@example.com</>}
                input={{
                    id: 'emailInput',
                    onChange: handleEmailChange
                }}
            >
                Enter your email address
            </InputField>
            <br></br>
            {buttonPressed && (isEmailEmpty || !isEmailValid) && (
                <ErrorText>
                    Please enter a valid email address
                </ErrorText>
            )}

            <br></br>

            <InputField
                hint={<>An 11-digit number starting with '07'</>}
                input={{
                    id: 'mobileInput',
                    onChange: handleMobileChange
                }}
            >
                Enter your UK mobile number
            </InputField>
            <br></br>
            {buttonPressed && !validMobileLength && (
                <ErrorText>
                    Mobile number must be 11-digits in length
                </ErrorText>
            )}
            
            {buttonPressed && !validMobilePrefix && (
                <ErrorText>
                    Mobile number must begin with '07'
                </ErrorText>
            )}

            <br></br>

            <InputField
                hint={<>This field is optional</>}
                input={{
                    id: 'landlineInput',
                    onChange: handleLandlineChange
                }}
            >
                Enter your UK landline number
            </InputField>
            <br></br>
            {buttonPressed && !validLandlineLength && !isLandlineEmpty && (
                <ErrorText>
                    If you are including a landline, it must be 10 or 11 digits in length
                </ErrorText>
            )}

            <br></br>

            <Link onClick={pageChange} to={{ pathname: '/emergency-contact'}}>
                <Button onClick={handleClick}>Continue</Button>
            </Link>
        </div>
    );

    function addContactDetails() {
        var url_GPdatabase = 'http://localhost:4000/addContactDetails.php'

        var data = {
            "nhsNum": nhsNum,
            "emailAddress": emailAddress,
            "mobileNo": mobileNum,
            "landlineNo": landlineNum
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
export default ContactDetails;