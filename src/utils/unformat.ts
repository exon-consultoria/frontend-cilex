export function unformatTel(tel: string): string {
  const formated = tel
    .replace('(', '')
    .replace(')', '')
    .replace(' ', '')
    .replace('-', '');

  return formated;
}

export function unformatCPF(cpf: string): string {
  const formated = cpf.replace('-', '').split('.').join('');

  return formated;
}

export function unformatCEP(cep: string): string {
  const formated = cep.replace('-', '');

  return formated;
}

export function unformatCNPJ(cnpj: string): string {
  const formated = cnpj.replace('-', '').replace('/', '').split('.').join('');

  return formated;
}
