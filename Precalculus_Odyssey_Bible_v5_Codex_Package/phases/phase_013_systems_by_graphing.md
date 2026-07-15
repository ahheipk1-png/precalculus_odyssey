# Phase 013 - Systems by Graphing

## Phase Metadata
- Course: Precalculus Odyssey Bible v5
- Topic: Systems by graphing
- Subtopic: Solving and classifying linear systems using line graphs and intersections
- Prerequisites: Phase 003 variables on both sides, Phase 005 linear equation modeling, Phase 011 systems by substitution, Phase 012 systems by elimination, slope-intercept form, coordinate graphing
- Related phases: Phase 014 - Function notation; Phase 016 - Domain from graphs; Phase 017 - Range from graphs; Phase 026 - Quadratic graphs
- Estimated phase size: 20 template families, 20 core examples, 120 progressive hints, 1 tutorial sequence, 1 Socratic dialogue system

## Learning Objectives
By the end of this phase, the player can:

1. Explain that a system solution is the point where two graphs intersect.
2. Read a graph intersection as an ordered pair.
3. Graph two lines from slope-intercept form.
4. Graph lines from standard form using intercepts or conversion.
5. Handle vertical and horizontal lines in systems.
6. Classify parallel lines as no solution.
7. Classify overlapping lines as infinitely many solutions.
8. Estimate non-grid intersections from a graph.
9. Verify a graphical solution algebraically.
10. Use graphing to model break-even and comparison contexts.

## Prerequisite Review
- A point lies on a line if its coordinates make the line equation true.
- Slope-intercept form `y=mx+b` gives slope `m` and y-intercept `b`.
- A vertical line has form `x=a`; a horizontal line has form `y=b`.
- The solution to a two-equation system must satisfy both equations.
- Graphs can estimate a solution, but algebra verifies exact coordinates.

## Core Concepts
- Graph each equation as a line on the same coordinate plane.
- If the lines cross once, the intersection point is the system solution.
- If the lines are parallel and distinct, there is no solution.
- If the lines overlap exactly, there are infinitely many solutions.
- Ordered pairs must be read as `(x,y)`.
- For non-grid intersections, graphing gives an estimate; substitution or elimination can refine the exact answer.

## Common Misconceptions
- Reading `(y,x)` instead of `(x,y)`.
- Treating y-intercepts as the system solution.
- Assuming all systems have one visible grid-point solution.
- Calling parallel lines "two solutions" because there are two lines.
- Calling overlapping lines one solution because the lines touch.
- Graphing a vertical line as horizontal, or a horizontal line as vertical.
- Using a graph window that hides the intersection.
- Trusting a rough graph without checking the equations.

# Part I - Question Bible

## Template T001 - Read a grid-point intersection
- Template ID: P013-T001
- Question Type: Graph interpretation
- Cognitive Skill: Read an ordered pair from a graph
- Difficulty: 2
- Estimated Time: 45 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Identify the solution of a graphed system from its intersection.
- Example Question: The lines `y=x+1` and `y=-x+5` are graphed. They intersect at the grid point `(2,3)`. What is the solution?
- Answer: `(2,3)`.
- Explanation: The solution to a system is the point on both lines. The intersection has `x=2` and `y=3`.
- Distractors: `(3,2)`; `(0,1)`; `(0,5)`; no solution.
- Distractor Rationale: Reverses coordinates; chooses one y-intercept; chooses the other y-intercept; ignores the visible crossing.
- Randomization Rules: Use two lines with integer intersection within the visible grid.
- Validity Constraints: Intersection must be visible and unambiguous.
- Metadata: phase_id=P013; prerequisites=[coordinate plane, ordered pairs]; misconception_tags=[coordinate reversal, intercept confusion, no-solution confusion]; randomization_constraints=[visible grid intersection].
- Graph/Visual Variant: Display both lines with a marked intersection.
- Modeling Variant: Two players have equal score at the intersection.
- Reverse Variant: Given `(2,3)`, draw two lines that cross there.
- Equation Battle Variant: Not primary; graph-reading challenge replaces battle moves.
- Multi-stage Boss Variant: Read point, verify in both equations, describe meaning.
- Hint Mapping: H-P013-T001
- Tutorial Mapping: Tut-P013 sections Reading Intersections
- Socratic Mapping: Soc-P013 intersection branch

## Template T002 - Graph two slope-intercept lines
- Template ID: P013-T002
- Question Type: Constructed graph
- Cognitive Skill: Graph from slope and intercept, then read intersection
- Difficulty: 3
- Estimated Time: 90 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Solve a system by graphing two slope-intercept equations.
- Example Question: Solve by graphing: `y=2x+1` and `y=-x+7`.
- Answer: `(2,5)`.
- Explanation: Graph the first line from y-intercept 1 with slope 2. Graph the second from y-intercept 7 with slope -1. They cross at `(2,5)`, which checks in both equations.
- Distractors: `(5,2)`; `(0,1)`; `(0,7)`; `(3,7)`
- Distractor Rationale: Reverses coordinates; uses first y-intercept; uses second y-intercept; follows one slope but misses the crossing.
- Randomization Rules: Use slope-intercept equations with small integer slopes and integer intersection.
- Validity Constraints: The intersection must lie inside the graph window.
- Metadata: phase_id=P013; prerequisites=[slope-intercept form, graphing lines]; misconception_tags=[coordinate reversal, intercept confusion, slope error]; randomization_constraints=[integer intersection, visible window].
- Graph/Visual Variant: Player plots both y-intercepts and slope triangles.
- Modeling Variant: Two linear growth rules compared over time.
- Reverse Variant: Given graph crossing at `(2,5)`, write two slope-intercept equations.
- Equation Battle Variant: Optional algebra check can use substitution.
- Multi-stage Boss Variant: Graph, read, and verify.
- Hint Mapping: H-P013-T002
- Tutorial Mapping: Tut-P013 sections Graphing Slope-Intercept Systems
- Socratic Mapping: Soc-P013 slope-intercept branch

## Template T003 - Graph standard-form lines
- Template ID: P013-T003
- Question Type: Constructed graph
- Cognitive Skill: Convert or use intercepts to graph standard-form equations
- Difficulty: 3
- Estimated Time: 100 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Graph a system written in standard form.
- Example Question: Solve by graphing: `x+y=6` and `x-y=2`.
- Answer: `(4,2)`.
- Explanation: The first line can be written `y=6-x`. The second can be written `y=x-2`. They intersect at `(4,2)`.
- Distractors: `(2,4)`; `(6,2)`; `(0,6)`; infinitely many solutions.
- Distractor Rationale: Reverses coordinates; chooses an intercept; chooses a y-intercept; confuses crossing with overlapping.
- Randomization Rules: Use standard-form equations that convert cleanly to slope-intercept form.
- Validity Constraints: Intersection must be a visible grid point.
- Metadata: phase_id=P013; prerequisites=[solving for y, intercepts]; misconception_tags=[coordinate reversal, intercept confusion, classification error]; randomization_constraints=[clean conversion].
- Graph/Visual Variant: Graph by intercepts or by solving for `y`.
- Modeling Variant: Two balance constraints on a resource grid.
- Reverse Variant: Given `(4,2)`, create two standard-form equations crossing there.
- Equation Battle Variant: Optional conversion card: solve for `y`.
- Multi-stage Boss Variant: Convert, graph, read, verify.
- Hint Mapping: H-P013-T003
- Tutorial Mapping: Tut-P013 sections Standard Form Graphing
- Socratic Mapping: Soc-P013 standard-form branch

