import { CepUtil } from './cep.util';

export class CepMaskUtil {
  static apply(value: string): string {
    return CepUtil.format(value);
  }
}
