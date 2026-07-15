# Phase 010 - Absolute Value Inequalities

## Phase Metadata
- Course: Precalculus Odyssey Bible v5
- Topic: Absolute value inequalities
- Subtopic: Solving and graphing distance inequalities
- Prerequisites: Phase 007 linear inequalities, Phase 008 compound inequalities, Phase 009 absolute value equations, number-line distance, interval notation
- Related phases: Phase 015 - Domain from formulas; Phase 016 - Domain from graphs; Phase 021 - Piecewise functions; Phase 033 - Rational expression simplification
- Estimated phase size: 20 template families, 20 core examples, 120 progressive hints, 1 tutorial sequence, 1 Socratic dialogue system

## Learning Objectives
By the end of this phase, the player can:

1. Interpret absolute value inequalities as distance constraints.
2. Solve `|A| < k` and `|A| <= k` as bounded "and" inequalities.
3. Solve `|A| > k` and `|A| >= k` as split "or" inequalities.
4. Isolate the absolute value before converting to a compound inequality.
5. Recognize no-solution and all-real cases involving negative bounds.
6. Graph absolute value inequality solutions on number lines.
7. Translate tolerance and error contexts into absolute value inequalities.
8. Check solutions using test values and distance meaning.

## Prerequisite Review
- `|x - h|` means distance from `h`.
- `|A| = k` has two branches when `k > 0`.
- `|A| < k` means the expression is within `k` units of 0.
- `|A| > k` means the expression is more than `k` units from 0.
- Compound "and" means overlap; "or" means union.
- Distance cannot be negative.

## Core Concepts
- "Less than" absolute value inequalities create inside ranges:
  - `|A| < k` becomes `-k < A < k`.
  - `|A| <= k` becomes `-k <= A <= k`.
- "Greater than" absolute value inequalities create outside regions:
  - `|A| > k` becomes `A < -k or A > k`.
  - `|A| >= k` becomes `A <= -k or A >= k`.
- Always isolate the absolute value first.
- If the isolated bound is negative, classify carefully:
  - `|A| < negative` or `|A| <= negative` usually has no solution, except `<= 0` can have one point.
  - `|A| > negative` or `|A| >= negative` is usually all real numbers.

## Common Misconceptions
- Turning `|A| < k` into an "or" statement.
- Turning `|A| > k` into an "and" statement.
- Forgetting to isolate the absolute value before splitting.
- Using the wrong endpoint type.
- Forgetting that negative distance bounds create special cases.
- Writing the center and distance as the answers.
- Graphing the outside region when the solution should be inside.
- Graphing the inside region when the solution should be outside.

# Part I - Question Bible

## Template T001 - Basic less-than absolute value
- Template ID: P010-T001
- Question Type: Direct computation
- Cognitive Skill: Convert to bounded interval
- Difficulty: 2
- Estimated Time: 45 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve `|x| < a`.
- Example Question: Solve and graph `|x| < 6`.
- Answer: `-6 < x < 6`; interval `(-6, 6)`.
- Explanation: Values with distance from 0 less than 6 lie between -6 and 6.
- Distractors: `x < -6 or x > 6`; `-6 <= x <= 6`; `x < 6`; `x = -6 or 6`
- Distractor Rationale: Uses outside/or instead of inside/and; endpoint error; one-sided answer; equation-style boundary answer.
- Randomization Rules: Choose positive distance `a`.
- Validity Constraints: Bound must be positive.
- Metadata: phase_id=P010; prerequisites=[absolute value distance, compound inequalities]; misconception_tags=[and/or confusion, endpoint error, boundary-only answer]; randomization_constraints=[a positive].
- Graph/Visual Variant: Open circles at -6 and 6, shade between.
- Modeling Variant: Position within 6 units of base.
- Reverse Variant: Given `(-6,6)`, write `|x|<6`.
- Equation Battle Variant: Convert to three-part inequality.
- Multi-stage Boss Variant: Distance meaning, interval, graph.
- Hint Mapping: H-P010-T001
- Tutorial Mapping: Tut-P010 sections Inside Inequalities
- Socratic Mapping: Soc-P010 inside branch

## Template T002 - Basic less-than-or-equal absolute value
- Template ID: P010-T002
- Question Type: Direct computation
- Cognitive Skill: Convert to closed bounded interval
- Difficulty: 2
- Estimated Time: 45 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve `|x| <= a`.
- Example Question: Solve `|x| <= 4`.
- Answer: `-4 <= x <= 4`; interval `[-4, 4]`.
- Explanation: Distance from 0 is at most 4, so endpoints are included.
- Distractors: `x <= -4 or x >= 4`; `-4 < x < 4`; `x <= 4`; `x = -4 or 4`
- Distractor Rationale: Uses outside/or; endpoint error; one-sided answer; equation-style answer.
- Randomization Rules: Use positive distance and inclusive symbol.
- Validity Constraints: Bound positive.
- Metadata: phase_id=P010; prerequisites=[absolute value distance, endpoint inclusion]; misconception_tags=[and/or confusion, endpoint error, one-sided answer]; randomization_constraints=[a positive].
- Graph/Visual Variant: Closed circles at -4 and 4, shade between.
- Modeling Variant: Error at most 4 units.
- Reverse Variant: Given `[-4,4]`, write `|x|<=4`.
- Equation Battle Variant: Convert to `-4 <= x <= 4`.
- Multi-stage Boss Variant: Include interval notation.
- Hint Mapping: H-P010-T002
- Tutorial Mapping: Tut-P010 sections Inside Inequalities
- Socratic Mapping: Soc-P010 inside branch

## Template T003 - Basic greater-than absolute value
- Template ID: P010-T003
- Question Type: Direct computation
- Cognitive Skill: Convert to outside union
- Difficulty: 2
- Estimated Time: 45 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve `|x| > a`.
- Example Question: Solve `|x| > 5`.
- Answer: `x < -5 or x > 5`; interval `(-infinity, -5) union (5, infinity)`.
- Explanation: Distance from 0 greater than 5 means outside the interval from -5 to 5.
- Distractors: `-5 < x < 5`; `x <= -5 or x >= 5`; `x > 5`; `x = -5 or 5`
- Distractor Rationale: Uses inside/and; endpoint error; one-sided answer; equation-style boundary answer.
- Randomization Rules: Choose positive distance.
- Validity Constraints: Bound positive.
- Metadata: phase_id=P010; prerequisites=[absolute value distance, or unions]; misconception_tags=[and/or confusion, endpoint error, one-sided answer]; randomization_constraints=[a positive].
- Graph/Visual Variant: Open circles at -5 and 5, shade outward.
- Modeling Variant: Position more than 5 units from base.
- Reverse Variant: Given outside graph, write `|x|>5`.
- Equation Battle Variant: Split into two inequality branches.
- Multi-stage Boss Variant: Outside graph and interval union.
- Hint Mapping: H-P010-T003
- Tutorial Mapping: Tut-P010 sections Outside Inequalities
- Socratic Mapping: Soc-P010 outside branch

