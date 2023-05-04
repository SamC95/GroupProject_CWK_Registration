// CODE BY SAM CLARK - w1854525

import '../App.css';
import { useState } from 'react';
import { Table, Button } from 'govuk-react';
import { Link } from 'react-router-dom';
import jq from 'jquery';

function ConfirmDetails() {
    const nhsNum = localStorage.getItem("Number");
    const [dataRetrieved, setDataRetrieved] = useState(false);
    const [currentForename, setForename] = useState('');
    const [currentSurname, setSurname] = useState('');
    let [currentDOB, setDOB] = useState('');
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

    if (!dataRetrieved) {
        callDatabase()
    }

    let day = ''
    let month = ''
    let year = ''
    let sexType = ''
    let accountType = ''

    if (currentDOB != null) {
        day = currentDOB.substring(6, 8)
        month = currentDOB.substring(4, 6)
        year = currentDOB.substring(0, 4)
    }

    if (genderCode === '1') {
        sexType = "Male"
    }
    else if (genderCode === '2') {
        sexType = "Female"
    }
    else {
        sexType = "Not Provided"
    }

    if (accountCode === '1') {
        accountType = "Patient"
    }
    else if (accountCode === '2') {
        accountType = "Doctor"
    }
    else if (accountCode === '3') {
        accountType = "Administrator"
    }

    if (landlineNum === '') {
        setLandlineNum('N/A')
    }

    currentDOB = Date(currentDOB)
    let currentAddress = ''

    if (address2 === '') {
        currentAddress = address1 + ", " + city + ", " + postCode
    }
    else if (address1 === null) {
        currentAddress = postCode
    }
    else {
        currentAddress = address1 + ", " + address2 +
            ", " + city + ", " + postCode
    }


    return (
        <div>
            <br></br>

            <h1 style={{ fontSize: "3rem" }}>
                Please confirm your details
            </h1>

            <br></br>

            <Table
                head={<Table.Row><Table.CellHeader>Detail Type</Table.CellHeader><Table.CellHeader>Provided Details</Table.CellHeader></Table.Row>}
            >
                <Table.Row>
                    <Table.CellHeader>
                        Name
                    </Table.CellHeader>
                    <Table.Cell>
                        {currentForename + ' ' + currentSurname}
                    </Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.CellHeader>
                        Date of Birth
                    </Table.CellHeader>
                    <Table.Cell>
                        {day + "/" + month + "/" + year}
                    </Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.CellHeader>
                        Sex
                    </Table.CellHeader>
                    <Table.Cell>
                        {sexType}
                    </Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.CellHeader>
                        NHS Number
                    </Table.CellHeader>
                    <Table.Cell>
                        {nhsNum}
                    </Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.CellHeader>
                        Address
                    </Table.CellHeader>
                    <Table.Cell>
                        {currentAddress}
                    </Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.CellHeader>
                        Email Address
                    </Table.CellHeader>
                    <Table.Cell>
                        {email}
                    </Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.CellHeader>
                        Mobile No.
                    </Table.CellHeader>
                    <Table.Cell>
                        {mobileNum}
                    </Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.CellHeader>
                        Landline No.
                    </Table.CellHeader>
                    <Table.Cell>
                        {landlineNum}
                    </Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.CellHeader>
                        Emergency Contact
                    </Table.CellHeader>
                    <Table.Cell>
                        {emergencyContact}
                    </Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.CellHeader>
                        Emergency Mobile
                    </Table.CellHeader>
                    <Table.Cell>
                        {emergencyNum}
                    </Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.CellHeader>
                        Account Type
                    </Table.CellHeader>
                    <Table.Cell>
                        {accountType}
                    </Table.Cell>
                </Table.Row>
            </Table>

            <div>
                <Link to='/account-security'>
                    <Button>Continue</Button>
                </Link>
            </div>
        </div>
    )

    function callDatabase() {
        getInputData(function (requestResult) {
            if (requestResult) {
                setDataRetrieved(true)
            }
        })
    }

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
                callback(false)
            }
        });
    }
}
export default ConfirmDetails;