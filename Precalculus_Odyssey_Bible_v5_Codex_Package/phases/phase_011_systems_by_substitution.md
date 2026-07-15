# Phase 011 - Systems by Substitution

## Phase Metadata
- Course: Precalculus Odyssey Bible v5
- Topic: Systems by substitution
- Subtopic: Solving two-variable linear systems by replacing one variable expression with an equivalent expression
- Prerequisites: Phase 001 one-step linear equations, Phase 002 multi-step linear equations, Phase 003 variables on both sides, Phase 005 linear equation modeling, ordered pairs, coordinate graph intersections
- Related phases: Phase 012 - Systems by elimination; Phase 013 - Systems by graphing; Phase 014 - Function notation; Phase 022 - Quadratic factoring
- Estimated phase size: 20 template families, 20 core examples, 120 progressive hints, 1 tutorial sequence, 1 Socratic dialogue system

## Learning Objectives
By the end of this phase, the player can:

1. Explain why substitution works as replacing a variable with an equal expression.
2. Solve systems where one variable is already isolated.
3. Rearrange one equation to isolate a convenient variable before substituting.
4. Use parentheses correctly when substituting multi-term expressions.
5. Solve the resulting one-variable equation accurately.
6. Back-substitute to find the second coordinate.
7. Write final answers as ordered pairs.
8. Recognize no-solution and infinitely-many-solution systems from substitution results.
9. Model real contexts with two equations and solve by substitution.
10. Connect substitution solutions to graph intersections.

## Prerequisite Review
- An ordered pair `(x,y)` solves a system only when it makes both equations true.
- If `y = 2x + 1`, any occurrence of `y` in the other equation can be replaced by `2x + 1`.
- A one-variable linear equation can have one solution, no solution, or infinitely many solutions.
- Parentheses preserve grouping when substituting an expression like `3x - 4`.
- A system solution is usually written as `(x,y)`, not as two disconnected numbers.

## Core Concepts
- Substitution uses equality as permission to replace. If one equation says `y = expression`, then the expression has the same value as `y`.
- The standard substitution path is:
  1. Isolate one variable if needed.
  2. Substitute that expression into the other equation.
  3. Solve the one-variable equation.
  4. Back-substitute into either original equation.
  5. Check both equations and write the ordered pair.
- Special results matter:
  - A false statement like `4 = 9` means no solution.
  - A true statement like `0 = 0` means infinitely many solutions, because the equations describe the same line.
- Substitution is especially efficient when one variable already has coefficient 1 or -1.

## Common Misconceptions
- Substituting into the same equation that created the expression, producing an identity and no progress.
- Dropping parentheses around a substituted expression.
- Solving for one coordinate but forgetting to find the other.
- Writing `(y,x)` instead of `(x,y)`.
- Treating `0 = 0` as the ordered pair `(0,0)`.
- Treating a contradiction such as `5 = 2` as a calculation mistake instead of no solution.
- Choosing a difficult variable to isolate when an easier one is available.
- Checking the answer in only one equation.

# Part I - Question Bible

## Template T001 - Substitute when y is already isolated
- Template ID: P011-T001
- Question Type: Direct computation
- Cognitive Skill: Replace isolated `y` and solve for `x`
- Difficulty: 2
- Estimated Time: 60 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve a system by substituting an already-isolated `y` expression.
- Example Question: Solve by substitution: `y = 2x + 1` and `x + y = 10`.
- Answer: `(3,7)`.
- Explanation: Substitute `2x+1` for `y` in `x+y=10`: `x+2x+1=10`, so `3x=9` and `x=3`. Then `y=2(3)+1=7`.
- Distractors: `(7,3)`; `(3,6)`; `(4,9)`; `x=3`
- Distractor Rationale: Reverses coordinates; misses the `+1`; substitutes into the wrong expression; gives only one coordinate.
- Randomization Rules: Use `y = ax + b` and `px + y = q` with integer solution coordinates.
- Validity Constraints: Choose `a`, `b`, `p`, and solution so the resulting one-variable equation has a unique integer solution.
- Metadata: phase_id=P011; prerequisites=[linear equations, ordered pairs]; misconception_tags=[coordinate reversal, arithmetic error, incomplete answer]; randomization_constraints=[integer solution, y isolated].
- Graph/Visual Variant: Show two lines and ask for the intersection, then verify by substitution.
- Modeling Variant: Total score equals base plus bonus expression.
- Reverse Variant: Given `(3,7)`, create `y=2x+1` and a second equation it satisfies.
- Equation Battle Variant: Card sequence: substitute `2x+1`, combine like terms, subtract 1, divide by 3, back-substitute.
- Multi-stage Boss Variant: Include a check in both equations after solving.
- Hint Mapping: H-P011-T001
- Tutorial Mapping: Tut-P011 sections Already Isolated Variables
- Socratic Mapping: Soc-P011 substitution branch

## Template T002 - Substitute when x is already isolated
- Template ID: P011-T002
- Question Type: Direct computation
- Cognitive Skill: Replace isolated `x` and solve for `y`
- Difficulty: 2
- Estimated Time: 60 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve a system by substituting an already-isolated `x` expression.
- Example Question: Solve by substitution: `x = y - 4` and `2x + y = 7`.
- Answer: `(1,5)`.
- Explanation: Substitute `y-4` for `x`: `2(y-4)+y=7`. Then `2y-8+y=7`, so `3y=15`, `y=5`, and `x=1`.
- Distractors: `(5,1)`; `(1,4)`; `(3,7)`; `y=5`
- Distractor Rationale: Reverses coordinates; forgets `-4`; arithmetic error; gives only one coordinate.
- Randomization Rules: Use `x = ay + b` and `cx + dy = e` with integer solution coordinates.
- Validity Constraints: The second equation must be internally consistent with the stated answer; avoid coefficient choices that make the substituted variable cancel unless this is a special-case template.
- Metadata: phase_id=P011; prerequisites=[linear equations, substitution]; misconception_tags=[coordinate reversal, back-substitution error, incomplete answer]; randomization_constraints=[integer solution, x isolated].
- Graph/Visual Variant: Highlight vertical coordinate first, then map to ordered pair.
- Modeling Variant: One quantity is four less than another.
- Reverse Variant: Given `(1,5)`, write a system where `x=y-4`.
- Equation Battle Variant: Substitute the `x` expression into the second equation, distribute, solve for `y`, then back-substitute.
- Multi-stage Boss Variant: Ask for the equation after substitution and the final ordered pair.
- Hint Mapping: H-P011-T002
- Tutorial Mapping: Tut-P011 sections Already Isolated Variables
- Socratic Mapping: Soc-P011 x-isolated branch

## Template T003 - Substitute a constant variable value
- Template ID: P011-T003
- Question Type: Direct computation
- Cognitive Skill: Use a fixed coordinate in the other equation
- Difficulty: 2
- Estimated Time: 45 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve a system when one equation gives `x` or `y` directly.
- Example Question: Solve: `x = 4` and `3x + 2y = 22`.
- Answer: `(4,5)`.
- Explanation: Substitute `4` for `x`: `3(4)+2y=22`, so `12+2y=22`, `2y=10`, and `y=5`.
- Distractors: `(5,4)`; `(4,17)`; `(4,10)`; `x=4`
- Distractor Rationale: Reverses coordinates; subtracts incorrectly; forgets to divide by 2; incomplete answer.
- Randomization Rules: Use `x=c` or `y=c` with one linear equation that gives an integer second coordinate.
- Validity Constraints: The fixed value must produce a unique second coordinate.
- Metadata: phase_id=P011; prerequisites=[one-step equations, ordered pairs]; misconception_tags=[coordinate reversal, incomplete answer, arithmetic error]; randomization_constraints=[integer coordinates].
- Graph/Visual Variant: Interpret `x=4` as a vertical line meeting another line.
- Modeling Variant: One value is fixed by a rule or game state.
- Reverse Variant: Build a system with solution `(4,5)` using one fixed-coordinate equation.
- Equation Battle Variant: Fixed-value substitution card, simplify, isolate the remaining variable.
- Multi-stage Boss Variant: Include graph interpretation of a vertical or horizontal line.
- Hint Mapping: H-P011-T003
- Tutorial Mapping: Tut-P011 sections Fixed Coordinate Cases
- Socratic Mapping: Soc-P011 constant branch

