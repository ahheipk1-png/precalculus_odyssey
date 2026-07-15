# Phase 016 - Domain from Graphs

## Phase Metadata
- Course: Precalculus Odyssey Bible v5
- Topic: Domain from graphs
- Subtopic: Reading allowed input values from graph features
- Prerequisites: Phase 013 systems by graphing, Phase 014 function notation, Phase 015 domain from formulas, coordinate plane, interval notation, open and closed endpoints
- Related phases: Phase 017 - Range from graphs; Phase 018 - Function transformations; Phase 021 - Piecewise functions; Phase 034 - Rational restrictions and holes
- Estimated phase size: 20 template families, 20 core examples, 120 progressive hints, 1 tutorial sequence, 1 Socratic dialogue system

## Learning Objectives
By the end of this phase, the player can:

1. Define graph domain as the set of x-values where the graph exists.
2. Read domain from closed and open endpoints.
3. Use arrows to decide whether a graph continues indefinitely.
4. Identify gaps, holes, and vertical asymptotes as excluded x-values.
5. Read domain from discrete points.
6. Combine multiple graph pieces into union notation.
7. Distinguish domain from range.
8. Avoid treating the visible graph window as the domain when arrows indicate continuation.
9. Interpret context graph domains, such as time intervals.
10. Write graph domains in interval notation or set notation.

## Prerequisite Review
- Domain uses x-values, not y-values.
- A closed dot includes the endpoint.
- An open dot excludes the endpoint.
- An arrow means the graph continues in that direction.
- A hole means the graph is missing that specific point.
- Union means the domain includes values from separate pieces.

## Core Concepts
- Scan the graph from left to right.
- Record every x-value where at least one point of the graph exists.
- Closed endpoints use brackets.
- Open endpoints use parentheses.
- Arrows use `-infinity` or `infinity`.
- Holes remove a single x-value if no filled point exists at the same x-value.
- Discrete graphs use a set of individual x-values.

## Common Misconceptions
- Reading y-values instead of x-values.
- Using parentheses for closed dots or brackets for open dots.
- Stopping at the graph window even when arrows continue.
- Ignoring holes.
- Removing an x-value with a hole even when another filled point exists at that same x-value.
- Treating separate pieces as one continuous interval.
- Confusing domain with range.
- Forgetting isolated points.

# Part I - Question Bible

## Template T001 - Closed interval graph
- Template ID: P016-T001
- Question Type: Graph interpretation
- Cognitive Skill: Read domain from two closed endpoints
- Difficulty: 2
- Estimated Time: 40 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Write the domain of a graph segment with included endpoints.
- Example Question: A graph segment begins at a closed dot with `x=-2` and ends at a closed dot with `x=5`. Find the domain.
- Answer: `[-2,5]`.
- Explanation: The graph exists for every x-value from -2 through 5, and both endpoints are included.
- Distractors: `(-2,5)`; `[-2,5)`; `[-2,infinity)`; `[-2,5]` as range.
- Distractor Rationale: Treats closed endpoints as open; excludes right endpoint; ignores ending point; confuses domain with range.
- Randomization Rules: Use finite graph segments with closed endpoints.
- Validity Constraints: Segment must include every x-value between endpoints.
- Metadata: phase_id=P016; prerequisites=[interval notation, closed dots]; misconception_tags=[endpoint error, ray confusion, domain-range confusion]; randomization_constraints=[closed endpoints].
- Graph/Visual Variant: Closed segment over an x-axis projection.
- Modeling Variant: Activity available from day -2 through day 5 in a game calendar.
- Reverse Variant: Draw a graph with domain `[-2,5]`.
- Equation Battle Variant: Not primary; visual domain reading.
- Multi-stage Boss Variant: Include both domain and endpoint explanation.
- Hint Mapping: H-P016-T001
- Tutorial Mapping: Tut-P016 sections Endpoints
- Socratic Mapping: Soc-P016 endpoint branch

## Template T002 - Open interval graph
- Template ID: P016-T002
- Question Type: Graph interpretation
- Cognitive Skill: Read domain from two open endpoints
- Difficulty: 2
- Estimated Time: 40 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Write the domain of a graph segment with excluded endpoints.
- Example Question: A graph segment runs between open dots at `x=-2` and `x=5`. Find the domain.
- Answer: `(-2,5)`.
- Explanation: The graph exists between -2 and 5, but neither endpoint is included because both dots are open.
- Distractors: `[-2,5]`; `(-2,5]`; `x=-2 or x=5`; all real numbers.
- Distractor Rationale: Includes open endpoints; includes one open endpoint; lists endpoints instead of interval; ignores finite segment.
- Randomization Rules: Use finite graph segments with open endpoints.
- Validity Constraints: No filled point may exist at either endpoint.
- Metadata: phase_id=P016; prerequisites=[open dots, interval notation]; misconception_tags=[endpoint error, boundary-only answer, all-real error]; randomization_constraints=[open endpoints].
- Graph/Visual Variant: Open circles at both ends of a curve segment.
- Modeling Variant: A challenge active after one time and before another time.
- Reverse Variant: Draw a graph with domain `(-2,5)`.
- Equation Battle Variant: Not primary.
- Multi-stage Boss Variant: Ask why endpoints are excluded.
- Hint Mapping: H-P016-T002
- Tutorial Mapping: Tut-P016 sections Endpoints
- Socratic Mapping: Soc-P016 open-endpoint branch

## Template T003 - Half-open interval graph
- Template ID: P016-T003
- Question Type: Graph interpretation
- Cognitive Skill: Read mixed endpoint inclusion
- Difficulty: 2
- Estimated Time: 45 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Write domain for a segment with one closed and one open endpoint.
- Example Question: A graph starts at a closed dot with `x=-3` and ends at an open dot with `x=4`. Find the domain.
- Answer: `[-3,4)`.
- Explanation: The graph includes `x=-3` but excludes `x=4`.
- Distractors: `(-3,4]`; `[-3,4]`; `(-3,4)`; `[4,-3)`
- Distractor Rationale: Reverses endpoint types; includes both endpoints; excludes both endpoints; reverses interval order.
- Randomization Rules: Use one open and one closed endpoint.
- Validity Constraints: Endpoint visuals must be clear.
- Metadata: phase_id=P016; prerequisites=[open and closed dots, interval notation]; misconception_tags=[endpoint reversal, interval order, endpoint error]; randomization_constraints=[mixed endpoints].
- Graph/Visual Variant: Segment with closed-left, open-right endpoint.
- Modeling Variant: Event starts at one time and ends just before another.
- Reverse Variant: Draw a graph with domain `[-3,4)`.
- Equation Battle Variant: Not primary.
- Multi-stage Boss Variant: Explain each endpoint separately.
- Hint Mapping: H-P016-T003
- Tutorial Mapping: Tut-P016 sections Endpoints
- Socratic Mapping: Soc-P016 half-open branch

