# Phase 015 - Domain from Formulas

## Phase Metadata
- Course: Precalculus Odyssey Bible v5
- Topic: Domain from formulas
- Subtopic: Determining allowed real inputs from algebraic function rules
- Prerequisites: Phase 007 linear inequalities, Phase 008 compound inequalities, Phase 014 function notation, factoring basics, interval notation, square-root meaning
- Related phases: Phase 016 - Domain from graphs; Phase 017 - Range from graphs; Phase 033 - Rational expression simplification; Phase 034 - Rational restrictions and holes; Phase 039 - Logarithm definitions
- Estimated phase size: 20 template families, 20 core examples, 120 progressive hints, 1 tutorial sequence, 1 Socratic dialogue system

## Learning Objectives
By the end of this phase, the player can:

1. Define domain as the set of allowed input values.
2. Recognize formulas with no real-input restrictions.
3. Exclude values that make denominators zero.
4. Require even-root radicands to be nonnegative.
5. Require even roots in denominators to be positive.
6. Combine multiple domain restrictions using intersection logic.
7. Preserve original restrictions even after algebraic simplification.
8. Write domains in inequality, set-builder, and interval notation.
9. Interpret context restrictions such as nonnegative time or length.
10. Check candidate inputs against every restriction.

## Prerequisite Review
- Division by zero is undefined.
- A square root of a real-valued formula requires the radicand to be at least 0.
- If a square root is in a denominator, the radicand must be greater than 0.
- Interval notation uses parentheses for excluded endpoints and brackets for included endpoints.
- Domain restrictions come from the original formula, not only from a simplified version.

## Core Concepts
- Start with all real numbers.
- Ask which inputs break the formula.
- Denominator rule: denominator cannot equal 0.
- Even-root rule: radicand must be nonnegative.
- Even-root denominator rule: radicand must be positive.
- Odd roots, polynomials, and absolute values usually allow all real inputs.
- When multiple restrictions occur, the domain is the overlap of all allowed sets.

## Common Misconceptions
- Saying every function has all real numbers as its domain.
- Excluding zeros from numerators.
- Allowing denominator zero after canceling a factor.
- Treating square-root radicands as strictly positive when zero is allowed.
- Allowing zero inside a square-root denominator.
- Forgetting to intersect multiple restrictions.
- Reversing inequality direction when solving a radicand inequality.
- Ignoring context restrictions like nonnegative time or length.

# Part I - Question Bible

## Template T001 - Polynomial domain
- Template ID: P015-T001
- Question Type: Domain classification
- Cognitive Skill: Recognize no algebraic restrictions
- Difficulty: 2
- Estimated Time: 35 seconds
- Visual Required: false
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: State the domain of a polynomial function.
- Example Question: Find the domain of `f(x)=3x^2-5x+1`.
- Answer: All real numbers; interval `(-infinity, infinity)`.
- Explanation: Polynomials use addition, subtraction, multiplication, and powers with whole-number exponents. None of these create division by zero or even-root restrictions.
- Distractors: `x != 0`; `x >= 0`; `x <= 1`; `[-5,3]`
- Distractor Rationale: Excludes zero for no reason; confuses polynomial with square root; invents inequality from a coefficient; uses coefficients as endpoints.
- Randomization Rules: Use polynomial formulas of degree 0 through 5.
- Validity Constraints: No denominator, even root, or context restriction should appear.
- Metadata: phase_id=P015; prerequisites=[function notation, polynomial operations]; misconception_tags=[unnecessary restriction, coefficient endpoint error, square-root overgeneralization]; randomization_constraints=[polynomial only].
- Graph/Visual Variant: Graph extends left and right without breaks.
- Modeling Variant: Abstract polynomial score rule with no stated context limit.
- Reverse Variant: Give a domain of all real numbers and ask for a polynomial example.
- Equation Battle Variant: Not primary; classification challenge.
- Multi-stage Boss Variant: Ask player to justify why no restriction applies.
- Hint Mapping: H-P015-T001
- Tutorial Mapping: Tut-P015 sections No-Restriction Formulas
- Socratic Mapping: Soc-P015 all-real branch

## Template T002 - Absolute value domain
- Template ID: P015-T002
- Question Type: Domain classification
- Cognitive Skill: Recognize absolute value has no real-input restriction
- Difficulty: 2
- Estimated Time: 35 seconds
- Visual Required: false
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: State the domain of an absolute value function.
- Example Question: Find the domain of `g(x)=|2x-7|+4`.
- Answer: All real numbers; interval `(-infinity, infinity)`.
- Explanation: Absolute value can accept any real input. The expression inside may be positive, negative, or zero.
- Distractors: `x >= 7/2`; `x <= 7/2`; `x != 7/2`; `[4, infinity)`
- Distractor Rationale: Confuses absolute value with square-root restriction; reverses that false rule; excludes the zero of the inside expression; gives range-like values.
- Randomization Rules: Use absolute value formulas with linear or polynomial inside expressions.
- Validity Constraints: No denominator or even root may be included.
- Metadata: phase_id=P015; prerequisites=[absolute value meaning, function notation]; misconception_tags=[absolute-value restriction, range-domain confusion, zero exclusion]; randomization_constraints=[absolute value only].
- Graph/Visual Variant: V-shaped graph extending all real x-values.
- Modeling Variant: Distance-from-target rule with unrestricted algebraic input.
- Reverse Variant: Create an absolute value function with all-real domain.
- Equation Battle Variant: Not primary; classification challenge.
- Multi-stage Boss Variant: Compare domain and range.
- Hint Mapping: H-P015-T002
- Tutorial Mapping: Tut-P015 sections No-Restriction Formulas
- Socratic Mapping: Soc-P015 absolute-value branch

## Template T003 - Simple rational denominator
- Template ID: P015-T003
- Question Type: Direct computation
- Cognitive Skill: Exclude one denominator zero
- Difficulty: 2
- Estimated Time: 45 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Find the domain of a rational function with denominator `x-a`.
- Example Question: Find the domain of `f(x)=5/(x-3)`.
- Answer: `x != 3`; interval `(-infinity,3) union (3,infinity)`.
- Explanation: The denominator cannot be zero. `x-3=0` when `x=3`, so exclude 3.
- Distractors: `x=3`; all real numbers; `x != -3`; `x > 3`
- Distractor Rationale: Gives excluded value as domain; ignores denominator rule; sign error; turns exclusion into one-sided interval.
- Randomization Rules: Use denominator `x-a` or `x+a`.
- Validity Constraints: Denominator must have exactly one real zero.
- Metadata: phase_id=P015; prerequisites=[one-step equations, rational expressions]; misconception_tags=[excluded-as-answer, sign error, one-sided restriction]; randomization_constraints=[single denominator zero].
- Graph/Visual Variant: Show a break or vertical asymptote at `x=3`.
- Modeling Variant: Rate formula undefined at a forbidden input.
- Reverse Variant: Create a rational function with domain excluding 3.
- Equation Battle Variant: Solve denominator equals zero, then exclude.
- Multi-stage Boss Variant: Give set-builder and interval notation.
- Hint Mapping: H-P015-T003
- Tutorial Mapping: Tut-P015 sections Denominator Restrictions
- Socratic Mapping: Soc-P015 denominator branch

