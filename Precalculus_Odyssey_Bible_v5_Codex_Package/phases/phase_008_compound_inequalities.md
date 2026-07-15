# Phase 008 - Compound Inequalities

## Phase Metadata
- Course: Precalculus Odyssey Bible v5
- Topic: Compound inequalities
- Subtopic: Solving, graphing, and interpreting "and" and "or" inequality statements
- Prerequisites: Phase 007 linear inequalities, number-line graphing, interval notation, inequality flip rule, set union and intersection intuition
- Related phases: Phase 009 - Absolute value equations; Phase 010 - Absolute value inequalities; Phase 015 - Domain from formulas; Phase 016 - Domain from graphs
- Estimated phase size: 20 template families, 20 core examples, 120 progressive hints, 1 tutorial sequence, 1 Socratic dialogue system

## Learning Objectives
By the end of this phase, the player can:

1. Interpret compound inequalities joined by "and" as intersections.
2. Interpret compound inequalities joined by "or" as unions.
3. Solve three-part inequalities by applying operations to all three parts.
4. Reverse inequality directions correctly when multiplying or dividing all parts by a negative.
5. Graph compound solution sets on a number line.
6. Write compound solutions in interval notation.
7. Identify no-solution and all-real-number compound cases.
8. Translate range constraints from contexts into compound inequalities.

## Prerequisite Review
- `x < 5` shades left; `x > 5` shades right.
- `<` and `>` use open endpoints; `<=` and `>=` use closed endpoints.
- Dividing by a negative reverses inequality direction.
- "And" means a value must satisfy both conditions.
- "Or" means a value may satisfy either condition.

## Core Concepts
- An "and" compound inequality describes overlap.
- An "or" compound inequality describes a union of regions.
- Three-part inequalities such as `1 < x + 3 < 9` are solved by doing the same operation to all three parts.
- If an "and" compound has no overlap, the solution is empty.
- If an "or" compound covers everything, the solution is all real numbers.

## Common Misconceptions
- Treating "and" like "or."
- Treating "or" like "and."
- Applying an operation to only the middle part of a three-part inequality.
- Forgetting to flip both inequality symbols when dividing all parts by a negative.
- Using the wrong endpoint type in interval notation.
- Writing two disconnected intervals as one interval.
- Missing no-solution cases for non-overlapping "and" statements.
- Missing all-real cases for complementary "or" statements.

# Part I - Question Bible

## Template T001 - Interpret a simple bounded inequality
- Template ID: P008-T001
- Question Type: Graph interpretation
- Cognitive Skill: Read bounded interval
- Difficulty: 1
- Estimated Time: 30 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Interpret `a < x < b` as values between two bounds.
- Example Question: Graph and describe `-2 < x < 5`.
- Answer: Open circles at -2 and 5; shade between them; interval `(-2, 5)`.
- Explanation: Both symbols are strict, so neither endpoint is included.
- Distractors: `[-2,5]`; shade outside; `x < -2 or x > 5`; points only at -2 and 5.
- Distractor Rationale: Endpoint error; outside/inside confusion; treats bounded "and" as "or"; boundary-only answer.
- Randomization Rules: Use strict bounds with `a < b`.
- Validity Constraints: Lower bound must be less than upper bound.
- Metadata: phase_id=P008; prerequisites=[P007 graphing, interval notation]; misconception_tags=[endpoint error, and/or confusion, shading error]; randomization_constraints=[a<b].
- Graph/Visual Variant: Required bounded number-line graph.
- Modeling Variant: Safe zone between two coordinates.
- Reverse Variant: Given graph `(-2,5)`, write `-2 < x < 5`.
- Equation Battle Variant: Use as post-solve graph gate.
- Multi-stage Boss Variant: Ask for inequality, graph, and interval notation.
- Hint Mapping: H-P008-T001
- Tutorial Mapping: Tut-P008 sections Core Concept
- Socratic Mapping: Soc-P008 bounded branch

## Template T002 - Solve three-part addition inequality
- Template ID: P008-T002
- Question Type: Direct computation
- Cognitive Skill: Apply operation to all three parts
- Difficulty: 2
- Estimated Time: 45 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve `a < x + c < b`.
- Example Question: Solve and graph `1 < x + 3 < 9`.
- Answer: `-2 < x < 6`; interval `(-2, 6)`.
- Explanation: Subtract 3 from all three parts: `1 - 3 < x < 9 - 3`.
- Distractors: `4 < x < 12`; `x < 6`; `-2 < x`; `[-2,6]`
- Distractor Rationale: Adds instead of subtracts; solves only right half; solves only left half; endpoint error.
- Randomization Rules: Choose lower `a`, upper `b`, shift `c`, and ensure `a < b`.
- Validity Constraints: Apply operation to all three parts.
- Metadata: phase_id=P008; prerequisites=[P007 inequalities, three-part notation]; misconception_tags=[middle-only operation, one-sided solving, endpoint error]; randomization_constraints=[a<b].
- Graph/Visual Variant: Open interval graph.
- Modeling Variant: Stat plus bonus must stay between two limits.
- Reverse Variant: Given `-2 < x < 6`, write `1 < x+3 < 9`.
- Equation Battle Variant: Card `-3 all three parts`.
- Multi-stage Boss Variant: Solve, graph, interval notation.
- Hint Mapping: H-P008-T002
- Tutorial Mapping: Tut-P008 sections Three-Part Inequalities
- Socratic Mapping: Soc-P008 three-part branch

## Template T003 - Solve three-part multiplication inequality
- Template ID: P008-T003
- Question Type: Direct computation
- Cognitive Skill: Divide all three parts by positive number
- Difficulty: 2
- Estimated Time: 45 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve `a <= kx < b` with positive `k`.
- Example Question: Solve `-4 <= 2x < 10`.
- Answer: `-2 <= x < 5`; interval `[-2, 5)`.
- Explanation: Divide all three parts by positive 2, keeping directions the same.
- Distractors: `-2 >= x > 5`; `x < 5`; `-2 < x <= 5`; `[-2,5]`
- Distractor Rationale: Unneeded flip; solves one side only; swaps endpoint types; closes both endpoints.
- Randomization Rules: Use positive coefficient with mixed endpoint types.
- Validity Constraints: Positive coefficient nonzero; lower bound less than upper.
- Metadata: phase_id=P008; prerequisites=[positive coefficient inequalities, interval notation]; misconception_tags=[unneeded flip, endpoint error, one-sided solving]; randomization_constraints=[k positive].
- Graph/Visual Variant: Closed at -2, open at 5, shade between.
- Modeling Variant: Doubled stat between lower and upper limits.
- Reverse Variant: Given `[-2,5)`, build `-4 <= 2x < 10`.
- Equation Battle Variant: Card `/2 all three parts`.
- Multi-stage Boss Variant: Include endpoint-type check.
- Hint Mapping: H-P008-T003
- Tutorial Mapping: Tut-P008 sections Three-Part Inequalities
- Socratic Mapping: Soc-P008 three-part branch

