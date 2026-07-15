# Phase 002 - Multi-step Linear Equations

## Phase Metadata
- Course: Precalculus Odyssey Bible v5
- Topic: Multi-step linear equations
- Subtopic: Solving linear equations with variables on one side using two or more inverse-operation moves
- Prerequisites: Phase 001 one-step linear equations, integer arithmetic, fraction arithmetic, decimal arithmetic, order of operations, distributive property, combining like terms
- Related phases: Phase 001 - One-step linear equations; Phase 003 - Variables on both sides; Phase 004 - Literal equations; Phase 005 - Linear equation modeling; Phase 006 - Equation Battle fundamentals
- Estimated phase size: 20 template families, 20 core examples, 120 progressive hints, 1 tutorial sequence, 1 Socratic dialogue system

## Learning Objectives
By the end of this phase, the player can:

1. Solve two-step equations of the form `ax + b = c` and `ax - b = c`.
2. Decide whether to simplify first or undo operations first.
3. Solve equations with negative coefficients, variables inside parentheses, fractions, decimals, and constants written before variable terms.
4. Combine like terms on one side before isolating the variable.
5. Use the distributive property when it is the clearest path.
6. Translate simple multi-step contexts into equations and interpret the solution.
7. Check a multi-step solution in the original equation.

## Prerequisite Review
- A one-step equation is solved by one inverse operation.
- A multi-step equation needs a planned sequence of inverse operations.
- Constants are usually undone before coefficients when the equation looks like `ax + b = c`.
- Parentheses may be handled by distributing or by undoing an outside operation first.
- Like terms with the same variable power can be combined before solving.
- A solution must satisfy the original equation, not just the final simplified line.

## Core Concepts
- Multi-step solving is not a new rule; it is one-step solving repeated in a smart order.
- For `ax + b = c`, undo addition or subtraction first, then undo multiplication or division.
- If one side can be simplified, simplify it before isolating the variable.
- Parentheses can often be solved efficiently by undoing the outside operation first, but distribution is also valid when done correctly.
- The check step is especially important because a single sign or order mistake can produce a plausible but wrong answer.

## Common Misconceptions
- Dividing by the coefficient before removing the constant in `ax + b = c`.
- Applying an inverse operation to only one term instead of the whole side.
- Dropping a negative coefficient.
- Distributing to one term but not the other.
- Combining unlike terms.
- Clearing a denominator on only part of the equation.
- Checking the answer in a transformed equation instead of the original equation.
- Reversing the story operation when building a model.

# Part I - Question Bible

## Template T001 - Standard two-step addition form
- Template ID: P002-T001
- Question Type: Direct computation
- Cognitive Skill: Sequence inverse operations
- Difficulty: 2
- Estimated Time: 35 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve equations of the form `ax + b = c`.
- Example Question: Solve `2x + 5 = 17`.
- Answer: `x = 6`
- Explanation: Subtract 5 from both sides to get `2x = 12`, then divide by 2 to get `x = 6`.
- Distractors: `x = 11`; `x = 24`; `x = 4`; `x = 8.5`
- Distractor Rationale: Subtracts coefficient instead of constant; adds 5 then multiplies; divides 17 by 2 too early; ignores the constant.
- Randomization Rules: Choose nonzero integer `a` from 2 to 12, integer solution `s`, and integer constant `b`; set right side `c = as + b`.
- Validity Constraints: `a` cannot be 0; keep `c - b` divisible by `a` for early versions.
- Metadata: phase_id=P002; prerequisites=[P001 inverse operations, integer arithmetic]; misconception_tags=[wrong operation order, ignores constant, divides too early]; randomization_constraints=[a nonzero, c=as+b].
- Graph/Visual Variant: Show equation tiles: remove 5 unit tiles from both sides, then split the remaining tiles into 2 equal groups.
- Modeling Variant: "A spell costs 5 mana to unlock, then 2 mana per rune, for 17 total mana. How many runes?"
- Reverse Variant: "Create an equation of the form `2x + 5 = c` whose solution is 6."
- Equation Battle Variant: Correct action order is "subtract 5 from both sides" then "divide both sides by 2."
- Multi-stage Boss Variant: Stage 1 choose first move, Stage 2 solve, Stage 3 check.
- Hint Mapping: H-P002-T001
- Tutorial Mapping: Tut-P002 sections Core Concept and Worked Example
- Socratic Mapping: Soc-P002 two-step branch

## Template T002 - Standard two-step subtraction form
- Template ID: P002-T002
- Question Type: Direct computation
- Cognitive Skill: Sequence inverse operations
- Difficulty: 2
- Estimated Time: 35 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve equations of the form `ax - b = c`.
- Example Question: Solve `3y - 7 = 11`.
- Answer: `y = 6`
- Explanation: Add 7 to both sides to get `3y = 18`, then divide by 3 to get `y = 6`.
- Distractors: `y = 4/3`; `y = 12`; `y = -6`; `y = 18`
- Distractor Rationale: Divides before removing `-7`; subtracts 7 instead of adding; sign error; stops before dividing.
- Randomization Rules: Choose coefficient `a` from 2 to 12, constant `b` from 2 to 20, and solution `s`; set `c = as - b`.
- Validity Constraints: Coefficient nonzero; generated values should keep solution clean unless difficulty is intentionally raised.
- Metadata: phase_id=P002; prerequisites=[P001 subtraction equations, multiplication equations]; misconception_tags=[wrong inverse operation, stops early, divides too early]; randomization_constraints=[a nonzero, c=as-b].
- Graph/Visual Variant: Equation tile animation adds 7 unit tiles to both sides before grouping.
- Modeling Variant: "Three equal packs lose 7 total points after a penalty and end at 11. What was each pack's value?"
- Reverse Variant: "Write an equation `3y - 7 = c` that has solution 6."
- Equation Battle Variant: Action order is "add 7" then "divide by 3."
- Multi-stage Boss Variant: Include an option trap where the player tries to divide by 3 first.
- Hint Mapping: H-P002-T002
- Tutorial Mapping: Tut-P002 sections Guided Practice
- Socratic Mapping: Soc-P002 two-step branch

## Template T003 - Negative coefficient with constant
- Template ID: P002-T003
- Question Type: Direct computation
- Cognitive Skill: Signed inverse operations
- Difficulty: 3
- Estimated Time: 45 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve `-ax + b = c` while preserving the negative coefficient.
- Example Question: Solve `-4r + 6 = 22`.
- Answer: `r = -4`
- Explanation: Subtract 6 from both sides to get `-4r = 16`, then divide by `-4`: `r = -4`.
- Distractors: `r = 4`; `r = -7`; `r = -64`; `r = 16`
- Distractor Rationale: Drops negative sign; subtracts 6 then divides by positive 4 incorrectly; multiplies instead of divides; stops early.
- Randomization Rules: Choose negative coefficient `-a` with `a` from 2 to 10, solution `s`, and constant `b`; set right side `c = -as + b`.
- Validity Constraints: Coefficient cannot be 0; avoid solution 0 when practicing sign handling.
- Metadata: phase_id=P002; prerequisites=[signed division, P001 negative coefficients]; misconception_tags=[sign error, stops early, multiplies instead of divides]; randomization_constraints=[negative nonzero coefficient, integer solution].
- Graph/Visual Variant: Show signed groups after removing constant tiles.
- Modeling Variant: "A cursed multiplier reduces each charge by 4, then adds 6 shield points, ending at 22."
- Reverse Variant: "Create a negative-coefficient two-step equation with solution `r = -4`."
- Equation Battle Variant: Battle cards: `-6` then `/ -4`.
- Multi-stage Boss Variant: Require a sign prediction before the final division.
- Hint Mapping: H-P002-T003
- Tutorial Mapping: Tut-P002 sections Common Mistakes
- Socratic Mapping: Soc-P002 sign branch

