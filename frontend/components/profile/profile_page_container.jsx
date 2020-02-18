import { connect } from 'react-redux';
import { fetchProfile, updateProfile } from '../../actions/profiles_actions';
import { fetchAllLocations } from '../../actions/locations_actions';
import { fetchAllUsers } from '../../actions/session_actions';
import { fetchAllHomes, updateHome } from '../../actions/homes_actions';
import { fetchAllPhotos } from '../../actions/photos_actions';
import { openModal } from '../../actions/modal_actions';
import ProfilePage from './profile_page';


const mSTP = (state, ownProps) => {
     
    return {
        profile: state.entities.profiles[state.session.profile_id] ? state.entities.profiles[state.session.profile_id] : {  },
        user: state.entities.users[state.session.id] ? state.entities.users[state.session.id] : {  },
        currentLocation: state.entities.locations[state.session.location_id] ? state.entities.locations[state.session.location_id] : {  },
        home: state.entities.users[state.session.id].home_id ? state.entities.homes[state.entities.users[state.session.id].home_id] : { },
        profilePhotos: state.entities.profiles[state.session.profile_id].photoids ? state.entities.photos[state.entities.profiles[state.session.profile_id].profile_photo_id] : [],

        loggedInId: state.session.id,
        currentUserProfileId: state.entities.users[state.session.id].profile_id ? state.entities.users[state.session.id].profile_id : ownProps.match.params.profileId,
        locations: state.entities.locations ? Object.values(state.entities.locations) : [],
        memberSince: state.entities.profiles[ownProps.match.params.profileId] && state.entities.users[state.session.id].home_id !== undefined ? state.entities.users[(state.entities.profiles[ownProps.match.params.profileId].user_id)].profile.created_at : "",

        otherProfile: state.entities.profiles[ownProps.match.params.profileId] ? state.entities.profiles[ownProps.match.params.profileId] : {},
        otherUser: state.entities.profiles[ownProps.match.params.profileId] && state.entities.users[state.session.id].home_id !== undefined ? state.entities.users[(state.entities.profiles[ownProps.match.params.profileId].user_id)] : {},
        otherLocation: state.entities.locations[state.session.location_id] && state.entities.profiles[ownProps.match.params.profileId] ? state.entities.locations[state.entities.profiles[ownProps.match.params.profileId].location_id] : {},
        otherHome: state.entities.users[state.session.id].home_id && state.entities.profiles[ownProps.match.params.profileId] ? state.entities.homes[state.entities.users[(state.entities.profiles[ownProps.match.params.profileId].user_id)].home_id] :
            {},
            
    }
}

const mDTP = (dispatch) => {
    return {
        fetchProfile: (profileId) => dispatch(fetchProfile(profileId)),
        fetchAllLocations: () => dispatch(fetchAllLocations()),
        fetchAllUsers: () => dispatch(fetchAllUsers()),
        fetchAllHomes: () => dispatch(fetchAllHomes()),
        fetchAllPhotos: () => dispatch(fetchAllPhotos()),

        updateProfile: (profile) => dispatch(updateProfile(profile)),
        updateHome: (home) => dispatch(updateHome(home)),

        openModal: (formType) => dispatch(openModal(formType))

    }
}

export default connect(
    mSTP,
    mDTP
)(ProfilePage)