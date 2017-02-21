import React, {Component} from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import {createContainer} from 'meteor/react-meteor-data';
import {connect} from 'react-redux';

class SearchContacts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectValue: props.defaultValue,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.state = {
            selectValue: nextProps.defaultValue,
        };
    }

    handleSelectChange(newValue) {
        // console.log(newValue);
        this.setState({
            selectValue: newValue
        });
        //pass user to parent
        if (newValue) {
            this.props.handleSelectChange(newValue)
        } else {
            this.props.handleSelectChange(undefined)
        }
    }

    render() {
        var divClassname = "form-group label-floating full-width";
        var labelClassname = "control-label";
        var inputGroup = "";
        var jumbotron = "";

        if (this.props.labelPlace === 'top') {
            jumbotron = "jumbotron";
        }

        if (this.props.error && (this.props.error !== '')) {
            divClassname = divClassname + " has-error";
        }

        if (this.props.discardButton) {
            inputGroup = "input-group";
        }

        if (this.props.widthClass == null) {
            divClassname = "form-group full-width";
            labelClassname = labelClassname + " col-md-3";
            inputGroup = inputGroup + " col-md-9";
        }

        return (
            <div className={this.props.widthClass}>
                <div className={jumbotron}>
                    <div className={divClassname}>
                        <label className={labelClassname}>{this.props.label}</label>
                        <div className={inputGroup}>
                            <Select ref="stateSelect" autofocus options={this.props.OPTIONS}
                                    simpleValue value={this.state.selectValue} placeholder="Select a contact person"
                                    onChange={this.handleSelectChange.bind(this)}/>
                            {this.props.discardButton}
                        </div>
                        <h6 id={this.props.label} className="error-message">{this.props.error}</h6>
                    </div>
                </div>
            </div>
        );
    }
}

export default createContainer((props)=> {
    var OPTIONS = [];
    var defaultValue = undefined;

    Meteor.subscribe('allUsers');

    if (props.value && (props.value !== '')) {
        if (props.value === '********') {
            defaultValue = {label: '********', value: ''}
        } else if (props.value) {
            var user = Meteor.users.findOne({_id: props.value});
            if (user) {
                const {username, _id} = user;
                defaultValue = {label: username, value: _id}
            }

        }
    }
    if (props.label === 'Instructor') {

        Meteor.users.find({roles: 'instructor'}).map(user => {
            const {username} = user;
            OPTIONS.push({label: username, value: user._id})
        });

    } else if (props.label === 'Contact Name') {
        Meteor.users.find({}).map(user => {
            const {username} = user;
            OPTIONS.push({label: username, value: user._id})
        });
    }


    return {OPTIONS, defaultValue};
}, SearchContacts);
