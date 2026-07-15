# Phase 017 - Range from Graphs

## Phase Metadata
- Course: Precalculus Odyssey Bible v5
- Topic: Range from graphs
- Subtopic: Reading output values from graph features
- Prerequisites: Phase 014 function notation, Phase 016 domain from graphs, coordinate plane, interval notation, open and closed endpoints
- Related phases: Phase 018 - Function transformations; Phase 021 - Piecewise functions; Phase 026 - Quadratic graphs; Phase 034 - Rational restrictions and holes
- Estimated phase size: 20 template families, 20 core examples, 120 progressive hints, 1 tutorial sequence, 1 Socratic dialogue system

## Learning Objectives
By the end of this phase, the player can:

1. Define range as the set of output values on a graph.
2. Read range by scanning vertical y-values.
3. Use open and closed endpoints to decide endpoint inclusion.
4. Use arrows to identify unbounded range directions.
5. Read ranges of lines, rays, parabolas, horizontal lines, and discrete graphs.
6. Identify missing y-values from holes or asymptotes.
7. Include y-values restored by filled points.
8. Write multi-piece ranges using union notation.
9. Interpret range in context with units.
10. Distinguish range from domain consistently.

## Prerequisite Review
- Range uses y-values, not x-values.
- A closed dot includes the endpoint value.
- An open dot excludes the endpoint value unless another filled point gives the same y-value.
- Arrows can show that y-values continue up, down, or both.
- A horizontal line has only one y-value in its range.

## Core Concepts
- Range is the set of y-values that appear on the graph.
- Scan from bottom to top, not left to right.
- Project the graph onto the y-axis.
- Closed endpoint y-values are included.
- Open endpoint y-values are excluded unless another filled point has that same y-value.
- Separate vertical bands require union notation.
- A graph window is not the range if arrows show the graph continues.

## Common Misconceptions
- Reading x-values instead of y-values.
- Giving domain when asked for range.
- Assuming a horizontal line has all real range.
- Treating a parabola's domain as its range.
- Filling vertical gaps between separate pieces.
- Ignoring open or closed endpoint symbols.
- Ignoring holes that remove the only point at a y-value.
- Forgetting that another filled point can restore a y-value.

# Part I - Question Bible

## Template T001 - Closed vertical range interval
- Template ID: P017-T001
- Question Type: Graph interpretation
- Cognitive Skill: Read range from two included y-extremes
- Difficulty: 2
- Estimated Time: 40 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Write the range of a graph with closed lowest and highest y-values.
- Example Question: A graph reaches a lowest closed point at `y=-2` and a highest closed point at `y=5`, with all y-values between. Find the range.
- Answer: `[-2,5]`.
- Explanation: The graph has output values from -2 through 5, and both endpoint y-values are included.
- Distractors: `(-2,5)`; `[-2,5)`; `[-2,infinity)`; domain `[-2,5]`.
- Distractor Rationale: Treats closed endpoints as open; excludes top endpoint; invents upward arrow; confuses range with domain.
- Randomization Rules: Use continuous graph pieces with closed low and high y-values.
- Validity Constraints: Every y-value between extremes must appear.
- Metadata: phase_id=P017; prerequisites=[interval notation, y-values]; misconception_tags=[endpoint error, ray confusion, domain-range confusion]; randomization_constraints=[closed y-extremes].
- Graph/Visual Variant: Graph with highlighted vertical projection.
- Modeling Variant: Score varies from -2 to 5 inclusive.
- Reverse Variant: Draw a graph with range `[-2,5]`.
- Equation Battle Variant: Not primary; visual range reading.
- Multi-stage Boss Variant: Ask for range and endpoint justification.
- Hint Mapping: H-P017-T001
- Tutorial Mapping: Tut-P017 sections Reading Range
- Socratic Mapping: Soc-P017 endpoint branch

## Template T002 - Open vertical range interval
- Template ID: P017-T002
- Question Type: Graph interpretation
- Cognitive Skill: Read range from excluded y-extremes
- Difficulty: 2
- Estimated Time: 40 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Write range with open y-endpoints.
- Example Question: A graph has y-values between `-2` and `5`, with open endpoints at both y-levels. Find the range.
- Answer: `(-2,5)`.
- Explanation: The graph approaches y=-2 and y=5 but does not include either output value.
- Distractors: `[-2,5]`; `(-2,5]`; `{-2,5}`; all real numbers.
- Distractor Rationale: Includes open endpoints; includes one open endpoint; lists boundaries only; ignores finite vertical extent.
- Randomization Rules: Use finite graphs with open lowest and highest y-values.
- Validity Constraints: No filled point may exist at those y-levels.
- Metadata: phase_id=P017; prerequisites=[open endpoints, interval notation]; misconception_tags=[endpoint error, boundary-only answer, all-real error]; randomization_constraints=[open y-endpoints].
- Graph/Visual Variant: Open circles at bottom and top y-levels.
- Modeling Variant: Output stays strictly between two thresholds.
- Reverse Variant: Draw a graph with range `(-2,5)`.
- Equation Battle Variant: Not primary.
- Multi-stage Boss Variant: Explain why endpoints are excluded.
- Hint Mapping: H-P017-T002
- Tutorial Mapping: Tut-P017 sections Endpoint Inclusion
- Socratic Mapping: Soc-P017 open-endpoint branch

## Template T003 - Half-open range interval
- Template ID: P017-T003
- Question Type: Graph interpretation
- Cognitive Skill: Combine one included and one excluded y-endpoint
- Difficulty: 2
- Estimated Time: 45 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Read range with mixed endpoint inclusion.
- Example Question: A graph has a closed lowest point at `y=-3` and an open highest point at `y=4`. Find the range.
- Answer: `[-3,4)`.
- Explanation: The graph includes y=-3, excludes y=4, and covers every y-value between.
- Distractors: `(-3,4]`; `[-3,4]`; `(-3,4)`; `[4,-3)`
- Distractor Rationale: Reverses endpoint types; includes both; excludes both; reverses interval order.
- Randomization Rules: Use one closed and one open vertical endpoint.
- Validity Constraints: Vertical coverage between endpoints must be continuous.
- Metadata: phase_id=P017; prerequisites=[endpoint notation, range reading]; misconception_tags=[endpoint reversal, interval order, endpoint error]; randomization_constraints=[mixed y-endpoints].
- Graph/Visual Variant: Vertical projection with mixed endpoint symbols.
- Modeling Variant: Output begins at a guaranteed value and approaches a cap.
- Reverse Variant: Draw a graph with range `[-3,4)`.
- Equation Battle Variant: Not primary.
- Multi-stage Boss Variant: Explain bottom and top endpoint separately.
- Hint Mapping: H-P017-T003
- Tutorial Mapping: Tut-P017 sections Endpoint Inclusion
- Socratic Mapping: Soc-P017 half-open branch

