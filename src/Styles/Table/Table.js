import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useUserContenidoContext } from '../../hooks/UserConteProvider';
//:::::::::::::::::::::: UserConteProvider :::::::::::::::::::::::
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
export const StyledTableCell = styled(TableCell)(({ theme }) => {
    const userhooks = useUserContenidoContext();
    return {
        [`&.${tableCellClasses.head}`]: {
            //backgroundColor: user.ColorTable,
            backgroundColor: '##cacfd2',
            color: 'White',
            fontWeight: 'bold',
            fontSize: window.screen.width <= 600 ? 8 : 13,
            height: 2,
            padding: 8,
            width: -1,
        },
        [`&.${tableCellClasses.body}`]: {
            color: 'black',
            padding: window.screen.width <= 400 ? 13 : 0,
            fontSize: window.screen.width <= 600 ? 8 : 15,
            height: -1,
        },
    }
})

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:hover': {
        backgroundColor: '#367AF6', // Color claro para la fila cuando se pasa el mouse
        cursor: 'pointer',           // Cambia el cursor al pasar sobre la fila
    },
    display: 'table-row', // Asegura que la fila ocupe toda el área de la tabla
    width: '100%',        // Asegura que la fila ocupe todo el ancho disponible
}));