import axios from "axios";
import { AxiosPermisos } from '../../components/AxiosCalls/AxiosPermisos';

let getBaseUrl;

const loadConfig = async () => {
  try {
    const response = await axios.get("../../../assets/config.json");
    getBaseUrl = response.data.BASE_URL;
    AxiosPermisos();
  } catch (error) {
    console.error("Error cargando la configuración:", error);
  }
};

loadConfig();

const getToken = () => sessionStorage.getItem("token");

const responseBody = (response) => response.data;  // Asumiendo que quieres los datos

const requests = {
    post: (url, body, id = "") => {
        const token = getToken(); // Obtener el token desde sessionStorage
        if (!token) {
            // Si no hay token, lanzar un error o devolver un mensaje
            return Promise.reject(new Error("No token found. Please log in."));
        }
    
        return axios
            .post(`${getBaseUrl}/${url}${id ? `/${id}` : ""}`, body, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            })
            .then(responseBody)
            .catch(error => {
                throw error.response || error;
            });
    },
    
  get: (url, id = "") =>
    axios
      .get(!id ? url : `${url}/${id}`, { baseURL: getBaseUrl })
      .then(responseBody)
      .catch(error => { throw error; }),

  // Agregar otros métodos según sea necesario
};

export default requests;
