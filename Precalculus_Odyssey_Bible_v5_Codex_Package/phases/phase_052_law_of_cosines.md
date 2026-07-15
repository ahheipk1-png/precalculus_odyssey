# Phase 052 - Law of cosines

## Phase Metadata
- Course: Precalculus Odyssey Bible v5
- Topic: Law of cosines
- Subtopic: Solving SAS and SSS triangles using cosine relationships
- Prerequisites: Triangle side-angle vocabulary, square roots, inverse cosine, rounding, and the Pythagorean theorem
- Related phases: Phase 051 review; Phase 053 follow-up; mixed review and final boss integration
- Estimated phase size: 20 template families, 20 core examples, 120 progressive hints, 1 tutorial sequence, 1 Socratic dialogue system

## Learning Objectives
By the end of this phase, the player can:

1. Recognize the structure of law of cosines tasks before choosing a method.
2. Use correct notation, restrictions, and units while solving law of cosines questions.
3. Solve tasks involving finding a side with included 60 degrees.
4. Solve tasks involving finding a side with obtuse included angle.
5. Solve tasks involving finding a right angle from 3-4-5.
6. Solve tasks involving recognizing pythagorean special case.
7. Solve tasks involving finding an angle from three sides.
8. Solve tasks involving sas side with non-special angle.
9. Solve tasks involving largest angle in an sss triangle.
10. Solve tasks involving classifying a triangle by side lengths.

## Prerequisite Review
- Identify the side opposite a named angle in a triangle.
- Use the Pythagorean theorem as a special case when the included angle is 90 degrees.
- Apply inverse cosine to find an angle from a cosine value.
- Round only after the main computation is complete.

## Core Concepts
- The Law of Cosines says c^2 = a^2 + b^2 - 2ab cos C, where C is the included angle between sides a and b.
- Use Law of Cosines for SAS information to find the third side.
- Use Law of Cosines for SSS information to find an angle.
- The Pythagorean theorem appears when cos C = 0.
- The sign of cos C helps identify whether an angle is acute, right, or obtuse.

## Common Misconceptions
- Using the non-included angle in the SAS formula.
- Replacing cosine with sine in the formula.
- Forgetting the minus sign before 2ab cos C.
- Finding an angle but pairing it with the wrong opposite side.
- Assuming every triangle with three sides is right.

# Part I - Question Bible

## Template T001 - Finding a side with included 60 degrees
- Template ID: P052-T001
- Question Type: Skill application
- Cognitive Skill: Finding a side with included 60 degrees
- Difficulty: 2
- Estimated Time: 40 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: false
- Learning Objective: Use law of cosines to handle finding a side with included 60 degrees.
- Example Question: Two sides of a triangle are 5 and 7 with included angle 60 degrees. Find the opposite side c exactly.
- Answer: c = sqrt(39)
- Explanation: Use c^2 = 5^2 + 7^2 - 2(5)(7)cos60. Since cos60 = 1/2, c^2 = 25 + 49 - 35 = 39, so c = sqrt(39).
- Distractors: uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step.
- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.
- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.
- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.
- Metadata: phase_id=P052; prerequisites=[triangle_vocabulary, square_roots, inverse_cosine, pythagorean_theorem, rounding]; misconception_tags=[included_angle_mismatch, sine_used_instead_of_cosine, sign_error_obtuse_angle, wrong_side_opposite_angle]; randomization_constraints=[single intended answer, phase-level skill match].
- Graph/Visual Variant: Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.
- Modeling Variant: Use the same structure in a short context with units and an interpreted final sentence.
- Reverse Variant: Give the answer and ask for a valid original question or parameter choice that produces it.
- Equation Battle Variant: Ask the player to justify each legal algebraic move when equations are involved.
- Multi-stage Boss Variant: Combine this family with a representation change, a restriction check, and a final interpretation.
- Hint Mapping: H-P052-T001
- Tutorial Mapping: Tut-P052 sections Core Method and Worked Examples
- Socratic Mapping: Soc-P052 branch t001

## Template T002 - Finding a side with obtuse included angle
- Template ID: P052-T002
- Question Type: Skill application
- Cognitive Skill: Finding a side with obtuse included angle
- Difficulty: 2
- Estimated Time: 45 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: false
- Learning Objective: Use law of cosines to handle finding a side with obtuse included angle.
- Example Question: Two sides of a triangle are 8 and 10 with included angle 120 degrees. Find the opposite side c exactly.
- Answer: c = 2sqrt(61)
- Explanation: Use c^2 = 8^2 + 10^2 - 2(8)(10)cos120. Since cos120 = -1/2, c^2 = 64 + 100 + 80 = 244, so c = 2sqrt(61).
- Distractors: uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step.
- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.
- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.
- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.
- Metadata: phase_id=P052; prerequisites=[triangle_vocabulary, square_roots, inverse_cosine, pythagorean_theorem, rounding]; misconception_tags=[included_angle_mismatch, sine_used_instead_of_cosine, sign_error_obtuse_angle, wrong_side_opposite_angle]; randomization_constraints=[single intended answer, phase-level skill match].
- Graph/Visual Variant: Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.
- Modeling Variant: Use the same structure in a short context with units and an interpreted final sentence.
- Reverse Variant: Give the answer and ask for a valid original question or parameter choice that produces it.
- Equation Battle Variant: Ask the player to justify each legal algebraic move when equations are involved.
- Multi-stage Boss Variant: Combine this family with a representation change, a restriction check, and a final interpretation.
- Hint Mapping: H-P052-T002
- Tutorial Mapping: Tut-P052 sections Core Method and Worked Examples
- Socratic Mapping: Soc-P052 branch t002

## Template T003 - Finding a right angle from 3-4-5
- Template ID: P052-T003
- Question Type: Skill application
- Cognitive Skill: Finding a right angle from 3-4-5
- Difficulty: 2
- Estimated Time: 50 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: false
- Learning Objective: Use law of cosines to handle finding a right angle from 3-4-5.
- Example Question: A triangle has sides 3, 4, and 5. Find the angle opposite the side of length 5.
- Answer: 90 degrees
- Explanation: Use cos C = (3^2 + 4^2 - 5^2)/(2(3)(4)) = (9 + 16 - 25)/24 = 0. Therefore C = 90 degrees.
- Distractors: uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step.
- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.
- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.
- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.
- Metadata: phase_id=P052; prerequisites=[triangle_vocabulary, square_roots, inverse_cosine, pythagorean_theorem, rounding]; misconception_tags=[included_angle_mismatch, sine_used_instead_of_cosine, sign_error_obtuse_angle, wrong_side_opposite_angle]; randomization_constraints=[single intended answer, phase-level skill match].
- Graph/Visual Variant: Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.
- Modeling Variant: Use the same structure in a short context with units and an interpreted final sentence.
- Reverse Variant: Give the answer and ask for a valid original question or parameter choice that produces it.
- Equation Battle Variant: Ask the player to justify each legal algebraic move when equations are involved.
- Multi-stage Boss Variant: Combine this family with a representation change, a restriction check, and a final interpretation.
- Hint Mapping: H-P052-T003
- Tutorial Mapping: Tut-P052 sections Core Method and Worked Examples
- Socratic Mapping: Soc-P052 branch t003

