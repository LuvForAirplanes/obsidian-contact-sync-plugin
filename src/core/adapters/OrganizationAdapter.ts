import { FieldAdapter, ExtractionResult } from '../interfaces';
import { GoogleContact } from '../../types/Contact';
import { NamingStrategy } from 'src/types/Settings';

export class OrganizationAdapter implements FieldAdapter {
  extract(
    contact: GoogleContact,
    context?: Record<string, unknown>
  ): ExtractionResult[] {
    const organizationAsLink = context?.organizationAsLink as boolean;
    const isVcfStrategy = context?.namingStrategy === NamingStrategy.VCF;

    const organizations = (contact.organizations ?? [])
      .map((org) => org.name)
      .filter((name) => !!name)
      .map((name) => {
        // For VCF strategy, don't use wiki links even if organizationAsLink is true
        return organizationAsLink && !isVcfStrategy ? `[[${name}]]` : name;
      });

    if (organizations.length === 0) {
      return [];
    }

    if (context?.namingStrategy === NamingStrategy.Array) {
      const first = organizations[0];
      return [
        {
          value:
            organizations.length === 1 && first !== undefined
              ? first
              : organizations,
        },
      ];
    }

    return organizations.map((value) => ({ value }));
  }
}
