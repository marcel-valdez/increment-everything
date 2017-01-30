import React from 'react';

import AddIncrementNode from 'client/lib/AddIncrementNode.jsx';

const Increment = ({description, id}) => {
  return (<li>
          <p>Description: {description}</p>
          <p>Key: {id}</p>
          </li>);
};

const IncrementsForm = ({increments, addIncrement}) => {
  const incrementNodes = increments.map((increment, index) => {
    const id = increment['_id'];
    return (<Increment description={increment.description}
                       id={id}
                       key={index} />);
  });

  incrementNodes.push((<AddIncrementNode addIncrement={addIncrement}
                                         key={incrementNodes.length + 1} />));
  return (<ul>{incrementNodes}</ul>);
};


IncrementsForm.propTypes = {
  increments: React.PropTypes.array,
  addIncrement: React.PropTypes.func
};


export default IncrementsForm;
