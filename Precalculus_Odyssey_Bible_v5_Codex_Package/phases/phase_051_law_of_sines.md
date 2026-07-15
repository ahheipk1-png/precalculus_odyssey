# Phase 051 - Law of sines

## Phase Metadata
- Course: Precalculus Odyssey Bible v5
- Topic: Law of sines
- Subtopic: Solving non-right triangles with angle-side ratios and ambiguous SSA cases
- Prerequisites: Trigonometric ratios, triangle angle sum, inverse sine reasoning, proportions, and rounding
- Related phases: Phase 050 review; Phase 052 follow-up; mixed review and final boss integration
- Estimated phase size: 20 template families, 20 core examples, 120 progressive hints, 1 tutorial sequence, 1 Socratic dialogue system

## Learning Objectives
By the end of this phase, the player can:

1. Recognize the structure of law of sines tasks before choosing a method.
2. Use correct notation, restrictions, and units while solving law of sines questions.
3. Solve tasks involving finding a side with aas information.
4. Solve tasks involving exact side with special angles.
5. Solve tasks involving finding the third angle.
6. Solve tasks involving ambiguous ssa case with two triangles.
7. Solve tasks involving ssa impossible triangle.
8. Solve tasks involving finding a smaller side.
9. Solve tasks involving solving an aas triangle.
10. Solve tasks involving using a common sine ratio.

## Prerequisite Review
- Use the triangle angle sum A + B + C = 180 degrees.
- Match each side with its opposite angle: side a is opposite angle A.
- Solve proportions accurately before rounding.
- Remember that sine can have two angle solutions between 0 degrees and 180 degrees.

## Core Concepts
- The Law of Sines states a/sin A = b/sin B = c/sin C for any triangle.
- Use the Law of Sines when you know an angle-opposite side pair and another side or angle.
- In SSA cases, inverse sine may create zero, one, or two possible triangles.
- A triangle is impossible if the computed sine of an angle is greater than 1.
- After finding an angle, always check that the angle sum stays below 180 degrees.

## Common Misconceptions
- Pairing a side with an adjacent angle instead of its opposite angle.
- Ignoring the second possible angle in an SSA case.
- Accepting an angle set whose sum exceeds 180 degrees.
- Rounding intermediate values so much that the final side is distorted.
- Using Law of Sines when no angle-opposite side pair is known.

# Part I - Question Bible

## Template T001 - Finding a side with AAS information
- Template ID: P051-T001
- Question Type: Skill application
- Cognitive Skill: Finding a side with AAS information
- Difficulty: 2
- Estimated Time: 40 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: false
- Learning Objective: Use law of sines to handle finding a side with aas information.
- Example Question: In triangle ABC, A = 30 degrees, B = 80 degrees, and a = 10. Find b to the nearest tenth.
- Answer: b = 19.7
- Explanation: Use b/sin 80 = 10/sin 30. Then b = 10sin80/sin30 = 20sin80, which is about 19.7.
- Distractors: uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step.
- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.
- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.
- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.
- Metadata: phase_id=P051; prerequisites=[trig_ratios, triangle_angle_sum, proportions, inverse_sine, rounding]; misconception_tags=[side_angle_mismatch, ambiguous_case_ignored, impossible_triangle_missed, rounding_too_early]; randomization_constraints=[single intended answer, phase-level skill match].
- Graph/Visual Variant: Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.
- Modeling Variant: Use the same structure in a short context with units and an interpreted final sentence.
- Reverse Variant: Give the answer and ask for a valid original question or parameter choice that produces it.
- Equation Battle Variant: Ask the player to justify each legal algebraic move when equations are involved.
- Multi-stage Boss Variant: Combine this family with a representation change, a restriction check, and a final interpretation.
- Hint Mapping: H-P051-T001
- Tutorial Mapping: Tut-P051 sections Core Method and Worked Examples
- Socratic Mapping: Soc-P051 branch t001

## Template T002 - Exact side with special angles
- Template ID: P051-T002
- Question Type: Skill application
- Cognitive Skill: Exact side with special angles
- Difficulty: 2
- Estimated Time: 45 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: false
- Learning Objective: Use law of sines to handle exact side with special angles.
- Example Question: In triangle ABC, A = 45 degrees, C = 60 degrees, and a = 12. Find c exactly.
- Answer: c = 6sqrt(6)
- Explanation: Use c/sin60 = 12/sin45. Thus c = 12(sin60)/(sin45) = 12(sqrt(3)/2)/(sqrt(2)/2) = 6sqrt(6).
- Distractors: uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step.
- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.
- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.
- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.
- Metadata: phase_id=P051; prerequisites=[trig_ratios, triangle_angle_sum, proportions, inverse_sine, rounding]; misconception_tags=[side_angle_mismatch, ambiguous_case_ignored, impossible_triangle_missed, rounding_too_early]; randomization_constraints=[single intended answer, phase-level skill match].
- Graph/Visual Variant: Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.
- Modeling Variant: Use the same structure in a short context with units and an interpreted final sentence.
- Reverse Variant: Give the answer and ask for a valid original question or parameter choice that produces it.
- Equation Battle Variant: Ask the player to justify each legal algebraic move when equations are involved.
- Multi-stage Boss Variant: Combine this family with a representation change, a restriction check, and a final interpretation.
- Hint Mapping: H-P051-T002
- Tutorial Mapping: Tut-P051 sections Core Method and Worked Examples
- Socratic Mapping: Soc-P051 branch t002

## Template T003 - Finding the third angle
- Template ID: P051-T003
- Question Type: Skill application
- Cognitive Skill: Finding the third angle
- Difficulty: 2
- Estimated Time: 50 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: false
- Learning Objective: Use law of sines to handle finding the third angle.
- Example Question: In triangle ABC, A = 40 degrees and B = 65 degrees. Find C.
- Answer: C = 75 degrees
- Explanation: The angles of a triangle sum to 180 degrees, so C = 180 - 40 - 65 = 75 degrees.
- Distractors: uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step.
- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.
- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.
- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.
- Metadata: phase_id=P051; prerequisites=[trig_ratios, triangle_angle_sum, proportions, inverse_sine, rounding]; misconception_tags=[side_angle_mismatch, ambiguous_case_ignored, impossible_triangle_missed, rounding_too_early]; randomization_constraints=[single intended answer, phase-level skill match].
- Graph/Visual Variant: Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.
- Modeling Variant: Use the same structure in a short context with units and an interpreted final sentence.
- Reverse Variant: Give the answer and ask for a valid original question or parameter choice that produces it.
- Equation Battle Variant: Ask the player to justify each legal algebraic move when equations are involved.
- Multi-stage Boss Variant: Combine this family with a representation change, a restriction check, and a final interpretation.
- Hint Mapping: H-P051-T003
- Tutorial Mapping: Tut-P051 sections Core Method and Worked Examples
- Socratic Mapping: Soc-P051 branch t003

## Template T004 - Ambiguous SSA case with two triangles
- Template ID: P051-T004
- Question Type: Skill application
- Cognitive Skill: Ambiguous SSA case with two triangles
- Difficulty: 2
- Estimated Time: 55 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: false
- Learning Objective: Use law of sines to handle ambiguous ssa case with two triangles.
- Example Question: In triangle ABC, A = 50 degrees, a = 8, and b = 10. Find the possible values of B to the nearest tenth.
- Answer: B = 73.3 degrees or 106.7 degrees
- Explanation: Use sin B/10 = sin50/8, so sin B = 10sin50/8, about 0.9576. The sine values give B about 73.3 degrees or 106.7 degrees, and both keep the triangle angle sum below 180 degrees.
- Distractors: uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step.
- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.
- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.
- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.
- Metadata: phase_id=P051; prerequisites=[trig_ratios, triangle_angle_sum, proportions, inverse_sine, rounding]; misconception_tags=[side_angle_mismatch, ambiguous_case_ignored, impossible_triangle_missed, rounding_too_early]; randomization_constraints=[single intended answer, phase-level skill match].
- Graph/Visual Variant: Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.
- Modeling Variant: Use the same structure in a short context with units and an interpreted final sentence.
- Reverse Variant: Give the answer and ask for a valid original question or parameter choice that produces it.
- Equation Battle Variant: Ask the player to justify each legal algebraic move when equations are involved.
- Multi-stage Boss Variant: Combine this family with a representation change, a restriction check, and a final interpretation.
- Hint Mapping: H-P051-T004
- Tutorial Mapping: Tut-P051 sections Core Method and Worked Examples
- Socratic Mapping: Soc-P051 branch t004

