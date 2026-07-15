# Phase 007 - Linear Inequalities

## Phase Metadata
- Course: Precalculus Odyssey Bible v5
- Topic: Linear inequalities
- Subtopic: Solving and graphing one-variable linear inequalities
- Prerequisites: Phase 001 one-step equations, Phase 002 multi-step equations, Phase 003 variables on both sides, Phase 006 Equation Battle fundamentals, signed arithmetic, number line interpretation
- Related phases: Phase 008 - Compound inequalities; Phase 009 - Absolute value equations; Phase 010 - Absolute value inequalities; Phase 014 - Function notation
- Estimated phase size: 20 template families, 20 core examples, 120 progressive hints, 1 tutorial sequence, 1 Socratic dialogue system

## Learning Objectives
By the end of this phase, the player can:

1. Solve one-step, two-step, and simple multi-step linear inequalities.
2. Preserve inequality direction when adding, subtracting, multiplying by positive values, and dividing by positive values.
3. Reverse the inequality direction when multiplying or dividing by a negative value.
4. Graph solution sets on a number line using open and closed endpoints.
5. Write solutions in inequality and interval notation.
6. Test whether a value satisfies an inequality.
7. Interpret "at most," "at least," "less than," and "greater than" in context.

## Prerequisite Review
- Equations use equality; inequalities describe a range of values.
- `x < 5` means values less than 5, not including 5.
- `x <= 5` means values less than or equal to 5, including 5.
- Adding or subtracting the same number on both sides keeps the inequality direction.
- Multiplying or dividing both sides by a negative number reverses the inequality direction.

## Core Concepts
- Solving a linear inequality is like solving a linear equation, but the final answer is usually a range.
- The boundary value is the number where equality would occur.
- Open circle: `<` or `>`.
- Closed circle: `<=` or `>=`.
- Shade left for "less than" and right for "greater than."
- The inequality flips only when multiplying or dividing both sides by a negative number.

## Common Misconceptions
- Forgetting to reverse the inequality when dividing by a negative.
- Reversing the inequality after adding or subtracting.
- Using a closed endpoint for `<` or `>`.
- Shading in the wrong direction.
- Treating the boundary value as the only solution.
- Confusing "at most" with "at least."
- Ignoring whole-number restrictions in contexts.
- Checking only the boundary instead of testing values inside the solution region.

# Part I - Question Bible

## Template T001 - Addition inequality
- Template ID: P007-T001
- Question Type: Direct computation
- Cognitive Skill: Apply inverse addition/subtraction
- Difficulty: 1
- Estimated Time: 25 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve inequalities of the form `x + a < b`.
- Example Question: Solve and graph `x + 5 < 12`.
- Answer: `x < 7`; open circle at 7, shade left.
- Explanation: Subtract 5 from both sides. Subtracting does not reverse the inequality.
- Distractors: `x > 7`; `x < 17`; `x <= 7`; `x = 7`
- Distractor Rationale: Reverses direction incorrectly; adds instead of subtracts; uses closed endpoint; treats boundary as only solution.
- Randomization Rules: Choose integer `a`, boundary `s`, and set `b = s + a`.
- Validity Constraints: Use `<` or `>` with open endpoints in this template.
- Metadata: phase_id=P007; prerequisites=[P001 addition equations, number line]; misconception_tags=[wrong direction, wrong inverse operation, closed endpoint error]; randomization_constraints=[integer boundary].
- Graph/Visual Variant: Required number line with open circle at 7 and left shading.
- Modeling Variant: "A player can carry less than 12 weight after 5 fixed gear weight."
- Reverse Variant: Given graph `x < 7`, write an inequality like `x + 5 < 12`.
- Equation Battle Variant: Card `-5 both sides`; inequality direction unchanged.
- Multi-stage Boss Variant: Solve, choose endpoint type, choose shading direction.
- Hint Mapping: H-P007-T001
- Tutorial Mapping: Tut-P007 sections Core Concept
- Socratic Mapping: Soc-P007 basic branch

## Template T002 - Subtraction inequality with closed endpoint
- Template ID: P007-T002
- Question Type: Direct computation
- Cognitive Skill: Solve and include boundary
- Difficulty: 1
- Estimated Time: 25 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve inequalities of the form `x - a >= b`.
- Example Question: Solve and graph `x - 4 >= 10`.
- Answer: `x >= 14`; closed circle at 14, shade right.
- Explanation: Add 4 to both sides. The `>=` symbol keeps the same direction.
- Distractors: `x <= 14`; `x >= 6`; `x > 14`; `x = 14`
- Distractor Rationale: Reverses direction incorrectly; subtracts again; uses open endpoint; boundary-only answer.
- Randomization Rules: Choose integer `a`, boundary `s`, and set `b = s - a`.
- Validity Constraints: Use `<=` or `>=` with closed endpoints.
- Metadata: phase_id=P007; prerequisites=[P001 subtraction equations, number line]; misconception_tags=[wrong direction, wrong endpoint, wrong inverse operation]; randomization_constraints=[integer boundary].
- Graph/Visual Variant: Closed circle at 14 with right shading.
- Modeling Variant: "After spending 4, a player must have at least 10 energy."
- Reverse Variant: Given graph `x >= 14`, write `x - 4 >= 10`.
- Equation Battle Variant: Card `+4 both sides`; direction unchanged.
- Multi-stage Boss Variant: Include interval notation `[14, infinity)`.
- Hint Mapping: H-P007-T002
- Tutorial Mapping: Tut-P007 sections Graphing Solutions
- Socratic Mapping: Soc-P007 basic branch

## Template T003 - Positive multiplication inequality
- Template ID: P007-T003
- Question Type: Direct computation
- Cognitive Skill: Divide by positive coefficient
- Difficulty: 1
- Estimated Time: 25 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve `ax <= b` when `a` is positive.
- Example Question: Solve `3x <= 18`.
- Answer: `x <= 6`.
- Explanation: Divide both sides by positive 3. The inequality direction stays the same.
- Distractors: `x >= 6`; `x <= 54`; `x < 6`; `x = 6`
- Distractor Rationale: Flips when not needed; multiplies instead of divides; changes endpoint type; boundary-only answer.
- Randomization Rules: Choose positive coefficient `a` and boundary `s`; set `b = as`.
- Validity Constraints: Coefficient must be positive.
- Metadata: phase_id=P007; prerequisites=[P001 multiplication equations]; misconception_tags=[unneeded flip, wrong operation, endpoint error]; randomization_constraints=[a positive].
- Graph/Visual Variant: Closed circle at 6, shade left.
- Modeling Variant: "Three equal loads must be at most 18 total."
- Reverse Variant: Given `x <= 6`, build `3x <= 18`.
- Equation Battle Variant: Card `/3 both sides`; no flip.
- Multi-stage Boss Variant: Ask why no flip occurs.
- Hint Mapping: H-P007-T003
- Tutorial Mapping: Tut-P007 sections Positive Multiplication
- Socratic Mapping: Soc-P007 positive-scale branch

