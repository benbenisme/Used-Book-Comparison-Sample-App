import React from "react";
import { RootStore } from './root';

const storeContext = React.createContext(new RootStore());

export const useStores = () => React.useContext(storeContext); 