## Template T004 - Recognizing Pythagorean special case
- Template ID: P052-T004
- Question Type: Skill application
- Cognitive Skill: Recognizing Pythagorean special case
- Difficulty: 2
- Estimated Time: 55 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: false
- Learning Objective: Use law of cosines to handle recognizing pythagorean special case.
- Example Question: A triangle has sides 6, 8, and 10. Find the angle opposite the side of length 10.
- Answer: 90 degrees
- Explanation: cos C = (6^2 + 8^2 - 10^2)/(2(6)(8)) = (36 + 64 - 100)/96 = 0. Thus C = 90 degrees.
- Distractors: uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step.
- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.
- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.
- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.
- Metadata: phase_id=P052; prerequisites=[triangle_vocabulary, square_roots, inverse_cosine, pythagorean_theorem, rounding]; misconception_tags=[included_angle_mismatch, sine_used_instead_of_cosine, sign_error_obtuse_angle, wrong_side_opposite_angle]; randomization_constraints=[single intended answer, phase-level skill match].
- Graph/Visual Variant: Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.
- Modeling Variant: Use the same structure in a short context with units and an interpreted final sentence.
- Reverse Variant: Give the answer and ask for a valid original question or parameter choice that produces it.
- Equation Battle Variant: Ask the player to justify each legal algebraic move when equations are involved.
- Multi-stage Boss Variant: Combine this family with a representation change, a restriction check, and a final interpretation.
- Hint Mapping: H-P052-T004
- Tutorial Mapping: Tut-P052 sections Core Method and Worked Examples
- Socratic Mapping: Soc-P052 branch t004

## Template T005 - Finding an angle from three sides
- Template ID: P052-T005
- Question Type: Skill application
- Cognitive Skill: Finding an angle from three sides
- Difficulty: 2
- Estimated Time: 60 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: false
- Learning Objective: Use law of cosines to handle finding an angle from three sides.
- Example Question: A triangle has sides 7, 9, and 11. Find the angle opposite the side of length 11 to the nearest tenth.
- Answer: 85.9 degrees
- Explanation: Use cos C = (7^2 + 9^2 - 11^2)/(2(7)(9)) = 9/126 = 1/14. Then C = arccos(1/14), about 85.9 degrees.
- Distractors: uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step.
- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.
- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.
- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.
- Metadata: phase_id=P052; prerequisites=[triangle_vocabulary, square_roots, inverse_cosine, pythagorean_theorem, rounding]; misconception_tags=[included_angle_mismatch, sine_used_instead_of_cosine, sign_error_obtuse_angle, wrong_side_opposite_angle]; randomization_constraints=[single intended answer, phase-level skill match].
- Graph/Visual Variant: Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.
- Modeling Variant: Use the same structure in a short context with units and an interpreted final sentence.
- Reverse Variant: Give the answer and ask for a valid original question or parameter choice that produces it.
- Equation Battle Variant: Ask the player to justify each legal algebraic move when equations are involved.
- Multi-stage Boss Variant: Combine this family with a representation change, a restriction check, and a final interpretation.
- Hint Mapping: H-P052-T005
- Tutorial Mapping: Tut-P052 sections Core Method and Worked Examples
- Socratic Mapping: Soc-P052 branch t005

## Template T006 - SAS side with non-special angle
- Template ID: P052-T006
- Question Type: Skill application
- Cognitive Skill: SAS side with non-special angle
- Difficulty: 3
- Estimated Time: 65 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: false
- Learning Objective: Use law of cosines to handle sas side with non-special angle.
- Example Question: Two sides of a triangle are 12 and 15 with included angle 40 degrees. Find the third side to the nearest hundredth.
- Answer: 9.66
- Explanation: Use c^2 = 12^2 + 15^2 - 2(12)(15)cos40. This gives c^2 about 93.22, so c is about 9.66.
- Distractors: uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step.
- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.
- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.
- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.
- Metadata: phase_id=P052; prerequisites=[triangle_vocabulary, square_roots, inverse_cosine, pythagorean_theorem, rounding]; misconception_tags=[included_angle_mismatch, sine_used_instead_of_cosine, sign_error_obtuse_angle, wrong_side_opposite_angle]; randomization_constraints=[single intended answer, phase-level skill match].
- Graph/Visual Variant: Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.
- Modeling Variant: Use the same structure in a short context with units and an interpreted final sentence.
- Reverse Variant: Give the answer and ask for a valid original question or parameter choice that produces it.
- Equation Battle Variant: Ask the player to justify each legal algebraic move when equations are involved.
- Multi-stage Boss Variant: Combine this family with a representation change, a restriction check, and a final interpretation.
- Hint Mapping: H-P052-T006
- Tutorial Mapping: Tut-P052 sections Core Method and Worked Examples
- Socratic Mapping: Soc-P052 branch t006

## Template T007 - Largest angle in an SSS triangle
- Template ID: P052-T007
- Question Type: Skill application
- Cognitive Skill: Largest angle in an SSS triangle
- Difficulty: 3
- Estimated Time: 70 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: false
- Learning Objective: Use law of cosines to handle largest angle in an sss triangle.
- Example Question: A triangle has sides 4, 6, and 8. Find the largest angle to the nearest tenth.
- Answer: 104.5 degrees
- Explanation: The largest angle is opposite side 8. cos C = (4^2 + 6^2 - 8^2)/(2(4)(6)) = -12/48 = -0.25. Thus C = arccos(-0.25), about 104.5 degrees.
- Distractors: uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step.
- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.
- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.
- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.
- Metadata: phase_id=P052; prerequisites=[triangle_vocabulary, square_roots, inverse_cosine, pythagorean_theorem, rounding]; misconception_tags=[included_angle_mismatch, sine_used_instead_of_cosine, sign_error_obtuse_angle, wrong_side_opposite_angle]; randomization_constraints=[single intended answer, phase-level skill match].
- Graph/Visual Variant: Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.
- Modeling Variant: Use the same structure in a short context with units and an interpreted final sentence.
- Reverse Variant: Give the answer and ask for a valid original question or parameter choice that produces it.
- Equation Battle Variant: Ask the player to justify each legal algebraic move when equations are involved.
- Multi-stage Boss Variant: Combine this family with a representation change, a restriction check, and a final interpretation.
- Hint Mapping: H-P052-T007
- Tutorial Mapping: Tut-P052 sections Core Method and Worked Examples
- Socratic Mapping: Soc-P052 branch t007

## Template T008 - Classifying a triangle by side lengths
- Template ID: P052-T008
- Question Type: Skill application
- Cognitive Skill: Classifying a triangle by side lengths
- Difficulty: 3
- Estimated Time: 75 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: false
- Learning Objective: Use law of cosines to handle classifying a triangle by side lengths.
- Example Question: Use side lengths 5, 6, and 7 to decide whether the triangle is acute, right, or obtuse.
- Answer: Acute
- Explanation: Compare the largest side squared with the sum of the other squares. Since 7^2 = 49 and 5^2 + 6^2 = 61, the largest angle is acute, so the triangle is acute.
- Distractors: uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step.
- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.
- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.
- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.
- Metadata: phase_id=P052; prerequisites=[triangle_vocabulary, square_roots, inverse_cosine, pythagorean_theorem, rounding]; misconception_tags=[included_angle_mismatch, sine_used_instead_of_cosine, sign_error_obtuse_angle, wrong_side_opposite_angle]; randomization_constraints=[single intended answer, phase-level skill match].
- Graph/Visual Variant: Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.
- Modeling Variant: Use the same structure in a short context with units and an interpreted final sentence.
- Reverse Variant: Give the answer and ask for a valid original question or parameter choice that produces it.
- Equation Battle Variant: Ask the player to justify each legal algebraic move when equations are involved.
- Multi-stage Boss Variant: Combine this family with a representation change, a restriction check, and a final interpretation.
- Hint Mapping: H-P052-T008
- Tutorial Mapping: Tut-P052 sections Core Method and Worked Examples
- Socratic Mapping: Soc-P052 branch t008