## Template T004 - Positive division inequality
- Template ID: P007-T004
- Question Type: Direct computation
- Cognitive Skill: Multiply by positive divisor
- Difficulty: 1
- Estimated Time: 25 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve `x/a > b` when `a` is positive.
- Example Question: Solve `x/5 > 3`.
- Answer: `x > 15`.
- Explanation: Multiply both sides by positive 5. The inequality direction stays the same.
- Distractors: `x < 15`; `x > 8`; `x >= 15`; `x = 15`
- Distractor Rationale: Flips when not needed; adds 5; closed endpoint error; boundary-only answer.
- Randomization Rules: Choose positive divisor `a` and boundary `s`; set right side `b = s/a`.
- Validity Constraints: Divisor must be positive.
- Metadata: phase_id=P007; prerequisites=[P001 division equations]; misconception_tags=[unneeded flip, wrong inverse operation, endpoint error]; randomization_constraints=[a positive].
- Graph/Visual Variant: Open circle at 15, shade right.
- Modeling Variant: "One fifth of a hidden score must exceed 3."
- Reverse Variant: Given `x > 15`, write `x/5 > 3`.
- Equation Battle Variant: Card `*5 both sides`; no flip.
- Multi-stage Boss Variant: Solve and graph.
- Hint Mapping: H-P007-T004
- Tutorial Mapping: Tut-P007 sections Positive Multiplication
- Socratic Mapping: Soc-P007 positive-scale branch

## Template T005 - Negative multiplication inequality
- Template ID: P007-T005
- Question Type: Direct computation
- Cognitive Skill: Reverse inequality after dividing by negative
- Difficulty: 3
- Estimated Time: 45 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve `-ax < b` and reverse the inequality.
- Example Question: Solve `-2x < 8`.
- Answer: `x > -4`.
- Explanation: Divide both sides by `-2`; dividing by a negative reverses `<` to `>`.
- Distractors: `x < -4`; `x > 4`; `x < 4`; `x = -4`
- Distractor Rationale: Forgets flip; sign error; both sign and flip error; boundary-only answer.
- Randomization Rules: Use negative coefficients and integer boundaries.
- Validity Constraints: Negative coefficient must be nonzero.
- Metadata: phase_id=P007; prerequisites=[signed division, inequality flip rule]; misconception_tags=[forgets flip, sign error, boundary-only answer]; randomization_constraints=[negative coefficient].
- Graph/Visual Variant: Open circle at -4, shade right.
- Modeling Variant: Cursed multiplier inequality.
- Reverse Variant: Given `x > -4`, write `-2x < 8`.
- Equation Battle Variant: Card `/-2 both sides`; flip symbol.
- Multi-stage Boss Variant: Require player to announce flip before graphing.
- Hint Mapping: H-P007-T005
- Tutorial Mapping: Tut-P007 sections Negative Multiplication
- Socratic Mapping: Soc-P007 flip branch

## Template T006 - Negative variable inequality
- Template ID: P007-T006
- Question Type: Direct computation
- Cognitive Skill: Multiply by -1 and reverse
- Difficulty: 3
- Estimated Time: 40 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve inequalities involving `-x`.
- Example Question: Solve `-x >= 7`.
- Answer: `x <= -7`.
- Explanation: Multiply or divide by `-1`, so the inequality reverses.
- Distractors: `x >= -7`; `x <= 7`; `x > -7`; `x = -7`
- Distractor Rationale: Forgets flip; sign error; endpoint error; boundary-only answer.
- Randomization Rules: Use `-x < b`, `-x <= b`, `-x > b`, or `-x >= b`.
- Validity Constraints: Boundary should be nonzero for sign focus.
- Metadata: phase_id=P007; prerequisites=[opposites, flip rule]; misconception_tags=[forgets flip, sign error, endpoint error]; randomization_constraints=[nonzero boundary].
- Graph/Visual Variant: Closed circle at -7, shade left.
- Modeling Variant: "The opposite of a score is at least 7."
- Reverse Variant: Given `x <= -7`, write `-x >= 7`.
- Equation Battle Variant: Card `*-1 both sides`; flip.
- Multi-stage Boss Variant: Include a test value check.
- Hint Mapping: H-P007-T006
- Tutorial Mapping: Tut-P007 sections Negative Multiplication
- Socratic Mapping: Soc-P007 flip branch

## Template T007 - Two-step inequality with positive coefficient
- Template ID: P007-T007
- Question Type: Direct computation
- Cognitive Skill: Sequence inverse operations
- Difficulty: 2
- Estimated Time: 45 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve `ax + b < c` with positive `a`.
- Example Question: Solve `2x + 5 < 17`.
- Answer: `x < 6`.
- Explanation: Subtract 5 to get `2x < 12`, then divide by positive 2.
- Distractors: `x > 6`; `x < 11`; `x <= 6`; `x = 6`
- Distractor Rationale: Unneeded flip; stops after subtracting coefficient; wrong endpoint; boundary-only answer.
- Randomization Rules: Use positive coefficient and clean boundary.
- Validity Constraints: Coefficient positive; solution boundary integer.
- Metadata: phase_id=P007; prerequisites=[P002 multi-step equations, inequality graphing]; misconception_tags=[unneeded flip, stops early, endpoint error]; randomization_constraints=[positive coefficient].
- Graph/Visual Variant: Open circle at 6, shade left.
- Modeling Variant: Fixed plus rate must stay below a limit.
- Reverse Variant: Given `x < 6`, build `2x+5<17`.
- Equation Battle Variant: Cards `-5`, `/2`; no flip.
- Multi-stage Boss Variant: Solve, graph, test boundary.
- Hint Mapping: H-P007-T007
- Tutorial Mapping: Tut-P007 sections Multi-step Inequalities
- Socratic Mapping: Soc-P007 multi-step branch

## Template T008 - Two-step inequality with negative coefficient
- Template ID: P007-T008
- Question Type: Direct computation
- Cognitive Skill: Sequence and flip
- Difficulty: 3
- Estimated Time: 55 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve `-ax + b <= c`.
- Example Question: Solve `-3x + 4 <= 19`.
- Answer: `x >= -5`.
- Explanation: Subtract 4: `-3x <= 15`. Divide by `-3` and flip: `x >= -5`.
- Distractors: `x <= -5`; `x >= 5`; `x <= 5`; `x = -5`
- Distractor Rationale: Forgets flip; sign error; both sign and flip error; boundary-only answer.
- Randomization Rules: Use negative coefficient with integer boundary.
- Validity Constraints: Negative coefficient nonzero.
- Metadata: phase_id=P007; prerequisites=[P002 negative coefficients, flip rule]; misconception_tags=[forgets flip, sign error, boundary-only answer]; randomization_constraints=[negative coefficient].
- Graph/Visual Variant: Closed circle at -5, shade right.
- Modeling Variant: Cursed stat plus bonus must be at most a limit.
- Reverse Variant: Given `x >= -5`, build `-3x+4<=19`.
- Equation Battle Variant: Cards `-4`, `/-3` with flip.
- Multi-stage Boss Variant: Require flip declaration.
- Hint Mapping: H-P007-T008
- Tutorial Mapping: Tut-P007 sections Multi-step Inequalities
- Socratic Mapping: Soc-P007 flip branch

