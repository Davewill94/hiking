import React, { Component } from 'react';

class ReviewCreateForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rating: 3,
            review: '',
            userId: '',
            trailId: ''
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]:value })
    }
    componentDidMount() {
        this.setState({
            userId: this.props.userId,
            trailId: this.props.trailId
        })
    }

    render() {
        return (
            <form onSubmit={(e) => this.props.createReview(e, this.state)}>
                <lable for="review">Thoughts?: </lable>
                <input type="text" name="review" value={this.state.review} onChange={this.handleChange} />
                <lable for='rating'>Rating (0 to 5):</lable>
                <input type="number" name="rating" value={this.state.rating} onChange={this.handleChange} />
                <input type="submit" value="Post Review" />
            </form>
        )
    }
}


export default ReviewCreateForm;