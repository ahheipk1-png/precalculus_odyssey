# Phase 035 - Rational asymptotes

## Phase Metadata
- Course: Precalculus Odyssey Bible v5
- Topic: Rational asymptotes
- Subtopic: Vertical, horizontal, and slant asymptotes of rational functions
- Prerequisites: Rational expression simplification, rational restrictions and holes, factoring, and polynomial degree comparisons
- Related phases: Phase 034 review; Phase 036 follow-up; mixed review and final boss integration
- Estimated phase size: 20 template families, 20 core examples, 120 progressive hints, 1 tutorial sequence, 1 Socratic dialogue system

## Learning Objectives
By the end of this phase, the player can:

1. Recognize the structure of rational asymptotes tasks before choosing a method.
2. Use correct notation, restrictions, and units while solving rational asymptotes questions.
3. Solve tasks involving vertical asymptote from an uncanceled factor.
4. Solve tasks involving hole versus vertical asymptote.
5. Solve tasks involving horizontal asymptote y equals zero.
6. Solve tasks involving horizontal asymptote from leading coefficients.
7. Solve tasks involving no horizontal asymptote when numerator degree is larger.
8. Solve tasks involving slant asymptote by division.
9. Solve tasks involving vertical asymptotes after factoring.
10. Solve tasks involving simplify before asymptotes.

## Prerequisite Review
- Factor numerators and denominators before deciding what cancels.
- Values that make the original denominator zero are restrictions.
- A canceled factor creates a hole; an uncanceled denominator factor can create a vertical asymptote.
- Compare polynomial degrees to predict end behavior of rational functions.
- Use polynomial division when the numerator degree is exactly one more than the denominator degree.

## Core Concepts
- Vertical asymptotes come from uncanceled denominator zeros.
- Horizontal asymptotes depend on the degree comparison after the rational expression is simplified.
- If numerator and denominator have the same degree, the horizontal asymptote is the ratio of leading coefficients.
- If the numerator degree is smaller, the horizontal asymptote is y = 0.
- If the numerator degree is exactly one more, a slant asymptote comes from polynomial division.
- Holes and asymptotes both come from restrictions, but they describe different graph behavior.

## Common Misconceptions
- Treating every excluded x-value as a vertical asymptote.
- Finding horizontal asymptotes from constant terms instead of leading terms.
- Forgetting to simplify before classifying holes and vertical asymptotes.
- Claiming a horizontal asymptote whenever the numerator has larger degree.
- Using the quotient from division but forgetting to drop the remainder for a slant asymptote.

# Part I - Question Bible

## Template T001 - vertical asymptote from an uncanceled factor
- Template ID: P035-T001
- Question Type: Skill application
- Cognitive Skill: vertical asymptote from an uncanceled factor
- Difficulty: 2
- Estimated Time: 40 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: false
- Learning Objective: Use rational asymptotes to handle vertical asymptote from an uncanceled factor.
- Example Question: Find the vertical asymptote of f(x) = 5/(x - 3).
- Answer: x = 3
- Explanation: The denominator is zero when x - 3 = 0, so x = 3. No factor cancels, so the graph has a vertical asymptote at x = 3.
- Distractors: uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step.
- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.
- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.
- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.
- Metadata: phase_id=P035; prerequisites=[rational_simplification, restrictions_and_holes, factoring, polynomial_degree]; misconception_tags=[hole_as_vertical_asymptote, denominator_only_rule, degree_rule_reversal, ignoring_cancellation]; randomization_constraints=[single intended answer, phase-level skill match].
- Graph/Visual Variant: Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.
- Modeling Variant: Use the same structure in a short context with units and an interpreted final sentence.
- Reverse Variant: Give the answer and ask for a valid original question or parameter choice that produces it.
- Equation Battle Variant: Ask the player to justify each legal algebraic move when equations are involved.
- Multi-stage Boss Variant: Combine this family with a representation change, a restriction check, and a final interpretation.
- Hint Mapping: H-P035-T001
- Tutorial Mapping: Tut-P035 sections Core Method and Worked Examples
- Socratic Mapping: Soc-P035 branch t001

## Template T002 - hole versus vertical asymptote
- Template ID: P035-T002
- Question Type: Skill application
- Cognitive Skill: hole versus vertical asymptote
- Difficulty: 2
- Estimated Time: 45 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: false
- Learning Objective: Use rational asymptotes to handle hole versus vertical asymptote.
- Example Question: For f(x) = (x - 2)/((x - 2)(x + 5)), identify the hole and the vertical asymptote.
- Answer: Hole at x = 2; vertical asymptote x = -5
- Explanation: The factor x - 2 cancels, so x = 2 is a hole. The remaining denominator x + 5 is zero at x = -5, giving a vertical asymptote.
- Distractors: uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step.
- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.
- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.
- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.
- Metadata: phase_id=P035; prerequisites=[rational_simplification, restrictions_and_holes, factoring, polynomial_degree]; misconception_tags=[hole_as_vertical_asymptote, denominator_only_rule, degree_rule_reversal, ignoring_cancellation]; randomization_constraints=[single intended answer, phase-level skill match].
- Graph/Visual Variant: Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.
- Modeling Variant: Use the same structure in a short context with units and an interpreted final sentence.
- Reverse Variant: Give the answer and ask for a valid original question or parameter choice that produces it.
- Equation Battle Variant: Ask the player to justify each legal algebraic move when equations are involved.
- Multi-stage Boss Variant: Combine this family with a representation change, a restriction check, and a final interpretation.
- Hint Mapping: H-P035-T002
- Tutorial Mapping: Tut-P035 sections Core Method and Worked Examples
- Socratic Mapping: Soc-P035 branch t002

## Template T003 - horizontal asymptote y equals zero
- Template ID: P035-T003
- Question Type: Skill application
- Cognitive Skill: horizontal asymptote y equals zero
- Difficulty: 2
- Estimated Time: 50 seconds
- Visual Required: false
- Equation Battle Compatible: false
- Boss Compatible: false
- Learning Objective: Use rational asymptotes to handle horizontal asymptote y equals zero.
- Example Question: Find the horizontal asymptote of f(x) = (4x + 1)/(2x^2 - 7).
- Answer: y = 0
- Explanation: The numerator has degree 1 and the denominator has degree 2. Since the numerator degree is smaller, f(x) approaches 0 as x grows large.
- Distractors: uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step.
- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.
- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.
- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.
- Metadata: phase_id=P035; prerequisites=[rational_simplification, restrictions_and_holes, factoring, polynomial_degree]; misconception_tags=[hole_as_vertical_asymptote, denominator_only_rule, degree_rule_reversal, ignoring_cancellation]; randomization_constraints=[single intended answer, phase-level skill match].
- Graph/Visual Variant: Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.
- Modeling Variant: Use the same structure in a short context with units and an interpreted final sentence.
- Reverse Variant: Give the answer and ask for a valid original question or parameter choice that produces it.
- Equation Battle Variant: Ask the player to justify each legal algebraic move when equations are involved.
- Multi-stage Boss Variant: Combine this family with a representation change, a restriction check, and a final interpretation.
- Hint Mapping: H-P035-T003
- Tutorial Mapping: Tut-P035 sections Core Method and Worked Examples
- Socratic Mapping: Soc-P035 branch t003

