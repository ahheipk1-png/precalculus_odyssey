# Phase 003 - Variables on Both Sides

## Phase Metadata
- Course: Precalculus Odyssey Bible v5
- Topic: Variables on both sides
- Subtopic: Solving linear equations with variable terms on both sides of the equal sign
- Prerequisites: Phase 001 one-step linear equations, Phase 002 multi-step linear equations, combining like terms, signed arithmetic, distributive property, checking solutions
- Related phases: Phase 002 - Multi-step linear equations; Phase 004 - Literal equations; Phase 005 - Linear equation modeling; Phase 006 - Equation Battle fundamentals
- Estimated phase size: 20 template families, 20 core examples, 120 progressive hints, 1 tutorial sequence, 1 Socratic dialogue system

## Learning Objectives
By the end of this phase, the player can:

1. Move variable terms across the equal sign using balanced inverse operations.
2. Move constant terms to the opposite side after collecting variables.
3. Choose a collection strategy that reduces sign errors.
4. Solve equations with distribution, fractions, decimals, and variables on both sides.
5. Recognize equations with one solution, no solution, or infinitely many solutions.
6. Detect invalid one-sided moves and accidental cancellation mistakes.
7. Model equal-value situations with variables on both sides.

## Prerequisite Review
- Like terms can be combined only when they have the same variable part.
- Subtracting `x` from both sides removes an `x` term from both sides in a balanced way.
- Equations may be rewritten with the variable expression on either side.
- If both sides simplify to the same statement, every value works.
- If both sides simplify to a false statement, no value works.

## Core Concepts
- When variables appear on both sides, collect all variable terms on one side and constants on the other.
- The choice of side can affect arithmetic difficulty. Moving the smaller variable coefficient to the larger one often avoids negative coefficients.
- After variables are collected, the equation becomes a one-step or multi-step equation already covered in earlier phases.
- If variable terms cancel completely, inspect the remaining number statement carefully.

## Common Misconceptions
- Moving a term by "crossing the equal sign" without applying the inverse operation to both sides.
- Subtracting a variable term from only one side.
- Losing negative signs when moving terms.
- Combining constants with variable terms.
- Assuming every equation has exactly one solution.
- Treating `0 = 0` as no solution instead of infinitely many solutions.
- Treating `4 = -8` as one solution instead of no solution.
- Distributing incorrectly before moving variables.

# Part I - Question Bible

## Template T001 - Basic variable collection from right to left
- Template ID: P003-T001
- Question Type: Direct computation
- Cognitive Skill: Collect variables
- Difficulty: 2
- Estimated Time: 40 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve equations of the form `ax + b = cx + d`.
- Example Question: Solve `3x + 5 = x + 13`.
- Answer: `x = 4`
- Explanation: Subtract `x` from both sides to get `2x + 5 = 13`. Subtract 5 to get `2x = 8`. Divide by 2: `x = 4`.
- Distractors: `x = 9`; `x = 6`; `x = -4`; `x = 8`
- Distractor Rationale: Moves constants but not variables; subtracts 5 before collecting variables and stops; sign error; stops at `2x = 8`.
- Randomization Rules: Choose coefficients `a` and `c` with `a != c`, solution `s`, and constant `b`; set `d = as + b - cs`.
- Validity Constraints: `a - c` cannot be 0 for this template; use integer solutions.
- Metadata: phase_id=P003; prerequisites=[P002 two-step solving, combining like terms]; misconception_tags=[does not collect variables, stops early, sign error]; randomization_constraints=[a != c, integer solution].
- Graph/Visual Variant: Optional graph of `y = 3x + 5` and `y = x + 13`; intersection has x-coordinate 4.
- Modeling Variant: Two progress bars start at 5 and 13 with rates 3 and 1; find when they match.
- Reverse Variant: Create an equation with variables on both sides and solution 4.
- Equation Battle Variant: Battle sequence: `-x`, `-5`, `/2`.
- Multi-stage Boss Variant: Ask for variable collection, constant collection, solve, and check.
- Hint Mapping: H-P003-T001
- Tutorial Mapping: Tut-P003 sections Core Concept and Worked Example
- Socratic Mapping: Soc-P003 collection branch

## Template T002 - Larger left coefficient with subtraction constant
- Template ID: P003-T002
- Question Type: Direct computation
- Cognitive Skill: Collect variables and constants
- Difficulty: 2
- Estimated Time: 45 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve `ax - b = cx + d`.
- Example Question: Solve `7x - 4 = 2x + 16`.
- Answer: `x = 4`
- Explanation: Subtract `2x`: `5x - 4 = 16`. Add 4: `5x = 20`. Divide by 5: `x = 4`.
- Distractors: `x = 12/5`; `x = 20`; `x = -4`; `x = 5`
- Distractor Rationale: Divides before adding 4; stops early; sign error; uses coefficient as answer.
- Randomization Rules: Choose `a > c`, constant `b`, solution `s`, and compute `d = as - b - cs`.
- Validity Constraints: Coefficients must differ; keep `a - c` nonzero.
- Metadata: phase_id=P003; prerequisites=[signed addition, P002 solving]; misconception_tags=[wrong operation order, stops early, coefficient as answer]; randomization_constraints=[a>c, integer solution].
- Graph/Visual Variant: Balance scale removes `2x` tiles from both sides.
- Modeling Variant: Plan A loses 4 points after 7 points per stage; Plan B has 16 bonus plus 2 per stage.
- Reverse Variant: Write `7x - 4 = 2x + d` with solution 4.
- Equation Battle Variant: Action sequence: `-2x`, `+4`, `/5`.
- Multi-stage Boss Variant: Include a check in the original equation.
- Hint Mapping: H-P003-T002
- Tutorial Mapping: Tut-P003 sections Guided Practice
- Socratic Mapping: Soc-P003 collection branch

## Template T003 - Larger right coefficient
- Template ID: P003-T003
- Question Type: Direct computation
- Cognitive Skill: Choose collection side
- Difficulty: 3
- Estimated Time: 45 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Move variable terms to the side that keeps the coefficient positive.
- Example Question: Solve `4x + 9 = 6x - 3`.
- Answer: `x = 6`
- Explanation: Subtract `4x` from both sides: `9 = 2x - 3`. Add 3: `12 = 2x`. Divide by 2: `x = 6`.
- Distractors: `x = -6`; `x = 3`; `x = 12`; `x = 2`
- Distractor Rationale: Sign error from moving terms; stops after adding 3; stops at `12 = 2x`; uses coefficient difference.
- Randomization Rules: Choose right coefficient greater than left coefficient; choose constants for integer solution.
- Validity Constraints: Coefficient difference nonzero; avoid zero coefficient after collection.
- Metadata: phase_id=P003; prerequisites=[equation symmetry, signed arithmetic]; misconception_tags=[sign error, chooses difficult side, stops early]; randomization_constraints=[right coefficient larger, integer solution].
- Graph/Visual Variant: Show moving `4x` tiles away from both sides.
- Modeling Variant: Two magic meters grow at rates 4 and 6 with different starting values.
- Reverse Variant: Create an equation where moving variables right avoids negatives.
- Equation Battle Variant: Suggested action sequence: `-4x`, `+3`, `/2`.
- Multi-stage Boss Variant: First asks "which variable term should be removed to avoid a negative coefficient?"
- Hint Mapping: H-P003-T003
- Tutorial Mapping: Tut-P003 sections Choosing a Side
- Socratic Mapping: Soc-P003 side-choice branch

