import React from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TableContainer from '@mui/material/TableContainer';
import '../Styles/TablaStyle.css';
import { StyledTableCell, StyledTableRow } from '../Styles/Table/Table';


/// Genera una tabla dinámica basada en los datos y la configuración de campos proporcionados a través de sus props.

import { Table, TableBody, TableHead, TableRow, Tooltip, IconButton } from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Padding } from '@mui/icons-material';

const CatalogTable = ({ data, fields, onEdit }) => {
    return (
        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <Table sx={{ minWidth: 80, width: '99%' }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {fields.filter(field => field.table === true).map((field) => (
                            <StyledTableCell key={field.name} align="center">
                                <label className="textLabel3">{field.label}</label>
                            </StyledTableCell>
                        ))}
                        <StyledTableCell align="center" width="15%">
                            <label className="textLabel3">Acciones</label>
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody className='tablebody'>
                    {data.map((item) => (
                        <StyledTableRow hover key={item.id}>
                            {fields.filter(field => field.table !== false).map((field) => (
                                <StyledTableCell key={field.name} align="center">
                                    {field.type === "checkbox"
                                        ? item[field.name] ? "Sí" : "No"
                                        : item[field.name]
                                    }
                                </StyledTableCell>
                            ))}
                            <StyledTableCell align="center">
                                <Tooltip title="Editar">
                                    <IconButton onClick={() => onEdit(item)}>
                                        <EditNoteIcon sx={{ color: "#0066CC" }} />
                                    </IconButton>
                                </Tooltip>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};
export default CatalogTable;

