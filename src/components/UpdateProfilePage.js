import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class UpdateProfilePage extends Component {
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

    componentDidMount() {
        this.setState({
            name: this.props.currentUser.name,
            password: this.props.currentUser.password,
            location: this.props.currentUser.location,
            email: this.props.currentUser.email,
            img: this.props.currentUser.img,
            bio: this.props.currentUser.bio
        })
    }

    render() {
        return(
            <form onSubmit={(e) => this.props.updateProfile(e, this.props.postId, this.state)}>
                <label for='name'>User Name:</label>
                <input type='text' name='name' placeholder="User Name" value={this.state.name} onChange={this.handleChange}/>
                <label for='password'>Password:</label>
                <input type="password" name="password" placeholder="Password Here" value={this.state.password} onChange={this.handleChange}/>
                <label for='email'>Email:</label>
                <input type="text" name="email" placeholder="Email Here" value={this.state.email} onChange={this.handleChange}/>
                <label for='location'>From:</label>
                <input type="text" name="location" placeholder="Where do you live" value={this.state.location} onChange={this.handleChange}/>
                <lable for='img'>Bio Pic:</lable>
                <input type="text" name="img" placeholder='Image url' value={this.state.img} onChange={this.handleChange}/>
                <label for='bio'>Bio:</label>
                <input type="text" name="bio" placeholder="Short bio here" value={this.state.bio} onChange={this.handleChange}/>
                <input type="submit" value="Submit Changes" />
            </form>
        )
    }

}

export default UpdateProfilePage;