## Template T009 - Distance between two paths
- Template ID: P052-T009
- Question Type: Skill application
- Cognitive Skill: Distance between two paths
- Difficulty: 3
- Estimated Time: 80 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: false
- Learning Objective: Use law of cosines to handle distance between two paths.
- Example Question: Two paths of lengths 10 miles and 14 miles meet at an angle of 35 degrees. Find the distance between their endpoints to the nearest hundredth.
- Answer: 8.16 miles
- Explanation: Use d^2 = 10^2 + 14^2 - 2(10)(14)cos35. This gives d^2 about 66.64, so d is about 8.16 miles.
- Distractors: uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step.
- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.
- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.
- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.
- Metadata: phase_id=P052; prerequisites=[triangle_vocabulary, square_roots, inverse_cosine, pythagorean_theorem, rounding]; misconception_tags=[included_angle_mismatch, sine_used_instead_of_cosine, sign_error_obtuse_angle, wrong_side_opposite_angle]; randomization_constraints=[single intended answer, phase-level skill match].
- Graph/Visual Variant: Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.
- Modeling Variant: Use paths, vectors, roads, or survey lines with an included angle.
- Reverse Variant: Give the answer and ask for a valid original question or parameter choice that produces it.
- Equation Battle Variant: Ask the player to justify each legal algebraic move when equations are involved.
- Multi-stage Boss Variant: Combine this family with a representation change, a restriction check, and a final interpretation.
- Hint Mapping: H-P052-T009
- Tutorial Mapping: Tut-P052 sections Core Method and Worked Examples
- Socratic Mapping: Soc-P052 branch t009

## Template T010 - Finding included angle
- Template ID: P052-T010
- Question Type: Skill application
- Cognitive Skill: Finding included angle
- Difficulty: 3
- Estimated Time: 85 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: false
- Learning Objective: Use law of cosines to handle finding included angle.
- Example Question: Two sides around an angle are 9 and 12, and the opposite side is 15. Find the included angle.
- Answer: 90 degrees
- Explanation: cos theta = (9^2 + 12^2 - 15^2)/(2(9)(12)) = 0/216 = 0. Therefore theta = 90 degrees.
- Distractors: uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step.
- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.
- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.
- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.
- Metadata: phase_id=P052; prerequisites=[triangle_vocabulary, square_roots, inverse_cosine, pythagorean_theorem, rounding]; misconception_tags=[included_angle_mismatch, sine_used_instead_of_cosine, sign_error_obtuse_angle, wrong_side_opposite_angle]; randomization_constraints=[single intended answer, phase-level skill match].
- Graph/Visual Variant: Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.
- Modeling Variant: Use the same structure in a short context with units and an interpreted final sentence.
- Reverse Variant: Give the answer and ask for a valid original question or parameter choice that produces it.
- Equation Battle Variant: Ask the player to justify each legal algebraic move when equations are involved.
- Multi-stage Boss Variant: Combine this family with a representation change, a restriction check, and a final interpretation.
- Hint Mapping: H-P052-T010
- Tutorial Mapping: Tut-P052 sections Core Method and Worked Examples
- Socratic Mapping: Soc-P052 branch t010

## Template T011 - Equilateral result from SAS
- Template ID: P052-T011
- Question Type: Skill application
- Cognitive Skill: Equilateral result from SAS
- Difficulty: 3
- Estimated Time: 90 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: false
- Learning Objective: Use law of cosines to handle equilateral result from sas.
- Example Question: Two sides of a triangle are 4 and 4 with included angle 60 degrees. Find the opposite side.
- Answer: 4
- Explanation: Use c^2 = 4^2 + 4^2 - 2(4)(4)cos60 = 16 + 16 - 16 = 16. Thus c = 4.
- Distractors: uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step.
- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.
- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.
- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.
- Metadata: phase_id=P052; prerequisites=[triangle_vocabulary, square_roots, inverse_cosine, pythagorean_theorem, rounding]; misconception_tags=[included_angle_mismatch, sine_used_instead_of_cosine, sign_error_obtuse_angle, wrong_side_opposite_angle]; randomization_constraints=[single intended answer, phase-level skill match].
- Graph/Visual Variant: Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.
- Modeling Variant: Use the same structure in a short context with units and an interpreted final sentence.
- Reverse Variant: Give the answer and ask for a valid original question or parameter choice that produces it.
- Equation Battle Variant: Ask the player to justify each legal algebraic move when equations are involved.
- Multi-stage Boss Variant: Combine this family with a representation change, a restriction check, and a final interpretation.
- Hint Mapping: H-P052-T011
- Tutorial Mapping: Tut-P052 sections Core Method and Worked Examples
- Socratic Mapping: Soc-P052 branch t011

## Template T012 - Exact angle from side lengths
- Template ID: P052-T012
- Question Type: Skill application
- Cognitive Skill: Exact angle from side lengths
- Difficulty: 3
- Estimated Time: 95 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: false
- Learning Objective: Use law of cosines to handle exact angle from side lengths.
- Example Question: A triangle has sides 1, 2, and sqrt(3). Find the angle opposite the side sqrt(3).
- Answer: 60 degrees
- Explanation: cos C = (1^2 + 2^2 - (sqrt(3))^2)/(2(1)(2)) = (1 + 4 - 3)/4 = 1/2. Therefore C = 60 degrees.
- Distractors: uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step.
- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.
- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.
- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.
- Metadata: phase_id=P052; prerequisites=[triangle_vocabulary, square_roots, inverse_cosine, pythagorean_theorem, rounding]; misconception_tags=[included_angle_mismatch, sine_used_instead_of_cosine, sign_error_obtuse_angle, wrong_side_opposite_angle]; randomization_constraints=[single intended answer, phase-level skill match].
- Graph/Visual Variant: Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.
- Modeling Variant: Use the same structure in a short context with units and an interpreted final sentence.
- Reverse Variant: Give the answer and ask for a valid original question or parameter choice that produces it.
- Equation Battle Variant: Ask the player to justify each legal algebraic move when equations are involved.
- Multi-stage Boss Variant: Combine this family with a representation change, a restriction check, and a final interpretation.
- Hint Mapping: H-P052-T012
- Tutorial Mapping: Tut-P052 sections Core Method and Worked Examples
- Socratic Mapping: Soc-P052 branch t012

## Template T013 - Side length with included 120 degrees
- Template ID: P052-T013
- Question Type: Skill application
- Cognitive Skill: Side length with included 120 degrees
- Difficulty: 4
- Estimated Time: 100 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: false
- Learning Objective: Use law of cosines to handle side length with included 120 degrees.
- Example Question: Two sides of a triangle are 5 and 5 with included angle 120 degrees. Find the opposite side exactly.
- Answer: 5sqrt(3)
- Explanation: Use c^2 = 25 + 25 - 2(5)(5)cos120. Since cos120 = -1/2, c^2 = 50 + 25 = 75, so c = 5sqrt(3).
- Distractors: uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step.
- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.
- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.
- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.
- Metadata: phase_id=P052; prerequisites=[triangle_vocabulary, square_roots, inverse_cosine, pythagorean_theorem, rounding]; misconception_tags=[included_angle_mismatch, sine_used_instead_of_cosine, sign_error_obtuse_angle, wrong_side_opposite_angle]; randomization_constraints=[single intended answer, phase-level skill match].
- Graph/Visual Variant: Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.
- Modeling Variant: Use the same structure in a short context with units and an interpreted final sentence.
- Reverse Variant: Give the answer and ask for a valid original question or parameter choice that produces it.
- Equation Battle Variant: Ask the player to justify each legal algebraic move when equations are involved.
- Multi-stage Boss Variant: Combine this family with a representation change, a restriction check, and a final interpretation.
- Hint Mapping: H-P052-T013
- Tutorial Mapping: Tut-P052 sections Core Method and Worked Examples
- Socratic Mapping: Soc-P052 branch t013

