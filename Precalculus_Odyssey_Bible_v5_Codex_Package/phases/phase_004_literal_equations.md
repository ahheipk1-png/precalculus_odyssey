# Phase 004 - Literal Equations

## Phase Metadata
- Course: Precalculus Odyssey Bible v5
- Topic: Literal equations
- Subtopic: Rearranging formulas to isolate a target variable
- Prerequisites: Phase 001 one-step equations, Phase 002 multi-step equations, Phase 003 variables on both sides, fraction operations, factoring a common variable, nonzero denominator restrictions
- Related phases: Phase 005 - Linear equation modeling; Phase 014 - Function notation; Phase 020 - Inverse functions; Phase 038 - Compound interest
- Estimated phase size: 20 template families, 20 core examples, 120 progressive hints, 1 tutorial sequence, 1 Socratic dialogue system

## Learning Objectives
By the end of this phase, the player can:

1. Identify the target variable in a formula.
2. Treat all non-target variables as known constants.
3. Use inverse operations to isolate the target variable.
4. Rearrange formulas involving products, quotients, sums, parentheses, fractions, and repeated target variables.
5. State restrictions such as nonzero denominators.
6. Check a rearranged formula by substituting it back symbolically or numerically.
7. Explain why equivalent rearrangements may look different but mean the same thing.

## Prerequisite Review
- In `ax + b = c`, solving for `x` gives `x = (c - b)/a` when `a != 0`.
- A letter can act like a known constant when it is not the target variable.
- Division by zero is undefined, so formulas with denominators require restrictions.
- Parentheses can be undone by division or distribution depending on the structure.
- If the target variable appears in more than one term, collect or factor it.

## Core Concepts
- A literal equation is an equation with multiple variables.
- "Solve for a variable" means isolate that variable on one side.
- Other letters stay in the answer because their values are not specified.
- Rearranging formulas uses the same balance principle as numeric equations.
- Restrictions are part of the answer because some algebraic moves require nonzero quantities.

## Common Misconceptions
- Treating all letters as unknowns to solve numerically.
- Dividing by a variable without stating it cannot be zero.
- Moving only part of a product or quotient.
- Forgetting to distribute or factor when the target appears more than once.
- Leaving the target variable on both sides.
- Dropping constants such as `pi`, `1/2`, or squared variables.
- Reversing equivalent forms incorrectly, such as writing `(A/P - 1)/t` as `A/(P - 1)t`.

# Part I - Question Bible

## Template T001 - Perimeter formula for length
- Template ID: P004-T001
- Question Type: Direct computation
- Cognitive Skill: Isolate target in sum of products
- Difficulty: 2
- Estimated Time: 45 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve a formula with two target-related operations.
- Example Question: Solve `P = 2L + 2W` for `L`.
- Answer: `L = (P - 2W)/2`, equivalent to `L = P/2 - W`.
- Explanation: Subtract `2W` from both sides to get `P - 2W = 2L`, then divide by 2.
- Distractors: `L = P - 2W/2`; `L = (P + 2W)/2`; `L = P - W`; `L = P/(2W)`
- Distractor Rationale: Divides only one term; uses wrong inverse for `+2W`; drops the factor 2; treats `2W` as a single divisor.
- Randomization Rules: Use formulas `A = bx + c` and solve for `x` with symbolic constants.
- Validity Constraints: Coefficient of target must be nonzero.
- Metadata: phase_id=P004; prerequisites=[two-step equations, symbolic constants]; misconception_tags=[partial division, wrong inverse operation, drops coefficient]; randomization_constraints=[target coefficient nonzero].
- Graph/Visual Variant: Rectangle diagram with perimeter segments `L`, `L`, `W`, `W`.
- Modeling Variant: Given perimeter and width, rearrange before substituting values.
- Reverse Variant: Start from `L = (P - 2W)/2` and rebuild `P = 2L + 2W`.
- Equation Battle Variant: Cards: `-2W`, then `/2`.
- Multi-stage Boss Variant: Rearrange, state restriction if any, then verify by substitution.
- Hint Mapping: H-P004-T001
- Tutorial Mapping: Tut-P004 sections Core Concept and Worked Example
- Socratic Mapping: Soc-P004 isolate branch

## Template T002 - Area rectangle product
- Template ID: P004-T002
- Question Type: Direct computation
- Cognitive Skill: Undo multiplication by another variable
- Difficulty: 1
- Estimated Time: 30 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve a product formula for one factor.
- Example Question: Solve `A = lw` for `l`.
- Answer: `l = A/w`, with `w != 0`.
- Explanation: Divide both sides by `w` because `l` is multiplied by `w`.
- Distractors: `l = Aw`; `l = A - w`; `l = w/A`; `l = A + w`
- Distractor Rationale: Multiplies instead of divides; uses subtraction; takes reciprocal incorrectly; uses addition.
- Randomization Rules: Use product formulas with target multiplied by one non-target factor.
- Validity Constraints: Divisor factor cannot be zero.
- Metadata: phase_id=P004; prerequisites=[one-step multiplication equations]; misconception_tags=[multiplies instead of divides, reciprocal confusion, missing restriction]; randomization_constraints=[non-target factor nonzero].
- Graph/Visual Variant: Rectangle area as length times width.
- Modeling Variant: Find length formula from area and width.
- Reverse Variant: Rebuild `A = lw` from `l = A/w`.
- Equation Battle Variant: Card: `/w`.
- Multi-stage Boss Variant: Ask for restriction `w != 0`.
- Hint Mapping: H-P004-T002
- Tutorial Mapping: Tut-P004 sections Restrictions
- Socratic Mapping: Soc-P004 product branch

## Template T003 - Distance formula for time
- Template ID: P004-T003
- Question Type: Direct computation
- Cognitive Skill: Isolate factor in rate formula
- Difficulty: 1
- Estimated Time: 30 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve `d = rt` for a chosen factor.
- Example Question: Solve `d = rt` for `t`.
- Answer: `t = d/r`, with `r != 0`.
- Explanation: Since `t` is multiplied by `r`, divide both sides by `r`.
- Distractors: `t = dr`; `t = r/d`; `t = d - r`; `t = d + r`
- Distractor Rationale: Multiplies instead of divides; reciprocal confusion; wrong inverse family; arbitrary addition.
- Randomization Rules: Use formulas with target as one factor in a product.
- Validity Constraints: Non-target multiplier cannot be zero.
- Metadata: phase_id=P004; prerequisites=[product equations, unit meaning]; misconception_tags=[multiplies instead of divides, reciprocal confusion, missing restriction]; randomization_constraints=[r nonzero].
- Graph/Visual Variant: Distance-rate-time triangle as optional memory support.
- Modeling Variant: Rearrange before calculating travel time.
- Reverse Variant: From `t = d/r`, multiply both sides by `r` to recover `d = rt`.
- Equation Battle Variant: Card: `/r`.
- Multi-stage Boss Variant: Include unit interpretation: distance divided by rate gives time.
- Hint Mapping: H-P004-T003
- Tutorial Mapping: Tut-P004 sections Product Formulas
- Socratic Mapping: Soc-P004 product branch

