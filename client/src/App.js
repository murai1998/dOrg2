import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";
import Landing from "./landing";

import "./App.css";

class App extends Component {
  state = {
    storageValue: "",
    web3: null,
    accounts: null,
    contract: null,
    newValue: "",

    recipient: "",
    showRes: false,
    showForm: true
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
      recipient: result.to,
      showRes: true,
      showForm: false
    });
    // const { accounts, contract } = this.state;
    // await contract.methods.set(this.state.newValue).send({ from: accounts[0] });

    // const response = await contract.methods.get().call();
    // this.setState({
    //   storageValue: response
    // });
  };
  addMore = e => {
    this.setState({
      account: "",
      recipient: "",
      showRes: false,
      showForm: true
    });
  };
  runExample = async () => {
    const { contract } = this.state;

    const response = await contract.methods.get().call();

    this.setState({ storageValue: response });
  };

  render() {
    // if (!this.state.web3) {
    //   return <div>Loading Web3, accounts, and contract...</div>;
    // }
    console.log("Account", this.state.account);
    return (
      <div className="App">
        <div>
          <body id="page-top">
            <nav
              class="navbar navbar-expand-lg navbar-light fixed-top"
              id="mainNav"
            >
              <div class="container">
                <a class="navbar-brand js-scroll-trigger" href="#page-top">
                  dOrg`s family
                </a>
                <button
                  class="navbar-toggler navbar-toggler-right"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarResponsive"
                  aria-controls="navbarResponsive"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                  onClick={this.hamburgerDrop}
                >
                  <span class="navbar-toggler-icon"></span>
                  <i class="fas fa-bars"></i>
                </button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                  <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                      <a class="nav-link js-scroll-trigger" href="#about">
                        About
                      </a>
                    </li>

                    <li class="nav-item">
                      <a class="nav-link js-scroll-trigger" href="#signup">
                        Send a component
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            <header class="masthead">
              <div class="container d-flex h-100 align-items-center">
                <div class="mx-auto text-center">
                  <h1 class="mx-auto my-0 text-uppercase">dOrg`s family</h1>
                  <h2 class="text-white-50 mx-auto mt-2 mb-5">
                    dOrg is a really cool group that got together and run a
                    cooperative of blockchain devs building DAO-related
                    software.
                  </h2>
                </div>
              </div>
            </header>

            <section class="about-section text-center" id="about">
              <div class="container">
                <div class="row">
                  <div class="col-lg-8 mx-auto">
                    <h2 class="text-white mb-4">About</h2>
                    <p class="text-white-50">
                      Founded originally by Jordan Ellis, Ori Shimoni and Thomas
                      Spofford, dOrg team is brings deep knowledge in software
                      architecture, smart contract development and a great open
                      source software culture.
                    </p>
                  </div>
                </div>
                <img
                  class="img-fluid"
                  src="https://static.askrypto.com/uploads/2019/06/dao.png"
                  alt=""
                />
              </div>
            </section>

            <section class="signup-section" id="signup">
              <div class="container">
                <div class="row">
                  <div
                    id="centered"
                    class="col-md-10 col-lg-8 mx-auto text-center"
                  >
                    <i class="far fa-paper-plane fa-2x mb-2 text-white"></i>
                    <h2 id="quest" class="text-white mb-5">
                      Send Compliments to Your Coworkers
                    </h2>

                    {this.state.showRes ? (
                      <div>
                        {this.state.account !== undefined ? (
                          <div id="sentMes">
                            <p class="text-white mb-4"> Successfully sent!</p>
                            <p class="text-white-50">
                              Sender: {this.state.account}
                            </p>
                            <p class="text-white-50">
                              Recipient: {this.state.recipient}
                            </p>
                            <p class="text-white-50">
                              Compliment: {this.state.newValue}
                            </p>
                            <button
                              onClick={this.addMore}
                              className="btn btn-primary"
                            >
                              Add more
                            </button>
                          </div>
                        ) : (
                          <div id="sentMes">
                            <h2 className="text-white mb-4">Failed to send!</h2>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div></div>
                    )}
                    {this.state.showForm ? (
                      <form onSubmit={this.handleSubmit}>
                        <div id="form4" className="form-group">
                          <input
                            maxLength="15"
                            type="text"
                            name="newValue"
                            id="inputFF"
                            className="form-control"
                            onChange={this.handleChange}
                          />
                          <div className="form-group">
                            <input
                              type="submit"
                              value="Send"
                              className="form-control"
                              className="btn btn-primary"
                            />
                          </div>
                        </div>
                      </form>
                    ) : (
                      ""
                    )}
                  </div>
                  {/* <p class="text-white-50">
                    More than anything, we want you to be thrilled with your
                    Cardinal experience. If you have any questions or need help
                    with selecting the best activity for you, we’re always here
                    to help!
                  </p> */}
                </div>
              </div>
            </section>

            <section class="contact-section bg-black">
              <div class="container">
                <div class="social d-flex justify-content-center">
                  <a class="mx-2" href="https://github.com/dOrgTech">
                    {/* <i>Git</i> */}
                    <img
                      id="resource"
                      class="fab fa-github"
                      src={require("./images/Octocat.png")}
                      alt="github"
                    />
                  </a>
                  <a
                    class="mx-2"
                    href="https://www.linkedin.com/company/dorg-tech/"
                  >
                    <img
                      id="resource"
                      class="fab fa-github"
                      src={require("./images/clipart953748.png")}
                      alt="LinkedIn"
                    />
                  </a>
                </div>
              </div>
            </section>

            <footer class="footer bg-black small text-center text-white-50">
              <div class="container">dOrg`s family 2020</div>
            </footer>
          </body>
        </div>
      </div>
    );
  }
}

export default App;