## Template T004 - Division expression plus constant
- Template ID: P002-T004
- Question Type: Direct computation
- Cognitive Skill: Undo addition then division
- Difficulty: 2
- Estimated Time: 40 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve equations of the form `x/a + b = c`.
- Example Question: Solve `x/5 + 3 = 9`.
- Answer: `x = 30`
- Explanation: Subtract 3 from both sides: `x/5 = 6`. Multiply both sides by 5: `x = 30`.
- Distractors: `x = 6`; `x = 12`; `x = 45`; `x = 2`
- Distractor Rationale: Stops after first step; adds 3; multiplies too early by 5 without removing 3; divides 6 by 5.
- Randomization Rules: Choose divisor `a` from 2 to 10, constant `b`, and solution `s` divisible by `a`; set `c = s/a + b`.
- Validity Constraints: Divisor nonzero; avoid fractions in early examples unless intentionally selected.
- Metadata: phase_id=P002; prerequisites=[P001 division equations, integer multiplication]; misconception_tags=[stops early, wrong operation order, divides instead of multiplies]; randomization_constraints=[a nonzero, s/a integer].
- Graph/Visual Variant: Show `x` split into 5 equal parts, then 3 extra units removed from both sides.
- Modeling Variant: "One fifth of a resource plus 3 bonus units equals 9. Find the resource."
- Reverse Variant: "Write an equation like `x/5 + 3 = c` with solution 30."
- Equation Battle Variant: Action order is "subtract 3" then "multiply by 5."
- Multi-stage Boss Variant: Ask for the hidden whole after removing a bonus.
- Hint Mapping: H-P002-T004
- Tutorial Mapping: Tut-P002 sections Core Concept
- Socratic Mapping: Soc-P002 fraction-division branch

## Template T005 - Division expression minus constant
- Template ID: P002-T005
- Question Type: Direct computation
- Cognitive Skill: Undo subtraction then division
- Difficulty: 2
- Estimated Time: 40 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve equations of the form `x/a - b = c`.
- Example Question: Solve `n/4 - 6 = -2`.
- Answer: `n = 16`
- Explanation: Add 6 to both sides: `n/4 = 4`. Multiply both sides by 4: `n = 16`.
- Distractors: `n = -32`; `n = 4`; `n = -8`; `n = 1`
- Distractor Rationale: Subtracts 6 again; stops early; multiplies original right side by 4; divides 4 by 4.
- Randomization Rules: Choose divisor `a`, constant `b`, and clean solution `s`; set right side `c = s/a - b`.
- Validity Constraints: Divisor nonzero; right side may be negative but final solution should be checkable.
- Metadata: phase_id=P002; prerequisites=[P001 division equations, signed addition]; misconception_tags=[wrong inverse operation, stops early, signed arithmetic error]; randomization_constraints=[a nonzero, clean quotient].
- Graph/Visual Variant: Balance scale adds 6 units to both sides before recombining 4 equal parts.
- Modeling Variant: "A quarter of the treasure after a 6-gem toll leaves -2 relative gems; find the original treasure value."
- Reverse Variant: "Write a division-minus equation with solution 16."
- Equation Battle Variant: Action order is `+6`, then `*4`.
- Multi-stage Boss Variant: Include a negative right side to test signed arithmetic.
- Hint Mapping: H-P002-T005
- Tutorial Mapping: Tut-P002 sections Guided Practice
- Socratic Mapping: Soc-P002 fraction-division branch

## Template T006 - Parentheses with outside multiplication
- Template ID: P002-T006
- Question Type: Direct computation
- Cognitive Skill: Undo outside operation first
- Difficulty: 3
- Estimated Time: 45 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve equations of the form `a(x + b) = c`.
- Example Question: Solve `2(x + 3) = 14`.
- Answer: `x = 4`
- Explanation: Divide both sides by 2 to get `x + 3 = 7`, then subtract 3 to get `x = 4`.
- Distractors: `x = 10`; `x = 5.5`; `x = 11`; `x = 8`
- Distractor Rationale: Subtracts 3 before handling the group; divides only `x`; adds 3; distributes incorrectly as `2x + 3`.
- Randomization Rules: Choose multiplier `a`, inside constant `b`, and solution `s`; set `c = a(s + b)`.
- Validity Constraints: Multiplier nonzero; use parentheses with a binomial containing one variable and one constant.
- Metadata: phase_id=P002; prerequisites=[P001 division, parentheses, distributive property]; misconception_tags=[distributes incorrectly, wrong operation order, divides only one term]; randomization_constraints=[a nonzero, c=a(s+b)].
- Graph/Visual Variant: Show two identical bags, each containing `x + 3`, totaling 14.
- Modeling Variant: "Two identical chests each contain an unknown gem count plus 3 bonus gems; total is 14."
- Reverse Variant: "Create a parentheses equation with solution 4."
- Equation Battle Variant: Player may divide by 2 first, then subtract 3.
- Multi-stage Boss Variant: Let the player choose between divide-first and distribute-first paths, then verify.
- Hint Mapping: H-P002-T006
- Tutorial Mapping: Tut-P002 sections Parentheses Strategy
- Socratic Mapping: Soc-P002 parentheses branch

## Template T007 - Parentheses with inside subtraction
- Template ID: P002-T007
- Question Type: Direct computation
- Cognitive Skill: Undo grouped operations
- Difficulty: 3
- Estimated Time: 45 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve equations of the form `a(x - b) = c`.
- Example Question: Solve `3(w - 5) = -6`.
- Answer: `w = 3`
- Explanation: Divide both sides by 3: `w - 5 = -2`. Add 5 to both sides: `w = 3`.
- Distractors: `w = -7`; `w = -13`; `w = 15`; `w = -2`
- Distractor Rationale: Subtracts 5; distributes then sign error; multiplies instead of divides; stops after first step.
- Randomization Rules: Choose multiplier `a`, inside constant `b`, and solution `s`; set `c = a(s - b)`.
- Validity Constraints: Multiplier nonzero; use clean integer results.
- Metadata: phase_id=P002; prerequisites=[division by integers, adding negatives]; misconception_tags=[wrong inverse operation, stops early, sign error]; randomization_constraints=[a nonzero, c=a(s-b)].
- Graph/Visual Variant: Three matching containers each have `w - 5`; total value is -6.
- Modeling Variant: "Three rooms each lose 5 energy from a hidden amount; total change is -6."
- Reverse Variant: "Write `3(w - b) = c` with solution 3."
- Equation Battle Variant: Battle sequence: `/3`, then `+5`.
- Multi-stage Boss Variant: Include a check in the original parentheses form.
- Hint Mapping: H-P002-T007
- Tutorial Mapping: Tut-P002 sections Parentheses Strategy
- Socratic Mapping: Soc-P002 parentheses branch

## Template T008 - Negative multiplier outside parentheses
- Template ID: P002-T008
- Question Type: Direct computation
- Cognitive Skill: Handle negative grouping
- Difficulty: 4
- Estimated Time: 55 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve equations of the form `-a(x + b) = c`.
- Example Question: Solve `-2(s + 4) = 10`.
- Answer: `s = -9`
- Explanation: Divide both sides by `-2`: `s + 4 = -5`. Subtract 4: `s = -9`.
- Distractors: `s = 1`; `s = -1`; `s = 9`; `s = -5`
- Distractor Rationale: Divides by positive 2; subtracts wrong sign; drops negative solution sign; stops early.
- Randomization Rules: Choose negative multiplier `-a`, inside constant `b`, and solution `s`; set `c = -a(s + b)`.
- Validity Constraints: Negative multiplier nonzero; avoid overly large products.
- Metadata: phase_id=P002; prerequisites=[signed division, parentheses]; misconception_tags=[sign error, stops early, divides by wrong sign]; randomization_constraints=[negative multiplier, integer solution].
- Graph/Visual Variant: Show a sign-flip group followed by equal grouping.
- Modeling Variant: "A curse doubles and reverses a hidden boosted value, resulting in 10."
- Reverse Variant: "Create a negative outside multiplier equation with solution `s = -9`."
- Equation Battle Variant: Battle cards: `/ -2`, then `-4`.
- Multi-stage Boss Variant: Require the player to state why the intermediate value is negative.
- Hint Mapping: H-P002-T008
- Tutorial Mapping: Tut-P002 sections Common Mistakes
- Socratic Mapping: Soc-P002 sign-parentheses branch

