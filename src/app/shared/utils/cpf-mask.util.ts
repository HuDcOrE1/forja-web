import { CpfUtil } from './cpf.util';

export class CpfMaskUtil {
  static apply(value: string): string {
    return CpfUtil.format(value);
  }
}