## Template T004 - Negative coefficient on one side
- Template ID: P003-T004
- Question Type: Direct computation
- Cognitive Skill: Signed variable collection
- Difficulty: 3
- Estimated Time: 50 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve variables-on-both-sides equations with a negative variable coefficient.
- Example Question: Solve `-2x + 7 = x - 8`.
- Answer: `x = 5`
- Explanation: Add `2x` to both sides: `7 = 3x - 8`. Add 8: `15 = 3x`. Divide by 3: `x = 5`.
- Distractors: `x = -5`; `x = 1/3`; `x = 15`; `x = -1`
- Distractor Rationale: Sign error; combines coefficients as `-1x`; stops early; subtracts 8 instead of adding.
- Randomization Rules: Use one negative and one positive coefficient; choose constants giving integer solution.
- Validity Constraints: Sum after moving variable must be nonzero.
- Metadata: phase_id=P003; prerequisites=[negative coefficients, P002 signs]; misconception_tags=[sign error, combines coefficients incorrectly, stops early]; randomization_constraints=[one negative coefficient, nonzero collected coefficient].
- Graph/Visual Variant: Signed tile model shows adding `2x` tiles to both sides.
- Modeling Variant: A penalty-rate path and a reward-rate path meet after the same number of turns.
- Reverse Variant: Write an equation with `-2x` on one side and solution 5.
- Equation Battle Variant: Action sequence: `+2x`, `+8`, `/3`.
- Multi-stage Boss Variant: Include a signed-tile reasoning checkpoint.
- Hint Mapping: H-P003-T004
- Tutorial Mapping: Tut-P003 sections Negative Coefficients
- Socratic Mapping: Soc-P003 sign branch

## Template T005 - Constant first with negative variable term
- Template ID: P003-T005
- Question Type: Direct computation
- Cognitive Skill: Track term signs
- Difficulty: 3
- Estimated Time: 50 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Keep signs attached to terms when constants appear before variable terms.
- Example Question: Solve `5 - 3x = 2x + 20`.
- Answer: `x = -3`
- Explanation: Subtract `2x` from both sides: `5 - 5x = 20`. Subtract 5: `-5x = 15`. Divide by `-5`: `x = -3`.
- Distractors: `x = 3`; `x = -5`; `x = -15`; `x = 5`
- Distractor Rationale: Drops negative sign; uses coefficient; stops early; sign reversal error.
- Randomization Rules: Use `b - ax = cx + d`; choose values for clean integer solution.
- Validity Constraints: `-(a+c)` must be nonzero; signs must be explicit.
- Metadata: phase_id=P003; prerequisites=[constant-first equations, signed division]; misconception_tags=[drops negative sign, term sign confusion, stops early]; randomization_constraints=[negative collected coefficient, integer solution].
- Graph/Visual Variant: Arrange positive constants and negative variable tiles visibly.
- Modeling Variant: A starting bonus is reduced per level while another path gains per level plus a bonus.
- Reverse Variant: Build a constant-first variables-on-both-sides equation with solution `-3`.
- Equation Battle Variant: Action sequence: `-2x`, `-5`, `/ -5`.
- Multi-stage Boss Variant: Requires identifying the coefficient of `x` as `-3`, not `3`.
- Hint Mapping: H-P003-T005
- Tutorial Mapping: Tut-P003 sections Term Signs
- Socratic Mapping: Soc-P003 sign branch

## Template T006 - Distribution on one side
- Template ID: P003-T006
- Question Type: Direct computation
- Cognitive Skill: Distribute then collect
- Difficulty: 3
- Estimated Time: 55 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve variables-on-both-sides equations requiring distribution.
- Example Question: Solve `2(x + 3) = x + 11`.
- Answer: `x = 5`
- Explanation: Distribute: `2x + 6 = x + 11`. Subtract `x`: `x + 6 = 11`. Subtract 6: `x = 5`.
- Distractors: `x = 8`; `x = 17`; `x = -5`; `x = 11`
- Distractor Rationale: Distributes incorrectly as `2x + 3`; adds constants; sign error; copies right constant.
- Randomization Rules: Use `a(x+b)=cx+d` with `a != c`; choose integer solutions.
- Validity Constraints: Distribution must produce one variable term and one constant; collected coefficient nonzero.
- Metadata: phase_id=P003; prerequisites=[distributive property, variable collection]; misconception_tags=[distributes incorrectly, does not collect variables, copies constant]; randomization_constraints=[a != c, integer solution].
- Graph/Visual Variant: Expand two identical groups before balancing.
- Modeling Variant: Two bundles each contain unknown value plus 3; another path has one unknown plus 11.
- Reverse Variant: Create a one-side distribution equation with solution 5.
- Equation Battle Variant: First action can be "distribute," then `-x`, then `-6`.
- Multi-stage Boss Variant: Gate requires both expansion and solving.
- Hint Mapping: H-P003-T006
- Tutorial Mapping: Tut-P003 sections Distribution
- Socratic Mapping: Soc-P003 distribution branch

## Template T007 - Distribution with inside subtraction
- Template ID: P003-T007
- Question Type: Direct computation
- Cognitive Skill: Distribute signed constants
- Difficulty: 3
- Estimated Time: 55 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Distribute over subtraction before collecting variables.
- Example Question: Solve `3(x - 4) = 2x + 1`.
- Answer: `x = 13`
- Explanation: Distribute: `3x - 12 = 2x + 1`. Subtract `2x`: `x - 12 = 1`. Add 12: `x = 13`.
- Distractors: `x = -13`; `x = 5`; `x = 1`; `x = 12`
- Distractor Rationale: Sign error; distributes as `3x - 4`; stops early; uses constant.
- Randomization Rules: Use `a(x-b)=cx+d`; choose clean integer solution.
- Validity Constraints: `a - c` nonzero; distribute to both terms.
- Metadata: phase_id=P003; prerequisites=[distribution over subtraction, P002 solving]; misconception_tags=[partial distribution, sign error, stops early]; randomization_constraints=[a-c nonzero, integer solution].
- Graph/Visual Variant: Highlight the multiplier applying to both `x` and `-4`.
- Modeling Variant: Three rooms each have an unknown after a 4-point cost; compare to another path.
- Reverse Variant: Write a distribution equation with inside subtraction and solution 13.
- Equation Battle Variant: Action sequence: distribute, `-2x`, `+12`.
- Multi-stage Boss Variant: Trap answer from forgetting to multiply `-4` by 3.
- Hint Mapping: H-P003-T007
- Tutorial Mapping: Tut-P003 sections Distribution
- Socratic Mapping: Soc-P003 distribution branch

## Template T008 - Distribution plus same-side combining
- Template ID: P003-T008
- Question Type: Direct computation
- Cognitive Skill: Simplify before collecting
- Difficulty: 4
- Estimated Time: 65 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Distribute and combine like terms on one side before collecting variables.
- Example Question: Solve `4x + 2(x - 3) = 3x + 9`.
- Answer: `x = 5`
- Explanation: Distribute and combine: `4x + 2x - 6 = 3x + 9`, so `6x - 6 = 3x + 9`. Subtract `3x`: `3x - 6 = 9`. Add 6: `3x = 15`. Divide by 3: `x = 5`.
- Distractors: `x = 3`; `x = 15`; `x = -5`; `x = 1`
- Distractor Rationale: Fails to combine `4x + 2x`; stops early; sign error; distributes incorrectly.
- Randomization Rules: Use one distributive term plus an extra variable term on the same side.
- Validity Constraints: Same-side variable terms must be like terms; final collected coefficient nonzero.
- Metadata: phase_id=P003; prerequisites=[distribution, combining like terms, collection]; misconception_tags=[fails to simplify first, partial distribution, stops early]; randomization_constraints=[like terms same side, integer solution].
- Graph/Visual Variant: Expand, combine, then balance in three visual panels.
- Modeling Variant: A path has base progress plus two bonus packages; compare to another progress path.
- Reverse Variant: Create a distribution-plus-combining equation with solution 5.
- Equation Battle Variant: Sequence: distribute, combine, `-3x`, `+6`, `/3`.
- Multi-stage Boss Variant: Requires choosing simplify-first before moving variables.
- Hint Mapping: H-P003-T008
- Tutorial Mapping: Tut-P003 sections Simplify Before Collecting
- Socratic Mapping: Soc-P003 simplify branch