## Template T004 - Ray upward from a minimum
- Template ID: P017-T004
- Question Type: Graph interpretation
- Cognitive Skill: Use an upward arrow or minimum to write range
- Difficulty: 2
- Estimated Time: 45 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Read range from a graph with an included minimum and no maximum.
- Example Question: A graph has a closed lowest point at `y=1` and continues upward forever. Find the range.
- Answer: `[1,infinity)`.
- Explanation: The graph includes output 1 and all larger y-values.
- Distractors: `(1,infinity)`; `(-infinity,1]`; `[1,10]`; all real numbers.
- Distractor Rationale: Excludes closed minimum; reverses vertical direction; mistakes visible window for endpoint; ignores minimum.
- Randomization Rules: Use graphs with included minimum and upward continuation.
- Validity Constraints: Upward continuation must be indicated by arrow or graph type.
- Metadata: phase_id=P017; prerequisites=[infinity notation, minimum value]; misconception_tags=[endpoint error, direction error, window error]; randomization_constraints=[upward range].
- Graph/Visual Variant: Upward ray or upward-opening curve.
- Modeling Variant: Output has a minimum score and can increase without bound.
- Reverse Variant: Draw a graph with range `[1,infinity)`.
- Equation Battle Variant: Not primary.
- Multi-stage Boss Variant: Compare with domain if graph also extends right.
- Hint Mapping: H-P017-T004
- Tutorial Mapping: Tut-P017 sections Arrows and Unbounded Range
- Socratic Mapping: Soc-P017 upward branch

## Template T005 - Ray downward from an open maximum
- Template ID: P017-T005
- Question Type: Graph interpretation
- Cognitive Skill: Read downward-unbounded range
- Difficulty: 2
- Estimated Time: 45 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Read range from a graph with an excluded top value and no lower bound.
- Example Question: A graph has an open highest point at `y=4` and continues downward forever. Find the range.
- Answer: `(-infinity,4)`.
- Explanation: The graph includes all y-values less than 4 but not y=4.
- Distractors: `(-infinity,4]`; `(4,infinity)`; `[4,infinity)`; all real numbers.
- Distractor Rationale: Includes open maximum; reverses vertical direction; reverses direction and endpoint; ignores maximum.
- Randomization Rules: Use graphs with open maximum and downward continuation.
- Validity Constraints: No filled point may exist at y=4.
- Metadata: phase_id=P017; prerequisites=[open endpoints, infinity notation]; misconception_tags=[endpoint error, direction error, all-real error]; randomization_constraints=[downward range].
- Graph/Visual Variant: Downward ray with open top point.
- Modeling Variant: Output stays below a strict cap.
- Reverse Variant: Draw a graph with range `(-infinity,4)`.
- Equation Battle Variant: Not primary.
- Multi-stage Boss Variant: Ask for inequality and interval notation.
- Hint Mapping: H-P017-T005
- Tutorial Mapping: Tut-P017 sections Arrows and Unbounded Range
- Socratic Mapping: Soc-P017 downward branch

## Template T006 - Nonhorizontal line range
- Template ID: P017-T006
- Question Type: Graph interpretation
- Cognitive Skill: Recognize all-real range from a slanted line
- Difficulty: 2
- Estimated Time: 35 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: State the range of a nonhorizontal line with arrows.
- Example Question: A slanted line has arrows on both ends. Find the range.
- Answer: `(-infinity, infinity)`.
- Explanation: As the line continues, its y-values go down without bound and up without bound.
- Distractors: visible y-window only; domain all real; `{slope}`; `[0,infinity)`.
- Distractor Rationale: Mistakes window for range; gives a domain statement without y reasoning; confuses slope with output set; invents lower bound.
- Randomization Rules: Use nonhorizontal lines with arrows.
- Validity Constraints: Line must not be horizontal.
- Metadata: phase_id=P017; prerequisites=[line graphs, arrows]; misconception_tags=[window error, domain-range confusion, slope confusion]; randomization_constraints=[nonhorizontal line].
- Graph/Visual Variant: Slanted line with arrows.
- Modeling Variant: Abstract linear relationship without output cap.
- Reverse Variant: Draw a nonhorizontal line with all-real range.
- Equation Battle Variant: Not primary.
- Multi-stage Boss Variant: Contrast with horizontal-line range.
- Hint Mapping: H-P017-T006
- Tutorial Mapping: Tut-P017 sections Common Graph Families
- Socratic Mapping: Soc-P017 line branch

## Template T007 - Horizontal line range
- Template ID: P017-T007
- Question Type: Graph interpretation
- Cognitive Skill: Recognize single-output range
- Difficulty: 2
- Estimated Time: 35 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: State the range of a horizontal line.
- Example Question: A horizontal line is graphed at `y=3`. Find the range.
- Answer: `{3}`.
- Explanation: Every point on the graph has y-value 3, so the only output is 3.
- Distractors: all real numbers; `x=3`; `[3,infinity)`; `(-infinity,3]`.
- Distractor Rationale: Confuses with domain; gives vertical-line statement; invents upward ray; invents downward ray.
- Randomization Rules: Use horizontal lines at integer y-values.
- Validity Constraints: Graph must be horizontal and continuous.
- Metadata: phase_id=P017; prerequisites=[horizontal lines, set notation]; misconception_tags=[domain-range confusion, line-type confusion, ray error]; randomization_constraints=[horizontal line].
- Graph/Visual Variant: Horizontal line with arrows left and right.
- Modeling Variant: Constant score or constant height.
- Reverse Variant: Draw a graph with range `{3}`.
- Equation Battle Variant: Not primary.
- Multi-stage Boss Variant: Compare domain and range of the same line.
- Hint Mapping: H-P017-T007
- Tutorial Mapping: Tut-P017 sections Common Graph Families
- Socratic Mapping: Soc-P017 horizontal branch

## Template T008 - Upward-opening parabola range
- Template ID: P017-T008
- Question Type: Graph interpretation
- Cognitive Skill: Read minimum y-value from vertex
- Difficulty: 3
- Estimated Time: 50 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Find the range of an upward-opening parabola.
- Example Question: A parabola opens upward and has vertex at `y=-4`. Find the range.
- Answer: `[-4,infinity)`.
- Explanation: The vertex is the lowest output value, and the arms continue upward forever.
- Distractors: `(-infinity,infinity)`; `(-infinity,-4]`; `[-4,4]`; `{ -4 }`
- Distractor Rationale: Gives domain; reverses opening direction; invents symmetric cap; gives only the vertex value.
- Randomization Rules: Use upward-opening parabolas with visible vertex.
- Validity Constraints: Vertex must be included.
- Metadata: phase_id=P017; prerequisites=[parabolas, minimum value]; misconception_tags=[domain-range confusion, direction reversal, vertex-only answer]; randomization_constraints=[upward parabola].
- Graph/Visual Variant: Parabola with vertex highlighted.
- Modeling Variant: Minimum cost or minimum height graph.
- Reverse Variant: Draw a graph with range `[-4,infinity)`.
- Equation Battle Variant: Not primary.
- Multi-stage Boss Variant: Identify vertex and opening direction.
- Hint Mapping: H-P017-T008
- Tutorial Mapping: Tut-P017 sections Parabolas
- Socratic Mapping: Soc-P017 upward-parabola branch

