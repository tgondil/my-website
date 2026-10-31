export type MathNote = {
  title: string;
  evidence: string;
  calculation: string[];
  result: string;
  assumption: string;
};

export const mathNotes: Record<string, MathNote> = {
  teeth: {
    title: "How much overkill pays",
    evidence: "My save records 10 Ouroboros deaths. Its base 1/1 therefore becomes 11/11 before other modifiers.",
    calculation: ["Essay example: max(0, 7 − 2) = 5 teeth", "With my 11-attack Ouroboros: max(0, 11 − 2) = 9 teeth"],
    result: "If I only need two more damage, an unblocked 11-damage hit would earn nine teeth.",
    assumption: "A worked scenario using the saved death counter, not a recorded battle. Assumes one unblocked hit, no damage modifiers, and two damage left to win.",
  },
  dilution: {
    title: "Three pelts in a thirteen-card deck",
    evidence: "Archived run 4 finished with 13 cards, including one Ouroboros and three Rabbit Pelts; it is marked completed.",
    calculation: ["Draw Ouroboros: 1/13 = 7.69%", "Remove the three pelts: 1/10 = 10.00%", "Relative increase: (10% ÷ 7.69%) − 1 = 30%"],
    result: "Removing those three non-target cards would improve a single uniform draw’s chance of finding Ouroboros by 2.31 percentage points.",
    assumption: "Counterfactual using the archived deck as a fresh draw pool. Actual probabilities depend on the cards remaining. This is not the game’s fair-hand opening draw or a claim that the pelts caused a loss.",
  },
  fire: {
    title: "Removal also has a measurable benefit",
    evidence: "Archived run 7 has 12 cards, one of them an unmodified Kingfisher, alongside the Wolf I would rather draw.",
    calculation: ["Draw the Wolf before removal: 1/12 = 8.33%", "Draw the Wolf after removal: 1/11 = 9.09%", "Gain: 0.76 percentage points"],
    result: "If a fire removes that Kingfisher, the remaining deck draws the Wolf more often. If the Kingfisher survives and improves, it still occupies a draw.",
    assumption: "A counterfactual, not a recorded campfire outcome. No survival probability is inferred: Act I fire risk varies with the attempt. Losing a useful card can outweigh this consistency gain.",
  },
  futureFires: {
    title: "How many future upgrades can I use?",
    evidence: "Archived run 3 contains a Ring Worm, but its survivorsDead flag is false. The save does not establish a successful poisoning.",
    calculation: ["Illustrative route: 3 later fires × 1 extra safe +1 attack buff = +3 attack", "With only 1 such fire left: 1 × 1 = +1 attack"],
    result: "The same early sacrifice can enable more total upgrades when more suitable fires remain.",
    assumption: "Hypothetical routes, assuming the worm is eaten and each later fire offers an additional attack buff. Not every fire boosts attack, and the saved run does not tell us those future outcomes.",
  },
  bears: {
    title: "My saved Wolf already clears the threshold",
    evidence: "Archived run 7 has Scissors and a Wolf with a duplicate-merge modifier of +3 attack and +2 health: base 3/2 becomes 6/4.",
    calculation: ["Wolf: (3 + 3)/(2 + 2) = 6/4", "Balanced scale: 5 direct damage needed", "Cut the front bear → 6 direct damage ≥ 5", "Excess: 6 − 5 = 1 tooth"],
    result: "That saved combination has enough damage to win through one cleared lane before the reserve bear advances.",
    assumption: "The save proves I owned both, not that I used them against bears. Requires the Wolf to be drawn, paid for and placed in the cleared lane, with no earlier attack effects changing the setup.",
  },
  threshold: {
    title: "Four to five changes the outcome",
    evidence: "My run 7 Wolf reached six attack through a merge; its normal three-attack form illustrates how upgrades approach the five-damage threshold.",
    calculation: ["4 direct damage < 5: the fight continues", "5 direct damage = 5: immediate win", "6 direct damage = 5 + 1: win plus one tooth"],
    result: "One extra attack can turn a loss into a win; the next point may only increase the payout.",
    assumption: "Balanced scale, one cleared lane, and no other damage. These are comparison states, not three saved versions of this Wolf.",
  },
  access: {
    title: "Owning it versus drawing it",
    evidence: "Archived run 7 has one merged Wolf in a 12-card deck and a free Unkillable deathcard.",
    calculation: ["One uniform draw: 1/12 = 8.33% chance of Wolf", "Three draws without replacement: 3/12 = 25%", "Wolf’s cost: 2 blood = 2 ordinary sacrifice bodies"],
    result: "The six attack only matters once I have the Wolf and can pay for it; damage and access are separate requirements.",
    assumption: "Draw examples start from the full archived deck and exclude fair-hand rules and tutoring. A single Unkillable creature cannot be sacrificed twice within one payment.",
  },
  geck: {
    title: "The Geck I actually kept",
    evidence: "Archived run 7 contains a free 1/1 Geck with Unkillable and Bifurcated Strike. The sigil IDs were checked against the installed game assembly.",
    calculation: ["Play cost = 0 blood", "Sacrifice it once → 1 blood toward a play + 1 bone", "Unkillable returns it; replay cost = 0", "Two unblocked side lanes: 1 + 1 = 2 damage"],
    result: "It can keep supplying a body across successive plays, and its two strikes make an attack upgrade worth up to two extra damage per attack phase.",
    assumption: "Requires an open slot and a valid sacrifice target each time. Blood is paid per play, not banked; this one body cannot pay a two-blood cost alone. Bifurcated Strike hits only adjacent lanes.",
  },
  slots: {
    title: "Free bodies still need board space",
    evidence: "Run 7’s Unkillable Geck returns when sacrificed. Run 4 instead has a Geck with Fecundity, which creates a copy on play in Act I.",
    calculation: ["Board capacity: 4 creatures", "Four ordinary 1-attack bodies: at most 4 direct damage", "Sacrifice 1 body → occupy that slot with the purchased creature", "Replay the returned Geck only if another slot is open"],
    result: "Repeatability removes the cost of replacing the Geck, but it does not remove the four-slot limit or guarantee an infinite loop.",
    assumption: "The four-damage example uses ordinary single strikes; the saved Bifurcated Geck has different attack geometry. The two Geck variants come from different archived runs.",
  },
  kingfisher: {
    title: "The bird survives while I lose ground",
    evidence: "Archived run 7 includes an unmodified 1/1 Kingfisher. Its second Geck also carries Flying and Waterborne, but costs zero blood instead of one.",
    calculation: ["Kingfisher hits directly for 1", "Opposing 3-attack creature hits me for 3", "Full exchange: +1 − 3 = −2 on the scale", "At 3 attack instead: +3 − 3 = 0"],
    result: "Keeping the bird alive is not enough to win this damage race; raising its attack changes the arithmetic but consumes upgrades.",
    assumption: "Hypothetical opponent with no anti-air or other relevant sigils; assume neither attack ends the fight before the exchange completes. The saved second Geck has the same defensive drawback.",
  },
  rareTrial: {
    title: "A rare card somewhere is not a guarantee",
    evidence: "Run 7’s 12-card deck contains three rare cards: two Gecks and an Amalgam.",
    calculation: ["Three-card samples: C(12,3) = 220", "Samples without a rare: C(9,3) = 84", "P(at least one rare) = 1 − 84/220 = 61.82%"],
    result: "That deck would pass the Trial of Rarity in 61.82% of uniform three-card samples, not every sample.",
    assumption: "Calculation over the archived deck, sampled without replacement; not a replay of the actual seeded trial. Deathcards are not counted as rare cards.",
  },
  peltTrial: {
    title: "The pelts’ best statistical defense",
    evidence: "Run 4 has three Rabbit Pelts among thirteen cards, including one merged pelt; a merge does not make it two cards in the draw pool.",
    calculation: ["All samples: C(13,3) = 286", "No-pelt samples: C(10,3) = 120", "P(at least one pelt) = 1 − 120/286 = 58.04%"],
    result: "Those same three pelts that dilute Ouroboros would give a 58.04% chance of passing a uniform three-card Trial of Skins.",
    assumption: "Uses the archived deck as the trial pool. The save does not identify which trial produced each boon, so this is a probability calculation, not the recorded result.",
  },
  tutor: {
    title: "Choosing the draw removes this uncertainty",
    evidence: "Run 7 records the TutorDraw boon and a single merged Wolf in twelve cards. TutorDraw is the Boon of the Magpie’s Eye.",
    calculation: ["Uniform draw from that pool: P(Wolf) = 1/12 = 8.33%", "Choose Wolf while it remains in the deck: P(Wolf) = 100%"],
    result: "The boon can make access to the desired card certain on that draw, while the card’s blood cost still has to be paid.",
    assumption: "Conditional on the Wolf still being in the deck and a draw affected by the boon. This does not guarantee a winning opening hand or a complete combo.",
  },
  ouroboros: {
    title: "Ten saved deaths, ten permanent +1s",
    evidence: "The save’s persistent Ouroboros death counter is 10. Archived runs 3, 4 and 6 include Ouroboros.",
    calculation: ["Base stats: 1/1", "After 10 deaths: (1 + 10)/(1 + 10) = 11/11", "After 3 more deaths: (11 + 3)/(11 + 3) = 14/14"],
    result: "Three additional deaths would add three attack and three health, increasing an otherwise identical finishing hit by three damage.",
    assumption: "The counter is current save-wide progress; it does not reveal the stats at each historical run’s end. Further deaths require a payable, safe loop; these are baseline stats before other modifiers.",
  },
  deathcard: {
    title: "The free deathcard is already in my save",
    evidence: "My saved deathcard ‘avi big man’ is a free 1/1 with Unkillable; ‘tanky g’ is 4/6 for two blood with Bifurcated Strike and Unkillable.",
    calculation: ["Saved free card: 1/1, 0 blood", "Saved larger card: 4/6, 2 blood", "Hypothetical combination: current Ouroboros 11/11 + free cost + Unkillable"],
    result: "The save demonstrates that a useful sigil can survive on a zero-cost deathcard; the 11/11 version would be a possible build only if the right components are offered.",
    assumption: "No 11/11 deathcard exists in this save. The save records resulting cards, not which donor supplied each component or the odds of future offers.",
  },
};

// Sentence positions keep the essay’s wording intact; the explanations are optional.
export const sentenceNotes: Record<number, Record<number, string>> = {
  0: {0:"teeth",1:"teeth"}, 1:{0:"dilution"}, 3:{1:"dilution"},
  7:{0:"dilution",1:"dilution"}, 8:{0:"fire"}, 9:{0:"fire",1:"fire"},
  10:{0:"futureFires",1:"futureFires"}, 11:{0:"fire"},
  13:{0:"bears"}, 14:{1:"threshold"}, 15:{0:"access",1:"access"},
  18:{0:"geck",1:"geck"}, 19:{0:"slots",1:"slots"}, 20:{0:"slots"},
  21:{0:"kingfisher"}, 22:{0:"kingfisher",1:"kingfisher"}, 23:{0:"kingfisher"},24:{0:"geck"},
  25:{0:"rareTrial",1:"rareTrial"}, 26:{0:"peltTrial"}, 27:{0:"rareTrial",1:"rareTrial"},
  28:{0:"tutor"}, 29:{0:"ouroboros"}, 30:{0:"ouroboros",1:"ouroboros"},
  31:{0:"deathcard",1:"deathcard"},32:{0:"deathcard"},
};
