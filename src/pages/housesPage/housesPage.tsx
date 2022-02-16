import React from 'react';
import { observer } from 'mobx-react';

import LinearProgress from '@mui/material/LinearProgress';
import Pagination from '@mui/material/Pagination';

import '..//page.scss'

import HouseCard from '../../components/houseCard/houseCard';
import HousesStore from '../../stores/housesStore';
import { HouseType } from '../../components/type'

const handlerChangePage = (_event:unknown, page:number) => {
  HousesStore.changePage(page);
}

const HousesPage:React.FC = () => {

  return (
    <>
    {HousesStore.loading && <LinearProgress color="inherit"/>}
  <div className="housesPage">
      {HousesStore.loadedHouses && HousesStore.loadedHouses.map((house:HouseType) => {
            return (
              <div key={house.name}>
              <HouseCard house={house}></HouseCard>
              </div>
            )
          }
            )}
    </div>
    {!HousesStore.loading && <div className='pagination'>
    <Pagination count={HousesStore.lastPage}
    page={HousesStore.page}
    onChange={handlerChangePage}
    variant="outlined"
    color="secondary" />
    </div>}
    </>
  );
}

export default observer(HousesPage)