## Template T009 - Variable term divided by integer
- Template ID: P003-T009
- Question Type: Direct computation
- Cognitive Skill: Clear or collect fractional variable terms
- Difficulty: 3
- Estimated Time: 55 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve equations with a divided variable term on one side.
- Example Question: Solve `x/2 + 5 = x - 1`.
- Answer: `x = 12`
- Explanation: Subtract `x/2` from both sides: `5 = x/2 - 1`. Add 1: `6 = x/2`. Multiply by 2: `x = 12`.
- Distractors: `x = 8`; `x = 6`; `x = -12`; `x = 3`
- Distractor Rationale: Treats `x/2` as 2x; stops early; sign error; divides by 2 instead of multiplying.
- Randomization Rules: Use `x/a + b = x + d` or equivalent with `a` from 2 to 6.
- Validity Constraints: Denominator nonzero; avoid coefficient difference 0.
- Metadata: phase_id=P003; prerequisites=[fraction coefficients, variable collection]; misconception_tags=[fraction coefficient error, stops early, sign error]; randomization_constraints=[nonzero denominator, integer solution].
- Graph/Visual Variant: Use a bar showing half of `x` plus a constant equals full `x` minus a constant.
- Modeling Variant: Half of a resource plus 5 equals the full resource after spending 1.
- Reverse Variant: Write a variable-both-sides equation with `x/2` and solution 12.
- Equation Battle Variant: Sequence may be `-x/2`, `+1`, `*2`.
- Multi-stage Boss Variant: Accept clearing denominators if done to the entire equation.
- Hint Mapping: H-P003-T009
- Tutorial Mapping: Tut-P003 sections Fractions
- Socratic Mapping: Soc-P003 fraction branch

## Template T010 - Fraction coefficients on both sides
- Template ID: P003-T010
- Question Type: Direct computation
- Cognitive Skill: Work with fractional coefficients
- Difficulty: 4
- Estimated Time: 65 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve variables-on-both-sides equations with fractional coefficients.
- Example Question: Solve `(2/3)x + 4 = (1/3)x + 10`.
- Answer: `x = 18`
- Explanation: Subtract `(1/3)x`: `(1/3)x + 4 = 10`. Subtract 4: `(1/3)x = 6`. Multiply by 3: `x = 18`.
- Distractors: `x = 6`; `x = 9`; `x = -18`; `x = 14`
- Distractor Rationale: Stops early; subtracts fractions incorrectly as `2/3 - 1/3 = 1/2`; sign error; subtracts constants only.
- Randomization Rules: Use related denominators so coefficient differences are clean.
- Validity Constraints: Fraction coefficient difference nonzero; denominators nonzero.
- Metadata: phase_id=P003; prerequisites=[fraction subtraction, reciprocal, collection]; misconception_tags=[fraction arithmetic error, stops early, sign error]; randomization_constraints=[nonzero coefficient difference, clean denominator].
- Graph/Visual Variant: Bar model comparing two fractional portions of the same unknown.
- Modeling Variant: Two scouts report different fractions of a hidden map plus bonuses.
- Reverse Variant: Create a fractional-coefficient equation with solution 18.
- Equation Battle Variant: Sequence: `-(1/3)x`, `-4`, `*3`.
- Multi-stage Boss Variant: Fraction collection is its own lock.
- Hint Mapping: H-P003-T010
- Tutorial Mapping: Tut-P003 sections Fractions
- Socratic Mapping: Soc-P003 fraction branch

## Template T011 - Decimal coefficients on both sides
- Template ID: P003-T011
- Question Type: Direct computation
- Cognitive Skill: Decimal coefficient collection
- Difficulty: 3
- Estimated Time: 55 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve equations with decimal coefficients on both sides.
- Example Question: Solve `0.5x + 3 = 1.5x - 7`.
- Answer: `x = 10`
- Explanation: Subtract `0.5x` from both sides: `3 = x - 7`. Add 7: `10 = x`, so `x = 10`.
- Distractors: `x = -10`; `x = 4`; `x = 1`; `x = 7`
- Distractor Rationale: Sign error; subtracts constants incorrectly; treats coefficient difference as 0.1; stops early.
- Randomization Rules: Use terminating decimal coefficients with simple differences such as 0.5, 1, or 2.
- Validity Constraints: Decimal coefficient difference nonzero; avoid repeating decimals.
- Metadata: phase_id=P003; prerequisites=[decimal subtraction, variable collection]; misconception_tags=[decimal place error, sign error, stops early]; randomization_constraints=[terminating decimals, nonzero difference].
- Graph/Visual Variant: Compare two line graphs with slopes 0.5 and 1.5.
- Modeling Variant: Two meters charge at different decimal rates and have different starting offsets.
- Reverse Variant: Write a decimal variables-on-both-sides equation with solution 10.
- Equation Battle Variant: Sequence: `-0.5x`, `+7`.
- Multi-stage Boss Variant: Ask for coefficient difference before solving.
- Hint Mapping: H-P003-T011
- Tutorial Mapping: Tut-P003 sections Decimal Coefficients
- Socratic Mapping: Soc-P003 decimal branch

## Template T012 - Identity after variables cancel
- Template ID: P003-T012
- Question Type: Number of solutions
- Cognitive Skill: Recognize infinitely many solutions
- Difficulty: 4
- Estimated Time: 55 seconds
- Visual Required: false
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Identify equations that are true for every value.
- Example Question: How many solutions does `2x + 5 = x + x + 5` have?
- Answer: Infinitely many solutions.
- Explanation: The right side simplifies to `2x + 5`, so the equation becomes `2x + 5 = 2x + 5`. Subtracting `2x` and 5 leaves `0 = 0`, which is always true.
- Distractors: `x = 0`; no solution; `x = 5`; exactly one solution
- Distractor Rationale: Misreads `0 = 0`; treats visible constant as solution; assumes all equations have one solution.
- Randomization Rules: Generate algebraically identical expressions on both sides with different-looking forms.
- Validity Constraints: Both sides must simplify to the same expression exactly.
- Metadata: phase_id=P003; prerequisites=[simplifying expressions, equality statements]; misconception_tags=[identity confusion, assumes one solution, zero misconception]; randomization_constraints=[equivalent expressions, all real x].
- Graph/Visual Variant: Graph both sides as the same line; every point overlaps.
- Modeling Variant: Two reward formulas are secretly identical for every level.
- Reverse Variant: Create two different-looking expressions that are equivalent for every `x`.
- Equation Battle Variant: Use as a reasoning checkpoint rather than a standard battle solve.
- Multi-stage Boss Variant: Player must simplify both sides and classify the solution set.
- Hint Mapping: H-P003-T012
- Tutorial Mapping: Tut-P003 sections Special Cases
- Socratic Mapping: Soc-P003 identity branch

