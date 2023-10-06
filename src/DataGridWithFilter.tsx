import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

const apiUrl = 'https://localhost:7234/api/books'; // Replace with your API URL

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'author', headerName: 'Author', width: 100 },
    { field: 'country', headerName: 'Country', width: 100 },
    { field: 'imageLink', headerName: 'ImageLink', width: 100 },
    { field: 'language', headerName: 'Language', width: 200 },
    { field: 'link', headerName: 'Link', width: 300 },
    { field: 'title', headerName: 'Title', width: 300 },
];

const DataGridWithFilter: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [filterText, setFilterText] = useState<string>('');

    useEffect(() => {
        axios
            .get(apiUrl)
            .then((response) => {
                setData(response.data.books);
                setFilteredData(response.data.books);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const text = event.target.value;
        setFilterText(text);

        if (Array.isArray(data)) {
            const filtered = data.filter((item) =>
                item.title.toLowerCase().includes(text.toLowerCase())
            );

            setFilteredData(filtered);
        }
        else {
            console.log("Data is not an array");
        }

        
    };

    return (
        <div>
            <TextField
                label="Filter"
                value={filterText}
                onChange={handleFilterChange}
                fullWidth
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={filteredData}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    autoHeight
                    disableColumnFilter
                    disableColumnMenu
                    checkboxSelection
                    components={{
                        Toolbar: GridToolbar,
                    }}
                />
            </div>
        </div>
    );
};

export default DataGridWithFilter;
