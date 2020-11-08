import ICacheProvider from '../models/ICacheProvider';

interface ICache {
    [key: string]: string;
}

class FakeCacheProvider implements ICacheProvider {
    private cache: ICache = {};

    public async save(key: string, value: any): Promise<void> {
        this.cache[key] = JSON.stringify(value);
    }

    public async recovery<T>(key: string): Promise<T | null> {
        const item = this.cache[key];

        if (!item) {
            return null;
        }

        return JSON.parse(item) as T;
    }

    public async invalidate(key: string): Promise<void> {
        delete this.cache[key];
    }
}

export default FakeCacheProvider;
