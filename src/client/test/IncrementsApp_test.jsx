import React from 'react';
import { shallow, mount } from 'enzyme';
import { assert } from 'chai';
import IncrementsApp from 'client/lib/IncrementsApp.jsx';
import IncrementsForm from 'client/lib/IncrementsForm.jsx';

// TODO: Turn into a generic utility
function makeIncrementService() {
  return {
    state: [],
    addIncrement: function(inc) {
      console.log(`makeIncrementService.addIncrement: ${inc}`);
      this.state.push(inc);
    }
  };
}

describe('increments app',  () => {
  it('can render a list of increments + form', () => {
    const incrementService = makeIncrementService();
    const increments = [ { _id: 'id', description: 'description' }]
    const result = shallow(
      <IncrementsApp increments={increments}
                     incrementService={incrementService}/>);

    assert.equal(result.type(), 'div');
    assert.equal(result.find(IncrementsForm).length, 1);
  });

  it('can add an increment to the server', () => {
    const incrementService = makeIncrementService();
    const result = mount(<IncrementsApp
                         increments={[{description: 'initial'}]}
                         incrementService={incrementService} />);

    const inputs = result.find("input");
    const textArea = inputs.filter('.description');
    const submitBtn = inputs.filter('.submit');

    textArea.simulate('change', { target: { value: "can_add_increment"  } });
    submitBtn.simulate('click');

    assert.equal(incrementService.state.length, 1);
  });
});
