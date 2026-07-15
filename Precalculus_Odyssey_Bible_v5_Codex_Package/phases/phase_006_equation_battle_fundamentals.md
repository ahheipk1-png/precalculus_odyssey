# Phase 006 - Equation Battle Fundamentals

## Phase Metadata
- Course: Precalculus Odyssey Bible v5
- Topic: Equation Battle fundamentals
- Subtopic: Legal equation moves, action-card sequences, equivalent states, and battle validation
- Prerequisites: Phase 001 one-step linear equations, Phase 002 multi-step linear equations, Phase 003 variables on both sides, Phase 005 linear equation modeling
- Related phases: Phase 007 - Linear inequalities; Phase 011 - Systems by substitution; Phase 018 - Function transformations; Phase 059 - Final boss challenges
- Estimated phase size: 20 template families, 20 core examples, 120 progressive hints, 1 tutorial sequence, 1 Socratic dialogue system

## Learning Objectives
By the end of this phase, the player can:

1. Identify legal Equation Battle moves that preserve equality.
2. Choose action cards that isolate a variable efficiently.
3. Sequence inverse-operation cards for one-step, multi-step, and variables-on-both-sides equations.
4. Recognize equivalent equation states after a card is played.
5. Detect illegal one-sided or partial moves.
6. Use simplify, distribute, combine, collect, and classify cards appropriately.
7. Complete multi-stage boss battles with solve and check stages.

## Prerequisite Review
- Equations remain equivalent when the same valid operation is applied to both sides.
- Solving means changing the equation into an equivalent state where the variable is isolated.
- Simplifying one side, such as combining like terms, can be legal without changing the other side because it rewrites the same expression.
- A battle move is useful only if it both preserves equality and moves toward the goal.
- Some battles end by classification: one solution, no solution, or infinitely many solutions.

## Core Concepts
- Equation Battle turns are algebra moves represented as action cards.
- Legal action cards either apply the same operation to both sides or simplify an expression without changing its value.
- The best card is often the inverse of the operation farthest from the variable.
- A card sequence is a proof path: every state must be equivalent to the original equation.
- Repairing mistakes is part of mastery: invalid moves should be diagnosed, not merely marked wrong.

## Common Misconceptions
- Thinking any balanced move is a useful move.
- Applying a card to only one side.
- Dividing only one term of a sum.
- Choosing a coefficient card before removing an outside constant.
- Treating simplification as a both-side operation.
- Forgetting that distribution must reach every term.
- Continuing to solve after a battle state has become a contradiction or identity.
- Checking the final answer in the last battle state instead of the original equation.

# Part I - Question Bible

## Template T001 - Choose inverse card for addition
- Template ID: P006-T001
- Question Type: Equation Battle
- Cognitive Skill: Select legal inverse card
- Difficulty: 1
- Estimated Time: 25 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Choose the card that removes an added constant.
- Example Question: Battle state: `x + 7 = 15`. Which card should be played to isolate `x`? Cards: `+7 both sides`, `-7 both sides`, `/7 both sides`, `-7 left side only`.
- Answer: `-7 both sides`.
- Explanation: Subtracting 7 from both sides removes `+7` and preserves equality.
- Distractors: `+7 both sides`; `/7 both sides`; `-7 left side only`; `copy 15`.
- Distractor Rationale: Uses same operation; wrong operation family; illegal one-sided move; copies right side.
- Randomization Rules: Use equations `x + a = b` with positive `a`.
- Validity Constraints: Exactly one listed card must both preserve equality and isolate the variable.
- Metadata: phase_id=P006; prerequisites=[P001 addition equations]; misconception_tags=[uses same operation, one-sided move, wrong operation family]; randomization_constraints=[a positive, one correct card].
- Graph/Visual Variant: Card removes 7 unit tiles from both sides of a balance.
- Modeling Variant: Battle gate for a gain model.
- Reverse Variant: Given card `-7 both sides`, create a matching battle state.
- Equation Battle Variant: This is a core battle selection template.
- Multi-stage Boss Variant: Card selection unlocks a solve-and-check stage.
- Hint Mapping: H-P006-T001
- Tutorial Mapping: Tut-P006 sections Legal Cards
- Socratic Mapping: Soc-P006 inverse-card branch

## Template T002 - Choose inverse card for subtraction
- Template ID: P006-T002
- Question Type: Equation Battle
- Cognitive Skill: Select legal inverse card
- Difficulty: 1
- Estimated Time: 25 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Choose the card that removes a subtracted constant.
- Example Question: Battle state: `y - 9 = -4`. Which card should be played first?
- Answer: `+9 both sides`.
- Explanation: Adding 9 to both sides removes `-9`, giving `y = 5`.
- Distractors: `-9 both sides`; `/9 both sides`; `+9 right side only`; `swap sides`.
- Distractor Rationale: Uses same operation; wrong operation family; one-sided move; unnecessary transformation.
- Randomization Rules: Use equations `x - a = b`.
- Validity Constraints: Correct card must isolate the variable in one move.
- Metadata: phase_id=P006; prerequisites=[P001 subtraction equations]; misconception_tags=[uses same operation, one-sided move, wrong operation family]; randomization_constraints=[a positive].
- Graph/Visual Variant: Add 9 tiles to both pans.
- Modeling Variant: Battle gate for a loss model.
- Reverse Variant: Create a battle state where `+9 both sides` is correct.
- Equation Battle Variant: Core subtraction inverse card.
- Multi-stage Boss Variant: Follow card play with substitution check.
- Hint Mapping: H-P006-T002
- Tutorial Mapping: Tut-P006 sections Legal Cards
- Socratic Mapping: Soc-P006 inverse-card branch

## Template T003 - Choose inverse card for division
- Template ID: P006-T003
- Question Type: Equation Battle
- Cognitive Skill: Undo division legally
- Difficulty: 1
- Estimated Time: 25 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Choose multiplication to undo division.
- Example Question: Battle state: `b/4 = 9`. Which card isolates `b`?
- Answer: `*4 both sides`.
- Explanation: Multiplying both sides by 4 gives `b = 36`.
- Distractors: `/4 both sides`; `+4 both sides`; `*4 left side only`; `b = 9`.
- Distractor Rationale: Repeats division; wrong operation family; one-sided move; stops without undoing division.
- Randomization Rules: Use equations `x/a = b` with `a != 0`.
- Validity Constraints: Divisor cannot be zero.
- Metadata: phase_id=P006; prerequisites=[P001 division equations]; misconception_tags=[divides instead of multiplies, one-sided move, copies right side]; randomization_constraints=[a nonzero].
- Graph/Visual Variant: Four equal shares recombine into one whole.
- Modeling Variant: Shared treasure recombination battle.
- Reverse Variant: Given card `*4 both sides`, write a matching state.
- Equation Battle Variant: Core division inverse card.
- Multi-stage Boss Variant: Card, result, and check.
- Hint Mapping: H-P006-T003
- Tutorial Mapping: Tut-P006 sections Inverse Cards
- Socratic Mapping: Soc-P006 inverse-card branch

