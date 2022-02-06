import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Title() {
    return (
        <Box sx={{ width: '100%', maxWidth: 500 }}>
            <Typography variant="h2" gutterBottom component="div">
                Clients
            </Typography>
        </Box>
    );
}