## Template T014 - Choosing Law of Cosines
- Template ID: P052-T014
- Question Type: Skill application
- Cognitive Skill: Choosing Law of Cosines
- Difficulty: 4
- Estimated Time: 105 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: false
- Learning Objective: Use law of cosines to handle choosing law of cosines.
- Example Question: A triangle has sides 7, 8, and 9. Which law should you use first to find an angle, and why?
- Answer: Use the Law of Cosines first because all three sides are known.
- Explanation: The Law of Sines needs a known angle-opposite side pair. With SSS information, Law of Cosines is the direct method for finding an angle.
- Distractors: uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step.
- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.
- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.
- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.
- Metadata: phase_id=P052; prerequisites=[triangle_vocabulary, square_roots, inverse_cosine, pythagorean_theorem, rounding]; misconception_tags=[included_angle_mismatch, sine_used_instead_of_cosine, sign_error_obtuse_angle, wrong_side_opposite_angle]; randomization_constraints=[single intended answer, phase-level skill match].
- Graph/Visual Variant: Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.
- Modeling Variant: Use the same structure in a short context with units and an interpreted final sentence.
- Reverse Variant: Give the answer and ask for a valid original question or parameter choice that produces it.
- Equation Battle Variant: Ask the player to justify each legal algebraic move when equations are involved.
- Multi-stage Boss Variant: Combine this family with a representation change, a restriction check, and a final interpretation.
- Hint Mapping: H-P052-T014
- Tutorial Mapping: Tut-P052 sections Core Method and Worked Examples
- Socratic Mapping: Soc-P052 branch t014

## Template T015 - Angle in a 13-14-15 triangle
- Template ID: P052-T015
- Question Type: Skill application
- Cognitive Skill: Angle in a 13-14-15 triangle
- Difficulty: 4
- Estimated Time: 110 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Use law of cosines to handle angle in a 13-14-15 triangle.
- Example Question: A triangle has sides 13, 14, and 15. Find the angle opposite the side of length 15 to the nearest tenth.
- Answer: 67.4 degrees
- Explanation: cos C = (13^2 + 14^2 - 15^2)/(2(13)(14)) = 140/364 = 5/13. Therefore C = arccos(5/13), about 67.4 degrees.
- Distractors: uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step.
- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.
- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.
- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.
- Metadata: phase_id=P052; prerequisites=[triangle_vocabulary, square_roots, inverse_cosine, pythagorean_theorem, rounding]; misconception_tags=[included_angle_mismatch, sine_used_instead_of_cosine, sign_error_obtuse_angle, wrong_side_opposite_angle]; randomization_constraints=[single intended answer, phase-level skill match].
- Graph/Visual Variant: Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.
- Modeling Variant: Use the same structure in a short context with units and an interpreted final sentence.
- Reverse Variant: Give the answer and ask for a valid original question or parameter choice that produces it.
- Equation Battle Variant: Ask the player to justify each legal algebraic move when equations are involved.
- Multi-stage Boss Variant: Combine this family with a representation change, a restriction check, and a final interpretation.
- Hint Mapping: H-P052-T015
- Tutorial Mapping: Tut-P052 sections Core Method and Worked Examples
- Socratic Mapping: Soc-P052 branch t015

## Template T016 - Obtuse triangle classification
- Template ID: P052-T016
- Question Type: Skill application
- Cognitive Skill: Obtuse triangle classification
- Difficulty: 4
- Estimated Time: 115 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Use law of cosines to handle obtuse triangle classification.
- Example Question: Classify the triangle with side lengths 3, 4, and 6 as acute, right, or obtuse.
- Answer: Obtuse
- Explanation: The largest side is 6. Since 6^2 = 36 is greater than 3^2 + 4^2 = 25, the angle opposite 6 is obtuse.
- Distractors: uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step.
- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.
- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.
- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.
- Metadata: phase_id=P052; prerequisites=[triangle_vocabulary, square_roots, inverse_cosine, pythagorean_theorem, rounding]; misconception_tags=[included_angle_mismatch, sine_used_instead_of_cosine, sign_error_obtuse_angle, wrong_side_opposite_angle]; randomization_constraints=[single intended answer, phase-level skill match].
- Graph/Visual Variant: Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.
- Modeling Variant: Use the same structure in a short context with units and an interpreted final sentence.
- Reverse Variant: Give the answer and ask for a valid original question or parameter choice that produces it.
- Equation Battle Variant: Ask the player to justify each legal algebraic move when equations are involved.
- Multi-stage Boss Variant: Combine this family with a representation change, a restriction check, and a final interpretation.
- Hint Mapping: H-P052-T016
- Tutorial Mapping: Tut-P052 sections Core Method and Worked Examples
- Socratic Mapping: Soc-P052 branch t016

## Template T017 - Solving for an unknown side
- Template ID: P052-T017
- Question Type: Skill application
- Cognitive Skill: Solving for an unknown side
- Difficulty: 4
- Estimated Time: 120 seconds
- Visual Required: true
- Equation Battle Compatible: true
- Boss Compatible: true
- Learning Objective: Use law of cosines to handle solving for an unknown side.
- Example Question: A triangle has sides 5 and 7 with included angle 60 degrees. The side opposite the angle is x. Find x exactly.
- Answer: x = sqrt(39)
- Explanation: Use x^2 = 5^2 + 7^2 - 2(5)(7)cos60 = 25 + 49 - 35 = 39. Therefore x = sqrt(39).
- Distractors: uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step.
- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.
- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.
- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.
- Metadata: phase_id=P052; prerequisites=[triangle_vocabulary, square_roots, inverse_cosine, pythagorean_theorem, rounding]; misconception_tags=[included_angle_mismatch, sine_used_instead_of_cosine, sign_error_obtuse_angle, wrong_side_opposite_angle]; randomization_constraints=[single intended answer, phase-level skill match].
- Graph/Visual Variant: Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.
- Modeling Variant: Use the same structure in a short context with units and an interpreted final sentence.
- Reverse Variant: Give the answer and ask for a valid original question or parameter choice that produces it.
- Equation Battle Variant: Ask the player to justify each legal algebraic move when equations are involved.
- Multi-stage Boss Variant: Combine this family with a representation change, a restriction check, and a final interpretation.
- Hint Mapping: H-P052-T017
- Tutorial Mapping: Tut-P052 sections Core Method and Worked Examples
- Socratic Mapping: Soc-P052 branch t017

## Template T018 - Ship distance model
- Template ID: P052-T018
- Question Type: Skill application
- Cognitive Skill: Ship distance model
- Difficulty: 5
- Estimated Time: 125 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Use law of cosines to handle ship distance model.
- Example Question: Two ships leave the same port. One travels 18 km and the other travels 22 km, with an angle of 70 degrees between their paths. How far apart are they to the nearest hundredth?
- Answer: 23.18 km
- Explanation: Use d^2 = 18^2 + 22^2 - 2(18)(22)cos70. This gives d^2 about 537.12, so d is about 23.18 km.
- Distractors: uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step.
- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.
- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.
- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.
- Metadata: phase_id=P052; prerequisites=[triangle_vocabulary, square_roots, inverse_cosine, pythagorean_theorem, rounding]; misconception_tags=[included_angle_mismatch, sine_used_instead_of_cosine, sign_error_obtuse_angle, wrong_side_opposite_angle]; randomization_constraints=[single intended answer, phase-level skill match].
- Graph/Visual Variant: Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.
- Modeling Variant: Use boats, planes, drones, or hikers traveling from a shared starting point.
- Reverse Variant: Give the answer and ask for a valid original question or parameter choice that produces it.
- Equation Battle Variant: Ask the player to justify each legal algebraic move when equations are involved.
- Multi-stage Boss Variant: Combine this family with a representation change, a restriction check, and a final interpretation.
- Hint Mapping: H-P052-T018
- Tutorial Mapping: Tut-P052 sections Core Method and Worked Examples
- Socratic Mapping: Soc-P052 branch t018

