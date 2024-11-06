'use client';

import { Button } from 'primereact/button';
import { useEffect, useState } from 'react';
import { selectedsGet } from '@/actions/selecteds-get';

export default function Board() {
  const [selecteds, setSelecteds] = useState<number[]>([]);

  const select = (number: number) => {
    if (!selecteds.includes(number)) setSelecteds([...selecteds, number]);
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
            className={`btn ${selecteds.includes(i) ? 'btn-secondary' : 'btn-primary'} w-4rem h-4rem pulse`}
            label={i.toString()}
            type="button"
            onClick={() => select(i)}
            disabled={selecteds.includes(i)}
          />
        </div>
      ))}
    </div>
  );
}
