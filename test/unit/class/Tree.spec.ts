import { describe, it, expect, beforeEach } from "vitest"
import Tree from '@/class/Tree'
import Node from '@/class/Node'

import {generateTreeDefault} from './GenerateTreeDefault'
import compareById from '@/util/NodeCompareById'


describe('Tree', () => {
	const object = { id: 1, title: 'Root' };
	let tree = new Tree(object);
	beforeEach(() => {
		tree = new Tree(object);
	})

	describe('Constructor', () => {
		it('It exists', () => {
			expect(tree instanceof Tree).to.equal(true);
		})

		it('With params', function () {
			expect(tree.rootNode() instanceof Node).to.equal(true);
		});

		it('Without params', function () {
			const tree = new Tree();

			expect(tree.rootNode() instanceof Node).to.equal(false);
			expect(tree.rootNode()).to.equal(null);
		});

	})

	describe('Add', () => {
		it('Add root', () => {
			const tree = new Tree();
			const resultTree = tree.add('root', object);

			expect(resultTree instanceof Tree).to.equal(true);
			expect(resultTree?.rootNode() instanceof Node).to.equal(true);
		});

		it('Add regular node', function () {
			const regularObject = { id: 2, title: 'Node 2' }
			const resultTree = tree.add((parentNode) => {
				return parentNode.get('id') === 1;
			}, regularObject);

			expect(resultTree instanceof Tree).to.equal(true);
			expect(resultTree?.rootNode() instanceof Node).to.equal(true);

			expect(resultTree?.rootNode()?.children()).to.have.lengthOf(1);
			expect(resultTree?.rootNode()?.child(0).get('id')).to.equal(2);
		});

		it('Add many nodes', function () {
			tree = generateTreeDefault();

			expect(tree instanceof Tree).to.equal(true);
			expect(tree.rootNode() instanceof Node).to.equal(true);

			expect(tree.rootNode()?.get('id')).to.equal(1);
			expect(tree.rootNode()?.child(0).get('id')).to.equal(2);
			expect(tree.rootNode()?.child(1).get('id')).to.equal(3);

			expect(tree.rootNode()?.child(1).child(0).get('id')).to.equal(4);
			expect(tree.rootNode()?.child(1).child(0).child(0).get('id')).to.equal(5);
			expect(tree.rootNode()?.child(1).child(0).child(0).child(0).get('id')).to.equal(6);

			// showTree(tree);
		});
	})


	describe('Contains', () => {
		it('Search element when he does exists', () => {
			tree = generateTreeDefault();
			const targetNode = tree.contains((currentNode) => {
				return currentNode.get('id') === 7;
			});

			expect(targetNode instanceof Node).to.equal(true);
			expect(targetNode.get('id')).to.equal(7);
		});

		it('Search element when he does not exists',  () => {
			tree = generateTreeDefault();
			const targetNode = tree.contains((currentNode) => {
				return currentNode.get('id') === 100;
			});

			expect(targetNode).to.equal(null); // ts version changed to null
		});
	})

	describe('Remove', () => {
		it('Remove correct criteria', () => {
			tree = generateTreeDefault();
			const result = tree.remove((currentNode) => {
				return currentNode.get('id') === 7;
			});
			const targetNode = tree.contains((currentNode) => {
				return currentNode.get('id') === 7;
			});

			expect(result).to.equal(true);
			expect(targetNode).to.equal(null); // ts version changed to null
		});

		it('Remove incorrect criteria', function () {
			tree = generateTreeDefault();
			const result = tree.remove((currentNode) => {
				return currentNode.get('id') === 100;
			});
			const targetNode = tree.contains((currentNode) => {
				return currentNode.get('id') === 100;
			});

			expect(result).to.equal(false);
			expect(targetNode).to.equal(null); // ts version changed to null
		});
	})


	describe('Move', () => {
		it('Move exists branch', () => {
			tree = generateTreeDefault();
			const search = (currentNode) => currentNode.get('id') === 7;
			const destination = (currentNode) => currentNode.get('id') === 3;
			const result = tree.move(search, destination);
			const targetNode = tree.contains(search);

			expect(result).to.equal(true);
			expect(targetNode.get('id')).to.equal(7);
			expect(targetNode.parent().get('id')).to.equal(3);

			// showTree(tree);
		});

		it('Move not exists branch', function () {
			tree = generateTreeDefault();
			const search = (currentNode) => currentNode.get('id') === 100
			const destination = (currentNode) => currentNode.get('id') === 3;
			const result = tree.move(search, destination);
			const targetNode = tree.contains(search);

			expect(result).to.equal(false);
			//expect(targetNode).to.equal(undefined);
			expect(targetNode).to.equal(null); // ts version changed to null
		});

	})

	describe('Traversal',  () => {
		it('Add new field for item.id === 7',  () => {
			tree = generateTreeDefault();
			const criteria = (currentNode:Node) => currentNode.get('id') === 7;
			tree.traversal(criteria, (currentNode) => {
				currentNode.set('some', true);
			});
			// showTree(tree);
			tree.traversal(null, (currentNode) => {
				const some = currentNode.get('some');
				expect(some).to.equal((currentNode.get('id') === 7) ? true : undefined);
			});
		});

		it('Add new property for each node', () => {
			tree = generateTreeDefault();
			tree.traversal(null, (currentNode) => {
				currentNode.set('some', true);
			});

			tree.traversal(null, (currentNode) => {
				const some = currentNode.get('some');
				expect(some).to.equal(true);
			});
		});

		it('Add new property only for even nodes', () => {
			tree = generateTreeDefault();
			tree.traversal(null, (currentNode) => {
				if (currentNode.get('id') % 2 === 0) {
					currentNode.set('some', true);
				}
			});

			tree.traversal(null, (currentNode) => {
				const some = currentNode.get('some');
				if (currentNode.get('id') % 2 === 0) {
					expect(some).to.equal(true);
				} else {
					expect(some).to.equal(undefined);
				}
			});
		});

	})


	describe('Sort',  () => {
		it('Order desc', () => {
			tree = generateTreeDefault();
			tree.sort(compareById(false));

			// showTree(tree);
			expect(tree.rootNode().child(0).get('id')).to.equal(3);
			expect(tree.rootNode().child(1).get('id')).to.equal(2);
		});

		it('Order asc', () => {
			tree = generateTreeDefault();
			tree.sort(compareById(false));
			tree.sort(compareById(true));

			// showTree(tree);
			expect(tree.rootNode().child(0).get('id')).to.equal(2);
			expect(tree.rootNode().child(1).get('id')).to.equal(3);
		});

	})

	describe('getPath', () => {
		it('Get path 1 - 6', () => {
			tree = generateTreeDefault();
			const criteria = (currentNode) => currentNode.get('id') === 6;
			const targetNode = tree.contains(criteria);
			const path = targetNode.getPath();
			const pathString = path
				.map((item) => item.get('id'))
				.join(',');

			expect(pathString).to.equal('1,3,4,5,6');
		});

		it('Get path 1 - 8', () => {
			tree = generateTreeDefault();
			const criteria = (currentNode) => currentNode.get('id') === 8;
			const targetNode = tree.contains(criteria);
			const path = targetNode.getPath();
			const pathString = path
				.map((item) => item.get('id'))
				.join(',');

			expect(pathString).to.equal('1,2,7,8');
		});

		it('Get path 1 - 2', () => {
			tree = generateTreeDefault();
			const criteria = (currentNode) => currentNode.get('id') === 2;
			const targetNode = tree.contains(criteria);
			const path = targetNode.getPath();
			const pathString = path
				.map((item) => item.get('id'))
				.join(',');

			expect(pathString).to.equal('1,2');
		});
	})

	describe('toJson',  () => {
		it('Searialize tree to json', () => {
			tree = generateTreeDefault();
			const json = tree.toJson();

			expect(json.id).to.equal(1);
			expect(json.children[0].id).to.equal(2);
			expect(json.children[0].children[0].id).to.equal(7);
			expect(json.children[0].children[0].children[0].id).to.equal(8);
			expect(json.children[1].id).to.equal(3);
			expect(json.children[1].children[0].id).to.equal(4);
			expect(json.children[1].children[0].children[0].id).to.equal(5);
		});

		it('Searialize tree to json after sort desc', () => {
			tree = generateTreeDefault();
			tree.sort(compareById(false));
			const json = tree.toJson();

			expect(json.id).to.equal(1);
			expect(json.children[1].id).to.equal(2);
			expect(json.children[1].children[0].id).to.equal(7);
			expect(json.children[1].children[0].children[0].id).to.equal(8);
			expect(json.children[0].id).to.equal(3);
			expect(json.children[0].children[0].id).to.equal(4);
			expect(json.children[0].children[0].children[0].id).to.equal(5);
		});

		it('Searialize tree to json after remove element', () => {
			tree = generateTreeDefault();
			tree.remove((parentNode) => parentNode.get('id') === 2);
			const json = tree.toJson();

			expect(json.id).to.equal(1);
			expect(json.children[0].id).to.equal(3);
			expect(json.children[0].children[0].id).to.equal(4);
			expect(json.children[0].children[0].children[0].id).to.equal(5);
		});

		it('Searialize tree to json with options: key_children=child', function () {
			tree = generateTreeDefault();
			const json = tree.toJson({
				key_children: 'child',
			});

			expect(json.id).to.equal(1);
			expect(json.child[0].id).to.equal(2);
			expect(json.child[0].child[0].id).to.equal(7);
			expect(json.child[0].child[0].child[0].id).to.equal(8);
			expect(json.child[1].id).to.equal(3);
			expect(json.child[1].child[0].id).to.equal(4);
		});

	})

	describe('Options', () => {
		it('Flags: key_id and key_parent',  () => {
			const object = { uid: 1, title: 'Root' };
			const tree = new Tree(object);

			const list = [
				{ uid: 2, _parent: 1 },
				{ uid: 3, _parent: 1 },
				{ uid: 4, _parent: 3 },
				{ uid: 5, _parent: 4 },
				{ uid: 6, _parent: 5 },
				{ uid: 7, _parent: 2 },
				{ uid: 8, _parent: 7 },
			]
				.map((item) => {
					item.title = `Node ${item.uid}`;
					return item;
				})
				.forEach((item) => {
					tree.add((parentNode) => {
						return parentNode.get('uid') === item._parent;
					}, item);
				});

			// showTree(tree);
			// console.log(tree.toJson({ key_children: 'child' }));

			expect(tree instanceof Tree).to.equal(true);
			expect(tree.rootNode() instanceof Node).to.equal(true);

			expect(tree.rootNode().get('uid')).to.equal(1);
			expect(tree.rootNode().child(0).get('uid')).to.equal(2);
			expect(tree.rootNode().child(1).get('uid')).to.equal(3);

			expect(tree.rootNode().child(1).child(0).get('uid')).to.equal(4);
			expect(tree.rootNode().child(1).child(0).child(0).get('uid')).to.equal(5);
			expect(tree.rootNode().child(1).child(0).child(0).child(0).get('uid')).to.equal(6);

		});
	})

	describe('Get',  () => {
		it('Regular',  () => {
			expect(tree.get('id')).to.equal(1);
		});

		it('If not exists property', ()  => {
			expect(tree.get('uid')).to.equal(undefined);
		});
	})

	describe('Set', () => {

		it('Regular set',  () => {
			expect(tree.get('id')).to.equal(1);
			tree.set('id', 101);
			expect(tree.get('id')).to.equal(101);
		});

		it('Add new property', () => {
			expect(tree.get('some')).to.equal(undefined);
			tree.set('some', true);
			expect(tree.get('some')).to.equal(true);
		});

	});

	describe('Hide load',  () => {

		it('2000 items',  () => {
			function getRandomInt(min, max) {
				return Math.floor(Math.random() * (max - min + 1)) + min;
			}
			const list = (new Array(10000))
				.fill()
				.map((item, index) => {
					return {
						id: index + 1,
						parent: getRandomInt(0, index)
					}
				});

			tree = new Tree({ id: 0 });
			list.forEach((item, index) => {
				tree.add((parentNode) => {
					return parentNode.get('id') === item.parent;
				}, item);
			});
			const jTree = tree.toJson({
				empty_children: false,
			});

		});

	});
})
