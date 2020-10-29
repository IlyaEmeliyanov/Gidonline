import React, {useState, useEffect} from "react";
import axios from 'axios';

import {FaRegBookmark, FaBookmark} from 'react-icons/fa'
import "../../css/common/card.scss";

import {awsUrl} from '../../config/config.json'


// function addToWishilist() {
//   useEffect(async() => {
//     const res = await axios.post('/api/users/addtofavorites');

//   });
// }

const Card = (props) => {


  const {isFavorite, title, summary, imgName, mainActors, genres, duration, parentalGuidance, releaseDate} = props;
  
  const [isInWishilist, setIsFavorite] = useState(isFavorite);
  const changeIcon = () => setIsFavorite(!isInWishilist);
  let icon = isInWishilist ? <FaBookmark onClick={changeIcon}/> : <FaRegBookmark onClick={changeIcon}/>;

  const url = awsUrl.replace('<imgName>', imgName);

  return (
    <React.Fragment>
      <div className="container">
        <div className="cellphone-container">
          <div className="movie">
            <div className="menu" style={{color: '#00ffbb', padding: '10px'}}>
              {icon}
            </div>
            <div className="text-movie-cont">
            <div className="movie-img" style={{backgroundImage: `url(${url})`}}></div>
              <div className="mr-grid">
                <div className="col1">
                  <h1>{title}</h1>
                  <ul className="movie-gen">
                    <li>{parentalGuidance} /</li>
                    <li>{duration} /</li>
                    <li>{genres.map(g => `${g}, `)}</li>
                  </ul>
                </div>
              </div>
              <div className="mr-grid summary-row">
                <div className="col2">
                  <h5>SUMMARY</h5>
                </div>
                <div className="col2">
                  <ul className="movie-likes">
                    <li>
                      <i className="material-icons">&#xE813;</i>124
                    </li>
                    <li>
                      <i className="material-icons">&#xE813;</i>3
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mr-grid">
                <div className="col1">
                  <p className="movie-description">
                    {summary}
                  </p>
                </div>
              </div>
              <div className="mr-grid actors-row">
                <div className="col1">
                  <p className="movie-actors">
                    {mainActors.map(a => `${a}, `)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Card;