## Template T004 - Choose inverse card for multiplication
- Template ID: P006-T004
- Question Type: Equation Battle
- Cognitive Skill: Undo multiplication legally
- Difficulty: 1
- Estimated Time: 25 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Choose division to undo multiplication.
- Example Question: Battle state: `5a = -35`. Which card isolates `a`?
- Answer: `/5 both sides`.
- Explanation: Dividing both sides by 5 gives `a = -7`.
- Distractors: `*5 both sides`; `-5 both sides`; `/5 left side only`; `a = 5`.
- Distractor Rationale: Repeats multiplication; wrong operation; one-sided move; copies coefficient.
- Randomization Rules: Use equations `cx = d` with nonzero `c`.
- Validity Constraints: Coefficient cannot be zero.
- Metadata: phase_id=P006; prerequisites=[P001 multiplication equations]; misconception_tags=[multiplies instead of divides, one-sided move, coefficient as answer]; randomization_constraints=[c nonzero].
- Graph/Visual Variant: Split total into equal coefficient groups.
- Modeling Variant: Equal damage groups battle.
- Reverse Variant: Create a state solved by `/5 both sides`.
- Equation Battle Variant: Core multiplication inverse card.
- Multi-stage Boss Variant: Include sign check.
- Hint Mapping: H-P006-T004
- Tutorial Mapping: Tut-P006 sections Inverse Cards
- Socratic Mapping: Soc-P006 inverse-card branch

## Template T005 - Sequence cards for two-step equation
- Template ID: P006-T005
- Question Type: Order the steps
- Cognitive Skill: Sequence battle cards
- Difficulty: 2
- Estimated Time: 45 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Order inverse cards for `ax + b = c`.
- Example Question: Battle state: `2x + 5 = 17`. Put cards in order: A `/2 both sides`; B `-5 both sides`; C `check x=6`; D `+5 both sides`.
- Answer: B, A, C.
- Explanation: Remove `+5`, divide by 2, then check. Card D moves away from isolation.
- Distractors: A, B, C; D, A, C; B, C, A; B, A, D.
- Distractor Rationale: Divides too early; uses wrong inverse; checks before solving; applies extra wrong card.
- Randomization Rules: Use two-step equations with one distractor card.
- Validity Constraints: Correct order must isolate the variable and include check if listed.
- Metadata: phase_id=P006; prerequisites=[P002 multi-step equations]; misconception_tags=[wrong card order, wrong inverse operation, checks too early]; randomization_constraints=[one valid sequence].
- Graph/Visual Variant: Card timeline with locks opening in order.
- Modeling Variant: Boss door with two algebra locks.
- Reverse Variant: Given sequence `-5`, `/2`, create a matching equation.
- Equation Battle Variant: Core card sequencing.
- Multi-stage Boss Variant: Order, execute, check.
- Hint Mapping: H-P006-T005
- Tutorial Mapping: Tut-P006 sections Sequencing Cards
- Socratic Mapping: Soc-P006 sequence branch

## Template T006 - Simplify card: combine like terms
- Template ID: P006-T006
- Question Type: Equation Battle
- Cognitive Skill: Simplify equivalent expression
- Difficulty: 2
- Estimated Time: 40 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Use a simplify card before inverse-operation cards.
- Example Question: Battle state: `4x + 3x = 35`. Which card is best first?
- Answer: `combine like terms on left` to get `7x = 35`.
- Explanation: Combining like terms rewrites the left side without changing its value.
- Distractors: `/4 both sides`; `-3x both sides`; `+3 both sides`; `x = 35`.
- Distractor Rationale: Divides by one coefficient only; unnecessary variable move; treats `3x` as 3; stops without solving.
- Randomization Rules: Use same-side like terms that combine to nonzero coefficient.
- Validity Constraints: Terms must be genuinely like terms.
- Metadata: phase_id=P006; prerequisites=[combining like terms]; misconception_tags=[does not simplify first, coefficient confusion, stops early]; randomization_constraints=[like terms same side].
- Graph/Visual Variant: Merge variable tiles before dividing.
- Modeling Variant: Combine allied squads before calculating squad size.
- Reverse Variant: Given `7x = 35`, split into `4x + 3x = 35`.
- Equation Battle Variant: Simplify card followed by `/7`.
- Multi-stage Boss Variant: Simplify stage required before inverse stage.
- Hint Mapping: H-P006-T006
- Tutorial Mapping: Tut-P006 sections Simplify Cards
- Socratic Mapping: Soc-P006 simplify branch

## Template T007 - Distribute card
- Template ID: P006-T007
- Question Type: Equation Battle
- Cognitive Skill: Expand grouped expression legally
- Difficulty: 2
- Estimated Time: 45 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Use distribution as a legal simplify card.
- Example Question: Battle state: `2(x + 3) = 14`. Which simplify card gives an equivalent equation?
- Answer: `distribute 2` to get `2x + 6 = 14`.
- Explanation: The 2 multiplies both `x` and 3.
- Distractors: `2x + 3 = 14`; `x + 6 = 14`; `2x + 5 = 14`; `/2 left side only`.
- Distractor Rationale: Partial distribution; multiplies only the constant; arithmetic error; illegal one-sided operation.
- Randomization Rules: Use `a(x+b)=c` with small integer `a`.
- Validity Constraints: Distribution must apply to every term inside parentheses.
- Metadata: phase_id=P006; prerequisites=[distributive property]; misconception_tags=[partial distribution, one-sided move, arithmetic slip]; randomization_constraints=[valid grouped expression].
- Graph/Visual Variant: Group expansion animation.
- Modeling Variant: Open a packed battle crate into visible terms.
- Reverse Variant: Given `2x + 6 = 14`, factor to `2(x+3)=14`.
- Equation Battle Variant: Distribute, then solve.
- Multi-stage Boss Variant: Distribution is a required first lock.
- Hint Mapping: H-P006-T007
- Tutorial Mapping: Tut-P006 sections Simplify Cards
- Socratic Mapping: Soc-P006 distribution branch

## Template T008 - Collect variable card
- Template ID: P006-T008
- Question Type: Equation Battle
- Cognitive Skill: Move variable terms legally
- Difficulty: 3
- Estimated Time: 55 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Use a variable-collection card for variables on both sides.
- Example Question: Battle state: `3x + 5 = x + 13`. Which card should collect variables on the left?
- Answer: `-x both sides`, giving `2x + 5 = 13`.
- Explanation: Subtracting `x` from both sides removes the right-side variable term.
- Distractors: `erase x on right`; `-3x both sides`; `+x both sides`; `-5 both sides first`.
- Distractor Rationale: One-sided erasure; creates negative coefficient; moves away from collection; possible later move but not variable collection.
- Randomization Rules: Use variables-on-both-sides equations with smaller right coefficient.
- Validity Constraints: Correct card must preserve equality and reduce variable terms to one side.
- Metadata: phase_id=P006; prerequisites=[P003 variable collection]; misconception_tags=[erases terms, wrong variable move, nonstrategic first move]; randomization_constraints=[different coefficients].
- Graph/Visual Variant: Remove matching `x` tiles from both sides.
- Modeling Variant: Battle strips the enemy variable term from both sides.
- Reverse Variant: Given card `-x`, create a matching battle state.
- Equation Battle Variant: Variable collection card.
- Multi-stage Boss Variant: Collection, constant removal, coefficient removal.
- Hint Mapping: H-P006-T008
- Tutorial Mapping: Tut-P006 sections Collect Cards
- Socratic Mapping: Soc-P006 collect branch