## Template T004 - Ray with closed endpoint extending right
- Template ID: P016-T004
- Question Type: Graph interpretation
- Cognitive Skill: Use arrow to write infinite interval
- Difficulty: 2
- Estimated Time: 45 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Read domain from a ray continuing to the right.
- Example Question: A graph begins at a closed dot at `x=1` and has an arrow extending right forever. Find the domain.
- Answer: `[1,infinity)`.
- Explanation: The graph includes `x=1` and continues for every larger x-value.
- Distractors: `(1,infinity)`; `(-infinity,1]`; `[1,10]`; all real numbers.
- Distractor Rationale: Excludes closed endpoint; reverses arrow direction; mistakes visible window endpoint for domain endpoint; ignores starting point.
- Randomization Rules: Use closed endpoint rays extending right.
- Validity Constraints: Arrow must clearly indicate continuation.
- Metadata: phase_id=P016; prerequisites=[rays, infinity notation]; misconception_tags=[endpoint error, arrow direction, window error]; randomization_constraints=[right ray].
- Graph/Visual Variant: Closed dot plus right arrow.
- Modeling Variant: Square-root-style graph starting at a threshold.
- Reverse Variant: Draw a graph with domain `[1,infinity)`.
- Equation Battle Variant: Not primary.
- Multi-stage Boss Variant: Include arrow interpretation.
- Hint Mapping: H-P016-T004
- Tutorial Mapping: Tut-P016 sections Arrows and Infinity
- Socratic Mapping: Soc-P016 right-ray branch

## Template T005 - Ray with open endpoint extending left
- Template ID: P016-T005
- Question Type: Graph interpretation
- Cognitive Skill: Read left-infinite interval with open endpoint
- Difficulty: 2
- Estimated Time: 45 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Read domain from a ray continuing left.
- Example Question: A graph has an open dot at `x=4` and an arrow extending left forever. Find the domain.
- Answer: `(-infinity,4)`.
- Explanation: The graph includes x-values less than 4, but not `x=4` because the dot is open.
- Distractors: `(-infinity,4]`; `(4,infinity)`; `[4,infinity)`; all real numbers.
- Distractor Rationale: Includes open endpoint; reverses arrow direction; reverses direction and endpoint; ignores endpoint.
- Randomization Rules: Use open endpoint rays extending left.
- Validity Constraints: Arrow and open dot must be visible.
- Metadata: phase_id=P016; prerequisites=[open endpoints, infinity notation]; misconception_tags=[endpoint error, arrow direction, all-real error]; randomization_constraints=[left ray].
- Graph/Visual Variant: Left arrow plus open endpoint.
- Modeling Variant: Valid values below a strict cap.
- Reverse Variant: Draw a graph with domain `(-infinity,4)`.
- Equation Battle Variant: Not primary.
- Multi-stage Boss Variant: Ask for inequality and interval notation.
- Hint Mapping: H-P016-T005
- Tutorial Mapping: Tut-P016 sections Arrows and Infinity
- Socratic Mapping: Soc-P016 left-ray branch

## Template T006 - Arrows both directions
- Template ID: P016-T006
- Question Type: Graph interpretation
- Cognitive Skill: Recognize all-real domain from arrows
- Difficulty: 2
- Estimated Time: 35 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: State domain when graph continues left and right forever.
- Example Question: A line has arrows on both ends. Find the domain.
- Answer: All real numbers; interval `(-infinity, infinity)`.
- Explanation: The graph continues indefinitely to the left and right, so every real x-value is used.
- Distractors: visible window only; `[0,infinity)`; `(-infinity,0]`; the y-values shown.
- Distractor Rationale: Mistakes graph window for domain; invents one-sided restriction; reverses one-sided restriction; gives range instead.
- Randomization Rules: Use lines or curves with arrows both directions.
- Validity Constraints: No holes, gaps, or vertical restrictions should be present.
- Metadata: phase_id=P016; prerequisites=[arrows, graph window]; misconception_tags=[window error, domain-range confusion, one-sided restriction]; randomization_constraints=[two arrows].
- Graph/Visual Variant: Infinite line or polynomial-like curve.
- Modeling Variant: Abstract graph without context restriction.
- Reverse Variant: Draw any graph with all-real domain.
- Equation Battle Variant: Not primary.
- Multi-stage Boss Variant: Explain why graph window is not the domain.
- Hint Mapping: H-P016-T006
- Tutorial Mapping: Tut-P016 sections Arrows and Infinity
- Socratic Mapping: Soc-P016 all-real-graph branch

## Template T007 - Parabola domain
- Template ID: P016-T007
- Question Type: Graph interpretation
- Cognitive Skill: Recognize all-real domain from a U-shaped graph
- Difficulty: 2
- Estimated Time: 40 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: State the domain of a full parabola graph.
- Example Question: A full parabola opens upward and has arrows on both arms. Find the domain.
- Answer: `(-infinity, infinity)`.
- Explanation: Although the graph has a lowest y-value, it continues left and right forever, so every x-value is allowed.
- Distractors: `[0,infinity)`; `[vertex y, infinity)`; one point at the vertex; no solution.
- Distractor Rationale: Gives range-like answer; uses y-value instead of x-values; treats vertex as only input; confuses graph with equation solving.
- Randomization Rules: Use full parabolas with arrows on both branches.
- Validity Constraints: Arms must continue left and right.
- Metadata: phase_id=P016; prerequisites=[parabola shape, domain vs range]; misconception_tags=[range-domain confusion, vertex-only answer, window error]; randomization_constraints=[full parabola].
- Graph/Visual Variant: U-shaped curve with arrows.
- Modeling Variant: Projectile model without context may still all-real algebraically.
- Reverse Variant: Draw a parabola with all-real domain.
- Equation Battle Variant: Not primary.
- Multi-stage Boss Variant: Compare domain and range.
- Hint Mapping: H-P016-T007
- Tutorial Mapping: Tut-P016 sections Domain Versus Range
- Socratic Mapping: Soc-P016 parabola branch

## Template T008 - Square-root style graph
- Template ID: P016-T008
- Question Type: Graph interpretation
- Cognitive Skill: Read starting x-value and right continuation
- Difficulty: 2
- Estimated Time: 45 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Read domain of a graph that starts and continues right.
- Example Question: A curve starts at a closed dot at `x=2` and continues right with an arrow. Find the domain.
- Answer: `[2,infinity)`.
- Explanation: The graph includes x=2 and all larger x-values.
- Distractors: `(2,infinity)`; `(-infinity,2]`; `[0,infinity)`; all real numbers.
- Distractor Rationale: Excludes closed endpoint; reverses direction; uses y-start or origin; ignores left endpoint.
- Randomization Rules: Use square-root-like graphs with included starting point.
- Validity Constraints: Starting x-value must be clear.
- Metadata: phase_id=P016; prerequisites=[closed endpoints, arrows]; misconception_tags=[endpoint error, arrow direction, start-value confusion]; randomization_constraints=[closed start right].
- Graph/Visual Variant: Radical-shaped curve.
- Modeling Variant: Formula begins at a threshold.
- Reverse Variant: Draw a graph with domain `[2,infinity)`.
- Equation Battle Variant: Not primary.
- Multi-stage Boss Variant: Connect graph domain to formula domain.
- Hint Mapping: H-P016-T008
- Tutorial Mapping: Tut-P016 sections Radical-Style Graphs
- Socratic Mapping: Soc-P016 radical-graph branch

