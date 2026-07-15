# Phase 009 - Absolute Value Equations

## Phase Metadata
- Course: Precalculus Odyssey Bible v5
- Topic: Absolute value equations
- Subtopic: Solving equations involving distance from zero or from a center
- Prerequisites: Phase 001 one-step equations, Phase 002 multi-step equations, Phase 003 variables on both sides, signed numbers, number line distance
- Related phases: Phase 010 - Absolute value inequalities; Phase 015 - Domain from formulas; Phase 016 - Domain from graphs; Phase 021 - Piecewise functions
- Estimated phase size: 20 template families, 20 core examples, 120 progressive hints, 1 tutorial sequence, 1 Socratic dialogue system

## Learning Objectives
By the end of this phase, the player can:

1. Interpret absolute value as distance.
2. Solve basic equations of the form `|x| = a`.
3. Solve shifted equations of the form `|x - h| = a`.
4. Solve linear absolute value equations by isolating the absolute value first.
5. Create and solve two branches when the isolated absolute value equals a positive number.
6. Recognize zero-solution and no-solution cases.
7. Check all candidate solutions in the original equation.
8. Identify and correct missing-branch and negative-distance errors.

## Prerequisite Review
- Absolute value is distance from zero: `|5| = 5` and `|-5| = 5`.
- Distance is never negative.
- `|x - h|` means the distance from `x` to `h`.
- If `|A| = k` and `k > 0`, then `A = k` or `A = -k`.
- If `|A| = 0`, then `A = 0`.
- If `|A|` equals a negative number, there is no solution.

## Core Concepts
- Absolute value equations usually split into two linear equations because two points can be the same distance from a center.
- Always isolate the absolute value expression before splitting into branches.
- The right side after isolation decides the case:
  - positive: two branches,
  - zero: one branch,
  - negative: no solution.
- Every candidate must be checked in the original equation.

## Common Misconceptions
- Giving only the positive branch.
- Treating absolute value as parentheses.
- Splitting before isolating the absolute value.
- Allowing absolute value to equal a negative number.
- Thinking `|x - h| = a` has answers `h` and `a` instead of `h +/- a`.
- Losing signs inside branches.
- Forgetting to check both candidate solutions.
- Treating a zero right side as two different solutions.

# Part I - Question Bible

## Template T001 - Basic absolute value equals positive
- Template ID: P009-T001
- Question Type: Direct computation
- Cognitive Skill: Use distance from zero
- Difficulty: 1
- Estimated Time: 25 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve `|x| = a` for positive `a`.
- Example Question: Solve `|x| = 6`.
- Answer: `x = 6` or `x = -6`.
- Explanation: Both 6 and -6 are 6 units from zero.
- Distractors: `x = 6` only; `x = -6` only; no solution; `x = 0`.
- Distractor Rationale: Missing branch; chooses only negative branch; thinks absolute value cannot produce 6; confuses distance with center.
- Randomization Rules: Choose positive integer `a`.
- Validity Constraints: Right side must be positive for two-solution case.
- Metadata: phase_id=P009; prerequisites=[absolute value meaning, signed numbers]; misconception_tags=[missing branch, negative-distance confusion, center confusion]; randomization_constraints=[a positive].
- Graph/Visual Variant: Number line points at -6 and 6.
- Modeling Variant: Positions 6 units from base camp at 0.
- Reverse Variant: Given solutions -6 and 6, write `|x|=6`.
- Equation Battle Variant: Branch cards `x=6` and `x=-6`.
- Multi-stage Boss Variant: Identify distance, list both positions, check.
- Hint Mapping: H-P009-T001
- Tutorial Mapping: Tut-P009 sections Core Concept
- Socratic Mapping: Soc-P009 basic branch

## Template T002 - Absolute value equals zero
- Template ID: P009-T002
- Question Type: Number of solutions
- Cognitive Skill: Recognize one-solution zero case
- Difficulty: 1
- Estimated Time: 25 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve `|x| = 0`.
- Example Question: Solve `|x| = 0`.
- Answer: `x = 0`.
- Explanation: The only number 0 units from zero is 0 itself.
- Distractors: `x = 0 or x = -0`; no solution; all real numbers; `x = 1`.
- Distractor Rationale: Counts the same value twice; negative-distance confusion; identity confusion; arbitrary distance.
- Randomization Rules: Use isolated absolute value equal to zero.
- Validity Constraints: Treat `0` and `-0` as the same solution.
- Metadata: phase_id=P009; prerequisites=[absolute value distance]; misconception_tags=[double-counts zero, no-solution confusion, all-real confusion]; randomization_constraints=[right side zero].
- Graph/Visual Variant: Single point at 0.
- Modeling Variant: Distance from base is exactly 0.
- Reverse Variant: Given solution 0, write an absolute value equation with one solution.
- Equation Battle Variant: Zero-distance branch card.
- Multi-stage Boss Variant: Ask why there is not a second distinct solution.
- Hint Mapping: H-P009-T002
- Tutorial Mapping: Tut-P009 sections Zero and Negative Cases
- Socratic Mapping: Soc-P009 zero branch

## Template T003 - Absolute value equals negative
- Template ID: P009-T003
- Question Type: Number of solutions
- Cognitive Skill: Reject negative distance
- Difficulty: 1
- Estimated Time: 25 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Recognize no solution when absolute value equals a negative number.
- Example Question: Solve `|x| = -4`.
- Answer: No solution.
- Explanation: Absolute value is a distance, and distance cannot be negative.
- Distractors: `x = -4`; `x = 4`; `x = -4 or 4`; all real numbers.
- Distractor Rationale: Treats bars as parentheses; uses positive branch only; creates two branches despite negative distance; identity confusion.
- Randomization Rules: Use isolated absolute value equal to a negative number.
- Validity Constraints: Right side must be negative.
- Metadata: phase_id=P009; prerequisites=[absolute value distance]; misconception_tags=[negative-distance allowed, treats bars as parentheses, false two-branch split]; randomization_constraints=[negative right side].
- Graph/Visual Variant: Number line with no points highlighted.
- Modeling Variant: Impossible request to stand -4 units from base.
- Reverse Variant: Create a no-solution absolute value equation.
- Equation Battle Variant: Classification card: no solution.
- Multi-stage Boss Variant: Stop before branching.
- Hint Mapping: H-P009-T003
- Tutorial Mapping: Tut-P009 sections Zero and Negative Cases
- Socratic Mapping: Soc-P009 negative branch