## Template T019 - Angle opposite a named side
- Template ID: P052-T019
- Question Type: Skill application
- Cognitive Skill: Angle opposite a named side
- Difficulty: 5
- Estimated Time: 130 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Use law of cosines to handle angle opposite a named side.
- Example Question: In triangle ABC, a = 10, b = 8, and c = 6. Find angle A.
- Answer: A = 90 degrees
- Explanation: Angle A is opposite side a. Use cos A = (b^2 + c^2 - a^2)/(2bc) = (64 + 36 - 100)/(2(8)(6)) = 0. Thus A = 90 degrees.
- Distractors: uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step.
- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.
- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.
- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.
- Metadata: phase_id=P052; prerequisites=[triangle_vocabulary, square_roots, inverse_cosine, pythagorean_theorem, rounding]; misconception_tags=[included_angle_mismatch, sine_used_instead_of_cosine, sign_error_obtuse_angle, wrong_side_opposite_angle]; randomization_constraints=[single intended answer, phase-level skill match].
- Graph/Visual Variant: Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.
- Modeling Variant: Use the same structure in a short context with units and an interpreted final sentence.
- Reverse Variant: Give the answer and ask for a valid original question or parameter choice that produces it.
- Equation Battle Variant: Ask the player to justify each legal algebraic move when equations are involved.
- Multi-stage Boss Variant: Combine this family with a representation change, a restriction check, and a final interpretation.
- Hint Mapping: H-P052-T019
- Tutorial Mapping: Tut-P052 sections Core Method and Worked Examples
- Socratic Mapping: Soc-P052 branch t019

## Template T020 - Correcting formula misuse
- Template ID: P052-T020
- Question Type: Skill application
- Cognitive Skill: Correcting formula misuse
- Difficulty: 5
- Estimated Time: 135 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Use law of cosines to handle correcting formula misuse.
- Example Question: A student writes c^2 = a^2 + b^2 - 2ab sin C for Law of Cosines. What is wrong?
- Answer: The formula uses cos C, not sin C.
- Explanation: The Law of Cosines is c^2 = a^2 + b^2 - 2ab cos C. Using sine gives a different relationship and usually a wrong side length.
- Distractors: uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step.
- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.
- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.
- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.
- Metadata: phase_id=P052; prerequisites=[triangle_vocabulary, square_roots, inverse_cosine, pythagorean_theorem, rounding]; misconception_tags=[included_angle_mismatch, sine_used_instead_of_cosine, sign_error_obtuse_angle, wrong_side_opposite_angle]; randomization_constraints=[single intended answer, phase-level skill match].
- Graph/Visual Variant: Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.
- Modeling Variant: Use the same structure in a short context with units and an interpreted final sentence.
- Reverse Variant: Give the answer and ask for a valid original question or parameter choice that produces it.
- Equation Battle Variant: Ask the player to justify each legal algebraic move when equations are involved.
- Multi-stage Boss Variant: Combine this family with a representation change, a restriction check, and a final interpretation.
- Hint Mapping: H-P052-T020
- Tutorial Mapping: Tut-P052 sections Core Method and Worked Examples
- Socratic Mapping: Soc-P052 branch t020

# Part II - Hint Bible

## H-P052-T001
- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: finding a side with included 60 degrees.
- Hint 2 - Concept Reminder: In law of cosines, the correct method comes from the visible structure, conditions, and restrictions.
- Hint 3 - Focus Hint: For this item, use the setup shown in the question: Two sides of a triangle are 5 and 7 with included angle 60 degrees. Find the opposite side c exactly.
- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.
- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: Use c^2 = 5^2 + 7^2 - 2(5)(7)cos60. Since cos60 = 1/2, c^2 = 25 + 49 - 35 = 39, so c = sqrt(39).
- Hint 6 - Full Solution: Use c^2 = 5^2 + 7^2 - 2(5)(7)cos60. Since cos60 = 1/2, c^2 = 25 + 49 - 35 = 39, so c = sqrt(39). Therefore the answer is c = sqrt(39).

## H-P052-T002
- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: finding a side with obtuse included angle.
- Hint 2 - Concept Reminder: In law of cosines, the correct method comes from the visible structure, conditions, and restrictions.
- Hint 3 - Focus Hint: For this item, use the setup shown in the question: Two sides of a triangle are 8 and 10 with included angle 120 degrees. Find the opposite side c exactly.
- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.
- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: Use c^2 = 8^2 + 10^2 - 2(8)(10)cos120. Since cos120 = -1/2, c^2 = 64 + 100 + 80 = 244, so c = 2sqrt(61).
- Hint 6 - Full Solution: Use c^2 = 8^2 + 10^2 - 2(8)(10)cos120. Since cos120 = -1/2, c^2 = 64 + 100 + 80 = 244, so c = 2sqrt(61). Therefore the answer is c = 2sqrt(61).

## H-P052-T003
- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: finding a right angle from 3-4-5.
- Hint 2 - Concept Reminder: In law of cosines, the correct method comes from the visible structure, conditions, and restrictions.
- Hint 3 - Focus Hint: For this item, use the setup shown in the question: A triangle has sides 3, 4, and 5. Find the angle opposite the side of length 5.
- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.
- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: Use cos C = (3^2 + 4^2 - 5^2)/(2(3)(4)) = (9 + 16 - 25)/24 = 0. Therefore C = 90 degrees.
- Hint 6 - Full Solution: Use cos C = (3^2 + 4^2 - 5^2)/(2(3)(4)) = (9 + 16 - 25)/24 = 0. Therefore C = 90 degrees. Therefore the answer is 90 degrees.

## H-P052-T004
- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: recognizing pythagorean special case.
- Hint 2 - Concept Reminder: In law of cosines, the correct method comes from the visible structure, conditions, and restrictions.
- Hint 3 - Focus Hint: For this item, use the setup shown in the question: A triangle has sides 6, 8, and 10. Find the angle opposite the side of length 10.
- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.
- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: cos C = (6^2 + 8^2 - 10^2)/(2(6)(8)) = (36 + 64 - 100)/96 = 0. Thus C = 90 degrees.
- Hint 6 - Full Solution: cos C = (6^2 + 8^2 - 10^2)/(2(6)(8)) = (36 + 64 - 100)/96 = 0. Thus C = 90 degrees. Therefore the answer is 90 degrees.

## H-P052-T005
- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: finding an angle from three sides.
- Hint 2 - Concept Reminder: In law of cosines, the correct method comes from the visible structure, conditions, and restrictions.
- Hint 3 - Focus Hint: For this item, use the setup shown in the question: A triangle has sides 7, 9, and 11. Find the angle opposite the side of length 11 to the nearest tenth.
- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.
- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: Use cos C = (7^2 + 9^2 - 11^2)/(2(7)(9)) = 9/126 = 1/14. Then C = arccos(1/14), about 85.9 degrees.
- Hint 6 - Full Solution: Use cos C = (7^2 + 9^2 - 11^2)/(2(7)(9)) = 9/126 = 1/14. Then C = arccos(1/14), about 85.9 degrees. Therefore the answer is 85.9 degrees.

## H-P052-T006
- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: sas side with non-special angle.
- Hint 2 - Concept Reminder: In law of cosines, the correct method comes from the visible structure, conditions, and restrictions.
- Hint 3 - Focus Hint: For this item, use the setup shown in the question: Two sides of a triangle are 12 and 15 with included angle 40 degrees. Find the third side to the nearest hundredth.
- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.
- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: Use c^2 = 12^2 + 15^2 - 2(12)(15)cos40. This gives c^2 about 93.22, so c is about 9.66.
- Hint 6 - Full Solution: Use c^2 = 12^2 + 15^2 - 2(12)(15)cos40. This gives c^2 about 93.22, so c is about 9.66. Therefore the answer is 9.66.