## Template T004 - Linear denominator with coefficient
- Template ID: P015-T004
- Question Type: Direct computation
- Cognitive Skill: Solve a linear denominator restriction
- Difficulty: 3
- Estimated Time: 55 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Exclude the input that makes `ax+b=0`.
- Example Question: Find the domain of `h(x)=7/(2x+5)`.
- Answer: `x != -5/2`; interval `(-infinity,-5/2) union (-5/2,infinity)`.
- Explanation: Set the denominator equal to zero: `2x+5=0`, so `x=-5/2`. That input is excluded.
- Distractors: `x != 5/2`; `x > -5/2`; all real numbers; `x=-5/2`
- Distractor Rationale: Sign error; one-sided restriction; ignores denominator; gives excluded value as allowed domain.
- Randomization Rules: Use linear denominators `ax+b` with nonzero `a`.
- Validity Constraints: Excluded value may be integer or simple fraction.
- Metadata: phase_id=P015; prerequisites=[linear equations, fraction notation]; misconception_tags=[sign error, one-sided restriction, excluded-as-answer]; randomization_constraints=[linear denominator].
- Graph/Visual Variant: Mark vertical break at the excluded x-value.
- Modeling Variant: Formula with a shifted denominator.
- Reverse Variant: Build a rational function excluding `-5/2`.
- Equation Battle Variant: Set denominator to zero, solve, exclude.
- Multi-stage Boss Variant: Include exact fraction notation.
- Hint Mapping: H-P015-T004
- Tutorial Mapping: Tut-P015 sections Denominator Restrictions
- Socratic Mapping: Soc-P015 linear-denominator branch

## Template T005 - Factorable quadratic denominator
- Template ID: P015-T005
- Question Type: Direct computation
- Cognitive Skill: Factor denominator and exclude multiple zeros
- Difficulty: 3
- Estimated Time: 70 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Find all excluded values from a factorable denominator.
- Example Question: Find the domain of `p(x)=4/(x^2-9)`.
- Answer: `x != -3` and `x != 3`; interval `(-infinity,-3) union (-3,3) union (3,infinity)`.
- Explanation: Factor `x^2-9=(x-3)(x+3)`. The denominator is zero at `x=3` and `x=-3`.
- Distractors: `x != 9`; `x >= 3`; all real numbers; `x != 0`
- Distractor Rationale: Uses constant as excluded value; confuses with square-root inequality; ignores factor zeros; excludes zero for no reason.
- Randomization Rules: Use difference-of-squares or easily factorable quadratics in denominators.
- Validity Constraints: All real zeros of the denominator must be excluded.
- Metadata: phase_id=P015; prerequisites=[factoring, denominator restrictions]; misconception_tags=[factor error, square-root overgeneralization, incomplete exclusions]; randomization_constraints=[factorable denominator].
- Graph/Visual Variant: Show two breaks or vertical asymptotes.
- Modeling Variant: Formula with two forbidden balance points.
- Reverse Variant: Create a denominator excluding -3 and 3.
- Equation Battle Variant: Factor, solve each factor equals zero, exclude.
- Multi-stage Boss Variant: Include interval notation across three pieces.
- Hint Mapping: H-P015-T005
- Tutorial Mapping: Tut-P015 sections Factored Denominators
- Socratic Mapping: Soc-P015 factored-denominator branch

## Template T006 - Denominator with no real zero
- Template ID: P015-T006
- Question Type: Domain classification
- Cognitive Skill: Recognize when a denominator is never zero
- Difficulty: 3
- Estimated Time: 55 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Determine that some rational denominators create no real restrictions.
- Example Question: Find the domain of `q(x)=1/(x^2+4)`.
- Answer: All real numbers; interval `(-infinity, infinity)`.
- Explanation: `x^2` is always at least 0, so `x^2+4` is always at least 4. The denominator never equals 0.
- Distractors: `x != 2`; `x != -2`; `x != -4`; no real numbers.
- Distractor Rationale: Solves as if `x^2=4`; sign error; excludes constant; overreacts to denominator.
- Randomization Rules: Use denominators like `x^2+a` with positive `a`.
- Validity Constraints: Denominator must have no real zeros.
- Metadata: phase_id=P015; prerequisites=[squares nonnegative, rational expressions]; misconception_tags=[imaginary root confusion, unnecessary restriction, denominator overgeneralization]; randomization_constraints=[always-positive denominator].
- Graph/Visual Variant: Graph has no vertical break from denominator zeros.
- Modeling Variant: Stable denominator formula always defined.
- Reverse Variant: Create a rational function with denominator never zero.
- Equation Battle Variant: Analyze denominator minimum.
- Multi-stage Boss Variant: Explain why the denominator cannot be zero.
- Hint Mapping: H-P015-T006
- Tutorial Mapping: Tut-P015 sections Denominators That Never Vanish
- Socratic Mapping: Soc-P015 never-zero branch

## Template T007 - Square root lower bound
- Template ID: P015-T007
- Question Type: Direct computation
- Cognitive Skill: Solve radicand nonnegative inequality
- Difficulty: 2
- Estimated Time: 45 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Find the domain of `sqrt(x-a)`.
- Example Question: Find the domain of `f(x)=sqrt(x-5)`.
- Answer: `x >= 5`; interval `[5,infinity)`.
- Explanation: The radicand must be nonnegative: `x-5 >= 0`, so `x >= 5`.
- Distractors: `x > 5`; `x <= 5`; `x != 5`; all real numbers.
- Distractor Rationale: Excludes allowed endpoint; reverses inequality; treats as denominator restriction; ignores square-root rule.
- Randomization Rules: Use `sqrt(x-a)` or `sqrt(x+a)`.
- Validity Constraints: Endpoint must be included because square root of 0 is defined.
- Metadata: phase_id=P015; prerequisites=[linear inequalities, square roots]; misconception_tags=[endpoint error, inequality reversal, zero exclusion]; randomization_constraints=[linear radicand].
- Graph/Visual Variant: Graph begins at x=5 and continues right.
- Modeling Variant: Distance or length formula starting at a threshold.
- Reverse Variant: Create a square-root function with domain `[5,infinity)`.
- Equation Battle Variant: Set radicand `>=0`, solve.
- Multi-stage Boss Variant: Include interval and set-builder notation.
- Hint Mapping: H-P015-T007
- Tutorial Mapping: Tut-P015 sections Square-Root Restrictions
- Socratic Mapping: Soc-P015 square-root branch

## Template T008 - Square root upper bound
- Template ID: P015-T008
- Question Type: Direct computation
- Cognitive Skill: Solve radicand inequality with negative x coefficient
- Difficulty: 3
- Estimated Time: 55 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Find the domain of `sqrt(a-x)`.
- Example Question: Find the domain of `g(x)=sqrt(7-x)`.
- Answer: `x <= 7`; interval `(-infinity,7]`.
- Explanation: Require `7-x >= 0`. Subtract 7: `-x >= -7`. Divide by `-1` and flip: `x <= 7`.
- Distractors: `x >= 7`; `x < 7`; `x != 7`; all real numbers.
- Distractor Rationale: Forgets to flip inequality; excludes endpoint; treats as denominator restriction; ignores square-root rule.
- Randomization Rules: Use radicands `a-x` or `b-ax`.
- Validity Constraints: Inequality solving must include sign flip when needed.
- Metadata: phase_id=P015; prerequisites=[linear inequalities, flip rule]; misconception_tags=[flip rule error, endpoint error, denominator confusion]; randomization_constraints=[negative x coefficient].
- Graph/Visual Variant: Graph begins at x=7 and extends left.
- Modeling Variant: Remaining capacity under a maximum.
- Reverse Variant: Create a square-root function with domain `(-infinity,7]`.
- Equation Battle Variant: Set radicand `>=0`, solve with flip.
- Multi-stage Boss Variant: Ask why endpoint is included.
- Hint Mapping: H-P015-T008
- Tutorial Mapping: Tut-P015 sections Square-Root Restrictions
- Socratic Mapping: Soc-P015 negative-radicand branch

