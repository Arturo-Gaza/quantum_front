import { TableCell, TableRow } from '@mui/material';
import { styled } from '@mui/system';

// Estilo para celdas
export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold', 
  color: '#333',
  padding: '8px',
  textAlign: 'center',
}));

// Estilo para filas
export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: '#f5f5f5', 
  },
}));