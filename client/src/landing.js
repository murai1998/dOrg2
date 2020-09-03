import React, { Component } from "react";
import { Link } from "react-router-dom";
class Landing extends Component {
  render() {
    return (
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
                  cooperative of blockchain devs building DAO-related software.
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
                <div class="col-md-10 col-lg-8 mx-auto text-center">
                  <i class="far fa-paper-plane fa-2x mb-2 text-white"></i>
                  <h2 id="quest" class="text-white mb-5">
                    Send Compliments to Your Coworkers
                  </h2>
                  {/* <p class="text-white-50">
                    More than anything, we want you to be thrilled with your
                    Cardinal experience. If you have any questions or need help
                    with selecting the best activity for you, we’re always here
                    to help!
                  </p> */}
                </div>
              </div>
            </div>
          </section>

          <section class="contact-section bg-black">
            <div class="container">
              <div class="social d-flex justify-content-center">
                <a class="mx-2" href="https://github.com/murai1998">
                  {/* <i>Git</i> */}
                  <img
                    id="resource"
                    class="fab fa-github"
                    src={require("./images/Octocat.png")}
                    alt="github"
                  />
                </a>
                <a class="mx-2" href="https://www.linkedin.com/in/hmurai/">
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
    );
  }
}

export default Landing;
