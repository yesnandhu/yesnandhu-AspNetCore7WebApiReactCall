import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

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

const DataGridExample: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        setData(response.data.books);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid
                rows={data}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                pageSizeOptions={[10]}
                checkboxSelection
                disableRowSelectionOnClick
            />
    </div>
  );
};

export default DataGridExample;
