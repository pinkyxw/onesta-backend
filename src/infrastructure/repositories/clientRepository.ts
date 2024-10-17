import { clients } from '../database/schema';
import { defaultCRUD } from './utils';


export const clientRepository = {
  ...defaultCRUD(clients),
};
