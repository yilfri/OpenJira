import { ChangeEvent, useMemo, useState } from 'react';
import { Layout } from '../../components/layout';

import {
	Button,
	capitalize,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	FormControl,
	FormControlLabel,
	FormLabel,
	Grid,
	IconButton,
	Radio,
	RadioGroup,
	TextField
} from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import { EntryStatus } from '../../interfaces';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

const EntryPage = () => {
	const [inputValue, setIntputValue] = useState('');
	const [status, setStatus] = useState<EntryStatus>('pending');
	const [touched, setTouched] = useState(false);

	const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched]);

	const onInputValueChanged = (event: ChangeEvent<HTMLInputElement>) => {
		setIntputValue(event.target.value);
	};

	const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
		setStatus(event.target.value as EntryStatus);
	};

	const onSave = () => {
		console.log({ inputValue, status });
	};

	return (
		<Layout>
			<Grid container justifyContent="center" sx={{ marginTop: 2 }}>
				<Grid item xs={12} sm={8} md={6}>
					<Card>
						<CardHeader title={`Entry: ${inputValue}`} subheader={`Created 12 min ago`} />

						<CardContent>
							<TextField
								sx={{ marginTop: 2, marginBottom: 1 }}
								fullWidth
								placeholder="New entry"
								autoFocus
								multiline
								label="New entry"
								value={inputValue}
								onChange={onInputValueChanged}
								helperText={isNotValid && 'Enter a value'}
								onBlur={() => setTouched(true)}
								error={isNotValid}
							/>
							<FormControl>
								<FormLabel>Status:</FormLabel>
								<RadioGroup row value={status} onChange={onStatusChanged}>
									{validStatus.map((option) => (
										<FormControlLabel
											key={option}
											value={option}
											control={<Radio />}
											label={capitalize(option)}
										/>
									))}
								</RadioGroup>
							</FormControl>
						</CardContent>
						<CardActions>
							<Button
								startIcon={<SaveOutlinedIcon />}
								variant="contained"
								fullWidth
								onClick={onSave}
								disabled={inputValue.length <= 0}
							>
								Save
							</Button>
						</CardActions>
					</Card>
				</Grid>
			</Grid>
			<IconButton
				sx={{
					position: 'fixed',
					bottom: 30,
					right: 30,
					backgroundColor: 'error.dark'
				}}
			>
				<DeleteOutlinedIcon />
			</IconButton>
		</Layout>
	);
};

export default EntryPage;
