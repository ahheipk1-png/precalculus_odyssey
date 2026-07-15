# Phase 020 - Inverse Functions

## Phase Metadata
- Course: Precalculus Odyssey Bible v5
- Topic: Inverse functions
- Subtopic: Understanding, finding, verifying, and interpreting inverse functions
- Prerequisites: Phase 014 function notation, Phase 018 function transformations, Phase 019 function composition, solving equations for a variable, domain and range
- Related phases: Phase 021 - Piecewise functions; Phase 026 - Quadratic graphs; Phase 039 - Logarithm definitions; Phase 020 supports later inverse trigonometric thinking
- Estimated phase size: 20 template families, 20 core examples, 120 progressive hints, 1 tutorial sequence, 1 Socratic dialogue system

## Learning Objectives
By the end of this phase, the player can:

1. Interpret an inverse function as an undoing rule.
2. Convert function outputs back to inputs using inverse notation.
3. Find inverse values from ordered pairs, tables, and graphs.
4. Reflect a graph across `y=x` to understand inverse graphs.
5. Use the horizontal line test to decide whether an inverse is a function.
6. Find algebraic inverses of linear, radical, cubic, and rational functions.
7. Verify inverse functions using composition.
8. Swap domain and range between a function and its inverse.
9. Restrict domains when needed to make an inverse a function.
10. Interpret inverse functions in context with units.

## Prerequisite Review
- `f(a)=b` means input `a` gives output `b`.
- `f^-1(b)=a` means the inverse sends output `b` back to input `a`.
- Ordered pairs swap: if `(a,b)` is on `f`, then `(b,a)` is on `f^-1`.
- A graph and its inverse reflect across the line `y=x`.
- To find an inverse formula, switch `x` and `y`, then solve for `y`.

## Core Concepts
- An inverse reverses the input-output relationship.
- Inverse notation `f^-1(x)` does not mean `1/f(x)`.
- Functions have inverse functions only when each output comes from exactly one input.
- The horizontal line test checks whether outputs repeat.
- Domain of `f` becomes range of `f^-1`; range of `f` becomes domain of `f^-1`.
- Verification rule: `f(g(x))=x` and `g(f(x))=x` on the appropriate domains.

## Common Misconceptions
- Treating `f^-1(x)` as the reciprocal `1/f(x)`.
- Forgetting to swap `x` and `y` before solving for the inverse.
- Swapping but not solving for `y`.
- Assuming every function has an inverse function without checking one-to-one behavior.
- Ignoring domain restrictions for quadratics and square roots.
- Forgetting that domain and range swap.
- Verifying only one composition when domains matter.
- Reading inverse table values backward.

# Part I - Question Bible

## Template T001 - Interpret inverse notation
- Template ID: P020-T001
- Question Type: Conceptual interpretation
- Cognitive Skill: Explain input-output reversal
- Difficulty: 2
- Estimated Time: 35 seconds
- Visual Required: false
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Interpret `f^-1(b)=a` from `f(a)=b`.
- Example Question: If `f(4)=9`, what does `f^-1(9)` equal?
- Answer: `4`.
- Explanation: The original function sends 4 to 9. The inverse sends 9 back to 4.
- Distractors: `9`; `1/9`; `1/4`; undefined.
- Distractor Rationale: Returns output; treats inverse as reciprocal of output; treats inverse as reciprocal of input; assumes inverse notation is invalid.
- Randomization Rules: Use simple one-to-one input-output statements.
- Validity Constraints: The original output should be unique.
- Metadata: phase_id=P020; prerequisites=[function notation, input-output pairs]; misconception_tags=[reciprocal confusion, input-output reversal, inverse notation confusion]; randomization_constraints=[single pair].
- Graph/Visual Variant: Function machine arrow `4 -> 9` and inverse arrow `9 -> 4`.
- Modeling Variant: Level-to-score and score-to-level.
- Reverse Variant: Given `f^-1(9)=4`, state `f(4)=9`.
- Equation Battle Variant: Not primary; notation interpretation.
- Multi-stage Boss Variant: Convert notation to ordered pairs.
- Hint Mapping: H-P020-T001
- Tutorial Mapping: Tut-P020 sections What Inverses Mean
- Socratic Mapping: Soc-P020 notation branch

## Template T002 - Ordered pair inverse
- Template ID: P020-T002
- Question Type: Representation conversion
- Cognitive Skill: Swap coordinates for inverse graph
- Difficulty: 2
- Estimated Time: 40 seconds
- Visual Required: false
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Find a point on an inverse graph from a point on the original graph.
- Example Question: The point `(-2,5)` is on the graph of `f`. What point is on the graph of `f^-1`?
- Answer: `(5,-2)`.
- Explanation: Inverse graphs swap inputs and outputs, so `(x,y)` becomes `(y,x)`.
- Distractors: `(-5,2)`; `(-2,5)`; `(2,-5)`; `1/(-2,5)`.
- Distractor Rationale: Negates instead of swaps; leaves point unchanged; negates and swaps incorrectly; reciprocal misconception.
- Randomization Rules: Use ordered pairs with positive and negative coordinates.
- Validity Constraints: Original function should be one-to-one or point-based question should not imply full inverse existence.
- Metadata: phase_id=P020; prerequisites=[ordered pairs, graph points]; misconception_tags=[swap error, sign error, reciprocal confusion]; randomization_constraints=[point swap].
- Graph/Visual Variant: Reflect point across `y=x`.
- Modeling Variant: Input-output record reversed.
- Reverse Variant: Given inverse point, find original point.
- Equation Battle Variant: Not primary.
- Multi-stage Boss Variant: Swap multiple points and sketch inverse.
- Hint Mapping: H-P020-T002
- Tutorial Mapping: Tut-P020 sections Ordered Pairs and Tables
- Socratic Mapping: Soc-P020 pair branch

## Template T003 - Inverse from table
- Template ID: P020-T003
- Question Type: Table lookup
- Cognitive Skill: Read inverse value from a table
- Difficulty: 2
- Estimated Time: 45 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Evaluate an inverse using a table.
- Example Question: A table for `f` has `f(1)=4`, `f(3)=8`, and `f(6)=10`. Find `f^-1(8)`.
- Answer: `3`.
- Explanation: The inverse asks which input gave output 8. The table shows `f(3)=8`.
- Distractors: `8`; `6`; `10`; undefined.
- Distractor Rationale: Returns inverse input as output; reads nearby row; reads next output; ignores listed value.
- Randomization Rules: Use tables with unique outputs.
- Validity Constraints: Requested inverse input must be an output in the table.
- Metadata: phase_id=P020; prerequisites=[table reading, inverse notation]; misconception_tags=[table reversal, output-as-answer, missing lookup]; randomization_constraints=[unique table output].
- Graph/Visual Variant: Highlight row whose output matches inverse input.
- Modeling Variant: Score-to-level table.
- Reverse Variant: Fill a table row so `f^-1(8)=3`.
- Equation Battle Variant: Not primary.
- Multi-stage Boss Variant: Include undefined inverse table values.
- Hint Mapping: H-P020-T003
- Tutorial Mapping: Tut-P020 sections Ordered Pairs and Tables
- Socratic Mapping: Soc-P020 table branch