## Template T009 - Linear radicand with coefficient
- Template ID: P015-T009
- Question Type: Direct computation
- Cognitive Skill: Solve `ax+b >= 0`
- Difficulty: 3
- Estimated Time: 60 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Find the domain of a square root with linear radicand.
- Example Question: Find the domain of `h(x)=sqrt(2x+6)`.
- Answer: `x >= -3`; interval `[-3,infinity)`.
- Explanation: Require `2x+6 >= 0`. Then `2x >= -6`, so `x >= -3`.
- Distractors: `x > -3`; `x <= -3`; `x != -3`; `x >= 3`
- Distractor Rationale: Endpoint error; inequality reversal; denominator-style exclusion; sign error.
- Randomization Rules: Use `sqrt(ax+b)` with nonzero integer `a`.
- Validity Constraints: Endpoint should be integer or simple fraction.
- Metadata: phase_id=P015; prerequisites=[linear inequalities, square roots]; misconception_tags=[endpoint error, sign error, inequality reversal]; randomization_constraints=[linear radicand].
- Graph/Visual Variant: Graph starts at the boundary.
- Modeling Variant: Threshold model with scaled input.
- Reverse Variant: Create a square-root function with domain `[-3,infinity)`.
- Equation Battle Variant: Set radicand `>=0`, solve.
- Multi-stage Boss Variant: Include endpoint test.
- Hint Mapping: H-P015-T009
- Tutorial Mapping: Tut-P015 sections Square-Root Restrictions
- Socratic Mapping: Soc-P015 linear-radicand branch

## Template T010 - Quadratic radicand outside interval
- Template ID: P015-T010
- Question Type: Direct computation
- Cognitive Skill: Solve a quadratic inequality for square-root domain
- Difficulty: 4
- Estimated Time: 95 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Find domain of `sqrt(x^2-a^2)`.
- Example Question: Find the domain of `f(x)=sqrt(x^2-9)`.
- Answer: `x <= -3 or x >= 3`; interval `(-infinity,-3] union [3,infinity)`.
- Explanation: Require `x^2-9 >= 0`. Factor: `(x-3)(x+3) >= 0`. The product is nonnegative outside the roots -3 and 3.
- Distractors: `-3 <= x <= 3`; `x != -3,3`; `x >= 3`; all real numbers.
- Distractor Rationale: Uses inside interval; denominator-style exclusion; misses left branch; ignores square-root rule.
- Randomization Rules: Use `sqrt(x^2-a^2)` with positive integer `a`.
- Validity Constraints: Include endpoints because radicand may equal 0.
- Metadata: phase_id=P015; prerequisites=[factoring, compound inequalities]; misconception_tags=[inside-outside confusion, endpoint error, one-branch answer]; randomization_constraints=[difference of squares radicand].
- Graph/Visual Variant: Number line test intervals.
- Modeling Variant: Distance comparison requiring magnitude at least a threshold.
- Reverse Variant: Create a radical function with outside-domain intervals.
- Equation Battle Variant: Factor, test intervals, include endpoints.
- Multi-stage Boss Variant: Use number-line sign chart.
- Hint Mapping: H-P015-T010
- Tutorial Mapping: Tut-P015 sections Quadratic Radicands
- Socratic Mapping: Soc-P015 quadratic-radicand branch

## Template T011 - Square root in denominator
- Template ID: P015-T011
- Question Type: Direct computation
- Cognitive Skill: Require radicand to be strictly positive
- Difficulty: 3
- Estimated Time: 60 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Find the domain when a square root is in a denominator.
- Example Question: Find the domain of `g(x)=1/sqrt(x-2)`.
- Answer: `x > 2`; interval `(2,infinity)`.
- Explanation: The denominator cannot be zero, and the square root must be real. `sqrt(x-2)` is in the denominator, so require `x-2 > 0`.
- Distractors: `x >= 2`; `x != 2`; `x < 2`; all real numbers.
- Distractor Rationale: Allows zero denominator; gives only denominator exclusion without square-root interval; reverses inequality; ignores both restrictions.
- Randomization Rules: Use `1/sqrt(ax+b)` with simple linear radicand.
- Validity Constraints: Boundary must be excluded.
- Metadata: phase_id=P015; prerequisites=[square-root restriction, denominator restriction]; misconception_tags=[strict-vs-nonstrict error, denominator zero, inequality reversal]; randomization_constraints=[root in denominator].
- Graph/Visual Variant: Open endpoint at x=2.
- Modeling Variant: Formula undefined at and below a threshold.
- Reverse Variant: Create a formula with domain `(2,infinity)`.
- Equation Battle Variant: Set radicand `>0`, solve.
- Multi-stage Boss Variant: Ask why endpoint is excluded here but included in numerator roots.
- Hint Mapping: H-P015-T011
- Tutorial Mapping: Tut-P015 sections Roots in Denominators
- Socratic Mapping: Soc-P015 root-denominator branch

## Template T012 - Radical over rational denominator
- Template ID: P015-T012
- Question Type: Combined restrictions
- Cognitive Skill: Intersect square-root and denominator restrictions
- Difficulty: 4
- Estimated Time: 90 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Combine a numerator square-root restriction with a denominator exclusion.
- Example Question: Find the domain of `p(x)=sqrt(x+1)/(x-3)`.
- Answer: `x >= -1` and `x != 3`; interval `[-1,3) union (3,infinity)`.
- Explanation: The square root requires `x+1 >= 0`, so `x >= -1`. The denominator requires `x-3 != 0`, so `x != 3`. Combine both restrictions.
- Distractors: `x >= -1`; `x != 3`; `(-infinity,-1] union [3,infinity)`; all real numbers.
- Distractor Rationale: Misses denominator restriction; misses radical restriction; uses outside instead of overlap; ignores both restrictions.
- Randomization Rules: Use one square-root numerator and one linear denominator.
- Validity Constraints: The excluded denominator value should lie within the radical-allowed region for this family.
- Metadata: phase_id=P015; prerequisites=[compound restrictions, interval notation]; misconception_tags=[missed restriction, union-vs-intersection, endpoint error]; randomization_constraints=[combined radical and rational].
- Graph/Visual Variant: Number line with shaded radical domain and removed denominator point.
- Modeling Variant: Formula with threshold and forbidden calibration value.
- Reverse Variant: Create a formula with domain `[-1,3) union (3,infinity)`.
- Equation Battle Variant: Build both restrictions, intersect.
- Multi-stage Boss Variant: Ask for set-builder and interval notation.
- Hint Mapping: H-P015-T012
- Tutorial Mapping: Tut-P015 sections Combining Restrictions
- Socratic Mapping: Soc-P015 combined branch

## Template T013 - Simplified rational expression keeps original restriction
- Template ID: P015-T013
- Question Type: Conceptual computation
- Cognitive Skill: Preserve original denominator restrictions after cancellation
- Difficulty: 4
- Estimated Time: 80 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Identify domain restrictions from the original formula.
- Example Question: Find the domain of `r(x)=(x^2-9)/(x-3)`.
- Answer: `x != 3`; interval `(-infinity,3) union (3,infinity)`.
- Explanation: The formula simplifies to `x+3` for `x != 3`, but the original denominator is zero at `x=3`. That input remains excluded.
- Distractors: all real numbers; `x != -3`; `x != -3 and x != 3`; `x=3`
- Distractor Rationale: Uses simplified expression only; excludes numerator zero; excludes both numerator zeros incorrectly; gives excluded input as domain.
- Randomization Rules: Use rational expressions with a canceling factor.
- Validity Constraints: Domain must be based on the original denominator.
- Metadata: phase_id=P015; prerequisites=[factoring, rational simplification]; misconception_tags=[lost restriction, numerator-zero confusion, hole confusion]; randomization_constraints=[canceling denominator factor].
- Graph/Visual Variant: Show a hole at the excluded x-value.
- Modeling Variant: Simplified formula with an impossible original input.
- Reverse Variant: Create a rational expression that simplifies but excludes 3.
- Equation Battle Variant: Find original denominator zero before canceling.
- Multi-stage Boss Variant: Simplify and state domain separately.
- Hint Mapping: H-P015-T013
- Tutorial Mapping: Tut-P015 sections Original Formula Restrictions
- Socratic Mapping: Soc-P015 simplified branch