## Template T013 - Contradiction after variables cancel
- Template ID: P003-T013
- Question Type: Number of solutions
- Cognitive Skill: Recognize no solution
- Difficulty: 4
- Estimated Time: 55 seconds
- Visual Required: false
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Identify equations that have no solution.
- Example Question: How many solutions does `3x + 4 = 3x - 8` have?
- Answer: No solution.
- Explanation: Subtract `3x` from both sides to get `4 = -8`, which is false. No value of `x` can make the equation true.
- Distractors: `x = 0`; infinitely many solutions; `x = -12`; `x = 4`
- Distractor Rationale: Misreads cancellation; confuses contradiction with identity; subtracts constants and invents a solution; uses visible constant.
- Randomization Rules: Generate equations with identical variable coefficients and different constants.
- Validity Constraints: Constants must differ after simplification.
- Metadata: phase_id=P003; prerequisites=[variable cancellation, truth of number statements]; misconception_tags=[contradiction confusion, assumes one solution, visible-number answer]; randomization_constraints=[same variable coefficient, unequal constants].
- Graph/Visual Variant: Graph parallel lines with equal slopes and different intercepts.
- Modeling Variant: Two paths gain at the same rate but start at different values, so they never meet.
- Reverse Variant: Create a no-solution equation where variable terms cancel.
- Equation Battle Variant: Use as a special-case classification battle.
- Multi-stage Boss Variant: Player must simplify and classify as no solution.
- Hint Mapping: H-P003-T013
- Tutorial Mapping: Tut-P003 sections Special Cases
- Socratic Mapping: Soc-P003 contradiction branch

## Template T014 - Strategic side choice to avoid negatives
- Template ID: P003-T014
- Question Type: Best next step
- Cognitive Skill: Choose efficient first move
- Difficulty: 3
- Estimated Time: 45 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Choose a variable-collection move that keeps arithmetic simple.
- Example Question: For `2x + 9 = 5x - 6`, what is a good first move and what is the solution?
- Answer: Subtract `2x` from both sides; `x = 5`.
- Explanation: Subtracting `2x` gives `9 = 3x - 6`. Add 6: `15 = 3x`. Divide by 3: `x = 5`.
- Distractors: "Subtract `5x`; `x = -5`"; "Subtract 9; `x = 3`"; "Divide by 2 first; `x = 7.5`"; "No solution"
- Distractor Rationale: Creates negative coefficient and sign error; moves constants before variables incompletely; divides too early; misclassifies.
- Randomization Rules: Use equations where one variable coefficient is clearly smaller.
- Validity Constraints: Both collection choices may be valid, but the listed answer must include a correct solution.
- Metadata: phase_id=P003; prerequisites=[collection strategy, signed arithmetic]; misconception_tags=[inefficient side choice, sign error, divides too early]; randomization_constraints=[one preferred positive-coefficient move, one solution].
- Graph/Visual Variant: Show two possible first moves, one leading to positive coefficient and one to negative coefficient.
- Modeling Variant: Two plans with rates 2 and 5; choose the cleaner comparison direction.
- Reverse Variant: Write an equation where subtracting the smaller variable term is efficient.
- Equation Battle Variant: Player chooses among first-move cards.
- Multi-stage Boss Variant: Reward a clean strategy but accept any valid balanced path.
- Hint Mapping: H-P003-T014
- Tutorial Mapping: Tut-P003 sections Choosing a Side
- Socratic Mapping: Soc-P003 side-choice branch

## Template T015 - Error detection: one-sided variable move
- Template ID: P003-T015
- Question Type: Error detection
- Cognitive Skill: Diagnose balance error
- Difficulty: 4
- Estimated Time: 60 seconds
- Visual Required: false
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Detect invalid variable movement across the equal sign.
- Example Question: A player solves `5x + 2 = 3x + 10` by changing it to `5x + 2 = 10` because they "moved `3x` away." What is the error and the correct solution?
- Answer: They removed `3x` from only one side. Subtract `3x` from both sides: `2x + 2 = 10`, then `2x = 8`, so `x = 4`.
- Explanation: Moving a term means applying the inverse operation to both sides, not erasing a term.
- Distractors: `x = 2`; `x = 10`; no error; no solution
- Distractor Rationale: Solves the unsound equation; copies constant; accepts one-sided move; misclassifies.
- Randomization Rules: Present a common invalid move and ask for error plus correction.
- Validity Constraints: The wrong work should have one clear targeted error.
- Metadata: phase_id=P003; prerequisites=[balanced operations, checking]; misconception_tags=[changes one side only, erases terms, accepts invalid work]; randomization_constraints=[one targeted error, clean correction].
- Graph/Visual Variant: Balance scale tips when `3x` is removed from one side only.
- Modeling Variant: Battle replay correction: a spell erased an enemy term without a matching move.
- Reverse Variant: Create an invalid one-sided variable move and correct it.
- Equation Battle Variant: Use after an illegal battle move.
- Multi-stage Boss Variant: Identify error, repair first move, solve, check.
- Hint Mapping: H-P003-T015
- Tutorial Mapping: Tut-P003 sections Common Mistakes
- Socratic Mapping: Soc-P003 error branch

## Template T016 - Missing balanced variable step
- Template ID: P003-T016
- Question Type: Missing step
- Cognitive Skill: Complete variable collection move
- Difficulty: 2
- Estimated Time: 35 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Complete a balanced variable-term subtraction step.
- Example Question: Complete the step: `5x - 3 = 2x + 12`, so `5x - 3 - 2x = 2x + 12 - ___`.
- Answer: `2x`
- Explanation: Subtract `2x` from both sides to remove the right-side variable term.
- Distractors: `2`; `5x`; `12`; `3x`
- Distractor Rationale: Uses coefficient only; subtracts wrong variable term; copies constant; jumps to combined result.
- Randomization Rules: Use equations with variable terms on both sides and blank out the matching variable operation.
- Validity Constraints: The blank must be a full term, including variable and coefficient.
- Metadata: phase_id=P003; prerequisites=[balanced transformations, variable terms]; misconception_tags=[coefficient-only subtraction, changes one side only, jumps steps]; randomization_constraints=[blank full variable term, one correct completion].
- Graph/Visual Variant: Matching `2x` tiles removed from both sides.
- Modeling Variant: A gate requires the same variable-block removal on both sides.
- Reverse Variant: Given a variable-removal step, write the original equation.
- Equation Battle Variant: Player completes the both-side action syntax.
- Multi-stage Boss Variant: Missing step leads into solve and check.
- Hint Mapping: H-P003-T016
- Tutorial Mapping: Tut-P003 sections Equation Battle Moves
- Socratic Mapping: Soc-P003 missing-step branch

## Template T017 - Graph intersection interpretation
- Template ID: P003-T017
- Question Type: Graph interpretation
- Cognitive Skill: Connect equations to intersections
- Difficulty: 3
- Estimated Time: 55 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Interpret solving variables-on-both-sides equations as finding where two linear expressions are equal.
- Example Question: The lines `y = 2x + 1` and `y = -x + 10` intersect. What is the x-coordinate of their intersection?
- Answer: `x = 3`
- Explanation: Set the expressions equal: `2x + 1 = -x + 10`. Add `x`: `3x + 1 = 10`. Subtract 1: `3x = 9`. Divide by 3: `x = 3`.
- Distractors: `x = 9`; `x = -3`; `x = 10`; `x = 1`
- Distractor Rationale: Stops early; sign error; copies intercept; copies other intercept.
- Randomization Rules: Generate two linear expressions with one clear intersection and integer x-coordinate.
- Validity Constraints: Slopes must differ; graph data must match the equation exactly.
- Metadata: phase_id=P003; prerequisites=[linear graph basics, variable collection]; misconception_tags=[intercept confusion, sign error, stops early]; randomization_constraints=[different slopes, integer intersection].
- Graph/Visual Variant: Required: show two lines intersecting at x-coordinate 3.
- Modeling Variant: Two progress paths meet at the same level.
- Reverse Variant: Create two lines that intersect at `x = 3`.
- Equation Battle Variant: Use as a concept bridge after algebraic solving.
- Multi-stage Boss Variant: Player must solve algebraically and identify the graph intersection.
- Hint Mapping: H-P003-T017
- Tutorial Mapping: Tut-P003 sections Graph Connection
- Socratic Mapping: Soc-P003 graph branch

