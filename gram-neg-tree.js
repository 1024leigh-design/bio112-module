/* =====================================================================
   Gram-Negative Family Tree Tour: DATA FILE (BIO 112, Ch. 11 Part 1)

   The page code lives in ch11-gram-neg-tour.html. To build a new tour
   (Firmicutes, Actinobacteria), copy that page, point its <script src>
   at a new data file with this same shape, and edit only the data.

   Shape:
     ranks     the tree's levels, left to right. Each has one color, so every
               box on that level (and its header) shares it. lab: true = a
               lab-test grouping, not a taxonomic rank (drawn small and gray).
     tree      nodes in display order. parent = id of parent node.
               traits = chips this node ADDS to the trait box.
               A trait with "blank" becomes a dropdown in Test mode.
               blankLabel: true = branch name becomes a word-bank blank in Test mode.
               locked / muted = grayed out, with a message instead of a stop.
               overviewOnly: true = shown only on the bottom overview map.
               card = the organism card a map-only node opens.
     stops     tour order (one stop per organism that has its own slide).
               node = where the tour sits on the tree. also = extra tree
               nodes that open this stop. orgs = organism cards.
               cheat = a one-line ID shortcut (red box); also collected on the cheat sheet.
     Organism card:
       tests   lab results, drawn as flip tiles. k = test (see TESTS in the
               page code), v = result, from = the branch it is inherited from.
               The quick sort at the end of each card is built from these.
       disease short (for Test mode choices), html, plus optional
               flow (step-through), flips (tap to reveal), boxes (icons).
       facts   icon boxes: spread, found in, at risk, prevention, diagnosis.
       treat   treatment (Test mode makes it multiple choice).
       extra   extra callout boxes. hook = memory hook.
     checkins  multiple choice, first option is correct (shuffled on screen).
     enteric   reference table (section 8 of the brief).

   Writing rules: no em dashes in any on-screen text. Use the minus sign (−)
   for negative test results.
   ===================================================================== */
