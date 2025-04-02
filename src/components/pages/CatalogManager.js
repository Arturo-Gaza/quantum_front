//Gestiona los catálogos de datos de manera genérica y permite mostrar, agregar y editar registros.
import React, { useState, useEffect } from 'react';
import CatalogTable from '../CatalogTable';
import CatalogForm from '../CatalogForm';
import Modal from '../Modal';
import { getAllData, createRecord } from '../services/apiServices';
import { Grid} from '@mui/material';
import { Snackbar, Alert } from '@mui/material';



const CatalogManager = ({ catalogName, fields }) => {
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');



    useEffect(() => {
        const loadData = async () => {
            const response = await getAllData(catalogName);
            setData(response);
        };
        loadData();
    }, [catalogName]);

    const handleAdd = () => {
        setEditingItem(null);
        setIsModalOpen(true);
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setIsModalOpen(true);
    };

    const handleFormSubmit = async (formData) => {
        console.log("Campos a llenar", formData);
        try {
            let response;
            if (editingItem) {
                // Editar registro existente
                // response = await updateRecord(catalogName, editingItem.id, formData);
            } else {
                // Crear nuevo registro
                response = await createRecord(formData, catalogName);
                console.log("esto son los datos", formData);
            }

            if (response && response.message) {
                setSuccessMessage(response.message); // Guardamos el mensaje
            }

            // Cerrar modal y recargar datos
            setIsModalOpen(false);
            const updatedData = await getAllData(catalogName);
            setData(updatedData);
        } catch (error) {
            console.error('Error al guardar los datos:', error.response ? error.response.data : error.message);
        }
    };

    return (

        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: '1%' }}>
            <Grid container spacing={2} alignItems="end" justifyContent="center" sx={{ padding: '1%', textAlign: 'center' }}>
                <Grid item xs={12}>
                    <h1>{catalogName}</h1>
                </Grid>
                <Snackbar
                    open={!!successMessage} // Se abre si hay mensaje
                    autoHideDuration={3000} // Se oculta en 3 segundos
                    onClose={() => setSuccessMessage('')}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <Alert severity="success" onClose={() => setSuccessMessage('')}>
                        {successMessage}
                    </Alert>
                </Snackbar>
            </Grid>

            <Grid container spacing={2} alignItems="end" justifyContent="end" sx={{ padding: '1%', textAlign: 'center' }}>
                <button onClick={handleAdd}>Agregar Nuevo</button>
            </Grid>

            {/* Ajustamos CatalogTable para que se adapte al contenedor */}
            <div style={{ flexGrow: 1, overflow: 'auto' }}>
                <CatalogTable data={data} fields={fields} onEdit={handleEdit} />
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <CatalogForm
                    fields={fields}
                    initialData={editingItem}
                    onSubmit={handleFormSubmit}
                    onClose={() => setIsModalOpen(false)}
                />
            </Modal>
        </div>
    );
};
export default CatalogManager;