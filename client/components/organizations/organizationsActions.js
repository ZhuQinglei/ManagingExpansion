import {Organizations} from '../../../imports/collections/Organisations';

// DEFINIATION
// Actions: payloads of information that send data from your application to your store.
// They are the only source of information for the store.
// You send them to the store using store.dispatch().
// plain JavaScript objects
// Actions must have a 'type' property that indicates the type of action being performed.

export function selectOrganization(org) {
    return {type: "SELECT_ORGANIZATION", org}
}

export function unSelectOrganization(org) {
    return {type: "UNSELECT_ORGANIZATION", org}
}
export function getSelectedOrganizations() {
    return {type: "SELECTED_ORGANIZATIONS"}
}

export function deleteOrganizations(event) {
    return {type: "DELETE_ORGANIZATIONS"}
}

export function clearFields() {
    console.log("clear")
    return {type: "CLEAR_FIELDS"}
}

export function getSelectedUserId(id) {
    return {
        type: 'GET_USER_ID',
        userId: id
    }
}
