import React from 'react';
import { serverBaseUrl } from '../../Constants.js';

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            registerName : '',
            registerEmail : '',
            registerPassword : ''
        }
    }

    onNameChanged = (event) => {
        this.setState({registerName:event.target.value})
    }

    onEmailChanged = (event) => {
        this.setState({registerEmail:event.target.value})
    }

    onPasswordChanged = (event) => {
        this.setState({registerPassword:event.target.value})
    }

    onSubmit = () => {
        fetch(serverBaseUrl + '/register', {
            method:'post',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                name: this.state.registerName,
                email: this.state.registerEmail,
                password: this.state.registerPassword
            })
        })
        .then(response => response.json())
        .then(user => {
            if (user.id) {
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
        })
    }

    render () { 
        return (
            <article className="br3 shadow-3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
                <main className="pa4 black-80">
                    <div className="measure center">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f4 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input 
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="text" 
                                    name="name"  
                                    id="name" 
                                    onChange={this.onNameChanged}
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input 
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="email" 
                                    name="email-address"  
                                    id="email-address" 
                                    onChange={this.onEmailChanged}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input 
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="password" 
                                    name="password"  
                                    id="password" 
                                    onChange={this.onPasswordChanged}
                                />
                            </div>
                        </fieldset>
                        <div className="">
                            <input 
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                type="submit" 
                                value="Register"
                                onClick={this.onSubmit}
                            />
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default Register;