## Template T004 - horizontal asymptote from leading coefficients
- Template ID: P035-T004
- Question Type: Skill application
- Cognitive Skill: horizontal asymptote from leading coefficients
- Difficulty: 2
- Estimated Time: 55 seconds
- Visual Required: false
- Equation Battle Compatible: false
- Boss Compatible: false
- Learning Objective: Use rational asymptotes to handle horizontal asymptote from leading coefficients.
- Example Question: Find the horizontal asymptote of f(x) = (6x^2 - 5)/(3x^2 + x + 9).
- Answer: y = 2
- Explanation: The degrees are equal, so use the ratio of leading coefficients: 6/3 = 2. The horizontal asymptote is y = 2.
- Distractors: uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step.
- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.
- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.
- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.
- Metadata: phase_id=P035; prerequisites=[rational_simplification, restrictions_and_holes, factoring, polynomial_degree]; misconception_tags=[hole_as_vertical_asymptote, denominator_only_rule, degree_rule_reversal, ignoring_cancellation]; randomization_constraints=[single intended answer, phase-level skill match].
- Graph/Visual Variant: Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.
- Modeling Variant: Use the same structure in a short context with units and an interpreted final sentence.
- Reverse Variant: Give the answer and ask for a valid original question or parameter choice that produces it.
- Equation Battle Variant: Ask the player to justify each legal algebraic move when equations are involved.
- Multi-stage Boss Variant: Combine this family with a representation change, a restriction check, and a final interpretation.
- Hint Mapping: H-P035-T004
- Tutorial Mapping: Tut-P035 sections Core Method and Worked Examples
- Socratic Mapping: Soc-P035 branch t004

## Template T005 - no horizontal asymptote when numerator degree is larger
- Template ID: P035-T005
- Question Type: Skill application
- Cognitive Skill: no horizontal asymptote when numerator degree is larger
- Difficulty: 2
- Estimated Time: 60 seconds
- Visual Required: false
- Equation Battle Compatible: false
- Boss Compatible: false
- Learning Objective: Use rational asymptotes to handle no horizontal asymptote when numerator degree is larger.
- Example Question: Does f(x) = (x^3 + 2)/(x^2 + 1) have a horizontal asymptote?
- Answer: No horizontal asymptote
- Explanation: The numerator degree is 3 and the denominator degree is 2. Since the numerator degree is larger, the function has no horizontal asymptote.
- Distractors: uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step.
- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.
- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.
- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.
- Metadata: phase_id=P035; prerequisites=[rational_simplification, restrictions_and_holes, factoring, polynomial_degree]; misconception_tags=[hole_as_vertical_asymptote, denominator_only_rule, degree_rule_reversal, ignoring_cancellation]; randomization_constraints=[single intended answer, phase-level skill match].
- Graph/Visual Variant: Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.
- Modeling Variant: Use the same structure in a short context with units and an interpreted final sentence.
- Reverse Variant: Give the answer and ask for a valid original question or parameter choice that produces it.
- Equation Battle Variant: Ask the player to justify each legal algebraic move when equations are involved.
- Multi-stage Boss Variant: Combine this family with a representation change, a restriction check, and a final interpretation.
- Hint Mapping: H-P035-T005
- Tutorial Mapping: Tut-P035 sections Core Method and Worked Examples
- Socratic Mapping: Soc-P035 branch t005

## Template T006 - slant asymptote by division
- Template ID: P035-T006
- Question Type: Skill application
- Cognitive Skill: slant asymptote by division
- Difficulty: 3
- Estimated Time: 65 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: false
- Learning Objective: Use rational asymptotes to handle slant asymptote by division.
- Example Question: Find the slant asymptote of f(x) = (x^2 + 3x + 1)/(x + 1).
- Answer: y = x + 2
- Explanation: Divide x^2 + 3x + 1 by x + 1. The quotient is x + 2 with remainder -1, so the slant asymptote is y = x + 2.
- Distractors: uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step.
- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.
- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.
- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.
- Metadata: phase_id=P035; prerequisites=[rational_simplification, restrictions_and_holes, factoring, polynomial_degree]; misconception_tags=[hole_as_vertical_asymptote, denominator_only_rule, degree_rule_reversal, ignoring_cancellation]; randomization_constraints=[single intended answer, phase-level skill match].
- Graph/Visual Variant: Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.
- Modeling Variant: Use the same structure in a short context with units and an interpreted final sentence.
- Reverse Variant: Give the answer and ask for a valid original question or parameter choice that produces it.
- Equation Battle Variant: Ask the player to justify each legal algebraic move when equations are involved.
- Multi-stage Boss Variant: Combine this family with a representation change, a restriction check, and a final interpretation.
- Hint Mapping: H-P035-T006
- Tutorial Mapping: Tut-P035 sections Core Method and Worked Examples
- Socratic Mapping: Soc-P035 branch t006

## Template T007 - vertical asymptotes after factoring
- Template ID: P035-T007
- Question Type: Skill application
- Cognitive Skill: vertical asymptotes after factoring
- Difficulty: 3
- Estimated Time: 70 seconds
- Visual Required: false
- Equation Battle Compatible: false
- Boss Compatible: false
- Learning Objective: Use rational asymptotes to handle vertical asymptotes after factoring.
- Example Question: Find the vertical asymptotes of f(x) = (x + 1)/(x^2 - 9).
- Answer: x = 3 and x = -3
- Explanation: Factor the denominator: x^2 - 9 = (x - 3)(x + 3). Neither factor cancels, so x = 3 and x = -3 are vertical asymptotes.
- Distractors: uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step.
- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.
- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.
- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.
- Metadata: phase_id=P035; prerequisites=[rational_simplification, restrictions_and_holes, factoring, polynomial_degree]; misconception_tags=[hole_as_vertical_asymptote, denominator_only_rule, degree_rule_reversal, ignoring_cancellation]; randomization_constraints=[single intended answer, phase-level skill match].
- Graph/Visual Variant: Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.
- Modeling Variant: Use the same structure in a short context with units and an interpreted final sentence.
- Reverse Variant: Give the answer and ask for a valid original question or parameter choice that produces it.
- Equation Battle Variant: Ask the player to justify each legal algebraic move when equations are involved.
- Multi-stage Boss Variant: Combine this family with a representation change, a restriction check, and a final interpretation.
- Hint Mapping: H-P035-T007
- Tutorial Mapping: Tut-P035 sections Core Method and Worked Examples
- Socratic Mapping: Soc-P035 branch t007

## Template T008 - simplify before asymptotes
- Template ID: P035-T008
- Question Type: Skill application
- Cognitive Skill: simplify before asymptotes
- Difficulty: 3
- Estimated Time: 75 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: false
- Learning Objective: Use rational asymptotes to handle simplify before asymptotes.
- Example Question: For f(x) = (x^2 - 4)/(x^2 - 5x + 6), find the vertical asymptote and hole.
- Answer: Vertical asymptote x = 3; hole at x = 2
- Explanation: Factor to get (x - 2)(x + 2)/((x - 2)(x - 3)). The x - 2 factor cancels, so x = 2 is a hole and x = 3 is the vertical asymptote.
- Distractors: uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step.
- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.
- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.
- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.
- Metadata: phase_id=P035; prerequisites=[rational_simplification, restrictions_and_holes, factoring, polynomial_degree]; misconception_tags=[hole_as_vertical_asymptote, denominator_only_rule, degree_rule_reversal, ignoring_cancellation]; randomization_constraints=[single intended answer, phase-level skill match].
- Graph/Visual Variant: Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.
- Modeling Variant: Use the same structure in a short context with units and an interpreted final sentence.
- Reverse Variant: Give the answer and ask for a valid original question or parameter choice that produces it.
- Equation Battle Variant: Ask the player to justify each legal algebraic move when equations are involved.
- Multi-stage Boss Variant: Combine this family with a representation change, a restriction check, and a final interpretation.
- Hint Mapping: H-P035-T008
- Tutorial Mapping: Tut-P035 sections Core Method and Worked Examples
- Socratic Mapping: Soc-P035 branch t008