## Template T004 - Vertical and horizontal line intersection
- Template ID: P013-T004
- Question Type: Graph interpretation
- Cognitive Skill: Interpret `x=a` and `y=b`
- Difficulty: 2
- Estimated Time: 45 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Solve a system made from one vertical and one horizontal line.
- Example Question: Solve by graphing: `x=3` and `y=-2`.
- Answer: `(3,-2)`.
- Explanation: The vertical line `x=3` and the horizontal line `y=-2` cross at the point whose x-coordinate is 3 and y-coordinate is -2.
- Distractors: `(-2,3)`; `(3,0)`; `(0,-2)`; no solution.
- Distractor Rationale: Reverses coordinates; uses only the vertical line; uses only the horizontal line; assumes vertical/horizontal lines cannot intersect.
- Randomization Rules: Use integer vertical and horizontal line values.
- Validity Constraints: The point must fit on the displayed coordinate plane.
- Metadata: phase_id=P013; prerequisites=[vertical lines, horizontal lines]; misconception_tags=[coordinate reversal, vertical-horizontal confusion, incomplete answer]; randomization_constraints=[visible point].
- Graph/Visual Variant: Show a vertical and horizontal line crossing.
- Modeling Variant: Fixed level and fixed time coordinate.
- Reverse Variant: Given `(3,-2)`, write one vertical and one horizontal equation.
- Equation Battle Variant: Not primary; coordinate recognition challenge.
- Multi-stage Boss Variant: Identify line types and intersection.
- Hint Mapping: H-P013-T004
- Tutorial Mapping: Tut-P013 sections Vertical and Horizontal Lines
- Socratic Mapping: Soc-P013 vertical-horizontal branch

## Template T005 - Vertical line with sloped line
- Template ID: P013-T005
- Question Type: Graph interpretation
- Cognitive Skill: Substitute fixed `x` into a graphed line
- Difficulty: 3
- Estimated Time: 70 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Solve a graphing system involving `x=a` and a sloped line.
- Example Question: Solve by graphing: `x=4` and `y=2x-1`.
- Answer: `(4,7)`.
- Explanation: The vertical line fixes `x=4`. On the line `y=2x-1`, when `x=4`, `y=7`. The lines meet at `(4,7)`.
- Distractors: `(7,4)`; `(4,-1)`; `(0,-1)`; no solution.
- Distractor Rationale: Reverses coordinates; uses the y-intercept as y-value; chooses the intercept point; assumes vertical line prevents a solution.
- Randomization Rules: Use vertical lines and slope-intercept lines with integer output.
- Validity Constraints: Intersection should be in the graph window.
- Metadata: phase_id=P013; prerequisites=[vertical lines, function evaluation]; misconception_tags=[coordinate reversal, intercept confusion, vertical-line confusion]; randomization_constraints=[integer output].
- Graph/Visual Variant: Highlight where the vertical line cuts the sloped line.
- Modeling Variant: Fixed time in a growth model.
- Reverse Variant: Create a vertical-line system with solution `(4,7)`.
- Equation Battle Variant: Optional substitution check.
- Multi-stage Boss Variant: Graph, read, then verify by evaluating.
- Hint Mapping: H-P013-T005
- Tutorial Mapping: Tut-P013 sections Vertical and Horizontal Lines
- Socratic Mapping: Soc-P013 vertical branch

## Template T006 - Horizontal line with sloped line
- Template ID: P013-T006
- Question Type: Graph interpretation
- Cognitive Skill: Find where a graph reaches a fixed `y` value
- Difficulty: 3
- Estimated Time: 70 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Solve a graphing system involving `y=b` and a sloped line.
- Example Question: Solve by graphing: `y=5` and `y=-x+2`.
- Answer: `(-3,5)`.
- Explanation: The horizontal line fixes `y=5`. On `y=-x+2`, set `5=-x+2`, so `x=-3`. The intersection is `(-3,5)`.
- Distractors: `(5,-3)`; `(0,5)`; `(2,5)`; no solution.
- Distractor Rationale: Reverses coordinates; chooses a point on the horizontal line only; uses the y-intercept incorrectly; assumes horizontal line prevents a solution.
- Randomization Rules: Use horizontal lines and sloped lines with integer x-coordinate intersections.
- Validity Constraints: Intersection must be visible.
- Metadata: phase_id=P013; prerequisites=[horizontal lines, solving one-step equations]; misconception_tags=[coordinate reversal, intercept confusion, one-line answer]; randomization_constraints=[integer intersection].
- Graph/Visual Variant: Highlight where the sloped line reaches the horizontal level.
- Modeling Variant: When a quantity reaches a target level.
- Reverse Variant: Build a horizontal-line system with solution `(-3,5)`.
- Equation Battle Variant: Optional one-step algebra check.
- Multi-stage Boss Variant: Read from graph and confirm with equation.
- Hint Mapping: H-P013-T006
- Tutorial Mapping: Tut-P013 sections Vertical and Horizontal Lines
- Socratic Mapping: Soc-P013 horizontal branch

## Template T007 - Parallel lines have no solution
- Template ID: P013-T007
- Question Type: Classification
- Cognitive Skill: Identify no solution from parallel graphs
- Difficulty: 3
- Estimated Time: 60 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Classify a system with distinct parallel lines.
- Example Question: Classify the system by graphing: `y=2x+1` and `y=2x-4`.
- Answer: No solution.
- Explanation: The lines have the same slope, 2, but different y-intercepts. They are parallel and never intersect.
- Distractors: infinitely many solutions; `(0,1)`; `(0,-4)`; two solutions.
- Distractor Rationale: Confuses parallel with overlapping; chooses y-intercepts; assumes two lines mean two solutions.
- Randomization Rules: Use same slope and different intercepts.
- Validity Constraints: Lines must be distinct.
- Metadata: phase_id=P013; prerequisites=[slope, y-intercept]; misconception_tags=[parallel classification, intercept confusion, two-lines-two-solutions]; randomization_constraints=[same slope, different intercept].
- Graph/Visual Variant: Show two nonintersecting parallel lines.
- Modeling Variant: Two growth plans with equal rate and different starting amounts.
- Reverse Variant: Create a no-solution system by choosing same slope and different intercepts.
- Equation Battle Variant: Optional algebra check gives contradiction.
- Multi-stage Boss Variant: Identify slope, classify, and explain.
- Hint Mapping: H-P013-T007
- Tutorial Mapping: Tut-P013 sections Parallel and Overlapping Lines
- Socratic Mapping: Soc-P013 parallel branch

## Template T008 - Overlapping lines have infinitely many solutions
- Template ID: P013-T008
- Question Type: Classification
- Cognitive Skill: Identify infinitely many solutions from identical graphs
- Difficulty: 3
- Estimated Time: 60 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Classify a system whose equations graph as the same line.
- Example Question: Classify by graphing: `y=3x-2` and `2y=6x-4`.
- Answer: Infinitely many solutions.
- Explanation: Dividing the second equation by 2 gives `y=3x-2`, the same line as the first equation. Every point on the line solves both.
- Distractors: no solution; `(0,-2)` only; `(2,4)` only; `(0,0)`.
- Distractor Rationale: Confuses overlapping with parallel; chooses one point on the line; chooses another single point; assumes identity means origin.
- Randomization Rules: Use equivalent equations in different forms.
- Validity Constraints: Equations must represent exactly the same line.
- Metadata: phase_id=P013; prerequisites=[equivalent equations, graph classification]; misconception_tags=[identity confusion, single-point answer, origin assumption]; randomization_constraints=[same line].
- Graph/Visual Variant: Show one line with two equation labels.
- Modeling Variant: Two equivalent descriptions of the same scoring rule.
- Reverse Variant: Create an equivalent second equation for a given line.
- Equation Battle Variant: Optional algebra check gives identity.
- Multi-stage Boss Variant: Explain why there are infinitely many points.
- Hint Mapping: H-P013-T008
- Tutorial Mapping: Tut-P013 sections Parallel and Overlapping Lines
- Socratic Mapping: Soc-P013 overlapping branch

