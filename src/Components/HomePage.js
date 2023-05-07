import '../App.css'
import React from 'react'
import { RelatedItems, ListItem, UnorderedList } from 'govuk-react'
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div>
            <h1 style={{ fontSize: "3rem" }}>
                Welcome
            </h1>
            <RelatedItems>
                <h3>
                    Account
                </h3>
                <UnorderedList>
                    <ListItem>
                        <Link to={{ pathname: '/' }}>
                            Login
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link to={{ pathname: '/create-account' }}>
                            Create Account
                        </Link>
                    </ListItem>
                </UnorderedList>
            </RelatedItems>
        </div>
    )
}
export default HomePage;