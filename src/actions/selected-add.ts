'use server';

import { error } from 'console';
import fs from 'fs';
import path from 'path';
import { ISelected, selectedsGet } from './selecteds-get';
import apiError from '@/functions/apiError';

export async function selectedAdd(newSelected: ISelected) {
  console.log('add', { newSelected });

  try {
    const filePath = path.resolve(process.cwd(), 'src/mock/selecteds.txt');

    let oldSelecteds: ISelected[] = [];
    const res = await selectedsGet();
    if (res && res.ok) oldSelecteds = res.data;

    if (oldSelecteds.some(s => s.number === newSelected.number))
      throw new Error(`Opção ${newSelected.number} não está disponível.`);

    oldSelecteds.push(newSelected);

    let content: string = '';

    oldSelecteds.forEach(s => {
      content += `${s.number} | ${s.name} | ${s.phone} | ${s.instagram} | ${s.date_buy.toISOString()}\n`;
    });

    console.log({ content });

    fs.writeFile(filePath, content, 'utf-8', err => {
      if (err) {
        throw new Error('Falha ao salvar escolha.');
      }
    });

    return { data: true, ok: true, error: '' };
  } catch (error: unknown) {
    return apiError(error);
  }
}
