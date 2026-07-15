# Phase 019 - Function Composition

## Phase Metadata
- Course: Precalculus Odyssey Bible v5
- Topic: Function composition
- Subtopic: Evaluating, simplifying, interpreting, and finding domains of composed functions
- Prerequisites: Phase 014 function notation, Phase 015 domain from formulas, Phase 018 function transformations, substitution, algebraic simplification, table and graph reading
- Related phases: Phase 020 - Inverse functions; Phase 021 - Piecewise functions; Phase 026 - Quadratic graphs; Phase 033 - Rational expression simplification
- Estimated phase size: 20 template families, 20 core examples, 120 progressive hints, 1 tutorial sequence, 1 Socratic dialogue system

## Learning Objectives
By the end of this phase, the player can:

1. Interpret `(f o g)(x)` as `f(g(x))`.
2. Evaluate compositions at numerical inputs.
3. Distinguish `f(g(x))` from `g(f(x))`.
4. Compose functions given formulas.
5. Compose functions from tables and graphs.
6. Identify when a composition is undefined.
7. Determine domains of composed functions.
8. Decompose a function into an outer and inner function.
9. Interpret composition in context.
10. Use composition to recognize undoing or identity behavior.

## Prerequisite Review
- `f(a)` means use `a` as the input to function `f`.
- In `f(g(x))`, evaluate or simplify `g(x)` first.
- The output of the inner function becomes the input of the outer function.
- A composition is undefined if the inner input is invalid or if the inner output is not allowed by the outer function.
- Domain restrictions must be checked before and after substitution.

## Core Concepts
- `(f o g)(x)` is read "f composed with g of x."
- `(f o g)(x)=f(g(x))`.
- The rightmost function acts first.
- Composition is usually not commutative: `f(g(x))` and `g(f(x))` may be different.
- To find the domain of `f(g(x))`, require:
  1. `x` is in the domain of `g`.
  2. `g(x)` is in the domain of `f`.

## Common Misconceptions
- Evaluating the outer function first.
- Treating `f(g(x))` as multiplication `f(x)g(x)`.
- Assuming `f(g(x))=g(f(x))`.
- Ignoring domain restrictions of the inner function.
- Ignoring domain restrictions of the outer function after substitution.
- Substituting into only one occurrence of the variable.
- Confusing decomposition with solving.
- Reading table values backward.

# Part I - Question Bible

## Template T001 - Numeric composition f(g(a))
- Template ID: P019-T001
- Question Type: Direct computation
- Cognitive Skill: Evaluate inner function then outer function
- Difficulty: 2
- Estimated Time: 45 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Evaluate `f(g(a))` from formulas.
- Example Question: Let `f(x)=2x+1` and `g(x)=x^2`. Find `f(g(3))`.
- Answer: `19`.
- Explanation: First find `g(3)=3^2=9`. Then `f(9)=2(9)+1=19`.
- Distractors: `49`; `13`; `18`; `f(3)g(3)=63`
- Distractor Rationale: Computes `g(f(3))`; evaluates `f(3)` only; forgets `+1`; treats composition as multiplication.
- Randomization Rules: Use simple formulas and integer input.
- Validity Constraints: Inner output must be in the outer function domain.
- Metadata: phase_id=P019; prerequisites=[function notation, substitution]; misconception_tags=[order error, incomplete evaluation, composition-as-product]; randomization_constraints=[integer input].
- Graph/Visual Variant: Function-machine chain `3 -> 9 -> 19`.
- Modeling Variant: Level number becomes power value, then score formula.
- Reverse Variant: Given output chain, infer missing inner output.
- Equation Battle Variant: Inner-evaluate card, outer-evaluate card.
- Multi-stage Boss Variant: Include both `f(g(a))` and `g(f(a))`.
- Hint Mapping: H-P019-T001
- Tutorial Mapping: Tut-P019 sections Numeric Composition
- Socratic Mapping: Soc-P019 numeric branch

## Template T002 - Numeric composition g(f(a))
- Template ID: P019-T002
- Question Type: Direct computation
- Cognitive Skill: Evaluate composition in the reverse order
- Difficulty: 2
- Estimated Time: 45 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Evaluate `g(f(a))` and notice order.
- Example Question: Let `f(x)=2x+1` and `g(x)=x^2`. Find `g(f(3))`.
- Answer: `49`.
- Explanation: First find `f(3)=2(3)+1=7`. Then `g(7)=7^2=49`.
- Distractors: `19`; `7`; `9`; `63`
- Distractor Rationale: Computes `f(g(3))`; stops after inner function; computes `g(3)` only; treats composition as product.
- Randomization Rules: Pair with T001-style examples to emphasize order.
- Validity Constraints: Inner output must be valid for outer function.
- Metadata: phase_id=P019; prerequisites=[function notation, order of operations]; misconception_tags=[composition order error, incomplete evaluation, product confusion]; randomization_constraints=[reverse order].
- Graph/Visual Variant: Function-machine chain `3 -> 7 -> 49`.
- Modeling Variant: Score after applying boost then squaring reward.
- Reverse Variant: Given `g(f(3))=49`, ask for `f(3)`.
- Equation Battle Variant: Inner-evaluate card, outer-evaluate card.
- Multi-stage Boss Variant: Compare with `f(g(3))`.
- Hint Mapping: H-P019-T002
- Tutorial Mapping: Tut-P019 sections Order Matters
- Socratic Mapping: Soc-P019 order branch

## Template T003 - Symbolic composition linear into linear
- Template ID: P019-T003
- Question Type: Symbolic computation
- Cognitive Skill: Substitute one linear formula into another
- Difficulty: 3
- Estimated Time: 65 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Simplify `f(g(x))` for linear functions.
- Example Question: Let `f(x)=2x+3` and `g(x)=x-5`. Find `(f o g)(x)`.
- Answer: `2x-7`.
- Explanation: `(f o g)(x)=f(g(x))=f(x-5)=2(x-5)+3=2x-10+3=2x-7`.
- Distractors: `2x+8`; `2x-2`; `3x-2`; `(2x+3)(x-5)`
- Distractor Rationale: Sign error; computes `g(f(x))`; adds functions instead of composing; multiplies functions.
- Randomization Rules: Use linear functions with integer coefficients.
- Validity Constraints: Simplification should produce a clear linear expression.
- Metadata: phase_id=P019; prerequisites=[distribution, combining like terms]; misconception_tags=[order error, sign error, product confusion]; randomization_constraints=[linear-linear].
- Graph/Visual Variant: Input-output chain with algebra tiles.
- Modeling Variant: Convert raw level to adjusted level, then score.
- Reverse Variant: Given `2x-7`, propose `f` and `g`.
- Equation Battle Variant: Substitute-expression card, distribute, combine.
- Multi-stage Boss Variant: Also evaluate at one input.
- Hint Mapping: H-P019-T003
- Tutorial Mapping: Tut-P019 sections Formula Composition
- Socratic Mapping: Soc-P019 symbolic branch

