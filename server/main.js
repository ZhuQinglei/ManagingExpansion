import _ from 'lodash';
import {Organizations} from '../imports/collections/Organisations';
import {
    seedUsers, seedOrganizations
} from './seedData';

Meteor.startup(function () {

    // seed with the number of records: eg. 1000 records each
    // Order of seeding matters
    seedUsers(50);
    seedOrganizations(50);

    // Publish Organization with each related user object
    Meteor.publishComposite('OrganizationsWithUser', function () {
        return {
            find: function () {
                return Organizations.find({}, {
                    sort: {organization_name: 1},
                    // limit: (pageNumber + 1) * perPage
                }); 
            },
            children: [
                {
                    find: function (organization) {
                        return Meteor.users.find({_id: organization.contact_id})
                    }
                }
            ]
        }
    });

    Meteor.publish('allUsers', function () {
        cursor = Meteor.users.find({});
        console.log(cursor.count());
        return cursor;
    });
});
