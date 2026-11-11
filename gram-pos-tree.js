/* =====================================================================
   Gram-Positive Family Tree Tour: DATA FILE (BIO 112, Ch. 11 Day 2)

   Same shape as gram-neg-tree.js (see the notes at the top of that file).
   The page code lives in ch11-gram-pos-tour.html.

   Sources: Chapter 11 Day 2 slides (Firmicutes) and the Ch. 11 study guide.
   Actinobacteria (Day 3) are locked until those slides are added.

   Writing rules: no em dashes in any on-screen text. Use the minus sign (−)
   for negative test results.
   ===================================================================== */
window.TOUR_DATA = {
  id: "gram-pos",
  gram: "+",
  brand: "BIO 112 · Ch. 11",
  eyebrow: "Chapter 11, Day 2 · Gram-positive bacteria",
  title: "Gram-Positive <span>Family Tree</span> Tour",
  plainTitle: "Gram-Positive Family Tree Tour",
  listName: "gram-positive",
  goals: [
    "Place each Firmicute on the family tree and explain how the groups are related.",
    "Explain <b>why</b> an organism has its ID traits (it inherits them from the branches above it).",
    "Use lab results (catalase, coagulase, spores, oxygen) to identify an organism.",
    "Name the disease each organism causes, how it spreads, and how it's treated."
  ],
  tabs: [
    {label: "Firmicutes (Day 2)", current: true},
    {label: "Actinobacteria (Day 3)", soon: "Coming soon: Actinobacteria"}
  ],
  games: [
    {title: "Microbe Collector", href: "microbe-collector.html"},
    {title: "Mystery Microbe", href: "mystery-microbe.html"},
    {title: "Disease Typing Game", href: "disease-type.html"}
  ],
  wordBank: ["Bacilli", "Clostridia", "Bacillales", "Lactobacillales"],

  ranks: [
    {id: "domain", label: "Domain / Kingdom", color: "#475569"},
    {id: "gram", label: "Gram stain", lab: true, color: "#86198f"},
    {id: "phylum", label: "Phylum", color: "#1d4ed8"},
    {id: "class", label: "Class", color: "#0e7490"},
    {id: "order", label: "Order", color: "#7c3aed"},
    {id: "shape", label: "Shape", lab: true, minimal: true, color: "#94a3b8"},
    {id: "genus", label: "Genus", color: "#15803d"},
    {id: "species", label: "Species", color: "#b45309"}
  ],
  overview: {skipRanks: ["shape"]},

  tree: [
    {id: "bacteria", rank: "domain", label: "Bacteria",
      traits: [
        {t: "prokaryote", blank: {pre: "", post: "", a: "prokaryote", o: ["prokaryote", "eukaryote"], why: "All bacteria are prokaryotes: no nucleus."}},
        {t: "no nucleus"}
      ]},
    {id: "gramneg", rank: "gram", label: "Gram-negative", parent: "bacteria", muted: "Gram-negatives are in the gram-negative tour."},
    {id: "grampos", rank: "gram", label: "Gram-positive", parent: "bacteria",
      traits: [
        {t: "purple Gram stain", blank: {pre: "", post: " Gram stain", a: "purple", o: ["purple", "pink"], why: "The thick peptidoglycan layer holds on to the crystal violet, so gram-positives stay purple."}},
        {t: "thick peptidoglycan"},
        {t: "no outer membrane"}
      ]},
    {id: "firmicutes", rank: "phylum", label: "Firmicutes", full: "Firmicutes (Bacillota)", parent: "grampos",
      traits: [
        {t: "low G+C (<50%)", blank: {pre: "", post: " G+C (<50%)", a: "low", o: ["low", "high"], why: "Firmicutes have low G+C content: less than 50% of their DNA bases are G or C."}},
        {t: "cocci and rods"},
        {t: "some form endospores"}
      ]},
    {id: "bacilli", rank: "class", label: "Bacilli", parent: "firmicutes", blankLabel: true,
      traits: [{t: "aerobes or facultative anaerobes", blank: {pre: "", post: "", a: "aerobes or facultative anaerobes", o: ["aerobes or facultative anaerobes", "obligate anaerobes"], why: "Class Bacilli: aerobes or facultative anaerobes. Class Clostridia: obligate anaerobes."}}]},
    {id: "bacillales", rank: "order", label: "Bacillales", parent: "bacilli", blankLabel: true,
      traits: [
        {t: "catalase +", blank: {pre: "catalase ", post: "", a: "+", o: ["+", "−"], why: "Key test: catalase + = Bacillales, catalase − = Lactobacillales."}},
        {t: "spores: sometimes"},
        {t: "environmental survivors"}
      ]},
    {id: "bl_rods", rank: "shape", label: "Rods", parent: "bacillales"},
    {id: "bacillus", rank: "genus", label: "Bacillus", parent: "bl_rods", italic: true,
      traits: [{t: "spore-forming", blank: {pre: "", post: "", a: "spore-forming", o: ["spore-forming", "never forms spores"], why: "<i>Bacillus</i> forms endospores."}}, {t: "urease −"}]},
    {id: "b_subtilis", rank: "species", label: "B. subtilis", parent: "bacillus", italic: true},
    {id: "b_anthracis", rank: "species", label: "B. anthracis", parent: "bacillus", italic: true},
    {id: "b_cereus", rank: "species", label: "B. cereus", parent: "bacillus", italic: true},
    {id: "listeria", rank: "genus", label: "Listeria", parent: "bl_rods", italic: true,
      traits: [{t: "NOT spore-forming"}, {t: "grows at fridge temps", blank: {pre: "grows at ", post: " temps", a: "fridge", o: ["fridge", "only body"], why: "<i>Listeria</i> is cold-tolerant: it grows at refrigerator temperatures."}}, {t: "tumbling motility"}]},
    {id: "l_mono", rank: "species", label: "L. monocytogenes", parent: "listeria", overviewOnly: true, italic: true, card: "lmono"},
    {id: "bl_cocci", rank: "shape", label: "Cocci", parent: "bacillales"},
    {id: "staph", rank: "genus", label: "Staphylococcus", parent: "bl_cocci", italic: true,
      traits: [
        {t: "grape-like clusters", blank: {pre: "", post: "", a: "grape-like clusters", o: ["grape-like clusters", "chains"], why: "Staphylo = grapes: staph grow in clusters."}},
        {t: "salt-tolerant"}, {t: "non-motile"}, {t: "no spores"}, {t: "skin and nose flora"}
      ]},
    {id: "s_aureus", rank: "species", label: "S. aureus", parent: "staph", italic: true,
      traits: [{t: "coagulase +", blank: {pre: "coagulase ", post: "", a: "+", o: ["+", "−"], why: "Coagulase + is what sets <i>S. aureus</i> apart from the other staphs."}}, {t: "golden colonies"}]},
    {id: "s_epi", rank: "species", label: "S. epidermidis", parent: "staph", italic: true, traits: [{t: "coagulase −"}, {t: "white colonies"}]},
    {id: "s_sapro", rank: "species", label: "S. saprophyticus", parent: "staph", italic: true, traits: [{t: "coagulase −"}, {t: "white colonies"}]},

    {id: "lactobacillales", rank: "order", label: "Lactobacillales", parent: "bacilli", blankLabel: true,
      traits: [
        {t: "catalase −", blank: {pre: "catalase ", post: "", a: "−", o: ["−", "+"], why: "Key test: catalase + = Bacillales, catalase − = Lactobacillales."}},
        {t: "never form spores"},
        {t: "lactic acid fermentation"},
        {t: "facultative anaerobes"},
        {t: "normal flora"}
      ]},
    {id: "lb_rods", rank: "shape", label: "Rods", parent: "lactobacillales"},
    {id: "lactobacillus", rank: "genus", label: "Lactobacillus", parent: "lb_rods", italic: true, traits: [{t: "the \"good bacteria\""}]},
    {id: "lb_cocci", rank: "shape", label: "Cocci", parent: "lactobacillales"},
    {id: "strep", rank: "genus", label: "Streptococcus", parent: "lb_cocci", italic: true,
      traits: [{t: "chains", blank: {pre: "", post: "", a: "chains", o: ["chains", "grape-like clusters"], why: "Strepto = twisted chain: strep grow in chains."}}, {t: "sorted by hemolysis"}]},
    {id: "s_pyogenes", rank: "species", label: "S. pyogenes", parent: "strep", italic: true, traits: [{t: "group A strep"}]},
    {id: "s_agalactiae", rank: "species", label: "S. agalactiae", parent: "strep", italic: true, traits: [{t: "group B strep"}]},
    {id: "s_pneumoniae", rank: "species", label: "S. pneumoniae", parent: "strep", italic: true, traits: [{t: "lancet-shaped diplococci"}, {t: "capsule"}]},
    {id: "enterococcus", rank: "genus", label: "Enterococcus", parent: "lb_cocci", italic: true,
      traits: [{t: "pairs or short chains"}, {t: "salt- and bile-tolerant", blank: {pre: "", post: "-tolerant", a: "salt- and bile", o: ["salt- and bile", "cold"], why: "<i>Enterococcus</i> is extremely hardy: salt-tolerant, bile-tolerant, heat-resistant."}}, {t: "gut flora"}]},
    {id: "e_species", rank: "species", label: "E. faecalis, E. faecium", parent: "enterococcus", overviewOnly: true, italic: true, card: "enterococcus"},

    {id: "clostridia", rank: "class", label: "Clostridia", parent: "firmicutes", blankLabel: true,
      traits: [
        {t: "obligate anaerobes", blank: {pre: "", post: "", a: "obligate anaerobes", o: ["obligate anaerobes", "aerobes or facultative anaerobes"], why: "Clostridia lack catalase and superoxide dismutase, so O₂ is toxic to them."}},
        {t: "spore-forming rods"},
        {t: "no catalase or SOD: O₂ is toxic"}
      ]},
    {id: "cl_rods", rank: "shape", label: "Rods", parent: "clostridia"},
    {id: "clostridium", rank: "genus", label: "Clostridium", parent: "cl_rods", italic: true},
    {id: "c_perfringens", rank: "species", label: "C. perfringens", parent: "clostridium", italic: true, traits: [{t: "non-motile"}, {t: "big gas producer"}]},
    {id: "c_botulinum", rank: "species", label: "C. botulinum", parent: "clostridium", italic: true},
    {id: "c_tetani", rank: "species", label: "C. tetani", parent: "clostridium", italic: true},
    {id: "clostridioides", rank: "genus", label: "Clostridioides", parent: "cl_rods", italic: true, traits: [{t: "renamed from Clostridium"}]},
    {id: "c_diff", rank: "species", label: "C. difficile", parent: "clostridioides", overviewOnly: true, italic: true, card: "cdiff"},

    {id: "actino", rank: "phylum", label: "Actinobacteria", parent: "grampos", locked: "Coming soon: Actinobacteria (high G+C) are Day 3."},

    {id: "nowall", rank: "gram", label: "No cell wall", parent: "bacteria", traits: [{t: "no cell wall"}, {t: "not gram-positive"}]},
    {id: "mycoplasma", rank: "genus", label: "Mycoplasma", parent: "nowall", italic: true, traits: [{t: "related to Firmicutes"}]}
  ],

  stops: [
    /* ---------- The big picture ---------- */
    {id: "big-tree", node: "bacteria", title: "The Big Tree", full: true,
      lesson: [
        "Quick recap: the <b>gram-negatives</b> were Proteobacteria (alpha, beta, gamma, epsilon), Spirochetes, and a few others (Chlamydiae, Planctomycetes, Fusobacteria, Cyanobacteria, Bacteroidetes).",
        "Today: the <b>gram-positives</b>. They split into two phyla by <b>G+C content</b>: <b>Firmicutes</b> (low G+C) and <b>Actinobacteria</b> (high G+C).",
        "This tour covers the Firmicutes. Actinobacteria are next time."
      ]},
    {id: "gram-positive", node: "grampos", title: "Gram-positive bacteria",
      lesson: [
        "Gram-positive cells have a <b>thick peptidoglycan layer</b> and <b>no outer membrane</b>. The thick wall holds the crystal violet, so they stay <b>purple</b>.",
        "<b>G+C content</b> = the percentage of guanine (G) and cytosine (C) in a bacterium's DNA. It ranges from about 25% to 75%.",
        "Gram-positives split into 2 phyla by G+C:<ul><li><b>Firmicutes:</b> low G+C (&lt;50%)</li><li><b>Actinobacteria:</b> high G+C (&gt;50%)</li></ul>"
      ],
      checkin: {
        q: "Why do gram-positive cells stay purple after a Gram stain?",
        o: ["Their thick peptidoglycan layer holds on to the crystal violet", "Their outer membrane traps the safranin", "They have no cell wall", "They are high G+C"],
        w: "Thick peptidoglycan holds the crystal violet, so gram-positives stay purple."
      }},
    {id: "firmicutes", node: "firmicutes", title: "Firmicutes (Bacillota)",
      lesson: [
        "Firmicutes (also called <b>Bacillota</b>) have <b>low G+C</b> (&lt;50%).",
        "They include <b>cocci and rods</b>, and some form <b>endospores</b>.",
        "Two classes:<ul><li><b>Bacilli:</b> aerobes or facultative anaerobes; rods and cocci</li><li><b>Clostridia:</b> obligate anaerobes; spore-forming rods</li></ul>",
        "Key genera: <i>Bacillus, Listeria, Staphylococcus, Streptococcus, Enterococcus, Lactobacillus, Clostridium</i>."
      ],
      checkin: {
        q: "What sets the Firmicutes apart from the Actinobacteria?",
        o: ["Firmicutes have low G+C (&lt;50%)", "Firmicutes have high G+C (&gt;50%)", "Firmicutes are gram-negative", "Firmicutes have no cell wall"],
        w: "Both are gram-positive. Firmicutes: low G+C. Actinobacteria: high G+C."
      }},
    {id: "mycoplasma", node: "mycoplasma", title: "<i>Mycoplasma</i>: the odd cousin",
      cheat: "The only one with <b>no cell wall</b>.",
      lesson: [
        "<i>Mycoplasma</i> has <b>no cell wall</b>, so it is <b>not gram-positive</b>.",
        "Genetically, though, it is closely related to the Firmicutes. That's why we cover it here.",
        "No wall also means antibiotics that attack the cell wall (like penicillin) don't work on it."
      ],
      checkin: {
        q: "Why isn't <i>Mycoplasma</i> gram-positive, even though it's related to the Firmicutes?",
        o: ["It has no cell wall", "It has an outer membrane", "It has high G+C", "It forms endospores"],
        w: "No cell wall means no peptidoglycan to hold the crystal violet."
      }},

    /* ---------- Class Bacilli ---------- */
    {id: "bacilli", node: "bacilli", title: "Class Bacilli",
      lesson: [
        "Class Bacilli are <b>aerobes or facultative anaerobes</b>. They include rods and cocci.",
        "Two orders:<ul><li><b>Bacillales:</b> <i>Bacillus</i> (spore formers), <i>Listeria</i>, <i>Staphylococcus</i></li><li><b>Lactobacillales:</b> <i>Lactobacillus</i>, <i>Streptococcus</i>, <i>Enterococcus</i></li></ul>",
        "Bacilli vs. Clostridia: check the <b>oxygen</b>. Clostridia are obligate anaerobes."
      ],
      checkin: {
        q: "How can you tell class Bacilli apart from class Clostridia?",
        o: ["Bacilli grow with O₂ (aerobes or facultative); Clostridia are obligate anaerobes", "Bacilli are gram-negative", "Only Clostridia are rods", "Only Bacilli form spores"],
        w: "Oxygen: Bacilli are aerobes or facultative anaerobes. Clostridia are obligate anaerobes."
      }},
    {id: "bacillales", node: "bacillales", title: "Order Bacillales",
      lesson: [
        "Bacillales are <b>aerobic or facultatively anaerobic</b> environmental survivors.",
        "They are <b>catalase +</b>. Spores: <b>sometimes</b> (only <i>Bacillus</i> on our list).",
        "Our genera: <i>Bacillus</i> and <i>Listeria</i> (rods), <i>Staphylococcus</i> (cocci)."
      ],
      checkin: {
        q: "Which test sorts Bacillales from Lactobacillales?",
        o: ["Catalase: Bacillales +, Lactobacillales −", "Gram stain", "Oxidase", "Lactose fermentation"],
        w: "Key test: catalase + = Bacillales, catalase − = Lactobacillales."
      }},
    {id: "bacillus", node: "bacillus", title: "<i>Bacillus</i>",
      cheat: "The <b>catalase + spore-forming rods</b> (they grow with O₂, unlike Clostridia).",
      life: [{ic: "🍚", t: "<i>B. cereus</i> is a common cause of food poisoning from rice left sitting out (stale rice)."}],
      lesson: [
        "<i>Bacillus</i> is <b>aerobic or facultatively anaerobic</b>, <b>catalase +</b>, <b>urease −</b>, and <b>spore-forming</b>!",
        "Our two gram-positive spore-forming genera: <i>Bacillus</i> and <i>Clostridium</i>."
      ],
      orgs: [
        {id: "banthracis", node: "b_anthracis", name: "Bacillus anthracis", shape: "rodspore", emoji: "☣️",
          tests: [
            {k: "gram", v: "+", from: "grampos"},
            {k: "shape", v: "spore-forming rods", from: "bacillus"},
            {k: "oxygen", v: "aerobe or facultative anaerobe", from: "bacilli"},
            {k: "catalase", v: "+", from: "bacillales"},
            {k: "spores", v: "+", from: "bacillus"},
            {k: "urease", v: "−", from: "bacillus"}
          ],
          disease: {short: "anthrax", html: "anthrax"}},
        {id: "bcereus", node: "b_cereus", name: "Bacillus cereus", shape: "rodspore", emoji: "🍚",
          tests: [
            {k: "gram", v: "+", from: "grampos"},
            {k: "shape", v: "spore-forming rods", from: "bacillus"},
            {k: "oxygen", v: "aerobe or facultative anaerobe", from: "bacilli"},
            {k: "catalase", v: "+", from: "bacillales"},
            {k: "spores", v: "+", from: "bacillus"},
            {k: "urease", v: "−", from: "bacillus"}
          ],
          disease: {short: "food poisoning (stale rice)", html: "food poisoning, often from stale rice", tags: ["food poisoning"]}},
        {id: "bsubtilis", node: "b_subtilis", name: "Bacillus subtilis", shape: "rodspore", emoji: "🏭",
          tests: [
            {k: "gram", v: "+", from: "grampos"},
            {k: "shape", v: "spore-forming rods", from: "bacillus"},
            {k: "oxygen", v: "aerobe or facultative anaerobe", from: "bacilli"},
            {k: "catalase", v: "+", from: "bacillales"},
            {k: "spores", v: "+", from: "bacillus"},
            {k: "urease", v: "−", from: "bacillus"}
          ],
          facts: [{ic: "🏭", h: "Uses", t: "probiotics and industry. Not a disease-causer."}]}
      ],
      checkin: {
        q: "Which two gram-positive genera on our list form endospores?",
        o: ["<i>Bacillus</i> and <i>Clostridium</i>", "<i>Bacillus</i> and <i>Listeria</i>", "<i>Staphylococcus</i> and <i>Streptococcus</i>", "<i>Lactobacillus</i> and <i>Clostridium</i>"],
        w: "<i>Bacillus</i> (catalase +, grows with O₂) and <i>Clostridium</i> (obligate anaerobe)."
      }},
    {id: "listeria", node: "listeria", title: "<i>Listeria monocytogenes</i>",
      life: [{ic: "🧊", t: "The fridge doesn't stop <i>Listeria</i>: it keeps growing at refrigerator temperatures."}],
      orgs: [
        {id: "lmono", node: "listeria", name: "Listeria monocytogenes", shape: "rod", emoji: "🧀",
          cheat: "The rod that <b>grows in the fridge</b>, with <b>tumbling motility</b>.",
          tests: [
            {k: "gram", v: "+", from: "grampos"},
            {k: "shape", v: "rods", from: "bl_rods"},
            {k: "oxygen", v: "aerobe or facultative anaerobe", from: "bacilli"},
            {k: "catalase", v: "+", from: "bacillales"},
            {k: "spores", v: "−"},
            {k: "feature", v: "grows at fridge temps", ic: "🧊"},
            {k: "feature", v: "tumbling motility (room temp)", ic: "🤸", label: "Motility"}
          ],
          disease: {short: "listeriosis", html: "listeriosis: can feel like the stomach flu, but can also cause <b>meningitis, miscarriage, and stillbirth</b>"},
          facts: [
            {ic: "🧀", h: "Sources", t: "unpasteurized dairy, soft cheeses, deli meats"},
            {ic: "🤰", h: "Most at risk", t: "pregnant people, newborns, elderly, immunocompromised", warn: true}
          ]}
      ],
      case: {story: "A pregnant patient has fever and muscle aches. Last week she ate soft cheese made from unpasteurized milk. Blood cultures grow gram + rods.", tests: [{name: "Endospore stain", ic: "🥚", r: "<b>no spores</b>"}, {name: "Catalase", ic: "🫧", r: "<b>+</b> (bubbles)"}, {name: "Growth at 4 °C", ic: "🧊", r: "<b>grows</b> in the fridge"}], q: "Which organism is it?", o: ["<i>Listeria monocytogenes</i>", "<i>Bacillus cereus</i>", "<i>Clostridium perfringens</i>", "<i>Lactobacillus</i>"], w: "A catalase +, non-spore-forming rod that grows in the cold: <i>Listeria</i>. Pregnant people are at high risk."},
      checkin: {
        q: "Why is <i>Listeria</i> a danger in deli meats that have been kept in the fridge?",
        o: ["It is cold-tolerant and keeps growing at fridge temperatures", "It forms spores that survive freezing", "It only grows in the fridge", "It makes a toxin that is activated by cold"],
        w: "<i>Listeria</i> grows at refrigerator temperatures."
      }},

    /* ---------- Staphylococcus ---------- */
    {id: "staphylococcus", node: "staph", title: "<i>Staphylococcus</i>",
      lesson: [
        "Staphylococci are gram-positive <b>cocci in grape-like clusters</b>.",
        "<b>Catalase +</b> (vs. <i>Streptococcus</i>), non-motile, <b>salt-tolerant</b>, facultative anaerobes, <b>no spores</b>.",
        "Normally found on the <b>skin</b> and in the <b>nose</b>.",
        "<b>Catalase vs. coagulase:</b><ul><li><b>Catalase</b> breaks down H₂O₂ (bubbles). All staphylococci +, all streptococci −.</li><li><b>Coagulase</b> converts fibrinogen → fibrin (a clot). Only <i>S. aureus</i> is +.</li></ul>",
        "Quick ID: <b>catalase + AND coagulase + AND golden = <i>S. aureus</i></b>."
      ],
      checkin: {
        q: "You add H₂O₂ to some gram + cocci and see bubbles. Which genus?",
        o: ["<i>Staphylococcus</i>", "<i>Streptococcus</i>", "<i>Enterococcus</i>", "<i>Lactobacillus</i>"],
        w: "Bubbles = catalase +. All staphylococci are catalase +, all streptococci are catalase −."
      }},
    {id: "s-aureus", node: "s_aureus", title: "<i>Staphylococcus aureus</i>",
      life: [{ic: "👃", t: "About 1 in 4 people carry <i>S. aureus</i> on their skin or in their nose without being sick."}],
      orgs: [
        {id: "saureus", node: "s_aureus", name: "Staphylococcus aureus", shape: "clusters", emoji: "🟡",
          cheat: "The only <b>coagulase +</b> staph, with <b>golden</b> colonies.",
          tests: [
            {k: "gram", v: "+", from: "grampos"},
            {k: "shape", v: "cocci in clusters", from: "staph"},
            {k: "oxygen", v: "facultative anaerobe", from: "staph"},
            {k: "catalase", v: "+", from: "bacillales"},
            {k: "spores", v: "−", from: "staph"},
            {k: "coagulase", v: "+"},
            {k: "pigment", v: "golden yellow"}
          ],
          disease: {short: "skin infections, toxic shock, scalded skin, food poisoning", html: "skin and soft tissue infections, toxic shock syndrome, scalded skin syndrome, food poisoning, osteomyelitis", tags: ["food poisoning", "skin"],
            flips: [
              {f: "TSST-1", b: "Toxic shock syndrome toxin: overactivates the immune system → fever, rash, low blood pressure"},
              {f: "Panton-Valentine leukocidin", b: "Kills immune cells!"},
              {f: "Hemolysin", b: "Destroys red blood cells (steals iron from hemoglobin)"},
              {f: "Exfoliatin", b: "Causes staphylococcal scalded skin syndrome (SSSS): painful red skin with blisters"},
              {f: "Enterotoxin", b: "Causes food poisoning; survives high heat"}
            ]},
          facts: [
            {ic: "👃", h: "Found in", t: "nostrils, armpits, groin (skin flora). About 1 in 4 people are colonized."},
            {ic: "🩹", h: "When it causes infection", t: "higher numbers plus a break in the skin (microfissures, trauma)"},
            {ic: "🧼", h: "Prevention", t: "hand hygiene (most important!), wound care, clean surfaces, isolation in healthcare"}
          ],
          treat: {short: "MSSA: nafcillin, oxacillin, cephalexin. MRSA: vancomycin, daptomycin, clindamycin", html: "<b>MSSA:</b> nafcillin, oxacillin, or cephalexin. <b>MRSA:</b> vancomycin, daptomycin, or clindamycin. Localized infections may need incision and drainage.", drugs: ["nafcillin", "oxacillin", "cephalexin", "vancomycin", "daptomycin", "clindamycin"]},
          extra: [
            {h: "🩹 Skin and soft tissue infections", flips: [
              {f: "Folliculitis", b: "Hair follicle infection (topical antibiotics)"},
              {f: "Furuncle (boil)", b: "Deep hair follicle infection (incision and drainage, oral antibiotics)"},
              {f: "Carbuncle", b: "Several connected boils"},
              {f: "Impetigo", b: "Superficial infection with honey-crusted lesions (mupirocin or oral antibiotics)"},
              {f: "Paronychia", b: "Infection around the fingernail"},
              {f: "Cellulitis", b: "Infection of the deeper skin layers (dermis and subcutaneous tissue): red, swollen, warm skin"},
              {f: "Osteomyelitis", b: "Bone infection (systemic): 4 to 6 weeks of IV antibiotics, possible surgery"}
            ]}
          ]}
      ],
      case: {story: "A wrestler has a red, swollen, painful boil on his arm. A swab grows gram + cocci in clusters with golden colonies.", tests: [{name: "Catalase", ic: "🫧", r: "<b>+</b> (bubbles)"}, {name: "Coagulase", ic: "🩸", r: "<b>+</b> (clot)"}, {name: "Colony color", ic: "🟡", r: "<b>golden</b>"}], q: "Which organism is it?", o: ["<i>Staphylococcus aureus</i>", "<i>Staphylococcus epidermidis</i>", "<i>Streptococcus pyogenes</i>", "<i>Enterococcus</i>"], w: "Catalase + AND coagulase + AND golden = <i>S. aureus</i>."},
      checkin: {
        q: "Which test sets <i>S. aureus</i> apart from the other staphylococci?",
        o: ["Coagulase: <i>S. aureus</i> is +", "Catalase: <i>S. aureus</i> is +", "Gram stain: <i>S. aureus</i> is purple", "Oxygen: <i>S. aureus</i> is a facultative anaerobe"],
        w: "All staphs are catalase +. Only <i>S. aureus</i> is coagulase +."
      }},
    {id: "mrsa", node: "s_aureus", title: "MRSA: it just keeps evolving",
      lesson: [
        "<b>MRSA</b> = methicillin-resistant <i>S. aureus</i>: strains resistant to methicillin and related antibiotics.",
        "The <b><i>mecA</i> gene</b> changes the antibiotic's target, so these drugs can't bind. (Methicillin itself isn't used anymore.)",
        "<b>How it spreads:</b> direct contact (person to person, contaminated hands) and indirect contact (contaminated surfaces, medical equipment).",
        "<b>Where:</b> hospitals, nursing homes, the community, IV drug use. <b>Risk factors:</b> open wounds, invasive medical devices, crowded conditions."
      ],
      sections: [
        {h: "🧬 Treatment: it JUST KEEPS EVOLVING!", flow: {title: "How staph beat our antibiotics", steps: [
          "penicillin worked at first",
          "staph evolved <b>beta-lactamase</b>, an enzyme that destroys penicillin",
          "methicillin was made to resist beta-lactamase",
          "staph evolved resistance to that too: <b>MRSA</b>"
        ]}},
        {h: "🏥 Two major categories", boxes: [
          {ic: "🏥", t: "<b>HA-MRSA</b> (healthcare-associated): hospitals and nursing homes, where antibiotic use is high"},
          {ic: "🏘️", t: "<b>CA-MRSA</b> (community-associated): from rampant antibiotic use on factory farms and overprescription"}
        ]},
        {h: "💊 Treating MRSA", boxes: [
          {ic: "🚫", t: "can't be treated with beta-lactam antibiotics"},
          {ic: "💉", t: "glycopeptides like <b>vancomycin</b>: not as effective, with problem side effects"},
          {ic: "⚠️", t: "<b>VISA</b>: intermediate resistance to vancomycin"},
          {ic: "⛔", t: "<b>VRSA</b>: complete resistance to vancomycin"}
        ]}
      ],
      checkin: {
        q: "How does the <i>mecA</i> gene make MRSA resistant?",
        o: ["It changes the antibiotic's target, so the drug can't bind", "It makes beta-lactamase", "It builds a thicker outer membrane", "It forms endospores"],
        w: "<i>mecA</i> changes the target. (Beta-lactamase was the older trick that beat penicillin.)"
      }},
    {id: "coag-neg", node: "s_epi", also: ["s_sapro"], title: "Coagulase-negative staphs",
      orgs: [
        {id: "sepi", node: "s_epi", name: "Staphylococcus epidermidis", shape: "clusters", emoji: "🩺",
          cheat: "The coagulase − staph that forms <b>biofilms on medical devices</b>.",
          tests: [
            {k: "gram", v: "+", from: "grampos"},
            {k: "shape", v: "cocci in clusters", from: "staph"},
            {k: "catalase", v: "+", from: "bacillales"},
            {k: "coagulase", v: "−"},
            {k: "pigment", v: "white"},
            {k: "feature", v: "forms biofilms on devices", ic: "🩺"}
          ],
          disease: {short: "medical device infections", html: "prosthetic device infections, hospital bloodstream infections, endocarditis on artificial valves"},
          facts: [{ic: "🧍", h: "Found in", t: "normal skin flora (the most abundant)"}]},
        {id: "ssapro", node: "s_sapro", name: "Staphylococcus saprophyticus", shape: "clusters", emoji: "🚽",
          cheat: "The coagulase − staph that causes <b>UTIs</b>.",
          fun: {t: "The name explains it: <b>staphylo</b> = grapes, <b>coccus</b> = round, <b>saprophyticus</b> = organisms that grow on decaying organic material."},
          tests: [
            {k: "gram", v: "+", from: "grampos"},
            {k: "shape", v: "cocci in clusters", from: "staph"},
            {k: "catalase", v: "+", from: "bacillales"},
            {k: "coagulase", v: "−"},
            {k: "pigment", v: "white"}
          ],
          disease: {short: "UTIs", html: "urinary tract infections (UTIs), especially in young, sexually active women. The 2nd most common cause of UTIs.", tags: ["uti"]},
          facts: [{ic: "🧍", h: "Found in", t: "normal urogenital flora"}]}
      ],
      checkin: {
        q: "Which staph is the 2nd most common cause of UTIs?",
        o: ["<i>S. saprophyticus</i>", "<i>S. epidermidis</i>", "<i>S. aureus</i>", "MRSA"],
        w: "<i>S. saprophyticus</i>: normal urogenital flora, coagulase −."
      }},

    /* ---------- Lactobacillales ---------- */
    {id: "lactobacillales", node: "lactobacillales", title: "Order Lactobacillales",
      life: [
        {ic: "🥛", t: "Yogurt, kefir, cheese, and buttermilk"},
        {ic: "🍞", t: "Sourdough bread"},
        {ic: "🥬", t: "Sauerkraut, kimchi, and pickles"},
        {ic: "💊", t: "Probiotic supplements"}
      ],
      lesson: [
        "Lactobacillales are <b>facultatively anaerobic</b> and do <b>lactic acid fermentation</b>.",
        "<b>Catalase −</b> and they <b>ALWAYS</b> lack spores.",
        "They are <b>normal flora</b>. Most only cause problems when they overgrow.",
        "These are the fermenters behind many foods (see \"In your life\")."
      ],
      checkin: {
        q: "What do Lactobacillales make when they ferment sugar?",
        o: ["Lactic acid", "Ethanol and CO₂ only", "Hydrogen sulfide", "Methane"],
        w: "Lactic acid fermentation: sugars → lactic acid → an acidic environment."
      }},
    {id: "lactobacillus", node: "lactobacillus", title: "<i>Lactobacillus</i>: the friendly bacteria",
      orgs: [
        {id: "lactobacillus", node: "lactobacillus", name: "Lactobacillus", shape: "rod", emoji: "🥛",
          cheat: "The <b>catalase − rod</b>: the \"good bacteria\".",
          tests: [
            {k: "gram", v: "+", from: "grampos"},
            {k: "shape", v: "rods", from: "lb_rods"},
            {k: "catalase", v: "−", from: "lactobacillales"},
            {k: "spores", v: "−", from: "lactobacillales"},
            {k: "feature", v: "makes lactic acid", ic: "🍋"}
          ],
          facts: [
            {ic: "🧍", h: "Normal flora", t: "mouth, GI tract, vagina (keeps vaginal pH low and blocks pathogens)"},
            {ic: "🥛", h: "Found in", t: "yogurt, fermented foods, probiotic supplements"},
            {ic: "😇", h: "Disease", t: "rarely causes disease: the \"good bacteria\""}
          ]}
      ]},
    {id: "streptococcus", node: "strep", title: "<i>Streptococcus</i>",
      diagram: "hemolysis",
      lesson: [
        "Streptococci are gram-positive <b>cocci in chains</b>.",
        "<b>Catalase −</b> (vs. <i>Staphylococcus</i>), facultative anaerobes, no spores.",
        "Streptococci are classified by their <b>hemolysis</b> pattern on blood agar (picture below)."
      ],
      orgs: [
        {id: "spyogenes", node: "s_pyogenes", name: "Streptococcus pyogenes", sub: "(group A strep)", shape: "chains", emoji: "🗣️",
          tests: [
            {k: "gram", v: "+", from: "grampos"},
            {k: "shape", v: "cocci in chains", from: "strep"},
            {k: "catalase", v: "−", from: "lactobacillales"},
            {k: "feature", v: "group A strep", ic: "🅰️", label: "Group"}
          ],
          disease: {short: "strep throat, scarlet fever, necrotizing fasciitis", html: "strep throat, scarlet fever, necrotizing fasciitis"}},
        {id: "sagalactiae", node: "s_agalactiae", name: "Streptococcus agalactiae", sub: "(group B strep)", shape: "chains", emoji: "👶",
          tests: [
            {k: "gram", v: "+", from: "grampos"},
            {k: "shape", v: "cocci in chains", from: "strep"},
            {k: "catalase", v: "−", from: "lactobacillales"},
            {k: "feature", v: "group B strep", ic: "🅱️", label: "Group"}
          ],
          disease: {short: "meningitis and sepsis in newborns", html: "meningitis and sepsis in newborns", tags: ["meningitis"]}}
      ],
      checkin: {
        q: "How are streptococci classified?",
        o: ["By their hemolysis pattern on blood agar", "By coagulase", "By whether they form spores", "By lactose fermentation"],
        w: "Hemolysis on blood agar: alpha (partial), beta (complete), or gamma (none)."
      }},
    {id: "s-pneumoniae", node: "s_pneumoniae", title: "Pneumococcus (<i>Streptococcus pneumoniae</i>)",
      orgs: [
        {id: "spneumoniae", node: "s_pneumoniae", name: "Streptococcus pneumoniae", shape: "lancet", emoji: "🫁",
          cheat: "The <b>lancet-shaped diplococci</b> with a capsule (Quellung reaction).",
          tests: [
            {k: "gram", v: "+", from: "grampos"},
            {k: "shape", v: "lancet-shaped diplococci"},
            {k: "catalase", v: "−", from: "lactobacillales"},
            {k: "feature", v: "polysaccharide capsule", ic: "🫧", label: "Capsule"},
            {k: "feature", v: "Quellung reaction: capsule swells", ic: "🎈", label: "ID test"}
          ],
          disease: {short: "pneumonia and meningitis", html: "the leading cause of <b>pneumonia</b> and <b>meningitis</b>", tags: ["meningitis", "pneumonia"]},
          facts: [
            {ic: "🛡️", h: "Virulence factor", t: "polysaccharide capsule"},
            {ic: "💉", h: "Prevention", t: "pneumococcal vaccines"}
          ]}
      ],
      checkin: {
        q: "What is the main virulence factor of <i>S. pneumoniae</i>?",
        o: ["Its polysaccharide capsule", "Coagulase", "Endospores", "An outer membrane with LPS"],
        w: "The capsule. The Quellung reaction (capsule swells) is used to ID it."
      }},
    {id: "enterococcus", node: "enterococcus", title: "<i>Enterococcus</i>",
      orgs: [
        {id: "enterococcus", node: "enterococcus", name: "Enterococcus", sub: "(E. faecalis, E. faecium)", spell: "Enterococcus", shape: "pairchain", emoji: "🏥",
          cheat: "The super-hardy cocci: <b>salt- and bile-tolerant</b>, ID'd with the <b>bile-esculin test</b>.",
          tests: [
            {k: "gram", v: "+", from: "grampos"},
            {k: "shape", v: "cocci in pairs or short chains", from: "enterococcus"},
            {k: "catalase", v: "−", from: "lactobacillales"},
            {k: "feature", v: "salt-, bile-tolerant, heat-resistant", ic: "💪", label: "Hardiness"},
            {k: "feature", v: "bile-esculin test (vs. Strep)", ic: "🧪", label: "ID test"}
          ],
          disease: {short: "UTIs, wound infections, endocarditis", html: "opportunistic infections: UTIs, wound infections, endocarditis", tags: ["uti"]},
          facts: [
            {ic: "🧍", h: "Found in", t: "normal intestinal flora"},
            {ic: "🏥", h: "Hospitals", t: "a major cause of nosocomial (hospital) infections"},
            {ic: "⚠️", h: "Resistance", t: "VRE: vancomycin-resistant enterococci", warn: true}
          ]}
      ],
      checkin: {
        q: "Which test tells <i>Enterococcus</i> apart from <i>Streptococcus</i>?",
        o: ["Bile-esculin", "Catalase", "Gram stain", "Coagulase"],
        w: "Both are catalase −. <i>Enterococcus</i> is bile-tolerant: use the bile-esculin test."
      }},
    {id: "review-bacilli", node: "bacilli", title: "Review: Class Bacilli",
      lesson: [
        "<b>Order Bacillales (catalase +)</b><ul><li><i>Bacillus</i>: spore-forming rods (anthrax, food poisoning from rice)</li><li><i>Listeria</i>: non-spore-forming rod that grows in the fridge (listeriosis)</li><li><i>Staphylococcus</i>: grape-like clusters; <i>S. aureus</i> is coagulase + (skin infections, toxins, MRSA)</li></ul>",
        "<b>Order Lactobacillales (catalase −, no spores, lactic acid fermenters)</b><ul><li><i>Lactobacillus</i>: rods; the \"good bacteria\" (probiotics, yogurt)</li><li><i>Streptococcus</i>: chains; sorted by hemolysis (strep throat, pneumonia)</li><li><i>Enterococcus</i>: pairs or short chains; super hardy; VRE in hospitals</li></ul>",
        "<b>Key test:</b> catalase + = Bacillales, catalase − = Lactobacillales."
      ]},

    /* ---------- Class Clostridia ---------- */
    {id: "clostridia", node: "clostridia", title: "Class Clostridia",
      cheat: "The only <b>obligate anaerobic spore-forming rods</b> on our list.",
      lesson: [
        "Still low G+C! Clostridia are gram +, <b>rods</b>, <b>OBLIGATE ANAEROBES</b>, and <b>spore-formers</b>.",
        "They lack the enzymes <b>catalase</b> and <b>superoxide dismutase</b>, so O₂ is actually <b>toxic</b> to them.",
        "Spores make them resilient: they can even survive cooking.",
        "<b>Habitat:</b> soil, decaying matter, sewage, and the intestinal tracts of humans and animals.",
        "Our species: <i>C. perfringens</i>, <i>C. botulinum</i>, <i>C. tetani</i>, and <i>Clostridioides difficile</i> (\"C. diff\", renamed from <i>Clostridium</i>)."
      ],
      checkin: {
        q: "Why is oxygen toxic to Clostridia?",
        o: ["They lack catalase and superoxide dismutase", "They have no cell wall", "Their spores burst in O₂", "They are gram-negative"],
        w: "No catalase or superoxide dismutase means they can't break down toxic oxygen byproducts."
      }},
    {id: "c-perfringens", node: "c_perfringens", title: "<i>Clostridium perfringens</i>",
      orgs: [
        {id: "cperfringens", node: "c_perfringens", name: "Clostridium perfringens", shape: "rodspore", emoji: "🦵",
          cheat: "The <b>non-motile</b>, <b>big gas producer</b> (Durham tube).",
          tests: [
            {k: "gram", v: "+", from: "grampos"},
            {k: "shape", v: "spore-forming rods", from: "clostridia"},
            {k: "oxygen", v: "obligate anaerobe", from: "clostridia"},
            {k: "spores", v: "+", from: "clostridia"},
            {k: "feature", v: "non-motile", ic: "🛑", label: "Motility"},
            {k: "feature", v: "big gas producer (Durham tube)", ic: "💨", label: "Gas"}
          ],
          disease: {short: "gas gangrene", html: "gas gangrene (clostridial myonecrosis)",
            flow: {title: "How it happens", steps: ["spores contaminate a wound", "low-oxygen tissue", "spores germinate", "toxin production"]}},
          facts: [
            {ic: "🌱", h: "Found in", t: "soil (it thrives there)"},
            {ic: "🩹", h: "Prevention", t: "proper wound cleaning and debridement; avoid deep contamination during surgery or trauma"}
          ],
          treat: {short: "remove dead tissue, penicillin or clindamycin, hyperbaric oxygen", html: "surgical removal of dead tissue, high-dose antibiotics (penicillin, clindamycin), and <b>hyperbaric oxygen</b>: extra O₂ stops anaerobic growth and helps healing", drugs: ["penicillin", "clindamycin"]},
          extra: [{h: "🍲 Spores can survive cooking", boxes: [{ic: "🔥", t: "spores survive cooking"}, {ic: "🐌", t: "food is slowly cooled or stored"}, {ic: "🦠", t: "spores turn back into full-fledged Clostridia"}]}]}
      ],
      checkin: {
        q: "Why does hyperbaric oxygen help treat gas gangrene?",
        o: ["Extra O₂ stops the growth of this obligate anaerobe", "O₂ kills the endospores directly", "O₂ neutralizes the gas", "O₂ makes the bacteria gram-negative"],
        w: "<i>C. perfringens</i> is an obligate anaerobe: extra O₂ stops its growth and helps healing."
      }},
    {id: "c-botulinum", node: "c_botulinum", title: "<i>Clostridium botulinum</i>",
      life: [{ic: "🍯", t: "No honey for babies under 1 year: it can carry <i>C. botulinum</i> spores."}],
      orgs: [
        {id: "cbotulinum", node: "c_botulinum", name: "Clostridium botulinum", shape: "rodspore", emoji: "🥫",
          cheat: "<b>\"Botulinum blocks\"</b>: its toxin blocks acetylcholine → <b>flaccid</b> (floppy) paralysis.",
          tests: [
            {k: "gram", v: "+", from: "grampos"},
            {k: "shape", v: "spore-forming rods", from: "clostridia"},
            {k: "oxygen", v: "obligate anaerobe", from: "clostridia"},
            {k: "spores", v: "+", from: "clostridia"},
            {k: "feature", v: "slower growth than C. perfringens", ic: "🐢", label: "Growth"}
          ],
          disease: {short: "botulism", html: "botulism (foodborne, infant, wound)",
            flow: {title: "How the toxin works", steps: ["botulinum neurotoxin", "blocks acetylcholine release", "muscles can't contract", "flaccid paralysis"]}},
          facts: [
            {ic: "🥫", h: "Found in", t: "soil, water, improperly canned foods"},
            {ic: "👶", h: "Infant botulism", t: "swallowed spores (e.g., honey) → colonize the infant gut → toxin release", warn: true},
            {ic: "🫙", h: "Prevention", t: "proper food canning and heating; no honey for infants under 1 year"}
          ],
          treat: {short: "botulinum antitoxin and supportive care", html: "botulinum antitoxin and supportive care", drugs: ["antitoxin"]}}
      ],
      checkin: {
        q: "Why shouldn't babies under 1 year eat honey?",
        o: ["Honey can carry spores that grow in the infant gut and release toxin", "Honey contains the botulinum toxin itself", "Honey kills the normal gut flora", "Honey causes tetanus"],
        w: "Infant botulism: spores → colonize the infant gut → toxin release."
      }},
    {id: "c-tetani", node: "c_tetani", title: "<i>Clostridium tetani</i>",
      orgs: [
        {id: "ctetani", node: "c_tetani", name: "Clostridium tetani", shape: "rodspore", emoji: "🔩",
          cheat: "Its toxin blocks <b>inhibitory</b> neurotransmitters → stiff muscles and <b>lockjaw</b>.",
          fun: {t: "Rusty nails are the classic example, but <b>not because of the rust</b>! They are dirty and cause deep puncture wounds: perfect low-oxygen spots for spores."},
          tests: [
            {k: "gram", v: "+", from: "grampos"},
            {k: "shape", v: "spore-forming rods", from: "clostridia"},
            {k: "oxygen", v: "obligate anaerobe", from: "clostridia"},
            {k: "spores", v: "+", from: "clostridia"}
          ],
          disease: {short: "tetanus", html: "tetanus: muscle stiffness, spasms, <b>lockjaw</b>, trouble swallowing, paralysis",
            flow: {title: "How it causes tetanus", steps: ["spores in soil and dirt get into a deep wound", "spores germinate (low O₂)", "release tetanospasmin (neurotoxin)", "blocks inhibitory neurotransmitters", "muscles can't relax: spasms"]}},
          facts: [
            {ic: "☠️", h: "Fatality rate", t: "10 to 20%, even with treatment", warn: true},
            {ic: "💉", h: "Prevention", t: "vaccination"}
          ],
          treat: {short: "tetanus immune globulin, wound cleaning, metronidazole or penicillin", html: "tetanus immune globulin (antitoxin), wound cleaning, metronidazole or penicillin, supportive care", drugs: ["tetanus immune globulin", "metronidazole", "penicillin"]}}
      ],
      checkin: {
        q: "Botulism causes floppy (flaccid) paralysis. Tetanus causes stiff muscles and spasms. Why the difference?",
        o: ["Botulinum toxin blocks acetylcholine; tetanus toxin blocks inhibitory neurotransmitters", "Tetanus toxin blocks acetylcholine; botulinum toxin blocks inhibitory neurotransmitters", "Only tetanus is caused by a toxin", "Botulism only affects infants"],
        w: "\"Botulinum blocks\" the signal to contract → floppy. Tetanus blocks the signal to relax → stiff."
      }},
    {id: "c-diff", node: "c_diff", title: "<i>Clostridioides difficile</i> (\"C. diff\")",
      life: [{ic: "🧼", t: "Alcohol hand sanitizer doesn't kill C. diff spores. Wash with soap and water!"}],
      orgs: [
        {id: "cdiff", node: "clostridioides", name: "Clostridioides difficile", sub: "(C. diff)", spell: "Clostridioides difficile", shape: "rodspore", emoji: "💊",
          cheat: "The one that strikes <b>after antibiotics</b> wipe out the gut flora.",
          tests: [
            {k: "gram", v: "+", from: "grampos"},
            {k: "shape", v: "spore-forming rods", from: "clostridia"},
            {k: "oxygen", v: "obligate anaerobe", from: "clostridia"},
            {k: "spores", v: "+", from: "clostridia"}
          ],
          disease: {short: "antibiotic-associated diarrhea and colitis", html: "antibiotic-associated diarrhea and colitis",
            flow: {title: "How it happens", steps: ["broad-spectrum antibiotics", "wipe out the normal gut flora", "C. diff overgrows", "toxins damage the colon lining"]}},
          facts: [
            {ic: "🏥", h: "How it spreads", t: "spores on hands and surfaces. A top cause of hospital-acquired infections."},
            {ic: "🧼", h: "Prevention", t: "wash with soap and water: alcohol sanitizer doesn't kill spores", warn: true}
          ],
          treat: {short: "stop the trigger antibiotic; oral vancomycin or fidaxomicin; fecal transplant", html: "stop the trigger antibiotic if possible; oral vancomycin or fidaxomicin; fecal transplant for repeat infections", drugs: ["vancomycin", "fidaxomicin"]}}
      ],
      case: {story: "A hospital patient finished a long course of broad-spectrum antibiotics. Now they have watery diarrhea several times a day. A stool sample grows gram + rods only without oxygen.", tests: [{name: "Endospore stain", ic: "🥚", r: "<b>spores</b>"}, {name: "Oxygen", ic: "🫧", r: "<b>obligate anaerobe</b>"}, {name: "Toxin test", ic: "🧪", r: "<b>toxin +</b>"}], q: "Which organism is it?", o: ["<i>Clostridioides difficile</i>", "<i>Clostridium perfringens</i>", "<i>Bacillus cereus</i>", "<i>Enterococcus</i>"], w: "Antibiotics wiped out the gut flora, and an anaerobic spore-forming rod overgrew: C. diff."},
      checkin: {
        q: "Why doesn't alcohol hand sanitizer work against C. diff?",
        o: ["It doesn't kill the spores", "C. diff is gram-negative", "C. diff has no cell wall", "Alcohol feeds C. diff"],
        w: "Spores survive alcohol. Wash with soap and water."
      }},

    {id: "finale", node: "bacteria", title: "Finale: the full tree", full: true, finale: true,
      takeaways: [
        "Gram-positive: thick peptidoglycan → purple. Firmicutes = <b>low G+C</b>.",
        "Class Bacilli grows with O₂; class Clostridia are <b>obligate anaerobes</b>.",
        "<b>Catalase + = Bacillales</b> (<i>Bacillus, Listeria, Staphylococcus</i>). <b>Catalase − = Lactobacillales</b> (<i>Lactobacillus, Streptococcus, Enterococcus</i>).",
        "Spore formers: <i>Bacillus</i> and the Clostridia.",
        "<i>S. aureus</i> = catalase + AND coagulase + AND golden."
      ]}
  ],

  cheatPreview: [
    {name: "Micrococcus", t: "the only <b>tetrads</b>"}
  ]
};
