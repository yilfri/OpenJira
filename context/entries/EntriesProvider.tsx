import { FC, useReducer, ReactNode } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { EntriesContext, entriesReducer } from './';
import { Entry } from '../../interfaces';

interface Props {
	children?: ReactNode;
}

export interface EntriesState {
	entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
	entries: [
		{
			_id: uuidv4(),
			description:
				'Pending: Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis, voluptatem!',
			createdAt: Date.now(),
			status: 'pending'
		},
		{
			_id: uuidv4(),
			description:
				'In-Progress: Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus, omnis. Molestiae!',
			createdAt: Date.now() - 1000000,
			status: 'in-progress'
		},
		{
			_id: uuidv4(),
			description:
				'Finished: Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur deleniti doloribus officia delectus!!',
			createdAt: Date.now() - 100000,
			status: 'finished'
		}
	]
};

export const EntriesProvider: FC<Props> = ({ children }) => {
	const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

	const addNewEntry = (description: string) => {
		const newEntry: Entry = {
			_id: uuidv4(),
			description,
			createdAt: Date.now(),
			status: 'pending'
		};

		dispatch({ type: '[Entry] Add-Entry', payload: newEntry });
	};

	return (
		<EntriesContext.Provider
			value={{
				...state,

				//Methods
				addNewEntry
			}}
		>
			{children}
		</EntriesContext.Provider>
	);
};