## Template T004 - Circumference for radius
- Template ID: P004-T004
- Question Type: Direct computation
- Cognitive Skill: Treat constants and symbols as factors
- Difficulty: 2
- Estimated Time: 40 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve a formula containing a numeric-symbolic coefficient.
- Example Question: Solve `C = 2*pi*r` for `r`.
- Answer: `r = C/(2*pi)`.
- Explanation: The target `r` is multiplied by `2*pi`, so divide both sides by `2*pi`.
- Distractors: `r = C - 2*pi`; `r = 2*pi*C`; `r = 2C/pi`; `r = C/pi`
- Distractor Rationale: Uses subtraction; multiplies instead of divides; mishandles factor 2; drops factor 2.
- Randomization Rules: Use geometric formulas where the target is multiplied by constants and other symbols.
- Validity Constraints: Divisor coefficient must be nonzero; `pi` is a positive constant.
- Metadata: phase_id=P004; prerequisites=[product equations, constants]; misconception_tags=[drops constant factor, wrong inverse operation, partial divisor]; randomization_constraints=[nonzero coefficient].
- Graph/Visual Variant: Circle with circumference and radius labeled.
- Modeling Variant: Rearrange circumference formula before estimating radius.
- Reverse Variant: Substitute `r = C/(2*pi)` back into `2*pi*r`.
- Equation Battle Variant: Card: `/(2*pi)`.
- Multi-stage Boss Variant: Ask whether `2*pi` is one full coefficient.
- Hint Mapping: H-P004-T004
- Tutorial Mapping: Tut-P004 sections Constants in Formulas
- Socratic Mapping: Soc-P004 coefficient branch

## Template T005 - Fahrenheit formula for Celsius
- Template ID: P004-T005
- Question Type: Direct computation
- Cognitive Skill: Undo addition then fractional coefficient
- Difficulty: 3
- Estimated Time: 60 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Rearrange a formula with a fraction coefficient and constant.
- Example Question: Solve `F = (9/5)C + 32` for `C`.
- Answer: `C = (5/9)(F - 32)`.
- Explanation: Subtract 32: `F - 32 = (9/5)C`. Multiply by the reciprocal `5/9`.
- Distractors: `C = (9/5)(F - 32)`; `C = (F + 32)(5/9)`; `C = F - 32/9`; `C = (F - 32)/5`
- Distractor Rationale: Uses coefficient instead of reciprocal; wrong inverse for 32; divides one term only; drops factor 9.
- Randomization Rules: Use `Y = ax + b` where `a` is fractional and solve for `x`.
- Validity Constraints: Fraction coefficient must be nonzero.
- Metadata: phase_id=P004; prerequisites=[fraction coefficient equations, two-step equations]; misconception_tags=[uses fraction instead of reciprocal, wrong inverse operation, partial division]; randomization_constraints=[nonzero fraction coefficient].
- Graph/Visual Variant: Temperature scale conversion slider.
- Modeling Variant: Convert formula before using Celsius as the input variable.
- Reverse Variant: Start with `C = (5/9)(F - 32)` and solve back for `F`.
- Equation Battle Variant: Cards: `-32`, then `*5/9`.
- Multi-stage Boss Variant: Require the player to keep parentheses around `F - 32`.
- Hint Mapping: H-P004-T005
- Tutorial Mapping: Tut-P004 sections Fraction Coefficients
- Socratic Mapping: Soc-P004 fraction branch

## Template T006 - Slope-intercept formula for x
- Template ID: P004-T006
- Question Type: Direct computation
- Cognitive Skill: Rearrange function rule for input
- Difficulty: 3
- Estimated Time: 55 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve `y = mx + b` for `x`.
- Example Question: Solve `y = mx + b` for `x`.
- Answer: `x = (y - b)/m`, with `m != 0`.
- Explanation: Subtract `b` from both sides, then divide by `m`.
- Distractors: `x = y - b/m`; `x = (y + b)/m`; `x = m(y - b)`; `x = y/(m + b)`
- Distractor Rationale: Divides only `b`; uses wrong inverse for `b`; multiplies instead of divides; treats sum as a product.
- Randomization Rules: Use linear formulas `output = coefficient*target + constant`.
- Validity Constraints: Coefficient of target must be nonzero.
- Metadata: phase_id=P004; prerequisites=[two-step equations, function notation readiness]; misconception_tags=[partial division, wrong inverse operation, missing restriction]; randomization_constraints=[m nonzero].
- Graph/Visual Variant: Line graph showing `x` as the input that produces a given `y`.
- Modeling Variant: Find input needed for a target output.
- Reverse Variant: Solve `x = (y-b)/m` back to `y = mx + b`.
- Equation Battle Variant: Cards: `-b`, then `/m`.
- Multi-stage Boss Variant: Ask for the restriction and why horizontal lines with `m=0` cannot be inverted this way.
- Hint Mapping: H-P004-T006
- Tutorial Mapping: Tut-P004 sections Linear Formulas
- Socratic Mapping: Soc-P004 linear branch

## Template T007 - Solve for a coefficient
- Template ID: P004-T007
- Question Type: Direct computation
- Cognitive Skill: Target is coefficient, not x
- Difficulty: 3
- Estimated Time: 50 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Isolate a coefficient variable in a linear equation.
- Example Question: Solve `ax + b = c` for `a`.
- Answer: `a = (c - b)/x`, with `x != 0`.
- Explanation: Subtract `b`: `ax = c - b`. Divide by `x`.
- Distractors: `a = c - b/x`; `a = x(c - b)`; `a = (c + b)/x`; `a = c/(x + b)`
- Distractor Rationale: Divides only `b`; multiplies instead of divides; wrong inverse for `b`; treats sum as a product.
- Randomization Rules: Change the target variable among symbols in linear formulas.
- Validity Constraints: The factor attached to the target cannot be zero.
- Metadata: phase_id=P004; prerequisites=[target-variable awareness, two-step equations]; misconception_tags=[solves for wrong variable, partial division, missing restriction]; randomization_constraints=[target factor nonzero].
- Graph/Visual Variant: Highlight the target letter `a` in a different color.
- Modeling Variant: Solve for an unknown rate or coefficient from observed output.
- Reverse Variant: Multiply by `x` and add `b` to recover `ax + b = c`.
- Equation Battle Variant: Cards: `-b`, then `/x`.
- Multi-stage Boss Variant: Include a decoy prompt asking for `x` to test target awareness.
- Hint Mapping: H-P004-T007
- Tutorial Mapping: Tut-P004 sections Target Variable
- Socratic Mapping: Soc-P004 target branch

## Template T008 - Rectangular prism volume
- Template ID: P004-T008
- Question Type: Direct computation
- Cognitive Skill: Divide by a product of factors
- Difficulty: 2
- Estimated Time: 45 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve a product formula with several non-target factors.
- Example Question: Solve `V = lwh` for `h`.
- Answer: `h = V/(lw)`, with `l != 0` and `w != 0`.
- Explanation: The target `h` is multiplied by `l` and `w`, so divide both sides by the product `lw`.
- Distractors: `h = V - lw`; `h = V/l + w`; `h = Vlw`; `h = lw/V`
- Distractor Rationale: Uses subtraction; divides by only one factor then adds; multiplies; reciprocal confusion.
- Randomization Rules: Use formulas where target is one factor in a product of three or more symbols.
- Validity Constraints: Product of non-target factors must be nonzero.
- Metadata: phase_id=P004; prerequisites=[product formulas, restrictions]; misconception_tags=[partial divisor, reciprocal confusion, missing restriction]; randomization_constraints=[l and w nonzero].
- Graph/Visual Variant: 3D rectangular prism with length, width, height.
- Modeling Variant: Rearrange for missing height from volume.
- Reverse Variant: Substitute `h = V/(lw)` into `lwh` to recover `V`.
- Equation Battle Variant: Card: `/(lw)`.
- Multi-stage Boss Variant: Ask why both `l` and `w` must be nonzero.
- Hint Mapping: H-P004-T008
- Tutorial Mapping: Tut-P004 sections Product Formulas
- Socratic Mapping: Soc-P004 product branch

