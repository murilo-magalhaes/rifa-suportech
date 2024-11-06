'use client';

import { Button } from 'primereact/button';
import { useEffect, useState } from 'react';
import { ISelected, selectedsGet } from '@/actions/selecteds-get';

export default function Board() {
  const [selecteds, setSelecteds] = useState<ISelected[]>([]);

  const select = (number: number) => {
    if (!selecteds.some(s => s.number === number))
      setSelecteds([...selecteds, { number, name: '', phone: '' }]);
  };

  useEffect(() => {
    selectedsGet();
  }, []);

  return (
    <div className="board">
      {Array.from({ length: 100 }, (_, i) => i + 1).map(i => (
        <div className="">
          <Button
            id={i.toString()}
            className={`btn ${selecteds.some(s => s.number === i) ? 'btn-secondary' : 'btn-primary'} w-4rem h-4rem pulse`}
            label={i.toString()}
            type="button"
            onClick={() => select(i)}
            disabled={selecteds.some(s => s.number === i)}
          />
        </div>
      ))}
    </div>
  );
}
