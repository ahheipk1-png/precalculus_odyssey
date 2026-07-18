  // ============================================================================
  // CONFIG · The Second Chance (Arena 888) — a hand-authored 10-question multiple-choice
  // bank spanning derivatives, tangent-line slope, integration, integration by parts, and
  // differential equations (user request 2026-07-18). Pure data — loaded before 04-logic.js,
  // which reads this array directly from generateProblem()'s special==='comeback' branch and
  // builds each question through the shared _mc(prompt, correct, distractors) helper (shuffles
  // choices, computes correctIndex). See js/52-comeback-arena.js for the completion/reward flow.
  // ============================================================================
  var COMEBACK_REWARD_LEVELS = 10;
  var COMEBACK_QUESTIONS = [
    { topic: 'Derivatives', prompt: 'What is the derivative of f(x) = x³?',
      correct: '3x²', distractors: ['x²', '3x', 'x⁴'] },
    { topic: 'Derivatives', prompt: 'What is the derivative of f(x) = 5x² + 3x?',
      correct: '10x + 3', distractors: ['5x + 3', '10x', '10x² + 3'] },
    { topic: 'Tangent Slope', prompt: 'What is the slope of the tangent line to f(x) = x² at x = 3?',
      correct: '6', distractors: ['9', '3', '2'] },
    { topic: 'Tangent Slope', prompt: 'What is the slope of the tangent line to f(x) = x² + 1 at x = 2?',
      correct: '4', distractors: ['5', '2', '8'] },
    { topic: 'Integration', prompt: 'What is ∫ x² dx?',
      correct: 'x³/3 + C', distractors: ['x³ + C', '2x + C', 'x³/3'] },
    { topic: 'Integration', prompt: 'What is ∫ 3x² dx?',
      correct: 'x³ + C', distractors: ['3x³ + C', 'x³/3 + C', '6x + C'] },
    { topic: 'Integration by Parts', prompt: 'Using integration by parts, what is ∫ x·eˣ dx?',
      correct: 'x·eˣ − eˣ + C', distractors: ['x·eˣ + C', 'eˣ + C', 'x²·eˣ/2 + C'] },
    { topic: 'Integration by Parts', prompt: 'Using integration by parts, what is ∫ x·cos(x) dx?',
      correct: 'x·sin(x) + cos(x) + C', distractors: ['x·sin(x) + C', 'sin(x) + cos(x) + C', '−x·sin(x) + C'] },
    { topic: 'Differential Equations', prompt: 'Which function y(x) satisfies the differential equation dy/dx = y?',
      correct: 'y = eˣ', distractors: ['y = x²', 'y = ln(x)', 'y = sin(x)'] },
    { topic: 'Differential Equations', prompt: 'What is the general solution to dy/dx = 3?',
      correct: 'y = 3x + C', distractors: ['y = 3x² + C', 'y = x³ + C', 'y = 3 + Cx'] }
  ];
