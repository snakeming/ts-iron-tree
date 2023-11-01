

export default function removeEmptyChildren(jTree: any[], node: any[] | null, options?: any) {

  const { key_children } = options;
  node = node || jTree[0];

  if (node != null) {
    if (node[key_children].length === 0) {
      delete node[key_children];
    } else {
      node[key_children].forEach((item: any) => {
        removeEmptyChildren(jTree, item, options);
      });
    }
  }

}