## Template T009 - Vertical asymptote exclusion
- Template ID: P016-T009
- Question Type: Graph interpretation
- Cognitive Skill: Exclude x-value where graph has vertical break
- Difficulty: 3
- Estimated Time: 55 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Read domain of a graph with a vertical asymptote.
- Example Question: A rational graph has branches on both sides of a dashed vertical line at `x=3` and no point at `x=3`. Find the domain.
- Answer: `x != 3`; interval `(-infinity,3) union (3,infinity)`.
- Explanation: The graph exists for x-values less than 3 and greater than 3, but not at the asymptote `x=3`.
- Distractors: all real numbers; `x=3`; `[3,infinity)`; `(-infinity,3] union [3,infinity)`
- Distractor Rationale: Ignores asymptote; gives excluded value only; misses left branch; includes forbidden x-value.
- Randomization Rules: Use vertical asymptotes at integer x-values.
- Validity Constraints: No filled point should exist at the asymptote x-value.
- Metadata: phase_id=P016; prerequisites=[vertical asymptotes, interval notation]; misconception_tags=[asymptote ignored, excluded-as-answer, endpoint inclusion error]; randomization_constraints=[single vertical asymptote].
- Graph/Visual Variant: Dashed vertical asymptote and two branches.
- Modeling Variant: Formula undefined at a forbidden state.
- Reverse Variant: Draw a graph with domain excluding 3.
- Equation Battle Variant: Optional formula-domain check.
- Multi-stage Boss Variant: Include asymptote explanation.
- Hint Mapping: H-P016-T009
- Tutorial Mapping: Tut-P016 sections Holes and Asymptotes
- Socratic Mapping: Soc-P016 asymptote branch

## Template T010 - Hole in an otherwise continuous graph
- Template ID: P016-T010
- Question Type: Graph interpretation
- Cognitive Skill: Exclude a single missing x-value
- Difficulty: 3
- Estimated Time: 55 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Read domain from a graph with a hole.
- Example Question: A curve continues left and right forever but has an open hole at `x=1` and no filled point at that same x-value. Find the domain.
- Answer: `x != 1`; interval `(-infinity,1) union (1,infinity)`.
- Explanation: The graph exists for all x-values except the missing point at x=1.
- Distractors: all real numbers; `x=1`; `(-infinity,1] union [1,infinity)`; `y != 1`
- Distractor Rationale: Ignores hole; gives excluded value only; includes the hole; excludes y-value instead of x-value.
- Randomization Rules: Use one open hole on an otherwise continuous graph.
- Validity Constraints: No filled point may be present at the same x-value.
- Metadata: phase_id=P016; prerequisites=[holes, open circles, interval notation]; misconception_tags=[hole ignored, x-y confusion, endpoint inclusion error]; randomization_constraints=[single hole].
- Graph/Visual Variant: Open circle on a curve.
- Modeling Variant: One missing input in a calibration table.
- Reverse Variant: Draw a graph with all real domain except 1.
- Equation Battle Variant: Optional rational-hole connection.
- Multi-stage Boss Variant: Ask whether a filled point at same x would change domain.
- Hint Mapping: H-P016-T010
- Tutorial Mapping: Tut-P016 sections Holes and Asymptotes
- Socratic Mapping: Soc-P016 hole branch

## Template T011 - Two disjoint closed pieces
- Template ID: P016-T011
- Question Type: Graph interpretation
- Cognitive Skill: Use union for separated graph pieces
- Difficulty: 3
- Estimated Time: 65 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Write domain as a union of intervals.
- Example Question: A graph has one closed segment from `x=-4` to `x=-1` and another closed segment from `x=2` to `x=6`. Find the domain.
- Answer: `[-4,-1] union [2,6]`.
- Explanation: The graph exists on both separate x-intervals, with endpoints included on each piece.
- Distractors: `[-4,6]`; `(-4,-1) union (2,6)`; `[-1,2]`; all real numbers.
- Distractor Rationale: Fills the gap; excludes closed endpoints; gives the gap instead of graph pieces; ignores finite pieces.
- Randomization Rules: Use two or more separated graph pieces.
- Validity Constraints: Gap between pieces must be visible.
- Metadata: phase_id=P016; prerequisites=[union notation, endpoints]; misconception_tags=[gap filled, endpoint error, gap-as-domain]; randomization_constraints=[disjoint closed intervals].
- Graph/Visual Variant: Two separate closed segments.
- Modeling Variant: Function active during two separate time windows.
- Reverse Variant: Draw a graph with domain `[-4,-1] union [2,6]`.
- Equation Battle Variant: Not primary.
- Multi-stage Boss Variant: Ask for each piece before union.
- Hint Mapping: H-P016-T011
- Tutorial Mapping: Tut-P016 sections Multiple Pieces
- Socratic Mapping: Soc-P016 disjoint branch

## Template T012 - Interval plus isolated point
- Template ID: P016-T012
- Question Type: Graph interpretation
- Cognitive Skill: Include isolated points in domain
- Difficulty: 4
- Estimated Time: 70 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Combine interval domains with isolated x-values.
- Example Question: A graph has a curve on `[-2,1)` and a separate filled point at `x=5`. Find the domain.
- Answer: `[-2,1) union {5}`.
- Explanation: The curve covers all x-values from -2 through just before 1. The filled point adds the isolated input `x=5`.
- Distractors: `[-2,5]`; `[-2,1)`; `[-2,1) union (5)`; `[-2,1] union {5}`
- Distractor Rationale: Fills the gap; forgets isolated point; uses interval notation incorrectly for a single point; includes open endpoint 1.
- Randomization Rules: Use one interval piece and one or more isolated filled points.
- Validity Constraints: Isolated point must be visibly filled.
- Metadata: phase_id=P016; prerequisites=[set notation, interval notation]; misconception_tags=[isolated point missed, gap filled, endpoint error]; randomization_constraints=[interval plus point].
- Graph/Visual Variant: Curve plus separate dot.
- Modeling Variant: Continuous availability plus one special bonus day.
- Reverse Variant: Draw a graph with domain `[-2,1) union {5}`.
- Equation Battle Variant: Not primary.
- Multi-stage Boss Variant: Ask for interval piece and point separately.
- Hint Mapping: H-P016-T012
- Tutorial Mapping: Tut-P016 sections Isolated Points
- Socratic Mapping: Soc-P016 isolated-point branch

## Template T013 - Discrete graph domain
- Template ID: P016-T013
- Question Type: Graph interpretation
- Cognitive Skill: List x-values of plotted points
- Difficulty: 2
- Estimated Time: 45 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Read domain from a set of discrete points.
- Example Question: A discrete graph has filled points at `(-3,2)`, `(-1,5)`, `(2,0)`, and `(4,6)`. Find the domain.
- Answer: `{-3,-1,2,4}`.
- Explanation: Domain uses the x-values of the plotted points: -3, -1, 2, and 4.
- Distractors: `{2,5,0,6}`; `{(-3,2),(-1,5),(2,0),(4,6)}`; `[-3,4]`; all real numbers.
- Distractor Rationale: Gives range values; lists points instead of domain; fills gaps between discrete points; ignores discreteness.
- Randomization Rules: Use 3 to 6 discrete points.
- Validity Constraints: Points should have distinct x-values unless teaching duplicate-output ideas.
- Metadata: phase_id=P016; prerequisites=[ordered pairs, set notation]; misconception_tags=[range-domain confusion, points-vs-domain, continuous-fill error]; randomization_constraints=[discrete points].
- Graph/Visual Variant: Scatter plot with filled points.
- Modeling Variant: Discrete level rewards.
- Reverse Variant: Plot points with domain `{-3,-1,2,4}`.
- Equation Battle Variant: Not primary.
- Multi-stage Boss Variant: Ask for domain and range separately.
- Hint Mapping: H-P016-T013
- Tutorial Mapping: Tut-P016 sections Discrete Graphs
- Socratic Mapping: Soc-P016 discrete branch

