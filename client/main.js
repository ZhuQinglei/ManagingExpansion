import React, {Component} from 'react';
import { render } from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import OrganizationsPage from './components/organizations/OrganizationsPage';

// Entry point at web page
// Have to make sure Meteor started and document is loaded before render DOM

        Meteor.startup(() => {
          render(
              <Provider store={store}>
                 <OrganizationsPage />
              </Provider>
              , document.getElementById('root'))
        });
