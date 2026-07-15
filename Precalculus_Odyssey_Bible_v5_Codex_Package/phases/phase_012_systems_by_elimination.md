# Phase 012 - Systems by Elimination

## Phase Metadata
- Course: Precalculus Odyssey Bible v5
- Topic: Systems by elimination
- Subtopic: Solving linear systems by combining equations to remove one variable
- Prerequisites: Phase 002 multi-step linear equations, Phase 003 variables on both sides, Phase 005 linear equation modeling, Phase 011 systems by substitution, integer operations, ordered pairs
- Related phases: Phase 011 - Systems by substitution; Phase 013 - Systems by graphing; Phase 014 - Function notation; Phase 027 - Quadratic modeling
- Estimated phase size: 20 template families, 20 core examples, 120 progressive hints, 1 tutorial sequence, 1 Socratic dialogue system

## Learning Objectives
By the end of this phase, the player can:

1. Explain elimination as adding or subtracting equivalent equations to remove one variable.
2. Identify when equations can be added directly.
3. Identify when equations should be subtracted directly.
4. Multiply one or both equations to create opposite coefficients.
5. Preserve equality by multiplying an entire equation.
6. Solve the remaining one-variable equation and back-substitute.
7. Write the final solution as an ordered pair.
8. Recognize no-solution and infinitely-many-solution systems from elimination results.
9. Choose efficiently between eliminating `x` and eliminating `y`.
10. Build and solve real-world systems using elimination.

## Prerequisite Review
- Adding the same type of quantities on both sides of equations preserves equality.
- Multiplying an entire equation by a nonzero number creates an equivalent equation.
- Opposite terms such as `+3y` and `-3y` add to 0.
- Matching terms such as `+2y` and `+2y` subtract to 0.
- A system solution must satisfy both original equations.

## Core Concepts
- Elimination removes one variable by combining two equations.
- If coefficients are opposites, add the equations.
- If coefficients are the same, subtract the equations.
- If neither variable is ready to eliminate, multiply one or both equations first.
- Always multiply the entire equation, including every term and the constant.
- After finding one variable, substitute into either original equation to find the other.
- If variables disappear and the remaining statement is false, the system has no solution.
- If variables disappear and the remaining statement is true, the system has infinitely many solutions.

## Common Misconceptions
- Adding equations when matching coefficients should be subtracted.
- Subtracting equations when opposite coefficients should be added.
- Multiplying only one term instead of the entire equation.
- Forgetting to multiply the constant term.
- Losing a negative sign while combining equations.
- Stopping after finding only one variable.
- Writing coordinates in the wrong order.
- Treating `0=0` as `(0,0)` instead of infinitely many solutions.
- Treating a contradiction as a normal equation.

# Part I - Question Bible

## Template T001 - Add to eliminate opposite y terms
- Template ID: P012-T001
- Question Type: Direct computation
- Cognitive Skill: Add equations with opposite `y` coefficients
- Difficulty: 2
- Estimated Time: 60 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve a system by direct addition when one variable cancels.
- Example Question: Solve by elimination: `2x + y = 11` and `3x - y = 14`.
- Answer: `(5,1)`.
- Explanation: Add the equations: `5x=25`, so `x=5`. Substitute into `2x+y=11`: `10+y=11`, so `y=1`.
- Distractors: `(1,5)`; `(5,-1)`; `(25,1)`; `x=5`
- Distractor Rationale: Reverses coordinates; sign error in back-substitution; forgets to divide by 5; gives only one coordinate.
- Randomization Rules: Use coefficients `+ky` and `-ky` with integer solution coordinates.
- Validity Constraints: The added `x` coefficient must be nonzero.
- Metadata: phase_id=P012; prerequisites=[combining equations, ordered pairs]; misconception_tags=[coordinate reversal, sign error, incomplete answer]; randomization_constraints=[opposite y coefficients, integer solution].
- Graph/Visual Variant: Show two lines crossing at the ordered-pair solution.
- Modeling Variant: Two score equations with one bonus term canceling.
- Reverse Variant: Given `(5,1)`, create equations with opposite `y` coefficients.
- Equation Battle Variant: Add-equations card, solve `5x=25`, back-substitute.
- Multi-stage Boss Variant: Include a check in both original equations.
- Hint Mapping: H-P012-T001
- Tutorial Mapping: Tut-P012 sections Direct Addition
- Socratic Mapping: Soc-P012 addition branch

## Template T002 - Subtract to eliminate matching y terms
- Template ID: P012-T002
- Question Type: Direct computation
- Cognitive Skill: Subtract equations with matching coefficients
- Difficulty: 2
- Estimated Time: 65 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve a system by subtracting equations with the same variable coefficient.
- Example Question: Solve by elimination: `4x + 2y = 18` and `x + 2y = 9`.
- Answer: `(3,3)`.
- Explanation: Subtract the second equation from the first: `3x=9`, so `x=3`. Substitute into `x+2y=9`: `3+2y=9`, so `y=3`.
- Distractors: `(3,-3)`; `(3,6)`; `(9,3)`; no solution.
- Distractor Rationale: Sign error after subtracting; forgets to divide by 2 when finding `y`; forgets to divide by 3; misclassifies a unique solution.
- Randomization Rules: Use matching `y` coefficients and different `x` coefficients.
- Validity Constraints: Subtracting one equation from the other must leave a nonzero coefficient.
- Metadata: phase_id=P012; prerequisites=[subtraction of equations, back-substitution]; misconception_tags=[wrong combine operation, arithmetic error, false classification]; randomization_constraints=[same y coefficient, integer solution].
- Graph/Visual Variant: Show that the two lines share one intersection.
- Modeling Variant: Compare two packages with the same service fee.
- Reverse Variant: Build two equations with matching `y` coefficients and solution `(3,3)`.
- Equation Battle Variant: Subtract-equations card, solve, back-substitute.
- Multi-stage Boss Variant: Ask why addition fails to eliminate `y`.
- Hint Mapping: H-P012-T002
- Tutorial Mapping: Tut-P012 sections Direct Subtraction
- Socratic Mapping: Soc-P012 subtraction branch

## Template T003 - Add to eliminate opposite x terms
- Template ID: P012-T003
- Question Type: Direct computation
- Cognitive Skill: Add equations with opposite `x` coefficients
- Difficulty: 2
- Estimated Time: 65 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Eliminate `x` when the `x` coefficients are opposites.
- Example Question: Solve: `3x + 4y = 18` and `-3x + y = -3`.
- Answer: `(2,3)`.
- Explanation: Add the equations: `5y=15`, so `y=3`. Substitute into `-3x+y=-3`: `-3x+3=-3`, so `x=2`.
- Distractors: `(3,2)`; `(2,-3)`; `(-2,3)`; `y=3`
- Distractor Rationale: Reverses coordinates; sign error; solves `-3x=-6` incorrectly; incomplete answer.
- Randomization Rules: Use `ax` and `-ax` with integer solution coordinates.
- Validity Constraints: Added `y` coefficient must be nonzero.
- Metadata: phase_id=P012; prerequisites=[integer operations, ordered pairs]; misconception_tags=[coordinate reversal, sign error, incomplete answer]; randomization_constraints=[opposite x coefficients].
- Graph/Visual Variant: Show cancellation of horizontal-variable terms visually.
- Modeling Variant: Opposing resource changes cancel.
- Reverse Variant: Given `(2,3)`, create a system with opposite `x` coefficients.
- Equation Battle Variant: Add equations, solve for `y`, back-substitute for `x`.
- Multi-stage Boss Variant: Include a sign-check checkpoint before back-substitution.
- Hint Mapping: H-P012-T003
- Tutorial Mapping: Tut-P012 sections Direct Addition
- Socratic Mapping: Soc-P012 eliminate-x branch

