import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            password: ''
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return(
            <form onSubmit={(e)=> this.props.handleLogin(e, this.state)}>
                <label for='name'>User Name:</label>
                <input type='text' name='name' placeholder="User Name" onChange={this.handleChange}/>
                <label for='password'>Password</label>
                <input type="text" name="password" placeholder="Password Here" onChange={this.handleChange}/>
                <input type="submit" value="Login Now" />
                <Link to='/register'>Register</Link>
            </form>
        )
    }

}

export default Login;