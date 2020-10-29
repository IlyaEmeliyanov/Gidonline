import React, { Component } from "react";

import Card from "./common/Card";
import { Carousel } from "react-bootstrap";

import axios from "axios";

class Home extends Component {
  state = {
    movies: [],
  };

  async componentDidMount() {
    const { data } = await axios.get("/api/movies");
    this.setState({ movies: data.data.movies });
  }

  render() {
    return (
      <React.Fragment>
        <h1 className="page__title">Home</h1>
        <Carousel>
          {this.state.movies.map((el) => (
            <Carousel.Item>
              <Card
                id={el._id}
                isFavorite={false}
                title={el.title}
                summary={el.summary}
                imgName={el.imgName}
                mainActors={el.mainActors}
                genres={el.genres}
                duration={el.duration}
                parentalGuidance={el.parentalGuidance}
                releaseDate={el.releaseDate}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </React.Fragment>
    );
  }
}

export default Home;
