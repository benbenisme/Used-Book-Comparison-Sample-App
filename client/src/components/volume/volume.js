import React from 'react';
import {
    Card,
    CardBody,
    CardTitle,
    CardText,
    Button,
    Jumbotron,
    Container,
    Row,
    Col
} from 'reactstrap';

export default function VolumePreview(props) {
    const volumeTitle = props.props.volumeResponse.volumeInfo.title;    
    const volumeAuthors = props.props.volumeResponse.volumeInfo.authors;         
    const volumeDescription = props.props.volumeResponse.volumeInfo.description;
        return (
            <div>
                <Jumbotron>
                    <h1 className="display-3">{volumeTitle}</h1>
                    <p className="lead">{volumeAuthors}</p>
                    <p className="lead">{volumeDescription}</p>
                </Jumbotron>
            </div>
        );
}