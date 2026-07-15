# Phase 018 - Function Transformations

## Phase Metadata
- Course: Precalculus Odyssey Bible v5
- Topic: Function transformations
- Subtopic: Translating, reflecting, stretching, compressing, and combining function graphs
- Prerequisites: Phase 014 function notation, Phase 016 domain from graphs, Phase 017 range from graphs, coordinate graphing, parent functions, ordered pairs
- Related phases: Phase 019 - Function composition; Phase 020 - Inverse functions; Phase 021 - Piecewise functions; Phase 026 - Quadratic graphs; Phase 046 - Trigonometric graphs
- Estimated phase size: 20 template families, 20 core examples, 120 progressive hints, 1 tutorial sequence, 1 Socratic dialogue system

## Learning Objectives
By the end of this phase, the player can:

1. Identify vertical shifts from `f(x)+k`.
2. Identify horizontal shifts from `f(x-h)` and `f(x+h)`.
3. Identify reflections over the x-axis and y-axis.
4. Identify vertical stretches and compressions from `a f(x)`.
5. Identify horizontal stretches and compressions from `f(bx)` and `f(x/b)`.
6. Transform points from a parent graph.
7. Match transformed formulas to transformed graphs.
8. Describe combined transformations in a sensible order.
9. Determine how transformations affect domain and range.
10. Correct common sign and scale mistakes in transformation notation.

## Prerequisite Review
- `f(x)` means the output of function `f` at input `x`.
- Domain uses x-values; range uses y-values.
- A point `(x,y)` on `y=f(x)` becomes a new point when the graph is transformed.
- Changes outside the function affect outputs directly.
- Changes inside the function affect inputs and often feel opposite.

## Core Concepts
- Outside changes affect y-values:
  - `f(x)+k`: shift up `k`.
  - `f(x)-k`: shift down `k`.
  - `a f(x)`: multiply y-values by `a`.
  - `-f(x)`: reflect over the x-axis.
- Inside changes affect x-values:
  - `f(x-h)`: shift right `h`.
  - `f(x+h)`: shift left `h`.
  - `f(-x)`: reflect over the y-axis.
  - `f(bx)`: horizontal scale by factor `1/b`.
- For combined forms like `g(x)=a f(b(x-h))+k`, horizontal changes affect x-values, vertical changes affect y-values.

## Common Misconceptions
- Thinking `f(x-3)` shifts left instead of right.
- Thinking `f(x+3)` shifts right instead of left.
- Confusing reflection over the x-axis with reflection over the y-axis.
- Applying vertical stretches to x-values.
- Applying horizontal stretches to y-values.
- Forgetting that inside multipliers use reciprocal scale factors.
- Applying transformations to points in the wrong order.
- Treating domain and range as unchanged after every transformation.

# Part I - Question Bible

## Template T001 - Vertical shift up
- Template ID: P018-T001
- Question Type: Transformation identification
- Cognitive Skill: Identify upward output shift
- Difficulty: 2
- Estimated Time: 35 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Recognize `g(x)=f(x)+k` as a vertical shift up.
- Example Question: If `g(x)=f(x)+4`, how is the graph of `g` related to the graph of `f`?
- Answer: Shift the graph of `f` up 4 units.
- Explanation: Adding 4 outside the function adds 4 to every output value, so all points move upward.
- Distractors: shift right 4; shift left 4; reflect over the x-axis; vertical stretch by 4.
- Distractor Rationale: Confuses outside change with horizontal shift; reverses direction; mistakes addition for reflection; mistakes addition for multiplication.
- Randomization Rules: Use positive integer `k` in `f(x)+k`.
- Validity Constraints: Change must be outside the function.
- Metadata: phase_id=P018; prerequisites=[function notation, y-values]; misconception_tags=[inside-outside confusion, shift-vs-stretch, direction error]; randomization_constraints=[positive vertical shift].
- Graph/Visual Variant: Show a parent graph and the same graph raised 4 units.
- Modeling Variant: Add 4 bonus points to every score output.
- Reverse Variant: Given "shift up 4", write `g(x)=f(x)+4`.
- Equation Battle Variant: Add-output card moves every point up.
- Multi-stage Boss Variant: Apply shift to points and range.
- Hint Mapping: H-P018-T001
- Tutorial Mapping: Tut-P018 sections Vertical Shifts
- Socratic Mapping: Soc-P018 vertical-shift branch

## Template T002 - Vertical shift down
- Template ID: P018-T002
- Question Type: Transformation identification
- Cognitive Skill: Identify downward output shift
- Difficulty: 2
- Estimated Time: 35 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Recognize `g(x)=f(x)-k` as a vertical shift down.
- Example Question: If `g(x)=f(x)-3`, how is the graph of `g` related to `f`?
- Answer: Shift the graph of `f` down 3 units.
- Explanation: Subtracting 3 outside the function subtracts 3 from every output.
- Distractors: shift left 3; shift right 3; reflect over y-axis; vertical compression by 3.
- Distractor Rationale: Confuses outside and inside changes; sign-direction error; confuses negative with reflection; confuses subtraction with scaling.
- Randomization Rules: Use positive integer `k` in `f(x)-k`.
- Validity Constraints: Change must be outside the function.
- Metadata: phase_id=P018; prerequisites=[function notation, output values]; misconception_tags=[inside-outside confusion, sign error, shift-vs-scale]; randomization_constraints=[negative vertical shift].
- Graph/Visual Variant: Show all y-values lowered by 3.
- Modeling Variant: Apply a 3-point penalty to every score output.
- Reverse Variant: Given "shift down 3", write `g(x)=f(x)-3`.
- Equation Battle Variant: Subtract-output card moves every point down.
- Multi-stage Boss Variant: Apply shift to graph and range.
- Hint Mapping: H-P018-T002
- Tutorial Mapping: Tut-P018 sections Vertical Shifts
- Socratic Mapping: Soc-P018 vertical-shift branch

## Template T003 - Horizontal shift right
- Template ID: P018-T003
- Question Type: Transformation identification
- Cognitive Skill: Interpret inside subtraction
- Difficulty: 3
- Estimated Time: 45 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Recognize `f(x-h)` as a shift right.
- Example Question: If `g(x)=f(x-5)`, how is the graph of `g` related to `f`?
- Answer: Shift the graph of `f` right 5 units.
- Explanation: The input must be 5 larger to create the same inside value. Inside subtraction shifts the graph right.
- Distractors: shift left 5; shift up 5; reflect over y-axis; horizontal stretch by 5.
- Distractor Rationale: Common horizontal sign error; confuses inside with vertical shift; confuses negative inside with reflection; confuses shift with scale.
- Randomization Rules: Use `f(x-h)` with positive integer `h`.
- Validity Constraints: No outside vertical shift in this family.
- Metadata: phase_id=P018; prerequisites=[function notation, x-values]; misconception_tags=[horizontal sign error, inside-outside confusion, shift-vs-scale]; randomization_constraints=[inside subtraction].
- Graph/Visual Variant: Parent graph moved right 5 units.
- Modeling Variant: Event happens 5 turns later.
- Reverse Variant: Given "shift right 5", write `g(x)=f(x-5)`.
- Equation Battle Variant: Right-shift input card.
- Multi-stage Boss Variant: Apply to domain and key points.
- Hint Mapping: H-P018-T003
- Tutorial Mapping: Tut-P018 sections Horizontal Shifts
- Socratic Mapping: Soc-P018 horizontal-shift branch

