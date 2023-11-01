import Tree from '@/class/Tree';
import Node from '@/class/Node';

import { CriteriaCallback } from '@/class/Tree';

// export default function searchNode(tree: Tree, node?: Node | null, criteria?: (node: Node) => boolean, options?: any) {
export default function searchNode(tree: Tree, node?: Node | null, criteria?: CriteriaCallback, options?: any): Node | null {
  const currentNode = node || tree.rootNode();
  if (criteria && currentNode && criteria(currentNode)) {
    return currentNode;
  }
  const children = currentNode?.children()

  let target = null;
  
  if (!children) {
    return null;
  }

  for(let i=0; i<children.length; i++) {
    const item = children[i];
    target = searchNode(tree, item, criteria);
    if (target) {
      return target;
    }
  }

  return null;
}
