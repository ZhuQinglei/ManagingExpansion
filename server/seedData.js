import {Organizations} from '../imports/collections/Organisations';
import {image, company, address, phone, lorem, internet, name,} from 'faker';
import {Roles} from 'meteor/alanning:roles';
import {Mongo} from 'meteor/mongo';

export function seedOrganizations(count) {
    const users = Meteor.users.find({}).fetch();
    const numberOfRecords = Organizations.find({}).count();
    if (!numberOfRecords) { // check if data exist in the collection, generate if no data
        _.times(count, () => { // function called 5000 times;

            const user = _.sample(users);
            Organizations.insert({
                organization_name: company.companyName(),
                address: address.streetName(),
                post_code: '123456', //address.zipCode(),->zipcode will fail validation
                city: address.city(),
                contact_id: user._id,
                contact_name: user.username,
                phone: phone.phoneNumber()
            });
        });
    }
}

export function seedUsers(count) {
    const numberOfRecords = Meteor.users.find({}).count();

    if (!numberOfRecords) { // check if data exist in the collection, generate if no data
        _.times(count, () => { // function called 5000 times;

            const first_name = name.firstName();
            const last_name = name.lastName();

            const id = Accounts.createUser({
                email: internet.email(),
                username: first_name + ' ' + last_name,
                password: "password",
                profile: {
                    first_name, last_name,
                    dob: date.past(),
                    NRIC: '',
                    picture: image.avatar()
                },
            });
            // Need _id of existing user record so this call must come
            // after `Accounts.createUser` or `Accounts.onCreate`
            const roles = ['admin', 'instructor', 'student', 'pre-register'];
            const role = _.sample(roles);
            Roles.addUsersToRoles(id, role);
        });
    }
}
