# Phase 014 - Function Notation

## Phase Metadata
- Course: Precalculus Odyssey Bible v5
- Topic: Function notation
- Subtopic: Interpreting, evaluating, and using function notation across formulas, tables, graphs, and contexts
- Prerequisites: Phase 001 one-step linear equations, Phase 002 multi-step linear equations, Phase 013 systems by graphing, ordered pairs, coordinate graph reading, basic exponent rules
- Related phases: Phase 015 - Domain from formulas; Phase 016 - Domain from graphs; Phase 017 - Range from graphs; Phase 019 - Function composition; Phase 020 - Inverse functions
- Estimated phase size: 20 template families, 20 core examples, 120 progressive hints, 1 tutorial sequence, 1 Socratic dialogue system

## Learning Objectives
By the end of this phase, the player can:

1. Interpret `f(x)` as the output of function `f` at input `x`.
2. Evaluate function formulas at numerical inputs.
3. Evaluate functions at negative, zero, fractional, and expression inputs.
4. Use parentheses correctly when substituting inputs.
5. Solve equations of the form `f(x)=k`.
6. Read function values from tables and graphs.
7. Translate between function notation and ordered pairs.
8. Interpret function notation in real contexts with units.
9. Compare outputs from two functions at the same input.
10. Recognize common notation errors, especially treating `f(x)` as multiplication.

## Prerequisite Review
- An ordered pair `(a,b)` on the graph of a function means `f(a)=b`.
- Substitution means replacing the input variable with a value or expression.
- Parentheses preserve signs, especially for negative inputs and powers.
- A function input is usually the value inside parentheses.
- A function output is the value returned after applying the rule.

## Core Concepts
- `f(x)` is read "f of x." It means the output of function `f` when the input is `x`.
- The letter `f` is the function name, not a variable being multiplied by `x`.
- To evaluate `f(4)` from `f(x)=2x+3`, replace every `x` with `4`.
- To solve `f(x)=11`, find the input value or values that make the output 11.
- Tables, graphs, formulas, and contexts can all represent the same input-output idea.

## Common Misconceptions
- Treating `f(3)` as `f * 3`.
- Replacing only one occurrence of `x` in a formula.
- Forgetting parentheses around negative inputs.
- Thinking `f(x)=7` asks for the output instead of the input.
- Reading graph coordinates backward.
- Confusing `f(2)` with the point `(f,2)` or `(2,f)`.
- Assuming every output comes from exactly one input.
- Ignoring units in context functions.

# Part I - Question Bible

## Template T001 - Evaluate a linear function
- Template ID: P014-T001
- Question Type: Direct computation
- Cognitive Skill: Substitute a numerical input
- Difficulty: 2
- Estimated Time: 40 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Evaluate `f(a)` from a formula.
- Example Question: If `f(x)=2x+3`, find `f(4)`.
- Answer: `11`.
- Explanation: Replace `x` with `4`: `f(4)=2(4)+3=8+3=11`.
- Distractors: `9`; `14`; `2x+7`; `(4,11)`
- Distractor Rationale: Adds before multiplying; multiplies by `4+3`; does not finish substituting; gives an ordered pair instead of the output.
- Randomization Rules: Use linear functions `f(x)=ax+b` with integer inputs.
- Validity Constraints: Arithmetic should stay within manageable integer values.
- Metadata: phase_id=P014; prerequisites=[substitution, integer arithmetic]; misconception_tags=[operation order, incomplete substitution, output-vs-point]; randomization_constraints=[integer input].
- Graph/Visual Variant: Mark the point `(4,11)` on a graph.
- Modeling Variant: Evaluate a cost or score function at a given input.
- Reverse Variant: Given `f(4)=11`, write one possible linear rule.
- Equation Battle Variant: Substitute-input card, multiply, add.
- Multi-stage Boss Variant: Evaluate and convert to ordered pair.
- Hint Mapping: H-P014-T001
- Tutorial Mapping: Tut-P014 sections Formula Evaluation
- Socratic Mapping: Soc-P014 evaluate branch

## Template T002 - Evaluate with a negative input
- Template ID: P014-T002
- Question Type: Direct computation
- Cognitive Skill: Use parentheses for negative inputs
- Difficulty: 2
- Estimated Time: 50 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Evaluate a function accurately at a negative input.
- Example Question: If `f(x)=x^2-2x`, find `f(-3)`.
- Answer: `15`.
- Explanation: Use parentheses: `f(-3)=(-3)^2-2(-3)=9+6=15`.
- Distractors: `3`; `-15`; `9`; `-3`
- Distractor Rationale: Squares incorrectly or loses sign; treats both terms as negative; evaluates only the square term; returns the input.
- Randomization Rules: Use polynomial or quadratic expressions where parentheses affect the result.
- Validity Constraints: Negative input must be clearly inside function parentheses.
- Metadata: phase_id=P014; prerequisites=[negative numbers, exponents]; misconception_tags=[missing parentheses, sign error, input-output confusion]; randomization_constraints=[negative input].
- Graph/Visual Variant: Show point `(-3,15)` on a graph if scale allows.
- Modeling Variant: Evaluate a transformed score at a negative change.
- Reverse Variant: Create a function where `f(-3)=15`.
- Equation Battle Variant: Substitute negative input with parentheses, square, simplify.
- Multi-stage Boss Variant: Compare result with common no-parentheses error.
- Hint Mapping: H-P014-T002
- Tutorial Mapping: Tut-P014 sections Parentheses and Signs
- Socratic Mapping: Soc-P014 negative-input branch

## Template T003 - Evaluate at zero
- Template ID: P014-T003
- Question Type: Direct computation
- Cognitive Skill: Interpret y-intercept as `f(0)`
- Difficulty: 2
- Estimated Time: 35 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Evaluate `f(0)` and connect it to the starting value.
- Example Question: If `f(x)=-4x+9`, find `f(0)`.
- Answer: `9`.
- Explanation: `f(0)=-4(0)+9=9`. For a graph, this is the y-intercept.
- Distractors: `0`; `-4`; `-9`; `(9,0)`
- Distractor Rationale: Returns the input; uses the slope; sign error; reverses point coordinates.
- Randomization Rules: Use linear functions with nonzero intercept.
- Validity Constraints: Input must be exactly 0.
- Metadata: phase_id=P014; prerequisites=[multiplying by zero, y-intercepts]; misconception_tags=[input-output confusion, slope-as-output, coordinate reversal]; randomization_constraints=[zero input].
- Graph/Visual Variant: Identify the y-intercept on a graph.
- Modeling Variant: Interpret initial amount at time zero.
- Reverse Variant: Given `f(0)=9`, identify a possible intercept.
- Equation Battle Variant: Substitute zero and simplify.
- Multi-stage Boss Variant: Evaluate and interpret as starting value.
- Hint Mapping: H-P014-T003
- Tutorial Mapping: Tut-P014 sections Formula Evaluation
- Socratic Mapping: Soc-P014 zero branch