## Template T009 - horizontal asymptote after cancellation
- Template ID: P035-T009
- Question Type: Skill application
- Cognitive Skill: horizontal asymptote after cancellation
- Difficulty: 3
- Estimated Time: 80 seconds
- Visual Required: false
- Equation Battle Compatible: false
- Boss Compatible: false
- Learning Objective: Use rational asymptotes to handle horizontal asymptote after cancellation.
- Example Question: Find the horizontal asymptote of f(x) = (2x^2 + 2x)/(x^2 - 1).
- Answer: y = 2
- Explanation: Factor first: 2x(x + 1)/((x - 1)(x + 1)) simplifies to 2x/(x - 1). The simplified degrees are equal, and 2/1 = 2.
- Distractors: uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step.
- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.
- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.
- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.
- Metadata: phase_id=P035; prerequisites=[rational_simplification, restrictions_and_holes, factoring, polynomial_degree]; misconception_tags=[hole_as_vertical_asymptote, denominator_only_rule, degree_rule_reversal, ignoring_cancellation]; randomization_constraints=[single intended answer, phase-level skill match].
- Graph/Visual Variant: Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.
- Modeling Variant: Use the same structure in a short context with units and an interpreted final sentence.
- Reverse Variant: Give the answer and ask for a valid original question or parameter choice that produces it.
- Equation Battle Variant: Ask the player to justify each legal algebraic move when equations are involved.
- Multi-stage Boss Variant: Combine this family with a representation change, a restriction check, and a final interpretation.
- Hint Mapping: H-P035-T009
- Tutorial Mapping: Tut-P035 sections Core Method and Worked Examples
- Socratic Mapping: Soc-P035 branch t009

## Template T010 - hole coordinate
- Template ID: P035-T010
- Question Type: Skill application
- Cognitive Skill: hole coordinate
- Difficulty: 3
- Estimated Time: 85 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: false
- Learning Objective: Use rational asymptotes to handle hole coordinate.
- Example Question: Find the hole of f(x) = (x^2 - 1)/(x - 1).
- Answer: Hole at (1, 2)
- Explanation: Factor x^2 - 1 as (x - 1)(x + 1). After canceling x - 1, the graph follows y = x + 1 except at x = 1, where y would be 2.
- Distractors: uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step.
- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.
- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.
- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.
- Metadata: phase_id=P035; prerequisites=[rational_simplification, restrictions_and_holes, factoring, polynomial_degree]; misconception_tags=[hole_as_vertical_asymptote, denominator_only_rule, degree_rule_reversal, ignoring_cancellation]; randomization_constraints=[single intended answer, phase-level skill match].
- Graph/Visual Variant: Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.
- Modeling Variant: Use the same structure in a short context with units and an interpreted final sentence.
- Reverse Variant: Give the answer and ask for a valid original question or parameter choice that produces it.
- Equation Battle Variant: Ask the player to justify each legal algebraic move when equations are involved.
- Multi-stage Boss Variant: Combine this family with a representation change, a restriction check, and a final interpretation.
- Hint Mapping: H-P035-T010
- Tutorial Mapping: Tut-P035 sections Core Method and Worked Examples
- Socratic Mapping: Soc-P035 branch t010

## Template T011 - two vertical asymptotes and one horizontal asymptote
- Template ID: P035-T011
- Question Type: Skill application
- Cognitive Skill: two vertical asymptotes and one horizontal asymptote
- Difficulty: 3
- Estimated Time: 90 seconds
- Visual Required: false
- Equation Battle Compatible: false
- Boss Compatible: false
- Learning Objective: Use rational asymptotes to handle two vertical asymptotes and one horizontal asymptote.
- Example Question: Find the vertical and horizontal asymptotes of f(x) = (3x^2 + 1)/(x^2 - 4).
- Answer: Vertical asymptotes x = 2 and x = -2; horizontal asymptote y = 3
- Explanation: The denominator factors as (x - 2)(x + 2), so x = 2 and x = -2 are vertical asymptotes. Equal degrees give y = 3/1 = 3.
- Distractors: uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step.
- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.
- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.
- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.
- Metadata: phase_id=P035; prerequisites=[rational_simplification, restrictions_and_holes, factoring, polynomial_degree]; misconception_tags=[hole_as_vertical_asymptote, denominator_only_rule, degree_rule_reversal, ignoring_cancellation]; randomization_constraints=[single intended answer, phase-level skill match].
- Graph/Visual Variant: Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.
- Modeling Variant: Use the same structure in a short context with units and an interpreted final sentence.
- Reverse Variant: Give the answer and ask for a valid original question or parameter choice that produces it.
- Equation Battle Variant: Ask the player to justify each legal algebraic move when equations are involved.
- Multi-stage Boss Variant: Combine this family with a representation change, a restriction check, and a final interpretation.
- Hint Mapping: H-P035-T011
- Tutorial Mapping: Tut-P035 sections Core Method and Worked Examples
- Socratic Mapping: Soc-P035 branch t011

## Template T012 - slant asymptote with negative leading term
- Template ID: P035-T012
- Question Type: Skill application
- Cognitive Skill: slant asymptote with negative leading term
- Difficulty: 3
- Estimated Time: 95 seconds
- Visual Required: false
- Equation Battle Compatible: true
- Boss Compatible: false
- Learning Objective: Use rational asymptotes to handle slant asymptote with negative leading term.
- Example Question: Find the slant asymptote of f(x) = (2x^2 - x + 4)/(x - 2).
- Answer: y = 2x + 3
- Explanation: Polynomial division gives quotient 2x + 3 and remainder 10. The remainder becomes small far from the origin, so the slant asymptote is y = 2x + 3.
- Distractors: uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step.
- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.
- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.
- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.
- Metadata: phase_id=P035; prerequisites=[rational_simplification, restrictions_and_holes, factoring, polynomial_degree]; misconception_tags=[hole_as_vertical_asymptote, denominator_only_rule, degree_rule_reversal, ignoring_cancellation]; randomization_constraints=[single intended answer, phase-level skill match].
- Graph/Visual Variant: Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.
- Modeling Variant: Use the same structure in a short context with units and an interpreted final sentence.
- Reverse Variant: Give the answer and ask for a valid original question or parameter choice that produces it.
- Equation Battle Variant: Ask the player to justify each legal algebraic move when equations are involved.
- Multi-stage Boss Variant: Combine this family with a representation change, a restriction check, and a final interpretation.
- Hint Mapping: H-P035-T012
- Tutorial Mapping: Tut-P035 sections Core Method and Worked Examples
- Socratic Mapping: Soc-P035 branch t012

## Template T013 - asymptote from transformed reciprocal
- Template ID: P035-T013
- Question Type: Skill application
- Cognitive Skill: asymptote from transformed reciprocal
- Difficulty: 4
- Estimated Time: 100 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: false
- Learning Objective: Use rational asymptotes to handle asymptote from transformed reciprocal.
- Example Question: Find the vertical and horizontal asymptotes of f(x) = 4/(x + 2) - 5.
- Answer: Vertical asymptote x = -2; horizontal asymptote y = -5
- Explanation: The denominator x + 2 is zero at x = -2. The reciprocal part approaches 0 for large x, leaving the horizontal asymptote y = -5.
- Distractors: uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step.
- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.
- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.
- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.
- Metadata: phase_id=P035; prerequisites=[rational_simplification, restrictions_and_holes, factoring, polynomial_degree]; misconception_tags=[hole_as_vertical_asymptote, denominator_only_rule, degree_rule_reversal, ignoring_cancellation]; randomization_constraints=[single intended answer, phase-level skill match].
- Graph/Visual Variant: Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.
- Modeling Variant: Use the same structure in a short context with units and an interpreted final sentence.
- Reverse Variant: Give the answer and ask for a valid original question or parameter choice that produces it.
- Equation Battle Variant: Ask the player to justify each legal algebraic move when equations are involved.
- Multi-stage Boss Variant: Combine this family with a representation change, a restriction check, and a final interpretation.
- Hint Mapping: H-P035-T013
- Tutorial Mapping: Tut-P035 sections Core Method and Worked Examples
- Socratic Mapping: Soc-P035 branch t013

