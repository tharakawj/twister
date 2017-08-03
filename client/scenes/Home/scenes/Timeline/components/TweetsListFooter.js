import React from "react";
import PropTypes from "prop-types";
import Spinner from "Components/Spinner";

const TweetsListFooter = ({ loading, loadMore }) =>
  <div className="tweets-list-footer">
    {loading
      ? <Spinner />
      : <button className="btn btn-default btn-sm" onClick={loadMore}>
          Load More...
        </button>}
  </div>;

TweetsListFooter.propTypes = {
  loading: PropTypes.bool.isRequired,
  loadMore: PropTypes.func.isRequired
};

export default TweetsListFooter;