## Template T004 - Basic greater-than-or-equal absolute value
- Template ID: P010-T004
- Question Type: Direct computation
- Cognitive Skill: Convert to outside union with closed endpoints
- Difficulty: 2
- Estimated Time: 45 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve `|x| >= a`.
- Example Question: Solve `|x| >= 3`.
- Answer: `x <= -3 or x >= 3`; interval `(-infinity, -3] union [3, infinity)`.
- Explanation: Distance from 0 is at least 3, so points at -3 and 3 are included.
- Distractors: `-3 <= x <= 3`; `x < -3 or x > 3`; `x >= 3`; all real numbers.
- Distractor Rationale: Uses inside/and; endpoint error; one-sided answer; overgeneralizes.
- Randomization Rules: Use positive distance and inclusive symbol.
- Validity Constraints: Bound positive.
- Metadata: phase_id=P010; prerequisites=[or unions, endpoint inclusion]; misconception_tags=[and/or confusion, endpoint error, one-sided answer]; randomization_constraints=[a positive].
- Graph/Visual Variant: Closed circles at -3 and 3, shade outward.
- Modeling Variant: At least 3 units from a hazard.
- Reverse Variant: Given outside closed graph, write `|x|>=3`.
- Equation Battle Variant: Split into `x<=-3 or x>=3`.
- Multi-stage Boss Variant: Graph and interval notation.
- Hint Mapping: H-P010-T004
- Tutorial Mapping: Tut-P010 sections Outside Inequalities
- Socratic Mapping: Soc-P010 outside branch

## Template T005 - Shifted less-than inequality
- Template ID: P010-T005
- Question Type: Direct computation
- Cognitive Skill: Use center and inside range
- Difficulty: 3
- Estimated Time: 55 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve `|x - h| < a`.
- Example Question: Solve `|x - 4| < 3`.
- Answer: `1 < x < 7`; interval `(1, 7)`.
- Explanation: Values within 3 units of 4 lie between `4 - 3` and `4 + 3`.
- Distractors: `x < 1 or x > 7`; `1 <= x <= 7`; `x = 1 or 7`; `-3 < x < 3`.
- Distractor Rationale: Uses outside/or; endpoint error; equation-style answer; ignores center.
- Randomization Rules: Choose center `h` and positive distance `a`.
- Validity Constraints: Bound positive.
- Metadata: phase_id=P010; prerequisites=[shifted absolute value, compound inequalities]; misconception_tags=[and/or confusion, endpoint error, ignores center]; randomization_constraints=[a positive].
- Graph/Visual Variant: Open interval centered at 4.
- Modeling Variant: Within 3 units of checkpoint 4.
- Reverse Variant: Given `(1,7)`, write `|x-4|<3`.
- Equation Battle Variant: Convert to `-3 < x-4 < 3`, then solve.
- Multi-stage Boss Variant: Center, radius, interval, graph.
- Hint Mapping: H-P010-T005
- Tutorial Mapping: Tut-P010 sections Shifted Centers
- Socratic Mapping: Soc-P010 shifted-inside branch

## Template T006 - Shifted inclusive inside inequality
- Template ID: P010-T006
- Question Type: Direct computation
- Cognitive Skill: Handle negative center and closed endpoints
- Difficulty: 3
- Estimated Time: 55 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve `|x + h| <= a`.
- Example Question: Solve `|x + 2| <= 5`.
- Answer: `-7 <= x <= 3`; interval `[-7, 3]`.
- Explanation: `|x+2|` is distance from -2. At most 5 units from -2 gives -7 to 3, included.
- Distractors: `x <= -7 or x >= 3`; `-5 <= x <= 5`; `-3 <= x <= 7`; `x = -7 or 3`.
- Distractor Rationale: Uses outside/or; ignores center; sign-of-center error; equation-style answer.
- Randomization Rules: Use `|x+h| <= a` with positive `h` and `a`.
- Validity Constraints: Bound positive.
- Metadata: phase_id=P010; prerequisites=[shifted centers, endpoint inclusion]; misconception_tags=[and/or confusion, sign of center error, boundary-only answer]; randomization_constraints=[a positive].
- Graph/Visual Variant: Closed interval centered at -2.
- Modeling Variant: At most 5 units from portal -2.
- Reverse Variant: Given `[-7,3]`, write `|x+2|<=5`.
- Equation Battle Variant: Convert to `-5 <= x+2 <= 5`.
- Multi-stage Boss Variant: Include center identification.
- Hint Mapping: H-P010-T006
- Tutorial Mapping: Tut-P010 sections Shifted Centers
- Socratic Mapping: Soc-P010 shifted-inside branch

## Template T007 - Linear expression inside less-than
- Template ID: P010-T007
- Question Type: Direct computation
- Cognitive Skill: Solve bounded linear compound inequality
- Difficulty: 3
- Estimated Time: 65 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve `|ax + b| < c`.
- Example Question: Solve `|2x - 1| < 7`.
- Answer: `-3 < x < 4`.
- Explanation: Write `-7 < 2x - 1 < 7`. Add 1: `-6 < 2x < 8`. Divide by 2.
- Distractors: `x < -3 or x > 4`; `-4 < x < 3`; `-3 <= x <= 4`; `x = -3 or 4`.
- Distractor Rationale: Uses outside/or; arithmetic sign error; endpoint error; equation-style answer.
- Randomization Rules: Use nonzero integer coefficient and positive bound.
- Validity Constraints: Coefficient should be positive for this family.
- Metadata: phase_id=P010; prerequisites=[compound inequalities, linear solving]; misconception_tags=[and/or confusion, arithmetic error, endpoint error]; randomization_constraints=[a positive, c positive].
- Graph/Visual Variant: Open interval from -3 to 4.
- Modeling Variant: Transformed stat within 7 units of zero.
- Reverse Variant: Given `(-3,4)`, build `|2x-1|<7`.
- Equation Battle Variant: Convert to three-part inequality and solve.
- Multi-stage Boss Variant: Solve, graph, interval.
- Hint Mapping: H-P010-T007
- Tutorial Mapping: Tut-P010 sections Linear Expressions Inside
- Socratic Mapping: Soc-P010 linear-inside branch