## Template T014 - Product denominator restrictions
- Template ID: P015-T014
- Question Type: Direct computation
- Cognitive Skill: Exclude zeros from each factor in a product denominator
- Difficulty: 3
- Estimated Time: 65 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Find domain restrictions from product denominator factors.
- Example Question: Find the domain of `s(x)=8/(x(x+2))`.
- Answer: `x != 0` and `x != -2`; interval `(-infinity,-2) union (-2,0) union (0,infinity)`.
- Explanation: A product is zero if any factor is zero. `x=0` or `x+2=0` makes the denominator zero.
- Distractors: `x != 2`; `x > 0`; all real numbers; `x != -2` only.
- Distractor Rationale: Sign error; one-sided restriction; ignores denominator; misses one factor.
- Randomization Rules: Use factored denominators with two or three linear factors.
- Validity Constraints: List every factor zero.
- Metadata: phase_id=P015; prerequisites=[zero product property, interval notation]; misconception_tags=[missed factor, sign error, one-sided restriction]; randomization_constraints=[product denominator].
- Graph/Visual Variant: Number line with excluded points.
- Modeling Variant: Formula with two forbidden states.
- Reverse Variant: Build a denominator excluding 0 and -2.
- Equation Battle Variant: Set each factor not equal to zero.
- Multi-stage Boss Variant: Include three-interval notation.
- Hint Mapping: H-P015-T014
- Tutorial Mapping: Tut-P015 sections Factored Denominators
- Socratic Mapping: Soc-P015 product-denominator branch

## Template T015 - Common factor cancellation and hole restriction
- Template ID: P015-T015
- Question Type: Error-resistant computation
- Cognitive Skill: Identify all original denominator restrictions before simplification
- Difficulty: 4
- Estimated Time: 85 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Preserve all original restrictions in a rational expression with canceling factors.
- Example Question: Find the domain of `t(x)=((x-1)(x+4))/((x-1)(x-5))`.
- Answer: `x != 1` and `x != 5`; interval `(-infinity,1) union (1,5) union (5,infinity)`.
- Explanation: The original denominator has factors `(x-1)` and `(x-5)`. Even though `(x-1)` cancels, `x=1` still made the original denominator zero. Also exclude `x=5`.
- Distractors: `x != 5` only; `x != 1` only; all real numbers; `x != -4`
- Distractor Rationale: Loses canceled restriction; misses remaining denominator restriction; uses simplified form only; excludes numerator zero.
- Randomization Rules: Use rational expressions with one canceling denominator factor and one remaining denominator factor.
- Validity Constraints: Both original denominator zeros must be excluded.
- Metadata: phase_id=P015; prerequisites=[factoring, rational simplification, restrictions]; misconception_tags=[lost canceled restriction, numerator-zero confusion, incomplete restrictions]; randomization_constraints=[common factor].
- Graph/Visual Variant: Show a hole at x=1 and asymptote or break at x=5.
- Modeling Variant: Formula simplification with two impossible original inputs.
- Reverse Variant: Create a rational expression excluding 1 and 5 after simplification.
- Equation Battle Variant: Record restrictions first, then simplify.
- Multi-stage Boss Variant: Require "before simplification" checkpoint.
- Hint Mapping: H-P015-T015
- Tutorial Mapping: Tut-P015 sections Original Formula Restrictions
- Socratic Mapping: Soc-P015 hole branch

## Template T016 - Cube root domain
- Template ID: P015-T016
- Question Type: Domain classification
- Cognitive Skill: Recognize odd roots allow all real radicands
- Difficulty: 3
- Estimated Time: 45 seconds
- Visual Required: false
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: State the domain of a cube-root function.
- Example Question: Find the domain of `u(x)=cuberoot(x-4)`.
- Answer: All real numbers; interval `(-infinity, infinity)`.
- Explanation: Cube roots are defined for negative, zero, and positive radicands. Odd roots do not require the radicand to be nonnegative.
- Distractors: `x >= 4`; `x > 4`; `x != 4`; `x <= 4`
- Distractor Rationale: Applies square-root rule to cube root; excludes endpoint incorrectly; treats as denominator; reverses false restriction.
- Randomization Rules: Use odd-root expressions with linear radicands.
- Validity Constraints: No denominator or even root should be present.
- Metadata: phase_id=P015; prerequisites=[odd roots, real numbers]; misconception_tags=[square-root overgeneralization, endpoint error, denominator confusion]; randomization_constraints=[odd root].
- Graph/Visual Variant: Cube-root graph extends left and right.
- Modeling Variant: Signed volume-to-side transformation.
- Reverse Variant: Create an odd-root function with all-real domain.
- Equation Battle Variant: Not primary; classification challenge.
- Multi-stage Boss Variant: Compare square-root and cube-root domains.
- Hint Mapping: H-P015-T016
- Tutorial Mapping: Tut-P015 sections Odd Roots
- Socratic Mapping: Soc-P015 odd-root branch

## Template T017 - Combined radical and rational restrictions
- Template ID: P015-T017
- Question Type: Combined restrictions
- Cognitive Skill: Intersect radical domain with denominator exclusions
- Difficulty: 5
- Estimated Time: 110 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Combine a square-root restriction and a rational denominator with multiple zeros.
- Example Question: Find the domain of `v(x)=sqrt(x+1)/(x^2-4)`.
- Answer: `x >= -1` and `x != 2`; interval `[-1,2) union (2,infinity)`.
- Explanation: The square root requires `x+1 >= 0`, so `x >= -1`. The denominator zeros are `x=-2` and `x=2`, but `x=-2` is already outside `x >= -1`. Exclude `x=2`.
- Distractors: `x >= -1`; `x != -2 and x != 2`; `(-infinity,-2) union (-2,2) union (2,infinity)`; all real numbers.
- Distractor Rationale: Misses denominator restriction; lists denominator restriction without intersecting with radical domain; ignores radical restriction; ignores both restrictions.
- Randomization Rules: Use one radical restriction and one denominator with zeros, at least one outside the radical-allowed region.
- Validity Constraints: Final interval must represent the intersection of all restrictions.
- Metadata: phase_id=P015; prerequisites=[compound inequalities, factoring, interval intersection]; misconception_tags=[missed restriction, no intersection, denominator-only answer]; randomization_constraints=[combined restrictions].
- Graph/Visual Variant: Layer two number-line restrictions and show overlap.
- Modeling Variant: Formula with threshold and forbidden state.
- Reverse Variant: Create a formula with domain `[-1,2) union (2,infinity)`.
- Equation Battle Variant: Solve radical restriction, solve denominator zeros, intersect.
- Multi-stage Boss Variant: Require a restriction table before final interval.
- Hint Mapping: H-P015-T017
- Tutorial Mapping: Tut-P015 sections Combining Restrictions
- Socratic Mapping: Soc-P015 combined-advanced branch