## Template T004 - Isolate y before substituting
- Template ID: P011-T004
- Question Type: Direct computation
- Cognitive Skill: Rearrange one equation for `y`
- Difficulty: 3
- Estimated Time: 80 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Isolate `y` from one equation, then substitute into the other.
- Example Question: Solve by substitution: `x + y = 9` and `2x - y = 3`.
- Answer: `(4,5)`.
- Explanation: From `x+y=9`, isolate `y=9-x`. Substitute into `2x-y=3`: `2x-(9-x)=3`, so `2x-9+x=3`, `3x=12`, `x=4`, and `y=5`.
- Distractors: `(5,4)`; `(4,-5)`; `(3,6)`; no solution.
- Distractor Rationale: Reverses coordinates; mishandles subtraction of `9-x`; arithmetic error; misclassifies a unique solution.
- Randomization Rules: Use one sum equation `x+y=s` and one linear equation with `y` coefficient `1` or `-1`.
- Validity Constraints: The chosen equations must yield a unique integer ordered pair.
- Metadata: phase_id=P011; prerequisites=[isolating variables, distribution of negatives]; misconception_tags=[parentheses error, coordinate reversal, false special case]; randomization_constraints=[integer solution].
- Graph/Visual Variant: Compare the substitution result to a line intersection.
- Modeling Variant: Total quantity and difference-style constraint.
- Reverse Variant: Given a solution and total, create a second line that intersects there.
- Equation Battle Variant: Isolate `y`, substitute, distribute the negative, solve, back-substitute.
- Multi-stage Boss Variant: Ask the player to choose which equation to isolate first.
- Hint Mapping: H-P011-T004
- Tutorial Mapping: Tut-P011 sections Isolate Before Substituting
- Socratic Mapping: Soc-P011 isolate branch

## Template T005 - Isolate x before substituting
- Template ID: P011-T005
- Question Type: Direct computation
- Cognitive Skill: Rearrange one equation for `x`
- Difficulty: 3
- Estimated Time: 80 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Isolate `x` from one equation, then solve the system.
- Example Question: Solve by substitution: `x - 2y = -1` and `3x + y = 18`.
- Answer: `(5,3)`.
- Explanation: From `x-2y=-1`, isolate `x=2y-1`. Substitute into `3x+y=18`: `3(2y-1)+y=18`, so `6y-3+y=18`, `7y=21`, `y=3`, and `x=5`.
- Distractors: `(3,5)`; `(5,-3)`; `(4,3)`; `y=3`
- Distractor Rationale: Reverses coordinates; sign error while isolating; arithmetic error; gives only one coordinate.
- Randomization Rules: Use one equation with `x` coefficient 1 or -1 and a second linear equation with integer solution.
- Validity Constraints: Check that both equations are consistent with the example ordered pair and that the substituted equation has a nonzero coefficient.
- Metadata: phase_id=P011; prerequisites=[literal isolation, distribution]; misconception_tags=[sign error, coordinate reversal, incomplete answer]; randomization_constraints=[integer solution, x easy to isolate].
- Graph/Visual Variant: Use intersection point verification after substitution.
- Modeling Variant: One inventory count is two times another minus one.
- Reverse Variant: Create a system with solution `(5,3)` and an equation easy to solve for `x`.
- Equation Battle Variant: Isolate `x`, substitute into second equation, distribute 3, solve for `y`.
- Multi-stage Boss Variant: Include a strategic choice between isolating `x` and isolating `y`.
- Hint Mapping: H-P011-T005
- Tutorial Mapping: Tut-P011 sections Isolate Before Substituting
- Socratic Mapping: Soc-P011 isolate-x branch

## Template T006 - Parentheses after substitution
- Template ID: P011-T006
- Question Type: Error-resistant computation
- Cognitive Skill: Preserve grouping when replacing a variable with a binomial
- Difficulty: 3
- Estimated Time: 85 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Use parentheses to substitute a multi-term expression correctly.
- Example Question: Solve: `y = 3x - 4` and `2y - x = 7`.
- Answer: `(3,5)`.
- Explanation: Substitute with parentheses: `2(3x-4)-x=7`. Then `6x-8-x=7`, so `5x=15`, `x=3`, and `y=5`.
- Distractors: `(3,9)`; `(5,3)`; `(15,41)`; `(3,2)`
- Distractor Rationale: Forgets to multiply `-4` by 2; reverses coordinates; treats `2(3x-4)` as `6x-4`; substitutes into only part of the equation.
- Randomization Rules: Use `y=ax+b` substituted into `cy+dx=e` where `c` is not 1.
- Validity Constraints: Require parentheses around the substituted expression; generated examples must have integer coordinates.
- Metadata: phase_id=P011; prerequisites=[distribution, combining like terms]; misconception_tags=[parentheses error, distribution error, coordinate reversal]; randomization_constraints=[integer solution, multiplier outside expression].
- Graph/Visual Variant: Color-code the whole substituted expression as one chunk.
- Modeling Variant: A doubled adjusted score equals a target expression.
- Reverse Variant: Write a system where a parenthesis error produces a tempting wrong answer.
- Equation Battle Variant: Substitute-expression card must wrap the expression before multiplying.
- Multi-stage Boss Variant: Ask the player to identify the necessary parentheses before solving.
- Hint Mapping: H-P011-T006
- Tutorial Mapping: Tut-P011 sections Parentheses Matter
- Socratic Mapping: Soc-P011 parentheses branch

## Template T007 - Fraction coefficients in substitution
- Template ID: P011-T007
- Question Type: Direct computation
- Cognitive Skill: Clear fractions after substitution
- Difficulty: 4
- Estimated Time: 95 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve a substitution system involving fractional coefficients.
- Example Question: Solve: `y = (1/2)x + 2` and `x + 2y = 12`.
- Answer: `(4,4)`.
- Explanation: Substitute: `x + 2((1/2)x+2)=12`. Then `x+x+4=12`, so `2x=8`, `x=4`, and `y=4`.
- Distractors: `(4,6)`; `(6,4)`; `(2,3)`; `(8,6)`
- Distractor Rationale: Forgets the outside 2; reverses or mismatches coordinates; halves the wrong term; omits back-substitution.
- Randomization Rules: Use fractional slope such as `1/2`, `1/3`, or `2/3` paired with an equation that clears cleanly.
- Validity Constraints: The resulting coordinates should be integers or simple fractions appropriate to the difficulty.
- Metadata: phase_id=P011; prerequisites=[fraction arithmetic, distribution]; misconception_tags=[fraction distribution error, coordinate reversal, incomplete substitution]; randomization_constraints=[fraction clears cleanly].
- Graph/Visual Variant: Show the fractional slope line and the total equation line.
- Modeling Variant: Half-rate bonus plus fixed amount.
- Reverse Variant: Create a fractional-slope system with solution `(4,4)`.
- Equation Battle Variant: Substitute, distribute 2 through the fraction, combine, solve.
- Multi-stage Boss Variant: Include a clear-fractions card before solving.
- Hint Mapping: H-P011-T007
- Tutorial Mapping: Tut-P011 sections Fractions and Decimals
- Socratic Mapping: Soc-P011 fractions branch

## Template T008 - Decimal substitution in a money context
- Template ID: P011-T008
- Question Type: Modeling computation
- Cognitive Skill: Substitute one cost expression into a total equation
- Difficulty: 3
- Estimated Time: 90 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Use substitution to solve a decimal-valued system from context.
- Example Question: A game shop sells a charm for `c` dollars and a rune for `r` dollars. A rune costs `$1.50` more than a charm, so `r = c + 1.50`. Two charms and one rune cost `$10.50`: `2c + r = 10.50`. Find each price.
- Answer: Charm `$3.00`, rune `$4.50`.
- Explanation: Substitute `c+1.50` for `r`: `2c+c+1.50=10.50`, so `3c=9.00`, `c=3.00`, and `r=4.50`.
- Distractors: Charm `$4.50`, rune `$3.00`; charm `$3.50`, rune `$5.00`; charm `$3.00`, rune `$1.50`; `$3.00` only.
- Distractor Rationale: Reverses the price relationship; divides before subtracting; treats `1.50` as the rune price; gives only one price.
- Randomization Rules: Use decimal offsets in cents that lead to whole-dollar or quarter-dollar answers.
- Validity Constraints: Prices must be positive and satisfy both equations.
- Metadata: phase_id=P011; prerequisites=[decimal equations, modeling]; misconception_tags=[relationship reversal, arithmetic error, incomplete answer]; randomization_constraints=[positive prices, clean currency].
- Graph/Visual Variant: Table of price pairs narrowing to the intersection.
- Modeling Variant: This template is the modeling variant.
- Reverse Variant: Given two prices, write a price-difference system.
- Equation Battle Variant: Substitute price expression, combine item counts, subtract decimal offset, divide.
- Multi-stage Boss Variant: Include units and a check against the purchase total.
- Hint Mapping: H-P011-T008
- Tutorial Mapping: Tut-P011 sections Modeling With Substitution
- Socratic Mapping: Soc-P011 modeling branch

