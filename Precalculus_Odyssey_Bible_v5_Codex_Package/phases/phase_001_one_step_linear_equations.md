# Phase 001 - One-step Linear Equations

## Phase Metadata
- Course: Precalculus Odyssey Bible v5
- Topic: One-step linear equations
- Subtopic: Solving equations using one inverse operation
- Prerequisites: integer arithmetic, fraction arithmetic, meaning of equality, evaluating simple expressions
- Related phases: Phase 002 - Multi-step linear equations; Phase 006 - Equation Battle fundamentals; Phase 007 - Linear inequalities
- Estimated phase size: 20 template families, 20 core examples, 120 progressive hints, 1 tutorial sequence, 1 Socratic dialogue system

## Learning Objectives
By the end of this phase, the player can:

1. Explain that solving an equation means finding the value that makes both sides equal.
2. Identify the operation attached to a variable in a one-step linear equation.
3. Choose and apply the inverse operation to isolate the variable.
4. Preserve equality by doing the same valid operation to both sides.
5. Solve one-step equations involving addition, subtraction, multiplication, division, negatives, fractions, decimals, and simple context models.
6. Check a solution by substitution.
7. Recognize common mistakes such as changing one side only, using the same operation instead of the inverse, and mishandling signs.

## Prerequisite Review
- Equality means both sides have the same value.
- Addition and subtraction undo each other.
- Multiplication and division undo each other.
- A negative coefficient such as `-x` means `-1 * x`.
- A solution can be checked by replacing the variable with the proposed value.

## Core Concepts
- A one-step linear equation can be solved with exactly one inverse-operation idea.
- The goal is to isolate the variable, meaning the variable is alone on one side.
- The legal move in an equation is balanced: whatever operation is applied to one side must also be applied to the other side.
- Clean arithmetic matters, but the key decision is conceptual: identify what is being done to the variable, then undo it.

## Common Misconceptions
- Using the same operation instead of the inverse operation.
- Changing only the side with the variable.
- Treating `-x` as if it must be positive.
- Dividing when the equation shows division instead of multiplying by the denominator.
- Multiplying by the numerator instead of the reciprocal for fraction coefficients.
- Losing the sign of a negative solution.
- Thinking a checked value is correct because it is close rather than exactly equal.
- Assuming a context answer should always be positive even when the equation permits a negative value.

# Part I - Question Bible

## Template T001 - Addition isolation
- Template ID: P001-T001
- Question Type: Direct computation
- Cognitive Skill: Apply inverse operation
- Difficulty: 1
- Estimated Time: 20 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve equations of the form `x + a = b`.
- Example Question: Solve `x + 7 = 15`.
- Answer: `x = 8`
- Explanation: Since 7 is added to `x`, subtract 7 from both sides: `x = 15 - 7 = 8`.
- Distractors: `x = 22`; `x = -8`; `x = 7`; `x = 15`
- Distractor Rationale: Adds 7 instead of subtracting; subtracts in the wrong order; confuses the added value with the solution; copies the right side.
- Randomization Rules: Choose integer `a` from 2 to 15 and integer solution `s` from -12 to 12; set `b = s + a`.
- Validity Constraints: Avoid `s = 0` in early difficulty 1 examples unless zero is the target concept; keep `a` positive for this template.
- Metadata: `{ "template_id": "P001-T001", "phase_id": "P001", "topic": "One-step linear equations", "subtopic": "Addition equations", "question_type": "Direct computation", "cognitive_skill": "Apply inverse operation", "difficulty": 1, "estimated_time_seconds": 20, "visual_required": false, "equation_battle_compatible": true, "boss_compatible": true, "hint_sequence_id": "H-P001-T001", "tutorial_id": "Tut-P001", "socratic_dialogue_id": "Soc-P001", "prerequisites": ["integer subtraction", "meaning of equality"], "misconception_tags": ["uses same operation", "changes one side only"], "randomization_constraints": ["a is positive", "b = s + a"] }`
- Graph/Visual Variant: Show a balance scale with an `x` block and 7 unit blocks on the left, 15 unit blocks on the right; remove 7 blocks from each side.
- Modeling Variant: "A player has 7 crystals and earns some more, ending with 15. How many were earned?"
- Reverse Variant: "Create an equation of the form `x + a = b` whose solution is 8."
- Equation Battle Variant: The player selects the action card "subtract 7 from both sides."
- Multi-stage Boss Variant: Stage 1 asks for the inverse operation, Stage 2 solves, Stage 3 checks by substitution.
- Hint Mapping: H-P001-T001
- Tutorial Mapping: Tut-P001 sections Core Concept and Worked Example
- Socratic Mapping: Soc-P001 addition branch

## Template T002 - Subtraction isolation
- Template ID: P001-T002
- Question Type: Direct computation
- Cognitive Skill: Apply inverse operation
- Difficulty: 1
- Estimated Time: 20 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve equations of the form `x - a = b`.
- Example Question: Solve `y - 9 = -4`.
- Answer: `y = 5`
- Explanation: Since 9 is subtracted from `y`, add 9 to both sides: `y = -4 + 9 = 5`.
- Distractors: `y = -13`; `y = -5`; `y = 9`; `y = -4`
- Distractor Rationale: Subtracts 9 again; sign error after adding; uses the subtracted amount; copies the right side.
- Randomization Rules: Choose integer `a` from 2 to 15 and solution `s` from -10 to 15; set `b = s - a`.
- Validity Constraints: Include negative right sides sometimes; ensure arithmetic remains mental-friendly.
- Metadata: `{ "template_id": "P001-T002", "phase_id": "P001", "topic": "One-step linear equations", "subtopic": "Subtraction equations", "question_type": "Direct computation", "cognitive_skill": "Apply inverse operation", "difficulty": 1, "estimated_time_seconds": 20, "visual_required": false, "equation_battle_compatible": true, "boss_compatible": true, "hint_sequence_id": "H-P001-T002", "tutorial_id": "Tut-P001", "socratic_dialogue_id": "Soc-P001", "prerequisites": ["integer addition", "meaning of equality"], "misconception_tags": ["uses same operation", "integer sign error"], "randomization_constraints": ["a is positive", "b = s - a"] }`
- Graph/Visual Variant: Show `y` with 9 units removed, then add 9 units back to both sides.
- Modeling Variant: "A player spends 9 tokens and has -4 token balance relative to the checkpoint. What was the balance before spending?"
- Reverse Variant: "Write an equation like `y - a = b` with solution 5."
- Equation Battle Variant: The player chooses "add 9 to both sides" to cancel `-9`.
- Multi-stage Boss Variant: Ask for the missing inverse action before requiring the numerical solution.
- Hint Mapping: H-P001-T002
- Tutorial Mapping: Tut-P001 sections Core Concept and Guided Practice
- Socratic Mapping: Soc-P001 subtraction branch

## Template T003 - Negative variable equation
- Template ID: P001-T003
- Question Type: Direct computation
- Cognitive Skill: Interpret coefficient
- Difficulty: 2
- Estimated Time: 25 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve equations of the form `-x = b`.
- Example Question: Solve `-n = 11`.
- Answer: `n = -11`
- Explanation: `-n` means `-1 * n`. Divide both sides by `-1`, or take the opposite of both sides, so `n = -11`.
- Distractors: `n = 11`; `n = -1`; `n = 0`; `n = 12`
- Distractor Rationale: Ignores the negative sign; confuses coefficient with solution; treats opposite values as canceling to zero; arbitrary arithmetic adjustment.
- Randomization Rules: Choose nonzero integer `b` from -15 to 15; solution is `-b`.
- Validity Constraints: Exclude `b = 0` because it hides the sign concept.
- Metadata: `{ "template_id": "P001-T003", "phase_id": "P001", "topic": "One-step linear equations", "subtopic": "Negative variable", "question_type": "Direct computation", "cognitive_skill": "Interpret coefficient", "difficulty": 2, "estimated_time_seconds": 25, "visual_required": false, "equation_battle_compatible": true, "boss_compatible": true, "hint_sequence_id": "H-P001-T003", "tutorial_id": "Tut-P001", "socratic_dialogue_id": "Soc-P001", "prerequisites": ["opposites", "multiplication by -1"], "misconception_tags": ["ignored negative coefficient", "sign error"], "randomization_constraints": ["b is nonzero", "solution = -b"] }`
- Graph/Visual Variant: Use a sign-flip tile animation showing `-n` becoming `n` when both sides are multiplied by `-1`.
- Modeling Variant: "The opposite of a score is 11. What is the score?"
- Reverse Variant: "If the solution is `n = -11`, write a matching equation using `-n`."
- Equation Battle Variant: The required card is "multiply both sides by -1."
- Multi-stage Boss Variant: Combine sign identification, inverse action, and a substitution check.
- Hint Mapping: H-P001-T003
- Tutorial Mapping: Tut-P001 sections Common Mistakes and Mastery Check
- Socratic Mapping: Soc-P001 sign branch