## Template T009 - Division by negative in two-step form
- Template ID: P007-T009
- Question Type: Direct computation
- Cognitive Skill: Multiply by negative divisor and flip
- Difficulty: 4
- Estimated Time: 60 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve inequalities where the variable is divided by a negative.
- Example Question: Solve `x/(-4) + 2 > 5`.
- Answer: `x < -12`.
- Explanation: Subtract 2: `x/(-4) > 3`. Multiply by `-4` and flip: `x < -12`.
- Distractors: `x > -12`; `x < 12`; `x > 12`; `x = -12`
- Distractor Rationale: Forgets flip; sign error; both sign and flip error; boundary-only answer.
- Randomization Rules: Use `x/(-a) + b` with integer boundary.
- Validity Constraints: Negative divisor nonzero.
- Metadata: phase_id=P007; prerequisites=[negative multiplication, two-step inequalities]; misconception_tags=[forgets flip, sign error, wrong inverse operation]; randomization_constraints=[negative divisor].
- Graph/Visual Variant: Open circle at -12, shade left.
- Modeling Variant: Reversed scale transformation.
- Reverse Variant: Given `x < -12`, write `x/(-4)+2>5`.
- Equation Battle Variant: Cards `-2`, `*-4` with flip.
- Multi-stage Boss Variant: Focus on negative divisor.
- Hint Mapping: H-P007-T009
- Tutorial Mapping: Tut-P007 sections Negative Multiplication
- Socratic Mapping: Soc-P007 flip branch

## Template T010 - Distribution inequality
- Template ID: P007-T010
- Question Type: Direct computation
- Cognitive Skill: Simplify then solve inequality
- Difficulty: 3
- Estimated Time: 55 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve inequalities with parentheses.
- Example Question: Solve `2(x + 3) <= 18`.
- Answer: `x <= 6`.
- Explanation: Divide by 2 first or distribute. Using divide-first: `x + 3 <= 9`, so `x <= 6`.
- Distractors: `x >= 6`; `x <= 12`; `x < 6`; `x = 6`
- Distractor Rationale: Unneeded flip; subtracts incorrectly; endpoint error; boundary-only answer.
- Randomization Rules: Use positive outside multiplier for this template.
- Validity Constraints: Outside multiplier positive to avoid flip in this family.
- Metadata: phase_id=P007; prerequisites=[P002 grouped equations, inequality graphing]; misconception_tags=[unneeded flip, wrong inverse order, endpoint error]; randomization_constraints=[positive multiplier].
- Graph/Visual Variant: Closed circle at 6, shade left.
- Modeling Variant: A doubled grouped load must be at most 18.
- Reverse Variant: Given `x <= 6`, build `2(x+3)<=18`.
- Equation Battle Variant: Efficient path `/2`, `-3`.
- Multi-stage Boss Variant: Compare distribute-first and divide-first paths.
- Hint Mapping: H-P007-T010
- Tutorial Mapping: Tut-P007 sections Grouped Inequalities
- Socratic Mapping: Soc-P007 grouped branch

## Template T011 - Variables on both sides inequality
- Template ID: P007-T011
- Question Type: Direct computation
- Cognitive Skill: Collect variables in inequality
- Difficulty: 3
- Estimated Time: 60 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve inequalities with variable terms on both sides.
- Example Question: Solve `3x + 5 < x + 13`.
- Answer: `x < 4`.
- Explanation: Subtract `x`: `2x + 5 < 13`. Subtract 5: `2x < 8`. Divide by positive 2.
- Distractors: `x > 4`; `x < 9`; `x <= 4`; `x = 4`
- Distractor Rationale: Unneeded flip; stops early; endpoint error; boundary-only answer.
- Randomization Rules: Use different variable coefficients with positive collected coefficient.
- Validity Constraints: Collected coefficient should be positive for this family.
- Metadata: phase_id=P007; prerequisites=[P003 variable collection, inequality operations]; misconception_tags=[unneeded flip, stops early, endpoint error]; randomization_constraints=[positive collected coefficient].
- Graph/Visual Variant: Open circle at 4, shade left.
- Modeling Variant: Two score formulas where one must stay below the other.
- Reverse Variant: Given `x < 4`, build `3x+5<x+13`.
- Equation Battle Variant: Cards `-x`, `-5`, `/2`.
- Multi-stage Boss Variant: Collect variables then graph solution.
- Hint Mapping: H-P007-T011
- Tutorial Mapping: Tut-P007 sections Variables on Both Sides
- Socratic Mapping: Soc-P007 collect branch

## Template T012 - Fraction coefficient inequality
- Template ID: P007-T012
- Question Type: Direct computation
- Cognitive Skill: Use reciprocal with inequality
- Difficulty: 3
- Estimated Time: 55 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve inequalities with positive fraction coefficients.
- Example Question: Solve `(2/3)x - 1 >= 5`.
- Answer: `x >= 9`.
- Explanation: Add 1: `(2/3)x >= 6`. Multiply by positive reciprocal `3/2`, so direction stays.
- Distractors: `x <= 9`; `x >= 4`; `x > 9`; `x = 9`
- Distractor Rationale: Unneeded flip; uses coefficient instead of reciprocal; endpoint error; boundary-only answer.
- Randomization Rules: Use positive fraction coefficients with clean integer boundaries.
- Validity Constraints: Fraction coefficient positive and nonzero.
- Metadata: phase_id=P007; prerequisites=[fraction coefficients, inequality graphing]; misconception_tags=[unneeded flip, uses fraction instead of reciprocal, endpoint error]; randomization_constraints=[positive fraction coefficient].
- Graph/Visual Variant: Closed circle at 9, shade right.
- Modeling Variant: Fraction of a resource after a cost must meet a threshold.
- Reverse Variant: Given `x >= 9`, build `(2/3)x-1>=5`.
- Equation Battle Variant: Cards `+1`, `*3/2`; no flip.
- Multi-stage Boss Variant: Include reciprocal identification.
- Hint Mapping: H-P007-T012
- Tutorial Mapping: Tut-P007 sections Fraction Inequalities
- Socratic Mapping: Soc-P007 fraction branch

