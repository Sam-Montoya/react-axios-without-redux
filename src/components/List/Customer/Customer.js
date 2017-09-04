import React from 'react';
import './Customer.css';

export default function Customer( { id, first, last, selectCustomer } ) {
  return (
    <div className="Customer__listName" onClick={ (click) => selectCustomer(id) }>
      <span>{ first } { last }</span>
    </div>
  )
}
