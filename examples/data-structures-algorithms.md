# Data Structures & Algorithms 💻

Essential Concepts for Software Engineers

---

## Why Study DSA?

**Data Structures** organize data efficiently
**Algorithms** process data effectively

Together they enable:
- ⚡ Better performance
- 🧠 Problem-solving skills
- 💼 Career opportunities
- 🏗️ Scalable systems

---

## Big O Notation

Describes algorithm efficiency as input grows

**Common Complexities:**
```
O(1)         - Constant
O(log n)     - Logarithmic
O(n)         - Linear
O(n log n)   - Linearithmic
O(n²)        - Quadratic
O(2ⁿ)        - Exponential
```

---

## Time vs Space Complexity

**Time Complexity**: How long it takes
**Space Complexity**: How much memory it uses

Often there's a trade-off between the two!

```python
# Time: O(1), Space: O(n)
cache = {}

# Time: O(n), Space: O(1)
# Compute on demand
```

---

## Arrays

Contiguous memory locations storing same-type elements

**Strengths:**
- O(1) access by index
- Cache-friendly
- Simple and ubiquitous

**Weaknesses:**
- Fixed size (in many languages)
- O(n) insertion/deletion

---

## Array Operations

```javascript
// Access: O(1)
const value = arr[5]

// Search: O(n)
const index = arr.indexOf(42)

// Insert at end: O(1) amortized
arr.push(100)

// Insert at beginning: O(n)
arr.unshift(0)

// Delete: O(n)
arr.splice(index, 1)
```

---

## Linked Lists

Nodes connected by pointers/references

```javascript
class Node {
  constructor(data) {
    this.data = data
    this.next = null
  }
}

class LinkedList {
  constructor() {
    this.head = null
  }
}
```

---

## Linked List Operations

**Advantages:**
- O(1) insertion/deletion at beginning
- Dynamic size
- Easy restructuring

**Disadvantages:**
- O(n) access by index
- Extra memory for pointers
- Not cache-friendly

---

## Stacks (LIFO)

Last In, First Out

```javascript
class Stack {
  constructor() {
    this.items = []
  }
  
  push(element) {
    this.items.push(element)
  }
  
  pop() {
    return this.items.pop()
  }
  
  peek() {
    return this.items[this.items.length - 1]
  }
}
```

**Use Cases**: Function calls, undo/redo, expression evaluation

---

## Queues (FIFO)

First In, First Out

```javascript
class Queue {
  constructor() {
    this.items = []
  }
  
  enqueue(element) {
    this.items.push(element)
  }
  
  dequeue() {
    return this.items.shift()
  }
  
  front() {
    return this.items[0]
  }
}
```

**Use Cases**: Task scheduling, BFS, message queues

---

## Hash Tables / Maps

Key-value pairs with O(1) average access

```javascript
const map = new Map()

// Insert: O(1) average
map.set('key', 'value')

// Access: O(1) average
const value = map.get('key')

// Delete: O(1) average
map.delete('key')

// Check existence: O(1)
map.has('key')
```

---

## Hash Table Collisions

**Collision Resolution:**

1. **Chaining**: Store collisions in linked list
2. **Open Addressing**: Find next empty slot

**Load Factor**: n/m (items/buckets)
- Keep < 0.75 for good performance
- Resize and rehash when exceeded

---

## Trees: Basic Structure

```javascript
class TreeNode {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
}
```

**Properties:**
- Root node at top
- Parent-child relationships
- Leaf nodes at bottom
- Height: longest path from root to leaf

---

## Binary Search Trees (BST)

Left subtree < parent < right subtree

```javascript
class BST {
  insert(value) {
    // If value < current: go left
    // If value > current: go right
    // Insert when we hit null
  }
  
  search(value) {
    // Similar traversal
    // O(log n) average
    // O(n) worst case (unbalanced)
  }
}
```

---

## Tree Traversals

```javascript
// In-order (Left, Root, Right)
function inorder(node) {
  if (!node) return
  inorder(node.left)
  console.log(node.value)
  inorder(node.right)
}

// Pre-order (Root, Left, Right)
// Post-order (Left, Right, Root)
// Level-order (BFS)
```

---

## Balanced Trees

**AVL Trees**: Height-balanced BST
- Height difference ≤ 1
- Rotations maintain balance

**Red-Black Trees**: Self-balancing BST
- Color properties ensure balance
- Used in many standard libraries

