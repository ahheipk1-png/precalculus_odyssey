# Phase 005 - Linear Equation Modeling

## Phase Metadata
- Course: Precalculus Odyssey Bible v5
- Topic: Linear equation modeling
- Subtopic: Translating situations into linear equations, solving, and interpreting results
- Prerequisites: Phase 001 one-step linear equations, Phase 002 multi-step linear equations, Phase 003 variables on both sides, Phase 004 literal equations, reading variable definitions, unit interpretation
- Related phases: Phase 006 - Equation Battle fundamentals; Phase 007 - Linear inequalities; Phase 011 - Systems by substitution; Phase 013 - Systems by graphing; Phase 014 - Function notation
- Estimated phase size: 20 template families, 20 core examples, 120 progressive hints, 1 tutorial sequence, 1 Socratic dialogue system

## Learning Objectives
By the end of this phase, the player can:

1. Define a variable for an unknown quantity in a context.
2. Translate words, tables, simple graphs, and diagrams into linear equations.
3. Solve the equation using earlier algebra skills.
4. Interpret the solution with correct units.
5. Reject models that do not match the story even if they are algebraically solvable.
6. Check whether an answer is practical in context.
7. Distinguish fixed values, rates, totals, differences, and equal-value comparisons.

## Prerequisite Review
- Fixed amount plus rate times quantity has form `fixed + rate*x`.
- "Total" often becomes the right side of an equation.
- "Each" or "per" usually signals multiplication by the variable.
- "Is equal to," "the same as," or "costs the same" signals equality between expressions.
- The answer should be checked in the original story, not only in the equation.

## Core Concepts
- Modeling starts before solving: define the variable, identify quantities, write the relationship, then solve.
- The same numbers can produce different equations depending on the story.
- Units are part of the answer. `q = 7` is incomplete if the context asks for quests, weeks, meters, or coins.
- Some algebraic answers must be rejected or interpreted carefully if they do not fit the situation.

## Common Misconceptions
- Swapping fixed costs and rates.
- Reversing gain and loss.
- Treating "per" as addition instead of multiplication.
- Ignoring starting amounts.
- Solving correctly but answering the wrong quantity.
- Accepting negative or fractional answers when the context requires a whole nonnegative count.
- Matching equations by numbers alone instead of by meaning.
- Forgetting to check the result in the story.

# Part I - Question Bible

## Template T001 - Fixed cost plus per-item rate
- Template ID: P005-T001
- Question Type: Build the model
- Cognitive Skill: Identify fixed value and rate
- Difficulty: 2
- Estimated Time: 55 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Model `fixed + rate*x = total`.
- Example Question: A guild charges 12 coins to enter and 4 coins per quest. A player pays 40 coins total. Let `q` be the number of quests. Write and solve an equation.
- Answer: `12 + 4q = 40`; `q = 7` quests.
- Explanation: The fixed entry cost is 12. The variable cost is 4 coins per quest, so it is `4q`. Subtract 12 and divide by 4.
- Distractors: `4 + 12q = 40`, `q = 3`; `12q + 4 = 40`, `q = 3`; `4q = 40`, `q = 10`; `q = 28`
- Distractor Rationale: Swaps fixed and rate; ignores fixed fee; stops after subtracting fixed cost.
- Randomization Rules: Choose fixed fee `f`, rate `r`, integer quantity `q`, and total `T = f + rq`.
- Validity Constraints: Rate nonzero; quantity should be nonnegative integer for core versions.
- Metadata: phase_id=P005; prerequisites=[two-step equations, context translation]; misconception_tags=[swaps fixed and rate, ignores fixed cost, stops early]; randomization_constraints=[T=f+rq, q integer nonnegative].
- Graph/Visual Variant: Bar model with one fixed segment and repeated per-quest segments.
- Modeling Variant: This is the core fixed-plus-rate model.
- Reverse Variant: Write a story that matches `12 + 4q = 40`.
- Equation Battle Variant: Build model, then use `-12`, `/4`.
- Multi-stage Boss Variant: Identify fixed cost, identify rate, write equation, solve, interpret.
- Hint Mapping: H-P005-T001
- Tutorial Mapping: Tut-P005 sections Core Concept and Worked Example
- Socratic Mapping: Soc-P005 fixed-rate branch

## Template T002 - Starting amount plus gain
- Template ID: P005-T002
- Question Type: Build the model
- Cognitive Skill: Translate increase from starting value
- Difficulty: 1
- Estimated Time: 35 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Model an unknown starting value plus a known gain.
- Example Question: A player starts with `x` crystals, gains 15, and ends with 62. Write and solve an equation.
- Answer: `x + 15 = 62`; `x = 47` crystals.
- Explanation: Starting crystals plus gained crystals equals final crystals. Subtract 15 from both sides.
- Distractors: `x - 15 = 62`, `x = 77`; `15x = 62`; `x = 62`; `x = 15`
- Distractor Rationale: Reverses gain; treats gain as multiplier; copies final value; copies gain.
- Randomization Rules: Choose gain `g` and starting value `s`; final `F = s + g`.
- Validity Constraints: Use nonnegative counts for concrete objects.
- Metadata: phase_id=P005; prerequisites=[one-step addition equations]; misconception_tags=[gain-loss reversal, copies total, treats as multiplication]; randomization_constraints=[F=s+g].
- Graph/Visual Variant: Before-after bar model.
- Modeling Variant: Unknown start plus known change equals final.
- Reverse Variant: Write a gain story for `x + 15 = 62`.
- Equation Battle Variant: Action card `-15`.
- Multi-stage Boss Variant: Ask which quantity is unknown before solving.
- Hint Mapping: H-P005-T002
- Tutorial Mapping: Tut-P005 sections Start-Change-End
- Socratic Mapping: Soc-P005 start-change branch

## Template T003 - Starting amount minus loss
- Template ID: P005-T003
- Question Type: Build the model
- Cognitive Skill: Translate decrease from starting value
- Difficulty: 1
- Estimated Time: 35 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Model an unknown starting value minus a known loss.
- Example Question: A player starts with `c` coins, spends 18, and has 27 left. Write and solve an equation.
- Answer: `c - 18 = 27`; `c = 45` coins.
- Explanation: Starting coins minus spent coins equals coins left. Add 18 to both sides.
- Distractors: `c + 18 = 27`, `c = 9`; `18c = 27`; `c = 27`; `c = 18`
- Distractor Rationale: Reverses loss; treats loss as multiplier; copies remaining amount; copies spent amount.
- Randomization Rules: Choose loss `l` and starting value `s`; remaining `R = s - l`.
- Validity Constraints: Starting amount should be at least the loss for basic concrete counts.
- Metadata: phase_id=P005; prerequisites=[one-step subtraction equations]; misconception_tags=[gain-loss reversal, copies total, treats as multiplication]; randomization_constraints=[R=s-l, s>=l].
- Graph/Visual Variant: Bar model showing a removed segment.
- Modeling Variant: Unknown start minus known change equals final.
- Reverse Variant: Write a spending story for `c - 18 = 27`.
- Equation Battle Variant: Action card `+18`.
- Multi-stage Boss Variant: Include check: `45 - 18 = 27`.
- Hint Mapping: H-P005-T003
- Tutorial Mapping: Tut-P005 sections Start-Change-End
- Socratic Mapping: Soc-P005 start-change branch