## Template T009 - Combine like variable terms first
- Template ID: P002-T009
- Question Type: Direct computation
- Cognitive Skill: Simplify before solving
- Difficulty: 2
- Estimated Time: 35 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Combine like terms on one side before solving.
- Example Question: Solve `4x + 3x = 35`.
- Answer: `x = 5`
- Explanation: Combine like terms: `7x = 35`. Divide by 7: `x = 5`.
- Distractors: `x = 7`; `x = 8.75`; `x = 105`; `x = 35`
- Distractor Rationale: Uses combined coefficient as answer; divides by 4 only; multiplies terms; stops early.
- Randomization Rules: Choose coefficients `a` and `b`, solution `s`, and set right side `(a+b)s`.
- Validity Constraints: `a+b` cannot be 0; keep like terms truly like terms.
- Metadata: phase_id=P002; prerequisites=[combining like terms, P001 multiplication equations]; misconception_tags=[does not combine like terms, stops early, coefficient as answer]; randomization_constraints=[a+b nonzero, same variable].
- Graph/Visual Variant: Merge `x` tiles into one group of 7 `x` tiles.
- Modeling Variant: "Four squads and three squads of the same size total 35 players."
- Reverse Variant: "Write a like-term equation with solution 5."
- Equation Battle Variant: First action is "combine like terms," then "divide by 7."
- Multi-stage Boss Variant: Distract with coefficients that cannot be divided separately.
- Hint Mapping: H-P002-T009
- Tutorial Mapping: Tut-P002 sections Simplify First
- Socratic Mapping: Soc-P002 simplify branch

## Template T010 - Combine like terms then remove constant
- Template ID: P002-T010
- Question Type: Direct computation
- Cognitive Skill: Simplify and sequence
- Difficulty: 3
- Estimated Time: 45 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Combine variable terms, then solve a two-step equation.
- Example Question: Solve `9x - 2x + 5 = 26`.
- Answer: `x = 3`
- Explanation: Combine `9x - 2x` to get `7x + 5 = 26`. Subtract 5: `7x = 21`. Divide by 7: `x = 3`.
- Distractors: `x = 21`; `x = 31/7`; `x = 6`; `x = 7`
- Distractor Rationale: Stops after subtracting 5; divides before removing constant; combines coefficients incorrectly as 11; uses coefficient as answer.
- Randomization Rules: Choose two variable coefficients with nonzero sum, constant `b`, and solution `s`; set right side `(a+d)s + b`.
- Validity Constraints: Variable terms must be on the same side; coefficient sum nonzero.
- Metadata: phase_id=P002; prerequisites=[combining like terms, two-step solving]; misconception_tags=[combines unlike signs incorrectly, wrong operation order, stops early]; randomization_constraints=[coefficient sum nonzero, integer solution].
- Graph/Visual Variant: Combine positive and negative variable tiles before removing constants.
- Modeling Variant: "Nine teams gain points, two teams are removed, and 5 bonus points remain for a total of 26."
- Reverse Variant: "Create a same-side like-term equation with solution 3."
- Equation Battle Variant: Action sequence: combine, `-5`, `/7`.
- Multi-stage Boss Variant: Require all three moves in the correct order.
- Hint Mapping: H-P002-T010
- Tutorial Mapping: Tut-P002 sections Simplify First
- Socratic Mapping: Soc-P002 simplify branch

## Template T011 - Decimal coefficient with constant
- Template ID: P002-T011
- Question Type: Direct computation
- Cognitive Skill: Decimal inverse operations
- Difficulty: 3
- Estimated Time: 45 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve two-step equations with terminating decimal coefficients.
- Example Question: Solve `0.5m + 4 = 11`.
- Answer: `m = 14`
- Explanation: Subtract 4: `0.5m = 7`. Divide by `0.5`, or multiply by 2: `m = 14`.
- Distractors: `m = 3.5`; `m = 7`; `m = 15`; `m = 22`
- Distractor Rationale: Multiplies by 0.5; stops early; adds 0.5 or 4 incorrectly; adds before multiplying.
- Randomization Rules: Use decimal coefficients from `{0.25, 0.5, 0.75, 1.5, 2.5}` and choose values with terminating results.
- Validity Constraints: Decimal coefficient nonzero; avoid repeating decimals.
- Metadata: phase_id=P002; prerequisites=[decimal arithmetic, P001 decimal coefficients]; misconception_tags=[decimal place error, stops early, multiplies instead of divides]; randomization_constraints=[terminating decimals, coefficient nonzero].
- Graph/Visual Variant: A half-size bar plus 4 units totals 11.
- Modeling Variant: "Half a shield meter plus 4 bonus shield equals 11. Find full shield."
- Reverse Variant: "Write a decimal two-step equation with solution 14."
- Equation Battle Variant: Action sequence: `-4`, then `/0.5` or `*2`.
- Multi-stage Boss Variant: Accept equivalent inverse moves if justified.
- Hint Mapping: H-P002-T011
- Tutorial Mapping: Tut-P002 sections Decimal Strategy
- Socratic Mapping: Soc-P002 decimal branch

## Template T012 - Fraction coefficient with constant
- Template ID: P002-T012
- Question Type: Direct computation
- Cognitive Skill: Reciprocal after constant removal
- Difficulty: 3
- Estimated Time: 50 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve equations of the form `(a/b)x + c = d`.
- Example Question: Solve `(2/3)p - 5 = 7`.
- Answer: `p = 18`
- Explanation: Add 5: `(2/3)p = 12`. Multiply by the reciprocal `3/2`: `p = 18`.
- Distractors: `p = 8`; `p = 12`; `p = 30`; `p = 6`
- Distractor Rationale: Multiplies by `2/3`; stops early; adds denominator/numerator incorrectly; divides by reciprocal.
- Randomization Rules: Choose fraction coefficient in simplest form and solution that makes the intermediate product clean.
- Validity Constraints: Fraction coefficient nonzero; denominator nonzero; generated intermediate value should be divisible by numerator for early difficulty.
- Metadata: phase_id=P002; prerequisites=[reciprocal, fraction multiplication, P001 fraction coefficients]; misconception_tags=[uses fraction instead of reciprocal, stops early, fraction arithmetic error]; randomization_constraints=[nonzero fraction, clean solution].
- Graph/Visual Variant: Bar model: after removing -5, `2/3` of the whole is 12.
- Modeling Variant: "Two thirds of a stamina bar after a 5-point penalty displays 7."
- Reverse Variant: "Create a fraction-coefficient two-step equation with solution 18."
- Equation Battle Variant: Action sequence: `+5`, then `*3/2`.
- Multi-stage Boss Variant: Include reciprocal identification as its own lock.
- Hint Mapping: H-P002-T012
- Tutorial Mapping: Tut-P002 sections Fraction Strategy
- Socratic Mapping: Soc-P002 fraction branch

