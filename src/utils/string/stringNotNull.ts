export default function stringNotNull(str: string | undefined | null): boolean {
  return typeof str === 'string';
}
