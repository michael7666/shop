import {configureStore, combineReducers} from "@reduxjs/toolkit";
import cartReducer from "./cart/cartRedux";
import userReduce from "./user/userReduce";
import {persistStore, persistReducer, REHYDRATE,FLUSH,PURGE, PAUSE, REGISTER,PERSIST } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
  }

  const rootReducer = combineReducers({
      user: userReduce,
      cart: cartReducer
    
    })

  const persistedReducer = persistReducer(persistConfig, rootReducer)

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