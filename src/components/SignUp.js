import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            password: '',
            location: '',
            email: '',
            img:'',
            bio: ''
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return(
            <form onSubmit={(e)=> this.props.handleRegister(e, this.state)}>
                <label for='name'>User Name:</label>
                <input type='text' name='name' placeholder="User Name" onChange={this.handleChange}/>
                <label for='password'>Password:</label>
                <input type="password" name="password" placeholder="Password Here" onChange={this.handleChange}/>
                <label for='email'>Email:</label>
                <input type="text" name="email" placeholder="Email Here" onChange={this.handleChange}/>
                <label for='location'>From:</label>
                <input type="text" name="location" placeholder="Where do you live" onChange={this.handleChange}/>
                <lable for='img'>Bio Pic:</lable>
                <input type="text" name="img" placeholder='Image url' onChange={this.handleChange}/>
                <label for='bio'>Bio:</label>
                <input type="text" name="bio" placeholder="Short bio here" onChange={this.handleChange}/>
                <input type="submit" value="Create Account" />
                <Link to="/login">Login</Link>
            </form>
        )
    }

}

export default SignUp;