## Template T004 - Multiplication coefficient
- Template ID: P001-T004
- Question Type: Direct computation
- Cognitive Skill: Apply inverse operation
- Difficulty: 1
- Estimated Time: 20 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve equations of the form `ax = b`.
- Example Question: Solve `5a = -35`.
- Answer: `a = -7`
- Explanation: `a` is multiplied by 5, so divide both sides by 5: `a = -35 / 5 = -7`.
- Distractors: `a = 7`; `a = -175`; `a = -30`; `a = 5`
- Distractor Rationale: Drops the negative sign; multiplies instead of divides; subtracts 5 instead of dividing; uses the coefficient as the answer.
- Randomization Rules: Choose integer coefficient `c` from 2 to 12 and integer solution `s` from -12 to 12; set `b = c * s`.
- Validity Constraints: Exclude `s = 0` in basic versions; avoid coefficient 1.
- Metadata: `{ "template_id": "P001-T004", "phase_id": "P001", "topic": "One-step linear equations", "subtopic": "Multiplication equations", "question_type": "Direct computation", "cognitive_skill": "Apply inverse operation", "difficulty": 1, "estimated_time_seconds": 20, "visual_required": false, "equation_battle_compatible": true, "boss_compatible": true, "hint_sequence_id": "H-P001-T004", "tutorial_id": "Tut-P001", "socratic_dialogue_id": "Soc-P001", "prerequisites": ["integer division", "multiplication facts"], "misconception_tags": ["multiplies instead of divides", "sign error"], "randomization_constraints": ["coefficient is 2 to 12", "b = c * s"] }`
- Graph/Visual Variant: Show 5 equal groups totaling -35, with each group equal to `a`.
- Modeling Variant: "Five equal penalties total -35 health points. What is each penalty?"
- Reverse Variant: "Create a multiplication equation with solution `a = -7`."
- Equation Battle Variant: The player plays "divide both sides by 5."
- Multi-stage Boss Variant: Mix coefficient identification with a check step: `5(-7) = -35`.
- Hint Mapping: H-P001-T004
- Tutorial Mapping: Tut-P001 sections Core Concept and Guided Practice
- Socratic Mapping: Soc-P001 multiplication branch

## Template T005 - Division by a positive number
- Template ID: P001-T005
- Question Type: Direct computation
- Cognitive Skill: Apply inverse operation
- Difficulty: 1
- Estimated Time: 20 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve equations of the form `x / a = b`.
- Example Question: Solve `b / 4 = 9`.
- Answer: `b = 36`
- Explanation: `b` is divided by 4, so multiply both sides by 4: `b = 9 * 4 = 36`.
- Distractors: `b = 13`; `b = 5`; `b = 2.25`; `b = 9`
- Distractor Rationale: Adds 4; subtracts 4; divides by 4 again; copies the right side.
- Randomization Rules: Choose divisor `d` from 2 to 10 and solution `s` as a multiple of `d`; set `b = s / d`.
- Validity Constraints: Use integer right sides in early versions; avoid divisor 0.
- Metadata: `{ "template_id": "P001-T005", "phase_id": "P001", "topic": "One-step linear equations", "subtopic": "Division equations", "question_type": "Direct computation", "cognitive_skill": "Apply inverse operation", "difficulty": 1, "estimated_time_seconds": 20, "visual_required": false, "equation_battle_compatible": true, "boss_compatible": true, "hint_sequence_id": "H-P001-T005", "tutorial_id": "Tut-P001", "socratic_dialogue_id": "Soc-P001", "prerequisites": ["multiplication facts", "meaning of division"], "misconception_tags": ["divides instead of multiplies", "copies right side"], "randomization_constraints": ["d is 2 to 10", "right side is integer"] }`
- Graph/Visual Variant: Show 4 equal shares where one share is 9, then recombine the shares to find the whole.
- Modeling Variant: "A treasure pile split into 4 equal bags gives 9 gems per bag. How many gems were in the pile?"
- Reverse Variant: "Write a division equation with solution `b = 36`."
- Equation Battle Variant: The player chooses "multiply both sides by 4."
- Multi-stage Boss Variant: Ask the player to name the inverse operation, solve, and explain why multiplying is correct.
- Hint Mapping: H-P001-T005
- Tutorial Mapping: Tut-P001 sections Worked Example and Guided Practice
- Socratic Mapping: Soc-P001 division branch

## Template T006 - Fraction coefficient
- Template ID: P001-T006
- Question Type: Direct computation
- Cognitive Skill: Use reciprocal
- Difficulty: 3
- Estimated Time: 35 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve equations of the form `(p/q)x = b`.
- Example Question: Solve `(3/4)p = 12`.
- Answer: `p = 16`
- Explanation: Multiply both sides by the reciprocal `4/3`: `p = 12 * 4/3 = 16`.
- Distractors: `p = 9`; `p = 15`; `p = 36`; `p = 12`
- Distractor Rationale: Multiplies by `3/4`; adds numerator and denominator logic incorrectly; multiplies by 3; copies the right side.
- Randomization Rules: Choose fraction coefficient `m/n` in simplest form with `m,n` from 2 to 9; choose solution `s` so `(m/n)s` is an integer.
- Validity Constraints: Denominator nonzero; coefficient nonzero; prefer answers with integer solutions for Phase 001.
- Metadata: `{ "template_id": "P001-T006", "phase_id": "P001", "topic": "One-step linear equations", "subtopic": "Fraction coefficients", "question_type": "Direct computation", "cognitive_skill": "Use reciprocal", "difficulty": 3, "estimated_time_seconds": 35, "visual_required": false, "equation_battle_compatible": true, "boss_compatible": true, "hint_sequence_id": "H-P001-T006", "tutorial_id": "Tut-P001", "socratic_dialogue_id": "Soc-P001", "prerequisites": ["fraction multiplication", "reciprocal"], "misconception_tags": ["uses fraction instead of reciprocal", "fraction arithmetic error"], "randomization_constraints": ["fraction is nonzero", "solution gives clean product"] }`
- Graph/Visual Variant: Use a bar model where `3/4` of the unknown is 12, so `1/4` is 4 and the whole is 16.
- Modeling Variant: "Three fourths of a mana tank is 12 units. What is the full tank capacity?"
- Reverse Variant: "Create a fraction-coefficient equation whose solution is 16."
- Equation Battle Variant: The player must play the reciprocal card `* 4/3` on both sides.
- Multi-stage Boss Variant: Stage 1 identifies the reciprocal, Stage 2 multiplies, Stage 3 checks `(3/4)(16) = 12`.
- Hint Mapping: H-P001-T006
- Tutorial Mapping: Tut-P001 sections Common Mistakes and Independent Practice
- Socratic Mapping: Soc-P001 reciprocal branch

## Template T007 - Decimal coefficient
- Template ID: P001-T007
- Question Type: Direct computation
- Cognitive Skill: Convert or divide
- Difficulty: 2
- Estimated Time: 30 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve equations with terminating decimal coefficients.
- Example Question: Solve `0.5m = 6`.
- Answer: `m = 12`
- Explanation: `0.5` means one half, so divide by `0.5` or multiply by 2: `m = 6 / 0.5 = 12`.
- Distractors: `m = 3`; `m = 6.5`; `m = 5.5`; `m = 0.5`
- Distractor Rationale: Multiplies by 0.5; adds 0.5; subtracts 0.5; uses coefficient as solution.
- Randomization Rules: Use decimal coefficients from `{0.2, 0.25, 0.5, 0.75, 1.5, 2.5}` with chosen solution producing a terminating right side.
- Validity Constraints: Coefficient must be nonzero; avoid repeating decimals.
- Metadata: `{ "template_id": "P001-T007", "phase_id": "P001", "topic": "One-step linear equations", "subtopic": "Decimal coefficients", "question_type": "Direct computation", "cognitive_skill": "Convert or divide", "difficulty": 2, "estimated_time_seconds": 30, "visual_required": false, "equation_battle_compatible": true, "boss_compatible": true, "hint_sequence_id": "H-P001-T007", "tutorial_id": "Tut-P001", "socratic_dialogue_id": "Soc-P001", "prerequisites": ["decimal multiplication", "division by decimal"], "misconception_tags": ["multiplies instead of divides", "decimal place error"], "randomization_constraints": ["terminating decimals", "coefficient is nonzero"] }`
- Graph/Visual Variant: Show a half-size bar labeled 6 and infer the full bar is 12.
- Modeling Variant: "Half of a shield meter is 6 points. What is the full shield meter?"
- Reverse Variant: "Write a decimal-coefficient equation with solution 12."
- Equation Battle Variant: The player may use either "divide by 0.5" or "multiply by 2" if both sides receive the same action.
- Multi-stage Boss Variant: Include a choice between equivalent inverse moves and require a justification.
- Hint Mapping: H-P001-T007
- Tutorial Mapping: Tut-P001 sections Fraction/Decimal Bridge
- Socratic Mapping: Soc-P001 decimal branch

