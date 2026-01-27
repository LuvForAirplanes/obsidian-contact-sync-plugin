import { FieldAdapter, ExtractionResult } from '../interfaces';
import { GoogleContact } from '../../types/Contact';
import { NamingStrategy } from 'src/types/Settings';

export class EmailAdapter implements FieldAdapter {
  extract(
    contact: GoogleContact,
    context?: Record<string, unknown>
  ): ExtractionResult[] {
    const emails = (contact.emailAddresses ?? [])
      .filter((item) => item.value)
      .map((item) => item.value);

    if (emails.length === 0) {
      return [];
    }

    if (context?.namingStrategy === NamingStrategy.Array) {
      const first = emails[0];
      return [
        { value: emails.length === 1 && first !== undefined ? first : emails },
      ];
    }

    return emails.map((value) => ({ value }));
  }
}