## Template T004 - Shifted center with subtraction
- Template ID: P009-T004
- Question Type: Direct computation
- Cognitive Skill: Interpret distance from center
- Difficulty: 2
- Estimated Time: 40 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve `|x - h| = a`.
- Example Question: Solve `|x - 3| = 7`.
- Answer: `x = 10` or `x = -4`.
- Explanation: `|x - 3|` is distance from 3. Points 7 units from 3 are `3 + 7 = 10` and `3 - 7 = -4`.
- Distractors: `x = 7 or x = -7`; `x = 3 or x = 7`; `x = 10` only; no solution.
- Distractor Rationale: Uses distance from zero; uses center and distance as answers; missing branch; ignores positive right side.
- Randomization Rules: Choose center `h` and positive distance `a`.
- Validity Constraints: Distance positive for two distinct solutions.
- Metadata: phase_id=P009; prerequisites=[number line distance, branch solving]; misconception_tags=[center/distance confusion, missing branch, distance-from-zero confusion]; randomization_constraints=[a positive].
- Graph/Visual Variant: Number line centered at 3 with points -4 and 10.
- Modeling Variant: Positions 7 units from checkpoint 3.
- Reverse Variant: Given center 3 and solutions -4,10, write `|x-3|=7`.
- Equation Battle Variant: Branch cards `x-3=7` and `x-3=-7`.
- Multi-stage Boss Variant: Center, distance, two positions, check.
- Hint Mapping: H-P009-T004
- Tutorial Mapping: Tut-P009 sections Shifted Centers
- Socratic Mapping: Soc-P009 shifted branch

## Template T005 - Shifted center with addition
- Template ID: P009-T005
- Question Type: Direct computation
- Cognitive Skill: Identify negative center
- Difficulty: 2
- Estimated Time: 40 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve `|x + h| = a` as distance from `-h`.
- Example Question: Solve `|x + 5| = 2`.
- Answer: `x = -3` or `x = -7`.
- Explanation: `|x + 5|` is `|x - (-5)|`, distance from -5. Move 2 units right and left from -5.
- Distractors: `x = 3 or 7`; `x = -5 or 2`; `x = -3` only; `x = 5 or -5`.
- Distractor Rationale: Sign of center error; center/distance confusion; missing branch; treats plus sign as center 5.
- Randomization Rules: Use `|x + h| = a` with positive `h` and positive `a`.
- Validity Constraints: Distance positive.
- Metadata: phase_id=P009; prerequisites=[signed centers, absolute value distance]; misconception_tags=[sign of center error, missing branch, center/distance confusion]; randomization_constraints=[h positive, a positive].
- Graph/Visual Variant: Number line centered at -5.
- Modeling Variant: Positions 2 units from portal at -5.
- Reverse Variant: Given solutions -7 and -3, write `|x+5|=2`.
- Equation Battle Variant: Branch cards `x+5=2`, `x+5=-2`.
- Multi-stage Boss Variant: Ask for the center before branches.
- Hint Mapping: H-P009-T005
- Tutorial Mapping: Tut-P009 sections Shifted Centers
- Socratic Mapping: Soc-P009 shifted branch

## Template T006 - Coefficient inside absolute value
- Template ID: P009-T006
- Question Type: Direct computation
- Cognitive Skill: Branch then solve
- Difficulty: 2
- Estimated Time: 45 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve `|kx| = a`.
- Example Question: Solve `|2x| = 10`.
- Answer: `x = 5` or `x = -5`.
- Explanation: Set `2x = 10` or `2x = -10`, then divide by 2.
- Distractors: `x = 10 or -10`; `x = 5` only; `x = -5` only; no solution.
- Distractor Rationale: Forgets coefficient; missing branch; chooses only negative branch; no-solution confusion.
- Randomization Rules: Use nonzero integer coefficient and positive right side divisible by coefficient.
- Validity Constraints: Coefficient nonzero; positive right side.
- Metadata: phase_id=P009; prerequisites=[branch solving, one-step equations]; misconception_tags=[forgets coefficient, missing branch, no-solution confusion]; randomization_constraints=[k nonzero].
- Graph/Visual Variant: Branch tree for `2x = +/-10`.
- Modeling Variant: Doubled hidden position is 10 units from zero.
- Reverse Variant: Given solutions -5,5, write `|2x|=10`.
- Equation Battle Variant: Branch cards then `/2`.
- Multi-stage Boss Variant: Branch, solve both, check.
- Hint Mapping: H-P009-T006
- Tutorial Mapping: Tut-P009 sections Branch Method
- Socratic Mapping: Soc-P009 branch branch

## Template T007 - Linear expression inside absolute value
- Template ID: P009-T007
- Question Type: Direct computation
- Cognitive Skill: Solve two linear branches
- Difficulty: 3
- Estimated Time: 60 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve `|ax + b| = c`.
- Example Question: Solve `|2x - 3| = 7`.
- Answer: `x = 5` or `x = -2`.
- Explanation: Branches: `2x - 3 = 7` gives `x = 5`; `2x - 3 = -7` gives `x = -2`.
- Distractors: `x = 2 or -5`; `x = 5` only; `x = -2` only; `x = 7 or -7`.
- Distractor Rationale: Sign/arithmetic errors; missing branch; uses right side as solution.
- Randomization Rules: Choose `a`, `b`, and solutions producing positive right side.
- Validity Constraints: `a` nonzero; right side positive.
- Metadata: phase_id=P009; prerequisites=[multi-step equations, branch solving]; misconception_tags=[missing branch, sign error, uses right side as answer]; randomization_constraints=[a nonzero, c positive].
- Graph/Visual Variant: Two branch lanes.
- Modeling Variant: Transformed stat has distance 7 from zero.
- Reverse Variant: Build `|2x-3|=7` from branch equations.
- Equation Battle Variant: Branch, `+3`, `/2` in each lane.
- Multi-stage Boss Variant: Solve both lanes and check both.
- Hint Mapping: H-P009-T007
- Tutorial Mapping: Tut-P009 sections Branch Method
- Socratic Mapping: Soc-P009 branch branch

## Template T008 - Fractional expression inside absolute value
- Template ID: P009-T008
- Question Type: Direct computation
- Cognitive Skill: Branch with fractional coefficient
- Difficulty: 3
- Estimated Time: 65 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve absolute value equations with division inside.
- Example Question: Solve `|x/3 + 2| = 5`.
- Answer: `x = 9` or `x = -21`.
- Explanation: Branches: `x/3 + 2 = 5` gives `x = 9`; `x/3 + 2 = -5` gives `x = -21`.
- Distractors: `x = 3 or -7`; `x = 9` only; `x = -9 or 21`; no solution.
- Distractor Rationale: Stops before multiplying by 3; missing branch; sign reversal errors; no-solution confusion.
- Randomization Rules: Use `|x/d + b| = c` with nonzero `d` and positive `c`.
- Validity Constraints: Divisor nonzero.
- Metadata: phase_id=P009; prerequisites=[division equations, branch solving]; misconception_tags=[stops early, missing branch, sign error]; randomization_constraints=[d nonzero, c positive].
- Graph/Visual Variant: Two branch lanes with multiplication by 3.
- Modeling Variant: Scaled-and-shifted location is 5 units from zero.
- Reverse Variant: Create a fractional absolute value equation with solutions 9 and -21.
- Equation Battle Variant: Branch, `-2`, `*3`.
- Multi-stage Boss Variant: Include checking both solutions.
- Hint Mapping: H-P009-T008
- Tutorial Mapping: Tut-P009 sections Branch Method
- Socratic Mapping: Soc-P009 fraction branch

