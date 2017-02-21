// DEFINITION:
// Reducers: reducer is a pure function that takes the previous state and an action, and returns the next state.
// (previousState, action) => newState
//  It's very important that the reducer stays pure.
import {Organizations} from '../../../imports/collections/Organisations';
// Things you should never do inside a reducer:
// - Mutate its arguments;
// - Perform side effects like API calls and routing transitions;
// - Call non-pure functions, e.g. Date.now() or Math.random().

// state = initialState: If state is undefined, return initial state (ES6 default argument syntax)
const defaultState = {
    allSelected: false,

    hideAlert: true,
    alertMessage: '',
    msgtype:'',

    // For search function
    searchText: '',
    // For batch edit
    batchEdit: {
        selectedOrganizations: [],

        // For pop up fields
        fields: {
            organization_name: undefined, contact_id: undefined, address: undefined,
            city: undefined, post_code: undefined, phone: undefined,
        },
        error: {
            organization_name: '', contact_id: '', address: '', city: '', post_code: '', phone: '',
        }
    }
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {

        case "SELECT_ORGANIZATION": {
            console.log(state);
            console.log(...state);
            return {
                ...state,
                batchEdit: {
                    ...state.batchEdit,
                    selectedOrganizations: [...state.batchEdit.selectedOrganizations, action.org]
                }
            }
        }

        case "UNSELECT_ORGANIZATION": {
            // console.log(state.batchEdit.selectedOrganizations.filter(it => it !== action.org));
            return {
                ...state,
                batchEdit: {
                    ...state.batchEdit,
                    selectedOrganizations: state.batchEdit.selectedOrganizations.filter(it => it !== action.org)
                }
            }
        }

        case "CLEAR_FIELDS": {
            return {
                ...state,
                batchEdit: {
                    ...state.batchEdit,
                    // Clear field
                    fields: {
                        organization_name: '', contact_id: '', address: '', city: '', post_code: '', phone: '',
                    },
                    error: {
                        organization_name: '', contact_id: '', address: '', city: '', post_code: '', phone: '',
                    }
                }
            }
        }

        case "ERROR_MESSAGE": {
            // get all error msgs
            var errors = {};
            _.map(action.errors, (error) => { // mapping errors for each field
                errors[error.name] = error.message
            });
            console.log(errors);

            return {
                ...state,
                batchEdit: {
                    ...state.batchEdit,
                    error: errors
                }
            }
        }
        case "GET_USER_ID": {
            return {
                ...state,
                batchEdit: {
                    ...state.batchEdit,
                    fields: {
                        ...state.batchEdit.fields,
                        contact_id: action.userId
                    },
                    error: {
                        ...state.batchEdit.error,
                        contact_id: ''
                    }
                }
            }
        }
        default:
            return state

    }
}