## Template T008 - Linear expression inside greater-than
- Template ID: P010-T008
- Question Type: Direct computation
- Cognitive Skill: Solve outside linear union
- Difficulty: 3
- Estimated Time: 65 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve `|ax + b| > c`.
- Example Question: Solve `|2x - 1| > 7`.
- Answer: `x < -3 or x > 4`.
- Explanation: Branch outside: `2x - 1 < -7` or `2x - 1 > 7`. Solve to get `x < -3` or `x > 4`.
- Distractors: `-3 < x < 4`; `x <= -3 or x >= 4`; `x < 3 or x > -4`; no solution.
- Distractor Rationale: Uses inside/and; endpoint error; arithmetic sign error; misclassifies.
- Randomization Rules: Use nonzero positive coefficient and positive bound.
- Validity Constraints: Bound positive.
- Metadata: phase_id=P010; prerequisites=[or compound inequalities, branch solving]; misconception_tags=[and/or confusion, endpoint error, arithmetic error]; randomization_constraints=[a positive, c positive].
- Graph/Visual Variant: Open rays outside -3 and 4.
- Modeling Variant: Transformed stat more than 7 from target.
- Reverse Variant: Given outside solution, build `|2x-1|>7`.
- Equation Battle Variant: Split into two inequality branches.
- Multi-stage Boss Variant: Branch, solve, graph union.
- Hint Mapping: H-P010-T008
- Tutorial Mapping: Tut-P010 sections Outside Inequalities
- Socratic Mapping: Soc-P010 outside branch

## Template T009 - Isolate first for less-than
- Template ID: P010-T009
- Question Type: Direct computation
- Cognitive Skill: Isolate before converting
- Difficulty: 3
- Estimated Time: 65 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve `|x - h| + k < c`.
- Example Question: Solve `|x - 1| + 3 < 7`.
- Answer: `-3 < x < 5`.
- Explanation: Subtract 3: `|x - 1| < 4`. Then `-4 < x - 1 < 4`, so `-3 < x < 5`.
- Distractors: `x < -3 or x > 5`; `-4 < x < 4`; `-3 <= x <= 5`; no solution.
- Distractor Rationale: Uses outside/or; forgets center shift; endpoint error; false negative-bound reasoning.
- Randomization Rules: Use outside constant yielding positive isolated bound.
- Validity Constraints: Isolated bound positive.
- Metadata: phase_id=P010; prerequisites=[isolate absolute value, compound inequalities]; misconception_tags=[branches before isolating, ignores center, endpoint error]; randomization_constraints=[c-k positive].
- Graph/Visual Variant: Open interval centered at 1.
- Modeling Variant: Distance plus fixed cost stays below limit.
- Reverse Variant: Given `(-3,5)`, create `|x-1|+3<7`.
- Equation Battle Variant: Card `-3`, then inside compound.
- Multi-stage Boss Variant: Isolate, convert, solve, graph.
- Hint Mapping: H-P010-T009
- Tutorial Mapping: Tut-P010 sections Isolate First
- Socratic Mapping: Soc-P010 isolate branch

## Template T010 - Isolate first for greater-than-or-equal
- Template ID: P010-T010
- Question Type: Direct computation
- Cognitive Skill: Isolate then outside union
- Difficulty: 4
- Estimated Time: 75 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve `a|x+h| + b >= c`.
- Example Question: Solve `2|x + 2| - 1 >= 7`.
- Answer: `x <= -6 or x >= 2`.
- Explanation: Add 1 and divide by 2: `|x+2| >= 4`. Outside: `x+2 <= -4` or `x+2 >= 4`, giving `x <= -6` or `x >= 2`.
- Distractors: `-6 <= x <= 2`; `x < -6 or x > 2`; `x <= -2 or x >= 4`; no solution.
- Distractor Rationale: Uses inside/and; endpoint error; sign-of-center error; false no-solution.
- Randomization Rules: Use outside coefficient and constant with positive isolated bound.
- Validity Constraints: Outside coefficient positive; isolated bound positive.
- Metadata: phase_id=P010; prerequisites=[isolate absolute value, outside union, endpoint inclusion]; misconception_tags=[and/or confusion, endpoint error, sign of center error]; randomization_constraints=[positive isolated bound].
- Graph/Visual Variant: Closed rays outside -6 and 2.
- Modeling Variant: Adjusted distance at least 4 after isolating.
- Reverse Variant: Create a greater-than-or-equal absolute inequality with solution outside `[-6,2]`.
- Equation Battle Variant: Cards `+1`, `/2`, then split.
- Multi-stage Boss Variant: Isolate, split, solve both branches, graph.
- Hint Mapping: H-P010-T010
- Tutorial Mapping: Tut-P010 sections Isolate First
- Socratic Mapping: Soc-P010 outside branch

## Template T011 - Less than negative no solution
- Template ID: P010-T011
- Question Type: Number of solutions
- Cognitive Skill: Classify impossible distance condition
- Difficulty: 3
- Estimated Time: 40 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Recognize `|A| < negative` has no solution.
- Example Question: Solve `|x - 2| < -1`.
- Answer: No solution.
- Explanation: Absolute value is always at least 0, so it can never be less than -1.
- Distractors: all real numbers; `1 < x < 3`; `x < 1 or x > 3`; `x = 2`.
- Distractor Rationale: Confuses with greater-than negative; uses positive bound; outside/inside confusion; center-only answer.
- Randomization Rules: Use strict or inclusive less-than with negative right side.
- Validity Constraints: Bound negative.
- Metadata: phase_id=P010; prerequisites=[absolute value nonnegative]; misconception_tags=[negative-bound confusion, center-only answer, and/or confusion]; randomization_constraints=[negative bound].
- Graph/Visual Variant: Empty number line.
- Modeling Variant: Impossible to be less than a negative distance from target.
- Reverse Variant: Create a no-solution absolute inequality.
- Equation Battle Variant: Classification card.
- Multi-stage Boss Variant: Stop before splitting.
- Hint Mapping: H-P010-T011
- Tutorial Mapping: Tut-P010 sections Special Cases
- Socratic Mapping: Soc-P010 special branch

## Template T012 - Greater than negative all real
- Template ID: P010-T012
- Question Type: Number of solutions
- Cognitive Skill: Classify automatic truth
- Difficulty: 3
- Estimated Time: 40 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Recognize `|A| > negative` is all real numbers.
- Example Question: Solve `|x - 2| > -1`.
- Answer: All real numbers.
- Explanation: Absolute value is always at least 0, and every value is greater than -1.
- Distractors: no solution; `1 < x < 3`; `x < 1 or x > 3`; `x = 2`.
- Distractor Rationale: Confuses with less-than negative; uses positive bound; outside split error; center-only answer.
- Randomization Rules: Use absolute value greater than a negative number.
- Validity Constraints: Strict `>` with negative bound gives all real values.
- Metadata: phase_id=P010; prerequisites=[absolute value nonnegative]; misconception_tags=[negative-bound confusion, unnecessary split, center-only answer]; randomization_constraints=[negative bound].
- Graph/Visual Variant: Entire number line shaded.
- Modeling Variant: Any position is more than -1 unit from target.
- Reverse Variant: Create an all-real absolute inequality using a negative bound.
- Equation Battle Variant: Classification card.
- Multi-stage Boss Variant: Ask for reason, not branch solve.
- Hint Mapping: H-P010-T012
- Tutorial Mapping: Tut-P010 sections Special Cases
- Socratic Mapping: Soc-P010 special branch