## Template T004 - Solve three-part negative multiplication inequality
- Template ID: P008-T004
- Question Type: Direct computation
- Cognitive Skill: Flip both symbols and reorder
- Difficulty: 4
- Estimated Time: 70 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve a three-part inequality when dividing by a negative.
- Example Question: Solve `-8 <= -2x < 6`.
- Answer: `-3 < x <= 4`; interval `(-3, 4]`.
- Explanation: Divide all parts by `-2`, flipping both symbols: `4 >= x > -3`. Rewrite in increasing order as `-3 < x <= 4`.
- Distractors: `4 <= x < -3`; `-4 <= x < 3`; `-3 <= x < 4`; `x <= 4 or x > -3`
- Distractor Rationale: Fails to reorder; sign error; endpoint errors after flip; treats bounded statement as or.
- Randomization Rules: Use negative coefficient and bounds that produce clean endpoints.
- Validity Constraints: Both inequality symbols must be flipped; final answer should be ordered lower to upper.
- Metadata: phase_id=P008; prerequisites=[negative flip rule, interval notation]; misconception_tags=[missed flip, reorder error, endpoint error]; randomization_constraints=[negative coefficient].
- Graph/Visual Variant: Open at -3, closed at 4, shade between.
- Modeling Variant: Reversed scale stat must remain within a range.
- Reverse Variant: Given `-3 < x <= 4`, build `-8 <= -2x < 6`.
- Equation Battle Variant: Card `/-2 all parts with double flip`.
- Multi-stage Boss Variant: Divide, reorder, graph.
- Hint Mapping: H-P008-T004
- Tutorial Mapping: Tut-P008 sections Negative Three-Part Inequalities
- Socratic Mapping: Soc-P008 flip branch

## Template T005 - And statement with overlap
- Template ID: P008-T005
- Question Type: Graph matching
- Cognitive Skill: Intersect two inequalities
- Difficulty: 2
- Estimated Time: 45 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Graph `x > a and x <= b`.
- Example Question: Graph `x > 1 and x <= 6`.
- Answer: `(1, 6]`; open circle at 1, closed circle at 6, shade between.
- Explanation: "And" means values must satisfy both conditions, so use the overlap.
- Distractors: `(-infinity,1) union (6,infinity)`; `[1,6]`; `(1,infinity)`; `(-infinity,6]`
- Distractor Rationale: Uses outside union; endpoint error; uses first condition only; uses second condition only.
- Randomization Rules: Use one lower-bound and one upper-bound inequality with overlap.
- Validity Constraints: Lower boundary less than upper boundary.
- Metadata: phase_id=P008; prerequisites=[and means intersection, graphing]; misconception_tags=[and/or confusion, endpoint error, one-condition answer]; randomization_constraints=[overlap exists].
- Graph/Visual Variant: Required overlap graph.
- Modeling Variant: Acceptable stat range above minimum and at most maximum.
- Reverse Variant: Given `(1,6]`, write `x>1 and x<=6`.
- Equation Battle Variant: Use as graph-classification gate.
- Multi-stage Boss Variant: Identify overlap and interval notation.
- Hint Mapping: H-P008-T005
- Tutorial Mapping: Tut-P008 sections And Means Overlap
- Socratic Mapping: Soc-P008 and-branch

## Template T006 - And statement with no overlap
- Template ID: P008-T006
- Question Type: Number of solutions
- Cognitive Skill: Detect empty intersection
- Difficulty: 3
- Estimated Time: 50 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Recognize no solution when "and" regions do not overlap.
- Example Question: Solve `x < 2 and x > 5`.
- Answer: No solution; interval notation is the empty set.
- Explanation: No number is both less than 2 and greater than 5.
- Distractors: `2 < x < 5`; `x < 2 or x > 5`; all real numbers; `{2,5}`
- Distractor Rationale: Shades between instead of overlap; changes and to or; misreads contradiction as all values; boundary-only answer.
- Randomization Rules: Use contradictory "and" statements with separated bounds.
- Validity Constraints: Conditions must be impossible together.
- Metadata: phase_id=P008; prerequisites=[intersection, number line]; misconception_tags=[and/or confusion, false between-region, boundary-only answer]; randomization_constraints=[empty intersection].
- Graph/Visual Variant: Two non-overlapping shaded regions with no shared area.
- Modeling Variant: Impossible requirement: lower than one cap and above a larger minimum.
- Reverse Variant: Create an impossible "and" statement.
- Equation Battle Variant: Classification gate.
- Multi-stage Boss Variant: Explain why no test value works.
- Hint Mapping: H-P008-T006
- Tutorial Mapping: Tut-P008 sections No Overlap
- Socratic Mapping: Soc-P008 no-solution branch

## Template T007 - Or statement with two rays
- Template ID: P008-T007
- Question Type: Graph matching
- Cognitive Skill: Union two inequalities
- Difficulty: 2
- Estimated Time: 45 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Graph disjoint "or" solutions.
- Example Question: Graph `x < -1 or x >= 4`.
- Answer: `(-infinity, -1) union [4, infinity)`.
- Explanation: "Or" means values can satisfy either condition.
- Distractors: `[-1,4)`; `(-1,4]`; `(-infinity,-1] union (4,infinity)`; no solution
- Distractor Rationale: Uses overlap/between; endpoint errors; misclassifies.
- Randomization Rules: Use two one-sided inequalities pointing outward.
- Validity Constraints: Intervals should be disjoint for this template.
- Metadata: phase_id=P008; prerequisites=[or means union, interval notation]; misconception_tags=[and/or confusion, endpoint error, no-solution confusion]; randomization_constraints=[disjoint rays].
- Graph/Visual Variant: Required two-ray graph.
- Modeling Variant: Danger zones outside a safe interval.
- Reverse Variant: Given graph, write `x<-1 or x>=4`.
- Equation Battle Variant: Use after solving split cases.
- Multi-stage Boss Variant: Graph and interval notation.
- Hint Mapping: H-P008-T007
- Tutorial Mapping: Tut-P008 sections Or Means Union
- Socratic Mapping: Soc-P008 or-branch

## Template T008 - Or statement covering all real numbers
- Template ID: P008-T008
- Question Type: Number of solutions
- Cognitive Skill: Detect full union
- Difficulty: 4
- Estimated Time: 55 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Recognize when an "or" statement covers every real number.
- Example Question: Solve `x < 3 or x >= 3`.
- Answer: All real numbers; interval `(-infinity, infinity)`.
- Explanation: Every number is either less than 3 or at least 3.
- Distractors: no solution; `x = 3`; `x < 3`; `x > 3`
- Distractor Rationale: Confuses full coverage with contradiction; boundary-only answer; uses one condition only.
- Randomization Rules: Use complementary conditions that meet at a boundary with one side inclusive.
- Validity Constraints: Union must cover all real values.
- Metadata: phase_id=P008; prerequisites=[union, endpoint logic]; misconception_tags=[or/all-real confusion, one-condition answer, boundary-only answer]; randomization_constraints=[complete coverage].
- Graph/Visual Variant: Entire number line shaded.
- Modeling Variant: Two allowed zones cover all possible values.
- Reverse Variant: Create an "or" statement that covers all real numbers.
- Equation Battle Variant: Classification gate.
- Multi-stage Boss Variant: Ask for a test value below, at, and above the boundary.
- Hint Mapping: H-P008-T008
- Tutorial Mapping: Tut-P008 sections All Real Unions
- Socratic Mapping: Soc-P008 all-real branch