## Template T005 - SSA impossible triangle
- Template ID: P051-T005
- Question Type: Skill application
- Cognitive Skill: SSA impossible triangle
- Difficulty: 2
- Estimated Time: 60 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: false
- Learning Objective: Use law of sines to handle ssa impossible triangle.
- Example Question: In triangle ABC, A = 30 degrees, a = 5, and b = 12. How many triangles are possible?
- Answer: No triangle is possible.
- Explanation: Use sin B/12 = sin30/5, so sin B = 12(0.5)/5 = 1.2. Since sine cannot be greater than 1, no triangle fits the data.
- Distractors: uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step.
- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.
- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.
- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.
- Metadata: phase_id=P051; prerequisites=[trig_ratios, triangle_angle_sum, proportions, inverse_sine, rounding]; misconception_tags=[side_angle_mismatch, ambiguous_case_ignored, impossible_triangle_missed, rounding_too_early]; randomization_constraints=[single intended answer, phase-level skill match].
- Graph/Visual Variant: Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.
- Modeling Variant: Use the same structure in a short context with units and an interpreted final sentence.
- Reverse Variant: Give the answer and ask for a valid original question or parameter choice that produces it.
- Equation Battle Variant: Ask the player to justify each legal algebraic move when equations are involved.
- Multi-stage Boss Variant: Combine this family with a representation change, a restriction check, and a final interpretation.
- Hint Mapping: H-P051-T005
- Tutorial Mapping: Tut-P051 sections Core Method and Worked Examples
- Socratic Mapping: Soc-P051 branch t005

## Template T006 - Finding a smaller side
- Template ID: P051-T006
- Question Type: Skill application
- Cognitive Skill: Finding a smaller side
- Difficulty: 3
- Estimated Time: 65 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: false
- Learning Objective: Use law of sines to handle finding a smaller side.
- Example Question: In triangle ABC, B = 70 degrees, b = 14, and A = 35 degrees. Find a to the nearest hundredth.
- Answer: a = 8.55
- Explanation: Use a/sin35 = 14/sin70. Then a = 14sin35/sin70, which is about 8.55.
- Distractors: uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step.
- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.
- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.
- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.
- Metadata: phase_id=P051; prerequisites=[trig_ratios, triangle_angle_sum, proportions, inverse_sine, rounding]; misconception_tags=[side_angle_mismatch, ambiguous_case_ignored, impossible_triangle_missed, rounding_too_early]; randomization_constraints=[single intended answer, phase-level skill match].
- Graph/Visual Variant: Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.
- Modeling Variant: Use the same structure in a short context with units and an interpreted final sentence.
- Reverse Variant: Give the answer and ask for a valid original question or parameter choice that produces it.
- Equation Battle Variant: Ask the player to justify each legal algebraic move when equations are involved.
- Multi-stage Boss Variant: Combine this family with a representation change, a restriction check, and a final interpretation.
- Hint Mapping: H-P051-T006
- Tutorial Mapping: Tut-P051 sections Core Method and Worked Examples
- Socratic Mapping: Soc-P051 branch t006

## Template T007 - Solving an AAS triangle
- Template ID: P051-T007
- Question Type: Skill application
- Cognitive Skill: Solving an AAS triangle
- Difficulty: 3
- Estimated Time: 70 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: false
- Learning Objective: Use law of sines to handle solving an aas triangle.
- Example Question: In triangle ABC, A = 32 degrees, B = 78 degrees, and a = 9. Find C, b, and c to the nearest hundredth.
- Answer: C = 70 degrees, b = 16.61, c = 15.96
- Explanation: First C = 180 - 32 - 78 = 70 degrees. Then b = 9sin78/sin32 about 16.61 and c = 9sin70/sin32 about 15.96.
- Distractors: uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step.
- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.
- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.
- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.
- Metadata: phase_id=P051; prerequisites=[trig_ratios, triangle_angle_sum, proportions, inverse_sine, rounding]; misconception_tags=[side_angle_mismatch, ambiguous_case_ignored, impossible_triangle_missed, rounding_too_early]; randomization_constraints=[single intended answer, phase-level skill match].
- Graph/Visual Variant: Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.
- Modeling Variant: Use the same structure in a short context with units and an interpreted final sentence.
- Reverse Variant: Give the answer and ask for a valid original question or parameter choice that produces it.
- Equation Battle Variant: Ask the player to justify each legal algebraic move when equations are involved.
- Multi-stage Boss Variant: Combine this family with a representation change, a restriction check, and a final interpretation.
- Hint Mapping: H-P051-T007
- Tutorial Mapping: Tut-P051 sections Core Method and Worked Examples
- Socratic Mapping: Soc-P051 branch t007

## Template T008 - Using a common sine ratio
- Template ID: P051-T008
- Question Type: Skill application
- Cognitive Skill: Using a common sine ratio
- Difficulty: 3
- Estimated Time: 75 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: false
- Learning Objective: Use law of sines to handle using a common sine ratio.
- Example Question: If a/sin A = 18 and C = 40 degrees, find c to the nearest hundredth.
- Answer: c = 11.57
- Explanation: The Law of Sines gives c/sin C = 18. Therefore c = 18sin40, which is about 11.57.
- Distractors: uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step.
- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.
- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.
- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.
- Metadata: phase_id=P051; prerequisites=[trig_ratios, triangle_angle_sum, proportions, inverse_sine, rounding]; misconception_tags=[side_angle_mismatch, ambiguous_case_ignored, impossible_triangle_missed, rounding_too_early]; randomization_constraints=[single intended answer, phase-level skill match].
- Graph/Visual Variant: Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.
- Modeling Variant: Use the same structure in a short context with units and an interpreted final sentence.
- Reverse Variant: Give the answer and ask for a valid original question or parameter choice that produces it.
- Equation Battle Variant: Ask the player to justify each legal algebraic move when equations are involved.
- Multi-stage Boss Variant: Combine this family with a representation change, a restriction check, and a final interpretation.
- Hint Mapping: H-P051-T008
- Tutorial Mapping: Tut-P051 sections Core Method and Worked Examples
- Socratic Mapping: Soc-P051 branch t008

## Template T009 - Choosing the correct opposite pair
- Template ID: P051-T009
- Question Type: Skill application
- Cognitive Skill: Choosing the correct opposite pair
- Difficulty: 3
- Estimated Time: 80 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: false
- Learning Objective: Use law of sines to handle choosing the correct opposite pair.
- Example Question: In triangle ABC, A = 42 degrees, C = 68 degrees, and c = 15. Find a to the nearest tenth.
- Answer: a = 10.8
- Explanation: Use a/sin42 = 15/sin68 because a is opposite A and c is opposite C. Then a = 15sin42/sin68, about 10.8.
- Distractors: uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step.
- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.
- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.
- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.
- Metadata: phase_id=P051; prerequisites=[trig_ratios, triangle_angle_sum, proportions, inverse_sine, rounding]; misconception_tags=[side_angle_mismatch, ambiguous_case_ignored, impossible_triangle_missed, rounding_too_early]; randomization_constraints=[single intended answer, phase-level skill match].
- Graph/Visual Variant: Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.
- Modeling Variant: Use the same structure in a short context with units and an interpreted final sentence.
- Reverse Variant: Give the answer and ask for a valid original question or parameter choice that produces it.
- Equation Battle Variant: Ask the player to justify each legal algebraic move when equations are involved.
- Multi-stage Boss Variant: Combine this family with a representation change, a restriction check, and a final interpretation.
- Hint Mapping: H-P051-T009
- Tutorial Mapping: Tut-P051 sections Core Method and Worked Examples
- Socratic Mapping: Soc-P051 branch t009

