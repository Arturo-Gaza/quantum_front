import axios from 'axios';
import { ROLES_GETALL, ROLES_CREATE, USUARIO_GETALL, CATEGORIAS_GETALL, CATEGORIAS_CREATE } from '../../Constants/ApiConstants';

export const getAllData = async (catalogName) => {
    try {
        let response;

        switch (catalogName) {
            case "Roles":
                response = await axios.get(ROLES_GETALL);
                break;
            case "Usuarios":
                response = await axios.get(USUARIO_GETALL);
                break;
            case "Categorias":
                response = await axios.get(CATEGORIAS_GETALL);
                break;

            default:
                console.error('Catalogo no soportado');
                return []; // Retorna un array vacío si no es un caso reconocido
        }

        // Verifica si 'data' es un array
        if (Array.isArray(response.data.data)) {
            return response.data.data;  // Retorna el array de datos si es un array
        } else {
            console.error('La propiedad "data" no contiene un array:', response.data);
            return [];  // Retorna un array vacío si no es un array
        }
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        return [];  // Retorna un array vacío en caso de error
    }
};


export const createRecord = async (data, catalogName) => {
    try {
        let response;
            console.log("nombre del catalogo",catalogName);
        switch (catalogName) {
            case "Roles":
                response = await axios.post(ROLES_CREATE, data);
                break;
            case "Categorias":
                response = await axios.post(CATEGORIAS_CREATE, data);
                break;

            default:
                console.error('Catálogo no soportado');
                return null; // Retorna null si no es un caso reconocido
        }

        return response.data; // Retorna la respuesta del servidor
    } catch (error) {
        console.error('Error al crear el registro:', error.response?.data || error.message);
        return null; // Retorna null en caso de error
    }
};


