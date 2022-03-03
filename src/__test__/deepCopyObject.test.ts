import { deepCopyObject, compareObjectsByString } from "../object-helper";

test('deepCopyObject simple string', () => {
    let newVar: any = 'new';
    let oldVar: any = 'old';
    expect(() => deepCopyObject(newVar, oldVar)).toThrow('source is not an object! dest is not an object!');
});

test('deepCopyObject null', () => {
    let newVar: any = null
    let oldVar = {testVar: 'new'}
    expect(() => deepCopyObject(newVar, oldVar)).toThrow('source is not an object!');
});

test('deepCopyObject number', () => {
    let newVar: any = 12
    let oldVar: any = 5
    expect(() => deepCopyObject(newVar, oldVar)).toThrow('source is not an object! dest is not an object!');
});

test('deepCopyObject object to primitive type', () => {
    let newVar = {testVar: 'new'}
    let oldVar: any = 5
    expect(() => deepCopyObject(newVar, oldVar)).toThrow('dest is not an object!');
});

test('deepCopyObject primitive type to object', () => {
    let newVar: any = 5
    let oldVar = {testVar: 'new'}
    expect(() => deepCopyObject(newVar, oldVar)).toThrow('source is not an object! ');
});

test('deepCopyObject simple object', () => {
    let newVar = {testVar: 'new'}
    let oldVar = {testVar: 'old'}
    deepCopyObject(newVar, oldVar);
    expect(oldVar).not.toBe(newVar);
    expect(compareObjectsByString(newVar, oldVar)).toBe(true);
    expect(oldVar.testVar).toBe('new');
});

test('deepCopyObject simple object with one attribute more', () => {
    let newVar = {testVar: 'new', testVar2: 'new2'};
    let oldVar = {testVar: 'old'};
    deepCopyObject(newVar, oldVar);
    expect(oldVar).not.toBe(newVar);
    expect(compareObjectsByString(newVar, oldVar)).toBe(true);
    expect(oldVar.testVar).toBe('new');
    expect((oldVar as any).testVar2).toBe('new2');
});

test('deepCopyObject simple object with one attribute less', () => {
    let newVar = {testVar: 'new'};
    let oldVar = {testVar: 'old', testVar2: 'old2'};
    deepCopyObject(newVar, oldVar);
    expect(oldVar).not.toBe(newVar);
    expect(compareObjectsByString(newVar, oldVar)).toBe(true);
    expect(oldVar.testVar).toBe('new');
    expect(!oldVar['testVar2']).toBe(true);
});

test('deepCopyObject simple object with one null attribute in new', () => {
    let newVar = {testVar: 'new', testVar2: null as any};
    let oldVar = {testVar: 'old', testVar2: 'old2'};
    deepCopyObject(newVar, oldVar);
    expect(oldVar).not.toBe(newVar);
    expect(compareObjectsByString(newVar, oldVar)).toBe(true);
    expect(oldVar.testVar).toBe('new');
    expect(oldVar.testVar2).toBe(null);
});

test('deepCopyObject simple object with one null attribute in old', () => {
    let newVar = {testVar: 'new', testVar2: 'new2'};
    let oldVar = {testVar: 'old', testVar2: null as any};
    deepCopyObject(newVar, oldVar);
    expect(oldVar).not.toBe(newVar);
    expect(compareObjectsByString(newVar, oldVar)).toBe(true);
    expect(oldVar.testVar).toBe('new');
    expect(oldVar.testVar2).toBe('new2');
});

test('deepCopyObject simple array', () => {
    let newVar = ['new', 'new2', 'new3'];
    let oldVar = ['old', 'old2', 'old3'];
    deepCopyObject(newVar, oldVar);
    expect(oldVar).not.toBe(newVar);
    expect(compareObjectsByString(newVar, oldVar)).toBe(true);
    expect(oldVar[0]).toBe('new');
    expect(oldVar[1]).toBe('new2');
    expect(oldVar[2]).toBe('new3');
});

test('deepCopyObject simple array with one too many', () => {
    let newVar = ['new', 'new2', 'new3', 'new4'];
    let oldVar = ['old', 'old2', 'old3'];
    deepCopyObject(newVar, oldVar);
    expect(oldVar).not.toBe(newVar);
    expect(compareObjectsByString(newVar, oldVar)).toBe(true);
    expect(oldVar[0]).toBe('new');
    expect(oldVar[1]).toBe('new2');
    expect(oldVar[2]).toBe('new3');
    expect(oldVar[3]).toBe('new4');
});