## Template T013 - Fraction bar with grouped numerator
- Template ID: P002-T013
- Question Type: Direct computation
- Cognitive Skill: Undo denominator then constant
- Difficulty: 3
- Estimated Time: 45 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve equations of the form `(x + b)/a = c`.
- Example Question: Solve `(x + 6)/3 = 8`.
- Answer: `x = 18`
- Explanation: Multiply both sides by 3: `x + 6 = 24`. Subtract 6: `x = 18`.
- Distractors: `x = 30`; `x = 14`; `x = 24`; `x = 2`
- Distractor Rationale: Adds 6 after multiplying; subtracts 6 before multiplying; stops early; divides 8 by 3 then subtracts.
- Randomization Rules: Choose denominator `a`, inside constant `b`, solution `s`; set right side `(s+b)/a`.
- Validity Constraints: Denominator nonzero; numerator grouping must be clear with parentheses.
- Metadata: phase_id=P002; prerequisites=[division equations, grouping symbols]; misconception_tags=[applies denominator to one term only, stops early, wrong operation order]; randomization_constraints=[a nonzero, grouped numerator].
- Graph/Visual Variant: Three equal shares of the entire group `x + 6`.
- Modeling Variant: "An unknown plus 6 bonus items is split equally into 3 packs of 8."
- Reverse Variant: "Write a grouped fraction equation with solution 18."
- Equation Battle Variant: Action sequence: `*3`, then `-6`.
- Multi-stage Boss Variant: Test whether the player treats the numerator as a group.
- Hint Mapping: H-P002-T013
- Tutorial Mapping: Tut-P002 sections Grouped Fractions
- Socratic Mapping: Soc-P002 grouped-fraction branch

## Template T014 - Negative denominator with grouped numerator
- Template ID: P002-T014
- Question Type: Direct computation
- Cognitive Skill: Signed grouped division
- Difficulty: 4
- Estimated Time: 55 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve equations of the form `(x - b)/(-a) = c`.
- Example Question: Solve `(x - 4)/-2 = 7`.
- Answer: `x = -10`
- Explanation: Multiply both sides by `-2`: `x - 4 = -14`. Add 4: `x = -10`.
- Distractors: `x = 18`; `x = 10`; `x = -18`; `x = -14`
- Distractor Rationale: Multiplies by positive 2; drops negative sign; subtracts 4 instead of adding; stops early.
- Randomization Rules: Choose negative denominator, inside constant, and solution with clean product.
- Validity Constraints: Denominator cannot be 0; use parentheses to show numerator grouping.
- Metadata: phase_id=P002; prerequisites=[signed multiplication, grouped fractions]; misconception_tags=[sign error, stops early, wrong inverse operation]; randomization_constraints=[negative nonzero denominator, integer solution].
- Graph/Visual Variant: Show signed scaling of the entire numerator group.
- Modeling Variant: "A transformed score `(x - 4)` divided by -2 displays 7."
- Reverse Variant: "Create a negative-denominator grouped equation with solution `-10`."
- Equation Battle Variant: Action sequence: `* -2`, then `+4`.
- Multi-stage Boss Variant: Require a check in the original fraction form.
- Hint Mapping: H-P002-T014
- Tutorial Mapping: Tut-P002 sections Sign and Grouping
- Socratic Mapping: Soc-P002 sign-group branch

## Template T015 - Constant before variable term
- Template ID: P002-T015
- Question Type: Direct computation
- Cognitive Skill: Recognize equivalent structure
- Difficulty: 3
- Estimated Time: 45 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve equations where the constant appears before the variable term.
- Example Question: Solve `5 - 2x = 17`.
- Answer: `x = -6`
- Explanation: Subtract 5 from both sides: `-2x = 12`. Divide by `-2`: `x = -6`.
- Distractors: `x = 6`; `x = -11`; `x = -12`; `x = 12`
- Distractor Rationale: Drops negative coefficient; subtracts 5 from wrong expression mentally; stops before dividing; ignores coefficient.
- Randomization Rules: Use forms `b + ax = c` or `b - ax = c`; keep variable on one side.
- Validity Constraints: The sign before the variable term must stay attached to the coefficient.
- Metadata: phase_id=P002; prerequisites=[signed coefficients, two-step equations]; misconception_tags=[sign error, treats minus as subtraction after x, stops early]; randomization_constraints=[variable on one side, coefficient nonzero].
- Graph/Visual Variant: Tile layout places constant tiles before negative variable tiles.
- Modeling Variant: "A starting bonus of 5 is reduced by 2 points per curse level, ending at 17."
- Reverse Variant: "Write a constant-first equation with solution `-6`."
- Equation Battle Variant: Action sequence: `-5`, then `/ -2`.
- Multi-stage Boss Variant: Ask the player to rewrite as `-2x + 5 = 17` before solving.
- Hint Mapping: H-P002-T015
- Tutorial Mapping: Tut-P002 sections Equivalent Forms
- Socratic Mapping: Soc-P002 constant-first branch

## Template T016 - Right-side variable expression
- Template ID: P002-T016
- Question Type: Direct computation
- Cognitive Skill: Solve regardless of side
- Difficulty: 3
- Estimated Time: 40 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve equations where the variable expression is on the right side.
- Example Question: Solve `18 = 4x + 2`.
- Answer: `x = 4`
- Explanation: Subtract 2 from both sides: `16 = 4x`. Divide by 4: `4 = x`, so `x = 4`.
- Distractors: `x = 5`; `x = 80`; `x = 16`; `x = -4`
- Distractor Rationale: Adds 2 before dividing; multiplies; stops early; sign error from moving sides unnecessarily.
- Randomization Rules: Generate `c = ax + b` with variable expression on the right; choose clean integer solutions.
- Validity Constraints: Variable appears on only one side; coefficient nonzero.
- Metadata: phase_id=P002; prerequisites=[symmetry of equality, two-step equations]; misconception_tags=[side-of-equation confusion, stops early, wrong operation order]; randomization_constraints=[right-side variable, coefficient nonzero].
- Graph/Visual Variant: Balance scale shows either side can hold the variable expression.
- Modeling Variant: "A total of 18 equals 2 base points plus 4 points per item."
- Reverse Variant: "Write a right-side variable equation with solution 4."
- Equation Battle Variant: Actions can be applied to both sides even when the variable is on the right: `-2`, then `/4`.
- Multi-stage Boss Variant: Ask whether `18 = 4x + 2` and `4x + 2 = 18` have the same solution.
- Hint Mapping: H-P002-T016
- Tutorial Mapping: Tut-P002 sections Equation Symmetry
- Socratic Mapping: Soc-P002 right-side branch

## Template T017 - Missing first inverse step
- Template ID: P002-T017
- Question Type: Missing step
- Cognitive Skill: Identify first move
- Difficulty: 2
- Estimated Time: 30 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Complete the correct first transformation in a two-step equation.
- Example Question: Complete the first step: `3x + 4 = 19`, so `3x + 4 - 4 = 19 - ___`.
- Answer: `4`
- Explanation: The first move removes the constant `+4`, so subtract 4 from both sides.
- Distractors: `3`; `19`; `15`; `x`
- Distractor Rationale: Uses coefficient; copies right side; jumps to intermediate result; writes variable instead of operation amount.
- Randomization Rules: Use equations `ax + b = c` or `ax - b = c`; blank the matching right-side operation amount.
- Validity Constraints: The displayed step must have exactly one matching balanced completion.
- Metadata: phase_id=P002; prerequisites=[balanced transformations, inverse operations]; misconception_tags=[changes one side only, wrong first move, coefficient confusion]; randomization_constraints=[single blank, one correct operation amount].
- Graph/Visual Variant: Balance scale removes the same number of unit tiles from both sides.
- Modeling Variant: "Complete the matching action on both sides of a locked gate."
- Reverse Variant: "Given the first step `-4`, write a two-step equation where it applies."
- Equation Battle Variant: This is a battle action-completion prompt.
- Multi-stage Boss Variant: Missing first move precedes solving and checking.
- Hint Mapping: H-P002-T017
- Tutorial Mapping: Tut-P002 sections Equation Battle Moves
- Socratic Mapping: Soc-P002 first-move branch

