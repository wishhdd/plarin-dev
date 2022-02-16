import axios from "axios";
import {runInAction, makeAutoObservable, autorun } from "mobx";

import { HouseType } from "../components/type";

class HousesStore {
    loading: boolean = true;
    page: number = 1;
    lastPage:number = 0;
    loadedHouses:HouseType[] | undefined;
    favoritesHouses:HouseType[] = [];
    constructor(){makeAutoObservable(this)
        autorun(() => {
            this.loadFavorites();
            this.loadHouses(0);
        })
    }

        async loadHouses(page = 1) {
            this.loading = true;
            const response =  await axios.get("https://www.anapioficeandfire.com/api/houses", {
                params: {
                    "page":page,
                    "pageSize":"12"
                },
            });
            runInAction(() => {
                this.lastPage = this.searchByParameterInURL(response.headers.link, "last");
                this.loadedHouses = response.data;
                this.loading = false;
            })
        }

        async checkingSavedHouse(name:string ) {
            let index:number = this.favoritesHouses.findIndex(fh=> name === fh.name)
            const response =  await axios.get(this.favoritesHouses[index].url);
            runInAction(() => {
                if (response.status !== 200 || response.data.name !== name){
                    this.favoritesHouses[index].check='not_ok'
                }
            })
        }

        searchByParameterInURL(responseLink:string, parameter:string){
            const splitLink = responseLink.split(",")
            const indexLast = splitLink.findIndex(last => last.includes(parameter))
            const url = new URL(splitLink[indexLast].split(';')[0].replace('<',"").replace('>',""));
            let lastPage = url.searchParams.get('page');
            if (lastPage !== null
                && !isNaN(parseFloat(lastPage))
                && isFinite(parseFloat(lastPage))
                && typeof lastPage !== 'undefined') {
                    return +lastPage
                }
            return 0
        }

        changePage (page:number){
            this.page = page;
            this.loadHouses(page);
        }

        addFavorites (house:HouseType){
                if (this.checkHouseFavorites(house)){
                    let index:number = this.favoritesHouses.findIndex(fh => house.name === fh.name)
                    this.favoritesHouses.splice(index, 1);
                }
                else{
                    this.favoritesHouses.push(house)
                }
                this.saveFavorites();
            
        }

        loadFavorites(){
        if (localStorage['GoTFavorites']) {
            this.favoritesHouses = JSON.parse(localStorage['GoTFavorites']);
            }
        }
        
        saveFavorites(){
            localStorage["GoTFavorites"] = JSON.stringify(this.favoritesHouses);
        }

        checkHouseFavorites(checkHouse:HouseType){
            let check = this.favoritesHouses.find(house => house.name === checkHouse.name)?.name
            if (typeof  check?.length  === 'undefined')
            {
            return false
            }
            return check?.length>0
        }
    }

export default new HousesStore();