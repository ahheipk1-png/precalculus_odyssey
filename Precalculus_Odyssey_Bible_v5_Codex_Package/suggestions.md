# Repository Audit Suggestions

Audit date: 2026-07-14

## 1. Hint level 4 has inconsistent naming

- Issue: Hint 4 is named "Guided Next Step" in `MASTER_PROMPT.md` and `CODEX_START_MESSAGE.md`, but "Guided Step" in `PHASE_TEMPLATE.md` and `LEARNING_SUPPORT_SYSTEM.md`.
- Recommendation: Standardize the label everywhere, preferably as "Guided Next Step" because it is more explicit about the learner-facing purpose.
- Reason: Consistent labels make validation, cross-references, and future tooling easier.
- Affected files: `MASTER_PROMPT.md`, `CODEX_START_MESSAGE.md`, `PHASE_TEMPLATE.md`, `LEARNING_SUPPORT_SYSTEM.md`
- Priority: Medium
- Implementation difficulty: Easy

## 2. Socratic unrelated-answer branch is not consistently required

- Issue: `MASTER_PROMPT.md`, `CODEX_START_MESSAGE.md`, and `PHASE_TEMPLATE.md` require an unrelated-answer or unrelated-response branch, but `SOCRATIC_DIALOGUE_GUIDE.md` does not list it in the required structure.
- Recommendation: Add "Unrelated response branch" to `SOCRATIC_DIALOGUE_GUIDE.md` and use one shared label across all files.
- Reason: The Socratic guide should fully match the required phase structure so validators do not miss a required branch.
- Affected files: `MASTER_PROMPT.md`, `CODEX_START_MESSAGE.md`, `PHASE_TEMPLATE.md`, `SOCRATIC_DIALOGUE_GUIDE.md`
- Priority: High
- Implementation difficulty: Easy

## 3. Knowledge Graph template omits common misconceptions

- Issue: `MASTER_PROMPT.md`, `CODEX_START_MESSAGE.md`, and `KNOWLEDGE_GRAPH_GUIDE.md` require common misconceptions inside the knowledge graph, but the Knowledge Graph section of `PHASE_TEMPLATE.md` does not include that field.
- Recommendation: Add "Common Misconceptions" to the Knowledge Graph section of `PHASE_TEMPLATE.md`.
- Reason: Common misconception tags are central to adaptive review and should be present in the formal phase output structure.
- Affected files: `PHASE_TEMPLATE.md`, `KNOWLEDGE_GRAPH_GUIDE.md`, `MASTER_PROMPT.md`, `CODEX_START_MESSAGE.md`
- Priority: High
- Implementation difficulty: Easy

## 4. Template family count has a max in one source but not another

- Issue: `MASTER_PROMPT.md` and `CODEX_START_MESSAGE.md` require 20-40 distinct template families, while `PHASE_TEMPLATE.md` says "at least 20" with no upper bound.
- Recommendation: Update `PHASE_TEMPLATE.md` to say "20-40 genuinely distinct template families."
- Reason: The maximum matters for scope control and keeps each micro-phase usable.
- Affected files: `MASTER_PROMPT.md`, `CODEX_START_MESSAGE.md`, `PHASE_TEMPLATE.md`
- Priority: High
- Implementation difficulty: Easy

## 5. Phase output filename convention is unspecified

- Issue: The workflow says to save phases under `phases/`, but no file naming convention is defined.
- Recommendation: Add a convention such as `phases/phase_001_one_step_linear_equations.md`.
- Reason: A stable naming convention improves resumability, indexing, and future automated validation.
- Affected files: `MASTER_PROMPT.md`, `CODEX_START_MESSAGE.md`, `PHASE_TEMPLATE.md`, `INDEX.md`, `STATUS.json`
- Priority: Medium
- Implementation difficulty: Easy

## 6. Validation evidence format is under-specified

- Issue: The guides require independent math verification, graph/domain checks, hint progression checks, and Socratic checks, but `PHASE_TEMPLATE.md` only has a broad "Validation Notes" heading.
- Recommendation: Expand "Validation Notes" into a checklist with math validation, distractor validation, hint validation, tutorial validation, Socratic validation, metadata validation, and known issues.
- Reason: A consistent validation block makes completed phases auditable and reduces the chance of accepting incomplete content.
- Affected files: `PHASE_TEMPLATE.md`, `QUALITY_CHECKLIST.md`, `VALIDATION_GUIDE.md`
- Priority: High
- Implementation difficulty: Moderate

## 7. Metadata vocabulary needs tighter controlled values

- Issue: `QUESTION_METADATA.md` defines metadata fields, but fields such as `cognitive_skill`, `question_type`, and `misconception_tags` do not have a controlled vocabulary beyond separate guide prose.
- Recommendation: Add accepted values for `cognitive_skill` and reference `QUESTION_TYPES.md` and `DISTRACTOR_GUIDE.md` as the source vocabularies for question types and misconception tags.
- Reason: Controlled values make adaptive sequencing, search, validation, and downstream game integration more reliable.
- Affected files: `QUESTION_METADATA.md`, `QUESTION_TYPES.md`, `DISTRACTOR_GUIDE.md`, `ADAPTIVE_LEARNING_GUIDE.md`
- Priority: Medium
- Implementation difficulty: Moderate

## 8. Status update rules are not fully specified

- Issue: `STATUS.json` has `next_phase`, `completed_count`, and per-phase statuses, but the allowed status values and exact update rules are not documented.
- Recommendation: Document allowed statuses such as `not_started`, `in_progress`, `completed`, and `blocked`, plus the rule for updating `next_phase` and `completed_count`.
- Reason: Clear status rules protect resumability and prevent tracker drift as many phases are generated.
- Affected files: `STATUS.json`, `MASTER_PROMPT.md`, `CODEX_START_MESSAGE.md`, `WORK_LOG.md`
- Priority: Medium
- Implementation difficulty: Easy

## 9. `phases/` directory is absent

- Issue: The workflow requires saving phase files under `phases/`, but the directory does not currently exist.
- Recommendation: Create `phases/` when Phase 001 generation begins, or include an empty tracked placeholder if version control is used.
- Reason: This is not a blocker, but creating the directory explicitly prevents ambiguity at the first generation step.
- Affected files: repository structure, `MASTER_PROMPT.md`, `CODEX_START_MESSAGE.md`
- Priority: Low
- Implementation difficulty: Easy

## 10. Start-message content is duplicated

- Issue: `MASTER_PROMPT.md` and `CODEX_START_MESSAGE.md` currently contain the same operational instructions.
- Recommendation: Treat one file as canonical and make the other a short pointer, or add a note that they must remain synchronized.
- Reason: Duplicated source-of-truth files can drift over time and create conflicting instructions.
- Affected files: `MASTER_PROMPT.md`, `CODEX_START_MESSAGE.md`, `README.md`
- Priority: Low
- Implementation difficulty: Easy
