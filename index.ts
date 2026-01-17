let gurt = "gurt";

console.log(gurt);

let num: number = 1;
let str: string = "Hello";
let nul: null = null;
let not_defined: undefined = undefined;
let bool: boolean = false;

let arr: number[] = [1, 2, 3];
let obj: object = {
    color: 'red',
    size: 'large'
}
let myFunc: Function = (x: number, y: number): number => x + y;
console.log(myFunc(4, str));