## Template T009 - Estimate a non-grid intersection
- Template ID: P013-T009
- Question Type: Graph estimation
- Cognitive Skill: Approximate a solution from a graph
- Difficulty: 4
- Estimated Time: 85 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Estimate a system solution when the intersection is between grid lines.
- Example Question: The lines `y=(1/2)x+1` and `y=-x+5` are graphed. Estimate the intersection.
- Answer: About `(2.67,2.33)`; exact solution `(8/3,7/3)`.
- Explanation: The crossing is between `x=2` and `x=3`, and between `y=2` and `y=3`. Algebra confirms `x=8/3` and `y=7/3`.
- Distractors: `(2,3)`; `(3,2)`; `(0,1)`; no solution.
- Distractor Rationale: Rounds to the wrong nearby grid point; reverses approximate coordinates; chooses y-intercept; ignores the crossing.
- Randomization Rules: Use lines with rational non-integer intersection visible on the graph.
- Validity Constraints: The estimate must be close enough to verify visually.
- Metadata: phase_id=P013; prerequisites=[graph estimation, rational coordinates]; misconception_tags=[rounding error, coordinate reversal, intercept confusion]; randomization_constraints=[non-grid intersection].
- Graph/Visual Variant: Display grid with intersection between grid points.
- Modeling Variant: Approximate break-even time between whole-number turns.
- Reverse Variant: Create two lines whose intersection is between grid points.
- Equation Battle Variant: Optional exact-check by substitution or elimination.
- Multi-stage Boss Variant: Estimate, then refine algebraically.
- Hint Mapping: H-P013-T009
- Tutorial Mapping: Tut-P013 sections Approximate and Exact Solutions
- Socratic Mapping: Soc-P013 estimate branch

## Template T010 - Use tables to support graphing
- Template ID: P013-T010
- Question Type: Table-to-graph
- Cognitive Skill: Generate points, graph lines, and find the intersection
- Difficulty: 3
- Estimated Time: 95 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Use tables of values to graph a system.
- Example Question: Use a table or graph to solve: `y=x+2` and `y=-2x+8`.
- Answer: `(2,4)`.
- Explanation: For `x=2`, both equations give `y=4`. The graphs cross at `(2,4)`.
- Distractors: `(4,2)`; `(0,2)`; `(0,8)`; `(3,5)`
- Distractor Rationale: Reverses coordinates; uses first intercept; uses second intercept; evaluates only one line.
- Randomization Rules: Use equations with easy integer table values.
- Validity Constraints: Tables should include or lead clearly to the intersection.
- Metadata: phase_id=P013; prerequisites=[tables of values, graphing points]; misconception_tags=[coordinate reversal, one-line table, intercept confusion]; randomization_constraints=[integer table values].
- Graph/Visual Variant: Provide partial tables and graphing grid.
- Modeling Variant: Compare two point-total tables.
- Reverse Variant: Given a table intersection, write equations.
- Equation Battle Variant: Optional algebra check.
- Multi-stage Boss Variant: Complete tables, graph, identify solution.
- Hint Mapping: H-P013-T010
- Tutorial Mapping: Tut-P013 sections Tables and Graphs
- Socratic Mapping: Soc-P013 table branch

## Template T011 - Choose a graph window
- Template ID: P013-T011
- Question Type: Graph setup
- Cognitive Skill: Select a scale/window that shows the intersection
- Difficulty: 3
- Estimated Time: 70 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Choose a coordinate window that reveals the solution.
- Example Question: For `y=10x+5` and `y=-5x+50`, which graph window best shows the intersection?
- Answer: A window including at least `x=3` and `y=35`, such as `0<=x<=5` and `0<=y<=55`.
- Explanation: Setting the equations equal gives `10x+5=-5x+50`, so `15x=45`, `x=3`, and `y=35`. A small `0` to `10` y-window would hide the intersection.
- Distractors: `0<=x<=5`, `0<=y<=10`; `-1<=x<=1`, `-5<=y<=5`; any window with only negative y-values; no solution.
- Distractor Rationale: Hides the y-coordinate; hides the x-coordinate; misses positive y-values; misclassifies a visible intersection issue.
- Randomization Rules: Use equations whose intersection is outside the default small grid.
- Validity Constraints: Correct window must include the intersection and enough line context.
- Metadata: phase_id=P013; prerequisites=[graph scale, evaluating equations]; misconception_tags=[window error, hidden intersection, false classification]; randomization_constraints=[large y-value].
- Graph/Visual Variant: Compare windows that hide or show the crossing.
- Modeling Variant: Large-output growth models.
- Reverse Variant: Given a desired window, create a system whose intersection lies inside it.
- Equation Battle Variant: Optional algebra estimate to choose window.
- Multi-stage Boss Variant: Estimate intersection first, choose window, graph.
- Hint Mapping: H-P013-T011
- Tutorial Mapping: Tut-P013 sections Window and Scale
- Socratic Mapping: Soc-P013 window branch

## Template T012 - Verify a graphed solution
- Template ID: P013-T012
- Question Type: Verification
- Cognitive Skill: Check whether a point lies on both graphed lines
- Difficulty: 2
- Estimated Time: 60 seconds
- Visual Required: true
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Verify a graphical solution algebraically.
- Example Question: A graph suggests `(1,4)` solves `y=2x+2` and `y=-x+5`. Is the graph correct?
- Answer: Yes, `(1,4)` is correct.
- Explanation: Check both equations: `4=2(1)+2` and `4=-(1)+5`. Both are true.
- Distractors: no, because `1+4=5`; yes, because it solves only the first line; no, because the coordinates should be `(4,1)`; cannot tell from equations.
- Distractor Rationale: Invents a different check; checks only one equation; reverses coordinates; ignores algebraic verification.
- Randomization Rules: Use candidate points that satisfy both, one, or neither equation.
- Validity Constraints: Verification must include both equations.
- Metadata: phase_id=P013; prerequisites=[ordered-pair substitution, graph checking]; misconception_tags=[one-equation checking, coordinate reversal, invented equation]; randomization_constraints=[candidate point].
- Graph/Visual Variant: Mark the proposed intersection and ask for algebraic check.
- Modeling Variant: Check a proposed break-even point.
- Reverse Variant: Given a point, create two lines that both pass through it.
- Equation Battle Variant: Evaluation cards for both equations.
- Multi-stage Boss Variant: Read from graph, verify both equations.
- Hint Mapping: H-P013-T012
- Tutorial Mapping: Tut-P013 sections Checking Graphical Solutions
- Socratic Mapping: Soc-P013 verify branch

## Template T013 - Classify from a graph
- Template ID: P013-T013
- Question Type: Graph classification
- Cognitive Skill: Decide one solution, no solution, or infinitely many solutions from line positions
- Difficulty: 3
- Estimated Time: 60 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Classify a graphed system by line relationship.
- Example Question: A graph shows two distinct lines with the same slope that never cross. What is the solution type?
- Answer: No solution.
- Explanation: Distinct parallel lines have no intersection point, so no ordered pair satisfies both equations.
- Distractors: one solution; infinitely many solutions; two solutions; all real numbers for `x` only.
- Distractor Rationale: Assumes any two lines cross; confuses parallel with overlapping; counts two lines as two solutions; gives an incomplete solution-set idea.
- Randomization Rules: Show crossing, parallel, and overlapping line arrangements across variants.
- Validity Constraints: Visual must make the line relationship clear.
- Metadata: phase_id=P013; prerequisites=[line relationship classification]; misconception_tags=[classification error, two-lines-two-solutions, incomplete solution set]; randomization_constraints=[clear visual].
- Graph/Visual Variant: This is a visual classification family.
- Modeling Variant: Compare two plans with same rate and different starts.
- Reverse Variant: Draw a graph for each solution type.
- Equation Battle Variant: Optional algebra check can use slope or elimination.
- Multi-stage Boss Variant: Classify and explain using intersection language.
- Hint Mapping: H-P013-T013
- Tutorial Mapping: Tut-P013 sections Solution Types From Graphs
- Socratic Mapping: Soc-P013 classify branch