## Template T009 - Downward-opening parabola range
- Template ID: P017-T009
- Question Type: Graph interpretation
- Cognitive Skill: Read maximum y-value from vertex
- Difficulty: 3
- Estimated Time: 50 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Find the range of a downward-opening parabola.
- Example Question: A parabola opens downward and has vertex at `y=6`. Find the range.
- Answer: `(-infinity,6]`.
- Explanation: The vertex is the highest output value, and the arms continue downward forever.
- Distractors: `[6,infinity)`; `(-infinity,infinity)`; `(6,infinity)`; `{6}`
- Distractor Rationale: Reverses opening direction; gives domain; excludes included maximum and wrong direction; gives only the vertex.
- Randomization Rules: Use downward-opening parabolas with visible vertex.
- Validity Constraints: Vertex must be included.
- Metadata: phase_id=P017; prerequisites=[parabolas, maximum value]; misconception_tags=[direction reversal, domain-range confusion, vertex-only answer]; randomization_constraints=[downward parabola].
- Graph/Visual Variant: Downward parabola with vertex highlighted.
- Modeling Variant: Maximum height of a projectile.
- Reverse Variant: Draw a graph with range `(-infinity,6]`.
- Equation Battle Variant: Not primary.
- Multi-stage Boss Variant: Include context interpretation of maximum.
- Hint Mapping: H-P017-T009
- Tutorial Mapping: Tut-P017 sections Parabolas
- Socratic Mapping: Soc-P017 downward-parabola branch

## Template T010 - Square-root style range
- Template ID: P017-T010
- Question Type: Graph interpretation
- Cognitive Skill: Read range from a radical-shaped graph
- Difficulty: 3
- Estimated Time: 45 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Find the range of a square-root-style graph.
- Example Question: A square-root-shaped graph starts at a closed point with `y=0` and rises to the right forever. Find the range.
- Answer: `[0,infinity)`.
- Explanation: The lowest output is 0, included, and the graph rises without bound.
- Distractors: `[0,infinity)` as domain only; `(0,infinity)`; `(-infinity,infinity)`; `[start x,infinity)`.
- Distractor Rationale: Gives right interval for wrong reason; excludes included start; ignores minimum; uses domain instead of range.
- Randomization Rules: Use radical-style graphs with included lowest y-value.
- Validity Constraints: Graph should rise or fall visibly.
- Metadata: phase_id=P017; prerequisites=[radical graphs, endpoint inclusion]; misconception_tags=[domain-range confusion, endpoint error, all-real error]; randomization_constraints=[radical-style range].
- Graph/Visual Variant: Radical curve with start point.
- Modeling Variant: Nonnegative output model.
- Reverse Variant: Draw a graph with range `[0,infinity)`.
- Equation Battle Variant: Not primary.
- Multi-stage Boss Variant: Ask for domain and range comparison.
- Hint Mapping: H-P017-T010
- Tutorial Mapping: Tut-P017 sections Radical-Style Graphs
- Socratic Mapping: Soc-P017 radical branch

## Template T011 - Reciprocal-style range excluding y=0
- Template ID: P017-T011
- Question Type: Graph interpretation
- Cognitive Skill: Exclude a horizontal asymptote y-value
- Difficulty: 3
- Estimated Time: 60 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Read range when a graph approaches but never reaches a y-value.
- Example Question: A reciprocal-style graph has branches above and below the x-axis and approaches the horizontal asymptote `y=0` without touching it. Find the range.
- Answer: `(-infinity,0) union (0,infinity)`.
- Explanation: The graph takes negative y-values and positive y-values, but never y=0.
- Distractors: all real numbers; `x != 0`; `(0,infinity)`; `(-infinity,0] union [0,infinity)`.
- Distractor Rationale: Includes the asymptote; gives domain-style exclusion; misses negative branch; includes excluded y=0.
- Randomization Rules: Use reciprocal-like graphs with horizontal asymptotes.
- Validity Constraints: Graph must not touch the asymptote y-value.
- Metadata: phase_id=P017; prerequisites=[asymptotes, range notation]; misconception_tags=[asymptote ignored, domain-range confusion, branch omission]; randomization_constraints=[horizontal asymptote].
- Graph/Visual Variant: Hyperbola-like branches and dashed horizontal asymptote.
- Modeling Variant: Output approaches zero but never reaches it.
- Reverse Variant: Draw a graph with range excluding 0.
- Equation Battle Variant: Optional formula connection.
- Multi-stage Boss Variant: Identify horizontal asymptote and range.
- Hint Mapping: H-P017-T011
- Tutorial Mapping: Tut-P017 sections Holes and Asymptotes in Range
- Socratic Mapping: Soc-P017 asymptote branch

## Template T012 - Hole removes a y-value
- Template ID: P017-T012
- Question Type: Graph interpretation
- Cognitive Skill: Exclude a missing output value
- Difficulty: 4
- Estimated Time: 70 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Determine whether a hole removes a y-value from the range.
- Example Question: A graph would otherwise have all real y-values, but it has an open hole at y=2 and no other point on the graph has y=2. Find the range.
- Answer: `(-infinity,2) union (2,infinity)`.
- Explanation: Since no point has y-value 2, that output is missing from the range.
- Distractors: all real numbers; `x != 2`; `{2}`; `(-infinity,2] union [2,infinity)`.
- Distractor Rationale: Ignores hole; excludes x instead of y; gives missing value only; includes excluded y-value.
- Randomization Rules: Use graphs with a missing y-level and no replacement point.
- Validity Constraints: No other filled point may share that y-value.
- Metadata: phase_id=P017; prerequisites=[holes, range definition]; misconception_tags=[hole ignored, x-y confusion, endpoint inclusion error]; randomization_constraints=[missing y-value].
- Graph/Visual Variant: Open point at a unique y-level.
- Modeling Variant: One output score impossible.
- Reverse Variant: Draw a graph whose range excludes 2.
- Equation Battle Variant: Not primary.
- Multi-stage Boss Variant: Ask whether any point has y=2.
- Hint Mapping: H-P017-T012
- Tutorial Mapping: Tut-P017 sections Holes and Asymptotes in Range
- Socratic Mapping: Soc-P017 hole branch

## Template T013 - Hole with filled point same y-value
- Template ID: P017-T013
- Question Type: Graph interpretation
- Cognitive Skill: Decide whether a y-value remains in the range
- Difficulty: 4
- Estimated Time: 75 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Recognize that a filled point at the same y-value keeps that y-value in the range.
- Example Question: A graph has an open hole at y=2, but another filled point elsewhere on the graph also has y=2. The graph otherwise covers all y-values. Find the range.
- Answer: `(-infinity, infinity)`.
- Explanation: Range asks whether any point has that y-value. The filled point with y=2 keeps the output 2 in the range.
- Distractors: `(-infinity,2) union (2,infinity)`; `{2}`; `x != 2`; no real numbers.
- Distractor Rationale: Removes y=2 despite replacement point; gives only the restored value; excludes x instead of y; overreacts to hole.
- Randomization Rules: Use an open hole and a filled replacement point sharing a y-value.
- Validity Constraints: Filled point must have exactly the same y-coordinate.
- Metadata: phase_id=P017; prerequisites=[range definition, holes, filled points]; misconception_tags=[hole overgeneralization, x-y confusion, filled point missed]; randomization_constraints=[filled y replacement].
- Graph/Visual Variant: Open point and filled point horizontally aligned.
- Modeling Variant: Output redefined at another input.
- Reverse Variant: Draw a graph that has a hole but all-real range.
- Equation Battle Variant: Optional piecewise graph connection.
- Multi-stage Boss Variant: Ask if any point has y=2.
- Hint Mapping: H-P017-T013
- Tutorial Mapping: Tut-P017 sections Holes With Replacement Values
- Socratic Mapping: Soc-P017 filled-hole branch