## Template T004 - Graph reflection over y=x
- Template ID: P020-T004
- Question Type: Graph interpretation
- Cognitive Skill: Reflect a point or graph feature over `y=x`
- Difficulty: 3
- Estimated Time: 55 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Connect inverse graphs to reflection across `y=x`.
- Example Question: A graph of `f` contains the point `(2,7)`. Its inverse graph is the reflection across `y=x`. Where does that point move?
- Answer: `(7,2)`.
- Explanation: Reflection across `y=x` swaps x- and y-coordinates.
- Distractors: `(-2,7)`; `(2,-7)`; `(-7,-2)`; `(2,7)`.
- Distractor Rationale: Reflects over y-axis; reflects over x-axis; reflects over origin; leaves point unchanged.
- Randomization Rules: Use points away from the line `y=x`.
- Validity Constraints: Reflection line should be stated or shown.
- Metadata: phase_id=P020; prerequisites=[coordinate reflections, inverse graph meaning]; misconception_tags=[axis confusion, swap error, unchanged point]; randomization_constraints=[reflection point].
- Graph/Visual Variant: Show `y=x` and corresponding reflected point.
- Modeling Variant: Swap input and output axes.
- Reverse Variant: Given reflected point, recover original point.
- Equation Battle Variant: Not primary.
- Multi-stage Boss Variant: Reflect several key points.
- Hint Mapping: H-P020-T004
- Tutorial Mapping: Tut-P020 sections Inverse Graphs
- Socratic Mapping: Soc-P020 graph-reflection branch

## Template T005 - Horizontal line test
- Template ID: P020-T005
- Question Type: Classification
- Cognitive Skill: Decide whether inverse is a function
- Difficulty: 3
- Estimated Time: 55 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Use the horizontal line test to determine if a function has an inverse function.
- Example Question: A graph is a full upward-opening parabola. Does it have an inverse that is a function?
- Answer: No, not without restricting the domain.
- Explanation: Many horizontal lines hit the parabola twice, meaning one output comes from two inputs. The inverse would fail the vertical line test.
- Distractors: yes, because it passes the vertical line test; yes, every function has an inverse function; no, because it is not a function; yes, if reflected over x-axis.
- Distractor Rationale: Uses wrong test; overgeneralizes; confuses original function with inverse condition; uses wrong reflection.
- Randomization Rules: Use graphs that pass or fail the horizontal line test.
- Validity Constraints: Graph relationship must be visually clear.
- Metadata: phase_id=P020; prerequisites=[vertical line test, graph reading]; misconception_tags=[wrong line test, every-function-invertible, original-vs-inverse confusion]; randomization_constraints=[one-to-one graph].
- Graph/Visual Variant: Draw horizontal line crossing twice.
- Modeling Variant: Same score earned at two levels.
- Reverse Variant: Restrict the parabola to pass the horizontal line test.
- Equation Battle Variant: Not primary.
- Multi-stage Boss Variant: Classify and suggest restriction.
- Hint Mapping: H-P020-T005
- Tutorial Mapping: Tut-P020 sections One-to-One Functions
- Socratic Mapping: Soc-P020 horizontal-test branch

## Template T006 - Find inverse of a basic linear function
- Template ID: P020-T006
- Question Type: Algebraic computation
- Cognitive Skill: Swap variables and solve for y
- Difficulty: 3
- Estimated Time: 70 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Find the inverse formula of a linear function.
- Example Question: Find the inverse of `f(x)=2x+3`.
- Answer: `f^-1(x)=(x-3)/2`.
- Explanation: Write `y=2x+3`. Swap `x` and `y`: `x=2y+3`. Solve: `x-3=2y`, so `y=(x-3)/2`.
- Distractors: `(x+3)/2`; `2x-3`; `1/(2x+3)`; `(x-2)/3`.
- Distractor Rationale: Sign error; does not solve inverse; reciprocal misconception; swaps coefficient and constant.
- Randomization Rules: Use `f(x)=ax+b` with nonzero integer `a`.
- Validity Constraints: Inverse should be linear with manageable fractions.
- Metadata: phase_id=P020; prerequisites=[linear solving, function notation]; misconception_tags=[swap error, sign error, reciprocal confusion]; randomization_constraints=[linear inverse].
- Graph/Visual Variant: Reflect line across `y=x`.
- Modeling Variant: Score rule undone to recover level.
- Reverse Variant: Given inverse, find original function.
- Equation Battle Variant: Swap, subtract, divide.
- Multi-stage Boss Variant: Verify by composition.
- Hint Mapping: H-P020-T006
- Tutorial Mapping: Tut-P020 sections Finding Algebraic Inverses
- Socratic Mapping: Soc-P020 linear-inverse branch

## Template T007 - Find inverse with negative slope
- Template ID: P020-T007
- Question Type: Algebraic computation
- Cognitive Skill: Solve inverse equation with negative coefficient
- Difficulty: 3
- Estimated Time: 75 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Find inverse of a linear function with negative slope.
- Example Question: Find the inverse of `f(x)=-3x+6`.
- Answer: `f^-1(x)=(6-x)/3` or `2 - x/3`.
- Explanation: `y=-3x+6`. Swap: `x=-3y+6`. Then `x-6=-3y`, so `y=(6-x)/3`.
- Distractors: `(x-6)/3`; `-3x-6`; `1/(-3x+6)`; `(x+6)/-3`
- Distractor Rationale: Sign error; changes original incorrectly; reciprocal misconception; equivalent only if simplified carefully? `(x+6)/-3` equals `-x/3-2`, not correct.
- Randomization Rules: Use negative integer slopes.
- Validity Constraints: Accept equivalent correct forms.
- Metadata: phase_id=P020; prerequisites=[negative coefficient equations, inverse method]; misconception_tags=[sign error, reciprocal confusion, algebraic equivalence]; randomization_constraints=[negative slope].
- Graph/Visual Variant: Reflect decreasing line across `y=x`.
- Modeling Variant: Undo a decreasing linear rule.
- Reverse Variant: Create original function from inverse.
- Equation Battle Variant: Swap, isolate with negative coefficient.
- Multi-stage Boss Variant: Verify both compositions.
- Hint Mapping: H-P020-T007
- Tutorial Mapping: Tut-P020 sections Finding Algebraic Inverses
- Socratic Mapping: Soc-P020 negative-linear branch

## Template T008 - Inverse of fractional linear function
- Template ID: P020-T008
- Question Type: Algebraic computation
- Cognitive Skill: Undo division and translation
- Difficulty: 3
- Estimated Time: 75 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Find inverse of `f(x)=(x-a)/b`.
- Example Question: Find the inverse of `f(x)=(x-5)/3`.
- Answer: `f^-1(x)=3x+5`.
- Explanation: `y=(x-5)/3`. Swap: `x=(y-5)/3`. Multiply by 3: `3x=y-5`. Add 5: `y=3x+5`.
- Distractors: `(x+5)/3`; `3x-5`; `x/3+5`; `1/((x-5)/3)`.
- Distractor Rationale: Does not undo operations; sign error; reverses operation order; reciprocal misconception.
- Randomization Rules: Use simple affine functions with division by positive integer.
- Validity Constraints: Denominator nonzero.
- Metadata: phase_id=P020; prerequisites=[literal equations, inverse operations]; misconception_tags=[operation order error, sign error, reciprocal confusion]; randomization_constraints=[fractional linear].
- Graph/Visual Variant: Function machine divided then shifted; inverse reverses.
- Modeling Variant: Recover raw score from scaled display score.
- Reverse Variant: Given inverse `3x+5`, recover `f(x)=(x-5)/3`.
- Equation Battle Variant: Swap, multiply, add.
- Multi-stage Boss Variant: Include context interpretation.
- Hint Mapping: H-P020-T008
- Tutorial Mapping: Tut-P020 sections Finding Algebraic Inverses
- Socratic Mapping: Soc-P020 fractional-linear branch