## Template T009 - Convert interval to compound inequality
- Template ID: P008-T009
- Question Type: Multiple choice
- Cognitive Skill: Translate interval notation
- Difficulty: 2
- Estimated Time: 40 seconds
- Visual Required: false
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Convert interval notation to a compound inequality.
- Example Question: Write `[2, 7)` as a compound inequality.
- Answer: `2 <= x < 7`.
- Explanation: Bracket at 2 includes 2; parenthesis at 7 excludes 7.
- Distractors: `2 < x <= 7`; `2 < x < 7`; `x <= 2 or x > 7`; `2 <= x <= 7`
- Distractor Rationale: Swaps endpoint types; makes both open; changes bounded interval to outside union; closes upper endpoint.
- Randomization Rules: Use bounded intervals with mixed endpoint types.
- Validity Constraints: Lower endpoint less than upper endpoint.
- Metadata: phase_id=P008; prerequisites=[interval notation, endpoint types]; misconception_tags=[endpoint error, and/or confusion, direction error]; randomization_constraints=[bounded interval].
- Graph/Visual Variant: Interval notation card paired with number line.
- Modeling Variant: Convert allowed stat range into inequalities.
- Reverse Variant: Convert `2 <= x < 7` to `[2,7)`.
- Equation Battle Variant: Post-solve representation gate.
- Multi-stage Boss Variant: Interval, graph, inequality.
- Hint Mapping: H-P008-T009
- Tutorial Mapping: Tut-P008 sections Interval Conversion
- Socratic Mapping: Soc-P008 interval branch

## Template T010 - Match graph to compound statement
- Template ID: P008-T010
- Question Type: Graph matching
- Cognitive Skill: Read union versus intersection from graph
- Difficulty: 3
- Estimated Time: 50 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Identify the compound statement from a number-line graph.
- Example Question: A graph has a closed circle at -4 shaded left and an open circle at 2 shaded right. Which statement matches?
- Answer: `x <= -4 or x > 2`.
- Explanation: Two separated rays mean an "or" union.
- Distractors: `-4 <= x < 2`; `x < -4 and x > 2`; `x >= -4 or x < 2`; `[-4,2)`
- Distractor Rationale: Treats outside rays as between; impossible "and"; reverses directions; interval for between region.
- Randomization Rules: Generate number-line graphs with two rays or one bounded interval.
- Validity Constraints: Visual must clearly show endpoint type and shading.
- Metadata: phase_id=P008; prerequisites=[number-line graphing, union/intersection]; misconception_tags=[graph direction error, and/or confusion, endpoint error]; randomization_constraints=[clear endpoints].
- Graph/Visual Variant: Required graph.
- Modeling Variant: Identify allowed danger-zone ranges.
- Reverse Variant: Draw graph for `x<=-4 or x>2`.
- Equation Battle Variant: Representation choice after solve.
- Multi-stage Boss Variant: Graph to inequality and interval notation.
- Hint Mapping: H-P008-T010
- Tutorial Mapping: Tut-P008 sections Graph Reading
- Socratic Mapping: Soc-P008 graph branch

## Template T011 - Solve separated and statement
- Template ID: P008-T011
- Question Type: Direct computation
- Cognitive Skill: Solve two inequalities and intersect
- Difficulty: 3
- Estimated Time: 65 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve a compound "and" statement written as two inequalities.
- Example Question: Solve `2x - 1 > 5 and 2x - 1 <= 13`.
- Answer: `3 < x <= 7`; interval `(3, 7]`.
- Explanation: First inequality gives `x > 3`; second gives `x <= 7`; the overlap is `3 < x <= 7`.
- Distractors: `x > 3 or x <= 7`; `x <= 7`; `x > 3`; `[3,7]`
- Distractor Rationale: Uses union instead of intersection; solves only one part; endpoint error.
- Randomization Rules: Use same expression bounded by two separate inequalities.
- Validity Constraints: Intersection must be nonempty.
- Metadata: phase_id=P008; prerequisites=[P007 solving, and intersection]; misconception_tags=[and/or confusion, one-condition answer, endpoint error]; randomization_constraints=[nonempty overlap].
- Graph/Visual Variant: Overlay two solution rays and keep overlap.
- Modeling Variant: Stat must be above minimum and at most maximum.
- Reverse Variant: Convert `3<x<=7` into two separate inequalities.
- Equation Battle Variant: Solve both lanes, intersect.
- Multi-stage Boss Variant: Separate solve, overlap graph, interval.
- Hint Mapping: H-P008-T011
- Tutorial Mapping: Tut-P008 sections Solving And Statements
- Socratic Mapping: Soc-P008 and-solve branch

## Template T012 - Solve separated or statement
- Template ID: P008-T012
- Question Type: Direct computation
- Cognitive Skill: Solve two inequalities and union
- Difficulty: 3
- Estimated Time: 65 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve a compound "or" statement.
- Example Question: Solve `3x + 1 < -5 or 3x + 1 >= 10`.
- Answer: `x < -2 or x >= 3`; interval `(-infinity, -2) union [3, infinity)`.
- Explanation: Solve each inequality separately, then keep both regions because the connector is "or."
- Distractors: `-2 < x < 3`; `x <= -2 or x > 3`; no solution; all real numbers
- Distractor Rationale: Uses intersection/between; endpoint errors; misclassifies disjoint union; overgeneralizes or.
- Randomization Rules: Use two inequalities with same linear expression and disjoint outcomes.
- Validity Constraints: Each branch must be solved independently.
- Metadata: phase_id=P008; prerequisites=[P007 solving, or union]; misconception_tags=[and/or confusion, endpoint error, classification error]; randomization_constraints=[two valid branches].
- Graph/Visual Variant: Two-ray graph.
- Modeling Variant: Value is outside a restricted middle range.
- Reverse Variant: Create an "or" problem with solution `x<-2 or x>=3`.
- Equation Battle Variant: Split into two battle lanes.
- Multi-stage Boss Variant: Solve left branch, solve right branch, union graph.
- Hint Mapping: H-P008-T012
- Tutorial Mapping: Tut-P008 sections Solving Or Statements
- Socratic Mapping: Soc-P008 or-solve branch

