import { useContext, useState, ChangeEvent } from 'react';

import { Button, Box, TextField } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

export const NewEntry = () => {
	const [imputValue, setImputValue] = useState('');
	const [touched, setTouched] = useState(false);

	const { addNewEntry } = useContext(EntriesContext);
	const { isAddingEntry, setAddingEntry } = useContext(UIContext);

	const onTextFieldChanged = (e: ChangeEvent<HTMLInputElement>) => {
		setImputValue(e.target.value);
	};

	const leaveFocus = () => {
		setAddingEntry(false);
		setTouched(false);
	};

	const onSave = () => {
		if (imputValue.length === 0) return;

		addNewEntry(imputValue);
		setAddingEntry(false);
		setTouched(false);
		setImputValue('');
	};

	return (
		<Box sx={{ marginBottom: 2, paddingX: 2 }}>
			{isAddingEntry ? (
				<>
					<TextField
						fullWidth
						sx={{ marginTop: 2, marginBottom: 1 }}
						autoFocus
						multiline
						label="New entry"
						error={imputValue.length <= 0 && touched}
						helperText={imputValue.length <= 0 && touched && 'Enter a value'}
						value={imputValue}
						onChange={onTextFieldChanged}
						onBlur={() => setTouched(true)}
					/>
					<Box display="flex" justifyContent="space-between">
						<Button variant="text" onClick={leaveFocus}>
							Cancel
						</Button>
						<Button
							variant="outlined"
							color="secondary"
							onClick={onSave}
							endIcon={<SaveOutlinedIcon />}
						>
							Add
						</Button>
					</Box>
				</>
			) : (
				<Button
					fullWidth
					variant="outlined"
					onClick={() => setAddingEntry(true)}
					startIcon={<AddCircleOutlineOutlinedIcon />}
				>
					Add Task
				</Button>
			)}
		</Box>
	);
};