## Template T009 - Evaluate inverse value from formula
- Template ID: P020-T009
- Question Type: Inverse evaluation
- Cognitive Skill: Use inverse formula or solve original equation
- Difficulty: 3
- Estimated Time: 60 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Find `f^-1(k)` for a linear function.
- Example Question: If `f(x)=4x-1`, find `f^-1(11)`.
- Answer: `3`.
- Explanation: Solve `4x-1=11`. Then `4x=12`, so `x=3`. The input that gives output 11 is 3.
- Distractors: `43`; `11`; `2.5`; `1/11`.
- Distractor Rationale: Computes `f(11)`; returns inverse input; arithmetic error; reciprocal misconception.
- Randomization Rules: Use linear functions and target outputs giving integer inputs.
- Validity Constraints: Target output should be in range.
- Metadata: phase_id=P020; prerequisites=[linear equations, inverse notation]; misconception_tags=[evaluate-instead-of-invert, output-as-answer, reciprocal confusion]; randomization_constraints=[integer inverse value].
- Graph/Visual Variant: Find x-value where graph has y=11.
- Modeling Variant: Find level needed for target score.
- Reverse Variant: Choose target output so inverse value is 3.
- Equation Battle Variant: Set original output equation, solve.
- Multi-stage Boss Variant: Compare with `f(11)`.
- Hint Mapping: H-P020-T009
- Tutorial Mapping: Tut-P020 sections Evaluating Inverses
- Socratic Mapping: Soc-P020 inverse-value branch

## Template T010 - Verify inverse by composition
- Template ID: P020-T010
- Question Type: Verification
- Cognitive Skill: Show both compositions equal x
- Difficulty: 3
- Estimated Time: 80 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Verify two functions are inverses.
- Example Question: Verify that `f(x)=2x+3` and `g(x)=(x-3)/2` are inverses.
- Answer: Yes; `f(g(x))=x` and `g(f(x))=x`.
- Explanation: `f(g(x))=2((x-3)/2)+3=x-3+3=x`. Also `g(f(x))=((2x+3)-3)/2=2x/2=x`.
- Distractors: no, because formulas look different; yes, because slopes multiply to 1 only; no, because `f(g(x))=x+3`; reciprocal functions only.
- Distractor Rationale: Rejects inverse forms; uses incomplete check; algebra error; reciprocal misconception.
- Randomization Rules: Use linear inverse pairs.
- Validity Constraints: Both compositions should simplify to x.
- Metadata: phase_id=P020; prerequisites=[composition, simplifying]; misconception_tags=[incomplete verification, algebra error, reciprocal confusion]; randomization_constraints=[inverse pair].
- Graph/Visual Variant: Graphs reflect across `y=x`.
- Modeling Variant: Score rule and recovery rule undo each other.
- Reverse Variant: Find missing inverse function then verify.
- Equation Battle Variant: Compose both directions and simplify.
- Multi-stage Boss Variant: State domain assumptions.
- Hint Mapping: H-P020-T010
- Tutorial Mapping: Tut-P020 sections Verifying Inverses
- Socratic Mapping: Soc-P020 verify branch

## Template T011 - Not inverses by composition
- Template ID: P020-T011
- Question Type: Error analysis
- Cognitive Skill: Disprove inverse relationship
- Difficulty: 3
- Estimated Time: 75 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Determine when two functions are not inverses.
- Example Question: Are `f(x)=2x+1` and `g(x)=(x+1)/2` inverses?
- Answer: No.
- Explanation: `f(g(x))=2((x+1)/2)+1=x+1+1=x+2`, not `x`. Since one composition fails, they are not inverses.
- Distractors: yes, because the formulas use 2 and 1; yes, because `g` divides by 2; no, because inverse notation means reciprocal; cannot tell.
- Distractor Rationale: Pattern matching without composition; incomplete undoing; reciprocal misconception; ignores direct verification.
- Randomization Rules: Use near-inverse pairs with one sign error.
- Validity Constraints: At least one composition must clearly fail.
- Metadata: phase_id=P020; prerequisites=[composition verification, linear simplification]; misconception_tags=[pattern matching, incomplete verification, reciprocal confusion]; randomization_constraints=[near inverse].
- Graph/Visual Variant: Graphs not symmetric across `y=x`.
- Modeling Variant: Recovery rule has wrong sign.
- Reverse Variant: Correct `g` to make it the inverse.
- Equation Battle Variant: Compose and detect not x.
- Multi-stage Boss Variant: Identify and fix the error.
- Hint Mapping: H-P020-T011
- Tutorial Mapping: Tut-P020 sections Verifying Inverses
- Socratic Mapping: Soc-P020 not-inverse branch

## Template T012 - Domain and range swap
- Template ID: P020-T012
- Question Type: Representation transfer
- Cognitive Skill: Swap domain and range for inverse
- Difficulty: 3
- Estimated Time: 55 seconds
- Visual Required: false
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Determine domain and range of an inverse from the original function.
- Example Question: If `f` has domain `[1,6]` and range `[-2,8]`, what are the domain and range of `f^-1`?
- Answer: Domain of `f^-1` is `[-2,8]`; range of `f^-1` is `[1,6]`.
- Explanation: The inverse swaps inputs and outputs, so the original range becomes the inverse domain.
- Distractors: same domain and range as `f`; domain `[1,6]`, range `[-2,8]`; both `[-2,8]`; cannot tell.
- Distractor Rationale: Does not swap; repeats original; duplicates range; ignores inverse relationship.
- Randomization Rules: Use interval domain and range with clear endpoint types.
- Validity Constraints: Original function should be one-to-one.
- Metadata: phase_id=P020; prerequisites=[domain and range, inverse meaning]; misconception_tags=[domain-range swap error, unchanged assumption, inverse existence]; randomization_constraints=[interval swap].
- Graph/Visual Variant: Reflect graph and compare axes.
- Modeling Variant: Score-to-level inverse swaps units.
- Reverse Variant: Given inverse domain/range, recover original.
- Equation Battle Variant: Not primary.
- Multi-stage Boss Variant: Include open endpoints in variants.
- Hint Mapping: H-P020-T012
- Tutorial Mapping: Tut-P020 sections Domain and Range Swap
- Socratic Mapping: Soc-P020 domain-range branch

## Template T013 - Restrict quadratic domain
- Template ID: P020-T013
- Question Type: Classification and restriction
- Cognitive Skill: Make a non-one-to-one function invertible
- Difficulty: 4
- Estimated Time: 80 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Restrict a quadratic domain to create an inverse function.
- Example Question: Why does `f(x)=x^2` need a domain restriction to have an inverse function, and what is one valid restriction?
- Answer: It fails the horizontal line test on all real numbers. One valid restriction is `x >= 0`, giving inverse `f^-1(x)=sqrt(x)`.
- Explanation: Outputs like 4 come from both -2 and 2. Restricting to nonnegative inputs makes each output come from one input.
- Distractors: no restriction needed; restrict to `y>=0`; restrict to all real numbers; inverse is always `1/x^2`.
- Distractor Rationale: Ignores repeated outputs; restricts range instead of domain; repeats original domain; reciprocal misconception.
- Randomization Rules: Use symmetric parent functions needing domain restrictions.
- Validity Constraints: Restriction must make the function one-to-one.
- Metadata: phase_id=P020; prerequisites=[horizontal line test, square roots]; misconception_tags=[one-to-one error, domain-range confusion, reciprocal confusion]; randomization_constraints=[quadratic restriction].
- Graph/Visual Variant: Show right half of parabola.
- Modeling Variant: Choose one branch of a symmetric rule.
- Reverse Variant: Given inverse `sqrt(x)`, state original restriction.
- Equation Battle Variant: Not primary.
- Multi-stage Boss Variant: Restrict, find inverse, state domain/range.
- Hint Mapping: H-P020-T013
- Tutorial Mapping: Tut-P020 sections Restricted Domains
- Socratic Mapping: Soc-P020 quadratic-restriction branch

