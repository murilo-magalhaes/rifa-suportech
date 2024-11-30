'use client';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputMask } from 'primereact/inputmask';
import { InputText } from 'primereact/inputtext';
import { ProgressBar } from 'primereact/progressbar';
import { useRef, useState } from 'react';
import useToastContext from '@/hooks/toast';
import stringNotNull from '@/utils/string/stringNotNull';
import { chooseOptionAdd } from '@/actions/choose-option-add';

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
    if (optionsRequest.name === '') {
      toast('warn', 'Alerta', 'Informe o nome!');
      return;
    }

    if (
      stringNotNull(optionsRequest.phone) &&
      optionsRequest.phone?.length !== 15
    ) {
      toast('warn', 'Alerta', 'Número de telfone inválido.');
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
      // for (const option of options) {
      //   console.log(option);

      //   const res = await chooseOptionAdd({
      //     name: optionsRequest.name,
      //     number: option,
      //     phone: optionsRequest.phone || '',
      //     instagram: optionsRequest.instagram,
      //     date_buy: today,
      //   });
      //   if (!res.ok) {
      //     toast('error', 'Erro', res.error);
      //     return;
      //   }
      // }

      const message = `Olá, SuporTech! Gostaria de adquirir o(s) números [${options.join(',')}] da rifa.
      \nMe chamo ${optionsRequest.name} e meus contatos são:
      \nTelefone: ${stringNotNull(optionsRequest.phone) ? optionsRequest.phone : 'não informado.'}
      \nInstagram: ${stringNotNull(optionsRequest.instagram) ? optionsRequest.instagram : 'não informado'}`;

      const encodedMessage = encodeURIComponent(message);

      const whatsappLink = `https://wa.me/5562991286450?text=${encodedMessage}`;
      const a = document.createElement('a');
      a.href = whatsappLink;
      a.target = '_blank';
      a.click();

      toast('success', 'Sucesso', 'Encaminhamos seu pedido para confirmação.');

      handleClose();
    } finally {
      setIsLoad(false);
    }
  };

  const handleClose = () => {
    onOptionsChange([]);
    onRequestClose();
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

        <p className="field col-12 font-bold ml-2">
          Total: R${options.length * 10}
        </p>
        {isLoad && <ProgressBar mode="indeterminate" />}
        <div className="field col-12 md:col-6 my-0">
          <Button
            label="Voltar"
            className="btn btn-danger w-full mt-4"
            type="button"
            onClick={handleClose}
            icon="pi pi-times"
          />
        </div>
        <div className="field col-12 md:col-6 my-0">
          <Button
            label="Salvar escolha"
            className="btn btn-success w-full mt-4"
            type="submit"
            icon="pi pi-check"
          />
        </div>
      </Form>
    </Dialog>
  );
}