## Template T013 - Decimal coefficient inequality
- Template ID: P007-T013
- Question Type: Direct computation
- Cognitive Skill: Solve decimal inequality
- Difficulty: 3
- Estimated Time: 55 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve inequalities with positive decimal coefficients.
- Example Question: Solve `0.5x + 4 < 11`.
- Answer: `x < 14`.
- Explanation: Subtract 4: `0.5x < 7`. Divide by positive 0.5, equivalent to multiplying by 2.
- Distractors: `x > 14`; `x < 3.5`; `x <= 14`; `x = 14`
- Distractor Rationale: Unneeded flip; multiplies by 0.5; endpoint error; boundary-only answer.
- Randomization Rules: Use positive terminating decimal coefficients.
- Validity Constraints: Decimal coefficient positive and nonzero.
- Metadata: phase_id=P007; prerequisites=[decimal equations, inequality graphing]; misconception_tags=[unneeded flip, decimal arithmetic error, endpoint error]; randomization_constraints=[positive terminating decimal].
- Graph/Visual Variant: Open circle at 14, shade left.
- Modeling Variant: Half of a score plus bonus must stay below a cap.
- Reverse Variant: Given `x < 14`, build `0.5x+4<11`.
- Equation Battle Variant: Cards `-4`, `/0.5`; no flip.
- Multi-stage Boss Variant: Accept multiply-by-2 as equivalent.
- Hint Mapping: H-P007-T013
- Tutorial Mapping: Tut-P007 sections Decimal Inequalities
- Socratic Mapping: Soc-P007 decimal branch

## Template T014 - Match inequality to number-line graph
- Template ID: P007-T014
- Question Type: Graph matching
- Cognitive Skill: Interpret endpoint and shading
- Difficulty: 2
- Estimated Time: 40 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Match inequality notation to a number-line graph.
- Example Question: Which graph matches `x > -2`?
- Answer: Open circle at -2, shade right.
- Explanation: `>` means greater than, so shade right; no equals means open circle.
- Distractors: closed circle at -2 shade right; open circle at -2 shade left; closed circle at -2 shade left; point only at -2.
- Distractor Rationale: Endpoint error; direction error; both endpoint and direction error; treats boundary as only solution.
- Randomization Rules: Generate inequalities with all four symbols and integer boundaries.
- Validity Constraints: Graph choices must differ clearly by endpoint type or shading direction.
- Metadata: phase_id=P007; prerequisites=[number line, inequality symbols]; misconception_tags=[endpoint error, shading direction error, boundary-only answer]; randomization_constraints=[clear graph choices].
- Graph/Visual Variant: Required number-line choices.
- Modeling Variant: Choose a safe region on a map.
- Reverse Variant: Given a graph, write the inequality.
- Equation Battle Variant: Use as post-solve graphing gate.
- Multi-stage Boss Variant: Solve first, then choose graph.
- Hint Mapping: H-P007-T014
- Tutorial Mapping: Tut-P007 sections Graphing Solutions
- Socratic Mapping: Soc-P007 graph branch

## Template T015 - Interval notation conversion
- Template ID: P007-T015
- Question Type: Multiple choice
- Cognitive Skill: Convert inequality to interval notation
- Difficulty: 3
- Estimated Time: 45 seconds
- Visual Required: false
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Write one-variable inequality solutions in interval notation.
- Example Question: Write `x >= -2` in interval notation.
- Answer: `[-2, infinity)`.
- Explanation: The boundary is included, so use `[`. Infinity always uses a parenthesis.
- Distractors: `(-2, infinity)`; `(-infinity, -2]`; `[-2, infinity]`; `{ -2 }`
- Distractor Rationale: Open endpoint error; wrong direction; closes infinity; boundary-only set.
- Randomization Rules: Use simple one-sided inequalities.
- Validity Constraints: Use standard interval notation; infinity endpoints never closed.
- Metadata: phase_id=P007; prerequisites=[number line, endpoint types]; misconception_tags=[endpoint error, direction error, infinity bracket error]; randomization_constraints=[one-sided interval].
- Graph/Visual Variant: Number line paired with interval.
- Modeling Variant: Domain-like safe region.
- Reverse Variant: Convert `[-2, infinity)` back to `x >= -2`.
- Equation Battle Variant: Use after solving.
- Multi-stage Boss Variant: Solve, graph, interval notation.
- Hint Mapping: H-P007-T015
- Tutorial Mapping: Tut-P007 sections Interval Notation
- Socratic Mapping: Soc-P007 interval branch

## Template T016 - Test a proposed solution
- Template ID: P007-T016
- Question Type: True/False
- Cognitive Skill: Verify inequality solution
- Difficulty: 2
- Estimated Time: 35 seconds
- Visual Required: false
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Test a value in the original inequality.
- Example Question: Is `x = 3` a solution of `2x + 5 < 11`?
- Answer: No.
- Explanation: Substitute 3: `2(3) + 5 = 11`, and `11 < 11` is false.
- Distractors: Yes because it equals the boundary; yes because 3 is less than 11; no because inequalities cannot have boundary tests; yes because `2x < 11`.
- Distractor Rationale: Confuses equality with strict inequality; compares wrong quantities; misunderstands testing; ignores `+5`.
- Randomization Rules: Use proposed values inside, outside, and exactly at boundary.
- Validity Constraints: Prompt must use the original inequality for testing.
- Metadata: phase_id=P007; prerequisites=[substitution, inequality truth values]; misconception_tags=[boundary confusion, compares wrong quantities, ignores terms]; randomization_constraints=[clear true/false].
- Graph/Visual Variant: Plot proposed value against solution region.
- Modeling Variant: Test whether a chosen stat meets a requirement.
- Reverse Variant: Find a value that is a solution and one that is not.
- Equation Battle Variant: Use as final check stage.
- Multi-stage Boss Variant: Includes boundary test.
- Hint Mapping: H-P007-T016
- Tutorial Mapping: Tut-P007 sections Checking Inequalities
- Socratic Mapping: Soc-P007 testing branch

## Template T017 - Error detection: missed flip
- Template ID: P007-T017
- Question Type: Error detection
- Cognitive Skill: Diagnose inequality flip error
- Difficulty: 4
- Estimated Time: 60 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Correct a solution where division by a negative did not flip the symbol.
- Example Question: A player solves `-4x > 12` and writes `x > -3`. What is the error and the correct solution?
- Answer: They forgot to reverse the inequality when dividing by `-4`. Correct solution: `x < -3`.
- Explanation: Dividing by a negative reverses `>` to `<`.
- Distractors: `x > -3` is correct; `x < 3`; `x > 3`; no solution.
- Distractor Rationale: Accepts missed flip; sign error; both sign and flip error; misclassifies.
- Randomization Rules: Present wrong work involving negative multiplication or division.
- Validity Constraints: Error must be a single targeted missed flip.
- Metadata: phase_id=P007; prerequisites=[negative coefficient inequalities]; misconception_tags=[forgets flip, sign error, accepts wrong work]; randomization_constraints=[negative divisor].
- Graph/Visual Variant: Show test point `x=-4` satisfying correct solution.
- Modeling Variant: Battle replay with missed flip.
- Reverse Variant: Create a missed-flip error for another inequality.
- Equation Battle Variant: Repair the battle card and graph.
- Multi-stage Boss Variant: Identify error, fix solution, test value.
- Hint Mapping: H-P007-T017
- Tutorial Mapping: Tut-P007 sections Common Mistakes
- Socratic Mapping: Soc-P007 error branch