## Template T014 - Discrete graph range
- Template ID: P017-T014
- Question Type: Graph interpretation
- Cognitive Skill: List y-values of plotted points
- Difficulty: 2
- Estimated Time: 45 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Read range from discrete points.
- Example Question: A discrete graph has filled points at `(-3,2)`, `(-1,5)`, `(2,0)`, and `(4,6)`. Find the range.
- Answer: `{0,2,5,6}`.
- Explanation: Range uses the y-values of the plotted points: 2, 5, 0, and 6.
- Distractors: `{-3,-1,2,4}`; `{(-3,2),(-1,5),(2,0),(4,6)}`; `[0,6]`; all real numbers.
- Distractor Rationale: Gives domain values; lists points instead of range; fills gaps between discrete outputs; ignores discreteness.
- Randomization Rules: Use 3 to 6 discrete points.
- Validity Constraints: Range set should list distinct y-values.
- Metadata: phase_id=P017; prerequisites=[ordered pairs, set notation]; misconception_tags=[domain-range confusion, points-vs-range, continuous-fill error]; randomization_constraints=[discrete points].
- Graph/Visual Variant: Scatter plot with filled points.
- Modeling Variant: Discrete reward values.
- Reverse Variant: Plot points with range `{0,2,5,6}`.
- Equation Battle Variant: Not primary.
- Multi-stage Boss Variant: Ask for domain and range separately.
- Hint Mapping: H-P017-T014
- Tutorial Mapping: Tut-P017 sections Discrete Graphs
- Socratic Mapping: Soc-P017 discrete branch

## Template T015 - Two separated range bands
- Template ID: P017-T015
- Question Type: Graph interpretation
- Cognitive Skill: Use union for separate vertical intervals
- Difficulty: 3
- Estimated Time: 65 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Write range as a union of separated output intervals.
- Example Question: A graph has y-values from `-4` to `-1` inclusive and from `2` to `6` inclusive, with no y-values between -1 and 2. Find the range.
- Answer: `[-4,-1] union [2,6]`.
- Explanation: The graph covers two separate vertical bands, so the range uses union notation.
- Distractors: `[-4,6]`; `(-4,-1) union (2,6)`; `[-1,2]`; all real numbers.
- Distractor Rationale: Fills the vertical gap; excludes closed endpoints; gives the gap; ignores finite bands.
- Randomization Rules: Use graph pieces with separated y-value bands.
- Validity Constraints: Gap in y-values must be clear.
- Metadata: phase_id=P017; prerequisites=[union notation, endpoint inclusion]; misconception_tags=[gap filled, endpoint error, gap-as-range]; randomization_constraints=[disjoint range intervals].
- Graph/Visual Variant: Two graph pieces at separated heights.
- Modeling Variant: Output allowed in two separate score bands.
- Reverse Variant: Draw a graph with range `[-4,-1] union [2,6]`.
- Equation Battle Variant: Not primary.
- Multi-stage Boss Variant: Ask for each vertical band before union.
- Hint Mapping: H-P017-T015
- Tutorial Mapping: Tut-P017 sections Multiple Range Bands
- Socratic Mapping: Soc-P017 disjoint branch

## Template T016 - Context graph range
- Template ID: P017-T016
- Question Type: Modeling interpretation
- Cognitive Skill: Read output interval with units
- Difficulty: 3
- Estimated Time: 55 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Interpret range of a graph in context.
- Example Question: A height-time graph reaches a minimum height of 0 meters and a maximum height of 30 meters, both included. What is the range?
- Answer: `[0,30]` meters.
- Explanation: Range is the set of height outputs shown by the graph, from 0 to 30 meters.
- Distractors: `[0,30]` seconds; domain `[0,12]`; `(0,30)` meters; all real numbers.
- Distractor Rationale: Uses wrong units; gives input interval; excludes included endpoints; ignores context bounds.
- Randomization Rules: Use height, cost, temperature, or score graphs.
- Validity Constraints: Output units must be stated.
- Metadata: phase_id=P017; prerequisites=[context interpretation, range units]; misconception_tags=[unit confusion, domain-range confusion, endpoint error]; randomization_constraints=[context range].
- Graph/Visual Variant: Labeled y-axis with min and max.
- Modeling Variant: This template is the modeling variant.
- Reverse Variant: Draw a context graph with range `[0,30]`.
- Equation Battle Variant: Not primary.
- Multi-stage Boss Variant: Include units and endpoint explanation.
- Hint Mapping: H-P017-T016
- Tutorial Mapping: Tut-P017 sections Context Ranges
- Socratic Mapping: Soc-P017 context branch

## Template T017 - Match interval notation to range
- Template ID: P017-T017
- Question Type: Matching
- Cognitive Skill: Choose range interval from vertical endpoints
- Difficulty: 3
- Estimated Time: 60 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Match a graph to its range interval.
- Example Question: Which range matches a graph with an open lowest y-value at `y=-5`, a continuous curve up to a closed highest y-value at `y=3`, and no arrows?
- Answer: `(-5,3]`.
- Explanation: The lowest output is excluded and the highest output is included.
- Distractors: `[-5,3]`; `(-5,3)`; `[-5,3)`; `(-infinity,3]`
- Distractor Rationale: Includes open endpoint; excludes closed endpoint; reverses endpoint types; invents downward continuation.
- Randomization Rules: Present graphs and interval choices with close endpoint variants.
- Validity Constraints: Exactly one interval should match.
- Metadata: phase_id=P017; prerequisites=[range endpoint notation, matching]; misconception_tags=[endpoint error, arrow confusion, matching error]; randomization_constraints=[range interval choices].
- Graph/Visual Variant: Multiple-choice range cards.
- Modeling Variant: Pick the valid output interval from a context graph.
- Reverse Variant: Given range notation, choose matching graph.
- Equation Battle Variant: Not primary.
- Multi-stage Boss Variant: Explain endpoint symbols using y-values.
- Hint Mapping: H-P017-T017
- Tutorial Mapping: Tut-P017 sections Matching Graphs and Ranges
- Socratic Mapping: Soc-P017 matching branch

## Template T018 - Error analysis: range endpoint notation
- Template ID: P017-T018
- Question Type: Error analysis
- Cognitive Skill: Correct bracket and parenthesis errors for range
- Difficulty: 3
- Estimated Time: 65 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Diagnose a range notation error from endpoint types.
- Example Question: A graph has closed lowest and highest y-values at `y=-2` and `y=5`. A student writes the range as `(-2,5)`. What is the mistake?
- Answer: Closed endpoint values should use brackets. Correct range: `[-2,5]`.
- Explanation: The graph includes both output values, so both endpoints belong in the range.
- Distractors: Correct range is `(-2,5]`; correct range is `[-2,5)`; student is correct; range is `{ -2, 5 }`.
- Distractor Rationale: Fixes only one endpoint; fixes the other endpoint only; accepts endpoint error; lists only extremes.
- Randomization Rules: Use student answers with wrong endpoint symbols.
- Validity Constraints: Endpoint visuals must be clear.
- Metadata: phase_id=P017; prerequisites=[open and closed endpoint notation]; misconception_tags=[endpoint notation, boundary-only answer, error diagnosis]; randomization_constraints=[range endpoint error].
- Graph/Visual Variant: Graph with filled top and bottom points.
- Modeling Variant: Correct a stated output interval.
- Reverse Variant: Create a graph where the student's interval would be correct.
- Equation Battle Variant: Not primary.
- Multi-stage Boss Variant: Identify mistake, correct notation, explain.
- Hint Mapping: H-P017-T018
- Tutorial Mapping: Tut-P017 sections Common Mistakes
- Socratic Mapping: Soc-P017 error branch

