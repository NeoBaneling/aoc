import fs from 'fs';

export default abstract class Day {
    abstract one(input: string[]): number;
    abstract two(input: string[]): number;

    public runPartOne(path: string, isTest: boolean): number {
        const input = this.getInput(path, isTest);
        return this.one(input);
    }

    public runPartTwo(path: string, isTest: boolean): number {
        const input = this.getInput(path, isTest);
        return this.two(input);
    }

    private getInput(path: string, isTest: boolean): string[] {
        return fs.readFileSync(`${path}/${isTest ? 'ex' : 'act'}.txt`).toString().split('\n')
    }
}