## Template T004 - Reverse symbolic composition linear into linear
- Template ID: P019-T004
- Question Type: Symbolic computation
- Cognitive Skill: Compare `g(f(x))` with `f(g(x))`
- Difficulty: 3
- Estimated Time: 65 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Simplify `g(f(x))`.
- Example Question: Let `f(x)=2x+3` and `g(x)=x-5`. Find `(g o f)(x)`.
- Answer: `2x-2`.
- Explanation: `(g o f)(x)=g(f(x))=g(2x+3)=(2x+3)-5=2x-2`.
- Distractors: `2x-7`; `3x-2`; `2x+8`; `(x-5)(2x+3)`
- Distractor Rationale: Computes `f(g(x))`; adds functions; sign error; multiplies functions.
- Randomization Rules: Use the same functions as a paired order-comparison item.
- Validity Constraints: Final expression should differ from `f(g(x))` unless the topic is identity/commuting cases.
- Metadata: phase_id=P019; prerequisites=[substitution, simplifying]; misconception_tags=[order error, product confusion, sign error]; randomization_constraints=[linear reverse composition].
- Graph/Visual Variant: Function-machine chain showing different order.
- Modeling Variant: Apply scoring rule before adjustment.
- Reverse Variant: Given two compositions, match order to expression.
- Equation Battle Variant: Substitute-expression card and simplify.
- Multi-stage Boss Variant: Compare both orders.
- Hint Mapping: H-P019-T004
- Tutorial Mapping: Tut-P019 sections Order Matters
- Socratic Mapping: Soc-P019 reverse-order branch

## Template T005 - Quadratic outer with linear inner
- Template ID: P019-T005
- Question Type: Symbolic computation
- Cognitive Skill: Substitute a linear expression into a quadratic formula
- Difficulty: 4
- Estimated Time: 85 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Compose a quadratic outer function with a linear inner function.
- Example Question: Let `f(x)=x^2+1` and `g(x)=3x-2`. Find `f(g(x))`.
- Answer: `9x^2-12x+5`.
- Explanation: `f(g(x))=(3x-2)^2+1=9x^2-12x+4+1=9x^2-12x+5`.
- Distractors: `9x^2+5`; `3x^2-1`; `9x^2-12x+4`; `(x^2+1)(3x-2)`
- Distractor Rationale: Drops middle term; substitutes incorrectly; forgets `+1`; treats composition as product.
- Randomization Rules: Use `f(x)=x^2+c` and linear `g(x)=ax+b`.
- Validity Constraints: Expansion should be manageable.
- Metadata: phase_id=P019; prerequisites=[binomial squaring, substitution]; misconception_tags=[middle-term error, incomplete substitution, product confusion]; randomization_constraints=[quadratic outer].
- Graph/Visual Variant: Function machine with binomial input squared.
- Modeling Variant: Adjusted level then quadratic score.
- Reverse Variant: Decompose `(3x-2)^2+1` into `f(g(x))`.
- Equation Battle Variant: Substitute, square binomial, add constant.
- Multi-stage Boss Variant: Include domain if outer has restrictions in variants.
- Hint Mapping: H-P019-T005
- Tutorial Mapping: Tut-P019 sections Formula Composition
- Socratic Mapping: Soc-P019 quadratic-outer branch

## Template T006 - Linear outer with quadratic inner
- Template ID: P019-T006
- Question Type: Symbolic computation
- Cognitive Skill: Substitute a quadratic into a linear formula
- Difficulty: 3
- Estimated Time: 70 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Compose a linear outer function with a quadratic inner function.
- Example Question: Let `f(x)=2x-5` and `g(x)=x^2+4`. Find `f(g(x))`.
- Answer: `2x^2+3`.
- Explanation: `f(g(x))=2(x^2+4)-5=2x^2+8-5=2x^2+3`.
- Distractors: `2x^2-1`; `x^2+3`; `2x-1`; `(2x-5)(x^2+4)`
- Distractor Rationale: Arithmetic error; misses factor 2; substitutes into wrong expression; multiplies functions.
- Randomization Rules: Use linear outer functions and polynomial inner functions.
- Validity Constraints: Simplification should be straightforward.
- Metadata: phase_id=P019; prerequisites=[distribution, polynomial simplification]; misconception_tags=[distribution error, order error, product confusion]; randomization_constraints=[linear outer quadratic inner].
- Graph/Visual Variant: Function-machine chain.
- Modeling Variant: Quadratic raw value then linear scoring adjustment.
- Reverse Variant: Given `2x^2+3`, identify possible `f` and `g`.
- Equation Battle Variant: Substitute polynomial, distribute, combine.
- Multi-stage Boss Variant: Evaluate final expression at a point.
- Hint Mapping: H-P019-T006
- Tutorial Mapping: Tut-P019 sections Formula Composition
- Socratic Mapping: Soc-P019 polynomial-inner branch

## Template T007 - Table composition
- Template ID: P019-T007
- Question Type: Table lookup
- Cognitive Skill: Use one table output as another table input
- Difficulty: 3
- Estimated Time: 60 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Evaluate a composition from tables.
- Example Question: Tables show `g(2)=4` and `f(4)=7`. Find `f(g(2))`.
- Answer: `7`.
- Explanation: First `g(2)=4`. Then use 4 as the input to `f`, giving `f(4)=7`.
- Distractors: `4`; `f(2)`; `g(7)`; undefined.
- Distractor Rationale: Stops after inner output; uses wrong table input; reverses composition chain; claims undefined despite a valid table entry.
- Randomization Rules: Use paired table entries that form a valid chain.
- Validity Constraints: Inner output must appear as an input in the outer function table.
- Metadata: phase_id=P019; prerequisites=[table lookup, function notation]; misconception_tags=[incomplete evaluation, table reversal, order error]; randomization_constraints=[valid table chain].
- Graph/Visual Variant: Table arrows from input to inner output to outer output.
- Modeling Variant: Level maps to item ID, item ID maps to score.
- Reverse Variant: Fill missing table entry so composition has target value.
- Equation Battle Variant: Not primary.
- Multi-stage Boss Variant: Include both valid and undefined compositions.
- Hint Mapping: H-P019-T007
- Tutorial Mapping: Tut-P019 sections Tables and Graphs
- Socratic Mapping: Soc-P019 table branch

## Template T008 - Undefined table composition
- Template ID: P019-T008
- Question Type: Table domain check
- Cognitive Skill: Recognize invalid composition chain
- Difficulty: 3
- Estimated Time: 60 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Determine when a table composition is undefined.
- Example Question: A table gives `g(3)=5`, but the table for `f` has inputs only `0, 2, 4`. Find `f(g(3))`.
- Answer: Undefined.
- Explanation: First `g(3)=5`. To continue, we would need `f(5)`, but 5 is not an input listed for `f`.
- Distractors: `5`; `f(3)`; `4`; `0`
- Distractor Rationale: Stops after inner output; uses original input in outer function; picks nearest listed input; picks first table input.
- Randomization Rules: Use inner outputs absent from outer table inputs.
- Validity Constraints: Undefined status must come from missing outer input, not missing inner input unless stated.
- Metadata: phase_id=P019; prerequisites=[domain from tables, composition order]; misconception_tags=[undefined composition, incomplete evaluation, nearest-input error]; randomization_constraints=[missing outer input].
- Graph/Visual Variant: Broken function-machine chain.
- Modeling Variant: Item ID not recognized by reward table.
- Reverse Variant: Add one table row to make composition defined.
- Equation Battle Variant: Not primary.
- Multi-stage Boss Variant: Ask which step fails.
- Hint Mapping: H-P019-T008
- Tutorial Mapping: Tut-P019 sections Undefined Compositions
- Socratic Mapping: Soc-P019 undefined branch

