import { IconButton, InputAdornment, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

// ::::::::::::::::::::::::::::ESTILO GENERAL::::::::::::::::::::::::::::::::::::::::::::::::::::::::
export const TextFieldGeneral = styled((props) => (
	<TextField InputProps={{ disableUnderline: true }} {...props}
		fullWidth
		autoComplete={false}
		disabled={props.estatusActions == 3 ? (true) : (false)}
		size="small"
		sx={{
			'& .MuiInputBase-input': {
				fontSize: 16,
				height: '20px',
			},
		}}
	/>
))(({ theme }) => ({}));