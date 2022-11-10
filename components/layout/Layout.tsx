import Head from 'next/head';

import { Box } from '@mui/material';
import { FC, ReactNode } from 'react';
import { Navbar } from '../ui/Navbar';
import { Sidebar } from '../ui';

interface Props {
	title?: string;
	children?: ReactNode;
}

export const Layout: FC<Props> = ({ title = 'OpenJira - App', children }) => {
	return (
		<Box sx={{ FlexFlow: 1 }}>
			<Head>
				<title>{title}</title>
			</Head>

			<Navbar />
			<Sidebar />

			<Box sx={{ padding: '10px 20px' }}>{children}</Box>
		</Box>
	);
};
