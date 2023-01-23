import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../database';
import { Entry, IEntry } from '../../../../models';

type Data = { message: string } | IEntry;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	const { id } = req.query;

	if (!mongoose.isValidObjectId(id)) {
		res.status(400).json({ message: 'Entry no available, try again. ID: ' + id });
	}

	switch (req.method) {
		case 'PUT':
			return updateEntry(req, res);
		case 'GET':
			return getEntry(req, res);
		default:
			return res.status(400).json({ message: 'Method not allowed' });
	}
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { id } = req.query;

	await db.connect();
	const entryToUpdate = await Entry.findById(id);

	if (!entryToUpdate) {
		db.disconnect();
		return res.status(400).json({ message: 'Task no available, try again. ID: ' + id });
	}

	const { description = entryToUpdate.description, status = entryToUpdate.status } = req.body;

	try {
		await db.disconnect();

		const updatedEntry = await Entry.findByIdAndUpdate(
			id,
			{ description, status },
			{ runValidators: true, new: true }
		);

		res.status(200).json(updatedEntry!);
	} catch (error: any) {
		console.log({ error });
		await db.disconnect();
		res.status(400).json({ message: error.errors.status.message });
	}
};

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { id } = req.query;

	await db.connect();
	const entryInDB = await Entry.findById(id);
	await db.disconnect();

	if (!entryInDB) {
		return res.status(400).json({ message: 'Entry no exist in DB' });
	}

	res.status(200).json(entryInDB);
};