## Template T009 - Triangle area for height
- Template ID: P004-T009
- Question Type: Direct computation
- Cognitive Skill: Undo fraction multiplier
- Difficulty: 3
- Estimated Time: 50 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Rearrange formulas with a `1/2` coefficient.
- Example Question: Solve `A = (1/2)bh` for `h`.
- Answer: `h = 2A/b`, with `b != 0`.
- Explanation: Multiply both sides by 2: `2A = bh`. Divide by `b`: `h = 2A/b`.
- Distractors: `h = A/(2b)`; `h = 2Ab`; `h = A - b/2`; `h = b/(2A)`
- Distractor Rationale: Divides by 2 instead of multiplying; multiplies by `b`; invalid subtraction; reciprocal confusion.
- Randomization Rules: Use formulas with coefficient `1/2` times a product.
- Validity Constraints: Non-target base factor cannot be zero.
- Metadata: phase_id=P004; prerequisites=[fraction coefficients, product formulas]; misconception_tags=[uses half instead of double, reciprocal confusion, missing restriction]; randomization_constraints=[b nonzero].
- Graph/Visual Variant: Triangle with base and height labeled.
- Modeling Variant: Find height from area and base.
- Reverse Variant: Start from `h = 2A/b` and derive `A = (1/2)bh`.
- Equation Battle Variant: Cards: `*2`, then `/b`.
- Multi-stage Boss Variant: Ask why doubling area appears.
- Hint Mapping: H-P004-T009
- Tutorial Mapping: Tut-P004 sections Fraction Coefficients
- Socratic Mapping: Soc-P004 fraction branch

## Template T010 - Simple interest for rate
- Template ID: P004-T010
- Question Type: Direct computation
- Cognitive Skill: Divide by product to isolate factor
- Difficulty: 2
- Estimated Time: 45 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve `I = Prt` for any factor.
- Example Question: Solve `I = Prt` for `r`.
- Answer: `r = I/(Pt)`, with `P != 0` and `t != 0`.
- Explanation: `r` is multiplied by `P` and `t`, so divide both sides by `Pt`.
- Distractors: `r = IPt`; `r = I/P + t`; `r = Pt/I`; `r = I - Pt`
- Distractor Rationale: Multiplies; divides by only one factor then adds; reciprocal confusion; uses subtraction.
- Randomization Rules: Use product formulas with three factors and choose any one as target.
- Validity Constraints: Product of non-target factors must be nonzero.
- Metadata: phase_id=P004; prerequisites=[product equations, restrictions]; misconception_tags=[partial divisor, reciprocal confusion, missing restriction]; randomization_constraints=[P and t nonzero].
- Graph/Visual Variant: Interest formula tile showing three factors.
- Modeling Variant: Solve for rate before applying finance numbers.
- Reverse Variant: Multiply by `Pt` to recover `I = Prt`.
- Equation Battle Variant: Card: `/(Pt)`.
- Multi-stage Boss Variant: Include rate unit interpretation.
- Hint Mapping: H-P004-T010
- Tutorial Mapping: Tut-P004 sections Product Formulas
- Socratic Mapping: Soc-P004 product branch

## Template T011 - Surface area cylinder for height
- Template ID: P004-T011
- Question Type: Direct computation
- Cognitive Skill: Isolate target after subtracting non-target term
- Difficulty: 4
- Estimated Time: 75 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Rearrange a formula with one target term and one non-target term.
- Example Question: Solve `S = 2*pi*r*h + 2*pi*r^2` for `h`.
- Answer: `h = (S - 2*pi*r^2)/(2*pi*r)`, with `r != 0`.
- Explanation: Subtract `2*pi*r^2`, then divide by the coefficient of `h`, which is `2*pi*r`.
- Distractors: `h = S - 2*pi*r^2/(2*pi*r)`; `h = (S + 2*pi*r^2)/(2*pi*r)`; `h = S/(2*pi*r) - 2*pi*r^2`; `h = S/(2*pi*r^2)`
- Distractor Rationale: Divides only one term; wrong inverse; fails to keep numerator grouped; uses wrong coefficient.
- Randomization Rules: Use formulas `Y = ax + b` where `a` and `b` are compound symbolic expressions.
- Validity Constraints: Coefficient of target must be nonzero; preserve grouping in numerator.
- Metadata: phase_id=P004; prerequisites=[two-step literal equations, powers, product coefficients]; misconception_tags=[partial division, wrong inverse operation, wrong coefficient]; randomization_constraints=[coefficient nonzero, grouped numerator].
- Graph/Visual Variant: Cylinder net showing side area and top/bottom area.
- Modeling Variant: Rearrange surface area formula before finding height.
- Reverse Variant: Multiply by `2*pi*r` and add `2*pi*r^2` to recover `S`.
- Equation Battle Variant: Cards: `-2*pi*r^2`, then `/(2*pi*r)`.
- Multi-stage Boss Variant: Require identifying the full coefficient of `h`.
- Hint Mapping: H-P004-T011
- Tutorial Mapping: Tut-P004 sections Compound Coefficients
- Socratic Mapping: Soc-P004 compound branch

## Template T012 - Average formula for one value
- Template ID: P004-T012
- Question Type: Direct computation
- Cognitive Skill: Undo division of a sum
- Difficulty: 2
- Estimated Time: 45 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Rearrange formulas where a sum is divided.
- Example Question: Solve `M = (a + b)/2` for `b`.
- Answer: `b = 2M - a`.
- Explanation: Multiply both sides by 2: `2M = a + b`. Subtract `a`: `b = 2M - a`.
- Distractors: `b = M/2 - a`; `b = 2(M - a)`; `b = a - 2M`; `b = M - a/2`
- Distractor Rationale: Divides instead of multiplies; subtracts inside too early; reverses subtraction order; divides only one term.
- Randomization Rules: Use formulas where a sum containing the target is divided by a constant.
- Validity Constraints: Divisor constant must be nonzero.
- Metadata: phase_id=P004; prerequisites=[grouped fractions, two-step solving]; misconception_tags=[wrong inverse operation, partial division, subtraction order error]; randomization_constraints=[nonzero divisor].
- Graph/Visual Variant: Average balance of two values.
- Modeling Variant: Find a missing score from an average.
- Reverse Variant: Substitute `b = 2M - a` into `(a+b)/2`.
- Equation Battle Variant: Cards: `*2`, then `-a`.
- Multi-stage Boss Variant: Ask why the entire numerator must be treated as a group.
- Hint Mapping: H-P004-T012
- Tutorial Mapping: Tut-P004 sections Grouped Fractions
- Socratic Mapping: Soc-P004 grouped-fraction branch

