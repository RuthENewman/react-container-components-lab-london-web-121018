import React, { Component } from 'react';
import 'isomorphic-fetch';
import MovieReviews from './MovieReviews'

const NYT_API_KEY = 'yJWMTc0mYGc4YFtLD0VCdwFpBvadGG3m';
const BASE_URL = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?'
            + `api-key=${NYT_API_KEY}`;

// Code SearchableMovieReviewsContainer Here
class SearchableMovieReviewsContainer extends Component {
  constructor() {
    super()

    this.state = {
      searchTerm: '',
      reviews: []
    }
  }

  handleSearchInputChange = event => this.setState({ searchTerm: event.target.value })


  handleSubmit = event => {
    event.preventDefault();
    fetch(BASE_URL.concat(this.state.searchTerm))
      .then(resp => resp.json())
      .then(response => this.setState({ reviews: response.results }))
  }

  render() {
    return(
      <div className="searchable-movie-reviews">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="search-input">Search for a movie review</label>
          <br/>
          <br/>
          <input
            id="search-input"
            type="text"
            onChange={this.handleSearchInputChange}
          />
          <br/>
          <br/>
          <button type="submit">Submit</button>
        </form>
        <MovieReviews reviews={this.state.reviews} />
      </div>
    )
  }

}

export default SearchableMovieReviewsContainer;
