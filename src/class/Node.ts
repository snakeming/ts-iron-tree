
import { CriteriaCallback, NodeCallback } from '@/class/Tree';

export default class Node {

  private _content: any;
  private _children: Node[];
  private _length: number;
  private _parent: Node | null = null;

  constructor(content: any) {
    this._content = content;
    this._children = [];
    this._length = 0;
  }

  public parent():Node|null {
    return this._parent;
  }

  public setParent(node:Node) {
    this._parent = node;
  }

  public children() {
    return this._children;
  }

  public child(index: number) {
    return this._children[index];
  }

  public content() {
    return this._content;
  }

  public length() {
    return this._length;
  }

  public get(fieldKey: string) {
    if (typeof this._content[fieldKey] !== 'undefined') {
      return this._content[fieldKey];
    }
  }

  public set(fieldKey: string, value: any) {
    return !!(this._content[fieldKey] = value);
  }

  public add(child: Node | any) {
    const node = (child instanceof Node) ? child : new Node(child);
    node.setParent(this);
    this._length++;
    this._children.push(node);
    return node;
  }

  public remove(callback: CriteriaCallback) {
    const index = this._children.findIndex(callback);
    if (index > -1) {
      const removeItems = this._children.splice(index, 1);
      this._length--;
      return removeItems;
    } return [];
  }

  public sort(compare: (a: Node, b: Node) => number) {
    return this._children.sort(compare);
  }

  public traversal(criteria: CriteriaCallback | null, callback: NodeCallback | null) {
    if (callback === null) {
      return;
    }
    criteria = criteria || (() => true);

    this._children
      .filter(criteria)
      .forEach(callback);
  }

  public getPath() {
    const parentList = [];
    let currentNode: Node | null = this;
    while (currentNode) {
      parentList.push(currentNode);
      currentNode = currentNode.parent();
    }
    return parentList.reverse();
  }

}
