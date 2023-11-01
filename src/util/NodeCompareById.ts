import Node from '@/class/Node';
/**
 * Return callback to compare nodes by id
 * @param vector If vector is true then sort asc else desc
 * @returns  Compare function
 */
export default function compareById(vector: boolean) {
  return (a: Node, b: Node) => {
    const aid = Number(a.get('id'));
    const bid = Number(b.get('id'));
    if (aid > bid) {
      return vector ? 1 : -1;
    } else if (aid < bid) {
      return vector ? -1 : 1;
    } else {
      return 0
    }
  };
}