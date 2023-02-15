import { createSlice } from  '@reduxjs/toolkit';

interface CarState{
    make: string,
    model: string,
    model_year: string,
    type_: string,
    price: number,
    horsepower: string,
    license: string,
}

const initialState: CarState = {
    make: '',
    model: '',
    model_year: '1999',
    type_: '',
    price: 0,
    horsepower: '0',
    license: ''
}

const rootSlice = createSlice({
    name: 'root',
    initialState,
    reducers: {
        chooseMake: (state, action) => { state.make = action.payload },
        chooseModel: (state, action) => { state.model = action.payload },
        chooseModelYear: (state, action) => { state.model_year = action.payload },
        chooseType_: (state, action) => { state.type_ = action.payload },
        choosePrice: (state, action) => { state.price = action.payload },
        chooseHorsepower: (state, action) => { state.horsepower = action.payload },
        chooseLicense: (state, action) => { state.license = action.payload },
    }
})


//Export Reducer
export const reducer = rootSlice.reducer

export const {
    chooseMake,
    chooseModel,
    chooseModelYear,
    chooseType_,
    choosePrice,
    chooseHorsepower,
    chooseLicense,
} = rootSlice.actions;