## Template T004 - Multiply one equation to eliminate
- Template ID: P012-T004
- Question Type: Direct computation
- Cognitive Skill: Scale one equation before combining
- Difficulty: 3
- Estimated Time: 85 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Create opposite coefficients by multiplying one equation.
- Example Question: Solve: `x + 2y = 11` and `3x + y = 13`.
- Answer: `(3,4)`.
- Explanation: Multiply the first equation by `-3`: `-3x-6y=-33`. Add to `3x+y=13`: `-5y=-20`, so `y=4`. Then `x+2(4)=11`, so `x=3`.
- Distractors: `(4,3)`; `(3,-4)`; `(11,13)`; `y=4`
- Distractor Rationale: Reverses coordinates; sign error after multiplying by `-3`; uses constants as coordinates; gives only one coordinate.
- Randomization Rules: Use one coefficient that is a multiple of the other, so one equation can be scaled.
- Validity Constraints: Multiplier must be nonzero and applied to the entire equation.
- Metadata: phase_id=P012; prerequisites=[equivalent equations, distribution]; misconception_tags=[partial multiplication, sign error, incomplete answer]; randomization_constraints=[one-equation multiplier].
- Graph/Visual Variant: Show scaled equation as the same line with stronger coefficients.
- Modeling Variant: Convert one package equation to match another package count.
- Reverse Variant: Build a system where multiplying one equation by `-3` eliminates `x`.
- Equation Battle Variant: Scale-equation card, add-equations card, solve, back-substitute.
- Multi-stage Boss Variant: Ask for the scaled equation before the final solve.
- Hint Mapping: H-P012-T004
- Tutorial Mapping: Tut-P012 sections Scaling One Equation
- Socratic Mapping: Soc-P012 scaling branch

## Template T005 - Multiply both equations to eliminate
- Template ID: P012-T005
- Question Type: Direct computation
- Cognitive Skill: Use least common multiple to create opposites
- Difficulty: 4
- Estimated Time: 105 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Scale both equations before elimination.
- Example Question: Solve: `2x + 3y = 13` and `3x - 2y = 0`.
- Answer: `(2,3)`.
- Explanation: Multiply the first equation by `2`: `4x+6y=26`. Multiply the second by `3`: `9x-6y=0`. Add: `13x=26`, so `x=2`. Then `2(2)+3y=13`, so `y=3`.
- Distractors: `(3,2)`; `(2,-3)`; `(26,3)`; no solution.
- Distractor Rationale: Reverses coordinates; sign error in the second equation; forgets to divide by 13; misclassifies because two multipliers were needed.
- Randomization Rules: Use coefficient pairs requiring scaling both equations, preferably with small least common multiples.
- Validity Constraints: Scaled equations must create exact opposite coefficients.
- Metadata: phase_id=P012; prerequisites=[LCM, equivalent equations, back-substitution]; misconception_tags=[wrong multiplier, sign error, coordinate reversal]; randomization_constraints=[two multipliers, integer solution].
- Graph/Visual Variant: Show coefficient bars reaching a shared magnitude.
- Modeling Variant: Match item counts across two bundles before comparing costs.
- Reverse Variant: Create a system requiring both equations to be multiplied.
- Equation Battle Variant: Choose two scale cards, then add or subtract.
- Multi-stage Boss Variant: Require the player to justify the multiplier choice.
- Hint Mapping: H-P012-T005
- Tutorial Mapping: Tut-P012 sections Scaling Both Equations
- Socratic Mapping: Soc-P012 both-scale branch

## Template T006 - Choose the best elimination target
- Template ID: P012-T006
- Question Type: Strategy selection and solve
- Cognitive Skill: Select the easiest variable to eliminate
- Difficulty: 3
- Estimated Time: 80 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Choose whether to eliminate `x` or `y` based on coefficients.
- Example Question: Solve efficiently: `5x + y = 17` and `2x - y = 4`.
- Answer: `(3,2)`.
- Explanation: The `y` coefficients are opposites, so add the equations: `7x=21`, `x=3`. Then `5(3)+y=17`, so `y=2`.
- Distractors: `(2,3)`; `(3,-2)`; `(21,2)`; choose to eliminate `x` first with no multiplier.
- Distractor Rationale: Reverses coordinates; sign error; forgets division; chooses a target that is not ready.
- Randomization Rules: Use one variable with opposite coefficients and the other requiring scaling.
- Validity Constraints: Direct elimination target must be uniquely best for this template.
- Metadata: phase_id=P012; prerequisites=[coefficient comparison, back-substitution]; misconception_tags=[inefficient target, coordinate reversal, sign error]; randomization_constraints=[one ready variable].
- Graph/Visual Variant: Highlight coefficients that already cancel.
- Modeling Variant: Pick which shared quantity to cancel in a bundle comparison.
- Reverse Variant: Design a system where `x` is the easiest elimination target.
- Equation Battle Variant: Choose target-variable card, add-equations card, solve.
- Multi-stage Boss Variant: Include a strategy explanation before computation.
- Hint Mapping: H-P012-T006
- Tutorial Mapping: Tut-P012 sections Strategy Choice
- Socratic Mapping: Soc-P012 strategy branch

## Template T007 - Negative coefficient care
- Template ID: P012-T007
- Question Type: Direct computation
- Cognitive Skill: Combine signed coefficients accurately
- Difficulty: 3
- Estimated Time: 80 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Use elimination when a negative coefficient is part of the cancellation.
- Example Question: Solve: `-2x + 3y = 1` and `2x + y = 11`.
- Answer: `(4,3)`.
- Explanation: Add the equations: `4y=12`, so `y=3`. Substitute into `2x+y=11`: `2x+3=11`, so `x=4`.
- Distractors: `(3,4)`; `(-4,3)`; `(4,-3)`; no solution.
- Distractor Rationale: Reverses coordinates; loses the sign on `2x`; sign error in `y`; misclassifies a normal system.
- Randomization Rules: Use opposite signed `x` coefficients and a positive integer solution.
- Validity Constraints: Constants must produce integer coordinates.
- Metadata: phase_id=P012; prerequisites=[integer signs, addition]; misconception_tags=[sign error, coordinate reversal, false classification]; randomization_constraints=[negative coefficient, integer solution].
- Graph/Visual Variant: Color the opposite signed terms before adding.
- Modeling Variant: Gains and losses that cancel across equations.
- Reverse Variant: Create a system with a negative `x` coefficient and solution `(4,3)`.
- Equation Battle Variant: Signed-addition card, solve, back-substitute.
- Multi-stage Boss Variant: Include a check for the negative term.
- Hint Mapping: H-P012-T007
- Tutorial Mapping: Tut-P012 sections Sign Care
- Socratic Mapping: Soc-P012 sign branch

## Template T008 - Clear fractions before elimination
- Template ID: P012-T008
- Question Type: Direct computation
- Cognitive Skill: Clear a fractional equation then eliminate
- Difficulty: 4
- Estimated Time: 105 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Multiply to clear fractions before using elimination.
- Example Question: Solve: `(1/2)x + y = 5` and `x - y = 1`.
- Answer: `(4,3)`.
- Explanation: Multiply the first equation by `2`: `x+2y=10`. Subtract the second equation or combine to eliminate `x`: `(x+2y)-(x-y)=9`, so `3y=9`, `y=3`. Then `x-y=1`, so `x=4`.
- Distractors: `(3,4)`; `(4,6)`; `(2,3)`; no solution.
- Distractor Rationale: Reverses coordinates; forgets to multiply `y` by 2; treats `(1/2)x` as `2x`; misclassifies because of fractions.
- Randomization Rules: Use simple fractional coefficients with denominators 2, 3, or 4.
- Validity Constraints: Clearing fractions should yield integer coefficients and a clean solution.
- Metadata: phase_id=P012; prerequisites=[fraction multiplication, equivalent equations]; misconception_tags=[partial clearing, fraction error, coordinate reversal]; randomization_constraints=[clear denominators].
- Graph/Visual Variant: Show the fraction equation before and after scaling.
- Modeling Variant: Half-rate plus fixed amount compared to another rule.
- Reverse Variant: Create a fractional system whose cleared form has solution `(4,3)`.
- Equation Battle Variant: Clear-denominator card, subtract-equations card, solve, back-substitute.
- Multi-stage Boss Variant: Ask for the cleared equation before eliminating.
- Hint Mapping: H-P012-T008
- Tutorial Mapping: Tut-P012 sections Fractions and Decimals
- Socratic Mapping: Soc-P012 fraction branch