## Template T013 - Strict greater than zero
- Template ID: P010-T013
- Question Type: Number of solutions
- Cognitive Skill: Exclude the center
- Difficulty: 4
- Estimated Time: 50 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve `|x - h| > 0`.
- Example Question: Solve `|x - 3| > 0`.
- Answer: `x != 3`, or `(-infinity, 3) union (3, infinity)`.
- Explanation: Distance from 3 is greater than 0 for every point except 3 itself.
- Distractors: all real numbers; no solution; `x = 3`; `x < -3 or x > 3`.
- Distractor Rationale: Includes the zero-distance center; misclassifies; equation-style answer; distance-from-zero error.
- Randomization Rules: Use strict greater than zero with shifted center.
- Validity Constraints: Center can be any real number.
- Metadata: phase_id=P010; prerequisites=[zero distance, outside union]; misconception_tags=[includes center, center confusion, all-real confusion]; randomization_constraints=[bound zero].
- Graph/Visual Variant: Open circle at 3, shade both sides.
- Modeling Variant: Any position except exactly on checkpoint.
- Reverse Variant: Write an absolute inequality with solution all real except 3.
- Equation Battle Variant: Split into `x-3<0 or x-3>0`.
- Multi-stage Boss Variant: Graph punctured number line.
- Hint Mapping: H-P010-T013
- Tutorial Mapping: Tut-P010 sections Special Cases
- Socratic Mapping: Soc-P010 zero-bound branch

## Template T014 - Greater than or equal zero
- Template ID: P010-T014
- Question Type: Number of solutions
- Cognitive Skill: Recognize always true nonnegative condition
- Difficulty: 3
- Estimated Time: 40 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve `|A| >= 0`.
- Example Question: Solve `|x - 3| >= 0`.
- Answer: All real numbers.
- Explanation: Absolute value is always nonnegative, so it is always at least 0.
- Distractors: `x != 3`; `x = 3`; no solution; `x <= -3 or x >= 3`.
- Distractor Rationale: Confuses `>` with `>=`; equation-style answer; false impossibility; distance-from-zero error.
- Randomization Rules: Use absolute value greater than or equal to zero.
- Validity Constraints: Bound exactly zero.
- Metadata: phase_id=P010; prerequisites=[absolute value nonnegative]; misconception_tags=[strict/non-strict confusion, center-only answer, distance-from-zero error]; randomization_constraints=[bound zero].
- Graph/Visual Variant: Entire number line shaded.
- Modeling Variant: Any position has nonnegative distance from checkpoint.
- Reverse Variant: Create an all-real `>=0` absolute inequality.
- Equation Battle Variant: Classification card.
- Multi-stage Boss Variant: Explain why center is included.
- Hint Mapping: H-P010-T014
- Tutorial Mapping: Tut-P010 sections Special Cases
- Socratic Mapping: Soc-P010 zero-bound branch

## Template T015 - Graph matching for absolute value inside range
- Template ID: P010-T015
- Question Type: Graph matching
- Cognitive Skill: Match graph to absolute inequality
- Difficulty: 3
- Estimated Time: 50 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Match inside interval graph to absolute value inequality.
- Example Question: Which graph matches `|x + 1| <= 4`?
- Answer: Closed interval from -5 to 3.
- Explanation: Center is -1 and radius is 4; inclusive endpoints are -5 and 3.
- Distractors: open interval from -5 to 3; outside rays from -5 and 3; interval from -4 to 4; closed interval from -3 to 5.
- Distractor Rationale: Endpoint error; inside/outside confusion; ignores center; sign-of-center error.
- Randomization Rules: Use shifted absolute value inequalities with graph choices.
- Validity Constraints: Graph choices must clearly differ.
- Metadata: phase_id=P010; prerequisites=[shifted centers, graphing intervals]; misconception_tags=[endpoint error, inside/outside confusion, sign of center error]; randomization_constraints=[clear graph choices].
- Graph/Visual Variant: Required graph choices.
- Modeling Variant: Choose safe range around a checkpoint.
- Reverse Variant: Given graph `[-5,3]`, write `|x+1|<=4`.
- Equation Battle Variant: Graph gate after solving.
- Multi-stage Boss Variant: Center, radius, graph.
- Hint Mapping: H-P010-T015
- Tutorial Mapping: Tut-P010 sections Graphing Absolute Inequalities
- Socratic Mapping: Soc-P010 graph branch

## Template T016 - Interval notation for outside solution
- Template ID: P010-T016
- Question Type: Multiple choice
- Cognitive Skill: Convert outside solution to interval notation
- Difficulty: 3
- Estimated Time: 45 seconds
- Visual Required: false
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Write outside absolute value solutions in interval notation.
- Example Question: Write the solution of `|x - 2| >= 5` in interval notation.
- Answer: `(-infinity, -3] union [7, infinity)`.
- Explanation: At least 5 units from 2 means `x <= -3` or `x >= 7`; endpoints included.
- Distractors: `[-3,7]`; `(-infinity,-3) union (7,infinity)`; `(-3,7)`; `[-7,3]`.
- Distractor Rationale: Uses inside interval; endpoint error; strict inside interval; sign/center error.
- Randomization Rules: Use outside inclusive absolute inequalities.
- Validity Constraints: Distance positive.
- Metadata: phase_id=P010; prerequisites=[interval notation, outside union]; misconception_tags=[inside/outside confusion, endpoint error, center error]; randomization_constraints=[positive radius].
- Graph/Visual Variant: Optional outside-ray graph.
- Modeling Variant: At least a radius away from target.
- Reverse Variant: Convert interval notation back to `|x-2|>=5`.
- Equation Battle Variant: Representation conversion.
- Multi-stage Boss Variant: Solve, graph, interval.
- Hint Mapping: H-P010-T016
- Tutorial Mapping: Tut-P010 sections Interval Notation
- Socratic Mapping: Soc-P010 interval branch