## Template T014 - Inverse of square-root function
- Template ID: P020-T014
- Question Type: Algebraic computation
- Cognitive Skill: Find inverse of a shifted square-root function
- Difficulty: 4
- Estimated Time: 90 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Find inverse of `sqrt(x-h)+k` and state domain restriction.
- Example Question: Find the inverse of `f(x)=sqrt(x-2)+1`.
- Answer: `f^-1(x)=(x-1)^2+2`, with domain `x >= 1`.
- Explanation: `y=sqrt(x-2)+1`. Swap: `x=sqrt(y-2)+1`. Then `x-1=sqrt(y-2)`, so `(x-1)^2=y-2`, and `y=(x-1)^2+2`. Since original range is `y>=1`, inverse domain is `x>=1`.
- Distractors: `sqrt(x-1)+2`; `(x+1)^2+2`; `(x-1)^2-2`; domain all real numbers.
- Distractor Rationale: Does not undo square root; sign error; vertical shift error; ignores inverse domain.
- Randomization Rules: Use shifted square-root functions with small shifts.
- Validity Constraints: State inverse domain from original range.
- Metadata: phase_id=P020; prerequisites=[radicals, domain/range, inverse solving]; misconception_tags=[operation undo error, sign error, domain ignored]; randomization_constraints=[square-root inverse].
- Graph/Visual Variant: Reflect radical curve to restricted parabola.
- Modeling Variant: Undo a square-root reward scale.
- Reverse Variant: Given inverse quadratic branch, recover square-root original.
- Equation Battle Variant: Swap, isolate radical, square, solve.
- Multi-stage Boss Variant: Include inverse domain and range.
- Hint Mapping: H-P020-T014
- Tutorial Mapping: Tut-P020 sections Radical Inverses
- Socratic Mapping: Soc-P020 radical-inverse branch

## Template T015 - Inverse of cubic shift
- Template ID: P020-T015
- Question Type: Algebraic computation
- Cognitive Skill: Undo a cube and shift
- Difficulty: 3
- Estimated Time: 75 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Find inverse of a cubic transformation.
- Example Question: Find the inverse of `f(x)=x^3+2`.
- Answer: `f^-1(x)=cuberoot(x-2)`.
- Explanation: `y=x^3+2`. Swap: `x=y^3+2`. Subtract 2: `x-2=y^3`. Take cube root: `y=cuberoot(x-2)`.
- Distractors: `cuberoot(x+2)`; `(x-2)^3`; `1/(x^3+2)`; `x^3-2`.
- Distractor Rationale: Sign error; reverses the inverse operation; reciprocal misconception; shifts without undoing cube.
- Randomization Rules: Use odd-power functions that are one-to-one.
- Validity Constraints: Cube root notation should be accepted as real for all inputs.
- Metadata: phase_id=P020; prerequisites=[cube roots, inverse operations]; misconception_tags=[sign error, operation reversal, reciprocal confusion]; randomization_constraints=[cubic inverse].
- Graph/Visual Variant: Reflect cubic graph over `y=x`.
- Modeling Variant: Recover raw input from cubed score.
- Reverse Variant: Given cube-root inverse, find original cubic.
- Equation Battle Variant: Swap, subtract, cube-root.
- Multi-stage Boss Variant: Include domain/range all real.
- Hint Mapping: H-P020-T015
- Tutorial Mapping: Tut-P020 sections Algebraic Inverses Beyond Linear
- Socratic Mapping: Soc-P020 cubic branch

## Template T016 - Inverse of shifted reciprocal
- Template ID: P020-T016
- Question Type: Algebraic computation
- Cognitive Skill: Solve a rational equation for inverse
- Difficulty: 5
- Estimated Time: 110 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Find inverse of a shifted reciprocal function.
- Example Question: Find the inverse of `f(x)=1/(x-2)+3`.
- Answer: `f^-1(x)=2+1/(x-3)`.
- Explanation: `y=1/(x-2)+3`. Swap: `x=1/(y-2)+3`. Then `x-3=1/(y-2)`. So `y-2=1/(x-3)`, and `y=2+1/(x-3)`.
- Distractors: `1/(x+2)-3`; `2+1/(x+3)`; `1/(x-2)-3`; reciprocal of the whole function.
- Distractor Rationale: Sign and shift errors; denominator shift error; only changes vertical shift; reciprocal misconception.
- Randomization Rules: Use `1/(x-h)+k` with small integer h and k.
- Validity Constraints: Inverse domain excludes `x=k`.
- Metadata: phase_id=P020; prerequisites=[rational equations, inverse solving]; misconception_tags=[rational solving error, sign error, reciprocal confusion]; randomization_constraints=[shifted reciprocal].
- Graph/Visual Variant: Hyperbola reflected across `y=x`.
- Modeling Variant: Undo shifted reciprocal calibration.
- Reverse Variant: Given inverse, recover original.
- Equation Battle Variant: Swap, isolate reciprocal, reciprocate both sides, solve.
- Multi-stage Boss Variant: State inverse domain and range.
- Hint Mapping: H-P020-T016
- Tutorial Mapping: Tut-P020 sections Algebraic Inverses Beyond Linear
- Socratic Mapping: Soc-P020 reciprocal branch

## Template T017 - Context inverse
- Template ID: P020-T017
- Question Type: Modeling interpretation
- Cognitive Skill: Interpret inverse with units
- Difficulty: 3
- Estimated Time: 70 seconds
- Visual Required: false
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Interpret inverse functions in context.
- Example Question: A score function `S(l)=100l+50` gives score from level `l`. What does `S^-1(750)=7` mean?
- Answer: A score of 750 corresponds to level 7.
- Explanation: The original function sends level to score. The inverse sends score back to level.
- Distractors: level 750 gives score 7; score increases by 7 per level; the reciprocal score is 7; level 7 has inverse score 750.
- Distractor Rationale: Reverses units; confuses rate; reciprocal misconception; unclear input-output wording.
- Randomization Rules: Use context pairs with clear input and output units.
- Validity Constraints: Inverse statement must match original units.
- Metadata: phase_id=P020; prerequisites=[context functions, inverse notation]; misconception_tags=[unit reversal, reciprocal confusion, input-output reversal]; randomization_constraints=[context inverse].
- Graph/Visual Variant: Axes swap level and score.
- Modeling Variant: This template is the modeling variant.
- Reverse Variant: Write inverse notation from a context sentence.
- Equation Battle Variant: Not primary.
- Multi-stage Boss Variant: Include original and inverse sentences.
- Hint Mapping: H-P020-T017
- Tutorial Mapping: Tut-P020 sections Context Inverses
- Socratic Mapping: Soc-P020 context branch