## Template T009 - Coefficient outside absolute value
- Template ID: P009-T009
- Question Type: Direct computation
- Cognitive Skill: Isolate absolute value first
- Difficulty: 3
- Estimated Time: 60 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Isolate the absolute value before branching.
- Example Question: Solve `3|x - 4| = 18`.
- Answer: `x = 10` or `x = -2`.
- Explanation: Divide by 3 first: `|x - 4| = 6`. Then `x - 4 = 6` or `x - 4 = -6`.
- Distractors: `x = 22 or -14`; `x = 10` only; `x = 6 or -6`; no solution.
- Distractor Rationale: Branches before isolating; missing branch; uses distance as solution; no-solution confusion.
- Randomization Rules: Use positive outside multiplier and positive right side divisible by multiplier.
- Validity Constraints: Outside multiplier nonzero; isolated right side positive.
- Metadata: phase_id=P009; prerequisites=[multi-step equations, isolate before branch]; misconception_tags=[branches before isolating, missing branch, uses distance as solution]; randomization_constraints=[outside coefficient nonzero].
- Graph/Visual Variant: First lock divides outside coefficient, then branch split.
- Modeling Variant: Three times a distance equals 18.
- Reverse Variant: Create `3|x-4|=18` from `|x-4|=6`.
- Equation Battle Variant: Card `/3`, then branch cards.
- Multi-stage Boss Variant: Isolate, branch, solve, check.
- Hint Mapping: H-P009-T009
- Tutorial Mapping: Tut-P009 sections Isolate First
- Socratic Mapping: Soc-P009 isolate branch

## Template T010 - Absolute value plus constant
- Template ID: P009-T010
- Question Type: Direct computation
- Cognitive Skill: Remove outside constant first
- Difficulty: 3
- Estimated Time: 60 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve equations of the form `|x - h| + k = c`.
- Example Question: Solve `|x - 1| + 4 = 9`.
- Answer: `x = 6` or `x = -4`.
- Explanation: Subtract 4: `|x - 1| = 5`. Then `x - 1 = 5` or `x - 1 = -5`.
- Distractors: `x = 10 or -8`; `x = 5 or -5`; `x = 6` only; no solution.
- Distractor Rationale: Branches before subtracting; uses distance as x-values; missing branch; no-solution confusion.
- Randomization Rules: Use outside constant with positive isolated distance.
- Validity Constraints: Isolated right side must be positive for two solutions.
- Metadata: phase_id=P009; prerequisites=[isolate before branch, shifted absolute value]; misconception_tags=[branches before isolating, uses distance as solution, missing branch]; randomization_constraints=[c-k positive].
- Graph/Visual Variant: Isolate absolute value, then number-line distance from 1.
- Modeling Variant: Distance plus fixed cost equals total.
- Reverse Variant: Create an equation with solutions 6 and -4 using center 1.
- Equation Battle Variant: Card `-4`, then branch.
- Multi-stage Boss Variant: Include check in original equation.
- Hint Mapping: H-P009-T010
- Tutorial Mapping: Tut-P009 sections Isolate First
- Socratic Mapping: Soc-P009 isolate branch

## Template T011 - Absolute value minus constant
- Template ID: P009-T011
- Question Type: Direct computation
- Cognitive Skill: Isolate with negative outside constant
- Difficulty: 3
- Estimated Time: 60 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve equations of the form `|x + h| - k = c`.
- Example Question: Solve `|x + 2| - 7 = -3`.
- Answer: `x = 2` or `x = -6`.
- Explanation: Add 7: `|x + 2| = 4`. Then `x + 2 = 4` or `x + 2 = -4`.
- Distractors: `x = -2 or 4`; `x = 2` only; `x = -6` only; no solution.
- Distractor Rationale: Center/distance confusion; missing branch; chooses only negative branch; fails to isolate.
- Randomization Rules: Use outside subtraction with isolated nonnegative right side.
- Validity Constraints: Isolated absolute value must not be negative.
- Metadata: phase_id=P009; prerequisites=[signed constants, isolate before branch]; misconception_tags=[center/distance confusion, missing branch, failure to isolate]; randomization_constraints=[c+k nonnegative].
- Graph/Visual Variant: Center at -2, distance 4.
- Modeling Variant: Distance after penalty adjustment.
- Reverse Variant: Build `|x+2|-7=-3` from isolated distance 4.
- Equation Battle Variant: Card `+7`, then branch.
- Multi-stage Boss Variant: Check both candidates.
- Hint Mapping: H-P009-T011
- Tutorial Mapping: Tut-P009 sections Isolate First
- Socratic Mapping: Soc-P009 isolate branch

## Template T012 - Multi-step outside coefficient and constant
- Template ID: P009-T012
- Question Type: Direct computation
- Cognitive Skill: Isolate, branch, solve multi-step
- Difficulty: 4
- Estimated Time: 80 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve `a|bx + c| + d = e`.
- Example Question: Solve `2|3x - 1| - 5 = 9`.
- Answer: `x = 8/3` or `x = -2`.
- Explanation: Add 5: `2|3x - 1| = 14`. Divide by 2: `|3x - 1| = 7`. Branch: `3x - 1 = 7` or `3x - 1 = -7`.
- Distractors: `x = 7 or -7`; `x = 8/3` only; `x = -8/3 or 2`; no solution.
- Distractor Rationale: Uses distance as answer; missing branch; sign errors; no-solution confusion.
- Randomization Rules: Use integer outside coefficient and linear inside expression.
- Validity Constraints: Isolated right side positive; inside coefficient nonzero.
- Metadata: phase_id=P009; prerequisites=[multi-step equations, branch solving]; misconception_tags=[uses distance as answer, missing branch, sign error]; randomization_constraints=[isolated distance positive].
- Graph/Visual Variant: Three-stage boss lane: isolate, branch, solve.
- Modeling Variant: Scaled distance with fixed penalty.
- Reverse Variant: Create an equation with solutions `8/3` and `-2`.
- Equation Battle Variant: Cards `+5`, `/2`, branch, `+1`, `/3`.
- Multi-stage Boss Variant: This is a mid-boss template.
- Hint Mapping: H-P009-T012
- Tutorial Mapping: Tut-P009 sections Multi-step Absolute Value
- Socratic Mapping: Soc-P009 multi-step branch

