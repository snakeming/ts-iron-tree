
import Node from './Node';
import searchNode from '../util/SearchNode';
import traversalTree from '../util/TraversalTree';
import serializeTree from '../util/SerializeTree';
import removeEmptyChildren from '../util/RemoveEmptyChildren';

export type CriteriaCallback = (node: Node) => boolean;

export type NodeCallback = (node: Node) => void;


export default class Tree {
    
    private _rootNode: Node | null;

    constructor(object?: any) {
       
        if (object) {
            this._rootNode = new Node(object);
        } else {
            this._rootNode = null;
        }
    }

    public rootNode(): Node | null {
        return this._rootNode;
    }

    // only for rootNode
    public get(path: string): Node | null {
        return this._rootNode?.get(path);
    }
    
      // only for rootNode
    public set(path: string, value: any) {
        this._rootNode?.set(path, value);
    }

    
    
    // public add(callback: (node: Node) => boolean, object: any) {
    public add(callback: CriteriaCallback | string, object: any) {
        const type = typeof callback;
        if (type === 'string' && callback === 'root') {
            this._rootNode = new Node(object);
            return this;
        } else if (type === 'function') {
            const target = searchNode(this, null, callback as CriteriaCallback);
            if (target && target.add(object)) {
                return this;
            } else {
                console.log('Warning', object);
            }
        }
    }
    
    public contains(criteria: CriteriaCallback) {
        return searchNode(this, null, criteria);
    }
    
    public remove(criteria: CriteriaCallback) {
        const targetNode = this.contains(criteria);
        if (targetNode) {
            return !!targetNode.parent()?.remove(criteria);
        }
        return false;
    }
    
    public move(search: CriteriaCallback, destination: CriteriaCallback) {
        const targetNode = this.contains(search);
        if (targetNode && this.remove(search)) {
            const destinationNode = this.contains(destination);
            return !!destinationNode?.add(targetNode);
        }
        return false;
    }
    
    public traversal(criteria: CriteriaCallback | null, callback: NodeCallback) {
        traversalTree(this, null, criteria, callback);
    }
    
    public sort(compare: (a: Node, b: Node) => number) {
        this.traversal(null, (currentNode) => {
            currentNode.sort(compare);
        });
    }
    
    public toJson(options?: any) {
        const optionsDefault = {
            key_children: 'children',
            empty_children: true,
        };
        options = Object.assign(optionsDefault, options);
        const result = serializeTree(this, null, [], options);
    
        if (!options.empty_children) {
            removeEmptyChildren(result, null, options);
        }
    
        if (result && result.length > 0) {
            return result[0];
        }
    }
}