## Template T018 - Equivalent equation recognition
- Template ID: P003-T018
- Question Type: Multiple choice
- Cognitive Skill: Identify valid transformation
- Difficulty: 3
- Estimated Time: 45 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Choose the equation that is equivalent after a balanced variable move.
- Example Question: Which equation is equivalent to `6x + 4 = 2x - 8` after subtracting `2x` from both sides?
- Answer: `4x + 4 = -8`
- Explanation: Subtracting `2x` from both sides gives `6x - 2x + 4 = -8`, so `4x + 4 = -8`.
- Distractors: `6x + 4 = -8`; `8x + 4 = -8`; `4x = -12`; `4x + 4 = 2x - 8`
- Distractor Rationale: Erases right variable only; adds coefficients; performs an extra constant step; fails to remove right variable.
- Randomization Rules: Show a stated balanced move and ask for the next equivalent equation.
- Validity Constraints: Exactly one choice must match the stated move only.
- Metadata: phase_id=P003; prerequisites=[equivalent equations, combining like terms]; misconception_tags=[erases terms, combines coefficients incorrectly, jumps steps]; randomization_constraints=[one stated move, one correct equivalent equation].
- Graph/Visual Variant: Animate identical operation applied to both sides.
- Modeling Variant: Choose the legal next state of an equation gate.
- Reverse Variant: Given an equivalent step, identify the move that created it.
- Equation Battle Variant: This is a legal-move recognition battle.
- Multi-stage Boss Variant: Correct equivalent equation unlocks the solve stage.
- Hint Mapping: H-P003-T018
- Tutorial Mapping: Tut-P003 sections Equivalent Equations
- Socratic Mapping: Soc-P003 equivalence branch

## Template T019 - Equal-cost modeling
- Template ID: P003-T019
- Question Type: Build the model
- Cognitive Skill: Model equality between two expressions
- Difficulty: 4
- Estimated Time: 70 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Build and solve a variables-on-both-sides equation from an equal-value context.
- Example Question: Guild A charges 8 coins plus 3 coins per quest. Guild B charges 20 coins plus 1 coin per quest. For how many quests are the costs equal?
- Answer: `8 + 3q = 20 + q`; `q = 6`
- Explanation: Subtract `q`: `8 + 2q = 20`. Subtract 8: `2q = 12`. Divide by 2: `q = 6`.
- Distractors: `q = 14`; `q = 4`; `q = -6`; no solution
- Distractor Rationale: Adds fixed costs; subtracts variable rates incorrectly; sign error; assumes different fees never match.
- Randomization Rules: Use two linear cost or score plans with different fixed values and different rates.
- Validity Constraints: Rates must differ; solution should be practical for basic versions.
- Metadata: phase_id=P003; prerequisites=[linear modeling, variable collection]; misconception_tags=[swaps fixed and rate values, sign error, assumes no match]; randomization_constraints=[different rates, practical solution].
- Graph/Visual Variant: Two cost lines intersect at 6 quests.
- Modeling Variant: This is the core modeling template for Phase 003.
- Reverse Variant: Write an equal-cost story matching `8 + 3q = 20 + q`.
- Equation Battle Variant: Model, collect variables, collect constants, solve.
- Multi-stage Boss Variant: Player must build equation, solve, and interpret the unit.
- Hint Mapping: H-P003-T019
- Tutorial Mapping: Tut-P003 sections Modeling Equal Expressions
- Socratic Mapping: Soc-P003 modeling branch

## Template T020 - Boss challenge with distribution on both sides
- Template ID: P003-T020
- Question Type: Boss challenge
- Cognitive Skill: Integrated variables-on-both-sides reasoning
- Difficulty: 5
- Estimated Time: 110 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve a variables-on-both-sides equation involving distribution, constants, and checking.
- Example Question: Boss Gate: Solve `4(x - 2) - 3 = 2(x + 5) + 1` and check your answer.
- Answer: `x = 11`
- Explanation: Distribute: `4x - 8 - 3 = 2x + 10 + 1`, so `4x - 11 = 2x + 11`. Subtract `2x`: `2x - 11 = 11`. Add 11: `2x = 22`. Divide by 2: `x = 11`. Check: left side `4(9) - 3 = 33`; right side `2(16) + 1 = 33`.
- Distractors: `x = -11`; `x = 22`; `x = 5.5`; no solution
- Distractor Rationale: Sign error; stops before division; divides too early; misclassifies after seeing variables on both sides.
- Randomization Rules: Use distribution on both sides with collected coefficient nonzero and integer solution.
- Validity Constraints: Expressions must simplify cleanly; avoid identities or contradictions in this boss template.
- Metadata: phase_id=P003; prerequisites=[distribution, collection, checking]; misconception_tags=[partial distribution, sign error, stops early, misclassification]; randomization_constraints=[nonzero collected coefficient, integer solution].
- Graph/Visual Variant: Boss lock sequence: distribute, combine, collect variables, collect constants, solve, check.
- Modeling Variant: Two complex reward formulas are equal at one level.
- Reverse Variant: Create a distributed variables-on-both-sides boss equation with solution 11.
- Equation Battle Variant: Required sequence: distribute both sides, combine, `-2x`, `+11`, `/2`, check.
- Multi-stage Boss Variant: This is the phase boss template.
- Hint Mapping: H-P003-T020
- Tutorial Mapping: Tut-P003 sections Full Phase Review
- Socratic Mapping: Soc-P003 boss branch

# Part II - Hint Bible

## H-P003-T001
- Hint 1 - Gentle Nudge: There is an `x` term on both sides.
- Hint 2 - Concept Reminder: Collect variable terms on one side using inverse operations.
- Hint 3 - Focus Hint: Subtract `x` from both sides.
- Hint 4 - Guided Next Step: `2x + 5 = 13`.
- Hint 5 - Nearly Complete: Subtract 5 to get `2x = 8`, then divide by 2.
- Hint 6 - Full Solution: `x = 4`; check: `3(4) + 5 = 4 + 13`.

## H-P003-T002
- Hint 1 - Gentle Nudge: Remove the smaller variable term from both sides.
- Hint 2 - Concept Reminder: Subtracting `2x` from both sides keeps the equation balanced.
- Hint 3 - Focus Hint: `7x - 2x = 5x`.
- Hint 4 - Guided Next Step: `5x - 4 = 16`.
- Hint 5 - Nearly Complete: Add 4 to get `5x = 20`, then divide by 5.
- Hint 6 - Full Solution: `x = 4`; check: `7(4) - 4 = 2(4) + 16`.

## H-P003-T003
- Hint 1 - Gentle Nudge: The right side has the larger x-coefficient.
- Hint 2 - Concept Reminder: Moving the smaller coefficient can avoid negatives.
- Hint 3 - Focus Hint: Subtract `4x` from both sides.
- Hint 4 - Guided Next Step: `9 = 2x - 3`.
- Hint 5 - Nearly Complete: Add 3 to get `12 = 2x`, then divide by 2.
- Hint 6 - Full Solution: `x = 6`; check: `4(6) + 9 = 6(6) - 3`.

## H-P003-T004
- Hint 1 - Gentle Nudge: The coefficient `-2` includes its negative sign.
- Hint 2 - Concept Reminder: Add `2x` to both sides to remove `-2x`.
- Hint 3 - Focus Hint: `-2x + 2x` becomes 0.
- Hint 4 - Guided Next Step: `7 = 3x - 8`.
- Hint 5 - Nearly Complete: Add 8 to get `15 = 3x`, then divide by 3.
- Hint 6 - Full Solution: `x = 5`; check: `-2(5) + 7 = 5 - 8`.

