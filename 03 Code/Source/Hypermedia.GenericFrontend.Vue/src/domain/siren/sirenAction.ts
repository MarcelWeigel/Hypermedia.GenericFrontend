import SirenField from '@/domain/siren/sirenField';

export default interface SirenAction {
  name: string;
  title: string;
  method: 'POST' | 'GET';
  href: string;
  type: string;
  fields: SirenField[];
}