## Template T004 - Evaluate at a fractional input
- Template ID: P014-T004
- Question Type: Direct computation
- Cognitive Skill: Substitute and simplify fractions
- Difficulty: 3
- Estimated Time: 60 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Evaluate a function at a fractional input.
- Example Question: If `f(x)=6x-1`, find `f(1/2)`.
- Answer: `2`.
- Explanation: `f(1/2)=6(1/2)-1=3-1=2`.
- Distractors: `5/2`; `6/2-1`; `-2`; `1/2`
- Distractor Rationale: Multiplies incorrectly; leaves unsimplified expression; sign error; returns the input.
- Randomization Rules: Use fractions that simplify cleanly.
- Validity Constraints: Final answer should be an integer or simple fraction.
- Metadata: phase_id=P014; prerequisites=[fraction multiplication, substitution]; misconception_tags=[fraction error, incomplete simplification, input-output confusion]; randomization_constraints=[simple fraction input].
- Graph/Visual Variant: Locate the point `(1/2,2)` on a graph.
- Modeling Variant: Evaluate a rate rule at half a unit.
- Reverse Variant: Create a linear function with `f(1/2)=2`.
- Equation Battle Variant: Substitute fraction, multiply, subtract.
- Multi-stage Boss Variant: Include decimal and fraction forms.
- Hint Mapping: H-P014-T004
- Tutorial Mapping: Tut-P014 sections Formula Evaluation
- Socratic Mapping: Soc-P014 fraction branch

## Template T005 - Evaluate an expression input
- Template ID: P014-T005
- Question Type: Symbolic computation
- Cognitive Skill: Replace `x` with an algebraic expression
- Difficulty: 3
- Estimated Time: 70 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Evaluate `f(a+h)` or similar expression inputs.
- Example Question: If `f(x)=3x-5`, find `f(t+2)`.
- Answer: `3t+1`.
- Explanation: Replace `x` with `t+2`: `f(t+2)=3(t+2)-5=3t+6-5=3t+1`.
- Distractors: `3t+2`; `3t-3`; `t+1`; `3(t+2)-5` only.
- Distractor Rationale: Does not distribute; combines constants incorrectly; forgets the coefficient 3; stops before simplifying.
- Randomization Rules: Use linear functions and binomial inputs.
- Validity Constraints: Expression input should simplify to a clear linear expression.
- Metadata: phase_id=P014; prerequisites=[distribution, combining like terms]; misconception_tags=[distribution error, incomplete simplification, coefficient error]; randomization_constraints=[binomial input].
- Graph/Visual Variant: Function machine with expression input.
- Modeling Variant: Evaluate a rule two units after time `t`.
- Reverse Variant: Given `f(t+2)=3t+1`, infer a possible `f(x)`.
- Equation Battle Variant: Substitute expression, distribute, combine.
- Multi-stage Boss Variant: Compare `f(t)+2` with `f(t+2)`.
- Hint Mapping: H-P014-T005
- Tutorial Mapping: Tut-P014 sections Expression Inputs
- Socratic Mapping: Soc-P014 expression-input branch

## Template T006 - Evaluate when the variable appears twice
- Template ID: P014-T006
- Question Type: Direct computation
- Cognitive Skill: Replace every instance of the input variable
- Difficulty: 3
- Estimated Time: 60 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Substitute into all occurrences of `x`.
- Example Question: If `f(x)=x^2+3x-4`, find `f(2)`.
- Answer: `6`.
- Explanation: Replace both `x` values: `f(2)=2^2+3(2)-4=4+6-4=6`.
- Distractors: `4`; `2`; `8`; `x^2+6-4`
- Distractor Rationale: Replaces only the square term; returns the input; arithmetic error; replaces only one occurrence of `x`.
- Randomization Rules: Use formulas where `x` appears at least twice.
- Validity Constraints: All occurrences must be intended substitutions.
- Metadata: phase_id=P014; prerequisites=[substitution, order of operations]; misconception_tags=[partial substitution, arithmetic error, input-output confusion]; randomization_constraints=[multiple x occurrences].
- Graph/Visual Variant: Mark `(2,6)` on the graph.
- Modeling Variant: Evaluate a rule with a base term and a bonus term.
- Reverse Variant: Given an expression with two `x` terms, ask for both replacement spots.
- Equation Battle Variant: Substitute-input cards for every `x`, simplify.
- Multi-stage Boss Variant: Ask player to identify every replacement location.
- Hint Mapping: H-P014-T006
- Tutorial Mapping: Tut-P014 sections Replace Every Input
- Socratic Mapping: Soc-P014 every-x branch

## Template T007 - Solve a linear function equation
- Template ID: P014-T007
- Question Type: Inverse input finding
- Cognitive Skill: Solve `f(x)=k`
- Difficulty: 3
- Estimated Time: 65 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Find the input that gives a specified output.
- Example Question: If `f(x)=2x+3`, solve `f(x)=11`.
- Answer: `x=4`.
- Explanation: Set the rule equal to 11: `2x+3=11`. Then `2x=8`, so `x=4`.
- Distractors: `11`; `f(11)=25`; `x=7`; `(4,11)`
- Distractor Rationale: Returns the output as input; evaluates at 11 instead of solving; subtracts incorrectly; gives point instead of requested input.
- Randomization Rules: Use linear functions with integer input solution.
- Validity Constraints: Coefficient must be nonzero.
- Metadata: phase_id=P014; prerequisites=[linear equations, function notation]; misconception_tags=[output-as-input, evaluate-instead-of-solve, point-vs-input]; randomization_constraints=[integer solution].
- Graph/Visual Variant: Find where the graph has y-value 11.
- Modeling Variant: Find the time when cost reaches a target.
- Reverse Variant: Create a function where `f(4)=11`.
- Equation Battle Variant: Set output equation, subtract, divide.
- Multi-stage Boss Variant: Solve and write the related ordered pair.
- Hint Mapping: H-P014-T007
- Tutorial Mapping: Tut-P014 sections Solving f(x)=k
- Socratic Mapping: Soc-P014 solve-output branch

## Template T008 - Solve a quadratic function equation
- Template ID: P014-T008
- Question Type: Inverse input finding
- Cognitive Skill: Find multiple inputs for one output
- Difficulty: 4
- Estimated Time: 80 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Recognize that two inputs can produce the same output.
- Example Question: If `f(x)=x^2`, solve `f(x)=9`.
- Answer: `x=-3` or `x=3`.
- Explanation: `f(x)=9` means `x^2=9`. Both `-3` and `3` square to 9.
- Distractors: `x=3` only; `x=9`; `x=-9 or 9`; no solution.
- Distractor Rationale: Misses the negative input; treats output as input; uses the output as roots; misclassifies.
- Randomization Rules: Use simple square functions and positive square outputs.
- Validity Constraints: Output must be a perfect square for integer answers.
- Metadata: phase_id=P014; prerequisites=[square roots, function output]; misconception_tags=[missing negative root, output-as-input, false classification]; randomization_constraints=[perfect square output].
- Graph/Visual Variant: Show where parabola reaches y-value 9.
- Modeling Variant: Two symmetric positions producing same height.
- Reverse Variant: Give two inputs and ask for a square-output function.
- Equation Battle Variant: Set equation, square-root branches.
- Multi-stage Boss Variant: Include graph interpretation of two x-values.
- Hint Mapping: H-P014-T008
- Tutorial Mapping: Tut-P014 sections Solving f(x)=k
- Socratic Mapping: Soc-P014 multiple-input branch