## Template T018 - At most modeling inequality
- Template ID: P007-T018
- Question Type: Build the model
- Cognitive Skill: Translate maximum constraint
- Difficulty: 3
- Estimated Time: 60 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Model "at most" using `<=`.
- Example Question: A player has 5 fixed gear weight and can carry at most 20 total weight. Each potion weighs 3. How many potions `p` can the player carry?
- Answer: `5 + 3p <= 20`; `p <= 5`, so the player can carry 0 through 5 whole potions.
- Explanation: "At most" means `<=`. Subtract 5 and divide by 3.
- Distractors: `p >= 5`; `p < 5`; `p <= 15`; exactly 5 only.
- Distractor Rationale: Confuses at most with at least; endpoint error; stops after subtracting; treats boundary as only solution.
- Randomization Rules: Use capacity constraints with fixed amount plus rate per item.
- Validity Constraints: Whole-count interpretation required for item counts.
- Metadata: phase_id=P007; prerequisites=[linear modeling, inequality symbols]; misconception_tags=[at most/at least confusion, stops early, boundary-only answer]; randomization_constraints=[integer max count].
- Graph/Visual Variant: Number line with whole-number marks from 0 to 5.
- Modeling Variant: Capacity, budget, or limit contexts.
- Reverse Variant: Write an "at most" story for `5+3p<=20`.
- Equation Battle Variant: Cards `-5`, `/3`; no flip; practical count check.
- Multi-stage Boss Variant: Include interpretation of all whole-number solutions.
- Hint Mapping: H-P007-T018
- Tutorial Mapping: Tut-P007 sections Modeling Inequalities
- Socratic Mapping: Soc-P007 modeling branch

## Template T019 - At least modeling inequality
- Template ID: P007-T019
- Question Type: Build the model
- Cognitive Skill: Translate minimum requirement
- Difficulty: 3
- Estimated Time: 60 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Model "at least" using `>=`.
- Example Question: A player has 12 points and earns 4 points per quest. How many quests `q` are needed to have at least 40 points?
- Answer: `12 + 4q >= 40`; `q >= 7`, so at least 7 quests.
- Explanation: "At least" means `>=`. Subtract 12 and divide by 4.
- Distractors: `q <= 7`; `q > 7`; `q >= 28`; exactly 7 only.
- Distractor Rationale: Confuses at least with at most; endpoint error; stops after subtracting; treats boundary as only solution.
- Randomization Rules: Use starting value plus positive rate with minimum threshold.
- Validity Constraints: Whole-count context should round up only if boundary is not integer; this example is exact.
- Metadata: phase_id=P007; prerequisites=[linear modeling, inequality symbols]; misconception_tags=[at most/at least confusion, endpoint error, boundary-only answer]; randomization_constraints=[minimum threshold].
- Graph/Visual Variant: Number line with whole-number marks starting at 7.
- Modeling Variant: Goal, score, budget, or requirement context.
- Reverse Variant: Write an "at least" story for `12+4q>=40`.
- Equation Battle Variant: Cards `-12`, `/4`; no flip; practical count check.
- Multi-stage Boss Variant: Include "minimum whole number" interpretation.
- Hint Mapping: H-P007-T019
- Tutorial Mapping: Tut-P007 sections Modeling Inequalities
- Socratic Mapping: Soc-P007 modeling branch

## Template T020 - Boss inequality with grouping and negative coefficient
- Template ID: P007-T020
- Question Type: Boss challenge
- Cognitive Skill: Integrated inequality solving
- Difficulty: 5
- Estimated Time: 100 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve and graph a multi-step inequality requiring distribution and a flip.
- Example Question: Boss Gate: Solve and graph `-2(x - 3) + 5 < 17`.
- Answer: `x > -3`; open circle at -3, shade right.
- Explanation: Simplify: `-2x + 6 + 5 < 17`, so `-2x + 11 < 17`. Subtract 11: `-2x < 6`. Divide by `-2` and flip: `x > -3`.
- Distractors: `x < -3`; `x > 3`; `x < 3`; `x = -3`
- Distractor Rationale: Forgets flip; sign error; both sign and flip error; boundary-only answer.
- Randomization Rules: Use grouped inequalities with negative outside coefficient and clean boundary.
- Validity Constraints: Negative coefficient nonzero; final graph must match strict or inclusive symbol.
- Metadata: phase_id=P007; prerequisites=[distribution, negative coefficient inequalities, graphing]; misconception_tags=[partial distribution, forgets flip, sign error, endpoint error]; randomization_constraints=[negative outside coefficient, integer boundary].
- Graph/Visual Variant: Boss lane with distribute, subtract, divide-flip, graph locks.
- Modeling Variant: Cursed transformation stays below a threshold.
- Reverse Variant: Create a grouped negative-coefficient inequality with solution `x > -3`.
- Equation Battle Variant: Cards distribute, `-11`, `/-2 with flip`.
- Multi-stage Boss Variant: This is the phase boss template.
- Hint Mapping: H-P007-T020
- Tutorial Mapping: Tut-P007 sections Full Phase Review
- Socratic Mapping: Soc-P007 boss branch

# Part II - Hint Bible

## H-P007-T001
- Hint 1 - Gentle Nudge: Solve almost like an equation.
- Hint 2 - Concept Reminder: Subtracting does not reverse the inequality.
- Hint 3 - Focus Hint: Remove `+5`.
- Hint 4 - Guided Next Step: Subtract 5 from both sides.
- Hint 5 - Nearly Complete: `x < 12 - 5`.
- Hint 6 - Full Solution: `x < 7`; open circle at 7, shade left.

## H-P007-T002
- Hint 1 - Gentle Nudge: Undo the `-4`.
- Hint 2 - Concept Reminder: Adding does not reverse the inequality.
- Hint 3 - Focus Hint: Add 4 to both sides.
- Hint 4 - Guided Next Step: `x >= 10 + 4`.
- Hint 5 - Nearly Complete: The endpoint is included because of `>=`.
- Hint 6 - Full Solution: `x >= 14`; closed circle at 14, shade right.

## H-P007-T003
- Hint 1 - Gentle Nudge: `x` is multiplied by positive 3.
- Hint 2 - Concept Reminder: Dividing by a positive number keeps the direction.
- Hint 3 - Focus Hint: Divide both sides by 3.
- Hint 4 - Guided Next Step: `x <= 18/3`.
- Hint 5 - Nearly Complete: The endpoint is included.
- Hint 6 - Full Solution: `x <= 6`; closed circle at 6, shade left.