## Template T017 - Tolerance context
- Template ID: P010-T017
- Question Type: Build the model
- Cognitive Skill: Model within tolerance
- Difficulty: 3
- Estimated Time: 65 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Translate "within" or "at most error" into an absolute value inequality.
- Example Question: A furnace temperature `T` must be within 3 degrees of 70, inclusive. Write and solve an inequality.
- Answer: `|T - 70| <= 3`; `67 <= T <= 73`.
- Explanation: Distance from 70 is at most 3.
- Distractors: `T <= 67 or T >= 73`; `|T - 3| <= 70`; `67 < T < 73`; `T = 67 or 73`.
- Distractor Rationale: Uses outside/or; swaps center and tolerance; endpoint error; equation-style boundary answer.
- Randomization Rules: Use tolerance contexts around a target value.
- Validity Constraints: Tolerance nonnegative; context must state inclusive or strict.
- Metadata: phase_id=P010; prerequisites=[absolute value modeling, compound inequalities]; misconception_tags=[inside/outside confusion, swaps center and tolerance, endpoint error]; randomization_constraints=[nonnegative tolerance].
- Graph/Visual Variant: Thermometer range from 67 to 73.
- Modeling Variant: Tolerance, error, target score, or quality control.
- Reverse Variant: Write a tolerance story for `|T-70|<=3`.
- Equation Battle Variant: Model, convert to compound, solve.
- Multi-stage Boss Variant: Include context interpretation.
- Hint Mapping: H-P010-T017
- Tutorial Mapping: Tut-P010 sections Tolerance Models
- Socratic Mapping: Soc-P010 modeling branch

## Template T018 - Error detection: less-than solved as or
- Template ID: P010-T018
- Question Type: Error detection
- Cognitive Skill: Diagnose inside/outside confusion
- Difficulty: 4
- Estimated Time: 60 seconds
- Visual Required: false
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Correct a less-than absolute value inequality solved as an outside union.
- Example Question: A player solves `|x - 4| < 3` as `x < 1 or x > 7`. What is wrong?
- Answer: They used the outside rule. Because this is `<`, the correct solution is `1 < x < 7`.
- Explanation: Less than means within 3 units of 4, so the solution is between the boundary points.
- Distractors: The player's answer is correct; correct answer is `x <= 1 or x >= 7`; no solution; all real numbers.
- Distractor Rationale: Accepts inside/outside confusion; endpoint error; false classification.
- Randomization Rules: Present common less-than-as-or error.
- Validity Constraints: Correct solution must be a bounded interval.
- Metadata: phase_id=P010; prerequisites=[inside/outside rules, shifted centers]; misconception_tags=[and/or confusion, endpoint error, classification error]; randomization_constraints=[less-than absolute inequality].
- Graph/Visual Variant: Compare inside interval with outside rays.
- Modeling Variant: Safe zone correction.
- Reverse Variant: Write a wrong outside answer for a less-than absolute inequality and fix it.
- Equation Battle Variant: Representation repair.
- Multi-stage Boss Variant: Diagnose, solve, graph.
- Hint Mapping: H-P010-T018
- Tutorial Mapping: Tut-P010 sections Common Mistakes
- Socratic Mapping: Soc-P010 error branch

## Template T019 - Greater-than shifted outside range
- Template ID: P010-T019
- Question Type: Direct computation
- Cognitive Skill: Solve shifted outside inequality
- Difficulty: 3
- Estimated Time: 60 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve `|x - h| > a`.
- Example Question: Solve `|x + 3| > 4`.
- Answer: `x < -7 or x > 1`.
- Explanation: Center is -3. More than 4 units away means outside the interval from -7 to 1.
- Distractors: `-7 < x < 1`; `x <= -7 or x >= 1`; `x < -1 or x > 7`; no solution.
- Distractor Rationale: Uses inside interval; endpoint error; sign-of-center error; misclassifies.
- Randomization Rules: Use shifted greater-than inequalities.
- Validity Constraints: Distance positive; strict endpoint open.
- Metadata: phase_id=P010; prerequisites=[outside union, shifted centers]; misconception_tags=[inside/outside confusion, endpoint error, sign of center error]; randomization_constraints=[positive distance].
- Graph/Visual Variant: Open rays outside -7 and 1.
- Modeling Variant: More than 4 units from portal -3.
- Reverse Variant: Given outside solution, write `|x+3|>4`.
- Equation Battle Variant: Branch to `x+3<-4` or `x+3>4`.
- Multi-stage Boss Variant: Center/radius, outside union, graph.
- Hint Mapping: H-P010-T019
- Tutorial Mapping: Tut-P010 sections Outside Inequalities
- Socratic Mapping: Soc-P010 outside branch

## Template T020 - Absolute value inequality boss
- Template ID: P010-T020
- Question Type: Boss challenge
- Cognitive Skill: Integrated isolate, compound, graph
- Difficulty: 5
- Estimated Time: 110 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve a multi-step absolute value inequality and graph the solution.
- Example Question: Boss Gate: Solve and graph `3|2x - 1| + 4 <= 19`.
- Answer: `-2 <= x <= 3`; interval `[-2, 3]`.
- Explanation: Subtract 4: `3|2x-1| <= 15`. Divide by 3: `|2x-1| <= 5`. Inside rule: `-5 <= 2x - 1 <= 5`. Add 1: `-4 <= 2x <= 6`. Divide by 2: `-2 <= x <= 3`.
- Distractors: `x <= -2 or x >= 3`; `-3 <= x <= 2`; `-2 < x < 3`; no solution.
- Distractor Rationale: Uses outside/or; arithmetic sign error; endpoint error; false classification.
- Randomization Rules: Use outside positive coefficient and constant with isolated nonnegative bound.
- Validity Constraints: Isolated bound nonnegative; inside coefficient nonzero.
- Metadata: phase_id=P010; prerequisites=[isolate absolute value, compound inequalities, graphing]; misconception_tags=[and/or confusion, arithmetic error, endpoint error, classification error]; randomization_constraints=[positive isolated bound].
- Graph/Visual Variant: Boss lane: isolate, inside compound, solve all parts, graph.
- Modeling Variant: Scaled error tolerance gate.
- Reverse Variant: Create a boss inequality with solution `[-2,3]`.
- Equation Battle Variant: Cards `-4`, `/3`, convert to compound, `+1`, `/2`.
- Multi-stage Boss Variant: This is the phase boss template.
- Hint Mapping: H-P010-T020
- Tutorial Mapping: Tut-P010 sections Full Phase Review
- Socratic Mapping: Soc-P010 boss branch

# Part II - Hint Bible

## H-P010-T001
- Hint 1 - Gentle Nudge: Think "distance from 0 is less than 6."
- Hint 2 - Concept Reminder: Less than means inside the boundary points.
- Hint 3 - Focus Hint: The boundary points are -6 and 6.
- Hint 4 - Guided Next Step: Write `-6 < x < 6`.
- Hint 5 - Nearly Complete: Use open endpoints because the inequality is strict.
- Hint 6 - Full Solution: `-6 < x < 6`; interval `(-6,6)`.

## H-P010-T002
- Hint 1 - Gentle Nudge: "At most 4 units from 0" means inside the range.
- Hint 2 - Concept Reminder: `<=` includes endpoints.
- Hint 3 - Focus Hint: The boundaries are -4 and 4.
- Hint 4 - Guided Next Step: Write `-4 <= x <= 4`.
- Hint 5 - Nearly Complete: Use closed endpoints.
- Hint 6 - Full Solution: `[-4,4]`.

