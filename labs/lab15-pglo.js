/* Lab 15: Transformation (pGLO). Content from the build brief. */
VLAB.add({
  n:15, title:"Transformation (pGLO)",
  learn:[
    {tab:"Protocol", banner:"Goal: get the pGLO plasmid into <i>E. coli</i>, then see it glow.", items:[]},
    {tab:"Protocol", h:"Competent cells", layout:"split", figs:[{type:"svg", name:"cacl2", wide:true}], items:[
      {t:"[[Competent]] cells can take up DNA from their surroundings."},
      {t:"We made <i>E. coli</i> competent with ice-cold 50 mM calcium chloride ([[CaCl<sub>2</sub>|cacl2|cacl₂|calcium chloride]])."},
      {t:"The DNA backbone and the cell membrane are both [[negative|negatively charged]]. Like charges push each other away."},
      {t:"Calcium ions (Ca<sup>2+</sup>) are [[positive|positively charged|+]]. They coat the cell and shield those negative charges, so the plasmid can get much [[closer|close|near]] to the cell."},
      {t:"<b>Collision theory:</b> a reaction needs [[proximity|closeness]] and [[energy]]. Ca<sup>2+</sup> on ice gives proximity. The heat shock gives energy."}
    ]},
    {tab:"Protocol", h:"Protocol, step by step", kind:"steps", lead:"Tap any <b>What if...?</b> or <b>Learn more</b> button to dig deeper.", figs:[{type:"svg", name:"heatshock", wide:true, cap:"Temperature at each step (not to scale)"}],
      tip:"Try the whole protocol yourself on the <b>Practice</b> tab: move the liquids, run the heat shock timer, and shine the UV light.",
      items:[
      {pic:"pg1", t:"Add [[400 µL|400|400ul|400 ul]] of ice-cold 50 mM calcium chloride (CaCl<sub>2</sub>) to one tube.", why:"Ice-cold CaCl<sub>2</sub> makes the cells competent.",
        whatif:[{q:"you skip the CaCl<sub>2</sub>?", a:"The DNA backbone and the cell membrane are both negative, so they push each other away. With no positive Ca<sup>2+</sup> to shield those charges, the plasmid cannot get close enough to enter. Very few cells take it up."}]},
      {pic:"pgcol", t:"Pick [[one|1|a single]] colony to start. Transfer it into the CaCl<sub>2</sub> with a sterile loop and mix well.", why:"One colony = one starting population of cells.",
        more:[{title:"Learn more: why start from one colony?", html:`<p>A colony grew from <b>one cell</b>, so every cell in it is the same kind. Starting from one colony means you start with a pure culture, and your results come from one population of cells.</p>
          <p>If you scoop up several colonies, or a crowded area, you could mix in different cells or a contaminant. Then you cannot be sure what grew on your plates.</p>
          <p><b>More material vs less:</b></p><ul>
          <li><b>More cells</b> (a big scoop): more cells could take up the plasmid, but big clumps do not mix well into the CaCl<sub>2</sub>. Clumped cells are not evenly exposed, and crowded plates are harder to read.</li>
          <li><b>Fewer cells</b> (a tiny touch): the cells mix in evenly, but there may be too few cells to give many transformed colonies.</li>
          <li><b>Other concentrations:</b> labs sometimes use different CaCl<sub>2</sub> concentrations or volumes. Too little Ca<sup>2+</sup> shields fewer charges. Too much can stress the cells. Our protocol uses 50 mM.</li></ul>`}]},
      {pic:"pg2", t:"Split it in half: move [[200 µL|200|200ul|200 ul]] into a second tube. Label the tubes +pGLO and -pGLO.", why:"The -pGLO tube is the control: the same cells, with no plasmid."},
      {pic:"pg3", t:"Add [[4 µL|4|4ul|4 ul]] of rehydrated pGLO plasmid to the [[+pGLO|pglo|plus pglo|+pglo tube]] tube only.", why:"Only this tube should take up the plasmid.",
        whatif:[{q:"the -pGLO tube gets plasmid too?", a:"This can happen with a pipetting mistake, like using the same tip for both tubes, or touching the -pGLO tube with a tip that held plasmid. Those cells take up pGLO too and use its bla gene to make beta-lactamase. They survive on LB/amp, so the -pGLO plate grows. You lose your control: nothing shows that ampicillin kills cells without the plasmid."}]},
      {pic:"pg4", t:"Keep both tubes on [[ice]] for about 1 hour. The cold keeps the membrane solid and stiff.", why:"Ca<sup>2+</sup> shields the charges so the plasmid can get close: proximity.",
        whatif:[{q:"you skip the hour on ice?", a:"The cold keeps the membrane stiff while Ca<sup>2+</sup> shields the charges and the plasmid settles against the cell. Without it, there is no sudden jump from cold to hot, so the heat shock does much less. Fewer cells take up the plasmid."}, {q:"you leave them on ice much longer?", a:"A little extra time is usually fine: cold cells are barely active, so they neither grow nor die much. Very long waits (hours) leave the cells sitting in calcium chloride with no food, which stresses them and can lower how many survive."}]},
      {pic:"pg5", t:"Heat shock at [[42°C|42|42 c]] for [[45 seconds|45|45 sec|45 s]].", why:"The heat gives the energy. Timing is critical.",
        whatif:[{q:"you heat shock too long?", a:"Heat makes the membrane more fluid. Too long, and the membrane over-solubilizes: it gets too liquid and cannot reform. The cells are damaged or killed, so few or no colonies grow. Watch it happen:", sim:"melt"},
          {q:"you heat shock too short?", a:"The membrane does not loosen enough for the plasmid to slip through. Few cells take up the plasmid, so few colonies grow on the ampicillin plates."}]},
      {pic:"pg6", t:"Back on ice for [[2 to 10|2-10|2 10]] minutes. The cold helps the membrane reform and solidify, trapping the plasmid inside.", why:"The membrane closes back up after the heat shock.",
        more:[{title:"Learn more: why can it be anywhere from 2 to 10 minutes?", html:`<p>The pGLO protocol has been optimized, and it is a very resilient experiment. It handles a lot of variability.</p><p>The important part happens in the first couple of minutes: the cold quickly firms the membrane back up so it closes around the plasmid. After that, the cells are just sitting in the cold. Cold slows them way down, so they barely change.</p><p>That is why there is really no difference in how many cells survive or how many take up the plasmid anywhere between 2 and 10 minutes. What matters is that the cells get cold again right after the heat shock.</p>`}],
        whatif:[{q:"you skip going back on ice?", a:"The cold firms the membrane back up so it closes, trapping the plasmid inside. Without it, the membrane stays loose and fewer cells recover."}, {q:"you leave them on ice too long?", a:"A bit longer than 10 minutes is usually fine. Much longer (like an hour) leaves cells that were just stressed by the heat shock sitting in calcium chloride with no food. Fewer of them survive, and it delays the recovery step that gives them nutrients."}]},
      {pic:"pg7", t:"Add 200 µL [[LB]] broth. Recover at 37°C for [[1 hour|1|1 hr|one hour|60 minutes]].", why:"The cells repair and make beta-lactamase before they meet ampicillin.",
        more:[{title:"Learn more: what is happening inside the cell?", html:`<p>LB is food. At 37°C the cells repair their membranes and start using the genes on the plasmid:</p>
          <div class="flow"><span>bla gene<br>(DNA)</span><i>transcription &rarr;</i><span>mRNA</span><i>translation &rarr;</i><span>beta-lactamase<br>(protein)</span><i>&rarr;</i><span>breaks down<br>ampicillin</span></div>
          <ul><li><b>Transcription:</b> RNA polymerase copies the bla gene into mRNA.</li><li><b>Translation:</b> ribosomes read the mRNA and build beta-lactamase.</li><li><b>ori</b> lets the plasmid copy itself, so the cell keeps more copies.</li><li>GFP is not made yet: there is no arabinose in the LB.</li></ul>
          <p>By the time the cells land on ampicillin, they already have beta-lactamase to protect them.</p>`}],
        whatif:[{q:"you skip the recovery?", a:"The cells have not repaired their membranes or made beta-lactamase yet. Ampicillin stops cells from building their cell walls, so these weak cells burst. Fewer transformed cells survive."},
          {q:"you add a different amount of LB?", a:"More LB spreads the cells out, so each 100 µL you plate holds fewer cells and you get fewer colonies. Too little LB means too few nutrients: after the harsh heat shock and ice, the cells may not recover enough, and some may not survive. Any that do are more concentrated, so colonies may crowd together."}]},
      {pic:"pg8", t:"Pipette [[100 µL|100|100ul|100 ul]] onto each plate. Spread with a spreader dipped in isopropanol and flamed.", why:"Dipping and flaming sterilizes the spreader.",
        afterFig:{type:"svg", name:"platemap"}, after:`<p class="lead" style="margin:6px 0 0">These are the plates we used. Other labs use other combinations: the <b>Plates</b> tab and the Plate predictor cover them all.</p>`,
        whatif:[{q:"you pipette 200 µL instead?", a:"About twice as many cells land on the plate, so expect about twice as many colonies. The extra liquid also takes longer to soak in and can pool, so colonies may run together."},
          {q:"you pipette 50 µL instead?", a:"About half as many cells land on the plate, so expect about half as many colonies. The upside: colonies are more spread out, so it is easier to isolate individual colonies after the transformation. The downside: fewer colonies, and a small drop is harder to spread evenly."},
          {q:"you use a tetracycline or kanamycin plate?", a:"Both antibiotics stop ribosomes from making proteins. pGLO carries bla for ampicillin resistance, not a resistance gene for either of them, so nothing grows. The primary selection factor has to match a resistance gene on the plasmid: ampicillin needs bla, kanamycin needs a kanamycin resistance gene (like kanR), and tetracycline needs a tetracycline resistance gene (like tetR). Other labs use kanamycin, chloramphenicol, or tetracycline, each with its own matching gene."}]},
      {pic:"pg9", t:"Incubate [[inverted|upside down|upside-down]] at 37°C.", why:"Keeps water drops off the agar.",
        whatif:[{q:"the plates are right side up?", a:"Water drops form on the lid and fall onto the agar. The drops spread cells around, so colonies run together. Moisture also leaves the agar this way, so the agar and the bacteria on it can dry out."}]}
    ]},
    {tab:"Follow the cells", banner:"What happens inside the cells at each step?", kind:"facts", items:[], sim:{sim:"follow", prompt:"Watch a +pGLO cell and a -pGLO cell side by side. Answer each question to move on.", stages:[
      {id:"cacl2", short:"CaCl<sub>2</sub>", title:"In ice-cold calcium chloride (CaCl<sub>2</sub>)", cap:"The membrane has negative charges on the outside. Positive Ca²⁺ ions move in and stick to them. The +pGLO tube also has plasmid floating around.",
        q:{q:"Where is the plasmid right now?", opts:["Outside the cell", "Inside the cell", "In both tubes"], a:0, keep:true, why:"It was just added to the +pGLO tube. It has not gotten in yet."}},
      {id:"ice", short:"Ice", title:"On ice, about 1 hour", cap:"The cold keeps the membrane stiff. Positive Ca²⁺ shields the negative charges, so the plasmid can get close to the membrane. That is proximity.",
        q:{q:"What lets the plasmid get close to the cell?", opts:["Ca²⁺ shields the negative charges", "The heat", "Ampicillin", "Arabinose"], a:0, why:"DNA and the membrane are both negative. Ca²⁺ sits between them."}},
      {id:"heat", short:"Heat shock", title:"Heat shock: 42°C for 45 seconds", cap:"The heat gives energy: the membrane gets more fluid and small gaps open for a moment, so some plasmid slips in. Back on ice, the membrane firms up and traps it inside.",
        q:{q:"After the heat shock, where is some of the plasmid?", opts:["Inside the cell", "Still all outside", "Destroyed by the heat"], a:0, keep:true, why:"The membrane loosens for a moment. Too long and it gets too liquid to reform, which damages or kills the cells."}},
      {id:"recover", short:"Recovery", title:"Back on ice, then LB at 37°C for 1 hour", cap:"The +pGLO cell uses the bla gene to make beta-lactamase. The -pGLO cell has no plasmid, so it makes none.",
        q:{q:"Which cell can now break down ampicillin?", opts:["The +pGLO cell", "The -pGLO cell", "Both", "Neither"], a:0, keep:true, why:"Only the +pGLO cell has bla, the gene for beta-lactamase."}},
      {id:"plate", short:"Plate", title:"Spread on LB/amp/ara and incubated at 37°C", cap:"Ampicillin (red triangles) arrives. Beta-lactamase breaks it down in the +pGLO cell. Arabinose (pink) switches on GFP. The -pGLO cell has no protection.",
        q:{q:"Why does the -pGLO cell die?", opts:["It has no bla gene, so no beta-lactamase", "It has too much GFP", "Arabinose kills it", "It is too cold"], a:0, why:"Without beta-lactamase, ampicillin kills it."}},
      {id:"uv", short:"UV light", title:"Under the UV light", cap:"The +pGLO cell grew into a colony that glows green. The -pGLO side has no colony.",
        q:{q:"What makes the colony glow?", opts:["GFP, switched on by arabinose", "Ampicillin", "Beta-lactamase", "Ca²⁺"], a:0, why:"Arabinose switches on GFP. GFP glows green under UV light."}}
    ]}},
    {tab:"The plates", banner:"Four plates. Each one answers one question.", layout:"cards", cols:"2x", cheatTitle:"Plate code cheat sheet", cheat:[
      ["LB", "The nutrient agar: food for the bacteria. Every plate has it. (LB = lysogeny broth, also called Luria-Bertani.)"],
      ["amp", "Ampicillin, an antibiotic. It kills cells that do not have the bla gene."],
      ["ara", "Arabinose, a sugar. It switches on the GFP gene."],
      ["/", "Means \"plus.\" LB/amp/ara = LB agar with ampicillin and arabinose."],
      ["+pGLO", "Cells from the tube that got the plasmid.", "#1f8a55"],
      ["-pGLO", "Cells from the control tube. No plasmid.", "#c43a2b"],
      ["UV", "Ultraviolet light. It makes GFP glow green."],
      ["lawn", "Growth that covers the whole plate, not separate colonies."]], items:[
      {big:"LB", fig:{type:"plate", lawn:true}, t:"<b>-pGLO.</b> Are the cells alive? Result: a [[lawn|a lawn]], white."},
      {big:"LB/amp", fig:{type:"plate"}, t:"<b>-pGLO.</b> Does ampicillin kill cells without the plasmid? Result: [[no growth|none|nothing]]."},
      {big:"LB/amp", fig:{type:"plate", scatter:[[14, 151, "white", 6, 9]]}, t:"<b>+pGLO.</b> Did transformation work? Result: white [[colonies]]."},
      {big:"LB/amp/ara", fig:{type:"plate", uv:true, glow:true, scatter:[[14, 152, "white", 6, 9]]}, t:"<b>+pGLO.</b> Does arabinose switch on GFP? Result: colonies that [[glow]] green under UV."}
    ]},
    {tab:"The plates", h:"Controls: tap a card to flip it", lead:"Front: the setup. Back: what it is a control for.", items:[], flips:[
      {tag:"Positive control", kind:"pos", fig:{type:"plate", lawn:true}, front:"-pGLO cells on LB", q:"Are the cells alive?", back:"Growth (a lawn) shows the cells survived the whole protocol. No growth here means something killed them, like a heat shock that was too long."},
      {tag:"Negative control", kind:"neg", fig:{type:"plate"}, front:"-pGLO cells on LB/amp", q:"Is the ampicillin good?", back:"No growth shows the ampicillin kills cells without the plasmid. It also checks whether your bacteria have any natural resistance. Colonies here mean bad ampicillin, naturally resistant cells, or contamination."},
      {tag:"Experimental", kind:"exp", fig:{type:"plate", scatter:[[10, 151, "white", 6, 9]]}, front:"+pGLO cells on LB/amp", q:"Did transformation work?", back:"Only cells that took up pGLO (with bla) can grow. These colonies stay white: with no arabinose, GFP stays off. That makes it the comparison for the arabinose plate."},
      {tag:"Experimental", kind:"exp", fig:{type:"plate", uv:true, glow:true, scatter:[[10, 152, "white", 6, 9]]}, front:"+pGLO cells on LB/amp/ara", q:"Does arabinose switch on GFP?", back:"Glowing colonies show the plasmid genes are expressed. Compare with LB/amp (+pGLO): same cells, no arabinose, no glow."},
      {tag:"Other labs", fig:{type:"plate", lawn:true}, front:"+pGLO cells on LB", q:"Did the +pGLO cells survive?", back:"A lawn grows, because nothing kills the cells that did not take up pGLO. It checks that the heat shock did not kill the +pGLO cells."},
      {tag:"Other labs", fig:{type:"plate", lawn:true}, front:"-pGLO cells on LB/ara", q:"Does arabinose alone make cells glow?", back:"No. Without pGLO there is no GFP gene, so the lawn does not glow under UV."}
    ]},
    {tab:"The plates", h:"What if the plate were different?", layout:"cards", cols:2, tip:"Try every combination in the Plate predictor on the Practice tab.", items:[
      {big:"No ampicillin", t:"Transformed and untransformed cells both grow. So only [[some]] colonies would glow (with arabinose).", whatif:[{q:"+pGLO cells go on LB/ara?", a:"With no ampicillin, nothing kills the cells that did not take up pGLO, so they grow into a lawn. Arabinose switches on GFP, but only cells with pGLO have the GFP gene. Only some of the lawn glows."}]},
      {big:"Tetracycline or kanamycin", t:"pGLO only carries [[ampicillin|amp]] resistance. On a plate with a different antibiotic, cells with pGLO do not grow.", whatif:[{q:"+pGLO cells go on LB/tet or LB/kan?", a:"Tetracycline and kanamycin both stop ribosomes from making proteins. bla only protects against ampicillin, so nothing grows. The primary selection factor has to match a resistance gene on the plasmid: ampicillin needs bla, kanamycin needs a kanamycin resistance gene (like kanR), and tetracycline needs a tetracycline resistance gene (like tetR). Other labs use kanamycin, chloramphenicol, or tetracycline, each with its own matching gene."}]}
    ]},
    {tab:"Plasmid + GFP", h:"Parts of the pGLO plasmid", layout:"split", figs:[{type:"plasmid", wide:true, cap:"pGLO plasmid map (simplified)"}], items:[
      {t:"[[ori]]: copies the plasmid."},
      {t:"[[bla]]: makes beta-lactamase, an enzyme that breaks down ampicillin. This gives ampicillin resistance."},
      {t:"[[GFP]]: green fluorescent protein. It glows green under UV light."},
      {t:"[[araC]]: regulates GFP."},
      {t:"[[pBAD]] promoter: where RNA polymerase starts transcribing GFP."}
    ]},
    {tab:"Plasmid + GFP", h:"How GFP is switched on", banner:"No arabinose: GFP off. Arabinose: GFP on.", kind:"facts", sim:{sim:"arac", prompt:"Switch between the two buttons and watch.",
      offCap:"<b>No arabinose:</b> AraC sits on the promoter like a stop sign. RNA polymerase cannot get through. <b>GFP OFF.</b>",
      onCap:"<b>With arabinose:</b> arabinose binds AraC, and AraC changes shape. RNA polymerase transcribes GFP. <b>GFP ON.</b>"}, items:[
      {t:"Without [[arabinose]], AraC blocks transcription of GFP."},
      {t:"With arabinose, AraC changes [[shape]], and RNA polymerase transcribes GFP."},
      {t:"Primary selection: [[ampicillin|amp]]. Only transformed cells grow."},
      {t:"Secondary selection: arabinose/GFP. [[Glowing|glow|glowing green]] confirms the plasmid genes are expressed."}
    ]},
    {tab:"Glow", h:"Fluorescence", banner:"GFP takes in UV light and gives off green light.", kind:"steps", sim:{sim:"glow", prompt:"Turn on the UV light. Watch one GFP molecule up close.",
      off:"Under normal light, the colonies look white. Tap <b>Turn on the UV light</b>.",
      c0:"The UV lamp shines on the plate.", c1:"<b>Excitation:</b> an electron in GFP absorbs UV light and jumps to a higher energy level.",
      c2:"It loses some energy as vibration.", c3:"<b>Emission:</b> the electron drops back down and releases green light. Less energy, so a longer wavelength.",
      c4:"Every GFP molecule does this, so the colonies glow green!"}, items:[
      {t:"An electron absorbs light and jumps to a higher energy level: [[excitation]]."},
      {t:"It loses some energy as [[vibration]]."},
      {t:"It drops back down and releases light: [[emission]]."},
      {t:"Emitted light has [[less]] energy, so it has a [[longer]] wavelength."}
    ]}
  ],
  problems:[
    {sim:"quiz", title:"Think it through", prompt:"Use what you know about the plasmid and the plates.", qs:[
      {q:"Which plate shows the cells were alive?", opts:["LB, -pGLO", "LB/amp, -pGLO", "LB/amp, +pGLO", "LB/kan, +pGLO"], a:0, why:"With no antibiotic, every living cell grows into a lawn."},
      {q:"Colonies grow on LB/amp (+pGLO) but do not glow. Why?", opts:["There is no arabinose, so AraC blocks GFP", "The cells did not take up pGLO", "Ampicillin turns GFP off", "The plate is upside down"], a:0, why:"Growing on ampicillin proves they have pGLO. GFP needs arabinose to switch on."},
      {q:"You add 200 µL of LB to the +pGLO tube (200 µL + 4 µL plasmid). How much is in the tube now?", opts:["404 µL", "400 µL", "204 µL", "604 µL"], a:0, why:"200 + 4 + 200 = 404 µL."},
      {q:"Cells with pGLO are spread on a plate with tetracycline or kanamycin instead of ampicillin. What happens?", opts:["No growth", "White colonies", "Glowing colonies", "A lawn"], a:0, why:"pGLO only carries ampicillin resistance (bla). The selection factor has to match a resistance gene on the plasmid."},
      {q:"Why recover in LB for 1 hour before plating on ampicillin?", opts:["The cells repair and start making beta-lactamase first", "To make the cells competent", "To switch on GFP", "To kill untransformed cells"], a:0, why:"Beta-lactamase protects them once they meet ampicillin."},
      {q:"Someone heat shocks for 3 minutes instead of 45 seconds. What is likely?", opts:["The membrane gets too liquid to reform, so few colonies grow", "More cells glow", "The plasmid is destroyed", "Nothing changes"], a:0, why:"Timing is critical. Too long and the membrane cannot reform, so cells are damaged or killed."},
      {q:"Why is the -pGLO tube important?", opts:["It is the control: the same cells with no plasmid", "It holds extra plasmid", "It is used for the heat shock only", "It makes the cells glow"], a:0, why:"Comparing to the control shows the plasmid caused the change."}
    ]}
  ],
  practice:[
    {sim:"pglobench", title:"pGLO bench: run the whole protocol", prompt:"Tap an item, then tap where it goes (or drag it). Set the micropipette first when you move liquid.",
      uvMsg:"Only LB/amp/ara (+pGLO) glows! Ampicillin let only transformed cells grow, and arabinose switched on GFP. LB/amp (+pGLO) has colonies too, but they stay white."},
    {sim:"pipette", title:"Micropipette simulator", prompt:"Make each choice. Wrong choices show what goes wrong.",
      volumes:[400, 200, 100, 4], startVol:150,
      steps:[
        {prompt:"The dial is set. What next?", done:"Locked the dial", why:"A locked dial cannot drift.", state:{locked:true},
          choices:[{label:"Lock the dial", ok:true}, {label:"Attach a tip and start", title:"Unlocked dial", text:"The dial was not locked, so the volume drifted. Now the pipette will not move the volume you set.", state:{drift:-7}}]},
        {prompt:"Attach a tip.", done:"Attached the tip firmly", why:"A firm tip seals well.", state:{tip:"firm"},
          choices:[{label:"Press the tip on firmly", ok:true}, {label:"Rest the tip on loosely", title:"Loose tip", text:"A loose tip can leak or fall off. Then the volume is wrong. Press the tip on firmly.", state:{tip:"loose", fill:.4, drip:true}}]},
        {prompt:"Before the tip goes into the liquid, press the plunger:", done:"Pressed to the first stop", why:"The first stop measures the volume you set.", state:{plunger:1},
          choices:[{label:"To the first stop", ok:true}, {label:"To the second stop", title:"Second stop before drawing up", text:"Pressing to the second stop before drawing up pulls in too much liquid. Press to the first stop to draw up.", state:{plunger:2, fill:1}}]},
        {prompt:"Put the tip into the liquid:", done:"Tip near the middle, moving it a little", why:"Moving the tip a little near the middle pulls material from more than one level, so your sample is even.",
          choices:[{label:"Near the middle, and move the tip a little", ok:true}, {label:"Deep, all the way down", title:"Tip too deep", text:"With the tip too deep, liquid sticks to the outside of the tip. That extra liquid goes into the new tube too.", state:{plunger:1, drip:true}}, {label:"Only at the very top", title:"Tip too shallow", text:"Right at the top, the tip can pull up air, and you only get material from the top layer.", state:{plunger:1, fill:.4}}]},
        {prompt:"Draw up the liquid:", done:"Released the plunger slowly", why:"A slow release pulls in just the right amount.", state:{plunger:0, fill:1},
          choices:[{label:"Release the plunger slowly", ok:true}, {label:"Let the plunger snap back fast", title:"Released too fast", text:"Releasing too fast makes liquid shoot up into the pipette. Release slowly.", state:{plunger:0, inside:true, fill:.6}}]},
        {prompt:"Move to the new tube. To dispense, press the plunger:", done:"Pressed to the second stop to dispense", why:"The second stop pushes out all the liquid.", state:{plunger:2, fill:0},
          choices:[{label:"To the second stop", ok:true}]},
        {prompt:"All the liquid is out. Next:", done:"Ejected the tip", why:"Use a new tip for the next sample.", state:{plunger:0, tip:"none"},
          choices:[{label:"Eject the tip", ok:true}]}
      ]},
    {sim:"predictor", title:"Plate predictor", prompt:"Pick the cells and a plate. Predict growth and glow. Then tap Check.",
      why:{
        tet:"pGLO only carries ampicillin resistance (bla). Tetracycline and kanamycin kill these cells, with or without pGLO. The selection factor has to match a resistance gene on the plasmid.",
        minusAmp:"No plasmid means no bla, so no ampicillin resistance. Ampicillin kills the cells.",
        minusLB:"No antibiotic, so every cell grows: a lawn. No pGLO means no GFP gene, so nothing glows.",
        plusLB:"No antibiotic, so transformed and untransformed cells both grow: a lawn. No arabinose, so AraC blocks GFP: nothing glows.",
        plusAra:"No ampicillin, so transformed and untransformed cells both grow: a lawn. Arabinose turns on GFP, but only in transformed cells, so only some glow.",
        plusAmp:"Only transformed cells (with bla) survive ampicillin: colonies. No arabinose, so AraC blocks GFP: white colonies, no glow.",
        plusAmpAra:"Only transformed cells survive ampicillin: colonies. Arabinose switches on GFP: every colony glows green under UV."}},
    {sim:"plasmid", title:"Label the plasmid map", prompt:"Match each part to its job on the map.",
      parts:[
        {label:"ori", job:"Copies the plasmid."},
        {label:"bla", job:"Beta-lactamase: ampicillin resistance."},
        {label:"araC", job:"Regulates GFP."},
        {label:"pBAD promoter", job:"Where RNA polymerase starts transcribing GFP."},
        {label:"GFP", job:"Green fluorescent protein."}]},
    {sim:"energy", title:"Fluorescence energy diagram", prompt:"Put each arrow in the right box.",
      up:"&uarr; Electron absorbs light and jumps up", down:"&darr; Electron drops down and releases light",
      upWhy:"<b>Excitation:</b> the electron absorbs light and jumps to a higher energy level.",
      downWhy:"<b>Emission:</b> after losing some energy as vibration, the electron drops back down and releases light.",
      q:{q:"Compared with the light absorbed, the emitted light has:", opts:["Less energy and a longer wavelength", "More energy and a shorter wavelength", "Less energy and a shorter wavelength", "The same energy and wavelength"], a:0,
        why:"Some energy is lost as vibration, so the emitted light has less energy and a longer wavelength."}}
  ]
});
