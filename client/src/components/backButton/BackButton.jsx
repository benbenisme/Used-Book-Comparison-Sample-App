import React from 'react';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const BackButton = ({ history }) => <Button onClick={() => history.goBack()}>Back</Button>;

export default withRouter(BackButton);