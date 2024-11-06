'use server';

import fs from 'fs';
import path from 'path';

export type ISelected = {
  number: number;
  name: string;
  phone: string;
};

export async function selectedsGet(): Promise<ISelected[]> {
  console.log('aqui');

  try {
    const filePath = path.resolve(process.cwd(), 'src/mock/selecteds.txt');
    const data = await fs.promises.readFile(filePath, 'utf-8');

    if (!data) return [];
    const selecteds: ISelected[] = data.split('\n').map(row => {
      const [number, name, phone] = row.split(' | ');
      return { number: Number(number), name, phone };
    });

    console.log({ selecteds });

    return selecteds;
  } catch (error) {
    console.error('Erro ao buscar opções selecionadas:', error);
    return [];
  }
}