## Template T019 - Reverse-build a graph from range
- Template ID: P017-T019
- Question Type: Reverse construction
- Cognitive Skill: Create graph features matching a target range
- Difficulty: 4
- Estimated Time: 90 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Describe a graph with a specified range.
- Example Question: Draw or describe a graph with range `[-1,4) union {6}`.
- Answer: One valid graph is any curve segment that covers y-values from -1 included to 4 excluded, plus a filled isolated point with y=6.
- Explanation: The y-values are controlled vertically. The x-values can vary as long as the graph's outputs match the target range.
- Distractors: segment from open y=-1 to closed y=4; filled vertical band `[-1,6]`; only a point at y=6; segment `[-1,4]` plus open point at y=6.
- Distractor Rationale: Reverses endpoint inclusion; fills gap; misses interval; includes 4 and excludes 6.
- Randomization Rules: Provide mixed interval and isolated-output ranges.
- Validity Constraints: Graph description must match every included and excluded y-value.
- Metadata: phase_id=P017; prerequisites=[range notation, graph construction]; misconception_tags=[endpoint reversal, gap filled, isolated output missed]; randomization_constraints=[reverse range].
- Graph/Visual Variant: Student creates or chooses matching graph.
- Modeling Variant: Output bands plus one special score.
- Reverse Variant: This template is the reverse variant.
- Equation Battle Variant: Not primary.
- Multi-stage Boss Variant: Describe endpoints, gap, and isolated output.
- Hint Mapping: H-P017-T019
- Tutorial Mapping: Tut-P017 sections Reverse Construction
- Socratic Mapping: Soc-P017 reverse branch

## Template T020 - Boss range challenge
- Template ID: P017-T020
- Question Type: Multi-stage boss
- Cognitive Skill: Combine range intervals, endpoints, arrows, and holes
- Difficulty: 5
- Estimated Time: 140 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Read a complex graph range with multiple vertical features.
- Example Question: Boss Gate: A graph has outputs from a closed low point at `y=-3` up to an open point at `y=2`, then no outputs until a closed point at `y=5`; from there the graph continues upward forever, except for an open hole at `y=8` and no other point at `y=8`. Find the range.
- Answer: `[-3,2) union [5,8) union (8,infinity)`.
- Explanation: The first output band includes -3 and excludes 2. The second starts at included 5 and continues upward, but y=8 is missing.
- Distractors: `[-3,2] union [5,infinity)`; `[-3,2) union [5,infinity)`; `[-3,8) union (8,infinity)`; `(-3,2) union (5,8) union (8,infinity)`
- Distractor Rationale: Includes open y=2 and missing y=8; misses the hole at 8; fills vertical gap from 2 to 5; excludes closed endpoints -3 and 5.
- Randomization Rules: Use a graph with at least two output bands, mixed endpoints, upward continuation, and one missing y-level.
- Validity Constraints: Each range feature must affect y-values unambiguously.
- Metadata: phase_id=P017; prerequisites=[range union notation, holes, endpoint inclusion, arrows]; misconception_tags=[endpoint error, hole ignored, gap filled, closed endpoint missed]; randomization_constraints=[complex graph range].
- Graph/Visual Variant: Multi-piece graph with labeled y-values.
- Modeling Variant: Output availability graph with missing score value.
- Reverse Variant: Build a graph for the boss range.
- Equation Battle Variant: Not primary.
- Multi-stage Boss Variant: This is the phase boss template.
- Hint Mapping: H-P017-T020
- Tutorial Mapping: Tut-P017 sections Full Phase Review
- Socratic Mapping: Soc-P017 boss branch

# Part II - Hint Bible

## H-P017-T001
- Hint 1 - Gentle Nudge: Range uses y-values.
- Hint 2 - Concept Reminder: Closed endpoints are included.
- Hint 3 - Focus Hint: Lowest y is -2 and highest y is 5.
- Hint 4 - Guided Next Step: Use brackets for both endpoints.
- Hint 5 - Nearly Complete: Write the vertical interval.
- Hint 6 - Full Solution: `[-2,5]`.

## H-P017-T002
- Hint 1 - Gentle Nudge: Look at whether the top and bottom points are open.
- Hint 2 - Concept Reminder: Open endpoints are excluded.
- Hint 3 - Focus Hint: The graph has y-values between -2 and 5.
- Hint 4 - Guided Next Step: Use parentheses at both ends.
- Hint 5 - Nearly Complete: Do not include -2 or 5.
- Hint 6 - Full Solution: `(-2,5)`.

## H-P017-T003
- Hint 1 - Gentle Nudge: Read the lowest and highest y-values separately.
- Hint 2 - Concept Reminder: Closed means bracket; open means parenthesis.
- Hint 3 - Focus Hint: Include -3 and exclude 4.
- Hint 4 - Guided Next Step: Use `[-3,4)`.
- Hint 5 - Nearly Complete: Keep values in increasing order.
- Hint 6 - Full Solution: `[-3,4)`.

## H-P017-T004
- Hint 1 - Gentle Nudge: Find the minimum output.
- Hint 2 - Concept Reminder: The graph continues upward forever.
- Hint 3 - Focus Hint: Minimum y-value is 1 and it is included.
- Hint 4 - Guided Next Step: Use bracket at 1 and infinity upward.
- Hint 5 - Nearly Complete: Infinity uses a parenthesis.
- Hint 6 - Full Solution: `[1,infinity)`.

## H-P017-T005
- Hint 1 - Gentle Nudge: Find the maximum output.
- Hint 2 - Concept Reminder: The graph continues downward forever.
- Hint 3 - Focus Hint: The top y-value 4 is open.
- Hint 4 - Guided Next Step: All y-values less than 4 are included.
- Hint 5 - Nearly Complete: Use a parenthesis at 4.
- Hint 6 - Full Solution: `(-infinity,4)`.

## H-P017-T006
- Hint 1 - Gentle Nudge: Watch the y-values as the slanted line continues.
- Hint 2 - Concept Reminder: A nonhorizontal line goes up and down without bound.
- Hint 3 - Focus Hint: There is no lowest or highest y-value.
- Hint 4 - Guided Next Step: Do not use the visible window as the range.
- Hint 5 - Nearly Complete: Every real output appears.
- Hint 6 - Full Solution: `(-infinity, infinity)`.

