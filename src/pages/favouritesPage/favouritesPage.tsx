import React from 'react';
import { observer } from 'mobx-react';

import HouseCard from '../../components/houseCard/houseCard';
import HousesStore from '../../stores/housesStore';
import { HouseType } from '../../components/type'

import LinearProgress from '@mui/material/LinearProgress';

const FavouritesPage:React.FC = () => {

    return (
        <>
        {HousesStore.loading && <LinearProgress color="inherit"/>}
      <div className="housesPage">
    
          {HousesStore.loadedHouses && HousesStore.favoritesHouses.map((house:HouseType) => {
            
                return (
                  <div key={house.name}>
                  <HouseCard house={house}></HouseCard>
                  </div>
                )
              }
                )}
        </div>
        </>
      );
    }


export default observer(FavouritesPage)