## Template T009 - Read function value from a table
- Template ID: P014-T009
- Question Type: Table lookup
- Cognitive Skill: Match input row to output
- Difficulty: 2
- Estimated Time: 40 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Evaluate `f(a)` from a table.
- Example Question: A table shows `x: 0, 1, 2, 3` and `f(x): 5, 7, 9, 11`. Find `f(3)`.
- Answer: `11`.
- Explanation: Look under input `x=3`; the corresponding output is `11`.
- Distractors: `3`; `9`; `(3,11)`; `5`
- Distractor Rationale: Returns input; reads previous row; gives ordered pair instead of output; chooses first output.
- Randomization Rules: Use small tables with unique listed inputs.
- Validity Constraints: Requested input must appear in the table unless the task asks about undefined values.
- Metadata: phase_id=P014; prerequisites=[table reading, input-output pairs]; misconception_tags=[input-output confusion, row error, point-vs-output]; randomization_constraints=[listed input].
- Graph/Visual Variant: Convert table points to graph.
- Modeling Variant: Read score after a listed level.
- Reverse Variant: Given `f(3)=11`, complete a table entry.
- Equation Battle Variant: Not primary; table lookup challenge.
- Multi-stage Boss Variant: Table lookup plus ordered-pair conversion.
- Hint Mapping: H-P014-T009
- Tutorial Mapping: Tut-P014 sections Tables and Ordered Pairs
- Socratic Mapping: Soc-P014 table branch

## Template T010 - Find input from a table output
- Template ID: P014-T010
- Question Type: Table inverse lookup
- Cognitive Skill: Find `x` when `f(x)=k`
- Difficulty: 3
- Estimated Time: 50 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Use a table to solve `f(x)=k`.
- Example Question: A table shows `x: -1, 0, 1, 2` and `f(x): 4, 1, 0, 1`. Find all `x` such that `f(x)=1`.
- Answer: `x=0` and `x=2`.
- Explanation: The output 1 appears in the table at inputs 0 and 2.
- Distractors: `x=1`; `x=-1`; `f(1)=0`; `x=0` only.
- Distractor Rationale: Finds output 0; chooses first input; restates an unrelated table value; misses a second input.
- Randomization Rules: Include outputs that occur once, twice, or not at all.
- Validity Constraints: Answer should list all matching inputs.
- Metadata: phase_id=P014; prerequisites=[table reading, solving from outputs]; misconception_tags=[one-input assumption, output-as-input, incomplete answer]; randomization_constraints=[repeated output].
- Graph/Visual Variant: Mark points with the same y-value.
- Modeling Variant: Find all times a value reaches a level.
- Reverse Variant: Create a table where `f(x)=1` has two inputs.
- Equation Battle Variant: Not primary; table reasoning challenge.
- Multi-stage Boss Variant: Identify all inputs and write related ordered pairs.
- Hint Mapping: H-P014-T010
- Tutorial Mapping: Tut-P014 sections Tables and Ordered Pairs
- Socratic Mapping: Soc-P014 table-inverse branch

## Template T011 - Read function value from a graph
- Template ID: P014-T011
- Question Type: Graph lookup
- Cognitive Skill: Read y-value at a given x-value
- Difficulty: 2
- Estimated Time: 45 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Evaluate `f(a)` from a graph.
- Example Question: On the graph of `f`, the point `(-1,4)` is shown. What is `f(-1)`?
- Answer: `4`.
- Explanation: The point `(-1,4)` means when the input is `-1`, the output is `4`.
- Distractors: `-1`; `(-1,4)`; `1`; `f(4)=-1`
- Distractor Rationale: Returns input; gives ordered pair instead of output; sign error; reverses input and output.
- Randomization Rules: Use clear plotted points on a function graph.
- Validity Constraints: The x-value must correspond to a clearly readable y-value.
- Metadata: phase_id=P014; prerequisites=[coordinate graph reading, ordered pairs]; misconception_tags=[input-output confusion, point-vs-output, coordinate reversal]; randomization_constraints=[visible point].
- Graph/Visual Variant: This template requires a graph.
- Modeling Variant: Read height at a time from a graph.
- Reverse Variant: Given `f(-1)=4`, plot the point.
- Equation Battle Variant: Not primary; graph lookup challenge.
- Multi-stage Boss Variant: Graph lookup plus equation check if formula is given.
- Hint Mapping: H-P014-T011
- Tutorial Mapping: Tut-P014 sections Graphs and Function Values
- Socratic Mapping: Soc-P014 graph branch

## Template T012 - Find input from a graph output
- Template ID: P014-T012
- Question Type: Graph inverse lookup
- Cognitive Skill: Find x-values for a given y-value
- Difficulty: 3
- Estimated Time: 60 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Use a graph to solve `f(x)=k`.
- Example Question: A graph of `f(x)=x^2` is shown. Find all `x` where `f(x)=4`.
- Answer: `x=-2` and `x=2`.
- Explanation: The horizontal level `y=4` intersects the graph at `x=-2` and `x=2`.
- Distractors: `x=4`; `x=2` only; `(-2,2)`; no solution.
- Distractor Rationale: Uses output as input; misses one intersection; combines x-values as an ordered pair; misreads the graph.
- Randomization Rules: Use graphs where a horizontal line hits once, twice, or not at all.
- Validity Constraints: All x-values must be visible.
- Metadata: phase_id=P014; prerequisites=[graph intersections, output levels]; misconception_tags=[output-as-input, missing solution, ordered-pair confusion]; randomization_constraints=[visible intersections].
- Graph/Visual Variant: Show a horizontal guide line at target output.
- Modeling Variant: Find times when height equals a target.
- Reverse Variant: Draw a graph where `f(x)=4` has two inputs.
- Equation Battle Variant: Optional algebra check with square roots.
- Multi-stage Boss Variant: Read graph, list all x-values, verify with formula.
- Hint Mapping: H-P014-T012
- Tutorial Mapping: Tut-P014 sections Graphs and Function Values
- Socratic Mapping: Soc-P014 graph-inverse branch

## Template T013 - Compare two functions at one input
- Template ID: P014-T013
- Question Type: Comparative evaluation
- Cognitive Skill: Evaluate and compare outputs
- Difficulty: 3
- Estimated Time: 70 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Compare `f(a)` and `g(a)`.
- Example Question: If `f(x)=2x+1` and `g(x)=x^2`, compare `f(3)` and `g(3)`.
- Answer: `f(3)=7`, `g(3)=9`, so `g(3)>f(3)`.
- Explanation: Evaluate both rules at input 3. `2(3)+1=7`; `3^2=9`.
- Distractors: `f(3)>g(3)`; both equal 3; both equal 9; cannot compare.
- Distractor Rationale: Arithmetic error; returns input; uses only `g`; ignores direct evaluation.
- Randomization Rules: Use two functions and a shared input.
- Validity Constraints: Outputs should be easy to compare.
- Metadata: phase_id=P014; prerequisites=[function evaluation, inequalities]; misconception_tags=[one-function evaluation, input-output confusion, comparison error]; randomization_constraints=[shared input].
- Graph/Visual Variant: Compare two graph heights at the same x-value.
- Modeling Variant: Compare two plans at one time.
- Reverse Variant: Create functions where `g(3)>f(3)`.
- Equation Battle Variant: Evaluate both, compare outputs.
- Multi-stage Boss Variant: Include table or graph support.
- Hint Mapping: H-P014-T013
- Tutorial Mapping: Tut-P014 sections Comparing Function Values
- Socratic Mapping: Soc-P014 compare branch

