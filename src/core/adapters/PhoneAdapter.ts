import { FieldAdapter, ExtractionResult } from '../interfaces';
import { GoogleContact } from '../../types/Contact';
import { NamingStrategy } from 'src/types/Settings';

export class PhoneAdapter implements FieldAdapter {
  extract(
    contact: GoogleContact,
    context?: Record<string, unknown>
  ): ExtractionResult[] {
    const phones = (contact.phoneNumbers ?? [])
      .filter((item) => item.value)
      .map((item) => item.value);

    if (phones.length === 0) {
      return [];
    }

    if (context?.namingStrategy === NamingStrategy.Array) {
      const first = phones[0];
      return [
        { value: phones.length === 1 && first !== undefined ? first : phones },
      ];
    }

    return phones.map((value) => ({ value }));
  }
}