## Template T010 - Finding an angle from side ratio
- Template ID: P051-T010
- Question Type: Skill application
- Cognitive Skill: Finding an angle from side ratio
- Difficulty: 3
- Estimated Time: 85 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: false
- Learning Objective: Use law of sines to handle finding an angle from side ratio.
- Example Question: In triangle ABC, A = 110 degrees, a = 20, and b = 12. Find B to the nearest tenth.
- Answer: B = 34.3 degrees
- Explanation: Use sin B/12 = sin110/20, so sin B is about 0.5638. The inverse sine gives 34.3 degrees; the supplement would make the angle sum exceed 180 degrees, so only 34.3 degrees works.
- Distractors: uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step.
- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.
- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.
- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.
- Metadata: phase_id=P051; prerequisites=[trig_ratios, triangle_angle_sum, proportions, inverse_sine, rounding]; misconception_tags=[side_angle_mismatch, ambiguous_case_ignored, impossible_triangle_missed, rounding_too_early]; randomization_constraints=[single intended answer, phase-level skill match].
- Graph/Visual Variant: Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.
- Modeling Variant: Use the same structure in a short context with units and an interpreted final sentence.
- Reverse Variant: Give the answer and ask for a valid original question or parameter choice that produces it.
- Equation Battle Variant: Ask the player to justify each legal algebraic move when equations are involved.
- Multi-stage Boss Variant: Combine this family with a representation change, a restriction check, and a final interpretation.
- Hint Mapping: H-P051-T010
- Tutorial Mapping: Tut-P051 sections Core Method and Worked Examples
- Socratic Mapping: Soc-P051 branch t010

## Template T011 - Ambiguous SSA with side lengths
- Template ID: P051-T011
- Question Type: Skill application
- Cognitive Skill: Ambiguous SSA with side lengths
- Difficulty: 3
- Estimated Time: 90 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: false
- Learning Objective: Use law of sines to handle ambiguous ssa with side lengths.
- Example Question: In triangle ABC, A = 30 degrees, a = 10, and b = 15. Find the possible values of B to the nearest tenth.
- Answer: B = 48.6 degrees or 131.4 degrees
- Explanation: Use sin B/15 = sin30/10, so sin B = 0.75. The two possible angles are about 48.6 degrees and 131.4 degrees, and both leave a positive third angle.
- Distractors: uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step.
- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.
- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.
- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.
- Metadata: phase_id=P051; prerequisites=[trig_ratios, triangle_angle_sum, proportions, inverse_sine, rounding]; misconception_tags=[side_angle_mismatch, ambiguous_case_ignored, impossible_triangle_missed, rounding_too_early]; randomization_constraints=[single intended answer, phase-level skill match].
- Graph/Visual Variant: Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.
- Modeling Variant: Use the same structure in a short context with units and an interpreted final sentence.
- Reverse Variant: Give the answer and ask for a valid original question or parameter choice that produces it.
- Equation Battle Variant: Ask the player to justify each legal algebraic move when equations are involved.
- Multi-stage Boss Variant: Combine this family with a representation change, a restriction check, and a final interpretation.
- Hint Mapping: H-P051-T011
- Tutorial Mapping: Tut-P051 sections Core Method and Worked Examples
- Socratic Mapping: Soc-P051 branch t011

## Template T012 - Detecting impossible sine value
- Template ID: P051-T012
- Question Type: Skill application
- Cognitive Skill: Detecting impossible sine value
- Difficulty: 3
- Estimated Time: 95 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: false
- Learning Objective: Use law of sines to handle detecting impossible sine value.
- Example Question: In triangle ABC, A = 85 degrees, a = 6, and b = 8. How many triangles are possible?
- Answer: No triangle is possible.
- Explanation: The Law of Sines gives sin B = 8sin85/6, which is about 1.33. Since sine values cannot exceed 1, the data cannot form a triangle.
- Distractors: uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step.
- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.
- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.
- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.
- Metadata: phase_id=P051; prerequisites=[trig_ratios, triangle_angle_sum, proportions, inverse_sine, rounding]; misconception_tags=[side_angle_mismatch, ambiguous_case_ignored, impossible_triangle_missed, rounding_too_early]; randomization_constraints=[single intended answer, phase-level skill match].
- Graph/Visual Variant: Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.
- Modeling Variant: Use the same structure in a short context with units and an interpreted final sentence.
- Reverse Variant: Give the answer and ask for a valid original question or parameter choice that produces it.
- Equation Battle Variant: Ask the player to justify each legal algebraic move when equations are involved.
- Multi-stage Boss Variant: Combine this family with a representation change, a restriction check, and a final interpretation.
- Hint Mapping: H-P051-T012
- Tutorial Mapping: Tut-P051 sections Core Method and Worked Examples
- Socratic Mapping: Soc-P051 branch t012

## Template T013 - Finding two sides from ASA
- Template ID: P051-T013
- Question Type: Skill application
- Cognitive Skill: Finding two sides from ASA
- Difficulty: 4
- Estimated Time: 100 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: false
- Learning Objective: Use law of sines to handle finding two sides from asa.
- Example Question: In triangle ABC, A = 25 degrees, B = 100 degrees, and c = 18. Find a and b to the nearest hundredth.
- Answer: a = 9.29 and b = 21.65
- Explanation: First C = 180 - 25 - 100 = 55 degrees. Then a = 18sin25/sin55 about 9.29 and b = 18sin100/sin55 about 21.65.
- Distractors: uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step.
- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.
- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.
- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.
- Metadata: phase_id=P051; prerequisites=[trig_ratios, triangle_angle_sum, proportions, inverse_sine, rounding]; misconception_tags=[side_angle_mismatch, ambiguous_case_ignored, impossible_triangle_missed, rounding_too_early]; randomization_constraints=[single intended answer, phase-level skill match].
- Graph/Visual Variant: Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.
- Modeling Variant: Use the same structure in a short context with units and an interpreted final sentence.
- Reverse Variant: Give the answer and ask for a valid original question or parameter choice that produces it.
- Equation Battle Variant: Ask the player to justify each legal algebraic move when equations are involved.
- Multi-stage Boss Variant: Combine this family with a representation change, a restriction check, and a final interpretation.
- Hint Mapping: H-P051-T013
- Tutorial Mapping: Tut-P051 sections Core Method and Worked Examples
- Socratic Mapping: Soc-P051 branch t013

## Template T014 - Another ambiguous angle case
- Template ID: P051-T014
- Question Type: Skill application
- Cognitive Skill: Another ambiguous angle case
- Difficulty: 4
- Estimated Time: 105 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: false
- Learning Objective: Use law of sines to handle another ambiguous angle case.
- Example Question: In triangle ABC, A = 45 degrees, a = 7, and b = 9. Find the possible values of B to the nearest tenth.
- Answer: B = 65.4 degrees or 114.6 degrees
- Explanation: Use sin B = 9sin45/7, about 0.9091. The possible angles are about 65.4 degrees and 114.6 degrees; both are compatible with A = 45 degrees.
- Distractors: uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step.
- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.
- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.
- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.
- Metadata: phase_id=P051; prerequisites=[trig_ratios, triangle_angle_sum, proportions, inverse_sine, rounding]; misconception_tags=[side_angle_mismatch, ambiguous_case_ignored, impossible_triangle_missed, rounding_too_early]; randomization_constraints=[single intended answer, phase-level skill match].
- Graph/Visual Variant: Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.
- Modeling Variant: Use the same structure in a short context with units and an interpreted final sentence.
- Reverse Variant: Give the answer and ask for a valid original question or parameter choice that produces it.
- Equation Battle Variant: Ask the player to justify each legal algebraic move when equations are involved.
- Multi-stage Boss Variant: Combine this family with a representation change, a restriction check, and a final interpretation.
- Hint Mapping: H-P051-T014
- Tutorial Mapping: Tut-P051 sections Core Method and Worked Examples
- Socratic Mapping: Soc-P051 branch t014