## Template T018 - Context domain restriction
- Template ID: P015-T018
- Question Type: Modeling interpretation
- Cognitive Skill: Apply practical input restrictions
- Difficulty: 3
- Estimated Time: 60 seconds
- Visual Required: false
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Determine domain from a formula plus real-world meaning.
- Example Question: The area of a square with side length `s` is `A(s)=s^2`. In context, what is the domain?
- Answer: `s >= 0`; interval `[0,infinity)`.
- Explanation: Algebraically, `s^2` accepts all real inputs. In context, side length cannot be negative, so only nonnegative inputs make sense.
- Distractors: all real numbers; `s > 0`; `s != 0`; `A >= 0`
- Distractor Rationale: Ignores context; excludes possible zero side length unless context says positive; treats as denominator restriction; gives range instead of domain.
- Randomization Rules: Use length, time, count, or distance contexts.
- Validity Constraints: State whether zero is meaningful in the context.
- Metadata: phase_id=P015; prerequisites=[function notation, units, inequalities]; misconception_tags=[ignores context, strict endpoint error, range-domain confusion]; randomization_constraints=[context domain].
- Graph/Visual Variant: Graph only the context-valid portion.
- Modeling Variant: This template is the modeling variant.
- Reverse Variant: Given domain `[0,infinity)`, create a length or time context.
- Equation Battle Variant: Not primary; interpretation challenge.
- Multi-stage Boss Variant: Compare algebraic domain and context domain.
- Hint Mapping: H-P015-T018
- Tutorial Mapping: Tut-P015 sections Context Domains
- Socratic Mapping: Soc-P015 context branch

## Template T019 - Error analysis: canceled restriction lost
- Template ID: P015-T019
- Question Type: Error analysis
- Cognitive Skill: Diagnose domain error after simplification
- Difficulty: 4
- Estimated Time: 85 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Correct a domain mistake caused by simplifying too early.
- Example Question: A student simplifies `(x^2-4)/(x-2)` to `x+2` and says the domain is all real numbers. What is the mistake and correct domain?
- Answer: The original denominator is zero at `x=2`, so `x=2` is excluded. Domain: `x != 2`.
- Explanation: The expression equals `x+2` only for inputs where the original expression is defined. Since `x-2=0` at `x=2`, that input remains forbidden.
- Distractors: all real numbers; `x != -2`; `x != -2 and x != 2`; `x > 2`
- Distractor Rationale: Repeats the student's mistake; excludes numerator zero; excludes numerator and denominator zeros; turns exclusion into one-sided interval.
- Randomization Rules: Present a simplification that cancels a denominator factor.
- Validity Constraints: The original denominator restriction must be clear.
- Metadata: phase_id=P015; prerequisites=[factoring, rational simplification]; misconception_tags=[lost restriction, numerator-zero confusion, one-sided restriction]; randomization_constraints=[canceled factor].
- Graph/Visual Variant: Show a hole at x=2 on the simplified line.
- Modeling Variant: Simplified formula still impossible at original input.
- Reverse Variant: Create an incorrect student claim to fix.
- Equation Battle Variant: Restriction-first card before canceling.
- Multi-stage Boss Variant: Identify mistake, correct domain, explain hole.
- Hint Mapping: H-P015-T019
- Tutorial Mapping: Tut-P015 sections Common Mistakes
- Socratic Mapping: Soc-P015 error branch

## Template T020 - Boss domain challenge
- Template ID: P015-T020
- Question Type: Multi-stage boss
- Cognitive Skill: Combine radical and denominator restrictions with interval notation
- Difficulty: 5
- Estimated Time: 140 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Complete a full domain analysis from a mixed formula.
- Example Question: Boss Gate: Find the domain of `F(x)=sqrt(2x-6)/(x^2-16)`.
- Answer: `x >= 3` and `x != 4`; interval `[3,4) union (4,infinity)`.
- Explanation: The square root requires `2x-6 >= 0`, so `x >= 3`. The denominator factors as `(x-4)(x+4)`, so denominator zeros are `x=4` and `x=-4`. The radical restriction already excludes `-4`; exclude `4` from `x >= 3`.
- Distractors: `[3,infinity)`; `x != -4 and x != 4`; `(-infinity,-4) union (-4,4) union (4,infinity)`; `[3,4] union [4,infinity)`
- Distractor Rationale: Misses denominator restriction; misses radical restriction; uses denominator-only restriction; includes the forbidden value 4.
- Randomization Rules: Use one linear square-root radicand and one factorable denominator with one zero inside the radical domain.
- Validity Constraints: Final domain must be an intersection and must exclude denominator zeros.
- Metadata: phase_id=P015; prerequisites=[linear inequalities, factoring, interval notation, combined restrictions]; misconception_tags=[missed restriction, no intersection, endpoint error, denominator-zero error]; randomization_constraints=[mixed radical rational].
- Graph/Visual Variant: Number-line boss lane with layered restrictions.
- Modeling Variant: Advanced formula with threshold and forbidden calibration.
- Reverse Variant: Build a formula with domain `[3,4) union (4,infinity)`.
- Equation Battle Variant: Solve radicand, factor denominator, remove forbidden point, write interval.
- Multi-stage Boss Variant: This is the phase boss template.
- Hint Mapping: H-P015-T020
- Tutorial Mapping: Tut-P015 sections Full Phase Review
- Socratic Mapping: Soc-P015 boss branch

# Part II - Hint Bible

## H-P015-T001
- Hint 1 - Gentle Nudge: Look for denominators or even roots.
- Hint 2 - Concept Reminder: Polynomials do not create those restrictions.
- Hint 3 - Focus Hint: `3x^2-5x+1` is a polynomial.
- Hint 4 - Guided Next Step: No input makes the formula undefined.
- Hint 5 - Nearly Complete: The domain is every real input.
- Hint 6 - Full Solution: `(-infinity, infinity)`.

## H-P015-T002
- Hint 1 - Gentle Nudge: Absolute value accepts negative, zero, and positive inputs.
- Hint 2 - Concept Reminder: Only denominators and even roots usually restrict algebraic domains here.
- Hint 3 - Focus Hint: `|2x-7|+4` has no denominator or square root.
- Hint 4 - Guided Next Step: Do not restrict `2x-7` to be positive.
- Hint 5 - Nearly Complete: Every real x-value is allowed.
- Hint 6 - Full Solution: `(-infinity, infinity)`.

## H-P015-T003
- Hint 1 - Gentle Nudge: The denominator cannot be zero.
- Hint 2 - Concept Reminder: Set `x-3=0` to find the forbidden input.
- Hint 3 - Focus Hint: `x=3`.
- Hint 4 - Guided Next Step: Exclude 3, not include only 3.
- Hint 5 - Nearly Complete: Use two intervals around 3.
- Hint 6 - Full Solution: `x != 3`; `(-infinity,3) union (3,infinity)`.

## H-P015-T004
- Hint 1 - Gentle Nudge: Focus on the denominator.
- Hint 2 - Concept Reminder: Solve `2x+5=0`.
- Hint 3 - Focus Hint: `2x=-5`.
- Hint 4 - Guided Next Step: `x=-5/2`.
- Hint 5 - Nearly Complete: That value is excluded.
- Hint 6 - Full Solution: `x != -5/2`; `(-infinity,-5/2) union (-5/2,infinity)`.

## H-P015-T005
- Hint 1 - Gentle Nudge: Factor the denominator.
- Hint 2 - Concept Reminder: `x^2-9` is a difference of squares.
- Hint 3 - Focus Hint: `x^2-9=(x-3)(x+3)`.
- Hint 4 - Guided Next Step: Exclude values that make either factor zero.
- Hint 5 - Nearly Complete: Exclude `x=3` and `x=-3`.
- Hint 6 - Full Solution: `(-infinity,-3) union (-3,3) union (3,infinity)`.

## H-P015-T006
- Hint 1 - Gentle Nudge: A denominator matters only if it can become zero.
- Hint 2 - Concept Reminder: `x^2` is always at least 0.
- Hint 3 - Focus Hint: `x^2+4` is always at least 4.
- Hint 4 - Guided Next Step: It never equals zero.
- Hint 5 - Nearly Complete: No denominator value must be excluded.
- Hint 6 - Full Solution: `(-infinity, infinity)`.

