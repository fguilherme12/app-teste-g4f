export function formatCep(value: string): string {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 5) {
    return numbers;
  }
  return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`;
}

export function cleanCep(cep: string): string {
  return cep.replace(/\D/g, '');
}

export function isValidCep(cep: string): boolean {
  const clean = cleanCep(cep);
  return clean.length === 8;
}

