import { CriteriaCallback, NodeCallback } from '../class/Tree';
export default class Node {
    private _content;
    private _children;
    private _length;
    private _parent;
    constructor(content: any);
    parent(): Node | null;
    setParent(node: Node): void;
    children(): Node[];
    child(index: number): Node;
    content(): any;
    length(): number;
    get(fieldKey: string): any;
    set(fieldKey: string, value: any): boolean;
    add(child: Node | any): Node;
    remove(callback: CriteriaCallback): Node[];
    sort(compare: (a: Node, b: Node) => number): Node[];
    traversal(criteria: CriteriaCallback | null, callback: NodeCallback | null): void;
    getPath(): Node[];
}