## Template T013 - Absolute values on both sides
- Template ID: P009-T013
- Question Type: Direct computation
- Cognitive Skill: Interpret equal distances
- Difficulty: 4
- Estimated Time: 70 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve equations representing equal distances from two centers.
- Example Question: Solve `|x - 3| = |x + 1|`.
- Answer: `x = 1`.
- Explanation: The point equally distant from 3 and -1 is their midpoint, 1. Algebraically, branch comparison gives `x - 3 = -(x + 1)`, so `2x = 2`.
- Distractors: `x = 3 or -1`; `x = 2`; all real numbers; no solution.
- Distractor Rationale: Uses centers as solutions; averages incorrectly; assumes both absolute values always equal; misclassifies.
- Randomization Rules: Use `|x-a|=|x-b|` with distinct centers.
- Validity Constraints: Centers must be distinct for one midpoint solution.
- Metadata: phase_id=P009; prerequisites=[distance interpretation, variables on both sides]; misconception_tags=[center-as-answer, midpoint error, all-real confusion]; randomization_constraints=[distinct centers].
- Graph/Visual Variant: Number line with centers -1 and 3 and midpoint 1.
- Modeling Variant: Position equally far from two portals.
- Reverse Variant: Given midpoint 1 and centers -1,3, write equation.
- Equation Battle Variant: Equal-distance classification plus branch.
- Multi-stage Boss Variant: Solve by midpoint and verify.
- Hint Mapping: H-P009-T013
- Tutorial Mapping: Tut-P009 sections Equal Distances
- Socratic Mapping: Soc-P009 equal-distance branch

## Template T014 - Isolated absolute value becomes negative
- Template ID: P009-T014
- Question Type: Number of solutions
- Cognitive Skill: Stop after negative isolated distance
- Difficulty: 3
- Estimated Time: 45 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Recognize no solution after isolating an absolute value.
- Example Question: Solve `|x - 4| + 3 = 1`.
- Answer: No solution.
- Explanation: Subtract 3: `|x - 4| = -2`. An absolute value cannot equal a negative number.
- Distractors: `x = 2 or 6`; `x = -2`; `x = 4`; all real numbers.
- Distractor Rationale: Branches after negative distance; treats bars as parentheses; uses center; identity confusion.
- Randomization Rules: Use outside constant that makes isolated right side negative.
- Validity Constraints: Isolated absolute value must be negative.
- Metadata: phase_id=P009; prerequisites=[isolate before branch, negative-distance rule]; misconception_tags=[branches after negative distance, treats bars as parentheses, center confusion]; randomization_constraints=[negative isolated right side].
- Graph/Visual Variant: No points on number line.
- Modeling Variant: Impossible adjusted distance.
- Reverse Variant: Create an equation that isolates to `|x-h|=-2`.
- Equation Battle Variant: Card `-3`, then no-solution classification.
- Multi-stage Boss Variant: Stop before branch.
- Hint Mapping: H-P009-T014
- Tutorial Mapping: Tut-P009 sections Zero and Negative Cases
- Socratic Mapping: Soc-P009 negative branch

## Template T015 - Number-line distance interpretation
- Template ID: P009-T015
- Question Type: Graph interpretation
- Cognitive Skill: Use center plus/minus distance
- Difficulty: 2
- Estimated Time: 45 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Find points a fixed distance from a center.
- Example Question: Which values are 5 units from 2 on a number line?
- Answer: `x = 7` or `x = -3`.
- Explanation: Move 5 units right from 2 to get 7 and 5 units left to get -3.
- Distractors: `x = 5 or -5`; `x = 2 or 5`; `x = 7` only; no solution.
- Distractor Rationale: Uses distance from zero; center/distance confusion; missing branch; impossible-distance confusion.
- Randomization Rules: Choose center `h` and positive distance `d`.
- Validity Constraints: Distance must be positive.
- Metadata: phase_id=P009; prerequisites=[number line distance]; misconception_tags=[distance-from-zero confusion, center/distance confusion, missing branch]; randomization_constraints=[positive distance].
- Graph/Visual Variant: Required number line with center 2 and points -3,7.
- Modeling Variant: Stand 5 tiles from checkpoint 2.
- Reverse Variant: Write `|x-2|=5`.
- Equation Battle Variant: Visual pre-branch stage.
- Multi-stage Boss Variant: Visual answer then equation form.
- Hint Mapping: H-P009-T015
- Tutorial Mapping: Tut-P009 sections Distance Meaning
- Socratic Mapping: Soc-P009 distance branch

## Template T016 - Absolute value context model
- Template ID: P009-T016
- Question Type: Build the model
- Cognitive Skill: Translate distance phrase to absolute value
- Difficulty: 3
- Estimated Time: 60 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Model a distance-from-center situation.
- Example Question: A hidden relic is exactly 9 units from the checkpoint at `-4`. Write and solve an equation for possible positions `x`.
- Answer: `|x + 4| = 9`; `x = 5` or `x = -13`.
- Explanation: Distance from `-4` is `|x - (-4)| = |x+4|`. Move 9 right or left from -4.
- Distractors: `|x - 4| = 9`; `x = 9 or -9`; `x = -4 or 9`; no solution.
- Distractor Rationale: Sign of center error; distance from zero; center/distance confusion; impossible-distance confusion.
- Randomization Rules: Use "distance from checkpoint h is d" contexts.
- Validity Constraints: Distance positive; positions can be negative.
- Metadata: phase_id=P009; prerequisites=[distance interpretation, shifted absolute value]; misconception_tags=[sign of center error, center/distance confusion, missing branch]; randomization_constraints=[positive distance].
- Graph/Visual Variant: Map line with checkpoint -4 and two relic positions.
- Modeling Variant: This is the core context model.
- Reverse Variant: Write a distance story for `|x+4|=9`.
- Equation Battle Variant: Build model, branch, solve.
- Multi-stage Boss Variant: Model, solve, interpret both positions.
- Hint Mapping: H-P009-T016
- Tutorial Mapping: Tut-P009 sections Modeling Distance
- Socratic Mapping: Soc-P009 modeling branch

