import React from 'react';
import ProfilePreview from '../profile/profile_preview'
import { withRouter } from 'react-router';
import SearchBar from '../search/search_bar_container'


class DashBoard extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            profile: this.props.profile
        }

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        
        this.props.fetchProfile(this.props.profileId)
            .then(profile => 
                this.props.fetchPhoto(profile.profile.profile_photo_id)
                .then(photo => this.photo = photo.photo)
            )
            .then(() => this.props.fetchAllLocations())
            .then(() => this.props.fetchAllConversations(this.props.profileId))
            // .then(conversations => {
            //     let convos = Object.values(conversations.conversations);
                
            //     let idsArray = [];
            //     convos.forEach(convo => {
            //         idsArray.push(convo.messageId)
            //     });
            //     return this.props.fetchAllMessages("none", idsArray)})
            
    }

    componentDidUpdate() {
        if (this.props.profile !== this.state.profile) {
            this.setState( { profile: this.props.profile } )
        }
    }

    handleChange(stateSlice) {
        this.setState(Object.assign({}, this.state, stateSlice));
        this.props.updateProfile(stateSlice.profile);
    }


    render() {
        
        return(
            <div className="profile-page">
                <ProfilePreview
                    profile={this.state.profile}
                    currentLocation={this.props.currentLocation}
                    loggedInId={this.props.profileId}
                    handleChange={this.handleChange}
                    profilePic={this.photo}
                />
                <div className="main-feed">
                    <div id="dashboard-search-container" className="secondery-navbar">
                        <div id="dashboard-search">
                            <div className="dashbord-search-header">
                                <h1>
                                    Explore the world's greatest cities with couchHunters..
                                </h1>
                            </div>
                            <div className="dashboard-search-image-container">
                                <a>
                                    <img src="https://couch-hunting-seed.s3.amazonaws.com/MG_1_1_New_York_City-1.jpg" alt="" />
                                    <p>
                                        New York City, NY, USA
                                    </p>
                                </a>
                                <a>
                                    <img src="https://couch-hunting-seed.s3.amazonaws.com/wsi-imageoptim-jerusalem-1712855_1920.jpg" alt="" />
                                    <p>
                                        Jerusalem, Israel/Palestine
                                    </p>
                                </a>
                                <a>
                                    <img src="https://couch-hunting-seed.s3.amazonaws.com/telavivhashbacha.jpg" alt="" />
                                    <p>
                                        Tel Aviv, Israel
                                    </p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default withRouter(DashBoard)