## Template T008 - Negative coefficient
- Template ID: P001-T008
- Question Type: Direct computation
- Cognitive Skill: Apply signed division
- Difficulty: 2
- Estimated Time: 25 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve equations of the form `-ax = b`.
- Example Question: Solve `-4r = 28`.
- Answer: `r = -7`
- Explanation: Divide both sides by `-4`: `r = 28 / -4 = -7`.
- Distractors: `r = 7`; `r = -112`; `r = 24`; `r = -4`
- Distractor Rationale: Drops the negative sign; multiplies instead of divides; subtracts 4 from 28; uses coefficient as answer.
- Randomization Rules: Choose coefficient `-c` where `c` is 2 to 12 and solution `s` from -12 to 12; set right side `b = -c * s`.
- Validity Constraints: Exclude coefficient 0 and solution 0 when the focus is sign reasoning.
- Metadata: `{ "template_id": "P001-T008", "phase_id": "P001", "topic": "One-step linear equations", "subtopic": "Negative coefficients", "question_type": "Direct computation", "cognitive_skill": "Apply signed division", "difficulty": 2, "estimated_time_seconds": 25, "visual_required": false, "equation_battle_compatible": true, "boss_compatible": true, "hint_sequence_id": "H-P001-T008", "tutorial_id": "Tut-P001", "socratic_dialogue_id": "Soc-P001", "prerequisites": ["signed division", "multiplication by negative"], "misconception_tags": ["sign error", "multiplies instead of divides"], "randomization_constraints": ["negative nonzero coefficient", "integer solution"] }`
- Graph/Visual Variant: Show four negative groups totaling positive 28, so each variable value must be negative.
- Modeling Variant: "Four identical traps each change health by `r`; together they cause a +28 reversal because each trap is marked with a negative effect. Find `r`."
- Reverse Variant: "Write a negative-coefficient equation with solution `r = -7`."
- Equation Battle Variant: The correct card is "divide both sides by -4."
- Multi-stage Boss Variant: Include a sign prediction before calculation.
- Hint Mapping: H-P001-T008
- Tutorial Mapping: Tut-P001 sections Common Mistakes and Mastery Check
- Socratic Mapping: Soc-P001 sign branch

## Template T009 - Variable plus negative constant
- Template ID: P001-T009
- Question Type: Error detection
- Cognitive Skill: Interpret adding a negative
- Difficulty: 2
- Estimated Time: 30 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve equations of the form `x + (-a) = b` and recognize it as subtraction.
- Example Question: Solve `q + (-6) = 13`.
- Answer: `q = 19`
- Explanation: Adding `-6` is the same as subtracting 6, so add 6 to both sides: `q = 13 + 6 = 19`.
- Distractors: `q = 7`; `q = -19`; `q = 6`; `q = 13`
- Distractor Rationale: Subtracts 6; flips final sign; uses the constant; copies the right side.
- Randomization Rules: Choose negative addend `-a` with `a` from 2 to 15 and solution `s`; set right side `b = s - a`.
- Validity Constraints: Display the negative addend with parentheses to prevent notation ambiguity.
- Metadata: `{ "template_id": "P001-T009", "phase_id": "P001", "topic": "One-step linear equations", "subtopic": "Adding negatives", "question_type": "Error detection", "cognitive_skill": "Interpret adding a negative", "difficulty": 2, "estimated_time_seconds": 30, "visual_required": false, "equation_battle_compatible": true, "boss_compatible": true, "hint_sequence_id": "H-P001-T009", "tutorial_id": "Tut-P001", "socratic_dialogue_id": "Soc-P001", "prerequisites": ["adding negative numbers", "inverse operations"], "misconception_tags": ["integer sign error", "uses same operation"], "randomization_constraints": ["negative addend shown in parentheses", "integer solution"] }`
- Graph/Visual Variant: Use a number line: from `q`, move 6 left to land at 13; reverse by moving 6 right.
- Modeling Variant: "After a -6 score change, a player has 13 points. What was the score before the change?"
- Reverse Variant: "Write an equation using `+ (-6)` that has solution 19."
- Equation Battle Variant: The player removes `+ (-6)` by adding 6 to both sides.
- Multi-stage Boss Variant: Ask whether `+ (-6)` behaves like addition or subtraction, then solve.
- Hint Mapping: H-P001-T009
- Tutorial Mapping: Tut-P001 sections Prerequisite Check and Common Mistakes
- Socratic Mapping: Soc-P001 integer branch

## Template T010 - Variable minus negative constant
- Template ID: P001-T010
- Question Type: Best next step
- Cognitive Skill: Interpret subtracting a negative
- Difficulty: 3
- Estimated Time: 35 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve equations of the form `x - (-a) = b`.
- Example Question: Solve `z - (-5) = 18`.
- Answer: `z = 13`
- Explanation: Subtracting `-5` is the same as adding 5, so subtract 5 from both sides: `z = 18 - 5 = 13`.
- Distractors: `z = 23`; `z = -13`; `z = 5`; `z = 18`
- Distractor Rationale: Adds 5 instead of undoing the addition; sign flip error; uses the constant; copies right side.
- Randomization Rules: Choose `a` from 2 to 12 and solution `s`; set right side `b = s + a`.
- Validity Constraints: Use explicit parentheses around the negative constant.
- Metadata: `{ "template_id": "P001-T010", "phase_id": "P001", "topic": "One-step linear equations", "subtopic": "Subtracting negatives", "question_type": "Best next step", "cognitive_skill": "Interpret subtracting a negative", "difficulty": 3, "estimated_time_seconds": 35, "visual_required": false, "equation_battle_compatible": true, "boss_compatible": true, "hint_sequence_id": "H-P001-T010", "tutorial_id": "Tut-P001", "socratic_dialogue_id": "Soc-P001", "prerequisites": ["subtracting negative numbers", "inverse operations"], "misconception_tags": ["integer sign error", "uses same operation"], "randomization_constraints": ["negative subtrahend shown in parentheses", "right side = s + a"] }`
- Graph/Visual Variant: Number line: `z - (-5)` means move 5 right from `z`; reverse by moving 5 left.
- Modeling Variant: "Removing a -5 penalty raises a player's displayed score to 18. What was the score before removing it?"
- Reverse Variant: "Write an equation using subtraction of a negative with solution 13."
- Equation Battle Variant: The correct action card is "subtract 5 from both sides."
- Multi-stage Boss Variant: Include a sign simplification step before the inverse operation.
- Hint Mapping: H-P001-T010
- Tutorial Mapping: Tut-P001 sections Common Mistakes and Guided Practice
- Socratic Mapping: Soc-P001 integer branch

## Template T011 - Solution check by substitution
- Template ID: P001-T011
- Question Type: True/False
- Cognitive Skill: Verify a solution
- Difficulty: 2
- Estimated Time: 30 seconds
- Visual Required: false
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Determine whether a proposed value solves a one-step equation.
- Example Question: Is `x = -3` a solution of `x + 8 = 5`?
- Answer: Yes, because `-3 + 8 = 5`.
- Explanation: Substitute `-3` for `x`; the left side becomes 5, matching the right side.
- Distractors: "No, because `3 + 8 = 11`"; "No, because `-3 - 8 = -11`"; "Yes, because the numbers 3, 5, and 8 are close"; "No, because solutions cannot be negative"
- Distractor Rationale: Drops the negative sign; uses the wrong operation; relies on informal closeness; rejects negative solutions.
- Randomization Rules: Generate one true and one false proposed value for each equation family; require exact equality after substitution.
- Validity Constraints: The proposed value must make the equation exactly true or exactly false; avoid approximate decimal equality.
- Metadata: `{ "template_id": "P001-T011", "phase_id": "P001", "topic": "One-step linear equations", "subtopic": "Checking solutions", "question_type": "True/False", "cognitive_skill": "Verify a solution", "difficulty": 2, "estimated_time_seconds": 30, "visual_required": false, "equation_battle_compatible": false, "boss_compatible": true, "hint_sequence_id": "H-P001-T011", "tutorial_id": "Tut-P001", "socratic_dialogue_id": "Soc-P001", "prerequisites": ["substitution", "integer arithmetic"], "misconception_tags": ["does not check by substitution", "negative solution misconception"], "randomization_constraints": ["proposed value is exact", "include true and false cases"] }`
- Graph/Visual Variant: Table with columns proposed `x`, left side value, right side value, match yes/no.
- Modeling Variant: "A claimed treasure count is tested against the equation before accepting it."
- Reverse Variant: "Find a value that makes `x + 8 = 5` true."
- Equation Battle Variant: Not an Equation Battle move; use as a battle review gate after a solve.
- Multi-stage Boss Variant: A boss may present two claimed solutions and require proof by substitution.
- Hint Mapping: H-P001-T011
- Tutorial Mapping: Tut-P001 sections Check Your Answer
- Socratic Mapping: Soc-P001 checking branch