## Template T015 - Navigation distance with two angles
- Template ID: P051-T015
- Question Type: Skill application
- Cognitive Skill: Navigation distance with two angles
- Difficulty: 4
- Estimated Time: 110 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Use law of sines to handle navigation distance with two angles.
- Example Question: A triangle-shaped route has angles 52 degrees and 68 degrees at two landmarks. The side opposite the remaining angle is 30 km. Find the side opposite 52 degrees to the nearest tenth.
- Answer: 24.1 km
- Explanation: The remaining angle is 180 - 52 - 68 = 60 degrees. Let x be the side opposite 52 degrees. Then x/sin52 = 30/sin60, so x = 30sin52/sin60 about 24.1 km.
- Distractors: uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step.
- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.
- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.
- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.
- Metadata: phase_id=P051; prerequisites=[trig_ratios, triangle_angle_sum, proportions, inverse_sine, rounding]; misconception_tags=[side_angle_mismatch, ambiguous_case_ignored, impossible_triangle_missed, rounding_too_early]; randomization_constraints=[single intended answer, phase-level skill match].
- Graph/Visual Variant: Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.
- Modeling Variant: Use landmarks, surveying stakes, or hiking route distances with a labeled triangle.
- Reverse Variant: Give the answer and ask for a valid original question or parameter choice that produces it.
- Equation Battle Variant: Ask the player to justify each legal algebraic move when equations are involved.
- Multi-stage Boss Variant: Combine this family with a representation change, a restriction check, and a final interpretation.
- Hint Mapping: H-P051-T015
- Tutorial Mapping: Tut-P051 sections Core Method and Worked Examples
- Socratic Mapping: Soc-P051 branch t015

## Template T016 - Exact Law of Sines side
- Template ID: P051-T016
- Question Type: Skill application
- Cognitive Skill: Exact Law of Sines side
- Difficulty: 4
- Estimated Time: 115 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Use law of sines to handle exact law of sines side.
- Example Question: In triangle ABC, A = 30 degrees, B = 45 degrees, and a = 6. Find b exactly.
- Answer: b = 6sqrt(2)
- Explanation: Use b/sin45 = 6/sin30. Then b = 6(sin45)/(sin30) = 6(sqrt(2)/2)/(1/2) = 6sqrt(2).
- Distractors: uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step.
- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.
- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.
- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.
- Metadata: phase_id=P051; prerequisites=[trig_ratios, triangle_angle_sum, proportions, inverse_sine, rounding]; misconception_tags=[side_angle_mismatch, ambiguous_case_ignored, impossible_triangle_missed, rounding_too_early]; randomization_constraints=[single intended answer, phase-level skill match].
- Graph/Visual Variant: Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.
- Modeling Variant: Use the same structure in a short context with units and an interpreted final sentence.
- Reverse Variant: Give the answer and ask for a valid original question or parameter choice that produces it.
- Equation Battle Variant: Ask the player to justify each legal algebraic move when equations are involved.
- Multi-stage Boss Variant: Combine this family with a representation change, a restriction check, and a final interpretation.
- Hint Mapping: H-P051-T016
- Tutorial Mapping: Tut-P051 sections Core Method and Worked Examples
- Socratic Mapping: Soc-P051 branch t016

## Template T017 - Finding a side after angle sum
- Template ID: P051-T017
- Question Type: Skill application
- Cognitive Skill: Finding a side after angle sum
- Difficulty: 4
- Estimated Time: 120 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Use law of sines to handle finding a side after angle sum.
- Example Question: In triangle ABC, A = 36 degrees, B = 64 degrees, and b = 20. Find c to the nearest tenth.
- Answer: c = 21.9
- Explanation: First find C = 180 - 36 - 64 = 80 degrees. Then use c/sin80 = 20/sin64, so c = 20sin80/sin64, about 21.9.
- Distractors: uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step.
- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.
- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.
- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.
- Metadata: phase_id=P051; prerequisites=[trig_ratios, triangle_angle_sum, proportions, inverse_sine, rounding]; misconception_tags=[side_angle_mismatch, ambiguous_case_ignored, impossible_triangle_missed, rounding_too_early]; randomization_constraints=[single intended answer, phase-level skill match].
- Graph/Visual Variant: Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.
- Modeling Variant: Use the same structure in a short context with units and an interpreted final sentence.
- Reverse Variant: Give the answer and ask for a valid original question or parameter choice that produces it.
- Equation Battle Variant: Ask the player to justify each legal algebraic move when equations are involved.
- Multi-stage Boss Variant: Combine this family with a representation change, a restriction check, and a final interpretation.
- Hint Mapping: H-P051-T017
- Tutorial Mapping: Tut-P051 sections Core Method and Worked Examples
- Socratic Mapping: Soc-P051 branch t017

## Template T018 - Solving a Law of Sines proportion
- Template ID: P051-T018
- Question Type: Skill application
- Cognitive Skill: Solving a Law of Sines proportion
- Difficulty: 5
- Estimated Time: 125 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Use law of sines to handle solving a law of sines proportion.
- Example Question: Solve for x: x/sin40 degrees = 12/sin75 degrees. Round to the nearest hundredth.
- Answer: x = 7.99
- Explanation: Multiply both sides by sin40 degrees to get x = 12sin40/sin75. This is about 7.99.
- Distractors: uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step.
- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.
- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.
- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.
- Metadata: phase_id=P051; prerequisites=[trig_ratios, triangle_angle_sum, proportions, inverse_sine, rounding]; misconception_tags=[side_angle_mismatch, ambiguous_case_ignored, impossible_triangle_missed, rounding_too_early]; randomization_constraints=[single intended answer, phase-level skill match].
- Graph/Visual Variant: Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.
- Modeling Variant: Use the same structure in a short context with units and an interpreted final sentence.
- Reverse Variant: Give the answer and ask for a valid original question or parameter choice that produces it.
- Equation Battle Variant: Ask the player to justify each legal algebraic move when equations are involved.
- Multi-stage Boss Variant: Combine this family with a representation change, a restriction check, and a final interpretation.
- Hint Mapping: H-P051-T018
- Tutorial Mapping: Tut-P051 sections Core Method and Worked Examples
- Socratic Mapping: Soc-P051 branch t018

## Template T019 - Boss ambiguous triangle with missing side
- Template ID: P051-T019
- Question Type: Skill application
- Cognitive Skill: Boss ambiguous triangle with missing side
- Difficulty: 5
- Estimated Time: 130 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Use law of sines to handle boss ambiguous triangle with missing side.
- Example Question: In triangle ABC, A = 40 degrees, a = 10, and b = 12. Find the possible values of B and c to the nearest tenth.
- Answer: B = 50.5 degrees with c = 15.6, or B = 129.5 degrees with c = 2.8
- Explanation: sin B = 12sin40/10, about 0.7713, so B is about 50.5 degrees or 129.5 degrees. The corresponding C values are about 89.5 degrees and 10.5 degrees. Then c = 10sinC/sin40 gives about 15.6 or 2.8.
- Distractors: uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step.
- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.
- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.
- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.
- Metadata: phase_id=P051; prerequisites=[trig_ratios, triangle_angle_sum, proportions, inverse_sine, rounding]; misconception_tags=[side_angle_mismatch, ambiguous_case_ignored, impossible_triangle_missed, rounding_too_early]; randomization_constraints=[single intended answer, phase-level skill match].
- Graph/Visual Variant: Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.
- Modeling Variant: Use the same structure in a short context with units and an interpreted final sentence.
- Reverse Variant: Give the answer and ask for a valid original question or parameter choice that produces it.
- Equation Battle Variant: Ask the player to justify each legal algebraic move when equations are involved.
- Multi-stage Boss Variant: Combine this family with a representation change, a restriction check, and a final interpretation.
- Hint Mapping: H-P051-T019
- Tutorial Mapping: Tut-P051 sections Core Method and Worked Examples
- Socratic Mapping: Soc-P051 branch t019