## Template T018 - Reverse-build a function from inverse
- Template ID: P020-T018
- Question Type: Reverse construction
- Cognitive Skill: Recover original from an inverse rule
- Difficulty: 4
- Estimated Time: 80 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Construct a function with a given inverse.
- Example Question: Find a function `f` whose inverse is `f^-1(x)=3x-4`.
- Answer: `f(x)=(x+4)/3`.
- Explanation: If `g(x)=3x-4` is the inverse, then the original function is the inverse of `g`. Swap `x` and `y` in `y=3x-4`: `x=3y-4`, so `y=(x+4)/3`.
- Distractors: `3x+4`; `(x-4)/3`; `1/(3x-4)`; `3x-4`.
- Distractor Rationale: Sign error; wrong inverse operation; reciprocal misconception; gives inverse again.
- Randomization Rules: Provide simple linear inverse functions.
- Validity Constraints: Original should be one-to-one.
- Metadata: phase_id=P020; prerequisites=[linear inverse solving, reverse construction]; misconception_tags=[inverse-again error, sign error, reciprocal confusion]; randomization_constraints=[given inverse].
- Graph/Visual Variant: Reflect inverse line back across `y=x`.
- Modeling Variant: Recover score rule from score-to-level rule.
- Reverse Variant: This template is the reverse variant.
- Equation Battle Variant: Invert the inverse function.
- Multi-stage Boss Variant: Verify recovered function by composition.
- Hint Mapping: H-P020-T018
- Tutorial Mapping: Tut-P020 sections Reverse Construction
- Socratic Mapping: Soc-P020 reverse branch

## Template T019 - Error analysis: forgot to swap x and y
- Template ID: P020-T019
- Question Type: Error analysis
- Cognitive Skill: Diagnose inverse-solving mistake
- Difficulty: 3
- Estimated Time: 75 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Correct an algebraic inverse error.
- Example Question: A student finds the inverse of `f(x)=2x+3` by solving `y=2x+3` for `y` and says `f^-1(x)=2x+3`. What is the mistake?
- Answer: The student did not swap `x` and `y` before solving. Correct inverse: `f^-1(x)=(x-3)/2`.
- Explanation: To find an inverse, write `y=2x+3`, swap to `x=2y+3`, then solve for `y`.
- Distractors: The student is correct; the mistake is not taking reciprocal; correct inverse is `1/(2x+3)`; correct inverse is `2x-3`.
- Distractor Rationale: Accepts unchanged function; reciprocal misconception; reciprocal answer; subtracts constant only.
- Randomization Rules: Use common inverse errors: no swap, reciprocal, sign error.
- Validity Constraints: Correct inverse must be shown.
- Metadata: phase_id=P020; prerequisites=[inverse method, linear solving]; misconception_tags=[forgot swap, reciprocal confusion, sign error]; randomization_constraints=[student error].
- Graph/Visual Variant: Show unchanged graph versus reflected graph.
- Modeling Variant: Recovery rule cannot be same as scoring rule unless identity-like.
- Reverse Variant: Create a wrong inverse and ask to diagnose.
- Equation Battle Variant: Reject no-swap card, choose swap card.
- Multi-stage Boss Variant: Correct and verify.
- Hint Mapping: H-P020-T019
- Tutorial Mapping: Tut-P020 sections Common Mistakes
- Socratic Mapping: Soc-P020 error branch

## Template T020 - Boss inverse challenge
- Template ID: P020-T020
- Question Type: Multi-stage boss
- Cognitive Skill: Find inverse, verify, state domain/range, and interpret graph
- Difficulty: 5
- Estimated Time: 150 seconds
- Visual Required: true
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Complete a full inverse-function analysis.
- Example Question: Boss Gate: Let `f(x)=sqrt(x-4)+2`. Find `f^-1(x)`, state the domain and range of `f` and `f^-1`, verify with one composition direction, and name the graph relationship.
- Answer: `f^-1(x)=(x-2)^2+4` with domain `[2,infinity)`. For `f`, domain `[4,infinity)` and range `[2,infinity)`. For `f^-1`, domain `[2,infinity)` and range `[4,infinity)`. The graphs reflect across `y=x`. Also `f(f^-1(x))=x` for `x>=2`.
- Explanation: `y=sqrt(x-4)+2`. Swap: `x=sqrt(y-4)+2`. Then `x-2=sqrt(y-4)`, so `(x-2)^2=y-4`, and `y=(x-2)^2+4`. The original range becomes inverse domain.
- Distractors: `sqrt(x-2)+4`; `(x+2)^2+4`; domain all real numbers; graph reflection over x-axis.
- Distractor Rationale: Does not undo square root; sign error; ignores restricted inverse domain; wrong reflection axis.
- Randomization Rules: Use restricted radical or quadratic inverse tasks with domain/range and graph relationship.
- Validity Constraints: Domains and ranges must be explicitly stated and consistent.
- Metadata: phase_id=P020; prerequisites=[radical inverse, domain/range swap, composition verification]; misconception_tags=[domain ignored, sign error, operation undo error, reflection-axis error]; randomization_constraints=[mixed inverse boss].
- Graph/Visual Variant: Show radical graph and inverse branch reflected over `y=x`.
- Modeling Variant: Undo a thresholded square-root reward rule.
- Reverse Variant: Given inverse branch, recover radical function.
- Equation Battle Variant: Swap, isolate radical, square, state restrictions, verify.
- Multi-stage Boss Variant: This is the phase boss template.
- Hint Mapping: H-P020-T020
- Tutorial Mapping: Tut-P020 sections Full Phase Review
- Socratic Mapping: Soc-P020 boss branch

# Part II - Hint Bible

## H-P020-T001
- Hint 1 - Gentle Nudge: The inverse reverses the arrow.
- Hint 2 - Concept Reminder: `f(4)=9` means 4 goes to 9.
- Hint 3 - Focus Hint: `f^-1(9)` asks what input led to 9.
- Hint 4 - Guided Next Step: The input was 4.
- Hint 5 - Nearly Complete: Do not take a reciprocal.
- Hint 6 - Full Solution: `f^-1(9)=4`.

## H-P020-T002
- Hint 1 - Gentle Nudge: Inverse points swap coordinates.
- Hint 2 - Concept Reminder: `(x,y)` becomes `(y,x)`.
- Hint 3 - Focus Hint: Swap -2 and 5.
- Hint 4 - Guided Next Step: The new x-value is 5.
- Hint 5 - Nearly Complete: The new y-value is -2.
- Hint 6 - Full Solution: `(5,-2)`.

## H-P020-T003
- Hint 1 - Gentle Nudge: Look for output 8 in the table.
- Hint 2 - Concept Reminder: The inverse asks which input produced that output.
- Hint 3 - Focus Hint: The table shows `f(3)=8`.
- Hint 4 - Guided Next Step: So inverse input 8 maps to 3.
- Hint 5 - Nearly Complete: Return the original input.
- Hint 6 - Full Solution: `f^-1(8)=3`.

## H-P020-T004
- Hint 1 - Gentle Nudge: Reflection over `y=x` swaps coordinates.
- Hint 2 - Concept Reminder: This is not an x-axis or y-axis reflection.
- Hint 3 - Focus Hint: `(2,7)` becomes `(7,2)`.
- Hint 4 - Guided Next Step: Keep both signs the same.
- Hint 5 - Nearly Complete: Write the reflected point.
- Hint 6 - Full Solution: `(7,2)`.

## H-P020-T005
- Hint 1 - Gentle Nudge: Use the horizontal line test.
- Hint 2 - Concept Reminder: A full parabola has repeated y-values.
- Hint 3 - Focus Hint: y=4 occurs at x=-2 and x=2.
- Hint 4 - Guided Next Step: Repeated outputs mean the inverse would repeat inputs.
- Hint 5 - Nearly Complete: A domain restriction can fix one branch.
- Hint 6 - Full Solution: No inverse function without restricting the domain.

## H-P020-T006
- Hint 1 - Gentle Nudge: Write `y=2x+3`.
- Hint 2 - Concept Reminder: Swap `x` and `y`.
- Hint 3 - Focus Hint: `x=2y+3`.
- Hint 4 - Guided Next Step: Subtract 3.
- Hint 5 - Nearly Complete: Divide by 2.
- Hint 6 - Full Solution: `f^-1(x)=(x-3)/2`.

