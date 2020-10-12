import { Cache } from '../../services/Cache';

describe('Cache storage', () => {

    const cacheStorage = new Cache();

    it('should put item in cache', () => {
        cacheStorage.put('test', 123);
        expect(cacheStorage.cache['test']).toEqual(123);
    });

    it('should get item from cache', () => {
        expect(cacheStorage.get('test')).toEqual(123);
    });

    it('should throw error if wrong key', () => {
        expect(() => cacheStorage.get('not-test')).toThrow(new Error(`key not-test does not exist in cache`));
    });

    it('should find if key exits or not', () => {
        expect((cacheStorage.exists('test'))).toBeTruthy();
    });

    it('should clear all keys', () => {
        cacheStorage.clear();
        expect(cacheStorage.exists('test')).toBeFalsy();
    });

});