## Template T004 - Repeated deposit toward a goal
- Template ID: P005-T004
- Question Type: Build the model
- Cognitive Skill: Model repeated equal change
- Difficulty: 2
- Estimated Time: 50 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Model starting amount plus repeated equal additions.
- Example Question: A character has 25 tokens and earns 6 tokens each week. After `w` weeks, the character has 91 tokens. Write and solve an equation.
- Answer: `25 + 6w = 91`; `w = 11` weeks.
- Explanation: Initial tokens plus 6 per week equals 91. Subtract 25, then divide by 6.
- Distractors: `6 + 25w = 91`; `25w + 6 = 91`; `6w = 91`; `w = 66`
- Distractor Rationale: Swaps rate and initial amount; ignores starting value; stops after subtracting.
- Randomization Rules: Choose initial `I`, weekly rate `r`, integer weeks `w`, and total `T = I + rw`.
- Validity Constraints: Rate positive; weeks nonnegative integer.
- Metadata: phase_id=P005; prerequisites=[two-step equations, fixed-rate modeling]; misconception_tags=[swaps fixed and rate, ignores starting value, stops early]; randomization_constraints=[T=I+rw].
- Graph/Visual Variant: Timeline with equal weekly jumps.
- Modeling Variant: Savings, experience points, or resource accumulation.
- Reverse Variant: Write a repeated-deposit story for `25 + 6w = 91`.
- Equation Battle Variant: Action sequence `-25`, `/6`.
- Multi-stage Boss Variant: Include unit interpretation for weeks.
- Hint Mapping: H-P005-T004
- Tutorial Mapping: Tut-P005 sections Fixed-Rate Models
- Socratic Mapping: Soc-P005 fixed-rate branch

## Template T005 - Equal-cost comparison
- Template ID: P005-T005
- Question Type: Build the model
- Cognitive Skill: Set two linear expressions equal
- Difficulty: 3
- Estimated Time: 65 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Model a comparison where two plans become equal.
- Example Question: Plan A costs 12 coins plus 3 coins per dungeon. Plan B costs 4 coins plus 5 coins per dungeon. For how many dungeons do the plans cost the same?
- Answer: `12 + 3d = 4 + 5d`; `d = 4` dungeons.
- Explanation: Set the two cost expressions equal. Subtract `3d`, subtract 4, then divide by 2.
- Distractors: `d = 8`; `d = 2`; `d = -4`; no solution
- Distractor Rationale: Compares fixed costs only; compares rates only; sign error; assumes different plans cannot match.
- Randomization Rules: Choose two fixed costs and two rates with different rates and nonnegative integer equality point.
- Validity Constraints: Rates must differ; equality point should be meaningful.
- Metadata: phase_id=P005; prerequisites=[variables on both sides, fixed-rate models]; misconception_tags=[compares only fixed values, compares only rates, sign error]; randomization_constraints=[different rates, integer equality point].
- Graph/Visual Variant: Two cost lines intersecting at `d = 4`.
- Modeling Variant: Plan comparison, subscription comparison, or route comparison.
- Reverse Variant: Write a plan-comparison story for `12 + 3d = 4 + 5d`.
- Equation Battle Variant: Build both sides, then collect variables and constants.
- Multi-stage Boss Variant: Include interpretation of the intersection.
- Hint Mapping: H-P005-T005
- Tutorial Mapping: Tut-P005 sections Equal Expressions
- Socratic Mapping: Soc-P005 comparison branch

## Template T006 - Break-even revenue and cost
- Template ID: P005-T006
- Question Type: Build the model
- Cognitive Skill: Revenue-cost equality
- Difficulty: 3
- Estimated Time: 65 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Model break-even as revenue equals cost.
- Example Question: A shop pays 80 coins in setup costs and 6 coins to make each charm. It sells each charm for 10 coins. How many charms must be sold to break even?
- Answer: `10u = 80 + 6u`; `u = 20` charms.
- Explanation: Revenue is `10u`; cost is `80 + 6u`. Break-even means revenue equals cost.
- Distractors: `u = 8`; `u = 5`; `u = 80`; no solution
- Distractor Rationale: Divides setup by price only; divides setup by cost only; copies setup; assumes costs prevent break-even.
- Randomization Rules: Choose setup `F`, unit cost `c`, price `p` with `p > c`; set `u = F/(p-c)` as integer.
- Validity Constraints: Price must exceed unit cost for positive break-even quantity.
- Metadata: phase_id=P005; prerequisites=[variables on both sides, rate comparison]; misconception_tags=[uses price only, ignores variable cost, no-solution misconception]; randomization_constraints=[p>c, F divisible by p-c].
- Graph/Visual Variant: Revenue and cost lines intersect.
- Modeling Variant: Business break-even, crafting, or resource production.
- Reverse Variant: Create a break-even story with equation `10u = 80 + 6u`.
- Equation Battle Variant: Action sequence `-6u`, `/4`.
- Multi-stage Boss Variant: Ask for both revenue and cost expressions before solving.
- Hint Mapping: H-P005-T006
- Tutorial Mapping: Tut-P005 sections Break-even Models
- Socratic Mapping: Soc-P005 break-even branch

## Template T007 - Base pay plus commission
- Template ID: P005-T007
- Question Type: Build the model
- Cognitive Skill: Interpret base plus per-sale amount
- Difficulty: 2
- Estimated Time: 55 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Model compensation with base pay and commission.
- Example Question: A merchant earns 150 coins plus 12 coins for each sale. If total pay is 390 coins, how many sales were made?
- Answer: `150 + 12s = 390`; `s = 20` sales.
- Explanation: Base pay is fixed; commission depends on the number of sales.
- Distractors: `12 + 150s = 390`; `12s = 390`; `s = 240`; `s = 32.5`
- Distractor Rationale: Swaps fixed and rate; ignores base pay; stops after subtracting; divides total by commission without removing base.
- Randomization Rules: Choose base `B`, commission `r`, integer sales `s`, total `T = B + rs`.
- Validity Constraints: Sales should be whole nonnegative number.
- Metadata: phase_id=P005; prerequisites=[fixed-rate models, two-step equations]; misconception_tags=[swaps fixed and rate, ignores base, stops early]; randomization_constraints=[T=B+rs, s integer].
- Graph/Visual Variant: Pay line with y-intercept as base pay.
- Modeling Variant: Salary, commission, bounty, or reward systems.
- Reverse Variant: Write a commission story for `150 + 12s = 390`.
- Equation Battle Variant: Cards `-150`, `/12`.
- Multi-stage Boss Variant: Ask for unit meaning: sales.
- Hint Mapping: H-P005-T007
- Tutorial Mapping: Tut-P005 sections Fixed-Rate Models
- Socratic Mapping: Soc-P005 fixed-rate branch

