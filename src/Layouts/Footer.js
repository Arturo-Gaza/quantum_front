import Typography from '@mui/material/Typography';
import React from "react";

const Footer = () => {
    return (

        <Typography variant='body2' color='textSecondary' align='center'>
            {'© 2024 - Quantum S.C.'}
            {/* <Link href='#'> SIAC 2024 </Link> */}
            {new Date().getFullYear()}
        </Typography>

    )
};

export default Footer;