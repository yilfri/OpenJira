import { FC, useContext, useMemo } from 'react';

import { List, Paper } from '@mui/material';

import { EntryStatus } from '../../interfaces';
import { EntryCard } from './EntryCard';
import { EntriesContext } from '../../context/entries';

interface Props {
	status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
	const { entries } = useContext(EntriesContext);

	const entriesByStatus = entries.filter((entry) => entry.status === status);

	return (
		<div>
			<Paper
				sx={{
					height: 'calc(100vh - 170px)',
					overflow: 'auto',
					backgroundColor: 'transparent',
					padding: '1px 5px'
				}}
			>
				<List sx={{ opactity: 1 }}>
					{entriesByStatus.map((entry) => (
						<EntryCard key={entry._id} entry={entry} />
					))}
				</List>
			</Paper>
		</div>
	);
};