## H-P003-T005
- Hint 1 - Gentle Nudge: Rewrite mentally as `-3x + 5 = 2x + 20`.
- Hint 2 - Concept Reminder: The sign before `3x` stays with the term.
- Hint 3 - Focus Hint: Subtract `2x` from both sides.
- Hint 4 - Guided Next Step: `5 - 5x = 20`.
- Hint 5 - Nearly Complete: Subtract 5 to get `-5x = 15`, then divide by `-5`.
- Hint 6 - Full Solution: `x = -3`; check: `5 - 3(-3) = 2(-3) + 20`.

## H-P003-T006
- Hint 1 - Gentle Nudge: Start by removing the parentheses correctly.
- Hint 2 - Concept Reminder: `2(x + 3)` becomes `2x + 6`.
- Hint 3 - Focus Hint: The equation becomes `2x + 6 = x + 11`.
- Hint 4 - Guided Next Step: Subtract `x` from both sides.
- Hint 5 - Nearly Complete: `x + 6 = 11`, so subtract 6.
- Hint 6 - Full Solution: `x = 5`; check: `2(5 + 3) = 5 + 11`.

## H-P003-T007
- Hint 1 - Gentle Nudge: Multiply both terms inside the parentheses by 3.
- Hint 2 - Concept Reminder: `3(x - 4)` is `3x - 12`.
- Hint 3 - Focus Hint: Rewrite as `3x - 12 = 2x + 1`.
- Hint 4 - Guided Next Step: Subtract `2x` from both sides.
- Hint 5 - Nearly Complete: `x - 12 = 1`, so add 12.
- Hint 6 - Full Solution: `x = 13`; check: `3(13 - 4) = 2(13) + 1`.

## H-P003-T008
- Hint 1 - Gentle Nudge: There are two simplifications before solving.
- Hint 2 - Concept Reminder: Distribute first, then combine like terms.
- Hint 3 - Focus Hint: `4x + 2(x - 3)` becomes `6x - 6`.
- Hint 4 - Guided Next Step: Rewrite as `6x - 6 = 3x + 9`.
- Hint 5 - Nearly Complete: Subtract `3x`, add 6, then divide by 3.
- Hint 6 - Full Solution: `x = 5`; check: `4(5) + 2(5 - 3) = 3(5) + 9`.

## H-P003-T009
- Hint 1 - Gentle Nudge: Decide how to collect the two `x` terms.
- Hint 2 - Concept Reminder: A full `x` minus half an `x` leaves half an `x`.
- Hint 3 - Focus Hint: Subtract `x/2` from both sides.
- Hint 4 - Guided Next Step: `5 = x/2 - 1`.
- Hint 5 - Nearly Complete: Add 1 to get `6 = x/2`, then multiply by 2.
- Hint 6 - Full Solution: `x = 12`; check: `12/2 + 5 = 12 - 1`.

## H-P003-T010
- Hint 1 - Gentle Nudge: The variable coefficients have the same denominator.
- Hint 2 - Concept Reminder: `(2/3)x - (1/3)x = (1/3)x`.
- Hint 3 - Focus Hint: Subtract `(1/3)x` from both sides.
- Hint 4 - Guided Next Step: `(1/3)x + 4 = 10`.
- Hint 5 - Nearly Complete: Subtract 4, then multiply by 3.
- Hint 6 - Full Solution: `x = 18`; check: `(2/3)(18) + 4 = (1/3)(18) + 10`.

## H-P003-T011
- Hint 1 - Gentle Nudge: Compare the decimal coefficients.
- Hint 2 - Concept Reminder: `1.5x - 0.5x = x`.
- Hint 3 - Focus Hint: Subtract `0.5x` from both sides.
- Hint 4 - Guided Next Step: `3 = x - 7`.
- Hint 5 - Nearly Complete: Add 7 to both sides.
- Hint 6 - Full Solution: `x = 10`; check: `0.5(10) + 3 = 1.5(10) - 7`.

## H-P003-T012
- Hint 1 - Gentle Nudge: Simplify the right side first.
- Hint 2 - Concept Reminder: `x + x = 2x`.
- Hint 3 - Focus Hint: Both sides become `2x + 5`.
- Hint 4 - Guided Next Step: Subtract `2x` from both sides.
- Hint 5 - Nearly Complete: The equation becomes `5 = 5`, or `0 = 0`.
- Hint 6 - Full Solution: Infinitely many solutions; every value of `x` works.

## H-P003-T013
- Hint 1 - Gentle Nudge: The variable terms are identical.
- Hint 2 - Concept Reminder: If equal variable terms cancel, inspect the remaining numbers.
- Hint 3 - Focus Hint: Subtract `3x` from both sides.
- Hint 4 - Guided Next Step: The equation becomes `4 = -8`.
- Hint 5 - Nearly Complete: `4 = -8` is false.
- Hint 6 - Full Solution: No solution; no value of `x` can make the equation true.

## H-P003-T014
- Hint 1 - Gentle Nudge: Pick a first move that avoids negative coefficients.
- Hint 2 - Concept Reminder: Subtracting the smaller variable term from both sides often helps.
- Hint 3 - Focus Hint: Subtract `2x`, not `5x`.
- Hint 4 - Guided Next Step: `9 = 3x - 6`.
- Hint 5 - Nearly Complete: Add 6 to get `15 = 3x`, then divide by 3.
- Hint 6 - Full Solution: A good first move is subtract `2x`; `x = 5`.

## H-P003-T015
- Hint 1 - Gentle Nudge: Ask whether the `3x` was removed from both sides.
- Hint 2 - Concept Reminder: Terms cannot be erased from only one side.
- Hint 3 - Focus Hint: Subtract `3x` from both sides of the original equation.
- Hint 4 - Guided Next Step: `2x + 2 = 10`.
- Hint 5 - Nearly Complete: Subtract 2, then divide by 2.
- Hint 6 - Full Solution: The error is one-sided removal; correct solution is `x = 4`.

## H-P003-T016
- Hint 1 - Gentle Nudge: The operation on the right must match the operation on the left.
- Hint 2 - Concept Reminder: The whole variable term is `2x`.
- Hint 3 - Focus Hint: Subtract `2x` from both sides.
- Hint 4 - Guided Next Step: The blank is the term being subtracted from the right side.
- Hint 5 - Nearly Complete: `2x + 12 - 2x`.
- Hint 6 - Full Solution: The blank is `2x`; the next equation is `3x - 3 = 12`.

## H-P003-T017
- Hint 1 - Gentle Nudge: The intersection happens where the y-values are equal.
- Hint 2 - Concept Reminder: Set the two expressions equal to find the x-coordinate.
- Hint 3 - Focus Hint: Solve `2x + 1 = -x + 10`.
- Hint 4 - Guided Next Step: Add `x` to both sides.
- Hint 5 - Nearly Complete: `3x + 1 = 10`, then subtract 1 and divide by 3.
- Hint 6 - Full Solution: `x = 3`; the lines intersect when the input is 3.

## H-P003-T018
- Hint 1 - Gentle Nudge: Apply exactly the move stated in the question.
- Hint 2 - Concept Reminder: Subtract `2x` from both sides.
- Hint 3 - Focus Hint: The right side `2x - 8 - 2x` becomes `-8`.
- Hint 4 - Guided Next Step: The left side becomes `4x + 4`.
- Hint 5 - Nearly Complete: The equivalent equation is `4x + 4 = -8`.
- Hint 6 - Full Solution: Correct choice: `4x + 4 = -8`.

