import { hashSync, compareSync } from 'bcryptjs';

import IHashProvider from '../models/IHashProvider';

class BCryptHashProvider implements IHashProvider {
    public async generateHash(payload: string): Promise<string> {
        return hashSync(payload, 8);
    }

    public async compare(payload: string, hashed: string): Promise<boolean> {
        return compareSync(payload, hashed);
    }
}

export default BCryptHashProvider;
