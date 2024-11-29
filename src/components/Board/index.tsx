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

  const [isMobile, setIsMobile] = useState(false);

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
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      // Define o tamanho limite para mobile
    };

    // Verifica o tamanho da tela ao carregar
    handleResize();

    // Adiciona o listener para alterações de tamanho
    window.addEventListener('resize', handleResize);

    // Remove o listener ao desmontar
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    <div className="grid w-full h-full">
      {/* Coluna esquerda */}
      <div className="column-fixed md:h-full col-12 md:col-6 flex flex-column">
        <div className="poster md:h-full flex justify-content-center align-items-center">
          <img src="/assets/poster-1.jpeg" alt="Poster" />
        </div>
      </div>
      {!isMobile && <div className="col-6"></div>}
      {/* Coluna direita */}
      <div className="col-12 md:col-6 flex flex-column md:px-4 pt-8">
        <h2 className="title mb-4">Acompanhe o andamento da rifa</h2>

        <ProgressBar value={chosenOptions.length} />

        {/* Jogo */}
        <div className="game w-full align-items-center justify-content-center">
          {Array.from({ length: 100 })
            .map((_, i) => i + 1)
            .map(i => (
              <Button
                key={i}
                id={i.toString()}
                className={`btn btn-primary font-bold cell text-center mb-1`}
                style={{
                  backgroundColor: requestedOptions.includes(i)
                    ? '#00BFFF'
                    : chosenOptions.some(o => o.number === i)
                      ? '#708090'
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
            ))}
          <DialogRequest
            isOpen={dialogRequestVisible}
            onRequestClose={handleCloseDialogRequest}
            options={requestedOptions}
            onOptionsChange={setRequestedOptions}
          />
        </div>
        {/* Legenda */}
        <div className="flex justify-content-end">
          <span
            className="badge fs-6 m-2"
            style={{ backgroundColor: '#708090' }}
          >
            Indisponível
          </span>
          <span
            className="badge fs-6 m-2"
            style={{ backgroundColor: '#0B5ED7' }}
          >
            Disponível
          </span>
        </div>
        {/* Botão de escolha */}
        <p className="mt-4">
          Selecione as opções que deseja e depois clique no botão.
        </p>
        <Button
          label="Escolher opções"
          type="button"
          className="w-full h-5rem mb-4 btn btn-success"
          onClick={() => setDialogRequestVisible(true)}
          disabled={requestedOptions.length === 0}
        />
        {/* Lista de escolhidas */}
        <div>
          <h2 className="text-center">Opções já escolhidas</h2>
          <ul style={{ listStyle: 'none' }}>
            {chosenOptions.map(o => (
              <li key={o.number} className="text-xl mb-2">
                <span className="btn btn-primary w-2rem h-2rem p-1">
                  {o.number}
                </span>{' '}
                {o.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
