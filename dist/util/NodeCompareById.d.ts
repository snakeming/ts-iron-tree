import { default as Node } from '../class/Node';

/**
 * Return callback to compare nodes by id
 * @param vector If vector is true then sort asc else desc
 * @returns  Compare function
 */
export default function compareById(vector: boolean): (a: Node, b: Node) => 0 | 1 | -1;