## Template T017 - Choose the correct equation from a phrase
- Template ID: P009-T017
- Question Type: Multiple choice
- Cognitive Skill: Translate absolute distance language
- Difficulty: 3
- Estimated Time: 45 seconds
- Visual Required: false
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Choose the correct absolute value equation from a distance statement.
- Example Question: Which equation means "the distance from `x` to -4 is 9"?
- Answer: `|x + 4| = 9`.
- Distractors: `|x - 4| = 9`; `|x + 9| = -4`; `x + 4 = 9`; `|x| + 4 = 9`.
- Distractor Rationale: Sign of center error; swaps center and distance; omits absolute value branch; treats shift outside bars.
- Randomization Rules: Use centers and distances with positive and negative centers.
- Validity Constraints: Distance must appear outside as a nonnegative right side.
- Metadata: phase_id=P009; prerequisites=[absolute distance notation]; misconception_tags=[sign of center error, swaps center and distance, missing absolute value]; randomization_constraints=[positive distance].
- Graph/Visual Variant: Number line center marker.
- Modeling Variant: Translation gate before solving.
- Reverse Variant: Given `|x+4|=9`, write the phrase.
- Equation Battle Variant: Model selection before battle.
- Multi-stage Boss Variant: Choose equation, solve, graph.
- Hint Mapping: H-P009-T017
- Tutorial Mapping: Tut-P009 sections Modeling Distance
- Socratic Mapping: Soc-P009 translation branch

## Template T018 - Error detection: missing branch
- Template ID: P009-T018
- Question Type: Error detection
- Cognitive Skill: Diagnose incomplete solution
- Difficulty: 3
- Estimated Time: 55 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Correct a solution that gives only one absolute value branch.
- Example Question: A player solves `|x - 2| = 5` and gives only `x = 7`. What is missing?
- Answer: The negative branch is missing; the full solution is `x = 7` or `x = -3`.
- Explanation: `x - 2` can equal 5 or -5.
- Distractors: Nothing is missing; `x = 2`; no solution; `x = -7`.
- Distractor Rationale: Accepts incomplete branch; uses center; negative-distance confusion; sign error.
- Randomization Rules: Present wrong work with one branch missing.
- Validity Constraints: Original equation must have two distinct solutions.
- Metadata: phase_id=P009; prerequisites=[two-branch solving]; misconception_tags=[missing branch, center confusion, sign error]; randomization_constraints=[positive distance].
- Graph/Visual Variant: Number line showing only one side marked, then both.
- Modeling Variant: Battle replay missing one portal location.
- Reverse Variant: Create an incomplete one-branch solution and repair it.
- Equation Battle Variant: Repair missing branch.
- Multi-stage Boss Variant: Identify missing branch and check both.
- Hint Mapping: H-P009-T018
- Tutorial Mapping: Tut-P009 sections Common Mistakes
- Socratic Mapping: Soc-P009 error branch

## Template T019 - Multiple-select solution check
- Template ID: P009-T019
- Question Type: Multiple select
- Cognitive Skill: Verify candidates
- Difficulty: 3
- Estimated Time: 60 seconds
- Visual Required: false
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Select all values that satisfy an absolute value equation.
- Example Question: Select all solutions of `|2x + 1| = 5` from the list: `2`, `-3`, `3`, `-2`, `0`.
- Answer: `2` and `-3`.
- Explanation: Branches: `2x+1=5` gives `x=2`; `2x+1=-5` gives `x=-3`.
- Distractors: `3`; `-2`; `0`.
- Distractor Rationale: Arithmetic slip; sign slip; assumes center value.
- Randomization Rules: Include both true solutions and plausible branch/arithmetic errors.
- Validity Constraints: Mark as multiple select; exactly the generated true solutions should satisfy original equation.
- Metadata: phase_id=P009; prerequisites=[checking candidates, branch solving]; misconception_tags=[arithmetic slip, sign slip, center confusion]; randomization_constraints=[multiple select marked].
- Graph/Visual Variant: Candidate points on a number line.
- Modeling Variant: Select all relic positions from a list.
- Reverse Variant: Given selected solutions, create an absolute equation.
- Equation Battle Variant: Candidate verification gate.
- Multi-stage Boss Variant: Branch solve plus list selection.
- Hint Mapping: H-P009-T019
- Tutorial Mapping: Tut-P009 sections Checking Solutions
- Socratic Mapping: Soc-P009 checking branch

## Template T020 - Absolute value boss challenge
- Template ID: P009-T020
- Question Type: Boss challenge
- Cognitive Skill: Integrated absolute value solving
- Difficulty: 5
- Estimated Time: 110 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Isolate, branch, solve, and check a multi-step absolute value equation.
- Example Question: Boss Gate: Solve `4|2x + 3| - 8 = 20` and check all solutions.
- Answer: `x = 2` or `x = -5`.
- Explanation: Add 8: `4|2x+3| = 28`. Divide by 4: `|2x+3| = 7`. Branch: `2x+3=7` gives `x=2`; `2x+3=-7` gives `x=-5`. Checks give `20` on both sides.
- Distractors: `x = 7 or -7`; `x = 2` only; `x = -5` only; no solution.
- Distractor Rationale: Uses isolated distance as solution; missing branch; false no-solution classification.
- Randomization Rules: Use outside coefficient and constant plus linear inside expression.
- Validity Constraints: Isolated distance positive; inside coefficient nonzero.
- Metadata: phase_id=P009; prerequisites=[multi-step equations, branch solving, checking]; misconception_tags=[uses distance as solution, missing branch, no-solution confusion]; randomization_constraints=[positive isolated distance].
- Graph/Visual Variant: Boss lane: isolate, branch, solve, check.
- Modeling Variant: Scaled distance gate.
- Reverse Variant: Create a boss equation with solutions 2 and -5.
- Equation Battle Variant: Cards `+8`, `/4`, branch, solve lanes.
- Multi-stage Boss Variant: This is the phase boss template.
- Hint Mapping: H-P009-T020
- Tutorial Mapping: Tut-P009 sections Full Phase Review
- Socratic Mapping: Soc-P009 boss branch

# Part II - Hint Bible

## H-P009-T001
- Hint 1 - Gentle Nudge: Absolute value asks for distance from zero.
- Hint 2 - Concept Reminder: Two numbers are 6 units from zero.
- Hint 3 - Focus Hint: One is positive and one is negative.
- Hint 4 - Guided Next Step: Write `x = 6` or `x = -6`.
- Hint 5 - Nearly Complete: Check both values in `|x|`.
- Hint 6 - Full Solution: `x = 6` or `x = -6`.

## H-P009-T002
- Hint 1 - Gentle Nudge: Distance zero means no movement from the center.
- Hint 2 - Concept Reminder: Only zero is zero units from zero.
- Hint 3 - Focus Hint: `x` must equal 0.
- Hint 4 - Guided Next Step: Do not list `-0` as a second solution.
- Hint 5 - Nearly Complete: Check `|0| = 0`.
- Hint 6 - Full Solution: `x = 0`.

## H-P009-T003
- Hint 1 - Gentle Nudge: Absolute value is distance.
- Hint 2 - Concept Reminder: Distance cannot be negative.
- Hint 3 - Focus Hint: The right side is `-4`.
- Hint 4 - Guided Next Step: Stop before making branches.
- Hint 5 - Nearly Complete: No number has absolute value `-4`.
- Hint 6 - Full Solution: No solution.

