// CODE BY SAM CLARK - w1854525

import '../App.css'
import React, { useEffect, useState} from 'react';
import { Button, InputField, ErrorText } from 'govuk-react';
import { Link } from 'react-router-dom';
import jq from 'jquery';

function NHSinput() {
    const [nhsNum, setNhsNum] = useState('')
    const [firstName, setFirstName] = useState('')
    const [surname, setSurname] = useState('')
    const [dateOfBirth, setDOB] = useState('')
    const [postCode, setPostCode] = useState('')
    const [genderCode, setGenderCode] = useState('')
    const [buttonPressed, setButtonPressed] = useState(false);

    const [validRequest, setValidRequest] = useState(false);
    const [accountNotExist, setAccountNotExist] = useState(false)

    // Not a good solution from security perspective, could not get Context to work properly
    // Used temporary database table on GPDatabase to store other variables, but needed nhs number as identifier for SQL query
    useEffect(() => {
        window.localStorage.setItem('Number', nhsNum)
    }, [nhsNum]);

    const isInputEmpty = nhsNum === '';

    // Checks that the user input is the correct length
    const validNhsNumLength = nhsNum.length === 11;

    // Checks that the user input is in the desired format
    const validNhsNumFormat = /^\d+$/.test(nhsNum);

    // Handles displaying error messages if user has pressed continue with invalid input
    const handleClick = () => {
        setButtonPressed(true)
    };

    function handleNhsNumChange(event) {
        setNhsNum(event.target.value);
        setButtonPressed(false);

        checkNhsNum(function (requestResult) {
            console.log(requestResult)

            if (requestResult) {
                setValidRequest(true);
            }
            else {
                setValidRequest(false);
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

    // Handles only changing the page if the user's input is valid 
    const pageChange = (event) => {
        if (!accountNotExist || !validRequest || !validNhsNumLength || !validNhsNumFormat || isInputEmpty) {
            event.preventDefault();
        }
        else {
            addNhsDetails();
        }
    };

    return (
        <div>
            <h1 style={{ fontSize: "3rem" }}>
                What is your NHS number?
            </h1>

            <InputField
                hint={<>An 11 digit number, For example, '01234567891'</>}
                input={{
                    name: 'nhsfield',
                    onChange: handleNhsNumChange,
                    onBlur: handleNhsNumChange,
                    value: nhsNum
                }}
            >
                Enter your NHS number
            </InputField>
            <br></br>
            {buttonPressed && isInputEmpty && (
                <ErrorText>
                    You must input an NHS number
                </ErrorText>
            )}
            {buttonPressed && !validNhsNumLength && !isInputEmpty && (
                <ErrorText>
                    NHS number is not the correct length
                </ErrorText>
            )}
            {buttonPressed && !validNhsNumFormat && !isInputEmpty && (
                <ErrorText>
                    NHS number must consist of only numbers
                </ErrorText>
            )}
            {buttonPressed && !validRequest && validNhsNumFormat && validNhsNumLength && (
                <ErrorText>
                    No match found on NHS records
                </ErrorText>
            )}
            {buttonPressed && validRequest && validNhsNumFormat && validNhsNumLength && !accountNotExist && (
                <ErrorText>
                    An account already exists with this NHS Number
                </ErrorText>
            )}
            <br></br>
            <Link onClick={pageChange} to={{ pathname: '/address-details_nhs' }}>
                <Button onClick={handleClick}>Continue</Button>
            </Link>
        </div>
    );

    function checkNhsNum(callback) {
        var url_nhsNumInfo = 'http://localhost:4000/checkNhsNum.php'

        var nhsData = {
            "nhsNum": nhsNum
        }

        jq.ajax({
            type: "POST",
            url: url_nhsNumInfo,
            mode: "no-core",
            data: nhsData,
            dataType: 'json',
            success(data) {
                if (data === "No value found") {
                    callback(false);
                }
                else {
                    const retrievedNhsNum = parseInt(data[0].NHSNumber)
                    const convertedNhsNum = retrievedNhsNum.toString()

                    if (convertedNhsNum === nhsNum) {
                        const retrievedFirstName = data[0].Forename
                        setFirstName(retrievedFirstName.toString());

                        const retrievedSurname = data[0].Surname
                        setSurname(retrievedSurname.toString())

                        const retrievedDOB = data[0].PersonDOB
                        setDOB(retrievedDOB.toString())

                        const retrievedPostCode = data[0].Postcode
                        setPostCode(retrievedPostCode.toString())

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
                console.error(error);
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

    function addNhsDetails() {
        var url_GPdatabase = 'http://localhost:4000/addNhsDetails.php'

        var data = {
            "nhsNum": nhsNum,
            "forename": firstName,
            "surname": surname,
            "DOB": dateOfBirth,
            "postCode": postCode,
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
            error: function (error) {
                console.error(error);
            }
        })
    }
}
export default NHSinput;