## H-P052-T007
- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: largest angle in an sss triangle.
- Hint 2 - Concept Reminder: In law of cosines, the correct method comes from the visible structure, conditions, and restrictions.
- Hint 3 - Focus Hint: For this item, use the setup shown in the question: A triangle has sides 4, 6, and 8. Find the largest angle to the nearest tenth.
- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.
- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: The largest angle is opposite side 8. cos C = (4^2 + 6^2 - 8^2)/(2(4)(6)) = -12/48 = -0.25. Thus C = arccos(-0.25), about 104.5 degrees.
- Hint 6 - Full Solution: The largest angle is opposite side 8. cos C = (4^2 + 6^2 - 8^2)/(2(4)(6)) = -12/48 = -0.25. Thus C = arccos(-0.25), about 104.5 degrees. Therefore the answer is 104.5 degrees.

## H-P052-T008
- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: classifying a triangle by side lengths.
- Hint 2 - Concept Reminder: In law of cosines, the correct method comes from the visible structure, conditions, and restrictions.
- Hint 3 - Focus Hint: For this item, use the setup shown in the question: Use side lengths 5, 6, and 7 to decide whether the triangle is acute, right, or obtuse.
- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.
- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: Compare the largest side squared with the sum of the other squares. Since 7^2 = 49 and 5^2 + 6^2 = 61, the largest angle is acute, so the triangle is acute.
- Hint 6 - Full Solution: Compare the largest side squared with the sum of the other squares. Since 7^2 = 49 and 5^2 + 6^2 = 61, the largest angle is acute, so the triangle is acute. Therefore the answer is Acute.

## H-P052-T009
- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: distance between two paths.
- Hint 2 - Concept Reminder: In law of cosines, the correct method comes from the visible structure, conditions, and restrictions.
- Hint 3 - Focus Hint: For this item, use the setup shown in the question: Two paths of lengths 10 miles and 14 miles meet at an angle of 35 degrees. Find the distance between their endpoints to the nearest hundredth.
- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.
- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: Use d^2 = 10^2 + 14^2 - 2(10)(14)cos35. This gives d^2 about 66.64, so d is about 8.16 miles.
- Hint 6 - Full Solution: Use d^2 = 10^2 + 14^2 - 2(10)(14)cos35. This gives d^2 about 66.64, so d is about 8.16 miles. Therefore the answer is 8.16 miles.

## H-P052-T010
- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: finding included angle.
- Hint 2 - Concept Reminder: In law of cosines, the correct method comes from the visible structure, conditions, and restrictions.
- Hint 3 - Focus Hint: For this item, use the setup shown in the question: Two sides around an angle are 9 and 12, and the opposite side is 15. Find the included angle.
- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.
- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: cos theta = (9^2 + 12^2 - 15^2)/(2(9)(12)) = 0/216 = 0. Therefore theta = 90 degrees.
- Hint 6 - Full Solution: cos theta = (9^2 + 12^2 - 15^2)/(2(9)(12)) = 0/216 = 0. Therefore theta = 90 degrees. Therefore the answer is 90 degrees.

## H-P052-T011
- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: equilateral result from sas.
- Hint 2 - Concept Reminder: In law of cosines, the correct method comes from the visible structure, conditions, and restrictions.
- Hint 3 - Focus Hint: For this item, use the setup shown in the question: Two sides of a triangle are 4 and 4 with included angle 60 degrees. Find the opposite side.
- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.
- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: Use c^2 = 4^2 + 4^2 - 2(4)(4)cos60 = 16 + 16 - 16 = 16. Thus c = 4.
- Hint 6 - Full Solution: Use c^2 = 4^2 + 4^2 - 2(4)(4)cos60 = 16 + 16 - 16 = 16. Thus c = 4. Therefore the answer is 4.

## H-P052-T012
- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: exact angle from side lengths.
- Hint 2 - Concept Reminder: In law of cosines, the correct method comes from the visible structure, conditions, and restrictions.
- Hint 3 - Focus Hint: For this item, use the setup shown in the question: A triangle has sides 1, 2, and sqrt(3). Find the angle opposite the side sqrt(3).
- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.
- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: cos C = (1^2 + 2^2 - (sqrt(3))^2)/(2(1)(2)) = (1 + 4 - 3)/4 = 1/2. Therefore C = 60 degrees.
- Hint 6 - Full Solution: cos C = (1^2 + 2^2 - (sqrt(3))^2)/(2(1)(2)) = (1 + 4 - 3)/4 = 1/2. Therefore C = 60 degrees. Therefore the answer is 60 degrees.

## H-P052-T013
- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: side length with included 120 degrees.
- Hint 2 - Concept Reminder: In law of cosines, the correct method comes from the visible structure, conditions, and restrictions.
- Hint 3 - Focus Hint: For this item, use the setup shown in the question: Two sides of a triangle are 5 and 5 with included angle 120 degrees. Find the opposite side exactly.
- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.
- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: Use c^2 = 25 + 25 - 2(5)(5)cos120. Since cos120 = -1/2, c^2 = 50 + 25 = 75, so c = 5sqrt(3).
- Hint 6 - Full Solution: Use c^2 = 25 + 25 - 2(5)(5)cos120. Since cos120 = -1/2, c^2 = 50 + 25 = 75, so c = 5sqrt(3). Therefore the answer is 5sqrt(3).

## H-P052-T014
- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: choosing law of cosines.
- Hint 2 - Concept Reminder: In law of cosines, the correct method comes from the visible structure, conditions, and restrictions.
- Hint 3 - Focus Hint: For this item, use the setup shown in the question: A triangle has sides 7, 8, and 9. Which law should you use first to find an angle, and why?
- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.
- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: The Law of Sines needs a known angle-opposite side pair. With SSS information, Law of Cosines is the direct method for finding an angle.
- Hint 6 - Full Solution: The Law of Sines needs a known angle-opposite side pair. With SSS information, Law of Cosines is the direct method for finding an angle. Therefore the answer is Use the Law of Cosines first because all three sides are known..

## H-P052-T015
- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: angle in a 13-14-15 triangle.
- Hint 2 - Concept Reminder: In law of cosines, the correct method comes from the visible structure, conditions, and restrictions.
- Hint 3 - Focus Hint: For this item, use the setup shown in the question: A triangle has sides 13, 14, and 15. Find the angle opposite the side of length 15 to the nearest tenth.
- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.
- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: cos C = (13^2 + 14^2 - 15^2)/(2(13)(14)) = 140/364 = 5/13. Therefore C = arccos(5/13), about 67.4 degrees.
- Hint 6 - Full Solution: cos C = (13^2 + 14^2 - 15^2)/(2(13)(14)) = 140/364 = 5/13. Therefore C = arccos(5/13), about 67.4 degrees. Therefore the answer is 67.4 degrees.

## H-P052-T016
- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: obtuse triangle classification.
- Hint 2 - Concept Reminder: In law of cosines, the correct method comes from the visible structure, conditions, and restrictions.
- Hint 3 - Focus Hint: For this item, use the setup shown in the question: Classify the triangle with side lengths 3, 4, and 6 as acute, right, or obtuse.
- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.
- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: The largest side is 6. Since 6^2 = 36 is greater than 3^2 + 4^2 = 25, the angle opposite 6 is obtuse.
- Hint 6 - Full Solution: The largest side is 6. Since 6^2 = 36 is greater than 3^2 + 4^2 = 25, the angle opposite 6 is obtuse. Therefore the answer is Obtuse.