## Template T013 - Slope formula for y2
- Template ID: P004-T013
- Question Type: Direct computation
- Cognitive Skill: Undo quotient then subtraction
- Difficulty: 4
- Estimated Time: 75 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Rearrange the slope formula for a point coordinate.
- Example Question: Solve `m = (y2 - y1)/(x2 - x1)` for `y2`.
- Answer: `y2 = m(x2 - x1) + y1`, with `x2 != x1`.
- Explanation: Multiply by `x2 - x1`: `m(x2 - x1) = y2 - y1`. Add `y1`.
- Distractors: `y2 = m/(x2 - x1) + y1`; `y2 = m(x2 - x1) - y1`; `y2 = (m + y1)(x2 - x1)`; `y2 = m(x2 + x1) + y1`
- Distractor Rationale: Divides instead of multiplies; wrong inverse for `-y1`; changes denominator sign; adds instead of subtracting inside denominator.
- Randomization Rules: Use quotient formulas with target in numerator and a non-target denominator.
- Validity Constraints: Denominator expression cannot be zero.
- Metadata: phase_id=P004; prerequisites=[grouped denominators, slope formula, two-step solving]; misconception_tags=[wrong inverse operation, sign error, denominator error]; randomization_constraints=[x2 != x1].
- Graph/Visual Variant: Two points on a coordinate plane with rise and run labeled.
- Modeling Variant: Find an unknown y-coordinate given slope and x-values.
- Reverse Variant: Substitute rearranged `y2` into the slope formula.
- Equation Battle Variant: Cards: `*(x2-x1)`, then `+y1`.
- Multi-stage Boss Variant: Require stating the restriction `x2 != x1`.
- Hint Mapping: H-P004-T013
- Tutorial Mapping: Tut-P004 sections Grouped Denominators
- Socratic Mapping: Soc-P004 slope branch

## Template T014 - Energy formula for mass
- Template ID: P004-T014
- Question Type: Direct computation
- Cognitive Skill: Divide by squared factor
- Difficulty: 2
- Estimated Time: 40 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve a product formula with a squared non-target factor.
- Example Question: Solve `E = mc^2` for `m`.
- Answer: `m = E/c^2`, with `c != 0`.
- Explanation: `m` is multiplied by `c^2`, so divide both sides by `c^2`.
- Distractors: `m = Ec^2`; `m = E/c`; `m = E - c^2`; `m = c^2/E`
- Distractor Rationale: Multiplies; drops exponent; subtracts; reciprocal confusion.
- Randomization Rules: Use formulas with the target multiplied by a powered non-target expression.
- Validity Constraints: Powered divisor cannot be zero.
- Metadata: phase_id=P004; prerequisites=[exponents as factors, product equations]; misconception_tags=[drops exponent, reciprocal confusion, missing restriction]; randomization_constraints=[c nonzero].
- Graph/Visual Variant: Formula card highlighting `c^2` as one factor.
- Modeling Variant: Solve for mass from energy and speed constant.
- Reverse Variant: Multiply by `c^2` to recover `E = mc^2`.
- Equation Battle Variant: Card: `/c^2`.
- Multi-stage Boss Variant: Ask whether dividing by `c` is enough.
- Hint Mapping: H-P004-T014
- Tutorial Mapping: Tut-P004 sections Powers as Factors
- Socratic Mapping: Soc-P004 coefficient branch

## Template T015 - Amount formula for simple interest rate
- Template ID: P004-T015
- Question Type: Direct computation
- Cognitive Skill: Undo product containing parentheses
- Difficulty: 4
- Estimated Time: 80 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve formulas where the target is inside parentheses multiplied by another variable.
- Example Question: Solve `A = P(1 + rt)` for `r`.
- Answer: `r = (A - P)/(Pt)`, with `P != 0` and `t != 0`.
- Explanation: Divide by `P`: `A/P = 1 + rt`. Subtract 1: `A/P - 1 = rt`. Divide by `t`. Equivalent simplification gives `(A - P)/(Pt)`.
- Distractors: `r = A/P - 1/t`; `r = (A + P)/(Pt)`; `r = A/(P + t)`; `r = (A - P)t/P`
- Distractor Rationale: Divides only 1 by `t`; wrong inverse for `P`; treats product as sum; multiplies by `t`.
- Randomization Rules: Use formulas `Y = A(B + target*C)` and solve for target.
- Validity Constraints: Outside multiplier and target multiplier must be nonzero.
- Metadata: phase_id=P004; prerequisites=[parentheses, product division, equivalent fractions]; misconception_tags=[partial division, product-as-sum error, wrong inverse operation]; randomization_constraints=[P nonzero, t nonzero].
- Graph/Visual Variant: Finance formula tree showing outside `P` and inside `1 + rt`.
- Modeling Variant: Solve for rate from final amount, principal, and time.
- Reverse Variant: Substitute `r = (A-P)/(Pt)` into `P(1+rt)`.
- Equation Battle Variant: Cards: `/P`, `-1`, `/t`, with optional equivalent-fraction simplification.
- Multi-stage Boss Variant: Accept either `(A/P - 1)/t` or `(A-P)/(Pt)`.
- Hint Mapping: H-P004-T015
- Tutorial Mapping: Tut-P004 sections Parentheses and Equivalent Forms
- Socratic Mapping: Soc-P004 parentheses branch

## Template T016 - Reciprocal formula for v
- Template ID: P004-T016
- Question Type: Direct computation
- Cognitive Skill: Clear reciprocal equation
- Difficulty: 5
- Estimated Time: 100 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve a formula with reciprocal terms for a target in a denominator.
- Example Question: Solve `1/f = 1/u + 1/v` for `v`.
- Answer: `v = fu/(u - f)`, with `f != 0`, `u != 0`, and `u != f`.
- Explanation: Subtract `1/u`: `1/v = 1/f - 1/u = (u - f)/(fu)`. Take reciprocals: `v = fu/(u - f)`.
- Distractors: `v = fu/(u + f)`; `v = (u - f)/(fu)`; `v = f - u`; `v = fu`
- Distractor Rationale: Adds fractions incorrectly; stops at `1/v`; treats reciprocals as subtraction; drops denominator.
- Randomization Rules: Use reciprocal formulas with the target in one denominator and two non-target reciprocal terms.
- Validity Constraints: All original denominators nonzero; final denominator nonzero.
- Metadata: phase_id=P004; prerequisites=[fraction subtraction, reciprocals, restrictions]; misconception_tags=[reciprocal confusion, fraction addition error, missing restriction]; randomization_constraints=[f nonzero, u nonzero, u != f].
- Graph/Visual Variant: Reciprocal balance diagram showing `1/v` isolated before flipping.
- Modeling Variant: Lens formula rearrangement style problem.
- Reverse Variant: Substitute `v = fu/(u-f)` back to verify `1/v = (u-f)/(fu)`.
- Equation Battle Variant: Cards: `-1/u`, combine fractions, reciprocal flip.
- Multi-stage Boss Variant: High-level boss with restriction check.
- Hint Mapping: H-P004-T016
- Tutorial Mapping: Tut-P004 sections Reciprocal Formulas
- Socratic Mapping: Soc-P004 reciprocal branch

