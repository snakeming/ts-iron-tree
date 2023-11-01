import Tree from '../class/Tree';
import Node from '../class/Node';


export default function serializeTree(tree: Tree, node: Node | null, target: any[], options?: any) : any[]{
  const { key_children } = options;
  node = node || tree.rootNode();
  const index = target.push(
    Object.assign({ [key_children]: []}, node?.content())
  );
  node?.children().forEach((item:Node) => {
    serializeTree(tree, item, target[index-1][key_children], options);
  });
  return target;
}