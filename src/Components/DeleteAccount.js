import '../App.css'
import React, { useState } from 'react';
import { LabelText, Label, Button, InputField, ErrorText, ErrorSummary } from 'govuk-react';
import { Link } from 'react-router-dom';
import jq from 'jquery';

function DeleteAccount() {
    const [idNum, setIdNum] = useState('')
    const [password, setPassword] = useState('')
    const [isValid, setValidity] = useState('')
    const [buttonPressed, setButtonPressed] = useState(false)

    // Handles displaying error messages if user has pressed continue with invalid input
    const handleClick = () => {
        setButtonPressed(true)
    };

    // Handles only changing the page if the user's input is valid.
    const pageChange = (event) => {
        if (!isValid && !buttonPressed) {
            event.preventDefault();
        }
        // If input is valid then calls the ajax function to delete the user's account from the database
        else {
            deleteAccount();
        }
    };

    // Handles the input from the user for the ID and checks the database
    const handleIdChange = (event) => {
        setIdNum(event.target.value)
        callDatabase();
    }

    // Handles input for password field and checks database
    const handlePassChange = (event) => {
        setPassword(event.target.value)
        callDatabase();
    }

    // Calls function to verify the password to see if it is a match for the password on the database
    // If callback returns true then sets isValid to true so that the user can progress to the next page
    function callDatabase() {
        verifyPass(function (requestResult) {
            if (requestResult) {
                setValidity(true)
            }
        })
    }

    return (
        <div>
            <h1 style={{ fontSize: "3rem" }}>
                Delete an Account
            </h1>

            <ErrorSummary
                description="Only continue if you are certain you wish to delete your account"
                
                heading="WARNING: This will PERMANENTLY delete your account"
            />

            <Label>
                <LabelText>
                    Confirm your details
                </LabelText>
            </Label>
            <p></p>

            <InputField
                input={{
                    onChange: handleIdChange,
                    onBlur: handleIdChange
                }}
            >
                Enter your ID Number
            </InputField>
            <br></br>
            <br></br>

            <InputField
                input={{
                    type: 'password',
                    onChange: handlePassChange,
                    onBlur: handlePassChange
                }}
            >
                Enter your Password
            </InputField>
            <br></br>
            <br></br>

            {buttonPressed && (!isValid) && (
                <ErrorText>
                    No account found by these details
                </ErrorText>
            )}
            
            <br></br>
            <Link onClick={pageChange} to={{ pathname: '/deletion-confirmation' }}>
                <Button onClick={handleClick}>Delete Account</Button>
            </Link>
            
            <Link to={{ pathname: '/' }}>
                <Button style={{marginLeft: '.8rem'} }>Back</Button>
            </Link>
        </div>
    );

    // Function that calls a server side query that verifies the password given by the user by finding the matching ID on the database
    // and then checking if the password is a match for the user input
    function verifyPass(callback) {
        var url_getData = 'http://localhost:4000/verifyPass.php'

        var data = {
            "idNum": idNum,
            "password": password
        }

        jq.ajax({
            type: "POST",
            url: url_getData,
            mode: "no-core",
            data: data,
            dataType: 'json',
            success(data) {
                if (data == 'Valid') {
                    callback(true);
                    setValidity(true)
                }
                else {
                    callback(false)
                    setValidity(false)
                }
            },
            error: function (error) {
                setValidity(false)
            }
        });
    }

    // Function that will call a server-side query to delete the account from the database once the user continues to the next page, if the input details were a match
    function deleteAccount() {
        var url_deleteData = 'http://localhost:4000/deleteData.php'

        var data = {
            "idNum": idNum
        }

        jq.ajax({
            type: "POST",
            url: url_deleteData,
            mode: "no-core",
            data: data,
            dataType: 'json',
            success(data) {
                console.log(data)
            },
            error: function (error) {
                console.log(error)
            }
        });
    }
}
export default DeleteAccount;