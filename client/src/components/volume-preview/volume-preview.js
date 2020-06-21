import React from 'react';
import {
    Card,
    CardBody,
    CardTitle,
    Container,
    Row,
    Col
} from 'reactstrap';
import {
    Link
} from "react-router-dom";

export default function VolumePreview(props) {   
    const volumeTitle = props.volumeResponse.volumeInfo.title;   
    const volumeDescription = props.volumeResponse.volumeInfo.description;
    const volumeAuthors = props.volumeResponse.volumeInfo.authors;    
    const imageLinks = props.volumeResponse.volumeInfo.imageLinks;
    const volumeThumbnail = imageLinks? imageLinks.thumbnail : null;
    console.log(props);

    function handlePriceSearchAPICall() {        
        props.handlePriceSearchAPICall(props.volumeResponse);
    }  

        return (
            <div>
                <Link 
                to={{
                    pathname: "/volume",
                    state: {
                        volumeResponse: props.volumeResponse
                    }
                }}
                onClick={handlePriceSearchAPICall} >
                    <Container fluid>
                        <Row >
                            <Col sm="12" md={{ size: 3, offset: 3 }}>
                                {volumeThumbnail ? <img src={volumeThumbnail} alt={`${volumeTitle} by authors ${volumeThumbnail}`} /> : null}
                            </Col>
                            <Col sm="12" md={{ size: 3}}>
                                <Card>
                                    <CardBody>
                                        <CardTitle>{volumeTitle} - {volumeAuthors}</CardTitle>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </Link>
                
            </div>
        );
}