## Template T009 - Domain of radical composition
- Template ID: P019-T009
- Question Type: Domain computation
- Cognitive Skill: Apply outer radical restriction to inner expression
- Difficulty: 4
- Estimated Time: 80 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Find domain of `f(g(x))` when outer function is a square root.
- Example Question: Let `f(x)=sqrt(x)` and `g(x)=x-2`. Find the domain of `f(g(x))`.
- Answer: `x >= 2`; interval `[2,infinity)`.
- Explanation: `f(g(x))=sqrt(x-2)`. The radicand must be nonnegative: `x-2 >= 0`, so `x >= 2`.
- Distractors: all real numbers; `x > 2`; `x != 2`; `x <= 2`
- Distractor Rationale: Ignores outer domain; excludes allowed endpoint; treats as denominator restriction; reverses inequality.
- Randomization Rules: Use square-root outer function and linear inner function.
- Validity Constraints: Boundary should be integer or simple fraction.
- Metadata: phase_id=P019; prerequisites=[domain from formulas, square-root restrictions]; misconception_tags=[outer-domain ignored, endpoint error, inequality reversal]; randomization_constraints=[radical outer].
- Graph/Visual Variant: Function-machine chain with allowed inner outputs.
- Modeling Variant: Adjusted input must be nonnegative before square-root score.
- Reverse Variant: Create inner function giving domain `[2,infinity)`.
- Equation Battle Variant: Compose, set radicand `>=0`, solve.
- Multi-stage Boss Variant: Include formula and interval notation.
- Hint Mapping: H-P019-T009
- Tutorial Mapping: Tut-P019 sections Domain of Compositions
- Socratic Mapping: Soc-P019 domain-radical branch

## Template T010 - Domain of rational composition
- Template ID: P019-T010
- Question Type: Domain computation
- Cognitive Skill: Apply denominator restriction after composition
- Difficulty: 4
- Estimated Time: 75 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Find domain of `f(g(x))` when outer function has a denominator restriction.
- Example Question: Let `f(x)=1/x` and `g(x)=x-4`. Find the domain of `f(g(x))`.
- Answer: `x != 4`; interval `(-infinity,4) union (4,infinity)`.
- Explanation: `f(g(x))=1/(x-4)`. The denominator cannot be zero, so exclude `x=4`.
- Distractors: all real numbers; `x != 0`; `x > 4`; `x=4`
- Distractor Rationale: Ignores denominator restriction; excludes old outer input rather than preimage; turns exclusion into one-sided interval; gives forbidden value as domain.
- Randomization Rules: Use rational outer function `1/x` or `1/(x-a)` and linear inner.
- Validity Constraints: Denominator equation should be simple.
- Metadata: phase_id=P019; prerequisites=[rational domain, composition]; misconception_tags=[preimage error, denominator ignored, one-sided restriction]; randomization_constraints=[rational outer].
- Graph/Visual Variant: Broken chain when inner output is 0.
- Modeling Variant: Adjusted value cannot be zero before reciprocal rule.
- Reverse Variant: Create composition with domain excluding 4.
- Equation Battle Variant: Compose, set denominator not equal to zero.
- Multi-stage Boss Variant: Include set-builder and interval notation.
- Hint Mapping: H-P019-T010
- Tutorial Mapping: Tut-P019 sections Domain of Compositions
- Socratic Mapping: Soc-P019 domain-rational branch

## Template T011 - Inner domain restriction plus outer restriction
- Template ID: P019-T011
- Question Type: Domain computation
- Cognitive Skill: Combine inner and outer restrictions
- Difficulty: 5
- Estimated Time: 100 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Find domain when both functions have restrictions.
- Example Question: Let `f(x)=sqrt(1-x)` and `g(x)=1/(x-2)`. Find the domain of `f(g(x))`.
- Answer: `x < 2 or x >= 3`; interval `(-infinity,2) union [3,infinity)`.
- Explanation: First, `g(x)` requires `x != 2`. Also `f(g(x))=sqrt(1-1/(x-2))`. Require `1-1/(x-2) >= 0`, so `(x-3)/(x-2) >= 0`. A sign chart with critical values 2 and 3 gives `x < 2 or x >= 3`.
- Distractors: all real numbers; `x != 2`; `x >= 3`; `(2,3]`
- Distractor Rationale: Ignores both restrictions; checks only inner denominator; misses the left branch; sign-chart interval reversal.
- Randomization Rules: Use one inner denominator restriction and one outer square-root restriction.
- Validity Constraints: Final domain must be sign-tested and internally consistent.
- Metadata: phase_id=P019; prerequisites=[rational inequalities, square-root domain, composition domain]; misconception_tags=[missed inner restriction, missed outer restriction, sign chart error]; randomization_constraints=[combined restrictions].
- Graph/Visual Variant: Number line with inner and outer restrictions layered.
- Modeling Variant: Reciprocal output must fit a square-root tolerance rule.
- Reverse Variant: Create a composition with two restriction sources.
- Equation Battle Variant: Identify inner restriction, compose, solve outer restriction, intersect.
- Multi-stage Boss Variant: Require a restriction table before final domain.
- Hint Mapping: H-P019-T011
- Tutorial Mapping: Tut-P019 sections Domain of Compositions
- Socratic Mapping: Soc-P019 combined-domain branch

## Template T012 - Decompose a composite function
- Template ID: P019-T012
- Question Type: Reverse construction
- Cognitive Skill: Identify inner and outer functions
- Difficulty: 3
- Estimated Time: 65 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Write a function as `f(g(x))`.
- Example Question: Decompose `h(x)=(2x+1)^2` as `f(g(x))`.
- Answer: One valid decomposition is `g(x)=2x+1` and `f(u)=u^2`.
- Explanation: First compute the inner expression `2x+1`, then square the result.
- Distractors: `f(x)=2x+1`, `g(x)=x^2`; `f(u)=2u+1`, `g(x)=x^2`; `f(x)=x^2`, `g(x)=2x-1`; impossible.
- Distractor Rationale: Reverses inner and outer; changes operation order; sign error; fails to see structure.
- Randomization Rules: Use expressions with visible nested structure.
- Validity Constraints: Decomposition need not be unique, but example answer must compose to the given function.
- Metadata: phase_id=P019; prerequisites=[function notation, expression structure]; misconception_tags=[inner-outer reversal, sign error, decomposition confusion]; randomization_constraints=[nested expression].
- Graph/Visual Variant: Function-machine boxes inner then outer.
- Modeling Variant: Adjust input, then square score.
- Reverse Variant: This template is the reverse variant.
- Equation Battle Variant: Choose inner box and outer box.
- Multi-stage Boss Variant: Verify by recomposing.
- Hint Mapping: H-P019-T012
- Tutorial Mapping: Tut-P019 sections Decomposition
- Socratic Mapping: Soc-P019 decompose branch

## Template T013 - Composition in context
- Template ID: P019-T013
- Question Type: Modeling interpretation
- Cognitive Skill: Interpret output of one model as input of another
- Difficulty: 3
- Estimated Time: 75 seconds
- Visual Required: false
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Interpret function composition in a real context.
- Example Question: A game has `L(t)=2t+1`, the level reached after `t` hours, and `S(L)=100L+50`, the score at level `L`. Find and interpret `S(L(3))`.
- Answer: `750`; after 3 hours, the player reaches level 7 and has score 750.
- Explanation: `L(3)=2(3)+1=7`. Then `S(7)=100(7)+50=750`.
- Distractors: `L(S(3))`; `350`; `700`; `S(3)=350`.
- Distractor Rationale: Reverses context order; evaluates score at time instead of level; omits base score; ignores level function.
- Randomization Rules: Use two linked context functions with clear units.
- Validity Constraints: Inner output units must match outer input units.
- Metadata: phase_id=P019; prerequisites=[function notation, context units]; misconception_tags=[unit mismatch, order error, incomplete evaluation]; randomization_constraints=[context chain].
- Graph/Visual Variant: Time-to-level-to-score function machine.
- Modeling Variant: This template is the modeling variant.
- Reverse Variant: Given an interpretation, write the composition notation.
- Equation Battle Variant: Not primary.
- Multi-stage Boss Variant: Include units for inner and outer outputs.
- Hint Mapping: H-P019-T013
- Tutorial Mapping: Tut-P019 sections Context Composition
- Socratic Mapping: Soc-P019 context branch