## Template T014 - domain restriction that becomes a hole
- Template ID: P035-T014
- Question Type: Skill application
- Cognitive Skill: domain restriction that becomes a hole
- Difficulty: 4
- Estimated Time: 105 seconds
- Visual Required: false
- Equation Battle Compatible: false
- Boss Compatible: false
- Learning Objective: Use rational asymptotes to handle domain restriction that becomes a hole.
- Example Question: For f(x) = (x^2 + 5x + 6)/(x + 2), find the removable restriction and the simplified graph.
- Answer: Removable restriction x = -2; simplified graph y = x + 3
- Explanation: The numerator factors as (x + 2)(x + 3). Cancel x + 2 to get y = x + 3, but x = -2 remains excluded as a hole.
- Distractors: uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step.
- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.
- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.
- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.
- Metadata: phase_id=P035; prerequisites=[rational_simplification, restrictions_and_holes, factoring, polynomial_degree]; misconception_tags=[hole_as_vertical_asymptote, denominator_only_rule, degree_rule_reversal, ignoring_cancellation]; randomization_constraints=[single intended answer, phase-level skill match].
- Graph/Visual Variant: Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.
- Modeling Variant: Use the same structure in a short context with units and an interpreted final sentence.
- Reverse Variant: Give the answer and ask for a valid original question or parameter choice that produces it.
- Equation Battle Variant: Ask the player to justify each legal algebraic move when equations are involved.
- Multi-stage Boss Variant: Combine this family with a representation change, a restriction check, and a final interpretation.
- Hint Mapping: H-P035-T014
- Tutorial Mapping: Tut-P035 sections Core Method and Worked Examples
- Socratic Mapping: Soc-P035 branch t014

## Template T015 - classifying all asymptote types
- Template ID: P035-T015
- Question Type: Skill application
- Cognitive Skill: classifying all asymptote types
- Difficulty: 4
- Estimated Time: 110 seconds
- Visual Required: false
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Use rational asymptotes to handle classifying all asymptote types.
- Example Question: Classify the end behavior and vertical asymptote of f(x) = (x^2 + 1)/(x - 4).
- Answer: Vertical asymptote x = 4; slant asymptote y = x + 4
- Explanation: The denominator is zero at x = 4. Since the numerator degree is one more than the denominator degree, divide to get quotient x + 4 with remainder 17.
- Distractors: uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step.
- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.
- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.
- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.
- Metadata: phase_id=P035; prerequisites=[rational_simplification, restrictions_and_holes, factoring, polynomial_degree]; misconception_tags=[hole_as_vertical_asymptote, denominator_only_rule, degree_rule_reversal, ignoring_cancellation]; randomization_constraints=[single intended answer, phase-level skill match].
- Graph/Visual Variant: Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.
- Modeling Variant: Use the same structure in a short context with units and an interpreted final sentence.
- Reverse Variant: Give the answer and ask for a valid original question or parameter choice that produces it.
- Equation Battle Variant: Ask the player to justify each legal algebraic move when equations are involved.
- Multi-stage Boss Variant: Combine this family with a representation change, a restriction check, and a final interpretation.
- Hint Mapping: H-P035-T015
- Tutorial Mapping: Tut-P035 sections Core Method and Worked Examples
- Socratic Mapping: Soc-P035 branch t015

## Template T016 - build a rational function from asymptotes
- Template ID: P035-T016
- Question Type: Skill application
- Cognitive Skill: build a rational function from asymptotes
- Difficulty: 4
- Estimated Time: 115 seconds
- Visual Required: false
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Use rational asymptotes to handle build a rational function from asymptotes.
- Example Question: Give one rational function with vertical asymptote x = 1 and horizontal asymptote y = 3.
- Answer: One answer is f(x) = 3 + 2/(x - 1)
- Explanation: The term 2/(x - 1) creates a vertical asymptote at x = 1 and approaches 0 for large x, so the horizontal asymptote is y = 3.
- Distractors: uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step.
- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.
- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.
- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.
- Metadata: phase_id=P035; prerequisites=[rational_simplification, restrictions_and_holes, factoring, polynomial_degree]; misconception_tags=[hole_as_vertical_asymptote, denominator_only_rule, degree_rule_reversal, ignoring_cancellation]; randomization_constraints=[single intended answer, phase-level skill match].
- Graph/Visual Variant: Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.
- Modeling Variant: Use the same structure in a short context with units and an interpreted final sentence.
- Reverse Variant: Give the asymptotes and ask the player to build a rational function that has them.
- Equation Battle Variant: Ask the player to justify each legal algebraic move when equations are involved.
- Multi-stage Boss Variant: Combine this family with a representation change, a restriction check, and a final interpretation.
- Hint Mapping: H-P035-T016
- Tutorial Mapping: Tut-P035 sections Core Method and Worked Examples
- Socratic Mapping: Soc-P035 branch t016

## Template T017 - error analysis with canceled factors
- Template ID: P035-T017
- Question Type: Skill application
- Cognitive Skill: error analysis with canceled factors
- Difficulty: 4
- Estimated Time: 120 seconds
- Visual Required: false
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Use rational asymptotes to handle error analysis with canceled factors.
- Example Question: A player says f(x) = (x - 4)/(x^2 - 16) has vertical asymptotes x = 4 and x = -4. What is the correction?
- Answer: x = 4 is a hole; x = -4 is the only vertical asymptote
- Explanation: Factor the denominator as (x - 4)(x + 4). The x - 4 factor cancels, so it creates a hole rather than a vertical asymptote.
- Distractors: uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step.
- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.
- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.
- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.
- Metadata: phase_id=P035; prerequisites=[rational_simplification, restrictions_and_holes, factoring, polynomial_degree]; misconception_tags=[hole_as_vertical_asymptote, denominator_only_rule, degree_rule_reversal, ignoring_cancellation]; randomization_constraints=[single intended answer, phase-level skill match].
- Graph/Visual Variant: Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.
- Modeling Variant: Use the same structure in a short context with units and an interpreted final sentence.
- Reverse Variant: Give the answer and ask for a valid original question or parameter choice that produces it.
- Equation Battle Variant: Ask the player to justify each legal algebraic move when equations are involved.
- Multi-stage Boss Variant: Combine this family with a representation change, a restriction check, and a final interpretation.
- Hint Mapping: H-P035-T017
- Tutorial Mapping: Tut-P035 sections Core Method and Worked Examples
- Socratic Mapping: Soc-P035 branch t017

## Template T018 - asymptote from table behavior
- Template ID: P035-T018
- Question Type: Skill application
- Cognitive Skill: asymptote from table behavior
- Difficulty: 5
- Estimated Time: 125 seconds
- Visual Required: true
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Use rational asymptotes to handle asymptote from table behavior.
- Example Question: A rational function has values 101, 201, and 1001 near x = 2 from the right, while values far left and far right approach 4. Name the likely asymptotes.
- Answer: Vertical asymptote x = 2; horizontal asymptote y = 4
- Explanation: The values grow without bound near x = 2, which indicates a vertical asymptote there. The far-end values approach 4, giving horizontal asymptote y = 4.
- Distractors: uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step.
- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.
- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.
- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.
- Metadata: phase_id=P035; prerequisites=[rational_simplification, restrictions_and_holes, factoring, polynomial_degree]; misconception_tags=[hole_as_vertical_asymptote, denominator_only_rule, degree_rule_reversal, ignoring_cancellation]; randomization_constraints=[single intended answer, phase-level skill match].
- Graph/Visual Variant: Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.
- Modeling Variant: Use the same structure in a short context with units and an interpreted final sentence.
- Reverse Variant: Give the answer and ask for a valid original question or parameter choice that produces it.
- Equation Battle Variant: Ask the player to justify each legal algebraic move when equations are involved.
- Multi-stage Boss Variant: Combine this family with a representation change, a restriction check, and a final interpretation.
- Hint Mapping: H-P035-T018
- Tutorial Mapping: Tut-P035 sections Core Method and Worked Examples
- Socratic Mapping: Soc-P035 branch t018

