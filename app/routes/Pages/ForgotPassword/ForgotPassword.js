import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {
    Form,
    FormGroup,
    FormText,
    Input,
    Button,
    Label,
    EmptyLayout,
    ThemeConsumer
} from './../../../components';

import { HeaderAuth } from "../../components/Pages/HeaderAuth";
import { FooterAuth } from "../../components/Pages/FooterAuth";
import User from '../../../model/User'

export default function ForgotPassword() {
    const [email, setEmail] = useState('');

    const forgotPassword = async (e) => {
        const ret = await User.forgotPassword({email: email});
        console.log(ret)
        if (ret.error === 0) {
            alert('password forgotPassword successed')
        }
        else 
            alert('password forgotPassword failed')
    };

    return (
        <EmptyLayout>
            <EmptyLayout.Section center>
                { /* START Header */}
                <HeaderAuth 
                    title="Forgot Password"
                />
                { /* END Header */}
                { /* START Form */}
                <Form className="mb-3">
                    <FormGroup>
                        <Label for="emailAdress">
                            Email Adress or Username
                        </Label>
                        <Input type="email" name="email" id="emailAdress" placeholder="Enter..." className="bg-white" onChange={(e) => setEmail(e.target.value)} />
                        <FormText color="muted">
                            We&amp;ll never share your email with anyone else.
                        </FormText>
                    </FormGroup>
                    <div className="d-flex">
                        <ThemeConsumer>
                        {
                            ({ color }) => (
                                // <Button color={ color } tag={ Link } to="/" className="align-self-center">
                                <Button color={ color } onClick={forgotPassword} className="align-self-center">
                                    Reset Password
                                </Button>
                            )
                        }
                        </ThemeConsumer>
                        <Button color="link" tag={ Link } to="/" className="align-self-center ml-auto pr-0 text-decoration-none">
                            <i className="fa fa-angle-left mr-2"></i> Back to Home
                        </Button>
                    </div>
                </Form>
                { /* END Form */}
                { /* START Bottom Links */}
                <div className="d-flex mb-5">
                    <Link to="/pages/login" className="text-decoration-none">
                        Login
                    </Link>
                    <Link to="/pages/register" className="ml-auto text-decoration-none">
                        Register
                    </Link>
                </div>
                { /* END Bottom Links */}
                { /* START Footer */}
                <FooterAuth />
                { /* END Footer */}
            </EmptyLayout.Section>
        </EmptyLayout>
    )
}