## Template T018 - Error detection in operation order
- Template ID: P002-T018
- Question Type: Error detection
- Cognitive Skill: Diagnose invalid solving
- Difficulty: 4
- Estimated Time: 60 seconds
- Visual Required: false
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Identify and correct an operation-order error in a two-step equation.
- Example Question: A player solves `2x + 7 = 15` by dividing both sides by 2 first and gets `x + 7 = 7.5`. What is the error, and what is the correct solution?
- Answer: The player divided only the `2x` term cleanly but did not divide the entire left side; remove `+7` first. Correct solution: `2x = 8`, so `x = 4`.
- Explanation: In `2x + 7`, the `+7` is outside the multiplication by 2, so it should be undone before dividing by 2.
- Distractors: "No error; `x = 0.5`"; "The answer is `x = 7.5`"; "They should add 7 first"; "The equation has no solution"
- Distractor Rationale: Accepts invalid partial division; stops at wrong line; wrong inverse operation; mistakes an error for inconsistency.
- Randomization Rules: Present common incorrect work for equations `ax + b = c`; ask for error and repaired answer.
- Validity Constraints: Incorrect work must contain exactly one targeted error; repaired solution must be simple.
- Metadata: phase_id=P002; prerequisites=[order of operations, checking solutions]; misconception_tags=[divides one term only, wrong operation order, does not check]; randomization_constraints=[one targeted error, clean repaired solution].
- Graph/Visual Variant: Highlight that division must apply to the whole side if used at that stage.
- Modeling Variant: "A battle replay shows a wrong move; the player must identify the illegal action."
- Reverse Variant: "Create a wrong solution path for `3x + 2 = 14` and explain the correction."
- Equation Battle Variant: Use as post-battle feedback after an illegal move.
- Multi-stage Boss Variant: Boss asks for error, repaired first move, solution, and check.
- Hint Mapping: H-P002-T018
- Tutorial Mapping: Tut-P002 sections Common Mistakes
- Socratic Mapping: Soc-P002 error branch

## Template T019 - Build a two-step model
- Template ID: P002-T019
- Question Type: Build the model
- Cognitive Skill: Translate and solve
- Difficulty: 3
- Estimated Time: 55 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Build and solve a two-step linear equation from a simple context.
- Example Question: A guild charges 5 coins to enter and 3 coins per quest. A player pays 26 coins total. Let `q` be the number of quests. Write and solve an equation.
- Answer: `3q + 5 = 26`; `q = 7`
- Explanation: The per-quest cost is `3q`, and the fixed entry cost is 5. Subtract 5, then divide by 3.
- Distractors: `5q + 3 = 26`, `q = 23/5`; `3q - 5 = 26`, `q = 31/3`; `3q = 26`, `q = 26/3`; `q = 21`
- Distractor Rationale: Swaps fixed and variable costs; treats fee as subtraction; ignores fixed cost; stops after subtracting 5.
- Randomization Rules: Use fixed fee plus rate times quantity contexts; choose totals that give whole-number quantities.
- Validity Constraints: Define the variable; units must be clear; quantity should be practical unless intentionally discussing invalid contexts.
- Metadata: phase_id=P002; prerequisites=[context translation, two-step solving]; misconception_tags=[swaps fixed and variable terms, ignores fixed cost, stops early]; randomization_constraints=[total=rate*quantity+fixed, integer quantity].
- Graph/Visual Variant: Bar model with fixed segment plus equal quest segments.
- Modeling Variant: This is the core modeling template for Phase 002.
- Reverse Variant: "Write a guild-cost story matching `3q + 5 = 26`."
- Equation Battle Variant: After modeling, battle sequence is `-5`, then `/3`.
- Multi-stage Boss Variant: Build equation, solve, interpret, and verify units.
- Hint Mapping: H-P002-T019
- Tutorial Mapping: Tut-P002 sections Modeling
- Socratic Mapping: Soc-P002 modeling branch

## Template T020 - Multi-stage boss with distribution and signs
- Template ID: P002-T020
- Question Type: Boss challenge
- Cognitive Skill: Integrated multi-step solving
- Difficulty: 5
- Estimated Time: 100 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve an equation requiring grouped reasoning, signs, inverse operations, and checking.
- Example Question: Boss Gate: Solve `-3(x - 2) + 4 = 19`. Show a valid sequence of moves and check your solution.
- Answer: `x = -3`
- Explanation: Subtract 4: `-3(x - 2) = 15`. Divide by `-3`: `x - 2 = -5`. Add 2: `x = -3`. Check: `-3(-3 - 2) + 4 = -3(-5) + 4 = 19`.
- Distractors: `x = 3`; `x = 7`; `x = -7`; `x = -5`
- Distractor Rationale: Drops negative sign; adds 4 instead of subtracting; subtracts 2 instead of adding; stops after dividing.
- Randomization Rules: Use one grouped expression with outside negative coefficient and one outside constant; choose values with integer solutions.
- Validity Constraints: Variable appears on one side only; every generated equation must have one solution and clean check.
- Metadata: phase_id=P002; prerequisites=[parentheses, signed division, two-step solving, checking]; misconception_tags=[sign error, wrong operation order, stops early, distributes incorrectly]; randomization_constraints=[one grouped expression, nonzero outside coefficient, integer solution].
- Graph/Visual Variant: Boss lock sequence: remove outside constant, undo outside multiplier, undo inside constant, check.
- Modeling Variant: "A curse triples and reverses a shifted hidden value, then adds 4, producing 19."
- Reverse Variant: "Design a boss equation with solution `x = -3` and an outside coefficient of `-3`."
- Equation Battle Variant: Required card sequence: `-4`, `/ -3`, `+2`, check.
- Multi-stage Boss Variant: This is the phase boss template.
- Hint Mapping: H-P002-T020
- Tutorial Mapping: Tut-P002 sections Full Phase Review
- Socratic Mapping: Soc-P002 boss branch

# Part II - Hint Bible

## H-P002-T001
- Hint 1 - Gentle Nudge: Look for the constant that is added after the variable term.
- Hint 2 - Concept Reminder: In `ax + b = c`, undo `+b` before undoing multiplication by `a`.
- Hint 3 - Focus Hint: The `+5` should be removed first.
- Hint 4 - Guided Next Step: Subtract 5 from both sides.
- Hint 5 - Nearly Complete: `2x = 12`, so divide both sides by 2.
- Hint 6 - Full Solution: `x = 6`; check: `2(6) + 5 = 17`.

## H-P002-T002
- Hint 1 - Gentle Nudge: The variable term is `3y`, but `-7` is also attached to the side.
- Hint 2 - Concept Reminder: Remove addition or subtraction constants before dividing by the coefficient.
- Hint 3 - Focus Hint: Undo `-7` by adding 7.
- Hint 4 - Guided Next Step: Add 7 to both sides to get `3y = 18`.
- Hint 5 - Nearly Complete: Divide 18 by 3.
- Hint 6 - Full Solution: `y = 6`; check: `3(6) - 7 = 11`.

## H-P002-T003
- Hint 1 - Gentle Nudge: Keep the negative sign with the coefficient.
- Hint 2 - Concept Reminder: Remove the constant first, then divide by the full coefficient.
- Hint 3 - Focus Hint: Subtract 6 from both sides before dividing.
- Hint 4 - Guided Next Step: `-4r = 16`.
- Hint 5 - Nearly Complete: `r = 16 / -4`.
- Hint 6 - Full Solution: `r = -4`; check: `-4(-4) + 6 = 22`.