## Template T014 - Context graph domain
- Template ID: P016-T014
- Question Type: Modeling interpretation
- Cognitive Skill: Read meaningful input interval from a context graph
- Difficulty: 3
- Estimated Time: 55 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Interpret domain of a graph in context.
- Example Question: A height-time graph for a quest starts at a closed point when `t=0` and ends at a closed point when `t=12`. What is the domain in context?
- Answer: `[0,12]` seconds.
- Explanation: The graph describes the quest from time 0 through time 12, including both endpoints.
- Distractors: all real numbers; `[height min, height max]`; `(0,12)`; `t >= 0`
- Distractor Rationale: Ignores context duration; gives range; excludes included endpoints; misses the ending time.
- Randomization Rules: Use time, distance, level, or age context graphs.
- Validity Constraints: Context units must be clear and endpoints visually stated.
- Metadata: phase_id=P016; prerequisites=[context interpretation, interval notation]; misconception_tags=[context ignored, range-domain confusion, endpoint error]; randomization_constraints=[finite context interval].
- Graph/Visual Variant: Labeled time axis and closed endpoints.
- Modeling Variant: This template is the modeling variant.
- Reverse Variant: Draw a context graph with domain `[0,12]`.
- Equation Battle Variant: Not primary.
- Multi-stage Boss Variant: Include units in the answer.
- Hint Mapping: H-P016-T014
- Tutorial Mapping: Tut-P016 sections Context Graphs
- Socratic Mapping: Soc-P016 context branch

## Template T015 - Hole with filled point same x-value
- Template ID: P016-T015
- Question Type: Graph interpretation
- Cognitive Skill: Decide whether a hole removes an x-value
- Difficulty: 4
- Estimated Time: 75 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Recognize that a filled point at the same x-value keeps that x-value in the domain.
- Example Question: A graph has an open hole on a curve at `x=2`, but also a filled point elsewhere on the graph with `x=2`. The graph continues for all x-values. Find the domain.
- Answer: All real numbers; `(-infinity, infinity)`.
- Explanation: Domain asks whether any point exists at each x-value. Since there is a filled point with `x=2`, the input 2 is included even though the curve has a hole there.
- Distractors: `x != 2`; `{2}`; `(-infinity,2) union (2,infinity)`; no real numbers.
- Distractor Rationale: Removes x=2 despite filled point; gives only the repaired input; excludes x=2; overreacts to hole.
- Randomization Rules: Use removable-hole graphs with a filled replacement point at the same x-value.
- Validity Constraints: Filled replacement point must share the same x-coordinate.
- Metadata: phase_id=P016; prerequisites=[holes, domain definition]; misconception_tags=[hole overgeneralization, point missed, x-value existence]; randomization_constraints=[hole plus filled point].
- Graph/Visual Variant: Open circle and filled dot vertically aligned.
- Modeling Variant: Rule is redefined at one input.
- Reverse Variant: Draw a graph that has a hole but still includes x=2.
- Equation Battle Variant: Optional piecewise/redefined function connection.
- Multi-stage Boss Variant: Ask whether any point exists at x=2.
- Hint Mapping: H-P016-T015
- Tutorial Mapping: Tut-P016 sections Holes and Filled Points
- Socratic Mapping: Soc-P016 filled-hole branch

## Template T016 - Match interval notation to graph
- Template ID: P016-T016
- Question Type: Matching
- Cognitive Skill: Choose correct domain interval from endpoint visuals
- Difficulty: 3
- Estimated Time: 60 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Match a graph to its interval-notation domain.
- Example Question: Which domain matches a graph with an open dot at `x=-5`, a continuous curve to a closed dot at `x=3`, and no arrows?
- Answer: `(-5,3]`.
- Explanation: The left endpoint is excluded and the right endpoint is included.
- Distractors: `[-5,3]`; `(-5,3)`; `[-5,3)`; `(-infinity,3]`
- Distractor Rationale: Includes open endpoint; excludes closed endpoint; reverses endpoint types; adds an arrow that is not present.
- Randomization Rules: Present graphs and interval choices with close endpoint variants.
- Validity Constraints: Exactly one interval should match.
- Metadata: phase_id=P016; prerequisites=[interval notation, endpoint reading]; misconception_tags=[endpoint error, arrow confusion, matching error]; randomization_constraints=[endpoint choices].
- Graph/Visual Variant: Multiple-choice interval cards.
- Modeling Variant: Pick the valid input interval from a context graph.
- Reverse Variant: Given interval notation, choose the matching graph.
- Equation Battle Variant: Not primary.
- Multi-stage Boss Variant: Explain endpoint symbols.
- Hint Mapping: H-P016-T016
- Tutorial Mapping: Tut-P016 sections Matching Graphs and Domains
- Socratic Mapping: Soc-P016 matching branch

## Template T017 - Error analysis: endpoint notation
- Template ID: P016-T017
- Question Type: Error analysis
- Cognitive Skill: Correct bracket/parenthesis endpoint mistake
- Difficulty: 3
- Estimated Time: 65 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Diagnose a domain notation error from endpoint types.
- Example Question: A graph has closed endpoints at `x=-2` and `x=5`. A student writes the domain as `(-2,5)`. What is the mistake?
- Answer: Closed endpoints should use brackets. Correct domain: `[-2,5]`.
- Explanation: The filled dots mean both endpoint x-values are included.
- Distractors: Correct domain is `(-2,5]`; correct domain is `[-2,5)`; student is correct; domain is `{ -2, 5 }`.
- Distractor Rationale: Fixes only one endpoint; fixes the other endpoint only; accepts endpoint error; lists only boundaries.
- Randomization Rules: Use student interval answers with wrong endpoint symbols.
- Validity Constraints: Graph endpoint types must be visually clear.
- Metadata: phase_id=P016; prerequisites=[open and closed endpoint notation]; misconception_tags=[endpoint notation, boundary-only answer, error diagnosis]; randomization_constraints=[endpoint error].
- Graph/Visual Variant: Segment with filled endpoints and incorrect interval label.
- Modeling Variant: Correct a schedule interval with included endpoints.
- Reverse Variant: Create a graph where the student's interval would be correct.
- Equation Battle Variant: Not primary.
- Multi-stage Boss Variant: Identify mistake, correct notation, explain.
- Hint Mapping: H-P016-T017
- Tutorial Mapping: Tut-P016 sections Common Mistakes
- Socratic Mapping: Soc-P016 error branch

## Template T018 - Window is not domain
- Template ID: P016-T018
- Question Type: Error-resistant graph interpretation
- Cognitive Skill: Use arrows instead of visible grid edges
- Difficulty: 3
- Estimated Time: 60 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Avoid mistaking graph window for domain.
- Example Question: A line is shown only from `x=-10` to `x=10` on the grid, but it has arrows on both ends. Find the domain.
- Answer: `(-infinity, infinity)`.
- Explanation: The arrows show the line continues beyond the visible window, so the domain is not limited to `[-10,10]`.
- Distractors: `[-10,10]`; `(-10,10)`; `[0,10]`; no solution.
- Distractor Rationale: Uses window edges as endpoints; excludes visible edges; reads only right side; ignores arrows.
- Randomization Rules: Use graphs clipped by a grid window but marked with arrows.
- Validity Constraints: Arrows must be visible at graph boundaries.
- Metadata: phase_id=P016; prerequisites=[arrows, graph window]; misconception_tags=[window error, endpoint error, arrow ignored]; randomization_constraints=[visible window].
- Graph/Visual Variant: Infinite line clipped by coordinate grid.
- Modeling Variant: Abstract function graph shown in a viewport.
- Reverse Variant: Draw a graph where the visible window is not the domain.
- Equation Battle Variant: Not primary.
- Multi-stage Boss Variant: Compare visible interval and true domain.
- Hint Mapping: H-P016-T018
- Tutorial Mapping: Tut-P016 sections Window Versus Domain
- Socratic Mapping: Soc-P016 window branch