## Template T013 - Context range with decimal lower bound
- Template ID: P008-T013
- Question Type: Build the model
- Cognitive Skill: Translate between minimum and maximum
- Difficulty: 4
- Estimated Time: 75 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Model a quantity that must stay between two limits.
- Example Question: A player's load is `5 + 2t` units. The safe load range is from 10 to 25 units, inclusive. Write and solve a compound inequality for `t`.
- Answer: `10 <= 5 + 2t <= 25`; `2.5 <= t <= 10`.
- Explanation: Subtract 5 from all three parts, then divide by 2.
- Distractors: `t <= 2.5 or t >= 10`; `5 <= 2t <= 25`; `t >= 2.5`; `t <= 10`
- Distractor Rationale: Uses or instead of and; omits fixed load; solves only one bound.
- Randomization Rules: Use fixed plus rate expression between inclusive bounds.
- Validity Constraints: Lower bound must be less than upper; rate positive.
- Metadata: phase_id=P008; prerequisites=[linear modeling, three-part inequalities]; misconception_tags=[and/or confusion, ignores fixed value, one-bound answer]; randomization_constraints=[positive rate].
- Graph/Visual Variant: Closed interval from 2.5 to 10.
- Modeling Variant: Safe load, temperature, score, or mana range.
- Reverse Variant: Write a context for `10 <= 5+2t <= 25`.
- Equation Battle Variant: Cards `-5 all parts`, `/2 all parts`.
- Multi-stage Boss Variant: Model, solve, graph.
- Hint Mapping: H-P008-T013
- Tutorial Mapping: Tut-P008 sections Range Modeling
- Socratic Mapping: Soc-P008 modeling branch

## Template T014 - Practical integer range
- Template ID: P008-T014
- Question Type: Practical solution selection
- Cognitive Skill: Interpret whole-number compound solutions
- Difficulty: 4
- Estimated Time: 75 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Convert a continuous compound solution to whole-number options in context.
- Example Question: A player has 5 points and earns 3 points per quest. The reward tier requires at least 20 and at most 35 points. What whole numbers of quests work?
- Answer: `20 <= 3q + 5 <= 35`; `5 <= q <= 10`; whole quests: 5, 6, 7, 8, 9, 10.
- Explanation: Subtract 5: `15 <= 3q <= 30`; divide by 3.
- Distractors: quests 6 through 9; `q <= 10`; `q >= 5`; all real `q` from 5 to 10 without whole-number interpretation
- Distractor Rationale: Endpoint error; one-bound answer; omits practical count interpretation.
- Randomization Rules: Use whole-count contexts with inclusive bounds and positive rate.
- Validity Constraints: Final whole-number list must match context.
- Metadata: phase_id=P008; prerequisites=[modeling inequalities, integer interpretation]; misconception_tags=[endpoint error, one-bound answer, missing practical interpretation]; randomization_constraints=[integer bounds].
- Graph/Visual Variant: Number line with integer ticks highlighted.
- Modeling Variant: Quest, item, crate, or level ranges.
- Reverse Variant: Build a practical quest-range context from `5<=q<=10`.
- Equation Battle Variant: Solve range, then practical selection.
- Multi-stage Boss Variant: Include continuous interval and discrete answer.
- Hint Mapping: H-P008-T014
- Tutorial Mapping: Tut-P008 sections Practical Ranges
- Socratic Mapping: Soc-P008 practical branch

## Template T015 - Error detection: and/or confusion
- Template ID: P008-T015
- Question Type: Error detection
- Cognitive Skill: Diagnose connector error
- Difficulty: 4
- Estimated Time: 65 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Correct a solution that treats "and" as "or."
- Example Question: A player solves `x > 1 and x < 6` as `x < 1 or x > 6`. What is wrong?
- Answer: They used the outside union instead of the overlap. Correct solution is `1 < x < 6`.
- Explanation: "And" means the value must satisfy both inequalities at the same time.
- Distractors: Their answer is correct; no solution; all real numbers; `x <= 1 or x >= 6`
- Distractor Rationale: Accepts connector error; misclassifies; endpoint error.
- Randomization Rules: Present common connector swaps for bounded intervals.
- Validity Constraints: Wrong work must reflect a clear connector misconception.
- Metadata: phase_id=P008; prerequisites=[and/or logic, graphing]; misconception_tags=[and/or confusion, outside/inside error, endpoint error]; randomization_constraints=[targeted connector error].
- Graph/Visual Variant: Show overlap versus outside regions.
- Modeling Variant: Safe zone versus danger zone correction.
- Reverse Variant: Write a wrong "or" answer for an "and" problem and fix it.
- Equation Battle Variant: Use as representation repair.
- Multi-stage Boss Variant: Identify error, correct graph, write interval.
- Hint Mapping: H-P008-T015
- Tutorial Mapping: Tut-P008 sections Common Mistakes
- Socratic Mapping: Soc-P008 error branch

## Template T016 - Set-builder notation
- Template ID: P008-T016
- Question Type: Multiple choice
- Cognitive Skill: Translate set-builder notation
- Difficulty: 3
- Estimated Time: 50 seconds
- Visual Required: false
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Connect set-builder notation to compound inequalities.
- Example Question: What interval matches `{x | -1 <= x < 4}`?
- Answer: `[-1, 4)`.
- Explanation: The set reads "all x such that -1 is less than or equal to x and x is less than 4."
- Distractors: `(-1,4]`; `(-infinity,-1] union [4,infinity)`; `[-1,4]`; `(-1,4)`
- Distractor Rationale: Endpoint reversal; outside union; closes both; opens both.
- Randomization Rules: Use set-builder notation for bounded intervals.
- Validity Constraints: Symbols and interval endpoints must correspond.
- Metadata: phase_id=P008; prerequisites=[interval notation, compound inequalities]; misconception_tags=[endpoint error, and/or confusion, notation confusion]; randomization_constraints=[bounded set].
- Graph/Visual Variant: Set-builder card linked to number line.
- Modeling Variant: Domain-like allowed input set.
- Reverse Variant: Write set-builder notation for `[-1,4)`.
- Equation Battle Variant: Representation conversion after solving.
- Multi-stage Boss Variant: Convert among set-builder, graph, interval.
- Hint Mapping: H-P008-T016
- Tutorial Mapping: Tut-P008 sections Set Notation
- Socratic Mapping: Soc-P008 notation branch

