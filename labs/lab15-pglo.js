/* Lab 15: Transformation (pGLO). Content from the build brief. */
VLAB.add({
  n:15, title:"Transformation (pGLO)",
  learn:[
    {h:"Competent cells", kind:"facts", items:[
      {t:"[[Competent]] cells can take up DNA from their surroundings."},
      {t:"We made <i>E. coli</i> competent with ice-cold 50 mM [[CaCl2|cacl2|cacl₂|calcium chloride]]."},
      {t:"Ca<sup>2+</sup> shields the [[negative]] charges on the DNA backbone and the cell membrane, so the plasmid can get close and enter."}
    ]},
    {h:"Protocol", kind:"steps", items:[
      {t:"Add [[400 µL|400|400ul|400 ul]] of ice-cold 50 mM CaCl<sub>2</sub> to one tube. Transfer one or two colonies into it with a sterile loop. Mix well."},
      {t:"Split it in half: move [[200 µL|200|200ul|200 ul]] into a second tube. Label the tubes +pGLO and -pGLO."},
      {t:"Add [[4 µL|4|4ul|4 ul]] of rehydrated pGLO plasmid to the [[+pGLO|pglo|plus pglo|+pglo tube]] tube only."},
      {t:"Keep both tubes on [[ice]] for about 1 hour."},
      {t:"Heat shock at [[42°C|42|42 c]] for [[45 seconds|45|45 sec|45 s]].", why:"Timing is critical. Too short: few cells take up plasmid. Too long: cells are damaged or killed."},
      {t:"Back on ice for 2 to 10 minutes."},
      {t:"Add 200 µL [[LB]] broth. Recover at 37°C for [[1 hour|1|1 hr|one hour|60 minutes]].", why:"During recovery the cells repair and start making beta-lactamase before they meet ampicillin."},
      {t:"Pipette [[100 µL|100|100ul|100 ul]] onto each plate. Spread with a spreader dipped in isopropanol and flamed. Plates: LB (-pGLO), LB/amp (-pGLO), LB/amp (+pGLO), LB/amp/ara (+pGLO)."},
      {t:"Incubate [[inverted|upside down|upside-down]] at 37°C."}
    ]},
    {h:"Parts of the pGLO plasmid", kind:"facts", figs:[{type:"plasmid", cap:"pGLO plasmid map (simplified)"}], items:[
      {t:"[[ori]]: copies the plasmid."},
      {t:"[[bla]]: beta-lactamase. Gives ampicillin resistance."},
      {t:"[[GFP]]: green fluorescent protein."},
      {t:"[[araC]]: regulates GFP."},
      {t:"[[pBAD]] promoter: where RNA polymerase starts transcribing GFP."}
    ]},
    {h:"How GFP is switched on", kind:"facts", items:[
      {t:"Without [[arabinose]], AraC blocks transcription of GFP."},
      {t:"With arabinose, AraC changes [[shape]], and RNA polymerase transcribes GFP."},
      {t:"Primary selection: [[ampicillin|amp]]. Only transformed cells grow."},
      {t:"Secondary selection: arabinose/GFP. [[Glowing|glow|glowing green]] confirms the plasmid genes are expressed."}
    ]},
    {h:"Expected results", kind:"facts", figs:[
      {type:"plate", lawn:true, cap:"-pGLO, LB: lawn"},
      {type:"plate", cap:"-pGLO, LB/amp: no growth"},
      {type:"plate", scatter:[[14, 151, "white", 4, 6]], cap:"+pGLO, LB/amp: white colonies"},
      {type:"plate", uv:true, glow:true, scatter:[[14, 152, "white", 4, 6]], cap:"+pGLO, LB/amp/ara: glowing colonies (UV)"}
    ], items:[
      {t:"-pGLO on LB: [[lawn|a lawn]], white."},
      {t:"-pGLO on LB/amp: [[no growth|none|nothing]]."},
      {t:"+pGLO on LB/amp: white [[colonies]]."},
      {t:"+pGLO on LB/amp/ara: colonies that [[glow]] green under UV."},
      {t:"On a plate <b>without</b> ampicillin, transformed and untransformed cells both grow. So only [[some]] colonies would glow (with arabinose)."},
      {t:"pGLO only carries [[ampicillin|amp]] resistance. On a plate with a different antibiotic (like tetracycline), cells with pGLO do not grow."}
    ]},
    {h:"Fluorescence", kind:"facts", items:[
      {t:"An electron absorbs light and jumps to a higher energy level: [[excitation]]."},
      {t:"It loses some energy as [[vibration]]."},
      {t:"It drops back down and releases light: [[emission]]."},
      {t:"Emitted light has [[less]] energy, so it has a [[longer]] wavelength."}
    ]}
  ],
  practice:[
    {sim:"pipette", title:"Micropipette simulator", prompt:"Make each choice. Wrong choices show what goes wrong.",
      volumes:[400, 200, 100, 4], startVol:150,
      steps:[
        {prompt:"The dial is set. What next?", done:"Locked the dial", why:"A locked dial cannot drift.", state:{locked:true},
          choices:[{label:"Lock the dial", ok:true}, {label:"Attach a tip and start", title:"Unlocked dial", text:"The dial was not locked, so the volume drifted. Now the pipette will not move the volume you set.", state:{drift:-7}}]},
        {prompt:"Attach a tip.", done:"Attached the tip firmly", why:"A firm tip seals well.", state:{tip:"firm"},
          choices:[{label:"Press the tip on firmly", ok:true}, {label:"Rest the tip on loosely", title:"Loose tip", text:"A loose tip can leak or fall off. Then the volume is wrong. Press the tip on firmly.", state:{tip:"loose", fill:.4, drip:true}}]},
        {prompt:"Before the tip goes into the liquid, press the plunger:", done:"Pressed to the first stop", why:"The first stop measures the volume you set.", state:{plunger:1},
          choices:[{label:"To the first stop", ok:true}, {label:"To the second stop", title:"Second stop before drawing up", text:"Pressing to the second stop before drawing up pulls in too much liquid. Press to the first stop to draw up.", state:{plunger:2, fill:1}}]},
        {prompt:"Put the tip into the liquid:", done:"Put the tip just below the surface", why:"Only the inside of the tip holds liquid.",
          choices:[{label:"Just below the surface", ok:true}, {label:"Deep, all the way down", title:"Tip too deep", text:"With the tip too deep, liquid sticks to the outside of the tip. That extra liquid goes into the new tube too.", state:{plunger:1, drip:true}}]},
        {prompt:"Draw up the liquid:", done:"Released the plunger slowly", why:"A slow release pulls in just the right amount.", state:{plunger:0, fill:1},
          choices:[{label:"Release the plunger slowly", ok:true}, {label:"Let the plunger snap back fast", title:"Released too fast", text:"Releasing too fast makes liquid shoot up into the pipette. Release slowly.", state:{plunger:0, inside:true, fill:.6}}]},
        {prompt:"Move to the new tube. To dispense, press the plunger:", done:"Pressed to the second stop to dispense", why:"The second stop pushes out all the liquid.", state:{plunger:2, fill:0},
          choices:[{label:"To the second stop", ok:true}]},
        {prompt:"All the liquid is out. Next:", done:"Ejected the tip", why:"Use a new tip for the next sample.", state:{plunger:0, tip:"none"},
          choices:[{label:"Eject the tip", ok:true}]}
      ]},
    {sim:"predictor", title:"Plate predictor", prompt:"Pick the cells and a plate. Predict growth and glow. Then tap Check.",
      why:{
        tet:"pGLO only carries ampicillin resistance (bla). Tetracycline kills these cells, with or without pGLO.",
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
