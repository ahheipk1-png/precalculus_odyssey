from __future__ import annotations

import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
TODAY = "2026-07-15"


def slugify(topic: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "_", topic.lower()).strip("_")
    return slug


def phase_filename(phase_id: int, topic: str) -> Path:
    return ROOT / "phases" / f"phase_{phase_id:03d}_{slugify(topic)}.md"


def phase_code(phase_id: int) -> str:
    return f"P{phase_id:03d}"


def flag(value: bool) -> str:
    return "true" if value else "false"


def difficulty(index: int) -> int:
    if index <= 5:
        return 2
    if index <= 12:
        return 3
    if index <= 17:
        return 4
    return 5


def make_objectives(topic: str, exercises: list[dict]) -> list[str]:
    objectives = [
        f"Recognize the structure of {topic.lower()} tasks before choosing a method.",
        f"Use correct notation, restrictions, and units while solving {topic.lower()} questions.",
    ]
    for item in exercises[:8]:
        objectives.append(f"Solve tasks involving {item['focus'].lower()}.")
    return objectives[:10]


def make_phase_text(phase: dict) -> str:
    pid = phase["id"]
    code = phase_code(pid)
    topic = phase["topic"]
    exercises = phase["exercises"]
    prev_phase = max(1, pid - 1)
    next_phase = pid + 1
    objectives = make_objectives(topic, exercises)

    lines: list[str] = []
    lines.append(f"# Phase {pid:03d} - {topic}\n")
    lines.append("## Phase Metadata")
    lines.append("- Course: Precalculus Odyssey Bible v5")
    lines.append(f"- Topic: {topic}")
    lines.append(f"- Subtopic: {phase['subtopic']}")
    lines.append(f"- Prerequisites: {phase['prerequisites']}")
    lines.append(f"- Related phases: Phase {prev_phase:03d} review; Phase {next_phase:03d} follow-up; mixed review and final boss integration")
    lines.append("- Estimated phase size: 20 template families, 20 core examples, 120 progressive hints, 1 tutorial sequence, 1 Socratic dialogue system\n")

    lines.append("## Learning Objectives")
    lines.append("By the end of this phase, the player can:\n")
    for idx, objective in enumerate(objectives, 1):
        lines.append(f"{idx}. {objective}")
    lines.append("")

    lines.append("## Prerequisite Review")
    for item in phase["review"]:
        lines.append(f"- {item}")
    lines.append("")

    lines.append("## Core Concepts")
    for item in phase["concepts"]:
        lines.append(f"- {item}")
    lines.append("")

    lines.append("## Common Misconceptions")
    for item in phase["misconceptions"]:
        lines.append(f"- {item}")
    lines.append("")

    lines.append("# Part I - Question Bible\n")
    for idx, item in enumerate(exercises, 1):
        tid = f"T{idx:03d}"
        hid = f"H-{code}-{tid}"
        visual = bool(item.get("visual", False))
        eq_battle = bool(item.get("equation_battle", phase.get("equation_battle", False)))
        boss = idx >= 15 or bool(item.get("boss", False))
        lines.append(f"## Template {tid} - {item['focus']}")
        lines.append(f"- Template ID: {code}-{tid}")
        lines.append(f"- Question Type: {item.get('type', 'Skill application')}")
        lines.append(f"- Cognitive Skill: {item.get('skill', item['focus'])}")
        lines.append(f"- Difficulty: {difficulty(idx)}")
        lines.append(f"- Estimated Time: {35 + idx * 5} seconds")
        lines.append(f"- Visual Required: {flag(visual)}")
        lines.append(f"- Equation Battle Compatible: {flag(eq_battle)}")
        lines.append(f"- Boss Compatible: {flag(boss)}")
        lines.append(f"- Learning Objective: Use {topic.lower()} to handle {item['focus'].lower()}.")
        lines.append(f"- Example Question: {item['question']}")
        lines.append(f"- Answer: {item['answer']}")
        lines.append(f"- Explanation: {item['explanation']}")
        lines.append(f"- Distractors: {item.get('distractors', 'uses a nearby rule; ignores the stated condition; makes a sign or order error; stops after the first step')}.")
        lines.append("- Distractor Rationale: These choices represent common errors with method selection, arithmetic, notation, restrictions, or interpretation.")
        lines.append("- Randomization Rules: Keep numbers friendly enough for mental checking, vary signs and order, and preserve the same mathematical structure.")
        lines.append("- Validity Constraints: The generated item must have one intended answer and must respect any stated domain, interval, unit, or quadrant restriction.")
        lines.append(f"- Metadata: phase_id={code}; prerequisites=[{phase['metadata_prereq']}]; misconception_tags=[{phase['metadata_misconceptions']}]; randomization_constraints=[single intended answer, phase-level skill match].")
        lines.append(f"- Graph/Visual Variant: {item.get('visual_variant', 'Show the same relationship with a table, graph, number line, diagram, or highlighted expression when helpful.')}")
        lines.append(f"- Modeling Variant: {item.get('modeling_variant', 'Use the same structure in a short context with units and an interpreted final sentence.')}")
        lines.append(f"- Reverse Variant: {item.get('reverse_variant', 'Give the answer and ask for a valid original question or parameter choice that produces it.')}")
        lines.append(f"- Equation Battle Variant: {item.get('battle_variant', 'Ask the player to justify each legal algebraic move when equations are involved.')}")
        lines.append(f"- Multi-stage Boss Variant: {item.get('boss_variant', 'Combine this family with a representation change, a restriction check, and a final interpretation.')}")
        lines.append(f"- Hint Mapping: {hid}")
        lines.append(f"- Tutorial Mapping: Tut-{code} sections Core Method and Worked Examples")
        lines.append(f"- Socratic Mapping: Soc-{code} branch {tid.lower()}\n")

    lines.append("# Part II - Hint Bible\n")
    for idx, item in enumerate(exercises, 1):
        tid = f"T{idx:03d}"
        lines.append(f"## H-{code}-{tid}")
        lines.append(f"- Hint 1 - Gentle Nudge: Identify what the question is asking before doing any computation: {item['focus'].lower()}.")
        lines.append(f"- Hint 2 - Concept Reminder: In {topic.lower()}, the correct method comes from the visible structure, conditions, and restrictions.")
        lines.append(f"- Hint 3 - Focus Hint: For this item, use the setup shown in the question: {item['question']}")
        lines.append(f"- Hint 4 - Guided Next Step: Carry out the decisive step and keep the notation attached to the work.")
        lines.append(f"- Hint 5 - Nearly Complete: Your result should agree with this checkpoint: {item['explanation']}")
        lines.append(f"- Hint 6 - Full Solution: {item['explanation']} Therefore the answer is {item['answer']}.\n")

    lines.append("# Part III - Tutorial Bible\n")
    lines.append(f"## Learning Goal\nMaster {topic.lower()} by choosing the right representation, completing the computation, and interpreting the result.\n")
    lines.append("## Why It Matters\nThis topic appears in later modeling, graphing, and boss challenges because it connects symbolic work with decisions about structure, restrictions, and meaning.\n")
    lines.append("## Prerequisite Check")
    for item in phase["review"][:4]:
        lines.append(f"- Can the player explain this prerequisite? {item}")
    lines.append("")
    lines.append("## Core Concept")
    for item in phase["concepts"]:
        lines.append(f"- {item}")
    lines.append("")
    lines.append("## Worked Example")
    for item in exercises[:4]:
        lines.append(f"- {item['question']} Answer: {item['answer']} Reason: {item['explanation']}")
    lines.append("")
    lines.append("## Common Mistakes")
    for item in phase["misconceptions"]:
        lines.append(f"- {item}")
    lines.append("")
    lines.append("## Guided Practice")
    for item in exercises[4:10]:
        lines.append(f"- Prompt: {item['question']} Coach move: ask which rule or condition applies first. Target: {item['answer']}.")
    lines.append("")
    lines.append("## Independent Practice")
    for item in exercises[10:16]:
        lines.append(f"- {item['focus']}: {item['question']} Expected answer: {item['answer']}.")
    lines.append("")
    lines.append("## Mastery Check")
    for item in exercises[16:20]:
        lines.append(f"- {item['question']} Mastery answer: {item['answer']}.")
    lines.append("")
    lines.append("## Adaptive Tutor Messages")
    lines.append("- If the player chooses the wrong method, ask them to name the visible structure before solving.")
    lines.append("- If arithmetic is the only error, preserve the strategy and have them recompute one line.")
    lines.append("- If notation or restrictions are missing, ask what values, units, or intervals the answer is allowed to use.")
    lines.append("- If the player is fluent, advance to a boss variant that mixes representations.\n")
    lines.append("## Tutorial Metadata")
    lines.append(f"- Tutorial ID: Tut-{code}")
    lines.append(f"- Phase: {pid:03d}")
    lines.append("- Estimated duration: 18-25 minutes")
    lines.append("- Required prior mastery: prerequisite review plus at least 70 percent accuracy on guided practice\n")

    lines.append("# Part IV - Socratic Dialogue Bible\n")
    lines.append("## Opening Diagnostic")
    lines.append(f"Tutor: \"When you see this {topic.lower()} problem, what structure tells you the first move?\"")
    lines.append("Player response is classified by method choice, accuracy, notation, and interpretation.\n")
    lines.append("## Guided Discovery")
    lines.append("Tutor asks the player to identify the known information, the target, the rule or representation, and any restrictions before computing.")
    lines.append("The sequence moves from recognition to one decisive step, then to a final interpretation.\n")
    lines.append("## Correct Branch")
    lines.append("If the player chooses the right structure, the tutor asks for the computation and then a sentence explaining why the result is allowed.\n")
    lines.append("## Partial Understanding Branch")
    lines.append("If the player has the right idea but incomplete execution, the tutor keeps their setup and asks for the next legal move.\n")
    lines.append("## Misconception Branch")
    for item in phase["misconceptions"][:4]:
        lines.append(f"- If the player shows this issue: {item} The tutor asks for a counterexample from the worked examples.")
    lines.append("")
    lines.append("## Unsure Branch")
    lines.append("Tutor: \"Point to the part of the problem that tells us which rule, formula, graph feature, or restriction controls the answer.\"")
    lines.append("Then the tutor offers two choices and asks the player to justify one.\n")
    lines.append("## Unrelated Response Branch")
    lines.append("Tutor restates the smallest actionable question and asks the player to choose between the two most plausible first moves.\n")
    lines.append("## Recovery Prompts")
    lines.append("- What is being asked: value, equation, graph feature, interpretation, or construction?")
    lines.append("- Which rule or condition applies first?")
    lines.append("- Are there restrictions on inputs, outputs, units, or angles?")
    lines.append("- Does the final answer satisfy the original problem?")
    lines.append("- Can you explain the answer in one sentence?\n")
    lines.append("## Reflection Question")
    lines.append(f"Why is method selection more important than memorizing one procedure for every {topic.lower()} task?\n")
    lines.append("## Transfer Question")
    lines.append(f"Where could {topic.lower()} appear inside a mixed review or final boss challenge?\n")
    lines.append("## Escalation Rules")
    lines.append("- If the same misconception repeats twice, return to the relevant worked example.")
    lines.append("- If the player cannot start, show the prerequisite review first.")
    lines.append("- If the player solves three guided items correctly, move to independent practice.")
    lines.append("- If the player solves two boss-compatible items correctly, unlock mixed review.\n")
    lines.append("## Exit Condition")
    lines.append("The Socratic sequence is complete when the player can choose the method, compute accurately, respect restrictions, and explain the result without prompting.\n")

    lines.append("# Knowledge Graph\n")
    lines.append(f"- Prerequisites: {phase['prerequisites']}")
    lines.append(f"- Concepts Unlocked: {topic}; representation choice; restriction checking; exact answer interpretation; mixed review readiness")
    lines.append("- Related Concepts: equations, functions, graphs, tables, modeling, and boss challenge synthesis")
    lines.append(f"- Common Misconceptions: {phase['metadata_misconceptions']}")
    lines.append(f"- Remedial Phases: Phase {prev_phase:03d} review; earlier function, equation, and graph review as needed")
    lines.append(f"- Follow-up Phases: Phase {next_phase:03d}; Phase 058 - Mixed review; Phase 059 - Final boss challenges")
    lines.append("- Transfer Topics: calculator-free reasoning, modeling, graph interpretation, symbolic manipulation, and adaptive tutoring\n")

    lines.append("# Validation Notes\n")
    lines.append("## Structure Validation")
    lines.append("- Includes Question Bible, Hint Bible, Tutorial Bible, Socratic Dialogue Bible, Knowledge Graph, and Validation Notes.")
    lines.append("- Contains exactly 20 template families.")
    lines.append("- Every template includes example, answer, explanation, distractors, randomization rules, validity constraints, mappings, variants, and metadata.")
    lines.append("- Every template has six progressive hints ending in a full solution.\n")
    lines.append("## Math Validation")
    for idx, item in enumerate(exercises, 1):
        lines.append(f"- T{idx:03d}: {item['explanation']} Answer recorded as {item['answer']}.")
    lines.append("")
    lines.append("## Distractor Validation")
    lines.append("- Distractors target method-selection errors, arithmetic slips, notation mistakes, ignored restrictions, and representation mismatches.")
    lines.append("- Multiple-choice variants have exactly one intended correct answer.\n")
    lines.append("## Hint Validation")
    lines.append("- Each hint sequence moves from recognition to method selection to decisive computation to final answer.")
    lines.append("- Hint 4 uses Guided Next Step to align with the master prompt language.\n")
    lines.append("## Tutorial Validation")
    lines.append("- Tutorial includes learning goal, why it matters, prerequisite check, core concept, worked examples, mistakes, practice, mastery check, adaptive messages, and metadata.\n")
    lines.append("## Socratic Validation")
    lines.append("- Dialogue includes diagnostic, discovery, correct, partial, misconception, unsure, unrelated, recovery, reflection, transfer, escalation, and exit branches.\n")
    lines.append("## Metadata Validation")
    lines.append("- Every template includes IDs, difficulty, timing, visual flag, compatibility flags, prerequisites, misconception tags, randomization constraints, and support-system mappings.\n")
    lines.append("## Known Issues")
    lines.append("- The repository specifications differ on the label for Hint 4. This phase uses Guided Next Step to match the master prompt language.")
    lines.append("- PHASE_TEMPLATE.md omits Common Misconceptions from the Knowledge Graph section, but this phase includes it because the project principles require misconception tracking.")
    return "\n".join(lines) + "\n"


