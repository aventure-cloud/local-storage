import * as assert from 'assert';
import LocalStorage from '../src';

const testSamples = [
    { input: {key: 'test', value: 'A'}, expectedResult: 'A', description: 'should return simple string' },
    { input: {key: 'test', value: ['A', 'B']}, expectedResult: ['A', 'B'], description: 'should return array' },
    { input: {key: 'test', value: {a: 'A', b: 'B'}}, expectedResult: {a: 'A', b: 'B'}, description: 'should return pristine object' },
];

describe('Array', () => {

    let storage = new LocalStorage();

    testSamples.forEach((sample) => {

        it(sample.description, () => {
            assert.equal(storage.set(sample.input.key, sample.input.value).get(sample.input.key), sample.expectedResult);
        });

    });
});