## Template T009 - Illegal one-sided action detection
- Template ID: P006-T009
- Question Type: Error detection
- Cognitive Skill: Identify illegal battle move
- Difficulty: 3
- Estimated Time: 50 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Reject a card applied to only one side.
- Example Question: A player changes `x + 7 = 15` into `x = 15` using `-7 left side only`. Is the move legal?
- Answer: No. The legal move is `-7 both sides`, giving `x = 8`.
- Explanation: Removing 7 from only the left side breaks equality.
- Distractors: Legal because `x` is isolated; legal because 7 was on the left; answer is `x = 15`; no solution.
- Distractor Rationale: Confuses isolation with equivalence; accepts one-sided logic; accepts invalid result; misclassifies.
- Randomization Rules: Present one-sided versions of otherwise correct inverse moves.
- Validity Constraints: Illegal move must produce a clear false result when checked.
- Metadata: phase_id=P006; prerequisites=[equality preservation]; misconception_tags=[one-sided move, accepts invalid isolation, does not check]; randomization_constraints=[invalid one-sided move].
- Graph/Visual Variant: Balance tips when one side changes.
- Modeling Variant: Failed battle replay.
- Reverse Variant: Write an illegal one-sided action for an equivalent equation.
- Equation Battle Variant: Error-detection battle.
- Multi-stage Boss Variant: Reject, repair, solve, check.
- Hint Mapping: H-P006-T009
- Tutorial Mapping: Tut-P006 sections Illegal Moves
- Socratic Mapping: Soc-P006 error branch

## Template T010 - Equivalent state after card
- Template ID: P006-T010
- Question Type: Multiple choice
- Cognitive Skill: Predict next equation state
- Difficulty: 3
- Estimated Time: 50 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Choose the correct equation after a card is applied.
- Example Question: Apply `-5 both sides` to `2x + 5 = 17`. Which state is correct?
- Answer: `2x = 12`.
- Explanation: `2x + 5 - 5 = 17 - 5`, so `2x = 12`.
- Distractors: `2x = 17`; `x = 12`; `2x + 5 = 12`; `2x = 22`
- Distractor Rationale: Changes only one side; divides too early; fails to simplify left; adds instead of subtracts.
- Randomization Rules: Show one card and ask for the immediate next state, not the final solution.
- Validity Constraints: Exactly one choice must match the card.
- Metadata: phase_id=P006; prerequisites=[equivalent equations, P002]; misconception_tags=[jumps steps, one-sided move, wrong inverse operation]; randomization_constraints=[one immediate state].
- Graph/Visual Variant: Before/after equation state panels.
- Modeling Variant: Battle log state prediction.
- Reverse Variant: Given two states, identify the card played.
- Equation Battle Variant: State transition template.
- Multi-stage Boss Variant: Correct state unlocks next card choice.
- Hint Mapping: H-P006-T010
- Tutorial Mapping: Tut-P006 sections Battle States
- Socratic Mapping: Soc-P006 state branch

## Template T011 - Negative coefficient battle
- Template ID: P006-T011
- Question Type: Equation Battle
- Cognitive Skill: Preserve signed coefficient
- Difficulty: 3
- Estimated Time: 55 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Choose cards that preserve negative signs.
- Example Question: Battle state: `-4r + 6 = 22`. Which sequence solves it?
- Answer: `-6 both sides`, then `/-4 both sides`; `r = -4`.
- Explanation: Remove `+6`, then divide by the full coefficient `-4`.
- Distractors: `-6, /4`; `+6, /-4`; `/-4, -6`; `-6 only`.
- Distractor Rationale: Drops negative sign; wrong inverse for 6; wrong order; stops early.
- Randomization Rules: Use `-ax + b = c` with integer solution.
- Validity Constraints: Negative coefficient nonzero.
- Metadata: phase_id=P006; prerequisites=[signed division, P002 negative coefficients]; misconception_tags=[sign error, wrong card order, stops early]; randomization_constraints=[negative nonzero coefficient].
- Graph/Visual Variant: Signed coefficient card highlighted.
- Modeling Variant: Cursed multiplier battle.
- Reverse Variant: Create a negative-coefficient state solved by `-6`, `/-4`.
- Equation Battle Variant: Signed card sequence.
- Multi-stage Boss Variant: Include sign prediction before division.
- Hint Mapping: H-P006-T011
- Tutorial Mapping: Tut-P006 sections Sign-Safe Cards
- Socratic Mapping: Soc-P006 sign branch

## Template T012 - Fraction reciprocal card
- Template ID: P006-T012
- Question Type: Equation Battle
- Cognitive Skill: Use reciprocal card
- Difficulty: 3
- Estimated Time: 55 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Choose reciprocal multiplication to undo a fraction coefficient.
- Example Question: Battle state: `(2/3)p = 12`. Which card isolates `p`?
- Answer: `*3/2 both sides`.
- Explanation: Multiplying by the reciprocal of `2/3` gives `p = 18`.
- Distractors: `*2/3 both sides`; `/3/2 both sides`; `+3/2 both sides`; `p = 12`.
- Distractor Rationale: Uses coefficient instead of reciprocal; notation confusion; wrong operation family; stops early.
- Randomization Rules: Use nonzero fraction coefficients with clean solutions.
- Validity Constraints: Numerator and denominator nonzero.
- Metadata: phase_id=P006; prerequisites=[fraction coefficients, reciprocals]; misconception_tags=[uses fraction instead of reciprocal, notation confusion, stops early]; randomization_constraints=[nonzero fraction coefficient].
- Graph/Visual Variant: Reciprocal card flips the fraction.
- Modeling Variant: Mana fraction battle.
- Reverse Variant: Given reciprocal card `*3/2`, write a matching state.
- Equation Battle Variant: Reciprocal action card.
- Multi-stage Boss Variant: Require identifying reciprocal before playing card.
- Hint Mapping: H-P006-T012
- Tutorial Mapping: Tut-P006 sections Fraction Cards
- Socratic Mapping: Soc-P006 fraction branch

