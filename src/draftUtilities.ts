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
  qbCount: number;
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
  const NUM_TEAMS = 10;
  const EARLY_ROUND_THRESHOLD = 4;
  const MAX_QBS_PER_TEAM = 2;
  let teams: Team[] = [];

  for (let i = 0; i < NUM_TEAMS; i++) {
    teams.push({ name: `Team_${i + 1}`, players: [], qbCount: 0 });
  }

  const players = await getPlayers();

  // Sort players by their season average projection, descending
  players.sort((a, b) => b.pctOwned - a.pctOwned);

  const rounds = players.length / NUM_TEAMS;
  for (let round = 0; round < rounds; round++) {
    let teamOrder = [...Array(NUM_TEAMS).keys()];
    if (round % 2 !== 0) teamOrder.reverse();

    for (let teamIndex of teamOrder) {
      let team = teams[teamIndex];

      // Find next best player, considering QB constraints
      let playerIndex = players.findIndex((player) => {
        if (player.drafted) return false;
        if (player.mainPos === "QB") {
          // Avoid drafting QB in early rounds and limit QBs per team
          return (
            round >= EARLY_ROUND_THRESHOLD && team.qbCount < MAX_QBS_PER_TEAM
          );
        }
        return true;
      });

      if (playerIndex !== -1) {
        let player = players[playerIndex];
        player.drafted = true;
        team.players.push(player);
        if (player.mainPos === "QB") team.qbCount++;
      }
    }
  }
  console.log(teams);
  return teams;
}
