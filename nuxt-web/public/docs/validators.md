# Validators

A collection of validators for common data types.

**Lead:** Hmmmm what is that?

## Overview

The Validators module provides comprehensive validation functions for checking data types, formats, and values. These utilities help you validate emails, URLs, numbers, dates, coordinates, and more.

## Functions

### `isEmail(value: string): boolean`

Check if any given value is a valid email address.

**Parameters:**
- `value` (string): Value to validate

**Returns:** true if valid email, false otherwise

**Example:**
```typescript
import { isEmail } from 'usemods'

isEmail('user@example.com') // true
isEmail('invalid.email') // false
isEmail('user@domain') // false
```

---

### `isNumber(value: unknown): boolean`

Check if any given value is a valid number.

**Parameters:**
- `value` (unknown): Value to validate

**Returns:** true if valid finite number, false otherwise

**Example:**
```typescript
import { isNumber } from 'usemods'

isNumber(123) // true
isNumber('123') // false
isNumber(NaN) // false
isNumber(Infinity) // false
```

---

### `isUrl(value: string): boolean`

Check if any given value is a valid URL.

**Parameters:**
- `value` (string): Value to validate

**Returns:** true if valid URL, false otherwise

**Example:**
```typescript
import { isUrl } from 'usemods'

isUrl('https://example.com') // true
isUrl('http://localhost:3000') // true
isUrl('not-a-url') // false
```

---

### `isEmpty(value: string | string[] | number[] | object | null | undefined): boolean`

Check if any given string, array or object is empty.

**Parameters:**
- `value` (string | string[] | number[] | object | null | undefined): Value to check

**Returns:** true if empty, false otherwise

**Example:**
```typescript
import { isEmpty } from 'usemods'

isEmpty('') // true
isEmpty([]) // true
isEmpty({}) // true
isEmpty(null) // true
isEmpty('hello') // false
isEmpty([1, 2, 3]) // false
```

---

### `isUuid(value: unknown): boolean`

Check if any given value is a valid UUID.

**Parameters:**
- `value` (unknown): Value to validate

**Returns:** true if valid UUID, false otherwise

**Example:**
```typescript
import { isUuid } from 'usemods'

isUuid('550e8400-e29b-41d4-a716-446655440000') // true
isUuid('invalid-uuid') // false
```

---

### `isJson(value: unknown): boolean`

Check if any given value is a valid JSON string.

**Parameters:**
- `value` (unknown): Value to validate

**Returns:** true if valid JSON, false otherwise

**Example:**
```typescript
import { isJson } from 'usemods'

isJson('{"key": "value"}') // true
isJson('{"invalid": json}') // false
isJson('plain string') // false
```

---

### `isObject(value: unknown): boolean`

Check if any given value is an object.

**Parameters:**
- `value` (unknown): Value to validate

**Returns:** true if plain object, false otherwise

**Example:**
```typescript
import { isObject } from 'usemods'

isObject({}) // true
isObject({ key: 'value' }) // true
isObject([]) // false (arrays are not plain objects)
isObject(null) // false
```

---

### `isArray(value: string[] | number[]): boolean`

Check if any given value is an array.

**Parameters:**
- `value` (string[] | number[]): Value to validate

**Returns:** true if array, false otherwise

**Example:**
```typescript
import { isArray } from 'usemods'

isArray([1, 2, 3]) // true
isArray([]) // true
isArray({}) // false
```

---

### `isHex(value: string): boolean`

Check if any given value is a valid hexadecimal color code.

**Parameters:**
- `value` (string): Value to validate

**Returns:** true if valid hex color, false otherwise

**Example:**
```typescript
import { isHex } from 'usemods'

isHex('#FF0000') // true
isHex('#fff') // true
isHex('#ff0000ff') // true (with alpha)
isHex('invalid') // false
```

---

### `isAlphabetic(value: unknown): boolean`

Check if any given value contains only alphabetic characters.

**Parameters:**
- `value` (unknown): Value to validate

**Returns:** true if only letters, false otherwise

**Example:**
```typescript
import { isAlphabetic } from 'usemods'

isAlphabetic('Hello') // true
isAlphabetic('Hello123') // false
isAlphabetic('Hello World') // false (space)
```

---

### `isAlphanumeric(value: unknown): boolean`

Check if any given value contains only alphanumeric characters.

**Parameters:**
- `value` (unknown): Value to validate

**Returns:** true if only letters and numbers, false otherwise

**Example:**
```typescript
import { isAlphanumeric } from 'usemods'

isAlphanumeric('Hello123') // true
isAlphanumeric('Hello 123') // false (space)
isAlphanumeric('Hello-123') // false (hyphen)
```

---

### `isBoolean(value: unknown): boolean`

Check if any given value is a boolean value.

**Parameters:**
- `value` (unknown): Value to validate

**Returns:** true if boolean or string 'true'/'false', false otherwise

**Example:**
```typescript
import { isBoolean } from 'usemods'

isBoolean(true) // true
isBoolean(false) // true
isBoolean('true') // true
isBoolean('false') // true
isBoolean(1) // false
```

