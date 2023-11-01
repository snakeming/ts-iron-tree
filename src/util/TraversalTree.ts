import Tree from '@/class/Tree';
import Node from '@/class/Node';

import { CriteriaCallback, NodeCallback } from '@/class/Tree';


export default function traversalTree(tree: Tree, node: Node | null, criteria: CriteriaCallback | null = null, callback: NodeCallback | null) {
  const currentNode = node || tree.rootNode();
  if (!node) {
    if (typeof criteria === 'function' && currentNode != null && criteria(currentNode)) {
      if (callback != null){
        callback(currentNode);
      }
    } else if (criteria === null) {
      if (callback != null && currentNode != null){
        callback(currentNode);
      }
      
    }
  }

  if (currentNode != null) {
    currentNode.traversal(criteria, callback);
    const children : Node[]  = currentNode?.children() ?? [];

    children.forEach((item) => {
      traversalTree(tree, item, criteria, callback);
    });
  }
}
