export class TelefoneUtil {
  static onlyNumbers(telefone: string): string {
    return telefone.replace(/\D/g, '');
  }

  static format(telefone: string): string {
    let value = this.onlyNumbers(telefone);

    value = value.substring(0, 11);

    value = value.replace(/^(\d{2})(\d)/, '($1) $2');

    value = value.replace(/(\d{5})(\d)/, '$1-$2');

    return value;
  }
}