## Template T012 - Choose the correct inverse operation
- Template ID: P001-T012
- Question Type: Best next step
- Cognitive Skill: Select operation
- Difficulty: 2
- Estimated Time: 25 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Identify the correct inverse operation before solving.
- Example Question: For `k / 6 = -2`, what is the best next step?
- Answer: Multiply both sides by 6.
- Explanation: Since `k` is divided by 6, multiplying by 6 undoes the division.
- Distractors: "Divide both sides by 6"; "Add 6 to both sides"; "Subtract 6 from both sides"; "Multiply only the left side by 6"
- Distractor Rationale: Repeats the same operation; treats 6 as an added constant; treats 6 as a subtracted constant; violates equality.
- Randomization Rules: Use one-step equations from addition, subtraction, multiplication, and division families; ask only for the operation.
- Validity Constraints: Exactly one operation must be the clean inverse operation.
- Metadata: `{ "template_id": "P001-T012", "phase_id": "P001", "topic": "One-step linear equations", "subtopic": "Inverse operation selection", "question_type": "Best next step", "cognitive_skill": "Select operation", "difficulty": 2, "estimated_time_seconds": 25, "visual_required": false, "equation_battle_compatible": true, "boss_compatible": true, "hint_sequence_id": "H-P001-T012", "tutorial_id": "Tut-P001", "socratic_dialogue_id": "Soc-P001", "prerequisites": ["inverse operations", "meaning of equality"], "misconception_tags": ["uses same operation", "changes one side only"], "randomization_constraints": ["one correct inverse operation", "operation choices are distinct"] }`
- Graph/Visual Variant: Highlight the operation attached to the variable and show its inverse as a matching key.
- Modeling Variant: "Choose the spell that unlocks the equation gate before calculating."
- Reverse Variant: "Given the action 'multiply both sides by 6,' write a one-step equation where that is the correct first move."
- Equation Battle Variant: This template is a pure Equation Battle action-selection round.
- Multi-stage Boss Variant: The selected action is carried into a later solve step.
- Hint Mapping: H-P001-T012
- Tutorial Mapping: Tut-P001 sections Core Concept and Guided Practice
- Socratic Mapping: Soc-P001 operation-choice branch

## Template T013 - Missing step after inverse operation
- Template ID: P001-T013
- Question Type: Missing step
- Cognitive Skill: Complete balanced transformation
- Difficulty: 2
- Estimated Time: 30 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Fill in the missing balanced step in a one-step solve.
- Example Question: Complete the step: `x - 12 = 4`, so `x - 12 + 12 = 4 + ___`.
- Answer: `12`
- Explanation: To keep the equation balanced, add 12 to both sides.
- Distractors: `-12`; `4`; `x`; `16`
- Distractor Rationale: Uses the original subtraction sign; copies right side; writes the variable instead of the operation amount; jumps to the solution.
- Randomization Rules: Use equations with addition or subtraction constants; remove the matching number from the right-side operation.
- Validity Constraints: The blank must have exactly one correct expression for the shown step.
- Metadata: `{ "template_id": "P001-T013", "phase_id": "P001", "topic": "One-step linear equations", "subtopic": "Balanced steps", "question_type": "Missing step", "cognitive_skill": "Complete balanced transformation", "difficulty": 2, "estimated_time_seconds": 30, "visual_required": false, "equation_battle_compatible": true, "boss_compatible": true, "hint_sequence_id": "H-P001-T013", "tutorial_id": "Tut-P001", "socratic_dialogue_id": "Soc-P001", "prerequisites": ["equality preservation", "inverse operations"], "misconception_tags": ["changes one side only", "wrong inverse operation"], "randomization_constraints": ["blank is operation amount", "one correct completion"] }`
- Graph/Visual Variant: Balance scale shows adding the same weight to both pans.
- Modeling Variant: "A bridge stays level only when the same repair block is added to both sides."
- Reverse Variant: "Write the original equation that would make `+12` the missing balanced step."
- Equation Battle Variant: The battle interface asks the player to complete both-side action syntax.
- Multi-stage Boss Variant: The missing step appears before the final solution input.
- Hint Mapping: H-P001-T013
- Tutorial Mapping: Tut-P001 sections Equality Rule
- Socratic Mapping: Soc-P001 balance branch

## Template T014 - Order the solve and check steps
- Template ID: P001-T014
- Question Type: Order the steps
- Cognitive Skill: Sequence reasoning
- Difficulty: 3
- Estimated Time: 45 seconds
- Visual Required: false
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Arrange the logical sequence for solving and checking a one-step equation.
- Example Question: Put these steps in order for `t + 4 = -9`: A. Check `-13 + 4 = -9`; B. Subtract 4 from both sides; C. `t = -13`; D. Notice 4 is added to `t`.
- Answer: D, B, C, A
- Explanation: First identify the operation, then undo it on both sides, then state the solution, then check it.
- Distractors: B, D, C, A; D, C, B, A; A, D, B, C; D, B, A, C
- Distractor Rationale: Acts before identifying; states solution before doing the operation; checks before solving; checks before the solution is stated.
- Randomization Rules: Use four steps: identify operation, inverse operation, solution, check.
- Validity Constraints: Steps must have a single logical order; check must match the generated solution.
- Metadata: `{ "template_id": "P001-T014", "phase_id": "P001", "topic": "One-step linear equations", "subtopic": "Solution process", "question_type": "Order the steps", "cognitive_skill": "Sequence reasoning", "difficulty": 3, "estimated_time_seconds": 45, "visual_required": false, "equation_battle_compatible": false, "boss_compatible": true, "hint_sequence_id": "H-P001-T014", "tutorial_id": "Tut-P001", "socratic_dialogue_id": "Soc-P001", "prerequisites": ["inverse operations", "checking solutions"], "misconception_tags": ["procedural order confusion", "does not check by substitution"], "randomization_constraints": ["four unique step cards", "single correct order"] }`
- Graph/Visual Variant: Show step cards snapping into a timeline.
- Modeling Variant: "Arrange the ritual steps to unlock an equation door."
- Reverse Variant: "Given the ordered steps, identify the original equation."
- Equation Battle Variant: Not a direct battle action; useful as pre-battle strategy training.
- Multi-stage Boss Variant: Boss requires ordering before allowing numerical solving.
- Hint Mapping: H-P001-T014
- Tutorial Mapping: Tut-P001 sections Worked Example and Check Your Answer
- Socratic Mapping: Soc-P001 sequencing branch

## Template T015 - Always/Sometimes/Never inverse claim
- Template ID: P001-T015
- Question Type: Always/Sometimes/Never
- Cognitive Skill: Conceptual classification
- Difficulty: 3
- Estimated Time: 40 seconds
- Visual Required: false
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Classify general claims about one-step equation solving.
- Example Question: Always, sometimes, or never true? "To solve a one-step equation, you should do the same operation that already appears next to the variable."
- Answer: Never true as a solving move for isolating the variable; you use the inverse operation.
- Explanation: If `x + 5 = 9`, adding 5 again gives `x + 10 = 14`, not `x` alone. The inverse operation, subtracting 5, isolates `x`.
- Distractors: Always; Sometimes because it works with easy numbers; Sometimes because addition and multiplication are both operations; Always if both sides are changed.
- Distractor Rationale: Confuses balanced with useful; relies on coincidental arithmetic; confuses operation categories; ignores isolation goal.
- Randomization Rules: Generate conceptual claims about inverse operations, equality preservation, and checking.
- Validity Constraints: Avoid claims where edge cases make the answer ambiguous; include a counterexample for "never" or "sometimes" items.
- Metadata: `{ "template_id": "P001-T015", "phase_id": "P001", "topic": "One-step linear equations", "subtopic": "Conceptual claims", "question_type": "Always/Sometimes/Never", "cognitive_skill": "Conceptual classification", "difficulty": 3, "estimated_time_seconds": 40, "visual_required": false, "equation_battle_compatible": false, "boss_compatible": true, "hint_sequence_id": "H-P001-T015", "tutorial_id": "Tut-P001", "socratic_dialogue_id": "Soc-P001", "prerequisites": ["inverse operations", "isolation"], "misconception_tags": ["uses same operation", "confuses balance with isolation"], "randomization_constraints": ["claim has unambiguous classification", "counterexample available"] }`
- Graph/Visual Variant: Show two paths from `x + 5 = 9`: adding 5 keeps clutter, subtracting 5 isolates.
- Modeling Variant: "Choose whether a strategy rule is reliable before entering a challenge room."
- Reverse Variant: "Write a true always/sometimes/never claim about checking a solution."
- Equation Battle Variant: Use as a rule-check interruption between battle turns.
- Multi-stage Boss Variant: Player must classify the rule and provide a counterexample.
- Hint Mapping: H-P001-T015
- Tutorial Mapping: Tut-P001 sections Why It Matters and Common Mistakes
- Socratic Mapping: Soc-P001 concept branch