## Template T017 - Target appears in two terms and must be factored
- Template ID: P004-T017
- Question Type: Direct computation
- Cognitive Skill: Factor target variable
- Difficulty: 5
- Estimated Time: 90 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve a literal equation where the target variable appears in multiple terms on one side.
- Example Question: Solve `A = x + bx` for `x`.
- Answer: `x = A/(1 + b)`, with `b != -1`.
- Explanation: Factor `x` from the right side: `A = x(1 + b)`. Divide by `1 + b`.
- Distractors: `x = A - b`; `x = A/(b)`; `x = A/(1 - b)`; `x = A + b`
- Distractor Rationale: Fails to factor; ignores the `x` term with coefficient 1; sign error in factor; uses addition instead of division.
- Randomization Rules: Use formulas where target appears in two like terms and can be factored.
- Validity Constraints: Factored coefficient cannot be zero.
- Metadata: phase_id=P004; prerequisites=[factoring common variable, variables on both sides]; misconception_tags=[does not factor target, drops coefficient 1, missing restriction]; randomization_constraints=[factor coefficient nonzero].
- Graph/Visual Variant: Factor tree showing `x + bx = x(1+b)`.
- Modeling Variant: Total value equals base amount plus rate times same amount.
- Reverse Variant: Expand `x(1+b)` to recover `x + bx`.
- Equation Battle Variant: Cards: factor `x`, then `/(1+b)`.
- Multi-stage Boss Variant: Requires recognizing the invisible coefficient 1.
- Hint Mapping: H-P004-T017
- Tutorial Mapping: Tut-P004 sections Factoring the Target
- Socratic Mapping: Soc-P004 factoring branch

## Template T018 - Diameter from circumference
- Template ID: P004-T018
- Question Type: Direct computation
- Cognitive Skill: Isolate target with named constant
- Difficulty: 1
- Estimated Time: 30 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Rearrange a one-step geometric formula.
- Example Question: Solve `C = pi*d` for `d`.
- Answer: `d = C/pi`.
- Explanation: Divide both sides by `pi`.
- Distractors: `d = C*pi`; `d = C - pi`; `d = pi/C`; `d = C + pi`
- Distractor Rationale: Multiplies; subtracts; reciprocal confusion; adds.
- Randomization Rules: Use one-step literal equations with named constants.
- Validity Constraints: Divisor constant must be nonzero.
- Metadata: phase_id=P004; prerequisites=[one-step literal equations, constants]; misconception_tags=[multiplies instead of divides, reciprocal confusion]; randomization_constraints=[constant nonzero].
- Graph/Visual Variant: Circle with diameter and circumference.
- Modeling Variant: Find diameter formula from circumference.
- Reverse Variant: Multiply by `pi` to recover `C = pi*d`.
- Equation Battle Variant: Card: `/pi`.
- Multi-stage Boss Variant: Quick-check gate before harder formulas.
- Hint Mapping: H-P004-T018
- Tutorial Mapping: Tut-P004 sections Constants in Formulas
- Socratic Mapping: Soc-P004 product branch

## Template T019 - Acceleration formula for final velocity
- Template ID: P004-T019
- Question Type: Direct computation
- Cognitive Skill: Undo quotient and subtraction
- Difficulty: 3
- Estimated Time: 60 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve a formula where the target is inside a numerator difference.
- Example Question: Solve `a = (vf - vi)/t` for `vf`.
- Answer: `vf = at + vi`, with `t != 0`.
- Explanation: Multiply by `t`: `at = vf - vi`. Add `vi`: `vf = at + vi`.
- Distractors: `vf = a/t + vi`; `vf = at - vi`; `vf = a(t + vi)`; `vf = vi - at`
- Distractor Rationale: Divides instead of multiplies; wrong inverse for `-vi`; groups terms incorrectly; reverses subtraction order.
- Randomization Rules: Use quotient formulas with target in a numerator sum or difference.
- Validity Constraints: Denominator must be nonzero.
- Metadata: phase_id=P004; prerequisites=[grouped numerator, two-step solving]; misconception_tags=[wrong inverse operation, sign error, grouping error]; randomization_constraints=[t nonzero].
- Graph/Visual Variant: Motion formula card with final velocity highlighted.
- Modeling Variant: Solve for final velocity from acceleration, time, and initial velocity.
- Reverse Variant: Substitute `vf = at + vi` into `(vf - vi)/t`.
- Equation Battle Variant: Cards: `*t`, then `+vi`.
- Multi-stage Boss Variant: Ask why the numerator must stay grouped.
- Hint Mapping: H-P004-T019
- Tutorial Mapping: Tut-P004 sections Grouped Fractions
- Socratic Mapping: Soc-P004 grouped-fraction branch

## Template T020 - Boss formula with nested operations
- Template ID: P004-T020
- Question Type: Boss challenge
- Cognitive Skill: Integrated literal-equation rearrangement
- Difficulty: 5
- Estimated Time: 110 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Rearrange a formula with target inside parentheses, divided, scaled, and shifted.
- Example Question: Boss Gate: Solve `T = a(x + b)/c + d` for `x`.
- Answer: `x = c(T - d)/a - b`, with `a != 0` and `c != 0`.
- Explanation: Subtract `d`: `T - d = a(x + b)/c`. Multiply by `c`: `c(T - d) = a(x + b)`. Divide by `a`: `c(T - d)/a = x + b`. Subtract `b`.
- Distractors: `x = cT - d/a - b`; `x = a(T - d)/c - b`; `x = c(T + d)/a - b`; `x = c(T - d)/(a - b)`
- Distractor Rationale: Loses grouping; swaps multiplication/division factors; wrong inverse for `d`; treats subtraction of `b` as part of denominator.
- Randomization Rules: Use formulas of the form `Y = A(target+B)/C + D`.
- Validity Constraints: Scaling coefficient and divisor must be nonzero; preserve grouping around `T - d`.
- Metadata: phase_id=P004; prerequisites=[multi-step solving, grouped expressions, restrictions]; misconception_tags=[lost grouping, wrong inverse order, product-as-sum error]; randomization_constraints=[a nonzero, c nonzero].
- Graph/Visual Variant: Four-lock formula gate: subtract, multiply, divide, subtract.
- Modeling Variant: Reverse a game stat transformation to recover the original hidden stat.
- Reverse Variant: Substitute the answer into the formula and simplify back to `T`.
- Equation Battle Variant: Cards: `-d`, `*c`, `/a`, `-b`.
- Multi-stage Boss Variant: This is the phase boss template.
- Hint Mapping: H-P004-T020
- Tutorial Mapping: Tut-P004 sections Full Phase Review
- Socratic Mapping: Soc-P004 boss branch

# Part II - Hint Bible

## H-P004-T001
- Hint 1 - Gentle Nudge: The target is `L`; treat `P` and `W` as known quantities.
- Hint 2 - Concept Reminder: Remove terms not attached to the target first.
- Hint 3 - Focus Hint: Subtract `2W` from both sides.
- Hint 4 - Guided Next Step: `P - 2W = 2L`.
- Hint 5 - Nearly Complete: Divide both sides by 2.
- Hint 6 - Full Solution: `L = (P - 2W)/2`.

## H-P004-T002
- Hint 1 - Gentle Nudge: `l` is multiplied by `w`.
- Hint 2 - Concept Reminder: Multiplication is undone by division.
- Hint 3 - Focus Hint: Divide both sides by `w`.
- Hint 4 - Guided Next Step: `A/w = l`.
- Hint 5 - Nearly Complete: Rewrite with `l` on the left.
- Hint 6 - Full Solution: `l = A/w`, with `w != 0`.

## H-P004-T003
- Hint 1 - Gentle Nudge: Solve for `t`, not for `r`.
- Hint 2 - Concept Reminder: Treat `r` as the coefficient of `t`.
- Hint 3 - Focus Hint: Divide both sides by `r`.
- Hint 4 - Guided Next Step: `d/r = t`.
- Hint 5 - Nearly Complete: Put the target variable on the left.
- Hint 6 - Full Solution: `t = d/r`, with `r != 0`.