## Template T019 - slant asymptote with missing terms
- Template ID: P035-T019
- Question Type: Skill application
- Cognitive Skill: slant asymptote with missing terms
- Difficulty: 5
- Estimated Time: 130 seconds
- Visual Required: false
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Use rational asymptotes to handle slant asymptote with missing terms.
- Example Question: Find the slant asymptote of f(x) = (x^2 - 9)/(x - 1).
- Answer: y = x + 1
- Explanation: Divide x^2 - 9 by x - 1. The quotient is x + 1 with remainder -8, so the slant asymptote is y = x + 1.
- Distractors: uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step.
- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.
- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.
- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.
- Metadata: phase_id=P035; prerequisites=[rational_simplification, restrictions_and_holes, factoring, polynomial_degree]; misconception_tags=[hole_as_vertical_asymptote, denominator_only_rule, degree_rule_reversal, ignoring_cancellation]; randomization_constraints=[single intended answer, phase-level skill match].
- Graph/Visual Variant: Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.
- Modeling Variant: Use the same structure in a short context with units and an interpreted final sentence.
- Reverse Variant: Give the answer and ask for a valid original question or parameter choice that produces it.
- Equation Battle Variant: Ask the player to justify each legal algebraic move when equations are involved.
- Multi-stage Boss Variant: Combine this family with a representation change, a restriction check, and a final interpretation.
- Hint Mapping: H-P035-T019
- Tutorial Mapping: Tut-P035 sections Core Method and Worked Examples
- Socratic Mapping: Soc-P035 branch t019

## Template T020 - mixed rational asymptote summary
- Template ID: P035-T020
- Question Type: Skill application
- Cognitive Skill: mixed rational asymptote summary
- Difficulty: 5
- Estimated Time: 135 seconds
- Visual Required: false
- Equation Battle Compatible: false
- Boss Compatible: true
- Learning Objective: Use rational asymptotes to handle mixed rational asymptote summary.
- Example Question: For f(x) = (2x^2 - 8)/(x^2 - x - 6), identify holes, vertical asymptotes, and horizontal asymptote.
- Answer: Hole at x = -2; vertical asymptote x = 3; horizontal asymptote y = 2
- Explanation: Factor as 2(x - 2)(x + 2)/((x - 3)(x + 2)). The x + 2 factor cancels, so x = -2 is a hole; x = 3 remains a vertical asymptote. Equal degrees give y = 2.
- Distractors: uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step.
- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.
- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.
- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.
- Metadata: phase_id=P035; prerequisites=[rational_simplification, restrictions_and_holes, factoring, polynomial_degree]; misconception_tags=[hole_as_vertical_asymptote, denominator_only_rule, degree_rule_reversal, ignoring_cancellation]; randomization_constraints=[single intended answer, phase-level skill match].
- Graph/Visual Variant: Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.
- Modeling Variant: Use the same structure in a short context with units and an interpreted final sentence.
- Reverse Variant: Give the answer and ask for a valid original question or parameter choice that produces it.
- Equation Battle Variant: Ask the player to justify each legal algebraic move when equations are involved.
- Multi-stage Boss Variant: Combine this family with a representation change, a restriction check, and a final interpretation.
- Hint Mapping: H-P035-T020
- Tutorial Mapping: Tut-P035 sections Core Method and Worked Examples
- Socratic Mapping: Soc-P035 branch t020

# Part II - Hint Bible

## H-P035-T001
- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: vertical asymptote from an uncanceled factor.
- Hint 2 - Concept Reminder: In rational asymptotes, the correct method comes from the visible structure, conditions, and restrictions.
- Hint 3 - Focus Hint: For this item, use the setup shown in the question: Find the vertical asymptote of f(x) = 5/(x - 3).
- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.
- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: The denominator is zero when x - 3 = 0, so x = 3. No factor cancels, so the graph has a vertical asymptote at x = 3.
- Hint 6 - Full Solution: The denominator is zero when x - 3 = 0, so x = 3. No factor cancels, so the graph has a vertical asymptote at x = 3. Therefore the answer is x = 3.

## H-P035-T002
- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: hole versus vertical asymptote.
- Hint 2 - Concept Reminder: In rational asymptotes, the correct method comes from the visible structure, conditions, and restrictions.
- Hint 3 - Focus Hint: For this item, use the setup shown in the question: For f(x) = (x - 2)/((x - 2)(x + 5)), identify the hole and the vertical asymptote.
- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.
- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: The factor x - 2 cancels, so x = 2 is a hole. The remaining denominator x + 5 is zero at x = -5, giving a vertical asymptote.
- Hint 6 - Full Solution: The factor x - 2 cancels, so x = 2 is a hole. The remaining denominator x + 5 is zero at x = -5, giving a vertical asymptote. Therefore the answer is Hole at x = 2; vertical asymptote x = -5.

## H-P035-T003
- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: horizontal asymptote y equals zero.
- Hint 2 - Concept Reminder: In rational asymptotes, the correct method comes from the visible structure, conditions, and restrictions.
- Hint 3 - Focus Hint: For this item, use the setup shown in the question: Find the horizontal asymptote of f(x) = (4x + 1)/(2x^2 - 7).
- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.
- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: The numerator has degree 1 and the denominator has degree 2. Since the numerator degree is smaller, f(x) approaches 0 as x grows large.
- Hint 6 - Full Solution: The numerator has degree 1 and the denominator has degree 2. Since the numerator degree is smaller, f(x) approaches 0 as x grows large. Therefore the answer is y = 0.

## H-P035-T004
- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: horizontal asymptote from leading coefficients.
- Hint 2 - Concept Reminder: In rational asymptotes, the correct method comes from the visible structure, conditions, and restrictions.
- Hint 3 - Focus Hint: For this item, use the setup shown in the question: Find the horizontal asymptote of f(x) = (6x^2 - 5)/(3x^2 + x + 9).
- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.
- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: The degrees are equal, so use the ratio of leading coefficients: 6/3 = 2. The horizontal asymptote is y = 2.
- Hint 6 - Full Solution: The degrees are equal, so use the ratio of leading coefficients: 6/3 = 2. The horizontal asymptote is y = 2. Therefore the answer is y = 2.

## H-P035-T005
- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: no horizontal asymptote when numerator degree is larger.
- Hint 2 - Concept Reminder: In rational asymptotes, the correct method comes from the visible structure, conditions, and restrictions.
- Hint 3 - Focus Hint: For this item, use the setup shown in the question: Does f(x) = (x^3 + 2)/(x^2 + 1) have a horizontal asymptote?
- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.
- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: The numerator degree is 3 and the denominator degree is 2. Since the numerator degree is larger, the function has no horizontal asymptote.
- Hint 6 - Full Solution: The numerator degree is 3 and the denominator degree is 2. Since the numerator degree is larger, the function has no horizontal asymptote. Therefore the answer is No horizontal asymptote.

## H-P035-T006
- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: slant asymptote by division.
- Hint 2 - Concept Reminder: In rational asymptotes, the correct method comes from the visible structure, conditions, and restrictions.
- Hint 3 - Focus Hint: For this item, use the setup shown in the question: Find the slant asymptote of f(x) = (x^2 + 3x + 1)/(x + 1).
- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.
- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: Divide x^2 + 3x + 1 by x + 1. The quotient is x + 2 with remainder -1, so the slant asymptote is y = x + 2.
- Hint 6 - Full Solution: Divide x^2 + 3x + 1 by x + 1. The quotient is x + 2 with remainder -1, so the slant asymptote is y = x + 2. Therefore the answer is y = x + 2.

## H-P035-T007
- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: vertical asymptotes after factoring.
- Hint 2 - Concept Reminder: In rational asymptotes, the correct method comes from the visible structure, conditions, and restrictions.
- Hint 3 - Focus Hint: For this item, use the setup shown in the question: Find the vertical asymptotes of f(x) = (x + 1)/(x^2 - 9).
- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.
- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: Factor the denominator: x^2 - 9 = (x - 3)(x + 3). Neither factor cancels, so x = 3 and x = -3 are vertical asymptotes.
- Hint 6 - Full Solution: Factor the denominator: x^2 - 9 = (x - 3)(x + 3). Neither factor cancels, so x = 3 and x = -3 are vertical asymptotes. Therefore the answer is x = 3 and x = -3.

