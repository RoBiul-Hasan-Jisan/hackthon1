import { AlgorithmMetadata } from '@/lib/types';

export const algorithms: AlgorithmMetadata[] = [
  // Sorting Algorithms
  {
    id: 'bubble-sort',
    name: 'Bubble Sort',
    category: 'sorting',
    description: 'Simple sorting algorithm that repeatedly steps through the list and swaps adjacent elements.',
    complexity: {
      time: 'O(n²)',
      space: 'O(1)',
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    pseudoCode: `procedure bubbleSort(A : list of sortable items)
    n := length(A)
    for i := 0 to n - 1 do
        for j := 0 to n - i - 2 do
            if A[j] > A[j + 1] then
                swap(A[j], A[j + 1])
            end if
        end for
    end for
end procedure`,
    explanation:
      'Bubble Sort works by repeatedly stepping through the list, comparing adjacent elements, and swapping them if they are in the wrong order. This process continues until the list is sorted.',
    realWorldApplications: [
      'Educational purposes',
      'Small datasets',
      'Nearly sorted data',
    ],
    difficulty: 'easy',
    tags: ['sorting', 'comparison', 'in-place', 'stable'],
  },
  {
    id: 'quick-sort',
    name: 'Quick Sort',
    category: 'sorting',
    description: 'Efficient divide-and-conquer sorting algorithm using partitioning.',
    complexity: {
      time: 'O(n log n)',
      space: 'O(log n)',
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)',
    },
    pseudoCode: `procedure quickSort(A : list, low : integer, high : integer)
    if low < high then
        pi := partition(A, low, high)
        quickSort(A, low, pi - 1)
        quickSort(A, pi + 1, high)
    end if
end procedure`,
    explanation:
      'Quick Sort divides the array into smaller subarrays by selecting a pivot element and partitioning around it. It recursively sorts the subarrays.',
    realWorldApplications: [
      'General purpose sorting',
      'Large datasets',
      'Programming language implementations',
    ],
    difficulty: 'hard',
    tags: ['sorting', 'divide-and-conquer', 'comparison', 'unstable'],
  },
  {
    id: 'merge-sort',
    name: 'Merge Sort',
    category: 'sorting',
    description: 'Stable divide-and-conquer sorting algorithm that divides the array and merges sorted subarrays.',
    complexity: {
      time: 'O(n log n)',
      space: 'O(n)',
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
    },
    pseudoCode: `procedure mergeSort(A : list, left : integer, right : integer)
    if left < right then
        mid := (left + right) / 2
        mergeSort(A, left, mid)
        mergeSort(A, mid + 1, right)
        merge(A, left, mid, right)
    end if
end procedure`,
    explanation:
      'Merge Sort divides the array into halves, recursively sorts them, and then merges the sorted subarrays back together.',
    realWorldApplications: [
      'External sorting',
      'Stable sorting requirement',
      'Linked list sorting',
    ],
    difficulty: 'medium',
    tags: ['sorting', 'divide-and-conquer', 'comparison', 'stable'],
  },
  {
    id: 'insertion-sort',
    name: 'Insertion Sort',
    category: 'sorting',
    description: 'Builds the final sorted array one item at a time by inserting elements into their correct position.',
    complexity: {
      time: 'O(n²)',
      space: 'O(1)',
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    pseudoCode: `procedure insertionSort(A : list)
    for i := 1 to length(A) - 1 do
        key := A[i]
        j := i - 1
        while j >= 0 and A[j] > key do
            A[j + 1] := A[j]
            j := j - 1
        end while
        A[j + 1] := key
    end for
end procedure`,
    explanation:
      'Insertion Sort builds the sorted array one item at a time. It iterates through an input array, and for each element, it finds the correct position in the sorted part and inserts it there.',
    realWorldApplications: [
      'Small datasets',
      'Nearly sorted data',
      'Online sorting',
    ],
    difficulty: 'easy',
    tags: ['sorting', 'comparison', 'in-place', 'stable'],
  },
  {
    id: 'selection-sort',
    name: 'Selection Sort',
    category: 'sorting',
    description: 'Simple sorting algorithm that repeatedly finds the minimum element and places it at the beginning.',
    complexity: {
      time: 'O(n²)',
      space: 'O(1)',
      best: 'O(n²)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    pseudoCode: `procedure selectionSort(A : list)
    for i := 0 to length(A) - 1 do
        minIdx := i
        for j := i + 1 to length(A) - 1 do
            if A[j] < A[minIdx] then
                minIdx := j
            end if
        end for
        swap(A[i], A[minIdx])
    end for
end procedure`,
    explanation:
      'Selection Sort repeatedly finds the minimum element from the unsorted portion and places it at the beginning.',
    realWorldApplications: [
      'Educational purposes',
      'Memory write optimization',
      'Small datasets',
    ],
    difficulty: 'easy',
    tags: ['sorting', 'comparison', 'in-place', 'unstable'],
  },
  // Searching Algorithms
  {
    id: 'linear-search',
    name: 'Linear Search',
    category: 'searching',
    description: 'Sequential search algorithm that checks each element until the target is found.',
    complexity: {
      time: 'O(n)',
      space: 'O(1)',
    },
    pseudoCode: `procedure linearSearch(A : list, target : item)
    for i := 0 to length(A) - 1 do
        if A[i] = target then
            return i
        end if
    end for
    return -1
end procedure`,
    explanation:
      'Linear Search sequentially checks each element of the list until the target value is found or the list ends.',
    realWorldApplications: [
      'Unsorted lists',
      'Linked lists',
      'Small datasets',
    ],
    difficulty: 'easy',
    tags: ['searching', 'sequential', 'comparison'],
  },
  {
    id: 'binary-search',
    name: 'Binary Search',
    category: 'searching',
    description: 'Efficient search algorithm for sorted arrays that divides the search space in half.',
    complexity: {
      time: 'O(log n)',
      space: 'O(1)',
    },
    pseudoCode: `procedure binarySearch(A : sorted list, target : item)
    left := 0
    right := length(A) - 1
    while left <= right do
        mid := (left + right) / 2
        if A[mid] = target then
            return mid
        else if A[mid] < target then
            left := mid + 1
        else
            right := mid - 1
        end if
    end while
    return -1
end procedure`,
    explanation:
      'Binary Search works on sorted arrays by repeatedly dividing the search space in half, eliminating half of the remaining elements with each comparison.',
    realWorldApplications: [
      'Database indexing',
      'Search engines',
      'Sorted data retrieval',
    ],
    difficulty: 'medium',
    tags: ['searching', 'binary', 'logarithmic'],
  },
  // Graph Algorithms
  {
    id: 'bfs',
    name: 'Breadth-First Search (BFS)',
    category: 'graphs',
    description: 'Graph traversal algorithm that explores vertices in layers, visiting all neighbors before moving deeper.',
    complexity: {
      time: 'O(V + E)',
      space: 'O(V)',
    },
    pseudoCode: `procedure BFS(G : graph, start : vertex)
    queue := empty queue
    visited := empty set
    queue.enqueue(start)
    visited.add(start)
    while queue is not empty do
        v := queue.dequeue()
        for each neighbor u of v do
            if u not in visited then
                visited.add(u)
                queue.enqueue(u)
            end if
        end for
    end while
end procedure`,
    explanation:
      'BFS explores a graph level by level, starting from the source vertex and visiting all vertices at distance k before visiting vertices at distance k+1.',
    realWorldApplications: [
      'Shortest path finding',
      'Social network analysis',
      'Web crawling',
      'Puzzle solving',
    ],
    difficulty: 'medium',
    tags: ['graphs', 'traversal', 'queue'],
  },
  {
    id: 'dfs',
    name: 'Depth-First Search (DFS)',
    category: 'graphs',
    description: 'Graph traversal algorithm that explores as far as possible along each branch before backtracking.',
    complexity: {
      time: 'O(V + E)',
      space: 'O(V)',
    },
    pseudoCode: `procedure DFS(G : graph, v : vertex, visited : set)
    visited.add(v)
    for each neighbor u of v do
        if u not in visited then
            DFS(G, u, visited)
        end if
    end for
end procedure`,
    explanation:
      'DFS explores the graph by going as deep as possible along each branch before backtracking, using a stack or recursion.',
    realWorldApplications: [
      'Topological sorting',
      'Cycle detection',
      'Maze solving',
      'Connected components',
    ],
    difficulty: 'medium',
    tags: ['graphs', 'traversal', 'recursive', 'stack'],
  },
  {
    id: 'dijkstra',
    name: "Dijkstra's Algorithm",
    category: 'graphs',
    description: 'Shortest path algorithm that finds the shortest path between nodes in a weighted graph.',
    complexity: {
      time: 'O((V + E) log V)',
      space: 'O(V)',
    },
    pseudoCode: `procedure Dijkstra(G : graph, start : vertex)
    distances := map with all distances = infinity
    distances[start] := 0
    unvisited := all vertices
    while unvisited is not empty do
        v := unvisited vertex with minimum distance
        remove v from unvisited
        for each neighbor u of v do
            alt := distances[v] + weight(v, u)
            if alt < distances[u] then
                distances[u] := alt
            end if
        end for
    end while
end procedure`,
    explanation:
      "Dijkstra's Algorithm finds the shortest path from a source vertex to all other vertices in a weighted graph with non-negative weights.",
    realWorldApplications: [
      'GPS navigation',
      'Network routing',
      'Social networks',
      'Game pathfinding',
    ],
    difficulty: 'hard',
    tags: ['graphs', 'shortest-path', 'weighted', 'greedy'],
  },
  // Tree Algorithms
  {
    id: 'tree-traversal-inorder',
    name: 'Tree Traversal - Inorder',
    category: 'trees',
    description: 'Tree traversal method that visits nodes in left-root-right order (Left, Root, Right).',
    complexity: {
      time: 'O(n)',
      space: 'O(h)',
    },
    pseudoCode: `procedure inorder(node : TreeNode)
    if node is not null then
        inorder(node.left)
        process(node)
        inorder(node.right)
    end if
end procedure`,
    explanation:
      'Inorder traversal visits the left subtree, then the node, then the right subtree. For BSTs, this gives elements in sorted order.',
    realWorldApplications: [
      'Binary search tree sorting',
      'Expression tree evaluation',
      'Threaded trees',
    ],
    difficulty: 'medium',
    tags: ['trees', 'traversal', 'recursive'],
  },
  {
    id: 'tree-traversal-preorder',
    name: 'Tree Traversal - Preorder',
    category: 'trees',
    description: 'Tree traversal method that visits nodes in root-left-right order (Root, Left, Right).',
    complexity: {
      time: 'O(n)',
      space: 'O(h)',
    },
    pseudoCode: `procedure preorder(node : TreeNode)
    if node is not null then
        process(node)
        preorder(node.left)
        preorder(node.right)
    end if
end procedure`,
    explanation:
      'Preorder traversal visits the node first, then its left subtree, then its right subtree. Useful for copying trees.',
    realWorldApplications: [
      'Tree copying',
      'Expression tree evaluation',
      'Serialization',
    ],
    difficulty: 'medium',
    tags: ['trees', 'traversal', 'recursive'],
  },
  {
    id: 'tree-traversal-postorder',
    name: 'Tree Traversal - Postorder',
    category: 'trees',
    description: 'Tree traversal method that visits nodes in left-right-root order (Left, Right, Root).',
    complexity: {
      time: 'O(n)',
      space: 'O(h)',
    },
    pseudoCode: `procedure postorder(node : TreeNode)
    if node is not null then
        postorder(node.left)
        postorder(node.right)
        process(node)
    end if
end procedure`,
    explanation:
      'Postorder traversal visits the left and right subtrees before the node itself. Useful for deleting trees.',
    realWorldApplications: [
      'Tree deletion',
      'Expression evaluation',
      'Post-processing trees',
    ],
    difficulty: 'medium',
    tags: ['trees', 'traversal', 'recursive'],
  },
  // Dynamic Programming
  {
    id: 'fibonacci',
    name: 'Fibonacci Sequence',
    category: 'dynamic-programming',
    description: 'Classic DP problem computing Fibonacci numbers with memoization.',
    complexity: {
      time: 'O(n)',
      space: 'O(n)',
    },
    pseudoCode: `procedure fibonacci(n : integer)
    if n <= 1 then
        return n
    end if
    memo := array of size n + 1
    memo[0] := 0
    memo[1] := 1
    for i := 2 to n do
        memo[i] := memo[i - 1] + memo[i - 2]
    end for
    return memo[n]
end procedure`,
    explanation:
      'Dynamic Programming solves Fibonacci by storing previously computed values to avoid redundant calculations.',
    realWorldApplications: [
      'Mathematical sequences',
      'Financial calculations',
      'Population modeling',
    ],
    difficulty: 'easy',
    tags: ['dynamic-programming', 'memoization', 'mathematical'],
  },
  {
    id: 'knapsack',
    name: '0/1 Knapsack Problem',
    category: 'dynamic-programming',
    description: 'Classic optimization problem using dynamic programming to maximize value with weight constraints.',
    complexity: {
      time: 'O(n * W)',
      space: 'O(n * W)',
    },
    pseudoCode: `procedure knapsack(items : list, capacity : integer)
    n := length(items)
    dp := 2D array [n + 1][capacity + 1]
    for i := 0 to n do
        for w := 0 to capacity do
            if i = 0 or w = 0 then
                dp[i][w] := 0
            else if items[i].weight <= w then
                dp[i][w] := max(items[i].value + dp[i-1][w-items[i].weight], dp[i-1][w])
            else
                dp[i][w] := dp[i-1][w]
            end if
        end for
    end for
    return dp[n][capacity]
end procedure`,
    explanation:
      'The 0/1 Knapsack problem uses DP to find the optimal combination of items that maximizes value while staying within weight capacity.',
    realWorldApplications: [
      'Resource allocation',
      'Portfolio optimization',
      'Cargo loading',
    ],
    difficulty: 'hard',
    tags: ['dynamic-programming', 'optimization', 'combinatorial'],
  },
  // Recursion
  {
    id: 'factorial',
    name: 'Factorial',
    category: 'recursion',
    description: 'Simple recursive algorithm to calculate factorial of a number.',
    complexity: {
      time: 'O(n)',
      space: 'O(n)',
    },
    pseudoCode: `procedure factorial(n : integer)
    if n <= 1 then
        return 1
    else
        return n * factorial(n - 1)
    end if
end procedure`,
    explanation:
      'Factorial is computed recursively by multiplying n by the factorial of n-1, with the base case of 1.',
    realWorldApplications: [
      'Mathematical calculations',
      'Combinatorics',
      'Permutations',
    ],
    difficulty: 'easy',
    tags: ['recursion', 'mathematical', 'base-case'],
  },
  // String Algorithms
  {
    id: 'string-reversal',
    name: 'String Reversal',
    category: 'strings',
    description: 'Algorithm to reverse a string using recursion or iteration.',
    complexity: {
      time: 'O(n)',
      space: 'O(n)',
    },
    pseudoCode: `procedure reverseString(s : string)
    reversed := ""
    for i := length(s) - 1 downto 0 do
        reversed := reversed + s[i]
    end for
    return reversed
end procedure`,
    explanation: 'String reversal iterates through the string from end to beginning and constructs the reversed string.',
    realWorldApplications: [
      'Text processing',
      'Palindrome checking',
      'Data transformation',
    ],
    difficulty: 'easy',
    tags: ['strings', 'iteration', 'simple'],
  },
  // Math Algorithms
  {
    id: 'gcd',
    name: 'Greatest Common Divisor (GCD)',
    category: 'math',
    description: 'Euclidean algorithm to find the greatest common divisor of two numbers.',
    complexity: {
      time: 'O(log(min(a, b)))',
      space: 'O(1)',
    },
    pseudoCode: `procedure gcd(a : integer, b : integer)
    while b != 0 do
        temp := b
        b := a mod b
        a := temp
    end while
    return a
end procedure`,
    explanation:
      'The Euclidean algorithm finds GCD by repeatedly replacing the larger number with the remainder of dividing the larger by the smaller.',
    realWorldApplications: [
      'Number theory',
      'Cryptography',
      'Ratio simplification',
    ],
    difficulty: 'easy',
    tags: ['math', 'number-theory', 'algorithm'],
  },
];
