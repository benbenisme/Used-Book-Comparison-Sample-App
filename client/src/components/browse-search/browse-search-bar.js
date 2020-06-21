import React, { useState } from 'react';
import { fade, makeStyles, } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
}));

export default function BrowseSearchBar({props, onSearch}) {
    const classes = useStyles();
    const [searchTerms, setSearchTerms] = useState('');    

    function handleSearch() {
      onSearch(searchTerms);
    }

    return (
      <div className={classes.search}>
      <div className={classes.searchIcon}>              
      </div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
        onChange={(e) => setSearchTerms(e.target.value)}/>
      <SearchIcon />
      <Button onClick={handleSearch}>Search</Button>
    </div>
    );      
}