## Template T009 - No solution from elimination contradiction
- Template ID: P012-T009
- Question Type: Classification
- Cognitive Skill: Interpret a false statement after elimination
- Difficulty: 3
- Estimated Time: 75 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Classify a system as no solution when elimination produces a contradiction.
- Example Question: Solve or classify: `2x + y = 5` and `4x + 2y = 14`.
- Answer: No solution.
- Explanation: Multiply the first equation by `-2`: `-4x-2y=-10`. Add to the second equation: `0=4`, false. No ordered pair satisfies both equations.
- Distractors: infinitely many solutions; `(0,4)`; `(5,14)`; `x=0`
- Distractor Rationale: Confuses contradiction with identity; chooses a point on one equation; uses constants as coordinates; gives a partial value.
- Randomization Rules: Use proportional left-side coefficients with nonproportional constants.
- Validity Constraints: Elimination must produce a false constant statement.
- Metadata: phase_id=P012; prerequisites=[special linear equations, proportional coefficients]; misconception_tags=[contradiction confusion, one-equation checking, constants-as-coordinates]; randomization_constraints=[parallel lines].
- Graph/Visual Variant: Show parallel lines.
- Modeling Variant: Two incompatible total rules.
- Reverse Variant: Create a system that eliminates to `0=4`.
- Equation Battle Variant: Scale, add, classify contradiction.
- Multi-stage Boss Variant: Ask for algebraic and graph interpretations.
- Hint Mapping: H-P012-T009
- Tutorial Mapping: Tut-P012 sections Special Cases
- Socratic Mapping: Soc-P012 contradiction branch

## Template T010 - Infinitely many solutions from elimination identity
- Template ID: P012-T010
- Question Type: Classification
- Cognitive Skill: Interpret a true statement after elimination
- Difficulty: 3
- Estimated Time: 75 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Classify a system as infinitely many solutions when elimination produces an identity.
- Example Question: Solve or classify: `2x + y = 5` and `4x + 2y = 10`.
- Answer: Infinitely many solutions.
- Explanation: Multiply the first equation by `-2`: `-4x-2y=-10`. Add to the second: `0=0`, true. The equations describe the same line.
- Distractors: no solution; `(0,0)` only; `(2,1)` only; `x=0`
- Distractor Rationale: Confuses identity with contradiction; treats identity as the origin; gives a single point on the line; gives only a variable value.
- Randomization Rules: Use one equation that is a nonzero multiple of the other.
- Validity Constraints: Elimination must produce a true identity.
- Metadata: phase_id=P012; prerequisites=[identity equations, equivalent lines]; misconception_tags=[identity confusion, single-point answer, origin assumption]; randomization_constraints=[same line].
- Graph/Visual Variant: Show overlapping lines.
- Modeling Variant: Two scaled descriptions of the same rule.
- Reverse Variant: Create a system that eliminates to `0=0`.
- Equation Battle Variant: Scale, add, classify identity.
- Multi-stage Boss Variant: Ask for a verbal solution-set description.
- Hint Mapping: H-P012-T010
- Tutorial Mapping: Tut-P012 sections Special Cases
- Socratic Mapping: Soc-P012 identity branch

## Template T011 - Store purchase model
- Template ID: P012-T011
- Question Type: Modeling
- Cognitive Skill: Use elimination to compare two purchases
- Difficulty: 4
- Estimated Time: 105 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Build a purchase system and solve by eliminating the shared item.
- Example Question: A shop sells potions for `p` dollars and maps for `m` dollars. Three potions and two maps cost `$13`. Five potions and two maps cost `$19`. Find both prices.
- Answer: Potion `$3`; map `$2`.
- Explanation: Equations: `3p+2m=13` and `5p+2m=19`. Subtract the first from the second: `2p=6`, so `p=3`. Then `3(3)+2m=13`, so `m=2`.
- Distractors: Potion `$2`, map `$3`; potion `$6`, map `$2`; potion `$3`, map `$4`; `$3` only.
- Distractor Rationale: Reverses item prices; forgets to divide by 2; substitutes into the wrong total; gives only one price.
- Randomization Rules: Use two purchases with one matching item count.
- Validity Constraints: Prices must be positive and satisfy both totals.
- Metadata: phase_id=P012; prerequisites=[modeling equations, subtraction elimination]; misconception_tags=[relationship reversal, incomplete answer, arithmetic error]; randomization_constraints=[positive prices].
- Graph/Visual Variant: Table of possible item prices narrowing to one pair.
- Modeling Variant: This template is the modeling variant.
- Reverse Variant: Given prices, write two purchases with one matching item count.
- Equation Battle Variant: Build equations, subtract, solve, back-substitute with units.
- Multi-stage Boss Variant: Include variable definitions, equations, solution, and check.
- Hint Mapping: H-P012-T011
- Tutorial Mapping: Tut-P012 sections Modeling With Elimination
- Socratic Mapping: Soc-P012 modeling branch

## Template T012 - Ticket bundle model
- Template ID: P012-T012
- Question Type: Modeling
- Cognitive Skill: Eliminate a shared ticket count
- Difficulty: 4
- Estimated Time: 105 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve a bundle comparison by subtracting equations.
- Example Question: Four adult tickets and three child tickets cost `$50`. Two adult tickets and three child tickets cost `$34`. Find the adult and child ticket prices.
- Answer: Adult ticket `$8`; child ticket `$6`.
- Explanation: Let `a` be adult price and `c` be child price. Equations: `4a+3c=50` and `2a+3c=34`. Subtract: `2a=16`, so `a=8`. Then `2(8)+3c=34`, so `3c=18`, `c=6`.
- Distractors: adult `$6`, child `$8`; adult `$16`, child `$6`; adult `$8`, child `$18`; no solution.
- Distractor Rationale: Reverses labels; forgets to divide by 2; forgets to divide by 3; misclassifies a solvable system.
- Randomization Rules: Use two bundles with a shared child count or shared adult count.
- Validity Constraints: Prices must be positive and preferably whole-dollar.
- Metadata: phase_id=P012; prerequisites=[modeling, subtracting equations]; misconception_tags=[label reversal, division error, false classification]; randomization_constraints=[positive prices].
- Graph/Visual Variant: Bar model showing shared child-ticket block canceling.
- Modeling Variant: This template is the modeling variant.
- Reverse Variant: Build two bundles from adult `$8` and child `$6`.
- Equation Battle Variant: Subtract bundle equations, solve one price, back-substitute.
- Multi-stage Boss Variant: Include a units check in both totals.
- Hint Mapping: H-P012-T012
- Tutorial Mapping: Tut-P012 sections Modeling With Elimination
- Socratic Mapping: Soc-P012 modeling branch

## Template T013 - Graph intersection verified by elimination
- Template ID: P012-T013
- Question Type: Graph interpretation
- Cognitive Skill: Use elimination to confirm an intersection
- Difficulty: 3
- Estimated Time: 85 seconds
- Visual Required: true
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Connect elimination to graph intersections.
- Example Question: The graphed lines satisfy `x + y = 7` and `x - y = 1`. Use elimination to find the intersection.
- Answer: `(4,3)`.
- Explanation: Add the equations: `2x=8`, so `x=4`. Substitute into `x+y=7`: `4+y=7`, so `y=3`.
- Distractors: `(3,4)`; `(4,-3)`; `(8,3)`; no solution.
- Distractor Rationale: Reverses coordinates; sign error; forgets to divide by 2; ignores the visible intersection.
- Randomization Rules: Use two standard-form equations with visible integer intersection.
- Validity Constraints: The intersection must satisfy both equations and fit the graph window.
- Metadata: phase_id=P012; prerequisites=[graph intersections, elimination]; misconception_tags=[graph-algebra disconnect, coordinate reversal, sign error]; randomization_constraints=[visible integer intersection].
- Graph/Visual Variant: This template requires a two-line graph.
- Modeling Variant: Two balanced scoring rules meeting at the same point.
- Reverse Variant: Given graph intersection `(4,3)`, write equations that eliminate cleanly.
- Equation Battle Variant: Add-equations card, solve, plot point.
- Multi-stage Boss Variant: Ask for graph estimate, algebraic proof, and check.
- Hint Mapping: H-P012-T013
- Tutorial Mapping: Tut-P012 sections Graph Connection
- Socratic Mapping: Soc-P012 graph branch