## Template T014 - Graph standard form using intercepts
- Template ID: P013-T014
- Question Type: Constructed graph
- Cognitive Skill: Use intercepts to graph and solve
- Difficulty: 4
- Estimated Time: 110 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Graph standard-form equations efficiently with intercepts.
- Example Question: Solve by graphing: `2x+y=8` and `x+2y=7`.
- Answer: `(3,2)`.
- Explanation: The first line can be graphed through intercepts `(4,0)` and `(0,8)`. The second through `(7,0)` and `(0,3.5)`. They intersect at `(3,2)`, which checks in both equations.
- Distractors: `(2,3)`; `(4,0)`; `(0,3.5)`; no solution.
- Distractor Rationale: Reverses coordinates; chooses an intercept; chooses another intercept; misses the crossing.
- Randomization Rules: Use standard-form lines with manageable intercepts and integer intersection.
- Validity Constraints: Intercepts and intersection must fit the coordinate plane.
- Metadata: phase_id=P013; prerequisites=[x-intercepts, y-intercepts, ordered pairs]; misconception_tags=[intercept confusion, coordinate reversal, classification error]; randomization_constraints=[visible intercepts].
- Graph/Visual Variant: Require plotting two intercepts for each line.
- Modeling Variant: Resource tradeoff constraints.
- Reverse Variant: Given `(3,2)`, make two standard-form lines with visible intercepts.
- Equation Battle Variant: Optional check by elimination.
- Multi-stage Boss Variant: Find intercepts, graph lines, read intersection, verify.
- Hint Mapping: H-P013-T014
- Tutorial Mapping: Tut-P013 sections Standard Form Graphing
- Socratic Mapping: Soc-P013 intercept branch

## Template T015 - Break-even graph model
- Template ID: P013-T015
- Question Type: Modeling
- Cognitive Skill: Interpret intersection as equal value in context
- Difficulty: 4
- Estimated Time: 105 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Use graphing to find and interpret a break-even point.
- Example Question: Plan A costs `10+2x` coins after `x` levels. Plan B costs `4+5x` coins. Graph both rules and find when they cost the same.
- Answer: `(2,14)`; after 2 levels, both cost 14 coins.
- Explanation: The lines `y=10+2x` and `y=4+5x` intersect when `10+2x=4+5x`, so `x=2` and `y=14`.
- Distractors: `(14,2)`; `(0,10)`; `(0,4)`; no solution.
- Distractor Rationale: Reverses coordinates; chooses Plan A starting cost; chooses Plan B starting cost; ignores the crossing.
- Randomization Rules: Use two linear cost functions with positive intersection in context.
- Validity Constraints: Intersection should use meaningful nonnegative values.
- Metadata: phase_id=P013; prerequisites=[linear modeling, graph interpretation]; misconception_tags=[coordinate meaning, intercept confusion, context interpretation]; randomization_constraints=[nonnegative context].
- Graph/Visual Variant: Show two cost lines crossing.
- Modeling Variant: This template is the modeling variant.
- Reverse Variant: Given a break-even point, create two cost plans.
- Equation Battle Variant: Optional algebra check by setting costs equal.
- Multi-stage Boss Variant: Graph, read, interpret with units.
- Hint Mapping: H-P013-T015
- Tutorial Mapping: Tut-P013 sections Modeling With Graphs
- Socratic Mapping: Soc-P013 modeling branch

## Template T016 - Error analysis: reversed coordinates
- Template ID: P013-T016
- Question Type: Error analysis
- Cognitive Skill: Diagnose an ordered-pair reading error
- Difficulty: 3
- Estimated Time: 75 seconds
- Visual Required: true
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Correct a graph-reading error.
- Example Question: A student graphs `y=2x+1` and `y=-x+7`. The lines cross at `(2,5)`, but the student reports `(5,2)`. What is the mistake?
- Answer: The student reversed the coordinates. The solution is `(2,5)`.
- Explanation: Ordered pairs are read as `(x,y)`. The intersection is 2 units right and 5 units up, not 5 units right and 2 units up.
- Distractors: The slope was graphed backward; the y-intercepts were swapped; the system has no solution; both answers are correct.
- Distractor Rationale: Misidentifies the error; focuses on intercepts instead of coordinates; misclassifies; ignores ordered-pair order.
- Randomization Rules: Use graph errors involving coordinate reversal, intercept selection, or line-type confusion.
- Validity Constraints: Correct visual intersection must be clear.
- Metadata: phase_id=P013; prerequisites=[ordered pairs, graph reading]; misconception_tags=[coordinate reversal, error diagnosis, classification error]; randomization_constraints=[clear intersection].
- Graph/Visual Variant: Mark the true intersection and the mistaken reversed point.
- Modeling Variant: Misread break-even time and cost.
- Reverse Variant: Create an example where reversing coordinates fails both equations.
- Equation Battle Variant: Verify both points algebraically.
- Multi-stage Boss Variant: Identify error, correct point, check equations.
- Hint Mapping: H-P013-T016
- Tutorial Mapping: Tut-P013 sections Common Mistakes
- Socratic Mapping: Soc-P013 error branch

## Template T017 - Match a system to its graph
- Template ID: P013-T017
- Question Type: Matching
- Cognitive Skill: Use slope and intercept to choose the correct graph
- Difficulty: 3
- Estimated Time: 85 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Match equations to the graph that represents their solution.
- Example Question: Which graph matches the system `y=x+2` and `y=-x+6`?
- Answer: The graph with y-intercepts 2 and 6 and intersection `(2,4)`.
- Explanation: The first line rises through `(0,2)`. The second falls through `(0,6)`. Setting them equal gives `x+2=-x+6`, so `x=2`, `y=4`.
- Distractors: graph with intersection `(4,2)`; graph with parallel lines; graph with y-intercepts 0 and 6; graph with both lines rising.
- Distractor Rationale: Reverses coordinates; wrong solution type; wrong intercept; wrong slope sign.
- Randomization Rules: Offer several graphs with different slopes, intercepts, and intersections.
- Validity Constraints: Only one graph should match both equations.
- Metadata: phase_id=P013; prerequisites=[slope, intercept, intersection]; misconception_tags=[slope sign error, intercept confusion, coordinate reversal]; randomization_constraints=[single matching graph].
- Graph/Visual Variant: Multiple graph cards.
- Modeling Variant: Match two plan rules to a comparison graph.
- Reverse Variant: Given a graph card, write the matching system.
- Equation Battle Variant: Optional algebra check for the intersection.
- Multi-stage Boss Variant: Justify using slopes, intercepts, and intersection.
- Hint Mapping: H-P013-T017
- Tutorial Mapping: Tut-P013 sections Matching Graphs and Equations
- Socratic Mapping: Soc-P013 matching branch

