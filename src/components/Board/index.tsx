'use client';

import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { useEffect, useState } from 'react';
import DialogRequest from '../DialogRequest';
import { ISelected, selectedsGet } from '@/actions/selecteds-get';
import useToastContext from '@/hooks/toast';
import sortNumber from '@/utils/number/sortNumber';

export default function Board() {
  const toast = useToastContext();

  const [isLoad, setIsLoad] = useState<boolean>(false);

  const [chosenOptions, setChosenOptions] = useState<ISelected[]>([]);
  const [requestedOptions, setRequestedOptions] = useState<number[]>([]);

  const [dialogRequestVisible, setDialogRequestVisible] =
    useState<boolean>(false);

  const chooseOption = (number: number) => {
    if (requestedOptions.includes(number)) {
      setRequestedOptions(requestedOptions.filter(option => option !== number));
    } else {
      setRequestedOptions([...requestedOptions, number]);
    }
  };

  const handleSortNumber = () => {
    const number = sortNumber(1, 100);
    toast('success', 'Sucesso', `O número sorteado foi: ${number}`);
  };

  useEffect(() => {
    loadChosenOptions();
  }, []);

  const loadChosenOptions = async () => {
    setIsLoad(true);
    await selectedsGet()
      .then(res => {
        if (res) {
          if (res.data) {
            setChosenOptions(res.data.sort((a, b) => a.number - b.number));
          }
        }
      })
      .catch(err => {
        toast('error', 'Erro', err);
      })
      .finally(() => setIsLoad(false));
  };

  const handleCloseDialogRequest = () => {
    setDialogRequestVisible(false);
    loadChosenOptions();
  };

  return (
    <div className="flex gap-4">
      <div>
        {isLoad && <ProgressBar mode="indeterminate" />}
        <div className="board">
          {Array.from({ length: 100 })
            .map((_, i) => i + 1)
            .map(i => (
              <div className="">
                <Button
                  key={i}
                  id={i.toString()}
                  className={`btn ${chosenOptions.some(s => s.number === i) ? 'btn-secondary' : 'btn-primary'} w-4rem h-4rem pulse`}
                  style={{
                    backgroundColor: requestedOptions.includes(i)
                      ? '#00BFFF'
                      : '#0B5ED7',
                    borderColor: requestedOptions.includes(i)
                      ? '#00BFFF'
                      : '#0B5ED7',
                  }}
                  label={i.toString()}
                  type="button"
                  onClick={() => chooseOption(i)}
                  disabled={chosenOptions.some(s => s.number === i)}
                />
              </div>
            ))}
          <DialogRequest
            isOpen={dialogRequestVisible}
            onRequestClose={handleCloseDialogRequest}
            options={requestedOptions}
            onOptionsChange={setRequestedOptions}
          />
        </div>
        <Button
          label="Escolher opções"
          type="button"
          className="w-full my-2 btn btn-success"
          onClick={() => setDialogRequestVisible(true)}
          disabled={requestedOptions.length === 0}
        />
        <Button
          className="w-full my-2 btn btn-success"
          label="Sortear número"
          icon="pi pi-dice"
          loading={isLoad}
          onClick={handleSortNumber}
        />
      </div>
      <div>
        <h2 className="text-center">Opções já escolhidas</h2>
        <ul style={{ listStyle: 'none' }}>
          {chosenOptions.map(o => (
            <li className="text-xl">
              {o.number}: {o.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
