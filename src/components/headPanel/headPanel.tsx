import React from 'react';
import { observer } from 'mobx-react';

import {Link, useLocation } from "react-router-dom";

import HousesStore from '../../stores/housesStore';

import './headPanel.scss';

import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';

import StyledBadge  from '@mui/material/Badge';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const HeadPanel: React.FC = () => {
    let location = useLocation();

    return(
        <>
<AppBar position="static" color="inherit">
    <Toolbar>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
        {(location.pathname === '/favourites') ? "Favorites Houses" : "Game of Thrones Houses"}
        </Typography>
        {(location.pathname === '/favourites') ?(
                            <Link to="/">
                                <IconButton aria-label="back to the houses">
                                    <ArrowBackIcon />
                                </IconButton>
                            </Link>
                        ) : (
                            HousesStore.favoritesHouses.length!==0 && (
                                <Link to="/favourites">
                                <IconButton aria-label="favorites">
                                <StyledBadge  badgeContent={HousesStore.favoritesHouses?.length} color="secondary">
                                    <FavoriteIcon />
                                </StyledBadge >
                                </IconButton>
                            </Link>
                            )
                )}
    </Toolbar>
</AppBar>
        </>
    )
    
}

export default observer(HeadPanel)