## H-P003-T019
- Hint 1 - Gentle Nudge: Write one expression for each guild.
- Hint 2 - Concept Reminder: Fixed cost plus rate times quests gives total cost.
- Hint 3 - Focus Hint: Guild A is `8 + 3q`; Guild B is `20 + q`.
- Hint 4 - Guided Next Step: Set them equal: `8 + 3q = 20 + q`.
- Hint 5 - Nearly Complete: Subtract `q`, subtract 8, then divide by 2.
- Hint 6 - Full Solution: `q = 6`; the costs are equal at 6 quests.

## H-P003-T020
- Hint 1 - Gentle Nudge: Start by distributing on both sides.
- Hint 2 - Concept Reminder: `4(x - 2) - 3` becomes `4x - 11`; `2(x + 5) + 1` becomes `2x + 11`.
- Hint 3 - Focus Hint: Solve `4x - 11 = 2x + 11`.
- Hint 4 - Guided Next Step: Subtract `2x` from both sides.
- Hint 5 - Nearly Complete: `2x - 11 = 11`, then add 11 and divide by 2.
- Hint 6 - Full Solution: `x = 11`; check gives 33 on both sides.

# Part III - Tutorial Bible

## Learning Goal
Learn to solve equations with variables on both sides by collecting variable terms, collecting constants, simplifying when needed, and recognizing one-solution, no-solution, and infinitely-many-solution cases.

## Why It Matters
Variables-on-both-sides equations are the first place where an equation can behave in three different ways: one answer, no answer, or every answer. This skill also supports comparing two plans, finding graph intersections, and solving later equations with formulas and systems.

## Prerequisite Check
Ask the player:

1. Solve `2x + 5 = 17`. Expected: `x = 6`.
2. Combine `3x - x`. Expected: `2x`.
3. Simplify `2(x + 4)`. Expected: `2x + 8`.
4. Is `5 = 5` always true, sometimes true, or never true? Expected: always true.
5. Is `5 = -2` ever true? Expected: never true.

If the player misses the first item, route to Phase 002. If the player misses the truth-statement items, provide a special-case mini-lesson before classification questions.

## Core Concept
When a variable appears on both sides, use balanced operations to collect the variable terms on one side.

Example: `3x + 5 = x + 13`

1. Subtract `x` from both sides: `2x + 5 = 13`.
2. Subtract 5 from both sides: `2x = 8`.
3. Divide by 2: `x = 4`.
4. Check: `3(4) + 5 = 17` and `4 + 13 = 17`.

The goal is not to "move terms magically." The goal is to apply inverse operations to both sides.

## Choosing a Side
Both variable-collection directions can be valid, but one direction may be cleaner.

For `4x + 9 = 6x - 3`, subtracting `4x` from both sides gives a positive coefficient:

`9 = 2x - 3`
`12 = 2x`
`x = 6`

Subtracting `6x` also works, but it creates `-2x + 9 = -3`, which is more sign-heavy.

## Distribution and Simplifying
If there are parentheses or same-side like terms, simplify before collecting:

`4x + 2(x - 3) = 3x + 9`
`4x + 2x - 6 = 3x + 9`
`6x - 6 = 3x + 9`
`3x - 6 = 9`
`3x = 15`
`x = 5`

## Special Cases
If variable terms cancel, inspect the number statement.

Identity:
`2x + 5 = x + x + 5`
`2x + 5 = 2x + 5`
`0 = 0`
This is always true, so there are infinitely many solutions.

Contradiction:
`3x + 4 = 3x - 8`
`4 = -8`
This is false, so there is no solution.

## Graph Connection
Solving `2x + 1 = -x + 10` finds where the lines `y = 2x + 1` and `y = -x + 10` have the same y-value. The solution `x = 3` is the x-coordinate of their intersection.

## Common Mistakes
- Mistake: Erasing a variable term from one side only.
  Correction: Subtract that term from both sides.
- Mistake: Forgetting the sign of a term.
  Correction: Keep the sign attached to the term while moving or combining.
- Mistake: Distributing to only the variable.
  Correction: Multiply every term inside parentheses.
- Mistake: Treating `0 = 0` as no solution.
  Correction: `0 = 0` is always true, so every value works.
- Mistake: Treating a false number statement as a solution.
  Correction: A false statement like `4 = -8` means no solution.

## Guided Practice
1. Solve `5x + 1 = 2x + 13`.
   - Subtract `2x`: `3x + 1 = 13`.
   - Subtract 1: `3x = 12`.
   - Divide by 3: `x = 4`.

2. Solve `2(x + 1) = x + 8`.
   - Distribute: `2x + 2 = x + 8`.
   - Subtract `x`: `x + 2 = 8`.
   - Subtract 2: `x = 6`.

3. Classify `4x - 3 = 4x + 9`.
   - Subtract `4x`: `-3 = 9`.
   - False, so no solution.

## Independent Practice
1. Solve `6x - 5 = 2x + 7`. Answer: `x = 3`.
2. Solve `x + 14 = 4x - 1`. Answer: `x = 5`.
3. Solve `3(x - 2) = x + 8`. Answer: `x = 7`.
4. Classify `2x + 6 = 2(x + 3)`. Answer: infinitely many solutions.
5. Classify `5x + 1 = 5x - 4`. Answer: no solution.

## Mastery Check
The player is ready to advance when they can:

1. Solve at least 4 of 5 variables-on-both-sides equations.
2. Explain why variable terms must be moved with balanced operations.
3. Correctly solve one equation involving distribution.
4. Correctly classify one identity and one contradiction.
5. Check a one-solution answer in the original equation.

Mastery check set:

1. `4x + 3 = x + 18`; solution `x = 5`.
2. `2(x - 5) = x + 1`; solution `x = 11`.
3. `0.25x + 6 = 1.25x - 2`; solution `x = 8`.
4. `3x + 7 = 3x + 7`; infinitely many solutions.
5. `2x - 4 = 2x + 9`; no solution.

## Adaptive Tutor Messages
- If the player erases a variable term: "A term can disappear only because you applied its inverse to both sides."
- If the player makes sign errors: "Carry the sign with the term. Think of `-3x` as one signed object."
- If the player struggles with side choice: "Try moving the smaller variable coefficient so the collected coefficient is positive."
- If the player misclassifies `0 = 0`: "A true statement with no variable left means every value works."
- If the player misclassifies a contradiction: "A false number statement means no value can repair the equation."
- If the player succeeds quickly: "You are ready to rearrange formulas, where choosing a target variable becomes the main challenge."

## Tutorial Metadata
- Tutorial ID: Tut-P003
- Estimated duration: 5 minutes
- Target player state: understands multi-step equations and is ready to compare two expressions
- Unlock condition: available from any Phase 003 question
- Remediation trigger: two one-sided variable moves, two sign errors, one identity/contradiction reversal, or two distribution errors
- Advancement trigger: 80 percent accuracy on mixed variables-on-both-sides problems plus correct classification of identity and contradiction

# Part IV - Socratic Dialogue Bible

## Opening Diagnostic
Tutor: "In `3x + 5 = x + 13`, why might subtracting `x` from both sides be useful?"

Expected strong answer: "It removes the variable term from the right side and collects variables on the left."

## Guided Discovery
Tutor sequence:

1. "Do variables appear on one side or both sides?"
2. "Which variable term is smaller or easier to remove?"
3. "What balanced operation would remove that term?"
4. "After collecting variables, what constants remain?"
5. "What inverse operation moves the constant away from the variable term?"
6. "What coefficient remains on the variable?"
7. "What final inverse operation isolates the variable?"
8. "Does the answer check in the original equation?"
9. "If variables cancel, what number statement remains?"