## Template T014 - Difference quotient for a linear function
- Template ID: P014-T014
- Question Type: Symbolic computation
- Cognitive Skill: Evaluate and simplify `(f(x+h)-f(x))/h`
- Difficulty: 4
- Estimated Time: 100 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Use function notation with expression inputs in a difference quotient.
- Example Question: If `f(x)=2x+3`, simplify `(f(x+h)-f(x))/h`, where `h` is not 0.
- Answer: `2`.
- Explanation: `f(x+h)=2(x+h)+3=2x+2h+3`. Then `(f(x+h)-f(x))/h=(2x+2h+3-(2x+3))/h=2h/h=2`.
- Distractors: `2x+3`; `2h`; `2x+2h+3`; `0`
- Distractor Rationale: Uses `f(x)` only; stops before dividing by `h`; gives `f(x+h)` only; cancels too much.
- Randomization Rules: Use linear functions so the quotient simplifies to the slope.
- Validity Constraints: State `h` is not 0.
- Metadata: phase_id=P014; prerequisites=[expression inputs, simplifying algebraic fractions]; misconception_tags=[difference quotient confusion, incomplete simplification, cancellation error]; randomization_constraints=[linear function, h nonzero].
- Graph/Visual Variant: Connect quotient to slope on a line.
- Modeling Variant: Average rate of change for a linear rule.
- Reverse Variant: Given quotient 2, create a linear function with slope 2.
- Equation Battle Variant: Compute `f(x+h)`, subtract, divide by `h`.
- Multi-stage Boss Variant: Include explanation of why `h` cannot be 0.
- Hint Mapping: H-P014-T014
- Tutorial Mapping: Tut-P014 sections Expression Inputs and Rates
- Socratic Mapping: Soc-P014 difference-quotient branch

## Template T015 - Context interpretation of function notation
- Template ID: P014-T015
- Question Type: Modeling interpretation
- Cognitive Skill: Interpret input, output, and units
- Difficulty: 3
- Estimated Time: 60 seconds
- Visual Required: false
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Explain the meaning of function notation in context.
- Example Question: The function `h(t)` gives a rocket's height in meters `t` seconds after launch. What does `h(3)=45` mean?
- Answer: After 3 seconds, the rocket is 45 meters high.
- Explanation: The input is time in seconds; the output is height in meters.
- Distractors: The rocket launches from 3 meters; after 45 seconds the rocket is 3 meters high; the rocket travels 45 meters per second; `h` times 3 equals 45.
- Distractor Rationale: Confuses input and output; reverses input and output; interprets output as rate; treats notation as multiplication.
- Randomization Rules: Use contexts with clear input and output units.
- Validity Constraints: Units must match the function description.
- Metadata: phase_id=P014; prerequisites=[units, input-output interpretation]; misconception_tags=[unit confusion, input-output reversal, multiplication notation]; randomization_constraints=[clear units].
- Graph/Visual Variant: Mark point `(3,45)` on a height-time graph.
- Modeling Variant: This template is the modeling variant.
- Reverse Variant: Given a sentence, write `h(3)=45`.
- Equation Battle Variant: Not primary; interpretation challenge.
- Multi-stage Boss Variant: Identify input, output, units, and ordered pair.
- Hint Mapping: H-P014-T015
- Tutorial Mapping: Tut-P014 sections Context Meaning
- Socratic Mapping: Soc-P014 context branch

## Template T016 - Convert function notation to an ordered pair
- Template ID: P014-T016
- Question Type: Representation conversion
- Cognitive Skill: Translate `f(a)=b` into `(a,b)`
- Difficulty: 2
- Estimated Time: 35 seconds
- Visual Required: false
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Connect function notation with graph points.
- Example Question: Write `f(6)=-2` as an ordered pair on the graph of `f`.
- Answer: `(6,-2)`.
- Explanation: The input is 6, so it is the x-coordinate. The output is -2, so it is the y-coordinate.
- Distractors: `(-2,6)`; `(6,2)`; `f(-2)=6`; `-12`
- Distractor Rationale: Reverses coordinates; loses negative sign; rewrites reversed notation; treats notation as multiplication.
- Randomization Rules: Use positive and negative outputs.
- Validity Constraints: Ordered pair must preserve sign and order.
- Metadata: phase_id=P014; prerequisites=[ordered pairs, graph points]; misconception_tags=[coordinate reversal, sign error, multiplication notation]; randomization_constraints=[signed output].
- Graph/Visual Variant: Plot the ordered pair.
- Modeling Variant: Convert a context statement to a point.
- Reverse Variant: Convert `(6,-2)` back to `f(6)=-2`.
- Equation Battle Variant: Not primary; representation challenge.
- Multi-stage Boss Variant: Convert both directions.
- Hint Mapping: H-P014-T016
- Tutorial Mapping: Tut-P014 sections Tables and Ordered Pairs
- Socratic Mapping: Soc-P014 ordered-pair branch

## Template T017 - Error analysis with negative input
- Template ID: P014-T017
- Question Type: Error analysis
- Cognitive Skill: Diagnose missing parentheses in function evaluation
- Difficulty: 3
- Estimated Time: 70 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Correct a common negative-input evaluation error.
- Example Question: A student evaluates `f(-2)` for `f(x)=x^2+1` and writes `-2^2+1=-3`. What is the mistake and correct value?
- Answer: The input must be squared as `(-2)^2`. Correct value: `5`.
- Explanation: `f(-2)=(-2)^2+1=4+1=5`. Without parentheses, `-2^2` means `-(2^2)`.
- Distractors: correct value `-3`; mistake is adding 1; correct value `3`; no mistake.
- Distractor Rationale: Accepts missing parentheses; misidentifies operation; drops the square result; misses order of operations.
- Randomization Rules: Use even powers and negative inputs.
- Validity Constraints: The wrong step must be a clear parentheses error.
- Metadata: phase_id=P014; prerequisites=[negative exponents notation, order of operations]; misconception_tags=[missing parentheses, sign error, error diagnosis]; randomization_constraints=[negative input, even power].
- Graph/Visual Variant: Compare points `(-2,5)` and `(-2,-3)`.
- Modeling Variant: Diagnose an evaluation error in a score rule.
- Reverse Variant: Create a wrong evaluation caused by missing parentheses.
- Equation Battle Variant: Reject no-parentheses substitution card; use grouped input card.
- Multi-stage Boss Variant: Identify mistake, correct it, and explain notation.
- Hint Mapping: H-P014-T017
- Tutorial Mapping: Tut-P014 sections Common Mistakes
- Socratic Mapping: Soc-P014 error branch

## Template T018 - Identify function name and input
- Template ID: P014-T018
- Question Type: Notation interpretation
- Cognitive Skill: Separate function name, input, and output
- Difficulty: 2
- Estimated Time: 35 seconds
- Visual Required: false
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Identify the parts of function notation.
- Example Question: In `g(8)=13`, what is the function name, input, and output?
- Answer: Function name `g`; input `8`; output `13`.
- Explanation: The symbol before parentheses names the function. The value inside parentheses is the input. The value after the equals sign is the output.
- Distractors: name `8`, input `g`, output `13`; name `g`, input `13`, output `8`; name `g(8)`, input `13`, output `g`; `g*8=13`
- Distractor Rationale: Confuses name and input; reverses input/output; treats whole notation as a name; treats notation as multiplication.
- Randomization Rules: Use different function names and numeric inputs/outputs.
- Validity Constraints: Notation must have a clear function name and equality.
- Metadata: phase_id=P014; prerequisites=[symbol reading, equality]; misconception_tags=[notation parts confusion, input-output reversal, multiplication notation]; randomization_constraints=[single function statement].
- Graph/Visual Variant: Link `g(8)=13` to point `(8,13)`.
- Modeling Variant: Interpret named functions like cost `C(t)`.
- Reverse Variant: Given name, input, and output, write function notation.
- Equation Battle Variant: Not primary; notation classification challenge.
- Multi-stage Boss Variant: Convert notation to sentence and point.
- Hint Mapping: H-P014-T018
- Tutorial Mapping: Tut-P014 sections What f(x) Means
- Socratic Mapping: Soc-P014 notation-parts branch

