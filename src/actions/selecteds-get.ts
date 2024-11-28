'use server';

import fs from 'fs';
import path from 'path';
import apiError from '@/functions/apiError';

export type ISelected = {
  number: number;
  name: string;
  phone: string;
  instagram: string;
  date_buy: Date;
};

export async function selectedsGet() {
  try {
    const filePath = path.resolve(process.cwd(), 'src/mock/selecteds.txt');
    const data = await fs.promises.readFile(filePath, 'utf-8');

    if (!data)
      return {
        data: [],
        ok: false,
        error: 'Erro ao buscar opções já escolhidas.',
      };
    let selecteds: ISelected[] = data.split('\n').map(row => {
      const [number, name, phone, instagram, date_buy] = row.split(' | ');
      return {
        number: Number(number),
        name,
        phone,
        instagram,
        date_buy: new Date(date_buy),
      };
    });

    selecteds = selecteds.filter(s => s.number !== 0);

    console.log({ selecteds });

    return { data: selecteds, ok: true, error: '' };
  } catch (error) {
    return apiError(error);
  }
}
