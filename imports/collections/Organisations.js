// import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {Mongo} from 'meteor/mongo';

Meteor.methods({

  // update data
  'organizations.update': function (id, currentState) {
      const {address, city, organization_name, phone, post_code, contact_id} = currentState;
      // validate details except id
      // Organizations.schema.validate({address, city, organization_name, phone, post_code, contact_id});
      return Organizations.update(id, {
          $set: {
              address, city, organization_name, phone, post_code, contact_id,
              // update both id and user object
              contact_name: Meteor.users.findOne({_id: contact_id}).username
          }
      }, {validate: false});
  },

    'organizations.remove': function (organizations) {
          console.log("remove",organizations)
        return Organizations.softRemove(organizations)
    },
    // soft delete/archive data
    // softRemove is actually an update function
    'organizations.batchRemove': function (organizations) {
        console.log(organizations)
        return Organizations.remove({_id: {$in: organizations}});
    },
});

export const Organizations = new Mongo.Collection('organizations');

Organizations.attachBehaviour('softRemovable', {
    removed: 'deleted',
    removedBy: false,
    restoredAt: 'restoredAt',
    restoredBy: false
});


// define schema for data validation
// Check validation here: https://github.com/aldeed/meteor-simple-schema#custom-validation
// Organizations.schema = new SimpleSchema({
//     organization_name: {
//         type: String,
//         label: 'Organization Name',
//         min: 1,
//         max: 50
//     },
//     address: {
//         type: String,
//         label: 'Address',
//         min: 1,
//         max: 100,
//     },
//     post_code: {
//         type: String,
//         label: 'Postal Code',
//         min: 1,
//         regEx: /^[0-9A-Za-z]{2,10}$/, // begin with alphaberic or digit, total 2-10 in length
//     },
//     city: {
//         type: String,
//         label: 'City',
//         min: 1,
//         max: 50
//     },
//     phone: {
//         type: String,
//         label: 'Phone',
//         min: 1,
//         regEx: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/, // begin with integer, must be 10 digits
//         max: 20
//     },
//     contact_name: {
//         type: String,
//         label: 'Contact Person',
//         min: 1,
//         max: 50,
//         optional: true // need to determine whether optional or not, when import only have name not id, but when update and insert new need to check id not name
//     },
//     contact_id: {
//         type: String,
//         label: 'Contact Person',
//         min: 1,
//         max: 50,
//         optional: true // need to determine whether optional or not, when import only have name not id, but when update and insert new need to check id not name
//     },
//     removed: {
//         type: String,
//         optional: true
//     },
//     removedBy: {
//         type: Boolean,
//         optional: true
//     },
//     restoredAt: {
//         type: String,
//         optional: true
//     },
//     restoredBy: {
//         type: Boolean,
//         optional: true
//     },
// });
//
// Organizations.attachSchema(Organizations.schema);