## Template T014 - Triple composition
- Template ID: P019-T014
- Question Type: Direct computation
- Cognitive Skill: Evaluate nested composition step by step
- Difficulty: 4
- Estimated Time: 85 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Evaluate a composition with three functions.
- Example Question: Let `f(x)=x+2`, `g(x)=3x`, and `h(x)=x^2`. Find `f(g(h(2)))`.
- Answer: `14`.
- Explanation: Work inside out: `h(2)=4`, `g(4)=12`, and `f(12)=14`.
- Distractors: `25`; `36`; `12`; `f(g(2))=8`
- Distractor Rationale: Applies functions in wrong order; squares after multiplying; stops one step early; ignores `h`.
- Randomization Rules: Use three simple functions and integer input.
- Validity Constraints: All intermediate values should be valid and manageable.
- Metadata: phase_id=P019; prerequisites=[nested function notation, arithmetic]; misconception_tags=[order error, incomplete evaluation, missing function]; randomization_constraints=[triple composition].
- Graph/Visual Variant: Three-box function machine.
- Modeling Variant: Time to level to reward to final bonus.
- Reverse Variant: Fill a missing intermediate value.
- Equation Battle Variant: Inner-to-outer evaluation cards.
- Multi-stage Boss Variant: Ask for every intermediate output.
- Hint Mapping: H-P019-T014
- Tutorial Mapping: Tut-P019 sections Nested Composition
- Socratic Mapping: Soc-P019 nested branch

## Template T015 - Solve a composition equation
- Template ID: P019-T015
- Question Type: Equation solving
- Cognitive Skill: Solve `f(g(x))=k`
- Difficulty: 4
- Estimated Time: 85 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve an equation involving a composition.
- Example Question: Let `f(x)=2x+1` and `g(x)=x-3`. Solve `f(g(x))=7`.
- Answer: `x=6`.
- Explanation: `f(g(x))=2(x-3)+1=2x-5`. Solve `2x-5=7`, so `2x=12`, `x=6`.
- Distractors: `x=3`; `x=5`; `x=7`; `x=2`
- Distractor Rationale: Solves inner equal to 0; arithmetic error; returns output as input; solves `g(f(x))=7`.
- Randomization Rules: Use linear compositions leading to one-step or two-step equations.
- Validity Constraints: Unique real solution.
- Metadata: phase_id=P019; prerequisites=[linear equations, composition]; misconception_tags=[order error, output-as-input, arithmetic error]; randomization_constraints=[linear solve composition].
- Graph/Visual Variant: Find where composed graph reaches y=7.
- Modeling Variant: Find time when final score reaches target.
- Reverse Variant: Create `f` and `g` so solution is x=6.
- Equation Battle Variant: Compose, set equal, solve.
- Multi-stage Boss Variant: Check by evaluating composition at solution.
- Hint Mapping: H-P019-T015
- Tutorial Mapping: Tut-P019 sections Solving Composition Equations
- Socratic Mapping: Soc-P019 solve-composition branch

## Template T016 - Graph or point composition
- Template ID: P019-T016
- Question Type: Graph/table lookup
- Cognitive Skill: Use graph point outputs in a composition
- Difficulty: 3
- Estimated Time: 65 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Evaluate composition from graph points.
- Example Question: A graph of `g` shows the point `(1,3)`, and a graph of `f` shows the point `(3,-2)`. Find `f(g(1))`.
- Answer: `-2`.
- Explanation: From the graph of `g`, `g(1)=3`. Then from the graph of `f`, `f(3)=-2`.
- Distractors: `3`; `1`; `f(1)`; undefined.
- Distractor Rationale: Stops after inner output; returns original input; uses wrong input for `f`; claims undefined despite a valid point.
- Randomization Rules: Use plotted points that form a valid chain.
- Validity Constraints: The inner output must appear as an x-value on the outer graph.
- Metadata: phase_id=P019; prerequisites=[graph reading, function notation]; misconception_tags=[graph reversal, incomplete composition, order error]; randomization_constraints=[graph point chain].
- Graph/Visual Variant: Two graph panels with highlighted points.
- Modeling Variant: Position graph output feeds reward graph input.
- Reverse Variant: Add a point to make a composition equal target output.
- Equation Battle Variant: Not primary.
- Multi-stage Boss Variant: Include a second composition that is undefined.
- Hint Mapping: H-P019-T016
- Tutorial Mapping: Tut-P019 sections Tables and Graphs
- Socratic Mapping: Soc-P019 graph branch

## Template T017 - Composition is not multiplication
- Template ID: P019-T017
- Question Type: Error analysis
- Cognitive Skill: Correct product misconception
- Difficulty: 3
- Estimated Time: 65 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Distinguish composition from multiplying function values.
- Example Question: A student says `(f o g)(2)=f(2)g(2)`. If `f(x)=x+1` and `g(x)=3x`, explain the mistake and find the correct value.
- Answer: The student multiplied instead of composing. Correct value: `(f o g)(2)=f(g(2))=f(6)=7`.
- Explanation: Composition feeds the output of `g` into `f`. It is not the product of the two outputs.
- Distractors: `18`; `9`; `6`; student is correct.
- Distractor Rationale: Computes `f(2)g(2)=3*6`; adds `f(2)+g(2)`; stops at `g(2)`; accepts product misconception.
- Randomization Rules: Present composition notation and a tempting product calculation.
- Validity Constraints: Correct composition value should differ from product.
- Metadata: phase_id=P019; prerequisites=[composition notation, evaluation]; misconception_tags=[composition-as-product, incomplete evaluation, operation confusion]; randomization_constraints=[product trap].
- Graph/Visual Variant: Function machine versus multiplication symbol.
- Modeling Variant: Level-to-score chain versus multiplying separate scores.
- Reverse Variant: Create an example where product and composition differ.
- Equation Battle Variant: Reject multiply-functions card; use feed-output card.
- Multi-stage Boss Variant: Compute both and compare.
- Hint Mapping: H-P019-T017
- Tutorial Mapping: Tut-P019 sections Common Mistakes
- Socratic Mapping: Soc-P019 product-error branch

## Template T018 - Order comparison noncommutative
- Template ID: P019-T018
- Question Type: Comparative computation
- Cognitive Skill: Show `f(g(a))` and `g(f(a))` can differ
- Difficulty: 3
- Estimated Time: 70 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Demonstrate that composition order matters.
- Example Question: Let `f(x)=x+1` and `g(x)=x^2`. Compare `f(g(2))` and `g(f(2))`.
- Answer: `f(g(2))=5` and `g(f(2))=9`; they are not equal.
- Explanation: `g(2)=4`, so `f(g(2))=f(4)=5`. But `f(2)=3`, so `g(f(2))=g(3)=9`.
- Distractors: both equal 5; both equal 9; both equal 6; cannot compare.
- Distractor Rationale: Assumes commutativity; uses only reverse order; adds outputs; ignores direct calculation.
- Randomization Rules: Use simple functions where the two orders differ.
- Validity Constraints: Values should be distinct to emphasize order.
- Metadata: phase_id=P019; prerequisites=[function evaluation, comparison]; misconception_tags=[commutativity error, order error, arithmetic error]; randomization_constraints=[noncommutative pair].
- Graph/Visual Variant: Two different function-machine paths from the same input.
- Modeling Variant: Apply bonus then square versus square then bonus.
- Reverse Variant: Find functions where both orders happen to match for one input.
- Equation Battle Variant: Evaluate two chains separately.
- Multi-stage Boss Variant: Explain why order changed result.
- Hint Mapping: H-P019-T018
- Tutorial Mapping: Tut-P019 sections Order Matters
- Socratic Mapping: Soc-P019 compare-order branch

