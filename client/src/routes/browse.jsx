import React, { useState } from 'react';
// import BackButton from './components/backButton/backButton.jsx';
import BrowseSearchBar from '../components/browseSearchBar/BrowseSearchBar';
import VolumePreview from '../components/volumePreview/VolumePreview';
import {
    Jumbotron,
} from 'reactstrap';
import { CircularProgress } from '@material-ui/core';
import {
    Grid
} from '@material-ui/core';

const BrowseRoute = () => {
    const [searchResults, setSearchResults] = useState(undefined);
    const [loading, setLoading] = useState(false);

    const search = async (searchTerms) => {
        try {
            setLoading(true);
            console.log(searchTerms.replace(/ /g, ''));
            const apiKey = 'AIzaSyBi7vVICfe_DSTeOEis5nM-iKW0vDB2yC0';
            const cleanAPISearchResponse = await fetch(
                `https://www.googleapis.com/books/v1/volumes?q=${searchTerms.replace(/ /g, '')}&key=${apiKey}`
            );
            const apiSearchResponse = await cleanAPISearchResponse.json();
            setSearchResults(apiSearchResponse.items);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }

    return (
        <Grid container direction="column" justify="center" alignItems="center" style={{padding: "4em"}}>
            <Grid>
                <BrowseSearchBar onSearch={search} />
            </Grid>
            <Grid item>
                <Grid container justify="center" alignItems="center">
                    {
                        loading ? <CircularProgress />
                            : searchResults ?
                                (
                                    searchResults.map((searchResult, index) => {
                                        return (
                                            <Grid item key={`VolumePreviewRow-${index}`} style={{width: "40em", height: "25em", margin: "1em", padding: "2em", border: "1px solid gray"}}>
                                                <VolumePreview
                                                    key={`VolumePreview-${index}`}
                                                    volumeResponse={searchResult}
                                                />
                                            </Grid>
                                        )
                                    })
                                )
                                :
                                (
                                    <Jumbotron>
                                        <h1 className="display-3">No Volumes Found</h1>
                                    </Jumbotron>
                                )
                    }
                </Grid>
            </Grid>
        </Grid>
    )
}
export default BrowseRoute;