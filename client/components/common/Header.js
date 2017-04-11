import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';
import { signoutUser } from '../../actions/AuthActions';

class Header extends React.Component {

  constructor() {
    super();
    this.signoutUser = this.signoutUser.bind(this);
  }

  signoutUser(){
    this.props.signoutUser(this.props.token);
  }

  render() {
    return (
      <div className="row">
        <nav>
          <IndexLink to="/" activeClassName="active">Home</IndexLink>
          {" | "}
          <Link to="/about" activeClassName="active">About</Link>
          {" | "}
          <UserHeader user={this.props.user} signoutUser={this.signoutUser}/>
        </nav>
      </div>
    );
  }
}

function UserHeader(props){
  if(props.user){
    return (
      <span>
        <Link to="/about" activeClassName="active">Hi {props.user.name}!</Link>
        {" | "}
        <a href="javascript:void(0)" onClick={props.signoutUser} >Sign Out</a>
      </span>
    );
  }else {
    return (
      <a href="/auth/twitter/signin" >Sign In</a>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    token: state.auth.accessToken
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ signoutUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);