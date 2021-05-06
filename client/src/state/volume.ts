import { observable, action } from 'mobx';
import { VolumeInfo } from '../interfaces/volume';
import { parseVolumeInformationForIdentifiers } from '../utilities/volumeDataParsing';
import { RootStore } from './root';

export class VolumeStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable
    volumeInfo: VolumeInfo | undefined = undefined;    

    @observable
    volumePriceData: any = undefined;

    @observable
    loading: boolean = false;

    @action
    setVolume(volumeInfoUpdated: VolumeInfo) { 
        this.setLoading(true);
        this.volumeInfo = {...volumeInfoUpdated,};
        this.setLoading(false);
    }
   
    @action
    async fetchPriceData() {
        console.log('fetching price data');
        this.setLoading(true);
        try {            
            const identifiers = parseVolumeInformationForIdentifiers(this.volumeInfo);
            const response = await fetch('/api/priceSearch', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ post: identifiers }),
            });
            const body = await response.text();
            console.log(body);
            this.volumePriceData = body;           
        } catch (error) {
            console.error(error);
        }
        this.setLoading(false);        
    }

    @action
    setLoading(loadingState: boolean) {
        this.loading = loadingState;
    }

    @action
    clearVolume() {
        this.volumeInfo = undefined;
    }
}