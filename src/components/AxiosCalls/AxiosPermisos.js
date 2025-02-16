import axios from "axios";

export async function AxiosPermisos() {
    try {
        axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        axios.defaults.withCredentials = true;
        axios.defaults.headers.common['Accept'] = 'application/json';
        axios.defaults.headers.common['Content-Type'] = 'application/json';
        axios.defaults.withXSRFToken = true


        await axios
            .get('http://localhost:8000/sanctum/csrf-cookie')
            .then().catch(error => {
                throw error
            })

    } catch (error) {
        console.error(error);
        // Expected output: ReferenceError: nonExistentFunction is not defined
        // (Note: the exact output may be browser-dependent)
        
    }

}