## Template T017 - Test value in compound inequality
- Template ID: P008-T017
- Question Type: True/False
- Cognitive Skill: Verify a value against both conditions
- Difficulty: 2
- Estimated Time: 40 seconds
- Visual Required: false
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Test whether a value satisfies a compound statement.
- Example Question: Is `x = 4` a solution of `1 < x <= 4`?
- Answer: Yes.
- Explanation: `4` is greater than 1 and equal to the included upper boundary 4.
- Distractors: No because endpoints never count; no because `4 < 4` is false; yes because 4 is visible; no because compound inequalities cannot include endpoints.
- Distractor Rationale: Misunderstands closed endpoint; uses wrong symbol; superficial matching; endpoint misconception.
- Randomization Rules: Test values inside, outside, and at open/closed endpoints.
- Validity Constraints: Connector and endpoint inclusion must be clear.
- Metadata: phase_id=P008; prerequisites=[inequality truth, endpoint inclusion]; misconception_tags=[endpoint error, one-condition check, superficial matching]; randomization_constraints=[clear truth value].
- Graph/Visual Variant: Plot test value on solution graph.
- Modeling Variant: Check whether a stat is in an allowed range.
- Reverse Variant: Find one value that works and one that does not.
- Equation Battle Variant: Final check gate.
- Multi-stage Boss Variant: Test boundary values.
- Hint Mapping: H-P008-T017
- Tutorial Mapping: Tut-P008 sections Testing Values
- Socratic Mapping: Soc-P008 testing branch

## Template T018 - Compare interval overlap
- Template ID: P008-T018
- Question Type: Compare
- Cognitive Skill: Find intersection of intervals
- Difficulty: 4
- Estimated Time: 65 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Determine overlap of two interval constraints.
- Example Question: A relic works for `[-3, 5)` and a spell works for `(1, 8]`. For what values do both work?
- Answer: `(1, 5)`.
- Explanation: Both must work, so take the overlap. 1 is not included by the spell interval, and 5 is not included by the relic interval.
- Distractors: `[-3,8]`; `[1,5]`; `(-3,1] union [5,8]`; no solution
- Distractor Rationale: Uses union; endpoint errors; outside regions; misses overlap.
- Randomization Rules: Use two intervals with nonempty overlap and varied endpoints.
- Validity Constraints: Endpoint inclusion must be determined by both intervals.
- Metadata: phase_id=P008; prerequisites=[interval notation, intersection]; misconception_tags=[union/intersection confusion, endpoint error, no-overlap error]; randomization_constraints=[nonempty overlap].
- Graph/Visual Variant: Two stacked interval bars showing overlap.
- Modeling Variant: Two simultaneous item constraints.
- Reverse Variant: Create two intervals whose overlap is `(1,5)`.
- Equation Battle Variant: Constraint overlap gate.
- Multi-stage Boss Variant: Graph both, identify overlap, interval notation.
- Hint Mapping: H-P008-T018
- Tutorial Mapping: Tut-P008 sections Interval Overlap
- Socratic Mapping: Soc-P008 overlap branch

## Template T019 - Graph from interval union
- Template ID: P008-T019
- Question Type: Graph matching
- Cognitive Skill: Graph union interval notation
- Difficulty: 3
- Estimated Time: 55 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Graph union notation with two intervals.
- Example Question: Graph `(-infinity, -2] union (3, infinity)`.
- Answer: Closed circle at -2 shaded left, open circle at 3 shaded right.
- Explanation: The union includes values in either interval.
- Distractors: open at -2 and closed at 3; shade between -2 and 3; closed at both endpoints; no solution.
- Distractor Rationale: Endpoint errors; intersection instead of union; endpoint over-inclusion; classification error.
- Randomization Rules: Use unions of two rays with mixed endpoints.
- Validity Constraints: Endpoint type must match bracket/parenthesis.
- Metadata: phase_id=P008; prerequisites=[interval notation, graphing union]; misconception_tags=[endpoint error, and/or confusion, graph direction error]; randomization_constraints=[two ray intervals].
- Graph/Visual Variant: Required union graph.
- Modeling Variant: Danger zones outside a safe range.
- Reverse Variant: Given graph, write union interval notation.
- Equation Battle Variant: Representation gate.
- Multi-stage Boss Variant: Interval-to-graph-to-inequality conversion.
- Hint Mapping: H-P008-T019
- Tutorial Mapping: Tut-P008 sections Graph Reading
- Socratic Mapping: Soc-P008 graph branch

## Template T020 - Boss compound inequality with negative coefficient
- Template ID: P008-T020
- Question Type: Boss challenge
- Cognitive Skill: Integrated compound inequality solving
- Difficulty: 5
- Estimated Time: 110 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve, reorder, graph, and write interval notation for a compound inequality requiring a negative flip.
- Example Question: Boss Gate: Solve and graph `-6 <= -3(x - 2) < 12`.
- Answer: `-2 < x <= 4`; interval `(-2, 4]`.
- Explanation: Simplify: `-6 <= -3x + 6 < 12`. Subtract 6 from all parts: `-12 <= -3x < 6`. Divide by `-3` and flip both symbols: `4 >= x > -2`. Reorder: `-2 < x <= 4`.
- Distractors: `-4 <= x < 2`; `x <= 4 or x > -2`; `-2 <= x < 4`; `4 <= x < -2`
- Distractor Rationale: Sign error; treats bounded statement as or; endpoint errors after flip; fails to reorder.
- Randomization Rules: Use grouped expression with negative coefficient inside a three-part inequality.
- Validity Constraints: Negative divisor nonzero; final lower bound less than upper bound.
- Metadata: phase_id=P008; prerequisites=[P007 flip rule, three-part inequalities, graphing]; misconception_tags=[missed flip, and/or confusion, endpoint error, reorder error]; randomization_constraints=[negative coefficient, clean bounds].
- Graph/Visual Variant: Boss lane: simplify, subtract all parts, divide-flip all parts, reorder, graph.
- Modeling Variant: Reversed transformation must stay inside a safe range.
- Reverse Variant: Create a boss inequality with solution `(-2,4]`.
- Equation Battle Variant: Multi-part battle cards with double flip.
- Multi-stage Boss Variant: This is the phase boss template.
- Hint Mapping: H-P008-T020
- Tutorial Mapping: Tut-P008 sections Full Phase Review
- Socratic Mapping: Soc-P008 boss branch

# Part II - Hint Bible

## H-P008-T001
- Hint 1 - Gentle Nudge: Read the inequality from left to right.
- Hint 2 - Concept Reminder: The value of `x` must be between the two numbers.
- Hint 3 - Focus Hint: Strict inequalities use open circles.
- Hint 4 - Guided Next Step: Put open circles at -2 and 5.
- Hint 5 - Nearly Complete: Shade only between the endpoints.
- Hint 6 - Full Solution: Graph `(-2,5)`; open at both endpoints, shade between.

## H-P008-T002
- Hint 1 - Gentle Nudge: The middle expression is `x + 3`.
- Hint 2 - Concept Reminder: Apply the same operation to all three parts.
- Hint 3 - Focus Hint: Subtract 3 from 1, `x+3`, and 9.
- Hint 4 - Guided Next Step: `1-3 < x < 9-3`.
- Hint 5 - Nearly Complete: `-2 < x < 6`.
- Hint 6 - Full Solution: `-2 < x < 6`; interval `(-2,6)`.

## H-P008-T003
- Hint 1 - Gentle Nudge: The middle expression is `2x`.
- Hint 2 - Concept Reminder: Divide all three parts by positive 2.
- Hint 3 - Focus Hint: Positive division does not flip symbols.
- Hint 4 - Guided Next Step: `-4/2 <= x < 10/2`.
- Hint 5 - Nearly Complete: `-2 <= x < 5`.
- Hint 6 - Full Solution: `[-2,5)`.

