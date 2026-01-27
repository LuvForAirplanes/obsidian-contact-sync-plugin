import { FieldAdapter, ExtractionResult } from '../interfaces';
import { GoogleContact } from '../../types/Contact';
import { NamingStrategy } from 'src/types/Settings';

export class JobTitleAdapter implements FieldAdapter {
  extract(
    contact: GoogleContact,
    context?: Record<string, unknown>
  ): ExtractionResult[] {
    const titles = (contact.organizations ?? [])
      .filter((item) => item.title)
      .map((item) => item.title);

    if (titles.length === 0) {
      return [];
    }

    if (context?.namingStrategy === NamingStrategy.Array) {
      const first = titles[0];
      return [
        { value: titles.length === 1 && first !== undefined ? first : titles },
      ];
    }

    return titles.map((value) => ({ value }));
  }
}