## Template T013 - Multi-step grouped boss sequence
- Template ID: P006-T013
- Question Type: Boss challenge
- Cognitive Skill: Sequence grouped inverse cards
- Difficulty: 4
- Estimated Time: 85 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve a grouped multi-step equation with card sequence.
- Example Question: Boss state: `-3(x - 2) + 4 = 19`. Choose a legal sequence and solve.
- Answer: `-4 both sides`, `/-3 both sides`, `+2 both sides`; `x = -3`.
- Explanation: Remove outside `+4`, undo multiplication by `-3`, then undo `-2` inside the group.
- Distractors: `+4, /-3, +2`; `-4, /3, +2`; `distribute only to x`; `-4, +2, /-3`
- Distractor Rationale: Wrong inverse for 4; drops negative; partial distribution; wrong order inside grouped expression.
- Randomization Rules: Use `a(x+b)+c=d` with signed `a` and integer solution.
- Validity Constraints: Outside multiplier nonzero; sequence must preserve equivalence.
- Metadata: phase_id=P006; prerequisites=[P002 grouped equations, signed coefficients]; misconception_tags=[wrong inverse order, sign error, partial distribution]; randomization_constraints=[a nonzero, clean solution].
- Graph/Visual Variant: Boss locks: outside constant, outside multiplier, inside constant.
- Modeling Variant: Reverse a transformed hidden stat.
- Reverse Variant: Create a grouped boss state for sequence `-4`, `/-3`, `+2`.
- Equation Battle Variant: Multi-card grouped sequence.
- Multi-stage Boss Variant: This is a boss sequence template.
- Hint Mapping: H-P006-T013
- Tutorial Mapping: Tut-P006 sections Boss Sequences
- Socratic Mapping: Soc-P006 boss branch

## Template T014 - Efficient card path
- Template ID: P006-T014
- Question Type: Compare
- Cognitive Skill: Choose shorter valid path
- Difficulty: 4
- Estimated Time: 65 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Compare valid solution paths for efficiency.
- Example Question: For `2(x + 3) = 14`, which path uses fewer cards? Path A: distribute, `-6`, `/2`. Path B: `/2`, `-3`.
- Answer: Path B uses fewer cards and is valid.
- Explanation: Dividing both sides by 2 gives `x + 3 = 7`, then subtracting 3 gives `x = 4`.
- Distractors: Path A only; neither path; Path B invalid because it divides before distributing; both use the same number.
- Distractor Rationale: Assumes distribution is required; rejects a valid group move; miscounts cards.
- Randomization Rules: Compare distribute-first and undo-outside-first paths for grouped equations.
- Validity Constraints: Both paths must be valid unless the prompt asks for invalid-path detection.
- Metadata: phase_id=P006; prerequisites=[grouped equations, path comparison]; misconception_tags=[distribution overuse, rejects valid inverse path, card count error]; randomization_constraints=[two valid paths].
- Graph/Visual Variant: Two route map paths to same solution.
- Modeling Variant: Choose efficient battle route.
- Reverse Variant: Given a shorter path, create a grouped equation where it applies.
- Equation Battle Variant: Efficiency comparison.
- Multi-stage Boss Variant: Rewards shortest valid path but accepts longer valid proof.
- Hint Mapping: H-P006-T014
- Tutorial Mapping: Tut-P006 sections Efficient Paths
- Socratic Mapping: Soc-P006 efficiency branch

## Template T015 - Undo last move
- Template ID: P006-T015
- Question Type: Reverse problem
- Cognitive Skill: Identify inverse of a played card
- Difficulty: 3
- Estimated Time: 50 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Reverse a battle card to inspect equivalence.
- Example Question: A battle state changed from `2x = 12` to `x = 6`. Which card was played, and what card would undo it?
- Answer: Played `/2 both sides`; undo card is `*2 both sides`.
- Explanation: Dividing by 2 isolates `x`; multiplying by 2 returns to the previous equivalent state.
- Distractors: Played `-2`; undo `+2`; played `*2`; undo `/2`; played `/6`; undo `*6`.
- Distractor Rationale: Confuses operation families; reverses direction; uses result instead of coefficient.
- Randomization Rules: Use adjacent valid battle states and ask for played card and inverse card.
- Validity Constraints: States must differ by one clear legal card.
- Metadata: phase_id=P006; prerequisites=[inverse operations, equivalent states]; misconception_tags=[operation family confusion, coefficient/result confusion]; randomization_constraints=[single-card transition].
- Graph/Visual Variant: Battle log with rewind button.
- Modeling Variant: Undo spell mechanic.
- Reverse Variant: Given a card, produce before/after states.
- Equation Battle Variant: Battle replay analysis.
- Multi-stage Boss Variant: Repair path by undoing an accidental card.
- Hint Mapping: H-P006-T015
- Tutorial Mapping: Tut-P006 sections Battle States
- Socratic Mapping: Soc-P006 reverse-card branch

## Template T016 - Isolation status check
- Template ID: P006-T016
- Question Type: True/False
- Cognitive Skill: Determine whether battle is complete
- Difficulty: 2
- Estimated Time: 35 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Recognize when the variable is isolated.
- Example Question: Battle state: `3x = 21`. Is the battle complete?
- Answer: No. The variable is not alone; play `/3 both sides` to get `x = 7`.
- Explanation: A coefficient still multiplies `x`.
- Distractors: Yes because there is only one variable term; yes because 21 is visible; no solution; play `-3`.
- Distractor Rationale: Confuses one variable term with isolation; copies right side; misclassifies; wrong inverse.
- Randomization Rules: Show states such as `x=7`, `3x=21`, `x+2=9`, or `0=0`.
- Validity Constraints: Completion classification must be unambiguous.
- Metadata: phase_id=P006; prerequisites=[isolated variable concept]; misconception_tags=[stops early, copies right side, wrong inverse operation]; randomization_constraints=[clear completion status].
- Graph/Visual Variant: Variable-alone indicator lights up only at `x = value`.
- Modeling Variant: Gate opens only when target is isolated or classification is complete.
- Reverse Variant: Create a not-yet-complete state with one remaining card.
- Equation Battle Variant: Completion check.
- Multi-stage Boss Variant: Prevents premature answer submission.
- Hint Mapping: H-P006-T016
- Tutorial Mapping: Tut-P006 sections Completion Rules
- Socratic Mapping: Soc-P006 completion branch

## Template T017 - No-solution battle classification
- Template ID: P006-T017
- Question Type: Number of solutions
- Cognitive Skill: Stop after contradiction
- Difficulty: 4
- Estimated Time: 60 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Classify a battle state as no solution after variables cancel.
- Example Question: Battle state: `3x + 4 = 3x - 8`. Play the correct collection card and classify the result.
- Answer: Play `-3x both sides`; result `4 = -8`; no solution.
- Explanation: The remaining number statement is false.
- Distractors: `x = -12`; infinitely many solutions; `x = 0`; keep dividing by 3.
- Distractor Rationale: Invents solution from constants; confuses contradiction with identity; assumes zero after cancellation; continues solving after target disappears.
- Randomization Rules: Use equal variable coefficients and unequal constants.
- Validity Constraints: Constants must differ after cancellation.
- Metadata: phase_id=P006; prerequisites=[P003 contradiction cases]; misconception_tags=[contradiction confusion, invents solution, keeps solving]; randomization_constraints=[same coefficient, unequal constants].
- Graph/Visual Variant: Parallel line battle visual.
- Modeling Variant: Two paths with same rate but different starting points never meet.
- Reverse Variant: Create a no-solution battle state.
- Equation Battle Variant: Classification battle.
- Multi-stage Boss Variant: Stop condition classification.
- Hint Mapping: H-P006-T017
- Tutorial Mapping: Tut-P006 sections Classification Cards
- Socratic Mapping: Soc-P006 classification branch