## Template T004 - Horizontal shift left
- Template ID: P018-T004
- Question Type: Transformation identification
- Cognitive Skill: Interpret inside addition
- Difficulty: 3
- Estimated Time: 45 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Recognize `f(x+h)` as a shift left.
- Example Question: If `g(x)=f(x+2)`, how is the graph of `g` related to `f`?
- Answer: Shift the graph of `f` left 2 units.
- Explanation: Inside addition shifts the graph left because the input reaches the same inside value 2 units earlier.
- Distractors: shift right 2; shift up 2; reflect over x-axis; vertical stretch by 2.
- Distractor Rationale: Common horizontal sign error; confuses inside and outside; confuses plus with reflection; confuses addition with multiplication.
- Randomization Rules: Use `f(x+h)` with positive integer `h`.
- Validity Constraints: No outside shift in this family.
- Metadata: phase_id=P018; prerequisites=[function notation, x-values]; misconception_tags=[horizontal sign error, inside-outside confusion, shift-vs-stretch]; randomization_constraints=[inside addition].
- Graph/Visual Variant: Parent graph moved left 2 units.
- Modeling Variant: Event happens 2 turns earlier.
- Reverse Variant: Given "shift left 2", write `g(x)=f(x+2)`.
- Equation Battle Variant: Left-shift input card.
- Multi-stage Boss Variant: Apply to domain and key points.
- Hint Mapping: H-P018-T004
- Tutorial Mapping: Tut-P018 sections Horizontal Shifts
- Socratic Mapping: Soc-P018 horizontal-shift branch

## Template T005 - Reflection over x-axis
- Template ID: P018-T005
- Question Type: Transformation identification
- Cognitive Skill: Identify output negation
- Difficulty: 2
- Estimated Time: 40 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Recognize `g(x)=-f(x)` as reflection over the x-axis.
- Example Question: If `g(x)=-f(x)`, how is `g` related to `f`?
- Answer: Reflect the graph of `f` over the x-axis.
- Explanation: Every output `y` becomes `-y`, so points flip vertically across the x-axis.
- Distractors: reflect over y-axis; shift down 1; vertical stretch by -1 only; shift left 1.
- Distractor Rationale: Confuses output negation with input negation; treats minus as shift; incomplete description; confuses sign with horizontal movement.
- Randomization Rules: Use negative outside multiplier `-f(x)`.
- Validity Constraints: The negative sign must be outside the function.
- Metadata: phase_id=P018; prerequisites=[coordinate reflections, function notation]; misconception_tags=[axis confusion, reflection-vs-shift, inside-outside confusion]; randomization_constraints=[outside negative].
- Graph/Visual Variant: Point `(a,b)` maps to `(a,-b)`.
- Modeling Variant: Turn gains into losses.
- Reverse Variant: Given x-axis reflection, write `g(x)=-f(x)`.
- Equation Battle Variant: Negate-output card.
- Multi-stage Boss Variant: Transform points and range.
- Hint Mapping: H-P018-T005
- Tutorial Mapping: Tut-P018 sections Reflections
- Socratic Mapping: Soc-P018 x-reflection branch

## Template T006 - Reflection over y-axis
- Template ID: P018-T006
- Question Type: Transformation identification
- Cognitive Skill: Identify input negation
- Difficulty: 3
- Estimated Time: 45 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Recognize `g(x)=f(-x)` as reflection over the y-axis.
- Example Question: If `g(x)=f(-x)`, how is `g` related to `f`?
- Answer: Reflect the graph of `f` over the y-axis.
- Explanation: Replacing `x` with `-x` changes every input to its opposite, so points flip horizontally across the y-axis.
- Distractors: reflect over x-axis; shift left 1; shift right 1; vertical stretch by -1.
- Distractor Rationale: Confuses input negation with output negation; treats sign as shift; treats sign as shift in other direction; applies vertical scaling.
- Randomization Rules: Use negative sign inside the input only.
- Validity Constraints: Function should be expressed as `f(-x)`, not `-f(x)`.
- Metadata: phase_id=P018; prerequisites=[coordinate reflections, input changes]; misconception_tags=[axis confusion, inside-outside confusion, reflection-vs-shift]; randomization_constraints=[inside negative].
- Graph/Visual Variant: Point `(a,b)` maps to `(-a,b)`.
- Modeling Variant: Mirror a path across the y-axis.
- Reverse Variant: Given y-axis reflection, write `g(x)=f(-x)`.
- Equation Battle Variant: Negate-input card.
- Multi-stage Boss Variant: Transform points and domain.
- Hint Mapping: H-P018-T006
- Tutorial Mapping: Tut-P018 sections Reflections
- Socratic Mapping: Soc-P018 y-reflection branch

## Template T007 - Vertical stretch
- Template ID: P018-T007
- Question Type: Transformation identification
- Cognitive Skill: Identify output multiplication by factor greater than 1
- Difficulty: 2
- Estimated Time: 40 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Recognize `g(x)=a f(x)` as vertical stretch when `a>1`.
- Example Question: If `g(x)=3f(x)`, how is `g` related to `f`?
- Answer: Vertical stretch by factor 3.
- Explanation: Every output is multiplied by 3, so y-values move three times as far from the x-axis.
- Distractors: horizontal stretch by 3; vertical shift up 3; horizontal compression by 3; reflect over x-axis.
- Distractor Rationale: Applies scale to x-values; confuses multiplication with addition; applies reciprocal inside logic; confuses positive scale with reflection.
- Randomization Rules: Use outside multiplier `a>1`.
- Validity Constraints: Multiplier should be positive and greater than 1.
- Metadata: phase_id=P018; prerequisites=[multiplication, y-values]; misconception_tags=[vertical-horizontal confusion, stretch-vs-shift, reciprocal error]; randomization_constraints=[outside scale greater than 1].
- Graph/Visual Variant: Point `(2,4)` maps to `(2,12)`.
- Modeling Variant: Triple every reward output.
- Reverse Variant: Given vertical stretch by 3, write `g(x)=3f(x)`.
- Equation Battle Variant: Multiply-output card.
- Multi-stage Boss Variant: Transform points and range.
- Hint Mapping: H-P018-T007
- Tutorial Mapping: Tut-P018 sections Vertical Scaling
- Socratic Mapping: Soc-P018 vertical-scale branch

## Template T008 - Vertical compression
- Template ID: P018-T008
- Question Type: Transformation identification
- Cognitive Skill: Identify output multiplication by fraction
- Difficulty: 2
- Estimated Time: 40 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Recognize `g(x)=a f(x)` as vertical compression when `0<a<1`.
- Example Question: If `g(x)=(1/2)f(x)`, how is `g` related to `f`?
- Answer: Vertical compression by factor `1/2`.
- Explanation: Every output is multiplied by `1/2`, so y-values move halfway toward the x-axis.
- Distractors: horizontal compression by `1/2`; shift down `1/2`; vertical stretch by 2; reflect over x-axis.
- Distractor Rationale: Applies scale to x-values; confuses scaling with shifting; uses reciprocal incorrectly for vertical scaling; confuses positive fraction with reflection.
- Randomization Rules: Use outside multiplier between 0 and 1.
- Validity Constraints: Multiplier must be positive and not equal to 1.
- Metadata: phase_id=P018; prerequisites=[fraction multiplication, y-values]; misconception_tags=[vertical-horizontal confusion, reciprocal error, shift-vs-scale]; randomization_constraints=[outside fractional scale].
- Graph/Visual Variant: Point `(2,4)` maps to `(2,2)`.
- Modeling Variant: Halve every output score.
- Reverse Variant: Given vertical compression by `1/2`, write `g(x)=(1/2)f(x)`.
- Equation Battle Variant: Multiply-output-by-fraction card.
- Multi-stage Boss Variant: Transform range.
- Hint Mapping: H-P018-T008
- Tutorial Mapping: Tut-P018 sections Vertical Scaling
- Socratic Mapping: Soc-P018 vertical-scale branch

