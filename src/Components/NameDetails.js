// CODE BY SAM CLARK - w1854525

import '../App.css'
import React, { useEffect, useState } from 'react';
import { LabelText, Label, Button, InputField, ErrorText } from 'govuk-react';
import { Link } from 'react-router-dom';
import jq from 'jquery';

function NameDetails() {
    const [nhsNum, setNhsNum] = useState('');
    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [genderCode, setGenderCode] = useState('');
    const [dateOfBirth, setDOB] = useState('');
    const [buttonPressed, setButtonPressed] = useState(false);
    const [validForenameRequest, setValidForename] = useState(false);
    const [validSurnameRequest, setValidSurname] = useState(false);
    const [accountNotExist, setAccountNotExist] = useState(false);

    // Not ideal for security, but was unable to get Context to work properly.
    useEffect(() => {
        window.localStorage.setItem('Number', nhsNum)
    }, [nhsNum]);

    const postcode = localStorage.getItem("Post")

    // Checks that the name inputs are at least two characters long
    const validFirstNameLength = firstName.length >= 2;
    const validSurnameLength = surname.length >= 2;

    // Checks that the name inputs only contain letters, preventing numbers or special characters
    const validFirstName = /^[a-zA-Z-]+$/.test(firstName);
    const validSurname = /^[a-zA-Z-]+$/.test(surname);

    // Checks that input fields are not empty
    const firstNameNotEmpty = firstName.length > 0
    const surnameNotEmpty = surname.length > 0

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value)
        setButtonPressed(false)

        checkNHSdatabase(function (requestResult) {
            if (requestResult) {
                setValidForename(true);
                setValidSurname(true)
            }
            else {
                setValidForename(false);
                setValidSurname(false);
            }
        });

        checkAccountExists(function (requestResult) {
            if (requestResult) {
                setAccountNotExist(true)
            }
            else {
                setAccountNotExist(false)
            }
        })
    }

    const handleSurnameChange = (event) => {
        setSurname(event.target.value)
        setButtonPressed(false)

        checkNHSdatabase(function (requestResult) {
            console.log(requestResult)

            if (requestResult) {
                setValidForename(true);
                setValidSurname(true);
            }
            else {
                setValidForename(false);
                setValidSurname(false);
            }
        });

        checkAccountExists(function (requestResult) {
            if (requestResult) {
                setAccountNotExist(true)
            }
            else {
                setAccountNotExist(false)
            }
        })
    }
       
    // Handles displaying error messages if user has pressed continue with invalid input
    const handleClick = () => {
        setButtonPressed(true)
    };

    // Handles only changing the page if the user's input is valid 
    const pageChange = (event) => {
        if (!accountNotExist || !validForenameRequest || !validSurnameRequest || !validFirstNameLength || !validSurnameLength ||
            !validFirstName || !validSurname || !firstNameNotEmpty || !surnameNotEmpty) {
            event.preventDefault();
        }
        else {
            addNhsDetails()
        }
    };

    return (
        <div>
            <h1 style={{ fontSize: "3rem" }}>
                What is your name?
            </h1>

            <Label>
                <LabelText>
                    Enter your name
                </LabelText>
            </Label>
            <p></p>

            <InputField
                input={{
                    id: 'firstNameField',
                    onChange: handleFirstNameChange,
                    onBlur: handleFirstNameChange,
                    value: firstName
                }}
            >
                First Name
            </InputField>
            <br></br>
            <br></br>

            <InputField
                input={{
                    id: 'surnameField',
                    onChange: handleSurnameChange,
                    onBlur: handleSurnameChange,
                    value: surname
                }}
            >
                Surname
            </InputField>
            <br></br>
            <br></br>
            {buttonPressed && (!validFirstNameLength || !validSurnameLength) && (
                <ErrorText>
                    First name and surname must be at least two characters long
                </ErrorText>
            )}
            {buttonPressed && (!validFirstName || !validSurname) && (
                <ErrorText>
                    First name and surname cannot contain numbers or special characters (E.g., !,?,%,&,*)
                </ErrorText>
            )}
            {buttonPressed && (!firstNameNotEmpty || !surnameNotEmpty) && (
                <ErrorText>
                    All fields must be filled
                </ErrorText>
            )}
            {buttonPressed && ((!validForenameRequest && !validSurnameRequest) && validFirstNameLength && validSurnameLength) && (
                <ErrorText>
                    No Match Found on NHS Records
                </ErrorText>
            )}
            {buttonPressed && (!accountNotExist) && (
                <ErrorText>
                    An account already exists with these details
                </ErrorText>
            )}
            <br></br>
            <Link onClick={pageChange} to={{ pathname: '/contact-details'}}>
                <Button onClick={handleClick}>Continue</Button>
            </Link>
        </div>
    );

    // Checks the NHS database to get the records based on the first name/surname given 
    function checkNHSdatabase(callback) {
        var url_NHSdatabase = 'http://localhost:4000/checkNameNHSdatabase.php'
        let tempForename = ''
        let tempSurname = ''

        if (firstNameNotEmpty) {
            tempForename = firstName
            tempForename = tempForename.toUpperCase()
        }

        if (surnameNotEmpty) {
            tempSurname = surname
            tempSurname = tempSurname.toUpperCase()
        }

        var nhsData = {
            "firstName": tempForename,
            "surname": tempSurname
        }

        jq.ajax({
            type: "POST",
            url: url_NHSdatabase,
            mode: "no-core",
            data: nhsData,
            dataType: 'json',
            success(data) {
                if (data === "No value found") {
                    callback(false);
                }
                else {
                    const retrievedFirstName = data[0].Forename
                    const convertedFirstName = retrievedFirstName.toString()

                    const retrievedSurname = data[0].Surname
                    const convertedSurname = retrievedSurname.toString()

                    if ((convertedFirstName === tempForename) && (convertedSurname === tempSurname)) {
                        const retrievedNHS = data[0].NHSNumber
                        setNhsNum(retrievedNHS.toString())

                        const retrievedDOB = data[0].PersonDOB
                        setDOB(retrievedDOB.toString())

                        const retrievedGender = data[0].GenderCode
                        setGenderCode(retrievedGender.toString())

                        console.log(data[0])
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

    function checkAccountExists(callback) {
        var url_nhsNumInfo = 'http://localhost:4000/checkAccountExists.php'

        var data = {
            "nhsNum": nhsNum
        }

        jq.ajax({
            type: "POST",
            url: url_nhsNumInfo,
            mode: "no-core",
            data: data,
            dataType: 'json',
            success(data) {
                if (data === "No value found") {
                    callback(true);
                }
                else {
                    callback(false)
                }
            },
            error: function (error) {
                console.error(error);
                callback(false)
            }
        });
    }

    // Adds the NHS Number, name, date of birth and gender to the temporary database table based on what was retrieved from the NHS database
    function addNhsDetails() {
        var url_GPdatabase = 'http://localhost:4000/addNameNHSDetails.php'

        const tempForename = firstName.toUpperCase()
        const tempSurname = surname.toUpperCase()

        var data = {
            "nhsNum": nhsNum,
            "forename": tempForename,
            "surname": tempSurname,
            "DOB": dateOfBirth,
            "postcode": postcode,
            "gender": genderCode
        }

        console.log(data)

        jq.ajax({
            type: "POST",
            url: url_GPdatabase,
            mode: "no-core",
            data: data,
            dataType: 'json',
            success(data) {
                if (data === "Data Inserted") {
                    console.log("success")
                }
            },
            error: function (error) {}
        })
    }
}
export default NameDetails;