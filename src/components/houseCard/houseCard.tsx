import React from 'react';
import { observer } from 'mobx-react';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { HouseType } from '../type';
import HousesStore from '../../stores/housesStore';

import './houseCard.scss'

type PropsHomeType = {
  house:HouseType
}

const addFavorites = (house:HouseType) =>{
  HousesStore.addFavorites(house);
}

const HouseCard: React.FC<PropsHomeType> = ({house}:PropsHomeType) => {

  HousesStore.checkHouseFavorites(house) && HousesStore.checkingSavedHouse(house.name);

    return(
        <Card className='cardHouse'>
            <CardHeader 
            title={house.name}
            subheader={"Region: "+ house.region + (house.words && ". Word: "+house.words)}
            action={
            <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="baseline"
            >
            {house.check==="not_ok"&&<PriorityHighIcon />}
            <IconButton aria-label="add to favorites"
            onClick={()=>addFavorites(house)}>
            {HousesStore.checkHouseFavorites(house) ? (<FavoriteIcon />
            ):(
            <FavoriteBorderIcon />)}
          </IconButton>
          </Stack>}
            />
<CardContent>
{ (house.coatOfArms)&&(<Typography sx={{ fontSize: 12 }} color="text.secondary">
{"Description of the coat of arms: " + house.coatOfArms}
</Typography>)}
<br />
<div className='Titles_Seats'>
{house.titles[0]!=='' && <div>
Titles:
<ul>
{house.titles.map(title=>{
  return (
    <li key={title}>{title}</li>
  )
})}
</ul>
</div>
}
{house.seats[0]!=='' && <div>
Seats:
<ul>
{house.seats.map(seat=>{
  return (
    <li key={seat}>{seat}</li>
  )
})}
</ul>
</div>
}
</div>
</CardContent>
        </Card>
    )
}

export default observer(HouseCard)