## Template T014 - Decide elimination is the efficient method
- Template ID: P012-T014
- Question Type: Strategy selection
- Cognitive Skill: Compare method efficiency
- Difficulty: 3
- Estimated Time: 70 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Recognize when elimination is more efficient than substitution.
- Example Question: For `7x + 2y = 24` and `3x - 2y = -4`, which method is most efficient, and what is the solution?
- Answer: Elimination is most efficient; solution `(2,5)`.
- Explanation: The `y` coefficients are already opposites, so add: `10x=20`, `x=2`. Then `7(2)+2y=24`, so `y=5`.
- Distractors: substitution is best because no variable is isolated; solution `(5,2)`; no solution; eliminate `x` directly.
- Distractor Rationale: Mistakes lack of isolated variable for substitution advantage; reverses coordinates; misclassifies; chooses a variable not ready to cancel.
- Randomization Rules: Use systems with no isolated variable but one pair of opposite coefficients.
- Validity Constraints: Elimination should require fewer operations than substitution.
- Metadata: phase_id=P012; prerequisites=[method comparison, coefficient recognition]; misconception_tags=[method confusion, coordinate reversal, inefficient target]; randomization_constraints=[opposite coefficients].
- Graph/Visual Variant: Highlight ready-to-cancel coefficients.
- Modeling Variant: Choose elimination for bundle equations with shared counts.
- Reverse Variant: Create a system where elimination is the obvious method.
- Equation Battle Variant: Method-choice card, add-equations card, solve.
- Multi-stage Boss Variant: Include a short written method justification.
- Hint Mapping: H-P012-T014
- Tutorial Mapping: Tut-P012 sections Strategy Choice
- Socratic Mapping: Soc-P012 method-choice branch

## Template T015 - Legal elimination move in Equation Battle
- Template ID: P012-T015
- Question Type: Equation Battle move validation
- Cognitive Skill: Identify a legal equation-combination move
- Difficulty: 3
- Estimated Time: 70 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Select a valid elimination move that preserves solutions.
- Example Question: In Equation Battle, the system is `2x + 3y = 13` and `5x - 3y = 8`. Which move legally eliminates a variable?
- Answer: Add the two equations to eliminate `y`, giving `7x=21`.
- Explanation: The `+3y` and `-3y` terms are opposites, so adding equations cancels `y` and preserves the solution set.
- Distractors: Add only the left sides; subtract the equations to eliminate `y`; divide only `3y` by 3; replace one equation with `7x=5`.
- Distractor Rationale: Does not preserve equality; subtraction doubles `y`; changes only one term; subtracts constants incorrectly.
- Randomization Rules: Use a system with one ready cancellation and several tempting illegal moves.
- Validity Constraints: Exactly one listed move should be both legal and useful.
- Metadata: phase_id=P012; prerequisites=[Equation Battle fundamentals, equivalent equations]; misconception_tags=[illegal move, wrong operation, constant error]; randomization_constraints=[ready cancellation].
- Graph/Visual Variant: Show legal moves as preserving intersection.
- Modeling Variant: Choose a valid comparison move between two bundle equations.
- Reverse Variant: Create a system where subtracting, not adding, is the legal cancellation move.
- Equation Battle Variant: This template is the Equation Battle move family.
- Multi-stage Boss Variant: After choosing the legal move, solve the system.
- Hint Mapping: H-P012-T015
- Tutorial Mapping: Tut-P012 sections Equation Battle Elimination
- Socratic Mapping: Soc-P012 battle branch

## Template T016 - Error analysis: wrong combine operation
- Template ID: P012-T016
- Question Type: Error analysis
- Cognitive Skill: Diagnose adding versus subtracting errors
- Difficulty: 4
- Estimated Time: 95 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Correct a failed elimination step and solve the system.
- Example Question: A student solves `2x + 3y = 16` and `4x - 3y = 14` by subtracting the equations to eliminate `y`. What is wrong, and what is the correct solution?
- Answer: The `y` terms are opposites, so the equations should be added, not subtracted. Correct solution: `(5,2)`.
- Explanation: Add the equations: `6x=30`, so `x=5`. Substitute into `2x+3y=16`: `10+3y=16`, so `y=2`.
- Distractors: The student should multiply both equations by 3; correct solution `(2,5)`; no mistake; no solution.
- Distractor Rationale: Uses unnecessary scaling; reverses coordinates; misses the operation error; misclassifies a unique solution.
- Randomization Rules: Present a worked move using the opposite operation from the required one.
- Validity Constraints: The error must be visible from coefficient signs.
- Metadata: phase_id=P012; prerequisites=[coefficient signs, error analysis]; misconception_tags=[wrong combine operation, coordinate reversal, false classification]; randomization_constraints=[opposite terms].
- Graph/Visual Variant: Show `+3y` and `-3y` canceling only under addition.
- Modeling Variant: Diagnose an invalid bundle-comparison step.
- Reverse Variant: Create an incorrect elimination solution for a given system.
- Equation Battle Variant: Reject wrong-operation card; choose add-equations card.
- Multi-stage Boss Variant: Identify the error, correct the move, solve, and check.
- Hint Mapping: H-P012-T016
- Tutorial Mapping: Tut-P012 sections Common Mistakes
- Socratic Mapping: Soc-P012 error branch

## Template T017 - Scaling with a negative coefficient
- Template ID: P012-T017
- Question Type: Direct computation
- Cognitive Skill: Use scaling with signed coefficients to create cancellation
- Difficulty: 4
- Estimated Time: 100 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Multiply an equation to create cancellation with a negative coefficient.
- Example Question: Solve: `3x - 2y = 2` and `5x + 4y = 40`.
- Answer: `(4,5)`.
- Explanation: Multiply the first equation by `2`: `6x-4y=4`. Add to `5x+4y=40`: `11x=44`, so `x=4`. Then `3(4)-2y=2`, so `y=5`.
- Distractors: `(5,4)`; `(4,-5)`; `(44,5)`; no solution.
- Distractor Rationale: Reverses coordinates; loses a negative sign; forgets to divide by 11; misclassifies a normal system.
- Randomization Rules: Use one coefficient that becomes the opposite of another after multiplying by a positive or negative integer.
- Validity Constraints: The scaled equation must remain equivalent to the original.
- Metadata: phase_id=P012; prerequisites=[multiplying equations, sign care]; misconception_tags=[sign error, scaling error, coordinate reversal]; randomization_constraints=[multiplier needed].
- Graph/Visual Variant: Show the scaled first line as equivalent to the original line.
- Modeling Variant: Double one equation so a debt term cancels a credit term.
- Reverse Variant: Build a system where multiplying the first equation by 2 eliminates `y`.
- Equation Battle Variant: Scale equation, add, solve, back-substitute.
- Multi-stage Boss Variant: Require the scaled equation to be written before combining.
- Hint Mapping: H-P012-T017
- Tutorial Mapping: Tut-P012 sections Scaling One Equation
- Socratic Mapping: Soc-P012 negative-multiplier branch

