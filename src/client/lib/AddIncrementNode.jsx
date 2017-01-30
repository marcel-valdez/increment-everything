import React from 'react';

class AddIncrementNode extends React.Component {
  constructor(props) {
    super(props);
    this.state = { description: '' };
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onPutIncrement = this.onPutIncrement.bind(this);
  }

  onDescriptionChange(event) {
    console.log(`AddIncrementNode.jsx: onDescriptionChange: '${event.target.value}'`);
    this.setState({ description: event.target.value });
  }

  onPutIncrement() {
    console.log(`AddIncrementNode.jsx: onPutIncrement: '${this.state.description}'`);
    this.props.addIncrement(this.state.description);
  }

  render() {
    return (<li>
            <label>
            Description: <input className="description"
                                type="text"
                                name="description"
                                onChange={this.onDescriptionChange} />
            </label>
            <input className="submit"
                   type="submit"
                   value="PutIncrement"
                   onClick={this.onPutIncrement} />
            </li>
           );
  }
};

AddIncrementNode.propTypes = {
  addIncrement: React.PropTypes.func
};

export default AddIncrementNode;
