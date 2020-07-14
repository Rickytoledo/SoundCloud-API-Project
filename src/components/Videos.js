import React, { Component } from "react";
import axios from "axios";

console.log(process.env.REACT_APP_API_KEY);

class Videos extends Component {
  state = {
    searchValue: "",
    show: false,
    data: null,
    resultsPerPage: 0,
  };

  makeApiCall = () => {
    axios({
      method: "GET",
      url: `https://www.googleapis.com/youtube/v3/search`,
      params: {
        part: "snippet",
        maxResult: 5,
        key: "AIzaSyAAxgogVPZfpkqGL2RxX_iE2zSLz6tP3I8",
        q: this.state.searchValue,
        resultsPerPage: this.state.data?.pageInfo.resultsPerPage,
      },
    })
      .then((res) => {
        console.log(res);
        this.setState({
          data: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleOnChange = (event) => {
    this.setState({ searchValue: event.target.value });
  };

  handleSearch = () => {
    this.makeApiCall();
    this.setState({ show: true });
  };
  //video.id.videoId
  returnVideos = () => {
    let preUrl = "https://www.youtube.com/embed/";
    let arr = [];
    arr = this.state.data?.items.map(function (video) {
      return (
        <div className="search-container">
          <p className="song-title">{video.snippet.title}</p>
          <iframe
            width="560"
            height="315"
            src={(preUrl += video.id.videoId)}
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen="allowfullscreen"
          ></iframe>
        </div>
      );
    });
    return arr;
  };

  render() {
    return (
      <div className="search">
        <p className="header">Search Music Videos</p>
        <input
          name="text"
          type="text"
          placeholder="Search"
          onChange={(event) => this.handleOnChange(event)}
          value={this.state.searchValue}
        />
        <button onClick={this.handleSearch}>Search</button>
        <br></br>
        <div id="videos">{this.returnVideos()}</div>
        <br></br>
        <div className="nextPrevBtns">
          {this.state.show && (
            <button
              onClick={(event) =>
                this.setState(
                  {
                    resultsPerPage:
                      this.state.data?.pageInfo.resultsPerPage + 5,
                  },
                  this.handleSearch
                )
              }
            >
              Next
            </button>
          )}
          {this.state.data?.pageInfo.resultsPerPage > 0 && (
            <button
              onClick={(event) =>
                this.setState(
                  {
                    resultsPerPage:
                      this.state.data?.pageInfo.resultsPerPage - 5,
                  },
                  this.handleSearch
                )
              }
            >
              Prev
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default Videos;