## H-P015-T007
- Hint 1 - Gentle Nudge: Square-root radicands must be nonnegative.
- Hint 2 - Concept Reminder: Set `x-5 >= 0`.
- Hint 3 - Focus Hint: Add 5 to both sides.
- Hint 4 - Guided Next Step: `x >= 5`.
- Hint 5 - Nearly Complete: Include 5 because `sqrt(0)` is defined.
- Hint 6 - Full Solution: `[5,infinity)`.

## H-P015-T008
- Hint 1 - Gentle Nudge: Require the radicand to be at least 0.
- Hint 2 - Concept Reminder: Start with `7-x >= 0`.
- Hint 3 - Focus Hint: `-x >= -7`.
- Hint 4 - Guided Next Step: Divide by `-1` and flip the inequality.
- Hint 5 - Nearly Complete: `x <= 7`.
- Hint 6 - Full Solution: `(-infinity,7]`.

## H-P015-T009
- Hint 1 - Gentle Nudge: The expression under the square root must be nonnegative.
- Hint 2 - Concept Reminder: `2x+6 >= 0`.
- Hint 3 - Focus Hint: Subtract 6 to get `2x >= -6`.
- Hint 4 - Guided Next Step: Divide by 2.
- Hint 5 - Nearly Complete: Include the endpoint.
- Hint 6 - Full Solution: `x >= -3`; `[-3,infinity)`.

## H-P015-T010
- Hint 1 - Gentle Nudge: Solve where the radicand is nonnegative.
- Hint 2 - Concept Reminder: `x^2-9 >= 0`.
- Hint 3 - Focus Hint: Factor as `(x-3)(x+3) >= 0`.
- Hint 4 - Guided Next Step: Test intervals split by -3 and 3.
- Hint 5 - Nearly Complete: The product is nonnegative outside the roots.
- Hint 6 - Full Solution: `(-infinity,-3] union [3,infinity)`.

## H-P015-T011
- Hint 1 - Gentle Nudge: The square root is in the denominator.
- Hint 2 - Concept Reminder: The radicand must be positive, not just nonnegative.
- Hint 3 - Focus Hint: Set `x-2 > 0`.
- Hint 4 - Guided Next Step: Add 2.
- Hint 5 - Nearly Complete: The endpoint 2 is excluded.
- Hint 6 - Full Solution: `(2,infinity)`.

## H-P015-T012
- Hint 1 - Gentle Nudge: There are two restrictions.
- Hint 2 - Concept Reminder: Square root needs `x+1 >= 0`.
- Hint 3 - Focus Hint: Denominator needs `x-3 != 0`.
- Hint 4 - Guided Next Step: Combine `x >= -1` with `x != 3`.
- Hint 5 - Nearly Complete: Start at -1, but remove 3.
- Hint 6 - Full Solution: `[-1,3) union (3,infinity)`.

## H-P015-T013
- Hint 1 - Gentle Nudge: Domain comes from the original formula.
- Hint 2 - Concept Reminder: Check the denominator before canceling.
- Hint 3 - Focus Hint: `x-3=0` at `x=3`.
- Hint 4 - Guided Next Step: Even if the expression simplifies, `x=3` was not allowed originally.
- Hint 5 - Nearly Complete: Exclude 3 only.
- Hint 6 - Full Solution: `(-infinity,3) union (3,infinity)`.

## H-P015-T014
- Hint 1 - Gentle Nudge: A product denominator is zero if any factor is zero.
- Hint 2 - Concept Reminder: Check `x=0` and `x+2=0`.
- Hint 3 - Focus Hint: The forbidden values are 0 and -2.
- Hint 4 - Guided Next Step: Split the number line at -2 and 0.
- Hint 5 - Nearly Complete: Use open intervals at both excluded points.
- Hint 6 - Full Solution: `(-infinity,-2) union (-2,0) union (0,infinity)`.

## H-P015-T015
- Hint 1 - Gentle Nudge: Record restrictions before canceling.
- Hint 2 - Concept Reminder: The original denominator is `(x-1)(x-5)`.
- Hint 3 - Focus Hint: Exclude `x=1` and `x=5`.
- Hint 4 - Guided Next Step: Canceling `(x-1)` does not allow `x=1`.
- Hint 5 - Nearly Complete: Write three intervals split at 1 and 5.
- Hint 6 - Full Solution: `(-infinity,1) union (1,5) union (5,infinity)`.

## H-P015-T016
- Hint 1 - Gentle Nudge: This is a cube root, not a square root.
- Hint 2 - Concept Reminder: Odd roots allow negative radicands.
- Hint 3 - Focus Hint: `cuberoot(x-4)` works for any real `x`.
- Hint 4 - Guided Next Step: No denominator appears.
- Hint 5 - Nearly Complete: No restriction is needed.
- Hint 6 - Full Solution: `(-infinity, infinity)`.

## H-P015-T017
- Hint 1 - Gentle Nudge: Combine the square-root and denominator rules.
- Hint 2 - Concept Reminder: `sqrt(x+1)` requires `x >= -1`.
- Hint 3 - Focus Hint: `x^2-4=(x-2)(x+2)`, so denominator zeros are -2 and 2.
- Hint 4 - Guided Next Step: Since `x=-2` is already outside `x >= -1`, only remove 2.
- Hint 5 - Nearly Complete: Start at -1 and split around 2.
- Hint 6 - Full Solution: `[-1,2) union (2,infinity)`.

## H-P015-T018
- Hint 1 - Gentle Nudge: Algebra is not the only issue; context matters.
- Hint 2 - Concept Reminder: A side length cannot be negative.
- Hint 3 - Focus Hint: Zero side length is allowed unless the context says strictly positive.
- Hint 4 - Guided Next Step: Use `s >= 0`.
- Hint 5 - Nearly Complete: Write the interval with a bracket at 0.
- Hint 6 - Full Solution: `[0,infinity)`.

## H-P015-T019
- Hint 1 - Gentle Nudge: Check the original denominator.
- Hint 2 - Concept Reminder: `x-2` was in the denominator.
- Hint 3 - Focus Hint: `x-2=0` at `x=2`.
- Hint 4 - Guided Next Step: Canceling does not make `x=2` legal.
- Hint 5 - Nearly Complete: The student's all-real domain is too broad.
- Hint 6 - Full Solution: Mistake: lost original restriction. Domain: `x != 2`.

## H-P015-T020
- Hint 1 - Gentle Nudge: Make a list of restrictions.
- Hint 2 - Concept Reminder: Square root requires `2x-6 >= 0`.
- Hint 3 - Focus Hint: That gives `x >= 3`.
- Hint 4 - Guided Next Step: Factor denominator: `x^2-16=(x-4)(x+4)`.
- Hint 5 - Nearly Complete: Exclude `x=4`; `x=-4` is already outside `x >= 3`.
- Hint 6 - Full Solution: `[3,4) union (4,infinity)`.

# Part III - Tutorial Bible

## Learning Goal
Learn to find the domain of a function from its formula by identifying which real inputs are allowed and which inputs break the rule.

## Why It Matters
Domain is the set of legal inputs. In a game, it prevents impossible moves. In math, it prevents division by zero, square roots of negative values, and context errors such as negative lengths. Later graph, range, rational, radical, logarithmic, and inverse-function work depends on reading domains correctly.

## Prerequisite Check
Ask the player:

1. Why is `1/0` undefined? Expected: division by zero is not allowed.
2. Is `sqrt(0)` defined? Expected: yes.
3. Is `sqrt(-4)` real? Expected: no.
4. Solve `x-3=0`. Expected: `x=3`.
5. Solve `x-5 >= 0`. Expected: `x >= 5`.