## Template T008 - Perimeter with related dimensions
- Template ID: P005-T008
- Question Type: Build the model
- Cognitive Skill: Define related quantities
- Difficulty: 4
- Estimated Time: 75 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Model geometry with one dimension written in terms of another.
- Example Question: A rectangle has length 5 more than its width. Its perimeter is 50. Let `w` be the width. Write and solve an equation, then find both dimensions.
- Answer: `2(w + 5) + 2w = 50`; `w = 10`, length `15`.
- Explanation: Length is `w + 5`. Perimeter is twice the length plus twice the width.
- Distractors: `w = 15`; `w = 20`; length `10`; equation `2w + 5 = 50`
- Distractor Rationale: Answers length as width; ignores doubling; swaps dimensions; omits full perimeter structure.
- Randomization Rules: Use rectangle relationships `L = w + k` or `L = mw`; choose values producing positive dimensions.
- Validity Constraints: Dimensions must be positive; perimeter must match generated dimensions.
- Metadata: phase_id=P005; prerequisites=[perimeter formula, distribution, multi-step equations]; misconception_tags=[uses wrong dimension, ignores doubling, incomplete formula]; randomization_constraints=[positive dimensions, valid perimeter].
- Graph/Visual Variant: Rectangle diagram with `w`, `w+5`, and perimeter labels.
- Modeling Variant: Geometry relationship model.
- Reverse Variant: Write a rectangle story matching `2(w+5)+2w=50`.
- Equation Battle Variant: Distribute/combine, then solve.
- Multi-stage Boss Variant: Require both width and length in final answer.
- Hint Mapping: H-P005-T008
- Tutorial Mapping: Tut-P005 sections Define Related Quantities
- Socratic Mapping: Soc-P005 geometry branch

## Template T009 - Consecutive integers
- Template ID: P005-T009
- Question Type: Build the model
- Cognitive Skill: Represent related unknowns
- Difficulty: 3
- Estimated Time: 60 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Use one variable to represent consecutive numbers.
- Example Question: The sum of two consecutive integers is 57. Let `n` be the smaller integer. Write and solve an equation.
- Answer: `n + (n + 1) = 57`; smaller integer `28`, larger integer `29`.
- Explanation: Consecutive integers differ by 1. Combine to get `2n + 1 = 57`, so `n = 28`.
- Distractors: `n = 29`; `n = 57`; `n = 28.5`; equation `n + 1 = 57`
- Distractor Rationale: Gives larger integer only; copies total; divides total by 2 without accounting for difference; omits one integer.
- Randomization Rules: Use sums of two or three consecutive integers with integer answers.
- Validity Constraints: Generated total must match the number of consecutive integers.
- Metadata: phase_id=P005; prerequisites=[combining like terms, related quantities]; misconception_tags=[answers wrong quantity, copies total, omits term]; randomization_constraints=[integer consecutive values].
- Graph/Visual Variant: Number line showing `n` and `n+1`.
- Modeling Variant: Consecutive integers or consecutive levels.
- Reverse Variant: Write a consecutive-integer problem for `n + (n+1) = 57`.
- Equation Battle Variant: Combine, subtract 1, divide by 2.
- Multi-stage Boss Variant: Ask for both integers, not just `n`.
- Hint Mapping: H-P005-T009
- Tutorial Mapping: Tut-P005 sections Define Related Quantities
- Socratic Mapping: Soc-P005 related-quantities branch

## Template T010 - Age relationship
- Template ID: P005-T010
- Question Type: Build the model
- Cognitive Skill: Translate comparative relationship
- Difficulty: 3
- Estimated Time: 65 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Model one quantity in terms of another using "more than twice" language.
- Example Question: Maya's age is 3 more than twice Leo's age. Together they are 33 years old. Let `L` be Leo's age. Find both ages.
- Answer: `L + (2L + 3) = 33`; Leo is 10, Maya is 23.
- Explanation: Maya is `2L + 3`. The sum equation is `3L + 3 = 33`, so `L = 10`.
- Distractors: Leo 15, Maya 18; Leo 12, Maya 21; Leo 10, Maya 20; equation `2(L+3)+L=33`
- Distractor Rationale: Splits total without relation; adds incorrectly; forgets the `+3`; doubles after adding 3.
- Randomization Rules: Use age or level comparisons like `older = k*younger + b`; choose positive integer ages.
- Validity Constraints: Ages must be positive and realistic for the story.
- Metadata: phase_id=P005; prerequisites=[related quantities, multi-step equations]; misconception_tags=[misreads more than twice, wrong quantity answer, missing constant]; randomization_constraints=[positive integer ages].
- Graph/Visual Variant: Bar model showing Leo's age and two copies plus 3 for Maya.
- Modeling Variant: Age, level, or rank comparisons.
- Reverse Variant: Write a story matching `L + (2L+3) = 33`.
- Equation Battle Variant: Combine, subtract 3, divide by 3.
- Multi-stage Boss Variant: Require interpreting both variables.
- Hint Mapping: H-P005-T010
- Tutorial Mapping: Tut-P005 sections Relationship Language
- Socratic Mapping: Soc-P005 relationship branch

## Template T011 - Distance with head start
- Template ID: P005-T011
- Question Type: Build the model
- Cognitive Skill: Model initial amount plus rate*time
- Difficulty: 3
- Estimated Time: 60 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Use `distance = start + rate*time` in a linear equation.
- Example Question: A scout is already 20 km from camp and rides away at 45 km/h. After `t` hours, the scout is 155 km from camp. Write and solve an equation.
- Answer: `20 + 45t = 155`; `t = 3` hours.
- Explanation: Starting distance plus distance traveled equals final distance.
- Distractors: `t = 155/45`; `t = 175/45`; `t = 20`; `t = 135`
- Distractor Rationale: Ignores head start; adds head start instead of subtracting; copies head start; stops after subtracting.
- Randomization Rules: Choose start `s`, rate `r`, time `t`, final `F = s + rt`.
- Validity Constraints: Rate positive and time nonnegative.
- Metadata: phase_id=P005; prerequisites=[rate-time-distance, fixed-rate models]; misconception_tags=[ignores start, wrong operation, stops early]; randomization_constraints=[F=s+rt].
- Graph/Visual Variant: Distance-time line with y-intercept 20 and slope 45.
- Modeling Variant: Travel, progress, or resource distance.
- Reverse Variant: Write a head-start distance story for `20 + 45t = 155`.
- Equation Battle Variant: Cards `-20`, `/45`.
- Multi-stage Boss Variant: Include unit check for hours.
- Hint Mapping: H-P005-T011
- Tutorial Mapping: Tut-P005 sections Rate Models
- Socratic Mapping: Soc-P005 rate branch

## Template T012 - Decimal rate context
- Template ID: P005-T012
- Question Type: Build the model
- Cognitive Skill: Model and solve decimal coefficients
- Difficulty: 3
- Estimated Time: 65 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve real-world linear models with decimal rates.
- Example Question: A taxi charges 4.50 coins plus 2.25 coins per mile. The total fare is 18.00 coins. How many miles were traveled?
- Answer: `4.50 + 2.25m = 18.00`; `m = 6` miles.
- Explanation: Subtract 4.50 to get `2.25m = 13.50`; divide by 2.25.
- Distractors: `m = 8`; `m = 5`; `m = 13.5`; `m = 4.5`
- Distractor Rationale: Divides total by rate; arithmetic slip; stops after subtracting; copies fixed fee.
- Randomization Rules: Use terminating decimal fixed fees and rates with clean decimal totals.
- Validity Constraints: Rate positive; answer should be reasonable for context.
- Metadata: phase_id=P005; prerequisites=[decimal arithmetic, fixed-rate models]; misconception_tags=[ignores fixed fee, decimal arithmetic error, stops early]; randomization_constraints=[terminating decimals, clean quotient].
- Graph/Visual Variant: Fare line with intercept and slope.
- Modeling Variant: Taxi fare, rental fee, or delivery charge.
- Reverse Variant: Write a decimal-rate story for `4.50 + 2.25m = 18.00`.
- Equation Battle Variant: Cards `-4.50`, `/2.25`.
- Multi-stage Boss Variant: Include money formatting and unit interpretation.
- Hint Mapping: H-P005-T012
- Tutorial Mapping: Tut-P005 sections Decimal Models
- Socratic Mapping: Soc-P005 decimal branch

