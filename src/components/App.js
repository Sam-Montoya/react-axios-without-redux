import React, { Component } from 'react';
import './App.css';

import Header from './Header/Header';
import List from './List/List';
import Workspace from './Workspace/Workspace';
import { getCustomerList, createCustomer, getCustomer, updateCustomer } from '../customers.js';


class App extends Component {
  constructor() {
    super()
    this.state = {
      customerList: undefined,
      initialLoad: true,
      creating: false,
      currentCustomer: null
    }

    this.startNewCustomer = this.startNewCustomer.bind(this);
    this.newCustomer = this.newCustomer.bind(this);
    this.selectCustomer = this.selectCustomer.bind(this);
  }

  componentDidMount() {
    getCustomerList().then(list => {
      this.setState({ customerList: list });
    })
  }

  startNewCustomer(customer) {
    this.setState({
      creating: true,
      initialLoad: false,
      currentCustomer: null
    });
  }

  newCustomer(customer) {
    createCustomer(customer).then(response => {
      getCustomerList().then(list => {
        this.setState({
          initialLoad:true,
          creating: false,
          customerList: list
        })
      })
    })
  }

  selectCustomer(id) {
    getCustomer(id).then(response=> {
        this.setState({
          currentCustomer: response,
          initialLoad: false
        })
      })
  }

  saveEdit(id, obj){
    updateCustomer(id, obj).then((updatedCustomer) => {
      getCustomerList().then((list) => {
        this.setState({
          customerList: list,
          currentCustomer: updatedCustomer
        });
      });
    });
  }

  render() {
    return (
      <div>
        <Header />
        <div className="App__container">
          {
            this.state.customerList ?
              <List
                customerList={this.state.customerList || []} 
                startNewCustomer={this.startNewCustomer} 
                selectCustomer={this.selectCustomer}
                saveEdit={this.saveEdit}/>
              : null
          }
          <Workspace initialLoad={this.state.initialLoad}
            currentCustomer={this.state.currentCustomer}
            creating={this.state.creating}
            createCustomer={this.newCustomer}
          />
        </div>
      </div>
    )
  }
}

export default App;
