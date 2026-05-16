"""
============================================================================
COMPLETE PYTHON SET METHODS GUIDE WITH COMMENTS
Every built-in set function and operation explained
============================================================================
"""

# ============================================================================
# CREATING SETS
# ============================================================================

# Create an empty set (Note: {} creates empty dict, not set)
empty_set = set()  # Correct way to create empty set

# Create set with elements
fruits = {"apple", "banana", "orange", "mango"}  # Curly braces with values

# Create set from list (removes duplicates automatically)
numbers = set([1, 2, 2, 3, 3, 3, 4])  # Result: {1, 2, 3, 4}

# Create set from string (each character becomes element)
letters = set("hello world")  # Result: {'h', 'e', 'l', 'o', ' ', 'w', 'r', 'd'}

# ============================================================================
# ADDING ELEMENTS
# ============================================================================

# add() - Adds a single element to the set
fruits.add("grape")  # Adds 'grape', does nothing if already present
fruits.add("apple")  # No effect, 'apple' already exists (no duplicates)

# update() - Adds multiple elements from any iterable
fruits.update(["kiwi", "papaya"])  # Add elements from list
fruits.update(("lemon", "lime"))   # Add elements from tuple
fruits.update({"berry", "cherry"})  # Add elements from set
fruits.update("abc")  # Adds 'a', 'b', 'c' separately (careful with strings!)

# ============================================================================
# REMOVING ELEMENTS
# ============================================================================

# remove() - Removes specific element, raises KeyError if not found
fruits.remove("apple")  # Removes 'apple', ERROR if doesn't exist

# discard() - Removes element, does NOT raise error if not found
fruits.discard("dragonfruit")  # No error even if 'dragonfruit' isn't present

# pop() - Removes and returns an ARBITRARY element (random)
popped_item = fruits.pop()  # Removes and returns some element
# Raises KeyError if set is empty

# clear() - Removes ALL elements from set
fruits.clear()  # Set becomes empty set()

# ============================================================================
# SET OPERATIONS (Math-like operations)
# ============================================================================

set_a = {1, 2, 3, 4, 5}
set_b = {4, 5, 6, 7, 8}

# union() - Combines all elements from both sets (OR logic)
union_result = set_a.union(set_b)  # {1, 2, 3, 4, 5, 6, 7, 8}
# Alternative syntax using | operator
union_result = set_a | set_b  # Same as union()

# intersection() - Elements present in BOTH sets (AND logic)
intersection_result = set_a.intersection(set_b)  # {4, 5}
# Alternative syntax using & operator
intersection_result = set_a & set_b  # Same as intersection()

# difference() - Elements in first set but NOT in second
difference_result = set_a.difference(set_b)  # {1, 2, 3}
# Alternative syntax using - operator
difference_result = set_a - set_b  # Elements in set_a NOT in set_b

# symmetric_difference() - Elements in EITHER set but NOT in both (XOR logic)
sym_diff_result = set_a.symmetric_difference(set_b)  # {1, 2, 3, 6, 7, 8}
# Alternative syntax using ^ operator
sym_diff_result = set_a ^ set_b  # Same as symmetric_difference()

# ============================================================================
# MODIFYING SETS IN-PLACE
# ============================================================================

set_x = {1, 2, 3}
set_y = {3, 4, 5}

# difference_update() - Removes elements found in another set
set_x.difference_update(set_y)  # set_x becomes {1, 2} (removes 3)

# intersection_update() - Keeps only elements found in another set
set_x = {1, 2, 3}  # Reset
set_x.intersection_update(set_y)  # set_x becomes {3} (only common element)

# symmetric_difference_update() - Keeps elements not in both
set_x = {1, 2, 3}  # Reset
set_x.symmetric_difference_update(set_y)  # set_x becomes {1, 2, 4, 5}

# ============================================================================
# COMPARISON METHODS
# ============================================================================

a = {1, 2, 3}
b = {1, 2, 3, 4, 5}
c = {1, 2, 3}

# issubset() - Checks if all elements are in another set
print(a.issubset(b))  # True (all elements of 'a' are in 'b')
# Alternative: a <= b

# issuperset() - Checks if contains all elements of another set
print(b.issuperset(a))  # True ('b' contains all elements of 'a')
# Alternative: b >= a

# isdisjoint() - Checks if two sets have NO common elements
print(a.isdisjoint({7, 8, 9}))  # True (no common elements)

# Proper subset (strictly contained, not equal)
print(a < c)  # False (they're equal)

# Proper superset (strictly contains, not equal)
print(b > a)  # True

# ============================================================================
# INFORMATION METHODS
# ============================================================================

my_set = {10, 20, 30, 40, 50}