## Template T018 - Classify from proportional coefficients
- Template ID: P012-T018
- Question Type: Classification
- Cognitive Skill: Use coefficient and constant ratios to predict elimination result
- Difficulty: 4
- Estimated Time: 85 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Predict no solution or infinitely many solutions before solving fully.
- Example Question: Classify the system: `2x + 3y = 7` and `4x + 6y = 15`.
- Answer: No solution.
- Explanation: The left side of the second equation is twice the left side of the first, but the constant should be `14`, not `15`, for the same line. Elimination gives `0=1`, so there is no solution.
- Distractors: infinitely many solutions; one solution; `(2,1)`; `(0,0)`
- Distractor Rationale: Ignores the constant ratio; assumes all proportional coefficients mean same line; picks a point from one equation; treats cancellation as the origin.
- Randomization Rules: Use proportional variable coefficients with constants either proportional or not.
- Validity Constraints: The classification must match the constant ratio.
- Metadata: phase_id=P012; prerequisites=[ratios, special systems]; misconception_tags=[constant ratio error, identity confusion, origin assumption]; randomization_constraints=[proportional coefficients].
- Graph/Visual Variant: Show parallel versus overlapping lines.
- Modeling Variant: Compare scaled package equations with inconsistent totals.
- Reverse Variant: Change the constant to make the system infinitely many solutions.
- Equation Battle Variant: Scale first equation by -2, add, classify.
- Multi-stage Boss Variant: Ask for prediction, elimination proof, and graph meaning.
- Hint Mapping: H-P012-T018
- Tutorial Mapping: Tut-P012 sections Special Cases
- Socratic Mapping: Soc-P012 proportional branch

## Template T019 - Reverse-build an elimination-friendly system
- Template ID: P012-T019
- Question Type: Reverse construction
- Cognitive Skill: Create a system with a target solution and canceling coefficients
- Difficulty: 4
- Estimated Time: 100 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Construct a system that has a chosen solution and can be solved by elimination.
- Example Question: Create a system solvable by elimination with solution `(2,-1)`.
- Answer: One valid answer is `3x + 2y = 4` and `5x - 2y = 12`.
- Explanation: The point `(2,-1)` satisfies both equations: `3(2)+2(-1)=4` and `5(2)-2(-1)=12`. Adding the equations gives `8x=16`, so elimination recovers `x=2`, then `y=-1`.
- Distractors: `3x+2y=4` and `5x-2y=8`; `3x+2y=8` and `5x-2y=12`; `x=2` and `y=1`; two identical equations only.
- Distractor Rationale: Fails the second equation check; fails the first equation check; wrong sign for `y`; does not create a unique elimination system.
- Randomization Rules: Given target `(h,k)`, choose opposite coefficients for one variable and constants produced from the target.
- Validity Constraints: The two equations must be independent and both must contain the target point.
- Metadata: phase_id=P012; prerequisites=[ordered-pair checking, equation construction]; misconception_tags=[not checking target, sign error, dependent equations]; randomization_constraints=[target point, canceling coefficients].
- Graph/Visual Variant: Draw two constructed lines crossing at the target.
- Modeling Variant: Build two bundle totals from known item prices.
- Reverse Variant: This template is the reverse variant.
- Equation Battle Variant: Verify equations, add to eliminate, solve back to the target.
- Multi-stage Boss Variant: Require proof that the system has a unique solution.
- Hint Mapping: H-P012-T019
- Tutorial Mapping: Tut-P012 sections Reverse Construction
- Socratic Mapping: Soc-P012 reverse branch

## Template T020 - Boss elimination challenge
- Template ID: P012-T020
- Question Type: Multi-stage boss
- Cognitive Skill: Scale both equations, eliminate, back-substitute, and check
- Difficulty: 5
- Estimated Time: 140 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Complete a full elimination solution requiring two multipliers.
- Example Question: Boss Gate: Solve and check `3x + 2y = 18` and `5x - 3y = 11`.
- Answer: `(4,3)`.
- Explanation: Multiply the first equation by `3`: `9x+6y=54`. Multiply the second equation by `2`: `10x-6y=22`. Add: `19x=76`, so `x=4`. Substitute into `3x+2y=18`: `12+2y=18`, so `y=3`. Check: `5(4)-3(3)=11`.
- Distractors: `(3,4)`; `(4,-3)`; `(76,3)`; no solution.
- Distractor Rationale: Reverses coordinates; sign error; forgets to divide by 19; misclassifies a solvable system.
- Randomization Rules: Use two equations requiring both to be multiplied to eliminate a variable.
- Validity Constraints: Unique solution; exact arithmetic must check in both original equations.
- Metadata: phase_id=P012; prerequisites=[LCM, scaling equations, back-substitution, checking]; misconception_tags=[wrong multiplier, sign error, coordinate reversal, false classification]; randomization_constraints=[two multipliers, unique solution].
- Graph/Visual Variant: Optional graph confirms the intersection at `(4,3)`.
- Modeling Variant: Advanced bundle puzzle with two different mixtures.
- Reverse Variant: Build a boss system with solution `(4,3)`.
- Equation Battle Variant: Choose multipliers 3 and 2, add equations, solve, back-substitute, check.
- Multi-stage Boss Variant: This is the phase boss template.
- Hint Mapping: H-P012-T020
- Tutorial Mapping: Tut-P012 sections Full Phase Review
- Socratic Mapping: Soc-P012 boss branch

# Part II - Hint Bible

## H-P012-T001
- Hint 1 - Gentle Nudge: Look at the `y` terms.
- Hint 2 - Concept Reminder: `+y` and `-y` add to 0.
- Hint 3 - Focus Hint: Add the two equations.
- Hint 4 - Guided Next Step: `2x+y+3x-y=11+14`.
- Hint 5 - Nearly Complete: `5x=25`, so `x=5`; then find `y`.
- Hint 6 - Full Solution: `x=5`, `y=1`, so `(5,1)`.

## H-P012-T002
- Hint 1 - Gentle Nudge: The `2y` terms match.
- Hint 2 - Concept Reminder: Matching terms cancel by subtraction, not addition.
- Hint 3 - Focus Hint: Subtract the second equation from the first.
- Hint 4 - Guided Next Step: `(4x+2y)-(x+2y)=18-9`.
- Hint 5 - Nearly Complete: `3x=9`, so `x=3`; then solve `3+2y=9`.
- Hint 6 - Full Solution: `x=3`, `y=3`, so `(3,3)`.

## H-P012-T003
- Hint 1 - Gentle Nudge: The `x` terms are already opposites.
- Hint 2 - Concept Reminder: `3x + (-3x)=0`.
- Hint 3 - Focus Hint: Add the equations to eliminate `x`.
- Hint 4 - Guided Next Step: `4y+y=18+(-3)`.
- Hint 5 - Nearly Complete: `5y=15`, so `y=3`; then find `x`.
- Hint 6 - Full Solution: `y=3`, `x=2`, so `(2,3)`.

## H-P012-T004
- Hint 1 - Gentle Nudge: Make the `x` coefficients opposites.
- Hint 2 - Concept Reminder: Multiply the entire first equation by `-3`.
- Hint 3 - Focus Hint: `-3x-6y=-33`.
- Hint 4 - Guided Next Step: Add this to `3x+y=13`.
- Hint 5 - Nearly Complete: `-5y=-20`, so `y=4`; then find `x`.
- Hint 6 - Full Solution: `y=4`, `x=3`, so `(3,4)`.

## H-P012-T005
- Hint 1 - Gentle Nudge: Neither variable cancels yet.
- Hint 2 - Concept Reminder: Use a common multiple of the `y` coefficients 3 and 2.
- Hint 3 - Focus Hint: Multiply the first equation by 2 and the second by 3.
- Hint 4 - Guided Next Step: `4x+6y=26` and `9x-6y=0`.
- Hint 5 - Nearly Complete: Add to get `13x=26`, so `x=2`.
- Hint 6 - Full Solution: `x=2`, `y=3`, so `(2,3)`.