## Template T009 - Horizontal compression
- Template ID: P018-T009
- Question Type: Transformation identification
- Cognitive Skill: Interpret inside multiplier greater than 1
- Difficulty: 4
- Estimated Time: 60 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Recognize `g(x)=f(bx)` as horizontal compression by factor `1/b`.
- Example Question: If `g(x)=f(2x)`, how is `g` related to `f`?
- Answer: Horizontal compression by factor `1/2`.
- Explanation: The input reaches the same inside value with half the x-value, so x-values are divided by 2.
- Distractors: horizontal stretch by 2; vertical stretch by 2; shift left 2; shift right 2.
- Distractor Rationale: Misses reciprocal inside scale; confuses horizontal and vertical scaling; confuses multiplication with addition; signless shift error.
- Randomization Rules: Use `f(bx)` with integer `b>1`.
- Validity Constraints: Inside multiplier must be directly on `x`.
- Metadata: phase_id=P018; prerequisites=[inside transformations, reciprocal scale]; misconception_tags=[reciprocal error, vertical-horizontal confusion, shift-vs-scale]; randomization_constraints=[inside multiplier greater than 1].
- Graph/Visual Variant: Point `(4,3)` maps to `(2,3)`.
- Modeling Variant: Same output pattern happens twice as fast.
- Reverse Variant: Given horizontal compression by `1/2`, write `g(x)=f(2x)`.
- Equation Battle Variant: Compress-input card.
- Multi-stage Boss Variant: Apply point mapping and domain change.
- Hint Mapping: H-P018-T009
- Tutorial Mapping: Tut-P018 sections Horizontal Scaling
- Socratic Mapping: Soc-P018 horizontal-scale branch

## Template T010 - Horizontal stretch
- Template ID: P018-T010
- Question Type: Transformation identification
- Cognitive Skill: Interpret inside division
- Difficulty: 4
- Estimated Time: 60 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Recognize `g(x)=f(x/b)` as horizontal stretch by factor `b`.
- Example Question: If `g(x)=f(x/3)`, how is `g` related to `f`?
- Answer: Horizontal stretch by factor 3.
- Explanation: The input must be three times as large to produce the same inside value, so x-values are multiplied by 3.
- Distractors: horizontal compression by 3; vertical compression by `1/3`; shift right 3; shift left 3.
- Distractor Rationale: Uses wrong reciprocal direction; confuses horizontal and vertical scaling; confuses division with shift; signless shift error.
- Randomization Rules: Use `f(x/b)` with integer `b>1`.
- Validity Constraints: Expression should be visibly inside the function.
- Metadata: phase_id=P018; prerequisites=[inside transformations, reciprocal scale]; misconception_tags=[reciprocal error, vertical-horizontal confusion, shift-vs-scale]; randomization_constraints=[inside division].
- Graph/Visual Variant: Point `(2,5)` maps to `(6,5)`.
- Modeling Variant: Same output pattern happens three times slower.
- Reverse Variant: Given horizontal stretch by 3, write `g(x)=f(x/3)`.
- Equation Battle Variant: Stretch-input card.
- Multi-stage Boss Variant: Transform points and domain.
- Hint Mapping: H-P018-T010
- Tutorial Mapping: Tut-P018 sections Horizontal Scaling
- Socratic Mapping: Soc-P018 horizontal-scale branch

## Template T011 - Combined vertical reflection and shift
- Template ID: P018-T011
- Question Type: Transformation sequence
- Cognitive Skill: Describe outside transformations
- Difficulty: 3
- Estimated Time: 60 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Describe `g(x)=-f(x)+k`.
- Example Question: Describe the transformations from `f` to `g(x)=-f(x)+2`.
- Answer: Reflect over the x-axis, then shift up 2 units.
- Explanation: The negative outside changes each output to its opposite. The `+2` then raises every output by 2.
- Distractors: reflect over y-axis then shift up 2; shift up 2 then reflect over x-axis, producing the same final graph always; shift down 2; horizontal shift left 2.
- Distractor Rationale: Confuses reflection axis; order changes final y-values when outside operations are written this way; sign error; inside-outside confusion.
- Randomization Rules: Use `-f(x)+k` with integer `k`.
- Validity Constraints: Description should match output rule `y -> -y + k`.
- Metadata: phase_id=P018; prerequisites=[reflections, vertical shifts]; misconception_tags=[axis confusion, order error, inside-outside confusion]; randomization_constraints=[outside reflection plus shift].
- Graph/Visual Variant: Point `(1,4)` maps to `(1,-2)`.
- Modeling Variant: Turn score into opposite then add bonus.
- Reverse Variant: Given x-axis reflection then up 2, write `g(x)=-f(x)+2`.
- Equation Battle Variant: Negate-output card, add-output card.
- Multi-stage Boss Variant: Transform points and range.
- Hint Mapping: H-P018-T011
- Tutorial Mapping: Tut-P018 sections Combined Transformations
- Socratic Mapping: Soc-P018 combined-outside branch

## Template T012 - Combined horizontal and vertical shift
- Template ID: P018-T012
- Question Type: Transformation sequence
- Cognitive Skill: Describe `f(x-h)+k`
- Difficulty: 3
- Estimated Time: 60 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Identify combined shifts.
- Example Question: Describe the transformations from `f` to `g(x)=f(x-3)-4`.
- Answer: Shift right 3 units and down 4 units.
- Explanation: The `x-3` inside shifts the graph right 3. The `-4` outside shifts it down 4.
- Distractors: left 3 and down 4; right 3 and up 4; left 3 and up 4; horizontal stretch by 3 and down 4.
- Distractor Rationale: Horizontal sign error; vertical sign error; both sign errors; confuses shift with scale.
- Randomization Rules: Use `f(x-h)+k` with positive or negative outside shift.
- Validity Constraints: Horizontal and vertical shifts must be distinct.
- Metadata: phase_id=P018; prerequisites=[horizontal shifts, vertical shifts]; misconception_tags=[horizontal sign error, vertical sign error, shift-vs-scale]; randomization_constraints=[combined shifts].
- Graph/Visual Variant: Point `(1,2)` maps to `(4,-2)`.
- Modeling Variant: Delayed event with lower reward output.
- Reverse Variant: Given right 3 and down 4, write `g(x)=f(x-3)-4`.
- Equation Battle Variant: Shift-input card, subtract-output card.
- Multi-stage Boss Variant: Transform key points, domain, and range.
- Hint Mapping: H-P018-T012
- Tutorial Mapping: Tut-P018 sections Combined Transformations
- Socratic Mapping: Soc-P018 combined-shift branch

## Template T013 - Identify transformations from full form
- Template ID: P018-T013
- Question Type: Transformation decomposition
- Cognitive Skill: Parse `a f(x-h)+k`
- Difficulty: 4
- Estimated Time: 75 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Identify shift and vertical scale from a transformed function.
- Example Question: Describe the transformations in `g(x)=2f(x-3)+1`.
- Answer: Shift right 3, vertical stretch by factor 2, then shift up 1.
- Explanation: `x-3` shifts right 3. The outside multiplier 2 doubles outputs. The outside `+1` raises outputs by 1.
- Distractors: left 3, vertical stretch 2, up 1; right 3, horizontal stretch 2, up 1; right 3, vertical stretch 2, down 1; vertical stretch 2 only.
- Distractor Rationale: Horizontal sign error; vertical-horizontal scale confusion; vertical sign error; misses shifts.
- Randomization Rules: Use `a f(x-h)+k` with `a>0`, `a != 1`.
- Validity Constraints: Avoid reflection in this family.
- Metadata: phase_id=P018; prerequisites=[horizontal shifts, vertical scaling, vertical shifts]; misconception_tags=[horizontal sign error, scale confusion, missed transformation]; randomization_constraints=[full form without reflection].
- Graph/Visual Variant: Transform a point `(4,5)` to `(7,11)`.
- Modeling Variant: Delay input, double output, then add bonus.
- Reverse Variant: Given transformations, write `g(x)=2f(x-3)+1`.
- Equation Battle Variant: Shift-input, multiply-output, add-output.
- Multi-stage Boss Variant: Decompose formula and transform a point.
- Hint Mapping: H-P018-T013
- Tutorial Mapping: Tut-P018 sections Full Transformation Form
- Socratic Mapping: Soc-P018 full-form branch

