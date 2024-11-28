export default function sortNumber(min: number, max: number): number {
  if (min > max) {
    throw new Error('O valor mínimo não pode ser maior que o máximo.');
  }

  const number = Math.floor(Math.random() * (max - min + 1)) + min;

  console.log('Número sorteado:', number);
  return number;
}