## Template T019 - Reverse-build a graph from domain
- Template ID: P016-T019
- Question Type: Reverse construction
- Cognitive Skill: Draw graph features matching a domain
- Difficulty: 4
- Estimated Time: 90 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Create a graph with a specified domain.
- Example Question: Draw or describe a graph with domain `[-1,4) union {6}`.
- Answer: One valid graph is any curve segment from a closed point at `x=-1` to an open point at `x=4`, plus a filled isolated point at `x=6`.
- Explanation: The segment covers all x-values from -1 through just before 4, and the filled point adds the single input 6.
- Distractors: segment from open `x=-1` to closed `x=4`; filled segment `[-1,6]`; only a point at 6; segment `[-1,4]` plus open point at 6.
- Distractor Rationale: Reverses endpoint inclusion; fills gap; misses interval; includes 4 and excludes 6.
- Randomization Rules: Provide mixed interval and point domains.
- Validity Constraints: Graph description must match every included and excluded x-value.
- Metadata: phase_id=P016; prerequisites=[interval notation, graph construction]; misconception_tags=[endpoint reversal, gap filled, isolated point missed]; randomization_constraints=[reverse domain].
- Graph/Visual Variant: Student creates or chooses matching graph.
- Modeling Variant: Schedule graph with one isolated event.
- Reverse Variant: This template is the reverse variant.
- Equation Battle Variant: Not primary.
- Multi-stage Boss Variant: Describe endpoints, gap, and isolated point.
- Hint Mapping: H-P016-T019
- Tutorial Mapping: Tut-P016 sections Reverse Construction
- Socratic Mapping: Soc-P016 reverse branch

## Template T020 - Boss graph domain challenge
- Template ID: P016-T020
- Question Type: Multi-stage boss
- Cognitive Skill: Combine intervals, holes, rays, and endpoint rules
- Difficulty: 5
- Estimated Time: 140 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Read a complex graph domain with multiple pieces and an excluded hole.
- Example Question: Boss Gate: A graph has a closed point at `x=-4`, continues to an open point at `x=1`, has a gap until a closed point at `x=3`, then continues right forever with an arrow, except for an open hole at `x=5` and no filled point at `x=5`. Find the domain.
- Answer: `[-4,1) union [3,5) union (5,infinity)`.
- Explanation: The first piece includes -4 and excludes 1. The second piece starts at included 3 and continues right, but the hole removes x=5.
- Distractors: `[-4,1] union [3,infinity)`; `[-4,1) union [3,infinity)`; `[-4,5) union (5,infinity)`; `(-4,1) union (3,5) union (5,infinity)`
- Distractor Rationale: Includes open endpoint 1 and hole 5; misses the hole at 5; fills the gap from 1 to 3; excludes closed endpoints -4 and 3.
- Randomization Rules: Use a graph with at least two pieces, mixed endpoints, an arrow, and one hole.
- Validity Constraints: Each feature must affect the x-values unambiguously.
- Metadata: phase_id=P016; prerequisites=[union notation, holes, endpoints, arrows]; misconception_tags=[endpoint error, hole ignored, gap filled, closed endpoint missed]; randomization_constraints=[complex graph domain].
- Graph/Visual Variant: Multi-piece graph with labeled x-values.
- Modeling Variant: Game availability graph with a missing input event.
- Reverse Variant: Build a graph for the boss domain.
- Equation Battle Variant: Not primary.
- Multi-stage Boss Variant: This is the phase boss template.
- Hint Mapping: H-P016-T020
- Tutorial Mapping: Tut-P016 sections Full Phase Review
- Socratic Mapping: Soc-P016 boss branch

# Part II - Hint Bible

## H-P016-T001
- Hint 1 - Gentle Nudge: Domain uses x-values.
- Hint 2 - Concept Reminder: Closed dots mean endpoints are included.
- Hint 3 - Focus Hint: The left x-value is -2 and the right x-value is 5.
- Hint 4 - Guided Next Step: Use brackets for both endpoints.
- Hint 5 - Nearly Complete: Write the interval from -2 to 5.
- Hint 6 - Full Solution: `[-2,5]`.

## H-P016-T002
- Hint 1 - Gentle Nudge: Check whether the endpoint dots are open or closed.
- Hint 2 - Concept Reminder: Open dots are not included.
- Hint 3 - Focus Hint: The graph exists between -2 and 5 only.
- Hint 4 - Guided Next Step: Use parentheses on both endpoints.
- Hint 5 - Nearly Complete: Do not include -2 or 5.
- Hint 6 - Full Solution: `(-2,5)`.

## H-P016-T003
- Hint 1 - Gentle Nudge: Read each endpoint separately.
- Hint 2 - Concept Reminder: Closed means bracket; open means parenthesis.
- Hint 3 - Focus Hint: `x=-3` is included and `x=4` is excluded.
- Hint 4 - Guided Next Step: Start with bracket at -3 and end with parenthesis at 4.
- Hint 5 - Nearly Complete: The interval runs left to right.
- Hint 6 - Full Solution: `[-3,4)`.

## H-P016-T004
- Hint 1 - Gentle Nudge: The arrow shows continuation.
- Hint 2 - Concept Reminder: A closed starting dot includes the starting x-value.
- Hint 3 - Focus Hint: The graph starts at x=1 and continues right.
- Hint 4 - Guided Next Step: Use `[1, infinity)`.
- Hint 5 - Nearly Complete: Infinity always uses a parenthesis.
- Hint 6 - Full Solution: `[1,infinity)`.

## H-P016-T005
- Hint 1 - Gentle Nudge: The graph extends left forever.
- Hint 2 - Concept Reminder: Left forever means `-infinity`.
- Hint 3 - Focus Hint: The endpoint at x=4 is open.
- Hint 4 - Guided Next Step: Use a parenthesis at 4.
- Hint 5 - Nearly Complete: The domain is all x-values less than 4.
- Hint 6 - Full Solution: `(-infinity,4)`.

## H-P016-T006
- Hint 1 - Gentle Nudge: Arrows on both ends mean the graph keeps going.
- Hint 2 - Concept Reminder: Domain asks how far the graph goes left and right.
- Hint 3 - Focus Hint: It continues forever in both x-directions.
- Hint 4 - Guided Next Step: Do not use the visible grid edges as endpoints.
- Hint 5 - Nearly Complete: Every real x-value is included.
- Hint 6 - Full Solution: `(-infinity, infinity)`.

## H-P016-T007
- Hint 1 - Gentle Nudge: Domain is about left-right spread.
- Hint 2 - Concept Reminder: A parabola's lowest point affects range, not domain.
- Hint 3 - Focus Hint: The arms continue left and right.
- Hint 4 - Guided Next Step: Every x-value appears somewhere on the graph.
- Hint 5 - Nearly Complete: Use all-real interval notation.
- Hint 6 - Full Solution: `(-infinity, infinity)`.