## Template T020 - Correcting a side-angle pairing error
- Template ID: P051-T020
- Question Type: Skill application
- Cognitive Skill: Correcting a side-angle pairing error
- Difficulty: 5
- Estimated Time: 135 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Use law of sines to handle correcting a side-angle pairing error.
- Example Question: A student uses 15/sin42 = a/sin68 for a triangle where A = 42 degrees, C = 68 degrees, and c = 15. Explain the error.
- Answer: The side 15 is c, so it must pair with sin68, not sin42.
- Explanation: Law of Sines pairs each side with its opposite angle. Since c is opposite C = 68 degrees, the correct setup is a/sin42 = 15/sin68.
- Distractors: uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step.
- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.
- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.
- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.
- Metadata: phase_id=P051; prerequisites=[trig_ratios, triangle_angle_sum, proportions, inverse_sine, rounding]; misconception_tags=[side_angle_mismatch, ambiguous_case_ignored, impossible_triangle_missed, rounding_too_early]; randomization_constraints=[single intended answer, phase-level skill match].
- Graph/Visual Variant: Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.
- Modeling Variant: Use the same structure in a short context with units and an interpreted final sentence.
- Reverse Variant: Give the answer and ask for a valid original question or parameter choice that produces it.
- Equation Battle Variant: Ask the player to justify each legal algebraic move when equations are involved.
- Multi-stage Boss Variant: Combine this family with a representation change, a restriction check, and a final interpretation.
- Hint Mapping: H-P051-T020
- Tutorial Mapping: Tut-P051 sections Core Method and Worked Examples
- Socratic Mapping: Soc-P051 branch t020

# Part II - Hint Bible

## H-P051-T001
- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: finding a side with aas information.
- Hint 2 - Concept Reminder: In law of sines, the correct method comes from the visible structure, conditions, and restrictions.
- Hint 3 - Focus Hint: For this item, use the setup shown in the question: In triangle ABC, A = 30 degrees, B = 80 degrees, and a = 10. Find b to the nearest tenth.
- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.
- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: Use b/sin 80 = 10/sin 30. Then b = 10sin80/sin30 = 20sin80, which is about 19.7.
- Hint 6 - Full Solution: Use b/sin 80 = 10/sin 30. Then b = 10sin80/sin30 = 20sin80, which is about 19.7. Therefore the answer is b = 19.7.

## H-P051-T002
- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: exact side with special angles.
- Hint 2 - Concept Reminder: In law of sines, the correct method comes from the visible structure, conditions, and restrictions.
- Hint 3 - Focus Hint: For this item, use the setup shown in the question: In triangle ABC, A = 45 degrees, C = 60 degrees, and a = 12. Find c exactly.
- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.
- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: Use c/sin60 = 12/sin45. Thus c = 12(sin60)/(sin45) = 12(sqrt(3)/2)/(sqrt(2)/2) = 6sqrt(6).
- Hint 6 - Full Solution: Use c/sin60 = 12/sin45. Thus c = 12(sin60)/(sin45) = 12(sqrt(3)/2)/(sqrt(2)/2) = 6sqrt(6). Therefore the answer is c = 6sqrt(6).

## H-P051-T003
- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: finding the third angle.
- Hint 2 - Concept Reminder: In law of sines, the correct method comes from the visible structure, conditions, and restrictions.
- Hint 3 - Focus Hint: For this item, use the setup shown in the question: In triangle ABC, A = 40 degrees and B = 65 degrees. Find C.
- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.
- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: The angles of a triangle sum to 180 degrees, so C = 180 - 40 - 65 = 75 degrees.
- Hint 6 - Full Solution: The angles of a triangle sum to 180 degrees, so C = 180 - 40 - 65 = 75 degrees. Therefore the answer is C = 75 degrees.

## H-P051-T004
- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: ambiguous ssa case with two triangles.
- Hint 2 - Concept Reminder: In law of sines, the correct method comes from the visible structure, conditions, and restrictions.
- Hint 3 - Focus Hint: For this item, use the setup shown in the question: In triangle ABC, A = 50 degrees, a = 8, and b = 10. Find the possible values of B to the nearest tenth.
- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.
- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: Use sin B/10 = sin50/8, so sin B = 10sin50/8, about 0.9576. The sine values give B about 73.3 degrees or 106.7 degrees, and both keep the triangle angle sum below 180 degrees.
- Hint 6 - Full Solution: Use sin B/10 = sin50/8, so sin B = 10sin50/8, about 0.9576. The sine values give B about 73.3 degrees or 106.7 degrees, and both keep the triangle angle sum below 180 degrees. Therefore the answer is B = 73.3 degrees or 106.7 degrees.

## H-P051-T005
- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: ssa impossible triangle.
- Hint 2 - Concept Reminder: In law of sines, the correct method comes from the visible structure, conditions, and restrictions.
- Hint 3 - Focus Hint: For this item, use the setup shown in the question: In triangle ABC, A = 30 degrees, a = 5, and b = 12. How many triangles are possible?
- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.
- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: Use sin B/12 = sin30/5, so sin B = 12(0.5)/5 = 1.2. Since sine cannot be greater than 1, no triangle fits the data.
- Hint 6 - Full Solution: Use sin B/12 = sin30/5, so sin B = 12(0.5)/5 = 1.2. Since sine cannot be greater than 1, no triangle fits the data. Therefore the answer is No triangle is possible..

## H-P051-T006
- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: finding a smaller side.
- Hint 2 - Concept Reminder: In law of sines, the correct method comes from the visible structure, conditions, and restrictions.
- Hint 3 - Focus Hint: For this item, use the setup shown in the question: In triangle ABC, B = 70 degrees, b = 14, and A = 35 degrees. Find a to the nearest hundredth.
- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.
- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: Use a/sin35 = 14/sin70. Then a = 14sin35/sin70, which is about 8.55.
- Hint 6 - Full Solution: Use a/sin35 = 14/sin70. Then a = 14sin35/sin70, which is about 8.55. Therefore the answer is a = 8.55.

## H-P051-T007
- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: solving an aas triangle.
- Hint 2 - Concept Reminder: In law of sines, the correct method comes from the visible structure, conditions, and restrictions.
- Hint 3 - Focus Hint: For this item, use the setup shown in the question: In triangle ABC, A = 32 degrees, B = 78 degrees, and a = 9. Find C, b, and c to the nearest hundredth.
- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.
- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: First C = 180 - 32 - 78 = 70 degrees. Then b = 9sin78/sin32 about 16.61 and c = 9sin70/sin32 about 15.96.
- Hint 6 - Full Solution: First C = 180 - 32 - 78 = 70 degrees. Then b = 9sin78/sin32 about 16.61 and c = 9sin70/sin32 about 15.96. Therefore the answer is C = 70 degrees, b = 16.61, c = 15.96.

## H-P051-T008
- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: using a common sine ratio.
- Hint 2 - Concept Reminder: In law of sines, the correct method comes from the visible structure, conditions, and restrictions.
- Hint 3 - Focus Hint: For this item, use the setup shown in the question: If a/sin A = 18 and C = 40 degrees, find c to the nearest hundredth.
- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.
- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: The Law of Sines gives c/sin C = 18. Therefore c = 18sin40, which is about 11.57.
- Hint 6 - Full Solution: The Law of Sines gives c/sin C = 18. Therefore c = 18sin40, which is about 11.57. Therefore the answer is c = 11.57.

## H-P051-T009
- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: choosing the correct opposite pair.
- Hint 2 - Concept Reminder: In law of sines, the correct method comes from the visible structure, conditions, and restrictions.
- Hint 3 - Focus Hint: For this item, use the setup shown in the question: In triangle ABC, A = 42 degrees, C = 68 degrees, and c = 15. Find a to the nearest tenth.
- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.
- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: Use a/sin42 = 15/sin68 because a is opposite A and c is opposite C. Then a = 15sin42/sin68, about 10.8.
- Hint 6 - Full Solution: Use a/sin42 = 15/sin68 because a is opposite A and c is opposite C. Then a = 15sin42/sin68, about 10.8. Therefore the answer is a = 10.8.

