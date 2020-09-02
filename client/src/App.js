import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = {
    storageValue: "",
    web3: null,
    accounts: null,
    contract: null,
    newValue: ""
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = async e => {
    e.preventDefault();
    const { accounts, contract } = this.state;
    await contract.methods.set(this.state.newValue).send({ from: accounts[0] });

    const response = await contract.methods.get().call();
    this.setState({
      storageValue: response
    });
  };
  runExample = async () => {
    const { contract } = this.state;

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <div>The stored value is: {this.state.storageValue}</div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="newValue"
              className="form-control"
              onChange={this.handleChange}
            />
            <div className="form-group">
              <input type="submit" value="Create" className="btn btn-primary" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default App;