## H-P052-T017
- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: solving for an unknown side.
- Hint 2 - Concept Reminder: In law of cosines, the correct method comes from the visible structure, conditions, and restrictions.
- Hint 3 - Focus Hint: For this item, use the setup shown in the question: A triangle has sides 5 and 7 with included angle 60 degrees. The side opposite the angle is x. Find x exactly.
- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.
- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: Use x^2 = 5^2 + 7^2 - 2(5)(7)cos60 = 25 + 49 - 35 = 39. Therefore x = sqrt(39).
- Hint 6 - Full Solution: Use x^2 = 5^2 + 7^2 - 2(5)(7)cos60 = 25 + 49 - 35 = 39. Therefore x = sqrt(39). Therefore the answer is x = sqrt(39).

## H-P052-T018
- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: ship distance model.
- Hint 2 - Concept Reminder: In law of cosines, the correct method comes from the visible structure, conditions, and restrictions.
- Hint 3 - Focus Hint: For this item, use the setup shown in the question: Two ships leave the same port. One travels 18 km and the other travels 22 km, with an angle of 70 degrees between their paths. How far apart are they to the nearest hundredth?
- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.
- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: Use d^2 = 18^2 + 22^2 - 2(18)(22)cos70. This gives d^2 about 537.12, so d is about 23.18 km.
- Hint 6 - Full Solution: Use d^2 = 18^2 + 22^2 - 2(18)(22)cos70. This gives d^2 about 537.12, so d is about 23.18 km. Therefore the answer is 23.18 km.

## H-P052-T019
- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: angle opposite a named side.
- Hint 2 - Concept Reminder: In law of cosines, the correct method comes from the visible structure, conditions, and restrictions.
- Hint 3 - Focus Hint: For this item, use the setup shown in the question: In triangle ABC, a = 10, b = 8, and c = 6. Find angle A.
- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.
- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: Angle A is opposite side a. Use cos A = (b^2 + c^2 - a^2)/(2bc) = (64 + 36 - 100)/(2(8)(6)) = 0. Thus A = 90 degrees.
- Hint 6 - Full Solution: Angle A is opposite side a. Use cos A = (b^2 + c^2 - a^2)/(2bc) = (64 + 36 - 100)/(2(8)(6)) = 0. Thus A = 90 degrees. Therefore the answer is A = 90 degrees.

## H-P052-T020
- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: correcting formula misuse.
- Hint 2 - Concept Reminder: In law of cosines, the correct method comes from the visible structure, conditions, and restrictions.
- Hint 3 - Focus Hint: For this item, use the setup shown in the question: A student writes c^2 = a^2 + b^2 - 2ab sin C for Law of Cosines. What is wrong?
- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.
- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: The Law of Cosines is c^2 = a^2 + b^2 - 2ab cos C. Using sine gives a different relationship and usually a wrong side length.
- Hint 6 - Full Solution: The Law of Cosines is c^2 = a^2 + b^2 - 2ab cos C. Using sine gives a different relationship and usually a wrong side length. Therefore the answer is The formula uses cos C, not sin C..

# Part III - Tutorial Bible

## Learning Goal
Master law of cosines by choosing the right representation, completing the computation, and interpreting the result.

## Why It Matters
This topic appears in later modeling, graphing, and boss challenges because it connects symbolic work with decisions about structure, restrictions, and meaning.

## Prerequisite Check
- Can the player explain this prerequisite? Identify the side opposite a named angle in a triangle.
- Can the player explain this prerequisite? Use the Pythagorean theorem as a special case when the included angle is 90 degrees.
- Can the player explain this prerequisite? Apply inverse cosine to find an angle from a cosine value.
- Can the player explain this prerequisite? Round only after the main computation is complete.

## Core Concept
- The Law of Cosines says c^2 = a^2 + b^2 - 2ab cos C, where C is the included angle between sides a and b.
- Use Law of Cosines for SAS information to find the third side.
- Use Law of Cosines for SSS information to find an angle.
- The Pythagorean theorem appears when cos C = 0.
- The sign of cos C helps identify whether an angle is acute, right, or obtuse.

## Worked Example
- Two sides of a triangle are 5 and 7 with included angle 60 degrees. Find the opposite side c exactly. Answer: c = sqrt(39) Reason: Use c^2 = 5^2 + 7^2 - 2(5)(7)cos60. Since cos60 = 1/2, c^2 = 25 + 49 - 35 = 39, so c = sqrt(39).
- Two sides of a triangle are 8 and 10 with included angle 120 degrees. Find the opposite side c exactly. Answer: c = 2sqrt(61) Reason: Use c^2 = 8^2 + 10^2 - 2(8)(10)cos120. Since cos120 = -1/2, c^2 = 64 + 100 + 80 = 244, so c = 2sqrt(61).
- A triangle has sides 3, 4, and 5. Find the angle opposite the side of length 5. Answer: 90 degrees Reason: Use cos C = (3^2 + 4^2 - 5^2)/(2(3)(4)) = (9 + 16 - 25)/24 = 0. Therefore C = 90 degrees.
- A triangle has sides 6, 8, and 10. Find the angle opposite the side of length 10. Answer: 90 degrees Reason: cos C = (6^2 + 8^2 - 10^2)/(2(6)(8)) = (36 + 64 - 100)/96 = 0. Thus C = 90 degrees.

## Common Mistakes
- Using the non-included angle in the SAS formula.
- Replacing cosine with sine in the formula.
- Forgetting the minus sign before 2ab cos C.
- Finding an angle but pairing it with the wrong opposite side.
- Assuming every triangle with three sides is right.

## Guided Practice
- Prompt: A triangle has sides 7, 9, and 11. Find the angle opposite the side of length 11 to the nearest tenth. Coach move: ask which rule or condition applies first. Target: 85.9 degrees.
- Prompt: Two sides of a triangle are 12 and 15 with included angle 40 degrees. Find the third side to the nearest hundredth. Coach move: ask which rule or condition applies first. Target: 9.66.
- Prompt: A triangle has sides 4, 6, and 8. Find the largest angle to the nearest tenth. Coach move: ask which rule or condition applies first. Target: 104.5 degrees.
- Prompt: Use side lengths 5, 6, and 7 to decide whether the triangle is acute, right, or obtuse. Coach move: ask which rule or condition applies first. Target: Acute.
- Prompt: Two paths of lengths 10 miles and 14 miles meet at an angle of 35 degrees. Find the distance between their endpoints to the nearest hundredth. Coach move: ask which rule or condition applies first. Target: 8.16 miles.
- Prompt: Two sides around an angle are 9 and 12, and the opposite side is 15. Find the included angle. Coach move: ask which rule or condition applies first. Target: 90 degrees.

## Independent Practice
- Equilateral result from SAS: Two sides of a triangle are 4 and 4 with included angle 60 degrees. Find the opposite side. Expected answer: 4.
- Exact angle from side lengths: A triangle has sides 1, 2, and sqrt(3). Find the angle opposite the side sqrt(3). Expected answer: 60 degrees.
- Side length with included 120 degrees: Two sides of a triangle are 5 and 5 with included angle 120 degrees. Find the opposite side exactly. Expected answer: 5sqrt(3).
- Choosing Law of Cosines: A triangle has sides 7, 8, and 9. Which law should you use first to find an angle, and why? Expected answer: Use the Law of Cosines first because all three sides are known..
- Angle in a 13-14-15 triangle: A triangle has sides 13, 14, and 15. Find the angle opposite the side of length 15 to the nearest tenth. Expected answer: 67.4 degrees.
- Obtuse triangle classification: Classify the triangle with side lengths 3, 4, and 6 as acute, right, or obtuse. Expected answer: Obtuse.

## Mastery Check
- A triangle has sides 5 and 7 with included angle 60 degrees. The side opposite the angle is x. Find x exactly. Mastery answer: x = sqrt(39).
- Two ships leave the same port. One travels 18 km and the other travels 22 km, with an angle of 70 degrees between their paths. How far apart are they to the nearest hundredth? Mastery answer: 23.18 km.
- In triangle ABC, a = 10, b = 8, and c = 6. Find angle A. Mastery answer: A = 90 degrees.
- A student writes c^2 = a^2 + b^2 - 2ab sin C for Law of Cosines. What is wrong? Mastery answer: The formula uses cos C, not sin C..

