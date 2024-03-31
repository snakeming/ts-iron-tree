import { default as Node } from './Node';

export type CriteriaCallback = (node: Node) => boolean;
export type NodeCallback = (node: Node) => void;
export default class Tree {
    private _rootNode;
    constructor(object?: any);
    rootNode(): Node | null;
    get(path: string): Node | null;
    set(path: string, value: any): void;
    add(callback: CriteriaCallback | string, object: any): this | undefined;
    contains(criteria: CriteriaCallback): Node | null;
    remove(criteria: CriteriaCallback): boolean;
    move(search: CriteriaCallback, destination: CriteriaCallback): boolean;
    traversal(criteria: CriteriaCallback | null, callback: NodeCallback): void;
    sort(compare: (a: Node, b: Node) => number): void;
    toJson(options?: any): any;
}