---

### `isUndefined(value: unknown): boolean`

Check if any given value is undefined.

**Parameters:**
- `value` (unknown): Value to validate

**Returns:** true if undefined, false otherwise

**Example:**
```typescript
import { isUndefined } from 'usemods'

isUndefined(undefined) // true
isUndefined(null) // false
isUndefined('') // false
```

---

### `isNull(value: unknown): boolean`

Check if any given value is null.

**Parameters:**
- `value` (unknown): Value to validate

**Returns:** true if null, false otherwise

**Example:**
```typescript
import { isNull } from 'usemods'

isNull(null) // true
isNull(undefined) // false
isNull('') // false
```

---

### `isDate(value: unknown): boolean`

Check if any given value is a valid Date object.

**Parameters:**
- `value` (unknown): Value to validate

**Returns:** true if valid date, false otherwise

**Example:**
```typescript
import { isDate } from 'usemods'

isDate(new Date()) // true
isDate('2024-01-15') // true
isDate(1609459200000) // true
isDate('invalid') // false
```

---

### `isTime(value: unknown): boolean`

Check if any given value is a valid time in HH:mm format.

**Parameters:**
- `value` (unknown): Value to validate

**Returns:** true if valid time format, false otherwise

**Example:**
```typescript
import { isTime } from 'usemods'

isTime('12:30') // true
isTime('23:59:59') // true
isTime('24:00') // false
isTime('12:60') // false
```

---

### `isLeapYear(value: number): boolean`

Check if any given value year is a leap year.

**Parameters:**
- `value` (number): Year to check

**Returns:** true if leap year, false otherwise

**Example:**
```typescript
import { isLeapYear } from 'usemods'

isLeapYear(2024) // true
isLeapYear(2023) // false
isLeapYear(2000) // true
isLeapYear(1900) // false
```

---

### `isEven(value: number): boolean`

Check if the number is even.

**Parameters:**
- `value` (number): Number to check

**Returns:** true if even, false otherwise

**Example:**
```typescript
import { isEven } from 'usemods'

isEven(2) // true
isEven(3) // false
isEven(0) // true
```

---

### `isOdd(value: number): boolean`

Check if the number is odd.

**Parameters:**
- `value` (number): Number to check

**Returns:** true if odd, false otherwise

**Example:**
```typescript
import { isOdd } from 'usemods'

isOdd(3) // true
isOdd(2) // false
isOdd(1) // true
```

---

### `isPositive(value: number): boolean`

Check if the number is positive.

**Parameters:**
- `value` (number): Number to check

**Returns:** true if positive, false otherwise

**Example:**
```typescript
import { isPositive } from 'usemods'

isPositive(5) // true
isPositive(-5) // false
isPositive(0) // false
```

---

### `isNegative(value: number): boolean`

Check if the number is negative.

**Parameters:**
- `value` (number): Number to check

**Returns:** true if negative, false otherwise

**Example:**
```typescript
import { isNegative } from 'usemods'

isNegative(-5) // true
isNegative(5) // false
isNegative(0) // false
```

---

### `isZero(value: number): boolean`

Check if the number is zero.

**Parameters:**
- `value` (number): Number to check

**Returns:** true if zero, false otherwise

**Example:**
```typescript
import { isZero } from 'usemods'

isZero(0) // true
isZero(1) // false
isZero(-0) // true
```

---

### `isOver9000(value: number): boolean`

Check if the number is over 9000.

**Parameters:**
- `value` (number): Number to check

**Returns:** true if over 9000, false otherwise

**Example:**
```typescript
import { isOver9000 } from 'usemods'

isOver9000(9001) // true
isOver9000(9000) // false
isOver9000(100) // false
```

---

### `isPrime(value: number): boolean`

Check if the number is a prime number.

**Parameters:**
- `value` (number): Number to check

**Returns:** true if prime (>= 2), false otherwise

**Example:**
```typescript
import { isPrime } from 'usemods'

isPrime(2) // true
isPrime(3) // true
isPrime(4) // false
isPrime(17) // true
```

---

### `isInteger(value: unknown): boolean`

Check if the number is an integer.

**Parameters:**
- `value` (unknown): Value to check

**Returns:** true if integer, false otherwise

**Example:**
```typescript
import { isInteger } from 'usemods'

isInteger(5) // true
isInteger(5.5) // false
isInteger('5') // false
```

---

### `isFloat(value: unknown): boolean`

Check if the number is a float.

**Parameters:**
- `value` (unknown): Value to check

**Returns:** true if float, false otherwise

**Example:**
```typescript
import { isFloat } from 'usemods'

isFloat(5.5) // true
isFloat(5) // false
isFloat('5.5') // false
```

---

### `isBetween(value: number, min: number, max: number): boolean`

Check if the number is between the specified range.

**Parameters:**
- `value` (number): Number to check
- `min` (number): Minimum value
- `max` (number): Maximum value

**Returns:** true if within range (inclusive), false otherwise

