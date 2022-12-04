import { DragEvent, FC, useContext, useMemo } from 'react';

import { List, Paper } from '@mui/material';
import styles from './EntryList.module.css';

import { Entry, EntryStatus } from '../../interfaces';
import { EntryCard } from './EntryCard';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

interface Props {
	status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
	const { entries, updateEntry } = useContext(EntriesContext);
	const { isDragging, endDragging } = useContext(UIContext);

	const entriesByStatus = entries.filter((entry) => entry.status === status);

	const allowDrop = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
	};

	const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
		const id = event.dataTransfer.getData('text');

		const entry: Entry = entries.find((e) => e._id === id)!;
		entry.status = status;
		updateEntry(entry);
		endDragging();
	};
	return (
		<div onDrop={onDropEntry} onDragOver={allowDrop} className={isDragging ? styles.dragging : ''}>
			<Paper
				sx={{
					height: 'calc(100vh - 170px)',
					overflow: 'auto',
					backgroundColor: 'transparent',
					padding: '1px 5px'
				}}
			>
				<List sx={{ opacity: isDragging ? 0.3 : 1, transition: 'all 0.2s' }}>
					{entriesByStatus.map((entry) => (
						<EntryCard key={entry._id} entry={entry} />
					))}
				</List>
			</Paper>
		</div>
	);
};
