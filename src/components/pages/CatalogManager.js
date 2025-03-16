//Gestiona los catálogos de datos de manera genérica y permite mostrar, agregar y editar registros.
import React, { useState, useEffect } from 'react';
import CatalogTable from '../CatalogTable';
import CatalogForm from '../CatalogForm';
import Modal from '../Modal';
import { getAllData, createRecord } from '../services/apiServices';
import { Box, FormControl, Grid, IconButton, Pagination, Tooltip } from '@mui/material';


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
            if (editingItem) {
                // Editar registro existente
                //await updateRecord(catalogName, editingItem.id, formData);
            } else {
                // Crear nuevo registro
                await createRecord(formData);
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
        <div style={{ width: '100%', padding: '1%' }}>
            <Grid container spacing={2} alignItems="end" justifyContent="center" sx={{ padding: '1%', textAlign: 'center' }}>
                <Grid item xs={12}>
                    <h1>{catalogName}</h1>
                </Grid>
            </Grid>
            <Grid container spacing={2} alignItems="end" justifyContent="end" sx={{ padding: '1%', textAlign: 'center' }}>
                <button onClick={handleAdd}>Agregar Nuevo</button>
            </Grid>


            <CatalogTable data={data} fields={fields} onEdit={handleEdit} />
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