## Template T009 - Negative coefficient and sign care
- Template ID: P011-T009
- Question Type: Direct computation
- Cognitive Skill: Substitute and solve with negative coefficients
- Difficulty: 3
- Estimated Time: 85 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Avoid sign errors when substitution creates negative terms.
- Example Question: Solve: `y = -2x + 9` and `3x + y = 14`.
- Answer: `(5,-1)`.
- Explanation: Substitute: `3x+(-2x+9)=14`. Then `x+9=14`, so `x=5`. Back-substitute: `y=-2(5)+9=-1`.
- Distractors: `(5,1)`; `(-5,19)`; `(-1,5)`; `(14,-19)`
- Distractor Rationale: Drops the negative sign; solves with the wrong sign; reverses coordinates; substitutes into the original incorrectly.
- Randomization Rules: Use `y=-ax+b` with a second equation that combines to a one-step equation.
- Validity Constraints: Resulting `y` may be negative, but coordinates must satisfy both equations.
- Metadata: phase_id=P011; prerequisites=[integer arithmetic, negative coefficients]; misconception_tags=[sign error, coordinate reversal, back-substitution error]; randomization_constraints=[unique integer solution].
- Graph/Visual Variant: Show a downward-sloping line intersecting another line.
- Modeling Variant: Remaining energy decreases as turns increase.
- Reverse Variant: Create a system with a negative `y` coordinate.
- Equation Battle Variant: Substitute signed expression, combine `3x-2x`, subtract 9, solve.
- Multi-stage Boss Variant: Include a check specifically targeting the negative coordinate.
- Hint Mapping: H-P011-T009
- Tutorial Mapping: Tut-P011 sections Sign Care
- Socratic Mapping: Soc-P011 sign branch

## Template T010 - No solution from contradiction
- Template ID: P011-T010
- Question Type: Classification
- Cognitive Skill: Interpret a false statement after substitution
- Difficulty: 3
- Estimated Time: 70 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Recognize that a contradiction after substitution means no solution.
- Example Question: Solve or classify: `y = 2x + 1` and `2y = 4x + 8`.
- Answer: No solution.
- Explanation: Substitute `2x+1` for `y`: `2(2x+1)=4x+8`, so `4x+2=4x+8`. Subtract `4x`: `2=8`, false. The lines are parallel and never meet.
- Distractors: `(0,1)`; infinitely many solutions; `(2,5)`; `x=0`
- Distractor Rationale: Checks only the first equation; confuses contradiction with identity; picks a point on one line; gives a partial value.
- Randomization Rules: Use two equations with equal slopes and different intercepts.
- Validity Constraints: Substitution must reduce to a false constant statement.
- Metadata: phase_id=P011; prerequisites=[linear equation special cases, slope intuition]; misconception_tags=[special-case confusion, one-equation checking, incomplete answer]; randomization_constraints=[same slope, different intercept].
- Graph/Visual Variant: Show parallel lines with no intersection.
- Modeling Variant: Two incompatible pricing rules for the same relationship.
- Reverse Variant: Create a system that reduces to `3=7`.
- Equation Battle Variant: Substitute, simplify, cancel variable terms, classify contradiction.
- Multi-stage Boss Variant: Ask for algebra classification and graph interpretation.
- Hint Mapping: H-P011-T010
- Tutorial Mapping: Tut-P011 sections Special Cases
- Socratic Mapping: Soc-P011 contradiction branch

## Template T011 - Infinitely many solutions from identity
- Template ID: P011-T011
- Question Type: Classification
- Cognitive Skill: Interpret a true statement after substitution
- Difficulty: 3
- Estimated Time: 70 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Recognize that an identity after substitution means infinitely many solutions.
- Example Question: Solve or classify: `y = 3x - 2` and `2y = 6x - 4`.
- Answer: Infinitely many solutions.
- Explanation: Substitute `3x-2` for `y`: `2(3x-2)=6x-4`, so `6x-4=6x-4`. This is always true, so both equations describe the same line.
- Distractors: no solution; `(0,-2)` only; `(2,4)` only; `(0,0)`
- Distractor Rationale: Confuses identity with contradiction; picks one point on the line; picks another single point; assumes identity means origin.
- Randomization Rules: Use two equivalent linear equations written in different forms.
- Validity Constraints: Substitution must reduce to a true identity.
- Metadata: phase_id=P011; prerequisites=[identity equations, line equivalence]; misconception_tags=[special-case confusion, single-point answer, origin assumption]; randomization_constraints=[same line].
- Graph/Visual Variant: Show two equations lying on the same line.
- Modeling Variant: Two teams describe the same scoring rule with scaled equations.
- Reverse Variant: Write a second equation equivalent to `y=3x-2`.
- Equation Battle Variant: Substitute, simplify, cancel matching sides, classify identity.
- Multi-stage Boss Variant: Ask for a verbal description of the solution set.
- Hint Mapping: H-P011-T011
- Tutorial Mapping: Tut-P011 sections Special Cases
- Socratic Mapping: Soc-P011 identity branch

## Template T012 - Verify an ordered pair in a system
- Template ID: P011-T012
- Question Type: Verification
- Cognitive Skill: Check whether a candidate pair satisfies both equations
- Difficulty: 2
- Estimated Time: 55 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Verify a system solution by substituting both coordinates.
- Example Question: Is `(2,5)` a solution to `y = 2x + 1` and `3x + y = 11`?
- Answer: Yes, `(2,5)` solves the system.
- Explanation: First equation: `5=2(2)+1=5`. Second equation: `3(2)+5=11`. Both are true.
- Distractors: no, because `2+5=7`; yes, because it solves the first equation only; no, because coordinates should be reversed; cannot tell.
- Distractor Rationale: Uses an equation not in the system; checks only one equation; reverses ordered pair meaning; ignores direct verification.
- Randomization Rules: Use candidate pairs that either satisfy both equations, satisfy only one equation, or satisfy neither.
- Validity Constraints: The answer key must identify both equation checks.
- Metadata: phase_id=P011; prerequisites=[ordered pair substitution, arithmetic]; misconception_tags=[one-equation checking, coordinate reversal, invented equation]; randomization_constraints=[candidate classification].
- Graph/Visual Variant: Determine whether the point lies on both lines.
- Modeling Variant: Check whether proposed prices fit both constraints.
- Reverse Variant: Given a point, write two equations it satisfies.
- Equation Battle Variant: Evaluation cards for each equation, then true/false classification.
- Multi-stage Boss Variant: Include a distractor pair that satisfies one equation only.
- Hint Mapping: H-P011-T012
- Tutorial Mapping: Tut-P011 sections Checking Solutions
- Socratic Mapping: Soc-P011 checking branch

