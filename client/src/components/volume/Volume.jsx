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
    Grid
} from '@material-ui/core';

const Volume = (props) => {
    const volumeTitle = props?.volumeInfo?.title || "";
    const volumeAuthors = props?.volumeInfo?.authors || "";
    const volumeDescription = props?.volumeInfo?.description || "";
    const volumeThumbnail = props?.volumeInfo?.imageLinks?.thumbnail || "";
    const volumePreviewLink = props?.volumeInfo?.previewLink || "";

    return (
        <Grid container justify="center" alignItems="center">
            <Grid item>
                <Container fluid>
                    <Row >
                        <Col sm="12" md={{ size: 3, offset: 3 }} data-testid="volumeThumbnail">
                            {volumeThumbnail ? <img src={volumeThumbnail} alt={`${volumeTitle} by authors ${volumeThumbnail}`} /> : null}
                        </Col>
                        <Col sm="12" md={{ size: 3 }}>
                            <Card>
                                <CardBody>
                                    <CardTitle data-testid="volumeTitle">{volumeTitle}</CardTitle>
                                    <CardSubtitle tag="h6" className="mb-2 text-muted" data-testid="volumeAuthors">{volumeAuthors}</CardSubtitle>
                                    <CardText data-testid="volumeDescription">{volumeDescription}</CardText>
                                    <a target="_blank" href={volumePreviewLink}>Preview Link</a>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </Grid>
        </Grid>
    );
}
export default Volume