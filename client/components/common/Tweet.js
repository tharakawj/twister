import React from "react";

class Tweet extends React.Component {
  render() {
    const { text, user } = this.props.tweet;
    const { profile_image_url_https: profileImage, name } = user;
    const profileImageBigger = profileImage.replace(/_normal./, "_bigger.");
    return (
      <div className="tweet media">
        <div className="media-left media-top">
          <a href="#">
            <img className="media-object" src={profileImageBigger} />
          </a>
        </div>
        <div className="media-body">
          <h4 className="media-heading">{name}</h4>
          <p>
            {text}
          </p>
        </div>
      </div>
    );
  }
}

export default Tweet;
