import { describe, it, expect, beforeEach } from "vitest"
import compareById  from '@/util/NodeCompareById'
import Node from '@/class/Node'

describe('NodeCompareById', () => {
	it('compareById', () => {

		const node_a = new Node({ id: 1 })
		const node_b = new Node({ id: 2 })

		const compare_function = compareById(true)


		expect(compare_function(node_a, node_b)).toBe(-1)
		expect(compare_function(node_b, node_a)).toBe(1)
		expect(compare_function(node_a, node_a)).toBe(0)
		expect(compare_function(node_b, node_b)).toBe(0)

	})
})



