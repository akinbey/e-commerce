import React from 'react'
import Container from '@mui/material/Container';
const PageContainer = ({ children }) => {
    return (
        <Container maxWidth="xl">{children}</Container>
    )
}

export default PageContainer