## H-P051-T010
- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: finding an angle from side ratio.
- Hint 2 - Concept Reminder: In law of sines, the correct method comes from the visible structure, conditions, and restrictions.
- Hint 3 - Focus Hint: For this item, use the setup shown in the question: In triangle ABC, A = 110 degrees, a = 20, and b = 12. Find B to the nearest tenth.
- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.
- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: Use sin B/12 = sin110/20, so sin B is about 0.5638. The inverse sine gives 34.3 degrees; the supplement would make the angle sum exceed 180 degrees, so only 34.3 degrees works.
- Hint 6 - Full Solution: Use sin B/12 = sin110/20, so sin B is about 0.5638. The inverse sine gives 34.3 degrees; the supplement would make the angle sum exceed 180 degrees, so only 34.3 degrees works. Therefore the answer is B = 34.3 degrees.

## H-P051-T011
- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: ambiguous ssa with side lengths.
- Hint 2 - Concept Reminder: In law of sines, the correct method comes from the visible structure, conditions, and restrictions.
- Hint 3 - Focus Hint: For this item, use the setup shown in the question: In triangle ABC, A = 30 degrees, a = 10, and b = 15. Find the possible values of B to the nearest tenth.
- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.
- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: Use sin B/15 = sin30/10, so sin B = 0.75. The two possible angles are about 48.6 degrees and 131.4 degrees, and both leave a positive third angle.
- Hint 6 - Full Solution: Use sin B/15 = sin30/10, so sin B = 0.75. The two possible angles are about 48.6 degrees and 131.4 degrees, and both leave a positive third angle. Therefore the answer is B = 48.6 degrees or 131.4 degrees.

## H-P051-T012
- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: detecting impossible sine value.
- Hint 2 - Concept Reminder: In law of sines, the correct method comes from the visible structure, conditions, and restrictions.
- Hint 3 - Focus Hint: For this item, use the setup shown in the question: In triangle ABC, A = 85 degrees, a = 6, and b = 8. How many triangles are possible?
- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.
- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: The Law of Sines gives sin B = 8sin85/6, which is about 1.33. Since sine values cannot exceed 1, the data cannot form a triangle.
- Hint 6 - Full Solution: The Law of Sines gives sin B = 8sin85/6, which is about 1.33. Since sine values cannot exceed 1, the data cannot form a triangle. Therefore the answer is No triangle is possible..

## H-P051-T013
- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: finding two sides from asa.
- Hint 2 - Concept Reminder: In law of sines, the correct method comes from the visible structure, conditions, and restrictions.
- Hint 3 - Focus Hint: For this item, use the setup shown in the question: In triangle ABC, A = 25 degrees, B = 100 degrees, and c = 18. Find a and b to the nearest hundredth.
- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.
- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: First C = 180 - 25 - 100 = 55 degrees. Then a = 18sin25/sin55 about 9.29 and b = 18sin100/sin55 about 21.65.
- Hint 6 - Full Solution: First C = 180 - 25 - 100 = 55 degrees. Then a = 18sin25/sin55 about 9.29 and b = 18sin100/sin55 about 21.65. Therefore the answer is a = 9.29 and b = 21.65.

## H-P051-T014
- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: another ambiguous angle case.
- Hint 2 - Concept Reminder: In law of sines, the correct method comes from the visible structure, conditions, and restrictions.
- Hint 3 - Focus Hint: For this item, use the setup shown in the question: In triangle ABC, A = 45 degrees, a = 7, and b = 9. Find the possible values of B to the nearest tenth.
- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.
- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: Use sin B = 9sin45/7, about 0.9091. The possible angles are about 65.4 degrees and 114.6 degrees; both are compatible with A = 45 degrees.
- Hint 6 - Full Solution: Use sin B = 9sin45/7, about 0.9091. The possible angles are about 65.4 degrees and 114.6 degrees; both are compatible with A = 45 degrees. Therefore the answer is B = 65.4 degrees or 114.6 degrees.

## H-P051-T015
- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: navigation distance with two angles.
- Hint 2 - Concept Reminder: In law of sines, the correct method comes from the visible structure, conditions, and restrictions.
- Hint 3 - Focus Hint: For this item, use the setup shown in the question: A triangle-shaped route has angles 52 degrees and 68 degrees at two landmarks. The side opposite the remaining angle is 30 km. Find the side opposite 52 degrees to the nearest tenth.
- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.
- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: The remaining angle is 180 - 52 - 68 = 60 degrees. Let x be the side opposite 52 degrees. Then x/sin52 = 30/sin60, so x = 30sin52/sin60 about 24.1 km.
- Hint 6 - Full Solution: The remaining angle is 180 - 52 - 68 = 60 degrees. Let x be the side opposite 52 degrees. Then x/sin52 = 30/sin60, so x = 30sin52/sin60 about 24.1 km. Therefore the answer is 24.1 km.

## H-P051-T016
- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: exact law of sines side.
- Hint 2 - Concept Reminder: In law of sines, the correct method comes from the visible structure, conditions, and restrictions.
- Hint 3 - Focus Hint: For this item, use the setup shown in the question: In triangle ABC, A = 30 degrees, B = 45 degrees, and a = 6. Find b exactly.
- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.
- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: Use b/sin45 = 6/sin30. Then b = 6(sin45)/(sin30) = 6(sqrt(2)/2)/(1/2) = 6sqrt(2).
- Hint 6 - Full Solution: Use b/sin45 = 6/sin30. Then b = 6(sin45)/(sin30) = 6(sqrt(2)/2)/(1/2) = 6sqrt(2). Therefore the answer is b = 6sqrt(2).

## H-P051-T017
- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: finding a side after angle sum.
- Hint 2 - Concept Reminder: In law of sines, the correct method comes from the visible structure, conditions, and restrictions.
- Hint 3 - Focus Hint: For this item, use the setup shown in the question: In triangle ABC, A = 36 degrees, B = 64 degrees, and b = 20. Find c to the nearest tenth.
- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.
- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: First find C = 180 - 36 - 64 = 80 degrees. Then use c/sin80 = 20/sin64, so c = 20sin80/sin64, about 21.9.
- Hint 6 - Full Solution: First find C = 180 - 36 - 64 = 80 degrees. Then use c/sin80 = 20/sin64, so c = 20sin80/sin64, about 21.9. Therefore the answer is c = 21.9.

## H-P051-T018
- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: solving a law of sines proportion.
- Hint 2 - Concept Reminder: In law of sines, the correct method comes from the visible structure, conditions, and restrictions.
- Hint 3 - Focus Hint: For this item, use the setup shown in the question: Solve for x: x/sin40 degrees = 12/sin75 degrees. Round to the nearest hundredth.
- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.
- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: Multiply both sides by sin40 degrees to get x = 12sin40/sin75. This is about 7.99.
- Hint 6 - Full Solution: Multiply both sides by sin40 degrees to get x = 12sin40/sin75. This is about 7.99. Therefore the answer is x = 7.99.

## H-P051-T019
- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: boss ambiguous triangle with missing side.
- Hint 2 - Concept Reminder: In law of sines, the correct method comes from the visible structure, conditions, and restrictions.
- Hint 3 - Focus Hint: For this item, use the setup shown in the question: In triangle ABC, A = 40 degrees, a = 10, and b = 12. Find the possible values of B and c to the nearest tenth.
- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.
- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: sin B = 12sin40/10, about 0.7713, so B is about 50.5 degrees or 129.5 degrees. The corresponding C values are about 89.5 degrees and 10.5 degrees. Then c = 10sinC/sin40 gives about 15.6 or 2.8.
- Hint 6 - Full Solution: sin B = 12sin40/10, about 0.7713, so B is about 50.5 degrees or 129.5 degrees. The corresponding C values are about 89.5 degrees and 10.5 degrees. Then c = 10sinC/sin40 gives about 15.6 or 2.8. Therefore the answer is B = 50.5 degrees with c = 15.6, or B = 129.5 degrees with c = 2.8.