## Template T013 - Mixture weighted amount
- Template ID: P005-T013
- Question Type: Build the model
- Cognitive Skill: Model weighted mixture linearly
- Difficulty: 5
- Estimated Time: 100 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Build a linear mixture equation using amount of ingredient.
- Example Question: A potion maker mixes `x` liters of 30% essence with 6 liters of 50% essence to make a 42% essence mixture. How many liters of 30% essence are needed?
- Answer: `0.30x + 0.50(6) = 0.42(x + 6)`; `x = 4` liters.
- Explanation: Essence amount before mixing equals essence amount after mixing. `0.30x + 3 = 0.42x + 2.52`, so `0.48 = 0.12x`, and `x = 4`.
- Distractors: `x = 6`; `x = 10`; `x = 2`; equation `0.30x + 0.50(6) = 0.42x`
- Distractor Rationale: Uses given liters; adds volumes only; arithmetic slip; forgets the final total volume `x + 6`.
- Randomization Rules: Choose two concentrations and final concentration between them; choose one known amount and generate clean unknown amount.
- Validity Constraints: Final concentration must lie between source concentrations; volumes positive.
- Metadata: phase_id=P005; prerequisites=[decimal equations, variables both sides]; misconception_tags=[forgets total mixture, uses volume not weighted amount, decimal error]; randomization_constraints=[concentration between sources, positive volume].
- Graph/Visual Variant: Mixture table with columns volume, concentration, essence amount.
- Modeling Variant: Potion, solution, alloy, or weighted average context.
- Reverse Variant: Write a mixture story matching `0.30x + 3 = 0.42(x+6)`.
- Equation Battle Variant: Distribute, collect variables, solve.
- Multi-stage Boss Variant: Require table setup before equation.
- Hint Mapping: H-P005-T013
- Tutorial Mapping: Tut-P005 sections Mixture Models
- Socratic Mapping: Soc-P005 mixture branch

## Template T014 - Average with missing value
- Template ID: P005-T014
- Question Type: Build the model
- Cognitive Skill: Model average as total divided by count
- Difficulty: 3
- Estimated Time: 65 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Use an average equation to solve for a missing value.
- Example Question: A player's three trial scores have an average of 90. The first two scores are 84 and 92. What is the third score?
- Answer: `(84 + 92 + x)/3 = 90`; `x = 94`.
- Explanation: Multiply by 3 to get `84 + 92 + x = 270`. Then `x = 94`.
- Distractors: `x = 90`; `x = 88`; `x = 270`; `x = 176`
- Distractor Rationale: Copies average; averages first two only; stops after multiplying; stops after adding known scores.
- Randomization Rules: Choose count, target average, known values, and generate missing value.
- Validity Constraints: Missing value should be plausible for the score scale.
- Metadata: phase_id=P005; prerequisites=[average formula, grouped fractions]; misconception_tags=[copies average, stops early, ignores known values]; randomization_constraints=[valid score range].
- Graph/Visual Variant: Three-score balance bar.
- Modeling Variant: Grades, trials, damage rolls, or performance scores.
- Reverse Variant: Write an average problem matching `(84+92+x)/3=90`.
- Equation Battle Variant: Cards `*3`, `-84`, `-92`.
- Multi-stage Boss Variant: Include check: average of 84, 92, 94 is 90.
- Hint Mapping: H-P005-T014
- Tutorial Mapping: Tut-P005 sections Average Models
- Socratic Mapping: Soc-P005 average branch

## Template T015 - Table to equation and solve
- Template ID: P005-T015
- Question Type: Table matching
- Cognitive Skill: Extract linear model from table
- Difficulty: 3
- Estimated Time: 70 seconds
- Visual Required: true
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Use a table's starting value and rate to form an equation.
- Example Question: A table shows Level 0: 18 XP, Level 1: 25 XP, Level 2: 32 XP. At what level will the XP be 60?
- Answer: `18 + 7L = 60`; `L = 6`.
- Explanation: The table increases by 7 each level and starts at 18 when `L = 0`.
- Distractors: `L = 7`; `L = 42`; `L = 5`; equation `7 + 18L = 60`
- Distractor Rationale: Uses rate as level; stops after subtracting; off-by-one from table; swaps start and rate.
- Randomization Rules: Generate arithmetic tables with a visible level 0 value and constant difference.
- Validity Constraints: Table must be truly linear; target value must land on an integer level for basic versions.
- Metadata: phase_id=P005; prerequisites=[patterns, fixed-rate models]; misconception_tags=[swaps start and rate, off-by-one, stops early]; randomization_constraints=[constant difference, integer target level].
- Graph/Visual Variant: Required: table of values; optional plotted points.
- Modeling Variant: XP, cost, score, or resource growth table.
- Reverse Variant: Create a table matching `18 + 7L`.
- Equation Battle Variant: Identify start/rate, then solve.
- Multi-stage Boss Variant: Ask for both model and level.
- Hint Mapping: H-P005-T015
- Tutorial Mapping: Tut-P005 sections Table Models
- Socratic Mapping: Soc-P005 table branch

## Template T016 - Graph to equation and solve
- Template ID: P005-T016
- Question Type: Graph interpretation
- Cognitive Skill: Read intercept and slope
- Difficulty: 4
- Estimated Time: 80 seconds
- Visual Required: true
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Interpret a linear graph as a model and solve for an input.
- Example Question: A graph of a line has y-intercept 2 and slope 3. What input `x` gives output 20?
- Answer: `3x + 2 = 20`; `x = 6`.
- Explanation: The model is `y = 3x + 2`. Set `y` to 20 and solve.
- Distractors: `x = 20/3`; `x = 18`; `x = 2`; `x = 3`
- Distractor Rationale: Ignores intercept; stops after subtracting; copies intercept; copies slope.
- Randomization Rules: Use graphs with visible integer intercept and slope; choose target output producing integer input.
- Validity Constraints: Graph data must match stated slope and intercept.
- Metadata: phase_id=P005; prerequisites=[slope, intercept, two-step equations]; misconception_tags=[intercept confusion, copies slope, stops early]; randomization_constraints=[integer slope/intercept, valid target].
- Graph/Visual Variant: Required: line with intercept and slope triangle.
- Modeling Variant: Any linear graph representing output over input.
- Reverse Variant: Draw or describe a graph matching `y = 3x + 2`.
- Equation Battle Variant: Set output, then use `-2`, `/3`.
- Multi-stage Boss Variant: Interpret graph, write equation, solve.
- Hint Mapping: H-P005-T016
- Tutorial Mapping: Tut-P005 sections Graph Models
- Socratic Mapping: Soc-P005 graph branch