## H-P017-T007
- Hint 1 - Gentle Nudge: A horizontal line keeps the same y-value.
- Hint 2 - Concept Reminder: Range is the set of outputs.
- Hint 3 - Focus Hint: Every point has y=3.
- Hint 4 - Guided Next Step: Use a set with one value.
- Hint 5 - Nearly Complete: Do not write all real numbers for range.
- Hint 6 - Full Solution: `{3}`.

## H-P017-T008
- Hint 1 - Gentle Nudge: The vertex is the lowest point.
- Hint 2 - Concept Reminder: Upward-opening means y-values increase from the vertex.
- Hint 3 - Focus Hint: Minimum y is -4.
- Hint 4 - Guided Next Step: Include -4 and go upward forever.
- Hint 5 - Nearly Complete: Use `[ -4, infinity )` without spaces.
- Hint 6 - Full Solution: `[-4,infinity)`.

## H-P017-T009
- Hint 1 - Gentle Nudge: The vertex is the highest point.
- Hint 2 - Concept Reminder: Downward-opening means y-values go down from the vertex.
- Hint 3 - Focus Hint: Maximum y is 6.
- Hint 4 - Guided Next Step: Include 6 and go downward forever.
- Hint 5 - Nearly Complete: Use `(-infinity,6]`.
- Hint 6 - Full Solution: `(-infinity,6]`.

## H-P017-T010
- Hint 1 - Gentle Nudge: Find the lowest output on the radical-shaped graph.
- Hint 2 - Concept Reminder: The starting point is closed.
- Hint 3 - Focus Hint: Lowest y-value is 0.
- Hint 4 - Guided Next Step: The graph rises upward from there.
- Hint 5 - Nearly Complete: Include 0.
- Hint 6 - Full Solution: `[0,infinity)`.

## H-P017-T011
- Hint 1 - Gentle Nudge: Horizontal asymptotes can mark missing y-values.
- Hint 2 - Concept Reminder: The graph approaches y=0 but never touches it.
- Hint 3 - Focus Hint: Negative and positive y-values both appear.
- Hint 4 - Guided Next Step: Split the range around 0.
- Hint 5 - Nearly Complete: Exclude 0.
- Hint 6 - Full Solution: `(-infinity,0) union (0,infinity)`.

## H-P017-T012
- Hint 1 - Gentle Nudge: The hole matters only if no other point has that y-value.
- Hint 2 - Concept Reminder: Range asks whether any point reaches y=2.
- Hint 3 - Focus Hint: No other point has y=2.
- Hint 4 - Guided Next Step: Exclude 2 from all real outputs.
- Hint 5 - Nearly Complete: Write two intervals split at 2.
- Hint 6 - Full Solution: `(-infinity,2) union (2,infinity)`.

## H-P017-T013
- Hint 1 - Gentle Nudge: Check whether y=2 appears anywhere else.
- Hint 2 - Concept Reminder: A filled point with y=2 keeps that output.
- Hint 3 - Focus Hint: There is another filled point at y=2.
- Hint 4 - Guided Next Step: So y=2 is included.
- Hint 5 - Nearly Complete: No y-values are missing.
- Hint 6 - Full Solution: `(-infinity, infinity)`.

## H-P017-T014
- Hint 1 - Gentle Nudge: Range is the list of y-coordinates.
- Hint 2 - Concept Reminder: Ignore x-values for range.
- Hint 3 - Focus Hint: The y-values are 2, 5, 0, and 6.
- Hint 4 - Guided Next Step: Put them in a set.
- Hint 5 - Nearly Complete: Set order does not change the values.
- Hint 6 - Full Solution: `{0,2,5,6}`.

## H-P017-T015
- Hint 1 - Gentle Nudge: There are two separate output bands.
- Hint 2 - Concept Reminder: Use union for separated range intervals.
- Hint 3 - Focus Hint: First band is `[-4,-1]`.
- Hint 4 - Guided Next Step: Second band is `[2,6]`.
- Hint 5 - Nearly Complete: Do not fill the gap from -1 to 2.
- Hint 6 - Full Solution: `[-4,-1] union [2,6]`.

## H-P017-T016
- Hint 1 - Gentle Nudge: In a height graph, range is height.
- Hint 2 - Concept Reminder: The y-axis uses meters.
- Hint 3 - Focus Hint: Minimum height is 0 and maximum is 30.
- Hint 4 - Guided Next Step: Both are included.
- Hint 5 - Nearly Complete: Include units in the answer.
- Hint 6 - Full Solution: `[0,30]` meters.

## H-P017-T017
- Hint 1 - Gentle Nudge: Translate vertical endpoint symbols.
- Hint 2 - Concept Reminder: Open lowest y-value means parenthesis.
- Hint 3 - Focus Hint: Closed highest y-value means bracket.
- Hint 4 - Guided Next Step: The range is from -5 to 3.
- Hint 5 - Nearly Complete: Use `(-5,3]`.
- Hint 6 - Full Solution: `(-5,3]`.

## H-P017-T018
- Hint 1 - Gentle Nudge: The student's symbols do not match closed endpoints.
- Hint 2 - Concept Reminder: Closed endpoints use brackets.
- Hint 3 - Focus Hint: Both y=-2 and y=5 are included.
- Hint 4 - Guided Next Step: Replace parentheses with brackets.
- Hint 5 - Nearly Complete: Keep the same endpoint values.
- Hint 6 - Full Solution: Mistake: endpoint notation. Correct range: `[-2,5]`.

## H-P017-T019
- Hint 1 - Gentle Nudge: Build the range vertically.
- Hint 2 - Concept Reminder: `[-1,4)` means include y=-1 and exclude y=4.
- Hint 3 - Focus Hint: `{6}` means one filled point with y=6.
- Hint 4 - Guided Next Step: Leave a vertical gap between 4 and 6.
- Hint 5 - Nearly Complete: The x-values can vary; range controls outputs.
- Hint 6 - Full Solution: A graph covering y-values `[-1,4)` plus a filled point at y=6.

## H-P017-T020
- Hint 1 - Gentle Nudge: Break the output values into bands.
- Hint 2 - Concept Reminder: First band includes -3 and excludes 2.
- Hint 3 - Focus Hint: That gives `[-3,2)`.
- Hint 4 - Guided Next Step: Second band starts at included 5 and continues upward.
- Hint 5 - Nearly Complete: Remove the missing y-value 8.
- Hint 6 - Full Solution: `[-3,2) union [5,8) union (8,infinity)`.

# Part III - Tutorial Bible

## Learning Goal
Learn to find the range of a function from its graph by reading where the graph exists vertically along the y-axis.

## Why It Matters
Range tells which outputs are possible. In games and models, range answers questions like "What scores can happen?", "What heights are reached?", and "What values are impossible?" It is the vertical partner of domain.

## Prerequisite Check
Ask the player:

1. Does range use x-values or y-values? Expected: y-values.
2. What does a closed endpoint mean? Expected: included.
3. What does an open endpoint mean? Expected: excluded unless another filled point has that y-value.
4. What is the range of a horizontal line at y=3? Expected: `{3}`.
5. What does union mean? Expected: combine separate pieces.

## Core Concept
The range of a graph is the set of all y-values where the graph has at least one point.

To find it:

1. Scan bottom to top.
2. Identify the lowest and highest output values.
3. Check whether endpoints are open or closed.
4. Look for arrows, holes, gaps, and isolated points.
5. Write the y-values in interval or set notation.