## Template T019 - Undoing functions and identity composition
- Template ID: P019-T019
- Question Type: Conceptual computation
- Cognitive Skill: Recognize composition that returns the original input
- Difficulty: 3
- Estimated Time: 65 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Recognize when two functions undo each other.
- Example Question: Let `f(x)=x+5` and `g(x)=x-5`. Find `f(g(x))` and `g(f(x))`.
- Answer: Both equal `x`.
- Explanation: `f(g(x))=f(x-5)=(x-5)+5=x`. Also `g(f(x))=g(x+5)=(x+5)-5=x`.
- Distractors: `x+10`; `x-10`; `25`; not possible.
- Distractor Rationale: Adds shifts instead of composing; subtracts both; multiplies constants; misses undoing behavior.
- Randomization Rules: Use inverse-like linear pairs such as add/subtract or multiply/divide.
- Validity Constraints: Functions should be defined on all real numbers for this basic identity case.
- Metadata: phase_id=P019; prerequisites=[linear expressions, simplifying]; misconception_tags=[operation order, inverse-like confusion, simplification error]; randomization_constraints=[undoing functions].
- Graph/Visual Variant: Function-machine returns input to itself.
- Modeling Variant: Apply a buff then remove the same buff.
- Reverse Variant: Given `f(x)=x+5`, choose a `g` that undoes it.
- Equation Battle Variant: Compose and simplify to identity.
- Multi-stage Boss Variant: Bridge to inverse functions.
- Hint Mapping: H-P019-T019
- Tutorial Mapping: Tut-P019 sections Identity and Undoing
- Socratic Mapping: Soc-P019 identity branch

## Template T020 - Boss composition challenge
- Template ID: P019-T020
- Question Type: Multi-stage boss
- Cognitive Skill: Evaluate, simplify, find domain, compare order, and interpret
- Difficulty: 5
- Estimated Time: 150 seconds
- Visual Required: true
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Complete a full composition analysis.
- Example Question: Boss Gate: Let `f(x)=sqrt(x+1)` and `g(x)=2x-3`. Find `f(g(4))`, simplify `f(g(x))`, find its domain, and compare with `g(f(4))`.
- Answer: `f(g(4))=sqrt(6)`; `f(g(x))=sqrt(2x-2)`; domain `[1,infinity)`; `g(f(4))=2sqrt(5)-3`, so the two orders are different.
- Explanation: `g(4)=5`, so `f(g(4))=f(5)=sqrt(6)`. Symbolically, `f(g(x))=sqrt((2x-3)+1)=sqrt(2x-2)`. Domain requires `2x-2 >= 0`, so `x >= 1`. For the reverse order, `f(4)=sqrt(5)`, so `g(f(4))=2sqrt(5)-3`.
- Distractors: `sqrt(8)`; domain all real numbers; `g(f(4))=sqrt(6)`; `f(g(x))=2sqrt(x+1)-3`.
- Distractor Rationale: Substitutes into wrong expression; ignores radical restriction; assumes orders are equal; computes `g(f(x))` instead of `f(g(x))`.
- Randomization Rules: Use an outer radical function and inner linear function with a numerical comparison to reverse order.
- Validity Constraints: Domain and numerical values must be exact and valid.
- Metadata: phase_id=P019; prerequisites=[function notation, radical domain, symbolic composition, order comparison]; misconception_tags=[order error, domain ignored, wrong substitution, reverse-composition confusion]; randomization_constraints=[mixed boss].
- Graph/Visual Variant: Function-machine and number-line domain overlay.
- Modeling Variant: Adjusted level then square-root reward, compared with reverse order.
- Reverse Variant: Build functions so the boss domain is `[1,infinity)`.
- Equation Battle Variant: Evaluate chain, compose formula, solve domain inequality, evaluate reverse order.
- Multi-stage Boss Variant: This is the phase boss template.
- Hint Mapping: H-P019-T020
- Tutorial Mapping: Tut-P019 sections Full Phase Review
- Socratic Mapping: Soc-P019 boss branch

# Part II - Hint Bible

## H-P019-T001
- Hint 1 - Gentle Nudge: Work from the inside out.
- Hint 2 - Concept Reminder: In `f(g(3))`, find `g(3)` first.
- Hint 3 - Focus Hint: `g(3)=3^2=9`.
- Hint 4 - Guided Next Step: Now find `f(9)`.
- Hint 5 - Nearly Complete: `f(9)=2(9)+1`.
- Hint 6 - Full Solution: `f(g(3))=19`.

## H-P019-T002
- Hint 1 - Gentle Nudge: This order starts with `f(3)`.
- Hint 2 - Concept Reminder: In `g(f(3))`, `f` is the inner function.
- Hint 3 - Focus Hint: `f(3)=2(3)+1=7`.
- Hint 4 - Guided Next Step: Now evaluate `g(7)`.
- Hint 5 - Nearly Complete: `g(7)=7^2`.
- Hint 6 - Full Solution: `g(f(3))=49`.

## H-P019-T003
- Hint 1 - Gentle Nudge: `(f o g)(x)` means `f(g(x))`.
- Hint 2 - Concept Reminder: Replace the input of `f` with `g(x)`.
- Hint 3 - Focus Hint: `f(x-5)=2(x-5)+3`.
- Hint 4 - Guided Next Step: Distribute 2.
- Hint 5 - Nearly Complete: `2x-10+3`.
- Hint 6 - Full Solution: `(f o g)(x)=2x-7`.

## H-P019-T004
- Hint 1 - Gentle Nudge: `(g o f)(x)` means `g(f(x))`.
- Hint 2 - Concept Reminder: Replace the input of `g` with `2x+3`.
- Hint 3 - Focus Hint: `g(2x+3)=(2x+3)-5`.
- Hint 4 - Guided Next Step: Combine constants.
- Hint 5 - Nearly Complete: `2x+3-5`.
- Hint 6 - Full Solution: `(g o f)(x)=2x-2`.

## H-P019-T005
- Hint 1 - Gentle Nudge: The outer function squares its input.
- Hint 2 - Concept Reminder: Put the whole `3x-2` inside parentheses.
- Hint 3 - Focus Hint: `f(g(x))=(3x-2)^2+1`.
- Hint 4 - Guided Next Step: Expand `(3x-2)^2`.
- Hint 5 - Nearly Complete: `9x^2-12x+4+1`.
- Hint 6 - Full Solution: `9x^2-12x+5`.

## H-P019-T006
- Hint 1 - Gentle Nudge: Substitute the whole inner function into `f`.
- Hint 2 - Concept Reminder: `f(u)=2u-5`.
- Hint 3 - Focus Hint: Use `u=x^2+4`.
- Hint 4 - Guided Next Step: `2(x^2+4)-5`.
- Hint 5 - Nearly Complete: `2x^2+8-5`.
- Hint 6 - Full Solution: `2x^2+3`.