## Template T019 - Reverse-build a function from a value
- Template ID: P014-T019
- Question Type: Reverse construction
- Cognitive Skill: Create a function with a target function value
- Difficulty: 4
- Estimated Time: 80 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Construct a function rule satisfying a specified function value.
- Example Question: Create a linear function `f(x)` such that `f(2)=7`.
- Answer: One valid answer is `f(x)=3x+1`.
- Explanation: Check: `f(2)=3(2)+1=7`. Many other functions are possible.
- Distractors: `f(x)=2x+7`; `f(x)=7x+2`; `f(7)=2`; `f(x)=3x-1`
- Distractor Rationale: Gives output 11 at 2; gives output 16 at 2; reverses input/output; gives output 5 at 2.
- Randomization Rules: Provide a target input-output pair and request a linear rule.
- Validity Constraints: The submitted rule must satisfy the target value.
- Metadata: phase_id=P014; prerequisites=[linear functions, checking values]; misconception_tags=[not checking target, input-output reversal, arithmetic error]; randomization_constraints=[target value].
- Graph/Visual Variant: Draw a line passing through `(2,7)`.
- Modeling Variant: Create a cost rule matching one data point.
- Reverse Variant: This template is the reverse variant.
- Equation Battle Variant: Choose slope and solve for intercept.
- Multi-stage Boss Variant: Create rule, verify, and give a second point.
- Hint Mapping: H-P014-T019
- Tutorial Mapping: Tut-P014 sections Reverse Construction
- Socratic Mapping: Soc-P014 reverse branch

## Template T020 - Boss function notation challenge
- Template ID: P014-T020
- Question Type: Multi-stage boss
- Cognitive Skill: Evaluate, solve, read, interpret, and verify function notation
- Difficulty: 5
- Estimated Time: 150 seconds
- Visual Required: true
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Use function notation across formulas, tables, graphs, and context in one challenge.
- Example Question: Boss Gate: Let `f(x)=x^2-2x+1`. A table for `g` shows `g(1)=4`, `g(3)=8`, and `g(5)=12`. A graph of `h` contains the point `(2,-3)`. Find `f(-2)`, solve `f(x)=1`, find `g(3)`, and state `h(2)`.
- Answer: `f(-2)=9`; `f(x)=1` gives `x=0` or `x=2`; `g(3)=8`; `h(2)=-3`.
- Explanation: `f(-2)=(-2)^2-2(-2)+1=4+4+1=9`. For `f(x)=1`, solve `x^2-2x+1=1`, so `x^2-2x=0`, `x(x-2)=0`, and `x=0 or 2`. The table gives `g(3)=8`. The graph point `(2,-3)` means `h(2)=-3`.
- Distractors: `f(-2)=1`; `x=1` only; `g(3)=3`; `h(-3)=2`
- Distractor Rationale: Missing parentheses/sign error; confuses vertex input with solutions; returns table input; reverses graph input and output.
- Randomization Rules: Combine formula, table, and graph tasks with at least one negative input and one solve-output item.
- Validity Constraints: All subanswers must be independently checkable.
- Metadata: phase_id=P014; prerequisites=[function evaluation, factoring, table lookup, graph reading]; misconception_tags=[missing parentheses, output-as-input, coordinate reversal, table error]; randomization_constraints=[mixed representations].
- Graph/Visual Variant: Include a graph point for `h`.
- Modeling Variant: Include one contextual interpretation subpart.
- Reverse Variant: Build a mixed representation set matching target values.
- Equation Battle Variant: Evaluate, factor, table lookup, graph lookup.
- Multi-stage Boss Variant: This is the phase boss template.
- Hint Mapping: H-P014-T020
- Tutorial Mapping: Tut-P014 sections Full Phase Review
- Socratic Mapping: Soc-P014 boss branch

# Part II - Hint Bible

## H-P014-T001
- Hint 1 - Gentle Nudge: `f(4)` means use input 4.
- Hint 2 - Concept Reminder: Replace `x` with 4.
- Hint 3 - Focus Hint: Write `2(4)+3`.
- Hint 4 - Guided Next Step: Multiply first: `8+3`.
- Hint 5 - Nearly Complete: Add to get the output.
- Hint 6 - Full Solution: `f(4)=11`.

## H-P014-T002
- Hint 1 - Gentle Nudge: Put the negative input in parentheses.
- Hint 2 - Concept Reminder: `(-3)^2` is positive 9.
- Hint 3 - Focus Hint: `f(-3)=(-3)^2-2(-3)`.
- Hint 4 - Guided Next Step: Simplify to `9+6`.
- Hint 5 - Nearly Complete: Add the terms.
- Hint 6 - Full Solution: `f(-3)=15`.

## H-P014-T003
- Hint 1 - Gentle Nudge: Use input 0.
- Hint 2 - Concept Reminder: Any number times 0 is 0.
- Hint 3 - Focus Hint: `-4(0)+9`.
- Hint 4 - Guided Next Step: This becomes `0+9`.
- Hint 5 - Nearly Complete: The output is the constant term.
- Hint 6 - Full Solution: `f(0)=9`.

## H-P014-T004
- Hint 1 - Gentle Nudge: Substitute `1/2` for `x`.
- Hint 2 - Concept Reminder: `6(1/2)=3`.
- Hint 3 - Focus Hint: `f(1/2)=6(1/2)-1`.
- Hint 4 - Guided Next Step: Simplify to `3-1`.
- Hint 5 - Nearly Complete: Subtract.
- Hint 6 - Full Solution: `f(1/2)=2`.

## H-P014-T005
- Hint 1 - Gentle Nudge: The entire input is `t+2`.
- Hint 2 - Concept Reminder: Replace `x` with `t+2`.
- Hint 3 - Focus Hint: `f(t+2)=3(t+2)-5`.
- Hint 4 - Guided Next Step: Distribute to get `3t+6-5`.
- Hint 5 - Nearly Complete: Combine constants.
- Hint 6 - Full Solution: `f(t+2)=3t+1`.

## H-P014-T006
- Hint 1 - Gentle Nudge: Replace every `x`, not just one.
- Hint 2 - Concept Reminder: The formula has `x^2` and `3x`.
- Hint 3 - Focus Hint: `f(2)=2^2+3(2)-4`.
- Hint 4 - Guided Next Step: Simplify to `4+6-4`.
- Hint 5 - Nearly Complete: Combine.
- Hint 6 - Full Solution: `f(2)=6`.

## H-P014-T007
- Hint 1 - Gentle Nudge: `f(x)=11` asks for the input.
- Hint 2 - Concept Reminder: Set the formula equal to 11.
- Hint 3 - Focus Hint: `2x+3=11`.
- Hint 4 - Guided Next Step: Subtract 3 from both sides.
- Hint 5 - Nearly Complete: `2x=8`, so divide by 2.
- Hint 6 - Full Solution: `x=4`.