## Template T016 - Build the equation from a context
- Template ID: P001-T016
- Question Type: Build the model
- Cognitive Skill: Translate context
- Difficulty: 3
- Estimated Time: 45 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Translate a one-operation situation into a one-step linear equation and solve it.
- Example Question: A player starts with some coins, spends 8 coins, and has 17 coins left. Let `c` be the starting coins. Write and solve an equation.
- Answer: `c - 8 = 17`; `c = 25`
- Explanation: Spending 8 means subtract 8 from the starting amount. Add 8 to both sides to get `c = 25`.
- Distractors: `c + 8 = 17`, `c = 9`; `8c = 17`, `c = 2.125`; `c - 17 = 8`, `c = 25`; `c = 17`
- Distractor Rationale: Reverses spending; treats 8 as a multiplier; writes a different but related equation with same solution but wrong story relation; ignores the spent amount.
- Randomization Rules: Use contexts with gain, loss, equal groups, or sharing; define the variable explicitly.
- Validity Constraints: The equation must match the story, not only produce the same numerical answer.
- Metadata: `{ "template_id": "P001-T016", "phase_id": "P001", "topic": "One-step linear equations", "subtopic": "Model building", "question_type": "Build the model", "cognitive_skill": "Translate context", "difficulty": 3, "estimated_time_seconds": 45, "visual_required": false, "equation_battle_compatible": true, "boss_compatible": true, "hint_sequence_id": "H-P001-T016", "tutorial_id": "Tut-P001", "socratic_dialogue_id": "Soc-P001", "prerequisites": ["reading context", "addition and subtraction meanings"], "misconception_tags": ["model operation reversal", "copies final amount"], "randomization_constraints": ["variable defined", "story operation maps to one equation operation"] }`
- Graph/Visual Variant: Use a before-after bar model: unknown start, minus 8, final 17.
- Modeling Variant: This is the core modeling template.
- Reverse Variant: "Write a story that matches `c - 8 = 17`."
- Equation Battle Variant: After building the equation, use the "add 8 to both sides" battle action.
- Multi-stage Boss Variant: Stage 1 builds the equation, Stage 2 solves, Stage 3 explains why the operation matches spending.
- Hint Mapping: H-P001-T016
- Tutorial Mapping: Tut-P001 sections Why It Matters and Guided Practice
- Socratic Mapping: Soc-P001 modeling branch

## Template T017 - Interpret the solution in context
- Template ID: P001-T017
- Question Type: Model interpretation
- Cognitive Skill: Interpret result
- Difficulty: 3
- Estimated Time: 40 seconds
- Visual Required: false
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Explain what the solution means in the original situation.
- Example Question: The equation `g / 3 = 14` represents 3 equal treasure chests with 14 gems in each chest. What does the solution mean?
- Answer: `g = 42`; there are 42 gems total.
- Explanation: Multiplying both sides by 3 gives the total number of gems before splitting into 3 equal chests.
- Distractors: "There are 14 gems total"; "There are 3 gems total"; "There are 11 gems total"; "Each chest has 42 gems"
- Distractor Rationale: Copies the per-chest amount; copies the number of chests; subtracts instead of multiplying; confuses total with each group.
- Randomization Rules: Use sharing or grouping contexts with a clear unit for the variable.
- Validity Constraints: The answer must include both value and meaning/unit.
- Metadata: `{ "template_id": "P001-T017", "phase_id": "P001", "topic": "One-step linear equations", "subtopic": "Context interpretation", "question_type": "Model interpretation", "cognitive_skill": "Interpret result", "difficulty": 3, "estimated_time_seconds": 40, "visual_required": false, "equation_battle_compatible": false, "boss_compatible": true, "hint_sequence_id": "H-P001-T017", "tutorial_id": "Tut-P001", "socratic_dialogue_id": "Soc-P001", "prerequisites": ["division meaning", "units in context"], "misconception_tags": ["unit confusion", "copies right side"], "randomization_constraints": ["context has clear units", "solution is practical"] }`
- Graph/Visual Variant: Show 3 boxes with 14 items each, then combine into a total.
- Modeling Variant: This template emphasizes interpretation after solving.
- Reverse Variant: "Given the interpretation '42 gems total,' write a matching equation with 3 equal chests."
- Equation Battle Variant: Not direct; can follow an Equation Battle solve as the final explanation gate.
- Multi-stage Boss Variant: Boss accepts the numerical solution only if the player chooses the correct contextual meaning.
- Hint Mapping: H-P001-T017
- Tutorial Mapping: Tut-P001 sections Why It Matters and Mastery Check
- Socratic Mapping: Soc-P001 interpretation branch

## Template T018 - Counterexample to an invalid move
- Template ID: P001-T018
- Question Type: Counterexample
- Cognitive Skill: Justify by example
- Difficulty: 4
- Estimated Time: 50 seconds
- Visual Required: false
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Use a counterexample to disprove an unsound equation-solving rule.
- Example Question: A player claims, "In `x + 6 = 10`, I can subtract 6 only from the left side because that is where the 6 is." Give a counterexample or explanation showing why this is invalid.
- Answer: Subtracting 6 only from the left gives `x = 10`, but the original equation would then be `10 + 6 = 10`, which is false. The valid move is subtracting 6 from both sides, giving `x = 4`.
- Explanation: Equality is preserved only when the same operation is applied to both sides.
- Distractors: "The claim is valid because the 6 is on the left"; "The answer is 10"; "The answer is 16"; "No operation is needed"
- Distractor Rationale: Ignores balance; accepts the one-side result; adds instead of subtracts; avoids solving.
- Randomization Rules: Use one-side operation mistakes from addition, subtraction, multiplication, or division equations.
- Validity Constraints: Counterexample must show the claimed result fails substitution.
- Metadata: `{ "template_id": "P001-T018", "phase_id": "P001", "topic": "One-step linear equations", "subtopic": "Invalid moves", "question_type": "Counterexample", "cognitive_skill": "Justify by example", "difficulty": 4, "estimated_time_seconds": 50, "visual_required": false, "equation_battle_compatible": false, "boss_compatible": true, "hint_sequence_id": "H-P001-T018", "tutorial_id": "Tut-P001", "socratic_dialogue_id": "Soc-P001", "prerequisites": ["checking solutions", "equality preservation"], "misconception_tags": ["changes one side only", "does not check by substitution"], "randomization_constraints": ["invalid claim has clear failed result", "valid solution is simple"] }`
- Graph/Visual Variant: Balance scale tips when weight is removed from only one side.
- Modeling Variant: "A one-sided spell breaks the bridge balance; prove it with numbers."
- Reverse Variant: "Write an invalid one-sided move for `x - 3 = 8` and explain why it fails."
- Equation Battle Variant: Use as a battle penalty review when the player tries a one-side action.
- Multi-stage Boss Variant: Player must reject the invalid rule, solve correctly, and check both.
- Hint Mapping: H-P001-T018
- Tutorial Mapping: Tut-P001 sections Equality Rule and Common Mistakes
- Socratic Mapping: Soc-P001 balance branch

## Template T019 - Number of solutions for a one-step equation
- Template ID: P001-T019
- Question Type: Number of solutions
- Cognitive Skill: Structural reasoning
- Difficulty: 4
- Estimated Time: 45 seconds
- Visual Required: false
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Recognize that a valid one-step linear equation with nonzero variable coefficient has exactly one solution.
- Example Question: How many solutions does `7x = 0` have?
- Answer: Exactly one solution, `x = 0`.
- Explanation: Divide both sides by 7. A nonzero number times only one value, 0, gives 0.
- Distractors: "No solutions"; "Infinitely many solutions"; "Seven solutions"; "Two solutions, 7 and 0"
- Distractor Rationale: Thinks zero right side is impossible; confuses with identity equations; treats coefficient as count; treats visible numbers as solutions.
- Randomization Rules: Use equations `ax = b` with `a` nonzero; vary `b`, including zero.
- Validity Constraints: Coefficient must not be zero; otherwise the number of solutions may change.
- Metadata: `{ "template_id": "P001-T019", "phase_id": "P001", "topic": "One-step linear equations", "subtopic": "Number of solutions", "question_type": "Number of solutions", "cognitive_skill": "Structural reasoning", "difficulty": 4, "estimated_time_seconds": 45, "visual_required": false, "equation_battle_compatible": false, "boss_compatible": true, "hint_sequence_id": "H-P001-T019", "tutorial_id": "Tut-P001", "socratic_dialogue_id": "Soc-P001", "prerequisites": ["zero in multiplication", "division by nonzero"], "misconception_tags": ["zero solution misconception", "coefficient as answer"], "randomization_constraints": ["nonzero coefficient", "single solution"] }`
- Graph/Visual Variant: Optional graph of `y = 7x` and `y = 0`, intersecting once at `(0,0)`.
- Modeling Variant: "Seven equal energy cells total 0 energy. What must each cell contain?"
- Reverse Variant: "Write a one-step equation with exactly one solution, `x = 0`."
- Equation Battle Variant: Not direct; use as a reasoning checkpoint before boss fights.
- Multi-stage Boss Variant: Player states the number of solutions, solves, and checks.
- Hint Mapping: H-P001-T019
- Tutorial Mapping: Tut-P001 sections Mastery Check and Transfer
- Socratic Mapping: Soc-P001 structure branch