**Guarantees**: O(log n) operations

---

## Heaps

Complete binary tree with heap property

**Min Heap**: Parent ≤ children
**Max Heap**: Parent ≥ children

```javascript
// Priority Queue operations
insert(value)     // O(log n)
extractMin()      // O(log n)
peek()           // O(1)
```

**Use Cases**: Priority queues, heap sort, scheduling

---

## Graphs: Fundamentals

Vertices (nodes) connected by edges

**Types:**
- Directed vs Undirected
- Weighted vs Unweighted
- Cyclic vs Acyclic
- Connected vs Disconnected

---

## Graph Representations

**Adjacency Matrix**: 2D array
```javascript
// Space: O(V²)
// Edge check: O(1)
const graph = [
  [0, 1, 0],
  [1, 0, 1],
  [0, 1, 0]
]
```

**Adjacency List**: Array of lists
```javascript
// Space: O(V + E)
// Edge check: O(degree)
const graph = {
  0: [1],
  1: [0, 2],
  2: [1]
}
```

---

## Breadth-First Search (BFS)

Explore level by level

```javascript
function bfs(graph, start) {
  const queue = [start]
  const visited = new Set([start])
  
  while (queue.length > 0) {
    const node = queue.shift()
    console.log(node)
    
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor)
        queue.push(neighbor)
      }
    }
  }
}
```

**Time**: O(V + E) | **Space**: O(V)

---

## Depth-First Search (DFS)

Explore deeply before backtracking

```javascript
function dfs(graph, node, visited = new Set()) {
  visited.add(node)
  console.log(node)
  
  for (const neighbor of graph[node]) {
    if (!visited.has(neighbor)) {
      dfs(graph, neighbor, visited)
    }
  }
}
```

**Time**: O(V + E) | **Space**: O(V)

---

## Sorting: Bubble Sort

```javascript
function bubbleSort(arr) {
  const n = arr.length
  
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }
  
  return arr
}
```

**Time**: O(n²) | **Space**: O(1)
Simple but inefficient!

---

## Sorting: Merge Sort

Divide and conquer approach

```javascript
function mergeSort(arr) {
  if (arr.length <= 1) return arr
  
  const mid = Math.floor(arr.length / 2)
  const left = mergeSort(arr.slice(0, mid))
  const right = mergeSort(arr.slice(mid))
  
  return merge(left, right)
}
```

**Time**: O(n log n) | **Space**: O(n)
Stable and predictable!

---

## Sorting: Quick Sort

Partition around pivot

```javascript
function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pivotIndex = partition(arr, low, high)
    quickSort(arr, low, pivotIndex - 1)
    quickSort(arr, pivotIndex + 1, high)
  }
  return arr
}
```

**Time**: O(n log n) average, O(n²) worst
**Space**: O(log n)
Usually fastest in practice!

---

## Binary Search

```javascript
function binarySearch(arr, target) {
  let left = 0
  let right = arr.length - 1
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    
    if (arr[mid] === target) return mid
    if (arr[mid] < target) left = mid + 1
    else right = mid - 1
  }
  
  return -1
}
```

**Time**: O(log n) | **Space**: O(1)
Requires sorted array!

---

## Dynamic Programming

Solve complex problems by breaking into subproblems

**Key Concepts:**
1. Optimal substructure
2. Overlapping subproblems

**Approaches:**
- Top-down (Memoization)
- Bottom-up (Tabulation)

---

## DP Example: Fibonacci

**Naive Recursion**: O(2ⁿ)
```javascript
function fib(n) {
  if (n <= 1) return n
  return fib(n - 1) + fib(n - 2)
}
```

**Memoization**: O(n)
```javascript
function fib(n, memo = {}) {
  if (n in memo) return memo[n]
  if (n <= 1) return n
  memo[n] = fib(n - 1, memo) + fib(n - 2, memo)
  return memo[n]
}
```

---

## DP: Longest Common Subsequence

```javascript
function lcs(s1, s2) {
  const m = s1.length, n = s2.length
  const dp = Array(m + 1).fill(0)
    .map(() => Array(n + 1).fill(0))
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
      }
    }
  }
  
  return dp[m][n]
}
```

---

## Greedy Algorithms

Make locally optimal choice at each step

**When it works:**
- Problem has greedy-choice property
- Optimal substructure exists

**Examples:**
- Dijkstra's shortest path
- Huffman coding
- Activity selection