## Template T013 - Choose the best variable to isolate
- Template ID: P011-T013
- Question Type: Strategy selection
- Cognitive Skill: Identify the easiest substitution setup
- Difficulty: 3
- Estimated Time: 65 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Choose an efficient variable to isolate before solving.
- Example Question: For the system `x + 4y = 14` and `3x - 2y = 8`, which first move is most efficient for substitution?
- Answer: Solve the first equation for `x`: `x = 14 - 4y`.
- Explanation: The coefficient of `x` in the first equation is 1, so isolating `x` requires only subtracting `4y`. Solving for `y` would introduce fractions.
- Distractors: Solve the first equation for `y`; solve the second equation for `x`; solve the second equation for `y`; add the equations.
- Distractor Rationale: Introduces fractions unnecessarily; requires division by 3; requires division by -2; uses elimination instead of substitution strategy.
- Randomization Rules: Present a system with exactly one variable coefficient of 1 or -1.
- Validity Constraints: The recommended move should reduce fraction risk and preserve a valid substitution path.
- Metadata: phase_id=P011; prerequisites=[literal equation solving, coefficient recognition]; misconception_tags=[inefficient isolation, fraction avoidance, method confusion]; randomization_constraints=[one easy coefficient].
- Graph/Visual Variant: Highlight the easy coefficient as an entry point.
- Modeling Variant: Choose which relationship to rewrite before solving a context system.
- Reverse Variant: Design a system where `y` is the easiest variable to isolate.
- Equation Battle Variant: Choose first card: isolate easy variable.
- Multi-stage Boss Variant: Then solve the system after selecting the best first move.
- Hint Mapping: H-P011-T013
- Tutorial Mapping: Tut-P011 sections Strategy Choice
- Socratic Mapping: Soc-P011 strategy branch

## Template T014 - Ticket price model
- Template ID: P011-T014
- Question Type: Modeling
- Cognitive Skill: Build and solve a two-equation price system
- Difficulty: 4
- Estimated Time: 110 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Translate a price relationship and a total into a system solved by substitution.
- Example Question: Adult tickets cost `$4` more than student tickets. Three student tickets and two adult tickets cost `$46`. Let `s` be student price and `a` be adult price. Find both prices.
- Answer: Student `$7.60`, adult `$11.60`.
- Explanation: Relationship: `a=s+4`. Total: `3s+2a=46`. Substitute: `3s+2(s+4)=46`, so `5s+8=46`, `5s=38`, `s=7.60`, and `a=11.60`.
- Distractors: Student `$8`, adult `$12`; student `$11.60`, adult `$7.60`; student `$7.60`, adult `$4`; no solution.
- Distractor Rationale: Rounds incorrectly; reverses relationship; treats the difference as adult price; misclassifies decimal answer.
- Randomization Rules: Use positive item counts, a price difference, and a total that may produce clean decimals.
- Validity Constraints: Prices must be positive and context-realistic.
- Metadata: phase_id=P011; prerequisites=[modeling equations, decimal arithmetic]; misconception_tags=[relationship reversal, rounding error, incomplete context answer]; randomization_constraints=[positive prices].
- Graph/Visual Variant: Table of possible prices or intersection of price equations.
- Modeling Variant: This template is the modeling variant.
- Reverse Variant: Given prices, write a ticket system with a price difference.
- Equation Battle Variant: Create relationship equation, substitute into total, solve, attach units.
- Multi-stage Boss Variant: Include definition of variables, equations, solution, and check.
- Hint Mapping: H-P011-T014
- Tutorial Mapping: Tut-P011 sections Modeling With Substitution
- Socratic Mapping: Soc-P011 modeling branch

## Template T015 - Sum and difference model
- Template ID: P011-T015
- Question Type: Modeling
- Cognitive Skill: Use total and comparison equations
- Difficulty: 3
- Estimated Time: 95 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve a two-quantity sum-and-difference context using substitution.
- Example Question: Two players collect `42` crystals total. Mira has `6` more crystals than Tao. How many does each player have?
- Answer: Mira has `24`; Tao has `18`.
- Explanation: Let `m` be Mira and `t` be Tao. Equations: `m+t=42` and `m=t+6`. Substitute into the total: `t+6+t=42`, so `2t=36`, `t=18`, and `m=24`.
- Distractors: Mira `18`, Tao `24`; Mira `21`, Tao `21`; Mira `30`, Tao `12`; Tao `18` only.
- Distractor Rationale: Reverses the comparison; ignores the difference; adds the difference after splitting total incorrectly; incomplete answer.
- Randomization Rules: Use total `S` and difference `d` with `S-d` even for integer results.
- Validity Constraints: Quantities must be nonnegative integers when the context requires counts.
- Metadata: phase_id=P011; prerequisites=[modeling, one-variable equations]; misconception_tags=[relationship reversal, equal split error, incomplete answer]; randomization_constraints=[integer counts].
- Graph/Visual Variant: Bar model showing total and difference.
- Modeling Variant: This template is the modeling variant.
- Reverse Variant: Given two counts, create a total-and-difference story.
- Equation Battle Variant: Substitute comparison equation into total, combine, solve, back-substitute.
- Multi-stage Boss Variant: Include a check that counts add to total and differ by the stated amount.
- Hint Mapping: H-P011-T015
- Tutorial Mapping: Tut-P011 sections Modeling With Substitution
- Socratic Mapping: Soc-P011 comparison branch

## Template T016 - Consecutive integer system
- Template ID: P011-T016
- Question Type: Modeling
- Cognitive Skill: Represent related integers with substitution
- Difficulty: 3
- Estimated Time: 90 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Use substitution to solve for related integer values.
- Example Question: Two integers have a sum of `31`. The larger is `5` more than the smaller. Find the integers.
- Answer: `13` and `18`.
- Explanation: Let `s` be the smaller and `l` be the larger. Then `l=s+5` and `s+l=31`. Substitute: `s+(s+5)=31`, so `2s=26`, `s=13`, and `l=18`.
- Distractors: `15` and `16`; `18` and `13` labeled smaller/larger incorrectly; `12` and `19`; `13` only.
- Distractor Rationale: Assumes consecutive by 1; reverses labels; changes the difference; incomplete answer.
- Randomization Rules: Use sum and fixed difference with integer solutions.
- Validity Constraints: Larger must exceed smaller by the stated amount.
- Metadata: phase_id=P011; prerequisites=[integer modeling, substitution]; misconception_tags=[wrong difference, label reversal, incomplete answer]; randomization_constraints=[integer pair].
- Graph/Visual Variant: Number-line positions separated by the difference.
- Modeling Variant: Related-number story.
- Reverse Variant: Given two integers, write the sum-and-difference system.
- Equation Battle Variant: Replace larger with smaller plus difference, solve.
- Multi-stage Boss Variant: Include a label check for smaller and larger.
- Hint Mapping: H-P011-T016
- Tutorial Mapping: Tut-P011 sections Modeling With Substitution
- Socratic Mapping: Soc-P011 comparison branch

## Template T017 - Graph intersection connected to substitution
- Template ID: P011-T017
- Question Type: Graph interpretation
- Cognitive Skill: Connect algebraic substitution to line intersection
- Difficulty: 3
- Estimated Time: 90 seconds
- Visual Required: true
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Verify a graph intersection by substitution.
- Example Question: Two lines are graphed: `y = x + 2` and `y = -2x + 8`. Use substitution to find their intersection.
- Answer: `(2,4)`.
- Explanation: Since both expressions equal `y`, set them equal: `x+2=-2x+8`. Then `3x=6`, `x=2`. Substitute into either equation: `y=2+2=4`.
- Distractors: `(4,2)`; `(2,10)`; `(3,5)`; no solution.
- Distractor Rationale: Reverses coordinates; uses only the second expression incorrectly; arithmetic error; ignores visible intersection.
- Randomization Rules: Use two slope-intercept equations with integer intersection in the visible grid.
- Validity Constraints: The intersection must fit the graph window and satisfy both equations.
- Metadata: phase_id=P011; prerequisites=[graph intersections, slope-intercept form]; misconception_tags=[coordinate reversal, one-line evaluation, graph-algebra disconnect]; randomization_constraints=[visible integer intersection].
- Graph/Visual Variant: This template requires a graph with two crossing lines.
- Modeling Variant: Two linear growth rules reach the same value.
- Reverse Variant: Given graph intersection `(2,4)`, write two slope-intercept equations passing through it.
- Equation Battle Variant: Equal-expression card, solve for `x`, back-substitute.
- Multi-stage Boss Variant: Ask for graph estimate, algebra solution, and verification.
- Hint Mapping: H-P011-T017
- Tutorial Mapping: Tut-P011 sections Graph Connection
- Socratic Mapping: Soc-P011 graph branch

