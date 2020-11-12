import React, { Component } from 'react';

class FindTrail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            location: '',
            range: 5
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    componentDidMount () {
        this.setState({
            location: this.props.details
        });
    }

    render() {
        return (
            <>
                {this.state.location === '' ?
                    <div>
                        <p>Waiting for location</p>
                        <form onSubmit={(e) => this.props.findAllTrails(e, this.state) }>
                            <label for="locaton">Location: </label>
                            <input type="text" name='location' value={this.state.location} onChange={this.handleChange} />
                            <label for="range">Range(mi): </label>
                            <input type="number" name='range' value={this.state.range} onChange={this.handleChange} />
                            <input type="submit" value="Take a hike" />
                        </form>
                    </div>

                :
                    <form onSubmit={(e) => this.props.findAllTrails(e, this.state) }>
                        <label for="locaton">Location: </label>
                        <input type="text" name='location' value={this.state.location} onChange={this.handleChange} />
                        <label for="range">Range(mi): </label>
                        <input type="number" name='range' value={this.state.range} onChange={this.handleChange} />
                        <input type="submit" value="Take a hike" />
                    </form>
                }
            </>
        )
    }

}


export default FindTrail;