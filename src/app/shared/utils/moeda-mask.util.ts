export class MoedaMaskUtil {
  static apply(value: string | number): string {
    const numero = Number(String(value).replace(/\D/g, '')) / 100;

    return numero.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }
}