## Core Concept
Start with all real numbers. Then remove or restrict inputs that make the formula impossible.

Main restrictions:

1. Denominators cannot be zero.
2. Even-root radicands must be nonnegative.
3. Even roots in denominators must be positive.
4. Context may restrict inputs beyond algebra.

## No-Restriction Formulas
Polynomials and absolute value expressions usually have all real numbers as their algebraic domain.

Examples:

`f(x)=3x^2-5x+1`

Domain: `(-infinity, infinity)`.

`g(x)=|2x-7|+4`

Domain: `(-infinity, infinity)`.

## Denominator Restrictions
For rational formulas, set the denominator not equal to zero.

Example:

`f(x)=5/(x-3)`

Denominator: `x-3`

Forbidden: `x-3=0`, so `x=3`

Domain: `(-infinity,3) union (3,infinity)`.

## Factored Denominators
If the denominator factors, exclude every zero of every factor.

Example:

`4/(x^2-9)`

`x^2-9=(x-3)(x+3)`

Exclude `x=3` and `x=-3`.

## Denominators That Never Vanish
Some denominators are never zero for real inputs.

Example:

`1/(x^2+4)`

Since `x^2 >= 0`, `x^2+4 >= 4`. The denominator never equals zero.

Domain: all real numbers.

## Square-Root Restrictions
For square roots, require the radicand to be nonnegative.

Example:

`sqrt(x-5)`

`x-5 >= 0`

`x >= 5`

Domain: `[5,infinity)`.

For `sqrt(7-x)`:

`7-x >= 0`

`x <= 7`

Domain: `(-infinity,7]`.

## Roots in Denominators
If a square root is in the denominator, the radicand must be positive.

Example:

`1/sqrt(x-2)`

Need `x-2 > 0`.

Domain: `(2,infinity)`.

The endpoint is excluded because it makes the denominator zero.

## Quadratic Radicands
For `sqrt(x^2-9)`, require:

`x^2-9 >= 0`

`(x-3)(x+3) >= 0`

The product is nonnegative outside the roots.

Domain: `(-infinity,-3] union [3,infinity)`.

## Odd Roots
Odd roots, such as cube roots, allow negative radicands.

`cuberoot(x-4)` has domain `(-infinity, infinity)`.

Do not apply square-root rules to odd roots.

## Combining Restrictions
When a formula has more than one restriction, keep only inputs that satisfy all restrictions.

Example:

`sqrt(x+1)/(x-3)`

Square root: `x >= -1`

Denominator: `x != 3`

Domain: `[-1,3) union (3,infinity)`.

## Original Formula Restrictions
Simplifying a rational expression does not erase original restrictions.

Example:

`(x^2-9)/(x-3)`

This simplifies to `x+3`, but the original formula had denominator zero at `x=3`.

Domain: `x != 3`.

## Context Domains
Context can restrict inputs.

`A(s)=s^2` algebraically accepts all real numbers. But if `s` is side length, then `s >= 0`.

Always ask what the input represents.

## Common Mistakes
- Mistake: Excluding numerator zeros.
  Correction: Numerator zeros are allowed unless another rule forbids them.
- Mistake: Allowing denominator zero after cancellation.
  Correction: Record original restrictions first.
- Mistake: Using `>` for square-root radicands in the numerator.
  Correction: Use `>=`; square root of 0 is allowed.
- Mistake: Using `>=` for square roots in denominators.
  Correction: Use `>`; denominator cannot be zero.
- Mistake: Combining restrictions with union instead of overlap.
  Correction: The domain must satisfy every restriction at once.
- Mistake: Ignoring context.
  Correction: Algebraic domain and context domain can differ.

## Guided Practice
1. Find the domain of `f(x)=1/(x+4)`.
   - Denominator `x+4 != 0`.
   - `x != -4`.
   - Domain: `(-infinity,-4) union (-4,infinity)`.

2. Find the domain of `g(x)=sqrt(x+2)`.
   - `x+2 >= 0`.
   - `x >= -2`.
   - Domain: `[-2,infinity)`.

3. Find the domain of `h(x)=sqrt(x-1)/(x+3)`.
   - `x >= 1`.
   - `x != -3`.
   - Since `-3` is outside `x >= 1`, domain is `[1,infinity)`.

## Independent Practice
1. `f(x)=x^3-2x`; answer `(-infinity, infinity)`.
2. `g(x)=1/(x+5)`; answer `x != -5`.
3. `h(x)=sqrt(x-4)`; answer `[4,infinity)`.
4. `p(x)=sqrt(10-x)`; answer `(-infinity,10]`.
5. `q(x)=1/sqrt(x+1)`; answer `(-1,infinity)`.
6. `r(x)=(x+2)/(x^2-16)`; answer `x != -4, 4`.

## Mastery Check
The player is ready to advance when they can:

1. Identify denominator restrictions.
2. Identify square-root restrictions.
3. Distinguish numerator roots from denominator roots.
4. Preserve original restrictions after cancellation.
5. Combine multiple restrictions by intersection.
6. Write domains in interval notation.
7. Apply context restrictions.

Mastery check set:

1. `f(x)=4x^2+1`; domain `(-infinity, infinity)`.
2. `g(x)=3/(x-8)`; domain `x != 8`.
3. `h(x)=sqrt(2x-10)`; domain `[5,infinity)`.
4. `p(x)=1/sqrt(6-x)`; domain `(-infinity,6)`.
5. `q(x)=sqrt(x+2)/(x-1)`; domain `[-2,1) union (1,infinity)`.

## Adaptive Tutor Messages
- If the player excludes numerator zeros: "Zeros are allowed in the numerator; they only matter in the denominator or under an even root."
- If denominator restrictions are missed: "Ask what would make the denominator equal zero."
- If square-root endpoints are excluded incorrectly: "Square root of 0 is defined unless the root is in the denominator."
- If a square-root denominator endpoint is included: "That would make the denominator zero, so it must be excluded."
- If restrictions are not combined: "The domain must pass every restriction at the same time."
- If cancellation erases a restriction: "Record original denominator restrictions before simplifying."
- If context is ignored: "What does the input represent in the real situation?"

## Tutorial Metadata
- Tutorial ID: Tut-P015
- Estimated duration: 7 minutes
- Target player state: knows function notation, inequalities, interval notation, and basic factoring
- Unlock condition: available from any Phase 015 question
- Remediation trigger: two denominator-zero errors, two square-root endpoint errors, one lost-canceled-restriction error, or one repeated interval-notation error
- Advancement trigger: 80 percent accuracy on mixed polynomial, rational, radical, combined, simplified, and context domain tasks

# Part IV - Socratic Dialogue Bible

## Opening Diagnostic
Tutor: "For `f(x)=sqrt(x-5)`, what values of `x` make the expression under the square root allowed?"

Expected strong answer: "`x-5 >= 0`, so `x >= 5`."

## Guided Discovery
Tutor sequence:

1. "What kind of formula is this: polynomial, rational, radical, or combined?"
2. "Is there a denominator?"
3. "What would make the denominator zero?"
4. "Is there an even root?"
5. "What inequality must the radicand satisfy?"
6. "Is the root in the denominator?"
7. "Are there multiple restrictions to combine?"
8. "Did any simplification hide an original restriction?"
9. "Does the context restrict the input?"
10. "How should the final domain be written in interval notation?"

## Correct Branch
Player: "`x-5` must be at least zero."

Tutor: "Good. Solve `x-5 >= 0`. Should the endpoint be included?"

If player says yes, ask for interval notation.

## Partial Understanding Branch
Player identifies the restriction but writes `x > 5`.

