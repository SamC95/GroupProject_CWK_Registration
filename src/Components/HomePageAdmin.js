import '../App.css'
import React from 'react'
import { RelatedItems, ListItem, UnorderedList } from 'govuk-react'
import { Link } from 'react-router-dom';

function HomePageAdmin() {
    return (
        <div>
            <h1 style={{ fontSize: "3rem" }}>
                Welcome Back
            </h1>
            <RelatedItems>
                <h3>
                    Account
                </h3>
                <UnorderedList>
                    <ListItem>
                        <Link to={{ pathname: '/' }}>
                            Logout
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link to={{ pathname: '/delete-account' }}>
                            Delete Account
                        </Link>
                    </ListItem>
                </UnorderedList>
                <h3>
                    Appointments
                </h3>
                <UnorderedList>
                    <ListItem>
                        <Link to="https://example.com">
                            View Doctors Appointments
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link to="https://example.com">
                            Cancel an Appointment
                        </Link>
                    </ListItem>
                </UnorderedList>
            </RelatedItems>
        </div>
    )
}
export default HomePageAdmin;