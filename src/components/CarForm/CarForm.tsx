import React from 'react';
import { useDispatch, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { chooseMake, chooseModel, chooseModelYear, chooseType_, choosePrice, chooseHorsepower, chooseLicense } from '../../redux/slices/rootSlice';
import { Input } from '../sharedComponents/Input';
import { serverCalls } from '../../api';
import { useGetData } from '../../custom-hooks';


interface CarFormProps {
    id?:string,
    data?:{}
}

export const CarForm = (props:CarFormProps) => {
    const dispatch = useDispatch()
    let { carData, getData } = useGetData();
    const store = useStore()
    const { register, handleSubmit } = useForm({});

    const onSubmit = async (data:any, event:any) =>{
        console.log(props.id)
        
        if ( props.id! ){ 
            await serverCalls.update(props.id, data)
            console.log(`Updated: ${data} ${props.id}`)
            window.location.reload()
            event.target.reset();
        }else {
            dispatch(chooseMake(data.make))
            dispatch(chooseModel(data.model))
            dispatch(chooseModelYear(data.model_year))
            dispatch(chooseType_(data.type_))
            dispatch(choosePrice(data.price))
            dispatch(chooseModelYear(data.model_year))
            dispatch(chooseHorsepower(data.horsepower))
            dispatch(chooseLicense(data.license))
            console.log(store.getState())
            await serverCalls.create(store.getState())
            window.location.reload()

        }
    }
    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="make">Make</label>
                    <Input {...register('make')} name="make" placeholder="Make"/>
                </div>
                <div>
                    <label htmlFor="model">Model</label>
                    <Input {...register('model')} name="model" placeholder="Model"/>
                </div>
                <div>
                    <label htmlFor="model_year">Year</label>
                    <Input {...register('model_year')} name="model_year" placeholder="Model Year"/>
                </div>
                <div>
                    <label htmlFor="type_">Type</label>
                    <Input {...register('type_')} name="type_" placeholder="Car Type (ex: Sedan, Coupe, Truck, SUV)"/>
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <Input {...register('price')} name="price" placeholder="Price"/>
                </div>
                <div>
                    <label htmlFor="horsepower">Horsepower</label>
                    <Input {...register('horsepower')} name="horsepower" placeholder="Horsepower"/>
                </div>
                <div>
                    <label htmlFor="license">License Plate</label>
                    <Input {...register('license')} name="license" placeholder="License"/>
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>

    )
}