## H-P008-T004
- Hint 1 - Gentle Nudge: You will divide by a negative number.
- Hint 2 - Concept Reminder: Dividing by a negative flips both inequality symbols.
- Hint 3 - Focus Hint: Divide all parts by `-2`.
- Hint 4 - Guided Next Step: `4 >= x > -3`.
- Hint 5 - Nearly Complete: Rewrite in increasing order.
- Hint 6 - Full Solution: `-3 < x <= 4`; interval `(-3,4]`.

## H-P008-T005
- Hint 1 - Gentle Nudge: "And" means both conditions must be true.
- Hint 2 - Concept Reminder: Use the overlap of the two graphs.
- Hint 3 - Focus Hint: Values must be greater than 1 and at most 6.
- Hint 4 - Guided Next Step: Shade between 1 and 6.
- Hint 5 - Nearly Complete: Open at 1, closed at 6.
- Hint 6 - Full Solution: `(1,6]`.

## H-P008-T006
- Hint 1 - Gentle Nudge: Try to find one number that satisfies both conditions.
- Hint 2 - Concept Reminder: "And" means overlap.
- Hint 3 - Focus Hint: A number less than 2 cannot also be greater than 5.
- Hint 4 - Guided Next Step: The two regions do not overlap.
- Hint 5 - Nearly Complete: No shared values means no solution.
- Hint 6 - Full Solution: No solution.

## H-P008-T007
- Hint 1 - Gentle Nudge: "Or" means either condition can work.
- Hint 2 - Concept Reminder: Use the union of the two graphs.
- Hint 3 - Focus Hint: Shade left of -1 and right of 4.
- Hint 4 - Guided Next Step: Open at -1, closed at 4.
- Hint 5 - Nearly Complete: Write two intervals joined by union.
- Hint 6 - Full Solution: `(-infinity,-1) union [4,infinity)`.

## H-P008-T008
- Hint 1 - Gentle Nudge: Test values below, equal to, and above 3.
- Hint 2 - Concept Reminder: "Or" includes values satisfying either side.
- Hint 3 - Focus Hint: Values below 3 satisfy the first condition.
- Hint 4 - Guided Next Step: Values 3 and above satisfy the second condition.
- Hint 5 - Nearly Complete: Every real number is covered.
- Hint 6 - Full Solution: All real numbers, `(-infinity,infinity)`.

## H-P008-T009
- Hint 1 - Gentle Nudge: Look at each endpoint symbol.
- Hint 2 - Concept Reminder: `[` means included; `)` means excluded.
- Hint 3 - Focus Hint: 2 is included and 7 is not.
- Hint 4 - Guided Next Step: Use `2 <= x` and `x < 7`.
- Hint 5 - Nearly Complete: Combine them as one bounded inequality.
- Hint 6 - Full Solution: `2 <= x < 7`.

## H-P008-T010
- Hint 1 - Gentle Nudge: The graph has two separated rays.
- Hint 2 - Concept Reminder: Separated rays usually mean "or."
- Hint 3 - Focus Hint: Left ray includes -4, so `x <= -4`.
- Hint 4 - Guided Next Step: Right ray excludes 2, so `x > 2`.
- Hint 5 - Nearly Complete: Join the conditions with `or`.
- Hint 6 - Full Solution: `x <= -4 or x > 2`.

## H-P008-T011
- Hint 1 - Gentle Nudge: Solve each inequality separately.
- Hint 2 - Concept Reminder: "And" means keep the overlap.
- Hint 3 - Focus Hint: First inequality gives `x > 3`.
- Hint 4 - Guided Next Step: Second inequality gives `x <= 7`.
- Hint 5 - Nearly Complete: Combine the overlap.
- Hint 6 - Full Solution: `3 < x <= 7`; interval `(3,7]`.

## H-P008-T012
- Hint 1 - Gentle Nudge: The connector is `or`.
- Hint 2 - Concept Reminder: Solve each branch separately, then keep both regions.
- Hint 3 - Focus Hint: `3x+1<-5` gives `x<-2`.
- Hint 4 - Guided Next Step: `3x+1>=10` gives `x>=3`.
- Hint 5 - Nearly Complete: Join with `or`.
- Hint 6 - Full Solution: `x < -2 or x >= 3`.

## H-P008-T013
- Hint 1 - Gentle Nudge: Safe load has a lower and upper limit.
- Hint 2 - Concept Reminder: Inclusive range uses `<=` on both sides.
- Hint 3 - Focus Hint: Write `10 <= 5 + 2t <= 25`.
- Hint 4 - Guided Next Step: Subtract 5 from all three parts.
- Hint 5 - Nearly Complete: `5 <= 2t <= 20`, then divide by 2.
- Hint 6 - Full Solution: `2.5 <= t <= 10`.

## H-P008-T014
- Hint 1 - Gentle Nudge: Translate "at least" and "at most" into a range.
- Hint 2 - Concept Reminder: Use a three-part inclusive inequality.
- Hint 3 - Focus Hint: `20 <= 3q + 5 <= 35`.
- Hint 4 - Guided Next Step: Subtract 5 from all parts.
- Hint 5 - Nearly Complete: `15 <= 3q <= 30`, so `5 <= q <= 10`.
- Hint 6 - Full Solution: Whole quest counts are 5, 6, 7, 8, 9, 10.

## H-P008-T015
- Hint 1 - Gentle Nudge: Check the connector in the original statement.
- Hint 2 - Concept Reminder: "And" means overlap, not outside regions.
- Hint 3 - Focus Hint: `x > 1 and x < 6` means between 1 and 6.
- Hint 4 - Guided Next Step: Use open endpoints because both are strict.
- Hint 5 - Nearly Complete: Correct graph shades only the middle.
- Hint 6 - Full Solution: Error is using `or`; correct solution is `1 < x < 6`.

## H-P008-T016
- Hint 1 - Gentle Nudge: Read the set-builder statement aloud.
- Hint 2 - Concept Reminder: `<=` includes the endpoint; `<` excludes it.
- Hint 3 - Focus Hint: -1 is included, 4 is excluded.
- Hint 4 - Guided Next Step: Use `[` at -1 and `)` at 4.
- Hint 5 - Nearly Complete: `[-1, 4)`.
- Hint 6 - Full Solution: `[-1,4)`.

## H-P008-T017
- Hint 1 - Gentle Nudge: Test both parts of the compound inequality.
- Hint 2 - Concept Reminder: For "and," both parts must be true.
- Hint 3 - Focus Hint: Check `1 < 4`.
- Hint 4 - Guided Next Step: Check `4 <= 4`.
- Hint 5 - Nearly Complete: Both statements are true.
- Hint 6 - Full Solution: Yes, `x = 4` is a solution.

