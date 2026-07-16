# Data

A collection of functions for formatting, filtering and taming wild arrays and objects.

**Lead:** Arrays and objects, oh my!

## Overview

The Data module provides utilities for manipulating arrays and objects. These functions help you sort, reverse, flatten, remove duplicates, and filter data structures efficiently. All functions use native JavaScript methods and are optimized for performance.

## Functions

### `dataSortBy(items: object | string[] | number[], options?: { property?: string, order?: 'asc' | 'desc' }): object | string[] | number[]`

Sort an array or object by a property.

**Parameters:**
- `items` (object | string[] | number[]): The array or object to sort
- `options` (object, optional):
  - `property` (string, optional): Property name to sort by (for objects/arrays of objects)
  - `order` ('asc' | 'desc', optional): Sort order. Defaults to `'asc'`

**Returns:** Sorted array or object (immutable)

**Example:**
```typescript
import { dataSortBy } from 'usemods'

// Sort array of numbers
const numbers = [3, 1, 4, 1, 5]
dataSortBy(numbers) // [1, 1, 3, 4, 5]
dataSortBy(numbers, { order: 'desc' }) // [5, 4, 3, 1, 1]

// Sort array of objects
const users = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
  { name: 'Charlie', age: 35 }
]
dataSortBy(users, { property: 'age' }) // Sorted by age ascending
dataSortBy(users, { property: 'name', order: 'desc' }) // Sorted by name descending
```

---

### `dataReverse<T extends object | string[] | number[]>(items: T): T`

Reverse an array or object.

**Parameters:**
- `items` (object | string[] | number[]): The array or object to reverse

**Returns:** Reversed array or object (immutable)

**Example:**
```typescript
import { dataReverse } from 'usemods'

// Reverse array
const arr = [1, 2, 3, 4, 5]
dataReverse(arr) // [5, 4, 3, 2, 1]

// Reverse object (order of keys)
const obj = { a: 1, b: 2, c: 3 }
dataReverse(obj) // { c: 3, b: 2, a: 1 }
```

---

### `dataRemoveDuplicates<T extends string | number>(...arrays: T[][]): T[]`

Returns single unique values within an array or object.

**Parameters:**
- `...arrays` (T[][]): One or more arrays to combine and deduplicate

**Returns:** Array of unique values

**Example:**
```typescript
import { dataRemoveDuplicates } from 'usemods'

const arr1 = [1, 2, 3, 4]
const arr2 = [3, 4, 5, 6]
const arr3 = [5, 6, 7, 8]

dataRemoveDuplicates(arr1, arr2, arr3) // [1, 2, 3, 4, 5, 6, 7, 8]
```

---

### `dataFlatten<T extends object | string[] | number[]>(items: T): T`

Flatten an array of arrays or an object of objects into a single array or object.

**Parameters:**
- `items` (object | string[] | number[]): The array or object to flatten

**Returns:** Flattened array or object

**Example:**
```typescript
import { dataFlatten } from 'usemods'

// Flatten nested arrays
const nested = [[1, 2], [3, 4], [5, 6]]
dataFlatten(nested) // [1, 2, 3, 4, 5, 6]

// Flatten nested objects
const nestedObj = {
  user: {
    name: 'Alice',
    address: {
      city: 'New York',
      zip: '10001'
    }
  }
}
dataFlatten(nestedObj) 
// {
//   'user.name': 'Alice',
//   'user.address.city': 'New York',
//   'user.address.zip': '10001'
// }
```

---

### `dataWithout<T extends object | string[] | number[]>(items: T, properties: string | number | string[] | number[]): T`

Returns an array without a property or properties.

**Parameters:**
- `items` (object | string[] | number[]): The array or object to filter
- `properties` (string | number | string[] | number[]): Property name(s) or value(s) to exclude

**Returns:** Filtered array or object

**Example:**
```typescript
import { dataWithout } from 'usemods'

// Remove values from array
const arr = [1, 2, 3, 4, 5]
dataWithout(arr, 3) // [1, 2, 4, 5]
dataWithout(arr, [2, 4]) // [1, 3, 5]

// Remove properties from object
const obj = { a: 1, b: 2, c: 3, d: 4 }
dataWithout(obj, 'b') // { a: 1, c: 3, d: 4 }
dataWithout(obj, ['b', 'd']) // { a: 1, c: 3 }
```

---

## Usage Examples

### Sorting and Filtering Data

```typescript
import { dataSortBy, dataWithout, dataRemoveDuplicates } from 'usemods'

// Process user data
const users = [
  { id: 1, name: 'Alice', age: 30, role: 'admin' },
  { id: 2, name: 'Bob', age: 25, role: 'user' },
  { id: 3, name: 'Charlie', age: 35, role: 'admin' },
  { id: 4, name: 'Diana', age: 28, role: 'user' }
]

// Sort by age descending
const sortedByAge = dataSortBy(users, { property: 'age', order: 'desc' })

// Remove admin users
const regularUsers = users.filter(u => u.role !== 'admin')

// Get unique roles
const roles = dataRemoveDuplicates(users.map(u => u.role))
```

### Flattening Nested Structures

```typescript
import { dataFlatten } from 'usemods'

// Flatten API response
const apiResponse = {
  data: {
    users: [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' }
    ],
    meta: {
      page: 1,
      total: 2
    }
  }
}

const flattened = dataFlatten(apiResponse)
// {
//   'data.users.0.id': 1,
//   'data.users.0.name': 'Alice',
//   'data.users.1.id': 2,
//   'data.users.1.name': 'Bob',
//   'data.meta.page': 1,
//   'data.meta.total': 2
// }
```

### Combining and Deduplicating Arrays

```typescript
import { dataRemoveDuplicates, dataSortBy } from 'usemods'

// Combine tags from multiple posts
const post1Tags = ['javascript', 'react', 'typescript']
const post2Tags = ['react', 'vue', 'javascript']
const post3Tags = ['angular', 'typescript', 'vue']

const allTags = dataRemoveDuplicates(post1Tags, post2Tags, post3Tags)
// ['javascript', 'react', 'typescript', 'vue', 'angular']

const sortedTags = dataSortBy(allTags)
// ['angular', 'javascript', 'react', 'typescript', 'vue']
```

---

## Notes

- All functions use immutable operations (ES2023 methods like `toSorted` and `toReversed` when available, with fallbacks)
- Functions work with both arrays and objects where applicable
- `dataFlatten` for objects creates dot-notation keys for nested properties
- `dataSortBy` uses native JavaScript comparison, so strings are sorted alphabetically and numbers numerically
- Empty arrays/objects return as-is without warnings (except `dataReverse` which warns on empty input)