## Correct Branch
Player: "Subtract `x` from both sides."

Tutor: "Good. What equation remains after subtracting `x` from both sides?"

If player answers `2x + 5 = 13`, ask: "Now what operation removes the 5?"

Exit when the player solves `x = 4` and checks both sides equal 17.

## Partial Understanding Branch
Player: "Move the x."

Tutor: "That idea can work, but let's say the legal move exactly. What operation do we apply to both sides to remove the right-side `x`?"

If player says "subtract `x`," continue.

## Misconception Branch
Player: "Cross out the x on the right."

Tutor: "If we erase `x` only on the right, the two sides are no longer changed equally. What could we do to both sides that would make the right-side `x` become 0?"

If player suggests subtracting `x`, ask them to perform it on both sides.

## Unsure Branch
Player: "I don't know."

Tutor: "Let's start with what we can see. How many `x` terms are in the equation?"

If player identifies two: "Good. Which one is simpler to remove: `3x` or `x`?"

If still unsure, show Hint 2.

## Unrelated Response Branch
Player gives an unrelated answer.

Tutor: "Let's refocus on the equation. Point to the variable term on the right side of `3x + 5 = x + 13`."

If the response remains unrelated, switch to a multiple-choice prompt: "Should we subtract `x`, add 13, multiply by 3, or divide by 5 first?"

## Recovery Prompts
- "What variable terms do you see?"
- "Which variable term would be easiest to remove?"
- "What operation removes that term from both sides?"
- "What constants are left after the variables are collected?"
- "Did the variables cancel completely?"
- "Is the remaining number statement true or false?"
- "Can you check the solution in the original equation?"

## Reflection Question
"Why is 'moving a term across the equal sign' a risky phrase?"

Strong reflection: "Because it can hide the real rule. We are not magically moving terms; we are applying inverse operations to both sides."

## Transfer Question
"How does solving `3x + 5 = x + 13` connect to finding the intersection of `y = 3x + 5` and `y = x + 13`?"

Expected transfer: "The solution is the x-value where both expressions have the same y-value."

## Escalation Rules
- If the player erases terms, route to equivalent-equation and balance prompts.
- If the player makes repeated sign errors, show signed-term review.
- If the player fails to simplify before collecting twice, open Distribution and Simplifying.
- If the player confuses identity and contradiction, open Special Cases.
- If the player solves three one-solution equations but misses classification, give identity/no-solution practice.
- If the player solves and classifies accurately, advance to independent practice.

## Exit Condition
The Socratic sequence is complete when the player:

1. Identifies variables on both sides.
2. Chooses and applies a balanced variable-collection move.
3. Moves constants correctly.
4. Solves or classifies the resulting equation.
5. Checks or justifies the solution set using the original equation or final truth statement.

# Knowledge Graph

- Prerequisites: Phase 001 one-step equations; Phase 002 multi-step equations; combining like terms; signed arithmetic; distributive property; equivalent equations; truth of number statements
- Concepts Unlocked: variable collection; side-choice strategy; equations with one solution; identities; contradictions; graph intersection interpretation; equal-expression modeling; Equation Battle variable-term moves
- Related Concepts: linear functions; graph intersections; systems of equations; formula rearrangement; equality reasoning; parallel and coincident lines
- Common Misconceptions: erasing terms; changing one side only; dropping signed terms; combining unlike terms; partial distribution; assuming one solution; confusing `0 = 0` with no solution; confusing false statements with numeric answers
- Remedial Phases: Phase 001 review; Phase 002 review; signed term mini-lesson; distribution mini-lesson; identity/contradiction mini-lesson
- Follow-up Phases: Phase 004 - Literal equations; Phase 005 - Linear equation modeling; Phase 006 - Equation Battle fundamentals; Phase 011 - Systems by substitution; Phase 013 - Systems by graphing
- Transfer Topics: comparing linear plans; solving systems; interpreting line intersections; rearranging formulas; proving equivalent expressions

# Validation Notes

## Structure Validation
- Includes all required Bibles and metadata sections.
- Contains exactly 20 template families, within the required 20-40 range.
- Each template includes example, answer, explanation, distractors, distractor rationale, randomization rules, validity constraints, metadata, variants, and mappings.
- Every template has six progressive hints.

## Math Validation
- T001: `3x + 5 = x + 13` -> `2x = 8` -> `x = 4`.
- T002: `7x - 4 = 2x + 16` -> `5x = 20` -> `x = 4`.
- T003: `4x + 9 = 6x - 3` -> `12 = 2x` -> `x = 6`.
- T004: `-2x + 7 = x - 8` -> `15 = 3x` -> `x = 5`.
- T005: `5 - 3x = 2x + 20` -> `-5x = 15` -> `x = -3`.
- T006: `2(x + 3) = x + 11` -> `2x + 6 = x + 11` -> `x = 5`.
- T007: `3(x - 4) = 2x + 1` -> `3x - 12 = 2x + 1` -> `x = 13`.
- T008: `4x + 2(x - 3) = 3x + 9` -> `6x - 6 = 3x + 9` -> `x = 5`.
- T009: `x/2 + 5 = x - 1` -> `6 = x/2` -> `x = 12`.
- T010: `(2/3)x + 4 = (1/3)x + 10` -> `(1/3)x = 6` -> `x = 18`.
- T011: `0.5x + 3 = 1.5x - 7` -> `3 = x - 7` -> `x = 10`.
- T012: `2x + 5 = x + x + 5` simplifies to `2x + 5 = 2x + 5`; infinitely many solutions.
- T013: `3x + 4 = 3x - 8` -> `4 = -8`; no solution.
- T014: `2x + 9 = 5x - 6` -> `15 = 3x` -> `x = 5`.
- T015: `5x + 2 = 3x + 10` -> `2x = 8` -> `x = 4`; one-sided erasure is invalid.
- T016: Missing balanced term is `2x`; continued solution is `x = 5`.
- T017: `2x + 1 = -x + 10` -> `3x = 9` -> `x = 3`.
- T018: `6x + 4 = 2x - 8` after subtracting `2x` becomes `4x + 4 = -8`.
- T019: `8 + 3q = 20 + q` -> `2q = 12` -> `q = 6`.
- T020: `4(x - 2) - 3 = 2(x + 5) + 1` -> `4x - 11 = 2x + 11` -> `x = 11`.

## Distractor Validation
- Distractors reflect common errors: erasing terms, sign loss, stopping early, partial distribution, identity/contradiction confusion, and intercept confusion.
- Multiple-choice-style templates have exactly one correct answer.
- Distractors were checked against original equations and classifications.

## Hint Validation
- Each hint sequence progresses from noticing variables on both sides to operation choice, guided move, near-complete work, and full solution.
- Identity and contradiction hints guide classification without giving it away too early.

## Tutorial Validation
- Tutorial includes learning goal, prerequisite check, why it matters, core concept, choosing a side, distribution, special cases, graph connection, common mistakes, guided practice, independent practice, mastery check, adaptive messages, and metadata.

## Socratic Validation
- Dialogue includes diagnostic, guided discovery, correct branch, partial branch, misconception branch, unsure branch, unrelated branch, recovery prompts, reflection, transfer, escalation rules, and exit condition.
- Tutor emphasizes balanced operations before giving answers.

## Metadata Validation
- Every template includes IDs, difficulty, timing, visual flag, compatibility flags, prerequisites, misconception tags, randomization constraints, and support-system mappings.

## Known Issues
- The repository specifications differ on the label for Hint 4. This phase uses "Guided Next Step" to match the master prompt language.
- `PHASE_TEMPLATE.md` omits Common Misconceptions from the Knowledge Graph section, but this phase includes it because the master prompt and knowledge graph guide require it.
