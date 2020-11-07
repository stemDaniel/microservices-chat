import IHashProvider from '../models/IHashProvider';

class FakeHashProvider implements IHashProvider {
    public async generateHash(payload: string): Promise<string> {
        return `fake=${payload}`;
    }

    public async compare(payload: string, hashed: string): Promise<boolean> {
        return `fake=${payload}` === hashed;
    }
}

export default FakeHashProvider;
