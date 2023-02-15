import React from 'react'
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridColumnHeaderParams, GridValueGetterParams } from '@mui/x-data-grid';

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
        field: 'year',
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
        field: 'fullCar',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 320,
        valueGetter: (params: GridValueGetterParams) =>
        `${params.row.year || ''} ${params.row.make || ''} ${params.row.model || ''}`,
        renderHeader: (params: GridColumnHeaderParams) => (
            <h3>
            <strong>
                {'Complete Car'}
            </strong>
            </h3>
        ),
    },
];

const rows = [
    { id: 1, year: '1981', make: 'DMC', model: 'DeLorean' },
    { id: 2, year: '2001', make: 'Honda', model: 'Accord' },
    { id: 3, year: '2013', make: 'Hyundai', model: 'Gen Coupe 3.8L' },
    { id: 4, year: '2022', make: 'Ford', model: 'Tundra' },
    { id: 5, year: '2020', make: 'Ferrari', model: 'Speciale' },
    { id: 6, year: '2016', make: 'Jeep', model: 'Cherokee' },
    { id: 7, year: '2010', make: 'Lamborghini', model: 'Aventador' },
    { id: 8, year: '2018', make: 'Lamborghini', model: 'Urus' },
    { id: 9, year: '2015', make: 'McLaren', model: 'P2' },
];

export const DataTable = () => {
    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
            />
        </Box>
    )
}


