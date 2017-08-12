import React from "react";
import PropTypes from "prop-types";

const NoTweetsMsg = ({ list }) =>
  <div className="alert alert-info" role="alert">
    {list
      ? <div>
          <h3>No members?</h3>
          <p>
            Add members to your list and you’ll see their Tweets show up here
          </p>
          <a
            href={`https://twitter.com/${list.full_name}`}
            rel="noopener noreferrer"
            target="_blank"
            className="btn btn-default"
          >
            Add members to this list
          </a>
        </div>
      : <div>
          <h3>No Tweets yet?</h3>
          <p>Start following people and you’ll see Tweets show up here.</p>
          <a
            href="https://twitter.com/who_to_follow/suggestions"
            rel="noopener noreferrer"
            target="_blank"
            className="btn btn-default"
          >
            Find people to follow
          </a>
        </div>}
  </div>;

NoTweetsMsg.propTypes = {
  list: PropTypes.shape({ full_name: PropTypes.string.isRequired })
};

NoTweetsMsg.defaultProps = {
  list: null
};

export default NoTweetsMsg;
