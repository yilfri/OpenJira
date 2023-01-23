import { useContext } from 'react';

import { UIContext } from '../../context/ui';
import { AppBar, IconButton, Link, Toolbar, Typography } from '@mui/material';
import MenuOutlined from '@mui/icons-material/MenuOutlined';
import NextLink from 'next/link';

export const Navbar = () => {
	const { openSideMenu } = useContext(UIContext);

	return (
		<AppBar position="sticky">
			<Toolbar>
				<IconButton size="large" edge="start" onClick={openSideMenu}>
					<MenuOutlined />
				</IconButton>
				<NextLink href="/" passHref>
					<Link underline="none" color="white">
						<Typography variant="h6">OpenJira</Typography>
					</Link>
				</NextLink>
			</Toolbar>
		</AppBar>
	);
};
