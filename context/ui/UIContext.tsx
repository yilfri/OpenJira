import { createContext } from 'react';

interface ContextProps {
	sideMenuOpen: boolean;
	isAddingEntry: boolean;
	isDragging: boolean;

	// Methods
	openSideMenu: () => void;
	closeSideMenu: () => void;
	setAddingEntry: (value: boolean) => void;

	startDragging: () => void;
	endDragging: () => void;
}

export const UIContext = createContext({} as ContextProps);
