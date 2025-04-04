import * as React from 'react';
import Navlist from '../../Layouts/Navlist';
import Footer from '../../Layouts/Footer';
import '../../Styles/EstilosGenerales.css';
import { Grid2, Paper } from "@mui/material";
import CatalogManager from '../../components/pages/CatalogManager';
import { CATEGORIAS } from '../../components/utils/formUtils';


const Categorias = () => {
    return (
        <div className="containerGeneral">
            <div className="content">
                <Navlist />
                <div style={{
                    textAlign: "center",
                    marginTop: "-3%",
                    border: "2px",
                    marginLeft: "20%",
                    paddingTop: '-10%'
                }}>
                </div>
                <Grid2 container component="main" sx={{ height: '94vh' }}
                    style={{
                        paddingTop: '1%',
                        marginTop: '-4%',
                        marginLeft: '1%'
                    }}>

                    {/*Panel central */}
                    <Grid2 container
                        component={Paper}
                        elevation={6}
                        square={false}
                        sx={{
                            width: '99%',
                            height: '90%',
                            borderRadius: "10px",
                            border: '2'
                        }}
                        style={{
                            paddingTop: '-5%',
                            marginTop: '2%',
                        }}  >

                        <CatalogManager catalogName="Categorias" fields={CATEGORIAS} />

                    </Grid2>
                </Grid2>
            </div>
            <Footer />
        </div>
    );
};

export default Categorias;