## H-P010-T003
- Hint 1 - Gentle Nudge: Greater than means farther away.
- Hint 2 - Concept Reminder: Farther than 5 from 0 means outside the interval.
- Hint 3 - Focus Hint: Use two rays.
- Hint 4 - Guided Next Step: `x < -5 or x > 5`.
- Hint 5 - Nearly Complete: Use open endpoints.
- Hint 6 - Full Solution: `(-infinity,-5) union (5,infinity)`.

## H-P010-T004
- Hint 1 - Gentle Nudge: "At least 3 units" means outside or on the boundary.
- Hint 2 - Concept Reminder: `>=` includes endpoints.
- Hint 3 - Focus Hint: Use `x <= -3 or x >= 3`.
- Hint 4 - Guided Next Step: Closed endpoints at -3 and 3.
- Hint 5 - Nearly Complete: Write the interval union.
- Hint 6 - Full Solution: `(-infinity,-3] union [3,infinity)`.

## H-P010-T005
- Hint 1 - Gentle Nudge: The center is 4.
- Hint 2 - Concept Reminder: Less than means within 3 units of the center.
- Hint 3 - Focus Hint: Compute `4 - 3` and `4 + 3`.
- Hint 4 - Guided Next Step: Boundaries are 1 and 7.
- Hint 5 - Nearly Complete: Strict inequality gives open endpoints.
- Hint 6 - Full Solution: `1 < x < 7`.

## H-P010-T006
- Hint 1 - Gentle Nudge: `|x+2|` means distance from -2.
- Hint 2 - Concept Reminder: At most 5 units means inside, including endpoints.
- Hint 3 - Focus Hint: Boundaries are `-2 - 5` and `-2 + 5`.
- Hint 4 - Guided Next Step: Boundaries are -7 and 3.
- Hint 5 - Nearly Complete: Use closed endpoints.
- Hint 6 - Full Solution: `-7 <= x <= 3`.

## H-P010-T007
- Hint 1 - Gentle Nudge: Less than means make a three-part inequality.
- Hint 2 - Concept Reminder: `|A| < 7` becomes `-7 < A < 7`.
- Hint 3 - Focus Hint: `-7 < 2x - 1 < 7`.
- Hint 4 - Guided Next Step: Add 1 to all three parts.
- Hint 5 - Nearly Complete: `-6 < 2x < 8`, then divide by 2.
- Hint 6 - Full Solution: `-3 < x < 4`.

## H-P010-T008
- Hint 1 - Gentle Nudge: Greater than means outside.
- Hint 2 - Concept Reminder: `|A| > 7` becomes `A < -7 or A > 7`.
- Hint 3 - Focus Hint: `2x - 1 < -7 or 2x - 1 > 7`.
- Hint 4 - Guided Next Step: Add 1 in both branches.
- Hint 5 - Nearly Complete: `2x < -6 or 2x > 8`.
- Hint 6 - Full Solution: `x < -3 or x > 4`.

## H-P010-T009
- Hint 1 - Gentle Nudge: Isolate the absolute value first.
- Hint 2 - Concept Reminder: Subtract 3 from both sides.
- Hint 3 - Focus Hint: `|x - 1| < 4`.
- Hint 4 - Guided Next Step: Convert to `-4 < x - 1 < 4`.
- Hint 5 - Nearly Complete: Add 1 to all three parts.
- Hint 6 - Full Solution: `-3 < x < 5`.

## H-P010-T010
- Hint 1 - Gentle Nudge: First isolate `|x+2|`.
- Hint 2 - Concept Reminder: Add 1, then divide by 2.
- Hint 3 - Focus Hint: `|x+2| >= 4`.
- Hint 4 - Guided Next Step: Use outside branches: `x+2 <= -4 or x+2 >= 4`.
- Hint 5 - Nearly Complete: Subtract 2 in both branches.
- Hint 6 - Full Solution: `x <= -6 or x >= 2`.

## H-P010-T011
- Hint 1 - Gentle Nudge: Absolute value is never negative.
- Hint 2 - Concept Reminder: It cannot be less than -1.
- Hint 3 - Focus Hint: Do not split into branches.
- Hint 4 - Guided Next Step: Classify the solution set.
- Hint 5 - Nearly Complete: No value can work.
- Hint 6 - Full Solution: No solution.

## H-P010-T012
- Hint 1 - Gentle Nudge: Absolute value is always at least 0.
- Hint 2 - Concept Reminder: Every nonnegative number is greater than -1.
- Hint 3 - Focus Hint: The inequality is always true.
- Hint 4 - Guided Next Step: The solution is not a bounded interval.
- Hint 5 - Nearly Complete: Every real number works.
- Hint 6 - Full Solution: All real numbers.

## H-P010-T013
- Hint 1 - Gentle Nudge: Distance greater than 0 excludes only the center.
- Hint 2 - Concept Reminder: `|x-3|=0` only when `x=3`.
- Hint 3 - Focus Hint: Every value except 3 has positive distance from 3.
- Hint 4 - Guided Next Step: Write `x != 3`.
- Hint 5 - Nearly Complete: In interval form, use two open rays.
- Hint 6 - Full Solution: `(-infinity,3) union (3,infinity)`.

## H-P010-T014
- Hint 1 - Gentle Nudge: Absolute value is never below 0.
- Hint 2 - Concept Reminder: `>= 0` includes zero distance too.
- Hint 3 - Focus Hint: Even `x=3` works.
- Hint 4 - Guided Next Step: Every real number works.
- Hint 5 - Nearly Complete: The graph is the whole number line.
- Hint 6 - Full Solution: All real numbers.

## H-P010-T015
- Hint 1 - Gentle Nudge: Find the center first.
- Hint 2 - Concept Reminder: `|x+1|` has center -1.
- Hint 3 - Focus Hint: Radius is 4 and endpoints are included.
- Hint 4 - Guided Next Step: Compute `-1 - 4` and `-1 + 4`.
- Hint 5 - Nearly Complete: Boundaries are -5 and 3.
- Hint 6 - Full Solution: Closed interval from -5 to 3.

## H-P010-T016
- Hint 1 - Gentle Nudge: At least means outside.
- Hint 2 - Concept Reminder: Center is 2 and radius is 5.
- Hint 3 - Focus Hint: Boundary points are -3 and 7.
- Hint 4 - Guided Next Step: Use closed outside rays.
- Hint 5 - Nearly Complete: `x <= -3 or x >= 7`.
- Hint 6 - Full Solution: `(-infinity,-3] union [7,infinity)`.

## H-P010-T017
- Hint 1 - Gentle Nudge: "Within 3 degrees" means distance from 70 is at most 3.
- Hint 2 - Concept Reminder: At most uses `<=`.
- Hint 3 - Focus Hint: Write `|T - 70| <= 3`.
- Hint 4 - Guided Next Step: Convert to `-3 <= T - 70 <= 3`.
- Hint 5 - Nearly Complete: Add 70 to all three parts.
- Hint 6 - Full Solution: `67 <= T <= 73`.