## Template T018 - Reverse-build lines from an intersection
- Template ID: P013-T018
- Question Type: Reverse construction
- Cognitive Skill: Create two lines that intersect at a target point
- Difficulty: 4
- Estimated Time: 95 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Construct a graphable system with a chosen solution.
- Example Question: Create two different lines that intersect at `(3,1)`.
- Answer: One valid system is `y=x-2` and `y=-2x+7`.
- Explanation: Both equations are true at `(3,1)`: `1=3-2` and `1=-2(3)+7`. The slopes are different, so the lines intersect once.
- Distractors: `y=x-2` and `y=x-2`; `y=x+2` and `y=-2x+7`; `x=1` and `y=3`; two parallel lines through different intercepts.
- Distractor Rationale: Same line gives infinitely many solutions; first line misses the target; reverses target coordinates; creates no solution.
- Randomization Rules: Given target `(h,k)`, choose two different slopes and compute intercepts.
- Validity Constraints: Both lines must pass through the target and have different slopes.
- Metadata: phase_id=P013; prerequisites=[point-slope reasoning, checking points]; misconception_tags=[same-line construction, coordinate reversal, target check error]; randomization_constraints=[different slopes].
- Graph/Visual Variant: Draw both lines crossing at the target.
- Modeling Variant: Create two plans with a desired break-even point.
- Reverse Variant: This template is the reverse variant.
- Equation Battle Variant: Optional verification by substitution.
- Multi-stage Boss Variant: Construct, graph, and verify.
- Hint Mapping: H-P013-T018
- Tutorial Mapping: Tut-P013 sections Reverse Construction
- Socratic Mapping: Soc-P013 reverse branch

## Template T019 - Graph estimate then exact algebra check
- Template ID: P013-T019
- Question Type: Multi-representation
- Cognitive Skill: Move from visual estimate to exact solution
- Difficulty: 4
- Estimated Time: 110 seconds
- Visual Required: true
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Use graphing for intuition and algebra for exactness.
- Example Question: A graph of `y=(1/2)x+1` and `y=-x+5` suggests the intersection is near `(2.7,2.3)`. Find the exact solution.
- Answer: `(8/3,7/3)`.
- Explanation: Set the equations equal: `(1/2)x+1=-x+5`. Then `(3/2)x=4`, so `x=8/3`. Substitute: `y=(1/2)(8/3)+1=4/3+1=7/3`.
- Distractors: `(2.7,2.3)` as exact; `(7/3,8/3)`; `(8,7)`; no solution.
- Distractor Rationale: Treats decimal estimate as exact; reverses coordinates; drops denominators; ignores visible crossing.
- Randomization Rules: Use rational intersections that are visible but not grid points.
- Validity Constraints: Estimate and exact answer must be close.
- Metadata: phase_id=P013; prerequisites=[graph estimation, solving equations, fractions]; misconception_tags=[estimate-as-exact, coordinate reversal, fraction error]; randomization_constraints=[rational non-grid solution].
- Graph/Visual Variant: Show approximate crossing on grid.
- Modeling Variant: Estimate then exactly compute break-even with fractional time.
- Reverse Variant: Create a graphing system with exact solution `(8/3,7/3)`.
- Equation Battle Variant: Set-equal card, clear fraction, solve, substitute.
- Multi-stage Boss Variant: Estimate, solve exactly, compare.
- Hint Mapping: H-P013-T019
- Tutorial Mapping: Tut-P013 sections Approximate and Exact Solutions
- Socratic Mapping: Soc-P013 exact-check branch

## Template T020 - Boss graphing challenge
- Template ID: P013-T020
- Question Type: Multi-stage boss
- Cognitive Skill: Graph, estimate, solve exactly, classify, and verify
- Difficulty: 5
- Estimated Time: 150 seconds
- Visual Required: true
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Complete a full graphing-system workflow with exact verification.
- Example Question: Boss Gate: Graph `2x-y=1` and `x+2y=12`, estimate the intersection, then find the exact solution.
- Answer: Exact solution `(14/5,23/5)`, approximately `(2.8,4.6)`.
- Explanation: Rewrite `2x-y=1` as `y=2x-1`. Substitute into `x+2y=12`: `x+2(2x-1)=12`, so `5x=14`, `x=14/5`. Then `y=2(14/5)-1=23/5`. The graph should show an intersection near `(2.8,4.6)`.
- Distractors: `(23/5,14/5)`; `(3,5)` as exact; no solution; infinitely many solutions.
- Distractor Rationale: Reverses coordinates; rounds an estimate as exact; misclassifies parallel; misclassifies overlapping.
- Randomization Rules: Use two lines with a rational non-grid intersection and graphable slopes.
- Validity Constraints: Intersection must appear in the graph window and verify in both equations.
- Metadata: phase_id=P013; prerequisites=[graphing, standard-form conversion, substitution verification, fractions]; misconception_tags=[estimate-as-exact, coordinate reversal, classification error, fraction arithmetic]; randomization_constraints=[visible rational intersection].
- Graph/Visual Variant: Graph both lines with estimate marker and exact-solution callout.
- Modeling Variant: Advanced comparison model with fractional break-even point.
- Reverse Variant: Build a boss system with exact non-grid intersection.
- Equation Battle Variant: Convert to slope-intercept, estimate, solve exactly, verify.
- Multi-stage Boss Variant: This is the phase boss template.
- Hint Mapping: H-P013-T020
- Tutorial Mapping: Tut-P013 sections Full Phase Review
- Socratic Mapping: Soc-P013 boss branch

# Part II - Hint Bible

## H-P013-T001
- Hint 1 - Gentle Nudge: Look for the point where both lines meet.
- Hint 2 - Concept Reminder: A system solution is on both graphs.
- Hint 3 - Focus Hint: The crossing is 2 units right and 3 units up.
- Hint 4 - Guided Next Step: Read the point as `(x,y)`.
- Hint 5 - Nearly Complete: `x=2` and `y=3`.
- Hint 6 - Full Solution: The solution is `(2,3)`.

## H-P013-T002
- Hint 1 - Gentle Nudge: Start each line at its y-intercept.
- Hint 2 - Concept Reminder: The first slope is 2; the second slope is -1.
- Hint 3 - Focus Hint: Plot `y=2x+1` and `y=-x+7` on the same grid.
- Hint 4 - Guided Next Step: Find where the two lines cross.
- Hint 5 - Nearly Complete: The crossing is at `x=2`, `y=5`.
- Hint 6 - Full Solution: The solution is `(2,5)`.

## H-P013-T003
- Hint 1 - Gentle Nudge: Convert each equation to `y=...`.
- Hint 2 - Concept Reminder: `x+y=6` becomes `y=6-x`.
- Hint 3 - Focus Hint: `x-y=2` becomes `y=x-2`.
- Hint 4 - Guided Next Step: Graph both converted lines.
- Hint 5 - Nearly Complete: They cross at `x=4`, `y=2`.
- Hint 6 - Full Solution: The solution is `(4,2)`.

## H-P013-T004
- Hint 1 - Gentle Nudge: One line fixes `x`; the other fixes `y`.
- Hint 2 - Concept Reminder: `x=3` is vertical; `y=-2` is horizontal.
- Hint 3 - Focus Hint: Their crossing must have both values.
- Hint 4 - Guided Next Step: Use `x=3` and `y=-2`.
- Hint 5 - Nearly Complete: Write the point in `(x,y)` order.
- Hint 6 - Full Solution: `(3,-2)`.

## H-P013-T005
- Hint 1 - Gentle Nudge: The vertical line tells you `x`.
- Hint 2 - Concept Reminder: Substitute `x=4` into the sloped line.
- Hint 3 - Focus Hint: `y=2(4)-1`.
- Hint 4 - Guided Next Step: `y=7`.
- Hint 5 - Nearly Complete: Combine the fixed `x` and computed `y`.
- Hint 6 - Full Solution: `(4,7)`.

## H-P013-T006
- Hint 1 - Gentle Nudge: The horizontal line tells you `y`.
- Hint 2 - Concept Reminder: Set the sloped line equal to 5.
- Hint 3 - Focus Hint: `5=-x+2`.
- Hint 4 - Guided Next Step: `-x=3`, so `x=-3`.
- Hint 5 - Nearly Complete: Pair that with `y=5`.
- Hint 6 - Full Solution: `(-3,5)`.

## H-P013-T007
- Hint 1 - Gentle Nudge: Compare the slopes.
- Hint 2 - Concept Reminder: Same slope and different intercepts means parallel lines.
- Hint 3 - Focus Hint: Both slopes are 2.
- Hint 4 - Guided Next Step: The y-intercepts are 1 and -4, so the lines are distinct.
- Hint 5 - Nearly Complete: Distinct parallel lines never intersect.
- Hint 6 - Full Solution: No solution.

