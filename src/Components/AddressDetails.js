// CODE BY SAM CLARK - w1854525

import '../App.css'
import React, { useState, useEffect } from 'react'
import { Button, InputField, ErrorText } from 'govuk-react';
import { Link } from 'react-router-dom';
import jq from 'jquery';

function AddressDetails() {
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [postcode, setPostcode] = useState('');
    const [buttonPressed, setButtonPressed] = useState(false);
    const [postcodeFound, setPostcodeFound] = useState(false);

    // Not ideal for security, but was unable to get Context to work properly.
    useEffect(() => {
        window.localStorage.setItem('Post', postcode)
    }, [postcode]);

    // Splits address1 into an array of words to check if the user input is in the desired format
    const splitAddressWords = address1.split(' ');

    /*
    Checks address line 1 to see if it doesn't contain any special characters, contains at minimum 2 words 
    and checks that the first word is numbers only for the house number and following word is only letters for street name
    */
    const validAddress1 = (/^[a-zA-Z0-9- ]+$/.test(address1) && splitAddressWords.length >= 2 && /^[0-9]+$/.test(splitAddressWords[0]) && /^[a-zA-Z-]+$/.test(splitAddressWords[1]))

    // Checks that address line 2 doesn't contain any special characters'
    const validAddress2 = /^[a-zA-Z0-9 ]+$/.test(address2)

    // Checks that city and postcode doesn't contain any special characters or numbers
    const validCity = /^[a-zA-Z ]+$/.test(city)
    const validPostCode = /^[a-zA-Z0-9 ]+$/.test(postcode)

    // Checks if required fields are empty
    const isAddress1Empty = address1 === ''
    const isAddress2Empty = address2 === ''
    const isCityEmpty = city === ''
    const isPostcodeEmpty = postcode === ''

    // Checks that post code is the correct length
    const validPostcodeLength = (postcode.length === 6 || postcode.length === 7)

    // Handles input change on address line 1
    const handleAddress1Change = (event) => {
        setAddress1(event.target.value)
        setButtonPressed(false)
    }

    // Handles input change on address line 2
    const handleAddress2Change = (event) => {
        setAddress2(event.target.value)
        setButtonPressed(false)
    }

    // Handles input change on city
    const handleCityChange = (event) => {
        setCity(event.target.value)
        setButtonPressed(false)
    }

    // Handles input change on post code, checks if post code exists in NHS database
    const handlePostcodeChange = (event) => {
        setPostcode(event.target.value)
        setButtonPressed(false)

        checkPostcode(function (requestResult) {
            console.log(requestResult)

            if (requestResult) {
                setPostcodeFound(true);
            }
            else {
                setPostcodeFound(false);
            }
        });
    }

    // Handles displaying error messages if user has pressed continue with invalid input
    const handleClick = () => {
        setButtonPressed(true)
    };

    // Handles only changing the page if the user's input is valid 
    const pageChange = (event) => {
        if ((!validAddress1 || (!isAddress2Empty && !validAddress2) || !validCity || !validPostCode || isAddress1Empty || isCityEmpty || isPostcodeEmpty || !validPostcodeLength || !postcodeFound)) {
            event.preventDefault();
        }
        else {
            addAddressDetails();
        }
    };

    return (
        <div>
            <h1 style={{ fontSize: "3rem" }}>
                What is your address?
            </h1>

            <InputField
                input={{
                    id: 'address1',
                    onChange: handleAddress1Change
                }}
            >
                Address Line 1
            </InputField>
            <br></br>
            {buttonPressed && (!isAddress1Empty && !validAddress1) && (
                <ErrorText>
                    Address cannot contain special characters and must start with a house number
                </ErrorText>
            )}

            {buttonPressed && (isAddress1Empty) && (
                <ErrorText>
                    Field must not be empty
                </ErrorText>
            )}

            <br></br>

            <InputField
                input={{
                    id: 'address2',
                    onChange: handleAddress2Change
                }}
            >
                Address Line 2 (Optional)
            </InputField>
            <br></br>
            {buttonPressed && (!isAddress2Empty && !validAddress2) && (
                <ErrorText>
                    If including this field, it must not contain special characters
                </ErrorText>
            )}

            <br></br>

            <InputField
                input={{
                    id: 'post_city',
                    type: 'text',
                    onChange: handleCityChange
                }}
            >
                City/Town
            </InputField>
            <br></br>
            {buttonPressed && (!isCityEmpty && !validCity) && (
                <ErrorText>
                    City field cannot contain special characters or numbers
                </ErrorText>
            )}

            {buttonPressed && (isCityEmpty) && (
                <ErrorText>
                    Field must not be empty
                </ErrorText>
            )}

            <br></br>
            
            <InputField
                input={{
                    id: 'post_code',
                    onChange: handlePostcodeChange,
                    onBlur: handlePostcodeChange
                }}
            >
                Postcode
            </InputField>
            <br></br>
            {buttonPressed && (!isPostcodeEmpty && !validPostCode) && (
                <ErrorText>
                    Postcode field cannot contain special characters
                </ErrorText>
            )}

            {buttonPressed && (!validPostcodeLength) && (
                <ErrorText>
                    Postcode must be 6 or 7 characters in length
                </ErrorText>
            )}

            {buttonPressed && (isPostcodeEmpty) && (
                <ErrorText>
                    Field must not be empty
                </ErrorText>
            )}

            {buttonPressed && (!postcodeFound) && (
                <ErrorText>
                    No match found on NHS records
                </ErrorText>
            )}

            <br></br>

            <p></p>

            <div>
                <Link onClick={pageChange} to={{ pathname: '/name-details' }}>
                    <Button onClick={handleClick}>Continue</Button>
                </Link>
            </div>
        </div>
    )

    function checkPostcode(callback) {
        var url_nhsdatabase = 'http://localhost:4000/checkPostcode.php'

        var data = {
            "postcode": postcode
        }

        jq.ajax({
            type: "POST",
            url: url_nhsdatabase,
            mode: "no-core",
            data: data,
            dataType: "json",
            success(data) {
                if (data === "No value found") {
                    callback(false);
                }
                else {
                    callback(true);
                }
            },
            error: function (error) {
                console.error(error);
                callback(false)
            }
        })
    }

    function addAddressDetails() {
        var url_GPdatabase = 'http://localhost:4000/addAddressPostcodeRoute.php'

        var data = {
            "address1": address1,
            "address2": address2,
            "city": city,
            "postcode": postcode
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
            error: function (error) {}
        })
    }
}
export default AddressDetails;