## Template T017 - Practical whole-number solution
- Template ID: P005-T017
- Question Type: Practical solution selection
- Cognitive Skill: Interpret integer count
- Difficulty: 3
- Estimated Time: 60 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Confirm that a model solution fits a whole-count context.
- Example Question: A vault already contains 5 artifacts. Each sealed box contains 8 artifacts. How many boxes are needed for the vault to contain exactly 45 artifacts?
- Answer: `5 + 8b = 45`; `b = 5` boxes.
- Explanation: Subtract 5 to get `8b = 40`, then divide by 8. The result is a whole number, so it is practical.
- Distractors: `b = 40`; `b = 6`; `b = 5.625`; `b = 8`
- Distractor Rationale: Stops after subtracting; rounds without exactness; divides total by 8 ignoring existing artifacts; copies box size.
- Randomization Rules: Use count contexts with fixed starting amount and items per group; generate whole-count solutions.
- Validity Constraints: Number of groups must be a nonnegative integer for exact-count prompts.
- Metadata: phase_id=P005; prerequisites=[fixed-rate equations, integer interpretation]; misconception_tags=[stops early, ignores starting amount, rounding in exact context]; randomization_constraints=[integer group count].
- Graph/Visual Variant: Grouped boxes plus existing items.
- Modeling Variant: Boxes, packs, teams, or crates.
- Reverse Variant: Write a whole-number context for `5 + 8b = 45`.
- Equation Battle Variant: Cards `-5`, `/8`, then practical check.
- Multi-stage Boss Variant: Include a false fractional option to reject.
- Hint Mapping: H-P005-T017
- Tutorial Mapping: Tut-P005 sections Practical Answers
- Socratic Mapping: Soc-P005 practical branch

## Template T018 - Modeling error detection
- Template ID: P005-T018
- Question Type: Error detection
- Cognitive Skill: Diagnose story-equation mismatch
- Difficulty: 4
- Estimated Time: 75 seconds
- Visual Required: false
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Identify when an equation reverses the story operation.
- Example Question: A player had some coins, spent 8, and then had 30. A student writes `x + 8 = 30`. What is wrong, and what is the correct solution?
- Answer: Spending means subtracting, so the correct equation is `x - 8 = 30`; `x = 38` coins.
- Explanation: The written equation describes gaining 8, not spending 8.
- Distractors: `x = 22`; `x = 30`; no error; `8x = 30`
- Distractor Rationale: Solves the wrong equation; copies final amount; accepts reversed operation; treats spending as multiplication.
- Randomization Rules: Present common model mismatches: gain/loss reversal, fixed/rate swap, missing total, or wrong target.
- Validity Constraints: The error should be conceptually clear and correctable.
- Metadata: phase_id=P005; prerequisites=[start-change-end models, checking in context]; misconception_tags=[operation reversal, accepts wrong model, copies total]; randomization_constraints=[one targeted modeling error].
- Graph/Visual Variant: Before-after bar showing a removed segment.
- Modeling Variant: Error correction in story translation.
- Reverse Variant: Write a wrong equation for a spending story and explain the correction.
- Equation Battle Variant: Use as post-battle model review.
- Multi-stage Boss Variant: Identify error, rewrite equation, solve, and interpret.
- Hint Mapping: H-P005-T018
- Tutorial Mapping: Tut-P005 sections Model Checking
- Socratic Mapping: Soc-P005 error branch

## Template T019 - Phrase translation into linear equation
- Template ID: P005-T019
- Question Type: Build the model
- Cognitive Skill: Translate algebraic language
- Difficulty: 2
- Estimated Time: 50 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Translate a phrase like "three more than twice a number" into an equation.
- Example Question: Three more than twice a number is 19. Find the number.
- Answer: `2n + 3 = 19`; `n = 8`.
- Explanation: "Twice a number" is `2n`; "three more than" adds 3.
- Distractors: `2(n + 3) = 19`; `3n + 2 = 19`; `2n - 3 = 19`; `n = 19`
- Distractor Rationale: Doubles after adding; swaps coefficients; reverses "more than"; copies total.
- Randomization Rules: Use phrases with `k` times a number plus or minus a constant equals a total.
- Validity Constraints: Wording must be unambiguous; avoid "less than" reversal until explicitly taught.
- Metadata: phase_id=P005; prerequisites=[two-step equations, phrase translation]; misconception_tags=[misreads more than, swaps numbers, copies total]; randomization_constraints=[unambiguous phrase].
- Graph/Visual Variant: Expression-building tiles.
- Modeling Variant: Number puzzle, spell rule, or stat rule.
- Reverse Variant: Write a phrase matching `2n + 3 = 19`.
- Equation Battle Variant: Build expression, then solve.
- Multi-stage Boss Variant: Ask for equation before solution.
- Hint Mapping: H-P005-T019
- Tutorial Mapping: Tut-P005 sections Phrase Translation
- Socratic Mapping: Soc-P005 phrase branch

## Template T020 - Multi-stage modeling boss
- Template ID: P005-T020
- Question Type: Boss challenge
- Cognitive Skill: Integrated modeling, solving, and interpretation
- Difficulty: 5
- Estimated Time: 120 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Build, solve, check, and interpret a multi-step linear model.
- Example Question: Boss Gate: A player starts with 14 tokens. Each quest earns 5 tokens but costs 2 tokens in supplies. After `q` quests, the player wants 50 tokens. Write an equation, solve it, and check the answer in the story.
- Answer: `14 + 5q - 2q = 50`; `q = 12` quests.
- Explanation: Net gain per quest is `5 - 2 = 3`, so `14 + 3q = 50`. Then `3q = 36`, so `q = 12`. Check: start 14, gain 60, spend 24, final 50.
- Distractors: `q = 7.2`; `q = 18`; `q = 12.5`; equation `14 + 5q = 50`
- Distractor Rationale: Ignores supply cost; adds cost instead of subtracting; arithmetic slip; omits one repeated quantity.
- Randomization Rules: Use contexts with starting value plus two repeated changes, one positive and one negative.
- Validity Constraints: Net rate nonzero; solution should be nonnegative and practical.
- Metadata: phase_id=P005; prerequisites=[combining like terms, fixed-rate models, interpretation]; misconception_tags=[omits repeated cost, sign error, impractical answer]; randomization_constraints=[net rate nonzero, practical solution].
- Graph/Visual Variant: Quest ledger with start, total earned, total spent, final.
- Modeling Variant: Integrated RPG economy model.
- Reverse Variant: Create a boss story matching `14 + 5q - 2q = 50`.
- Equation Battle Variant: Build expression, combine like terms, solve, check.
- Multi-stage Boss Variant: This is the phase boss template.
- Hint Mapping: H-P005-T020
- Tutorial Mapping: Tut-P005 sections Full Phase Review
- Socratic Mapping: Soc-P005 boss branch

# Part II - Hint Bible

## H-P005-T001
- Hint 1 - Gentle Nudge: Separate the entry cost from the per-quest cost.
- Hint 2 - Concept Reminder: "Per quest" means multiply by the number of quests.
- Hint 3 - Focus Hint: The variable part is `4q`.
- Hint 4 - Guided Next Step: Write `12 + 4q = 40`.
- Hint 5 - Nearly Complete: Subtract 12 to get `4q = 28`, then divide by 4.
- Hint 6 - Full Solution: `q = 7`; the player completed 7 quests.

## H-P005-T002
- Hint 1 - Gentle Nudge: Start amount plus gain equals final amount.
- Hint 2 - Concept Reminder: Gaining 15 means add 15.
- Hint 3 - Focus Hint: Use `x + 15 = 62`.
- Hint 4 - Guided Next Step: Subtract 15 from both sides.
- Hint 5 - Nearly Complete: `x = 62 - 15`.
- Hint 6 - Full Solution: `x = 47`; the player started with 47 crystals.

