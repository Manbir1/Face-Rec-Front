import React from 'react'

class Register extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
        }
    }

    nameOnChange = (e) => {
        this.setState({name: e.target.value});
    }

    emailOnChange = (e) => {
        this.setState({email: e.target.value});
    }

    passwordOnChange = (e) => {
        this.setState({password: e.target.value});
    }


    onSubmitSignIn = () => {
        console.log(this.state);
        fetch('http://localhost:3000/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(response => response.json())
        .then(user => {
            if(user){
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
        })
    }

    render(){
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f4 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                        <input onChange = {this.nameOnChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name"/>
                        </div>
                        <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input onChange = {this.emailOnChange}className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                        </div>
                        <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input onChange = {this.passwordOnChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                        </div>
                    </fieldset>
                    <div className="">
                        <input 
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Sign Up"
                            onClick={this.onSubmitSignIn}
                            />
                    </div>
                    </div>
                </main>
            </article>
            );
    }
}

export default Register