## H-P007-T004
- Hint 1 - Gentle Nudge: `x` is divided by positive 5.
- Hint 2 - Concept Reminder: Multiplying by a positive number keeps the direction.
- Hint 3 - Focus Hint: Multiply both sides by 5.
- Hint 4 - Guided Next Step: `x > 3*5`.
- Hint 5 - Nearly Complete: Strict `>` means open endpoint.
- Hint 6 - Full Solution: `x > 15`; open circle at 15, shade right.

## H-P007-T005
- Hint 1 - Gentle Nudge: The coefficient is negative.
- Hint 2 - Concept Reminder: Dividing by a negative reverses the inequality.
- Hint 3 - Focus Hint: Divide by `-2` and flip `<` to `>`.
- Hint 4 - Guided Next Step: `x > 8/(-2)`.
- Hint 5 - Nearly Complete: `8/(-2) = -4`.
- Hint 6 - Full Solution: `x > -4`; open circle at -4, shade right.

## H-P007-T006
- Hint 1 - Gentle Nudge: `-x` means `-1*x`.
- Hint 2 - Concept Reminder: Multiplying or dividing by `-1` flips the inequality.
- Hint 3 - Focus Hint: Flip `>=` to `<=`.
- Hint 4 - Guided Next Step: `x <= -7`.
- Hint 5 - Nearly Complete: Closed endpoint because equality is included.
- Hint 6 - Full Solution: `x <= -7`; closed circle at -7, shade left.

## H-P007-T007
- Hint 1 - Gentle Nudge: Remove the constant before the coefficient.
- Hint 2 - Concept Reminder: Subtracting does not flip the sign.
- Hint 3 - Focus Hint: Subtract 5 from both sides.
- Hint 4 - Guided Next Step: `2x < 12`.
- Hint 5 - Nearly Complete: Divide by positive 2.
- Hint 6 - Full Solution: `x < 6`; open circle at 6, shade left.

## H-P007-T008
- Hint 1 - Gentle Nudge: Remove `+4` first.
- Hint 2 - Concept Reminder: The flip happens only when dividing by `-3`.
- Hint 3 - Focus Hint: Subtract 4 to get `-3x <= 15`.
- Hint 4 - Guided Next Step: Divide by `-3` and reverse `<=` to `>=`.
- Hint 5 - Nearly Complete: `15/(-3) = -5`.
- Hint 6 - Full Solution: `x >= -5`; closed circle at -5, shade right.

## H-P007-T009
- Hint 1 - Gentle Nudge: First remove `+2`.
- Hint 2 - Concept Reminder: Multiplying by a negative flips the inequality.
- Hint 3 - Focus Hint: `x/(-4) > 3`.
- Hint 4 - Guided Next Step: Multiply by `-4` and flip `>` to `<`.
- Hint 5 - Nearly Complete: `x < 3(-4)`.
- Hint 6 - Full Solution: `x < -12`; open circle at -12, shade left.

## H-P007-T010
- Hint 1 - Gentle Nudge: The group `(x+3)` is multiplied by positive 2.
- Hint 2 - Concept Reminder: Dividing by positive 2 does not flip.
- Hint 3 - Focus Hint: Divide both sides by 2.
- Hint 4 - Guided Next Step: `x + 3 <= 9`.
- Hint 5 - Nearly Complete: Subtract 3.
- Hint 6 - Full Solution: `x <= 6`; closed circle at 6, shade left.

## H-P007-T011
- Hint 1 - Gentle Nudge: Collect the variable terms first.
- Hint 2 - Concept Reminder: Subtracting `x` does not flip the inequality.
- Hint 3 - Focus Hint: `2x + 5 < 13`.
- Hint 4 - Guided Next Step: Subtract 5 from both sides.
- Hint 5 - Nearly Complete: `2x < 8`, then divide by positive 2.
- Hint 6 - Full Solution: `x < 4`; open circle at 4, shade left.

## H-P007-T012
- Hint 1 - Gentle Nudge: Remove the `-1` first.
- Hint 2 - Concept Reminder: Multiplying by positive `3/2` does not flip.
- Hint 3 - Focus Hint: `(2/3)x >= 6`.
- Hint 4 - Guided Next Step: Multiply by `3/2`.
- Hint 5 - Nearly Complete: `x >= 6*(3/2)`.
- Hint 6 - Full Solution: `x >= 9`; closed circle at 9, shade right.

## H-P007-T013
- Hint 1 - Gentle Nudge: Remove the `+4` first.
- Hint 2 - Concept Reminder: Dividing by positive `0.5` does not flip.
- Hint 3 - Focus Hint: `0.5x < 7`.
- Hint 4 - Guided Next Step: Divide by 0.5, or multiply by 2.
- Hint 5 - Nearly Complete: `x < 14`.
- Hint 6 - Full Solution: `x < 14`; open circle at 14, shade left.

## H-P007-T014
- Hint 1 - Gentle Nudge: `>` means values greater than the boundary.
- Hint 2 - Concept Reminder: Greater values are to the right.
- Hint 3 - Focus Hint: The boundary is -2.
- Hint 4 - Guided Next Step: Use an open circle because equality is not included.
- Hint 5 - Nearly Complete: Shade right from -2.
- Hint 6 - Full Solution: Open circle at -2, shade right.

## H-P007-T015
- Hint 1 - Gentle Nudge: The solution starts at -2 and goes right.
- Hint 2 - Concept Reminder: `>=` includes the endpoint.
- Hint 3 - Focus Hint: Use `[` at -2.
- Hint 4 - Guided Next Step: Infinity always gets a parenthesis.
- Hint 5 - Nearly Complete: `[-2, infinity)`.
- Hint 6 - Full Solution: `[-2, infinity)`.

## H-P007-T016
- Hint 1 - Gentle Nudge: Substitute the proposed value into the original inequality.
- Hint 2 - Concept Reminder: Strict `<` does not allow equality.
- Hint 3 - Focus Hint: Compute `2(3)+5`.
- Hint 4 - Guided Next Step: The left side is 11.
- Hint 5 - Nearly Complete: Check whether `11 < 11` is true.
- Hint 6 - Full Solution: No; `11 < 11` is false.

## H-P007-T017
- Hint 1 - Gentle Nudge: Look at the sign of the number used for division.
- Hint 2 - Concept Reminder: Dividing by a negative flips the inequality.
- Hint 3 - Focus Hint: `-4x > 12` requires division by `-4`.
- Hint 4 - Guided Next Step: Flip `>` to `<`.
- Hint 5 - Nearly Complete: `x < -3`.
- Hint 6 - Full Solution: The error is missing the flip; correct solution is `x < -3`.