## Template T014 - Transform points under shifts
- Template ID: P018-T014
- Question Type: Point mapping
- Cognitive Skill: Apply transformation to ordered pairs
- Difficulty: 3
- Estimated Time: 70 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Transform points when a graph shifts.
- Example Question: The point `(2,5)` lies on `y=f(x)`. What point lies on `g(x)=f(x-4)+3`?
- Answer: `(6,8)`.
- Explanation: `x-4` shifts right 4, so x becomes `2+4=6`. `+3` shifts up 3, so y becomes `5+3=8`.
- Distractors: `(-2,8)`; `(6,2)`; `(-2,2)`; `(2,8)`
- Distractor Rationale: Horizontal sign error; vertical sign error; both sign errors; applies only vertical shift.
- Randomization Rules: Provide a point and a combined horizontal/vertical shift.
- Validity Constraints: Point mapping should use integer coordinates.
- Metadata: phase_id=P018; prerequisites=[ordered pairs, shifts]; misconception_tags=[horizontal sign error, vertical sign error, incomplete transformation]; randomization_constraints=[point mapping].
- Graph/Visual Variant: Show original and transformed points.
- Modeling Variant: Move a game path right and up.
- Reverse Variant: Given original and transformed point, infer shifts.
- Equation Battle Variant: Coordinate-transform cards.
- Multi-stage Boss Variant: Transform multiple points.
- Hint Mapping: H-P018-T014
- Tutorial Mapping: Tut-P018 sections Point Mapping
- Socratic Mapping: Soc-P018 point-mapping branch

## Template T015 - Transform domain and range under shifts
- Template ID: P018-T015
- Question Type: Domain-range transfer
- Cognitive Skill: Update domain and range after translation
- Difficulty: 4
- Estimated Time: 90 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Determine transformed domain and range after shifts.
- Example Question: A function `f` has domain `[-2,5]` and range `[1,7]`. If `g(x)=f(x-3)+4`, find the domain and range of `g`.
- Answer: Domain `[1,8]`; range `[5,11]`.
- Explanation: `x-3` shifts the graph right 3, so add 3 to domain endpoints. `+4` shifts up 4, so add 4 to range endpoints.
- Distractors: domain `[-5,2]`, range `[5,11]`; domain `[1,8]`, range `[-3,3]`; domain `[-2,5]`, range `[1,7]`; domain `[1,8]`, range `[1,7]`.
- Distractor Rationale: Horizontal sign error; vertical sign error; thinks transformations do not affect domain/range; updates only domain.
- Randomization Rules: Use finite interval domain and range with translation transformations.
- Validity Constraints: Keep endpoint types unchanged under pure translations.
- Metadata: phase_id=P018; prerequisites=[domain/range intervals, shifts]; misconception_tags=[horizontal sign error, range shift error, unchanged-domain-range]; randomization_constraints=[interval shifts].
- Graph/Visual Variant: Shift rectangle of possible x/y values.
- Modeling Variant: Delayed and boosted output window.
- Reverse Variant: Given transformed domain/range, infer shifts.
- Equation Battle Variant: Add shift to endpoints.
- Multi-stage Boss Variant: Include open/closed endpoints in variants.
- Hint Mapping: H-P018-T015
- Tutorial Mapping: Tut-P018 sections Domain and Range Effects
- Socratic Mapping: Soc-P018 domain-range branch

## Template T016 - Match graph to transformed formula
- Template ID: P018-T016
- Question Type: Matching
- Cognitive Skill: Connect graph movement to notation
- Difficulty: 3
- Estimated Time: 65 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Match a graph transformation to the correct formula.
- Example Question: A graph of `f` is shifted left 2 and up 5 to make `g`. Which formula matches?
- Answer: `g(x)=f(x+2)+5`.
- Explanation: Left 2 means `x+2` inside. Up 5 means `+5` outside.
- Distractors: `g(x)=f(x-2)+5`; `g(x)=f(x+2)-5`; `g(x)=f(x-5)+2`; `g(x)=5f(x+2)`.
- Distractor Rationale: Horizontal sign error; vertical sign error; swaps shift amounts; confuses vertical shift with stretch.
- Randomization Rules: Use visual translations and formula choices.
- Validity Constraints: Exactly one formula should match.
- Metadata: phase_id=P018; prerequisites=[graph shifts, function notation]; misconception_tags=[horizontal sign error, vertical sign error, amount swap]; randomization_constraints=[matching graph formula].
- Graph/Visual Variant: Original and transformed graph overlay.
- Modeling Variant: Move a path earlier and raise rewards.
- Reverse Variant: Given formula, choose matching graph.
- Equation Battle Variant: Not primary.
- Multi-stage Boss Variant: Justify both inside and outside changes.
- Hint Mapping: H-P018-T016
- Tutorial Mapping: Tut-P018 sections Matching Graphs and Formulas
- Socratic Mapping: Soc-P018 matching branch

## Template T017 - Parent quadratic vertex form
- Template ID: P018-T017
- Question Type: Parent function transformation
- Cognitive Skill: Interpret vertex form from transformations
- Difficulty: 3
- Estimated Time: 65 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Identify transformations of `y=x^2`.
- Example Question: Describe the transformation of `y=x^2` to `y=(x-2)^2+3`.
- Answer: Shift right 2 and up 3; vertex moves from `(0,0)` to `(2,3)`.
- Explanation: The `x-2` shifts the parabola right 2. The `+3` shifts it up 3.
- Distractors: left 2 and up 3; right 2 and down 3; stretch by 2 and up 3; vertex `(-2,3)`.
- Distractor Rationale: Horizontal sign error; vertical sign error; confuses shift with stretch; coordinate sign error.
- Randomization Rules: Use quadratic vertex form `(x-h)^2+k`.
- Validity Constraints: Coefficient should be 1 for this family.
- Metadata: phase_id=P018; prerequisites=[quadratic parent, horizontal/vertical shifts]; misconception_tags=[horizontal sign error, vertex coordinate error, shift-vs-stretch]; randomization_constraints=[quadratic shifts].
- Graph/Visual Variant: Show parent and shifted parabola.
- Modeling Variant: Minimum point moves in a cost graph.
- Reverse Variant: Given vertex `(2,3)`, write `y=(x-2)^2+3`.
- Equation Battle Variant: Vertex-shift card.
- Multi-stage Boss Variant: Identify vertex and range.
- Hint Mapping: H-P018-T017
- Tutorial Mapping: Tut-P018 sections Parent Function Transformations
- Socratic Mapping: Soc-P018 quadratic branch

## Template T018 - Absolute value transformation
- Template ID: P018-T018
- Question Type: Parent function transformation
- Cognitive Skill: Interpret `a|x-h|+k`
- Difficulty: 4
- Estimated Time: 75 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Identify transformations of `y=|x|`.
- Example Question: Describe the transformation of `y=|x|` to `y=-2|x+1|+4`.
- Answer: Shift left 1, vertical stretch by 2, reflect over the x-axis, and shift up 4. The vertex is `(-1,4)`.
- Explanation: `x+1` shifts left 1. The outside `-2` stretches y-values by 2 and reflects over the x-axis. The `+4` shifts up 4.
- Distractors: right 1, stretch 2, reflect x-axis, up 4; left 1, horizontal stretch 2, up 4; vertex `(1,4)`; shift left 1 and down 4 only.
- Distractor Rationale: Horizontal sign error; vertical-horizontal scale confusion; vertex sign error; misses reflection and stretch.
- Randomization Rules: Use transformed absolute value forms with shifts, outside scale, and optional reflection.
- Validity Constraints: Keep numbers small and vertex clear.
- Metadata: phase_id=P018; prerequisites=[absolute value parent, transformations]; misconception_tags=[horizontal sign error, scale confusion, missed reflection, vertex error]; randomization_constraints=[absolute value transformation].
- Graph/Visual Variant: V-shape with vertex and opening direction.
- Modeling Variant: Peak reward around a target input.
- Reverse Variant: Given vertex and opening direction, write a formula.
- Equation Battle Variant: Transform vertex and output scale.
- Multi-stage Boss Variant: Identify vertex, range, and opening direction.
- Hint Mapping: H-P018-T018
- Tutorial Mapping: Tut-P018 sections Parent Function Transformations
- Socratic Mapping: Soc-P018 absolute-value branch