## H-P016-T008
- Hint 1 - Gentle Nudge: Find the leftmost x-value on the graph.
- Hint 2 - Concept Reminder: Closed dot means included.
- Hint 3 - Focus Hint: The graph starts at x=2.
- Hint 4 - Guided Next Step: The arrow continues to the right.
- Hint 5 - Nearly Complete: Use `[2,infinity)`.
- Hint 6 - Full Solution: `[2,infinity)`.

## H-P016-T009
- Hint 1 - Gentle Nudge: A vertical asymptote marks a missing x-value.
- Hint 2 - Concept Reminder: The graph has no point at x=3.
- Hint 3 - Focus Hint: It exists to the left and right of 3.
- Hint 4 - Guided Next Step: Exclude 3 from all real numbers.
- Hint 5 - Nearly Complete: Write two intervals split at 3.
- Hint 6 - Full Solution: `(-infinity,3) union (3,infinity)`.

## H-P016-T010
- Hint 1 - Gentle Nudge: A hole removes a point.
- Hint 2 - Concept Reminder: Domain cares about the hole's x-value.
- Hint 3 - Focus Hint: The missing x-value is 1.
- Hint 4 - Guided Next Step: No filled point restores x=1.
- Hint 5 - Nearly Complete: Exclude 1 from all real numbers.
- Hint 6 - Full Solution: `(-infinity,1) union (1,infinity)`.

## H-P016-T011
- Hint 1 - Gentle Nudge: There are two separate graph pieces.
- Hint 2 - Concept Reminder: Use union for separated domain intervals.
- Hint 3 - Focus Hint: First piece: `[-4,-1]`.
- Hint 4 - Guided Next Step: Second piece: `[2,6]`.
- Hint 5 - Nearly Complete: Do not fill the gap from -1 to 2.
- Hint 6 - Full Solution: `[-4,-1] union [2,6]`.

## H-P016-T012
- Hint 1 - Gentle Nudge: Do not forget the isolated point.
- Hint 2 - Concept Reminder: A filled isolated point contributes its x-value to the domain.
- Hint 3 - Focus Hint: The interval piece is `[-2,1)`.
- Hint 4 - Guided Next Step: The isolated input is `5`.
- Hint 5 - Nearly Complete: Use braces for a single isolated value.
- Hint 6 - Full Solution: `[-2,1) union {5}`.

## H-P016-T013
- Hint 1 - Gentle Nudge: Domain is the list of x-coordinates.
- Hint 2 - Concept Reminder: Ignore y-values for domain.
- Hint 3 - Focus Hint: The x-values are -3, -1, 2, and 4.
- Hint 4 - Guided Next Step: Use set notation because the graph is discrete.
- Hint 5 - Nearly Complete: Do not fill the spaces between points.
- Hint 6 - Full Solution: `{-3,-1,2,4}`.

## H-P016-T014
- Hint 1 - Gentle Nudge: In a time graph, domain is time.
- Hint 2 - Concept Reminder: The graph starts at t=0 and ends at t=12.
- Hint 3 - Focus Hint: Both endpoints are closed.
- Hint 4 - Guided Next Step: Use brackets for 0 and 12.
- Hint 5 - Nearly Complete: Include units.
- Hint 6 - Full Solution: `[0,12]` seconds.

## H-P016-T015
- Hint 1 - Gentle Nudge: Ask whether any point exists at x=2.
- Hint 2 - Concept Reminder: Domain only needs at least one point for that x-value.
- Hint 3 - Focus Hint: There is a filled point at x=2.
- Hint 4 - Guided Next Step: That filled point keeps x=2 in the domain.
- Hint 5 - Nearly Complete: No x-values are missing.
- Hint 6 - Full Solution: `(-infinity, infinity)`.

## H-P016-T016
- Hint 1 - Gentle Nudge: Translate endpoint dots into interval symbols.
- Hint 2 - Concept Reminder: Open at -5 means parenthesis.
- Hint 3 - Focus Hint: Closed at 3 means bracket.
- Hint 4 - Guided Next Step: The graph covers x-values between them.
- Hint 5 - Nearly Complete: Use `(-5,3]`.
- Hint 6 - Full Solution: `(-5,3]`.

## H-P016-T017
- Hint 1 - Gentle Nudge: The student's endpoint symbols do not match the graph.
- Hint 2 - Concept Reminder: Closed dots use brackets.
- Hint 3 - Focus Hint: Both endpoints are closed.
- Hint 4 - Guided Next Step: Replace parentheses with brackets.
- Hint 5 - Nearly Complete: Keep the same endpoint values.
- Hint 6 - Full Solution: Mistake: endpoint notation. Correct domain: `[-2,5]`.

## H-P016-T018
- Hint 1 - Gentle Nudge: Look for arrows.
- Hint 2 - Concept Reminder: Arrows mean continuation beyond the visible grid.
- Hint 3 - Focus Hint: The graph does not really stop at x=-10 or x=10.
- Hint 4 - Guided Next Step: Since it continues both directions, use infinities.
- Hint 5 - Nearly Complete: Every real x-value is included.
- Hint 6 - Full Solution: `(-infinity, infinity)`.

## H-P016-T019
- Hint 1 - Gentle Nudge: Build each part of the domain separately.
- Hint 2 - Concept Reminder: `[-1,4)` means closed at -1 and open at 4.
- Hint 3 - Focus Hint: `{6}` means one filled point with x=6.
- Hint 4 - Guided Next Step: Leave a gap between 4 and 6.
- Hint 5 - Nearly Complete: The y-values can be many choices; domain controls x-values.
- Hint 6 - Full Solution: A closed-to-open segment from x=-1 to x=4 plus a filled point at x=6.

## H-P016-T020
- Hint 1 - Gentle Nudge: Break the graph into pieces.
- Hint 2 - Concept Reminder: First piece: closed at -4, open at 1.
- Hint 3 - Focus Hint: That gives `[-4,1)`.
- Hint 4 - Guided Next Step: Second piece starts closed at 3 and continues right.
- Hint 5 - Nearly Complete: Remove the hole at x=5.
- Hint 6 - Full Solution: `[-4,1) union [3,5) union (5,infinity)`.

# Part III - Tutorial Bible

## Learning Goal
Learn to find the domain of a function from its graph by reading where the graph exists along the x-axis.

## Why It Matters
Graphs reveal allowed inputs visually. Endpoints, holes, arrows, and gaps show the same domain ideas that formulas express with algebra. This helps players connect symbolic restrictions to visual behavior and prepares them for range, transformations, piecewise functions, rational holes, and asymptotes.

## Prerequisite Check
Ask the player:

1. Does domain use x-values or y-values? Expected: x-values.
2. What does a closed dot mean? Expected: included.
3. What does an open dot mean? Expected: excluded.
4. What does an arrow mean on a graph? Expected: the graph continues.
5. What does union mean? Expected: combine separate pieces.

## Core Concept
The domain of a graph is the set of all x-values where the graph has at least one point.

To find it:

1. Scan left to right.
2. Identify where the graph starts and stops.
3. Check endpoint types.
4. Look for arrows, holes, gaps, and isolated points.
5. Write the x-values in interval or set notation.