## H-P008-T018
- Hint 1 - Gentle Nudge: Both relic and spell must work.
- Hint 2 - Concept Reminder: "Both" means overlap.
- Hint 3 - Focus Hint: The overlapping region starts after 1 and ends before 5.
- Hint 4 - Guided Next Step: 1 is excluded by `(1,8]`; 5 is excluded by `[-3,5)`.
- Hint 5 - Nearly Complete: Use open endpoints at both 1 and 5.
- Hint 6 - Full Solution: `(1,5)`.

## H-P008-T019
- Hint 1 - Gentle Nudge: The union has two intervals.
- Hint 2 - Concept Reminder: `]` includes -2; `(` excludes 3.
- Hint 3 - Focus Hint: Shade left up to -2 and right after 3.
- Hint 4 - Guided Next Step: Closed circle at -2.
- Hint 5 - Nearly Complete: Open circle at 3.
- Hint 6 - Full Solution: Closed at -2 shade left; open at 3 shade right.

## H-P008-T020
- Hint 1 - Gentle Nudge: Simplify the middle expression first.
- Hint 2 - Concept Reminder: Apply operations to all three parts.
- Hint 3 - Focus Hint: `-3(x-2)` becomes `-3x+6`.
- Hint 4 - Guided Next Step: Subtract 6 from all parts: `-12 <= -3x < 6`.
- Hint 5 - Nearly Complete: Divide by `-3`, flip both symbols, and reorder.
- Hint 6 - Full Solution: `-2 < x <= 4`; interval `(-2,4]`.

# Part III - Tutorial Bible

## Learning Goal
Learn to solve, graph, and interpret compound inequalities joined by "and" or "or," including bounded three-part inequalities and interval notation.

## Why It Matters
Compound inequalities describe ranges and split regions: safe temperature zones, allowed item counts, restricted domains, danger zones, and acceptable stat windows. They are a direct bridge to domain/range work and absolute value inequalities.

## Prerequisite Check
Ask the player:

1. Graph `x < 4`. Expected: open at 4, shade left.
2. Graph `x >= -1`. Expected: closed at -1, shade right.
3. What does "and" mean for two conditions? Expected: both must be true.
4. What does "or" mean? Expected: either condition can be true.
5. What happens when dividing an inequality by a negative? Expected: the direction reverses.

## Core Concept
Compound inequalities combine two inequality ideas.

`1 < x < 6` means `x > 1 and x < 6`.

The graph is the overlap: values between 1 and 6.

`x < -1 or x >= 4` means values can be in either region.

The graph is the union: shade left of -1 and right from 4.

## Three-Part Inequalities
Solve a three-part inequality by applying each operation to all three parts.

Example:

`1 < x + 3 < 9`
`-2 < x < 6`

Do not subtract 3 only from the middle.

## Negative Three-Part Inequalities
If you divide all parts by a negative, flip both inequality symbols.

`-8 <= -2x < 6`
`4 >= x > -3`

Then rewrite in increasing order:

`-3 < x <= 4`

## And Means Overlap
For `x > 1 and x <= 6`, both conditions must be true. The solution is `(1,6]`.

If there is no overlap, there is no solution:

`x < 2 and x > 5` has no solution.

## Or Means Union
For `x < -1 or x >= 4`, either condition can be true. The solution is `(-infinity,-1) union [4,infinity)`.

If the union covers all values, the answer is all real numbers:

`x < 3 or x >= 3`.

## Common Mistakes
- Mistake: Solving only one side of a three-part inequality.
  Correction: Apply operations to all three parts.
- Mistake: Treating "and" as "or."
  Correction: "And" means overlap.
- Mistake: Treating "or" as "and."
  Correction: "Or" means union.
- Mistake: Forgetting to reorder after dividing by a negative in a three-part inequality.
  Correction: Flip both symbols, then write lower bound first.
- Mistake: Losing endpoint types.
  Correction: Brackets/closed circles mean included; parentheses/open circles mean excluded.

## Guided Practice
1. Solve `2 < x - 4 <= 9`.
   - Add 4 to all parts: `6 < x <= 13`.

2. Solve `x >= -2 and x < 5`.
   - Overlap: `[-2,5)`.

3. Solve `x <= 1 or x > 7`.
   - Union: `(-infinity,1] union (7,infinity)`.

## Independent Practice
1. `-3 < x + 2 < 8`; answer `-5 < x < 6`.
2. `4 <= 2x < 14`; answer `2 <= x < 7`.
3. `x > -1 and x <= 3`; answer `(-1,3]`.
4. `x < -4 or x >= 6`; answer `(-infinity,-4) union [6,infinity)`.
5. `-6 < -3x <= 9`; answer `-3 <= x < 2`.

## Mastery Check
The player is ready to advance when they can:

1. Solve three-part inequalities.
2. Correctly handle negative division in a three-part inequality.
3. Distinguish "and" overlap from "or" union.
4. Graph bounded intervals and disjoint unions.
5. Convert between inequality, graph, interval, and set-builder notation.

Mastery check set:

1. `0 <= x + 5 < 12`; solution `-5 <= x < 7`.
2. `-10 < -2x <= 4`; solution `-2 <= x < 5`.
3. `x > 2 and x < 9`; solution `(2,9)`.
4. `x <= -3 or x > 4`; solution `(-infinity,-3] union (4,infinity)`.
5. `15 <= 4q + 3 <= 31`; solution `3 <= q <= 7`.

## Adaptive Tutor Messages
- If the player treats "and" as "or": "Look for values that satisfy both conditions at the same time."
- If the player treats "or" as "and": "A value only needs to satisfy one branch."
- If the player changes only the middle of a three-part inequality: "All three parts must receive the operation."
- If the player misses a negative flip: "You divided by a negative. Both inequality signs reverse."
- If endpoint errors repeat: "Translate brackets and inequality symbols before shading."
- If the player succeeds quickly: "You are ready for absolute value equations and inequalities, where distance creates two cases."

## Tutorial Metadata
- Tutorial ID: Tut-P008
- Estimated duration: 5 minutes
- Target player state: understands one-sided inequalities and graphing
- Unlock condition: available from any Phase 008 question
- Remediation trigger: two and/or confusions, two endpoint errors, two three-part operation errors, or one missed negative flip
- Advancement trigger: 80 percent accuracy on mixed compound inequalities plus correct graphing of one bounded interval and one union

# Part IV - Socratic Dialogue Bible

## Opening Diagnostic
Tutor: "For `x > 1 and x <= 6`, should we shade the overlap or the outside regions? Why?"

Expected strong answer: "Shade the overlap because `and` means both conditions must be true."

## Guided Discovery
Tutor sequence:

1. "Is the connector `and`, `or`, or a three-part inequality?"
2. "Does the value need to satisfy both conditions or either condition?"
3. "What is the lower boundary?"
4. "What is the upper boundary?"
5. "Are the endpoints included?"
6. "Do the shaded regions overlap or form a union?"
7. "Can you write the answer in interval notation?"
8. "Can a test value confirm the graph?"