## Template T018 - Identity battle classification
- Template ID: P006-T018
- Question Type: Number of solutions
- Cognitive Skill: Stop after identity
- Difficulty: 4
- Estimated Time: 60 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Classify a battle state as infinitely many solutions.
- Example Question: Battle state: `2x + 5 = x + x + 5`. Simplify and classify.
- Answer: Simplify right side to `2x + 5`; the equation is an identity, so infinitely many solutions.
- Explanation: Both sides are the same expression, so every value of `x` works.
- Distractors: no solution; `x = 0`; `x = 5`; `x = 2`.
- Distractor Rationale: Confuses identity with contradiction; assumes cancellation gives zero solution; uses visible constants or coefficients.
- Randomization Rules: Use equivalent expressions written differently.
- Validity Constraints: Both sides must simplify to identical expressions.
- Metadata: phase_id=P006; prerequisites=[P003 identity cases, simplify cards]; misconception_tags=[identity confusion, visible-number answer, assumes one solution]; randomization_constraints=[equivalent expressions].
- Graph/Visual Variant: Coincident line battle visual.
- Modeling Variant: Two formulas secretly produce the same score for all levels.
- Reverse Variant: Create an identity battle state from equivalent expressions.
- Equation Battle Variant: Classification battle.
- Multi-stage Boss Variant: Stop condition classification.
- Hint Mapping: H-P006-T018
- Tutorial Mapping: Tut-P006 sections Classification Cards
- Socratic Mapping: Soc-P006 classification branch

## Template T019 - Model-to-battle conversion
- Template ID: P006-T019
- Question Type: Multi-stage challenge
- Cognitive Skill: Build equation then choose first card
- Difficulty: 4
- Estimated Time: 80 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Convert a story model into an Equation Battle state.
- Example Question: A player has 14 tokens and earns 3 tokens per quest. The goal is 50 tokens. Write the battle state and choose the first card.
- Answer: Battle state `14 + 3q = 50`; first card `-14 both sides`.
- Explanation: The fixed start is 14 and the repeated gain is `3q`. Remove the fixed amount before dividing by 3.
- Distractors: `3 + 14q = 50`; first card `/3`; first card `+14`; state `3q = 50`.
- Distractor Rationale: Swaps fixed and rate; divides too early; wrong inverse; ignores starting tokens.
- Randomization Rules: Use fixed-rate models from Phase 005 and ask for battle state plus first card.
- Validity Constraints: Model must be linear with one clear first inverse card.
- Metadata: phase_id=P006; prerequisites=[P005 modeling, P002 solving]; misconception_tags=[swaps fixed and rate, wrong first card, ignores fixed value]; randomization_constraints=[fixed-rate model, one clear first card].
- Graph/Visual Variant: Story card transforms into equation battle lane.
- Modeling Variant: Direct bridge from modeling to battle.
- Reverse Variant: Given battle state, write the story.
- Equation Battle Variant: Model-to-battle conversion.
- Multi-stage Boss Variant: Build, choose first card, solve, interpret.
- Hint Mapping: H-P006-T019
- Tutorial Mapping: Tut-P006 sections Model-to-Battle
- Socratic Mapping: Soc-P006 model branch

## Template T020 - Final Equation Battle boss
- Template ID: P006-T020
- Question Type: Boss challenge
- Cognitive Skill: Integrated legal move sequence
- Difficulty: 5
- Estimated Time: 120 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Complete a full battle with simplify, collect, solve, classify/check.
- Example Question: Final Gate: Solve `4(x - 2) - 3 = 2x + 11` by listing legal battle cards and checking the result.
- Answer: Distribute left: `4x - 11 = 2x + 11`; play `-2x both sides`: `2x - 11 = 11`; play `+11 both sides`: `2x = 22`; play `/2 both sides`: `x = 11`; check: `4(11 - 2) - 3 = 33` and `2(11) + 11 = 33`.
- Explanation: Every card creates an equivalent state, and the final solution checks in the original equation.
- Distractors: `x = -11`; `x = 22`; no solution; sequence `distribute, +11, /2`.
- Distractor Rationale: Sign error; stops early; misclassifies; wrong card order.
- Randomization Rules: Use equations needing simplify/distribute plus variable collection and multi-step solving.
- Validity Constraints: Unique solution; clean integer answer; every stage must be equivalent.
- Metadata: phase_id=P006; prerequisites=[P002, P003, distribution, checking]; misconception_tags=[partial distribution, wrong card order, stops early, sign error]; randomization_constraints=[unique solution, integer answer].
- Graph/Visual Variant: Multi-lock boss lane with battle log.
- Modeling Variant: Optional story wrapper can describe two equal power formulas.
- Reverse Variant: Given card sequence, create a matching final gate.
- Equation Battle Variant: Final integrated battle.
- Multi-stage Boss Variant: This is the phase boss template.
- Hint Mapping: H-P006-T020
- Tutorial Mapping: Tut-P006 sections Full Phase Review
- Socratic Mapping: Soc-P006 boss branch

# Part II - Hint Bible

## H-P006-T001
- Hint 1 - Gentle Nudge: Look at the operation attached to `x`.
- Hint 2 - Concept Reminder: Addition is undone by subtraction.
- Hint 3 - Focus Hint: The card must affect both sides.
- Hint 4 - Guided Next Step: Choose `-7 both sides`.
- Hint 5 - Nearly Complete: Applying it gives `x = 15 - 7`.
- Hint 6 - Full Solution: `-7 both sides`; `x = 8`.

## H-P006-T002
- Hint 1 - Gentle Nudge: The equation has `y - 9`.
- Hint 2 - Concept Reminder: Subtraction is undone by addition.
- Hint 3 - Focus Hint: Use a both-side card.
- Hint 4 - Guided Next Step: Choose `+9 both sides`.
- Hint 5 - Nearly Complete: `y = -4 + 9`.
- Hint 6 - Full Solution: `+9 both sides`; `y = 5`.

## H-P006-T003
- Hint 1 - Gentle Nudge: `b` is divided by 4.
- Hint 2 - Concept Reminder: Division is undone by multiplication.
- Hint 3 - Focus Hint: Multiply both sides by 4.
- Hint 4 - Guided Next Step: Choose `*4 both sides`.
- Hint 5 - Nearly Complete: `b = 9 * 4`.
- Hint 6 - Full Solution: `*4 both sides`; `b = 36`.