Tutor: "Test the endpoint. What is `sqrt(5-5)`? Is `sqrt(0)` defined?"

Recovery target: Player includes 5.

## Misconception Branch
Player says all real numbers for a square-root formula.

Tutor: "Try an input less than 5, like `x=0`. What is under the square root?"

Recovery target: Player recognizes negative radicand is not real.

## Denominator Branch
Player allows a denominator zero.

Tutor: "What happens if the denominator equals zero? Can we divide by zero?"

Recovery target: Player excludes the denominator-zero value.

## Root Denominator Branch
Player writes `x >= 2` for `1/sqrt(x-2)`.

Tutor: "At `x=2`, what is the square root? What would the whole denominator be?"

Recovery target: Player changes to `x > 2`.

## Simplification Branch
Player cancels a factor and says all real numbers.

Tutor: "Before canceling, which inputs made the original denominator zero?"

Recovery target: Player records original restrictions.

## Unsure Branch
Player: "I do not know where to start."

Tutor: "Scan for two warning signs: a denominator and an even root. Which one do you see?"

If player identifies one, guide to the matching rule.

## Unrelated Response Branch
Player gives an unrelated answer.

Tutor: "Let's focus only on allowed inputs. Does the formula contain a denominator, a square root, both, or neither?"

If unrelated again, use a two-choice prompt between denominator and square root.

## Recovery Prompts
- "What inputs make the denominator zero?"
- "What must be true under a square root?"
- "Is the square root in the numerator or denominator?"
- "Is the endpoint allowed?"
- "Are you excluding numerator zeros by mistake?"
- "Did you record restrictions before simplifying?"
- "Do all restrictions need to hold at once?"
- "What does the input represent in context?"
- "Can you write the answer on a number line first?"

## Reflection Question
"Why does `sqrt(x-5)` allow `x=5`, but `1/sqrt(x-5)` does not?"

Strong reflection: "`sqrt(0)` is defined, so `x=5` works in the numerator. But in the denominator it would create division by zero, so it is not allowed."

## Transfer Question
"How will formula-domain restrictions help when reading a graph?"

Expected transfer: "The formula domain predicts where the graph can exist, where it starts, and where holes or breaks may appear."

## Escalation Rules
- If no-restriction formulas are over-restricted, show No-Restriction Formulas.
- If denominator errors repeat, show Denominator Restrictions and Factored Denominators.
- If square-root errors repeat, show Square-Root Restrictions.
- If root-denominator endpoint errors repeat, show Roots in Denominators.
- If combined restrictions fail, show Combining Restrictions.
- If cancellation errors repeat, show Original Formula Restrictions.
- If context errors repeat, show Context Domains.
- If the player solves five mixed domain tasks correctly, advance to independent practice.

## Exit Condition
The Socratic sequence is complete when the player:

1. Identifies formula features that restrict domain.
2. Solves denominator and radicand restrictions.
3. Combines restrictions correctly.
4. Preserves original restrictions after simplification.
5. Writes the final domain in interval or set-builder notation.
6. Explains any context restriction.

# Knowledge Graph

- Prerequisites: Phase 007 linear inequalities; Phase 008 compound inequalities; Phase 014 function notation; square-root meaning; denominator restrictions; factoring basics; interval notation
- Concepts Unlocked: algebraic domain; rational restrictions; radical restrictions; root-denominator restrictions; combined domain intersections; original-formula restrictions; context domains; interval-domain notation
- Related Concepts: domain from graphs; range from graphs; rational holes and asymptotes; radical functions; logarithm domains; inverse-function restrictions
- Common Misconceptions: unnecessary restrictions on polynomials or absolute values; numerator zeros excluded; denominator zeros allowed after cancellation; square-root endpoint errors; square-root denominator endpoint errors; union instead of intersection; context ignored
- Remedial Phases: Phase 007 review; Phase 008 review; Phase 014 review; factoring mini-lesson; interval notation mini-lesson; square-root mini-lesson
- Follow-up Phases: Phase 016 - Domain from graphs; Phase 017 - Range from graphs; Phase 033 - Rational expression simplification; Phase 034 - Rational restrictions and holes; Phase 039 - Logarithm definitions
- Transfer Topics: graph endpoints; holes; asymptotes; radical graphs; rational functions; logarithmic domains; modeling constraints

# Validation Notes

## Structure Validation
- Includes all required Bibles and metadata sections.
- Contains exactly 20 template families, within the required 20-40 range.
- Each template includes example, answer, explanation, distractors, distractor rationale, randomization rules, validity constraints, metadata, variants, and mappings.
- Every template has six progressive hints.

## Math Validation
- T001: polynomial has domain `(-infinity, infinity)`.
- T002: absolute value expression has domain `(-infinity, infinity)`.
- T003: `x-3 != 0` -> `x != 3`.
- T004: `2x+5 != 0` -> `x != -5/2`.
- T005: `x^2-9=(x-3)(x+3)` -> exclude `-3` and `3`.
- T006: `x^2+4 >= 4`, so denominator never zero.
- T007: `x-5 >= 0` -> `x >= 5`.
- T008: `7-x >= 0` -> `x <= 7`.
- T009: `2x+6 >= 0` -> `x >= -3`.
- T010: `x^2-9 >= 0` -> `x <= -3 or x >= 3`.
- T011: square-root denominator requires `x-2 > 0` -> `x > 2`.
- T012: `x+1 >= 0` and `x != 3` -> `[-1,3) union (3,infinity)`.
- T013: original denominator `x-3` excludes `x=3`.
- T014: denominator `x(x+2)` excludes `x=0` and `x=-2`.
- T015: original denominator `(x-1)(x-5)` excludes `x=1` and `x=5`.
- T016: cube root accepts all real radicands.
- T017: `x >= -1`; denominator excludes `-2` and `2`; final domain removes only `2` from allowed region.
- T018: side length context gives `s >= 0`.
- T019: `(x^2-4)/(x-2)` keeps original restriction `x != 2`.
- T020: `2x-6 >= 0` gives `x >= 3`; denominator zeros `-4,4`; final domain `[3,4) union (4,infinity)`.

## Distractor Validation
- Distractors reflect endpoint errors, sign errors, numerator-zero confusion, lost restrictions after cancellation, denominator-only answers, radical-only answers, and range-domain confusion.
- Multiple-choice-style templates have exactly one correct answer.
- Interval distractors were checked against inclusion and exclusion rules.

## Hint Validation
- Each hint sequence moves from identifying restriction type to solving, combining, and writing final interval notation.
- Combined-restriction hints explicitly prompt intersection logic.

## Tutorial Validation
- Tutorial includes learning goal, why it matters, prerequisite check, core concept, no-restriction formulas, denominator restrictions, factored denominators, never-zero denominators, square roots, roots in denominators, quadratic radicands, odd roots, combining restrictions, original formula restrictions, context domains, common mistakes, guided practice, independent practice, mastery check, adaptive messages, and metadata.

## Socratic Validation
- Dialogue includes diagnostic, guided discovery, correct branch, partial branch, misconception branch, denominator branch, root denominator branch, simplification branch, unsure branch, unrelated branch, recovery prompts, reflection, transfer, escalation rules, and exit condition.
- Tutor guides by identifying formula features before applying rules.

## Metadata Validation
- Every template includes IDs, difficulty, timing, visual flag, compatibility flags, prerequisites, misconception tags, randomization constraints, and support-system mappings.

## Known Issues
- The repository specifications differ on the label for Hint 4. This phase uses "Guided Next Step" to match the master prompt language.
- `PHASE_TEMPLATE.md` omits Common Misconceptions from the Knowledge Graph section, but this phase includes it because the master prompt and knowledge graph guide require it.
