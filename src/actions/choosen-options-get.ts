'use server';

import path from 'path';
import apiError from '@/functions/apiError';
import { readFile } from 'fs/promises';

export type ISelected = {
  number: number;
  name: string;
  phone: string;
  instagram: string;
  date_buy: Date;
};

export default async function choosenOptionsGet() {
  console.log('aqui');

  try {
    const filePath = path.join(
      process.cwd(),
      'src',
      'data',
      'choosenOptions.json',
    );
    const fileContents = await readFile(filePath, 'utf8');

    const data = JSON.parse(fileContents).data;

    return { data, ok: true, error: '' };
  } catch (error) {
    return apiError(error);
  }
}