## H-P035-T008
- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: simplify before asymptotes.
- Hint 2 - Concept Reminder: In rational asymptotes, the correct method comes from the visible structure, conditions, and restrictions.
- Hint 3 - Focus Hint: For this item, use the setup shown in the question: For f(x) = (x^2 - 4)/(x^2 - 5x + 6), find the vertical asymptote and hole.
- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.
- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: Factor to get (x - 2)(x + 2)/((x - 2)(x - 3)). The x - 2 factor cancels, so x = 2 is a hole and x = 3 is the vertical asymptote.
- Hint 6 - Full Solution: Factor to get (x - 2)(x + 2)/((x - 2)(x - 3)). The x - 2 factor cancels, so x = 2 is a hole and x = 3 is the vertical asymptote. Therefore the answer is Vertical asymptote x = 3; hole at x = 2.

## H-P035-T009
- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: horizontal asymptote after cancellation.
- Hint 2 - Concept Reminder: In rational asymptotes, the correct method comes from the visible structure, conditions, and restrictions.
- Hint 3 - Focus Hint: For this item, use the setup shown in the question: Find the horizontal asymptote of f(x) = (2x^2 + 2x)/(x^2 - 1).
- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.
- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: Factor first: 2x(x + 1)/((x - 1)(x + 1)) simplifies to 2x/(x - 1). The simplified degrees are equal, and 2/1 = 2.
- Hint 6 - Full Solution: Factor first: 2x(x + 1)/((x - 1)(x + 1)) simplifies to 2x/(x - 1). The simplified degrees are equal, and 2/1 = 2. Therefore the answer is y = 2.

## H-P035-T010
- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: hole coordinate.
- Hint 2 - Concept Reminder: In rational asymptotes, the correct method comes from the visible structure, conditions, and restrictions.
- Hint 3 - Focus Hint: For this item, use the setup shown in the question: Find the hole of f(x) = (x^2 - 1)/(x - 1).
- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.
- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: Factor x^2 - 1 as (x - 1)(x + 1). After canceling x - 1, the graph follows y = x + 1 except at x = 1, where y would be 2.
- Hint 6 - Full Solution: Factor x^2 - 1 as (x - 1)(x + 1). After canceling x - 1, the graph follows y = x + 1 except at x = 1, where y would be 2. Therefore the answer is Hole at (1, 2).

## H-P035-T011
- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: two vertical asymptotes and one horizontal asymptote.
- Hint 2 - Concept Reminder: In rational asymptotes, the correct method comes from the visible structure, conditions, and restrictions.
- Hint 3 - Focus Hint: For this item, use the setup shown in the question: Find the vertical and horizontal asymptotes of f(x) = (3x^2 + 1)/(x^2 - 4).
- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.
- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: The denominator factors as (x - 2)(x + 2), so x = 2 and x = -2 are vertical asymptotes. Equal degrees give y = 3/1 = 3.
- Hint 6 - Full Solution: The denominator factors as (x - 2)(x + 2), so x = 2 and x = -2 are vertical asymptotes. Equal degrees give y = 3/1 = 3. Therefore the answer is Vertical asymptotes x = 2 and x = -2; horizontal asymptote y = 3.

## H-P035-T012
- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: slant asymptote with negative leading term.
- Hint 2 - Concept Reminder: In rational asymptotes, the correct method comes from the visible structure, conditions, and restrictions.
- Hint 3 - Focus Hint: For this item, use the setup shown in the question: Find the slant asymptote of f(x) = (2x^2 - x + 4)/(x - 2).
- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.
- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: Polynomial division gives quotient 2x + 3 and remainder 10. The remainder becomes small far from the origin, so the slant asymptote is y = 2x + 3.
- Hint 6 - Full Solution: Polynomial division gives quotient 2x + 3 and remainder 10. The remainder becomes small far from the origin, so the slant asymptote is y = 2x + 3. Therefore the answer is y = 2x + 3.

## H-P035-T013
- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: asymptote from transformed reciprocal.
- Hint 2 - Concept Reminder: In rational asymptotes, the correct method comes from the visible structure, conditions, and restrictions.
- Hint 3 - Focus Hint: For this item, use the setup shown in the question: Find the vertical and horizontal asymptotes of f(x) = 4/(x + 2) - 5.
- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.
- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: The denominator x + 2 is zero at x = -2. The reciprocal part approaches 0 for large x, leaving the horizontal asymptote y = -5.
- Hint 6 - Full Solution: The denominator x + 2 is zero at x = -2. The reciprocal part approaches 0 for large x, leaving the horizontal asymptote y = -5. Therefore the answer is Vertical asymptote x = -2; horizontal asymptote y = -5.

## H-P035-T014
- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: domain restriction that becomes a hole.
- Hint 2 - Concept Reminder: In rational asymptotes, the correct method comes from the visible structure, conditions, and restrictions.
- Hint 3 - Focus Hint: For this item, use the setup shown in the question: For f(x) = (x^2 + 5x + 6)/(x + 2), find the removable restriction and the simplified graph.
- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.
- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: The numerator factors as (x + 2)(x + 3). Cancel x + 2 to get y = x + 3, but x = -2 remains excluded as a hole.
- Hint 6 - Full Solution: The numerator factors as (x + 2)(x + 3). Cancel x + 2 to get y = x + 3, but x = -2 remains excluded as a hole. Therefore the answer is Removable restriction x = -2; simplified graph y = x + 3.

## H-P035-T015
- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: classifying all asymptote types.
- Hint 2 - Concept Reminder: In rational asymptotes, the correct method comes from the visible structure, conditions, and restrictions.
- Hint 3 - Focus Hint: For this item, use the setup shown in the question: Classify the end behavior and vertical asymptote of f(x) = (x^2 + 1)/(x - 4).
- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.
- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: The denominator is zero at x = 4. Since the numerator degree is one more than the denominator degree, divide to get quotient x + 4 with remainder 17.
- Hint 6 - Full Solution: The denominator is zero at x = 4. Since the numerator degree is one more than the denominator degree, divide to get quotient x + 4 with remainder 17. Therefore the answer is Vertical asymptote x = 4; slant asymptote y = x + 4.

## H-P035-T016
- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: build a rational function from asymptotes.
- Hint 2 - Concept Reminder: In rational asymptotes, the correct method comes from the visible structure, conditions, and restrictions.
- Hint 3 - Focus Hint: For this item, use the setup shown in the question: Give one rational function with vertical asymptote x = 1 and horizontal asymptote y = 3.
- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.
- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: The term 2/(x - 1) creates a vertical asymptote at x = 1 and approaches 0 for large x, so the horizontal asymptote is y = 3.
- Hint 6 - Full Solution: The term 2/(x - 1) creates a vertical asymptote at x = 1 and approaches 0 for large x, so the horizontal asymptote is y = 3. Therefore the answer is One answer is f(x) = 3 + 2/(x - 1).

## H-P035-T017
- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: error analysis with canceled factors.
- Hint 2 - Concept Reminder: In rational asymptotes, the correct method comes from the visible structure, conditions, and restrictions.
- Hint 3 - Focus Hint: For this item, use the setup shown in the question: A player says f(x) = (x - 4)/(x^2 - 16) has vertical asymptotes x = 4 and x = -4. What is the correction?
- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.
- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: Factor the denominator as (x - 4)(x + 4). The x - 4 factor cancels, so it creates a hole rather than a vertical asymptote.
- Hint 6 - Full Solution: Factor the denominator as (x - 4)(x + 4). The x - 4 factor cancels, so it creates a hole rather than a vertical asymptote. Therefore the answer is x = 4 is a hole; x = -4 is the only vertical asymptote.