## H-P002-T004
- Hint 1 - Gentle Nudge: Ask what was done after `x` was divided by 5.
- Hint 2 - Concept Reminder: Undo the last visible operation first.
- Hint 3 - Focus Hint: Remove `+3` before dealing with `/5`.
- Hint 4 - Guided Next Step: Subtract 3 from both sides.
- Hint 5 - Nearly Complete: `x/5 = 6`, so multiply by 5.
- Hint 6 - Full Solution: `x = 30`; check: `30/5 + 3 = 9`.

## H-P002-T005
- Hint 1 - Gentle Nudge: The `-6` is outside the division.
- Hint 2 - Concept Reminder: Subtraction is undone by addition.
- Hint 3 - Focus Hint: Add 6 to both sides first.
- Hint 4 - Guided Next Step: `n/4 = 4`.
- Hint 5 - Nearly Complete: Multiply both sides by 4.
- Hint 6 - Full Solution: `n = 16`; check: `16/4 - 6 = -2`.

## H-P002-T006
- Hint 1 - Gentle Nudge: The entire group `(x + 3)` is multiplied by 2.
- Hint 2 - Concept Reminder: You can undo outside multiplication before working inside parentheses.
- Hint 3 - Focus Hint: Divide both sides by 2 first.
- Hint 4 - Guided Next Step: `x + 3 = 7`.
- Hint 5 - Nearly Complete: Subtract 3 from both sides.
- Hint 6 - Full Solution: `x = 4`; check: `2(4 + 3) = 14`.

## H-P002-T007
- Hint 1 - Gentle Nudge: Treat `(w - 5)` as one grouped amount at first.
- Hint 2 - Concept Reminder: Multiplication by 3 is undone by division by 3.
- Hint 3 - Focus Hint: Divide both sides by 3.
- Hint 4 - Guided Next Step: `w - 5 = -2`.
- Hint 5 - Nearly Complete: Add 5 to both sides.
- Hint 6 - Full Solution: `w = 3`; check: `3(3 - 5) = -6`.

## H-P002-T008
- Hint 1 - Gentle Nudge: The outside multiplier is negative.
- Hint 2 - Concept Reminder: Divide by the full coefficient, including its sign.
- Hint 3 - Focus Hint: Divide 10 by `-2`.
- Hint 4 - Guided Next Step: `s + 4 = -5`.
- Hint 5 - Nearly Complete: Subtract 4 from both sides.
- Hint 6 - Full Solution: `s = -9`; check: `-2(-9 + 4) = 10`.

## H-P002-T009
- Hint 1 - Gentle Nudge: Both terms contain the same variable.
- Hint 2 - Concept Reminder: Like terms can be combined before solving.
- Hint 3 - Focus Hint: `4x + 3x = 7x`.
- Hint 4 - Guided Next Step: Rewrite the equation as `7x = 35`.
- Hint 5 - Nearly Complete: Divide both sides by 7.
- Hint 6 - Full Solution: `x = 5`; check: `4(5) + 3(5) = 35`.

## H-P002-T010
- Hint 1 - Gentle Nudge: Simplify the variable terms first.
- Hint 2 - Concept Reminder: `9x - 2x` is `7x`.
- Hint 3 - Focus Hint: Rewrite as `7x + 5 = 26`.
- Hint 4 - Guided Next Step: Subtract 5 from both sides.
- Hint 5 - Nearly Complete: `7x = 21`, so divide by 7.
- Hint 6 - Full Solution: `x = 3`; check: `9(3) - 2(3) + 5 = 26`.

## H-P002-T011
- Hint 1 - Gentle Nudge: Remove the constant before dealing with the decimal coefficient.
- Hint 2 - Concept Reminder: Dividing by `0.5` is the same as multiplying by 2.
- Hint 3 - Focus Hint: Subtract 4 from both sides.
- Hint 4 - Guided Next Step: `0.5m = 7`.
- Hint 5 - Nearly Complete: `m = 7 / 0.5`.
- Hint 6 - Full Solution: `m = 14`; check: `0.5(14) + 4 = 11`.

## H-P002-T012
- Hint 1 - Gentle Nudge: First remove the `-5`.
- Hint 2 - Concept Reminder: Multiplying by `2/3` is undone by multiplying by `3/2`.
- Hint 3 - Focus Hint: Add 5 to both sides.
- Hint 4 - Guided Next Step: `(2/3)p = 12`.
- Hint 5 - Nearly Complete: `p = 12 * 3/2`.
- Hint 6 - Full Solution: `p = 18`; check: `(2/3)(18) - 5 = 7`.

## H-P002-T013
- Hint 1 - Gentle Nudge: The entire numerator `x + 6` is divided by 3.
- Hint 2 - Concept Reminder: Division by 3 is undone by multiplication by 3.
- Hint 3 - Focus Hint: Multiply both sides by 3 first.
- Hint 4 - Guided Next Step: `x + 6 = 24`.
- Hint 5 - Nearly Complete: Subtract 6 from both sides.
- Hint 6 - Full Solution: `x = 18`; check: `(18 + 6)/3 = 8`.

## H-P002-T014
- Hint 1 - Gentle Nudge: The denominator is `-2`, not `2`.
- Hint 2 - Concept Reminder: To undo division by `-2`, multiply by `-2`.
- Hint 3 - Focus Hint: `7 * -2 = -14`.
- Hint 4 - Guided Next Step: `x - 4 = -14`.
- Hint 5 - Nearly Complete: Add 4 to both sides.
- Hint 6 - Full Solution: `x = -10`; check: `(-10 - 4)/-2 = 7`.

## H-P002-T015
- Hint 1 - Gentle Nudge: Rewrite mentally as `-2x + 5 = 17`.
- Hint 2 - Concept Reminder: The sign before the variable term stays with the coefficient.
- Hint 3 - Focus Hint: Remove the `+5` first.
- Hint 4 - Guided Next Step: Subtract 5 from both sides to get `-2x = 12`.
- Hint 5 - Nearly Complete: Divide 12 by `-2`.
- Hint 6 - Full Solution: `x = -6`; check: `5 - 2(-6) = 17`.

## H-P002-T016
- Hint 1 - Gentle Nudge: The variable can be on either side of the equal sign.
- Hint 2 - Concept Reminder: `18 = 4x + 2` means the same thing as `4x + 2 = 18`.
- Hint 3 - Focus Hint: Remove the `+2`.
- Hint 4 - Guided Next Step: Subtract 2 from both sides to get `16 = 4x`.
- Hint 5 - Nearly Complete: Divide both sides by 4.
- Hint 6 - Full Solution: `x = 4`; check: `18 = 4(4) + 2`.

## H-P002-T017
- Hint 1 - Gentle Nudge: Match the operation shown on the left side.
- Hint 2 - Concept Reminder: Balanced equations need the same operation on both sides.
- Hint 3 - Focus Hint: The left side subtracts 4.
- Hint 4 - Guided Next Step: The right side should also subtract 4.
- Hint 5 - Nearly Complete: `3x + 4 - 4 = 19 - 4`.
- Hint 6 - Full Solution: The blank is `4`; then `3x = 15` and `x = 5`.

## H-P002-T018
- Hint 1 - Gentle Nudge: Check whether the division was applied to the whole side or just one term.
- Hint 2 - Concept Reminder: You cannot divide only `2x` and leave `+7` unchanged if dividing both sides.
- Hint 3 - Focus Hint: The safer first move is to remove `+7`.
- Hint 4 - Guided Next Step: Subtract 7 from both sides: `2x = 8`.
- Hint 5 - Nearly Complete: Divide by 2.
- Hint 6 - Full Solution: The error is dividing too early/partially; correct solution is `x = 4`.