## H-P012-T006
- Hint 1 - Gentle Nudge: Look for coefficients that already cancel.
- Hint 2 - Concept Reminder: `+y` and `-y` are opposites.
- Hint 3 - Focus Hint: Add the equations.
- Hint 4 - Guided Next Step: `5x+2x=17+4`.
- Hint 5 - Nearly Complete: `7x=21`, so `x=3`; then find `y`.
- Hint 6 - Full Solution: `x=3`, `y=2`, so `(3,2)`.

## H-P012-T007
- Hint 1 - Gentle Nudge: The `x` terms have opposite signs.
- Hint 2 - Concept Reminder: `-2x+2x=0`.
- Hint 3 - Focus Hint: Add the equations.
- Hint 4 - Guided Next Step: `3y+y=1+11`.
- Hint 5 - Nearly Complete: `4y=12`, so `y=3`.
- Hint 6 - Full Solution: `y=3`, `x=4`, so `(4,3)`.

## H-P012-T008
- Hint 1 - Gentle Nudge: Clear the fraction first.
- Hint 2 - Concept Reminder: Multiply the entire first equation by 2.
- Hint 3 - Focus Hint: `(1/2)x+y=5` becomes `x+2y=10`.
- Hint 4 - Guided Next Step: Subtract `x-y=1` from `x+2y=10`.
- Hint 5 - Nearly Complete: `3y=9`, so `y=3`.
- Hint 6 - Full Solution: `y=3`, `x=4`, so `(4,3)`.

## H-P012-T009
- Hint 1 - Gentle Nudge: The second left side is twice the first left side.
- Hint 2 - Concept Reminder: Scale the first equation to cancel the second.
- Hint 3 - Focus Hint: Multiply `2x+y=5` by `-2`.
- Hint 4 - Guided Next Step: Add `-4x-2y=-10` to `4x+2y=14`.
- Hint 5 - Nearly Complete: The result is `0=4`, which is false.
- Hint 6 - Full Solution: No solution.

## H-P012-T010
- Hint 1 - Gentle Nudge: The second equation is exactly twice the first.
- Hint 2 - Concept Reminder: Equivalent equations describe the same line.
- Hint 3 - Focus Hint: Multiply the first equation by `-2`.
- Hint 4 - Guided Next Step: Add `-4x-2y=-10` to `4x+2y=10`.
- Hint 5 - Nearly Complete: The result is `0=0`, which is always true.
- Hint 6 - Full Solution: Infinitely many solutions.

## H-P012-T011
- Hint 1 - Gentle Nudge: The map count is the same in both purchases.
- Hint 2 - Concept Reminder: Subtract equations with matching terms.
- Hint 3 - Focus Hint: `(5p+2m)-(3p+2m)=19-13`.
- Hint 4 - Guided Next Step: `2p=6`.
- Hint 5 - Nearly Complete: `p=3`; substitute into `3p+2m=13`.
- Hint 6 - Full Solution: Potion `$3`; map `$2`.

## H-P012-T012
- Hint 1 - Gentle Nudge: The child-ticket count is the same.
- Hint 2 - Concept Reminder: Subtract the smaller bundle from the larger bundle.
- Hint 3 - Focus Hint: `(4a+3c)-(2a+3c)=50-34`.
- Hint 4 - Guided Next Step: `2a=16`, so `a=8`.
- Hint 5 - Nearly Complete: Use `2a+3c=34` to find `c`.
- Hint 6 - Full Solution: Adult `$8`; child `$6`.

## H-P012-T013
- Hint 1 - Gentle Nudge: The graph intersection is the system solution.
- Hint 2 - Concept Reminder: Use elimination to confirm the point exactly.
- Hint 3 - Focus Hint: Add `x+y=7` and `x-y=1`.
- Hint 4 - Guided Next Step: `2x=8`.
- Hint 5 - Nearly Complete: `x=4`; substitute to get `y=3`.
- Hint 6 - Full Solution: The intersection is `(4,3)`.

## H-P012-T014
- Hint 1 - Gentle Nudge: No variable is isolated, but one pair is ready to cancel.
- Hint 2 - Concept Reminder: Opposite coefficients are perfect for elimination.
- Hint 3 - Focus Hint: Add the equations to eliminate `y`.
- Hint 4 - Guided Next Step: `10x=20`.
- Hint 5 - Nearly Complete: `x=2`; use the first equation for `y`.
- Hint 6 - Full Solution: Elimination is efficient; the solution is `(2,5)`.

## H-P012-T015
- Hint 1 - Gentle Nudge: Legal moves must preserve equality.
- Hint 2 - Concept Reminder: `+3y` and `-3y` cancel by addition.
- Hint 3 - Focus Hint: Add both left sides and both right sides.
- Hint 4 - Guided Next Step: `(2x+3y)+(5x-3y)=13+8`.
- Hint 5 - Nearly Complete: This gives `7x=21`.
- Hint 6 - Full Solution: Legal move: add the equations to eliminate `y`.

## H-P012-T016
- Hint 1 - Gentle Nudge: Check the signs on the `y` terms.
- Hint 2 - Concept Reminder: Opposite terms cancel by addition.
- Hint 3 - Focus Hint: `+3y` and `-3y` should be added.
- Hint 4 - Guided Next Step: Add the equations to get `6x=30`.
- Hint 5 - Nearly Complete: `x=5`; substitute into `2x+3y=16`.
- Hint 6 - Full Solution: Mistake: subtracting instead of adding. Correct solution: `(5,2)`.

## H-P012-T017
- Hint 1 - Gentle Nudge: Make the `y` coefficients opposites.
- Hint 2 - Concept Reminder: Multiply the entire first equation by 2.
- Hint 3 - Focus Hint: `6x-4y=4`.
- Hint 4 - Guided Next Step: Add to `5x+4y=40`.
- Hint 5 - Nearly Complete: `11x=44`, so `x=4`.
- Hint 6 - Full Solution: `x=4`, `y=5`, so `(4,5)`.

## H-P012-T018
- Hint 1 - Gentle Nudge: Compare the coefficient ratios and the constants.
- Hint 2 - Concept Reminder: Doubling `2x+3y` gives `4x+6y`.
- Hint 3 - Focus Hint: Doubling the constant 7 would give 14, not 15.
- Hint 4 - Guided Next Step: Elimination would produce a false statement.
- Hint 5 - Nearly Complete: The lines are parallel, not the same line.
- Hint 6 - Full Solution: No solution.

## H-P012-T019
- Hint 1 - Gentle Nudge: The target point must satisfy both equations.
- Hint 2 - Concept Reminder: Choose opposite coefficients for one variable.
- Hint 3 - Focus Hint: `3x+2y=4` works for `(2,-1)`.
- Hint 4 - Guided Next Step: `5x-2y=12` also works for `(2,-1)`.
- Hint 5 - Nearly Complete: Adding them gives `8x=16`.
- Hint 6 - Full Solution: One valid system is `3x+2y=4` and `5x-2y=12`.

## H-P012-T020
- Hint 1 - Gentle Nudge: Use a common multiple of 2 and 3 for the `y` terms.
- Hint 2 - Concept Reminder: Make `+6y` and `-6y`.
- Hint 3 - Focus Hint: Multiply the first equation by 3 and the second by 2.
- Hint 4 - Guided Next Step: `9x+6y=54` and `10x-6y=22`.
- Hint 5 - Nearly Complete: Add to get `19x=76`, so `x=4`.
- Hint 6 - Full Solution: `x=4`, `y=3`, so `(4,3)`.

# Part III - Tutorial Bible

## Learning Goal
Learn to solve systems of linear equations by elimination: combining equations so one variable disappears and the system becomes one equation in one variable.

## Why It Matters
Elimination is powerful when equations are in standard form, especially in comparison, bundle, and balance problems. It also prepares players for matrices, linear combinations, and later algebra where combining equations reveals hidden structure.

## Prerequisite Check
Ask the player:

1. What is `3y + (-3y)`? Expected: `0`.
2. What is `(4x+2y)-(x+2y)`? Expected: `3x`.
3. If an equation is multiplied by 2, what must be multiplied? Expected: every term on both sides.
4. What does the ordered pair `(5,1)` mean? Expected: `x=5`, `y=1`.
5. What does `0=4` mean? Expected: impossible, so no solution.

## Core Concept
Elimination removes a variable by combining equations.

For:

`2x + y = 11`

`3x - y = 14`

the `y` terms are opposites. Add the equations:

`5x = 25`

`x = 5`

Then back-substitute:

`2(5)+y=11`

`y=1`

Solution: `(5,1)`.

## Direct Addition
Use addition when one variable has opposite coefficients.

Example:

`3x+4y=18`

`-3x+y=-3`

Add:

`5y=15`

`y=3`

Then `x=2`, so `(2,3)`.

## Direct Subtraction
Use subtraction when one variable has matching coefficients.

Example:

`4x+2y=18`

`x+2y=9`

Subtract the second equation from the first:

`3x=9`

`x=3`

Then `y=3`, so `(3,3)`.

## Scaling One Equation
If coefficients do not cancel yet, multiply one entire equation.

Example:

`x+2y=11`

`3x+y=13`

Multiply the first equation by `-3`:

`-3x-6y=-33`

Add:

`-5y=-20`

`y=4`

Then `x=3`.

## Scaling Both Equations
Sometimes both equations need new coefficients.

Example:

`2x+3y=13`

`3x-2y=0`

Make `+6y` and `-6y`:

`4x+6y=26`

`9x-6y=0`

Add:

`13x=26`

`x=2`

Then `y=3`.

## Strategy Choice
Look for:

1. Opposite coefficients: add.
2. Matching coefficients: subtract.
3. A small multiplier that creates opposites.
4. A variable with smaller least common multiple.

Eliminate the variable that creates the least arithmetic.

## Sign Care
Signs determine the operation.

- `+3y` and `-3y`: add.
- `+3y` and `+3y`: subtract.
- `-3y` and `-3y`: subtract.

After combining, keep the sign of the remaining terms carefully.

## Fractions and Decimals
If a fraction appears, clear it first when helpful.

Example:

`(1/2)x+y=5`

`x-y=1`

Multiply the first equation by 2:

`x+2y=10`

Subtract `x-y=1`:

`3y=9`

`y=3`

Then `x=4`.

## Special Cases
If elimination removes both variables:

- False statement, such as `0=4`: no solution.
- True statement, such as `0=0`: infinitely many solutions.

These are not single ordered pairs.

## Modeling With Elimination
Elimination works naturally when two context equations share one count.

Example:

`3p+2m=13`

`5p+2m=19`

Both have `2m`. Subtract:

`2p=6`

`p=3`

Then maps cost `$2`.

## Graph Connection
The solution of a linear system is the graph intersection.

Elimination finds the same intersection without drawing the graph. For `x+y=7` and `x-y=1`, adding gives `2x=8`, so the intersection has `x=4`. Then `y=3`, so the intersection is `(4,3)`.

## Equation Battle Elimination
Legal elimination moves preserve the solution set:

- Multiply an entire equation by a nonzero number.
- Add or subtract entire equations.
- Replace one equation with the result of a legal combination.

Illegal moves include changing only one term, adding only left sides, or forgetting to combine constants.

## Common Mistakes
- Mistake: Adding matching coefficients.
  Correction: Matching terms cancel by subtraction.
- Mistake: Subtracting opposite coefficients.
  Correction: Opposite terms cancel by addition.
- Mistake: Multiplying only one term.
  Correction: Multiply the entire equation.
- Mistake: Forgetting the constant when scaling.
  Correction: Scale both sides.
- Mistake: Stopping after `x=...`.
  Correction: Back-substitute for the other variable.
- Mistake: Calling `0=0` the point `(0,0)`.
  Correction: `0=0` means infinitely many solutions.

## Guided Practice
1. Solve `x+y=9` and `x-y=3`.
   - Add: `2x=12`.
   - `x=6`.
   - `y=3`.
   - Solution: `(6,3)`.

2. Solve `2x+3y=16` and `4x-3y=14`.
   - Add: `6x=30`.
   - `x=5`.
   - `y=2`.
   - Solution: `(5,2)`.

3. Classify `2x+y=5` and `4x+2y=14`.
   - Multiply first by `-2`: `-4x-2y=-10`.
   - Add: `0=4`.
   - No solution.

## Independent Practice
1. `x+y=8`, `x-y=2`; answer `(5,3)`.
2. `2x+y=12`, `3x-y=8`; answer `(4,4)`.
3. `4x+2y=20`, `x+2y=8`; answer `(4,2)`.
4. `2x+3y=14`, `4x-3y=10`; answer `(4,2)`.
5. `2x+y=6`, `4x+2y=12`; infinitely many solutions.
6. `2x+y=6`, `4x+2y=13`; no solution.

## Mastery Check
The player is ready to advance when they can:

1. Identify whether to add, subtract, or scale.
2. Multiply entire equations correctly.
3. Eliminate a chosen variable.
4. Back-substitute and write `(x,y)`.
5. Check both original equations.
6. Classify contradiction and identity cases.
7. Use elimination in a context problem.

Mastery check set:

1. `3x+y=13`, `x-y=3`; solution `(4,1)`.
2. `2x+5y=21`, `2x-y=3`; solution `(3,3)`.
3. `x+2y=10`, `3x+2y=18`; solution `(4,3)`.
4. `2x+y=5`, `4x+2y=10`; infinitely many solutions.
5. `2x+y=5`, `4x+2y=11`; no solution.

## Adaptive Tutor Messages
- If the player adds when coefficients match: "Matching terms cancel by subtraction; opposite terms cancel by addition."
- If the player subtracts when coefficients are opposites: "Opposite signs are ready to add to zero."
- If scaling is partial: "Scale the entire equation, including every term and the constant."
- If the player stops after one variable: "Back-substitute to complete the ordered pair."
- If signs slip: "Rewrite the combined equation slowly, term by term."
- If special cases are confused: "When both variables disappear, judge the remaining statement as true or false."
- If the player succeeds quickly: "You are ready to compare elimination with graphing systems."

## Tutorial Metadata
- Tutorial ID: Tut-P012
- Estimated duration: 6 minutes
- Target player state: knows substitution systems and linear equation solving
- Unlock condition: available from any Phase 012 question
- Remediation trigger: two wrong-operation errors, two partial-scaling errors, one special-case classification error, or repeated incomplete ordered-pair answers
- Advancement trigger: 80 percent accuracy on mixed elimination systems, including one scaling-both-equations item, one model, and one special-case classification

# Part IV - Socratic Dialogue Bible

## Opening Diagnostic
Tutor: "In `2x+y=11` and `3x-y=14`, what happens if we add the two equations?"

Expected strong answer: "The `y` terms cancel, giving `5x=25`."

## Guided Discovery
Tutor sequence:

1. "Do any coefficients already match or appear as opposites?"
2. "Should we add, subtract, or scale first?"
3. "Which variable will disappear?"
4. "If scaling is needed, what must happen to the entire equation?"
5. "What equation remains after elimination?"
6. "How do you solve the one-variable equation?"
7. "How will you find the other coordinate?"
8. "How should the final answer be written?"
9. "Does the ordered pair check in both original equations?"
10. "If both variables disappear, is the remaining statement true or false?"

## Correct Branch
Player: "Add the equations because `y` and `-y` cancel."

Tutor: "Good. What equation remains after adding the `x` terms and constants?"

If player says `5x=25`, ask them to solve and back-substitute.

## Partial Understanding Branch
Player finds `x=5` but stops.

Tutor: "That is one coordinate. Which original equation looks easiest for finding `y`?"

If player chooses `2x+y=11`, prompt: "Substitute `x=5` and solve for `y`."

## Misconception Branch
Player subtracts `2x+y=11` and `3x-y=14`.

Tutor: "Before combining, focus only on the `y` terms. Does `y - (-y)` cancel, or does it become `2y`?"

