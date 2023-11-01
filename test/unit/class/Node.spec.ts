import { describe, it, expect, beforeEach } from "vitest"
import  Node  from '@/class/Node'
import compareById from '@/util/NodeCompareById'




describe('Node', () => {
	const rootContent = {
		id: 1,
		name: 'Root',
	}
	let node = new Node(rootContent);
	beforeEach(() => {
		node = new Node(rootContent);
	})
	describe('Constructor', () => {

		it('Check children and content field', () => {
			const children = node.children()
			const content = node.content()

			expect (Array.isArray(children)).toBe(true);
			expect(children).to.have.lengthOf(0);
			expect(content.name).to.equal(rootContent.name);
		})

		it('Check correct work getter', () => {
			//assert.equal(rootContent.name, node.get('name'));
			// expect(node.get('lastname')).to.equal(undefined);

			expect(node.get('name')).to.equal(rootContent.name);
			expect(node.get('lastname')).to.equal(undefined);
		})

	})


	describe('Get', () => {
		it('Method get with correct path', () => {
			expect(node.get('id')).to.equal(1);
			expect(node.get('name')).to.equal('Root');
		})

		it('Method get with incorrect path',  () => {
			expect(node.get('uid')).to.equal(undefined);
		});
	})

	describe('Set', () => {
		it('Method set with correct path', () => {
			expect(node.set('id', 100)).to.equal(true);
			expect(node.get('id')).to.equal(100);
		});

		it('Method set with incorrect path', function () {
			expect(node.set('uid', 101)).to.equal(true);
			expect(node.get('uid')).to.equal(101);
		});
	})

	describe('Add', () => {
		it('Add one node', () => {
			const childNode = node.add({ id: 2, name: 'Two node' });

			expect(childNode instanceof Node).to.equal(true);
			expect(node.children()).to.have.lengthOf(1);
			expect(node.length()).to.equal(1);
		});
	})

	describe('Remove',  () => {
		it('Remove exists child node',  () => {
			node.add({ id: 2, name: 'Two node' });
			node.add({ id: 3, name: 'Three node' });
			const removedNodes = node.remove((itemNode) => {
				return itemNode.get('id') === 3;
			});

			expect(node.length()).to.equal(1);
			expect(removedNodes.length).to.equal(1);
		});

		it('Remove not exists node',  () => {
			node.add({ id: 2, name: 'Two node' });
			node.add({ id: 3, name: 'Three node' });
			const removedNodes = node.remove((itemNode) => {
				return itemNode.get('id') === 333;
			});

			expect(node.length()).to.equal(2);
			expect(removedNodes.length).to.equal(0);
		});
	})

	describe('Sort', () => {
		it('Order desc', function () {
			node.add({ id: 2, name: 'Two node' });
			node.add({ id: 3, name: 'Three node' });
			node.add({ id: 15, name: 'Fifteen node' });
			node.add({ id: 4, name: 'Four node' });
			node.sort(compareById(false));

			expect(node.child(0).get('id')).to.equal(15);

			// children[1] - changed to child(1)
			expect(node.child(1).get('id')).to.equal(4);
			expect(node.child(2).get('id')).to.equal(3);
			expect(node.child(3).get('id')).to.equal(2);
		});

		it('Order asc', function () {
			node.add({ id: 2, name: 'Two node' });
			node.add({ id: 3, name: 'Three node' });
			node.add({ id: 15, name: 'Fifteen node' });
			node.add({ id: 4, name: 'Four node' });
			node.sort(compareById(true));

			expect(node.child(0).get('id')).to.equal(2);
			expect(node.child(1).get('id')).to.equal(3);
			expect(node.child(2).get('id')).to.equal(4);
			expect(node.child(3).get('id')).to.equal(15);
		});
	})

	describe('Traversal',  () => {
		it('Change name for each child',  () => {
			node.add({ id: 2, name: 'Two node' });
			node.add({ id: 3, name: 'Three node' });
			node.add({ id: 15, name: 'Fifteen node' });
			node.add({ id: 4, name: 'Four node' });
			node.traversal(null, (currentNode) => {
				const name = currentNode.get('name');
				currentNode.set('name', `${name}!`);
			});
			expect(node.child(0).get('name')).to.equal('Two node!');
			expect(node.child(1).get('name')).to.equal('Three node!');
		});

		it('Change name for item with id is 3', function () {
			node.add({ id: 2, name: 'Two node' });
			node.add({ id: 3, name: 'Three node' });
			node.add({ id: 15, name: 'Fifteen node' });
			node.add({ id: 4, name: 'Four node' });
			node.traversal((currentNode) => currentNode.get('id') === 3, (currentNode) => {
				const name = currentNode.get('name');
				currentNode.set('name', `${name}!`);
			});
			expect(node.child(0).get('name')).to.equal('Two node');
			expect(node.child(1).get('name')).to.equal('Three node!');
		});
	})

	
})

describe('Node', () => {
	const rootContent = {
		id: 1,
		name: 'Root',
	}
	let node = new Node(rootContent);
	beforeEach(() => {
		node = new Node(rootContent);
	})
	describe('getPath', () => {
		it('getPath', () => {
			const childNode = node.add({ id: 2, name: 'Two node' });
			const childChildNode = childNode.add({ id: 3, name: 'Three node' });
			const childChildChildNode = childChildNode.add({ id: 4, name: 'Four node' });
			const path = childChildChildNode.getPath();

			expect(path).to.have.lengthOf(4);
			expect(path[0].get('id')).to.equal(1);
			expect(path[1].get('id')).to.equal(2);
			expect(path[2].get('id')).to.equal(3);
			expect(path[3].get('id')).to.equal(4);
		})

	})
})
	