## H-P051-T020
- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: correcting a side-angle pairing error.
- Hint 2 - Concept Reminder: In law of sines, the correct method comes from the visible structure, conditions, and restrictions.
- Hint 3 - Focus Hint: For this item, use the setup shown in the question: A student uses 15/sin42 = a/sin68 for a triangle where A = 42 degrees, C = 68 degrees, and c = 15. Explain the error.
- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.
- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: Law of Sines pairs each side with its opposite angle. Since c is opposite C = 68 degrees, the correct setup is a/sin42 = 15/sin68.
- Hint 6 - Full Solution: Law of Sines pairs each side with its opposite angle. Since c is opposite C = 68 degrees, the correct setup is a/sin42 = 15/sin68. Therefore the answer is The side 15 is c, so it must pair with sin68, not sin42..

# Part III - Tutorial Bible

## Learning Goal
Master law of sines by choosing the right representation, completing the computation, and interpreting the result.

## Why It Matters
This topic appears in later modeling, graphing, and boss challenges because it connects symbolic work with decisions about structure, restrictions, and meaning.

## Prerequisite Check
- Can the player explain this prerequisite? Use the triangle angle sum A + B + C = 180 degrees.
- Can the player explain this prerequisite? Match each side with its opposite angle: side a is opposite angle A.
- Can the player explain this prerequisite? Solve proportions accurately before rounding.
- Can the player explain this prerequisite? Remember that sine can have two angle solutions between 0 degrees and 180 degrees.

## Core Concept
- The Law of Sines states a/sin A = b/sin B = c/sin C for any triangle.
- Use the Law of Sines when you know an angle-opposite side pair and another side or angle.
- In SSA cases, inverse sine may create zero, one, or two possible triangles.
- A triangle is impossible if the computed sine of an angle is greater than 1.
- After finding an angle, always check that the angle sum stays below 180 degrees.

## Worked Example
- In triangle ABC, A = 30 degrees, B = 80 degrees, and a = 10. Find b to the nearest tenth. Answer: b = 19.7 Reason: Use b/sin 80 = 10/sin 30. Then b = 10sin80/sin30 = 20sin80, which is about 19.7.
- In triangle ABC, A = 45 degrees, C = 60 degrees, and a = 12. Find c exactly. Answer: c = 6sqrt(6) Reason: Use c/sin60 = 12/sin45. Thus c = 12(sin60)/(sin45) = 12(sqrt(3)/2)/(sqrt(2)/2) = 6sqrt(6).
- In triangle ABC, A = 40 degrees and B = 65 degrees. Find C. Answer: C = 75 degrees Reason: The angles of a triangle sum to 180 degrees, so C = 180 - 40 - 65 = 75 degrees.
- In triangle ABC, A = 50 degrees, a = 8, and b = 10. Find the possible values of B to the nearest tenth. Answer: B = 73.3 degrees or 106.7 degrees Reason: Use sin B/10 = sin50/8, so sin B = 10sin50/8, about 0.9576. The sine values give B about 73.3 degrees or 106.7 degrees, and both keep the triangle angle sum below 180 degrees.

## Common Mistakes
- Pairing a side with an adjacent angle instead of its opposite angle.
- Ignoring the second possible angle in an SSA case.
- Accepting an angle set whose sum exceeds 180 degrees.
- Rounding intermediate values so much that the final side is distorted.
- Using Law of Sines when no angle-opposite side pair is known.

## Guided Practice
- Prompt: In triangle ABC, A = 30 degrees, a = 5, and b = 12. How many triangles are possible? Coach move: ask which rule or condition applies first. Target: No triangle is possible..
- Prompt: In triangle ABC, B = 70 degrees, b = 14, and A = 35 degrees. Find a to the nearest hundredth. Coach move: ask which rule or condition applies first. Target: a = 8.55.
- Prompt: In triangle ABC, A = 32 degrees, B = 78 degrees, and a = 9. Find C, b, and c to the nearest hundredth. Coach move: ask which rule or condition applies first. Target: C = 70 degrees, b = 16.61, c = 15.96.
- Prompt: If a/sin A = 18 and C = 40 degrees, find c to the nearest hundredth. Coach move: ask which rule or condition applies first. Target: c = 11.57.
- Prompt: In triangle ABC, A = 42 degrees, C = 68 degrees, and c = 15. Find a to the nearest tenth. Coach move: ask which rule or condition applies first. Target: a = 10.8.
- Prompt: In triangle ABC, A = 110 degrees, a = 20, and b = 12. Find B to the nearest tenth. Coach move: ask which rule or condition applies first. Target: B = 34.3 degrees.

## Independent Practice
- Ambiguous SSA with side lengths: In triangle ABC, A = 30 degrees, a = 10, and b = 15. Find the possible values of B to the nearest tenth. Expected answer: B = 48.6 degrees or 131.4 degrees.
- Detecting impossible sine value: In triangle ABC, A = 85 degrees, a = 6, and b = 8. How many triangles are possible? Expected answer: No triangle is possible..
- Finding two sides from ASA: In triangle ABC, A = 25 degrees, B = 100 degrees, and c = 18. Find a and b to the nearest hundredth. Expected answer: a = 9.29 and b = 21.65.
- Another ambiguous angle case: In triangle ABC, A = 45 degrees, a = 7, and b = 9. Find the possible values of B to the nearest tenth. Expected answer: B = 65.4 degrees or 114.6 degrees.
- Navigation distance with two angles: A triangle-shaped route has angles 52 degrees and 68 degrees at two landmarks. The side opposite the remaining angle is 30 km. Find the side opposite 52 degrees to the nearest tenth. Expected answer: 24.1 km.
- Exact Law of Sines side: In triangle ABC, A = 30 degrees, B = 45 degrees, and a = 6. Find b exactly. Expected answer: b = 6sqrt(2).

## Mastery Check
- In triangle ABC, A = 36 degrees, B = 64 degrees, and b = 20. Find c to the nearest tenth. Mastery answer: c = 21.9.
- Solve for x: x/sin40 degrees = 12/sin75 degrees. Round to the nearest hundredth. Mastery answer: x = 7.99.
- In triangle ABC, A = 40 degrees, a = 10, and b = 12. Find the possible values of B and c to the nearest tenth. Mastery answer: B = 50.5 degrees with c = 15.6, or B = 129.5 degrees with c = 2.8.
- A student uses 15/sin42 = a/sin68 for a triangle where A = 42 degrees, C = 68 degrees, and c = 15. Explain the error. Mastery answer: The side 15 is c, so it must pair with sin68, not sin42..

## Adaptive Tutor Messages
- If the player chooses the wrong method, ask them to name the visible structure before solving.
- If arithmetic is the only error, preserve the strategy and have them recompute one line.
- If notation or restrictions are missing, ask what values, units, or intervals the answer is allowed to use.
- If the player is fluent, advance to a boss variant that mixes representations.

## Tutorial Metadata
- Tutorial ID: Tut-P051
- Phase: 051
- Estimated duration: 18-25 minutes
- Required prior mastery: prerequisite review plus at least 70 percent accuracy on guided practice

# Part IV - Socratic Dialogue Bible

## Opening Diagnostic
Tutor: "When you see this law of sines problem, what structure tells you the first move?"
Player response is classified by method choice, accuracy, notation, and interpretation.

## Guided Discovery
Tutor asks the player to identify the known information, the target, the rule or representation, and any restrictions before computing.
The sequence moves from recognition to one decisive step, then to a final interpretation.

## Correct Branch
If the player chooses the right structure, the tutor asks for the computation and then a sentence explaining why the result is allowed.

## Partial Understanding Branch
If the player has the right idea but incomplete execution, the tutor keeps their setup and asks for the next legal move.