# len() - Returns number of elements in set
print(len(my_set))  # 5

# in operator - Checks if element exists in set
print(20 in my_set)  # True
print(99 in my_set)  # False

# not in operator - Checks if element does NOT exist
print(99 not in my_set)  # True

# ============================================================================
# COPYING
# ============================================================================

original = {1, 2, 3}

# copy() - Creates a shallow copy of the set
copied_set = original.copy()  # Independent copy, changes don't affect original

# ============================================================================
# CONVERTING TO OTHER TYPES
# ============================================================================

num_set = {3, 1, 4, 1, 5, 9}

# Convert set to list
num_list = list(num_set)  # [1, 3, 4, 5, 9] (order not guaranteed)

# Convert set to tuple
num_tuple = tuple(num_set)  # (1, 3, 4, 5, 9)

# Convert set to sorted list
sorted_list = sorted(num_set)  # [1, 3, 4, 5, 9] (always sorted)

# ============================================================================
# FROZENSET (Immutable/Unchangeable Set)
# ============================================================================

# frozenset() - Creates an immutable set (cannot add/remove elements)
frozen = frozenset([1, 2, 3, 4])  # Cannot use add(), remove(), etc.

# Can be used as dictionary keys (regular sets cannot)
my_dict = {}
my_dict[frozenset({1, 2})] = "pair"  # Works because frozenset is hashable

# All read-only methods work on frozenset (union, intersection, etc.)
frozen_copy = frozen.union({5, 6})  # Works (creates new set, doesn't modify)

# ============================================================================
# SET COMPREHENSION (Creating sets with loops)
# ============================================================================

# Basic set comprehension
squares = {x**2 for x in range(10)}  # {0, 1, 4, 9, 16, 25, 36, 49, 64, 81}

# Set comprehension with condition
even_squares = {x**2 for x in range(10) if x % 2 == 0}  # {0, 4, 16, 36, 64}

# ============================================================================
# PRACTICAL EXAMPLES (Common use cases)
# ============================================================================

# Example 1: Remove duplicates from list
numbers_with_duplicates = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]
unique_numbers = list(set(numbers_with_duplicates))  # [1, 2, 3, 4]

# Example 2: Find common elements between two lists
list1 = [1, 2, 3, 4, 5]
list2 = [4, 5, 6, 7, 8]
common = set(list1) & set(list2)  # {4, 5}

# Example 3: Find elements in list1 but not in list2
unique_to_list1 = set(list1) - set(list2)  # {1, 2, 3}

# Example 4: Check if any duplicates exist
has_duplicates = len([1, 2, 3, 3]) != len(set([1, 2, 3, 3]))  # True

# Example 5: Find all unique characters in a string
text = "programming"
unique_chars = set(text)  # {'p', 'r', 'o', 'g', 'a', 'm', 'i', 'n'}

# Example 6: Membership testing (faster than list)
large_set = set(range(1000000))
print(999999 in large_set)  # Instant (O(1)) vs list which would be O(n)

# ============================================================================
# ALL SET METHODS QUICK REFERENCE
# ============================================================================

"""
METHODS THAT MODIFY THE SET:
  add(elem)              - Add element
  clear()                - Remove all elements
  discard(elem)          - Remove element if present
  pop()                  - Remove and return arbitrary element
  remove(elem)           - Remove element (error if missing)
  update(iterable)       - Add all elements from iterable
  difference_update(s)   - Remove elements found in other set
  intersection_update(s) - Keep only elements found in other set
  symmetric_difference_update(s) - Keep elements not in both

METHODS THAT RETURN A NEW SET:
  union(s)               - Return combined elements
  intersection(s)        - Return common elements
  difference(s)          - Return elements not in other set
  symmetric_difference(s)- Return elements in either but not both
  copy()                 - Return shallow copy

METHODS THAT RETURN BOOLEAN:
  issubset(s)            - All elements in other set?
  issuperset(s)          - Contains all elements of other set?
  isdisjoint(s)          - No common elements?

OPERATORS (Alternative syntax):
  |  = union()           - set_a | set_b
  &  = intersection()    - set_a & set_b
  -  = difference()      - set_a - set_b
  ^  = symmetric_difference() - set_a ^ set_b
  <= = issubset()        - set_a <= set_b
  >= = issuperset()      - set_a >= set_b
  <  = proper subset     - set_a < set_b
  >  = proper superset   - set_a > set_b
"""

# ============================================================================
# PERFORMANCE TIPS
# ============================================================================

# Sets use hash tables - O(1) average for lookup vs O(n) for lists
# Use set when: removing duplicates, membership testing, set operations
# Don't use set when: order matters, need indexing, small collections

print("✅ All set methods covered!")