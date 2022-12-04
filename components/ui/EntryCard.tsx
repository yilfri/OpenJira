import { useContext, DragEvent, FC } from 'react';

import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import { Entry } from '../../interfaces';
import { UIContext } from '../../context/ui';

interface Props {
	entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
	const { startDragging, endDragging } = useContext(UIContext);

	const onDragStart = (event: DragEvent) => {
		event.dataTransfer.setData('text', entry._id);
		startDragging();

		// Todo: modify state, to indicate than I'm dragging
	};

	const onDragEnd = () => {
		endDragging();
		// Todo: cancel drag
	};

	return (
		<Card sx={{ marginBottom: 1 }} draggable onDragStart={onDragStart} onDragEnd={onDragEnd}>
			<CardActionArea>
				<CardContent>
					<Typography sx={{ whiteSpace: 'pre-line' }}>{entry.description}</Typography>
				</CardContent>

				<CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
					<Typography variant="body2">30 minutes ago</Typography>
				</CardActions>
			</CardActionArea>
		</Card>
	);
};