## H-P014-T008
- Hint 1 - Gentle Nudge: You need all inputs whose square is 9.
- Hint 2 - Concept Reminder: Positive and negative numbers can share the same square.
- Hint 3 - Focus Hint: Solve `x^2=9`.
- Hint 4 - Guided Next Step: Take both square-root branches.
- Hint 5 - Nearly Complete: `x=3` and `x=-3`.
- Hint 6 - Full Solution: `x=-3 or x=3`.

## H-P014-T009
- Hint 1 - Gentle Nudge: Find input 3 in the table.
- Hint 2 - Concept Reminder: The output is in the `f(x)` row or column.
- Hint 3 - Focus Hint: Under `x=3`, the output is 11.
- Hint 4 - Guided Next Step: Report the output, not the ordered pair unless asked.
- Hint 5 - Nearly Complete: `f(3)` equals the listed output.
- Hint 6 - Full Solution: `f(3)=11`.

## H-P014-T010
- Hint 1 - Gentle Nudge: This asks where the output equals 1.
- Hint 2 - Concept Reminder: Look across the `f(x)` row for 1.
- Hint 3 - Focus Hint: The output 1 appears under inputs 0 and 2.
- Hint 4 - Guided Next Step: List both inputs.
- Hint 5 - Nearly Complete: Do not stop after the first match.
- Hint 6 - Full Solution: `x=0` and `x=2`.

## H-P014-T011
- Hint 1 - Gentle Nudge: A graph point gives input and output.
- Hint 2 - Concept Reminder: `(-1,4)` means input -1, output 4.
- Hint 3 - Focus Hint: `f(-1)` asks for the y-value at x = -1.
- Hint 4 - Guided Next Step: Read the second coordinate.
- Hint 5 - Nearly Complete: The output is 4.
- Hint 6 - Full Solution: `f(-1)=4`.

## H-P014-T012
- Hint 1 - Gentle Nudge: Draw or imagine the horizontal line `y=4`.
- Hint 2 - Concept Reminder: `f(x)=4` asks for x-values with output 4.
- Hint 3 - Focus Hint: On `f(x)=x^2`, `y=4` happens at two points.
- Hint 4 - Guided Next Step: The x-values are -2 and 2.
- Hint 5 - Nearly Complete: List both inputs, not an ordered pair.
- Hint 6 - Full Solution: `x=-2` and `x=2`.

## H-P014-T013
- Hint 1 - Gentle Nudge: Evaluate both functions at input 3.
- Hint 2 - Concept Reminder: Use the same input for `f` and `g`.
- Hint 3 - Focus Hint: `f(3)=2(3)+1`.
- Hint 4 - Guided Next Step: `g(3)=3^2`.
- Hint 5 - Nearly Complete: Compare 7 and 9.
- Hint 6 - Full Solution: `f(3)=7`, `g(3)=9`, so `g(3)>f(3)`.

## H-P014-T014
- Hint 1 - Gentle Nudge: First find `f(x+h)`.
- Hint 2 - Concept Reminder: Replace `x` with `x+h`.
- Hint 3 - Focus Hint: `f(x+h)=2x+2h+3`.
- Hint 4 - Guided Next Step: Subtract `f(x)=2x+3`.
- Hint 5 - Nearly Complete: The numerator simplifies to `2h`.
- Hint 6 - Full Solution: `(f(x+h)-f(x))/h = 2`.

## H-P014-T015
- Hint 1 - Gentle Nudge: Identify what the input measures.
- Hint 2 - Concept Reminder: `t` is time in seconds.
- Hint 3 - Focus Hint: `h(3)` means height after 3 seconds.
- Hint 4 - Guided Next Step: The output 45 is measured in meters.
- Hint 5 - Nearly Complete: Put input and output into a sentence.
- Hint 6 - Full Solution: After 3 seconds, the rocket is 45 meters high.

## H-P014-T016
- Hint 1 - Gentle Nudge: Function notation maps input to output.
- Hint 2 - Concept Reminder: The input becomes the x-coordinate.
- Hint 3 - Focus Hint: In `f(6)=-2`, input is 6 and output is -2.
- Hint 4 - Guided Next Step: Write `(input, output)`.
- Hint 5 - Nearly Complete: Preserve the negative sign.
- Hint 6 - Full Solution: `(6,-2)`.

## H-P014-T017
- Hint 1 - Gentle Nudge: The whole input is `-2`.
- Hint 2 - Concept Reminder: Use `(-2)^2`, not `-2^2`.
- Hint 3 - Focus Hint: `(-2)^2=4`.
- Hint 4 - Guided Next Step: Add 1.
- Hint 5 - Nearly Complete: The correct value is positive.
- Hint 6 - Full Solution: Mistake: missing parentheses. Correct value: `5`.

## H-P014-T018
- Hint 1 - Gentle Nudge: The function name comes before the parentheses.
- Hint 2 - Concept Reminder: The input is inside the parentheses.
- Hint 3 - Focus Hint: In `g(8)=13`, `g` is the name.
- Hint 4 - Guided Next Step: Input is 8; output is 13.
- Hint 5 - Nearly Complete: Do not treat `g(8)` as multiplication.
- Hint 6 - Full Solution: Function name `g`; input `8`; output `13`.

## H-P014-T019
- Hint 1 - Gentle Nudge: Your function must output 7 when input is 2.
- Hint 2 - Concept Reminder: A linear rule has form `f(x)=mx+b`.
- Hint 3 - Focus Hint: Try slope 3.
- Hint 4 - Guided Next Step: `3(2)=6`, so add 1 to reach 7.
- Hint 5 - Nearly Complete: Check `f(2)=3(2)+1`.
- Hint 6 - Full Solution: One valid answer is `f(x)=3x+1`.

## H-P014-T020
- Hint 1 - Gentle Nudge: Handle one representation at a time.
- Hint 2 - Concept Reminder: Use parentheses for `f(-2)`.
- Hint 3 - Focus Hint: `f(-2)=(-2)^2-2(-2)+1`.
- Hint 4 - Guided Next Step: For `f(x)=1`, solve `x^2-2x+1=1`.
- Hint 5 - Nearly Complete: The table gives `g(3)=8`; the graph point gives `h(2)=-3`.
- Hint 6 - Full Solution: `f(-2)=9`; `x=0 or 2`; `g(3)=8`; `h(2)=-3`.

# Part III - Tutorial Bible

## Learning Goal
Learn to read, evaluate, solve, and interpret function notation across formulas, tables, graphs, and contexts.

## Why It Matters
Function notation is the language of input and output. It lets a game, graph, table, or formula all say the same thing clearly: when this input goes in, that output comes out. Later topics such as domain, range, transformations, composition, inverses, and modeling all depend on this notation.

## Prerequisite Check
Ask the player:

1. In the point `(4,11)`, which coordinate is the input? Expected: 4.
2. Evaluate `2(4)+3`. Expected: 11.
3. What is `(-3)^2`? Expected: 9.
4. What does a graph point `(-1,4)` say about input and output? Expected: input -1, output 4.
5. Solve `2x+3=11`. Expected: `x=4`.

## What f(x) Means
`f(x)` is read "f of x."

It does not mean `f` times `x`.

The letter `f` names the function. The value inside parentheses is the input. The function returns an output.

`f(4)=11` means:

- Function name: `f`
- Input: `4`
- Output: `11`
- Graph point: `(4,11)`

