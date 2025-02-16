import axios from "axios";

let configData = null;

const loadConfig = async () => {
  if (!configData) {
    try {
      const response = await axios.get("/assets/config.json");
      configData = response.data;
    } catch (error) {
      console.error("Error cargando la configuración:", error);
    }
  }
  return configData;
};

const getBaseUrl = async () => {
  const config = await loadConfig();
  return config?.BASE_URL || "http://localhost:8000/api"; // Valor por defecto
};

// Obtener token de sesión
const getToken = () => sessionStorage.getItem("token");

const responseBody = (response) => response.data;

// Definir las peticiones HTTP
const requests = {
  post: (url, body, id = "") => {
    return getBaseUrl().then((baseUrl) => {
      const token = getToken();
      if (!token) {
        return Promise.reject(new Error("No token found. Please log in."));
      }

      return axios
        .post(`${baseUrl}/${url}${id ? `/${id}` : ""}`, body, {
          headers: { "Authorization": `Bearer ${token}` },
        })
        .then(responseBody)
        .catch((error) => {
          throw error.response || error;
        });
    });
  },

  get: (url, id = "") => {
    return getBaseUrl().then((baseUrl) => {
      return axios
        .get(!id ? `${baseUrl}/${url}` : `${baseUrl}/${url}/${id}`)
        .then(responseBody)
        .catch((error) => {
          throw error;
        });
    });
  },
};

export { getBaseUrl };
export default requests;
