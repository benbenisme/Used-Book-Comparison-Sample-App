import React from 'react';
import Toolbar from './components/toolbar/toolbar';
import BackButton from './components/back-button/back-button';
import BrowseSearchBar from './components/browse-search/browse-search-bar';
import VolumePreview from './components/volume-preview/volume-preview';
import Volume from './components/volume/volume';
import {
  Jumbotron,
  Container,
  Row
} from 'reactstrap';
import {
  Switch,
  Route,
  withRouter
} from "react-router-dom";
import './App.css';

 class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      apiSearchResponse: '',
      searchTerms: '',
    };
  }

  handlePriceSearchAPICall = async (volumeInformation) => {
    const identifiers = this.parseVolumeInformationForIdentifiers(volumeInformation);
    const response = await fetch('/api/priceSearch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: identifiers}),
    });
    const body = await response.text();
    console.log("here is the response: " + body);
  }

  parseVolumeInformationForIdentifiers(volumeInformation) {
    const industryIdentifiers = volumeInformation.volumeInfo.industryIdentifiers;
    return {
      isbn_13: industryIdentifiers[industryIdentifiers.map(e => e.type).indexOf('ISBN_13')].identifier,
      isbn_10: industryIdentifiers[industryIdentifiers.map(e => e.type).indexOf('ISBN_10')].identifier,
      title: volumeInformation.volumeInfo.title, 
      publisher: volumeInformation.volumeInfo.publisher, 
      publishedDate: volumeInformation.volumeInfo.publishedDate,
    }
  }

  search = async (searchTerms) => {   
    console.log(searchTerms.replace(/ /g, ''));
    const apiKey = 'AIzaSyBi7vVICfe_DSTeOEis5nM-iKW0vDB2yC0';
    const cleanAPISearchResponse = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${searchTerms.replace(/ /g, '')}&key=${apiKey}`
    );
    const apiSearchResponse = await cleanAPISearchResponse.json();
    this.setState({apiSearchResponse: apiSearchResponse});
    this.props.history.push('/volumePreviews');
  }

  render() {   
    const response = this.state.apiSearchResponse.items ? this.state.apiSearchResponse.items : null;
    const volumePreviewsDOM = response ? response.map((volume) => {
      return (        
          <Row>
            <VolumePreview volumeResponse={volume} handlePriceSearchAPICall={this.handlePriceSearchAPICall}/>
          </Row>
      )
    }) 
    : <Jumbotron>
    <h1 className="display-3">No Volumes Found</h1>
    </Jumbotron>;

    return (
      <div>
        <Toolbar />

        {/* Main page switch display */}
        <Switch>

          {/* Main Page Route Display*/}
          <Route exact path="/">
            <div>
              <Jumbotron>
                <h1 className="display-3">Kings Books</h1>
                <p className="lead">Welcome to Kings Books, the online encyclopedia for books and reading material.</p>
              </Jumbotron>

              <p>{this.state.response}</p>
              <form onSubmit={this.handleSubmit}>
                <p>
                  <strong>Post to Server:</strong>
                </p>
                <input
                  type="text"
                  value={this.state.post}
                  onChange={e => this.setState({ post: e.target.value })}
                />
                <button type="submit">Submit</button>
              </form>
              <p>{this.state.responseToPost}</p>
              
            </div>
          </Route>

          {/* Browse Page Route Display */}
          <Route path="/browse">
            <div>
              <BackButton />
              <BrowseSearchBar onSearch={this.search} />
            </div>
          </Route>

          {/* VolumePreviews Page Route Display */}
          <Route path="/volumePreviews">
            <div>
              <BackButton />
              <Container fluid>
                {volumePreviewsDOM}
              </Container>
            </div>
          </Route>

          {/* Singluar Volume Page Route Display */}
          <Route path="/volume">
            <div>
              <BackButton />
              <Volume props={this.props.location.state} />
            </div>
          </Route>

        </Switch>
      </div>
    );
  }
};

export default withRouter(App);