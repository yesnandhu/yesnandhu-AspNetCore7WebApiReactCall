import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ReadData() {
    // State to store API data

    var totalPages: number;

    const [data, setData] = useState<any>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // Number of items per page


    // Effect to make the API call when the component mounts
    useEffect(() => {
        fetchData();

    }, [currentPage, itemsPerPage]);


    const handlePageChange = (newPage: number) => {
        console.log("totalPages  = " + totalPages)
        console.log("New Page  = " + newPage)
        // if (newPage >= 1 && newPage <= totalPages) {

        // }
        setCurrentPage(newPage);
        fetchData();
        console.log("CurrentPage  = " + currentPage)


    };


    // Function to make the API call
    const fetchData = () => {

        try {

            const apiUrl = 'https://localhost:7234/api/books?page=' + currentPage + '&limit=10';

            console.log(apiUrl);

            //const response = await fetch(apiUrl);
            // Replace with your API URL

            axios.get(apiUrl) // Replace with your API URL
                .then((response) => {
                    setData(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });


            //totalPages = data.paginationData.totalPages;
            const totalPages = Math.ceil(data.length / itemsPerPage);


        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            {data ? (
                <div>

                    <h1>Items List {data.paginationData.totalPages}   /  {data.paginationData.totalRecords}</h1>

                    
                    <nav>
                        <ul className="pagination">
                            {Array.from({ length: data.paginationData.totalPages }, (_, index) => (
                                <li
                                    key={index}
                                    className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() => handlePageChange(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>


                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>author</th>
                                <th>country</th>
                                <th>imageLink</th>
                                <th>language</th>
                                <th>link</th>
                                <th>pages</th>
                                <th>title</th>
                                <th>year</th>
                                <th>price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.books.map((item: any) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.author}</td>
                                        <td>{item.country}</td>
                                        <td>{item.imageLink}</td>
                                        <td>{item.language}</td>
                                        <td>{item.link}</td>
                                        <td>{item.pages}</td>
                                        <td>{item.title}</td>
                                        <td>{item.year}</td>
                                        <td>{item.price}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>

                    <nav>
                        <ul className="pagination">
                            {Array.from({ length: data.paginationData.totalPages }, (_, index) => (
                                <li
                                    key={index}
                                    className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() => handlePageChange(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>

                </div>


            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default ReadData;
