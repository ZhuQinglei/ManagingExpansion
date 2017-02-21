import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {connect} from 'react-redux';
import {unSelectOrganization, deleteOrganizations} from './organizationsActions';
import SearchContacts from '../common/SearchContacts';
import Textfield from '../common/Textfield';
import {Organizations} from '../../../imports/collections/Organisations';
// For delete and update
class OrganizationDetail extends Component {

    // Called only once when the component is first loaded
    constructor(props) {
        super(props);
        // inherit properties from parent and initialise state of this component
        // we need to use state because state is changeable, while props is passing from parent and not changeable
        this.state = props.organization;
        this.state.errors = {
            organization_name: '', contact_id: '', address: '', city: '', post_code: '', phone: ''
        }
    }
    componentWillReceiveProps(nextProps) {
        if(this.state !== nextProps.organization){
            this.setState({
                ...nextProps.organization
            })
        }
    }

    updateOrganization(event) {
        event.preventDefault();
        const organization = this.props.organization._id;

            // call the server side to update this organization data, we need to pass the data for updating
            Meteor.call('organizations.update', organization, this.state, (error)=> {
                if (error) {
                    // console.log(error)
                } else {
                    // close the expansion and change row color to normal
                    this.props.unSelectOrganization(organization);
                }
            });
    }

    handleContactChange(contact_id) {
        var errors = {...this.state.errors, contact_id:''};
        let contact = Meteor.users.findOne({_id: contact_id});
        this.setState({
            contact_id,
            contact_name: contact ? contact.username : null,
            errors
        });
    }
    // handle the change of content of respective <input> caller
    // name: is used to refer back which <input> value need to be updated
    // event: is used to track the change in value
    handleChange(name, event) {
        var change = {};
        var errors = {...this.state.errors, [name]:''};
        change[name] = event.target.value;
        change['errors'] = errors;
        // console.log(change);
        this.setState(change);
    }

    render() {

        const {organization_name, address, post_code, city, phone, contact_id, errors} = this.state;
        // console.log(this.state);

        return (
            <form className="form-inline">
                <div className="col-md-10">
                    <Textfield
                        widthClass="col-md-3"
                        label="Organization Name"
                        labelPlace="top"
                        value={organization_name}
                        error={errors.organization_name}
                        onChange={this.handleChange.bind(this, 'organization_name')}
                    />

                    <Textfield
                        widthClass="col-md-3"
                        label="Address"
                        labelPlace="top"
                        value={address}
                        error={errors.address}
                        onChange={this.handleChange.bind(this, 'address')}
                    />

                    <Textfield
                        widthClass="col-md-3"
                        label="Postal Code"
                        labelPlace="top"
                        value={post_code}
                        error={errors.post_code}
                        onChange={this.handleChange.bind(this, 'post_code')}
                    />

                    <Textfield
                        widthClass="col-md-3"
                        label="City"
                        labelPlace="top"
                        value={city}
                        error={errors.city}
                        onChange={this.handleChange.bind(this, 'city')}
                    />

                    <Textfield
                        widthClass="col-md-3"
                        label="Phone"
                        labelPlace="top"
                        placeholder="phone"
                        value={phone}
                        error={errors.phone}
                        onChange={this.handleChange.bind(this, 'phone')}
                    />

                    <SearchContacts
                        widthClass="col-md-3"
                        label="Contact Name"
                        labelPlace="top"
                        value={contact_id}
                        error={errors.contact_id}
                        handleSelectChange={this.handleContactChange.bind(this)}
                    />
                </div>

                <div className="col-md-2 align-center">
                    <div className="btn-trash">
                        <i className="glyphicon glyphicon-trash"
                           onClick={this.props.deleteOrganizations.bind(this)}/>
                    </div>

                    <button
                        onClick={this.updateOrganization.bind(this)}
                        className="btn btn-raised btn-primary">
                        Save
                    </button>
                </div>
            </form>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteOrganizations: ()=> {
            dispatch(deleteOrganizations());
        },
        unSelectOrganization: (row) => {
            dispatch(unSelectOrganization(row))
        }
    }
};
OrganizationDetail = connect(null, mapDispatchToProps)(OrganizationDetail);

export default OrganizationDetail;
