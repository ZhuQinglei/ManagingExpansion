import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Organizations} from '../../../imports/collections/Organisations';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {connect} from 'react-redux';
import OrganizationDetail from './OrganizationDetails';  // reuse club detail directly
import {
    selectOrganization, unSelectOrganization
} from './organizationsActions'

class OrganizationsPage extends Component {

    constructor(props) {
        super(props);
    }
    handleRowSelect(row, isSelected){
        console.log("on row select", row._id, isSelected);
        if (isSelected) {
            console.log("select");
            this.props.selectOrganization(row._id);
        } else {
            this.props.unSelectOrganization(row._id);
        }
        return false;
    }

    render() {
      console.log(this.props);
      console.log(this.props.selectedOrganizations);

      const options = {
          expandRowBgColor: '#D9D9D9', // grey background
          sizePerPageList: [10, 15, 20, 50, 100], // Dropdown Options for rows per page
          sizePerPage: 10,
          expanding: this.props.selectedOrganizations,
      };

      const selectRow = {
          mode: 'checkbox', // multi-select
          className: 'clicked-row',
          clickToSelect: true,  // click to select, default is false
          clickToExpand: true,  // click to expand row, default is false
          selected: this.props.selectedOrganizations,
          onSelect: this.handleRowSelect.bind(this),
      };

        return (
<div className = "col-md-12">
          <BootstrapTable
              data={ this.props.organizations }
              options={ options } selectRow={ selectRow }
              expandableRow={ () => {
                  return true
              } }
              expandComponent={(row) => {
                  return (<OrganizationDetail organization={ row }/>)
              }}
              exportCSV pagination>
              <TableHeaderColumn dataField='_id' isKey hidden>ID</TableHeaderColumn>
              <TableHeaderColumn dataField='organization_name'
                                 dataSort={ true }>Organization</TableHeaderColumn>
              <TableHeaderColumn dataField='address' dataSort={ true }>Address</TableHeaderColumn>
              <TableHeaderColumn dataField='post_code' dataSort={ true }>Postal Code</TableHeaderColumn>
              <TableHeaderColumn dataField='city' dataSort={ true }>City</TableHeaderColumn>
              <TableHeaderColumn dataField='contact_name' dataSort={ true }>Contact Name</TableHeaderColumn>
              <TableHeaderColumn dataField='phone' dataSort={ true }>Phone Number</TableHeaderColumn>
          </BootstrapTable>
</div>
        )
    }
}

// display the organization list and keep updated whenever data is changed
const container = createContainer(() => {
    Meteor.subscribe('OrganizationsWithUser');
    return {
        organizations: Organizations.find({}).fetch()
    }
}, OrganizationsPage);

const mapStateToProps = (state) => {
    const {selectedOrganizations} = state.organizations.batchEdit;
    return {selectedOrganizations}
};

const mapDispatchToProps = (dispatch) => {
    return {
        selectOrganization: (org) => {
            dispatch(selectOrganization(org))
        },
        unSelectOrganization: (org) => {
            dispatch(unSelectOrganization(org))
        }
    }
};

OrganizationsPage = connect(mapStateToProps, mapDispatchToProps)(container);

export default OrganizationsPage;