## Misconception Branch
- If the player shows this issue: Pairing a side with an adjacent angle instead of its opposite angle. The tutor asks for a counterexample from the worked examples.
- If the player shows this issue: Ignoring the second possible angle in an SSA case. The tutor asks for a counterexample from the worked examples.
- If the player shows this issue: Accepting an angle set whose sum exceeds 180 degrees. The tutor asks for a counterexample from the worked examples.
- If the player shows this issue: Rounding intermediate values so much that the final side is distorted. The tutor asks for a counterexample from the worked examples.

## Unsure Branch
Tutor: "Point to the part of the problem that tells us which rule, formula, graph feature, or restriction controls the answer."
Then the tutor offers two choices and asks the player to justify one.

## Unrelated Response Branch
Tutor restates the smallest actionable question and asks the player to choose between the two most plausible first moves.

## Recovery Prompts
- What is being asked: value, equation, graph feature, interpretation, or construction?
- Which rule or condition applies first?
- Are there restrictions on inputs, outputs, units, or angles?
- Does the final answer satisfy the original problem?
- Can you explain the answer in one sentence?

## Reflection Question
Why is method selection more important than memorizing one procedure for every law of sines task?

## Transfer Question
Where could law of sines appear inside a mixed review or final boss challenge?

## Escalation Rules
- If the same misconception repeats twice, return to the relevant worked example.
- If the player cannot start, show the prerequisite review first.
- If the player solves three guided items correctly, move to independent practice.
- If the player solves two boss-compatible items correctly, unlock mixed review.

## Exit Condition
The Socratic sequence is complete when the player can choose the method, compute accurately, respect restrictions, and explain the result without prompting.

# Knowledge Graph

- Prerequisites: Trigonometric ratios, triangle angle sum, inverse sine reasoning, proportions, and rounding
- Concepts Unlocked: Law of sines; representation choice; restriction checking; exact answer interpretation; mixed review readiness
- Related Concepts: equations, functions, graphs, tables, modeling, and boss challenge synthesis
- Common Misconceptions: side_angle_mismatch, ambiguous_case_ignored, impossible_triangle_missed, rounding_too_early
- Remedial Phases: Phase 050 review; earlier function, equation, and graph review as needed
- Follow-up Phases: Phase 052; Phase 058 - Mixed review; Phase 059 - Final boss challenges
- Transfer Topics: calculator-free reasoning, modeling, graph interpretation, symbolic manipulation, and adaptive tutoring

# Validation Notes

## Structure Validation
- Includes Question Bible, Hint Bible, Tutorial Bible, Socratic Dialogue Bible, Knowledge Graph, and Validation Notes.
- Contains exactly 20 template families.
- Every template includes example, answer, explanation, distractors, randomization rules, validity constraints, mappings, variants, and metadata.
- Every template has six progressive hints ending in a full solution.

## Math Validation
- T001: Use b/sin 80 = 10/sin 30. Then b = 10sin80/sin30 = 20sin80, which is about 19.7. Answer recorded as b = 19.7.
- T002: Use c/sin60 = 12/sin45. Thus c = 12(sin60)/(sin45) = 12(sqrt(3)/2)/(sqrt(2)/2) = 6sqrt(6). Answer recorded as c = 6sqrt(6).
- T003: The angles of a triangle sum to 180 degrees, so C = 180 - 40 - 65 = 75 degrees. Answer recorded as C = 75 degrees.
- T004: Use sin B/10 = sin50/8, so sin B = 10sin50/8, about 0.9576. The sine values give B about 73.3 degrees or 106.7 degrees, and both keep the triangle angle sum below 180 degrees. Answer recorded as B = 73.3 degrees or 106.7 degrees.
- T005: Use sin B/12 = sin30/5, so sin B = 12(0.5)/5 = 1.2. Since sine cannot be greater than 1, no triangle fits the data. Answer recorded as No triangle is possible..
- T006: Use a/sin35 = 14/sin70. Then a = 14sin35/sin70, which is about 8.55. Answer recorded as a = 8.55.
- T007: First C = 180 - 32 - 78 = 70 degrees. Then b = 9sin78/sin32 about 16.61 and c = 9sin70/sin32 about 15.96. Answer recorded as C = 70 degrees, b = 16.61, c = 15.96.
- T008: The Law of Sines gives c/sin C = 18. Therefore c = 18sin40, which is about 11.57. Answer recorded as c = 11.57.
- T009: Use a/sin42 = 15/sin68 because a is opposite A and c is opposite C. Then a = 15sin42/sin68, about 10.8. Answer recorded as a = 10.8.
- T010: Use sin B/12 = sin110/20, so sin B is about 0.5638. The inverse sine gives 34.3 degrees; the supplement would make the angle sum exceed 180 degrees, so only 34.3 degrees works. Answer recorded as B = 34.3 degrees.
- T011: Use sin B/15 = sin30/10, so sin B = 0.75. The two possible angles are about 48.6 degrees and 131.4 degrees, and both leave a positive third angle. Answer recorded as B = 48.6 degrees or 131.4 degrees.
- T012: The Law of Sines gives sin B = 8sin85/6, which is about 1.33. Since sine values cannot exceed 1, the data cannot form a triangle. Answer recorded as No triangle is possible..
- T013: First C = 180 - 25 - 100 = 55 degrees. Then a = 18sin25/sin55 about 9.29 and b = 18sin100/sin55 about 21.65. Answer recorded as a = 9.29 and b = 21.65.
- T014: Use sin B = 9sin45/7, about 0.9091. The possible angles are about 65.4 degrees and 114.6 degrees; both are compatible with A = 45 degrees. Answer recorded as B = 65.4 degrees or 114.6 degrees.
- T015: The remaining angle is 180 - 52 - 68 = 60 degrees. Let x be the side opposite 52 degrees. Then x/sin52 = 30/sin60, so x = 30sin52/sin60 about 24.1 km. Answer recorded as 24.1 km.
- T016: Use b/sin45 = 6/sin30. Then b = 6(sin45)/(sin30) = 6(sqrt(2)/2)/(1/2) = 6sqrt(2). Answer recorded as b = 6sqrt(2).
- T017: First find C = 180 - 36 - 64 = 80 degrees. Then use c/sin80 = 20/sin64, so c = 20sin80/sin64, about 21.9. Answer recorded as c = 21.9.
- T018: Multiply both sides by sin40 degrees to get x = 12sin40/sin75. This is about 7.99. Answer recorded as x = 7.99.
- T019: sin B = 12sin40/10, about 0.7713, so B is about 50.5 degrees or 129.5 degrees. The corresponding C values are about 89.5 degrees and 10.5 degrees. Then c = 10sinC/sin40 gives about 15.6 or 2.8. Answer recorded as B = 50.5 degrees with c = 15.6, or B = 129.5 degrees with c = 2.8.
- T020: Law of Sines pairs each side with its opposite angle. Since c is opposite C = 68 degrees, the correct setup is a/sin42 = 15/sin68. Answer recorded as The side 15 is c, so it must pair with sin68, not sin42..

## Distractor Validation
- Distractors target method-selection errors, arithmetic slips, notation mistakes, ignored restrictions, and representation mismatches.
- Multiple-choice variants have exactly one intended correct answer.

## Hint Validation
- Each hint sequence moves from recognition to method selection to decisive computation to final answer.
- Hint 4 uses Guided Next Step to align with the master prompt language.

## Tutorial Validation
- Tutorial includes learning goal, why it matters, prerequisite check, core concept, worked examples, mistakes, practice, mastery check, adaptive messages, and metadata.

## Socratic Validation
- Dialogue includes diagnostic, discovery, correct, partial, misconception, unsure, unrelated, recovery, reflection, transfer, escalation, and exit branches.

## Metadata Validation
- Every template includes IDs, difficulty, timing, visual flag, compatibility flags, prerequisites, misconception tags, randomization constraints, and support-system mappings.

## Known Issues
- The repository specifications differ on the label for Hint 4. This phase uses Guided Next Step to match the master prompt language.
- PHASE_TEMPLATE.md omits Common Misconceptions from the Knowledge Graph section, but this phase includes it because the project principles require misconception tracking.