**Example:**
```typescript
import { isBetween } from 'usemods'

isBetween(5, 1, 10) // true
isBetween(5, 10, 1) // true (automatically swaps min/max)
isBetween(0, 1, 10) // false
```

---

### `isDivisibleBy(value: number, divisor: number): boolean`

Check if the number is divisible by the specified number.

**Parameters:**
- `value` (number): Number to check
- `divisor` (number): Divisor

**Returns:** true if divisible, false otherwise

**Example:**
```typescript
import { isDivisibleBy } from 'usemods'

isDivisibleBy(10, 2) // true
isDivisibleBy(10, 3) // false
isDivisibleBy(15, 5) // true
```

---

### `isCreditCard(value: unknown): boolean`

Check if any given value is a valid credit card number.

**Parameters:**
- `value` (unknown): Value to validate

**Returns:** true if valid credit card format, false otherwise

**Example:**
```typescript
import { isCreditCard } from 'usemods'

isCreditCard('4111111111111111') // true (Visa format)
isCreditCard('5500000000000004') // true (Mastercard format)
isCreditCard('1234567890') // false
```

---

### `isLatLng(value: string): boolean`

Check if any given value is a valid latitude-longitude coordinate in the format lat,lng.

**Parameters:**
- `value` (string): Value to validate

**Returns:** true if valid lat/lng format, false otherwise

**Example:**
```typescript
import { isLatLng } from 'usemods'

isLatLng('40.7128, -74.0060') // true
isLatLng('40.7128,-74.0060') // true
isLatLng('invalid') // false
```

---

### `isLatitude(value: string): boolean`

Check if any given value is a valid latitude coordinate.

**Parameters:**
- `value` (string): Value to validate

**Returns:** true if valid latitude (-90 to 90), false otherwise

**Example:**
```typescript
import { isLatitude } from 'usemods'

isLatitude('40.7128') // true
isLatitude('91') // false
isLatitude('-90') // true
```

---

### `isLongitude(value: string): boolean`

Check if any given value is a valid longitude coordinate.

**Parameters:**
- `value` (string): Value to validate

**Returns:** true if valid longitude (-180 to 180), false otherwise

**Example:**
```typescript
import { isLongitude } from 'usemods'

isLongitude('-74.0060') // true
isLongitude('181') // false
isLongitude('180') // true
```

---

### `isIpAddress(value: string): boolean`

Check if any given value is a valid IP address.

**Parameters:**
- `value` (string): Value to validate

**Returns:** true if valid IP address, false otherwise

**Example:**
```typescript
import { isIpAddress } from 'usemods'

isIpAddress('192.168.1.1') // true
isIpAddress('256.1.1.1') // false
isIpAddress('192.168.1.1:8080') // true (with port)
```

---

### `isPort(value: number): boolean`

Check if any given value is a valid port number.

**Parameters:**
- `value` (number): Value to validate

**Returns:** true if valid port (1-65535), false otherwise

**Example:**
```typescript
import { isPort } from 'usemods'

isPort(8080) // true
isPort(65536) // false
isPort(0) // false
```

---

### `isMacAddress(value: string): boolean`

Check if any given value is a valid MAC address.

**Parameters:**
- `value` (string): Value to validate

**Returns:** true if valid MAC address, false otherwise

**Example:**
```typescript
import { isMacAddress } from 'usemods'

isMacAddress('00:1B:44:11:3A:B7') // true
isMacAddress('00-1B-44-11-3A-B7') // true
isMacAddress('invalid') // false
```

---

## Usage Examples

### Form Validation

```typescript
import { isEmail, isUrl, isEmpty } from 'usemods'

function validateForm(data: { email: string, website: string, name: string }) {
  const errors = []
  
  if (isEmpty(data.name)) {
    errors.push('Name is required')
  }
  
  if (!isEmail(data.email)) {
    errors.push('Invalid email address')
  }
  
  if (data.website && !isUrl(data.website)) {
    errors.push('Invalid website URL')
  }
  
  return errors
}
```

### Data Type Checking

```typescript
import { isNumber, isArray, isObject, isDate } from 'usemods'

function processData(data: unknown) {
  if (isNumber(data)) {
    return data * 2
  }
  
  if (isArray(data)) {
    return data.length
  }
  
  if (isObject(data)) {
    return Object.keys(data).length
  }
  
  if (isDate(data)) {
    return data.toISOString()
  }
  
  return 'Unknown type'
}
```

### Number Validation

```typescript
import { isEven, isPrime, isBetween, isDivisibleBy } from 'usemods'

function validateNumber(num: number) {
  const checks = {
    isEven: isEven(num),
    isPrime: isPrime(num),
    isInRange: isBetween(num, 1, 100),
    isDivisibleBy5: isDivisibleBy(num, 5)
  }
  
  return checks
}
```

---

## Notes

- Email validation uses a comprehensive regex pattern
- URL validation supports both http and https protocols
- UUID validation checks standard UUID format
- Credit card validation checks format only, not Luhn algorithm
- Coordinate validation ensures values are within valid ranges
- All validators return boolean values for easy use in conditionals
