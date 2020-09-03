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
    newValue: "",
    account: "",
    recipient: ""
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
  handleGet = async e => {
    e.preventDefault();
    const { contract } = this.state;
    const result = await contract.methods.get().call();

    console.log(result);
  };
  handleSubmit = async e => {
    e.preventDefault();
    const { contract } = this.state;
    const accounts = await window.ethereum.enable();
    const account = accounts[0];

    const gas = await contract.methods.set(this.state.newValue).estimateGas();
    console.log(gas);
    const result = await contract.methods.set(this.state.newValue).send({
      from: account,
      gas
    });
    console.log(result);
    this.setState({
      account: account,
      recipient: result.to
    });
    // const { accounts, contract } = this.state;
    // await contract.methods.set(this.state.newValue).send({ from: accounts[0] });

    // const response = await contract.methods.get().call();
    // this.setState({
    //   storageValue: response
    // });
  };
  runExample = async () => {
    const { contract } = this.state;

    const response = await contract.methods.get().call();

    this.setState({ storageValue: response });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    console.log(window.ethereum);
    return (
      <div className="App">
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

        {this.state.storageValue}
        {window.ethereum ? (
          <div>
            <p> The transaction has been successfully completed</p>
            <p>Sender: {this.state.account}</p>
            <p>Recipient: {this.state.recipient}</p>
          </div>
        ) : (
          <p>MetaMask is not connected</p>
        )}
      </div>
    );
  }
}

export default App;