## Formula Evaluation
To evaluate a formula:

1. Identify the input.
2. Replace every `x` with that input.
3. Use parentheses when needed.
4. Simplify.

Example:

`f(x)=2x+3`

`f(4)=2(4)+3=11`

## Parentheses and Signs
Negative inputs need parentheses.

For `f(x)=x^2-2x`:

`f(-3)=(-3)^2-2(-3)=9+6=15`

Without parentheses, the square and negative sign can be interpreted incorrectly.

## Replace Every Input
If `x` appears more than once, every `x` must be replaced.

For `f(x)=x^2+3x-4`:

`f(2)=2^2+3(2)-4=6`

Replacing only one `x` changes the rule.

## Expression Inputs
The input can be an expression.

For `f(x)=3x-5`:

`f(t+2)=3(t+2)-5=3t+1`

The entire expression `t+2` replaces `x`.

## Solving f(x)=k
`f(x)=k` asks for input values that produce output `k`.

For `f(x)=2x+3`, solving `f(x)=11` means:

`2x+3=11`

`x=4`

For `f(x)=x^2`, solving `f(x)=9` gives `x=-3` or `x=3`.

## Tables and Ordered Pairs
A table lists input-output pairs.

If a table row says `x=3` and `f(x)=11`, then:

`f(3)=11`

and the graph point is `(3,11)`.

To solve from a table, look for the output. If `f(x)=1` appears at inputs 0 and 2, then both inputs are solutions.

## Graphs and Function Values
On a graph, the x-coordinate is the input and the y-coordinate is the output.

If the graph contains `(-1,4)`, then `f(-1)=4`.

To solve `f(x)=4`, look for all points on the graph with y-coordinate 4.

## Comparing Function Values
To compare `f(3)` and `g(3)`:

1. Evaluate `f` at 3.
2. Evaluate `g` at 3.
3. Compare the outputs.

The input must be the same for both functions.

## Expression Inputs and Rates
Function notation can describe changes.

For `f(x)=2x+3`:

`f(x+h)=2(x+h)+3=2x+2h+3`

The difference quotient:

`(f(x+h)-f(x))/h`

simplifies to 2 when `h` is not 0.

## Context Meaning
In context, function notation carries units.

If `h(t)` gives height in meters after `t` seconds, then `h(3)=45` means:

After 3 seconds, the height is 45 meters.

The input unit is seconds. The output unit is meters.

## Reverse Construction
To create a function with `f(2)=7`, choose a rule that outputs 7 at input 2.

Example:

`f(x)=3x+1`

Check:

`f(2)=3(2)+1=7`

## Common Mistakes
- Mistake: Reading `f(3)` as multiplication.
  Correction: `f` is the function name; 3 is the input.
- Mistake: Replacing only one `x`.
  Correction: Replace every occurrence of the input variable.
- Mistake: Missing parentheses for negative inputs.
  Correction: Write `(-2)^2` when the input is `-2`.
- Mistake: Solving `f(x)=11` by evaluating `f(11)`.
  Correction: Set the formula equal to 11 and solve for the input.
- Mistake: Reversing graph coordinates.
  Correction: Function notation `f(a)=b` corresponds to `(a,b)`.

## Guided Practice
1. If `f(x)=4x-1`, find `f(3)`.
   - `4(3)-1=11`.

2. If `f(x)=x^2+2`, find `f(-2)`.
   - `(-2)^2+2=6`.

3. If `f(x)=5x+1`, solve `f(x)=16`.
   - `5x+1=16`.
   - `x=3`.

4. If `f(6)=-2`, write the ordered pair.
   - `(6,-2)`.

## Independent Practice
1. `f(x)=3x+2`; find `f(5)`. Answer: `17`.
2. `g(x)=x^2-1`; find `g(-4)`. Answer: `15`.
3. `h(x)=2x-7`; solve `h(x)=9`. Answer: `x=8`.
4. Table has `x: 1,2,3` and `p(x): 4,6,8`; find `p(2)`. Answer: `6`.
5. Graph contains `(5,-1)`; find `q(5)`. Answer: `-1`.
6. Write `r(-3)=10` as a point. Answer: `(-3,10)`.

## Mastery Check
The player is ready to advance when they can:

1. Identify function name, input, and output.
2. Evaluate formulas at numbers and expressions.
3. Use parentheses for negative inputs.
4. Solve `f(x)=k`.
5. Read function values from tables and graphs.
6. Convert between `f(a)=b` and `(a,b)`.
7. Interpret function notation with units.

Mastery check set:

1. `f(x)=2x+5`; `f(6)=17`.
2. `g(x)=x^2+3x`; `g(-2)=-2`.
3. `h(x)=4x-1`; solve `h(x)=15`; answer `x=4`.
4. If `p(7)=12`, the graph point is `(7,12)`.
5. If `A(t)` is area in square meters after `t` seconds, `A(5)=20` means area is 20 square meters after 5 seconds.

## Adaptive Tutor Messages
- If the player treats `f(3)` as multiplication: "The letter names the function; the number inside parentheses is the input."
- If only one `x` is replaced: "Every occurrence of the input variable receives the same input."
- If a negative input is mishandled: "Wrap the input in parentheses before applying powers or multiplication."
- If `f(x)=k` is evaluated as `f(k)`: "The output is already known; solve for the input."
- If a table or graph value is reversed: "Function notation follows `(input, output)`."
- If context units are missing: "Name what the input measures and what the output measures."
- If the player succeeds quickly: "You are ready for domain restrictions, where not every input is allowed."

## Tutorial Metadata
- Tutorial ID: Tut-P014
- Estimated duration: 6 minutes
- Target player state: knows substitution, linear equations, and coordinate points
- Unlock condition: available from any Phase 014 question
- Remediation trigger: two multiplication-notation errors, two negative-input errors, two graph/table reversal errors, or one repeated `f(x)=k` solving confusion
- Advancement trigger: 80 percent accuracy on mixed formula, table, graph, context, and solve-output function notation tasks

# Part IV - Socratic Dialogue Bible

## Opening Diagnostic
Tutor: "If `f(x)=2x+3`, what does `f(4)` ask you to do?"

Expected strong answer: "Use 4 as the input, so `2(4)+3=11`."

## Guided Discovery
Tutor sequence:

1. "What is the function name?"
2. "What is the input?"
3. "What is the output being requested or given?"
4. "If there is a formula, where should the input be substituted?"
5. "Does the input need parentheses?"
6. "Does every occurrence of `x` get replaced?"
7. "If the question says `f(x)=k`, are we finding an input or an output?"
8. "If the representation is a table, which row or column gives the output?"
9. "If the representation is a graph, what point or y-level should we read?"
10. "What ordered pair or context sentence matches the notation?"

## Correct Branch
Player: "`f(4)` means plug in 4."

Tutor: "Good. What expression do you get after replacing `x` with 4?"

If player writes `2(4)+3`, ask them to simplify.

## Partial Understanding Branch
Player says "`f(4)` is 4" or stops at the input.

Tutor: "The 4 is the input. What output comes out after the rule `2x+3` uses that input?"

Recovery target: Player evaluates the formula.

## Misconception Branch
Player treats `f(4)` as `f times 4`.

Tutor: "In function notation, `f` names the rule. The parentheses show the input. What number should go into the rule?"

Recovery target: Player identifies input 4.