## H-P020-T007
- Hint 1 - Gentle Nudge: The negative coefficient stays important.
- Hint 2 - Concept Reminder: Swap to `x=-3y+6`.
- Hint 3 - Focus Hint: Subtract 6: `x-6=-3y`.
- Hint 4 - Guided Next Step: Divide by -3.
- Hint 5 - Nearly Complete: `y=(6-x)/3`.
- Hint 6 - Full Solution: `f^-1(x)=(6-x)/3`.

## H-P020-T008
- Hint 1 - Gentle Nudge: Undo the division after swapping.
- Hint 2 - Concept Reminder: Swap to `x=(y-5)/3`.
- Hint 3 - Focus Hint: Multiply both sides by 3.
- Hint 4 - Guided Next Step: `3x=y-5`.
- Hint 5 - Nearly Complete: Add 5.
- Hint 6 - Full Solution: `f^-1(x)=3x+5`.

## H-P020-T009
- Hint 1 - Gentle Nudge: `f^-1(11)` asks which input gives output 11.
- Hint 2 - Concept Reminder: Solve `f(x)=11`.
- Hint 3 - Focus Hint: `4x-1=11`.
- Hint 4 - Guided Next Step: Add 1 to both sides.
- Hint 5 - Nearly Complete: `4x=12`, so `x=3`.
- Hint 6 - Full Solution: `f^-1(11)=3`.

## H-P020-T010
- Hint 1 - Gentle Nudge: Verify by composition.
- Hint 2 - Concept Reminder: One direction is `f(g(x))`.
- Hint 3 - Focus Hint: `2((x-3)/2)+3=x`.
- Hint 4 - Guided Next Step: Check the other direction too.
- Hint 5 - Nearly Complete: `((2x+3)-3)/2=x`.
- Hint 6 - Full Solution: Yes, both compositions equal `x`.

## H-P020-T011
- Hint 1 - Gentle Nudge: Test a composition.
- Hint 2 - Concept Reminder: Inverses compose to `x`.
- Hint 3 - Focus Hint: `f(g(x))=2((x+1)/2)+1`.
- Hint 4 - Guided Next Step: Simplify to `x+2`.
- Hint 5 - Nearly Complete: `x+2` is not `x`.
- Hint 6 - Full Solution: They are not inverses.

## H-P020-T012
- Hint 1 - Gentle Nudge: Inverses swap inputs and outputs.
- Hint 2 - Concept Reminder: Domain of `f` becomes range of `f^-1`.
- Hint 3 - Focus Hint: Range of `f` becomes domain of `f^-1`.
- Hint 4 - Guided Next Step: Original range is `[-2,8]`.
- Hint 5 - Nearly Complete: Original domain is `[1,6]`.
- Hint 6 - Full Solution: Domain of `f^-1`: `[-2,8]`; range of `f^-1`: `[1,6]`.

## H-P020-T013
- Hint 1 - Gentle Nudge: A full parabola repeats output values.
- Hint 2 - Concept Reminder: Repeated outputs fail the horizontal line test.
- Hint 3 - Focus Hint: Restrict to one side of the vertex.
- Hint 4 - Guided Next Step: Choose `x >= 0` or `x <= 0`.
- Hint 5 - Nearly Complete: With `x >= 0`, the inverse is `sqrt(x)`.
- Hint 6 - Full Solution: Restrict domain, for example to `x>=0`, giving inverse `sqrt(x)`.

## H-P020-T014
- Hint 1 - Gentle Nudge: Start with `y=sqrt(x-2)+1`.
- Hint 2 - Concept Reminder: Swap `x` and `y`.
- Hint 3 - Focus Hint: `x=sqrt(y-2)+1`.
- Hint 4 - Guided Next Step: Subtract 1, then square both sides.
- Hint 5 - Nearly Complete: `(x-1)^2=y-2`.
- Hint 6 - Full Solution: `f^-1(x)=(x-1)^2+2`, domain `x>=1`.

## H-P020-T015
- Hint 1 - Gentle Nudge: Swap variables first.
- Hint 2 - Concept Reminder: `x=y^3+2`.
- Hint 3 - Focus Hint: Subtract 2.
- Hint 4 - Guided Next Step: `x-2=y^3`.
- Hint 5 - Nearly Complete: Take the cube root.
- Hint 6 - Full Solution: `f^-1(x)=cuberoot(x-2)`.

## H-P020-T016
- Hint 1 - Gentle Nudge: Isolate the reciprocal after swapping.
- Hint 2 - Concept Reminder: Swap to `x=1/(y-2)+3`.
- Hint 3 - Focus Hint: `x-3=1/(y-2)`.
- Hint 4 - Guided Next Step: Reciprocate: `y-2=1/(x-3)`.
- Hint 5 - Nearly Complete: Add 2.
- Hint 6 - Full Solution: `f^-1(x)=2+1/(x-3)`.

## H-P020-T017
- Hint 1 - Gentle Nudge: Identify original input and output units.
- Hint 2 - Concept Reminder: `S` sends level to score.
- Hint 3 - Focus Hint: `S^-1` sends score back to level.
- Hint 4 - Guided Next Step: Input 750 is a score.
- Hint 5 - Nearly Complete: Output 7 is a level.
- Hint 6 - Full Solution: A score of 750 corresponds to level 7.

## H-P020-T018
- Hint 1 - Gentle Nudge: Invert the given inverse.
- Hint 2 - Concept Reminder: Write `y=3x-4`.
- Hint 3 - Focus Hint: Swap to `x=3y-4`.
- Hint 4 - Guided Next Step: Add 4.
- Hint 5 - Nearly Complete: Divide by 3.
- Hint 6 - Full Solution: `f(x)=(x+4)/3`.

## H-P020-T019
- Hint 1 - Gentle Nudge: The student's graph did not reverse input and output.
- Hint 2 - Concept Reminder: Inverse solving starts by swapping `x` and `y`.
- Hint 3 - Focus Hint: Use `x=2y+3`.
- Hint 4 - Guided Next Step: Subtract 3 and divide by 2.
- Hint 5 - Nearly Complete: The original formula is not its inverse.
- Hint 6 - Full Solution: Mistake: no swap. Correct inverse `(x-3)/2`.

## H-P020-T020
- Hint 1 - Gentle Nudge: Use the radical inverse process.
- Hint 2 - Concept Reminder: Start with `y=sqrt(x-4)+2`.
- Hint 3 - Focus Hint: Swap to `x=sqrt(y-4)+2`.
- Hint 4 - Guided Next Step: Subtract 2, then square.
- Hint 5 - Nearly Complete: `y=(x-2)^2+4`; inverse domain comes from original range.
- Hint 6 - Full Solution: `f^-1(x)=(x-2)^2+4`, domain `[2,infinity)`; original domain `[4,infinity)`, original range `[2,infinity)`, inverse range `[4,infinity)`.

# Part III - Tutorial Bible

## Learning Goal
Learn inverse functions as undoing rules that reverse inputs and outputs, then find, verify, and interpret inverse functions across formulas, tables, graphs, and contexts.

## Why It Matters
Inverse functions let players reverse a rule: score back to level, distance back to time, transformed value back to original value. This is the foundation for logarithms, inverse trigonometric functions, solving equations, and undoing transformations.

## Prerequisite Check
Ask the player:

1. If `f(4)=9`, what input produced output 9? Expected: 4.
2. What point comes from swapping `(2,7)`? Expected: `(7,2)`.
3. What line reflects inverse graphs? Expected: `y=x`.
4. Solve `x=2y+3` for `y`. Expected: `y=(x-3)/2`.
5. Does every function pass the horizontal line test? Expected: no.

## What Inverses Mean
An inverse reverses a function's input-output relationship.

If:

`f(4)=9`

then:

`f^-1(9)=4`

The inverse does not mean reciprocal.

## Ordered Pairs and Tables
If `(a,b)` is on `f`, then `(b,a)` is on `f^-1`.

Tables work the same way. If a table shows `f(3)=8`, then `f^-1(8)=3`.

## Inverse Graphs
The graph of an inverse is the reflection of the original graph across `y=x`.

Point rule:

`(x,y) -> (y,x)`

## One-to-One Functions
A function has an inverse function only if each output comes from one input.

Use the horizontal line test:

- If every horizontal line hits at most once, the inverse is a function.
- If a horizontal line hits more than once, the inverse is not a function unless the domain is restricted.

## Finding Algebraic Inverses
Steps:

1. Write `y=f(x)`.
2. Swap `x` and `y`.
3. Solve for `y`.
4. Rename `y` as `f^-1(x)`.
5. State domain and range restrictions when needed.

Example:

`f(x)=2x+3`

`y=2x+3`

`x=2y+3`

`y=(x-3)/2`

So `f^-1(x)=(x-3)/2`.

## Evaluating Inverses
To find `f^-1(11)`, ask which input gives output 11.

If `f(x)=4x-1`:

`4x-1=11`

`x=3`

So `f^-1(11)=3`.

## Verifying Inverses
Two functions are inverses when both compositions return the original input:

`f(g(x))=x`

and

`g(f(x))=x`

Example:

`f(x)=2x+3`

`g(x)=(x-3)/2`

Both compositions simplify to `x`.

## Domain and Range Swap
Domain and range swap under inverses.

If `f` has domain `[1,6]` and range `[-2,8]`, then:

- `f^-1` has domain `[-2,8]`.
- `f^-1` has range `[1,6]`.

## Restricted Domains
Some functions need restricted domains before their inverse is a function.

`f(x)=x^2` fails the horizontal line test on all real numbers.

Restrict to `x>=0`, and the inverse is:

`f^-1(x)=sqrt(x)`

## Radical Inverses
For `f(x)=sqrt(x-2)+1`:

`y=sqrt(x-2)+1`

Swap:

`x=sqrt(y-2)+1`

Solve:

`y=(x-1)^2+2`

The inverse domain is `x>=1` because the original range is `y>=1`.

## Algebraic Inverses Beyond Linear
Cubic example:

`f(x)=x^3+2`

Inverse:

`f^-1(x)=cuberoot(x-2)`

Shifted reciprocal example:

`f(x)=1/(x-2)+3`

Inverse:

`f^-1(x)=2+1/(x-3)`

## Context Inverses
If `S(l)=100l+50` gives score from level, then `S^-1(score)` gives level from score.

`S^-1(750)=7` means:

A score of 750 corresponds to level 7.

## Reverse Construction
If you are given an inverse rule and need the original, invert it again.

If `f^-1(x)=3x-4`, then:

`f(x)=(x+4)/3`

## Common Mistakes
- Mistake: Treating `f^-1(x)` as `1/f(x)`.
  Correction: Inverse means undoing, not reciprocal.
- Mistake: Not swapping `x` and `y`.
  Correction: Swap input and output first.
- Mistake: Swapping but not solving for `y`.
  Correction: Finish isolating the new output.
- Mistake: Ignoring one-to-one behavior.
  Correction: Use the horizontal line test.
- Mistake: Forgetting domain/range restrictions.
  Correction: Domain and range swap.

## Guided Practice
1. If `f(2)=7`, find `f^-1(7)`.
   - Answer: `2`.

2. Find inverse of `f(x)=5x-10`.
   - `y=5x-10`.
   - `x=5y-10`.
   - `y=(x+10)/5`.

3. Check whether `f(x)=x^2` on all real numbers has inverse function.
   - No; it fails horizontal line test.

## Independent Practice
1. If `f(6)=11`, find `f^-1(11)`. Answer: 6.
2. Point `(4,-3)` on `f`; inverse point `(-3,4)`.
3. Inverse of `f(x)=3x+2`; answer `(x-2)/3`.
4. Inverse of `f(x)=(x+1)/4`; answer `4x-1`.
5. If `f` domain `[0,9]`, range `[1,4]`, inverse domain `[1,4]`, range `[0,9]`.

## Mastery Check
The player is ready to advance when they can:

1. Interpret inverse notation.
2. Swap ordered pairs and table inputs/outputs.
3. Use graph reflection across `y=x`.
4. Apply the horizontal line test.
5. Find linear and nonlinear inverse formulas.
6. Verify inverses with composition.
7. Swap domain and range.
8. Interpret inverse functions in context.

Mastery check set:

1. `f(5)=12`; `f^-1(12)=5`.
2. Point `(8,-1)` on `f`; point `(-1,8)` on `f^-1`.
3. `f(x)=7x-4`; `f^-1(x)=(x+4)/7`.
4. `f(x)=sqrt(x-3)`; inverse `f^-1(x)=x^2+3`, domain `x>=0`.
5. `f(x)=x^2` needs restriction such as `x>=0` to have inverse function.

## Adaptive Tutor Messages
- If inverse is treated as reciprocal: "Inverse means undo the function's input-output relationship, not take `1/f(x)`."
- If coordinates are not swapped: "Inverse graphs swap input and output, so swap coordinates."
- If algebra starts without swapping: "Write `y=...`, then swap `x` and `y` before solving."
- If a non-one-to-one function is inverted without restriction: "Use the horizontal line test; repeated outputs need a domain restriction."
- If domain/range are unchanged: "The inverse swaps domain and range."
- If verification stops after one direction: "Check both compositions when possible, and respect domains."
- If the player succeeds quickly: "You are ready for piecewise functions and later logarithms as inverses of exponentials."

## Tutorial Metadata
- Tutorial ID: Tut-P020
- Estimated duration: 7 minutes
- Target player state: knows function notation, composition, domain/range, and algebraic solving
- Unlock condition: available from any Phase 020 question
- Remediation trigger: two reciprocal-confusion errors, two no-swap algebra errors, one horizontal-line-test error, or repeated domain/range swap errors
- Advancement trigger: 80 percent accuracy on mixed notation, table, graph, algebraic inverse, verification, domain/range, restricted-domain, and context tasks

# Part IV - Socratic Dialogue Bible

## Opening Diagnostic
Tutor: "If `f(4)=9`, what should `f^-1(9)` equal?"

Expected strong answer: "4, because the inverse sends output 9 back to input 4."

## Guided Discovery
Tutor sequence:

1. "What input-output pair does the original function give?"
2. "What pair should the inverse give?"
3. "Are we using notation, a table, a graph, or a formula?"
4. "If it is a graph, what happens across `y=x`?"
5. "If it is a formula, did we swap `x` and `y`?"
6. "Can the original function pass the horizontal line test?"
7. "After solving, what is the inverse domain?"
8. "What is the inverse range?"
9. "Can composition verify the inverse?"
10. "What does the inverse mean in context?"

## Correct Branch
Player: "`f^-1(9)=4`."

Tutor: "Good. What ordered pair on the inverse graph matches that statement?"

If player says `(9,4)`, ask how it relates to `(4,9)`.

## Partial Understanding Branch
Player swaps the values but writes unclear notation.

Tutor: "Let's say it as an input-output statement. In the inverse, what is the input and what is the output?"