## H-P013-T008
- Hint 1 - Gentle Nudge: Simplify the second equation.
- Hint 2 - Concept Reminder: Divide `2y=6x-4` by 2.
- Hint 3 - Focus Hint: The second equation becomes `y=3x-2`.
- Hint 4 - Guided Next Step: Both equations graph as the same line.
- Hint 5 - Nearly Complete: Every point on that line solves both equations.
- Hint 6 - Full Solution: Infinitely many solutions.

## H-P013-T009
- Hint 1 - Gentle Nudge: The crossing is not exactly on a grid point.
- Hint 2 - Concept Reminder: Estimate first, then verify with algebra if exactness is needed.
- Hint 3 - Focus Hint: The x-value is between 2 and 3.
- Hint 4 - Guided Next Step: The y-value is between 2 and 3.
- Hint 5 - Nearly Complete: Algebra gives `x=8/3`, `y=7/3`.
- Hint 6 - Full Solution: About `(2.67,2.33)`; exact `(8/3,7/3)`.

## H-P013-T010
- Hint 1 - Gentle Nudge: Use the same x-values for both tables.
- Hint 2 - Concept Reminder: A matching y-value at the same x gives the intersection.
- Hint 3 - Focus Hint: Try `x=2`.
- Hint 4 - Guided Next Step: `2+2=4` and `-2(2)+8=4`.
- Hint 5 - Nearly Complete: Both lines pass through `(2,4)`.
- Hint 6 - Full Solution: The solution is `(2,4)`.

## H-P013-T011
- Hint 1 - Gentle Nudge: Estimate where the lines meet before choosing a window.
- Hint 2 - Concept Reminder: Set the equations equal to find the intersection coordinates.
- Hint 3 - Focus Hint: `10x+5=-5x+50`.
- Hint 4 - Guided Next Step: `15x=45`, so `x=3`.
- Hint 5 - Nearly Complete: At `x=3`, `y=35`.
- Hint 6 - Full Solution: Use a window including `(3,35)`, such as `0<=x<=5`, `0<=y<=55`.

## H-P013-T012
- Hint 1 - Gentle Nudge: Check both equations with the point.
- Hint 2 - Concept Reminder: Use `x=1`, `y=4`.
- Hint 3 - Focus Hint: First equation: `4=2(1)+2`.
- Hint 4 - Guided Next Step: Second equation: `4=-1+5`.
- Hint 5 - Nearly Complete: Both statements are true.
- Hint 6 - Full Solution: Yes, `(1,4)` is correct.

## H-P013-T013
- Hint 1 - Gentle Nudge: Count intersections, not lines.
- Hint 2 - Concept Reminder: A solution is a shared point.
- Hint 3 - Focus Hint: Parallel distinct lines do not share a point.
- Hint 4 - Guided Next Step: Since they never cross, there is no ordered pair on both.
- Hint 5 - Nearly Complete: The system is inconsistent.
- Hint 6 - Full Solution: No solution.

## H-P013-T014
- Hint 1 - Gentle Nudge: Find easy points on each line.
- Hint 2 - Concept Reminder: Intercepts are points where `x=0` or `y=0`.
- Hint 3 - Focus Hint: `2x+y=8` has intercepts `(4,0)` and `(0,8)`.
- Hint 4 - Guided Next Step: `x+2y=7` has intercepts `(7,0)` and `(0,3.5)`.
- Hint 5 - Nearly Complete: Graph both lines and read the crossing.
- Hint 6 - Full Solution: The solution is `(3,2)`.

## H-P013-T015
- Hint 1 - Gentle Nudge: The intersection means equal cost.
- Hint 2 - Concept Reminder: Graph `y=10+2x` and `y=4+5x`.
- Hint 3 - Focus Hint: The lines cross when `10+2x=4+5x`.
- Hint 4 - Guided Next Step: `6=3x`, so `x=2`.
- Hint 5 - Nearly Complete: At `x=2`, the cost is 14.
- Hint 6 - Full Solution: `(2,14)`; after 2 levels, both cost 14 coins.

## H-P013-T016
- Hint 1 - Gentle Nudge: Ordered pairs are read horizontally, then vertically.
- Hint 2 - Concept Reminder: `(2,5)` means `x=2`, `y=5`.
- Hint 3 - Focus Hint: `(5,2)` would be a different point.
- Hint 4 - Guided Next Step: Check `(5,2)` in `y=2x+1`; it fails.
- Hint 5 - Nearly Complete: The graph crossing was correctly located at `(2,5)`.
- Hint 6 - Full Solution: The mistake is reversing coordinates; correct solution `(2,5)`.

## H-P013-T017
- Hint 1 - Gentle Nudge: Use y-intercepts to eliminate wrong graphs.
- Hint 2 - Concept Reminder: `y=x+2` starts at 2 and rises.
- Hint 3 - Focus Hint: `y=-x+6` starts at 6 and falls.
- Hint 4 - Guided Next Step: The lines meet where `x+2=-x+6`.
- Hint 5 - Nearly Complete: `x=2`, `y=4`.
- Hint 6 - Full Solution: Choose the graph with y-intercepts 2 and 6 and intersection `(2,4)`.

## H-P013-T018
- Hint 1 - Gentle Nudge: Each line must pass through `(3,1)`.
- Hint 2 - Concept Reminder: Pick two different slopes.
- Hint 3 - Focus Hint: `y=x-2` works because `1=3-2`.
- Hint 4 - Guided Next Step: `y=-2x+7` works because `1=-6+7`.
- Hint 5 - Nearly Complete: Different slopes guarantee one intersection.
- Hint 6 - Full Solution: One valid system is `y=x-2` and `y=-2x+7`.

## H-P013-T019
- Hint 1 - Gentle Nudge: The graph gives a good estimate, not the exact fraction.
- Hint 2 - Concept Reminder: Set the two y-expressions equal.
- Hint 3 - Focus Hint: `(1/2)x+1=-x+5`.
- Hint 4 - Guided Next Step: `(3/2)x=4`.
- Hint 5 - Nearly Complete: `x=8/3`; substitute into either equation.
- Hint 6 - Full Solution: Exact solution `(8/3,7/3)`.

## H-P013-T020
- Hint 1 - Gentle Nudge: Convert the first equation to slope-intercept form.
- Hint 2 - Concept Reminder: `2x-y=1` becomes `y=2x-1`.
- Hint 3 - Focus Hint: Substitute into `x+2y=12`.
- Hint 4 - Guided Next Step: `x+2(2x-1)=12`.
- Hint 5 - Nearly Complete: `5x=14`, so `x=14/5`.
- Hint 6 - Full Solution: `x=14/5`, `y=23/5`; approximately `(2.8,4.6)`.

# Part III - Tutorial Bible

## Learning Goal
Learn to solve linear systems by graphing: graph both equations on the same coordinate plane and interpret the intersection.

## Why It Matters
Graphing turns a system into a picture. It helps players see whether two rules meet once, never meet, or are actually the same rule. It is especially useful for modeling comparisons and for checking algebraic answers from substitution or elimination.

## Prerequisite Check
Ask the player:

1. What does the point `(2,5)` mean? Expected: `x=2`, `y=5`.
2. What are the slope and y-intercept of `y=2x+1`? Expected: slope 2, y-intercept 1.
3. What kind of line is `x=4`? Expected: vertical.
4. What kind of line is `y=-3`? Expected: horizontal.
5. What does it mean if two lines never cross? Expected: no shared solution.

## Core Concept
Each equation in a two-variable system graphs as a set of points.

The system solution is any point shared by both graphs.

