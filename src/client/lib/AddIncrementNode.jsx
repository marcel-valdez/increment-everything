import React from 'react';
import { logDebug } from 'common/lib/utilities.js';

class AddIncrementNode extends React.Component {
  constructor(props) {
    super(props);
    this.state = { description: '' };
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onPutIncrement = this.onPutIncrement.bind(this);
  }

  onDescriptionChange(event) {
    logDebug(`${__filename}: onDescriptionChange: `, event.target.value);
    this.setState({ description: event.target.value });
  }

  onPutIncrement() {
    logDebug(`${__filename}: onPutIncrement: `, this.state.description);
    this.props.addIncrement(this.state.description);
  }

  render() {
    const onDescriptionChange = e => this.onDescriptionChange(e);
    const onPutIncrement = () => this.onPutIncrement();
    return (<li>
            <label>
            Description: <input className="description"
                                type="text"
                                name="description"
                                onChange={onDescriptionChange} />
            </label>
            <input className="submit"
                   type="submit"
                   value="PutIncrement"
                   onClick={onPutIncrement} />
            </li>
           );
  }
};

AddIncrementNode.propTypes = {
  addIncrement: React.PropTypes.func
};

export default AddIncrementNode;
