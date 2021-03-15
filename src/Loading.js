import React, {Component} from "react";

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

class Loading extends Component{
  render() {
    return (
        <div>
          {/* This will display out loading display animation */}
            <Loader
              type="Puff"
              color="#00BFFF"
              height={100}
              width={100}
              timeout={3000} /* This will tell how long the loading disply will appear. */
            />
        </div>
    );
  }
}

export default Loading;