## H-P019-T007
- Hint 1 - Gentle Nudge: Start with the inner function.
- Hint 2 - Concept Reminder: `g(2)=4`.
- Hint 3 - Focus Hint: Now use 4 as the input to `f`.
- Hint 4 - Guided Next Step: Look up `f(4)`.
- Hint 5 - Nearly Complete: The table gives `f(4)=7`.
- Hint 6 - Full Solution: `f(g(2))=7`.

## H-P019-T008
- Hint 1 - Gentle Nudge: First find the inner output.
- Hint 2 - Concept Reminder: `g(3)=5`.
- Hint 3 - Focus Hint: Now you would need `f(5)`.
- Hint 4 - Guided Next Step: Check whether 5 is an input in the `f` table.
- Hint 5 - Nearly Complete: It is not listed.
- Hint 6 - Full Solution: `f(g(3))` is undefined.

## H-P019-T009
- Hint 1 - Gentle Nudge: Compose the formula first.
- Hint 2 - Concept Reminder: `f(g(x))=sqrt(x-2)`.
- Hint 3 - Focus Hint: A square root needs radicand at least 0.
- Hint 4 - Guided Next Step: Solve `x-2 >= 0`.
- Hint 5 - Nearly Complete: `x >= 2`.
- Hint 6 - Full Solution: Domain `[2,infinity)`.

## H-P019-T010
- Hint 1 - Gentle Nudge: Substitute `g(x)` into the denominator of `f`.
- Hint 2 - Concept Reminder: `f(g(x))=1/(x-4)`.
- Hint 3 - Focus Hint: Denominator cannot equal zero.
- Hint 4 - Guided Next Step: Exclude `x=4`.
- Hint 5 - Nearly Complete: Use two intervals around 4.
- Hint 6 - Full Solution: `(-infinity,4) union (4,infinity)`.

## H-P019-T011
- Hint 1 - Gentle Nudge: Check the inner function first.
- Hint 2 - Concept Reminder: `g(x)=1/(x-2)` requires `x != 2`.
- Hint 3 - Focus Hint: Compose: `f(g(x))=sqrt(1-1/(x-2))`.
- Hint 4 - Guided Next Step: Require `1-1/(x-2) >= 0`.
- Hint 5 - Nearly Complete: Rewrite as `(x-3)/(x-2) >= 0` and test intervals around 2 and 3.
- Hint 6 - Full Solution: Domain `(-infinity,2) union [3,infinity)`.

## H-P019-T012
- Hint 1 - Gentle Nudge: Look for the innermost expression.
- Hint 2 - Concept Reminder: `2x+1` happens before squaring.
- Hint 3 - Focus Hint: Let `g(x)=2x+1`.
- Hint 4 - Guided Next Step: Let the outer function square its input.
- Hint 5 - Nearly Complete: Use `f(u)=u^2`.
- Hint 6 - Full Solution: One valid decomposition is `g(x)=2x+1`, `f(u)=u^2`.

## H-P019-T013
- Hint 1 - Gentle Nudge: The level function happens first.
- Hint 2 - Concept Reminder: Find `L(3)`.
- Hint 3 - Focus Hint: `L(3)=2(3)+1=7`.
- Hint 4 - Guided Next Step: Use 7 as the input to `S`.
- Hint 5 - Nearly Complete: `S(7)=100(7)+50`.
- Hint 6 - Full Solution: `750`; after 3 hours, level 7 gives score 750.

## H-P019-T014
- Hint 1 - Gentle Nudge: Start with the innermost function.
- Hint 2 - Concept Reminder: Evaluate `h(2)` first.
- Hint 3 - Focus Hint: `h(2)=4`.
- Hint 4 - Guided Next Step: Then `g(4)=12`.
- Hint 5 - Nearly Complete: Finally `f(12)=14`.
- Hint 6 - Full Solution: `f(g(h(2)))=14`.

## H-P019-T015
- Hint 1 - Gentle Nudge: First simplify the composition.
- Hint 2 - Concept Reminder: `f(g(x))=2(x-3)+1`.
- Hint 3 - Focus Hint: This simplifies to `2x-5`.
- Hint 4 - Guided Next Step: Set `2x-5=7`.
- Hint 5 - Nearly Complete: `2x=12`.
- Hint 6 - Full Solution: `x=6`.

## H-P019-T016
- Hint 1 - Gentle Nudge: Read `g(1)` from the graph of `g`.
- Hint 2 - Concept Reminder: The point `(1,3)` means `g(1)=3`.
- Hint 3 - Focus Hint: Now find `f(3)`.
- Hint 4 - Guided Next Step: The point `(3,-2)` means `f(3)=-2`.
- Hint 5 - Nearly Complete: The final output is -2.
- Hint 6 - Full Solution: `f(g(1))=-2`.

## H-P019-T017
- Hint 1 - Gentle Nudge: Composition is not multiplication.
- Hint 2 - Concept Reminder: `(f o g)(2)=f(g(2))`.
- Hint 3 - Focus Hint: `g(2)=3(2)=6`.
- Hint 4 - Guided Next Step: Now evaluate `f(6)`.
- Hint 5 - Nearly Complete: `f(6)=6+1`.
- Hint 6 - Full Solution: Mistake: multiplying instead of composing. Correct value `7`.

## H-P019-T018
- Hint 1 - Gentle Nudge: Compute the two orders separately.
- Hint 2 - Concept Reminder: For `f(g(2))`, start with `g(2)`.
- Hint 3 - Focus Hint: `g(2)=4`, so `f(4)=5`.
- Hint 4 - Guided Next Step: For `g(f(2))`, start with `f(2)=3`.
- Hint 5 - Nearly Complete: `g(3)=9`.
- Hint 6 - Full Solution: `f(g(2))=5`; `g(f(2))=9`; not equal.

## H-P019-T019
- Hint 1 - Gentle Nudge: One function adds 5; the other subtracts 5.
- Hint 2 - Concept Reminder: They can undo each other.
- Hint 3 - Focus Hint: `f(g(x))=(x-5)+5`.
- Hint 4 - Guided Next Step: That simplifies to `x`.
- Hint 5 - Nearly Complete: `g(f(x))=(x+5)-5`.
- Hint 6 - Full Solution: Both compositions equal `x`.

## H-P019-T020
- Hint 1 - Gentle Nudge: Do each requested part one at a time.
- Hint 2 - Concept Reminder: For `f(g(4))`, start with `g(4)`.
- Hint 3 - Focus Hint: `g(4)=5`, so `f(5)=sqrt(6)`.
- Hint 4 - Guided Next Step: Symbolically, `f(g(x))=sqrt(2x-2)`.
- Hint 5 - Nearly Complete: Domain requires `2x-2 >= 0`.
- Hint 6 - Full Solution: `f(g(4))=sqrt(6)`; `f(g(x))=sqrt(2x-2)`; domain `[1,infinity)`; `g(f(4))=2sqrt(5)-3`.

# Part III - Tutorial Bible

## Learning Goal
Learn to compose functions by feeding the output of one function into another, then evaluate, simplify, interpret, and find domains of compositions.

## Why It Matters
Composition models chained systems: one process transforms an input, and another process uses that result. It appears in game logic, unit conversion, transformations, inverse functions, piecewise rules, and advanced modeling.

## Prerequisite Check
Ask the player:

1. What does `f(3)` mean? Expected: output of `f` at input 3.
2. If `g(3)=9`, what is the input and output? Expected: input 3, output 9.
3. Evaluate `f(9)` if `f(x)=2x+1`. Expected: 19.
4. What domain rule applies to `sqrt(x-2)`? Expected: `x >= 2`.
5. Is `f(g(x))` usually the same as `g(f(x))`? Expected: no.