For two nonparallel lines, the shared point is the intersection.

Example:

`y=x+1`

`y=-x+5`

The lines cross at `(2,3)`, so the solution is `(2,3)`.

## Reading Intersections
To read an intersection:

1. Locate the crossing point.
2. Read the horizontal coordinate first.
3. Read the vertical coordinate second.
4. Write `(x,y)`.

Do not reverse the order.

## Graphing Slope-Intercept Systems
For `y=mx+b`:

1. Plot the y-intercept `b`.
2. Use the slope `m` to plot another point.
3. Draw the line.
4. Repeat for the second equation.
5. Read the intersection.

Example:

`y=2x+1`

`y=-x+7`

The lines intersect at `(2,5)`.

## Standard Form Graphing
For `Ax+By=C`, either:

- Solve for `y`, then graph with slope and intercept.
- Find intercepts by setting `x=0` and `y=0`.

Example:

`x+y=6` becomes `y=6-x`.

`x-y=2` becomes `y=x-2`.

The intersection is `(4,2)`.

## Vertical and Horizontal Lines
- `x=a` is vertical. Every point has x-coordinate `a`.
- `y=b` is horizontal. Every point has y-coordinate `b`.

The system `x=3` and `y=-2` has solution `(3,-2)`.

## Parallel and Overlapping Lines
Two distinct parallel lines never intersect:

`y=2x+1`

`y=2x-4`

No solution.

Two identical lines overlap completely:

`y=3x-2`

`2y=6x-4`

Infinitely many solutions.

## Solution Types From Graphs
- One intersection point: one solution.
- Parallel distinct lines: no solution.
- Same line: infinitely many solutions.

The number of drawn lines is not the number of solutions. Count shared points.

## Approximate and Exact Solutions
Some intersections do not land on grid points. A graph can estimate the solution.

Example:

`y=(1/2)x+1`

`y=-x+5`

The graph suggests about `(2.67,2.33)`. Algebra gives the exact solution `(8/3,7/3)`.

## Tables and Graphs
Tables can help build a graph. Use the same x-values for both equations.

For:

`y=x+2`

`y=-2x+8`

at `x=2`, both give `y=4`, so `(2,4)` is the intersection.

## Window and Scale
A graph window must show the intersection.

For:

`y=10x+5`

`y=-5x+50`

the intersection is `(3,35)`. A window with `0<=y<=10` hides it. Choose a window like `0<=x<=5`, `0<=y<=55`.

## Checking Graphical Solutions
After reading a point from a graph, check both equations.

For `(1,4)` in:

`y=2x+2`

`y=-x+5`

check:

`4=2(1)+2`

`4=-1+5`

Both are true.

## Modeling With Graphs
Graphing shows when two quantities become equal.

Example:

Plan A: `y=10+2x`

Plan B: `y=4+5x`

The intersection is `(2,14)`, meaning after 2 levels both plans cost 14 coins.

## Matching Graphs and Equations
To match a system to a graph:

1. Compare y-intercepts.
2. Compare slope direction.
3. Estimate the intersection.
4. Check that the displayed graph matches both equations.

## Reverse Construction
To create two lines through a target point:

1. Pick two different slopes.
2. Use the target point to find intercepts.
3. Check the point in both equations.

For `(3,1)`, `y=x-2` and `y=-2x+7` both work.

## Common Mistakes
- Mistake: Reversing coordinates.
  Correction: Read horizontal first, vertical second.
- Mistake: Reporting an intercept as the solution.
  Correction: The solution is where both lines meet.
- Mistake: Calling parallel lines two solutions.
  Correction: Parallel distinct lines have no shared point.
- Mistake: Calling overlapping lines one solution.
  Correction: Overlapping lines share infinitely many points.
- Mistake: Graphing `x=a` as horizontal.
  Correction: `x=a` is vertical.
- Mistake: Using a window that hides the crossing.
  Correction: Estimate or solve first, then choose a fitting window.

## Guided Practice
1. Solve by graphing `y=x+1` and `y=-x+5`.
   - Graph both lines.
   - The crossing is `(2,3)`.

2. Classify `y=2x+1` and `y=2x-4`.
   - Same slope, different intercepts.
   - No solution.

3. Solve `x=4` and `y=2x-1`.
   - The vertical line fixes `x=4`.
   - The sloped line gives `y=7`.
   - Solution `(4,7)`.

## Independent Practice
1. `y=x+2`, `y=-x+8`; answer `(3,5)`.
2. `x+y=9`, `x-y=1`; answer `(5,4)`.
3. `x=-2`, `y=3x+1`; answer `(-2,-5)`.
4. `y=4`, `y=x-1`; answer `(5,4)`.
5. `y=3x+1`, `y=3x-2`; no solution.
6. `y=-x+6`, `2y=-2x+12`; infinitely many solutions.

## Mastery Check
The player is ready to advance when they can:

1. Graph two slope-intercept lines.
2. Graph standard-form lines by conversion or intercepts.
3. Read intersections in `(x,y)` order.
4. Classify crossing, parallel, and overlapping lines.
5. Handle vertical and horizontal lines.
6. Estimate non-grid intersections.
7. Verify graph-read solutions algebraically.

Mastery check set:

1. `y=2x+1`, `y=-x+7`; solution `(2,5)`.
2. `x+y=6`, `x-y=2`; solution `(4,2)`.
3. `x=3`, `y=-2`; solution `(3,-2)`.
4. `y=2x+1`, `y=2x-4`; no solution.
5. `y=x-3`, `2y=2x-6`; infinitely many solutions.

## Adaptive Tutor Messages
- If the player reverses coordinates: "Read the graph left-right first for `x`, then up-down for `y`."
- If the player chooses an intercept: "The solution must be on both lines, not just where one line touches an axis."
- If parallel lines are misclassified: "Parallel distinct lines have no shared point."
- If overlapping lines are called one solution: "The lines share every point on the line, so there are infinitely many solutions."
- If the graph window hides the answer: "Estimate or solve roughly first, then resize the graph to include the intersection."
- If the player relies on an approximate point: "Use algebra to verify or refine the exact coordinates."
- If the player succeeds quickly: "You are ready to connect systems to function notation and graph-based domain/range thinking."

## Tutorial Metadata
- Tutorial ID: Tut-P013
- Estimated duration: 6 minutes
- Target player state: knows linear graphing and systems by substitution or elimination
- Unlock condition: available from any Phase 013 question
- Remediation trigger: two coordinate reversal errors, two intercept-as-solution errors, one solution-type classification error, or one hidden-window error
- Advancement trigger: 80 percent accuracy on graphing systems including a standard-form graph, a vertical or horizontal line, a special-case classification, and an exact check

# Part IV - Socratic Dialogue Bible

## Opening Diagnostic
Tutor: "If two graphed lines cross at `(2,5)`, what does that point mean for the system?"

Expected strong answer: "`x=2` and `y=5` solve both equations."

## Guided Discovery
Tutor sequence:

1. "What does each equation look like as a graph?"
2. "Are the lines crossing, parallel, or overlapping?"
3. "If they cross, where is the intersection?"
4. "What is the x-coordinate?"
5. "What is the y-coordinate?"
6. "Does the point satisfy both equations?"
7. "If they do not cross, are they parallel or the same line?"
8. "Is the graph window showing the likely intersection?"
9. "If the point is not on a grid intersection, what estimate do you see?"
10. "What algebra can verify the exact point?"

## Correct Branch
Player: "The intersection is the solution."

Tutor: "Yes. What are the coordinates of the intersection, read as `(x,y)`?"

If player gives `(2,5)`, ask them to check both equations.

## Partial Understanding Branch
Player points to the crossing but hesitates on coordinates.

Tutor: "From the crossing, move straight down to the x-axis first. What x-value do you see?"

Then ask for the y-value.