## Template T018 - Reverse-build a system from a solution
- Template ID: P011-T018
- Question Type: Reverse construction
- Cognitive Skill: Create equations with a chosen ordered-pair solution
- Difficulty: 4
- Estimated Time: 100 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Construct a valid substitution-friendly system for a given solution.
- Example Question: Create a system that can be solved by substitution and has solution `(4,9)`.
- Answer: One valid answer is `y = 2x + 1` and `x + y = 13`.
- Explanation: The point `(4,9)` satisfies `y=2(4)+1=9` and `4+9=13`. Substitution gives `x+2x+1=13`, so `x=4`, then `y=9`.
- Distractors: `y=2x+1` and `x+y=12`; `y=2x-1` and `x+y=13`; `x=9` and `y=4`; any two equations sharing no point.
- Distractor Rationale: Fails total check; fails first equation; reverses coordinates; does not guarantee the target solution.
- Randomization Rules: Given target `(h,k)`, choose an easy isolated equation through it and a second independent equation through it.
- Validity Constraints: The two equations must not be equivalent unless the requested answer is infinitely many solutions.
- Metadata: phase_id=P011; prerequisites=[ordered pair checking, equation construction]; misconception_tags=[not checking target, coordinate reversal, dependent equations]; randomization_constraints=[target point satisfies both].
- Graph/Visual Variant: Draw two lines crossing at the target point.
- Modeling Variant: Build two story constraints that match a target pair.
- Reverse Variant: This template is the reverse variant.
- Equation Battle Variant: Verify target, then solve the created system by substitution.
- Multi-stage Boss Variant: Require a second equation that is not just a multiple of the first.
- Hint Mapping: H-P011-T018
- Tutorial Mapping: Tut-P011 sections Reverse Construction
- Socratic Mapping: Soc-P011 reverse branch

## Template T019 - Error analysis for substitution
- Template ID: P011-T019
- Question Type: Error analysis
- Cognitive Skill: Diagnose a substitution or parentheses mistake
- Difficulty: 4
- Estimated Time: 95 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Identify and correct a common substitution error.
- Example Question: A student solves `y = 2x - 3` and `4y + x = 15` by writing `4(2x) - 3 + x = 15`. What is the mistake, and what is the correct solution?
- Answer: The student failed to put the whole expression `2x-3` in parentheses. Correct solution: `(3,3)`.
- Explanation: Correct substitution is `4(2x-3)+x=15`, so `8x-12+x=15`, `9x=27`, `x=3`, and `y=3`.
- Distractors: Mistake is reversing coordinates; correct solution `(3,6)`; no mistake; no solution.
- Distractor Rationale: Misidentifies the issue; forgets to back-substitute; accepts missing parentheses; misclassifies a normal system.
- Randomization Rules: Present a worked step that omits parentheses or substitutes into the same equation.
- Validity Constraints: The repaired system must have a unique solution and the error must be unambiguous.
- Metadata: phase_id=P011; prerequisites=[distribution, substitution structure]; misconception_tags=[parentheses error, error diagnosis, back-substitution error]; randomization_constraints=[clear incorrect step].
- Graph/Visual Variant: Compare incorrect and correct algebra paths.
- Modeling Variant: Diagnose a price-expression substitution mistake.
- Reverse Variant: Given a wrong step, create a system where that mistake is tempting.
- Equation Battle Variant: Reject illegal substitution card and choose the grouped replacement card.
- Multi-stage Boss Variant: Identify mistake, correct equation, solve, and check.
- Hint Mapping: H-P011-T019
- Tutorial Mapping: Tut-P011 sections Common Mistakes
- Socratic Mapping: Soc-P011 error-analysis branch

## Template T020 - Boss substitution challenge
- Template ID: P011-T020
- Question Type: Multi-stage boss
- Cognitive Skill: Choose a variable, substitute, solve, back-substitute, classify, and check
- Difficulty: 5
- Estimated Time: 140 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Complete a full substitution solution with strategic setup and validation.
- Example Question: Boss Gate: Solve by substitution and check: `2x + y = 16` and `3x - 2y = 9`.
- Answer: `(41/7, 30/7)`.
- Explanation: From `2x+y=16`, isolate `y=16-2x`. Substitute: `3x-2(16-2x)=9`, so `3x-32+4x=9`, `7x=41`, `x=41/7`. Then `y=16-2(41/7)=112/7-82/7=30/7`. Check: `2(41/7)+30/7=112/7=16`; `3(41/7)-2(30/7)=63/7=9`.
- Distractors: `(5,6)`; `(41/7,16)`; `(30/7,41/7)`; no solution.
- Distractor Rationale: Estimates instead of solving exactly; forgets back-substitution; reverses coordinates; misclassifies fractional solution.
- Randomization Rules: Use a system where substitution is straightforward but may produce fractional coordinates.
- Validity Constraints: Unique solution; arithmetic must check exactly in both equations.
- Metadata: phase_id=P011; prerequisites=[fraction arithmetic, linear systems, checking]; misconception_tags=[fraction avoidance, incomplete back-substitution, coordinate reversal, false no-solution]; randomization_constraints=[unique rational solution].
- Graph/Visual Variant: Optional graph confirms intersection near `(5.86,4.29)`.
- Modeling Variant: Advanced resource-balance puzzle with rational quantities.
- Reverse Variant: Build a boss system with a fractional ordered-pair solution.
- Equation Battle Variant: Isolate, substitute with parentheses, distribute negative coefficient, solve rational value, back-substitute, check.
- Multi-stage Boss Variant: This is the phase boss template.
- Hint Mapping: H-P011-T020
- Tutorial Mapping: Tut-P011 sections Full Phase Review
- Socratic Mapping: Soc-P011 boss branch

# Part II - Hint Bible

## H-P011-T001
- Hint 1 - Gentle Nudge: One equation already tells you what `y` equals.
- Hint 2 - Concept Reminder: If `y=2x+1`, replace `y` in the other equation with `2x+1`.
- Hint 3 - Focus Hint: Start from `x + (2x+1) = 10`.
- Hint 4 - Guided Next Step: Combine like terms to get `3x + 1 = 10`.
- Hint 5 - Nearly Complete: Solve `3x=9`, then use `y=2x+1`.
- Hint 6 - Full Solution: `x=3`, `y=7`, so the solution is `(3,7)`.

## H-P011-T002
- Hint 1 - Gentle Nudge: This time `x` is already isolated.
- Hint 2 - Concept Reminder: Replace `x` with `y-4` in the other equation.
- Hint 3 - Focus Hint: Use `2(y-4)+y=7`.
- Hint 4 - Guided Next Step: Distribute: `2y-8+y=7`.
- Hint 5 - Nearly Complete: `3y=15`, so `y=5`; then find `x`.
- Hint 6 - Full Solution: `y=5`, `x=1`, so the solution is `(1,5)`.

## H-P011-T003
- Hint 1 - Gentle Nudge: You already know one coordinate.
- Hint 2 - Concept Reminder: Substitute `x=4` into the other equation.
- Hint 3 - Focus Hint: `3(4)+2y=22`.
- Hint 4 - Guided Next Step: Simplify to `12+2y=22`.
- Hint 5 - Nearly Complete: `2y=10`, so `y=5`.
- Hint 6 - Full Solution: The ordered pair is `(4,5)`.

## H-P011-T004
- Hint 1 - Gentle Nudge: Choose the equation where `y` is easiest to isolate.
- Hint 2 - Concept Reminder: From `x+y=9`, get `y=9-x`.
- Hint 3 - Focus Hint: Substitute into `2x-y=3`.
- Hint 4 - Guided Next Step: Write `2x-(9-x)=3`.
- Hint 5 - Nearly Complete: Distribute the negative: `2x-9+x=3`, so `3x=12`.
- Hint 6 - Full Solution: `x=4`, `y=5`, so `(4,5)`.

## H-P011-T005
- Hint 1 - Gentle Nudge: The first equation is easy to solve for `x`.
- Hint 2 - Concept Reminder: From `x-2y=-1`, get `x=2y-1`.
- Hint 3 - Focus Hint: Substitute into `3x+y=18`.
- Hint 4 - Guided Next Step: `3(2y-1)+y=18`.
- Hint 5 - Nearly Complete: `6y-3+y=18`, so `7y=21`.
- Hint 6 - Full Solution: `y=3`, `x=5`, so `(5,3)`.