## H-P010-T018
- Hint 1 - Gentle Nudge: Check the inequality symbol.
- Hint 2 - Concept Reminder: Less than absolute value means inside, not outside.
- Hint 3 - Focus Hint: The center is 4 and radius is 3.
- Hint 4 - Guided Next Step: Inside range is from 1 to 7.
- Hint 5 - Nearly Complete: Use strict endpoints.
- Hint 6 - Full Solution: The error is using `or`; correct solution is `1 < x < 7`.

## H-P010-T019
- Hint 1 - Gentle Nudge: Greater than means outside the distance band.
- Hint 2 - Concept Reminder: `|x+3|` has center -3.
- Hint 3 - Focus Hint: Boundaries are -7 and 1.
- Hint 4 - Guided Next Step: Use outside branches.
- Hint 5 - Nearly Complete: Strict endpoints mean open rays.
- Hint 6 - Full Solution: `x < -7 or x > 1`.

## H-P010-T020
- Hint 1 - Gentle Nudge: Isolate the absolute value first.
- Hint 2 - Concept Reminder: Undo `+4`, then undo multiplication by 3.
- Hint 3 - Focus Hint: `|2x - 1| <= 5`.
- Hint 4 - Guided Next Step: Convert to `-5 <= 2x - 1 <= 5`.
- Hint 5 - Nearly Complete: Add 1, then divide by 2.
- Hint 6 - Full Solution: `-2 <= x <= 3`.

# Part III - Tutorial Bible

## Learning Goal
Learn to solve absolute value inequalities by interpreting them as distance conditions: inside a range for less-than, outside a range for greater-than.

## Why It Matters
Absolute value inequalities describe tolerances, errors, safe zones, target ranges, and excluded danger zones. They connect directly to domain restrictions, graph intervals, and piecewise thinking.

## Prerequisite Check
Ask the player:

1. What does `|x - 4|` measure? Expected: distance from 4.
2. Solve `|x - 4| = 3`. Expected: `x = 1` or `x = 7`.
3. What does "and" mean in a compound inequality? Expected: overlap.
4. What does "or" mean? Expected: union.
5. Can absolute value be negative? Expected: no.

## Core Concept
Absolute value is distance.

If the distance is less than a number, the values are inside a band.

`|x| < 6` means `-6 < x < 6`.

If the distance is greater than a number, the values are outside a band.

`|x| > 6` means `x < -6 or x > 6`.

## Inside Inequalities
Use inside ranges for:

- `|A| < k`: `-k < A < k`
- `|A| <= k`: `-k <= A <= k`

Example:

`|2x - 1| < 7`
`-7 < 2x - 1 < 7`
`-6 < 2x < 8`
`-3 < x < 4`

## Outside Inequalities
Use outside unions for:

- `|A| > k`: `A < -k or A > k`
- `|A| >= k`: `A <= -k or A >= k`

Example:

`|2x - 1| > 7`
`2x - 1 < -7 or 2x - 1 > 7`
`x < -3 or x > 4`

## Isolate First
For `3|2x - 1| + 4 <= 19`, isolate first:

`3|2x - 1| <= 15`
`|2x - 1| <= 5`

Then use the inside rule.

## Special Cases
- `|A| < negative`: no solution.
- `|A| > negative`: all real numbers.
- `|A| > 0`: all real numbers except where `A = 0`.
- `|A| >= 0`: all real numbers.

## Common Mistakes
- Mistake: Using `or` for less-than.
  Correction: Less-than means inside, an "and" interval.
- Mistake: Using `and` for greater-than.
  Correction: Greater-than means outside, an "or" union.
- Mistake: Forgetting to isolate first.
  Correction: Make the absolute value expression stand alone.
- Mistake: Using the wrong endpoint.
  Correction: Strict symbols use open endpoints; inclusive symbols use closed endpoints.
- Mistake: Ignoring special cases with negative or zero bounds.
  Correction: Use distance meaning before branching.

## Guided Practice
1. Solve `|x - 2| < 5`.
   - Inside: `-5 < x - 2 < 5`.
   - Add 2: `-3 < x < 7`.

2. Solve `|x + 1| >= 4`.
   - Outside: `x + 1 <= -4 or x + 1 >= 4`.
   - `x <= -5 or x >= 3`.

3. Solve `2|x| - 3 < 5`.
   - `2|x| < 8`.
   - `|x| < 4`.
   - `-4 < x < 4`.

## Independent Practice
1. `|x| <= 8`; answer `[-8,8]`.
2. `|x - 5| > 2`; answer `x < 3 or x > 7`.
3. `|2x + 4| < 10`; answer `-7 < x < 3`.
4. `|x + 6| >= 1`; answer `x <= -7 or x >= -5`.
5. `|x - 1| < -3`; answer no solution.

## Mastery Check
The player is ready to advance when they can:

1. Identify inside versus outside rules.
2. Isolate absolute value before solving.
3. Graph bounded and split solutions.
4. Handle negative and zero special cases.
5. Translate a tolerance context into an absolute value inequality.

Mastery check set:

1. `|x - 3| <= 6`; solution `-3 <= x <= 9`.
2. `|x + 2| > 5`; solution `x < -7 or x > 3`.
3. `2|x - 1| + 4 < 12`; solution `-3 < x < 5`.
4. `|3x| >= 12`; solution `x <= -4 or x >= 4`.
5. `|x + 1| >= 0`; all real numbers.

## Adaptive Tutor Messages
- If the player uses `or` for less-than: "Less than means close to the center, so use the inside interval."
- If the player uses `and` for greater-than: "Greater than means far from the center, so use outside rays."
- If the player branches before isolating: "First make the absolute value expression stand alone."
- If endpoint errors repeat: "Check whether equality is included."
- If special-case errors occur: "Before splitting, ask whether the distance bound is negative, zero, or positive."
- If the player succeeds quickly: "You are ready to use intervals as domains and restrictions."

## Tutorial Metadata
- Tutorial ID: Tut-P010
- Estimated duration: 5 minutes
- Target player state: knows absolute value equations and compound inequalities
- Unlock condition: available from any Phase 010 question
- Remediation trigger: two inside/outside reversals, two isolate-first errors, two endpoint errors, or one negative-bound classification error
- Advancement trigger: 80 percent accuracy on mixed absolute value inequalities plus correct graphing of one inside and one outside solution

# Part IV - Socratic Dialogue Bible

## Opening Diagnostic
Tutor: "Does `|x - 4| < 3` describe values inside 3 units of 4 or outside 3 units of 4?"

Expected strong answer: "Inside 3 units of 4, so `1 < x < 7`."

## Guided Discovery
Tutor sequence:

