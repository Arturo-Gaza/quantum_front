import axios from 'axios';
import { ROLES_GETALL, ROLES_CREATE } from '../../Constants/ApiConstants';

export const getAllData = async (catalogName) => {
    try {
        let response;

        switch (catalogName) {
            case "Roles":
                response = await axios.get(ROLES_GETALL);
                break;
            case "Usuarios":
                response = await axios.get();
            // Aquí podrías añadir más casos si es necesario para otros catálogos, por ejemplo:
            // case "Departamentos":
            //     response = await axios.get(DEPARTAMENTO_GETALL);
            //     break;

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


export const createRecord = async (data) => {
    try {
        const response = await axios.post(ROLES_CREATE, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};
