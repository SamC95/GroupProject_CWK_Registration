// CODE BY SAM CLARK - w1854525

import '../App.css'
import React, { useState } from 'react'
import { Button, InputField, ErrorText } from 'govuk-react';
import { Link } from 'react-router-dom';
import jq from 'jquery'

function AddressDetailsVer2() {
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
    const [city, setCity] = useState('')
    const [buttonPressed, setButtonPressed] = useState(false)

    const nhsNum = localStorage.getItem("Number")

    // Splits address1 into an array of words to check if the user input is in the desired format
    const splitAddressWords = address1.split(' ')

    /*
    Checks address line 1 to see if it doesn't contain any special characters, contains at minimum 2 words 
    and checks that the first word is numbers only for the house number and following word is only letters for street name
    */
    const validAddress1 = (/^[a-zA-Z0-9- ]+$/.test(address1) && splitAddressWords.length >= 2 && /^[0-9]+$/.test(splitAddressWords[0]) && /^[a-zA-Z-]+$/.test(splitAddressWords[1]))

    // Checks that address line 2 doesn't contain any special characters'
    const validAddress2 = /^[a-zA-Z0-9 ]+$/.test(address2)

    // Checks that city and postcode doesn't contain any special characters or numbers
    const validCity = /^[a-zA-Z ]+$/.test(city)

    // Checks if required fields are empty
    const isAddress1Empty = address1 === ''
    const isAddress2Empty = address2 === ''
    const isCityEmpty = city === ''

    // Handles user input on address line 1 field
    const handleAddress1Change = (event) => {
        setAddress1(event.target.value)
        setButtonPressed(false)
    }

    // Handles user input on address line 2 field
    const handleAddress2Change = (event) => {
        setAddress2(event.target.value)
        setButtonPressed(false)
    }

    // Handles user input on city field
    const handleCityChange = (event) => {
        setCity(event.target.value)
        setButtonPressed(false)
    }

    // Handles displaying error messages if user has pressed continue with invalid input
    const handleClick = () => {
        setButtonPressed(true)
    };

    // Handles only changing the page if the user's input is valid 
    const pageChange = (event) => {
        if ((!validAddress1 || (!isAddress2Empty && !validAddress2) || !validCity || isAddress1Empty || isCityEmpty)) {
            event.preventDefault();
        }
        // If input is valid, adds details provided into temporary table on database
        else {
            addAddressDetails()
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

            <p></p>

            <div>
                <Link onClick={pageChange} to={{ pathname: '/contact-details' }}>
                    <Button onClick={handleClick}>Continue</Button>
                </Link>
            </div>
        </div>
    )

    // Server-side query to add the appropriate details onto a temporary table on the database
    function addAddressDetails() {
        var url_GPdatabase = 'http://localhost:4000/addAddressNHSRoute.php'

        var data = {
            "nhsNum": nhsNum,
            "address1": address1,
            "address2": address2,
            "city": city
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
export default AddressDetailsVer2;