## Endpoints
Closed dots include endpoint x-values.

Open dots exclude endpoint x-values.

Examples:

- Closed segment from `x=-2` to `x=5`: `[-2,5]`
- Open segment from `x=-2` to `x=5`: `(-2,5)`
- Closed at `-3`, open at `4`: `[-3,4)`

## Arrows and Infinity
An arrow means the graph continues forever in that direction.

- Closed dot at `x=1`, arrow right: `[1,infinity)`
- Open dot at `x=4`, arrow left: `(-infinity,4)`
- Arrows on both ends: `(-infinity, infinity)`

Do not use the edge of the graph window as an endpoint when arrows are shown.

## Domain Versus Range
Domain uses x-values.

Range uses y-values.

A parabola with arrows on both arms may have a lowest y-value, but its domain is still all real numbers because it continues left and right.

## Radical-Style Graphs
A square-root-style graph often begins at a starting x-value and continues right.

If it starts with a closed dot at `x=2` and continues right, the domain is `[2,infinity)`.

## Holes and Asymptotes
A hole removes a point if no filled point exists at the same x-value.

A vertical asymptote often removes an x-value.

Examples:

- Hole at `x=1`: domain excludes 1.
- Vertical asymptote at `x=3`: domain excludes 3.

## Holes and Filled Points
If a graph has a hole at x=2 but also has a filled point at x=2, then x=2 is in the domain.

Domain asks whether any point exists at that x-value, not whether every visual branch has a point there.

## Multiple Pieces
Separate graph pieces require union notation.

Example:

Closed segment from `x=-4` to `x=-1` and closed segment from `x=2` to `x=6`:

`[-4,-1] union [2,6]`

Do not fill the gap between pieces.

## Isolated Points
Discrete points contribute their x-values.

For points `(-3,2)`, `(-1,5)`, `(2,0)`, and `(4,6)`, the domain is:

`{-3,-1,2,4}`

## Context Graphs
In context, the x-axis usually has units.

If a height-time graph starts at `t=0` and ends at `t=12`, the domain is `[0,12]` seconds.

Include units when helpful.

## Window Versus Domain
A graph may be displayed only inside a viewing window.

If arrows show the graph continues beyond the visible window, the domain extends beyond what is currently shown.

Window edges are not endpoints unless the graph actually stops there.

## Matching Graphs and Domains
To match a graph to interval notation:

1. Identify leftmost and rightmost x-values.
2. Check open or closed endpoint symbols.
3. Check for arrows.
4. Check for holes and gaps.
5. Use union if there are separate pieces.

## Reverse Construction
To draw a graph with domain `[-1,4) union {6}`:

1. Draw any segment or curve from a closed point at x=-1 to an open point at x=4.
2. Leave a gap.
3. Add a filled point at x=6.

The y-values can vary; the domain controls only x-values.

## Common Mistakes
- Mistake: Reading y-values.
  Correction: Project graph points onto the x-axis.
- Mistake: Using graph window edges as endpoints.
  Correction: Look for arrows.
- Mistake: Filling gaps between pieces.
  Correction: Use union notation.
- Mistake: Ignoring isolated points.
  Correction: Add their x-values with braces.
- Mistake: Excluding a hole x-value even when a filled point exists there.
  Correction: Domain includes any x-value with at least one filled point.
- Mistake: Reversing endpoint symbols.
  Correction: Closed means bracket; open means parenthesis.

## Guided Practice
1. A graph runs from a closed point at `x=-1` to an open point at `x=4`.
   - Domain: `[-1,4)`.

2. A graph has a vertical asymptote at `x=2` and branches on both sides.
   - Domain: `(-infinity,2) union (2,infinity)`.

3. A graph has points `(-2,5)`, `(0,1)`, and `(3,4)`.
   - Domain: `{-2,0,3}`.

## Independent Practice
1. Closed segment from `x=0` to `x=7`; answer `[0,7]`.
2. Open segment from `x=-3` to `x=2`; answer `(-3,2)`.
3. Closed dot at `x=-4`, arrow right; answer `[-4,infinity)`.
4. Arrows both directions with a hole at `x=6`; answer `(-infinity,6) union (6,infinity)`.
5. Points at x-values `-1`, `2`, and `5`; answer `{-1,2,5}`.
6. Pieces `[-5,-2)` and `(1,4]`; answer `[-5,-2) union (1,4]`.

## Mastery Check
The player is ready to advance when they can:

1. Use x-values only for domain.
2. Interpret open and closed endpoints.
3. Use arrows to include infinity.
4. Exclude holes or asymptotes correctly.
5. Include filled points and isolated points.
6. Use union for separate pieces.
7. Avoid graph-window traps.

Mastery check set:

1. Closed segment from `x=-3` to `x=2`; domain `[-3,2]`.
2. Open left endpoint at `x=1`, arrow right; domain `(1,infinity)`.
3. Branches on both sides of asymptote `x=-4`; domain `(-infinity,-4) union (-4,infinity)`.
4. Discrete points with x-values `0`, `3`, `8`; domain `{0,3,8}`.
5. Piece `[-2,0)` plus ray `[5,infinity)`; domain `[-2,0) union [5,infinity)`.

## Adaptive Tutor Messages
- If the player gives y-values: "Domain is the graph's x-shadow, not its height."
- If endpoint symbols are wrong: "Open dots use parentheses; closed dots use brackets."
- If arrows are ignored: "The graph continues beyond the window in the arrow direction."
- If a gap is filled: "The graph has no points over that gap, so use separate intervals."
- If isolated points are missed: "A single filled point still adds its x-value to the domain."
- If holes are over-removed: "Check whether another filled point exists at the same x-value."
- If the player succeeds quickly: "You are ready to read range from graphs using the same visual logic vertically."

## Tutorial Metadata
- Tutorial ID: Tut-P016
- Estimated duration: 6 minutes
- Target player state: knows formula domain, graphing basics, and interval notation
- Unlock condition: available from any Phase 016 question
- Remediation trigger: two domain-range reversals, two endpoint-symbol errors, one graph-window error, or one repeated gap/hole error
- Advancement trigger: 80 percent accuracy on mixed endpoint, arrow, hole, asymptote, discrete, context, and multi-piece graph domains

# Part IV - Socratic Dialogue Bible

## Opening Diagnostic
Tutor: "When finding domain from a graph, do we look at x-values or y-values?"

Expected strong answer: "x-values."

## Guided Discovery
Tutor sequence:

1. "What is the leftmost x-value where the graph exists?"
2. "Is that endpoint open, closed, or an arrow?"
3. "What is the rightmost x-value where the graph exists?"
4. "Is that endpoint open, closed, or an arrow?"
5. "Are there holes or vertical asymptotes?"
6. "Are there gaps between pieces?"
7. "Are there isolated filled points?"
8. "Does any hole have a filled point at the same x-value?"
9. "Does the graph continue beyond the visible window?"
10. "How do we write the final domain in interval or set notation?"

## Correct Branch
Player: "Domain uses x-values."

Tutor: "Good. Scan the graph from left to right. Where does the graph first exist?"

If player identifies the first endpoint, ask whether it is included.

## Partial Understanding Branch
Player identifies endpoints but uses wrong interval symbols.

Tutor: "Look at the endpoint dots. Which one is open and which one is closed?"

Recovery target: Player matches parentheses and brackets correctly.

## Misconception Branch
Player gives the y-values.