## Template T019 - Error analysis: horizontal shift sign
- Template ID: P018-T019
- Question Type: Error analysis
- Cognitive Skill: Correct inside-sign misconception
- Difficulty: 3
- Estimated Time: 65 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Diagnose a horizontal shift sign error.
- Example Question: A student says `g(x)=f(x-4)` shifts the graph left 4. What is the mistake?
- Answer: `f(x-4)` shifts the graph right 4, not left 4.
- Explanation: Inside changes work opposite the visible sign. The expression `x-4` reaches old input values when the new x-value is 4 units larger.
- Distractors: The student is correct; it shifts up 4; it reflects over the y-axis; it vertically stretches by 4.
- Distractor Rationale: Accepts horizontal sign error; confuses inside with vertical shift; confuses subtraction with reflection; confuses shift with scale.
- Randomization Rules: Present common incorrect statements about inside transformations.
- Validity Constraints: Error must be about horizontal direction.
- Metadata: phase_id=P018; prerequisites=[horizontal shifts, function notation]; misconception_tags=[horizontal sign error, inside-outside confusion, shift-vs-scale]; randomization_constraints=[student error].
- Graph/Visual Variant: Show a key point moving from `(1,2)` to `(5,2)`.
- Modeling Variant: Correct a delayed-event notation claim.
- Reverse Variant: Write an incorrect statement for `f(x+3)` and correct it.
- Equation Battle Variant: Reject wrong-direction card.
- Multi-stage Boss Variant: Correct statement and map one point.
- Hint Mapping: H-P018-T019
- Tutorial Mapping: Tut-P018 sections Common Mistakes
- Socratic Mapping: Soc-P018 error branch

## Template T020 - Boss transformation challenge
- Template ID: P018-T020
- Question Type: Multi-stage boss
- Cognitive Skill: Decompose, map points, update domain/range, and identify graph features
- Difficulty: 5
- Estimated Time: 150 seconds
- Visual Required: true
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Complete a full transformation analysis.
- Example Question: Boss Gate: A function `f` contains points `(-1,2)`, `(0,4)`, and `(3,-2)`, with domain `[-1,3]` and range `[-2,4]`. Let `g(x)=-2f(x-1)+3`. Describe the transformations, find the transformed points, and give the domain and range of `g`.
- Answer: Shift right 1, vertical stretch by 2, reflect over x-axis, shift up 3. Points become `(0,-1)`, `(1,-5)`, and `(4,7)`. Domain `[0,4]`; range `[-5,7]`.
- Explanation: `x-1` shifts x-values right 1. Output rule is `y -> -2y+3`. For `(-1,2)`, new point is `(0,-4+3)=(0,-1)`. For `(0,4)`, `(1,-8+3)=(1,-5)`. For `(3,-2)`, `(4,4+3)=(4,7)`. Domain shifts right to `[0,4]`. Range values transform by `-2y+3`, so old range endpoints `-2` and 4 map to 7 and -5; reorder as `[-5,7]`.
- Distractors: domain `[-2,2]`, range `[-1,11]`; points `(-2,-1)`, `(-1,-5)`, `(2,7)`; range `[7,-5]`; shift left 1 and up 3 only.
- Distractor Rationale: Horizontal sign error and range transform error; shifts points left; fails to reorder interval endpoints; misses reflection and stretch.
- Randomization Rules: Use finite point sets, interval domain/range, horizontal shift, outside scale/reflection, and vertical shift.
- Validity Constraints: Output scale may be negative; final range endpoints must be reordered.
- Metadata: phase_id=P018; prerequisites=[point mapping, domain/range, combined transformations]; misconception_tags=[horizontal sign error, range reorder error, missed reflection, incomplete transformation]; randomization_constraints=[mixed boss].
- Graph/Visual Variant: Show original points and transformed points.
- Modeling Variant: Delayed input and inverted scaled score rule.
- Reverse Variant: Given transformed points, infer the formula.
- Equation Battle Variant: Shift-input, multiply-output, add-output, reorder-range cards.
- Multi-stage Boss Variant: This is the phase boss template.
- Hint Mapping: H-P018-T020
- Tutorial Mapping: Tut-P018 sections Full Phase Review
- Socratic Mapping: Soc-P018 boss branch

# Part II - Hint Bible

## H-P018-T001
- Hint 1 - Gentle Nudge: The `+4` is outside the function.
- Hint 2 - Concept Reminder: Outside changes affect y-values.
- Hint 3 - Focus Hint: Add 4 to every output.
- Hint 4 - Guided Next Step: Every point moves upward.
- Hint 5 - Nearly Complete: The graph shifts up 4 units.
- Hint 6 - Full Solution: `g(x)=f(x)+4` is `f` shifted up 4.

## H-P018-T002
- Hint 1 - Gentle Nudge: The `-3` is outside the function.
- Hint 2 - Concept Reminder: Outside subtraction lowers outputs.
- Hint 3 - Focus Hint: Every y-value loses 3.
- Hint 4 - Guided Next Step: Points move downward.
- Hint 5 - Nearly Complete: The graph shifts down 3 units.
- Hint 6 - Full Solution: `g(x)=f(x)-3` is `f` shifted down 3.

## H-P018-T003
- Hint 1 - Gentle Nudge: The change is inside the function.
- Hint 2 - Concept Reminder: `x-h` shifts right by `h`.
- Hint 3 - Focus Hint: Here `h=5`.
- Hint 4 - Guided Next Step: The graph moves horizontally, not vertically.
- Hint 5 - Nearly Complete: Inside subtraction moves right.
- Hint 6 - Full Solution: `g(x)=f(x-5)` shifts `f` right 5.

## H-P018-T004
- Hint 1 - Gentle Nudge: The `+2` is inside the function.
- Hint 2 - Concept Reminder: `x+h` shifts left by `h`.
- Hint 3 - Focus Hint: Here `h=2`.
- Hint 4 - Guided Next Step: The graph moves horizontally.
- Hint 5 - Nearly Complete: Inside addition moves left.
- Hint 6 - Full Solution: `g(x)=f(x+2)` shifts `f` left 2.

## H-P018-T005
- Hint 1 - Gentle Nudge: The negative sign is outside `f`.
- Hint 2 - Concept Reminder: Outside negation changes y to `-y`.
- Hint 3 - Focus Hint: Points flip vertically.
- Hint 4 - Guided Next Step: A vertical flip is across the x-axis.
- Hint 5 - Nearly Complete: It is not a y-axis reflection.
- Hint 6 - Full Solution: `g(x)=-f(x)` reflects `f` over the x-axis.

## H-P018-T006
- Hint 1 - Gentle Nudge: The negative sign is inside the input.
- Hint 2 - Concept Reminder: Input negation changes x to `-x`.
- Hint 3 - Focus Hint: Points flip horizontally.
- Hint 4 - Guided Next Step: A horizontal flip is across the y-axis.
- Hint 5 - Nearly Complete: It is not an x-axis reflection.
- Hint 6 - Full Solution: `g(x)=f(-x)` reflects `f` over the y-axis.