## Reading Range
Project the graph onto the y-axis.

Closed lowest y=-2 and closed highest y=5 gives:

`[-2,5]`

Open lowest y=-2 and open highest y=5 gives:

`(-2,5)`

## Endpoint Inclusion
Use brackets when the graph includes the endpoint y-value.

Use parentheses when the graph approaches but does not include the endpoint y-value.

If another filled point exists at the same y-value, that y-value is included.

## Arrows and Unbounded Range
An upward arrow means y-values continue toward `infinity`.

A downward arrow means y-values continue toward `-infinity`.

Examples:

- Closed minimum y=1 and arrow upward: `[1,infinity)`
- Open maximum y=4 and arrow downward: `(-infinity,4)`

## Common Graph Families
- Nonhorizontal line with arrows: range `(-infinity, infinity)`.
- Horizontal line at y=3: range `{3}`.
- Upward parabola with vertex y=-4: `[-4,infinity)`.
- Downward parabola with vertex y=6: `(-infinity,6]`.
- Square-root-style graph starting at y=0 and rising: `[0,infinity)`.

## Holes and Asymptotes in Range
A missing point may remove a y-value only if no other point on the graph has that y-value.

A horizontal asymptote can mark a y-value the graph approaches but never reaches.

For a reciprocal-style graph approaching `y=0` without touching it:

`(-infinity,0) union (0,infinity)`

## Holes With Replacement Values
If there is a hole at y=2 but a filled point elsewhere with y=2, then y=2 is in the range.

Range asks whether at least one point has that output.

## Discrete Graphs
For discrete points, range is the set of y-coordinates.

For points `(-3,2)`, `(-1,5)`, `(2,0)`, `(4,6)`:

Range: `{0,2,5,6}`

## Multiple Range Bands
Separate vertical output bands require union notation.

If outputs are from -4 to -1 and from 2 to 6:

`[-4,-1] union [2,6]`

Do not fill the vertical gap.

## Context Ranges
In context, include units.

If a height-time graph has minimum height 0 meters and maximum height 30 meters, the range is:

`[0,30]` meters.

## Matching Graphs and Ranges
To match a graph to range notation:

1. Find lowest and highest y-values.
2. Check endpoint inclusion.
3. Check arrows and asymptotes.
4. Check holes and isolated points.
5. Use union for separated vertical bands.

## Reverse Construction
To draw a graph with range `[-1,4) union {6}`:

1. Make any graph piece whose y-values cover -1 included through 4 excluded.
2. Add a filled point at any x-value with y=6.
3. Leave y-values between 4 and 6 missing.

## Common Mistakes
- Mistake: Giving x-values.
  Correction: Range is the graph's vertical shadow.
- Mistake: Giving all real range for a horizontal line.
  Correction: A horizontal line has one y-value.
- Mistake: Filling vertical gaps.
  Correction: Use union notation.
- Mistake: Ignoring a horizontal asymptote.
  Correction: Exclude y-values the graph never reaches.
- Mistake: Removing a y-value despite a filled replacement point.
  Correction: A single filled point restores that y-value.
- Mistake: Confusing graph window with range.
  Correction: Follow arrows.

## Guided Practice
1. A graph has closed lowest y=-1 and open highest y=4.
   - Range: `[-1,4)`.

2. A downward parabola has vertex y=10.
   - Range: `(-infinity,10]`.

3. A graph has discrete points with y-values 1, 3, and 3.
   - Range: `{1,3}`.

## Independent Practice
1. Closed vertical range from y=0 to y=7; answer `[0,7]`.
2. Open low y=-3 and closed high y=2; answer `(-3,2]`.
3. Upward parabola with vertex y=-5; answer `[-5,infinity)`.
4. Horizontal line y=-4; answer `{-4}`.
5. Reciprocal graph with horizontal asymptote y=2 and branches above and below; answer `(-infinity,2) union (2,infinity)`.
6. Output bands `[-2,0]` and `[4,9)`; answer `[-2,0] union [4,9)`.

## Mastery Check
The player is ready to advance when they can:

1. Use y-values only for range.
2. Interpret open and closed y-endpoints.
3. Use arrows to identify unbounded outputs.
4. Read ranges of common graph families.
5. Handle holes, asymptotes, and filled replacement points.
6. Use union notation for separate output bands.
7. Include context units.

Mastery check set:

1. Closed range from y=-3 to y=2; answer `[-3,2]`.
2. Open maximum y=5 with arrow downward; answer `(-infinity,5)`.
3. Upward parabola vertex y=1; answer `[1,infinity)`.
4. Discrete points with y-values 0, 3, 8; answer `{0,3,8}`.
5. Bands `[-2,0)` and `[5,infinity)`; answer `[-2,0) union [5,infinity)`.

## Adaptive Tutor Messages
- If the player gives x-values: "Range is vertical; use y-values."
- If endpoint symbols are wrong: "Closed output values use brackets; open output values use parentheses."
- If a horizontal line is called all real: "A horizontal line has one output, even though it has many inputs."
- If the player gives domain of a parabola: "A parabola may use all x-values, but range depends on its vertex and opening direction."
- If a y-gap is filled: "No graph points reach those output values, so use separate intervals."
- If a hole is over-removed: "Check whether another filled point has the same y-value."
- If the player succeeds quickly: "You are ready to use range ideas in transformations and graph analysis."

## Tutorial Metadata
- Tutorial ID: Tut-P017
- Estimated duration: 6 minutes
- Target player state: knows domain from graphs, function notation, and interval notation
- Unlock condition: available from any Phase 017 question
- Remediation trigger: two domain-range reversals, two endpoint-symbol errors, one horizontal-line range error, or one repeated hole/asymptote error
- Advancement trigger: 80 percent accuracy on mixed endpoint, arrow, parabola, horizontal-line, hole, discrete, context, and multi-band range tasks

# Part IV - Socratic Dialogue Bible

## Opening Diagnostic
Tutor: "When finding range from a graph, do we look at x-values or y-values?"

Expected strong answer: "y-values."

## Guided Discovery
Tutor sequence:

1. "What is the lowest y-value where the graph exists?"
2. "Is that value included, excluded, or continued downward by an arrow?"
3. "What is the highest y-value where the graph exists?"
4. "Is that value included, excluded, or continued upward by an arrow?"
5. "Are there holes or horizontal asymptotes that remove y-values?"
6. "Does another filled point restore a missing y-value?"
7. "Are there vertical gaps between output bands?"
8. "Is the graph discrete or continuous?"
9. "Are context units needed?"
10. "How should the final range be written?"

## Correct Branch
Player: "Range uses y-values."

Tutor: "Good. Scan from bottom to top. What is the lowest output value?"

If player identifies it, ask whether it is included.

## Partial Understanding Branch
Player finds low and high values but uses wrong endpoint notation.

Tutor: "Look at the graph at those y-levels. Are the points open or filled?"

Recovery target: Player uses parentheses or brackets correctly.

## Misconception Branch
Player gives the x-values.

Tutor: "Those describe the domain. Range is vertical. If the graph casts a shadow on the y-axis, what y-values are covered?"

Recovery target: Player switches to y-values.

## Horizontal Line Branch
Player says a horizontal line has all real range.