## H-P005-T003
- Hint 1 - Gentle Nudge: Spending means the amount goes down.
- Hint 2 - Concept Reminder: Start minus spent equals left.
- Hint 3 - Focus Hint: Use `c - 18 = 27`.
- Hint 4 - Guided Next Step: Add 18 to both sides.
- Hint 5 - Nearly Complete: `c = 27 + 18`.
- Hint 6 - Full Solution: `c = 45`; the player started with 45 coins.

## H-P005-T004
- Hint 1 - Gentle Nudge: The player already has 25 tokens.
- Hint 2 - Concept Reminder: 6 tokens each week means `6w`.
- Hint 3 - Focus Hint: Total after `w` weeks is `25 + 6w`.
- Hint 4 - Guided Next Step: Write `25 + 6w = 91`.
- Hint 5 - Nearly Complete: Subtract 25, then divide by 6.
- Hint 6 - Full Solution: `w = 11`; it takes 11 weeks.

## H-P005-T005
- Hint 1 - Gentle Nudge: Write one expression for each plan.
- Hint 2 - Concept Reminder: "Cost the same" means set the expressions equal.
- Hint 3 - Focus Hint: Plan A is `12 + 3d`; Plan B is `4 + 5d`.
- Hint 4 - Guided Next Step: Solve `12 + 3d = 4 + 5d`.
- Hint 5 - Nearly Complete: Subtract `3d` and 4 to get `8 = 2d`.
- Hint 6 - Full Solution: `d = 4`; the plans match at 4 dungeons.

## H-P005-T006
- Hint 1 - Gentle Nudge: Break-even means revenue equals cost.
- Hint 2 - Concept Reminder: Revenue is price times units sold.
- Hint 3 - Focus Hint: Revenue is `10u`; cost is `80 + 6u`.
- Hint 4 - Guided Next Step: Write `10u = 80 + 6u`.
- Hint 5 - Nearly Complete: Subtract `6u` to get `4u = 80`.
- Hint 6 - Full Solution: `u = 20`; the shop breaks even at 20 charms.

## H-P005-T007
- Hint 1 - Gentle Nudge: Base pay happens once.
- Hint 2 - Concept Reminder: Commission repeats for each sale.
- Hint 3 - Focus Hint: Total pay is `150 + 12s`.
- Hint 4 - Guided Next Step: Write `150 + 12s = 390`.
- Hint 5 - Nearly Complete: Subtract 150, then divide by 12.
- Hint 6 - Full Solution: `s = 20`; the merchant made 20 sales.

## H-P005-T008
- Hint 1 - Gentle Nudge: Define width first, then length.
- Hint 2 - Concept Reminder: If width is `w`, length is `w + 5`.
- Hint 3 - Focus Hint: Perimeter is `2(length) + 2(width)`.
- Hint 4 - Guided Next Step: Write `2(w + 5) + 2w = 50`.
- Hint 5 - Nearly Complete: Simplify to `4w + 10 = 50`, then solve.
- Hint 6 - Full Solution: `w = 10`, length is 15.

## H-P005-T009
- Hint 1 - Gentle Nudge: Consecutive integers differ by 1.
- Hint 2 - Concept Reminder: If the smaller is `n`, the next is `n + 1`.
- Hint 3 - Focus Hint: Their sum is `n + (n+1)`.
- Hint 4 - Guided Next Step: Write `n + (n+1) = 57`.
- Hint 5 - Nearly Complete: `2n + 1 = 57`, so `2n = 56`.
- Hint 6 - Full Solution: `n = 28`; the integers are 28 and 29.

## H-P005-T010
- Hint 1 - Gentle Nudge: Let Leo's age be the simpler variable.
- Hint 2 - Concept Reminder: "3 more than twice Leo" is `2L + 3`.
- Hint 3 - Focus Hint: Together means add the ages.
- Hint 4 - Guided Next Step: Write `L + (2L + 3) = 33`.
- Hint 5 - Nearly Complete: `3L + 3 = 33`, so `3L = 30`.
- Hint 6 - Full Solution: Leo is 10 and Maya is 23.

## H-P005-T011
- Hint 1 - Gentle Nudge: The scout does not start at 0 km.
- Hint 2 - Concept Reminder: Distance traveled is rate times time.
- Hint 3 - Focus Hint: Total distance is `20 + 45t`.
- Hint 4 - Guided Next Step: Write `20 + 45t = 155`.
- Hint 5 - Nearly Complete: Subtract 20, then divide by 45.
- Hint 6 - Full Solution: `t = 3`; the scout travels for 3 hours.

## H-P005-T012
- Hint 1 - Gentle Nudge: The fare has a fixed charge and a per-mile charge.
- Hint 2 - Concept Reminder: Per mile means multiply by miles.
- Hint 3 - Focus Hint: Use `4.50 + 2.25m = 18.00`.
- Hint 4 - Guided Next Step: Subtract 4.50 from both sides.
- Hint 5 - Nearly Complete: `2.25m = 13.50`, so divide by 2.25.
- Hint 6 - Full Solution: `m = 6`; the taxi traveled 6 miles.

## H-P005-T013
- Hint 1 - Gentle Nudge: Track pure essence amount, not just total volume.
- Hint 2 - Concept Reminder: Essence amount equals concentration times volume.
- Hint 3 - Focus Hint: The starting essence is `0.30x + 0.50(6)`.
- Hint 4 - Guided Next Step: Set it equal to `0.42(x + 6)`.
- Hint 5 - Nearly Complete: `0.30x + 3 = 0.42x + 2.52`.
- Hint 6 - Full Solution: `x = 4`; use 4 liters of 30% essence.

## H-P005-T014
- Hint 1 - Gentle Nudge: Average means total divided by the number of scores.
- Hint 2 - Concept Reminder: Three scores with average 90 have total 270.
- Hint 3 - Focus Hint: Use `(84 + 92 + x)/3 = 90`.
- Hint 4 - Guided Next Step: Multiply both sides by 3.
- Hint 5 - Nearly Complete: `176 + x = 270`.
- Hint 6 - Full Solution: `x = 94`; the third score is 94.

## H-P005-T015
- Hint 1 - Gentle Nudge: Find the starting value at Level 0.
- Hint 2 - Concept Reminder: The constant difference is the rate.
- Hint 3 - Focus Hint: The start is 18 and the rate is 7 per level.
- Hint 4 - Guided Next Step: Write `18 + 7L = 60`.
- Hint 5 - Nearly Complete: Subtract 18, then divide by 7.
- Hint 6 - Full Solution: `L = 6`; the XP reaches 60 at Level 6.

## H-P005-T016
- Hint 1 - Gentle Nudge: Use the slope and intercept to write the line.
- Hint 2 - Concept Reminder: A line with slope 3 and intercept 2 is `y = 3x + 2`.
- Hint 3 - Focus Hint: Set `y` equal to 20.
- Hint 4 - Guided Next Step: Solve `3x + 2 = 20`.
- Hint 5 - Nearly Complete: `3x = 18`.
- Hint 6 - Full Solution: `x = 6`; input 6 gives output 20.

## H-P005-T017
- Hint 1 - Gentle Nudge: The 5 artifacts are already there.
- Hint 2 - Concept Reminder: Each box adds 8 artifacts.
- Hint 3 - Focus Hint: Use `5 + 8b = 45`.
- Hint 4 - Guided Next Step: Subtract 5.
- Hint 5 - Nearly Complete: `8b = 40`, so divide by 8.
- Hint 6 - Full Solution: `b = 5`; exactly 5 boxes are needed.