## H-P009-T004
- Hint 1 - Gentle Nudge: `|x - 3|` means distance from 3.
- Hint 2 - Concept Reminder: Move 7 units both directions from the center.
- Hint 3 - Focus Hint: Right of 3 is `3 + 7`.
- Hint 4 - Guided Next Step: Left of 3 is `3 - 7`.
- Hint 5 - Nearly Complete: The two values are 10 and -4.
- Hint 6 - Full Solution: `x = 10` or `x = -4`.

## H-P009-T005
- Hint 1 - Gentle Nudge: `|x + 5|` means distance from -5.
- Hint 2 - Concept Reminder: Move 2 units right and left from -5.
- Hint 3 - Focus Hint: `-5 + 2 = -3`.
- Hint 4 - Guided Next Step: `-5 - 2 = -7`.
- Hint 5 - Nearly Complete: Check both in `|x+5|`.
- Hint 6 - Full Solution: `x = -3` or `x = -7`.

## H-P009-T006
- Hint 1 - Gentle Nudge: Split into two branches.
- Hint 2 - Concept Reminder: If `|A| = 10`, then `A = 10` or `A = -10`.
- Hint 3 - Focus Hint: Use `2x = 10` and `2x = -10`.
- Hint 4 - Guided Next Step: Divide both equations by 2.
- Hint 5 - Nearly Complete: `x = 5` or `x = -5`.
- Hint 6 - Full Solution: `x = 5` or `x = -5`.

## H-P009-T007
- Hint 1 - Gentle Nudge: The inside expression can equal positive or negative 7.
- Hint 2 - Concept Reminder: Make two linear equations.
- Hint 3 - Focus Hint: `2x - 3 = 7` or `2x - 3 = -7`.
- Hint 4 - Guided Next Step: Add 3 in each branch.
- Hint 5 - Nearly Complete: `2x = 10` or `2x = -4`.
- Hint 6 - Full Solution: `x = 5` or `x = -2`.

## H-P009-T008
- Hint 1 - Gentle Nudge: Branch before solving the inside equation.
- Hint 2 - Concept Reminder: `x/3 + 2` equals 5 or -5.
- Hint 3 - Focus Hint: Subtract 2 in both branches.
- Hint 4 - Guided Next Step: `x/3 = 3` or `x/3 = -7`.
- Hint 5 - Nearly Complete: Multiply by 3.
- Hint 6 - Full Solution: `x = 9` or `x = -21`.

## H-P009-T009
- Hint 1 - Gentle Nudge: Isolate the absolute value first.
- Hint 2 - Concept Reminder: Divide both sides by the outside coefficient 3.
- Hint 3 - Focus Hint: `|x - 4| = 6`.
- Hint 4 - Guided Next Step: Branch: `x-4=6` or `x-4=-6`.
- Hint 5 - Nearly Complete: Add 4 in each branch.
- Hint 6 - Full Solution: `x = 10` or `x = -2`.

## H-P009-T010
- Hint 1 - Gentle Nudge: Remove the outside `+4` before branching.
- Hint 2 - Concept Reminder: Isolate the absolute value expression first.
- Hint 3 - Focus Hint: `|x - 1| = 5`.
- Hint 4 - Guided Next Step: `x-1=5` or `x-1=-5`.
- Hint 5 - Nearly Complete: Add 1 in each branch.
- Hint 6 - Full Solution: `x = 6` or `x = -4`.

## H-P009-T011
- Hint 1 - Gentle Nudge: Undo the outside `-7`.
- Hint 2 - Concept Reminder: Add 7 to both sides.
- Hint 3 - Focus Hint: `|x+2| = 4`.
- Hint 4 - Guided Next Step: `x+2=4` or `x+2=-4`.
- Hint 5 - Nearly Complete: Subtract 2 in each branch.
- Hint 6 - Full Solution: `x = 2` or `x = -6`.

## H-P009-T012
- Hint 1 - Gentle Nudge: Isolate the absolute value before splitting.
- Hint 2 - Concept Reminder: Undo `-5`, then undo multiplication by 2.
- Hint 3 - Focus Hint: `|3x - 1| = 7`.
- Hint 4 - Guided Next Step: `3x-1=7` or `3x-1=-7`.
- Hint 5 - Nearly Complete: `3x=8` or `3x=-6`.
- Hint 6 - Full Solution: `x = 8/3` or `x = -2`.

## H-P009-T013
- Hint 1 - Gentle Nudge: Both sides are distances.
- Hint 2 - Concept Reminder: A point equally distant from two centers is halfway between them.
- Hint 3 - Focus Hint: The centers are 3 and -1.
- Hint 4 - Guided Next Step: The midpoint of 3 and -1 is 1.
- Hint 5 - Nearly Complete: Check `|1-3|` and `|1+1|`.
- Hint 6 - Full Solution: `x = 1`.

## H-P009-T014
- Hint 1 - Gentle Nudge: Isolate the absolute value first.
- Hint 2 - Concept Reminder: Subtract 3 from both sides.
- Hint 3 - Focus Hint: `|x - 4| = -2`.
- Hint 4 - Guided Next Step: Absolute value cannot equal a negative number.
- Hint 5 - Nearly Complete: Stop before branching.
- Hint 6 - Full Solution: No solution.

## H-P009-T015
- Hint 1 - Gentle Nudge: Start at the center, 2.
- Hint 2 - Concept Reminder: Distance 5 means move 5 units both ways.
- Hint 3 - Focus Hint: Right point: `2 + 5`.
- Hint 4 - Guided Next Step: Left point: `2 - 5`.
- Hint 5 - Nearly Complete: The points are 7 and -3.
- Hint 6 - Full Solution: `x = 7` or `x = -3`.

## H-P009-T016
- Hint 1 - Gentle Nudge: Distance from -4 uses `x - (-4)`.
- Hint 2 - Concept Reminder: `x - (-4)` simplifies to `x + 4`.
- Hint 3 - Focus Hint: The equation is `|x + 4| = 9`.
- Hint 4 - Guided Next Step: Branch: `x+4=9` or `x+4=-9`.
- Hint 5 - Nearly Complete: Subtract 4 in both branches.
- Hint 6 - Full Solution: `x = 5` or `x = -13`.

## H-P009-T017
- Hint 1 - Gentle Nudge: Distance from -4 means subtract -4.
- Hint 2 - Concept Reminder: `x - (-4)` becomes `x + 4`.
- Hint 3 - Focus Hint: The distance 9 belongs on the right side.
- Hint 4 - Guided Next Step: Use absolute value bars around `x + 4`.
- Hint 5 - Nearly Complete: `|x + 4| = 9`.
- Hint 6 - Full Solution: Correct equation: `|x + 4| = 9`.