Recovery target: Player writes `f^-1(9)=4`.

## Misconception Branch
Player says `f^-1(9)=1/9`.

Tutor: "That would be a reciprocal. Does inverse notation mean reciprocal, or does it mean undo the function?"

Recovery target: Player returns to input-output reversal.

## Algebra Branch
Player tries to solve inverse without swapping variables.

Tutor: "Before solving, which variable represents the old output? How do we swap input and output?"

Recovery target: Player writes the swapped equation.

## Horizontal Line Branch
Player says a full parabola has inverse function.

Tutor: "Can one horizontal line hit the parabola twice? What would that mean about one output having two inputs?"

Recovery target: Player restricts the domain or says no inverse function.

## Domain Range Branch
Player leaves domain and range unchanged.

Tutor: "If inverse swaps inputs and outputs, what should happen to the original range?"

Recovery target: Player makes original range the inverse domain.

## Unsure Branch
Player: "I do not know where to start."

Tutor: "Look for one input-output pair first. What does the original function send to what?"

Then guide the reverse arrow.

## Unrelated Response Branch
Player gives an unrelated answer.

Tutor: "Let's focus on undoing. If the function sends 4 to 9, what should the inverse send 9 to?"

If unrelated again, use a two-choice prompt between 4 and `1/9`.

## Recovery Prompts
- "What input made this output?"
- "Did you swap coordinates?"
- "Did you swap `x` and `y`?"
- "Have you solved for the new `y`?"
- "Does inverse mean reciprocal here?"
- "Does the graph pass the horizontal line test?"
- "What domain restriction is needed?"
- "What happens to domain and range?"
- "Do both compositions return `x`?"

## Reflection Question
"Why does the inverse graph reflect across `y=x`?"

Strong reflection: "Because inverse points swap input and output, so every point `(x,y)` becomes `(y,x)`, which is exactly reflection across `y=x`."

## Transfer Question
"How will inverse functions connect to logarithms later?"

Expected transfer: "Logarithms undo exponentials, so they are inverse functions of exponential rules."

## Escalation Rules
- If reciprocal confusion repeats, show What Inverses Mean.
- If table or point swaps fail, show Ordered Pairs and Tables.
- If graph reflection errors repeat, show Inverse Graphs.
- If algebra errors repeat, show Finding Algebraic Inverses.
- If horizontal line test errors repeat, show One-to-One Functions.
- If domain/range errors repeat, show Domain and Range Swap.
- If the player solves five mixed inverse tasks correctly, advance to independent practice.

## Exit Condition
The Socratic sequence is complete when the player:

1. Interprets inverse notation correctly.
2. Swaps inputs and outputs across representations.
3. Finds algebraic inverses by swapping and solving.
4. Checks one-to-one behavior or applies a restriction.
5. States inverse domain and range.
6. Verifies inverse pairs by composition.
7. Interprets inverse meaning in context.

# Knowledge Graph

- Prerequisites: Phase 014 function notation; Phase 019 function composition; Phase 016 domain from graphs; Phase 017 range from graphs; linear solving; coordinate reflection
- Concepts Unlocked: inverse notation; inverse relations; inverse functions; graph reflection over `y=x`; horizontal line test; algebraic inverse method; inverse verification; domain/range swap; restricted domains
- Related Concepts: logarithm definitions; exponential functions; inverse trigonometric functions; piecewise functions; quadratic graphs; function composition
- Common Misconceptions: inverse as reciprocal; no coordinate swap; no variable swap; every function invertible; missing domain restriction; domain/range not swapped; one-direction verification only
- Remedial Phases: Phase 014 review; Phase 016 review; Phase 017 review; Phase 019 review; coordinate reflection mini-lesson; solving-for-y mini-lesson
- Follow-up Phases: Phase 021 - Piecewise functions; Phase 026 - Quadratic graphs; Phase 039 - Logarithm definitions; Phase 050 - Trigonometric equations
- Transfer Topics: logarithms; inverse transformations; equation solving; graph symmetry; restricted domains; undoing models

# Validation Notes

## Structure Validation
- Includes all required Bibles and metadata sections.
- Contains exactly 20 template families, within the required 20-40 range.
- Each template includes example, answer, explanation, distractors, distractor rationale, randomization rules, validity constraints, metadata, variants, and mappings.
- Every template has six progressive hints.

## Math Validation
- T001: `f(4)=9` implies `f^-1(9)=4`.
- T002: `(-2,5)` swaps to `(5,-2)`.
- T003: `f(3)=8` implies `f^-1(8)=3`.
- T004: reflection across `y=x` sends `(2,7)` to `(7,2)`.
- T005: full upward parabola fails horizontal line test.
- T006: inverse of `2x+3` is `(x-3)/2`.
- T007: inverse of `-3x+6` is `(6-x)/3`.
- T008: inverse of `(x-5)/3` is `3x+5`.
- T009: `4x-1=11` gives inverse value 3.
- T010: `2((x-3)/2)+3=x` and `((2x+3)-3)/2=x`.
- T011: `2((x+1)/2)+1=x+2`, so functions are not inverses.
- T012: inverse domain/range swap correctly.
- T013: `x^2` restricted to `x>=0` has inverse `sqrt(x)`.
- T014: inverse of `sqrt(x-2)+1` is `(x-1)^2+2`, domain `x>=1`.
- T015: inverse of `x^3+2` is `cuberoot(x-2)`.
- T016: inverse of `1/(x-2)+3` is `2+1/(x-3)`.
- T017: `S^-1(750)=7` means score 750 maps back to level 7.
- T018: inverse of `3x-4` is `(x+4)/3`, so original function is `(x+4)/3`.
- T019: correct inverse of `2x+3` is `(x-3)/2`; no-swap answer is wrong.
- T020: inverse of `sqrt(x-4)+2` is `(x-2)^2+4`, inverse domain `[2,infinity)`, inverse range `[4,infinity)`.

## Distractor Validation
- Distractors reflect reciprocal confusion, coordinate-swap errors, sign mistakes, no-swap algebra, one-to-one misunderstandings, domain/range swap errors, and wrong reflection axis.
- Multiple-choice-style templates have exactly one correct answer.
- Equivalent algebraic forms for linear inverses are accepted where noted.

## Hint Validation
- Each hint sequence moves from input-output reversal or algebraic inverse setup to the final inverse value, formula, domain, or verification.
- Algebraic hints explicitly prompt swapping variables before solving.

## Tutorial Validation
- Tutorial includes learning goal, why it matters, prerequisite check, inverse meaning, ordered pairs and tables, inverse graphs, one-to-one functions, algebraic inverse method, inverse evaluation, verification, domain/range swap, restricted domains, radical inverses, cubic/rational inverses, context inverses, reverse construction, common mistakes, guided practice, independent practice, mastery check, adaptive messages, and metadata.

## Socratic Validation
- Dialogue includes diagnostic, guided discovery, correct branch, partial branch, misconception branch, algebra branch, horizontal line branch, domain/range branch, unsure branch, unrelated branch, recovery prompts, reflection, transfer, escalation rules, and exit condition.
- Tutor treats inverse errors as input-output reversal errors before procedural errors.

## Metadata Validation
- Every template includes IDs, difficulty, timing, visual flag, compatibility flags, prerequisites, misconception tags, randomization constraints, and support-system mappings.

## Known Issues
- The repository specifications differ on the label for Hint 4. This phase uses "Guided Next Step" to match the master prompt language.
- `PHASE_TEMPLATE.md` omits Common Misconceptions from the Knowledge Graph section, but this phase includes it because the master prompt and knowledge graph guide require it.
