export class CpfUtil {
  static onlyNumbers(cpf: string): string {
    return cpf.replace(/\D/g, '');
  }

  static format(cpf: string): string {
    let value = this.onlyNumbers(cpf);

    value = value.substring(0, 11);

    value = value.replace(/^(\d{3})(\d)/, '$1.$2');

    value = value.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');

    value = value.replace(/\.(\d{3})(\d)/, '.$1-$2');

    return value;
  }
}