## H-P002-T019
- Hint 1 - Gentle Nudge: Separate the fixed cost from the per-quest cost.
- Hint 2 - Concept Reminder: "Per quest" means multiply by the number of quests.
- Hint 3 - Focus Hint: The variable part is `3q`; the fixed fee is `+5`.
- Hint 4 - Guided Next Step: Write `3q + 5 = 26`.
- Hint 5 - Nearly Complete: Subtract 5 to get `3q = 21`, then divide by 3.
- Hint 6 - Full Solution: `q = 7`; the player completed 7 quests.

## H-P002-T020
- Hint 1 - Gentle Nudge: Start with the operation outside the parentheses.
- Hint 2 - Concept Reminder: Undo `+4`, then undo multiplication by `-3`, then undo `-2` inside the parentheses.
- Hint 3 - Focus Hint: Subtract 4 from both sides first.
- Hint 4 - Guided Next Step: `-3(x - 2) = 15`.
- Hint 5 - Nearly Complete: Divide by `-3` to get `x - 2 = -5`, then add 2.
- Hint 6 - Full Solution: `x = -3`; check: `-3(-3 - 2) + 4 = 19`.

# Part III - Tutorial Bible

## Learning Goal
Learn to solve multi-step linear equations by simplifying when needed, undoing operations in a logical order, and checking the final answer in the original equation.

## Why It Matters
Multi-step equations are the bridge between arithmetic puzzles and real algebra. They support later work with variables on both sides, formulas, functions, inequalities, modeling, and Equation Battle challenges where one wrong move can change the entire path.

## Prerequisite Check
Ask the player:

1. Solve `x + 5 = 12`. Expected: `x = 7`.
2. Solve `3x = 18`. Expected: `x = 6`.
3. Combine `4x + 2x`. Expected: `6x`.
4. Simplify `2(x + 3)`. Expected: `2x + 6`.
5. What operation undoes division by `-4`? Expected: multiplication by `-4`.

If the player misses one-step solving, route to Phase 001 review. If the player misses distribution or combining like terms, show a short simplify-first mini-lesson before continuing.

## Core Concept
Multi-step equations are solved by peeling away operations from the variable.

For `2x + 5 = 17`:

1. The variable is multiplied by 2.
2. Then 5 is added.
3. To undo the expression, reverse that order:
   - subtract 5,
   - then divide by 2.

This is like unlocking a chest with two locks. Remove the outer lock first, then the inner lock.

## Worked Example
Solve `3x - 8 = 19`.

Step 1: Identify the structure.
`3x` has `-8` attached.

Step 2: Remove the constant.
Add 8 to both sides:
`3x - 8 + 8 = 19 + 8`
`3x = 27`

Step 3: Remove the coefficient.
Divide both sides by 3:
`x = 9`

Step 4: Check in the original equation.
`3(9) - 8 = 27 - 8 = 19`, so `x = 9` is correct.

## Parentheses Strategy
For equations like `2(x + 3) = 14`, the whole group is multiplied by 2. You may divide first:

`2(x + 3) = 14`
`x + 3 = 7`
`x = 4`

Distribution also works:

`2x + 6 = 14`
`2x = 8`
`x = 4`

Both paths are valid when every operation is applied correctly.

## Simplify First
If one side has like terms, combine them before solving:

`9x - 2x + 5 = 26`
`7x + 5 = 26`
`7x = 21`
`x = 3`

Do not combine unlike terms such as `7x + 5`; they are different kinds of objects.

## Fraction and Decimal Strategy
For `(2/3)p - 5 = 7`, remove the constant first:

`(2/3)p = 12`

Then undo multiplication by `2/3` using the reciprocal:

`p = 12 * 3/2 = 18`

For `0.5m + 4 = 11`, subtract 4, then divide by `0.5` or multiply by 2.

## Common Mistakes
- Mistake: Dividing first in `2x + 7 = 15`.
  Correction: Remove `+7` first unless you divide the entire side correctly.
- Mistake: Dividing only one term.
  Correction: An operation applied to a side applies to the entire side.
- Mistake: Dropping the negative coefficient.
  Correction: In `-4r + 6 = 22`, divide by `-4`, not 4.
- Mistake: Distributing to only one term.
  Correction: `2(x + 3)` becomes `2x + 6`, not `2x + 3`.
- Mistake: Stopping after the first inverse operation.
  Correction: Continue until the variable is alone.
- Mistake: Checking in a later line.
  Correction: Always check in the original equation.

## Guided Practice
1. Solve `4x + 3 = 23`.
   - Subtract 3: `4x = 20`.
   - Divide by 4: `x = 5`.
   - Check: `4(5) + 3 = 23`.

2. Solve `2(y - 6) = 10`.
   - Divide by 2: `y - 6 = 5`.
   - Add 6: `y = 11`.
   - Check: `2(11 - 6) = 10`.

3. Solve `-3n - 4 = 14`.
   - Add 4: `-3n = 18`.
   - Divide by `-3`: `n = -6`.
   - Check: `-3(-6) - 4 = 14`.

## Independent Practice
1. Solve `5x + 2 = 32`. Answer: `x = 6`.
2. Solve `7a - 9 = 26`. Answer: `a = 5`.
3. Solve `3(q + 4) = 30`. Answer: `q = 6`.
4. Solve `(x - 5)/2 = 8`. Answer: `x = 21`.
5. Solve `6m - 2m + 7 = 31`. Answer: `m = 6`.

## Mastery Check
The player is ready to advance when they can:

1. Solve at least 4 of 5 mixed multi-step equations.
2. Correctly identify the first inverse move.
3. Simplify same-side like terms before solving.
4. Handle a negative coefficient or negative denominator.
5. Check one solution in the original equation.

Mastery check set:

1. `2x + 9 = 25`; solution `x = 8`.
2. `-5r + 3 = 28`; solution `r = -5`.
3. `4(t - 2) = 20`; solution `t = 7`.
4. `(p + 10)/-2 = 6`; solution `p = -22`.
5. `3q + 6 = 30` for a 6-coin fee and 3 coins per quest; solution `q = 8`.

## Adaptive Tutor Messages
- If the player divides before removing constants: "You found the coefficient. Now look for the operation outside the variable term; remove that first."
- If the player stops after one step: "You are halfway there. Is the variable alone yet?"
- If the player drops negative signs: "Carry the sign with the coefficient until the division step is complete."
- If the player mishandles parentheses: "Treat the parentheses as one package, or distribute to every term inside."
- If the player checks in the wrong line: "Use the original equation as the truth test."
- If the player succeeds quickly: "Move into equations with variables on both sides next; the same balance idea will still work."

## Tutorial Metadata
- Tutorial ID: Tut-P002
- Estimated duration: 5 minutes
- Target player state: knows one-step equations but needs sequencing strategy
- Unlock condition: available from any Phase 002 question
- Remediation trigger: two wrong first moves, two sign errors, two distribution errors, or repeated stopping before the variable is isolated
- Advancement trigger: 80 percent accuracy on mixed multi-step equations plus one successful original-equation check

# Part IV - Socratic Dialogue Bible

## Opening Diagnostic
Tutor: "For `2x + 5 = 17`, what should we undo first: the multiplication by 2 or the addition of 5? Why?"

Expected strong answer: "Undo the addition of 5 first because it is outside the variable term, then divide by 2."

## Guided Discovery
Tutor sequence:

1. "What expression contains the variable?"
2. "Can anything on that side be simplified first?"
3. "What operation is farthest from the variable?"
4. "What inverse operation removes it?"
5. "How do we apply that operation to keep the equation balanced?"
6. "Is the variable alone now?"
7. "What operation still needs to be undone?"
8. "What solution do we get?"
9. "Does the solution check in the original equation?"

The tutor asks one focused question at a time.

## Correct Branch
Player: "Subtract 5 first, then divide by 2."