window.TOUR_DATA = {
  id: "gram-neg",
  brand: "BIO 112 · Ch. 11",
  eyebrow: "Chapter 11, Part 1 · Gram-negative bacteria",
  title: "Gram-Negative <span>Family Tree</span> Tour",
  plainTitle: "Gram-Negative Family Tree Tour",
  goals: [
    "Place each gram-negative organism on the family tree and explain how the groups are related.",
    "Explain <b>why</b> an organism has its ID traits (it inherits them from the branches above it).",
    "Use lab results to identify an organism.",
    "Name the disease each organism causes, how it spreads, and how it's treated."
  ],
  tabs: [
    {label: "Gram-negative", current: true},
    {label: "Gram-positive (coming soon)", soon: "Coming soon: Firmicutes and Actinobacteria"}
  ],
  /* related games. Entries with no href show as "link coming soon" (TODO: Microbe Match). */
  games: [
    {title: "Mystery Microbe", href: "mystery-microbe.html"},
    {title: "Microbe Match", href: ""},
    {title: "Disease Typing Game", href: "disease-type.html"}
  ],
  wordBank: ["Alpha", "Beta", "Gamma", "Epsilon", "Enterics", "Coliforms", "Non-coliforms"],

  /* Columns of the tree, left to right, each with one color. */
  ranks: [
    {id: "domain", label: "Domain / Kingdom", color: "#475569"},
    {id: "gram", label: "Gram stain", lab: true, color: "#db2777"},
    {id: "phylum", label: "Phylum", color: "#1d4ed8"},
    {id: "class", label: "Class", color: "#0e7490"},
    {id: "oxygen", label: "Oxygen", lab: true, minimal: true, color: "#94a3b8"},
    {id: "order", label: "Order", color: "#7c3aed"},
    {id: "lactose", label: "Lactose", lab: true, minimal: true, color: "#94a3b8"},
    {id: "genus", label: "Genus", color: "#15803d"},
    {id: "species", label: "Species", color: "#b45309"}
  ],

  /* Bottom overview map: drops these lab-test columns so the whole tree fits on one screen. */
  overview: {skipRanks: ["oxygen", "lactose"]},

  tree: [
    {id: "bacteria", rank: "domain", label: "Bacteria",
      traits: [
        {t: "prokaryote", blank: {pre: "", post: "", a: "prokaryote", o: ["prokaryote", "eukaryote"], why: "All bacteria are prokaryotes: no nucleus."}},
        {t: "no nucleus"}
      ]},
    {id: "gramneg", rank: "gram", label: "Gram-negative", parent: "bacteria",
      traits: [
        {t: "pink Gram stain", blank: {pre: "", post: " Gram stain", a: "pink", o: ["pink", "purple"], why: "Thin peptidoglycan lets the crystal violet wash out, so gram-negatives pick up the pink safranin."}},
        {t: "thin peptidoglycan"},
        {t: "outer membrane with LPS"}
      ]},
    {id: "proteo", rank: "phylum", label: "Proteobacteria", parent: "gramneg",
      traits: [{t: "largest group of bacteria"}, {t: "mostly chemoheterotrophs"}]},
    {id: "alpha", rank: "class", label: "Alpha", full: "Alphaproteobacteria", parent: "proteo", blankLabel: true,
      traits: [{t: "many grow with very low nutrients", blank: {pre: "many grow with very ", post: " nutrients", a: "low", o: ["low", "high"], why: "Many alphaproteobacteria can grow with very low nutrient levels."}}]},
    {id: "rickettsia", rank: "genus", label: "Rickettsia", parent: "alpha", italic: true},
    {id: "r_rickettsii", rank: "species", label: "R. rickettsii", parent: "rickettsia", overviewOnly: true, italic: true, card: "rrickettsii"},
    {id: "beta", rank: "class", label: "Beta", full: "Betaproteobacteria", parent: "proteo", blankLabel: true,
      traits: [
        {t: "cocci or coccobacilli (round or almost round)"},
        {t: "obligate aerobes", blank: {pre: "", post: "", a: "obligate aerobes", o: ["obligate aerobes", "facultative anaerobes", "obligate anaerobes"], why: "Both of our beta genera, Bordetella and Neisseria, are obligate aerobes."}}
      ]},
    {id: "bordetella", rank: "genus", label: "Bordetella", parent: "beta", italic: true},
    {id: "b_pertussis", rank: "species", label: "B. pertussis", parent: "bordetella", overviewOnly: true, italic: true, card: "bpertussis"},
    {id: "neisseria", rank: "genus", label: "Neisseria", parent: "beta", italic: true,
      traits: [
        {t: "gram-negative diplococci", blank: {pre: "gram-negative ", post: "", a: "diplococci", o: ["diplococci", "rods", "spirals"], why: "Neisseria are diplococci: round cells in pairs."}},
        {t: "oxidase +"},
        {t: "grow on chocolate agar + CO₂"},
        {t: "break sugars down oxidatively (not by fermentation)"}
      ]},
    {id: "ngon", rank: "species", label: "N. gonorrhoeae", parent: "neisseria", italic: true},
    {id: "nmen", rank: "species", label: "N. meningitidis", parent: "neisseria", italic: true},
    {id: "gamma", rank: "class", label: "Gamma", full: "Gammaproteobacteria", parent: "proteo", blankLabel: true,
      traits: [{t: "largest proteobacteria class"}]},
    {id: "obligate", rank: "oxygen", label: "Obligate aerobes", parent: "gamma",
      traits: [{t: "require oxygen", blank: {pre: "", post: " oxygen", a: "require", o: ["require", "don't need"], why: "Obligate aerobes must have oxygen to grow."}}]},
    {id: "pseudomonas", rank: "genus", label: "Pseudomonas", parent: "obligate", italic: true},
    {id: "p_aeruginosa", rank: "species", label: "P. aeruginosa", parent: "pseudomonas", overviewOnly: true, italic: true, card: "paeruginosa"},
    {id: "p_fluorescens", rank: "species", label: "P. fluorescens", parent: "pseudomonas", overviewOnly: true, italic: true, card: "paeruginosa"},
    {id: "legionella", rank: "genus", label: "Legionella", parent: "obligate", italic: true},
    {id: "l_pneumophila", rank: "species", label: "L. pneumophila", parent: "legionella", overviewOnly: true, italic: true, card: "lpneumophila"},
    {id: "facultative", rank: "oxygen", label: "Facultative anaerobes", parent: "gamma",
      traits: [{t: "grow with or without oxygen", blank: {pre: "grow ", post: " oxygen", a: "with or without", o: ["with or without", "only with", "only without"], why: "Facultative anaerobes grow with or without oxygen."}}]},
    {id: "enterics", rank: "order", label: "Enterics", parent: "facultative", blankLabel: true,
      traits: [
        {t: "rod"},
        {t: "ferment sugars"},
        {t: "oxidase −", blank: {pre: "oxidase ", post: "", a: "−", o: ["+", "−"], why: "Enterics are oxidase −. That is one way to tell them from Vibrio, which is oxidase +."}},
        {t: "live in the intestines"}
      ]},
    {id: "coliforms", rank: "lactose", label: "Coliforms", parent: "enterics", blankLabel: true,
      traits: [{t: "lactose +", strong: true, blank: {pre: "lactose ", post: "", a: "+", o: ["+", "−"], why: "Coliforms are the enterics that ferment lactose: pink colonies on MacConkey agar."}}]},
    {id: "escherichia", rank: "genus", label: "Escherichia", parent: "coliforms", italic: true, card: "ecoli"},
    {id: "ecoli", rank: "species", label: "E. coli", parent: "escherichia", italic: true},
    {id: "klebsiella", rank: "genus", label: "Klebsiella", parent: "coliforms", italic: true},
    {id: "k_pneumoniae", rank: "species", label: "K. pneumoniae", parent: "klebsiella", overviewOnly: true, italic: true, card: "kpneumoniae"},
    {id: "enterobacter", rank: "genus", label: "Enterobacter", parent: "coliforms", italic: true},
    {id: "e_aerogenes", rank: "species", label: "E. aerogenes", parent: "enterobacter", overviewOnly: true, italic: true, card: "enterobacter"},
    {id: "e_cloacae", rank: "species", label: "E. cloacae", parent: "enterobacter", overviewOnly: true, italic: true, card: "enterobacter"},
    {id: "noncoliforms", rank: "lactose", label: "Non-coliforms", parent: "enterics", blankLabel: true,
      traits: [{t: "lactose −", strong: true, blank: {pre: "lactose ", post: "", a: "−", o: ["+", "−"], why: "Non-coliforms don't ferment lactose: colorless colonies on MacConkey agar."}}]},
    {id: "salmonella", rank: "genus", label: "Salmonella", parent: "noncoliforms", italic: true},
    /* Enteritidis and Typhi are serovars of S. enterica; shown the way the slides and study guide write them */
    {id: "s_enteritidis", rank: "species", label: "S. Enteritidis", parent: "salmonella", card: "salmonella"},
    {id: "s_typhi", rank: "species", label: "S. Typhi", parent: "salmonella"},
    {id: "shigella", rank: "genus", label: "Shigella", parent: "noncoliforms", italic: true},
    {id: "s_boydii", rank: "species", label: "S. boydii", parent: "shigella", overviewOnly: true, italic: true, card: "shigella"},
    {id: "s_sonnei", rank: "species", label: "S. sonnei", parent: "shigella", overviewOnly: true, italic: true, card: "shigella"},
    {id: "s_flexneri", rank: "species", label: "S. flexneri", parent: "shigella", overviewOnly: true, italic: true, card: "shigella"},
    {id: "proteus", rank: "genus", label: "Proteus", parent: "noncoliforms", italic: true},
    {id: "p_vulgaris", rank: "species", label: "P. vulgaris", parent: "proteus", overviewOnly: true, italic: true, card: "proteus"},
    {id: "p_mirabilis", rank: "species", label: "P. mirabilis", parent: "proteus", overviewOnly: true, italic: true, card: "proteus"},
    {id: "yersinia", rank: "genus", label: "Yersinia", parent: "noncoliforms", italic: true},
    {id: "y_pestis", rank: "species", label: "Y. pestis", parent: "yersinia", overviewOnly: true, italic: true, card: "ypestis"},
    {id: "serratia", rank: "genus", label: "Serratia", parent: "noncoliforms", italic: true},
    {id: "s_marcescens", rank: "species", label: "S. marcescens", parent: "serratia", overviewOnly: true, italic: true, card: "smarcescens"},
    {id: "vibrio", rank: "genus", label: "Vibrio", parent: "facultative", italic: true},
    {id: "v_cholerae", rank: "species", label: "V. cholerae", parent: "vibrio", overviewOnly: true, italic: true, card: "vcholerae"},
    {id: "delta", rank: "class", label: "Delta", parent: "proteo", muted: "Deltaproteobacteria are not covered in BIO 112."},
    {id: "epsilon", rank: "class", label: "Epsilon", full: "Epsilonproteobacteria", parent: "proteo", blankLabel: true,
      traits: [
        {t: "spiral or curved rods"},
        {t: "microaerophilic (need low oxygen)", blank: {pre: "oxygen: ", post: "", a: "microaerophilic", o: ["microaerophilic", "obligate aerobe", "obligate anaerobe"], why: "Epsilons are microaerophilic: they need oxygen, but less than the air has."}},
        {t: "highly motile"}
      ]},
    {id: "campylobacter", rank: "genus", label: "Campylobacter", parent: "epsilon", italic: true},
    {id: "c_jejuni", rank: "species", label: "C. jejuni", parent: "campylobacter", overviewOnly: true, italic: true, card: "cjejuni"},
    {id: "helicobacter", rank: "genus", label: "Helicobacter", parent: "epsilon", italic: true},
    {id: "h_pylori", rank: "species", label: "H. pylori", parent: "helicobacter", overviewOnly: true, italic: true, card: "hpylori"},
    {id: "spirochetes", rank: "phylum", label: "Spirochetes", parent: "gramneg",
      traits: [
        {t: "all gram-negative (stain poorly)"},
        {t: "corkscrew shape"},
        {t: "axial filaments", blank: {pre: "moves with ", post: "", a: "axial filaments", o: ["axial filaments", "external flagella"], why: "Axial filaments are flagella that run inside the cell, between the inner and outer membranes."}}
      ]},
    {id: "treponema", rank: "genus", label: "Treponema", parent: "spirochetes", italic: true},
    {id: "t_pallidum", rank: "species", label: "T. pallidum", parent: "treponema", overviewOnly: true, italic: true, card: "tpallidum"},
    {id: "borrelia", rank: "genus", label: "Borrelia", parent: "spirochetes", italic: true},
    {id: "b_burgdorferi", rank: "species", label: "B. burgdorferi", parent: "borrelia", italic: true},
    {id: "b_relapsing", rank: "species", label: "relapsing fever spp.", parent: "borrelia"},
    {id: "chlamydiae", rank: "phylum", label: "Chlamydiae", parent: "gramneg",
      traits: [
        {t: "obligate intracellular", blank: {pre: "", post: "", a: "obligate intracellular", o: ["obligate intracellular", "free-living"], why: "Chlamydia can only reproduce inside host cells."}},
        {t: "two-form life cycle"}
      ]},
    {id: "chlamydia", rank: "genus", label: "Chlamydia", parent: "chlamydiae", italic: true},
    {id: "c_trachomatis", rank: "species", label: "C. trachomatis", parent: "chlamydia", overviewOnly: true, italic: true, card: "ctrachomatis"},
    {id: "c_pneumoniae", rank: "species", label: "C. pneumoniae", parent: "chlamydia", overviewOnly: true, italic: true, card: "cpneumoniae"},
    {id: "planctomycetes", rank: "phylum", label: "Planctomycetes", parent: "gramneg"},
    {id: "fusobacteria", rank: "phylum", label: "Fusobacteria", parent: "gramneg"},
    {id: "fusobacterium", rank: "genus", label: "Fusobacterium", parent: "fusobacteria", italic: true, card: "fuso"},
    {id: "cyanobacteria", rank: "phylum", label: "Cyanobacteria", parent: "gramneg"},
    {id: "bacteroidetes", rank: "phylum", label: "Bacteroidetes", parent: "gramneg"},
    {id: "grampos", rank: "gram", label: "Gram-positive", parent: "bacteria", locked: "Coming soon: Firmicutes and Actinobacteria"}
  ],

  stops: [
    /* ---------- The big picture ---------- */
    {id: "big-tree", node: "bacteria", title: "The Big Tree", full: true,
      lesson: [
        "All bacteria belong to the domain <b>Bacteria</b>. There are about 40 known phyla, and that number keeps changing as we discover more.",
        "In the lab, one of the first things we do with an unknown is a <b>Gram stain</b>. It sorts bacteria into two big groups based on their <b>cell wall</b>.",
        "Gram stain groups aren't a perfect family tree, but they're the first branch point we use in lab, so we'll use them to organize this tour.",
        "Today: the <b>gram-negatives</b>. The gram-positives are coming in the next module."
      ]},
    {id: "gram-negative", node: "gramneg", title: "Gram-negative bacteria", diagram: "gramwall",
      lesson: [
        "Gram-negative cells have a <b>thin peptidoglycan layer</b> and an <b>outer membrane</b>. The crystal violet washes out during decolorizing, so the cells pick up the pink safranin.",
        "The outer membrane contains <b>LPS (endotoxin)</b>. When gram-negative cells die and break apart, LPS is released and can cause fever and septic shock.",
        "The outer membrane is also a barrier that keeps some antibiotics out.",
        "<b>Major gram-negative phyla:</b> Proteobacteria (the big one!), Spirochetes, Chlamydiae, Planctomycetes, Fusobacteria, Cyanobacteria, Bacteroidetes."
      ]},
    {id: "proteobacteria", node: "proteo", title: "Proteobacteria",
      lesson: [
        "Proteobacteria are the <b>largest</b> group of bacteria.",
        "Most are <b>chemoheterotrophs</b>: they get energy from chemicals and carbon from organic molecules.",
        "Proteobacteria are split into <b>five classes</b> named with Greek letters: <b>Alpha, Beta, Gamma, Delta, Epsilon</b>.",
        "We'll cover four of them. Delta isn't on our list."
      ]},

    /* ---------- Alpha ---------- */
    {id: "alpha", node: "alpha", title: "Alphaproteobacteria",
      lesson: [
        "Many alphaproteobacteria can grow with very low nutrient levels.",
        "Some have unusual shapes, like stalks or buds (<i>Caulobacter</i>).",
        "Some are <b>obligate intracellular parasites</b>: they can only grow inside a host cell. That's our pathogen here."
      ]},
    {id: "rickettsia", node: "rickettsia", title: "<i>Rickettsia rickettsii</i>",
      orgs: [
        {id: "rrickettsii", node: "rickettsia", cheat: "A tiny rod that <b>only grows inside host cells</b> and spreads by <b>tick bites</b>.", name: "Rickettsia rickettsii", shape: "rod", emoji: "🕷️",
          tests: [
            {k: "gram", v: "−", from: "gramneg"},
            {k: "shape", v: "tiny rod"},
            {k: "media", v: "only inside host cells", note: "obligate intracellular: won't grow on agar plates"}
          ],
          disease: {short: "Rocky Mountain spotted fever", html: "Rocky Mountain spotted fever"},
          facts: [{ic: "🕷️", h: "How it spreads", t: "tick bites"}],
          treat: {short: "doxycycline", html: "doxycycline", drugs: ["doxycycline"]}}
      ]},

    /* ---------- Beta ---------- */
    {id: "beta", node: "beta", title: "Betaproteobacteria",
      lesson: [
        "Our two beta genera are <b><i>Bordetella</i></b> and <b><i>Neisseria</i></b>.",
        "Both are <b>round or almost round</b>: <i>Neisseria</i> are cocci (in pairs) and <i>Bordetella</i> is a coccobacillus.",
        "Both are <b>obligate aerobes</b>: they need oxygen."
      ]},
    {id: "bordetella", node: "bordetella", title: "<i>Bordetella pertussis</i>",
      lesson: ["<i>Bordetella</i> is a small gram-negative <b>coccobacillus</b> (a very short rod, almost round)."],
      orgs: [
        {id: "bpertussis", node: "bordetella", cheat: "The only <b>coccobacillus</b> on our list.", name: "Bordetella pertussis", shape: "coccobacillus", emoji: "🫁",
          tests: [
            {k: "gram", v: "−", from: "gramneg"},
            {k: "shape", v: "coccobacillus"},
            {k: "oxygen", v: "obligate aerobe", from: "beta"},
            {k: "oxidase", v: "+"},
            {k: "catalase", v: "+"},
            {k: "media", v: "special media", note: "needs special media to grow"}
          ],
          disease: {short: "whooping cough", html: "whooping cough (\"100 day cough\")",
            flow: {title: "How it causes disease", steps: [
              "<b>Tracheal cytotoxin</b>",
              "kills ciliated airway cells",
              "mucus builds up",
              "coughing fits",
              "the \"whoop\" is the gasp for air after a coughing fit"
            ], side: "<b>Pertussis toxin</b> weakens the immune response"}},
          facts: [
            {ic: "💨", h: "How it spreads", t: "respiratory droplets"},
            {ic: "👶", h: "Most at risk", t: "infants under 6 months", warn: true},
            {ic: "💉", h: "Prevention", t: "vaccine (DTaP / Tdap)"}
          ],
          treat: {short: "azithromycin or clarithromycin", html: "azithromycin or clarithromycin (best early)", drugs: ["azithromycin", "clarithromycin"]},
          extra: [{h: "📈 Why cases are rising", boxes: [{ic: "⏳", t: "waning vaccine immunity"}, {ic: "🔍", t: "better detection"}, {ic: "🚫", t: "vaccine hesitancy"}]}]}
      ]},
    {id: "neisseria", node: "neisseria", title: "<i>Neisseria</i>", diagram: "diplococci",
      cheat: "The only gram-negative <b>diplococci</b> on our list, grown on <b>chocolate agar + CO₂</b>.",
      lesson: [
        "<i>Neisseria</i> are <b>diplococci</b>: round cells in pairs (they look like two kidney beans).",
        "Both species share the same traits from this branch. A <b>sugar test</b> tells them apart:<ul><li><i>N. gonorrhoeae</i> uses <b>glucose only</b></li><li><i>N. meningitidis</i> uses <b>glucose AND maltose</b></li></ul>",
        "Heads up: <i>Neisseria</i> don't truly <b>ferment</b>. As obligate aerobes, they break sugars down <b>oxidatively</b>. The sugar (CTA) tube still turns yellow from the acid made, which shows which sugars they use."
      ]},
    {id: "n-gonorrhoeae", node: "ngon", title: "<i>Neisseria gonorrhoeae</i>",
      orgs: [
        {id: "ngon", node: "ngon", cheat: "A <i>Neisseria</i> (gram − diplococcus on chocolate agar) that uses <b>glucose only</b>.", name: "Neisseria gonorrhoeae", shape: "diplococcus", emoji: "⚠️",
          tests: [
            {k: "gram", v: "−", from: "gramneg"},
            {k: "shape", v: "diplococci", from: "neisseria"},
            {k: "oxygen", v: "obligate aerobe", from: "beta"},
            {k: "oxidase", v: "+", from: "neisseria"},
            {k: "media", v: "chocolate agar + CO₂", from: "neisseria"},
            {k: "sugars", v: "glucose only"}
          ],
          disease: {short: "gonorrhea", html: "gonorrhea",
            flips: [
              {f: "👩 Women", b: "often no symptoms, possible discharge, PID"},
              {f: "👨 Men", b: "painful urination, pus-like discharge"},
              {f: "👶 Newborns", b: "eye infection that can cause blindness"}
            ]},
          facts: [{ic: "🤝", h: "How it spreads", t: "sexual contact; mother to infant during birth"}],
          treat: {short: "ceftriaxone", html: "ceftriaxone (resistance keeps evolving!)", drugs: ["ceftriaxone"]},
          extra: [{h: "🚫 No vaccine", boxes: [{ic: "🎭", t: "It has high antigenic variation (it keeps changing its surface proteins)."}]}]}
      ]},
    {id: "n-meningitidis", node: "nmen", title: "<i>Neisseria meningitidis</i>",
      orgs: [
        {id: "nmen", node: "nmen", cheat: "A <i>Neisseria</i> (gram − diplococcus on chocolate agar) that also uses <b>maltose</b>.", name: "Neisseria meningitidis", shape: "diplococcus", emoji: "🧠",
          tests: [
            {k: "gram", v: "−", from: "gramneg"},
            {k: "shape", v: "diplococci", from: "neisseria"},
            {k: "oxygen", v: "obligate aerobe", from: "beta"},
            {k: "oxidase", v: "+", from: "neisseria"},
            {k: "media", v: "chocolate agar + CO₂", from: "neisseria"},
            {k: "sugars", v: "glucose + maltose"}
          ],
          disease: {short: "meningococcal meningitis", html: "meningococcal meningitis. Can be fatal, even with treatment.",
            boxes: [{ic: "🌡️", t: "fever"}, {ic: "🤕", t: "headache"}, {ic: "🦒", t: "stiff neck"}, {ic: "🤢", t: "nausea"}, {ic: "🟣", t: "purple rash"}]},
          facts: [
            {ic: "💨", h: "How it spreads", t: "respiratory droplets, close contact"},
            {ic: "👃", h: "Lives in", t: "the human nasopharynx"},
            {ic: "🏫", h: "Most at risk", t: "young children, teens, people in dorms or the military", warn: true},
            {ic: "💉", h: "Prevention", t: "vaccine"}
          ],
          treat: {short: "ceftriaxone", html: "ceftriaxone", drugs: ["ceftriaxone"]},
          extra: [{h: "✏️ Don't mix these up", boxes: [
            {ic: "🦠", t: "<b><i>meningitidis</i></b> = the bacterium's species name"},
            {ic: "🧠", t: "<b>meningitis</b> = the disease: inflamed meninges (the membranes around the brain and spinal cord)"}
          ]}]}
      ],
      checkin: {
        q: "An oxidase +, gram-negative diplococcus uses glucose and maltose. What is it?",
        o: ["<i>N. meningitidis</i>", "<i>N. gonorrhoeae</i>", "<i>Bordetella pertussis</i>", "<i>E. coli</i>"],
        w: "Both <i>Neisseria</i> are oxidase + diplococci. Only <i>N. meningitidis</i> uses maltose."
      }},

    /* ---------- Gamma ---------- */
    {id: "gamma", node: "gamma", title: "Gammaproteobacteria",
      lesson: [
        "Gamma has the most pathogens on our list. We split it by <b>oxygen needs</b>:<ul><li><b>Obligate aerobes:</b> <i>Pseudomonas</i>, <i>Legionella</i></li><li><b>Facultative anaerobes:</b> the enterics and <i>Vibrio</i></li></ul>"
      ]},
    {id: "pseudomonas", node: "pseudomonas", title: "Obligate aerobes: <i>Pseudomonas</i>", also: ["obligate"],
      lesson: [
        "<i>Pseudomonas</i> is everywhere in soil and water.",
        "It is an <b>opportunistic pathogen</b>: it mostly infects people whose defenses are already down, like patients with burns or wounds."
      ],
      orgs: [
        {id: "paeruginosa", node: "pseudomonas", cheat: "<b>Greenish, pearly colonies</b> (oxidase +, lactose −).", name: "Pseudomonas aeruginosa", shape: "rod", emoji: "🔥",
          tests: [
            {k: "gram", v: "−", from: "gramneg"},
            {k: "shape", v: "rod"},
            {k: "oxygen", v: "obligate aerobe", from: "obligate"},
            {k: "lactose", v: "−"},
            {k: "oxidase", v: "+"},
            {k: "feature", v: "polar flagella", ic: "〰️"},
            {k: "pigment", v: "greenish, pearly colonies"}
          ],
          disease: {short: "burn and wound infections, sepsis, swimmer's ear", html: "opportunistic infections:", tags: ["wound", "sepsis", "uti", "eye", "hospital"],
            boxes: [{ic: "🔥", t: "burn and wound infections"}, {ic: "🩸", t: "sepsis (hospitals)"}, {ic: "👁️", t: "eye infections (contact lenses)"}, {ic: "👂", t: "swimmer's ear"}, {ic: "🚽", t: "UTIs"}]},
          facts: [{ic: "🌍", h: "Found in", t: "soil, water, hospitals"}],
          extra: [{h: "🍓 Related species", boxes: [{ic: "🧊", t: "<i>P. fluorescens</i> is a major cause of refrigerated food spoilage"}]}]}
          /* TODO: brief gives no treatment for P. aeruginosa */
      ]},
    {id: "legionella", node: "legionella", title: "<i>Legionella pneumophila</i>",
      lesson: [
        "<i>Legionella</i> was named after a 1976 pneumonia outbreak at an American Legion convention (\"Legionnaires' disease\").",
        "It doesn't grow on the usual agar media. It needs special media to isolate and culture.",
        "In nature, it lives in water and <b>reproduces inside amoebae</b>."
      ],
      orgs: [
        {id: "lpneumophila", node: "legionella", cheat: "<b>Reproduces inside amoebae</b>; outbreaks come from water systems, not person to person.", name: "Legionella pneumophila", shape: "rod", emoji: "🛁",
          tests: [
            {k: "gram", v: "−", from: "gramneg"},
            {k: "shape", v: "rod"},
            {k: "oxygen", v: "obligate aerobe", from: "obligate"},
            {k: "media", v: "special media", note: "needs special media"}
          ],
          disease: {short: "Legionnaires' disease", html: "Legionnaires' disease (pneumonia)", tags: ["pneumonia"],
            flow: {title: "How people get it", steps: [
              "lives in water, <b>reproduces inside amoebae</b>",
              "building water systems: cooling towers, hot tubs, showers",
              "people breathe in contaminated water droplets",
              "Legionnaires' disease (pneumonia)"
            ], side: "<b>Not spread person to person.</b>"}},
          facts: [{ic: "🏥", h: "Most at risk", t: "hospital patients, immunocompromised people, people exposed to contaminated water systems", warn: true}]}
          /* TODO: brief gives no treatment for Legionella */
      ],
      checkin: {
        q: "Several hotel guests get pneumonia after using the same hot tub. None of their family members at home get sick. Most likely cause?",
        o: ["<i>Legionella</i>", "<i>Neisseria meningitidis</i>", "<i>Bordetella pertussis</i>", "<i>Rickettsia</i>"],
        w: "<i>Legionella</i> spreads from contaminated water droplets, not from person to person."
      }},

    /* ---------- Enterics ---------- */
    {id: "enterics", node: "enterics", title: "Facultative anaerobes and the Enterics", also: ["facultative"], diagram: "macconkey", entericTable: true,
      lesson: [
        "The <b>enterics</b> (order Enterobacteriales) live in the <b>intestinal tracts</b> of humans and animals.",
        "They're all gram-negative rods and facultative anaerobes, and they ferment carbohydrates. Most have peritrichous flagella and fimbriae for attaching to surfaces.",
        "<b>Oxidase − doesn't mean they can't use oxygen.</b> The oxidase test detects one enzyme, cytochrome c oxidase. Enterics don't have it: they pass electrons to oxygen with different enzymes, and without oxygen they can use other final electron acceptors or ferment. So they're oxidase − but still facultative anaerobes.",
        "They all look alike under the microscope, so we ID them with <b>biochemical tests</b>. The first big split is <b>lactose fermentation</b>:<ul><li><b>Coliforms</b> ferment lactose → pink colonies on MacConkey agar</li><li><b>Non-coliforms</b> don't → colorless colonies on MacConkey agar</li></ul>",
        "The next tool is the <b>IMViC</b> panel: <b>I</b>ndole, <b>M</b>ethyl red, <b>V</b>oges-Proskauer, <b>C</b>itrate. Results are written in that order, like ++−−."
      ]},
    {id: "coliforms", node: "coliforms", title: "Coliforms", entericTable: true,
      lesson: [
        "All three coliforms ferment lactose. To tell them apart, use IMViC:<ul><li><i>E. coli</i> is <b>++−−</b></li><li><i>Klebsiella</i> and <i>Enterobacter</i> are the opposite: <b>−−++</b></li></ul>"
      ]},
    {id: "e-coli", node: "ecoli", title: "<i>Escherichia coli</i>", also: ["escherichia"], entericTable: true,
      orgs: [
        {id: "ecoli", node: "ecoli", cheat: "The only coliform with <b>IMViC ++−−</b>.", name: "Escherichia coli", shape: "rod", emoji: "🚽",
          tests: [
            {k: "gram", v: "−", from: "gramneg"},
            {k: "shape", v: "rod", from: "enterics"},
            {k: "oxygen", v: "facultative anaerobe", from: "facultative"},
            {k: "oxidase", v: "−", from: "enterics"},
            {k: "lactose", v: "+", from: "coliforms"},
            {k: "imvic", v: "++−−"},
            {k: "feature", v: "negative for all the other tests we run in our lab", ic: "➖"}
          ],
          disease: {short: "#1 cause of UTIs and traveler's diarrhea", html: "the #1 cause of:", tags: ["uti", "gi"],
            boxes: [{ic: "🚽", t: "UTIs"}, {ic: "✈️", t: "traveler's diarrhea"}]},
          facts: [{ic: "🏠", h: "Found in", t: "the intestines (normal flora)"}],
          hook: "UTIs are more common in females because of the shorter urethra."}
          /* TODO: brief gives no treatment for E. coli */
      ]},
    {id: "klebsiella", node: "klebsiella", title: "<i>Klebsiella pneumoniae</i>", entericTable: true,
      orgs: [
        {id: "kpneumoniae", node: "klebsiella", cheat: "The only <b>non-motile</b> coliform (IMViC −−++).", name: "Klebsiella pneumoniae", shape: "rod", emoji: "🫁",
          tests: [
            {k: "gram", v: "−", from: "gramneg"},
            {k: "shape", v: "rod", from: "enterics"},
            {k: "oxygen", v: "facultative anaerobe", from: "facultative"},
            {k: "oxidase", v: "−", from: "enterics"},
            {k: "lactose", v: "+", from: "coliforms"},
            {k: "imvic", v: "−−++"},
            {k: "feature", v: "non-motile", ic: "⛔"},
            {k: "urease", v: "+ slow"}
          ],
          disease: {short: "aspiration pneumonia", html: "aspiration pneumonia, often hospital-acquired", tags: ["pneumonia", "hospital"]},
          facts: [{ic: "🌱", h: "Found in", t: "soil and water (it fixes nitrogen)"}]}
      ]},
    {id: "enterobacter", node: "enterobacter", title: "<i>Enterobacter</i>", entericTable: true,
      orgs: [
        {id: "enterobacter", node: "enterobacter", cheat: "IMViC <b>−−++</b> like <i>Klebsiella</i>, but <b>motile</b>.", name: "Enterobacter", shape: "rod", emoji: "🏥",
          tests: [
            {k: "gram", v: "−", from: "gramneg"},
            {k: "shape", v: "rod", from: "enterics"},
            {k: "oxygen", v: "facultative anaerobe", from: "facultative"},
            {k: "oxidase", v: "−", from: "enterics"},
            {k: "lactose", v: "+", from: "coliforms"},
            {k: "imvic", v: "−−++"}
          ],
          disease: {short: "hospital-acquired infections", html: "hospital-acquired infections", tags: ["hospital"]},
          extra: [{h: "🔬 Two species: tap to reveal the urease result", flips: [
            {f: "<i>E. aerogenes</i><br><small>(now called <i>Klebsiella aerogenes</i>)</small>", b: "urease −"},
            {f: "<i>E. cloacae</i>", b: "urease + (slow)"}
          ]}]}
      ],
      checkin: {
        q: "An enteric is lactose + with IMViC −−++. Which could it be?",
        o: ["<i>Klebsiella</i> or <i>Enterobacter</i>", "<i>E. coli</i>", "<i>Salmonella</i>", "<i>Proteus</i>"],
        w: "<i>E. coli</i> is ++−−. <i>Klebsiella</i> and <i>Enterobacter</i> share the opposite pattern, −−++."
      }},
    {id: "non-coliforms", node: "noncoliforms", title: "Non-coliforms", entericTable: true,
      lesson: [
        "Non-coliforms don't ferment lactose, so they make colorless colonies on MacConkey agar.",
        "To tell them apart, look at <b>H₂S</b>, <b>citrate</b>, and <b>urease</b>.",
        "Watch for the classic look-alike pair: <b><i>Salmonella</i></b> (H₂S +, citrate +) vs <b><i>Shigella</i></b> (H₂S −, citrate −)."
      ]},
    {id: "salmonella", node: "s_enteritidis", title: "<i>Salmonella</i>", also: ["salmonella"], entericTable: true,
      orgs: [
        {id: "salmonella", node: "s_enteritidis", cheat: "The only non-coliform that's <b>H₂S + but urease −</b>.", spell: "Salmonella", name: "Salmonella", sub: "(S. enterica serovar Enteritidis)", shape: "rod", emoji: "🍗",
          tests: [
            {k: "gram", v: "−", from: "gramneg"},
            {k: "shape", v: "rod", from: "enterics"},
            {k: "oxygen", v: "facultative anaerobe", from: "facultative"},
            {k: "oxidase", v: "−", from: "enterics"},
            {k: "lactose", v: "−", from: "noncoliforms"},
            {k: "imvic", v: "−+−+"},
            {k: "h2s", v: "+"},
            {k: "citrate", v: "+"}
          ],
          disease: {short: "salmonellosis (food poisoning)", html: "food poisoning (salmonellosis)", tags: ["gi"]},
          facts: [{ic: "🍗", h: "Found in", t: "poultry and other animals (raw meat)"}],
          extra: [{h: "➡️ Next stop", boxes: [{ic: "🌡️", t: "<i>S.</i> Typhi causes typhoid fever, the most severe <i>Salmonella</i> illness."}]}]}
      ]},
    {id: "s-typhi", node: "s_typhi", title: "<i>Salmonella</i> Typhi", entericTable: true,
      orgs: [
        {id: "styphi", node: "s_typhi", spell: "Salmonella Typhi", cheat: "The <i>Salmonella</i> that breaks the rules: <b>citrate −</b>, <b>weak H₂S</b>.", name: "Salmonella", sub: "Typhi", shape: "rod", emoji: "🌡️",
          tests: [
            {k: "gram", v: "−", from: "gramneg"},
            {k: "shape", v: "rod", from: "enterics"},
            {k: "oxidase", v: "−", from: "enterics"},
            {k: "lactose", v: "−", from: "noncoliforms"},
            {k: "citrate", v: "−", note: "the exception in Salmonella"},
            {k: "h2s", v: "weak", note: "the exception in Salmonella"}
          ],
          disease: {short: "typhoid fever", html: "typhoid fever, the most severe <i>Salmonella</i> illness"},
          facts: [{ic: "🚰", h: "Prevention", t: "clean water and sanitation"}]}
      ]},
    {id: "shigella", node: "shigella", title: "<i>Shigella</i>", entericTable: true,
      orgs: [
        {id: "shigella", node: "shigella", name: "Shigella", shape: "rod", emoji: "🧻",
          tests: [
            {k: "gram", v: "−", from: "gramneg"},
            {k: "shape", v: "rod", from: "enterics"},
            {k: "oxygen", v: "facultative anaerobe", from: "facultative"},
            {k: "oxidase", v: "−", from: "enterics"},
            {k: "lactose", v: "−", from: "noncoliforms"},
            {k: "h2s", v: "−", note: "opposite of Salmonella"},
            {k: "citrate", v: "−", note: "opposite of Salmonella"}
          ],
          disease: {short: "shigellosis (bacillary dysentery)", html: "shigellosis (bacillary dysentery)", tags: ["gi"]},
          facts: [{ic: "🧍", h: "Found in", t: "humans only"}],
          extra: [{h: "🔬 Species", boxes: [{ic: "•", t: "<i>S. sonnei</i>"}, {ic: "•", t: "<i>S. boydii</i>"}, {ic: "•", t: "<i>S. flexneri</i>"}]}]}
      ]},
    {id: "proteus", node: "proteus", title: "<i>Proteus</i>", entericTable: true,
      orgs: [
        {id: "proteus", node: "proteus", cheat: "The only one that <b>swarms across the agar</b> (with a strong odor).", name: "Proteus", shape: "rod", emoji: "🌊",
          tests: [
            {k: "gram", v: "−", from: "gramneg"},
            {k: "shape", v: "rod", from: "enterics"},
            {k: "oxidase", v: "−", from: "enterics"},
            {k: "lactose", v: "−", from: "noncoliforms"},
            {k: "urease", v: "+"},
            {k: "h2s", v: "+"},
            {k: "feature", v: "swarms across the agar; strong odor", ic: "🌊"},
            {k: "imvic", v: "++−v", label: "IMViC: <i>P. vulgaris</i>"},
            {k: "imvic", v: "−+−+", label: "IMViC: <i>P. mirabilis</i>"}
          ],
          disease: {short: "opportunistic UTIs and wound infections", html: "opportunistic infections:", tags: ["uti", "wound"],
            boxes: [{ic: "🚽", t: "UTIs"}, {ic: "🩹", t: "wound infections"}]}}
      ]},
    {id: "yersinia", node: "yersinia", title: "<i>Yersinia pestis</i>", entericTable: true,
      orgs: [
        {id: "ypestis", node: "yersinia", name: "Yersinia pestis", shape: "rod", emoji: "🐀",
          tests: [
            {k: "gram", v: "−", from: "gramneg"},
            {k: "shape", v: "rod", from: "enterics"},
            {k: "oxidase", v: "−", from: "enterics"},
            {k: "lactose", v: "−", from: "noncoliforms"},
            {k: "imvic", v: "−+−−"}
          ],
          disease: {short: "plague", html: "plague: tap each form",
            flow: {title: "How it spreads", steps: ["🐀 rats", "🦟 their fleas", "🧍 people"]},
            flips: [
              {f: "Bubonic", b: "infects lymph nodes → bubos (swollen, painful nodes)"},
              {f: "Septicemic", b: "infects the blood → gangrene, blackened skin (\"Black plague\")"},
              {f: "Pneumonic", b: "infects the lungs; nearly always fatal if untreated"}
            ]},
          treat: {short: "streptomycin, gentamicin, doxycycline", html: "streptomycin, gentamicin, doxycycline", drugs: ["streptomycin", "gentamicin", "doxycycline"]},
          extra: [{h: "📜 History", boxes: [{ic: "☠️", t: "The 14th century pandemic killed 30 to 60% of Europe."}]}]}
      ]},
    {id: "serratia", node: "serratia", title: "<i>Serratia marcescens</i>", entericTable: true,
      orgs: [
        {id: "smarcescens", node: "serratia", cheat: "The only gram-negative with a <b>red pigment</b>.", name: "Serratia marcescens", shape: "rod", emoji: "🏥",
          tests: [
            {k: "gram", v: "−", from: "gramneg"},
            {k: "shape", v: "rod", from: "enterics"},
            {k: "oxidase", v: "−", from: "enterics"},
            {k: "lactose", v: "−", from: "noncoliforms"},
            {k: "imvic", v: "−−++"},
            {k: "pigment", v: "red", note: "may not form at 37°C"}
          ],
          disease: {short: "hospital-acquired UTIs, pneumonia, wound infections", html: "hospital-acquired infections, linked to catheters and IV lines:", tags: ["hospital", "uti", "pneumonia", "wound", "sepsis"],
            boxes: [{ic: "🚽", t: "UTIs"}, {ic: "🫁", t: "pneumonia"}, {ic: "🩹", t: "wound infections"}, {ic: "🩸", t: "bacteremia"}]},
          facts: [{ic: "🚿", h: "Found in", t: "water, soil, bathrooms, medical equipment"}]}
      ],
      checkin: {
        q: "An enteric is lactose −, H₂S +, citrate +, and urease −. What is it?",
        o: ["<i>Salmonella</i>", "<i>Shigella</i>", "<i>Proteus</i>", "<i>E. coli</i>"],
        w: "<i>Shigella</i> is H₂S − and citrate −. <i>Proteus</i> is urease +. <i>E. coli</i> is lactose +."
      }},
    {id: "vibrio", node: "vibrio", title: "<i>Vibrio cholerae</i>",
      lesson: [
        "<i>Vibrio</i> is a facultative anaerobe like the enterics, but it is <b>not</b> an enteric. One clue: <i>Vibrio</i> is <b>oxidase +</b>, while enterics are oxidase −.",
        "Shape: a <b>curved rod</b> (the macaroni! 🍝)"
      ],
      orgs: [
        {id: "vcholerae", node: "vibrio", cheat: "The <b>comma-shaped</b> rod: oxidase +, unlike the oxidase − enterics.", name: "Vibrio cholerae", shape: "curved", emoji: "💧",
          tests: [
            {k: "gram", v: "−", from: "gramneg"},
            {k: "shape", v: "curved rod", note: "comma-shaped"},
            {k: "oxygen", v: "facultative anaerobe", from: "facultative"},
            {k: "oxidase", v: "+", note: "enterics are −"}
          ],
          disease: {short: "cholera", html: "cholera", tags: ["gi"],
            flow: {title: "How it causes disease", steps: ["<b>Cholera toxin</b>", "\"rice water\" diarrhea", "severe dehydration"]}},
          facts: [{ic: "🚰", h: "How it spreads", t: "fecal-oral route through contaminated water and food; poor sanitation"}],
          treat: {short: "rehydration first, plus doxycycline or azithromycin", html: "<b>rehydration first!</b> Plus doxycycline or azithromycin", drugs: ["rehydration", "doxycycline", "azithromycin"]}}
      ]},

    /* ---------- Epsilon ---------- */
    {id: "epsilon", node: "epsilon", title: "Epsilonproteobacteria",
      lesson: [
        "Our two epsilons are both curved or spiral and both are <b>microaerophilic</b>: they need oxygen, but less than the air has.",
        "Both are gut pathogens: one in the intestine, one in the stomach."
      ]},
    {id: "campylobacter", node: "campylobacter", title: "<i>Campylobacter jejuni</i>",
      orgs: [
        {id: "cjejuni", node: "campylobacter", cheat: "The only <b>gull-wing</b> shape.", name: "Campylobacter jejuni", shape: "gullwing", emoji: "🍗",
          tests: [
            {k: "gram", v: "−", from: "gramneg"},
            {k: "shape", v: "gull-wing spiral", note: "the cavatappi! 🍝"},
            {k: "oxygen", v: "microaerophilic", from: "epsilon"},
            {k: "feature", v: "highly motile", ic: "💨", from: "epsilon"}
          ],
          disease: {short: "bacterial gastroenteritis", html: "the most common cause of bacterial gastroenteritis worldwide", tags: ["gi"]},
          facts: [{ic: "🍗", h: "How it spreads", t: "undercooked poultry, contaminated water, raw (unpasteurized) milk"}]}
      ]},
    {id: "helicobacter", node: "helicobacter", title: "<i>Helicobacter pylori</i>",
      orgs: [
        {id: "hpylori", node: "helicobacter", cheat: "The <b>urease + spiral</b> that lives in the stomach.", name: "Helicobacter pylori", shape: "spiral", emoji: "🫃",
          tests: [
            {k: "gram", v: "−", from: "gramneg"},
            {k: "shape", v: "spiral rod"},
            {k: "oxygen", v: "microaerophilic", from: "epsilon"},
            {k: "urease", v: "+"}
          ],
          disease: {short: "gastritis and peptic ulcers", html: "gastritis and peptic (stomach) ulcers",
            flow: {title: "How it survives the stomach", steps: ["makes <b>urease</b>", "urease produces ammonia", "ammonia neutralizes the acid around it", "survives in the stomach"], side: "It is <b>not</b> an acidophile."}},
          treat: {short: "2 antibiotics + a proton pump inhibitor", html: "2 antibiotics + a proton pump inhibitor", drugs: ["ppi"]}}
      ],
      checkin: {
        q: "How does <i>H. pylori</i> survive in the acidic stomach?",
        o: ["Urease makes ammonia, which neutralizes the acid around it", "It is an acidophile that loves low pH", "It forms endospores", "It hides inside amoebae"],
        w: "<i>H. pylori</i> makes urease, and the ammonia it produces neutralizes the acid around it. It is not an acidophile."
      }},

    /* ---------- Spirochetes ---------- */
    {id: "spirochetes", node: "spirochetes", title: "Spirochetes", diagram: "axial",
      lesson: [
        "Spirochetes have <b>axial filaments</b>: flagella that run <b>inside</b> the cell, between the inner and outer membranes.",
        "When the filaments rotate, the whole cell twists like a corkscrew. This lets spirochetes move well through thick, viscous environments.",
        "Our two genera are <b><i>Treponema</i></b> and <b><i>Borrelia</i></b>."
      ]},
    {id: "treponema", node: "treponema", title: "<i>Treponema pallidum</i>",
      orgs: [
        {id: "tpallidum", node: "treponema", cheat: "<b>Too thin to see</b> with a regular light microscope.", name: "Treponema pallidum", shape: "spirochete", emoji: "⚠️",
          tests: [
            {k: "gram", v: "− (stains poorly)", from: "spirochetes"},
            {k: "shape", v: "spirochete", note: "too thin to see well with a regular light microscope"},
            {k: "feature", v: "axial filaments", ic: "🌀", from: "spirochetes"}
          ],
          disease: {short: "syphilis", html: "syphilis: tap each stage",
            flips: [
              {f: "1. Primary", b: "painless chancre"},
              {f: "2. Secondary", b: "skin rash, including palms and soles"},
              {f: "3. Tertiary", b: "gummas; heart and nerve damage"},
              {f: "👶 Congenital", b: "mother to fetus: bone deformities, Hutchinson's teeth, nervous system effects"}
            ]},
          facts: [{ic: "🤝", h: "How it spreads", t: "sexual contact; congenital"}],
          treat: {short: "penicillin G", html: "penicillin G", drugs: ["penicillin"]},
          extra: [{h: "🔗 Related", boxes: [{ic: "🌍", t: "Other <i>Treponema</i> species cause bejel, yaws, and pinta, which are spread without sexual contact."}]}]}
      ]},
    {id: "lyme", node: "b_burgdorferi", title: "<i>Borrelia burgdorferi</i>: Lyme disease", also: ["borrelia"],
      orgs: [
        {id: "bburgdorferi", node: "b_burgdorferi", cheat: "<b>Bull's-eye rash</b> after a tick bite.", name: "Borrelia burgdorferi", shape: "spirochete", emoji: "🎯",
          tests: [
            {k: "gram", v: "− (stains poorly)", from: "spirochetes"},
            {k: "shape", v: "spirochete", from: "spirochetes"},
            {k: "feature", v: "axial filaments", ic: "🌀", from: "spirochetes"}
          ],
          /* TODO: brief gives no Key ID results specific to B. burgdorferi */
          disease: {short: "Lyme disease", html: "Lyme disease. Early signs:",
            boxes: [{ic: "🎯", t: "erythema migrans (\"bull's-eye\" rash)"}, {ic: "🤒", t: "flu-like: fever, headache, fatigue, muscle/joint aches"}]},
          facts: [
            {ic: "🕷️", h: "How it spreads", t: "<i>Ixodes</i> ticks: the blacklegged (\"deer\") tick. In California, the western blacklegged tick. Usually must be attached 24 to 48+ hours."},
            {ic: "🧴", h: "Prevention", t: "tick checks, repellent, protective clothing"}
          ],
          treat: {short: "doxycycline (early), amoxicillin, cefuroxime", html: "doxycycline (early), amoxicillin, cefuroxime", drugs: ["doxycycline", "amoxicillin", "cefuroxime"]}}
      ]},
    {id: "relapsing-fever", node: "b_relapsing", title: "<i>Borrelia</i>: relapsing fever",
      orgs: [
        {id: "brf", node: "b_relapsing", spell: "Borrelia", cheat: "A fever that <b>goes away and comes back</b>.", name: "Borrelia", sub: "(relapsing fever species)", shape: "spirochete", emoji: "🔁",
          tests: [
            {k: "gram", v: "− (stains poorly)", from: "spirochetes"},
            {k: "shape", v: "spirochete", from: "spirochetes"},
            {k: "feature", v: "axial filaments", ic: "🌀", from: "spirochetes"}
          ],
          /* TODO: brief gives no Key ID results specific to relapsing fever Borrelia */
          disease: {short: "relapsing fever", html: "relapsing fever: high fever, chills, headache, and aches. The fever goes away, then comes back.",
            flow: {title: "Why it relapses: antigenic variation", loop: true, steps: [
              "<i>Borrelia</i> changes its surface proteins",
              "the immune system clears one variant",
              "a new variant emerges",
              "the fever returns"
            ]}},
          facts: [{ic: "🕷️", h: "How it spreads", t: "soft ticks or body lice"}],
          treat: {short: "doxycycline, erythromycin, penicillin", html: "doxycycline, erythromycin, penicillin", drugs: ["doxycycline", "erythromycin", "penicillin"]}}
      ],
      checkin: {
        q: "Why does relapsing fever keep coming back?",
        o: ["<i>Borrelia</i> changes its surface proteins, so the immune system has to start over", "The bacteria form endospores", "Antibiotics don't work on spirochetes", "The patient gets bitten by a new tick each time"],
        w: "Antigenic variation: the immune system clears one variant, a new variant emerges, and the fever returns."
      }},

    /* ---------- Chlamydiae ---------- */
    {id: "chlamydiae", node: "chlamydiae", title: "Chlamydiae", also: ["chlamydia"], diagram: "chlamydia",
      lesson: [
        "<i>Chlamydia</i> can only reproduce <b>inside host cells</b>. It switches between two forms:<ul><li><b>Elementary body (EB):</b> infectious, but can't reproduce. Survives outside the host cell. Metabolically limited.</li><li><b>Reticulate body (RB):</b> reproduces, but not infectious. Can't survive outside the host cell. Metabolically active.</li></ul>",
        "Life cycle: EB enters the cell → becomes an RB → multiplies → turns back into EBs → EBs are released to infect new cells.",
        "Memory hook: EB = the \"delivery vehicle,\" RB = the \"factory.\""
      ],
      orgs: [
        {id: "ctrachomatis", node: "chlamydia", cheat: "The only one with a <b>two-form life cycle</b> (EB and RB).", name: "Chlamydia trachomatis", shape: "intracellular", emoji: "⚠️",
          tests: [
            {k: "gram", v: "−", from: "gramneg"},
            {k: "media", v: "only inside host cells", from: "chlamydiae"},
            {k: "feature", v: "two-form life cycle (EB and RB)", ic: "🔄", from: "chlamydiae"}
          ],
          disease: {short: "the most common bacterial STI; trachoma", html: "the most common bacterial STI (discharge, genital pain and inflammation). Also:", tags: ["eye", "pneumonia"],
            boxes: [{ic: "👁️", t: "trachoma (an eye infection)"}, {ic: "🫁", t: "pneumonia"}]},
          facts: [{ic: "🧬", h: "Diagnosis", t: "PCR, antigen detection"}],
          treat: {short: "azithromycin, doxycycline", html: "azithromycin, doxycycline", drugs: ["azithromycin", "doxycycline"]}},
        {id: "cpneumoniae", node: "chlamydia", name: "Chlamydia pneumoniae", shape: "intracellular", emoji: "🫁",
          tests: [
            {k: "gram", v: "−", from: "gramneg"},
            {k: "media", v: "only inside host cells", from: "chlamydiae"}
          ],
          disease: {short: "respiratory infections", html: "respiratory infections", tags: ["pneumonia"]}}
      ]},

    /* ---------- The other phyla ---------- */
    {id: "planctomycetes", node: "planctomycetes", title: "Planctomycetes",
      orgs: [
        {type: "phylum", id: "planct", node: "planctomycetes", cheat: "Reproduces by <b>budding</b>.", name: "Planctomycetes", shape: "budding",
          boxes: [
            {ic: "🫧", t: "Gram-negative bacteria that reproduce by <b>budding</b>"},
            {ic: "🔬", t: "Examples: <i>Planctomyces</i>, <i>Gemmata</i>, <i>Brocadia</i>"}
          ],
          flips: [{f: "Why were they once thought to bridge prokaryotes and eukaryotes?", b: "They have internal membrane compartments (some around the nucleoid) and sterols in their membranes."}]}
      ]},
    {id: "fusobacteria", node: "fusobacteria", title: "Fusobacteria",
      orgs: [
        {type: "phylum", id: "fuso", node: "fusobacteria", cheat: "<b>Spindle-shaped</b> rods.", name: "Fusobacteria", shape: "spindle",
          boxes: [
            {ic: "🚫", t: "Anaerobic, <b>spindle-shaped</b> rods"},
            {ic: "🦷", t: "Some cause periodontal (gum) disease and abscesses"},
            {ic: "🤝", t: "Opportunistic, and can help other microbes in mixed infections"}
          ],
          flips: [{f: "Where do they live?", b: "the mouth, gut, and genital tract"}]}
      ]},
    {id: "cyanobacteria", node: "cyanobacteria", title: "Cyanobacteria",
      orgs: [
        {type: "phylum", id: "cyano", node: "cyanobacteria", cheat: "The only <b>photosynthetic</b> group: it makes O₂.", name: "Cyanobacteria", shape: "filament",
          boxes: [
            {ic: "☀️", t: "Photosynthetic: use chlorophyll <i>a</i> and release O₂"},
            {ic: "🌍", t: "They made the oxygen in early Earth's atmosphere"},
            {ic: "⚪", t: "Some fix nitrogen in special cells called <b>heterocysts</b>"},
            {ic: "⚠️", t: "Can form toxic blooms in water"}
          ],
          flips: [{f: "Nicknamed \"blue-green algae.\" Are they algae?", b: "NO! They are bacteria, not algae."}]}
      ]},
    {id: "bacteroidetes", node: "bacteroidetes", title: "Bacteroidetes",
      orgs: [
        {type: "phylum", id: "bactero", node: "bacteroidetes", name: "Bacteroidetes", shape: "generic",
          boxes: [
            {ic: "🚫", t: "Mostly anaerobic"},
            {ic: "🍞", t: "Help digest complex carbohydrates"},
            {ic: "⚠️", t: "Some can become opportunistic pathogens (e.g. <i>Bacteroides fragilis</i>)"}
          ],
          flips: [{f: "They're a dominant group in the human gut, along with which other group?", b: "the Firmicutes (coming in the next module!)"}]}
      ],
      checkin: {
        q: "Which gram-negative group makes oxygen through photosynthesis?",
        o: ["Cyanobacteria", "Bacteroidetes", "Fusobacteria", "Planctomycetes"],
        w: "Cyanobacteria use chlorophyll <i>a</i> and release O₂."
      }},

    /* ---------- Finale ---------- */
    {id: "finale", node: "bacteria", title: "Finale: the full tree", full: true, finale: true,
      takeaways: [
        "Every organism inherits the traits of the branches above it.",
        "In lab, work down the tree: Gram stain → shape → oxygen / oxidase → lactose → IMViC, H₂S, citrate, urease.",
        "Same branch = similar traits, but the leaves have different diseases."
      ]}
  ],

  /* ID cheat sheet: extra lines shown under "coming in the gram-positive tour" */
  cheatPreview: [
    {name: "Micrococcus", t: "the only <b>tetrads</b>"},
    {name: "Clostridium", t: "the only <b>obligate anaerobe spore former</b>"}
  ],

  /* Section 8 of the brief. Motility is intentionally left out. */
  enteric: {
    groupColors: {coliforms: "#9d174d", noncoliforms: "#0369a1"},
    cols: ["Lactose", "Indole", "MR", "VP", "Citrate", "H₂S", "Urease"],
    rows: [
      {name: "E. coli", group: "coliforms", v: ["+", "+", "+", "−", "−", "−", "−"]},
      {name: "K. pneumoniae", group: "coliforms", v: ["+", "−", "−", "+", "+", "−", "+ slow"]},
      {name: "E. aerogenes", group: "coliforms", v: ["+", "−", "−", "+", "+", "−", "−"]},
      {name: "E. cloacae", group: "coliforms", v: ["+", "−", "−", "+", "+", "−", "+ slow"]},
      {name: "Salmonella", group: "noncoliforms", v: ["−", "−", "+", "−", "+", "+", "−"]},
      {name: "Shigella", group: "noncoliforms", v: ["−", "v", "+", "−", "−", "−", "−"]},
      {name: "P. vulgaris", group: "noncoliforms", v: ["−", "+", "+", "−", "v", "+", "+"]},
      {name: "P. mirabilis", group: "noncoliforms", v: ["−", "−", "+", "−", "+", "+", "+"]},
      {name: "Y. pestis", group: "noncoliforms", v: ["−", "−", "+", "−", "−", "−", "−"]},
      {name: "S. marcescens", group: "noncoliforms", v: ["−", "−", "−", "+", "+", "−", "−"]}
    ],
    key: "+ = positive, − = negative, v = variable",
    footnote: "<i>S.</i> Typhi is the exception in <i>Salmonella</i>: citrate −, weak H₂S."
  }
};
