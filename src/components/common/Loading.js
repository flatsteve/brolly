import React from "react";

import brollyIcon from "../../icons/brolly.svg";

const Loading = ({ locationName }) => {
  return (
    <div className="empty-container">
      <div
        className="brolly brolly--loading"
        dangerouslySetInnerHTML={{ __html: brollyIcon }}
      />

      <p>
        Loading forcast for {locationName}
        ...
      </p>
    </div>
  );
};

export default Loading;