## H-P018-T007
- Hint 1 - Gentle Nudge: The 3 multiplies the output.
- Hint 2 - Concept Reminder: Outside multiplication affects y-values.
- Hint 3 - Focus Hint: Every output is tripled.
- Hint 4 - Guided Next Step: Y-values move farther from the x-axis.
- Hint 5 - Nearly Complete: This is a vertical stretch.
- Hint 6 - Full Solution: `g(x)=3f(x)` is a vertical stretch by factor 3.

## H-P018-T008
- Hint 1 - Gentle Nudge: The `1/2` multiplies the output.
- Hint 2 - Concept Reminder: Outside multiplication affects y-values directly.
- Hint 3 - Focus Hint: Every y-value is halved.
- Hint 4 - Guided Next Step: Points move closer to the x-axis.
- Hint 5 - Nearly Complete: This is vertical compression.
- Hint 6 - Full Solution: `g(x)=(1/2)f(x)` is a vertical compression by factor `1/2`.

## H-P018-T009
- Hint 1 - Gentle Nudge: The 2 is inside the function.
- Hint 2 - Concept Reminder: Inside scaling affects x-values by the reciprocal.
- Hint 3 - Focus Hint: `f(2x)` uses half the original x-value.
- Hint 4 - Guided Next Step: The graph gets narrower horizontally.
- Hint 5 - Nearly Complete: Scale factor is `1/2`.
- Hint 6 - Full Solution: `g(x)=f(2x)` is a horizontal compression by factor `1/2`.

## H-P018-T010
- Hint 1 - Gentle Nudge: The division by 3 is inside the input.
- Hint 2 - Concept Reminder: Inside scaling uses reciprocal logic.
- Hint 3 - Focus Hint: To get the same inside value, x must be 3 times larger.
- Hint 4 - Guided Next Step: The graph gets wider horizontally.
- Hint 5 - Nearly Complete: Scale factor is 3.
- Hint 6 - Full Solution: `g(x)=f(x/3)` is a horizontal stretch by factor 3.

## H-P018-T011
- Hint 1 - Gentle Nudge: Both changes are outside the function.
- Hint 2 - Concept Reminder: `-f(x)` reflects over the x-axis.
- Hint 3 - Focus Hint: `+2` shifts outputs up 2.
- Hint 4 - Guided Next Step: Describe both transformations.
- Hint 5 - Nearly Complete: Reflect, then move up.
- Hint 6 - Full Solution: Reflect over the x-axis, then shift up 2.

## H-P018-T012
- Hint 1 - Gentle Nudge: Separate inside and outside changes.
- Hint 2 - Concept Reminder: `x-3` shifts right 3.
- Hint 3 - Focus Hint: `-4` outside shifts down 4.
- Hint 4 - Guided Next Step: Combine the two descriptions.
- Hint 5 - Nearly Complete: Horizontal shift right, vertical shift down.
- Hint 6 - Full Solution: Shift right 3 and down 4.

## H-P018-T013
- Hint 1 - Gentle Nudge: Read the formula piece by piece.
- Hint 2 - Concept Reminder: `x-3` shifts right 3.
- Hint 3 - Focus Hint: Outside multiplier 2 stretches y-values.
- Hint 4 - Guided Next Step: Outside `+1` shifts up 1.
- Hint 5 - Nearly Complete: List all three transformations.
- Hint 6 - Full Solution: Right 3, vertical stretch by 2, up 1.

## H-P018-T014
- Hint 1 - Gentle Nudge: Transform the x-coordinate and y-coordinate separately.
- Hint 2 - Concept Reminder: `x-4` shifts points right 4.
- Hint 3 - Focus Hint: `+3` shifts points up 3.
- Hint 4 - Guided Next Step: `(2,5)` becomes `(2+4,5+3)`.
- Hint 5 - Nearly Complete: That is `(6,8)`.
- Hint 6 - Full Solution: The transformed point is `(6,8)`.

## H-P018-T015
- Hint 1 - Gentle Nudge: Domain changes with horizontal shifts.
- Hint 2 - Concept Reminder: `x-3` shifts the graph right 3.
- Hint 3 - Focus Hint: Add 3 to domain endpoints `-2` and `5`.
- Hint 4 - Guided Next Step: `[-2,5]` becomes `[1,8]`.
- Hint 5 - Nearly Complete: Add 4 to range endpoints `1` and `7`.
- Hint 6 - Full Solution: Domain `[1,8]`; range `[5,11]`.

## H-P018-T016
- Hint 1 - Gentle Nudge: Convert the words into inside/outside notation.
- Hint 2 - Concept Reminder: Left 2 means `x+2`.
- Hint 3 - Focus Hint: Up 5 means `+5` outside.
- Hint 4 - Guided Next Step: Put both into `g(x)=...`.
- Hint 5 - Nearly Complete: Use `f(x+2)+5`.
- Hint 6 - Full Solution: `g(x)=f(x+2)+5`.

## H-P018-T017
- Hint 1 - Gentle Nudge: Compare to parent `y=x^2`.
- Hint 2 - Concept Reminder: `(x-2)^2` shifts right 2.
- Hint 3 - Focus Hint: `+3` shifts up 3.
- Hint 4 - Guided Next Step: The vertex follows those shifts.
- Hint 5 - Nearly Complete: Vertex moves from `(0,0)` to `(2,3)`.
- Hint 6 - Full Solution: Shift right 2 and up 3; vertex `(2,3)`.

## H-P018-T018
- Hint 1 - Gentle Nudge: Find the inside shift first.
- Hint 2 - Concept Reminder: `x+1` shifts left 1.
- Hint 3 - Focus Hint: Outside `-2` reflects over x-axis and vertically stretches by 2.
- Hint 4 - Guided Next Step: `+4` shifts up 4.
- Hint 5 - Nearly Complete: The vertex is shifted to `(-1,4)`.
- Hint 6 - Full Solution: Left 1, vertical stretch 2, reflect over x-axis, up 4; vertex `(-1,4)`.

## H-P018-T019
- Hint 1 - Gentle Nudge: Horizontal shifts have opposite-looking signs.
- Hint 2 - Concept Reminder: `x-4` shifts right 4.
- Hint 3 - Focus Hint: A left shift would be `f(x+4)`.
- Hint 4 - Guided Next Step: Correct the student's direction.
- Hint 5 - Nearly Complete: The mistake is saying left instead of right.
- Hint 6 - Full Solution: `f(x-4)` shifts right 4, not left 4.

## H-P018-T020
- Hint 1 - Gentle Nudge: Transform x-values and y-values separately.
- Hint 2 - Concept Reminder: `x-1` shifts every point right 1.
- Hint 3 - Focus Hint: Output rule is `y -> -2y+3`.
- Hint 4 - Guided Next Step: Apply this to each original y-value.
- Hint 5 - Nearly Complete: Domain shifts right; range transforms and must be reordered.
- Hint 6 - Full Solution: Transformations: right 1, vertical stretch 2, reflect x-axis, up 3. Points `(0,-1)`, `(1,-5)`, `(4,7)`. Domain `[0,4]`; range `[-5,7]`.

# Part III - Tutorial Bible

## Learning Goal
Learn how formulas like `f(x-3)+2`, `-f(x)`, and `2f(x)` move, flip, stretch, and compress function graphs.

## Why It Matters
Transformations let players build complex graphs from familiar parent functions. They are the bridge from function notation to graph design, modeling, inverse functions, piecewise functions, quadratics, and trigonometric graphs.

## Prerequisite Check
Ask the player:

1. Does `f(x)+3` change inputs or outputs? Expected: outputs.
2. Does `f(x-3)` change inputs or outputs? Expected: inputs.
3. What point results from shifting `(2,5)` right 4? Expected: `(6,5)`.
4. What point results from reflecting `(2,5)` over the x-axis? Expected: `(2,-5)`.
5. What point results from reflecting `(2,5)` over the y-axis? Expected: `(-2,5)`.

## Core Concept
Transformations change a graph by changing inputs or outputs.

Outside changes affect y-values directly.

