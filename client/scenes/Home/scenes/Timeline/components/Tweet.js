import React from "react";
import PropTypes from "prop-types";

const Tweet = ({ tweet }) => {
  const { profile_image_url_https: profileImage, name } = tweet.user;
  const profileImageBigger = profileImage.replace(/_normal./, "_bigger.");
  return (
    <div className="tweet media">
      <div className="media-left media-top">
        <img className="media-object" src={profileImageBigger} alt={name} />
      </div>
      <div className="media-body">
        <h4 className="media-heading">{name}</h4>
        <p>
          {tweet.text}
        </p>
      </div>
    </div>
  );
};

Tweet.propTypes = {
  tweet: PropTypes.shape({
    text: PropTypes.string.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      profile_image_url_https: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default Tweet;