## H-P004-T004
- Hint 1 - Gentle Nudge: `2*pi` is one coefficient multiplying `r`.
- Hint 2 - Concept Reminder: Divide by the full coefficient.
- Hint 3 - Focus Hint: Use `2*pi`, not just `pi`.
- Hint 4 - Guided Next Step: `C/(2*pi) = r`.
- Hint 5 - Nearly Complete: Rewrite with `r` on the left.
- Hint 6 - Full Solution: `r = C/(2*pi)`.

## H-P004-T005
- Hint 1 - Gentle Nudge: First remove the `+32`.
- Hint 2 - Concept Reminder: Multiplication by `9/5` is undone by multiplying by `5/9`.
- Hint 3 - Focus Hint: Subtract 32 from both sides.
- Hint 4 - Guided Next Step: `F - 32 = (9/5)C`.
- Hint 5 - Nearly Complete: Multiply both sides by `5/9`.
- Hint 6 - Full Solution: `C = (5/9)(F - 32)`.

## H-P004-T006
- Hint 1 - Gentle Nudge: The target is the input `x`.
- Hint 2 - Concept Reminder: In `mx + b`, remove `b` before dividing by `m`.
- Hint 3 - Focus Hint: Subtract `b` from both sides.
- Hint 4 - Guided Next Step: `y - b = mx`.
- Hint 5 - Nearly Complete: Divide by `m`.
- Hint 6 - Full Solution: `x = (y - b)/m`, with `m != 0`.

## H-P004-T007
- Hint 1 - Gentle Nudge: The target is `a`, not `x`.
- Hint 2 - Concept Reminder: Treat `x` as the coefficient of `a`.
- Hint 3 - Focus Hint: Subtract `b` first.
- Hint 4 - Guided Next Step: `ax = c - b`.
- Hint 5 - Nearly Complete: Divide by `x`.
- Hint 6 - Full Solution: `a = (c - b)/x`, with `x != 0`.

## H-P004-T008
- Hint 1 - Gentle Nudge: `h` is multiplied by both `l` and `w`.
- Hint 2 - Concept Reminder: Divide by the whole product attached to the target.
- Hint 3 - Focus Hint: The coefficient of `h` is `lw`.
- Hint 4 - Guided Next Step: `V/(lw) = h`.
- Hint 5 - Nearly Complete: Put `h` on the left.
- Hint 6 - Full Solution: `h = V/(lw)`, with `l != 0` and `w != 0`.

## H-P004-T009
- Hint 1 - Gentle Nudge: The formula has a factor of `1/2`.
- Hint 2 - Concept Reminder: Multiplying by `1/2` is undone by multiplying by 2.
- Hint 3 - Focus Hint: Multiply both sides by 2.
- Hint 4 - Guided Next Step: `2A = bh`.
- Hint 5 - Nearly Complete: Divide by `b`.
- Hint 6 - Full Solution: `h = 2A/b`, with `b != 0`.

## H-P004-T010
- Hint 1 - Gentle Nudge: `r` is one factor in the product `Prt`.
- Hint 2 - Concept Reminder: Divide by the other factors attached to `r`.
- Hint 3 - Focus Hint: The coefficient of `r` is `Pt`.
- Hint 4 - Guided Next Step: `I/(Pt) = r`.
- Hint 5 - Nearly Complete: Rewrite with `r` on the left.
- Hint 6 - Full Solution: `r = I/(Pt)`, with `P != 0` and `t != 0`.

## H-P004-T011
- Hint 1 - Gentle Nudge: Only one term contains `h`.
- Hint 2 - Concept Reminder: Remove the term that does not contain the target first.
- Hint 3 - Focus Hint: Subtract `2*pi*r^2` from both sides.
- Hint 4 - Guided Next Step: `S - 2*pi*r^2 = 2*pi*r*h`.
- Hint 5 - Nearly Complete: Divide by `2*pi*r`.
- Hint 6 - Full Solution: `h = (S - 2*pi*r^2)/(2*pi*r)`, with `r != 0`.

## H-P004-T012
- Hint 1 - Gentle Nudge: The whole sum `a + b` is divided by 2.
- Hint 2 - Concept Reminder: Undo division by 2 by multiplying by 2.
- Hint 3 - Focus Hint: Multiply both sides by 2.
- Hint 4 - Guided Next Step: `2M = a + b`.
- Hint 5 - Nearly Complete: Subtract `a`.
- Hint 6 - Full Solution: `b = 2M - a`.

## H-P004-T013
- Hint 1 - Gentle Nudge: The target `y2` is inside the numerator.
- Hint 2 - Concept Reminder: Undo division by multiplying by the denominator.
- Hint 3 - Focus Hint: Multiply both sides by `x2 - x1`.
- Hint 4 - Guided Next Step: `m(x2 - x1) = y2 - y1`.
- Hint 5 - Nearly Complete: Add `y1`.
- Hint 6 - Full Solution: `y2 = m(x2 - x1) + y1`, with `x2 != x1`.

## H-P004-T014
- Hint 1 - Gentle Nudge: `c^2` is multiplying `m`.
- Hint 2 - Concept Reminder: Divide by the whole factor attached to the target.
- Hint 3 - Focus Hint: Divide both sides by `c^2`.
- Hint 4 - Guided Next Step: `E/c^2 = m`.
- Hint 5 - Nearly Complete: Put `m` on the left.
- Hint 6 - Full Solution: `m = E/c^2`, with `c != 0`.

## H-P004-T015
- Hint 1 - Gentle Nudge: The target `r` is inside parentheses.
- Hint 2 - Concept Reminder: Undo the outside multiplication by `P` first.
- Hint 3 - Focus Hint: Divide both sides by `P`.
- Hint 4 - Guided Next Step: `A/P = 1 + rt`.
- Hint 5 - Nearly Complete: Subtract 1, then divide by `t`.
- Hint 6 - Full Solution: `r = (A/P - 1)/t = (A - P)/(Pt)`, with `P != 0` and `t != 0`.

## H-P004-T016
- Hint 1 - Gentle Nudge: First isolate `1/v`, not `v`.
- Hint 2 - Concept Reminder: Subtract `1/u` from both sides.
- Hint 3 - Focus Hint: `1/v = 1/f - 1/u`.
- Hint 4 - Guided Next Step: Combine the right side: `(u - f)/(fu)`.
- Hint 5 - Nearly Complete: If `1/v = (u - f)/(fu)`, take reciprocals.
- Hint 6 - Full Solution: `v = fu/(u - f)`, with `f != 0`, `u != 0`, and `u != f`.

## H-P004-T017
- Hint 1 - Gentle Nudge: The target `x` appears in two terms.
- Hint 2 - Concept Reminder: Factor out the common target variable.
- Hint 3 - Focus Hint: `x + bx = x(1 + b)`.
- Hint 4 - Guided Next Step: `A = x(1 + b)`.
- Hint 5 - Nearly Complete: Divide by `1 + b`.
- Hint 6 - Full Solution: `x = A/(1 + b)`, with `b != -1`.

## H-P004-T018
- Hint 1 - Gentle Nudge: `d` is multiplied by `pi`.
- Hint 2 - Concept Reminder: Division undoes multiplication.
- Hint 3 - Focus Hint: Divide both sides by `pi`.
- Hint 4 - Guided Next Step: `C/pi = d`.
- Hint 5 - Nearly Complete: Put `d` on the left.
- Hint 6 - Full Solution: `d = C/pi`.

