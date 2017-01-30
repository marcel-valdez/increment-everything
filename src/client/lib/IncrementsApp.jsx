import React from 'react';
import IncrementsForm from 'client/lib/IncrementsForm.jsx';

class IncrementsApp extends React.Component {
  constructor(props) {
    super(props);
    this.addIncrement = this.addIncrement.bind(this);
  }

  addIncrement(description) {
    this.props.incrementService.addIncrement({description});
  }

  removeIncrement(id) {
    // TODO: Remove increment on GUI
  }

  render() {
    return (
      <div>
        <IncrementsForm increments={this.props.increments}
                        addIncrement={this.addIncrement} />
      </div>
    );
  }
}

IncrementsApp.propTypes = {
  increments: React.PropTypes.array,
  incrementService: React.PropTypes.object
};

export default IncrementsApp;
