import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signoutUser } from '../../actions/AuthActions';
import twitterLogo from '../../twitter.svg';

class Header extends React.Component {

  constructor() {
    super();
    this.state = { isDropdownOpen: false };
    this.signoutUser = this.signoutUser.bind(this);
    this.onUserClick = this.onUserClick.bind(this);
    this.onClickElsewhare = this.onClickElsewhare.bind(this);
  }

  componentDidMount() {
    window.addEventListener('click', this.onClickElsewhare);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onClickElsewhare);
  }

  signoutUser(){
    this.props.signoutUser(this.props.token);
  }

  onUserClick(event){
    event.stopPropagation();
    event.preventDefault()
    this.setState({ isDropdownOpen: true });
  }

  onClickElsewhare(){
    this.setState({ isDropdownOpen: false });
  }

  render() {

    const {user, isLoading} = this.props;

    let userSection = null;

    if(user){

      const { 
        profile_image_url_https: profileImage,
        screen_name: screenName
      } = user;

      userSection = (
        <div className="dropdown open user-circle">
          <a href="#" onClick={this.onUserClick}>
            <img src={profileImage} className="img-circle" width="32"/>
          </a>
          {this.state.isDropdownOpen && (<ul className="dropdown-menu">
            <li><a href="https://twitter.com" target="_blank">Twitter</a></li>
            <li><a href={`https://twitter.com/${screenName}`} target="_blank">Profile</a></li>
            <li role="separator" className="divider"></li>
            <li><a href="javascript:void(0)" onClick={this.signoutUser}>Sign out</a></li>
          </ul>)}
        </div>
      );
    }else if (!isLoading){
      userSection = (
        <a href="/auth/twitter/signin" className="btn btn-default navbar-btn" role="button">Sign In</a>
      );
    }

    return (     
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <Link to="/" className="logo navbar-brand">
              <img src={twitterLogo} width="40"/>
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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ signoutUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);