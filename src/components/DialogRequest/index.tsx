'use client';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputMask } from 'primereact/inputmask';
import { InputText } from 'primereact/inputtext';
import { ProgressBar } from 'primereact/progressbar';
import { useRef, useState } from 'react';
import { selectedAdd } from '@/actions/selected-add';
import useToastContext from '@/hooks/toast';

interface IProps {
  onRequestClose: () => void;
  onOptionsChange: (newOption: number[]) => void;
  isOpen: boolean;
  options: number[];
}

interface IOptionRequest {
  name: string;
  phone?: string;
  instagram: string;
}

const emptyOptionsRequest: IOptionRequest = {
  name: '',
  phone: undefined,
  instagram: '',
};

export default function DialogRequest({
  onRequestClose,
  onOptionsChange,
  isOpen,
  options,
}: IProps) {
  // refs & toast
  const formRef = useRef<FormHandles>(null);
  const toast = useToastContext();

  // states

  const today = new Date();
  const [isLoad, setIsLoad] = useState<boolean>(false);

  const [optionsRequest, setOptionsRequest] =
    useState<IOptionRequest>(emptyOptionsRequest);

  // effects

  // functions
  const handleSubmit = async () => {
    console.log('aqui', optionsRequest);

    if (optionsRequest.name === '') {
      toast('warn', 'Alerta', 'Informe o nome!');
      return;
    }

    if (
      optionsRequest.instagram === '' &&
      (optionsRequest.phone === undefined || optionsRequest.phone === '')
    ) {
      toast(
        'warn',
        'Alerta',
        'Informe pelo menos um meio de contato para podermos te avisar, caso ganhe!',
      );
      return;
    }

    if (options.length === 0) {
      toast('warn', 'Alerta', 'Selecione pelo menos uma opção da rifa.');
      return;
    }

    setIsLoad(true);
    try {
      for (const option of options) {
        console.log(option);

        const res = await selectedAdd({
          name: optionsRequest.name,
          number: option,
          phone: optionsRequest.phone || '',
          instagram: optionsRequest.instagram,
          date_buy: today,
        });
        if (!res.ok) {
          toast('error', 'Erro', res.error);
          return;
        }
      }

      onOptionsChange([]);
      onRequestClose();
    } finally {
      setIsLoad(false);
    }
  };

  // templates

  return (
    <Dialog
      className="card w-10 md:w-6"
      visible={isOpen}
      onHide={onRequestClose}
    >
      <Form
        className="p-fluid grid formgrid px-4"
        ref={formRef}
        onSubmit={handleSubmit}
        placeholder={''}
        onPointerEnterCapture={null}
        onPointerLeaveCapture={null}
      >
        <div className="field col-12">
          <h4 className="text-center">Opções selecionadas</h4>
          {options.map(o => (
            <span
              key={o}
              onClick={() => {
                onOptionsChange(options.filter(opt => opt !== o));
              }}
              className="btn btn-primary py-1 px-2 mx-1"
            >
              {o}
            </span>
          ))}
        </div>
        <div className="field col-12">
          <label htmlFor="name">Nome</label>
          <InputText
            name="name"
            placeholder="Ex.: Murilo Silva..."
            value={optionsRequest.name}
            onChange={e =>
              setOptionsRequest({ ...optionsRequest, name: e.target.value })
            }
          />
        </div>
        <div className="field col-12 md:col-6">
          <label htmlFor="phone">Telefone</label>
          <InputMask
            name="name"
            value={optionsRequest.phone}
            placeholder="Ex.: (62) 99999-9999"
            mask="(99) 99999-9999"
            onChange={e => {
              if (e.target.value)
                setOptionsRequest({ ...optionsRequest, phone: e.target.value });
            }}
          />
        </div>
        <div className="field col-12 md:col-6">
          <label htmlFor="instagram">Instagram</label>
          <InputText
            name="instagram"
            placeholder="Ex.: suportech.help"
            value={optionsRequest.instagram}
            onChange={e =>
              setOptionsRequest({
                ...optionsRequest,
                instagram: e.target.value,
              })
            }
          />
        </div>
        {isLoad && <ProgressBar mode="indeterminate" />}
        <div className="field col-12">
          <Button
            label="Salvar escolha"
            className="btn btn-success w-full mt-4"
            type="submit"
          />
        </div>
      </Form>
    </Dialog>
  );
}