## H-P011-T006
- Hint 1 - Gentle Nudge: Substitute the whole expression for `y`.
- Hint 2 - Concept Reminder: Whole expressions need parentheses.
- Hint 3 - Focus Hint: Use `2(3x-4)-x=7`.
- Hint 4 - Guided Next Step: Distribute to get `6x-8-x=7`.
- Hint 5 - Nearly Complete: `5x=15`, so `x=3`.
- Hint 6 - Full Solution: `x=3`, `y=3(3)-4=5`, so `(3,5)`.

## H-P011-T007
- Hint 1 - Gentle Nudge: The fraction may cancel when multiplied by 2.
- Hint 2 - Concept Reminder: Replace `y` with `(1/2)x+2`.
- Hint 3 - Focus Hint: `x + 2((1/2)x+2)=12`.
- Hint 4 - Guided Next Step: Distribute: `x + x + 4 = 12`.
- Hint 5 - Nearly Complete: `2x=8`, so `x=4`.
- Hint 6 - Full Solution: `x=4`, `y=(1/2)(4)+2=4`, so `(4,4)`.

## H-P011-T008
- Hint 1 - Gentle Nudge: Use the relationship equation first.
- Hint 2 - Concept Reminder: Replace `r` with `c+1.50`.
- Hint 3 - Focus Hint: `2c + (c+1.50) = 10.50`.
- Hint 4 - Guided Next Step: Combine to get `3c+1.50=10.50`.
- Hint 5 - Nearly Complete: `3c=9.00`, so `c=3.00`.
- Hint 6 - Full Solution: Charm `$3.00`; rune `$4.50`.

## H-P011-T009
- Hint 1 - Gentle Nudge: Keep the negative sign attached to `-2x`.
- Hint 2 - Concept Reminder: Substitute the full expression `-2x+9` for `y`.
- Hint 3 - Focus Hint: `3x + (-2x+9)=14`.
- Hint 4 - Guided Next Step: Combine `3x-2x` to get `x+9=14`.
- Hint 5 - Nearly Complete: `x=5`; now back-substitute.
- Hint 6 - Full Solution: `y=-2(5)+9=-1`, so `(5,-1)`.

## H-P011-T010
- Hint 1 - Gentle Nudge: Substitute and watch what happens to the variable terms.
- Hint 2 - Concept Reminder: A false statement means no ordered pair works.
- Hint 3 - Focus Hint: `2(2x+1)=4x+8`.
- Hint 4 - Guided Next Step: Simplify to `4x+2=4x+8`.
- Hint 5 - Nearly Complete: Subtract `4x` to get `2=8`, which is false.
- Hint 6 - Full Solution: No solution; the lines are parallel.

## H-P011-T011
- Hint 1 - Gentle Nudge: Substitute and compare both sides.
- Hint 2 - Concept Reminder: A true identity means the equations describe the same line.
- Hint 3 - Focus Hint: `2(3x-2)=6x-4`.
- Hint 4 - Guided Next Step: Simplify to `6x-4=6x-4`.
- Hint 5 - Nearly Complete: This is true for every `x` on the line.
- Hint 6 - Full Solution: Infinitely many solutions.

## H-P011-T012
- Hint 1 - Gentle Nudge: A candidate must satisfy both equations.
- Hint 2 - Concept Reminder: Substitute `x=2` and `y=5`.
- Hint 3 - Focus Hint: Check `5=2(2)+1`.
- Hint 4 - Guided Next Step: Check `3(2)+5=11`.
- Hint 5 - Nearly Complete: Both equations are true.
- Hint 6 - Full Solution: Yes, `(2,5)` is a solution.

## H-P011-T013
- Hint 1 - Gentle Nudge: Look for a coefficient of 1 or -1.
- Hint 2 - Concept Reminder: Isolating that variable avoids fractions.
- Hint 3 - Focus Hint: In `x+4y=14`, `x` has coefficient 1.
- Hint 4 - Guided Next Step: Subtract `4y` to get `x=14-4y`.
- Hint 5 - Nearly Complete: That expression can now replace `x` in the second equation.
- Hint 6 - Full Solution: Best first move: solve the first equation for `x`, giving `x=14-4y`.

## H-P011-T014
- Hint 1 - Gentle Nudge: Write the price relationship first.
- Hint 2 - Concept Reminder: Adult costs 4 more, so `a=s+4`.
- Hint 3 - Focus Hint: Total equation is `3s+2a=46`.
- Hint 4 - Guided Next Step: Substitute: `3s+2(s+4)=46`.
- Hint 5 - Nearly Complete: `5s+8=46`, so `5s=38`.
- Hint 6 - Full Solution: `s=7.60`, `a=11.60`.

## H-P011-T015
- Hint 1 - Gentle Nudge: Let Tao be the smaller count.
- Hint 2 - Concept Reminder: Mira has 6 more, so `m=t+6`.
- Hint 3 - Focus Hint: Total equation is `m+t=42`.
- Hint 4 - Guided Next Step: Substitute: `(t+6)+t=42`.
- Hint 5 - Nearly Complete: `2t=36`, so `t=18`.
- Hint 6 - Full Solution: Tao has 18; Mira has 24.

## H-P011-T016
- Hint 1 - Gentle Nudge: Name the smaller integer first.
- Hint 2 - Concept Reminder: Larger is `s+5`.
- Hint 3 - Focus Hint: Sum equation: `s+(s+5)=31`.
- Hint 4 - Guided Next Step: Combine to get `2s+5=31`.
- Hint 5 - Nearly Complete: `2s=26`, so `s=13`.
- Hint 6 - Full Solution: The integers are 13 and 18.

## H-P011-T017
- Hint 1 - Gentle Nudge: Both expressions equal `y`.
- Hint 2 - Concept Reminder: If `y=x+2` and `y=-2x+8`, then `x+2=-2x+8`.
- Hint 3 - Focus Hint: Add `2x` to both sides.
- Hint 4 - Guided Next Step: `3x+2=8`.
- Hint 5 - Nearly Complete: `3x=6`, so `x=2`; then find `y`.
- Hint 6 - Full Solution: `y=4`, so the intersection is `(2,4)`.

## H-P011-T018
- Hint 1 - Gentle Nudge: Start with an equation that the point `(4,9)` satisfies.
- Hint 2 - Concept Reminder: `y=2x+1` works because `9=2(4)+1`.
- Hint 3 - Focus Hint: A second equation through `(4,9)` is `x+y=13`.
- Hint 4 - Guided Next Step: Check both equations using `x=4`, `y=9`.
- Hint 5 - Nearly Complete: Make sure the two equations are not the same line.
- Hint 6 - Full Solution: One valid system is `y=2x+1` and `x+y=13`.

## H-P011-T019
- Hint 1 - Gentle Nudge: The expression replacing `y` has two terms.
- Hint 2 - Concept Reminder: The whole `2x-3` must be multiplied by 4.
- Hint 3 - Focus Hint: Correct setup uses `4(2x-3)+x=15`.
- Hint 4 - Guided Next Step: Distribute to get `8x-12+x=15`.
- Hint 5 - Nearly Complete: `9x=27`, so `x=3`; then find `y`.
- Hint 6 - Full Solution: Mistake: missing parentheses. Correct solution: `(3,3)`.

## H-P011-T020
- Hint 1 - Gentle Nudge: The first equation is easy to solve for `y`.
- Hint 2 - Concept Reminder: From `2x+y=16`, get `y=16-2x`.
- Hint 3 - Focus Hint: Substitute into `3x-2y=9`.
- Hint 4 - Guided Next Step: `3x-2(16-2x)=9`.
- Hint 5 - Nearly Complete: `7x-32=9`, so `7x=41`.
- Hint 6 - Full Solution: `x=41/7`, `y=30/7`, so `(41/7,30/7)`.

# Part III - Tutorial Bible

## Learning Goal
Learn to solve systems of linear equations by substitution: replacing one variable with an equal expression so the system becomes one equation in one variable.

## Why It Matters
Substitution is the algebra version of merging two clues. If one rule tells you what a variable equals, you can place that rule inside the other equation. This method powers price puzzles, comparison problems, graph intersections, and later work with functions, inverse functions, and nonlinear systems.

## Prerequisite Check
Ask the player:

1. If `y=2x+1`, what can replace `y` in another equation? Expected: `2x+1`.
2. Solve `3x+1=10`. Expected: `x=3`.
3. Evaluate `2(3x-4)` correctly. Expected: `6x-8`.
4. What does the ordered pair `(3,7)` mean? Expected: `x=3`, `y=7`.
5. What does a false equation like `2=8` mean? Expected: no value can make it true.