Tutor: "Good. Subtracting 5 gives `2x = 12`. What does dividing by 2 give?"

If player answers `x = 6`, ask: "How can we check that in the original equation?"

Exit when the player checks `2(6) + 5 = 17`.

## Partial Understanding Branch
Player: "Subtract 5" but does not know what comes next.

Tutor: "Great first move. After subtracting 5, the equation is `2x = 12`. What one-step equation does that look like?"

If needed: "What operation undoes multiplication by 2?"

## Misconception Branch
Player: "Divide by 2 first."

Tutor: "Let's inspect that. If we divide the left side by 2, does the entire expression `2x + 5` get divided, or only `2x`?"

Follow-up: "What part can be removed cleanly without splitting the side?"

If player changes one side only: "Would the two sides still be guaranteed equal if only one side changed?"

Recovery target: Player chooses a balanced first move.

## Unsure Branch
Player: "I don't know."

Tutor: "No problem. Look at `2x + 5`. Which operation is outside the multiplication part: `+5` or `*2`?"

If player identifies `+5`: "What operation undoes adding 5?"

If still unsure, show Hint 2 and return to the same question.

## Unrelated Response Branch
Player gives an unrelated answer.

Tutor: "Let's return to the equation. In `2x + 5 = 17`, choose the operation you see outside the variable term: add 5, subtract 5, multiply by 2, or divide by 2."

If unrelated again, switch to a two-choice prompt: "Do we remove the `+5` first or the `*2` first?"

## Recovery Prompts
- "Can the side be simplified first?"
- "What operation is farthest from the variable?"
- "What inverse operation removes that?"
- "Did we apply the move to both sides?"
- "Is the variable alone yet?"
- "Can the answer be checked in the original equation?"

## Reflection Question
"Why is solving `2x + 5 = 17` different from solving `2x = 17`?"

Strong reflection: "Because `2x + 5 = 17` has an extra constant attached, so I need to remove 5 before dividing by 2."

## Transfer Question
"How would the strategy change for `2(x + 5) = 17`?"

Expected transfer: "The group `x + 5` is multiplied by 2, so I can divide by 2 first, then subtract 5."

## Escalation Rules
- If the player misses two first-move decisions, open the tutorial section Core Concept.
- If the player divides only one term, show the Common Mistakes section and a whole-side highlight.
- If the player makes two sign errors, route to signed coefficient review.
- If the player mishandles parentheses twice, show Parentheses Strategy.
- If the player solves correctly but does not check, ask a substitution-only prompt.
- If the player solves three mixed questions with checks, advance to independent practice.

## Exit Condition
The Socratic sequence is complete when the player:

1. Simplifies first when appropriate.
2. Chooses the correct first inverse operation.
3. Applies balanced moves to both sides.
4. Continues until the variable is alone.
5. Checks the solution in the original equation.

# Knowledge Graph

- Prerequisites: Phase 001 one-step linear equations; inverse operations; equality preservation; signed arithmetic; fraction and decimal operations; distributive property; combining like terms
- Concepts Unlocked: two-step solving; simplify-first strategy; grouped-expression solving; reciprocal after constant removal; whole-side operation awareness; multi-step checking; Equation Battle move sequencing
- Related Concepts: order of operations; equivalent equations; arithmetic with signed numbers; context translation; balance-scale reasoning
- Common Misconceptions: dividing too early; applying an operation to one term only; stopping after one inverse move; dropping negative signs; distributing to only one term; combining unlike terms; checking in a transformed equation; swapping fixed and variable context quantities
- Remedial Phases: Phase 001 review; signed-number review; distributive property mini-lesson; combining-like-terms mini-lesson; fraction reciprocal review
- Follow-up Phases: Phase 003 - Variables on both sides; Phase 004 - Literal equations; Phase 005 - Linear equation modeling; Phase 006 - Equation Battle fundamentals
- Transfer Topics: equation rearrangement; formula solving; linear function rules; inequalities; systems of equations; algebraic modeling

# Validation Notes

## Structure Validation
- Includes all required Bibles and repository-required metadata sections.
- Contains exactly 20 template families, within the required 20-40 range.
- Each template includes example, answer, explanation, distractors, distractor rationale, randomization rules, validity constraints, metadata, variants, and mappings.
- Every template has a six-level progressive hint sequence.

## Math Validation
- T001: `2x + 5 = 17` -> `2x = 12` -> `x = 6`.
- T002: `3y - 7 = 11` -> `3y = 18` -> `y = 6`.
- T003: `-4r + 6 = 22` -> `-4r = 16` -> `r = -4`.
- T004: `x/5 + 3 = 9` -> `x/5 = 6` -> `x = 30`.
- T005: `n/4 - 6 = -2` -> `n/4 = 4` -> `n = 16`.
- T006: `2(x + 3) = 14` -> `x + 3 = 7` -> `x = 4`.
- T007: `3(w - 5) = -6` -> `w - 5 = -2` -> `w = 3`.
- T008: `-2(s + 4) = 10` -> `s + 4 = -5` -> `s = -9`.
- T009: `4x + 3x = 35` -> `7x = 35` -> `x = 5`.
- T010: `9x - 2x + 5 = 26` -> `7x + 5 = 26` -> `x = 3`.
- T011: `0.5m + 4 = 11` -> `0.5m = 7` -> `m = 14`.
- T012: `(2/3)p - 5 = 7` -> `(2/3)p = 12` -> `p = 18`.
- T013: `(x + 6)/3 = 8` -> `x + 6 = 24` -> `x = 18`.
- T014: `(x - 4)/-2 = 7` -> `x - 4 = -14` -> `x = -10`.
- T015: `5 - 2x = 17` -> `-2x = 12` -> `x = -6`.
- T016: `18 = 4x + 2` -> `16 = 4x` -> `x = 4`.
- T017: `3x + 4 = 19` first blank is `4`; full solution `x = 5`.
- T018: `2x + 7 = 15` correct path is `2x = 8` -> `x = 4`; the shown division-first step is invalid as written.
- T019: `3q + 5 = 26` -> `3q = 21` -> `q = 7`.
- T020: `-3(x - 2) + 4 = 19` -> `-3(x - 2) = 15` -> `x - 2 = -5` -> `x = -3`.

## Distractor Validation
- Distractors are based on plausible mistakes: wrong first move, sign loss, stopping early, partial division, bad distribution, and model reversal.
- Multiple-choice-style templates have one correct answer or one clearly correct classification.
- Distractors were checked against original equations to avoid accidental correctness.

## Hint Validation
- Hints progress from noticing structure to recalling a concept, focusing on the first move, giving a guided step, nearly completing the solve, and showing the full solution.
- Early hints do not reveal the final answer.
- Hint 6 includes a check or enough final work to verify the solution.

## Tutorial Validation
- Tutorial includes learning goal, prerequisite check, why it matters, core concept, worked example, parentheses strategy, simplify-first strategy, fraction/decimal strategy, common mistakes, guided practice, independent practice, mastery check, adaptive messages, and metadata.
- Tutorial assumes the learner knows Phase 001 but may not yet know multi-step sequencing.

## Socratic Validation
- Dialogue includes opening diagnostic, guided discovery, correct branch, partial branch, misconception branch, unsure branch, unrelated branch, recovery prompts, reflection, transfer, escalation rules, and exit condition.
- Tutor guides the player toward the first move before giving full answers.

## Metadata Validation
- Every template includes IDs, difficulty, timing, visual flag, compatibility flags, prerequisites, misconception tags, randomization constraints, and support-system mappings.

## Known Issues
- The repository specifications differ on the label for Hint 4. This phase uses "Guided Next Step" to match the master prompt language.
- `PHASE_TEMPLATE.md` omits Common Misconceptions from the Knowledge Graph section, but this phase includes it because the master prompt and knowledge graph guide require it.
