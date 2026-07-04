/**
 * data.js — Embedded data for file:// protocol compatibility.
 * Contains copies of all JSON data so no fetch() calls are needed.
 * When deploying to a real server, you can remove this file and
 * switch back to pure fetch() by removing the Loader fallback.
 */

const DATA = {
  courses: [
    {
      id: "tech-sciences-1",
      title: { en: "Introduction to Technical Sciences", ar: "مقدمة في العلوم التقنية" },
      description: { en: "Explore the foundations of digital logic, circuit design, and computational thinking. Perfect for beginners in engineering and computer science.", ar: "استكشف أساسيات المنطق الرقمي وتصميم الدوائر والتفكير الحاسوبي. مثالي للمبتدئين في الهندسة وعلوم الحاسوب." },
      moduleFile: "tech-sciences-1.json",
      totalLessons: 2,
      totalPoints: 35,
      icon: "\uD83D\uDD2C"
    },
    {
      id: "tech-sciences-2",
      title: { en: "Advanced Digital Systems", ar: "الأنظمة الرقمية المتقدمة" },
      description: { en: "Dive deeper into sequential circuits, memory units, and microprocessor architecture. Build on foundational logic gate knowledge.", ar: "تعمق في الدوائر المتسلسلة ووحدات الذاكرة وهندسة المعالجات الدقيقة. ابنِ على معرفة أساسيات البوابات المنطقية." },
      moduleFile: "tech-sciences-2.json",
      totalLessons: 2,
      totalPoints: 40,
      icon: "\u2699\uFE0F"
    }
  ],

  modules: {
    "tech-sciences-1": {
      courseId: "tech-sciences-1",
      courseTitle: { en: "Introduction to Technical Sciences", ar: "مقدمة في العلوم التقنية" },
      items: [
        {
          id: "lesson-1",
          title: { en: "Foundations of Logic Gates", ar: "أساسيات البوابات المنطقية" },
          type: "text",
          content: {
            en: "# Foundations of Logic Gates\n\nLogic gates are the fundamental building blocks of digital circuits. They perform basic logical functions that are essential in modern computing.\n\n## AND Gate\n\nThe AND gate outputs **true (1)** only when **all** its inputs are true. If any input is false, the output is false.\n\n| Input A | Input B | Output |\n|---------|---------|--------|\n| 0       | 0       | 0      |\n| 0       | 1       | 0      |\n| 1       | 0       | 0      |\n| 1       | 1       | 1      |\n\n## OR Gate\n\nThe OR gate outputs **true (1)** if **at least one** input is true. It only outputs false when all inputs are false.\n\n## NOT Gate\n\nThe NOT gate is a simple inverter \u2014 it flips the input. If the input is 1, the output is 0, and vice versa.\n\n### Why This Matters\n\nThese three gates \u2014 AND, OR, and NOT \u2014 form the basis for all digital logic. With them, we can build adders, multiplexers, memory units, and even entire processors. Understanding them is the first step into the world of digital design.\n\n```\n// Simple logic gate simulation in pseudocode\nfunction andGate(a, b) {\n  return a && b;\n}\n\nfunction orGate(a, b) {\n  return a || b;\n}\n\nfunction notGate(a) {\n  return !a;\n}\n```\n\nIn the next lesson, we will explore how multiple gates combine to create complex circuits.",
            ar: "# أسس البوابات المنطقية\n\nالبوابات المنطقية هي اللبنات الأساسية للدوائر الرقمية. تؤدي وظائف منطقية أساسية ضرورية في الحوسبة الحديثة.\n\n## بوابة AND\n\nبوابة AND تخرج **صحيح (1)** فقط عندما تكون **جميع** مدخلاتها صحيحة. إذا كان أي مدخل خاطئ، يكون المخرج خاطئًا.\n\n## بوابة OR\n\nبوابة OR تخرج **صحيح (1)** إذا كان **مدخل واحد على الأقل** صحيحًا. تخرج خاطئًا فقط عندما تكون جميع المدخلات خاطئة.\n\n## بوابة NOT\n\nبوابة NOT هي عاكس بسيط \u2014 تقلب الإدخال. إذا كان الإدخال 1، يكون المخرج 0، والعكس صحيح.\n\n### لماذا هذا مهم\n\nتشكل هذه البوابات الثلاث \u2014 AND و OR و NOT \u2014 أساس جميع المنطق الرقمي. يمكننا من خلالها بناء الجامعات ومضاعفات الإرسال ووحدات الذاكرة وحتى المعالجات الكاملة."
          },
          points: 10
        },
        {
          id: "quiz-1",
          title: { en: "Logic Gates Checkpoint Quiz", ar: "اختبار البوابات المنطقية" },
          type: "quiz",
          points: 25,
          passThreshold: 0.8,
          questions: [
            {
              questionId: "q1",
              questionText: { en: "Which logic gate outputs a high signal (1) only when all inputs are low (0)?", ar: "أي بوابة منطقية تخرج إشارة عالية (1) فقط عندما تكون جميع المدخلات منخفضة (0)؟" },
              type: "single",
              options: { en: ["AND Gate", "NOR Gate", "OR Gate", "NAND Gate"], ar: ["بوابة AND", "بوابة NOR", "بوابة OR", "بوابة NAND"] },
              correctAnswerIndex: 1
            },
            {
              questionId: "q2",
              questionText: { en: "What does a NOT gate do?", ar: "ماذا تفعل بوابة NOT؟" },
              type: "single",
              options: { en: ["Multiplies inputs", "Inverts the input", "Adds two inputs", "Stores a bit"], ar: ["تضاعف المدخلات", "تعكس الإدخال", "تجمع مدخلين", "تخزن بتًا"] },
              correctAnswerIndex: 1
            },
            {
              questionId: "q3",
              questionText: { en: "Select all statements that are TRUE about an AND gate:", ar: "اختر جميع العبارات الصحيحة حول بوابة AND:" },
              type: "multiple",
              options: { en: ["Output is 1 only when ALL inputs are 1", "Output is 1 when at least one input is 1", "It can have two or more inputs", "It is the same as an OR gate"], ar: ["المخرج يكون 1 فقط عندما تكون جميع المدخلات 1", "المخرج يكون 1 عندما يكون إدخال واحد على الأقل 1", "يمكن أن يكون لها مدخلان أو أكثر", "هي نفس بوابة OR"] },
              correctAnswerIndices: [0, 2]
            }
          ]
        }
      ]
    },
    "tech-sciences-2": {
      courseId: "tech-sciences-2",
      courseTitle: { en: "Advanced Digital Systems", ar: "الأنظمة الرقمية المتقدمة" },
      items: [
        {
          id: "lesson-1",
          title: { en: "Sequential Circuits Overview", ar: "نظرة عامة على الدوائر المتسلسلة" },
          type: "text",
          content: {
            en: "# Sequential Circuits Overview\n\nSequential circuits differ from combinational circuits in one crucial way: they have **memory**. Unlike logic gates that produce output solely based on current inputs, sequential circuits depend on both current inputs and past states.\n\n## Flip-Flops\n\nA flip-flop is a basic memory element that can store one bit of data.\n\n### SR Flip-Flop\n\nThe SR (Set-Reset) flip-flop has two inputs:\n- **S (Set)**: Sets the output to 1\n- **R (Reset)**: Resets the output to 0\n\n```\n// SR Flip-Flop truth behavior\nif (S == 1 && R == 0) Q = 1;\nif (S == 0 && R == 1) Q = 0;\nif (S == 0 && R == 0) Q = Q (no change);\nif (S == 1 && R == 1) Q = undefined (invalid);\n```\n\n*More content coming soon.*",
            ar: "# نظرة عامة على الدوائر المتسلسلة\n\nتختلف الدوائر المتسلسلة عن الدوائر التوافقية بطريقة جوهرية: لديها **ذاكرة**. على عكس البوابات المنطقية التي تنتج مخرجًا بناءً على المدخلات الحالية فقط، تعتمد الدوائر المتسلسلة على كل من المدخلات الحالية والحالات السابقة."
          },
          points: 15
        },
        {
          id: "quiz-1",
          title: { en: "Sequential Circuits Quiz", ar: "اختبار الدوائر المتسلسلة" },
          type: "quiz",
          points: 25,
          passThreshold: 0.8,
          questions: [
            {
              questionId: "q1",
              questionText: { en: "What distinguishes a sequential circuit from a combinational circuit?", ar: "ما الذي يميز الدائرة المتسلسلة عن الدائرة التوافقية؟" },
              type: "single",
              options: { en: ["Speed", "Memory", "Power consumption", "Number of gates"], ar: ["السرعة", "الذاكرة", "استهلاك الطاقة", "عدد البوابات"] },
              correctAnswerIndex: 1
            }
          ]
        }
      ]
    }
  }
};
