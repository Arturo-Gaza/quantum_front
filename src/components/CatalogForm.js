import React, { useState, useEffect } from 'react';
import {
    Autocomplete,
    Box,
    Button,
    Checkbox,
    FormControlLabel
} from "@mui/material";

const CatalogForm = ({ fields, onClose, onSubmit, initialData }) => {
    const [formData, setFormData] = useState(initialData || {});

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        const fieldValue = type === 'checkbox' ? checked : value;  // Utiliza 'checked' directamente para booleanos
        setFormData({ ...formData, [name]: fieldValue });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Formulario enviado con los datos:", formData); // Verifica los datos antes de enviarlos

        // Asegúrate de enviar los datos correctamente
        const dataToSend = {
            ...formData,
        };

        // Si "habilitado" es un booleano, asegúrate de que esté correcto
        if (dataToSend.habilitado === true || dataToSend.habilitado === false) {
            // Enviar los datos directamente al servidor (sin envoltorios innecesarios)
            onSubmit(dataToSend);
        } else {
            console.error("El campo habilitado debe ser un valor booleano.");
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                backgroundColor: "#f9f9f9",
                '& > *': {
                    marginBottom: 5, // Espaciado uniforme entre elementos
                },
                '& > *:last-child': {
                    marginBottom: 0, // Elimina el margen del último elemento
                },
            }}
        >
            {fields
                .filter(field => field.form === true) // Solo los campos que deben aparecer en el formulario
                .map((field) => (
                    <div key={field.name}>
                        <label>{field.label}</label>
                        {field.type === 'textarea' ? (
                            <textarea
                                name={field.name}
                                value={formData[field.name] || ''}
                                onChange={handleChange}
                            />
                        ) : field.type === 'checkbox' ? (
                            <input
                                type="checkbox"
                                name={field.name}
                                checked={!!formData[field.name]} // Siempre booleano
                                onChange={handleChange}
                            />
                        ) : (
                            <input
                                type={field.type}
                                name={field.name}
                                value={formData[field.name] || ''}
                                onChange={handleChange}
                            />
                        )}
                    </div>
                ))}
            <button type="submit">Guardar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
        </Box>
    );
};

export default CatalogForm;