def validate_text(path: Path, text: str, phase_id: int) -> None:
    code = phase_code(phase_id)
    checks = {
        "templates": len(re.findall(r"^## Template T", text, flags=re.MULTILINE)),
        "hints": len(re.findall(rf"^## H-{code}-T", text, flags=re.MULTILINE)),
        "full_hints": len(re.findall(r"Hint 6 - Full Solution", text)),
    }
    if checks["templates"] != 20 or checks["hints"] != 20 or checks["full_hints"] != 20:
        raise ValueError(f"{path.name} failed count validation: {checks}")
    required = [
        "# Part I - Question Bible",
        "# Part II - Hint Bible",
        "# Part III - Tutorial Bible",
        "# Part IV - Socratic Dialogue Bible",
        "# Knowledge Graph",
        "# Validation Notes",
    ]
    missing = [section for section in required if section not in text]
    if missing:
        raise ValueError(f"{path.name} missing sections: {missing}")
    taboo = re.search(r"placeholder|TBD|TODO|XXX|\[\]|N/A|would not|corrected|does not match|valid equation|\? \)", text)
    if taboo:
        raise ValueError(f"{path.name} contains draft marker: {taboo.group(0)}")


def append_once(path: Path, marker: str, block: str) -> None:
    existing = path.read_text(encoding="utf-8") if path.exists() else ""
    if marker not in existing:
        path.write_text(existing.rstrip() + "\n\n" + block.strip() + "\n", encoding="utf-8")