1. "Is the absolute value isolated?"
2. "Is the symbol less-than type or greater-than type?"
3. "Does that mean inside or outside the distance band?"
4. "What is the center?"
5. "What is the distance/radius?"
6. "Are endpoints included?"
7. "Should the answer use `and` or `or`?"
8. "What is the graph or interval notation?"
9. "Can a test value confirm the region?"

## Correct Branch
Player: "Inside."

Tutor: "Good. What are the two boundary points 3 units from 4?"

If player says 1 and 7, ask whether endpoints are included.

## Partial Understanding Branch
Player gives `1` and `7` but writes `x < 1 or x > 7`.

Tutor: "Those are the correct boundaries. Now ask: less than 3 units means between them or outside them?"

## Misconception Branch
Player: "Outside."

Tutor: "Test a value close to 4, like `x = 4`. The distance is 0. Is 0 less than 3?"

Recovery target: Player recognizes inside interval.

## Unsure Branch
Player: "I don't know."

Tutor: "Read the symbol first. Is it a less-than symbol or a greater-than symbol?"

If player says less-than: "Less than a distance means close to the center. Should close values be inside or outside?"

## Unrelated Response Branch
Player gives an unrelated answer.

Tutor: "Let's focus on the distance phrase. In `|x - 4| < 3`, is the center 4 or 3?"

If unrelated again, use a two-choice prompt about center and radius.

## Recovery Prompts
- "Is the absolute value isolated?"
- "Is the inequality less-than or greater-than?"
- "Does that mean inside or outside?"
- "What are the boundary points?"
- "Are endpoints open or closed?"
- "Should the answer be an `and` interval or an `or` union?"
- "What test value confirms the graph?"

## Reflection Question
"Why does `|x - 4| < 3` use `and`, while `|x - 4| > 3` uses `or`?"

Strong reflection: "Less than means values must be between both boundaries at the same time, but greater than means values can be on either outside side."

## Transfer Question
"How can absolute value inequalities help describe a function domain?"

Expected transfer: "They describe allowed input intervals or excluded regions using distance from a center."

## Escalation Rules
- If inside/outside confusion repeats, show Inside Inequalities and Outside Inequalities.
- If the player forgets to isolate first, show Isolate First.
- If endpoint errors repeat, show graphing examples with strict and inclusive symbols.
- If special-case errors repeat, show Special Cases.
- If modeling errors repeat, show Tolerance Models.
- If the player solves three mixed examples and graphs correctly, advance to independent practice.

## Exit Condition
The Socratic sequence is complete when the player:

1. Identifies inside versus outside structure.
2. Isolates the absolute value when needed.
3. Writes the correct compound inequality.
4. Solves and graphs the solution set.
5. Checks with distance meaning or a test value.

# Knowledge Graph

- Prerequisites: Phase 007 linear inequalities; Phase 008 compound inequalities; Phase 009 absolute value equations; number-line graphing; interval notation; distance interpretation
- Concepts Unlocked: inside absolute value inequalities; outside absolute value inequalities; tolerance models; split solution sets; special negative/zero bound cases; punctured intervals
- Related Concepts: domain restrictions; piecewise functions; graph transformations; error bounds; distance from target
- Common Misconceptions: less-than as or; greater-than as and; not isolating first; endpoint errors; negative-bound misclassification; center/radius confusion; graphing inside instead of outside
- Remedial Phases: Phase 007 review; Phase 008 review; Phase 009 review; interval notation mini-lesson; absolute distance mini-lesson
- Follow-up Phases: Phase 015 - Domain from formulas; Phase 016 - Domain from graphs; Phase 021 - Piecewise functions; Phase 033 - Rational expression simplification
- Transfer Topics: tolerance intervals; error bounds; domains; excluded intervals; piecewise absolute value graphs

# Validation Notes

## Structure Validation
- Includes all required Bibles and metadata sections.
- Contains exactly 20 template families, within the required 20-40 range.
- Each template includes example, answer, explanation, distractors, distractor rationale, randomization rules, validity constraints, metadata, variants, and mappings.
- Every template has six progressive hints.

## Math Validation
- T001: `|x|<6` -> `-6<x<6`.
- T002: `|x|<=4` -> `-4<=x<=4`.
- T003: `|x|>5` -> `x<-5 or x>5`.
- T004: `|x|>=3` -> `x<=-3 or x>=3`.
- T005: `|x-4|<3` -> `1<x<7`.
- T006: `|x+2|<=5` -> `-7<=x<=3`.
- T007: `|2x-1|<7` -> `-7<2x-1<7` -> `-3<x<4`.
- T008: `|2x-1|>7` -> `x<-3 or x>4`.
- T009: `|x-1|+3<7` -> `|x-1|<4` -> `-3<x<5`.
- T010: `2|x+2|-1>=7` -> `|x+2|>=4` -> `x<=-6 or x>=2`.
- T011: `|x-2|<-1` -> no solution.
- T012: `|x-2|>-1` -> all real numbers.
- T013: `|x-3|>0` -> all real numbers except 3.
- T014: `|x-3|>=0` -> all real numbers.
- T015: `|x+1|<=4` -> `-5<=x<=3`.
- T016: `|x-2|>=5` -> `x<=-3 or x>=7`.
- T017: `|T-70|<=3` -> `67<=T<=73`.
- T018: `|x-4|<3` is inside `1<x<7`; outside answer is wrong.
- T019: `|x+3|>4` -> `x<-7 or x>1`.
- T020: `3|2x-1|+4<=19` -> `|2x-1|<=5` -> `-2<=x<=3`.

## Distractor Validation
- Distractors reflect inside/outside reversals, endpoint errors, center/radius confusion, isolate-first errors, and special-case misclassification.
- Multiple-choice-style templates have exactly one correct answer.
- Graph and interval distractors were checked against endpoint and shading rules.

## Hint Validation
- Each hint sequence moves from distance interpretation to inside/outside selection, boundary formation, endpoint decision, and final graph/interval.
- Special-case hints stop before invalid branching.

## Tutorial Validation
- Tutorial includes learning goal, prerequisite check, why it matters, core concept, inside inequalities, outside inequalities, isolate-first rule, special cases, common mistakes, guided practice, independent practice, mastery check, adaptive messages, and metadata.

## Socratic Validation
- Dialogue includes diagnostic, guided discovery, correct branch, partial branch, misconception branch, unsure branch, unrelated branch, recovery prompts, reflection, transfer, escalation rules, and exit condition.
- Tutor uses test values to recover from inside/outside confusion.

## Metadata Validation
- Every template includes IDs, difficulty, timing, visual flag, compatibility flags, prerequisites, misconception tags, randomization constraints, and support-system mappings.

## Known Issues
- The repository specifications differ on the label for Hint 4. This phase uses "Guided Next Step" to match the master prompt language.
- `PHASE_TEMPLATE.md` omits Common Misconceptions from the Knowledge Graph section, but this phase includes it because the master prompt and knowledge graph guide require it.
