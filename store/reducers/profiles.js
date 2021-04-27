import { SET_PROFILEDATA } from '../actions/profiles';
import { TOGGLE_FAVORITE } from '../actions/profiles';
const initialState = {
    profiles: [],
    favoriteProfiles: []
}

const profilesReducer = (state = initialState, action) => {

    switch(action.type) {
                
                        case SET_PROFILEDATA: 
                        return {
                            profiles : action.LoadedProfiles,
                        }

                        case TOGGLE_FAVORITE: 
                        const existingIndex =  state.favoriteProfiles.findIndex(
                            profile => profile.Email === action.profileId
                            );
                        if (existingIndex >=0) {
                                    const updatedfavoriteProfiles = [...state.favoriteProfiles];
                                    updatedfavoriteProfiles.splice(existingIndex, 1)
                                    return { ...state, favoriteProfiles: updatedfavoriteProfiles };
                        } else {
                                    const profile = state.profiles.find(profile => profile.Email === action.profileId)
                                    return { ...state, favoriteProfiles: state.favoriteProfiles.concat(profile)}
                        }        
                    }
        return state;

    }

export default profilesReducer; 