## H-P035-T018
- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: asymptote from table behavior.
- Hint 2 - Concept Reminder: In rational asymptotes, the correct method comes from the visible structure, conditions, and restrictions.
- Hint 3 - Focus Hint: For this item, use the setup shown in the question: A rational function has values 101, 201, and 1001 near x = 2 from the right, while values far left and far right approach 4. Name the likely asymptotes.
- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.
- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: The values grow without bound near x = 2, which indicates a vertical asymptote there. The far-end values approach 4, giving horizontal asymptote y = 4.
- Hint 6 - Full Solution: The values grow without bound near x = 2, which indicates a vertical asymptote there. The far-end values approach 4, giving horizontal asymptote y = 4. Therefore the answer is Vertical asymptote x = 2; horizontal asymptote y = 4.

## H-P035-T019
- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: slant asymptote with missing terms.
- Hint 2 - Concept Reminder: In rational asymptotes, the correct method comes from the visible structure, conditions, and restrictions.
- Hint 3 - Focus Hint: For this item, use the setup shown in the question: Find the slant asymptote of f(x) = (x^2 - 9)/(x - 1).
- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.
- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: Divide x^2 - 9 by x - 1. The quotient is x + 1 with remainder -8, so the slant asymptote is y = x + 1.
- Hint 6 - Full Solution: Divide x^2 - 9 by x - 1. The quotient is x + 1 with remainder -8, so the slant asymptote is y = x + 1. Therefore the answer is y = x + 1.

## H-P035-T020
- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: mixed rational asymptote summary.
- Hint 2 - Concept Reminder: In rational asymptotes, the correct method comes from the visible structure, conditions, and restrictions.
- Hint 3 - Focus Hint: For this item, use the setup shown in the question: For f(x) = (2x^2 - 8)/(x^2 - x - 6), identify holes, vertical asymptotes, and horizontal asymptote.
- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.
- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: Factor as 2(x - 2)(x + 2)/((x - 3)(x + 2)). The x + 2 factor cancels, so x = -2 is a hole; x = 3 remains a vertical asymptote. Equal degrees give y = 2.
- Hint 6 - Full Solution: Factor as 2(x - 2)(x + 2)/((x - 3)(x + 2)). The x + 2 factor cancels, so x = -2 is a hole; x = 3 remains a vertical asymptote. Equal degrees give y = 2. Therefore the answer is Hole at x = -2; vertical asymptote x = 3; horizontal asymptote y = 2.

# Part III - Tutorial Bible

## Learning Goal
Master rational asymptotes by choosing the right representation, completing the computation, and interpreting the result.

## Why It Matters
This topic appears in later modeling, graphing, and boss challenges because it connects symbolic work with decisions about structure, restrictions, and meaning.

## Prerequisite Check
- Can the player explain this prerequisite? Factor numerators and denominators before deciding what cancels.
- Can the player explain this prerequisite? Values that make the original denominator zero are restrictions.
- Can the player explain this prerequisite? A canceled factor creates a hole; an uncanceled denominator factor can create a vertical asymptote.
- Can the player explain this prerequisite? Compare polynomial degrees to predict end behavior of rational functions.

## Core Concept
- Vertical asymptotes come from uncanceled denominator zeros.
- Horizontal asymptotes depend on the degree comparison after the rational expression is simplified.
- If numerator and denominator have the same degree, the horizontal asymptote is the ratio of leading coefficients.
- If the numerator degree is smaller, the horizontal asymptote is y = 0.
- If the numerator degree is exactly one more, a slant asymptote comes from polynomial division.
- Holes and asymptotes both come from restrictions, but they describe different graph behavior.

## Worked Example
- Find the vertical asymptote of f(x) = 5/(x - 3). Answer: x = 3 Reason: The denominator is zero when x - 3 = 0, so x = 3. No factor cancels, so the graph has a vertical asymptote at x = 3.
- For f(x) = (x - 2)/((x - 2)(x + 5)), identify the hole and the vertical asymptote. Answer: Hole at x = 2; vertical asymptote x = -5 Reason: The factor x - 2 cancels, so x = 2 is a hole. The remaining denominator x + 5 is zero at x = -5, giving a vertical asymptote.
- Find the horizontal asymptote of f(x) = (4x + 1)/(2x^2 - 7). Answer: y = 0 Reason: The numerator has degree 1 and the denominator has degree 2. Since the numerator degree is smaller, f(x) approaches 0 as x grows large.
- Find the horizontal asymptote of f(x) = (6x^2 - 5)/(3x^2 + x + 9). Answer: y = 2 Reason: The degrees are equal, so use the ratio of leading coefficients: 6/3 = 2. The horizontal asymptote is y = 2.

## Common Mistakes
- Treating every excluded x-value as a vertical asymptote.
- Finding horizontal asymptotes from constant terms instead of leading terms.
- Forgetting to simplify before classifying holes and vertical asymptotes.
- Claiming a horizontal asymptote whenever the numerator has larger degree.
- Using the quotient from division but forgetting to drop the remainder for a slant asymptote.

## Guided Practice
- Prompt: Does f(x) = (x^3 + 2)/(x^2 + 1) have a horizontal asymptote? Coach move: ask which rule or condition applies first. Target: No horizontal asymptote.
- Prompt: Find the slant asymptote of f(x) = (x^2 + 3x + 1)/(x + 1). Coach move: ask which rule or condition applies first. Target: y = x + 2.
- Prompt: Find the vertical asymptotes of f(x) = (x + 1)/(x^2 - 9). Coach move: ask which rule or condition applies first. Target: x = 3 and x = -3.
- Prompt: For f(x) = (x^2 - 4)/(x^2 - 5x + 6), find the vertical asymptote and hole. Coach move: ask which rule or condition applies first. Target: Vertical asymptote x = 3; hole at x = 2.
- Prompt: Find the horizontal asymptote of f(x) = (2x^2 + 2x)/(x^2 - 1). Coach move: ask which rule or condition applies first. Target: y = 2.
- Prompt: Find the hole of f(x) = (x^2 - 1)/(x - 1). Coach move: ask which rule or condition applies first. Target: Hole at (1, 2).

## Independent Practice
- two vertical asymptotes and one horizontal asymptote: Find the vertical and horizontal asymptotes of f(x) = (3x^2 + 1)/(x^2 - 4). Expected answer: Vertical asymptotes x = 2 and x = -2; horizontal asymptote y = 3.
- slant asymptote with negative leading term: Find the slant asymptote of f(x) = (2x^2 - x + 4)/(x - 2). Expected answer: y = 2x + 3.
- asymptote from transformed reciprocal: Find the vertical and horizontal asymptotes of f(x) = 4/(x + 2) - 5. Expected answer: Vertical asymptote x = -2; horizontal asymptote y = -5.
- domain restriction that becomes a hole: For f(x) = (x^2 + 5x + 6)/(x + 2), find the removable restriction and the simplified graph. Expected answer: Removable restriction x = -2; simplified graph y = x + 3.
- classifying all asymptote types: Classify the end behavior and vertical asymptote of f(x) = (x^2 + 1)/(x - 4). Expected answer: Vertical asymptote x = 4; slant asymptote y = x + 4.
- build a rational function from asymptotes: Give one rational function with vertical asymptote x = 1 and horizontal asymptote y = 3. Expected answer: One answer is f(x) = 3 + 2/(x - 1).

## Mastery Check
- A player says f(x) = (x - 4)/(x^2 - 16) has vertical asymptotes x = 4 and x = -4. What is the correction? Mastery answer: x = 4 is a hole; x = -4 is the only vertical asymptote.
- A rational function has values 101, 201, and 1001 near x = 2 from the right, while values far left and far right approach 4. Name the likely asymptotes. Mastery answer: Vertical asymptote x = 2; horizontal asymptote y = 4.
- Find the slant asymptote of f(x) = (x^2 - 9)/(x - 1). Mastery answer: y = x + 1.
- For f(x) = (2x^2 - 8)/(x^2 - x - 6), identify holes, vertical asymptotes, and horizontal asymptote. Mastery answer: Hole at x = -2; vertical asymptote x = 3; horizontal asymptote y = 2.

