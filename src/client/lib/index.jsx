// JS file corresponding to index.html
import React from 'react';
import ReactDOM from 'react-dom';
import IncrementsApp from 'client/lib/IncrementsApp.jsx';
import axios from 'axios';
import { toFormattedString } from 'common/lib/utilities.js';

const incrementsUrl = '/increments';
const allIncrementsUrl = '/increments/all';

/**
 * increment: An Object with a description field
 * onSuccess: A function to be called with the server's response data
 * onError: A function to be called with the server's error
 */
const incrementService = {
  addIncrement(increment) {
    console.log(`incrementService: ${toFormattedString(increment, 2)}`);
    axios.put(incrementsUrl, increment)
      .then(res => renderIncrements(res.data, addIncrement),
            res => renderError(res.error));
  }
};

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

axios.get(allIncrementsUrl)
  .then(res => renderIncrements(res.data, incrementService),
        res => renderError(res.error));