## Negative Input Branch
Player evaluates `f(-2)=x^2+1` as `-2^2+1`.

Tutor: "Is the whole input `-2`, or only the 2? How can parentheses show the whole input is being squared?"

Recovery target: Player writes `(-2)^2+1`.

## Solve Output Branch
Player evaluates `f(11)` when asked to solve `f(x)=11`.

Tutor: "Here the output is already 11. Are we looking for the output again, or for the input that produces 11?"

Recovery target: Player sets the formula equal to 11.

## Graph/Table Branch
Player reverses a point or table pair.

Tutor: "Function notation uses input first and output second. In the point `(a,b)`, which value is the input?"

Recovery target: Player maps `(a,b)` to `f(a)=b`.

## Unsure Branch
Player: "I do not know what `f(x)` means."

Tutor: "Think of `f` as the name of a machine. The value inside parentheses goes in. What comes out is the output."

Then ask for name, input, and output in a concrete statement.

## Unrelated Response Branch
Player gives an unrelated answer.

Tutor: "Let's focus on the notation. In `f(4)`, what value is inside the parentheses?"

If unrelated again, use a two-choice prompt: "Is 4 the input or the output?"

## Recovery Prompts
- "What is the function name?"
- "What input is inside the parentheses?"
- "What output is requested?"
- "Where does the input replace `x`?"
- "Do you need parentheses around the input?"
- "Did you replace every `x`?"
- "Are you evaluating `f(a)` or solving `f(x)=k`?"
- "What ordered pair matches this statement?"
- "What are the units of the input and output?"

## Reflection Question
"Why does `f(2)=7` correspond to the graph point `(2,7)`?"

Strong reflection: "The input is the x-coordinate and the output is the y-coordinate, so `f(2)=7` means the point with x-value 2 has y-value 7."

## Transfer Question
"How will function notation help when deciding the domain of a formula?"

Expected transfer: "The input is what goes inside the function, so domain asks which input values are allowed."

## Escalation Rules
- If notation meaning is unclear, show What f(x) Means.
- If formula substitution errors repeat, show Formula Evaluation and Replace Every Input.
- If negative input errors repeat, show Parentheses and Signs.
- If expression-input errors repeat, show Expression Inputs.
- If `f(x)=k` confusion repeats, show Solving f(x)=k.
- If graph/table reversals repeat, show Tables and Ordered Pairs or Graphs and Function Values.
- If context interpretation fails, show Context Meaning.
- If the player completes five mixed representations correctly, advance to independent practice.

## Exit Condition
The Socratic sequence is complete when the player:

1. Identifies function name, input, and output.
2. Evaluates a formula correctly.
3. Uses parentheses for negative or expression inputs.
4. Solves `f(x)=k` as an input-finding task.
5. Reads function values from a table or graph.
6. Converts between notation, points, and context sentences.

# Knowledge Graph

- Prerequisites: Phase 001 one-step linear equations; Phase 002 multi-step linear equations; Phase 013 systems by graphing; substitution; order of operations; ordered pairs; graph reading
- Concepts Unlocked: function notation; input-output language; formula evaluation; expression inputs; solving `f(x)=k`; table and graph function values; context interpretation; ordered-pair conversion
- Related Concepts: domain from formulas; domain from graphs; range from graphs; transformations; composition; inverse functions; average rate of change
- Common Misconceptions: treating `f(x)` as multiplication; replacing only one variable occurrence; missing parentheses on negative inputs; evaluating `f(k)` instead of solving `f(x)=k`; graph coordinate reversal; table input-output reversal; ignoring units
- Remedial Phases: Phase 001 review; Phase 002 review; Phase 013 review; ordered-pair mini-lesson; order-of-operations mini-lesson; negative-number mini-lesson
- Follow-up Phases: Phase 015 - Domain from formulas; Phase 016 - Domain from graphs; Phase 017 - Range from graphs; Phase 019 - Function composition; Phase 020 - Inverse functions
- Transfer Topics: function domains; graph analysis; transformations; composition; inverse relations; average rate of change; modeling functions

# Validation Notes

## Structure Validation
- Includes all required Bibles and metadata sections.
- Contains exactly 20 template families, within the required 20-40 range.
- Each template includes example, answer, explanation, distractors, distractor rationale, randomization rules, validity constraints, metadata, variants, and mappings.
- Every template has six progressive hints.

## Math Validation
- T001: `f(4)=2(4)+3=11`.
- T002: `f(-3)=(-3)^2-2(-3)=9+6=15`.
- T003: `f(0)=-4(0)+9=9`.
- T004: `f(1/2)=6(1/2)-1=2`.
- T005: `f(t+2)=3(t+2)-5=3t+1`.
- T006: `f(2)=2^2+3(2)-4=6`.
- T007: `2x+3=11` -> `x=4`.
- T008: `x^2=9` -> `x=-3 or x=3`.
- T009: table input `3` maps to output `11`.
- T010: table output `1` occurs at inputs `0` and `2`.
- T011: graph point `(-1,4)` means `f(-1)=4`.
- T012: `x^2=4` -> `x=-2 or x=2`.
- T013: `f(3)=7`, `g(3)=9`, so `g(3)>f(3)`.
- T014: `(f(x+h)-f(x))/h=(2x+2h+3-2x-3)/h=2`.
- T015: `h(3)=45` means input 3 seconds, output 45 meters.
- T016: `f(6)=-2` corresponds to `(6,-2)`.
- T017: `f(-2)=(-2)^2+1=5`; student used missing parentheses.
- T018: `g(8)=13` has name `g`, input `8`, output `13`.
- T019: `f(x)=3x+1` gives `f(2)=7`.
- T020: `f(-2)=9`; `x^2-2x+1=1` -> `x=0 or 2`; table gives `g(3)=8`; graph point gives `h(2)=-3`.

## Distractor Validation
- Distractors reflect multiplication-notation confusion, input-output reversal, coordinate reversal, missing parentheses, partial substitution, solving versus evaluating errors, table lookup errors, and unit confusion.
- Multiple-choice-style templates have exactly one correct answer unless the prompt asks for multiple inputs.
- Graph and table templates specify enough information to be unambiguous.

## Hint Validation
- Each hint sequence moves from identifying input and representation to substitution, lookup, solving, interpretation, or conversion.
- Negative-input and expression-input hints explicitly prompt parentheses.

## Tutorial Validation
- Tutorial includes learning goal, why it matters, prerequisite check, notation meaning, formula evaluation, parentheses and signs, replacing every input, expression inputs, solving `f(x)=k`, tables, graphs, comparisons, difference quotient, context meaning, reverse construction, common mistakes, guided practice, independent practice, mastery check, adaptive messages, and metadata.

## Socratic Validation
- Dialogue includes diagnostic, guided discovery, correct branch, partial branch, misconception branch, negative input branch, solve-output branch, graph/table branch, unsure branch, unrelated branch, recovery prompts, reflection, transfer, escalation rules, and exit condition.
- Tutor separates input, output, and representation before computation.

## Metadata Validation
- Every template includes IDs, difficulty, timing, visual flag, compatibility flags, prerequisites, misconception tags, randomization constraints, and support-system mappings.

## Known Issues
- The repository specifications differ on the label for Hint 4. This phase uses "Guided Next Step" to match the master prompt language.
- `PHASE_TEMPLATE.md` omits Common Misconceptions from the Knowledge Graph section, but this phase includes it because the master prompt and knowledge graph guide require it.