## H-P007-T018
- Hint 1 - Gentle Nudge: "At most" means the total cannot exceed 20.
- Hint 2 - Concept Reminder: Use `<=` for at most.
- Hint 3 - Focus Hint: Total weight is `5 + 3p`.
- Hint 4 - Guided Next Step: Write `5 + 3p <= 20`.
- Hint 5 - Nearly Complete: `3p <= 15`, so `p <= 5`.
- Hint 6 - Full Solution: `p <= 5`; whole-number choices are 0, 1, 2, 3, 4, 5.

## H-P007-T019
- Hint 1 - Gentle Nudge: "At least" means the total must reach or exceed 40.
- Hint 2 - Concept Reminder: Use `>=` for at least.
- Hint 3 - Focus Hint: Total points are `12 + 4q`.
- Hint 4 - Guided Next Step: Write `12 + 4q >= 40`.
- Hint 5 - Nearly Complete: `4q >= 28`, so `q >= 7`.
- Hint 6 - Full Solution: The player needs at least 7 quests.

## H-P007-T020
- Hint 1 - Gentle Nudge: Start by simplifying the left side.
- Hint 2 - Concept Reminder: The flip happens when dividing by `-2`.
- Hint 3 - Focus Hint: `-2(x-3)+5` becomes `-2x + 11`.
- Hint 4 - Guided Next Step: Subtract 11 to get `-2x < 6`.
- Hint 5 - Nearly Complete: Divide by `-2` and flip.
- Hint 6 - Full Solution: `x > -3`; open circle at -3, shade right.

# Part III - Tutorial Bible

## Learning Goal
Learn to solve, graph, and interpret linear inequalities while remembering when the inequality direction must reverse.

## Why It Matters
Inequalities describe limits, requirements, safe zones, budgets, thresholds, and ranges. They are the algebra of "more than enough," "not too much," and "allowed values," which makes them essential for game constraints and later domain/range reasoning.

## Prerequisite Check
Ask the player:

1. Solve `x + 5 = 12`. Expected: `x = 7`.
2. Which values are less than 7: values left or right of 7 on a number line? Expected: left.
3. Does `x < 7` include 7? Expected: no.
4. Does `x <= 7` include 7? Expected: yes.
5. What happens to an inequality when dividing by a negative? Expected: it reverses.

## Core Concept
Solving an inequality uses the same inverse-operation ideas as solving an equation, but the answer is a set of values.

Example:

`2x + 5 < 17`
`2x < 12`
`x < 6`

The boundary is 6. Since the symbol is `<`, use an open circle at 6 and shade left.

## The Flip Rule
The inequality direction reverses only when multiplying or dividing both sides by a negative.

Example:

`-2x < 8`
`x > -4`

A quick reason: if `2 < 5`, multiplying by `-1` gives `-2 > -5`. The order reverses on the number line.

## Graphing Solutions
- `<`: open circle, shade left.
- `<=`: closed circle, shade left.
- `>`: open circle, shade right.
- `>=`: closed circle, shade right.

Open means the boundary is not included. Closed means the boundary is included.

## Interval Notation
- `x < 6` is `(-infinity, 6)`.
- `x <= 6` is `(-infinity, 6]`.
- `x > -2` is `(-2, infinity)`.
- `x >= -2` is `[-2, infinity)`.

Infinity always uses a parenthesis.

## Checking Inequalities
Test values in the original inequality.

For `2x + 5 < 17`, the solution is `x < 6`.

Try `x = 5`: `2(5)+5 = 15`, and `15 < 17` is true.
Try boundary `x = 6`: `17 < 17` is false, so 6 is not included.

## Common Mistakes
- Mistake: Flipping after adding or subtracting.
  Correction: Flip only after multiplying or dividing by a negative.
- Mistake: Forgetting to flip after dividing by a negative.
  Correction: Circle the negative divisor before dividing.
- Mistake: Using a closed circle for `<`.
  Correction: Strict inequalities use open circles.
- Mistake: Treating the boundary as the only solution.
  Correction: Inequalities usually describe infinitely many values.
- Mistake: Confusing "at most" and "at least."
  Correction: At most is `<=`; at least is `>=`.

## Guided Practice
1. Solve `x - 3 > 10`.
   - Add 3: `x > 13`.
   - Open circle at 13, shade right.

2. Solve `4x <= 20`.
   - Divide by positive 4: `x <= 5`.
   - Closed circle at 5, shade left.

3. Solve `-5x >= 15`.
   - Divide by `-5` and flip: `x <= -3`.
   - Closed circle at -3, shade left.

## Independent Practice
1. `x + 8 < 20`; answer `x < 12`.
2. `3x >= -9`; answer `x >= -3`.
3. `-2x <= 10`; answer `x >= -5`.
4. `5 + 2x > 17`; answer `x > 6`.
5. `-4(x+1) < 8`; answer `x > -3`.

## Mastery Check
The player is ready to advance when they can:

1. Solve at least 4 of 5 mixed linear inequalities.
2. Correctly flip after multiplying or dividing by a negative.
3. Graph with correct endpoint and shading direction.
4. Convert one solution to interval notation.
5. Translate at least one "at most" or "at least" context.

Mastery check set:

1. `x - 6 <= 4`; solution `x <= 10`.
2. `2x + 3 > 15`; solution `x > 6`.
3. `-3x < 12`; solution `x > -4`.
4. `x/(-5) >= 2`; solution `x <= -10`.
5. `9 + 2p <= 25`; solution `p <= 8`.

## Adaptive Tutor Messages
- If the player flips after adding: "Addition and subtraction keep the order; the flip only comes from multiplying or dividing by a negative."
- If the player forgets the negative flip: "You divided by a negative. The number line order reverses."
- If the player uses the wrong endpoint: "Check whether equality is included in the symbol."
- If the player shades the wrong way: "Pick a test value on that side and see whether it works."
- If the player gives only the boundary: "The boundary helps draw the solution, but the answer is a whole region."
- If the player succeeds quickly: "You are ready for compound inequalities, where two bounds work together."

## Tutorial Metadata
- Tutorial ID: Tut-P007
- Estimated duration: 5 minutes
- Target player state: can solve equations and is learning inequality solution sets
- Unlock condition: available from any Phase 007 question
- Remediation trigger: two missed flips, two endpoint errors, two shading errors, or one at most/at least reversal
- Advancement trigger: 80 percent accuracy on mixed inequalities plus correct graphing of strict and inclusive examples

# Part IV - Socratic Dialogue Bible

## Opening Diagnostic
Tutor: "When solving `-2x < 8`, what operation isolates `x`, and what must happen to the inequality symbol?"

Expected strong answer: "Divide by `-2`, and the symbol flips, so `x > -4`."

## Guided Discovery
Tutor sequence:

1. "What operation is attached to the variable?"
2. "What inverse operation removes it?"
3. "Is the number we multiply or divide by positive or negative?"
4. "Should the inequality direction stay or reverse?"
5. "What is the boundary value?"
6. "Is the boundary included?"
7. "Should the graph shade left or right?"
8. "Can we test a value to confirm the direction?"

