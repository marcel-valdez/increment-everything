// JS file corresponding to index.html
import React from 'react';
import ReactDOM from 'react-dom';
import IncrementsApp from 'client/lib/IncrementsApp.jsx';
import axios from 'axios';
import { logDebug, toFormattedString } from 'common/lib/utilities.js';

const incrementsUrl = '/increments';
const allIncrementsUrl = '/increments/all';

function renderError(error) {
  console.error(error);
  ReactDOM.render(
      <div>`Error while fetching increments: ${error}`</div>,
    document.getElementById('client'));
}

function renderIncrements(increments, incrementService) {
  ReactDOM.render(
      <IncrementsApp increments={increments}
                     incrementService={incrementService} />,
    document.getElementById('client'));
}

/**
 * increment: An Object with a description field
 * onSuccess: A function to be called with the server's response data
 * onError: A function to be called with the server's error
 */
const incrementService = {
  addIncrement(increment) {
    logDebug(`${__filename}: incrementService: `, increment, 2);
    axios.post(incrementsUrl, increment)
      .then(_ => this.fetchIncrements(), res => renderError(res.error));
  },
  fetchIncrements() {
    axios.get(allIncrementsUrl)
      .then(res => renderIncrements(res.data, this),
            res => renderError(res.error));
  }
};

incrementService.fetchIncrements();
