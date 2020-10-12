export class Cache {

    cache: any = {};

    exists(key: string): boolean {
        return Boolean(this.cache[key]);
    }

    put(key: string, value: any): void {
        this.cache[key] = value;
    }

    get(key: string): any {
        if (!this.exists(key))
            throw new Error(`key ${key} does not exist in cache`);

        return this.cache[key];
    }

    clear() {
        this.cache = {};
    }
}