## Correct Branch
Player: "Divide by negative 2 and flip."

Tutor: "Good. What does `8 divided by -2` equal?"

If player says `-4`, ask: "After the flip, is the answer `x < -4` or `x > -4`?"

Exit when player gives `x > -4` and graphs it.

## Partial Understanding Branch
Player divides by `-2` but forgets to mention the flip.

Tutor: "You chose the right inverse operation. What special rule applies because the divisor is negative?"

If player recalls the flip, continue.

## Misconception Branch
Player writes `x < -4`.

Tutor: "Let's test a value. If `x = 0`, the original inequality becomes `0 < 8`, which is true. Is 0 greater than -4 or less than -4?"

Recovery target: Player sees the correct direction is `x > -4`.

## Unsure Branch
Player: "I don't know."

Tutor: "Start with the sign of the coefficient. Is `-2` positive or negative?"

If player answers negative: "Right. What happens when we divide an inequality by a negative?"

## Unrelated Response Branch
Player gives an unrelated answer.

Tutor: "Let's focus on the symbol. In `-2x < 8`, are we dividing by a positive number or a negative number?"

If unrelated again, give a two-choice prompt: "Does the inequality stay the same or flip when dividing by a negative?"

## Recovery Prompts
- "What inverse operation isolates the variable?"
- "Is the multiplier or divisor negative?"
- "Does equality belong in the answer?"
- "Which way should the number line be shaded?"
- "What test value confirms the direction?"
- "Does the context require whole-number answers?"

## Reflection Question
"Why does multiplying or dividing by a negative reverse an inequality?"

Strong reflection: "Negative multiplication reverses order on the number line; numbers that were larger become smaller after the sign flip."

## Transfer Question
"How will this prepare you for compound inequalities?"

Expected transfer: "I will need to solve and graph inequalities while tracking endpoints and directions, sometimes with two boundaries."

## Escalation Rules
- If the player misses the flip twice, show The Flip Rule.
- If endpoint errors repeat, show Graphing Solutions.
- If shading errors repeat, ask for test values.
- If interval notation errors repeat, show Interval Notation.
- If context language errors repeat, show Modeling Inequalities.
- If the player solves and graphs three mixed inequalities correctly, advance to independent practice.

## Exit Condition
The Socratic sequence is complete when the player:

1. Solves the inequality with valid operations.
2. Applies the flip rule only when needed.
3. Identifies endpoint type.
4. Shades the correct direction.
5. Checks with a test value or context interpretation.

# Knowledge Graph

- Prerequisites: Phase 001 one-step equations; Phase 002 multi-step equations; Phase 003 variables on both sides; Phase 006 Equation Battle fundamentals; signed arithmetic; number line reading
- Concepts Unlocked: inequality solution sets; boundary values; strict versus inclusive endpoints; number-line graphing; interval notation; negative multiplication flip; at most and at least modeling
- Related Concepts: compound inequalities; absolute value inequalities; domain restrictions; graph intervals; linear programming constraints
- Common Misconceptions: missed negative flip; unnecessary flip after addition/subtraction; endpoint errors; shading direction errors; boundary-only answer; at most/at least reversal; impractical context interpretation
- Remedial Phases: Phase 001 review; Phase 002 review; signed-number review; number-line mini-lesson; inequality symbol mini-lesson
- Follow-up Phases: Phase 008 - Compound inequalities; Phase 010 - Absolute value inequalities; Phase 015 - Domain from formulas; Phase 016 - Domain from graphs
- Transfer Topics: interval notation; domain and range; constraints in modeling; optimization; graph solution regions

# Validation Notes

## Structure Validation
- Includes all required Bibles and metadata sections.
- Contains exactly 20 template families, within the required 20-40 range.
- Each template includes example, answer, explanation, distractors, distractor rationale, randomization rules, validity constraints, metadata, variants, and mappings.
- Every template has six progressive hints.

## Math Validation
- T001: `x+5<12` -> `x<7`.
- T002: `x-4>=10` -> `x>=14`.
- T003: `3x<=18` -> `x<=6`.
- T004: `x/5>3` -> `x>15`.
- T005: `-2x<8` -> divide by `-2` and flip -> `x>-4`.
- T006: `-x>=7` -> multiply by `-1` and flip -> `x<=-7`.
- T007: `2x+5<17` -> `x<6`.
- T008: `-3x+4<=19` -> `-3x<=15` -> `x>=-5`.
- T009: `x/(-4)+2>5` -> `x/(-4)>3` -> `x<-12`.
- T010: `2(x+3)<=18` -> `x+3<=9` -> `x<=6`.
- T011: `3x+5<x+13` -> `2x<8` -> `x<4`.
- T012: `(2/3)x-1>=5` -> `(2/3)x>=6` -> `x>=9`.
- T013: `0.5x+4<11` -> `0.5x<7` -> `x<14`.
- T014: `x>-2` maps to open circle at -2 and shade right.
- T015: `x>=-2` maps to `[-2, infinity)`.
- T016: `x=3` in `2x+5<11` gives `11<11`, false.
- T017: `-4x>12` -> `x<-3`; missed-flip answer is wrong.
- T018: `5+3p<=20` -> `p<=5`, whole-number potions 0 through 5.
- T019: `12+4q>=40` -> `q>=7`, so at least 7 quests.
- T020: `-2(x-3)+5<17` -> `-2x+11<17` -> `x>-3`.

## Distractor Validation
- Distractors reflect missed flips, unnecessary flips, endpoint errors, shading errors, boundary-only answers, and at most/at least confusion.
- Multiple-choice-style templates have exactly one correct answer.
- Graph and interval distractors differ by meaningful misconception.

## Hint Validation
- Each hint sequence progresses from structure recognition to operation, flip decision, boundary, endpoint type, and full graph or interpretation.
- Early hints do not reveal final direction until the flip decision is established.

## Tutorial Validation
- Tutorial includes learning goal, prerequisite check, why it matters, core concept, flip rule, graphing, interval notation, checking, common mistakes, guided practice, independent practice, mastery check, adaptive messages, and metadata.

## Socratic Validation
- Dialogue includes diagnostic, guided discovery, correct branch, partial branch, misconception branch, unsure branch, unrelated branch, recovery prompts, reflection, transfer, escalation rules, and exit condition.
- Tutor emphasizes the negative-divisor flip with test-value recovery.

## Metadata Validation
- Every template includes IDs, difficulty, timing, visual flag, compatibility flags, prerequisites, misconception tags, randomization constraints, and support-system mappings.

## Known Issues
- The repository specifications differ on the label for Hint 4. This phase uses "Guided Next Step" to match the master prompt language.
- `PHASE_TEMPLATE.md` omits Common Misconceptions from the Knowledge Graph section, but this phase includes it because the master prompt and knowledge graph guide require it.
