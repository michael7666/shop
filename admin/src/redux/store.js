import {configureStore,combineReducers} from "@reduxjs/toolkit";
import userReduce from "./userRedux";
import productReduce from "./productRedux";
import usersReduce from "./usersRedux"
import {persistStore, persistReducer, REHYDRATE,FLUSH,PURGE, PAUSE, REGISTER,PERSIST } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
  }

  const rootReducer = combineReducers({
      user: userReduce,
      product: productReduce,
      users: usersReduce
    
    })

  const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store =  configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH,REHYDRATE,PURGE, PAUSE, REGISTER,PERSIST]
        },
        
      }),
});

  export const persistor = persistStore(store)