## H-P005-T018
- Hint 1 - Gentle Nudge: Compare the equation to the action in the story.
- Hint 2 - Concept Reminder: Spending means subtracting, not adding.
- Hint 3 - Focus Hint: The student's equation describes gaining 8.
- Hint 4 - Guided Next Step: Correct equation: `x - 8 = 30`.
- Hint 5 - Nearly Complete: Add 8 to both sides.
- Hint 6 - Full Solution: `x = 38`; the player had 38 coins before spending.

## H-P005-T019
- Hint 1 - Gentle Nudge: Start with "twice a number."
- Hint 2 - Concept Reminder: Twice a number is `2n`.
- Hint 3 - Focus Hint: "Three more than" means add 3 after doubling.
- Hint 4 - Guided Next Step: Write `2n + 3 = 19`.
- Hint 5 - Nearly Complete: Subtract 3, then divide by 2.
- Hint 6 - Full Solution: `n = 8`; the number is 8.

## H-P005-T020
- Hint 1 - Gentle Nudge: Track starting tokens, earned tokens, and spent tokens separately.
- Hint 2 - Concept Reminder: Each quest has two repeated changes: `+5q` and `-2q`.
- Hint 3 - Focus Hint: Total tokens are `14 + 5q - 2q`.
- Hint 4 - Guided Next Step: Write `14 + 5q - 2q = 50`.
- Hint 5 - Nearly Complete: Combine to `14 + 3q = 50`, then solve.
- Hint 6 - Full Solution: `q = 12`; check: `14 + 60 - 24 = 50`.

# Part III - Tutorial Bible

## Learning Goal
Learn to translate situations into linear equations, solve them, and interpret the answer in the original context.

## Why It Matters
Algebra in the game is not only symbol manipulation. Modeling lets a player turn a story, table, graph, or diagram into a solvable structure. This skill powers quest costs, resource planning, break-even decisions, travel estimates, and later systems of equations.

## Prerequisite Check
Ask the player:

1. Solve `12 + 4q = 40`. Expected: `q = 7`.
2. What does "5 coins per quest" mean algebraically? Expected: `5q`.
3. What does "costs the same" tell us to do? Expected: set expressions equal.
4. If a player spends 8 coins, should the model add or subtract 8? Expected: subtract.
5. Why should an answer include units? Expected: units tell what the number means.

If the player misses the equation solving but can translate, route to Phase 002 or 003 review. If the player solves but cannot translate, begin with fixed-rate models.

## Core Concept
A modeling problem has four steps:

1. Define the variable.
2. Build expressions from the story.
3. Write an equation from the relationship.
4. Solve and interpret the result.

Example: "A guild charges 12 coins plus 4 coins per quest. Total cost is 40."

Let `q` be quests.

Fixed cost: 12.
Per-quest cost: `4q`.
Total: 40.

Equation: `12 + 4q = 40`.
Solve: `4q = 28`, so `q = 7`.
Interpretation: the player completed 7 quests.

## Fixed-Rate Models
Use `fixed + rate*x = total`.

Fixed values happen once. Rates repeat for each unit.

Examples:

- Entry fee plus cost per quest.
- Base pay plus commission per sale.
- Starting tokens plus tokens earned each week.
- Taxi fee plus cost per mile.

## Start-Change-End Models
Use:

- start + gain = final
- start - loss = final
- start + rate*time = final

The sign comes from the story, not from where the number appears in the sentence.

## Equal Expressions
When two plans are equal, write one expression for each plan and set them equal.

Example:
`12 + 3d = 4 + 5d`

This type of model often uses variables on both sides.

## Define Related Quantities
Sometimes one variable describes several quantities.

If a rectangle's length is 5 more than its width:

- width: `w`
- length: `w + 5`
- perimeter: `2(w+5) + 2w`

If two consecutive integers are needed:

- smaller: `n`
- larger: `n + 1`

## Model Checking
A model is valid only if it matches the story. The equation `x + 8 = 30` is solvable, but it does not describe "spent 8 and had 30 left." The correct model is `x - 8 = 30`.

After solving, check in the story:

If `x = 38`, then starting with 38 and spending 8 leaves 30. The story check works.

## Common Mistakes
- Mistake: Swapping fixed cost and rate.
  Correction: Ask which quantity happens once and which repeats.
- Mistake: Ignoring the starting value.
  Correction: Include the initial amount as the intercept or fixed segment.
- Mistake: Reversing gain and loss.
  Correction: Match the sign to the action.
- Mistake: Answering the wrong quantity.
  Correction: Re-read the variable definition and the final question.
- Mistake: Accepting impractical answers.
  Correction: Counts of boxes, people, or quests must usually be whole and nonnegative.

## Guided Practice
1. A shop charges 9 coins plus 2 coins per item for a total of 25.
   - Let `i` be items.
   - Equation: `9 + 2i = 25`.
   - Solution: `i = 8` items.

2. Plan A costs `5 + 6x`; Plan B costs `17 + 3x`. When are they equal?
   - Equation: `5 + 6x = 17 + 3x`.
   - Solution: `x = 4`.

3. The sum of a number and the next integer is 41.
   - Equation: `n + (n+1) = 41`.
   - Solution: `n = 20`, so the integers are 20 and 21.

## Independent Practice
1. A pass costs 20 coins plus 3 coins per ride. Total is 44. Answer: 8 rides.
2. A player had coins, gained 17, and ended with 52. Answer: 35 coins.
3. A rectangle has length 4 more than width and perimeter 36. Answer: width 7, length 11.
4. Two plans cost `15 + 2x` and `5 + 4x`. Answer: equal at `x = 5`.
5. A table starts at 10 and increases by 6 per level. When does it reach 52? Answer: Level 7.

## Mastery Check
The player is ready to advance when they can:

1. Define a variable correctly.
2. Build an equivalent equation before solving.
3. Solve fixed-rate and comparison models.
4. Interpret the answer with units.
5. Reject at least one model that conflicts with the story.

Mastery check set:

1. `18 + 5q = 63`; solution `q = 9` quests.
2. `40 - 3d = 16`; solution `d = 8` days.
3. `7 + 4x = 19 + x`; solution `x = 4`.
4. `(88 + x)/2 = 91`; solution `x = 94`.
5. `3n + 2 = 29`; solution `n = 9`.

## Adaptive Tutor Messages
- If the player swaps fixed and rate: "Which number happens once, and which number repeats for every unit?"
- If the player reverses gain/loss: "Act out the story: did the amount go up or down?"
- If the player solves without defining a variable: "Name what the variable means before writing the equation."
- If the player gives a number without units: "What does this number count or measure?"
- If the player accepts an invalid model: "Check the equation against the story before solving."
- If the player succeeds quickly: "You are ready for Equation Battle, where model moves become tactical algebra moves."

## Tutorial Metadata
- Tutorial ID: Tut-P005
- Estimated duration: 5 minutes
- Target player state: can solve equations but needs help translating stories
- Unlock condition: available from any Phase 005 question
- Remediation trigger: two fixed/rate swaps, two gain/loss reversals, two missing variable definitions, or one accepted invalid model
- Advancement trigger: 80 percent accuracy on mixed modeling prompts plus successful story check on one solution

# Part IV - Socratic Dialogue Bible

## Opening Diagnostic
Tutor: "A guild charges 12 coins to enter and 4 coins per quest for a total of 40. Which number happens once, and which number repeats?"

