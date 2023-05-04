// CODE BY SAM CLARK - w1854525

import '../App.css'
import React, { useState } from 'react'
import { Button, InputField, ErrorText } from 'govuk-react';
import { Link } from 'react-router-dom';
import jq from 'jquery';

function CreatePassword() {
    // Sets all the variables needed to get user input and create an account
    const nhsNum = localStorage.getItem("Number")
    const [passwordInput, setPasswordInput] = useState('')
    const [confirmInput, setConfirmInput] = useState('')
    const [buttonPressed, setButtonPressed] = useState('')

    const [dataRetrieved, setDataRetrieved] = useState(false);
    const [forename, setForename] = useState('');
    const [surname, setSurname] = useState('');
    const [DOB, setDOB] = useState('');
    const [genderCode, setGenderCode] = useState('');
    const [accountCode, setAccountCode] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [postCode, setPostCode] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNum, setMobileNum] = useState('');
    const [landlineNum, setLandlineNum] = useState('');
    const [emergencyContact, setEmergencyContact] = useState('')
    const [emergencyNum, setEmergencyNum] = useState('')

    // gets the input data for the fields above from the database by checking for an NHS number match
    function callDatabase() {
        getInputData(function (requestResult) {
            if (requestResult) {
                setDataRetrieved(true)
            }
        })
    }

    // dataRetrieved is set to true after calling the function callDatabase once, this prevents it constantly looping and retrieving data repeatedly
    if (!dataRetrieved) {
        callDatabase();
    }

    // Checks that both fields have a matching input
    const doInputsMatch = passwordInput === confirmInput

    // Checks that both fields input is at least 8 characters long
    const validInputLength = (passwordInput.length >= 8 && confirmInput.length >= 8)

    // Handles the input in the 'Enter Password' field
    const handleInputChange = (event) => {
        setPasswordInput(event.target.value)
    }

    // Handles the input in the 'Confirm Password' field
    const handleConfirmChange = (event) => {
        setConfirmInput(event.target.value)
    }

    // Handles displaying error messages if user has pressed continue with invalid input
    const handleClick = () => {
        setButtonPressed(true)
    };

    // Handles only changing the page if the user's input is valid 
    const pageChange = (event) => {
        if ((!doInputsMatch || !validInputLength || !dataRetrieved)) {
            event.preventDefault();
        }
        else {
            accountCreation();
        }
    };

    return (
        <div>
            <h1 style={{ fontSize: "3rem" }}>
                Create an account password
            </h1>

            <InputField
                hint={<>Password must be at least 8 characters in length</>}
                input={{
                    id: 'password',
                    type: 'password',
                    onChange: handleInputChange
                }}
            >
                Enter Password
            </InputField>

            <br></br>
            <br></br>

            <InputField
                input={{
                    id: 'passwordConfirm',
                    type: 'password',
                    onChange: handleConfirmChange
                }}
            >
                Confirm Password
            </InputField>

            <br></br>
            <br></br>

            {buttonPressed && (!doInputsMatch) && (
                <ErrorText>
                    Password does not match
                </ErrorText>
            )}

            {buttonPressed && (!validInputLength) && (
                <ErrorText>
                    Password must be at least 8 characters in length
                </ErrorText>
            )}

            {buttonPressed && (!validInputLength) && (
                <ErrorText>
                    Password must be at least 8 characters in length
                </ErrorText>
            )}

            {buttonPressed && (!dataRetrieved) && (
                <ErrorText>
                    An error has occurred retrieving details
                </ErrorText>
            )}

            <div>
                <Link onClick={pageChange} to={{ pathname: '/completion-page' }}>
                    <Button onClick={handleClick}>Continue</Button>
                </Link>
            </div>
        </div>
    );

    // Gets all the necessary data from the database with a server-side query
    // and assigns it into the appropriate variables
    function getInputData(callback) {
        var url_getData = 'http://localhost:4000/getInputData.php'

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
                console.log(data)
                if (data === "No value found") {
                    callback(false);
                }
                else {
                    if (data[0].NHS == nhsNum) {
                        const retrievedFirstName = data[0].Forename
                        setForename(retrievedFirstName.toString());

                        const retrievedSurname = data[0].Surname
                        setSurname(retrievedSurname.toString())

                        const retrievedDOB = data[0].DateOfBirth
                        setDOB(retrievedDOB.toString())

                        const retrievedPostCode = data[0].PostCode
                        setPostCode(retrievedPostCode.toString())

                        const retrievedGender = data[0].GenderCode
                        setGenderCode(retrievedGender.toString())

                        const retrievedAddress1 = data[0].AddressLine1
                        setAddress1(retrievedAddress1.toString())

                        const retrievedAddress2 = data[0].AddressLine2
                        setAddress2(retrievedAddress2.toString())

                        const retrievedCity = data[0].City
                        setCity(retrievedCity.toString())

                        const retrievedEmail = data[0].Email
                        setEmail(retrievedEmail.toString())

                        const retrievedMobile = data[0].MobileNumber
                        setMobileNum(retrievedMobile.toString())

                        const retrievedLandline = data[0].LandlineNumber
                        setLandlineNum(retrievedLandline.toString())

                        const retrievedEmergencyContact = data[0].EmergencyContact
                        setEmergencyContact(retrievedEmergencyContact.toString())

                        const retrievedEmergencyNum = data[0].EmergencyNumber
                        setEmergencyNum(retrievedEmergencyNum.toString())

                        const retrievedAccountType = data[0].AccountType
                        setAccountCode(retrievedAccountType.toString())
                        
                        callback(true)
                    }
                    else {
                        callback(false)
                    }
                }
            },
            error: function (error) {
                console.log(error)
                callback(false)
            }
        });
    }

    // Creates the account by taking all the data retrieved from the getInputData function and
    // placing it into the accounts table on the database via a server-side query
    function accountCreation() {
        var url_GPdatabase = 'http://localhost:4000/accountCreation.php'

        var data = {
            "nhsNum": nhsNum,
            "forename": forename,
            "surname": surname,
            "DOB": DOB,
            "gender": genderCode,
            "address1": address1,
            "address2": address2,
            "city": city,
            "postCode": postCode,
            "email": email,
            "mobileNum": mobileNum,
            "landlineNum": landlineNum,
            "emergencyName": emergencyContact,
            "emergencyNo": emergencyNum,
            "accountType": accountCode,
            "password": passwordInput
        }

        jq.ajax({
            type: "POST",
            url: url_GPdatabase,
            mode: "no-core",
            data: data,
            dataType: "json",
            success(data) {
                if (data === "Row updated successfully") {
                    console.log("success")
                }
            },
            error: function (error) {
                console.log(error)
            }
        })
    }
}
export default CreatePassword;