## Adaptive Tutor Messages
- If the player chooses the wrong method, ask them to name the visible structure before solving.
- If arithmetic is the only error, preserve the strategy and have them recompute one line.
- If notation or restrictions are missing, ask what values, units, or intervals the answer is allowed to use.
- If the player is fluent, advance to a boss variant that mixes representations.

## Tutorial Metadata
- Tutorial ID: Tut-P035
- Phase: 035
- Estimated duration: 18-25 minutes
- Required prior mastery: prerequisite review plus at least 70 percent accuracy on guided practice

# Part IV - Socratic Dialogue Bible

## Opening Diagnostic
Tutor: "When you see this rational asymptotes problem, what structure tells you the first move?"
Player response is classified by method choice, accuracy, notation, and interpretation.

## Guided Discovery
Tutor asks the player to identify the known information, the target, the rule or representation, and any restrictions before computing.
The sequence moves from recognition to one decisive step, then to a final interpretation.

## Correct Branch
If the player chooses the right structure, the tutor asks for the computation and then a sentence explaining why the result is allowed.

## Partial Understanding Branch
If the player has the right idea but incomplete execution, the tutor keeps their setup and asks for the next legal move.

## Misconception Branch
- If the player shows this issue: Treating every excluded x-value as a vertical asymptote. The tutor asks for a counterexample from the worked examples.
- If the player shows this issue: Finding horizontal asymptotes from constant terms instead of leading terms. The tutor asks for a counterexample from the worked examples.
- If the player shows this issue: Forgetting to simplify before classifying holes and vertical asymptotes. The tutor asks for a counterexample from the worked examples.
- If the player shows this issue: Claiming a horizontal asymptote whenever the numerator has larger degree. The tutor asks for a counterexample from the worked examples.

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
Why is method selection more important than memorizing one procedure for every rational asymptotes task?

## Transfer Question
Where could rational asymptotes appear inside a mixed review or final boss challenge?

## Escalation Rules
- If the same misconception repeats twice, return to the relevant worked example.
- If the player cannot start, show the prerequisite review first.
- If the player solves three guided items correctly, move to independent practice.
- If the player solves two boss-compatible items correctly, unlock mixed review.

## Exit Condition
The Socratic sequence is complete when the player can choose the method, compute accurately, respect restrictions, and explain the result without prompting.

# Knowledge Graph

- Prerequisites: Rational expression simplification, rational restrictions and holes, factoring, and polynomial degree comparisons
- Concepts Unlocked: Rational asymptotes; representation choice; restriction checking; exact answer interpretation; mixed review readiness
- Related Concepts: equations, functions, graphs, tables, modeling, and boss challenge synthesis
- Common Misconceptions: hole_as_vertical_asymptote, denominator_only_rule, degree_rule_reversal, ignoring_cancellation
- Remedial Phases: Phase 034 review; earlier function, equation, and graph review as needed
- Follow-up Phases: Phase 036; Phase 058 - Mixed review; Phase 059 - Final boss challenges
- Transfer Topics: calculator-free reasoning, modeling, graph interpretation, symbolic manipulation, and adaptive tutoring

# Validation Notes

## Structure Validation
- Includes Question Bible, Hint Bible, Tutorial Bible, Socratic Dialogue Bible, Knowledge Graph, and Validation Notes.
- Contains exactly 20 template families.
- Every template includes example, answer, explanation, distractors, randomization rules, validity constraints, mappings, variants, and metadata.
- Every template has six progressive hints ending in a full solution.

## Math Validation
- T001: The denominator is zero when x - 3 = 0, so x = 3. No factor cancels, so the graph has a vertical asymptote at x = 3. Answer recorded as x = 3.
- T002: The factor x - 2 cancels, so x = 2 is a hole. The remaining denominator x + 5 is zero at x = -5, giving a vertical asymptote. Answer recorded as Hole at x = 2; vertical asymptote x = -5.
- T003: The numerator has degree 1 and the denominator has degree 2. Since the numerator degree is smaller, f(x) approaches 0 as x grows large. Answer recorded as y = 0.
- T004: The degrees are equal, so use the ratio of leading coefficients: 6/3 = 2. The horizontal asymptote is y = 2. Answer recorded as y = 2.
- T005: The numerator degree is 3 and the denominator degree is 2. Since the numerator degree is larger, the function has no horizontal asymptote. Answer recorded as No horizontal asymptote.
- T006: Divide x^2 + 3x + 1 by x + 1. The quotient is x + 2 with remainder -1, so the slant asymptote is y = x + 2. Answer recorded as y = x + 2.
- T007: Factor the denominator: x^2 - 9 = (x - 3)(x + 3). Neither factor cancels, so x = 3 and x = -3 are vertical asymptotes. Answer recorded as x = 3 and x = -3.
- T008: Factor to get (x - 2)(x + 2)/((x - 2)(x - 3)). The x - 2 factor cancels, so x = 2 is a hole and x = 3 is the vertical asymptote. Answer recorded as Vertical asymptote x = 3; hole at x = 2.
- T009: Factor first: 2x(x + 1)/((x - 1)(x + 1)) simplifies to 2x/(x - 1). The simplified degrees are equal, and 2/1 = 2. Answer recorded as y = 2.
- T010: Factor x^2 - 1 as (x - 1)(x + 1). After canceling x - 1, the graph follows y = x + 1 except at x = 1, where y would be 2. Answer recorded as Hole at (1, 2).
- T011: The denominator factors as (x - 2)(x + 2), so x = 2 and x = -2 are vertical asymptotes. Equal degrees give y = 3/1 = 3. Answer recorded as Vertical asymptotes x = 2 and x = -2; horizontal asymptote y = 3.
- T012: Polynomial division gives quotient 2x + 3 and remainder 10. The remainder becomes small far from the origin, so the slant asymptote is y = 2x + 3. Answer recorded as y = 2x + 3.
- T013: The denominator x + 2 is zero at x = -2. The reciprocal part approaches 0 for large x, leaving the horizontal asymptote y = -5. Answer recorded as Vertical asymptote x = -2; horizontal asymptote y = -5.
- T014: The numerator factors as (x + 2)(x + 3). Cancel x + 2 to get y = x + 3, but x = -2 remains excluded as a hole. Answer recorded as Removable restriction x = -2; simplified graph y = x + 3.
- T015: The denominator is zero at x = 4. Since the numerator degree is one more than the denominator degree, divide to get quotient x + 4 with remainder 17. Answer recorded as Vertical asymptote x = 4; slant asymptote y = x + 4.
- T016: The term 2/(x - 1) creates a vertical asymptote at x = 1 and approaches 0 for large x, so the horizontal asymptote is y = 3. Answer recorded as One answer is f(x) = 3 + 2/(x - 1).
- T017: Factor the denominator as (x - 4)(x + 4). The x - 4 factor cancels, so it creates a hole rather than a vertical asymptote. Answer recorded as x = 4 is a hole; x = -4 is the only vertical asymptote.
- T018: The values grow without bound near x = 2, which indicates a vertical asymptote there. The far-end values approach 4, giving horizontal asymptote y = 4. Answer recorded as Vertical asymptote x = 2; horizontal asymptote y = 4.
- T019: Divide x^2 - 9 by x - 1. The quotient is x + 1 with remainder -8, so the slant asymptote is y = x + 1. Answer recorded as y = x + 1.
- T020: Factor as 2(x - 2)(x + 2)/((x - 3)(x + 2)). The x + 2 factor cancels, so x = -2 is a hole; x = 3 remains a vertical asymptote. Equal degrees give y = 2. Answer recorded as Hole at x = -2; vertical asymptote x = 3; horizontal asymptote y = 2.

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