## H-P006-T004
- Hint 1 - Gentle Nudge: `a` is multiplied by 5.
- Hint 2 - Concept Reminder: Multiplication is undone by division.
- Hint 3 - Focus Hint: Divide both sides by 5.
- Hint 4 - Guided Next Step: Choose `/5 both sides`.
- Hint 5 - Nearly Complete: `a = -35 / 5`.
- Hint 6 - Full Solution: `/5 both sides`; `a = -7`.

## H-P006-T005
- Hint 1 - Gentle Nudge: Remove the outside constant before the coefficient.
- Hint 2 - Concept Reminder: For `2x + 5`, undo `+5` before undoing `*2`.
- Hint 3 - Focus Hint: First card is `-5`.
- Hint 4 - Guided Next Step: Then play `/2`.
- Hint 5 - Nearly Complete: After those cards, `x = 6`; then check.
- Hint 6 - Full Solution: B, A, C.

## H-P006-T006
- Hint 1 - Gentle Nudge: There are like terms on the left.
- Hint 2 - Concept Reminder: Simplifying rewrites one side without changing its value.
- Hint 3 - Focus Hint: Combine `4x + 3x`.
- Hint 4 - Guided Next Step: Play `combine like terms` to get `7x = 35`.
- Hint 5 - Nearly Complete: Then divide by 7.
- Hint 6 - Full Solution: Combine first, then `/7`; `x = 5`.

## H-P006-T007
- Hint 1 - Gentle Nudge: The 2 applies to everything inside parentheses.
- Hint 2 - Concept Reminder: Distribution must reach every term.
- Hint 3 - Focus Hint: `2(x+3)` becomes `2x + 6`.
- Hint 4 - Guided Next Step: Choose `distribute 2`.
- Hint 5 - Nearly Complete: Then solve `2x + 6 = 14`.
- Hint 6 - Full Solution: `2x + 6 = 14`, then `x = 4`.

## H-P006-T008
- Hint 1 - Gentle Nudge: There is a variable term on the right side.
- Hint 2 - Concept Reminder: Remove it with a both-side inverse operation.
- Hint 3 - Focus Hint: Subtract `x` from both sides.
- Hint 4 - Guided Next Step: `3x + 5 - x = x + 13 - x`.
- Hint 5 - Nearly Complete: The next state is `2x + 5 = 13`.
- Hint 6 - Full Solution: Play `-x both sides`; continue to `x = 4`.

## H-P006-T009
- Hint 1 - Gentle Nudge: Ask whether both sides changed.
- Hint 2 - Concept Reminder: Isolating the variable is not enough if equality was broken.
- Hint 3 - Focus Hint: `-7 left side only` is not balanced.
- Hint 4 - Guided Next Step: The repair is `-7 both sides`.
- Hint 5 - Nearly Complete: That gives `x = 8`.
- Hint 6 - Full Solution: Illegal move; legal result is `x = 8`.

## H-P006-T010
- Hint 1 - Gentle Nudge: Apply only the stated card.
- Hint 2 - Concept Reminder: Subtract 5 from both sides.
- Hint 3 - Focus Hint: The right side becomes 12.
- Hint 4 - Guided Next Step: The left side becomes `2x`.
- Hint 5 - Nearly Complete: The next state is `2x = 12`.
- Hint 6 - Full Solution: Correct state: `2x = 12`.

## H-P006-T011
- Hint 1 - Gentle Nudge: Keep the negative sign with `-4`.
- Hint 2 - Concept Reminder: Remove `+6` before dividing.
- Hint 3 - Focus Hint: First play `-6`.
- Hint 4 - Guided Next Step: Then divide by `-4`.
- Hint 5 - Nearly Complete: `r = 16 / -4`.
- Hint 6 - Full Solution: Cards `-6`, `/-4`; `r = -4`.

## H-P006-T012
- Hint 1 - Gentle Nudge: A fraction coefficient is undone by its reciprocal.
- Hint 2 - Concept Reminder: The reciprocal of `2/3` is `3/2`.
- Hint 3 - Focus Hint: Multiply both sides by `3/2`.
- Hint 4 - Guided Next Step: Choose `*3/2 both sides`.
- Hint 5 - Nearly Complete: `p = 12 * 3/2`.
- Hint 6 - Full Solution: `p = 18`.

## H-P006-T013
- Hint 1 - Gentle Nudge: Work from the outside inward.
- Hint 2 - Concept Reminder: Undo outside `+4`, then outside `-3`, then inside `-2`.
- Hint 3 - Focus Hint: First play `-4`.
- Hint 4 - Guided Next Step: Then play `/-3`.
- Hint 5 - Nearly Complete: Then play `+2`.
- Hint 6 - Full Solution: Sequence `-4`, `/-3`, `+2`; `x = -3`.

## H-P006-T014
- Hint 1 - Gentle Nudge: Count legal cards, not algebra lines.
- Hint 2 - Concept Reminder: You can undo multiplication of a whole group.
- Hint 3 - Focus Hint: Dividing by 2 gives `x + 3 = 7`.
- Hint 4 - Guided Next Step: Then subtract 3.
- Hint 5 - Nearly Complete: Path B uses two cards.
- Hint 6 - Full Solution: Path B is valid and shorter; `x = 4`.

## H-P006-T015
- Hint 1 - Gentle Nudge: Compare the before and after states.
- Hint 2 - Concept Reminder: `2x` became `x`, so division by 2 happened.
- Hint 3 - Focus Hint: The played card was `/2 both sides`.
- Hint 4 - Guided Next Step: The undo card must reverse division by 2.
- Hint 5 - Nearly Complete: Multiplication by 2 reverses division by 2.
- Hint 6 - Full Solution: Played `/2`; undo is `*2`.

## H-P006-T016
- Hint 1 - Gentle Nudge: Ask whether the variable is alone.
- Hint 2 - Concept Reminder: `3x` still has a coefficient.
- Hint 3 - Focus Hint: The battle is not complete yet.
- Hint 4 - Guided Next Step: Play `/3 both sides`.
- Hint 5 - Nearly Complete: `x = 21/3`.
- Hint 6 - Full Solution: Not complete; play `/3`; `x = 7`.

## H-P006-T017
- Hint 1 - Gentle Nudge: The variable terms match exactly.
- Hint 2 - Concept Reminder: If variables cancel, inspect the number statement.
- Hint 3 - Focus Hint: Subtract `3x` from both sides.
- Hint 4 - Guided Next Step: The result is `4 = -8`.
- Hint 5 - Nearly Complete: `4 = -8` is false.
- Hint 6 - Full Solution: No solution.

## H-P006-T018
- Hint 1 - Gentle Nudge: Simplify the right side.
- Hint 2 - Concept Reminder: `x + x = 2x`.
- Hint 3 - Focus Hint: Both sides become `2x + 5`.
- Hint 4 - Guided Next Step: This makes an always-true equation.
- Hint 5 - Nearly Complete: An always-true equation has every value as a solution.
- Hint 6 - Full Solution: Infinitely many solutions.