## Core Concept
Composition means function chaining.

`(f o g)(x)=f(g(x))`

The rightmost function acts first.

For `f(x)=2x+1` and `g(x)=x^2`:

`f(g(3))`

First `g(3)=9`.

Then `f(9)=19`.

## Numeric Composition
Steps:

1. Evaluate the inner function.
2. Use that output as the input to the outer function.
3. Continue until the final output is reached.

Example:

`g(f(3))`

`f(3)=7`

`g(7)=49`

## Order Matters
Using the same functions:

`f(g(3))=19`

`g(f(3))=49`

The order changes the result because the function chain changes.

## Formula Composition
To find `f(g(x))`, replace every input variable in `f` with the entire expression `g(x)`.

Example:

`f(x)=2x+3`

`g(x)=x-5`

`f(g(x))=2(x-5)+3=2x-7`

Use parentheses around the whole inner expression.

## Tables and Graphs
For table or graph composition, follow the chain:

`f(g(2))`

If `g(2)=4`, then find `f(4)`.

If `f(4)=7`, then `f(g(2))=7`.

If the needed outer input is missing, the composition is undefined.

## Undefined Compositions
A composition can fail in two ways:

1. The original input is not allowed by the inner function.
2. The inner output is not allowed by the outer function.

Example:

If `g(3)=5` but `f` is not defined at 5, then `f(g(3))` is undefined.

## Domain of Compositions
To find the domain of `f(g(x))`:

1. Make sure `x` is allowed in `g`.
2. Make sure `g(x)` is allowed in `f`.

Example:

`f(x)=sqrt(x)`, `g(x)=x-2`

`f(g(x))=sqrt(x-2)`

Need `x-2 >= 0`, so domain `[2,infinity)`.

Example:

`f(x)=1/x`, `g(x)=x-4`

`f(g(x))=1/(x-4)`

Need `x != 4`.

## Decomposition
Decomposition reverses the task: write a function as a composition.

Example:

`h(x)=(2x+1)^2`

Inner: `g(x)=2x+1`

Outer: `f(u)=u^2`

Then `h(x)=f(g(x))`.

## Context Composition
In context, the inner output unit must match the outer input unit.

Example:

`L(t)=2t+1` gives level after `t` hours.

`S(L)=100L+50` gives score at level `L`.

`S(L(3))` means time goes into level, then level goes into score.

## Nested Composition
For three functions, still work inside out.

`f(g(h(2)))`

Evaluate `h(2)`, then `g(...)`, then `f(...)`.

## Solving Composition Equations
To solve `f(g(x))=k`:

1. Compose and simplify.
2. Set the expression equal to `k`.
3. Solve.
4. Check domain restrictions.

Example:

`f(x)=2x+1`, `g(x)=x-3`

`f(g(x))=2x-5`

Solve `2x-5=7`, so `x=6`.

## Identity and Undoing
Some functions undo each other.

If `f(x)=x+5` and `g(x)=x-5`, then:

`f(g(x))=x`

`g(f(x))=x`

This prepares for inverse functions.

## Common Mistakes
- Mistake: Evaluating the leftmost function first.
  Correction: The innermost/rightmost function acts first.
- Mistake: Treating composition as multiplication.
  Correction: Feed one output into the next function.
- Mistake: Assuming order does not matter.
  Correction: Calculate both orders separately.
- Mistake: Forgetting parentheses around the inner expression.
  Correction: Substitute the whole inner formula.
- Mistake: Ignoring domain.
  Correction: Check both the inner function and outer function requirements.

## Guided Practice
1. `f(x)=x+4`, `g(x)=2x`; find `f(g(3))`.
   - `g(3)=6`.
   - `f(6)=10`.

2. `f(x)=x^2`, `g(x)=x-1`; find `f(g(x))`.
   - `(x-1)^2`.

3. `f(x)=sqrt(x)`, `g(x)=x+5`; find domain of `f(g(x))`.
   - `sqrt(x+5)` requires `x >= -5`.

## Independent Practice
1. `f(x)=3x`, `g(x)=x+2`; find `f(g(4))`. Answer: `18`.
2. `f(x)=x^2`, `g(x)=x+1`; find `f(g(x))`. Answer: `(x+1)^2`.
3. `f(x)=x-7`, `g(x)=2x`; find `g(f(x))`. Answer: `2x-14`.
4. Table has `g(1)=5`, `f(5)=9`; find `f(g(1))`. Answer: `9`.
5. `f(x)=1/x`, `g(x)=x+3`; domain of `f(g(x))`: `x != -3`.

## Mastery Check
The player is ready to advance when they can:

1. Interpret `(f o g)(x)` as `f(g(x))`.
2. Evaluate numerical compositions.
3. Simplify symbolic compositions.
4. Use tables and graphs for composition.
5. Identify undefined compositions.
6. Find domains of compositions.
7. Explain why order matters.
8. Decompose nested expressions.

Mastery check set:

1. `f(x)=2x+5`, `g(x)=x^2`; `f(g(2))=13`.
2. Same functions: `g(f(2))=81`.
3. `f(x)=3x-1`, `g(x)=x+4`; `f(g(x))=3x+11`.
4. `f(x)=sqrt(x)`, `g(x)=2x-6`; domain of `f(g(x))` is `[3,infinity)`.
5. `h(x)=(x-7)^3`; one decomposition is `g(x)=x-7`, `f(u)=u^3`.

## Adaptive Tutor Messages
- If the player starts with the wrong function: "Composition works inside out. Start with the function closest to the input."
- If the player multiplies function values: "The circle means feed output into input, not multiply."
- If order is assumed equal: "Run both chains separately; their intermediate values may differ."
- If symbolic substitution is partial: "The entire inner expression replaces the variable in the outer function."
- If a table chain fails: "Check whether the inner output is listed as an input for the outer function."
- If domain is ignored: "A composition must satisfy both the inner and outer function restrictions."
- If the player succeeds quickly: "You are ready for inverse functions, where compositions can undo each other."

## Tutorial Metadata
- Tutorial ID: Tut-P019
- Estimated duration: 7 minutes
- Target player state: knows function notation, formula domains, transformations, and table/graph reading
- Unlock condition: available from any Phase 019 question
- Remediation trigger: two order errors, two product-confusion errors, two missing-parentheses errors, or one repeated composition-domain error
- Advancement trigger: 80 percent accuracy on mixed numeric, symbolic, table, graph, domain, decomposition, context, and boss composition tasks

# Part IV - Socratic Dialogue Bible

## Opening Diagnostic
Tutor: "In `f(g(3))`, which function do we evaluate first?"

Expected strong answer: "`g` first, then use that output in `f`."

## Guided Discovery
Tutor sequence:

1. "What is the innermost function?"
2. "What input goes into that function?"
3. "What output does the inner function produce?"
4. "Is that output allowed as an input to the outer function?"
5. "What does the outer function do to that value?"
6. "If formulas are used, did the whole inner expression get parentheses?"
7. "Are we evaluating, simplifying, solving, or finding domain?"
8. "Does the reverse order give a different expression or value?"
9. "Are there table or graph inputs missing?"
10. "What final value, formula, domain, or interpretation answers the question?"

## Correct Branch
Player: "Evaluate `g(3)` first."

Tutor: "Good. What value does `g(3)` produce, and where does that value go next?"

If player finds the inner output, ask for the outer evaluation.

## Partial Understanding Branch
Player finds `g(3)` but stops.

Tutor: "That is the middle value, not the final output. Which function uses that value next?"