---

## Dijkstra's Algorithm

Find shortest path in weighted graph

```javascript
function dijkstra(graph, start) {
  const distances = {}
  const visited = new Set()
  const pq = new MinPriorityQueue()
  
  distances[start] = 0
  pq.enqueue(start, 0)
  
  while (!pq.isEmpty()) {
    const node = pq.dequeue()
    if (visited.has(node)) continue
    visited.add(node)
    
    for (const [neighbor, weight] of graph[node]) {
      const newDist = distances[node] + weight
      if (newDist < (distances[neighbor] ?? Infinity)) {
        distances[neighbor] = newDist
        pq.enqueue(neighbor, newDist)
      }
    }
  }
  
  return distances
}
```

---

## Backtracking

Explore all solutions, backtrack on dead ends

```javascript
function permutations(arr) {
  const result = []
  
  function backtrack(current, remaining) {
    if (remaining.length === 0) {
      result.push([...current])
      return
    }
    
    for (let i = 0; i < remaining.length; i++) {
      current.push(remaining[i])
      backtrack(
        current,
        remaining.filter((_, idx) => idx !== i)
      )
      current.pop()
    }
  }
  
  backtrack([], arr)
  return result
}
```

---

## Common Patterns: Two Pointers

```javascript
// Find pair with sum
function twoSum(arr, target) {
  arr.sort((a, b) => a - b)
  let left = 0
  let right = arr.length - 1
  
  while (left < right) {
    const sum = arr[left] + arr[right]
    if (sum === target) return [left, right]
    if (sum < target) left++
    else right--
  }
  
  return null
}
```

**Time**: O(n log n) | **Space**: O(1)

---

## Common Patterns: Sliding Window

```javascript
// Max sum subarray of size k
function maxSumSubarray(arr, k) {
  let maxSum = 0
  let windowSum = 0
  
  // Initial window
  for (let i = 0; i < k; i++) {
    windowSum += arr[i]
  }
  maxSum = windowSum
  
  // Slide window
  for (let i = k; i < arr.length; i++) {
    windowSum = windowSum - arr[i - k] + arr[i]
    maxSum = Math.max(maxSum, windowSum)
  }
  
  return maxSum
}
```

---

## Problem-Solving Strategy

1. **Understand**: Clarify requirements and constraints
2. **Examples**: Work through test cases
3. **Approach**: Choose appropriate data structure/algorithm
4. **Code**: Implement solution
5. **Test**: Verify with edge cases
6. **Optimize**: Improve time/space complexity

---

## Time Complexity Cheat Sheet

| Data Structure | Access | Search | Insert | Delete |
|----------------|--------|--------|--------|--------|
| Array | O(1) | O(n) | O(n) | O(n) |
| Linked List | O(n) | O(n) | O(1) | O(1) |
| Hash Table | O(1)* | O(1)* | O(1)* | O(1)* |
| Binary Search Tree | O(log n)* | O(log n)* | O(log n)* | O(log n)* |
| Heap | O(log n) | O(n) | O(log n) | O(log n) |

*Average case

---

## Sorting Algorithm Comparison

| Algorithm | Time (Best) | Time (Avg) | Time (Worst) | Space |
|-----------|------------|-----------|-------------|-------|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) |
| Heap Sort | O(n log n) | O(n log n) | O(n log n) | O(1) |

---

## Interview Tips 🎯

1. **Communicate**: Think out loud
2. **Clarify**: Ask questions
3. **Start Simple**: Brute force first
4. **Optimize**: Improve incrementally
5. **Test**: Walk through examples
6. **Practice**: LeetCode, HackerRank

---

## Key Takeaways

✅ **Understand trade-offs** between time and space
✅ **Choose appropriate** data structures for the problem
✅ **Practice regularly** to build intuition
✅ **Learn patterns** rather than memorizing solutions
✅ **Analyze complexity** of your solutions

---

## Resources for Learning

**Books:**
- "Introduction to Algorithms" (CLRS)
- "Cracking the Coding Interview"
- "Algorithm Design Manual"

**Websites:**
- LeetCode
- HackerRank
- AlgoExpert
- NeetCode

---

## Thank You! 💪

Keep practicing, keep learning!

**Remember:**
- Consistency beats intensity
- Understand, don't memorize
- Focus on fundamentals
- Learn from mistakes

*Happy coding!* 🚀
