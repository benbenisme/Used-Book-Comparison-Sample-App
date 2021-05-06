import React from 'react';
import ReactDOM from 'react-dom';
import VolumePreview from "../VolumePreview";
import { BrowserRouter as Router } from "react-router-dom";
import { render, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";

const exampleProps = {
    volumeResponse: {
        volumeInfo: {
            title: "test title",
            description: "test description",
            authors: "test author",
            imageLinks: {
            }
        }
    }
}

afterEach(cleanup);

it("renders without crashing", () => {
    const div = document.createElement('div');
    ReactDOM.render(<Router><VolumePreview {...exampleProps} /></Router>, div);
    ReactDOM.unmountComponentAtNode(div);
});

test("renders volume preview corectly", () => {
    const { getByTestId } = render(<Router><VolumePreview {...exampleProps} /></Router>);
    getByTestId("volumePreview");
});

test("renders volume preview title corectly", () => {
    const { getByTestId } = render(<Router><VolumePreview {...exampleProps} /></Router>);
    expect(getByTestId('volumePreviewTitle')).toHaveTextContent(`${exampleProps.volumeResponse.volumeInfo.title}`);
});

test("renders volume preview authors corectly", () => {
    const { getByTestId } = render(<Router><VolumePreview {...exampleProps} /></Router>);
    expect(getByTestId('volumePreviewAuthors')).toHaveTextContent(`${exampleProps.volumeResponse.volumeInfo.authors}`);
});

test("renders volume preview dewcription corectly", () => {
    const { getByTestId } = render(<Router><VolumePreview {...exampleProps} /></Router>);
    expect(getByTestId('volumePreviewDescription')).toHaveTextContent(`${exampleProps.volumeResponse.volumeInfo.description}`);
});

it("matches snapshot", () => {
    const tree = renderer.create(<Router><VolumePreview {...exampleProps} /></Router>).toJSON();
    expect(tree).toMatchSnapshot();
})