Recovery target: Player evaluates the outer function.

## Misconception Branch
Player evaluates `f(3)` first for `f(g(3))`.

Tutor: "Look at the parentheses. Is 3 inside `f` directly, or inside `g` first?"

Recovery target: Player starts with `g`.

## Product Error Branch
Player multiplies `f(2)` and `g(2)`.

Tutor: "Composition is a chain, not a product. What output does `g(2)` produce, and how can that become the input to `f`?"

Recovery target: Player computes `f(g(2))`.

## Domain Branch
Player composes formulas but ignores a square-root or denominator restriction.

Tutor: "After composing, are there any inputs that make a denominator zero or a square root negative?"

Recovery target: Player solves the domain restriction.

## Table Graph Branch
Player uses the original input in the outer table.

Tutor: "The outer function does not receive the original input unless the inner output equals it. What did the inner table or graph output?"

Recovery target: Player uses inner output as outer input.

## Unsure Branch
Player: "I do not know how to start."

Tutor: "Find the function closest to the input value. Which function name is wrapped around the original input?"

Then guide the chain one step at a time.

## Unrelated Response Branch
Player gives an unrelated answer.

Tutor: "Let's focus on the chain. In `f(g(x))`, does `g` feed into `f`, or does `f` feed into `g`?"

If unrelated again, use a two-choice prompt between `g first` and `f first`.

## Recovery Prompts
- "Which function is inside?"
- "What is the inner output?"
- "Can that output be used by the outer function?"
- "Did you use the whole inner expression?"
- "Are you composing or multiplying?"
- "Are you finding `f(g(x))` or `g(f(x))`?"
- "What domain restrictions remain after composing?"
- "Is the needed table input listed?"
- "Does the context unit match the next function's input?"

## Reflection Question
"Why is `f(g(x))` usually different from `g(f(x))`?"

Strong reflection: "The first function changes the value before the second function sees it, so changing the order changes the intermediate input."

## Transfer Question
"How does composition prepare for inverse functions?"

Expected transfer: "Inverse functions undo each other, so their compositions can return the original input."

## Escalation Rules
- If numeric order errors repeat, show Numeric Composition and Order Matters.
- If symbolic substitution errors repeat, show Formula Composition.
- If table or graph chain errors repeat, show Tables and Graphs.
- If undefined cases are missed, show Undefined Compositions.
- If domain errors repeat, show Domain of Compositions.
- If decomposition errors repeat, show Decomposition.
- If the player solves five mixed composition tasks correctly, advance to independent practice.

## Exit Condition
The Socratic sequence is complete when the player:

1. Evaluates composition inside out.
2. Simplifies symbolic composition with correct parentheses.
3. Distinguishes `f(g(x))` from `g(f(x))`.
4. Uses tables and graphs correctly.
5. Finds undefined compositions.
6. Finds domains of composed functions.
7. Interprets composition in context.

# Knowledge Graph

- Prerequisites: Phase 014 function notation; Phase 015 domain from formulas; Phase 018 function transformations; substitution; table and graph lookup; algebraic simplification
- Concepts Unlocked: function composition; order of operations for functions; symbolic composition; table and graph composition; undefined composition; composition domains; decomposition; identity composition
- Related Concepts: inverse functions; piecewise functions; transformations as input changes; rational expression restrictions; quadratic graphs; modeling chains
- Common Misconceptions: outer-first evaluation; composition as multiplication; assuming commutativity; partial substitution; ignoring domain restrictions; table input-output reversal; decomposition order reversal
- Remedial Phases: Phase 014 review; Phase 015 review; Phase 018 review; substitution mini-lesson; table lookup mini-lesson; domain restriction mini-lesson
- Follow-up Phases: Phase 020 - Inverse functions; Phase 021 - Piecewise functions; Phase 026 - Quadratic graphs; Phase 033 - Rational expression simplification
- Transfer Topics: inverse functions; chained models; transformations; composite domains; nested rules; function machines

# Validation Notes

## Structure Validation
- Includes all required Bibles and metadata sections.
- Contains exactly 20 template families, within the required 20-40 range.
- Each template includes example, answer, explanation, distractors, distractor rationale, randomization rules, validity constraints, metadata, variants, and mappings.
- Every template has six progressive hints.

## Math Validation
- T001: `g(3)=9`; `f(9)=19`.
- T002: `f(3)=7`; `g(7)=49`.
- T003: `f(g(x))=2(x-5)+3=2x-7`.
- T004: `g(f(x))=(2x+3)-5=2x-2`.
- T005: `(3x-2)^2+1=9x^2-12x+5`.
- T006: `2(x^2+4)-5=2x^2+3`.
- T007: `g(2)=4`; `f(4)=7`.
- T008: `g(3)=5`; `f(5)` missing, so undefined.
- T009: `sqrt(x-2)` requires `x >= 2`.
- T010: `1/(x-4)` requires `x != 4`.
- T011: `g(x)=1/(x-2)` requires `x != 2`; `f(g(x))=sqrt(1-1/(x-2))`; `(x-3)/(x-2)>=0` gives `(-infinity,2) union [3,infinity)`.
- T012: `f(g(x))=(2x+1)^2` for `g(x)=2x+1`, `f(u)=u^2`.
- T013: `L(3)=7`; `S(7)=750`.
- T014: `h(2)=4`; `g(4)=12`; `f(12)=14`.
- T015: `f(g(x))=2(x-3)+1=2x-5`; `2x-5=7` -> `x=6`.
- T016: `g(1)=3`; `f(3)=-2`.
- T017: `g(2)=6`; `f(6)=7`; product answer is wrong.
- T018: `f(g(2))=5`; `g(f(2))=9`.
- T019: `(x-5)+5=x`; `(x+5)-5=x`.
- T020: `g(4)=5`; `f(5)=sqrt(6)`; `f(g(x))=sqrt(2x-2)`; domain `[1,infinity)`; `g(f(4))=2sqrt(5)-3`.

## Distractor Validation
- Distractors reflect order errors, composition-as-product mistakes, incomplete evaluation, sign and expansion errors, missing table inputs, domain errors, and decomposition reversals.
- Multiple-choice-style templates have exactly one correct answer except decomposition tasks that allow equivalent valid answers.
- Undefined distractors were checked against table and domain requirements.

## Hint Validation
- Each hint sequence moves from inner function identification to outer evaluation, simplification, domain checking, or interpretation.
- Domain hints explicitly prompt checking inner and outer restrictions.

## Tutorial Validation
- Tutorial includes learning goal, why it matters, prerequisite check, core concept, numeric composition, order matters, formula composition, tables and graphs, undefined compositions, domain of compositions, decomposition, context composition, nested composition, solving composition equations, identity/undoing, common mistakes, guided practice, independent practice, mastery check, adaptive messages, and metadata.

## Socratic Validation
- Dialogue includes diagnostic, guided discovery, correct branch, partial branch, misconception branch, product error branch, domain branch, table graph branch, unsure branch, unrelated branch, recovery prompts, reflection, transfer, escalation rules, and exit condition.
- Tutor emphasizes inside-out evaluation and validity of each chain step.

## Metadata Validation
- Every template includes IDs, difficulty, timing, visual flag, compatibility flags, prerequisites, misconception tags, randomization constraints, and support-system mappings.

## Known Issues
- The repository specifications differ on the label for Hint 4. This phase uses "Guided Next Step" to match the master prompt language.
- `PHASE_TEMPLATE.md` omits Common Misconceptions from the Knowledge Graph section, but this phase includes it because the master prompt and knowledge graph guide require it.
