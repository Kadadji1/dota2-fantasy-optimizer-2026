export type MainEventTeam = "TEAM VISION" | "Nigma Galaxy" | "Team Liquid" | "Team Falcons" | "Team Yandex" | "Team Spirit" | "BoomBoys" | "Iron Wing";
export type PlacementOdds = Record<"1" | "2" | "3" | "4" | "5-6" | "7-8", number>;

export const mainEventTeams: Array<{ team: MainEventTeam; calculatorName: string; record: string; games: string }> = [
  {team:"TEAM VISION",calculatorName:"Team Vision",record:"4–0",games:"8–2"},{team:"Nigma Galaxy",calculatorName:"Nigma Galaxy",record:"4–1",games:"8–2"},
  {team:"Team Liquid",calculatorName:"Team Liquid",record:"4–1",games:"9–5"},{team:"Iron Wing",calculatorName:"Iron Wing",record:"4–2",games:"10–6"},
  {team:"Team Falcons",calculatorName:"Team Falcons",record:"4–2",games:"10–7"},{team:"Team Spirit",calculatorName:"Team Spirit",record:"4–2",games:"8–6"},
  {team:"Team Yandex",calculatorName:"Team Yandex",record:"3–3",games:"9–8"},{team:"BoomBoys",calculatorName:"BoomBoys",record:"3–3",games:"7–7"}
];

export const balancedMainEvent = {
  odds: {"TEAM VISION":43,"Team Liquid":12,"Iron Wing":10,"Team Falcons":9.3,"Team Yandex":8,"Nigma Galaxy":6.2,"Team Spirit":6,"BoomBoys":5.3} as Record<MainEventTeam,number>,
  placements: {
    "TEAM VISION":{"1":43,"2":16,"3":11,"4":8.6,"5-6":13,"7-8":8.7},"Team Liquid":{"1":12,"2":16,"3":15,"4":12,"5-6":24,"7-8":20},
    "Iron Wing":{"1":10,"2":13,"3":13,"4":15,"5-6":27,"7-8":22},"Team Falcons":{"1":9.3,"2":14,"3":14,"4":12,"5-6":26,"7-8":24},
    "Team Yandex":{"1":8,"2":12,"3":13,"4":12,"5-6":27,"7-8":28},"Nigma Galaxy":{"1":6.2,"2":11,"3":13,"4":13,"5-6":28,"7-8":28},
    "Team Spirit":{"1":6,"2":9.1,"3":11,"4":13,"5-6":29,"7-8":31},"BoomBoys":{"1":5.3,"2":8,"3":9.2,"4":14,"5-6":26,"7-8":38}
  } as Record<MainEventTeam,PlacementOdds>,
  maps: {"TEAM VISION":11.1,"Team Liquid":9.5,"Iron Wing":9.2,"Team Falcons":9.1,"Team Yandex":8.8,"Nigma Galaxy":8.6,"Team Spirit":8.4,"BoomBoys":8} as Record<MainEventTeam,number>
};

export function getMatchThresholds(team: MainEventTeam) {
  const placement = balancedMainEvent.placements[team];
  return {
    twoPlus: 100,
    threePlus: placement["1"]+placement["2"]+placement["3"]+placement["4"]+placement["5-6"],
    fourPlus: placement["1"]+placement["2"]+placement["3"]+placement["4"]
  };
}