## Core Concept
Substitution works because equal things may replace each other.

For the system:

`y = 2x + 1`

`x + y = 10`

the first equation says that `y` and `2x+1` always match on that line. Replace `y` in the second equation:

`x + (2x+1) = 10`

Now there is only one variable. Solve for `x`, then use the isolated equation to find `y`.

## Standard Method
1. Pick an equation with a variable already isolated or easy to isolate.
2. Substitute that expression into the other equation.
3. Use parentheses around multi-term expressions.
4. Solve the one-variable equation.
5. Back-substitute to find the other variable.
6. Check both original equations.
7. Write the answer as `(x,y)`.

## Already Isolated Variables
Example:

`y=2x+1`

`x+y=10`

Substitute:

`x+(2x+1)=10`

`3x+1=10`

`x=3`

Back-substitute:

`y=2(3)+1=7`

Solution: `(3,7)`.

## Isolate Before Substituting
Sometimes neither equation is written with an isolated variable.

Example:

`x+y=9`

`2x-y=3`

From the first equation:

`y=9-x`

Substitute:

`2x-(9-x)=3`

`2x-9+x=3`

`3x=12`

`x=4`

Then `y=9-4=5`, so `(4,5)`.

## Parentheses Matter
If `y=3x-4` and the other equation uses `2y`, then write:

`2(3x-4)`

not:

`2(3x)-4`

The first multiplies the whole expression by 2. The second only multiplies the first term and changes the value.

## Fractions and Decimals
Fractions and decimals do not change the logic. They only require careful arithmetic.

Example:

`y=(1/2)x+2`

`x+2y=12`

Substitute:

`x+2((1/2)x+2)=12`

`x+x+4=12`

`x=4`

`y=4`

Solution: `(4,4)`.

## Special Cases
After substitution, the variable terms may cancel.

If the result is false, such as `2=8`, the system has no solution. The lines are parallel.

If the result is always true, such as `6x-4=6x-4`, the system has infinitely many solutions. The equations describe the same line.

Do not write a single ordered pair for these cases.

## Modeling With Substitution
A context often gives one relationship equation and one total equation.

Example:

Adult tickets cost 4 more than student tickets:

`a=s+4`

Three student and two adult tickets cost 46:

`3s+2a=46`

Substitute:

`3s+2(s+4)=46`

`5s+8=46`

`s=7.60`

`a=11.60`

Use units in the final answer.

## Strategy Choice
Choose the variable that is easiest to isolate. A coefficient of 1 or -1 is usually best.

For `x+4y=14`, solving for `x` gives `x=14-4y` without fractions.

For `3x-2y=8`, solving for either variable introduces division. That may work, but it is less efficient.

## Graph Connection
The solution to a two-variable system is the point where the graphs intersect.

For:

`y=x+2`

`y=-2x+8`

both expressions equal `y`, so set them equal:

`x+2=-2x+8`

`x=2`

Then `y=4`, so the intersection is `(2,4)`.

## Checking Solutions
Always check both original equations.

For `(3,7)` in `y=2x+1` and `x+y=10`:

`7=2(3)+1`, true.

`3+7=10`, true.

Checking both equations catches reversed coordinates and arithmetic slips.

## Common Mistakes
- Mistake: Substituting into the same equation used to isolate.
  Correction: Substitute into the other equation.
- Mistake: Dropping parentheses.
  Correction: Put the entire replacement expression in parentheses before multiplying or subtracting.
- Mistake: Stopping after finding one variable.
  Correction: Back-substitute to find the ordered pair.
- Mistake: Writing `(y,x)`.
  Correction: Ordered pairs are always `(x,y)`.
- Mistake: Calling `0=0` the point `(0,0)`.
  Correction: A true identity means infinitely many solutions.
- Mistake: Calling `2=8` a normal equation.
  Correction: A false statement means no solution.

## Guided Practice
1. Solve `y=x+5` and `2x+y=14`.
   - Substitute: `2x+(x+5)=14`.
   - `3x=9`, so `x=3`.
   - `y=8`.
   - Solution: `(3,8)`.

2. Solve `x+y=11` and `x-y=3`.
   - From `x+y=11`, `x=11-y`.
   - Substitute: `(11-y)-y=3`.
   - `11-2y=3`, so `y=4`.
   - `x=7`.
   - Solution: `(7,4)`.

3. Classify `y=4x+1` and `2y=8x+7`.
   - Substitute: `2(4x+1)=8x+7`.
   - `8x+2=8x+7`.
   - `2=7`, false.
   - No solution.

## Independent Practice
1. `y=x+1` and `x+y=9`; answer `(4,5)`.
2. `x=2y+3` and `x+y=12`; answer `(9,3)`.
3. `y=-x+6` and `2x+y=10`; answer `(4,2)`.
4. `x+y=15` and `x=2y`; answer `(10,5)`.
5. `y=2x-1` and `4y=8x-4`; infinitely many solutions.
6. `y=2x-1` and `4y=8x+4`; no solution.

## Mastery Check
The player is ready to advance when they can:

1. Choose a useful variable to isolate.
2. Substitute into the other equation.
3. Use parentheses correctly.
4. Solve the resulting one-variable equation.
5. Back-substitute and write `(x,y)`.
6. Classify no-solution and infinitely-many-solution cases.
7. Build and solve a context system.

Mastery check set:

1. `y=3x-2`, `x+y=10`; solution `(3,7)`.
2. `x-2y=1`, `x+y=10`; solution `(7,3)`.
3. `y=-2x+5`, `3x+y=9`; solution `(4,-3)`.
4. `y=x+4`, `2y=2x+8`; infinitely many solutions.
5. `y=x+4`, `2y=2x+10`; no solution.

## Adaptive Tutor Messages
- If the player substitutes into the same equation: "Use the expression from one equation inside the other equation so the two clues interact."
- If parentheses are missing: "The entire expression replaces the variable. Wrap it before multiplying or subtracting."
- If only one coordinate is found: "A system solution is an ordered pair. Back-substitute to find the second coordinate."
- If coordinates are reversed: "Read the pair as `(x,y)`: first coordinate for `x`, second for `y`."
- If a contradiction appears: "When variables cancel and the statement is false, the lines never meet."
- If an identity appears: "When variables cancel and the statement is always true, both equations describe the same line."
- If the player succeeds quickly: "You are ready to compare substitution with elimination and graphing."

## Tutorial Metadata
- Tutorial ID: Tut-P011
- Estimated duration: 6 minutes
- Target player state: knows linear equations and ordered pairs
- Unlock condition: available from any Phase 011 question
- Remediation trigger: two parenthesis errors, two incomplete ordered-pair answers, one special-case classification error, or repeated coordinate reversal
- Advancement trigger: 80 percent accuracy on mixed substitution systems, including at least one special-case classification and one modeling item

# Part IV - Socratic Dialogue Bible

## Opening Diagnostic
Tutor: "In the system `y=2x+1` and `x+y=10`, what can we replace `y` with in the second equation?"

Expected strong answer: "`2x+1`, giving `x+(2x+1)=10`."

## Guided Discovery
Tutor sequence:

1. "Is one variable already isolated?"
2. "Which expression is equal to that variable?"
3. "Which other equation should receive the substitution?"
4. "Do we need parentheses around the replacement expression?"
5. "What one-variable equation results?"
6. "How do you solve that equation?"
7. "How will you find the second coordinate?"
8. "How should the final answer be written?"
9. "Does the pair check in both original equations?"
10. "If the variable terms cancel, is the remaining statement true or false?"

## Correct Branch
Player: "Replace `y` with `2x+1`."

Tutor: "Good. Put that into `x+y=10`. What equation in only `x` do you get?"

If player writes `x+2x+1=10`, ask them to solve and back-substitute.

## Partial Understanding Branch
Player solves `x=3` but stops.

Tutor: "That gives the first coordinate. What equation can use `x=3` to find `y`?"

If player answers `y=2x+1`, prompt: "Evaluate `2(3)+1`."

## Misconception Branch
Player substitutes into `y=2x+1` and gets `2x+1=2x+1`.

