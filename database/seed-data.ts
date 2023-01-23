interface SeedData {
	entries: SeedEntries[];
}

interface SeedEntries {
	description: string;
	createdAt: number;
	status: string;
}

export const seedData: SeedData = {
	entries: [
		{
			description:
				'Pending: Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis, voluptatem!',
			createdAt: Date.now(),
			status: 'pending'
		},
		{
			description:
				'In-Progress: Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus, omnis. Molestiae!',
			createdAt: Date.now() - 1000000,
			status: 'in-progress'
		},
		{
			description:
				'Finished: Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur deleniti doloribus officia delectus!!',
			createdAt: Date.now() - 100000,
			status: 'finished'
		}
	]
};