## H-P006-T019
- Hint 1 - Gentle Nudge: Turn the story into a battle state first.
- Hint 2 - Concept Reminder: Start plus rate times quests equals goal.
- Hint 3 - Focus Hint: Use `14 + 3q = 50`.
- Hint 4 - Guided Next Step: The fixed 14 should be removed first.
- Hint 5 - Nearly Complete: First card is `-14 both sides`.
- Hint 6 - Full Solution: Battle state `14 + 3q = 50`; first card `-14`.

## H-P006-T020
- Hint 1 - Gentle Nudge: First simplify the left side.
- Hint 2 - Concept Reminder: Distribution must reach every term inside parentheses.
- Hint 3 - Focus Hint: `4(x-2)-3` becomes `4x - 11`.
- Hint 4 - Guided Next Step: Solve `4x - 11 = 2x + 11`.
- Hint 5 - Nearly Complete: Play `-2x`, `+11`, `/2`.
- Hint 6 - Full Solution: `x = 11`; check gives 33 on both sides.

# Part III - Tutorial Bible

## Learning Goal
Learn to play Equation Battle legally and strategically by choosing action cards that preserve equality, simplify expressions, isolate variables, and classify special battle states.

## Why It Matters
Equation Battle turns algebra into visible decisions. The goal is not to memorize card orders; it is to understand why each move is legal and why it helps. This makes later equation types, inequalities, systems, and boss challenges feel like extensions of the same balance system.

## Prerequisite Check
Ask the player:

1. What operation undoes `+7`?
2. What operation undoes multiplication by `-4`?
3. Is changing only one side of an equation legal?
4. What does `4x + 3x` simplify to?
5. What does `0 = 0` mean as a final battle state?

If the player misses inverse operations, route to Phase 001 or 002. If they miss special states, review Phase 003 identity and contradiction cases.

## Core Concept
An Equation Battle card is legal if it creates an equivalent equation.

Legal card types:

- Same operation on both sides: `-7 both sides`, `/5 both sides`, `+2x both sides`.
- Simplify one expression without changing its value: combine like terms, distribute, factor, or reduce a fraction.
- Classify a final state: no solution for a false statement, infinitely many solutions for an identity.

Illegal card types:

- Apply a move to only one side.
- Divide one term of a sum while leaving the rest unchanged.
- Erase a term without an inverse operation.
- Distribute to only part of a group.

## Worked Example
Battle state: `2x + 5 = 17`

Goal: isolate `x`.

Card 1: `-5 both sides`
New state: `2x = 12`

Card 2: `/2 both sides`
New state: `x = 6`

Check card:
`2(6) + 5 = 17`, so the battle is won.

## Simplify Cards
Some cards rewrite an expression instead of acting on both sides.

Examples:

- `4x + 3x = 35` becomes `7x = 35`.
- `2(x + 3) = 14` becomes `2x + 6 = 14`.

These are legal because the expression keeps the same value.

## Efficient Paths
Some battles have more than one valid path.

For `2(x + 3) = 14`:

- Distribute path: distribute, subtract 6, divide by 2.
- Group path: divide by 2, subtract 3.

Both are legal, but the group path is shorter.

## Classification Cards
When variables disappear, stop and classify.

- `4 = -8` means no solution.
- `0 = 0` means infinitely many solutions.

Do not invent an `x` value after the target variable has vanished.

## Common Mistakes
- Mistake: Choosing the same operation instead of the inverse.
  Correction: Ask what operation would undo the current one.
- Mistake: Playing a one-sided card.
  Correction: Use both-side cards unless you are simplifying an expression.
- Mistake: Dividing before removing an outside constant.
  Correction: Remove the farthest operation first.
- Mistake: Dropping a negative sign on a card.
  Correction: Keep the sign attached to the coefficient.
- Mistake: Continuing after a contradiction or identity.
  Correction: Classify the battle state.

## Guided Practice
1. Battle state `x - 8 = 3`.
   - Card: `+8 both sides`.
   - Result: `x = 11`.

2. Battle state `3x + 4 = 19`.
   - Cards: `-4 both sides`, `/3 both sides`.
   - Result: `x = 5`.

3. Battle state `5x + 2 = 2x + 14`.
   - Cards: `-2x both sides`, `-2 both sides`, `/3 both sides`.
   - Result: `x = 4`.

## Independent Practice
1. Choose cards for `x + 9 = 20`. Answer: `-9`; `x = 11`.
2. Choose cards for `4x - 7 = 9`. Answer: `+7`, `/4`; `x = 4`.
3. Choose cards for `2(x - 5) = 18`. Answer: `/2`, `+5`; `x = 14`.
4. Classify `3x + 1 = 3x - 6`. Answer: no solution.
5. Classify `2x + 8 = 2(x + 4)`. Answer: infinitely many solutions.

## Mastery Check
The player is ready to advance when they can:

1. Identify legal and illegal cards.
2. Sequence cards for one-step and multi-step equations.
3. Use simplify cards correctly.
4. Collect variable terms legally.
5. Classify identity and contradiction states.
6. Check a final numeric solution in the original equation.

Mastery check set:

1. `x + 6 = 18`: card `-6`; solution `x = 12`.
2. `-3x + 5 = 20`: cards `-5`, `/-3`; solution `x = -5`.
3. `4x + x = 30`: combine, `/5`; solution `x = 6`.
4. `2x + 7 = x + 15`: `-x`, `-7`; solution `x = 8`.
5. `5x - 2 = 5x + 3`: no solution.

## Adaptive Tutor Messages
- If the player makes one-sided moves: "The card changed only one side. Try the matching both-side card."
- If the player picks wrong inverse cards: "Name the operation attached to the variable, then pick the card that undoes it."
- If the player stops early: "Is the variable alone yet?"
- If the player distributes partially: "The multiplier must hit every term in the group."
- If the player misclassifies special states: "When the variable disappears, the truth of the number statement decides the battle."
- If the player succeeds quickly: "Try efficiency challenges where more than one legal path exists."

## Tutorial Metadata
- Tutorial ID: Tut-P006
- Estimated duration: 5 minutes
- Target player state: knows equation solving and is learning game-action representations
- Unlock condition: available from any Phase 006 battle prompt
- Remediation trigger: two illegal one-sided cards, two wrong inverse cards, two premature completions, or one identity/contradiction reversal
- Advancement trigger: 80 percent success on mixed card-selection battles plus one correct check in the original equation

# Part IV - Socratic Dialogue Bible

## Opening Diagnostic
Tutor: "In the battle state `2x + 5 = 17`, why is `-5 both sides` a better first card than `/2 both sides`?"

Expected strong answer: "The `+5` is outside the variable term, so removing it first gives `2x = 12`; dividing first would be harder or easy to apply incorrectly."

## Guided Discovery
Tutor sequence:

1. "What is the battle goal?"
2. "What operation is blocking the variable right now?"
3. "Which card undoes that operation?"
4. "Does the card affect both sides or simplify an expression?"
5. "What is the next equivalent state?"
6. "Is the variable isolated now?"
7. "If not, what card comes next?"
8. "Does the final result check in the original equation?"
9. "If variables vanished, is the remaining statement true or false?"

