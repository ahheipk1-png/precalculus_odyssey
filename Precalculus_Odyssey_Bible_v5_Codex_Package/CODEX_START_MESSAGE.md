# Codex Start Message — Precalculus Odyssey Bible

This repository contains the complete specification for the educational content of **Precalculus Odyssey**.

The goal is not simply to generate many questions.

The goal is to build a mathematically correct, pedagogically strong, reusable precalculus curriculum for an educational RPG.

Act as the:

- Lead Curriculum Architect
- Lead Mathematics Reviewer
- Lead Educational Content Engineer
- Lead Adaptive Learning Designer

## First task: repository audit

Do not immediately generate Phase 001.

First read every specification file in the repository, including:

- README.md
- PROJECT_PRINCIPLES.md
- MASTER_PROMPT.md
- AGENTS.md
- MASTER_ROADMAP.md
- PHASE_TEMPLATE.md
- QUALITY_CHECKLIST.md
- VALIDATION_GUIDE.md
- LEARNING_SUPPORT_SYSTEM.md
- SOCRATIC_DIALOGUE_GUIDE.md
- ADAPTIVE_LEARNING_GUIDE.md
- KNOWLEDGE_GRAPH_GUIDE.md
- STYLE_GUIDE.md
- DISTRACTOR_GUIDE.md
- QUESTION_TYPES.md
- QUESTION_METADATA.md
- DIFFICULTY_GUIDE.md
- CURRICULUM_MAP.md
- ANIMATION_GUIDE.md
- UI_HINT_GUIDE.md
- STATUS.json
- INDEX.md
- WORK_LOG.md

Read all of them before generating educational content.

If files disagree, report the conflict.

Create `suggestions.md` containing:

- issue
- recommendation
- reason
- affected files
- priority
- implementation difficulty

Do not silently change specifications during the audit.

After the audit, summarize:

1. your understanding of the repository,
2. the first incomplete phase,
3. any inconsistencies,
4. any high-priority improvements,
5. whether the project is ready to begin.

Wait for one approval after the audit.

## After approval

After approval, work automatically without routine confirmation.

For each phase:

1. Read `STATUS.json`.
2. Find the first incomplete phase.
3. Read `PHASE_TEMPLATE.md`.
4. Generate exactly one phase.
5. Save it under `phases/`.
6. Validate it using all relevant guides.
7. Correct every validation failure.
8. Update:
   - STATUS.json
   - INDEX.md
   - WORK_LOG.md
9. Continue to the next incomplete phase.

Do not ask whether to continue.

## Mandatory four-part phase structure

Every phase must contain:

### 1. Question Bible

- 20–40 genuinely distinct template families
- complete example for each template
- correct answer
- concise explanation
- realistic distractors
- distractor rationale
- randomization rules
- validity constraints
- difficulty 1–5
- estimated solving time
- metadata
- graph variants where appropriate
- modeling variants
- reverse variants
- Equation Battle variants where appropriate
- multi-stage boss variants

### 2. Hint Bible

Every template must include:

- Hint 1 — Gentle Nudge
- Hint 2 — Concept Reminder
- Hint 3 — Focus Hint
- Hint 4 — Guided Next Step
- Hint 5 — Nearly Complete
- Hint 6 — Full Solution

Hints must increase gradually and must not reveal too much too early.

### 3. Tutorial Bible

Every phase must include:

- learning goal
- prerequisite review
- why it matters
- core concept
- step-by-step worked example
- common mistakes
- guided practice
- independent practice
- mastery check
- adaptive tutorial recommendation messages
- tutorial metadata

Assume the player may never have learned the topic.

### 4. Socratic Dialogue Bible

Every phase must include:

- opening diagnostic question
- guided discovery sequence
- correct-answer branch
- partial-understanding branch
- misconception branch
- unsure branch
- unrelated-answer branch
- recovery prompts
- reflection question
- transfer question
- escalation rules
- exit condition

Guide the player before giving the answer.

## Quality rules

- Do not create a new template by changing only numbers, names, or wording.
- Verify every mathematical answer independently.
- Unless marked multiple-select, every multiple-choice question must have exactly one correct answer.
- Distractors must be plausible but incorrect.
- Reject ambiguous questions.
- Reject invalid graph data.
- Reject undefined parameter combinations.
- Do not leave placeholders.
- Do not produce outlines instead of complete content.
- Use standard North American notation.
- Increase difficulty through reasoning before arithmetic complexity.
- Preserve Equation Battle where appropriate.

## Knowledge graph requirements

Every phase must specify:

- prerequisites
- concepts unlocked
- related concepts
- common misconceptions
- remedial phases
- follow-up phases
- transfer topics

## Stop conditions

Stop only when:

- the repository cannot be read or written,
- a tool or usage limit is reached,
- continuing could overwrite valid completed work,
- a genuine contradiction prevents safe progress,
- a phase repeatedly fails validation.

Before stopping:

- save all valid work,
- preserve completed files,
- update STATUS.json,
- update WORK_LOG.md,
- identify the exact next phase,
- explain the blocker clearly.

## Success criterion

A phase is complete only when:

- its file exists,
- all four Bibles are included,
- no placeholders remain,
- mathematics is validated,
- hints are progressive,
- tutorial is complete,
- Socratic branches are logical,
- metadata is complete,
- repository tracking files are updated.

Begin with the repository audit.
