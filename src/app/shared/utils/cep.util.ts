export class CepUtil {
  static onlyNumbers(cep: string): string {
    return cep.replace(/\D/g, '');
  }

  static format(cep: string): string {
    let value = this.onlyNumbers(cep);

    value = value.substring(0, 8);

    value = value.replace(/^(\d{5})(\d)/, '$1-$2');

    return value;
  }
}
