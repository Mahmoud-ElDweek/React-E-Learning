import { Box, Pagination } from '@mui/material';
import React, { useState } from 'react'

const Bagination = () => {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 15;
    const handlePageChange = (event, page) => {
        // console.log(page)
        setPage(page);
      };
    return (
        <>
            <Box mt={5} mb={4} display="flex" justifyContent="center">
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>
        </>
    )
}

export default Bagination