## Template T020 - Multi-stage one-step boss challenge
- Template ID: P001-T020
- Question Type: Boss challenge
- Cognitive Skill: Integrated reasoning
- Difficulty: 5
- Estimated Time: 90 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Solve, check, interpret, and explain a one-step equation under mixed presentation.
- Example Question: Boss Gate: A hidden value is divided by `-3`, giving `8`. 1. Write the equation. 2. Choose the inverse operation. 3. Solve. 4. Check the solution.
- Answer: 1. `v / -3 = 8`; 2. multiply both sides by `-3`; 3. `v = -24`; 4. `-24 / -3 = 8`, so the solution works.
- Explanation: Division by `-3` is undone by multiplication by `-3`. The check confirms that the negative divided by a negative gives positive 8.
- Distractors: `v = 24`; `v = -11`; `v = 5`; equation `-3v = 8`
- Distractor Rationale: Sign error; subtracts 3 instead of multiplying; divides 8 by -3 or subtracts incorrectly; misreads division as multiplication.
- Randomization Rules: Combine a context sentence, equation construction, inverse-operation choice, solve, and check; use addition, subtraction, multiplication, division, fractions, decimals, or negative coefficients.
- Validity Constraints: Each stage must have one correct path; if using contexts, units must remain clear; arithmetic must be checkable.
- Metadata: `{ "template_id": "P001-T020", "phase_id": "P001", "topic": "One-step linear equations", "subtopic": "Integrated boss challenge", "question_type": "Boss challenge", "cognitive_skill": "Integrated reasoning", "difficulty": 5, "estimated_time_seconds": 90, "visual_required": false, "equation_battle_compatible": true, "boss_compatible": true, "hint_sequence_id": "H-P001-T020", "tutorial_id": "Tut-P001", "socratic_dialogue_id": "Soc-P001", "prerequisites": ["inverse operations", "signed arithmetic", "checking solutions", "model translation"], "misconception_tags": ["sign error", "model operation reversal", "does not check by substitution"], "randomization_constraints": ["stage answers are consistent", "one correct inverse operation per equation"] }`
- Graph/Visual Variant: Boss interface can show a locked gate with four locks: model, move, solve, check.
- Modeling Variant: The hidden value sentence is the model.
- Reverse Variant: "Design a boss gate whose solution is `v = -24` and whose inverse operation is multiply by `-3`."
- Equation Battle Variant: The inverse operation stage is an Equation Battle turn.
- Multi-stage Boss Variant: This is the phase boss template.
- Hint Mapping: H-P001-T020
- Tutorial Mapping: Tut-P001 sections Full Phase Review
- Socratic Mapping: Soc-P001 boss branch

# Part II - Hint Bible

## H-P001-T001
- Hint 1 - Gentle Nudge: Look at what is being added to `x`.
- Hint 2 - Concept Reminder: Addition is undone by subtraction.
- Hint 3 - Focus Hint: The `+7` is keeping `x` from being alone.
- Hint 4 - Guided Next Step: Subtract 7 from both sides of `x + 7 = 15`.
- Hint 5 - Nearly Complete: `x = 15 - 7`.
- Hint 6 - Full Solution: `x = 8`; check: `8 + 7 = 15`.

## H-P001-T002
- Hint 1 - Gentle Nudge: Find the operation attached to `y`.
- Hint 2 - Concept Reminder: Subtraction is undone by addition.
- Hint 3 - Focus Hint: The equation has `y - 9`, so undo `-9`.
- Hint 4 - Guided Next Step: Add 9 to both sides.
- Hint 5 - Nearly Complete: `y = -4 + 9`.
- Hint 6 - Full Solution: `y = 5`; check: `5 - 9 = -4`.

## H-P001-T003
- Hint 1 - Gentle Nudge: Read `-n` as "the opposite of `n`."
- Hint 2 - Concept Reminder: The opposite of a value is found by multiplying by `-1`.
- Hint 3 - Focus Hint: If `-n = 11`, then `n` must have the opposite sign of 11.
- Hint 4 - Guided Next Step: Multiply or divide both sides by `-1`.
- Hint 5 - Nearly Complete: `n = 11 / -1`.
- Hint 6 - Full Solution: `n = -11`; check: `-(-11) = 11`.

## H-P001-T004
- Hint 1 - Gentle Nudge: Notice that `a` is multiplied by 5.
- Hint 2 - Concept Reminder: Multiplication is undone by division.
- Hint 3 - Focus Hint: Divide by the coefficient, 5.
- Hint 4 - Guided Next Step: Divide both sides of `5a = -35` by 5.
- Hint 5 - Nearly Complete: `a = -35 / 5`.
- Hint 6 - Full Solution: `a = -7`; check: `5(-7) = -35`.

## H-P001-T005
- Hint 1 - Gentle Nudge: Ask what operation is happening to `b`.
- Hint 2 - Concept Reminder: Division is undone by multiplication.
- Hint 3 - Focus Hint: `b / 4` means `b` has been split into 4 equal parts.
- Hint 4 - Guided Next Step: Multiply both sides by 4.
- Hint 5 - Nearly Complete: `b = 9 * 4`.
- Hint 6 - Full Solution: `b = 36`; check: `36 / 4 = 9`.

## H-P001-T006
- Hint 1 - Gentle Nudge: A fraction coefficient means the variable is being multiplied by a fraction.
- Hint 2 - Concept Reminder: Multiplying by `3/4` is undone by multiplying by `4/3`.
- Hint 3 - Focus Hint: Use the reciprocal of `3/4`.
- Hint 4 - Guided Next Step: Multiply both sides by `4/3`.
- Hint 5 - Nearly Complete: `p = 12 * 4/3`.
- Hint 6 - Full Solution: `p = 16`; check: `(3/4)(16) = 12`.

## H-P001-T007
- Hint 1 - Gentle Nudge: Think of `0.5` as one half.
- Hint 2 - Concept Reminder: If half of a number is 6, the whole number is twice 6.
- Hint 3 - Focus Hint: Divide by `0.5` or multiply by 2.
- Hint 4 - Guided Next Step: Multiply both sides of `0.5m = 6` by 2.
- Hint 5 - Nearly Complete: `m = 6 * 2`.
- Hint 6 - Full Solution: `m = 12`; check: `0.5(12) = 6`.

## H-P001-T008
- Hint 1 - Gentle Nudge: Keep the negative sign with the coefficient.
- Hint 2 - Concept Reminder: To solve `-4r = 28`, divide by the full coefficient `-4`.
- Hint 3 - Focus Hint: A positive divided by a negative is negative.
- Hint 4 - Guided Next Step: Divide both sides by `-4`.
- Hint 5 - Nearly Complete: `r = 28 / -4`.
- Hint 6 - Full Solution: `r = -7`; check: `-4(-7) = 28`.

## H-P001-T009
- Hint 1 - Gentle Nudge: `+ (-6)` means adding a negative number.
- Hint 2 - Concept Reminder: Adding `-6` has the same effect as subtracting 6.
- Hint 3 - Focus Hint: To undo a move 6 units left, move 6 units right.
- Hint 4 - Guided Next Step: Add 6 to both sides.
- Hint 5 - Nearly Complete: `q = 13 + 6`.
- Hint 6 - Full Solution: `q = 19`; check: `19 + (-6) = 13`.

## H-P001-T010
- Hint 1 - Gentle Nudge: Be careful with the two negative signs.
- Hint 2 - Concept Reminder: Subtracting a negative is the same as adding.
- Hint 3 - Focus Hint: `z - (-5)` simplifies to `z + 5`.
- Hint 4 - Guided Next Step: Subtract 5 from both sides.
- Hint 5 - Nearly Complete: `z = 18 - 5`.
- Hint 6 - Full Solution: `z = 13`; check: `13 - (-5) = 18`.

## H-P001-T011
- Hint 1 - Gentle Nudge: To check a solution, replace the variable with the proposed value.
- Hint 2 - Concept Reminder: A solution makes the left side equal the right side.
- Hint 3 - Focus Hint: Substitute `-3` into `x + 8`.
- Hint 4 - Guided Next Step: Compute `-3 + 8`.
- Hint 5 - Nearly Complete: `-3 + 8 = 5`, which matches the right side.
- Hint 6 - Full Solution: Yes, `x = -3` is a solution because `-3 + 8 = 5`.

## H-P001-T012
- Hint 1 - Gentle Nudge: Do not solve yet; first name the operation.
- Hint 2 - Concept Reminder: Division is undone by multiplication.
- Hint 3 - Focus Hint: `k` is divided by 6.
- Hint 4 - Guided Next Step: Choose the move that cancels division by 6.
- Hint 5 - Nearly Complete: Multiplying by 6 will leave `k` alone.
- Hint 6 - Full Solution: Multiply both sides by 6.

## H-P001-T013
- Hint 1 - Gentle Nudge: The same number must be added to both sides.
- Hint 2 - Concept Reminder: `-12` is undone by `+12`.
- Hint 3 - Focus Hint: The left side already shows `+12`.
- Hint 4 - Guided Next Step: Put the matching `12` in the blank on the right side.
- Hint 5 - Nearly Complete: `x - 12 + 12 = 4 + 12`.
- Hint 6 - Full Solution: The blank is `12`; then `x = 16`.

