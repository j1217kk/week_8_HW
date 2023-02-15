import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridColumnHeaderParams, GridValueGetterParams, GridSelectionModel } from '@mui/x-data-grid';
import { serverCalls } from '../../api'
import { useGetData } from '../../custom-hooks'
import {
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    DialogActions
} from '@mui/material';
import { CarForm } from '../CarForm';


interface GridData{
    data:{
        id?:string
    }
}


const columns: GridColDef[] = [
    { field: 'id',  width: 90, renderHeader: (params: GridColumnHeaderParams) => (
        <h3>
        <strong>
            {'ID'}
        </strong>
        </h3>
    ), },
    {
        field: 'make',
        width: 150,
        editable: true,
        renderHeader: (params: GridColumnHeaderParams) => (
            <h3>
            <strong>
                {'Make'}
            </strong>
            </h3>
        ),
    },
    {
        field: 'model',
        width: 150,
        editable: true,
        renderHeader: (params: GridColumnHeaderParams) => (
            <h3>
            <strong>
                {'Model'}
            </strong>
            </h3>
        ),
    },
    {
        field: 'model_year',
        type: 'string',
        width: 150,
        editable: true,
        renderHeader: (params: GridColumnHeaderParams) => (
            <h3>
            <strong>
                {'Year'}
            </strong>
            </h3>
        ),
    },
    {
        field: 'type_',
        type: 'string',
        width: 150,
        editable: true,
        renderHeader: (params: GridColumnHeaderParams) => (
            <h3>
            <strong>
                {'Car Type'}
            </strong>
            </h3>
        ),
    },
    {
        field: 'price',
        type: 'number',
        width: 150,
        editable: true,
        renderHeader: (params: GridColumnHeaderParams) => (
            <h3>
            <strong>
                {'Price'}
            </strong>
            </h3>
        ),
    },
    {
        field: 'horsepower',
        type: 'string',
        width: 150,
        editable: true,
        renderHeader: (params: GridColumnHeaderParams) => (
            <h3>
            <strong>
                {'Horsepower'}
            </strong>
            </h3>
        ),
    },
    {
        field: 'license',
        type: 'string',
        width: 150,
        editable: true,
        renderHeader: (params: GridColumnHeaderParams) => (
            <h3>
            <strong>
                {'License'}
            </strong>
            </h3>
        ),
    },
];

const rows = [
    { id: 1, model_year: '1981', make: 'DMC', model: 'DeLorean', type_: 'Coupe', price: 30000, horsepower: '330', license: 'BK2DAFT' },
];

export const DataTable = () => {
    let { carData, getData } = useGetData();
    let [open, setOpen] = useState(false);
    let [gridData, setData] = useState<GridSelectionModel>([])
    let handleOpen = () => {
        setOpen(true)
    }
    let handleClose = () => {
        setOpen(false)
    }

    let deleteData = () => {
        serverCalls.delete(`${gridData[0]}`)
        getData()
    }
    console.log(gridData)
    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <h2>Cars In Inventory</h2>
            <DataGrid
            rows={carData}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5]}
            checkboxSelection
            onSelectionModelChange = {(newSelectionModel) => {setData(newSelectionModel)}}
            {...carData}
            />
            <Button onClick={handleOpen}>Update</Button>
            <Button variant="contained" color="secondary" onClick={deleteData}>Delete</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Update a Car</DialogTitle>
                <DialogContent>
                    <DialogContentText>Car ID: {gridData[0]}</DialogContentText>
                    <CarForm id={`${gridData[0]}`}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">Cancel</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}