Inside changes affect x-values, often in the opposite-looking direction.

## Vertical Shifts
`g(x)=f(x)+k` shifts the graph up `k`.

`g(x)=f(x)-k` shifts the graph down `k`.

Point rule:

`(x,y) -> (x,y+k)`

## Horizontal Shifts
`g(x)=f(x-h)` shifts the graph right `h`.

`g(x)=f(x+h)` shifts the graph left `h`.

Point rule:

Right `h`: `(x,y) -> (x+h,y)`

Left `h`: `(x,y) -> (x-h,y)`

## Reflections
`g(x)=-f(x)` reflects over the x-axis.

Point rule:

`(x,y) -> (x,-y)`

`g(x)=f(-x)` reflects over the y-axis.

Point rule:

`(x,y) -> (-x,y)`

## Vertical Scaling
`g(x)=a f(x)` multiplies y-values by `a`.

- If `a>1`, vertical stretch.
- If `0<a<1`, vertical compression.
- If `a<0`, reflect over x-axis and scale by `|a|`.

Point rule:

`(x,y) -> (x,ay)`

## Horizontal Scaling
Inside scaling affects x-values by a reciprocal.

`g(x)=f(bx)` compresses horizontally by factor `1/b` when `b>1`.

Point rule:

`(x,y) -> (x/b,y)`

`g(x)=f(x/b)` stretches horizontally by factor `b`.

Point rule:

`(x,y) -> (bx,y)`

## Combined Transformations
For `g(x)=2f(x-3)+1`:

- `x-3`: shift right 3.
- `2f(...)`: vertical stretch by 2.
- `+1`: shift up 1.

Point `(4,5)` becomes `(7,11)`.

## Full Transformation Form
A common form is:

`g(x)=a f(b(x-h))+k`

- `h` controls horizontal shift.
- `b` controls horizontal scale by reciprocal `1/b`.
- `a` controls vertical scale and possible x-axis reflection.
- `k` controls vertical shift.

For this phase, emphasize meaning over memorizing a rigid order.

## Point Mapping
Point mapping is often the safest method.

If `(2,5)` is on `f` and `g(x)=f(x-4)+3`, then:

- x shifts right 4: `2 -> 6`
- y shifts up 3: `5 -> 8`

New point: `(6,8)`.

## Domain and Range Effects
Horizontal transformations affect domain.

Vertical transformations affect range.

Example:

If domain of `f` is `[-2,5]` and `g(x)=f(x-3)+4`, domain shifts right 3:

`[1,8]`

If range of `f` is `[1,7]`, range shifts up 4:

`[5,11]`

If a vertical scale is negative, transform endpoints and reorder them from least to greatest.

## Matching Graphs and Formulas
To match a transformed graph:

1. Look for horizontal movement.
2. Look for vertical movement.
3. Look for reflection.
4. Look for stretch or compression.
5. Translate those movements into inside and outside notation.

## Parent Function Transformations
Quadratic parent:

`y=(x-h)^2+k`

Vertex: `(h,k)`.

Absolute value parent:

`y=a|x-h|+k`

Vertex: `(h,k)`, with vertical scale `a` and reflection if `a<0`.

## Common Mistakes
- Mistake: `f(x-3)` means left 3.
  Correction: Inside subtraction means right 3.
- Mistake: `f(x+3)` means right 3.
  Correction: Inside addition means left 3.
- Mistake: `-f(x)` reflects over y-axis.
  Correction: Outside negation reflects over x-axis.
- Mistake: `f(-x)` reflects over x-axis.
  Correction: Inside negation reflects over y-axis.
- Mistake: `f(2x)` stretches horizontally by 2.
  Correction: It compresses horizontally by `1/2`.
- Mistake: Negative vertical scale gives range endpoints in the written order.
  Correction: Transform endpoints, then reorder least to greatest.

## Guided Practice
1. Describe `g(x)=f(x+4)-2`.
   - `x+4`: left 4.
   - `-2`: down 2.

2. If `(1,3)` is on `f`, find the transformed point for `g(x)=-f(x)+5`.
   - x unchanged.
   - y becomes `-3+5=2`.
   - New point `(1,2)`.

3. If `f` has range `[0,6]`, find the range of `g(x)=-2f(x)+1`.
   - Transform endpoints: `0 -> 1`, `6 -> -11`.
   - Reorder: `[-11,1]`.

## Independent Practice
1. `g(x)=f(x)+7`; answer: up 7.
2. `g(x)=f(x-2)`; answer: right 2.
3. `g(x)=f(x+5)`; answer: left 5.
4. `g(x)=-f(x)`; answer: reflect over x-axis.
5. `g(x)=f(-x)`; answer: reflect over y-axis.
6. If `(3,-1)` is on `f`, then for `g(x)=2f(x-4)+3`, transformed point is `(7,1)`.

## Mastery Check
The player is ready to advance when they can:

1. Distinguish inside and outside transformations.
2. Identify horizontal and vertical shifts.
3. Identify reflections and scaling.
4. Map points from `f` to `g`.
5. Update domain and range after transformations.
6. Match transformed graphs to formulas.
7. Correct sign and reciprocal-scale mistakes.

Mastery check set:

1. `g(x)=f(x-6)+2`; right 6, up 2.
2. `g(x)=-3f(x)`; reflect over x-axis and vertical stretch by 3.
3. `g(x)=f(4x)`; horizontal compression by `1/4`.
4. `(2,5)` under `g(x)=f(x+1)-4` becomes `(1,1)`.
5. If `f` has range `[-2,3]`, `g(x)=-f(x)+1` has range `[-2,3]`? Corrected: endpoints transform to `3` and `-2`, so range `[-2,3]`; this example is symmetric but still requires endpoint transformation.

## Adaptive Tutor Messages
- If horizontal signs are reversed: "Inside shifts feel opposite: `x-h` means right, `x+h` means left."
- If reflections are confused: "Outside negative flips y-values across the x-axis; inside negative flips x-values across the y-axis."
- If scaling is mistaken for shifting: "Multiplication stretches or compresses; addition shifts."
- If horizontal scaling is wrong: "Inside scaling uses reciprocal movement in x-values."
- If point mapping is wrong: "Transform x-values for inside changes and y-values for outside changes."
- If range endpoints are reversed after negative scaling: "Transform both endpoints, then write from least to greatest."
- If the player succeeds quickly: "You are ready to combine functions and transformations in composition."

## Tutorial Metadata
- Tutorial ID: Tut-P018
- Estimated duration: 7 minutes
- Target player state: knows function notation, graph domain/range, and coordinate points
- Unlock condition: available from any Phase 018 question
- Remediation trigger: two horizontal sign errors, two axis-reflection errors, one reciprocal-scale error, or repeated point-mapping errors
- Advancement trigger: 80 percent accuracy on mixed transformations including shifts, reflections, scaling, point mapping, graph matching, and domain/range transfer

# Part IV - Socratic Dialogue Bible

## Opening Diagnostic
Tutor: "If `g(x)=f(x-3)+2`, what part changes x-values and what part changes y-values?"

Expected strong answer: "`x-3` changes x-values by shifting right 3; `+2` changes y-values by shifting up 2."

## Guided Discovery
Tutor sequence:

1. "Is the change inside the function or outside the function?"
2. "Does it affect x-values or y-values?"
3. "Is it addition/subtraction or multiplication?"
4. "For an inside shift, does the direction look opposite?"
5. "For a negative sign, is it inside or outside?"
6. "For scaling, is it vertical or horizontal?"
7. "Do horizontal scale factors use a reciprocal?"
8. "How does a sample point move?"
9. "How do domain and range change?"
10. "Can the transformed graph or formula be checked with a key point?"

## Correct Branch
Player: "`x-3` shifts right and `+2` shifts up."

Tutor: "Good. If `(1,4)` is on `f`, what point would be on `g`?"

If player answers `(4,6)`, ask for a verbal explanation.

