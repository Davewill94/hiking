import React, { Component } from 'react';

class ReviewEditForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rating: 1,
            review: '',
            userId: '',
            trailId: '',
            id: ''
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]:value })
    }
    componentDidMount() {
        const currentReview = this.props.allTrailsReviews.filter(review => 
                (     review.userId===parseInt(this.props.userId)
                    &&review.trailId===parseInt(this.props.trailId)
                    &&review.id===parseInt(this.props.reviewId)
                )
            )
            console.log(currentReview)
        this.setState({
            userId: this.props.userId,
            trailId: this.props.trailId,
            review: currentReview[0].review,
            rating: parseInt(currentReview[0].rating),
            id: parseInt(currentReview[0].id)
        })
    }


    render() {
        return (
            <form onSubmit={(e) => this.props.editReview(e, this.state)}>
                <lable for="review">Thoughts?: </lable>
                <input type="text" name="review" value={this.state.review} onChange={this.handleChange} />
                <lable for='rating'>Rating (0 to 5):</lable>
                <input type="number" name="rating" min="1" max="5" value={this.state.rating} onChange={this.handleChange} />
                <input type="submit" value="Post Review" />
            </form>
        )
    }
}


export default ReviewEditForm;