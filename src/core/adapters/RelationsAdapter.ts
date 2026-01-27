import { FieldAdapter, ExtractionResult } from '../interfaces';
import { GoogleContact } from '../../types/Contact';
import { NamingStrategy } from 'src/types/Settings';

export class RelationsAdapter implements FieldAdapter {
  extract(
    contact: GoogleContact,
    context?: Record<string, unknown>
  ): ExtractionResult[] {
    const relationsAsLink = context?.relationsAsLink as boolean;
    const isVcfStrategy = context?.namingStrategy === NamingStrategy.VCF;

    // First map to strings as per current logic
    const relations = (contact.relations ?? [])
      .filter((relation) => !!relation.person)
      .map((relation) => {
        // For VCF strategy, don't use wiki links even if organizationsAsLink is true
        return relationsAsLink && !isVcfStrategy
          ? `[[${relation.person}|${relation.person} (${relation.type})]]`
          : `${relation.person} (${relation.type})`;
      });

    if (relations.length === 0) {
      return [];
    }

    if (context?.namingStrategy === NamingStrategy.Array) {
      const first = relations[0];
      return [
        {
          value:
            relations.length === 1 && first !== undefined ? first : relations,
        },
      ];
    }

    return relations.map((value) => ({ value }));
  }
}
