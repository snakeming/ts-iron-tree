import Tree from '../class/Tree';
import Node from '../class/Node';


/**
 * The showTree function is a recursive function that is used to display the structure of a tree data structure in a console. 
 * 
 * Recursively logs the content of a tree starting from a given node.
 * @param tree - The tree to log.
 * @param node - The node to start logging from. Defaults to the root node.
 * @param level - The level of the node in the tree. Defaults to 1 (top level).
 */
export default function showTree(tree: Tree, node: Node | null, level: number=1) {
  node = node || tree.rootNode();

  console.log((new Array(level)).join('\t'), node?.content());
  node?.children().forEach((item:Node) => {
    showTree(tree, item, level + 1);
  });
}