## Adaptive Tutor Messages
- If the player chooses the wrong method, ask them to name the visible structure before solving.
- If arithmetic is the only error, preserve the strategy and have them recompute one line.
- If notation or restrictions are missing, ask what values, units, or intervals the answer is allowed to use.
- If the player is fluent, advance to a boss variant that mixes representations.

## Tutorial Metadata
- Tutorial ID: Tut-P052
- Phase: 052
- Estimated duration: 18-25 minutes
- Required prior mastery: prerequisite review plus at least 70 percent accuracy on guided practice

# Part IV - Socratic Dialogue Bible

## Opening Diagnostic
Tutor: "When you see this law of cosines problem, what structure tells you the first move?"
Player response is classified by method choice, accuracy, notation, and interpretation.

## Guided Discovery
Tutor asks the player to identify the known information, the target, the rule or representation, and any restrictions before computing.
The sequence moves from recognition to one decisive step, then to a final interpretation.

## Correct Branch
If the player chooses the right structure, the tutor asks for the computation and then a sentence explaining why the result is allowed.

## Partial Understanding Branch
If the player has the right idea but incomplete execution, the tutor keeps their setup and asks for the next legal move.

## Misconception Branch
- If the player shows this issue: Using the non-included angle in the SAS formula. The tutor asks for a counterexample from the worked examples.
- If the player shows this issue: Replacing cosine with sine in the formula. The tutor asks for a counterexample from the worked examples.
- If the player shows this issue: Forgetting the minus sign before 2ab cos C. The tutor asks for a counterexample from the worked examples.
- If the player shows this issue: Finding an angle but pairing it with the wrong opposite side. The tutor asks for a counterexample from the worked examples.

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
Why is method selection more important than memorizing one procedure for every law of cosines task?

## Transfer Question
Where could law of cosines appear inside a mixed review or final boss challenge?

## Escalation Rules
- If the same misconception repeats twice, return to the relevant worked example.
- If the player cannot start, show the prerequisite review first.
- If the player solves three guided items correctly, move to independent practice.
- If the player solves two boss-compatible items correctly, unlock mixed review.

## Exit Condition
The Socratic sequence is complete when the player can choose the method, compute accurately, respect restrictions, and explain the result without prompting.

# Knowledge Graph

- Prerequisites: Triangle side-angle vocabulary, square roots, inverse cosine, rounding, and the Pythagorean theorem
- Concepts Unlocked: Law of cosines; representation choice; restriction checking; exact answer interpretation; mixed review readiness
- Related Concepts: equations, functions, graphs, tables, modeling, and boss challenge synthesis
- Common Misconceptions: included_angle_mismatch, sine_used_instead_of_cosine, sign_error_obtuse_angle, wrong_side_opposite_angle
- Remedial Phases: Phase 051 review; earlier function, equation, and graph review as needed
- Follow-up Phases: Phase 053; Phase 058 - Mixed review; Phase 059 - Final boss challenges
- Transfer Topics: calculator-free reasoning, modeling, graph interpretation, symbolic manipulation, and adaptive tutoring

# Validation Notes

## Structure Validation
- Includes Question Bible, Hint Bible, Tutorial Bible, Socratic Dialogue Bible, Knowledge Graph, and Validation Notes.
- Contains exactly 20 template families.
- Every template includes example, answer, explanation, distractors, randomization rules, validity constraints, mappings, variants, and metadata.
- Every template has six progressive hints ending in a full solution.

## Math Validation
- T001: Use c^2 = 5^2 + 7^2 - 2(5)(7)cos60. Since cos60 = 1/2, c^2 = 25 + 49 - 35 = 39, so c = sqrt(39). Answer recorded as c = sqrt(39).
- T002: Use c^2 = 8^2 + 10^2 - 2(8)(10)cos120. Since cos120 = -1/2, c^2 = 64 + 100 + 80 = 244, so c = 2sqrt(61). Answer recorded as c = 2sqrt(61).
- T003: Use cos C = (3^2 + 4^2 - 5^2)/(2(3)(4)) = (9 + 16 - 25)/24 = 0. Therefore C = 90 degrees. Answer recorded as 90 degrees.
- T004: cos C = (6^2 + 8^2 - 10^2)/(2(6)(8)) = (36 + 64 - 100)/96 = 0. Thus C = 90 degrees. Answer recorded as 90 degrees.
- T005: Use cos C = (7^2 + 9^2 - 11^2)/(2(7)(9)) = 9/126 = 1/14. Then C = arccos(1/14), about 85.9 degrees. Answer recorded as 85.9 degrees.
- T006: Use c^2 = 12^2 + 15^2 - 2(12)(15)cos40. This gives c^2 about 93.22, so c is about 9.66. Answer recorded as 9.66.
- T007: The largest angle is opposite side 8. cos C = (4^2 + 6^2 - 8^2)/(2(4)(6)) = -12/48 = -0.25. Thus C = arccos(-0.25), about 104.5 degrees. Answer recorded as 104.5 degrees.
- T008: Compare the largest side squared with the sum of the other squares. Since 7^2 = 49 and 5^2 + 6^2 = 61, the largest angle is acute, so the triangle is acute. Answer recorded as Acute.
- T009: Use d^2 = 10^2 + 14^2 - 2(10)(14)cos35. This gives d^2 about 66.64, so d is about 8.16 miles. Answer recorded as 8.16 miles.
- T010: cos theta = (9^2 + 12^2 - 15^2)/(2(9)(12)) = 0/216 = 0. Therefore theta = 90 degrees. Answer recorded as 90 degrees.
- T011: Use c^2 = 4^2 + 4^2 - 2(4)(4)cos60 = 16 + 16 - 16 = 16. Thus c = 4. Answer recorded as 4.
- T012: cos C = (1^2 + 2^2 - (sqrt(3))^2)/(2(1)(2)) = (1 + 4 - 3)/4 = 1/2. Therefore C = 60 degrees. Answer recorded as 60 degrees.
- T013: Use c^2 = 25 + 25 - 2(5)(5)cos120. Since cos120 = -1/2, c^2 = 50 + 25 = 75, so c = 5sqrt(3). Answer recorded as 5sqrt(3).
- T014: The Law of Sines needs a known angle-opposite side pair. With SSS information, Law of Cosines is the direct method for finding an angle. Answer recorded as Use the Law of Cosines first because all three sides are known..
- T015: cos C = (13^2 + 14^2 - 15^2)/(2(13)(14)) = 140/364 = 5/13. Therefore C = arccos(5/13), about 67.4 degrees. Answer recorded as 67.4 degrees.
- T016: The largest side is 6. Since 6^2 = 36 is greater than 3^2 + 4^2 = 25, the angle opposite 6 is obtuse. Answer recorded as Obtuse.
- T017: Use x^2 = 5^2 + 7^2 - 2(5)(7)cos60 = 25 + 49 - 35 = 39. Therefore x = sqrt(39). Answer recorded as x = sqrt(39).
- T018: Use d^2 = 18^2 + 22^2 - 2(18)(22)cos70. This gives d^2 about 537.12, so d is about 23.18 km. Answer recorded as 23.18 km.
- T019: Angle A is opposite side a. Use cos A = (b^2 + c^2 - a^2)/(2bc) = (64 + 36 - 100)/(2(8)(6)) = 0. Thus A = 90 degrees. Answer recorded as A = 90 degrees.
- T020: The Law of Cosines is c^2 = a^2 + b^2 - 2ab cos C. Using sine gives a different relationship and usually a wrong side length. Answer recorded as The formula uses cos C, not sin C..

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
