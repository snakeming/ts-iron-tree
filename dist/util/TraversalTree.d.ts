import { default as Node } from '../class/Node';
import { default as Tree, CriteriaCallback, NodeCallback } from '../class/Tree';

export default function traversalTree(tree: Tree, node: Node | null, criteria: CriteriaCallback | null | undefined, callback: NodeCallback | null): void;