## H-P009-T018
- Hint 1 - Gentle Nudge: Absolute value equations often have two branches.
- Hint 2 - Concept Reminder: `|x-2|=5` means `x-2=5` or `x-2=-5`.
- Hint 3 - Focus Hint: The player used only `x-2=5`.
- Hint 4 - Guided Next Step: Solve the missing branch `x-2=-5`.
- Hint 5 - Nearly Complete: `x=-3`.
- Hint 6 - Full Solution: Missing solution is `x=-3`; full answer `x=7` or `x=-3`.

## H-P009-T019
- Hint 1 - Gentle Nudge: Solve the branches, then compare with the list.
- Hint 2 - Concept Reminder: `2x+1=5` or `2x+1=-5`.
- Hint 3 - Focus Hint: First branch gives `x=2`.
- Hint 4 - Guided Next Step: Second branch gives `x=-3`.
- Hint 5 - Nearly Complete: Check only those values in the list.
- Hint 6 - Full Solution: Select `2` and `-3`.

## H-P009-T020
- Hint 1 - Gentle Nudge: Isolate the absolute value before branching.
- Hint 2 - Concept Reminder: Undo `-8`, then undo multiplication by 4.
- Hint 3 - Focus Hint: `|2x+3| = 7`.
- Hint 4 - Guided Next Step: `2x+3=7` or `2x+3=-7`.
- Hint 5 - Nearly Complete: `2x=4` or `2x=-10`.
- Hint 6 - Full Solution: `x = 2` or `x = -5`; both check.

# Part III - Tutorial Bible

## Learning Goal
Learn to solve absolute value equations by using distance meaning, isolating the absolute value, splitting into branches, and checking all candidates.

## Why It Matters
Absolute value is the algebra of distance. It appears in tolerance ranges, error from a target, distance from a checkpoint, piecewise functions, and later absolute value inequalities.

## Prerequisite Check
Ask the player:

1. What is `|6|`? Expected: 6.
2. What is `|-6|`? Expected: 6.
3. Can a distance be negative? Expected: no.
4. Solve `x - 3 = 7`. Expected: `x = 10`.
5. Solve `x - 3 = -7`. Expected: `x = -4`.

## Core Concept
Absolute value measures distance.

`|x| = 6` means `x` is 6 units from 0, so `x = 6` or `x = -6`.

`|x - 3| = 7` means `x` is 7 units from 3, so `x = 3 + 7 = 10` or `x = 3 - 7 = -4`.

## Branch Method
If `|A| = k` and `k > 0`, then:

`A = k` or `A = -k`.

Example:

`|2x - 3| = 7`

Branches:

`2x - 3 = 7` gives `x = 5`.
`2x - 3 = -7` gives `x = -2`.

## Isolate First
Do not branch until the absolute value is alone.

Example:

`3|x - 4| = 18`
`|x - 4| = 6`

Now branch:

`x - 4 = 6` or `x - 4 = -6`.

## Zero and Negative Cases
- `|A| = 0` gives one equation: `A = 0`.
- `|A| = negative` has no solution.

Example:

`|x - 4| + 3 = 1`
`|x - 4| = -2`

No solution.

## Equal Distances
Equations like `|x - 3| = |x + 1|` ask for a point equally distant from two centers. The solution is the midpoint between 3 and -1, which is 1.

## Common Mistakes
- Mistake: Only solving the positive branch.
  Correction: Use both `A = k` and `A = -k`.
- Mistake: Branching before isolating.
  Correction: Make the absolute value expression stand alone first.
- Mistake: Solving when the isolated distance is negative.
  Correction: Stop and say no solution.
- Mistake: Treating `|x + 5|` as distance from 5.
  Correction: It is distance from -5.
- Mistake: Forgetting to check.
  Correction: Substitute every candidate into the original equation.

## Guided Practice
1. Solve `|x - 2| = 4`.
   - `x - 2 = 4` or `x - 2 = -4`.
   - `x = 6` or `x = -2`.

2. Solve `|3x| = 12`.
   - `3x = 12` or `3x = -12`.
   - `x = 4` or `x = -4`.

3. Solve `|x + 1| - 5 = 0`.
   - `|x + 1| = 5`.
   - `x + 1 = 5` or `x + 1 = -5`.
   - `x = 4` or `x = -6`.

## Independent Practice
1. `|x| = 9`; answer `x = 9` or `x = -9`.
2. `|x - 6| = 2`; answer `x = 8` or `x = 4`.
3. `|2x + 4| = 10`; answer `x = 3` or `x = -7`.
4. `5|x + 3| = 20`; answer `x = 1` or `x = -7`.
5. `|x - 1| + 4 = 2`; answer no solution.

## Mastery Check
The player is ready to advance when they can:

1. Explain absolute value as distance.
2. Solve basic and shifted absolute value equations.
3. Isolate absolute value before branching.
4. Identify zero and negative isolated-distance cases.
5. Check all candidate solutions.

Mastery check set:

1. `|x + 4| = 8`; solutions `x = 4`, `x = -12`.
2. `|3x - 6| = 12`; solutions `x = 6`, `x = -2`.
3. `2|x - 5| + 1 = 9`; solutions `x = 9`, `x = 1`.
4. `|x + 7| = 0`; solution `x = -7`.
5. `|x - 2| = -3`; no solution.

## Adaptive Tutor Messages
- If the player gives one solution: "Absolute value is distance. Is there another point the same distance on the other side?"
- If the player branches too early: "First isolate the absolute value expression; then decide the branches."
- If the player solves a negative-distance case: "An isolated absolute value cannot equal a negative number."
- If the player has sign errors with `x+h`: "Rewrite `x+h` as `x - (-h)` to see the center."
- If the player skips checking: "Substitute both candidates into the original equation."
- If the player succeeds quickly: "You are ready for absolute value inequalities, where distance becomes inside or outside a range."

## Tutorial Metadata
- Tutorial ID: Tut-P009
- Estimated duration: 5 minutes
- Target player state: understands linear equations and number-line distance
- Unlock condition: available from any Phase 009 question
- Remediation trigger: two missing-branch errors, two isolate-before-branch errors, one negative-distance error, or two center-sign errors
- Advancement trigger: 80 percent accuracy on mixed absolute value equations plus correct checking of both branches

# Part IV - Socratic Dialogue Bible

## Opening Diagnostic
Tutor: "What does `|x - 3| = 7` mean on a number line?"

Expected strong answer: "`x` is 7 units away from 3, so it can be 10 or -4."

## Guided Discovery
Tutor sequence:

1. "Is the absolute value isolated?"
2. "What is the right side after isolation?"
3. "Is that number positive, zero, or negative?"
4. "If positive, what are the two branch equations?"
5. "If zero, what single equation remains?"
6. "If negative, why is there no solution?"
7. "What solutions come from the branches?"
8. "Do all candidates check in the original equation?"

## Correct Branch
Player: "It means distance from 3 is 7."

Tutor: "Good. What point is 7 units to the right of 3? What point is 7 units to the left?"

Exit when the player gives 10 and -4 and checks both.

## Partial Understanding Branch
Player gives only `x = 10`.

Tutor: "That is one point. Since distance can go in two directions, what point is 7 units left of 3?"

## Misconception Branch
Player says `x = 7` or `x = -7`.

Tutor: "Those are points 7 units from zero. This equation asks for points 7 units from 3. Where is the center?"

## Unsure Branch
Player: "I don't know."

Tutor: "Start by reading the expression inside the bars. `x - 3` means distance from what number?"

If needed, show Hint 1 and a number-line prompt.

## Unrelated Response Branch
Player gives an unrelated answer.

Tutor: "Let's focus on the distance statement. In `|x - 3| = 7`, is the center 0, 3, or 7?"

If unrelated again, use a multiple-choice center question.

## Recovery Prompts
- "Is the absolute value isolated?"
- "Can an absolute value equal a negative number?"
- "What are the two branch equations?"
- "What is the center?"
- "What is the distance?"
- "Have both candidate solutions been checked?"

## Reflection Question
"Why does `|x - 3| = 7` usually have two solutions, but `|x - 3| = 0` has only one?"

Strong reflection: "A positive distance can go left or right from the center, but distance zero stays at the center."

## Transfer Question
"How will the distance idea change when solving `|x - 3| < 7`?"

Expected transfer: "Instead of two exact points, it will include all points within 7 units of 3."

## Escalation Rules
- If the player gives one branch twice, show Branch Method.
- If the player branches before isolating twice, show Isolate First.
- If the player tries to solve a negative-distance case, show Zero and Negative Cases.
- If center-sign errors repeat, show Shifted Centers.
- If checking errors repeat, show Checking Solutions.
- If the player solves three mixed absolute value equations accurately, advance to independent practice.

## Exit Condition
The Socratic sequence is complete when the player:

1. Interprets the absolute value as distance.
2. Isolates the absolute value expression.
3. Chooses the correct positive, zero, or negative case.
4. Solves all branches.
5. Checks every candidate in the original equation.

# Knowledge Graph

- Prerequisites: Phase 001 one-step equations; Phase 002 multi-step equations; Phase 003 variables on both sides; signed numbers; number-line distance
- Concepts Unlocked: absolute value as distance; shifted centers; two-branch equations; zero-distance case; negative-distance no-solution case; equal-distance midpoint; absolute value modeling
- Related Concepts: absolute value inequalities; piecewise functions; distance on number line; transformations; domain restrictions
- Common Misconceptions: missing branch; branching before isolating; allowing negative distance; sign-of-center error; using distance as solution; failing to check candidates; double-counting zero
- Remedial Phases: Phase 001 review; Phase 002 review; signed-number review; number-line distance mini-lesson; branch-equation mini-lesson
- Follow-up Phases: Phase 010 - Absolute value inequalities; Phase 015 - Domain from formulas; Phase 016 - Domain from graphs; Phase 021 - Piecewise functions
- Transfer Topics: tolerance intervals; error bounds; piecewise definitions; distance formulas; absolute value graphs

# Validation Notes

## Structure Validation
- Includes all required Bibles and metadata sections.
- Contains exactly 20 template families, within the required 20-40 range.
- Each template includes example, answer, explanation, distractors, distractor rationale, randomization rules, validity constraints, metadata, variants, and mappings.
- Every template has six progressive hints.

## Math Validation
- T001: `|x|=6` -> `x=6` or `x=-6`.
- T002: `|x|=0` -> `x=0`.
- T003: `|x|=-4` -> no solution.
- T004: `|x-3|=7` -> `x=10` or `x=-4`.
- T005: `|x+5|=2` -> `x=-3` or `x=-7`.
- T006: `|2x|=10` -> `x=5` or `x=-5`.
- T007: `|2x-3|=7` -> `x=5` or `x=-2`.
- T008: `|x/3+2|=5` -> `x=9` or `x=-21`.
- T009: `3|x-4|=18` -> `|x-4|=6` -> `x=10` or `x=-2`.
- T010: `|x-1|+4=9` -> `|x-1|=5` -> `x=6` or `x=-4`.
- T011: `|x+2|-7=-3` -> `|x+2|=4` -> `x=2` or `x=-6`.
- T012: `2|3x-1|-5=9` -> `|3x-1|=7` -> `x=8/3` or `x=-2`.
- T013: `|x-3|=|x+1|` -> midpoint between 3 and -1 is `x=1`.
- T014: `|x-4|+3=1` -> `|x-4|=-2` -> no solution.
- T015: points 5 units from 2 are `7` and `-3`.
- T016: `|x+4|=9` -> `x=5` or `x=-13`.
- T017: phrase "distance from x to -4 is 9" -> `|x+4|=9`.
- T018: `|x-2|=5` has solutions `7` and `-3`; giving only 7 is incomplete.
- T019: `|2x+1|=5` -> `x=2` or `x=-3`.
- T020: `4|2x+3|-8=20` -> `|2x+3|=7` -> `x=2` or `x=-5`.

## Distractor Validation
- Distractors reflect missing branches, center/distance confusion, sign errors, branching before isolating, negative-distance errors, and using the isolated distance as the solution.
- Multiple-select template is explicitly marked and has exactly two correct choices.
- All candidate solutions were checked against original equations.

## Hint Validation
- Each hint sequence progresses from distance meaning or isolation to branching, solving, and final check.
- No early hint gives both solutions before branch logic is established.

## Tutorial Validation
- Tutorial includes learning goal, prerequisite check, why it matters, core concept, branch method, isolate-first rule, zero/negative cases, equal distances, common mistakes, guided practice, independent practice, mastery check, adaptive messages, and metadata.

## Socratic Validation
- Dialogue includes diagnostic, guided discovery, correct branch, partial branch, misconception branch, unsure branch, unrelated branch, recovery prompts, reflection, transfer, escalation rules, and exit condition.
- Tutor guides with distance meaning before formal branching.

## Metadata Validation
- Every template includes IDs, difficulty, timing, visual flag, compatibility flags, prerequisites, misconception tags, randomization constraints, and support-system mappings.

## Known Issues
- The repository specifications differ on the label for Hint 4. This phase uses "Guided Next Step" to match the master prompt language.
- `PHASE_TEMPLATE.md` omits Common Misconceptions from the Knowledge Graph section, but this phase includes it because the master prompt and knowledge graph guide require it.
