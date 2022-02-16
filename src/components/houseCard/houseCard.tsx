import React from 'react';
import { observer } from 'mobx-react';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { HouseType } from '../type';
import HousesStore from '../../stores/housesStore';

type PropsHomeType = {
  house:HouseType
}

const addFavorites = (house:HouseType) =>{
  HousesStore.addFavorites(house);

}

const HouseCard: React.FC<PropsHomeType> = ({house}:PropsHomeType) => {

    return(

        <Card>
            <CardHeader 
            title={house.name}
            subheader={"Region: "+ house.region + (house.words && ". Word: "+house.words)}

            action={<IconButton aria-label="add to favorites"
            onClick={()=>addFavorites(house)}
            >
            {HousesStore.checkHouseFavorites(house) ? (<>
            <FavoriteIcon />
            {HousesStore.checkingSavedHouse(house.url, house.name) ? <PriorityHighIcon />: <PriorityHighIcon />}
            </>
            )
            :(
            <FavoriteBorderIcon />)}
          </IconButton>}
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