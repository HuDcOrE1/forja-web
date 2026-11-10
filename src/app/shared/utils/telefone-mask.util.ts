import { TelefoneUtil } from './telefone.util';

export class TelefoneMaskUtil {
  static apply(value: string): string {
    return TelefoneUtil.format(value);
  }
}