## H-P004-T019
- Hint 1 - Gentle Nudge: The target `vf` is inside the numerator.
- Hint 2 - Concept Reminder: Undo division by `t` first.
- Hint 3 - Focus Hint: Multiply both sides by `t`.
- Hint 4 - Guided Next Step: `at = vf - vi`.
- Hint 5 - Nearly Complete: Add `vi`.
- Hint 6 - Full Solution: `vf = at + vi`, with `t != 0`.

## H-P004-T020
- Hint 1 - Gentle Nudge: Work from the outside toward the target `x`.
- Hint 2 - Concept Reminder: Undo `+d`, then `/c`, then multiplication by `a`, then `+b`.
- Hint 3 - Focus Hint: Subtract `d`: `T - d = a(x + b)/c`.
- Hint 4 - Guided Next Step: Multiply by `c`: `c(T - d) = a(x + b)`.
- Hint 5 - Nearly Complete: Divide by `a`, then subtract `b`.
- Hint 6 - Full Solution: `x = c(T - d)/a - b`, with `a != 0` and `c != 0`.

# Part III - Tutorial Bible

## Learning Goal
Learn to rearrange formulas by isolating a chosen target variable while treating every other letter as a known quantity.

## Why It Matters
Precalculus uses formulas constantly. Rearranging them lets a player solve for the quantity they actually need: radius from circumference, input from output, rate from interest, or a hidden stat before a transformation. This is also early preparation for inverse functions.

## Prerequisite Check
Ask the player:

1. Solve `2x + 5 = 17` for `x`. Expected: `x = 6`.
2. Solve `A = 3x` for `x`. Expected: `x = A/3`.
3. Solve `y = mx + b` for the expression before division by `m`. Expected: `y - b = mx`.
4. Factor `x + bx`. Expected: `x(1+b)`.
5. Why can we not divide by 0? Expected: division by zero is undefined.

If the player misses factoring, route to a common-factor mini-lesson. If they miss restrictions, give a nonzero denominator reminder.

## Core Concept
A literal equation has several letters. The prompt tells you which one is the target.

Example: Solve `P = 2L + 2W` for `L`.

The target is `L`; `P` and `W` behave like known quantities.

1. Remove the term not containing `L`: `P - 2W = 2L`.
2. Divide by the coefficient of `L`: `(P - 2W)/2 = L`.
3. Write the target on the left: `L = (P - 2W)/2`.

## Restrictions
Whenever you divide by an expression, state that it cannot be zero.

Example: `A = lw` solved for `l` gives `l = A/w`, with `w != 0`.

The restriction is not decorative. If `w = 0`, the original formula becomes `A = 0`, and division by `w` is not allowed.

## Grouping and Parentheses
When subtracting before dividing, keep the numerator grouped.

`y = mx + b`
`y - b = mx`
`x = (y - b)/m`

The expression `(y - b)/m` means the entire difference is divided by `m`.

## Factoring the Target
If the target appears more than once, collect it by factoring.

`A = x + bx`
`A = x(1 + b)`
`x = A/(1 + b)`

This works because both terms contain `x`.

## Reciprocal Formulas
For formulas like `1/f = 1/u + 1/v`, isolate the reciprocal first.

`1/v = 1/f - 1/u`
`1/v = (u - f)/(fu)`
`v = fu/(u - f)`

Restrictions matter: `f`, `u`, and `u - f` cannot be zero in the final form.

## Common Mistakes
- Mistake: Solving for the wrong letter.
  Correction: Circle or name the target before moving anything.
- Mistake: Dividing by only one term.
  Correction: Use parentheses around grouped numerators, such as `(y-b)/m`.
- Mistake: Dropping non-target variables.
  Correction: Other letters stay in the formula unless they cancel by valid algebra.
- Mistake: Forgetting restrictions.
  Correction: Every denominator must be nonzero.
- Mistake: Not factoring when the target appears twice.
  Correction: Factor the target first, then divide.
- Mistake: Flipping a reciprocal too early.
  Correction: Isolate the reciprocal expression first.

## Guided Practice
1. Solve `A = bh` for `h`.
   - Divide by `b`.
   - `h = A/b`, with `b != 0`.

2. Solve `y = 4x + b` for `x`.
   - Subtract `b`: `y - b = 4x`.
   - Divide by 4: `x = (y - b)/4`.

3. Solve `M = (a + b)/2` for `b`.
   - Multiply by 2: `2M = a + b`.
   - Subtract `a`: `b = 2M - a`.

## Independent Practice
1. Solve `C = 2*pi*r` for `r`. Answer: `r = C/(2*pi)`.
2. Solve `V = lwh` for `w`. Answer: `w = V/(lh)`, with `l != 0`, `h != 0`.
3. Solve `F = (9/5)C + 32` for `C`. Answer: `C = (5/9)(F - 32)`.
4. Solve `m = (y2 - y1)/(x2 - x1)` for `y1`. Answer: `y1 = y2 - m(x2 - x1)`.
5. Solve `R = x + ax` for `x`. Answer: `x = R/(1+a)`, with `a != -1`.

## Mastery Check
The player is ready to advance when they can:

1. Rearrange at least 4 of 5 literal equations correctly.
2. Identify the target variable before solving.
3. Preserve grouping in at least one answer like `(y-b)/m`.
4. State nonzero restrictions when dividing by a variable expression.
5. Factor a repeated target variable when needed.

Mastery check set:

1. `P = 2L + 2W` for `W`: `W = (P - 2L)/2`.
2. `d = rt` for `r`: `r = d/t`, `t != 0`.
3. `A = (1/2)bh` for `b`: `b = 2A/h`, `h != 0`.
4. `y = mx + b` for `m`: `m = (y-b)/x`, `x != 0`.
5. `Q = x - kx` for `x`: `x = Q/(1-k)`, `k != 1`.

## Adaptive Tutor Messages
- If the player solves for the wrong variable: "Pause and name the target. Every move should isolate that letter."
- If the player loses grouping: "The entire expression you created must move together. Use parentheses."
- If the player omits restrictions: "You divided by a symbol. What value would make that divisor zero?"
- If the player drops a non-target variable: "That letter represents an unknown quantity, so it must remain unless algebra removes it."
- If the player struggles with repeated targets: "The target appears in multiple terms. Factor it before dividing."
- If the player succeeds quickly: "You are ready to use rearranged formulas inside modeling problems."

## Tutorial Metadata
- Tutorial ID: Tut-P004
- Estimated duration: 5 minutes
- Target player state: can solve linear equations and is learning symbolic rearrangement
- Unlock condition: available from any Phase 004 question
- Remediation trigger: two wrong target-variable choices, two missing restrictions, two grouping errors, or one repeated-target factoring error
- Advancement trigger: 80 percent accuracy on mixed literal equations plus correct restrictions on at least two answers

# Part IV - Socratic Dialogue Bible

## Opening Diagnostic
Tutor: "In `P = 2L + 2W`, if the goal is to solve for `L`, which term should we remove first: `2L` or `2W`?"

Expected strong answer: "Remove `2W` first because it does not contain the target `L`."

## Guided Discovery
Tutor sequence:

1. "What is the target variable?"
2. "Which terms contain the target?"
3. "Which terms do not contain the target?"
4. "What inverse operation removes a non-target term?"
5. "What coefficient or factor is still attached to the target?"
6. "What operation isolates the target?"
7. "Did we divide by a variable expression?"
8. "What restriction must be stated?"
9. "Can the rearranged formula be checked by substituting it back?"