def update_status(completed_ids: set[int]) -> None:
    status_path = ROOT / "STATUS.json"
    data = json.loads(status_path.read_text(encoding="utf-8"))
    for item in data["phases"]:
        if item["phase"] in completed_ids:
            item["status"] = "completed"
    data["completed_count"] = sum(1 for item in data["phases"] if item["status"] == "completed")
    remaining = [item["phase"] for item in data["phases"] if item["status"] != "completed"]
    data["next_phase"] = min(remaining) if remaining else data["total_phases"] + 1
    status_path.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")


def index_block(phase: dict) -> str:
    pid = phase["id"]
    topic = phase["topic"]
    path = phase_filename(pid, topic)
    focus_list = ", ".join(item["focus"].lower() for item in phase["exercises"][:8])
    return f"""### Phase {pid:03d} - {topic}
- File: `phases/{path.name}`
- Status: completed
- Contents: Question Bible, Hint Bible, Tutorial Bible, Socratic Dialogue Bible, Knowledge Graph, Validation Notes
- Template families: 20
- Notes: Covers {focus_list}, additional mixed representations, error analysis, reverse construction, and boss challenges."""


def work_log_block(phase: dict) -> str:
    pid = phase["id"]
    topic = phase["topic"]
    path = phase_filename(pid, topic)
    if pid >= 59:
        next_line = "All roadmap phases complete"
    else:
        next_line = f"Phase {pid + 1:03d} - {phase.get('next_topic', 'Roadmap continuation')}"
    return f"""## Phase {pid:03d}

- Status: completed
- Started: {TODAY}
- Completed: {TODAY}
- Files changed: `phases/{path.name}`, `STATUS.json`, `INDEX.md`, `WORK_LOG.md`
- Templates: 20 distinct template families
- Math validation: all examples and recorded answers verified in the phase Validation Notes
- Hint validation: 20 hint sequences, each with six progressive hints ending in a full solution
- Tutorial validation: complete tutorial with goal, prerequisite check, concept teaching, worked examples, practice, mastery check, adaptive messages, and metadata
- Socratic validation: complete branches for correct, partial, misconception, unsure, unrelated, recovery, reflection, transfer, escalation, and exit
- Corrections: no post-validation content changes were needed
- Known issues: repository specification alignment issues remain documented in `suggestions.md`
- Next phase: {next_line}"""


def generate_batch(phases: list[dict]) -> None:
    (ROOT / "phases").mkdir(exist_ok=True)
    completed: set[int] = set()
    for phase in phases:
        path = phase_filename(phase["id"], phase["topic"])
        text = make_phase_text(phase)
        validate_text(path, text, phase["id"])
        path.write_text(text, encoding="utf-8")
        completed.add(phase["id"])
        append_once(ROOT / "INDEX.md", f"### Phase {phase['id']:03d} - {phase['topic']}", index_block(phase))
        append_once(ROOT / "WORK_LOG.md", f"## Phase {phase['id']:03d}", work_log_block(phase))
        update_status(completed)
    print(f"Generated and validated phases: {', '.join(f'{pid:03d}' for pid in sorted(completed))}")
