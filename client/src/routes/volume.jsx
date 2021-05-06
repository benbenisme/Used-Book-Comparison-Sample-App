import React from 'react';
import { useEffect } from 'react';
import {
    Container,
} from 'reactstrap';
import { useStores } from '../state';
import Volume from '../components/volume/Volume.jsx';
import { CircularProgress } from '@material-ui/core';
import {
    Grid
} from '@material-ui/core';

const VolumeRoute = () => {
    const { volumeStore } = useStores();
    
    useEffect(() => {  
        volumeStore.fetchPriceData();
        return () => volumeStore.clearVolume(); 
    }, []);

    return (
        <Grid container justify="center" alignItems="center" style={{padding: "4em", maxWidth: "40em"}}>
            <Grid item>
                <Container fluid>
                    {volumeStore.loading ?
                        <CircularProgress/> : 
                        (
                        <Volume {...volumeStore.volumeInfo}/>
                        ) 
                    } 
                </Container>
            </Grid>
        </Grid>
    )
}
export default VolumeRoute