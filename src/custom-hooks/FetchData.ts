import React, { useState, useEffect } from 'react';
import { serverCalls } from '../api';

export const useGetData = () => {
    const [carData, setData] = useState<any>([]); //hook

    async function handleDataFetch(){
        const result = await serverCalls.get();
        setData(result)
    }

    //useEffect hook, which stores the data from teh function to render after page renders
    useEffect( () => {
        handleDataFetch();
    }, []) // stops it from continuously rendering

    return { carData, getData:handleDataFetch } //getData has a handleDataFetch type/function shape
}