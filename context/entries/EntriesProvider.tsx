import { FC, useReducer, ReactNode, useEffect } from 'react';

import { EntriesContext, entriesReducer } from './';
import { Entry } from '../../interfaces';
import { entriesApi } from '../../apis';

interface Props {
	children?: ReactNode;
}

export interface EntriesState {
	entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
	entries: []
};

export const EntriesProvider: FC<Props> = ({ children }) => {
	const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

	const addNewEntry = async (description: string) => {
		const { data } = await entriesApi.post('/entries', { description });

		dispatch({ type: '[Entry] Add-Entry', payload: data });
	};

	const updateEntry = async ({ _id, description, status }: Entry) => {
		try {
			const { data } = await entriesApi.put(`/entries/${_id}`, { description, status });
			dispatch({ type: '[Entry] Entry-Updated', payload: data });
		} catch (error) {
			console.log({ error });
		}
	};

	const refreshEntries = async () => {
		const { data } = await entriesApi.get('/entries');
		dispatch({ type: '[Entry] Refresh-Data', payload: data });
	};

	useEffect(() => {
		refreshEntries();
	}, []);

	return (
		<EntriesContext.Provider
			value={{
				...state,

				//Methods
				addNewEntry,
				updateEntry
			}}
		>
			{children}
		</EntriesContext.Provider>
	);
};