## H-P001-T014
- Hint 1 - Gentle Nudge: Start by understanding what operation is attached to the variable.
- Hint 2 - Concept Reminder: The solution process is identify, undo, solve, check.
- Hint 3 - Focus Hint: For `t + 4 = -9`, the attached operation is `+4`.
- Hint 4 - Guided Next Step: After noticing `+4`, subtract 4 from both sides.
- Hint 5 - Nearly Complete: The solution is `t = -13`, then check it.
- Hint 6 - Full Solution: The order is D, B, C, A.

## H-P001-T015
- Hint 1 - Gentle Nudge: Test the claim on a simple equation.
- Hint 2 - Concept Reminder: Solving means isolating the variable.
- Hint 3 - Focus Hint: In `x + 5 = 9`, adding 5 again does not isolate `x`.
- Hint 4 - Guided Next Step: Compare adding 5 with subtracting 5.
- Hint 5 - Nearly Complete: Adding 5 gives `x + 10 = 14`; subtracting 5 gives `x = 4`.
- Hint 6 - Full Solution: The claim is never true as an isolating move; use the inverse operation.

## H-P001-T016
- Hint 1 - Gentle Nudge: Let the variable represent the starting number of coins.
- Hint 2 - Concept Reminder: Spending coins means subtracting.
- Hint 3 - Focus Hint: Start amount minus 8 equals 17.
- Hint 4 - Guided Next Step: Write `c - 8 = 17`, then add 8 to both sides.
- Hint 5 - Nearly Complete: `c = 17 + 8`.
- Hint 6 - Full Solution: `c - 8 = 17`; `c = 25`; the player started with 25 coins.

## H-P001-T017
- Hint 1 - Gentle Nudge: Identify what `g` represents before solving.
- Hint 2 - Concept Reminder: If a total is split into 3 equal groups, multiply one group by 3 to recover the total.
- Hint 3 - Focus Hint: `g / 3 = 14` means each third has 14 gems.
- Hint 4 - Guided Next Step: Multiply both sides by 3.
- Hint 5 - Nearly Complete: `g = 14 * 3 = 42`.
- Hint 6 - Full Solution: `g = 42`; this means there are 42 gems total.

## H-P001-T018
- Hint 1 - Gentle Nudge: Check what happens if the player's one-sided move is used.
- Hint 2 - Concept Reminder: Equations stay equal only when both sides receive the same operation.
- Hint 3 - Focus Hint: Subtracting 6 only on the left gives `x = 10`.
- Hint 4 - Guided Next Step: Test `x = 10` in the original equation.
- Hint 5 - Nearly Complete: `10 + 6 = 16`, not 10.
- Hint 6 - Full Solution: The one-sided move is invalid; subtract 6 from both sides to get `x = 4`.

## H-P001-T019
- Hint 1 - Gentle Nudge: Ask whether the coefficient of `x` is zero or nonzero.
- Hint 2 - Concept Reminder: A nonzero coefficient can be divided away.
- Hint 3 - Focus Hint: In `7x = 0`, 7 is nonzero.
- Hint 4 - Guided Next Step: Divide both sides by 7.
- Hint 5 - Nearly Complete: `x = 0 / 7`.
- Hint 6 - Full Solution: There is exactly one solution, `x = 0`.

## H-P001-T020
- Hint 1 - Gentle Nudge: Translate "divided by -3, giving 8" into an equation.
- Hint 2 - Concept Reminder: Division by `-3` is undone by multiplication by `-3`.
- Hint 3 - Focus Hint: The equation is `v / -3 = 8`.
- Hint 4 - Guided Next Step: Multiply both sides by `-3`.
- Hint 5 - Nearly Complete: `v = 8(-3) = -24`.
- Hint 6 - Full Solution: `v = -24`; check: `-24 / -3 = 8`.

# Part III - Tutorial Bible

## Learning Goal
Learn to solve one-step linear equations by identifying the operation attached to the variable, applying the inverse operation to both sides, and checking the solution.

## Why It Matters
One-step equations are the first reliable "unlock" skill for algebra. In an RPG, they act like simple gates: if the player understands how to undo one operation while keeping balance, later gates with multiple operations, functions, inequalities, and modeling become much less mysterious.

## Prerequisite Check
Before starting, ask the player:

1. What number makes `x + 3 = 10` true?
2. What operation undoes subtraction?
3. What operation undoes multiplication?
4. What is the opposite of `-8`?

If the player misses two or more, recommend a short arithmetic review on inverse operations and signed numbers before continuing.

## Core Concept
An equation says two expressions are equal. Solving means finding the value of the variable that makes the equality true.

For a one-step equation, the variable has one operation attached to it:

- `x + 5 = 12`: 5 is added, so subtract 5.
- `x - 5 = 12`: 5 is subtracted, so add 5.
- `5x = 20`: `x` is multiplied by 5, so divide by 5.
- `x / 5 = 20`: `x` is divided by 5, so multiply by 5.

The move must be balanced. If you subtract 5 from the left side, subtract 5 from the right side too. Balanced moves keep the equation true while making the variable easier to see.

## Worked Example
Solve `x - 7 = 18`.

Step 1: Identify the operation.
The variable has `-7` attached, so 7 is being subtracted.

Step 2: Choose the inverse operation.
Subtraction is undone by addition, so add 7.

Step 3: Apply it to both sides.
`x - 7 + 7 = 18 + 7`

Step 4: Simplify.
`x = 25`

Step 5: Check.
Replace `x` with 25: `25 - 7 = 18`. The check works, so `x = 25`.

## Fraction/Decimal Bridge
Some one-step equations use fractions or decimals, but the idea is unchanged.

Example: `(3/4)p = 12`

The variable is multiplied by `3/4`. The inverse of multiplying by `3/4` is multiplying by `4/3`.

`p = 12 * 4/3 = 16`

Check: `(3/4)(16) = 12`.

Example: `0.5m = 6`

Since `0.5` is one half, `m` must be twice 6, so `m = 12`.

## Common Mistakes
- Mistake: Adding when the equation already has addition.
  Correction: Use the inverse operation. For `x + 5 = 12`, subtract 5.
- Mistake: Changing only one side.
  Correction: Do the same valid operation to both sides.
- Mistake: Dropping a negative sign.
  Correction: Keep the sign attached to the coefficient. In `-4x = 20`, divide by `-4`.
- Mistake: Treating a fraction coefficient as if it should be multiplied again.
  Correction: Multiply by the reciprocal.
- Mistake: Not checking.
  Correction: Substitute your answer into the original equation, not into a changed version you made by mistake.

## Guided Practice
1. Solve `u + 9 = 14`.
   - Operation attached to variable: add 9.
   - Inverse operation: subtract 9.
   - Solution: `u = 5`.
   - Check: `5 + 9 = 14`.

2. Solve `w / 5 = -3`.
   - Operation attached to variable: divide by 5.
   - Inverse operation: multiply by 5.
   - Solution: `w = -15`.
   - Check: `-15 / 5 = -3`.

3. Solve `-2r = 18`.
   - Operation attached to variable: multiply by -2.
   - Inverse operation: divide by -2.
   - Solution: `r = -9`.
   - Check: `-2(-9) = 18`.

## Independent Practice
1. Solve `x + 11 = 4`. Answer: `x = -7`.
2. Solve `n - 6 = 15`. Answer: `n = 21`.
3. Solve `3a = -24`. Answer: `a = -8`.
4. Solve `b / -4 = 7`. Answer: `b = -28`.
5. Solve `(2/3)y = 10`. Answer: `y = 15`.

## Mastery Check
The player is ready to advance when they can:

1. Solve at least 4 of 5 mixed one-step equations correctly.
2. Choose the correct inverse operation before solving.
3. Check at least one answer by substitution.
4. Explain why changing only one side is invalid.
5. Correctly handle at least one negative coefficient or fraction coefficient.

Mastery check set:

1. `x - 8 = -2`; solution `x = 6`.
2. `-5m = 30`; solution `m = -6`.
3. `q / 7 = -4`; solution `q = -28`.
4. `(5/6)r = 20`; solution `r = 24`.
5. A player starts with `c` coins, gains 12, and has 31. Equation `c + 12 = 31`; solution `c = 19`.

## Adaptive Tutor Messages
- If the player repeatedly uses the same operation instead of the inverse: "You are spotting the number correctly. Now ask: what operation would undo that number's effect on the variable?"
- If the player changes only one side: "The equation is like a balance. Your move can be useful only if both sides receive it."
- If the player makes sign errors: "Pause on the sign before calculating. Is the coefficient positive or negative?"
- If the player overuses hints 4-6: "Try naming the attached operation before seeing the next step. That decision is the main skill."
- If the player solves correctly but cannot check: "Substitute your answer into the original equation. The original equation is the truth test."
- If the player succeeds quickly: "You are ready for mixed one-step equations with negatives, fractions, and short contexts."