## Correct Branch
Player: "Shade the overlap."

Tutor: "Good. Which values are both greater than 1 and less than or equal to 6?"

If player says values between 1 and 6 including 6, ask for interval notation.

## Partial Understanding Branch
Player: "Between them" but misses endpoint type.

Tutor: "Right region. Now check the symbols: does `x > 1` include 1? Does `x <= 6` include 6?"

## Misconception Branch
Player shades outside regions.

Tutor: "Pick `x = 0` from the left outside region. Does 0 satisfy `x > 1`?"

Follow-up: "For an `and` statement, what happens if one condition fails?"

## Unsure Branch
Player: "I don't know."

Tutor: "Let's unpack the connector. Does `and` mean both conditions must be true, or just one condition?"

If player answers both, continue with boundaries.

## Unrelated Response Branch
Player gives an unrelated answer.

Tutor: "Let's return to the connector. The word is `and`. Should we look for overlap or union?"

If unrelated again, use a two-choice prompt.

## Recovery Prompts
- "What connector is used?"
- "Does the value need both conditions or either condition?"
- "Where is the overlap?"
- "Are endpoints open or closed?"
- "Is this interval bounded or split into two rays?"
- "Can a test value confirm your graph?"

## Reflection Question
"Why can `x < 2 and x > 5` have no solution, while `x < 2 or x > 5` has many solutions?"

Strong reflection: "The `and` version requires both impossible conditions at once, but the `or` version allows either side."

## Transfer Question
"How will compound inequalities help with domain restrictions?"

Expected transfer: "Domains often describe allowed intervals or excluded intervals, so compound inequalities and interval notation describe them clearly."

## Escalation Rules
- If the player confuses and/or twice, show And Means Overlap and Or Means Union.
- If the player changes only the middle part, show Three-Part Inequalities.
- If the player misses a double flip, show Negative Three-Part Inequalities.
- If endpoint errors repeat, show Interval Conversion.
- If graph reading errors repeat, use test values.
- If the player solves and graphs three mixed examples correctly, move to independent practice.

## Exit Condition
The Socratic sequence is complete when the player:

1. Identifies the connector or three-part structure.
2. Solves all needed inequalities correctly.
3. Uses overlap for "and" and union for "or."
4. Graphs endpoints and shading correctly.
5. Writes interval notation or a contextual interpretation.

# Knowledge Graph

- Prerequisites: Phase 007 linear inequalities; number-line graphing; interval notation; inequality flip rule; endpoint inclusion; set union and intersection intuition
- Concepts Unlocked: compound inequalities; bounded intervals; intersection; union; empty set; all real solutions; three-part inequality solving; set-builder notation; practical integer ranges
- Related Concepts: absolute value inequalities; domain and range; interval notation; piecewise functions; graph restrictions
- Common Misconceptions: and/or confusion; middle-only operation; missed double flip; endpoint errors; outside-versus-between graphing; no-solution confusion; all-real confusion
- Remedial Phases: Phase 007 review; number-line mini-lesson; interval notation mini-lesson; union/intersection mini-lesson; negative flip mini-lesson
- Follow-up Phases: Phase 009 - Absolute value equations; Phase 010 - Absolute value inequalities; Phase 015 - Domain from formulas; Phase 016 - Domain from graphs; Phase 021 - Piecewise functions
- Transfer Topics: domain restrictions; range intervals; absolute value cases; graph intervals; solution sets for inequalities

# Validation Notes

## Structure Validation
- Includes all required Bibles and metadata sections.
- Contains exactly 20 template families, within the required 20-40 range.
- Each template includes example, answer, explanation, distractors, distractor rationale, randomization rules, validity constraints, metadata, variants, and mappings.
- Every template has six progressive hints.

## Math Validation
- T001: `-2 < x < 5` maps to `(-2,5)`.
- T002: `1 < x+3 < 9` -> `-2 < x < 6`.
- T003: `-4 <= 2x < 10` -> `-2 <= x < 5`.
- T004: `-8 <= -2x < 6` -> `4 >= x > -3` -> `-3 < x <= 4`.
- T005: `x > 1 and x <= 6` -> `(1,6]`.
- T006: `x < 2 and x > 5` -> no solution.
- T007: `x < -1 or x >= 4` -> `(-infinity,-1) union [4,infinity)`.
- T008: `x < 3 or x >= 3` -> all real numbers.
- T009: `[2,7)` -> `2 <= x < 7`.
- T010: graph closed left at -4 and open right at 2 -> `x <= -4 or x > 2`.
- T011: `2x-1>5` gives `x>3`; `2x-1<=13` gives `x<=7`; overlap `(3,7]`.
- T012: `3x+1<-5` gives `x<-2`; `3x+1>=10` gives `x>=3`; union.
- T013: `10 <= 5+2t <= 25` -> `2.5 <= t <= 10`.
- T014: `20 <= 3q+5 <= 35` -> `5 <= q <= 10`; whole counts 5 through 10.
- T015: `x>1 and x<6` is `(1,6)`, not outside union.
- T016: `{x | -1 <= x < 4}` -> `[-1,4)`.
- T017: `x=4` satisfies `1 < x <= 4`.
- T018: `[-3,5)` intersect `(1,8]` -> `(1,5)`.
- T019: `(-infinity,-2] union (3,infinity)` graphs closed at -2 left, open at 3 right.
- T020: `-6 <= -3(x-2) < 12` -> `-2 < x <= 4`.

## Distractor Validation
- Distractors reflect connector confusion, endpoint errors, one-bound answers, no-overlap mistakes, all-real mistakes, missed flips, and reorder errors.
- Multiple-choice-style templates have exactly one correct answer.
- Graph and interval distractors differ by meaningful misconception.

## Hint Validation
- Each hint sequence moves from connector/structure recognition to operation, graph, endpoint, interval, and final solution.
- Three-part hints emphasize applying operations to all three parts.

## Tutorial Validation
- Tutorial includes learning goal, prerequisite check, why it matters, core concept, three-part inequalities, negative three-part inequalities, and/or logic, common mistakes, guided practice, independent practice, mastery check, adaptive messages, and metadata.

## Socratic Validation
- Dialogue includes diagnostic, guided discovery, correct branch, partial branch, misconception branch, unsure branch, unrelated branch, recovery prompts, reflection, transfer, escalation rules, and exit condition.
- Tutor uses test values to recover from graph and connector misconceptions.

## Metadata Validation
- Every template includes IDs, difficulty, timing, visual flag, compatibility flags, prerequisites, misconception tags, randomization constraints, and support-system mappings.

## Known Issues
- The repository specifications differ on the label for Hint 4. This phase uses "Guided Next Step" to match the master prompt language.
- `PHASE_TEMPLATE.md` omits Common Misconceptions from the Knowledge Graph section, but this phase includes it because the master prompt and knowledge graph guide require it.