Expected strong answer: "12 happens once, and 4 repeats for each quest."

## Guided Discovery
Tutor sequence:

1. "What unknown should the variable represent?"
2. "Which quantity is fixed?"
3. "Which quantity is a rate or repeated amount?"
4. "What expression represents the variable part?"
5. "What relationship tells us to write an equation?"
6. "What equation matches the story?"
7. "How do we solve it?"
8. "What units belong on the answer?"
9. "Does the answer check in the original story?"

## Correct Branch
Player: "12 is fixed and 4 repeats per quest."

Tutor: "Good. If `q` is quests, what expression represents the total cost?"

If player says `12 + 4q`, ask: "What equation should that equal?"

Exit when player solves `q = 7` and says 7 quests.

## Partial Understanding Branch
Player: "4q is involved" but omits the fixed cost.

Tutor: "Yes, `4q` is the repeated part. What cost happens even before any quest is counted?"

If player adds 12, continue.

## Misconception Branch
Player writes `4 + 12q = 40`.

Tutor: "Let's test the meaning. Does 12 coins repeat for every quest, or does 4 coins repeat for every quest?"

Follow-up: "Which phrase tells you the rate?"

Recovery target: Player identifies "4 coins per quest" as `4q`.

## Unsure Branch
Player: "I don't know."

Tutor: "Look for the word 'per.' What number is connected to 'per quest'?"

If player answers 4: "Then the variable part is `4q`. What number is added once?"

## Unrelated Response Branch
Player gives an unrelated response.

Tutor: "Let's return to the cost sentence. Choose one: is 12 the fixed entry cost or the per-quest cost?"

If unrelated again, ask a two-choice prompt about fixed versus repeated quantities.

## Recovery Prompts
- "What does the variable represent?"
- "Which number happens once?"
- "Which number repeats?"
- "What word tells you to multiply?"
- "What total or equality is given?"
- "What units should the answer have?"
- "Does the answer make the story true?"

## Reflection Question
"Why is writing the equation sometimes harder than solving it?"

Strong reflection: "Because the equation depends on meaning. The same numbers can be arranged differently depending on the story."

## Transfer Question
"How would the model change if the guild gave 4 coins per quest instead of charging 4 coins per quest?"

Expected transfer: "The sign changes because the player gains instead of pays; the model would use a gain relationship."

## Escalation Rules
- If the player swaps fixed and rate twice, show Fixed-Rate Models.
- If the player reverses gain and loss twice, show Start-Change-End Models.
- If the player omits units twice, ask interpretation-only questions.
- If the player writes solvable but unsound equations, show Model Checking.
- If the player struggles with related quantities, show Define Related Quantities.
- If the player builds and solves three models correctly, move to independent practice.

## Exit Condition
The Socratic sequence is complete when the player:

1. Defines the variable.
2. Identifies fixed and repeated quantities.
3. Writes a story-matching equation.
4. Solves accurately.
5. Interprets and checks the answer in context.

# Knowledge Graph

- Prerequisites: Phase 001 one-step equations; Phase 002 multi-step equations; Phase 003 variables on both sides; Phase 004 literal equations; unit interpretation; rate language
- Concepts Unlocked: variable definition; fixed-rate modeling; start-change-end models; equal-expression comparisons; break-even modeling; related quantity representation; table-to-equation modeling; graph-to-equation modeling; practical solution interpretation
- Related Concepts: linear functions; slope-intercept form; systems of equations; inequalities; arithmetic sequences; proportional reasoning
- Common Misconceptions: swapping fixed and rate quantities; reversing gain/loss; ignoring starting values; omitting units; accepting impractical answers; matching equations by numbers only; forgetting to check in context
- Remedial Phases: Phase 001 review; Phase 002 review; Phase 003 review; rate-language mini-lesson; fixed-versus-variable mini-lesson; unit interpretation mini-lesson
- Follow-up Phases: Phase 006 - Equation Battle fundamentals; Phase 007 - Linear inequalities; Phase 011 - Systems by substitution; Phase 013 - Systems by graphing; Phase 014 - Function notation
- Transfer Topics: linear functions; break-even analysis; systems modeling; inequality constraints; optimization setup; table and graph interpretation

# Validation Notes

## Structure Validation
- Includes all required Bibles and metadata sections.
- Contains exactly 20 template families, within the required 20-40 range.
- Each template includes example, answer, explanation, distractors, distractor rationale, randomization rules, validity constraints, metadata, variants, and mappings.
- Every template has six progressive hints.

## Math Validation
- T001: `12 + 4q = 40` -> `q = 7`.
- T002: `x + 15 = 62` -> `x = 47`.
- T003: `c - 18 = 27` -> `c = 45`.
- T004: `25 + 6w = 91` -> `w = 11`.
- T005: `12 + 3d = 4 + 5d` -> `d = 4`.
- T006: `10u = 80 + 6u` -> `u = 20`.
- T007: `150 + 12s = 390` -> `s = 20`.
- T008: `2(w+5)+2w=50` -> `4w+10=50` -> `w=10`, length 15.
- T009: `n+(n+1)=57` -> `2n+1=57` -> `n=28`, next 29.
- T010: `L+(2L+3)=33` -> `3L=30` -> `L=10`, Maya 23.
- T011: `20+45t=155` -> `t=3`.
- T012: `4.50+2.25m=18.00` -> `m=6`.
- T013: `0.30x+3=0.42x+2.52` -> `0.48=0.12x` -> `x=4`.
- T014: `(84+92+x)/3=90` -> `176+x=270` -> `x=94`.
- T015: `18+7L=60` -> `L=6`.
- T016: `3x+2=20` -> `x=6`.
- T017: `5+8b=45` -> `b=5`.
- T018: correct model `x-8=30` -> `x=38`.
- T019: `2n+3=19` -> `n=8`.
- T020: `14+5q-2q=50` -> `14+3q=50` -> `q=12`.

## Distractor Validation
- Distractors reflect plausible modeling errors: fixed/rate swaps, gain/loss reversal, ignored starting values, stopped solving, wrong units, impractical rounding, and story-equation mismatch.
- Multiple-choice-style templates have exactly one correct answer.
- Distractors were checked against both algebra and context.

## Hint Validation
- Each hint sequence starts with story meaning and moves toward equation construction before solving.
- Hints do not reveal the full equation too early except after variable/rate meaning is established.
- Hint 6 includes interpretation with units.

## Tutorial Validation
- Tutorial includes learning goal, prerequisite check, why it matters, core concept, fixed-rate models, start-change-end models, equal expressions, related quantities, model checking, common mistakes, guided practice, independent practice, mastery check, adaptive messages, and metadata.

## Socratic Validation
- Dialogue includes diagnostic, guided discovery, correct branch, partial branch, misconception branch, unsure branch, unrelated branch, recovery prompts, reflection, transfer, escalation rules, and exit condition.
- Tutor prioritizes meaning before equation solving.

## Metadata Validation
- Every template includes IDs, difficulty, timing, visual flag, compatibility flags, prerequisites, misconception tags, randomization constraints, and support-system mappings.

## Known Issues
- The repository specifications differ on the label for Hint 4. This phase uses "Guided Next Step" to match the master prompt language.
- `PHASE_TEMPLATE.md` omits Common Misconceptions from the Knowledge Graph section, but this phase includes it because the master prompt and knowledge graph guide require it.
