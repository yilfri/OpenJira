import { createContext } from 'react';

interface ContextProps {
	sideMenuOpen: boolean;
	isAddingEntry: boolean;

	// Methods
	openSideMenu: () => void;
	closeSideMenu: () => void;
	setAddingEntry: (value: boolean) => void;
}

export const UIContext = createContext({} as ContextProps);