Tutor: "That statement is true, but it only repeats the same clue. To use both clues, substitute into the other equation. Which equation has not been used yet?"

Recovery target: Player uses `x+y=10`.

## Parentheses Branch
Player writes `2(3x)-4` for `2(3x-4)`.

Tutor: "The variable `y` is the whole expression `3x-4`. If two copies of `y` are needed, what should two copies of the whole expression look like?"

Recovery target: Player writes `2(3x-4)`.

## Special Case Branch
Player gets `2=8` and tries to solve for `x`.

Tutor: "There is no `x` left. Is `2=8` ever true?"

If player says no: "Then no value can satisfy both equations at once. What does that mean for the system?"

## Identity Branch
Player gets `6x-4=6x-4` and says `(0,0)`.

Tutor: "Try `x=1`. Does the equation still stay true? Try `x=5`. What does that suggest about the number of points?"

Recovery target: Player identifies infinitely many solutions.

## Unsure Branch
Player: "I don't know where to start."

Tutor: "Look for a variable that is alone. Do you see `x = ...` or `y = ...` in either equation?"

If no variable is isolated, ask: "Which variable has coefficient 1 or -1 and can be isolated with one move?"

## Unrelated Response Branch
Player gives an unrelated answer.

Tutor: "Let's narrow the task to one decision: which equation tells us what `y` equals?"

If unrelated again, use a two-choice prompt between the isolated equation and the other equation.

## Recovery Prompts
- "Which variable is already isolated?"
- "What expression is equal to that variable?"
- "Are you substituting into the other equation?"
- "Does the replacement expression need parentheses?"
- "What one-variable equation do you get?"
- "After finding one coordinate, how do you find the other?"
- "Did you write the answer as `(x,y)`?"
- "Do both original equations check?"
- "If variables cancel, is the final statement true or false?"

## Reflection Question
"Why is substituting into the other equation more useful than substituting into the same equation?"

Strong reflection: "Using the other equation combines both pieces of information and creates one equation in one variable. Substituting into the same equation just restates something already true."

## Transfer Question
"How is solving a system by substitution related to finding where two graphs intersect?"

Expected transfer: "At the intersection, both equations have the same `x` and `y`. Substitution finds the coordinate values that make both equations true."

## Escalation Rules
- If the player cannot identify a substitution expression, show Already Isolated Variables.
- If the player cannot isolate a variable, show Isolate Before Substituting.
- If parentheses errors repeat, show Parentheses Matter.
- If arithmetic with fractions blocks progress, show Fractions and Decimals.
- If the player misclassifies canceled-variable equations, show Special Cases.
- If modeling setup fails, show Modeling With Substitution.
- If the player solves three unique systems and checks both equations, advance to independent practice.

## Exit Condition
The Socratic sequence is complete when the player:

1. Selects an isolated or easy-to-isolate variable.
2. Substitutes into the other equation.
3. Uses parentheses when needed.
4. Solves the one-variable equation.
5. Back-substitutes for the second coordinate.
6. Checks both equations.
7. Correctly classifies special cases.

# Knowledge Graph

- Prerequisites: Phase 001 one-step linear equations; Phase 002 multi-step linear equations; Phase 003 variables on both sides; Phase 005 linear equation modeling; ordered pair notation; graph intersections; distribution
- Concepts Unlocked: systems of equations; substitution method; back-substitution; solution checking; line intersection algebra; no-solution systems; infinitely-many-solution systems; context systems
- Related Concepts: elimination method; graphing systems; function equality; inverse relationships; break-even models; linear programming foundations
- Common Misconceptions: substituting into the same equation; missing parentheses; coordinate reversal; incomplete answer after one coordinate; identity classified as `(0,0)`; contradiction treated as arithmetic mistake; checking only one equation
- Remedial Phases: Phase 001 review; Phase 002 review; Phase 003 review; Phase 005 review; ordered-pair mini-lesson; distribution mini-lesson
- Follow-up Phases: Phase 012 - Systems by elimination; Phase 013 - Systems by graphing; Phase 014 - Function notation; Phase 027 - Quadratic modeling
- Transfer Topics: graph intersections; break-even analysis; comparison pricing; function composition; nonlinear systems by substitution

# Validation Notes

## Structure Validation
- Includes all required Bibles and metadata sections.
- Contains exactly 20 template families, within the required 20-40 range.
- Each template includes example, answer, explanation, distractors, distractor rationale, randomization rules, validity constraints, metadata, variants, and mappings.
- Every template has six progressive hints.

## Math Validation
- T001: `y=2x+1`, `x+y=10` -> `x+2x+1=10` -> `x=3`, `y=7`.
- T002: `x=y-4`, `2x+y=7` -> `2(y-4)+y=7` -> `y=5`, `x=1`.
- T003: `x=4`, `3x+2y=22` -> `12+2y=22` -> `y=5`.
- T004: `x+y=9` -> `y=9-x`; `2x-(9-x)=3` -> `3x=12`, `x=4`, `y=5`.
- T005: `x=2y-1`, `3x+y=18` -> `3(2y-1)+y=18` -> `y=3`, `x=5`.
- T006: `y=3x-4`, `2y-x=7` -> `2(3x-4)-x=7` -> `5x=15`, `x=3`, `y=5`.
- T007: `x+2((1/2)x+2)=12` -> `2x+4=12` -> `x=4`, `y=4`.
- T008: `2c+(c+1.50)=10.50` -> `3c=9.00` -> `c=3.00`, `r=4.50`.
- T009: `3x+(-2x+9)=14` -> `x=5`, `y=-1`.
- T010: `2(2x+1)=4x+8` -> `4x+2=4x+8` -> `2=8`, no solution.
- T011: `2(3x-2)=6x-4` -> `6x-4=6x-4`, infinitely many solutions.
- T012: `(2,5)` satisfies `y=2x+1` and `3x+y=11`.
- T013: `x+4y=14` isolates as `x=14-4y` without fractions.
- T014: `a=s+4`, `3s+2a=46` -> `5s+8=46` -> `s=7.60`, `a=11.60`.
- T015: `m=t+6`, `m+t=42` -> `2t+6=42` -> `t=18`, `m=24`.
- T016: `l=s+5`, `s+l=31` -> `2s+5=31` -> `s=13`, `l=18`.
- T017: `x+2=-2x+8` -> `x=2`, `y=4`.
- T018: `(4,9)` satisfies `y=2x+1` and `x+y=13`; substitution gives `x=4`, `y=9`.
- T019: `y=2x-3`, `4y+x=15`; correct substitution `4(2x-3)+x=15` -> `x=3`, `y=3`.
- T020: `y=16-2x`; `3x-2(16-2x)=9` -> `7x=41`, `x=41/7`, `y=30/7`.

## Distractor Validation
- Distractors reflect coordinate reversal, missing parentheses, one-equation checking, relationship reversal, arithmetic slips, incomplete answers, false special-case classification, and single-point treatment of infinitely many solutions.
- Multiple-choice-style templates have exactly one correct answer.
- Modeling distractors preserve realistic units while targeting plausible setup errors.

## Hint Validation
- Each hint sequence moves from variable selection to substitution setup, equation solving, back-substitution, and final answer.
- Special-case hints stop after interpreting the true or false statement rather than forcing a fake ordered pair.

## Tutorial Validation
- Tutorial includes learning goal, why it matters, prerequisite check, core concept, standard method, already-isolated cases, isolate-first cases, parentheses, fractions and decimals, special cases, modeling, strategy choice, graph connection, checking, common mistakes, guided practice, independent practice, mastery check, adaptive messages, and metadata.

## Socratic Validation
- Dialogue includes diagnostic, guided discovery, correct branch, partial branch, misconception branch, parentheses branch, special-case branches, unsure branch, unrelated branch, recovery prompts, reflection, transfer, escalation rules, and exit condition.
- Tutor guides through decisions before telling the method.

## Metadata Validation
- Every template includes IDs, difficulty, timing, visual flag, compatibility flags, prerequisites, misconception tags, randomization constraints, and support-system mappings.

## Known Issues
- The repository specifications differ on the label for Hint 4. This phase uses "Guided Next Step" to match the master prompt language.
- `PHASE_TEMPLATE.md` omits Common Misconceptions from the Knowledge Graph section, but this phase includes it because the master prompt and knowledge graph guide require it.
