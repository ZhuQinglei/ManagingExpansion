import {combineReducers} from 'redux';;
import organizations from '../components/organizations/organizationsReducer';

// combine the reducers and export together for use
export default combineReducers({
    organizations,
});
