// CODE BY SAM CLARK - w1854525

// Import all the necessary page components and browser routing, 
// as well as the navigation and footer elements from gov-uk react
import './App.css';
import React, { useEffect } from 'react';
import { Page, Footer, TopNav } from 'govuk-react'
import CreateAccount from './Components/CreateAccount';
import DeleteAccount from './Components/DeleteAccount';
import HomePage from './Components/HomePage';
import HomePagePatient from './Components/HomePagePatient';
import HomePageDoctor from './Components/HomePageDoctor';
import HomePageAdmin from './Components/HomePageAdmin';
import NHSinput from './Components/NHSinput';
import NameDetails from './Components/NameDetails'
import ContactDetails from './Components/ContactDetails';
import EmergencyContact from './Components/EmergencyContacts'
import CreatePassword from './Components/CreatePassword';
import AddressDetails from './Components/AddressDetails';
import ConfirmDetails from './Components/ConfirmDetails';
import AddressDetailsVer2 from './Components/AddressDetailsVer2';
import DeletionConfirm from './Components/DeletionConfirm';
import CompletionPage from './Components/CompletionPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AccountType from './Components/AccountType';

function App() {
    // Sets the page title for all components (what is displayed on the browser tab)
    useEffect(() => {
        document.title = "TBD GP Services"
    }, [])

    return (
        <Page header={< TopNav company={<TopNav.Anchor href="/" target="">
            GOV.UK</TopNav.Anchor >} serviceTitle={<TopNav.NavLink href="/" target="">TBD GP Services</TopNav.NavLink>} />} >

            <div> 
            <BrowserRouter>
                <Routes>
                        <Route path="/" element={<HomePage />}> </Route>
                        <Route path="/home-page-patient" element={<HomePagePatient />}> </Route>
                        <Route path="/home-page-doctor" element={<HomePageDoctor />}> </Route>
                        <Route path="/home-page-admin" element={<HomePageAdmin />}> </Route>
                        <Route path="/create-account" element={<CreateAccount />}> </Route>
                        <Route path="/delete-account" element={<DeleteAccount />}> </Route>
                        <Route path="/account-type" element={<AccountType />}> </Route>
                        <Route path="/nhs-input" element={<NHSinput />}> </Route>
                        <Route path="/address-details" element={<AddressDetails />}> </Route>
                        <Route path="/address-details_nhs" element={<AddressDetailsVer2 />}> </Route>
                        <Route path="/name-details" element={<NameDetails />}> </Route>
                        <Route path="/contact-details" element={<ContactDetails />}> </Route>
                        <Route path="/emergency-contact" element={<EmergencyContact />}> </Route>
                        <Route path="/account-security" element={<CreatePassword />}> </Route>
                        <Route path="/confirm-details" element={<ConfirmDetails />}> </Route>
                        <Route path="/completion-page" element={<CompletionPage />}> </Route>
                        <Route path="/deletion-confirmation" element={<DeletionConfirm />}> </Route>
                </Routes>
                </BrowserRouter> 
            </div>

            <Footer style={{ position: 'absolute', bottom: 0, maxWidth: '960px', width: '100%', margin: '0 auto', textAlign: 'center' }} />
        </Page>
    );

}
export default App;