test('deepCopyObject simple array with one too few', () => {
    let newVar = ['new', 'new2', 'new3'];
    let oldVar = ['old', 'old2', 'old3, old4'];
    deepCopyObject(newVar, oldVar);
    expect(oldVar).not.toBe(newVar);
    expect(compareObjectsByString(newVar, oldVar)).toBe(true);
    expect(oldVar[0]).toBe('new');
    expect(oldVar[1]).toBe('new2');
    expect(oldVar[2]).toBe('new3');
    expect(!oldVar[4]).toBe(true);
});

test('deepCopyObject simple array with null in new', () => {
    let newVar = ['new', 'new2', null];
    let oldVar = ['old', 'old2', 'old3'];
    deepCopyObject(newVar, oldVar);
    expect(oldVar).not.toBe(newVar);
    expect(compareObjectsByString(newVar, oldVar)).toBe(true);
    expect(oldVar[0]).toBe('new');
    expect(oldVar[1]).toBe('new2');
    expect(oldVar[2]).toBe(null);
});

test('deepCopyObject simple array with null in old', () => {
    let newVar = ['new', 'new2', 'new3'];
    let oldVar = ['old', 'old2', null];
    deepCopyObject(newVar, oldVar);
    expect(oldVar).not.toBe(newVar);
    expect(compareObjectsByString(newVar, oldVar)).toBe(true);
    expect(oldVar[0]).toBe('new');
    expect(oldVar[1]).toBe('new2');
    expect(oldVar[2]).toBe('new3');
});

test('deepCopyObject array with simple object inside', () => {
    let newVar = [{testVar: 'testVarNew'}];
    let oldVar = [{testVar: 'testVarOld'}];
    deepCopyObject(newVar, oldVar);
    expect(oldVar).not.toBe(newVar);
    expect(compareObjectsByString(newVar, oldVar)).toBe(true);
    expect(oldVar[0].testVar).toBe('testVarNew');
});

test('deepCopyObject array with multiple simple objects inside', () => {
    let newVar = [{testVar: 'testVarNew'}, {testVar2: 'testVarNew2'}];
    let oldVar = [{testVar: 'testVarOld'}, {testVar2: 'testVarOld2'}];
    deepCopyObject(newVar, oldVar);
    expect(oldVar).not.toBe(newVar);
    expect(compareObjectsByString(newVar, oldVar)).toBe(true);
    expect(oldVar[0].testVar).toBe('testVarNew');
    expect(oldVar[1].testVar2).toBe('testVarNew2');
});

test('deepCopyObject array with different types', () => {
    let newVar = [{testVar: 'testVarNew'}, 'testVarNew2'];
    let oldVar = [{testVar: 'testVarOld'}, 'testVarOld2'];
    deepCopyObject(newVar, oldVar);
    expect(oldVar).not.toBe(newVar);
    expect(compareObjectsByString(newVar, oldVar)).toBe(true);
    expect(oldVar[1]).toBe('testVarNew2');
    expect((oldVar[0] as any).testVar).toBe('testVarNew');
});

test('deepCopyObject advanced object with one null attribute and nesting', () => {
    let newVar = {testVar: 'new', testVar2: 2, testVar3: [{testVar4: 'testVar4New', testVar6: null as any}, 'testVar5New', ['testVar7New', 'testVar8New', 'testVar9New']]};
    let oldVar = {testVar: 'old', testVar2: 1, testVar3: [{testVar4: 'testVar4Old', testVar6: 'testVar6Old'}, 'testVar5Old', ['testVar7Old', null as any]]};
    deepCopyObject(newVar, oldVar);
    expect(oldVar).not.toBe(newVar);
    expect(compareObjectsByString(newVar, oldVar)).toBe(true);
    expect(oldVar.testVar).toBe('new');
    expect(oldVar.testVar2).toBe(2);
    expect(oldVar.testVar3.length).toBe(3);
    expect(typeof oldVar.testVar3[0]).toBe('object');
    expect((oldVar.testVar3[0] as any).testVar4).toBe('testVar4New');
    expect((oldVar.testVar3[0] as any).testVar6).toBe(null);
    expect(oldVar.testVar3[1]).toBe('testVar5New');
    expect((oldVar.testVar3[2] as any).length).toBe(3);
    expect((oldVar.testVar3[2] as any)[0]).toBe('testVar7New');
    expect((oldVar.testVar3[2] as any)[1]).toBe('testVar8New');
    expect((oldVar.testVar3[2] as any)[2]).toBe('testVar9New');
});