## Correct Branch
Player: "Subtract `2W`."

Tutor: "Yes. After subtracting `2W`, what equation remains?"

If player answers `P - 2W = 2L`, ask: "What operation isolates `L` now?"

Exit when the player gives `L = (P - 2W)/2`.

## Partial Understanding Branch
Player: "Move the W."

Tutor: "That is the right idea. Let's say it as a balanced operation: what do we subtract from both sides?"

If player answers `2W`, continue. If they answer only `W`, ask why the coefficient 2 must stay attached.

## Misconception Branch
Player divides by 2 first and writes `P/2 = L + 2W`.

Tutor: "If we divide the right side by 2, the entire right side must be divided. What would `(2L + 2W)/2` simplify to?"

Follow-up: "That path can work if applied to the whole side. Which path keeps the grouping clearer?"

## Unsure Branch
Player: "I don't know."

Tutor: "Start by naming the target. Which letter are we trying to get alone?"

If player identifies `L`, ask: "Which term has `L` in it?"

If still unsure, show Hint 1 and Hint 2.

## Unrelated Response Branch
Player gives an unrelated answer.

Tutor: "Let's return to the formula. In `P = 2L + 2W`, point to the part containing the target `L`."

If unrelated again, offer a two-choice prompt: "Does `2L` or `2W` contain the target?"

## Recovery Prompts
- "What is the target variable?"
- "What term contains the target?"
- "What term does not contain the target?"
- "What inverse operation removes that non-target term?"
- "What factor is attached to the target?"
- "Are we dividing by a symbol? What restriction follows?"

## Reflection Question
"How is solving a literal equation like solving a numeric equation, and how is it different?"

Strong reflection: "The balance moves are the same, but the answer may still contain other letters because they represent known quantities."

## Transfer Question
"How does solving `y = mx + b` for `x` prepare you for inverse functions?"

Expected transfer: "It reverses the rule so the input is written in terms of the output."

## Escalation Rules
- If the player chooses the wrong target twice, show Target Variable.
- If the player divides by part of an expression twice, show Grouping and Parentheses.
- If the player omits restrictions twice, show Restrictions.
- If the target appears twice and the player does not factor, show Factoring the Target.
- If reciprocal equations fail, show Reciprocal Formulas and simplify `1/f - 1/u` slowly.
- If the player correctly rearranges three formulas and states restrictions, move to independent practice.

## Exit Condition
The Socratic sequence is complete when the player:

1. Names the target variable.
2. Removes non-target terms with balanced operations.
3. Divides by the full coefficient or factor attached to the target.
4. Preserves grouping and restrictions.
5. Checks or justifies the rearranged formula.

# Knowledge Graph

- Prerequisites: Phase 001 one-step equations; Phase 002 multi-step equations; Phase 003 variables on both sides; fraction operations; factoring common variables; nonzero denominator restrictions
- Concepts Unlocked: target-variable isolation; symbolic constants; formula rearrangement; parameter restrictions; grouped numerator preservation; repeated-target factoring; reciprocal formula rearrangement
- Related Concepts: function inverses; formula modeling; dimensional analysis; linear equations; rational equations; solving for parameters
- Common Misconceptions: solving for the wrong variable; dropping non-target variables; partial division; missing restrictions; lost grouping; reciprocal confusion; failure to factor repeated targets
- Remedial Phases: Phase 001 review; Phase 002 review; Phase 003 review; fraction reciprocal mini-lesson; common-factor mini-lesson; nonzero-denominator mini-lesson
- Follow-up Phases: Phase 005 - Linear equation modeling; Phase 014 - Function notation; Phase 020 - Inverse functions; Phase 033 - Rational expression simplification
- Transfer Topics: inverse functions; physics formulas; finance formulas; geometry formulas; parameter solving; dimensional analysis

# Validation Notes

## Structure Validation
- Includes all required Bibles and metadata sections.
- Contains exactly 20 template families, within the required 20-40 range.
- Each template includes example, answer, explanation, distractors, distractor rationale, randomization rules, validity constraints, metadata, variants, and mappings.
- Every template has six progressive hints.

## Math Validation
- T001: `P = 2L + 2W` -> `P - 2W = 2L` -> `L = (P - 2W)/2`.
- T002: `A = lw` -> `l = A/w`, `w != 0`.
- T003: `d = rt` -> `t = d/r`, `r != 0`.
- T004: `C = 2*pi*r` -> `r = C/(2*pi)`.
- T005: `F = (9/5)C + 32` -> `C = (5/9)(F - 32)`.
- T006: `y = mx + b` -> `x = (y-b)/m`, `m != 0`.
- T007: `ax + b = c` -> `a = (c-b)/x`, `x != 0`.
- T008: `V = lwh` -> `h = V/(lw)`, `l,w != 0`.
- T009: `A = (1/2)bh` -> `h = 2A/b`, `b != 0`.
- T010: `I = Prt` -> `r = I/(Pt)`, `P,t != 0`.
- T011: `S = 2*pi*r*h + 2*pi*r^2` -> `h = (S - 2*pi*r^2)/(2*pi*r)`, `r != 0`.
- T012: `M = (a+b)/2` -> `b = 2M - a`.
- T013: `m = (y2-y1)/(x2-x1)` -> `y2 = m(x2-x1) + y1`, `x2 != x1`.
- T014: `E = mc^2` -> `m = E/c^2`, `c != 0`.
- T015: `A = P(1+rt)` -> `r = (A/P - 1)/t = (A-P)/(Pt)`, `P,t != 0`.
- T016: `1/f = 1/u + 1/v` -> `1/v = (u-f)/(fu)` -> `v = fu/(u-f)`.
- T017: `A = x + bx` -> `A = x(1+b)` -> `x = A/(1+b)`, `b != -1`.
- T018: `C = pi*d` -> `d = C/pi`.
- T019: `a = (vf-vi)/t` -> `vf = at + vi`, `t != 0`.
- T020: `T = a(x+b)/c + d` -> `x = c(T-d)/a - b`, `a,c != 0`.

## Distractor Validation
- Distractors reflect plausible literal-equation errors: wrong target, partial division, missing grouping, reciprocal confusion, missing restrictions, dropped coefficients, and failure to factor.
- Multiple-choice-style templates have exactly one correct answer.
- Distractors were checked against symbolic rearrangements.

## Hint Validation
- Each hint sequence progresses from target identification to inverse-operation choice, guided algebra, nearly complete isolation, and full formula.
- Restriction hints are included whenever division by a variable expression occurs.

## Tutorial Validation
- Tutorial includes learning goal, prerequisite check, why it matters, core concept, restrictions, grouping, factoring the target, reciprocal formulas, common mistakes, guided practice, independent practice, mastery check, adaptive messages, and metadata.

## Socratic Validation
- Dialogue includes diagnostic, guided discovery, correct branch, partial branch, misconception branch, unsure branch, unrelated branch, recovery prompts, reflection, transfer, escalation rules, and exit condition.
- Tutor asks the learner to name the target before performing algebraic moves.

## Metadata Validation
- Every template includes IDs, difficulty, timing, visual flag, compatibility flags, prerequisites, misconception tags, randomization constraints, and support-system mappings.

## Known Issues
- The repository specifications differ on the label for Hint 4. This phase uses "Guided Next Step" to match the master prompt language.
- `PHASE_TEMPLATE.md` omits Common Misconceptions from the Knowledge Graph section, but this phase includes it because the master prompt and knowledge graph guide require it.