Tutor: "Those describe vertical height. Domain is horizontal. If you project the graph onto the x-axis, what x-values are covered?"

Recovery target: Player switches to x-values.

## Hole Branch
Player ignores a hole.

Tutor: "At the hole's x-value, is there any filled point on the graph?"

If no filled point exists, prompt: "Then should that x-value be included?"

## Filled Hole Branch
Player excludes a hole x-value even with a filled point.

Tutor: "Domain only asks whether at least one point exists at that x-value. Is there a filled point at x=2?"

Recovery target: Player includes x=2.

## Window Branch
Player uses visible grid edges as endpoints.

Tutor: "Do the arrows show the graph stopping at the edge or continuing beyond it?"

Recovery target: Player uses infinity when arrows continue.

## Unsure Branch
Player: "I do not know where to start."

Tutor: "Place your finger on the far left of the graph and move right. Where do you first touch the graph?"

Then ask about endpoint type.

## Unrelated Response Branch
Player gives an unrelated answer.

Tutor: "Let's focus only on the x-axis. Does the graph cover x-values continuously, in separate pieces, or only at dots?"

If unrelated again, use a two-choice prompt between "continuous interval" and "separate points."

## Recovery Prompts
- "Domain means which x-values?"
- "Is the endpoint open or closed?"
- "Does an arrow continue forever?"
- "Is there a gap with no graph?"
- "Is that point filled or open?"
- "Does a hole remove the x-value, or is there another filled point at that x?"
- "Do we need union notation?"
- "Are you using the graph window as an endpoint?"
- "Would braces be better for isolated points?"

## Reflection Question
"Why can a single filled point change the domain even if the rest of the graph has a hole at that x-value?"

Strong reflection: "Domain asks if any output exists for that input. A filled point gives an output, so that x-value is included."

## Transfer Question
"How will reading domain from graphs help with reading range?"

Expected transfer: "Domain reads left to right using x-values; range will use the same endpoint, arrow, gap, and hole ideas vertically with y-values."

## Escalation Rules
- If endpoint errors repeat, show Endpoints.
- If arrow or window errors repeat, show Arrows and Infinity and Window Versus Domain.
- If domain-range reversals repeat, show Domain Versus Range.
- If holes or asymptotes are misread, show Holes and Asymptotes.
- If isolated points are missed, show Isolated Points.
- If union notation fails, show Multiple Pieces.
- If the player reads five mixed graph domains correctly, advance to independent practice.

## Exit Condition
The Socratic sequence is complete when the player:

1. Reads domain using x-values.
2. Applies open and closed endpoint notation correctly.
3. Uses infinity for arrows.
4. Handles holes, asymptotes, and filled replacement points.
5. Includes isolated points.
6. Uses union notation for separated pieces.
7. Avoids graph-window traps.

# Knowledge Graph

- Prerequisites: Phase 013 systems by graphing; Phase 014 function notation; Phase 015 domain from formulas; coordinate plane; interval notation; open and closed endpoints
- Concepts Unlocked: graphical domain; endpoint inclusion; arrow-based domains; hole and asymptote exclusions; discrete domains; multi-piece unions; context graph domains; graph-window interpretation
- Related Concepts: range from graphs; piecewise functions; rational holes and asymptotes; transformations; graph restrictions; context modeling
- Common Misconceptions: domain-range reversal; endpoint notation errors; graph window as domain; holes ignored; filled replacement point ignored; gap filled; isolated point missed; union notation omitted
- Remedial Phases: Phase 013 review; Phase 014 review; Phase 015 review; coordinate plane mini-lesson; interval notation mini-lesson
- Follow-up Phases: Phase 017 - Range from graphs; Phase 018 - Function transformations; Phase 021 - Piecewise functions; Phase 034 - Rational restrictions and holes
- Transfer Topics: range analysis; graph transformations; graph restrictions; discontinuities; piecewise graphs; context intervals

# Validation Notes

## Structure Validation
- Includes all required Bibles and metadata sections.
- Contains exactly 20 template families, within the required 20-40 range.
- Each template includes example, answer, explanation, distractors, distractor rationale, randomization rules, validity constraints, metadata, variants, and mappings.
- Every template has six progressive hints.

## Math Validation
- T001: closed endpoints -2 and 5 -> `[-2,5]`.
- T002: open endpoints -2 and 5 -> `(-2,5)`.
- T003: closed at -3, open at 4 -> `[-3,4)`.
- T004: closed x=1, arrow right -> `[1,infinity)`.
- T005: arrow left, open x=4 -> `(-infinity,4)`.
- T006: arrows both directions -> `(-infinity, infinity)`.
- T007: full parabola with arrows on both arms -> all real x-values.
- T008: closed start x=2, arrow right -> `[2,infinity)`.
- T009: vertical asymptote x=3 -> exclude 3.
- T010: hole at x=1 with no filled replacement -> exclude 1.
- T011: closed pieces from -4 to -1 and 2 to 6 -> `[-4,-1] union [2,6]`.
- T012: interval `[-2,1)` plus filled point x=5 -> `[-2,1) union {5}`.
- T013: discrete points give domain `{-3,-1,2,4}`.
- T014: context graph from t=0 to t=12 -> `[0,12]` seconds.
- T015: hole at x=2 plus filled point at x=2 -> x=2 included; all real domain.
- T016: open at -5, closed at 3 -> `(-5,3]`.
- T017: closed endpoints require brackets -> `[-2,5]`.
- T018: arrows both directions override visible window -> all real domain.
- T019: `[-1,4) union {6}` requires closed at -1, open at 4, filled point at 6.
- T020: first piece `[-4,1)`, second ray `[3,infinity)` with hole at 5 -> `[-4,1) union [3,5) union (5,infinity)`.

## Distractor Validation
- Distractors reflect endpoint errors, arrow-direction errors, graph-window traps, domain-range confusion, gap filling, hole ignoring, isolated-point omission, and set/interval notation mistakes.
- Multiple-choice-style templates have exactly one correct answer.
- Visual descriptions include enough information to determine endpoints and gaps unambiguously.

## Hint Validation
- Each hint sequence moves from identifying x-values to endpoint, arrow, hole, gap, or point logic and ends with the full domain.
- Boss and multi-piece hints split the graph into components before union notation.

## Tutorial Validation
- Tutorial includes learning goal, why it matters, prerequisite check, core concept, endpoints, arrows, domain versus range, radical-style graphs, holes and asymptotes, filled replacement points, multiple pieces, isolated points, context graphs, window versus domain, matching, reverse construction, common mistakes, guided practice, independent practice, mastery check, adaptive messages, and metadata.

## Socratic Validation
- Dialogue includes diagnostic, guided discovery, correct branch, partial branch, misconception branch, hole branch, filled hole branch, window branch, unsure branch, unrelated branch, recovery prompts, reflection, transfer, escalation rules, and exit condition.
- Tutor repeatedly directs attention to x-values and graph features.

## Metadata Validation
- Every template includes IDs, difficulty, timing, visual flag, compatibility flags, prerequisites, misconception tags, randomization constraints, and support-system mappings.

## Known Issues
- The repository specifications differ on the label for Hint 4. This phase uses "Guided Next Step" to match the master prompt language.
- `PHASE_TEMPLATE.md` omits Common Misconceptions from the Knowledge Graph section, but this phase includes it because the master prompt and knowledge graph guide require it.