Tutor: "As you move along the horizontal line, does the y-value ever change?"

Recovery target: Player gives a singleton range.

## Parabola Branch
Player gives all real numbers for an upward parabola range.

Tutor: "Does the graph ever go below its vertex? What is the lowest y-value?"

Recovery target: Player uses `[vertex y, infinity)`.

## Hole Branch
Player ignores a missing y-level.

Tutor: "At y=2, is there any filled point on the graph?"

If no, ask whether y=2 should be included.

## Filled Hole Branch
Player removes a y-value even with a filled replacement point.

Tutor: "Range only asks if at least one point has that output. Do we have a filled point with y=2?"

Recovery target: Player includes y=2.

## Unsure Branch
Player: "I do not know where to start."

Tutor: "Start at the bottom of the graph and move upward. Where do you first touch the graph?"

Then ask about endpoint inclusion.

## Unrelated Response Branch
Player gives an unrelated answer.

Tutor: "Let's focus only on output values. Is the graph's y-shadow one interval, separate intervals, or isolated values?"

If unrelated again, use a two-choice prompt between "continuous band" and "separate values."

## Recovery Prompts
- "Range means which y-values?"
- "What is the lowest output?"
- "What is the highest output?"
- "Is that y-value included?"
- "Does the graph continue upward or downward?"
- "Is there a missing y-value?"
- "Is there a filled point at the same y-value?"
- "Do we need union notation?"
- "Would braces be better for isolated output values?"

## Reflection Question
"Why does a horizontal line have range `{3}` but domain all real numbers?"

Strong reflection: "The x-values keep changing along the line, but the y-value is always 3."

## Transfer Question
"How is reading range from a graph similar to reading domain from a graph?"

Expected transfer: "The same endpoint, hole, arrow, and gap ideas apply, but domain reads horizontally and range reads vertically."

## Escalation Rules
- If domain-range reversals repeat, show Core Concept and Reading Range.
- If endpoint errors repeat, show Endpoint Inclusion.
- If horizontal-line or parabola errors repeat, show Common Graph Families.
- If holes or asymptotes are misread, show Holes and Asymptotes in Range.
- If filled replacement values are missed, show Holes With Replacement Values.
- If union notation fails, show Multiple Range Bands.
- If the player reads five mixed graph ranges correctly, advance to independent practice.

## Exit Condition
The Socratic sequence is complete when the player:

1. Reads range using y-values.
2. Applies endpoint notation correctly.
3. Uses arrows for unbounded output values.
4. Handles common graph families.
5. Handles holes, asymptotes, and replacement points.
6. Uses set or union notation when needed.
7. Includes context units when appropriate.

# Knowledge Graph

- Prerequisites: Phase 014 function notation; Phase 016 domain from graphs; coordinate plane; interval notation; endpoint symbols; graph family recognition
- Concepts Unlocked: graphical range; output intervals; vertical projection; range endpoint inclusion; horizontal-line range; parabola range; asymptotic range exclusions; discrete output sets; context ranges
- Related Concepts: function transformations; quadratic graphs; piecewise functions; rational asymptotes; inverse functions; modeling outputs
- Common Misconceptions: domain-range reversal; endpoint notation errors; horizontal line all-real range; parabola range as all real; hole ignored; replacement point ignored; vertical gap filled; graph window as range
- Remedial Phases: Phase 014 review; Phase 016 review; coordinate plane mini-lesson; interval notation mini-lesson; common graph families mini-lesson
- Follow-up Phases: Phase 018 - Function transformations; Phase 021 - Piecewise functions; Phase 026 - Quadratic graphs; Phase 034 - Rational restrictions and holes
- Transfer Topics: transformations; maxima and minima; graph restrictions; inverse functions; output modeling; rational asymptotes

# Validation Notes

## Structure Validation
- Includes all required Bibles and metadata sections.
- Contains exactly 20 template families, within the required 20-40 range.
- Each template includes example, answer, explanation, distractors, distractor rationale, randomization rules, validity constraints, metadata, variants, and mappings.
- Every template has six progressive hints.

## Math Validation
- T001: closed y-values -2 through 5 -> `[-2,5]`.
- T002: open y-values -2 and 5 -> `(-2,5)`.
- T003: closed low -3, open high 4 -> `[-3,4)`.
- T004: included minimum y=1 and upward continuation -> `[1,infinity)`.
- T005: open maximum y=4 and downward continuation -> `(-infinity,4)`.
- T006: nonhorizontal line with arrows -> all real range.
- T007: horizontal line y=3 -> range `{3}`.
- T008: upward parabola vertex y=-4 -> `[-4,infinity)`.
- T009: downward parabola vertex y=6 -> `(-infinity,6]`.
- T010: radical-style graph starts at y=0 and rises -> `[0,infinity)`.
- T011: reciprocal-style graph excludes horizontal asymptote y=0 -> `(-infinity,0) union (0,infinity)`.
- T012: no point at y=2 -> exclude 2.
- T013: filled point at y=2 restores output 2 -> all real range.
- T014: discrete y-values are `{0,2,5,6}`.
- T015: separate y-bands -> `[-4,-1] union [2,6]`.
- T016: context output interval 0 to 30 meters -> `[0,30]` meters.
- T017: open low -5, closed high 3 -> `(-5,3]`.
- T018: closed endpoints require `[-2,5]`.
- T019: `[-1,4) union {6}` requires included y=-1, excluded y=4, filled output y=6.
- T020: output bands `[-3,2)` and `[5,infinity)` with y=8 removed -> `[-3,2) union [5,8) union (8,infinity)`.

## Distractor Validation
- Distractors reflect domain-range reversal, endpoint errors, graph-family confusion, hole/asymptote errors, filled-point omissions, gap filling, and set/interval notation mistakes.
- Multiple-choice-style templates have exactly one correct answer.
- Visual descriptions specify enough vertical information to determine range unambiguously.

## Hint Validation
- Each hint sequence moves from identifying y-values to endpoint, arrow, hole, asymptote, graph-family, discrete, or context logic and ends with the full range.
- Boss and multi-band hints split output values into vertical components before union notation.

## Tutorial Validation
- Tutorial includes learning goal, why it matters, prerequisite check, core concept, range reading, endpoint inclusion, arrows, graph families, holes and asymptotes, filled replacement values, discrete graphs, multiple bands, context ranges, matching, reverse construction, common mistakes, guided practice, independent practice, mastery check, adaptive messages, and metadata.

## Socratic Validation
- Dialogue includes diagnostic, guided discovery, correct branch, partial branch, misconception branch, horizontal-line branch, parabola branch, hole branch, filled hole branch, unsure branch, unrelated branch, recovery prompts, reflection, transfer, escalation rules, and exit condition.
- Tutor repeatedly redirects attention to y-values and output meaning.

## Metadata Validation
- Every template includes IDs, difficulty, timing, visual flag, compatibility flags, prerequisites, misconception tags, randomization constraints, and support-system mappings.

## Known Issues
- The repository specifications differ on the label for Hint 4. This phase uses "Guided Next Step" to match the master prompt language.
- `PHASE_TEMPLATE.md` omits Common Misconceptions from the Knowledge Graph section, but this phase includes it because the master prompt and knowledge graph guide require it.