## Tutorial Metadata
- Tutorial ID: Tut-P001
- Estimated duration: 4 minutes
- Target player state: first exposure or early review
- Unlock condition: available from any Phase 001 question
- Remediation trigger: two consecutive inverse-operation errors, two sign errors in five questions, or use of Hint 5 or 6 on three consecutive templates
- Advancement trigger: 80 percent accuracy on mixed practice plus successful explanation of one balanced inverse move

# Part IV - Socratic Dialogue Bible

## Opening Diagnostic
Tutor: "When you see `x + 6 = 14`, what is happening to `x`, and what operation would undo it?"

Expected strong answer: "6 is being added, so subtract 6 from both sides."

## Guided Discovery
Tutor sequence:

1. "What is the variable?"
2. "What number or operation is attached to it?"
3. "Is that operation addition, subtraction, multiplication, or division?"
4. "What operation undoes it?"
5. "How can we apply that move while keeping both sides equal?"
6. "After simplifying, what value is the variable?"
7. "How can we check the value in the original equation?"

The tutor asks one question at a time and waits for the player's response before moving on.

## Correct Branch
Player: "Subtract 6 from both sides."

Tutor: "Good. Why both sides, not just the left?"

If player explains balance: "Exactly. Now subtract 6 from 14. What does `x` equal?"

Exit when the player answers `x = 8` and checks `8 + 6 = 14`.

## Partial Understanding Branch
Player: "Subtract 6" but does not mention both sides.

Tutor: "That is the right inverse operation. Where should the subtraction happen so the equation stays balanced?"

If player says both sides, continue to solving. If not, move to the misconception branch.

## Misconception Branch
Player: "Add 6" or changes only one side.

Tutor: "Let's test that idea. If we add 6 to `x + 6 = 14`, does the `+6` disappear or become larger?"

Follow-up: "What operation would make `+6` become 0?"

If one-side error: "If the left side changes but the right side does not, are the two sides guaranteed to remain equal?"

Recovery target: Player states the inverse operation and applies it to both sides.

## Unsure Branch
Player: "I don't know."

Tutor: "No problem. Start smaller: in regular arithmetic, what undoes adding 6?"

If player answers subtraction: "Right. In an equation, we use that same undo move on both sides. What would `14 - 6` be?"

If still unsure, offer Hint 2, then Hint 4.

## Unrelated Response Branch
Player gives an unrelated answer, such as "I like the treasure room."

Tutor: "Let's bring the focus back to the equation gate. In `x + 6 = 14`, what operation do you see next to `x`: addition, subtraction, multiplication, or division?"

If the next answer is still unrelated, switch to a multiple-choice diagnostic with the four operation names.

## Recovery Prompts
- "What operation is attached to the variable?"
- "What operation undoes that?"
- "How do we keep an equation balanced?"
- "What does the right side become after the inverse operation?"
- "Can you check your answer in the original equation?"

## Reflection Question
"What is the difference between doing a balanced move and doing a move that actually isolates the variable?"

Strong reflection: "A balanced move keeps the equation true, but the useful balanced move is the inverse operation because it gets the variable alone."

## Transfer Question
"How would the strategy change for `x - 6 = 14`?"

Expected transfer: "Since 6 is subtracted, add 6 to both sides, so `x = 20`."

## Escalation Rules
- If the player misses the operation identification twice, show Hint 1 and Hint 2.
- If the player chooses the wrong inverse twice, open the tutorial section Core Concept.
- If the player changes only one side twice, open the tutorial section Equality Rule and show a balance-scale visual.
- If the player makes two sign errors in a row, route to signed-number prerequisite review.
- If the player correctly solves three mixed equations and checks one, reduce hint frequency and move to independent practice.

## Exit Condition
The Socratic sequence is complete when the player:

1. Identifies the operation attached to the variable.
2. Chooses the inverse operation.
3. Applies the operation to both sides.
4. Solves accurately.
5. Checks by substitution in the original equation.

# Knowledge Graph

- Prerequisites: integer addition and subtraction; integer multiplication and division; meaning of equality; opposites; basic fraction multiplication; substitution
- Concepts Unlocked: inverse operation; isolated variable; balanced equation transformation; solution checking; one-step model translation; Equation Battle action selection
- Related Concepts: arithmetic fluency; evaluating expressions; signed numbers; fractions and reciprocals; context modeling
- Common Misconceptions: using the same operation instead of the inverse; changing one side only; dropping negative signs; dividing when multiplication is needed; multiplying by a fraction instead of its reciprocal; copying the right side as the answer; confusing total and per-group values
- Remedial Phases: arithmetic facts review; signed number review; fraction reciprocal mini-lesson; equality and balance mini-lesson
- Follow-up Phases: Phase 002 - Multi-step linear equations; Phase 006 - Equation Battle fundamentals; Phase 007 - Linear inequalities
- Transfer Topics: solving formulas; proportional reasoning; linear function inputs; equation-based modeling; checking solutions in systems

# Validation Notes

## Structure Validation
- Includes Phase Metadata, Learning Objectives, Prerequisite Review, Core Concepts, Common Misconceptions, Question Bible, Hint Bible, Tutorial Bible, Socratic Dialogue Bible, Knowledge Graph, and Validation Notes.
- Contains exactly 20 template families, within the required 20-40 range.
- Each template includes question type, cognitive skill, difficulty, estimated time, visual flag, Equation Battle compatibility, boss compatibility, learning objective, example, answer, explanation, distractors, rationale, randomization rules, validity constraints, metadata, variants, and mappings.
- Each template has six progressive hints.

## Math Validation
- T001: `x + 7 = 15` gives `x = 8`; check `8 + 7 = 15`.
- T002: `y - 9 = -4` gives `y = 5`; check `5 - 9 = -4`.
- T003: `-n = 11` gives `n = -11`; check `-(-11) = 11`.
- T004: `5a = -35` gives `a = -7`; check `5(-7) = -35`.
- T005: `b / 4 = 9` gives `b = 36`; check `36 / 4 = 9`.
- T006: `(3/4)p = 12` gives `p = 16`; check `(3/4)(16) = 12`.
- T007: `0.5m = 6` gives `m = 12`; check `0.5(12) = 6`.
- T008: `-4r = 28` gives `r = -7`; check `-4(-7) = 28`.
- T009: `q + (-6) = 13` gives `q = 19`; check `19 + (-6) = 13`.
- T010: `z - (-5) = 18` gives `z = 13`; check `13 - (-5) = 18`.
- T011: `x = -3` satisfies `x + 8 = 5`; check `-3 + 8 = 5`.
- T012: `k / 6 = -2` is undone by multiplying both sides by 6; full solution would be `k = -12`.
- T013: `x - 12 = 4` requires adding 12 to both sides; solution `x = 16`.
- T014: For `t + 4 = -9`, ordered logic D, B, C, A is valid; solution `t = -13`; check `-13 + 4 = -9`.
- T015: The same operation does not isolate the variable in `x + 5 = 9`; inverse subtraction gives `x = 4`.
- T016: `c - 8 = 17` gives `c = 25`; check `25 - 8 = 17`.
- T017: `g / 3 = 14` gives `g = 42`; interpretation is 42 gems total.
- T018: One-sided subtraction from `x + 6 = 10` gives false claim `x = 10`; valid solution is `x = 4`.
- T019: `7x = 0` has one solution because 7 is nonzero; `x = 0`.
- T020: `v / -3 = 8` gives `v = -24`; check `-24 / -3 = 8`.

## Distractor Validation
- Distractors are plausible misconception-based answers rather than absurd choices.
- Multiple-choice-style templates have exactly one correct answer unless the prompt explicitly asks for explanation or classification.
- Distractors were checked against the original equations to avoid accidental correctness.

## Hint Validation
- Each hint sequence moves from noticing the relevant feature to concept reminder, focus, guided action, nearly complete computation, and full solution.
- Early hints avoid giving away the answer.
- Hint 6 includes a full solution and check where appropriate.

## Tutorial Validation
- Tutorial teaches the concept from first principles.
- Includes learning goal, why it matters, prerequisite check, core concept, worked example, common mistakes, guided practice, independent practice, mastery check, adaptive messages, and metadata.
- Includes support for negatives, fractions, decimals, and checking.

## Socratic Validation
- Dialogue includes diagnostic, guided discovery, correct branch, partial-understanding branch, misconception branch, unsure branch, unrelated-response branch, recovery prompts, reflection, transfer, escalation rules, and exit condition.
- The tutor guides before telling and asks one focused question at a time.

## Metadata Validation
- Every template includes phase ID, topic, subtopic, question type, cognitive skill, difficulty, estimated time, visual flag, compatibility flags, hint/tutorial/Socratic IDs, prerequisites, misconception tags, and randomization constraints.

## Known Issues
- The repository specifications differ on the label for Hint 4. This phase uses "Guided Next Step" to match the master prompt language.
- `PHASE_TEMPLATE.md` omits "Common Misconceptions" inside the Knowledge Graph section, but this phase includes it because the master prompt and knowledge graph guide require it.