Recovery target: Player realizes addition is needed.

## Scaling Branch
Player multiplies only one term while scaling.

Tutor: "An equation is a balance. If you multiply by a number, which parts of the equation must be multiplied to keep the balance?"

Recovery target: Player multiplies every term and the constant.

## Special Case Branch
Player gets `0=4` and tries to solve for a variable.

Tutor: "There is no variable left. Is `0=4` ever true?"

If player says no: "Then can any ordered pair satisfy both equations?"

## Identity Branch
Player gets `0=0` and says `(0,0)`.

Tutor: "Does `0=0` depend on `x` or `y` at all? If every point on one line also lies on the other, how many solutions are there?"

Recovery target: Player identifies infinitely many solutions.

## Unsure Branch
Player: "I do not know whether to add or subtract."

Tutor: "Compare the signs. Are the coefficients the same sign and same number, or opposite signs with the same number?"

If player identifies opposites, ask: "Which operation makes opposites become zero?"

## Unrelated Response Branch
Player gives an unrelated answer.

Tutor: "Let's narrow it to one target: which variable has coefficients that can cancel?"

If unrelated again, use a two-choice prompt: "`y` terms or `x` terms?"

## Recovery Prompts
- "Which coefficients match?"
- "Which coefficients are opposites?"
- "Would addition or subtraction make zero?"
- "Do we need to multiply an equation first?"
- "Did every term get multiplied?"
- "What one-variable equation remains?"
- "After finding one variable, where will you substitute it?"
- "Is the answer written as `(x,y)`?"
- "Does the pair check in both equations?"
- "If variables disappeared, is the remaining statement true or false?"

## Reflection Question
"Why does multiplying an entire equation by a nonzero number not change the solution set?"

Strong reflection: "It creates an equivalent equation with the same truth values for every ordered pair, so the intersection with the other equation stays the same."

## Transfer Question
"When might elimination be easier than substitution?"

Expected transfer: "When equations are in standard form and a variable already has matching or opposite coefficients, or can get them with small multipliers."

## Escalation Rules
- If the player cannot identify ready cancellation, show Direct Addition and Direct Subtraction.
- If scaling errors repeat, show Scaling One Equation and Scaling Both Equations.
- If sign errors repeat, show Sign Care.
- If fraction setup blocks progress, show Fractions and Decimals.
- If special-case errors repeat, show Special Cases.
- If context setup fails, show Modeling With Elimination.
- If the player solves three mixed systems and checks both equations, advance to independent practice.

## Exit Condition
The Socratic sequence is complete when the player:

1. Identifies matching or opposite coefficients.
2. Chooses add, subtract, or scale correctly.
3. Multiplies whole equations when needed.
4. Eliminates one variable.
5. Solves and back-substitutes.
6. Writes the solution as `(x,y)`.
7. Checks both equations or classifies the special case.

# Knowledge Graph

- Prerequisites: Phase 002 multi-step linear equations; Phase 003 variables on both sides; Phase 005 linear equation modeling; Phase 006 Equation Battle fundamentals; Phase 011 systems by substitution; integer operations; ordered pairs
- Concepts Unlocked: elimination method; linear combinations; equivalent systems; scaling equations; no-solution systems; infinitely-many-solution systems; bundle comparison models; graph intersection verification
- Related Concepts: substitution method; graphing systems; matrix row operations; linear combination proofs; break-even analysis; dependent and inconsistent systems
- Common Misconceptions: wrong combine operation; partial scaling; constant not scaled; sign errors; incomplete ordered pair; coordinate reversal; contradiction classified as solution; identity classified as `(0,0)`
- Remedial Phases: Phase 002 review; Phase 003 review; Phase 006 review; Phase 011 review; integer sign mini-lesson; ordered-pair mini-lesson
- Follow-up Phases: Phase 013 - Systems by graphing; Phase 014 - Function notation; Phase 027 - Quadratic modeling; Phase 058 - Mixed review
- Transfer Topics: graph intersections; matrix elimination; chemical-equation balancing intuition; bundle pricing; linear programming constraints

# Validation Notes

## Structure Validation
- Includes all required Bibles and metadata sections.
- Contains exactly 20 template families, within the required 20-40 range.
- Each template includes example, answer, explanation, distractors, distractor rationale, randomization rules, validity constraints, metadata, variants, and mappings.
- Every template has six progressive hints.

## Math Validation
- T001: add `2x+y=11` and `3x-y=14` -> `5x=25`, `x=5`, `y=1`.
- T002: subtract `x+2y=9` from `4x+2y=18` -> `3x=9`, `x=3`, `y=3`.
- T003: add `3x+4y=18` and `-3x+y=-3` -> `5y=15`, `y=3`, `x=2`.
- T004: multiply `x+2y=11` by `-3`; add to `3x+y=13` -> `-5y=-20`, `y=4`, `x=3`.
- T005: scale to `4x+6y=26` and `9x-6y=0` -> `13x=26`, `x=2`, `y=3`.
- T006: add `5x+y=17` and `2x-y=4` -> `7x=21`, `x=3`, `y=2`.
- T007: add `-2x+3y=1` and `2x+y=11` -> `4y=12`, `y=3`, `x=4`.
- T008: clear first equation to `x+2y=10`; subtract `x-y=1` -> `3y=9`, `y=3`, `x=4`.
- T009: scale first by `-2` and add -> `0=4`, no solution.
- T010: scale first by `-2` and add -> `0=0`, infinitely many solutions.
- T011: subtract purchases -> `2p=6`, `p=3`, `m=2`.
- T012: subtract bundles -> `2a=16`, `a=8`, `c=6`.
- T013: add `x+y=7` and `x-y=1` -> `2x=8`, `x=4`, `y=3`.
- T014: add equations -> `10x=20`, `x=2`, `y=5`.
- T015: add equations -> `7x=21`; legal move eliminates `y`.
- T016: correct operation is addition -> `6x=30`, `x=5`, `y=2`.
- T017: multiply first by 2 -> `6x-4y=4`; add to second -> `11x=44`, `x=4`, `y=5`.
- T018: left side doubles but constant does not; elimination gives `0=1`, no solution.
- T019: `(2,-1)` satisfies `3x+2y=4` and `5x-2y=12`; adding gives `8x=16`.
- T020: scale to `9x+6y=54` and `10x-6y=22` -> `19x=76`, `x=4`, `y=3`.

## Distractor Validation
- Distractors reflect coordinate reversal, wrong operation, sign errors, partial scaling, division errors, constants-as-coordinates, incomplete answers, and special-case confusion.
- Multiple-choice-style templates have exactly one correct answer.
- Modeling distractors preserve plausible units and realistic arithmetic slips.

## Hint Validation
- Each hint sequence moves from coefficient comparison to operation choice, elimination, one-variable solving, back-substitution, and final answer.
- Special-case hints stop after interpreting the true or false statement.

## Tutorial Validation
- Tutorial includes learning goal, why it matters, prerequisite check, core concept, direct addition, direct subtraction, one-equation scaling, both-equation scaling, strategy choice, sign care, fractions and decimals, special cases, modeling, graph connection, Equation Battle legality, common mistakes, guided practice, independent practice, mastery check, adaptive messages, and metadata.

## Socratic Validation
- Dialogue includes diagnostic, guided discovery, correct branch, partial branch, misconception branch, scaling branch, special-case branch, identity branch, unsure branch, unrelated branch, recovery prompts, reflection, transfer, escalation rules, and exit condition.
- Tutor emphasizes decision-making before computation.

## Metadata Validation
- Every template includes IDs, difficulty, timing, visual flag, compatibility flags, prerequisites, misconception tags, randomization constraints, and support-system mappings.

## Known Issues
- The repository specifications differ on the label for Hint 4. This phase uses "Guided Next Step" to match the master prompt language.
- `PHASE_TEMPLATE.md` omits Common Misconceptions from the Knowledge Graph section, but this phase includes it because the master prompt and knowledge graph guide require it.
