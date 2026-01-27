import { createDefaultFormatter } from '../../../core/Formatter';
import { NamingStrategy } from '../../../types/Settings';
import { GoogleContact } from '../../../types/Contact';

describe('ArrayNamingStrategy Integration', () => {
  const formatter = createDefaultFormatter(NamingStrategy.Array);
  const contact: GoogleContact = {
    resourceName: 'people/123',
    emailAddresses: [
      { value: 'test1@example.com' },
      { value: 'test2@example.com' },
    ],
    phoneNumbers: [{ value: '123456789' }, { value: '987654321' }],
    organizations: [
      { name: 'Org1', title: 'Developer', department: 'Engineering' },
      { name: 'Org2', title: 'Manager', department: 'Management' },
    ],
    relations: [
      { person: 'Jane', type: 'spouse' },
      { person: 'Bob', type: 'friend' },
    ],
  } as GoogleContact;

  it('should format emails as an array', () => {
    const result = formatter.generateFrontmatter(contact, 'contact_');
    expect(result.contact_email).toEqual([
      'test1@example.com',
      'test2@example.com',
    ]);
  });

  it('should format single email as string', () => {
    const singleContact = {
      ...contact,
      emailAddresses: [{ value: 'single@example.com' }],
    } as GoogleContact;
    const result = formatter.generateFrontmatter(singleContact, 'contact_');
    expect(result.contact_email).toEqual('single@example.com');
  });

  it('should format phones as an array', () => {
    const result = formatter.generateFrontmatter(contact, 'contact_');
    expect(result.contact_phone).toEqual(['123456789', '987654321']);
  });

  it('should format single phone as string', () => {
    const singleContact = {
      ...contact,
      phoneNumbers: [{ value: '111222333' }],
    } as GoogleContact;
    const result = formatter.generateFrontmatter(singleContact, 'contact_');
    expect(result.contact_phone).toEqual('111222333');
  });

  it('should format organizations as an array', () => {
    const result = formatter.generateFrontmatter(contact, 'contact_');
    expect(result.contact_organization).toEqual(['Org1', 'Org2']);
  });

  it('should format single organization as string', () => {
    const singleContact = {
      ...contact,
      organizations: [{ name: 'SingleOrg', title: 'Dev', department: 'Dep' }],
    } as GoogleContact;
    const result = formatter.generateFrontmatter(singleContact, 'contact_');
    expect(result.contact_organization).toEqual('SingleOrg');
  });

  it('should format titles as an array', () => {
    const result = formatter.generateFrontmatter(contact, 'contact_');
    expect(result.contact_jobtitle).toEqual(['Developer', 'Manager']);
  });

  it('should format single title as string', () => {
    const singleContact = {
      ...contact,
      organizations: [{ name: 'One', title: 'SingleTitle', department: 'Dep' }],
    } as GoogleContact;
    const result = formatter.generateFrontmatter(singleContact, 'contact_');
    expect(result.contact_jobtitle).toEqual('SingleTitle');
  });

  it('should format departments as an array', () => {
    const result = formatter.generateFrontmatter(contact, 'contact_');
    expect(result.contact_department).toEqual(['Engineering', 'Management']);
  });

  it('should format single department as string', () => {
    const singleContact = {
      ...contact,
      organizations: [
        { name: 'One', title: 'Title', department: 'SingleDept' },
      ],
    } as GoogleContact;
    const result = formatter.generateFrontmatter(singleContact, 'contact_');
    expect(result.contact_department).toEqual('SingleDept');
  });

  it('should format relations as an array', () => {
    const result = formatter.generateFrontmatter(contact, 'contact_');
    expect(result.contact_relations).toEqual(['Jane (spouse)', 'Bob (friend)']);
  });

  it('should format single relation as string', () => {
    const singleContact = {
      ...contact,
      relations: [{ person: 'SingleRel', type: 'partner' }],
    } as GoogleContact;
    const result = formatter.generateFrontmatter(singleContact, 'contact_');
    expect(result.contact_relations).toEqual('SingleRel (partner)');
  });
});
