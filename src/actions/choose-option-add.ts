'use server';

import fs from 'fs';
import path from 'path';
import apiError from '@/functions/apiError';
import choosenOptionsGet, { ISelected } from './choosen-options-get';

export async function chooseOptionAdd(newSelected: ISelected) {
  try {
    const filePath = path.resolve(
      process.cwd(),
      'src',
      'data',
      'choosenOptions.json',
    );

    let oldSelecteds: ISelected[] = [];
    const res = await choosenOptionsGet();
    if (res && res.ok) oldSelecteds = res.data;

    if (oldSelecteds.some(s => s.number === newSelected.number))
      throw new Error(`Opção ${newSelected.number} não está disponível.`);

    oldSelecteds.push(newSelected);

    const newContent = { data: oldSelecteds };

    console.log({ ...newContent.data });

    fs.writeFile(
      filePath,
      JSON.stringify(newContent, null, 2),
      'utf-8',
      err => {
        if (err) {
          throw new Error('Falha ao salvar escolha.');
        }
      },
    );

    return { data: true, ok: true, error: '' };
  } catch (error: unknown) {
    return apiError(error);
  }
}