## Partial Understanding Branch
Player identifies vertical shift but misses horizontal sign.

Tutor: "Focus on the inside expression. What input value makes `x-3` equal the old input 1?"

Recovery target: Player sees x must be 4, so the graph moved right.

## Misconception Branch
Player says `f(x-3)` shifts left 3.

Tutor: "Test a point. If old input 0 produced a key output, what new x-value makes `x-3=0`?"

Recovery target: Player says x=3, so right 3.

## Reflection Branch
Player confuses `-f(x)` and `f(-x)`.

Tutor: "Which coordinate changes sign: the output y-value or the input x-value?"

Recovery target: Player links outside negative to x-axis reflection and inside negative to y-axis reflection.

## Scaling Branch
Player says `f(2x)` stretches horizontally by 2.

Tutor: "If old input 4 gave an output, what new x-value makes `2x=4`?"

Recovery target: Player says x=2, so horizontal compression by `1/2`.

## Domain Range Branch
Player leaves domain and range unchanged after a shift.

Tutor: "If every point moves right 3, what happens to the smallest and largest x-values?"

Recovery target: Player shifts domain endpoints.

## Unsure Branch
Player: "I do not know where to start."

Tutor: "Circle the parts inside the function parentheses and underline the parts outside. Which parts did you find?"

Then guide inside versus outside.

## Unrelated Response Branch
Player gives an unrelated answer.

Tutor: "Let's reduce this to one choice: is the `-3` inside `f(...)` or outside it?"

If unrelated again, ask the player to identify only the inside expression.

## Recovery Prompts
- "Is the change inside or outside?"
- "Does it affect x-values or y-values?"
- "Is the operation addition/subtraction or multiplication?"
- "Does an inside shift move opposite the sign?"
- "Which axis does this reflection use?"
- "What happens to a single point?"
- "How do domain endpoints move?"
- "How do range endpoints move?"
- "Do transformed range endpoints need to be reordered?"

## Reflection Question
"Why does `f(x-3)` move right even though the formula contains a minus sign?"

Strong reflection: "To get the old input value inside the function, the new x-value must be 3 larger. So the same graph features appear 3 units to the right."

## Transfer Question
"How will transformations help with function composition?"

Expected transfer: "Transformations are built from changing inputs and outputs, and composition also changes what input is fed into a function."

## Escalation Rules
- If vertical shift errors repeat, show Vertical Shifts.
- If horizontal sign errors repeat, show Horizontal Shifts.
- If reflection errors repeat, show Reflections.
- If scale errors repeat, show Vertical Scaling or Horizontal Scaling.
- If point-mapping errors repeat, show Point Mapping.
- If domain/range errors repeat, show Domain and Range Effects.
- If the player correctly describes and maps five mixed transformations, advance to independent practice.

## Exit Condition
The Socratic sequence is complete when the player:

1. Separates inside and outside transformations.
2. Identifies shifts, reflections, and scales.
3. Applies horizontal sign and reciprocal rules.
4. Maps points accurately.
5. Updates domain and range.
6. Matches a transformed graph to its formula.

# Knowledge Graph

- Prerequisites: Phase 014 function notation; Phase 016 domain from graphs; Phase 017 range from graphs; coordinate point transformations; parent graph recognition
- Concepts Unlocked: vertical shifts; horizontal shifts; x-axis reflection; y-axis reflection; vertical stretch and compression; horizontal stretch and compression; point mapping; transformed domain and range; parent function forms
- Related Concepts: function composition; inverse functions; piecewise functions; quadratic vertex form; absolute value graphs; trigonometric graph transformations
- Common Misconceptions: horizontal sign reversal; reflection-axis confusion; vertical-horizontal scale confusion; reciprocal horizontal scale error; point mapping order error; unchanged domain/range assumption; unreordered range after negative scale
- Remedial Phases: Phase 014 review; Phase 016 review; Phase 017 review; coordinate reflection mini-lesson; interval transformation mini-lesson
- Follow-up Phases: Phase 019 - Function composition; Phase 020 - Inverse functions; Phase 021 - Piecewise functions; Phase 026 - Quadratic graphs; Phase 046 - Trigonometric graphs
- Transfer Topics: graph design; vertex form; function composition; inverse transformations; amplitude and period; phase shifts

# Validation Notes

## Structure Validation
- Includes all required Bibles and metadata sections.
- Contains exactly 20 template families, within the required 20-40 range.
- Each template includes example, answer, explanation, distractors, distractor rationale, randomization rules, validity constraints, metadata, variants, and mappings.
- Every template has six progressive hints.

## Math Validation
- T001: `f(x)+4` shifts outputs up 4.
- T002: `f(x)-3` shifts outputs down 3.
- T003: `f(x-5)` shifts right 5.
- T004: `f(x+2)` shifts left 2.
- T005: `-f(x)` maps `(x,y)` to `(x,-y)`, x-axis reflection.
- T006: `f(-x)` maps `(x,y)` to `(-x,y)`, y-axis reflection.
- T007: `3f(x)` multiplies y-values by 3.
- T008: `(1/2)f(x)` multiplies y-values by `1/2`.
- T009: `f(2x)` maps original x to half its value, horizontal compression by `1/2`.
- T010: `f(x/3)` maps original x to triple its value, horizontal stretch by 3.
- T011: `-f(x)+2` maps y to `-y+2`.
- T012: `f(x-3)-4` shifts right 3 and down 4.
- T013: `2f(x-3)+1` shifts right 3, stretches vertically by 2, shifts up 1.
- T014: `(2,5)` under `f(x-4)+3` maps to `(6,8)`.
- T015: domain `[-2,5]` shifted right 3 gives `[1,8]`; range `[1,7]` shifted up 4 gives `[5,11]`.
- T016: left 2 and up 5 gives `f(x+2)+5`.
- T017: `(x-2)^2+3` has vertex `(2,3)`.
- T018: `-2|x+1|+4` has vertex `(-1,4)`, x-axis reflection, vertical stretch 2.
- T019: `f(x-4)` shifts right 4.
- T020: `x-1` shifts right 1; y-rule `-2y+3` maps points to `(0,-1)`, `(1,-5)`, `(4,7)`; domain `[0,4]`; range `[-5,7]`.

## Distractor Validation
- Distractors reflect horizontal sign errors, inside-outside confusion, axis-reflection confusion, reciprocal-scale errors, shift-vs-scale confusion, missed transformations, point-mapping errors, and range endpoint reorder errors.
- Multiple-choice-style templates have exactly one correct answer.
- Point and interval distractors were checked against transformation rules.

## Hint Validation
- Each hint sequence moves from identifying inside/outside change to direction, point effect, and final transformation statement.
- Combined and boss hints separate x-value and y-value effects.

## Tutorial Validation
- Tutorial includes learning goal, why it matters, prerequisite check, core concept, vertical shifts, horizontal shifts, reflections, vertical scaling, horizontal scaling, combined transformations, full form, point mapping, domain and range effects, graph/formula matching, parent functions, common mistakes, guided practice, independent practice, mastery check, adaptive messages, and metadata.

## Socratic Validation
- Dialogue includes diagnostic, guided discovery, correct branch, partial branch, misconception branch, reflection branch, scaling branch, domain/range branch, unsure branch, unrelated branch, recovery prompts, reflection, transfer, escalation rules, and exit condition.
- Tutor uses point testing to recover horizontal sign and scale misconceptions.

## Metadata Validation
- Every template includes IDs, difficulty, timing, visual flag, compatibility flags, prerequisites, misconception tags, randomization constraints, and support-system mappings.

## Known Issues
- The repository specifications differ on the label for Hint 4. This phase uses "Guided Next Step" to match the master prompt language.
- `PHASE_TEMPLATE.md` omits Common Misconceptions from the Knowledge Graph section, but this phase includes it because the master prompt and knowledge graph guide require it.
