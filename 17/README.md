# Challenge #17:

Because the original posts were deleted, I asked ChatGPT to give me 3 challenges with varying difficulty.

Challenges:

- [Easy](#-easy-fizzbuzz-variant) – FizzBuzz Variant.
- [Intermediate](#-intermediate-deep-object-flatten) – Deep Object Flatten.
- [Difficult](#-difficult-word-ladder-one-letter-at-a-time) – Word Ladder.


Tasks: 

### 🟢 Easy: FizzBuzz Variant
Write a function that prints numbers from 1 to 50.
- For multiples of 3, print "Fizz"
- For multiples of 5, print "Buzz"
- For multiples of both, print "FizzBuzz"
- For prime numbers, print "Prime" instead of the number

### 🟡 Intermediate: Deep Object Flatten
Write a function flatten(obj) that flattens a deeply nested object into a single-level object with dot-separated keys.
```js
const input = {
  a: {
    b: {
      c: 1
    },
    d: 2
  }
};
// Output: { 'a.b.c': 1, 'a.d': 2 }
```

### 🔴 Difficult: Word Ladder (One Letter at a Time)
Given a start word, end word, and a dictionary of allowed words, write a function that finds the shortest transformation sequence from start to end, changing one letter at a time, where each intermediate word must exist in the dictionary.
```js
start = "hit", end = "cog", dict = ["hot","dot","dog","lot","log","cog"]
// Output: ["hit","hot","dot","dog","cog"]
```