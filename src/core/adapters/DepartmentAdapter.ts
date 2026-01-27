import { FieldAdapter, ExtractionResult } from '../interfaces';
import { GoogleContact } from '../../types/Contact';
import { NamingStrategy } from 'src/types/Settings';

export class DepartmentAdapter implements FieldAdapter {
  extract(
    contact: GoogleContact,
    context?: Record<string, unknown>
  ): ExtractionResult[] {
    const departments = (contact.organizations ?? [])
      .filter((item) => item.department)
      .map((item) => item.department);

    if (departments.length === 0) {
      return [];
    }

    if (context?.namingStrategy === NamingStrategy.Array) {
      const first = departments[0];
      return [
        {
          value:
            departments.length === 1 && first !== undefined
              ? first
              : departments,
        },
      ];
    }

    return departments.map((value) => ({ value }));
  }
}
