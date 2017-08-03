import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signoutUser } from "../actions/AuthActions";
import twitterLogo from "../twitter.svg";

class Header extends React.Component {
  static defaultProps = {
    user: null,
    token: null
  };

  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      screen_name: PropTypes.string.isRequired,
      profile_image_url_https: PropTypes.string.isRequired
    }),
    token: PropTypes.string,
    isLoading: PropTypes.bool.isRequired,
    signoutUser: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = { isDropdownOpen: false };
    this.signoutUser = this.signoutUser.bind(this);
    this.onUserClick = this.onUserClick.bind(this);
    this.onClickElsewhare = this.onClickElsewhare.bind(this);
  }

  componentDidMount() {
    window.addEventListener("click", this.onClickElsewhare);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.onClickElsewhare);
  }

  onUserClick(event) {
    event.stopPropagation();
    event.preventDefault();
    this.setState({ isDropdownOpen: true });
  }

  onClickElsewhare() {
    this.setState({ isDropdownOpen: false });
  }

  signoutUser() {
    this.props.signoutUser(this.props.token);
  }

  render() {
    const { user, isLoading } = this.props;

    let userSection = null;

    if (user) {
      const {
        profile_image_url_https: profileImage,
        screen_name: screenName,
        name
      } = user;

      userSection = (
        <div className="dropdown open user-circle">
          <button onClick={this.onUserClick} className="chromeless">
            <img
              src={profileImage}
              className="img-circle"
              width="32"
              alt={name}
            />
          </button>
          {this.state.isDropdownOpen &&
            <ul className="dropdown-menu">
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href={`https://twitter.com/${screenName}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Profile
                </a>
              </li>
              <li role="separator" className="divider" />
              <li>
                <button onClick={this.signoutUser} className="chromeless">
                  Sign out
                </button>
              </li>
            </ul>}
        </div>
      );
    } else if (!isLoading) {
      userSection = (
        <a
          href="/auth/twitter/signin"
          className="btn btn-default navbar-btn"
          role="button"
        >
          Sign In
        </a>
      );
    }

    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <Link to="/" className="logo navbar-brand">
              <img src={twitterLogo} width="40" alt="twitter logo" />
              <span className="brand-text">Twister</span>
            </Link>
          </div>
          <div className="pull-right">
            {userSection}
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    token: state.auth.accessToken,
    isLoading: state.app.isLoading
  };
}

export default connect(mapStateToProps, { signoutUser })(Header);
