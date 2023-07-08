export const validateEmail = (email: string): boolean => {
  const regex = /\S+@\S+\.\S+/;
  return !(email !== null && email !== undefined && regex.test(email) && email !== '');
};

export const validateCpf = (cpf: string): boolean => {
  return !(cpf !== null && cpf !== undefined && cpf.length === 11);
}

export const validateCode = (emailCode: string): boolean => {
  return !(emailCode !== null && emailCode !== undefined && emailCode.length === 6);
}

export const validatePassword = (password: string): boolean => {
  return !(password !== null && password !== undefined && password.length >= 6);
}

export const equalityPassword = (password: string, password2: string): boolean => {
  return !(password === password2);
};

export const validateName = (name: string): boolean => {
  return !(name !== null && name !== undefined && name.length >= 2);
};

export const validateDate = (date: string): boolean => {
  const year: number = Number(date.slice(0,4));
  const month: number = Number(date.slice(5,7));
  const day: number = Number(date.slice(8,10));
  const atualYear: number = new Date().getFullYear();

  if(year < atualYear - 120 || year > atualYear) {
    return true;
  } else if (year > atualYear - 10) {
    return true;
  } else if (month > 12 || month < 1) {
    return true;
  } else if (day < 1 || day > 31) {
    return true;
  } else {
    return false;
  }
};