## Correct Branch
Player: "`-5 both sides` first."

Tutor: "Good. What state appears after that card?"

If player says `2x = 12`, ask: "What card isolates `x` now?"

Exit when the player plays `/2`, gets `x = 6`, and checks.

## Partial Understanding Branch
Player: "Subtract 5" but does not say both sides.

Tutor: "That is the right operation. What must the card say so the move is legal in battle?"

If player answers both sides, continue.

## Misconception Branch
Player: "Divide by 2 first."

Tutor: "If you divide now, what happens to the entire left side `2x + 5`? Would the `+5` also need to be divided?"

Follow-up: "Which card avoids that complication?"

## Unsure Branch
Player: "I don't know."

Tutor: "Look at `2x + 5`. Which part is farther from `x`: the `*2` or the `+5`?"

If player identifies `+5`, ask what undoes it.

## Unrelated Response Branch
Player gives an unrelated answer.

Tutor: "Let's return to the battle lane. Choose one card that affects both sides: `-5`, `/2`, `+5`, or `*2`."

If unrelated again, provide a two-choice prompt between `-5` and `/2`.

## Recovery Prompts
- "Is this card legal?"
- "Does it affect both sides?"
- "Does it simplify without changing value?"
- "What state comes immediately after the card?"
- "Is the variable alone?"
- "Did the final result check in the original equation?"
- "Did the battle become an identity or contradiction?"

## Reflection Question
"Why can a legal battle card still be a poor strategic choice?"

Strong reflection: "It may preserve equality but not help isolate the variable, or it may make the next state more complicated."

## Transfer Question
"How will Equation Battle rules change when equations become inequalities?"

Expected transfer: "Most balance moves still work, but multiplying or dividing by a negative will affect the inequality direction."

## Escalation Rules
- If the player makes illegal one-sided moves twice, show Illegal Moves.
- If the player chooses wrong inverse cards twice, show Inverse Cards.
- If the player struggles with card order, show Sequencing Cards.
- If the player misuses distribution, show Simplify Cards.
- If the player fails special-state classification, show Classification Cards.
- If the player completes three battles cleanly, move to efficiency or boss sequences.

## Exit Condition
The Socratic sequence is complete when the player:

1. Chooses legal cards.
2. Explains why each card preserves equality or simplifies equivalently.
3. Sequences cards toward isolation.
4. Recognizes completion or classification states.
5. Checks final numeric solutions in the original equation.

# Knowledge Graph

- Prerequisites: Phase 001 one-step equations; Phase 002 multi-step equations; Phase 003 variables on both sides; Phase 005 linear equation modeling; equality preservation; inverse operations; simplifying expressions
- Concepts Unlocked: legal battle cards; card sequencing; equivalent battle states; simplify cards; collect cards; repair moves; efficiency paths; classification cards; boss battle validation
- Related Concepts: linear inequalities; equation solving; systems of equations; inverse operations; graph intersections; adaptive hint sequencing
- Common Misconceptions: one-sided cards; same operation instead of inverse; partial division; partial distribution; stopping early; sign loss; treating identity as no solution; inventing a solution after contradiction
- Remedial Phases: Phase 001 review; Phase 002 review; Phase 003 review; distribution mini-lesson; identity/contradiction mini-lesson; modeling-to-equation mini-lesson
- Follow-up Phases: Phase 007 - Linear inequalities; Phase 008 - Compound inequalities; Phase 011 - Systems by substitution; Phase 012 - Systems by elimination; Phase 059 - Final boss challenges
- Transfer Topics: inequality transformations; equation proof paths; systems elimination moves; inverse function solving; algebraic game mechanics

# Validation Notes

## Structure Validation
- Includes all required Bibles and metadata sections.
- Contains exactly 20 template families, within the required 20-40 range.
- Each template includes example, answer, explanation, distractors, distractor rationale, randomization rules, validity constraints, metadata, variants, and mappings.
- Every template has six progressive hints.

## Math Validation
- T001: `x+7=15` with `-7` gives `x=8`.
- T002: `y-9=-4` with `+9` gives `y=5`.
- T003: `b/4=9` with `*4` gives `b=36`.
- T004: `5a=-35` with `/5` gives `a=-7`.
- T005: `2x+5=17` sequence `-5`, `/2` gives `x=6`.
- T006: `4x+3x=35` -> `7x=35` -> `x=5`.
- T007: `2(x+3)=14` distributes to `2x+6=14`; solution `x=4`.
- T008: `3x+5=x+13` with `-x` gives `2x+5=13`; solution `x=4`.
- T009: one-sided `-7` is invalid; legal `-7 both sides` gives `x=8`.
- T010: applying `-5` to `2x+5=17` gives `2x=12`.
- T011: `-4r+6=22` -> `-4r=16` -> `r=-4`.
- T012: `(2/3)p=12` with `*3/2` gives `p=18`.
- T013: `-3(x-2)+4=19` -> `x=-3`.
- T014: Path B for `2(x+3)=14` gives `x+3=7`, `x=4` in two cards.
- T015: transition `2x=12` to `x=6` is `/2`; inverse is `*2`.
- T016: `3x=21` is not complete; `/3` gives `x=7`.
- T017: `3x+4=3x-8` -> `4=-8`; no solution.
- T018: `2x+5=x+x+5` simplifies to identity; infinitely many solutions.
- T019: model `14+3q=50`; first card `-14`; full solution `q=12`.
- T020: `4(x-2)-3=2x+11` -> `4x-11=2x+11` -> `x=11`.

## Distractor Validation
- Distractors reflect illegal moves, wrong inverse cards, wrong card order, partial distribution, stopping early, and classification confusion.
- Multiple-choice-style templates have exactly one correct answer.
- Distractors were checked against legal battle rules and algebraic results.

## Hint Validation
- Each hint sequence progresses from recognizing structure to choosing a legal card, predicting state, and completing the battle.
- Early hints do not reveal full sequences unless the template is specifically about final boss review.

## Tutorial Validation
- Tutorial includes learning goal, prerequisite check, why it matters, core concept, legal and illegal cards, worked example, simplify cards, efficient paths, classification cards, common mistakes, guided practice, independent practice, mastery check, adaptive messages, and metadata.

## Socratic Validation
- Dialogue includes diagnostic, guided discovery, correct branch, partial branch, misconception branch, unsure branch, unrelated branch, recovery prompts, reflection, transfer, escalation rules, and exit condition.
- Tutor guides the player to legality and strategy before giving final card sequences.

## Metadata Validation
- Every template includes IDs, difficulty, timing, visual flag, compatibility flags, prerequisites, misconception tags, randomization constraints, and support-system mappings.

## Known Issues
- The repository specifications differ on the label for Hint 4. This phase uses "Guided Next Step" to match the master prompt language.
- `PHASE_TEMPLATE.md` omits Common Misconceptions from the Knowledge Graph section, but this phase includes it because the master prompt and knowledge graph guide require it.