## Misconception Branch
Player gives `(5,2)` for a crossing at `(2,5)`.

Tutor: "That point would be 5 right and 2 up. Is the crossing there, or is it 2 right and 5 up?"

Recovery target: Player reads `(2,5)`.

## Parallel Branch
Player says two parallel lines have two solutions.

Tutor: "A solution must be a point on both lines. If the lines never meet, how many shared points do they have?"

Recovery target: Player says no solution.

## Overlapping Branch
Player says overlapping lines have one solution.

Tutor: "Pick any point on the line. Is it on both equations? What about another point on the same line?"

Recovery target: Player says infinitely many solutions.

## Window Branch
Player cannot find the intersection in the shown grid.

Tutor: "Could the intersection be outside the window? What rough x- or y-values do the equations suggest?"

Recovery target: Player adjusts or chooses a better scale.

## Unsure Branch
Player: "I don't know how to start."

Tutor: "Start with one equation. Is it already in `y=mx+b` form, standard form, vertical form, or horizontal form?"

If player identifies the form, guide to graphing that line first.

## Unrelated Response Branch
Player gives an unrelated answer.

Tutor: "Let's focus on the graph. Do the two lines cross, stay parallel, or lie on top of each other?"

If unrelated again, use a two-choice prompt between "cross" and "do not cross."

## Recovery Prompts
- "Where do the two lines meet?"
- "What is the x-coordinate of that point?"
- "What is the y-coordinate?"
- "Is the point on both lines?"
- "Are the lines parallel or overlapping?"
- "Is this a grid-point solution or an estimate?"
- "What equation check confirms the graph?"
- "Does the graph window include the crossing?"
- "Are you reading `(x,y)` or `(y,x)`?"

## Reflection Question
"Why can graphing show no solution or infinitely many solutions without doing much algebra?"

Strong reflection: "The graph shows shared points. Parallel lines have no shared points, and overlapping lines share every point on the line."

## Transfer Question
"How can graphing help you check an answer from substitution or elimination?"

Expected transfer: "The algebraic solution should appear at the intersection of the two graphs, so a graph can reveal coordinate reversal or unreasonable values."

## Escalation Rules
- If coordinate reading errors repeat, show Reading Intersections.
- If graphing setup fails, show Graphing Slope-Intercept Systems or Standard Form Graphing.
- If vertical or horizontal line errors repeat, show Vertical and Horizontal Lines.
- If classification errors repeat, show Parallel and Overlapping Lines.
- If approximate answers are overtrusted, show Approximate and Exact Solutions.
- If graph window errors repeat, show Window and Scale.
- If the player reads and verifies three mixed systems correctly, advance to independent practice.

## Exit Condition
The Socratic sequence is complete when the player:

1. Graphs or interprets both lines.
2. Reads the intersection in `(x,y)` order.
3. Verifies the point in both equations.
4. Classifies parallel and overlapping lines correctly.
5. Handles vertical and horizontal lines.
6. Uses algebra when an exact non-grid answer is needed.

# Knowledge Graph

- Prerequisites: Phase 003 variables on both sides; Phase 005 linear equation modeling; Phase 011 systems by substitution; Phase 012 systems by elimination; slope-intercept graphing; coordinate plane; ordered pairs
- Concepts Unlocked: graphical system solutions; line intersections; visual classification of systems; approximate versus exact solutions; graph windows; break-even graph models; graph-equation matching
- Related Concepts: function notation; domain and range from graphs; linear modeling; inverse functions; quadratic intersections; piecewise graph interpretation
- Common Misconceptions: coordinate reversal; intercept as solution; graph window hides intersection; parallel lines as two solutions; overlapping lines as one solution; vertical-horizontal line confusion; estimate treated as exact
- Remedial Phases: Phase 003 review; Phase 011 review; Phase 012 review; coordinate plane mini-lesson; slope-intercept mini-lesson; vertical and horizontal line mini-lesson
- Follow-up Phases: Phase 014 - Function notation; Phase 016 - Domain from graphs; Phase 017 - Range from graphs; Phase 026 - Quadratic graphs
- Transfer Topics: break-even analysis; graphical verification; domain and range; function intersections; data-model comparisons

# Validation Notes

## Structure Validation
- Includes all required Bibles and metadata sections.
- Contains exactly 20 template families, within the required 20-40 range.
- Each template includes example, answer, explanation, distractors, distractor rationale, randomization rules, validity constraints, metadata, variants, and mappings.
- Every template has six progressive hints.

## Math Validation
- T001: `y=x+1` and `y=-x+5` intersect at `(2,3)`.
- T002: `2x+1=-x+7` -> `x=2`, `y=5`.
- T003: `x+y=6`, `x-y=2` -> `(4,2)`.
- T004: `x=3`, `y=-2` -> `(3,-2)`.
- T005: `x=4`, `y=2x-1` -> `y=7`, solution `(4,7)`.
- T006: `y=5`, `y=-x+2` -> `x=-3`, solution `(-3,5)`.
- T007: same slope 2, different intercepts -> no solution.
- T008: `2y=6x-4` simplifies to `y=3x-2` -> infinitely many solutions.
- T009: `(1/2)x+1=-x+5` -> `x=8/3`, `y=7/3`, about `(2.67,2.33)`.
- T010: `y=x+2` and `y=-2x+8` both give `y=4` at `x=2`.
- T011: `10x+5=-5x+50` -> `x=3`, `y=35`, so window must include `(3,35)`.
- T012: `(1,4)` satisfies `y=2x+2` and `y=-x+5`.
- T013: distinct parallel lines have no shared point.
- T014: `2x+y=8`, `x+2y=7` -> `(3,2)`.
- T015: `10+2x=4+5x` -> `x=2`, `y=14`.
- T016: graph intersection `(2,5)` was reversed incorrectly as `(5,2)`.
- T017: `x+2=-x+6` -> `x=2`, `y=4`; intercepts are 2 and 6.
- T018: `(3,1)` satisfies `y=x-2` and `y=-2x+7`; slopes differ.
- T019: exact solution for T009 system is `(8/3,7/3)`.
- T020: `y=2x-1`; `x+2(2x-1)=12` -> `x=14/5`, `y=23/5`.

## Distractor Validation
- Distractors reflect coordinate reversal, intercept confusion, slope sign errors, one-line checking, graph-window errors, special-case confusion, estimate-as-exact errors, and vertical-horizontal line confusion.
- Multiple-choice-style templates have exactly one correct answer.
- Visual templates specify enough graph information to keep the answer unambiguous.

## Hint Validation
- Each hint sequence moves from graph form or line relationship to intersection reading, verification, classification, or exact algebra.
- Approximation hints distinguish estimate from exact solution.

## Tutorial Validation
- Tutorial includes learning goal, why it matters, prerequisite check, core concept, reading intersections, slope-intercept graphing, standard-form graphing, vertical and horizontal lines, parallel and overlapping lines, solution types, approximate and exact solutions, tables, window and scale, checking, modeling, matching, reverse construction, common mistakes, guided practice, independent practice, mastery check, adaptive messages, and metadata.

## Socratic Validation
- Dialogue includes diagnostic, guided discovery, correct branch, partial branch, misconception branch, parallel branch, overlapping branch, window branch, unsure branch, unrelated branch, recovery prompts, reflection, transfer, escalation rules, and exit condition.
- Tutor uses graph relationships before algebraic verification.

## Metadata Validation
- Every template includes IDs, difficulty, timing, visual flag, compatibility flags, prerequisites, misconception tags, randomization constraints, and support-system mappings.

## Known Issues
- The repository specifications differ on the label for Hint 4. This phase uses "Guided Next Step" to match the master prompt language.
- `PHASE_TEMPLATE.md` omits Common Misconceptions from the Knowledge Graph section, but this phase includes it because the master prompt and knowledge graph guide require it.
