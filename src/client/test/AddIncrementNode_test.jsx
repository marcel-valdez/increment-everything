import React from 'react';
import { shallow, mount } from 'enzyme';
import { assert } from 'chai';
import AddIncrementNode from 'client/lib/AddIncrementNode.jsx';
import { logFormattedObject } from 'common/lib/utilities.js';

describe('add increment node',  () => {
  it('can render itself', () => {
    const addIncrement = () => {}
    const wrapper = shallow(<AddIncrementNode addIncrement={addIncrement} />);
    assert.equal(wrapper.find('input').length, 2);
    assert.equal(wrapper.find('[className="description"]').length, 1);
    assert.equal(wrapper.find('[className="submit"]').length, 1);
  });

  it('can call onPutIncrement', () => {
    const actual = { };
    const addIncrement = function(description) {
      actual.description = description;
    }

    const wrapper = mount(<AddIncrementNode addIncrement={addIncrement} />);
    const submit = wrapper.find('.submit');
    assert.isNotNull(submit);
    assert.isUndefined(actual.description);
    submit.simulate('click');
    assert.isDefined(actual.description);
  });

  it('can set the increment description', () => {
    const actual = { };
    const expected = { description: 'test' };
    const addIncrement = function(description) {
      actual.description = description;
    }

    const wrapper = mount(<AddIncrementNode addIncrement={addIncrement} />);
    const description = wrapper.find('.description');
    wrapper.setState(expected);
    const submit = wrapper.find('.submit');
    submit.simulate('click');
    assert.deepEqual(actual, expected);
  });
});
