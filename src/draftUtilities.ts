import { Client } from "espn-fantasy-football-api/node";
import { promises as fsPromises } from "fs";

export interface Player {
  name: string;
  team: string;
  mainPos: string;
  allPos: string[];
  injured: boolean;
  curAvgPts: number;
  sznAvgProj: number;
  pctOwned: number;
  pctStarted: number;
  drafted: boolean;
}

export interface Team {
  name: string;
  players: Player[];
}

async function getPlayers(): Promise<Player[]> {
  try {
    const data = await fsPromises.readFile("./data/players.json", "utf8");
    const playersData = JSON.parse(data);
    return playersData.items as Player[];
  } catch (error) {
    console.error("Error reading players data:", error);
    return [];
  }
}

export async function draftFantasyTeams(): Promise<Team[]> {
  const myClient = new Client({
    leagueId: 141523808,
    espnS2:
      "AEA3woMTskPN%2BfGOTpk8I%2FJF%2FBYj%2FAlHqPmEvda%2F6uyDIbiM4px%2FofYLJ5ki3Pt1hsfsL1KeNmEkZSLerfFz1YB1MT%2F2HTWlhOWSTf1SRF18qnTWoyrVQTZa2K12aa9H1U7iHEIvZM0v7nT%2B55ZmDnspsH4RTR9E2CUKg2NZrc%2F2XIV8LKFdZE3r3I2NB754Rk8yZWm2TJYpMc7ykKlEqs%2FS%2Fk1lGH2%2F9AXKBNt9QrAZuURiWBdtmuC8rxjr0TU2vHGB%2BuL5NwNGzkUKhKdqloEI",
    SWID: "{B9C988DA-8EA9-440B-8988-DA8EA9240BB5}",
  });
  console.log(await myClient.getLeagueInfo({ seasonId: 2023 }));
  const leagueInfo = await myClient.getLeagueInfo({ seasonId: 2023 });
  const NUM_TEAMS = leagueInfo.size;
  const NUM_ROUNDS = 16;
  const positionPreferences = {
    1: ["RB", "WR", "TE", "QB"],
    2: ["RB", "WR", "TE", "QB"],
    3: ["TE", "RB", "WR", "QB"],
    4: ["WR", "TE", "QB", "RB"],
    5: ["QB", "WR", "RB", "TE"],
    6: ["WR", "QB", "TE", "RB"],
    7: ["RB", "TE", "WR", "QB"],
    8: ["WR", "RB", "TE", "QB"],
    9: ["QB", "TE", "WR", "RB"],
    10: ["TE", "QB", "RB", "WR"],
    11: ["WR", "RB", "QB", "TE"],
    12: ["RB", "WR", "QB", "TE"],
    13: ["RB", "WR", "TE", "D/ST"],
    14: ["WR", "RB", "D/ST", "K"],
    15: ["D/ST", "K", "RB", "WR"],
    16: ["K", "D/ST", "WR", "RB"],
  };
  let teams: Team[] = [];

  for (let i = 0; i < NUM_TEAMS; i++) {
    teams.push({
      name: `Team_${i + 1}`,
      players: [],
    });
  }

  const players = await getPlayers();

  // Sort players by their season average projection, descending
  players.sort((a, b) => b.sznAvgProj - a.sznAvgProj);

  for (let round = 0; round < NUM_ROUNDS; round++) {
    let teamOrder = [...Array(NUM_TEAMS).keys()];
    if (round % 2 !== 0) teamOrder.reverse();

    for (let teamIndex of teamOrder) {
      let team = teams[teamIndex];
      let preferredPositions = positionPreferences[round + 1];

      // Find next best player based on position preferences
      let playerIndex = players.findIndex((player) => {
        if (player.drafted) return false;
        return preferredPositions[0] === player.mainPos;
      });

      // If no preferred player is available, select the next best available player for the preffered position
      if (playerIndex === -1) {
        playerIndex = players.findIndex(
          (player) =>
            !player.drafted && preferredPositions[0] === player.mainPos
        );
      }

      // If no preferred preferences, just draft the next best player.
      if (playerIndex === -1) {
        playerIndex = players.findIndex((player) => !player.drafted);
      }

      if (playerIndex !== -1) {
        let player = players[playerIndex];
        player.drafted = true;
        team.players.push(player);
      }
    }
  }

  return teams;
}
