import React from 'react';
import {
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardText,
    Container,
    Row,
    Col
} from 'reactstrap';
import {
    Link
} from "react-router-dom";
import { useStores } from '../../state/index';
// import "./volumePreview.css"


export default function     VolumePreview(props) {
    const { volumeStore } = useStores();

    const volumeTitle = props.volumeResponse.volumeInfo.title;
    const volumeDescription = props.volumeResponse.volumeInfo.description?.substring(0, 200).concat("...") || "";
    const volumeAuthors = props.volumeResponse.volumeInfo.authors;
    const imageLinks = props.volumeResponse.volumeInfo.imageLinks;
    const volumeThumbnail = imageLinks ? imageLinks.thumbnail : "";

    const setVolumeInStore = () => {
        volumeStore.setVolume(props.volumeResponse);
    }

    return (
        <div data-testid="volumePreview" className="volumePreviewStyle">
            <Link
                to={{
                    pathname: "/browse/volume",
                }}
                onClick={setVolumeInStore}   
                style={{ textDecoration: 'none', color: "black" }}         
            >
                <Container fluid>
                    <Row >
                        <Col sm="12" md={{ size: 3, offset: 3 }} data-testid="volumePreviewThumbnail">
                            {volumeThumbnail ? <img src={volumeThumbnail} alt={`${volumeTitle} by authors ${volumeThumbnail}`} /> : null}
                        </Col>
                        <Col sm="12" md={{ size: 3 }}>
                            <Card>
                                <CardBody>
                                    <CardTitle data-testid="volumePreviewTitle">{volumeTitle}</CardTitle>
                                    <CardSubtitle tag="h6" className="mb-2 text-muted" data-testid="volumePreviewAuthors">{volumeAuthors}</CardSubtitle>
                                    <CardText data-testid="volumePreviewDescription">{volumeDescription}</CardText>
                                </CardBody> 
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </Link>

        </div>
    );
}