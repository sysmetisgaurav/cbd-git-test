// LoaderContext.js
import React, { createContext, useState, useContext } from 'react';
import loader from './assets/images/ZKZg.gif';
const LoaderContext = createContext(true);

const LoaderProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoader = () => {
    console.log("show Loader");
    setIsLoading(true);
  }
  const hideLoader = () => {
    console.log("hide Loader");
    setIsLoading(false);}

    const isLoaderLoading = () => {
     // console.log(">>>>> value ",isLoading);
      if (isLoading == true){
        return <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 '>
          <img src={loader} height={100} width={100}></img>
        </div>
      }
    }

  return (
    <LoaderContext.Provider value={{ isLoading, showLoader, hideLoader }}>
      {isLoaderLoading()}
      {children}
    </LoaderContext.Provider>
  );
};

const useLoader = () => {
    return useContext(LoaderContext);
  };
export { LoaderProvider, useLoader };
  