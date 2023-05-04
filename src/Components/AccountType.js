// CODE BY SAM CLARK - w1854525

import '../App.css'
import React, { useState } from 'react'
import { Button, MultiChoice, Radio, ErrorText } from 'govuk-react'
import { Link } from 'react-router-dom'
import jq from 'jquery'

function AccountType() {
    const nhsNum = localStorage.getItem("Number")
    const [accountType, setAccountType] = useState('')
    const [buttonPressed, setButtonPressed] = useState(false)
    const [RadioPressed, setRadioPressed] = useState(false)

    // Sets selectedSex to 1 if patient radio button is active, 2 if doctor radio button is active or 3 if admin radio button is active
    const handleRadioChange = (event) => {
        setAccountType(event.target.id === "patient" ? "1" :
            event.target.id === "doctor" ? "2" : "3")
        setRadioPressed(true)
    };

    // Handles displaying error messages if user has pressed continue with invalid input
    const handleClick = () => {
        setButtonPressed(true)
    };

    // Handles only changing the page if the user's input is valid 
    const pageChange = (event) => {
        if (RadioPressed === false) {
            event.preventDefault();
        }
        else {
            addAccountType();
        }
    };

    return (
        <div>
            <h1 style={{ fontSize: "3rem" }}>
                Which account type are you creating?
            </h1>

            <p></p>

            <MultiChoice
                label="Select an Account Type"
            >
                <br></br>
                <Radio
                    name="accountOption"
                    id="patient"
                    onChange={handleRadioChange}
                >
                    Patient
                </Radio>
                <Radio
                    name="accountOption"
                    id="doctor"
                    onChange={handleRadioChange}
                >
                    Doctor
                </Radio>
                <Radio
                    name="accountOption"
                    id="admin"
                    onChange={handleRadioChange}
                >
                    Administrator
                </Radio>
            </MultiChoice>
            <br></br>
            {buttonPressed && !RadioPressed && (
                <ErrorText>
                    You must select an account type
                </ErrorText>
            )}
            <br></br>
            <div>
                <Link onClick={pageChange} to={{ pathname: '/confirm-details' }} >
                    <Button onClick={handleClick}>Continue</Button>
                </Link>
            </div>
        </div>
    );

    function addAccountType() {
        var url_GPdatabase = 'http://localhost:4000/addAccountType.php'

        var data = {
            "nhsNum": nhsNum,
            "accountType": accountType
        }

        jq.ajax({
            type: "POST",
            url: url_GPdatabase,
            mode: "no-core",
            data: data,
            dataType: "json",
            success(data) {
                if (data === "Success!") {
                    console.log("updated")
                }
            },
            error: function (error) {
                console.error(error);
            }
        })
    }
}
export default AccountType;