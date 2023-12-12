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

export async function draftFantasyTeams(
  leagueSize: number,
  pickPreference: string
): Promise<Team[]> {
  const NUM_TEAMS = leagueSize;
  const NUM_ROUNDS = 16;
  const positionPreferences = {
    1: ["RB", "WR", "TE", "QB"],
    2: ["RB", "WR", "RB", "WR"],
    3: ["TE", "TE", "RB", "WR"],
    4: ["WR", "RB", "WR", "RB"],
    5: ["QB", "QB", "QB", "TE"],
    6: ["WR", "RB", "WR", "RB"],
    7: ["RB", "WR", "RB", "RB"],
    8: ["WR", "TE", "WR", "WR"],
    9: ["QB", "RB", "TE", "QB"],
    10: ["TE", "RB", "QB", "WR"],
    11: ["WR", "WR", "WR", "TE"],
    12: ["RB", "RB", "RB", "RB"],
    13: ["RB", "WR", "WR", "WR"],
    14: ["WR", "QB", "RB", "RB"],
    15: ["D/ST", "K", "D/ST", "K"],
    16: ["K", "D/ST", "K", "D/ST"],
  };

  const PICK_PREFERENCE = positionPreferences[1].indexOf(pickPreference);

  let teams: Team[] = [];

  for (let i = 0; i < NUM_TEAMS; i++) {
    teams.push({
      name: `Team_${i + 1}`,
      players: [],
    });
  }

  const players = await getPlayers();

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
        return preferredPositions[PICK_PREFERENCE] === player.mainPos;
      });

      if (playerIndex === -1) {
        playerIndex = players.findIndex(
          (player) =>
            !player.drafted &&
            preferredPositions[PICK_PREFERENCE] === player.mainPos
        );
      }

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
