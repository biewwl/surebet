import Betano from "../assets/betano.png";
import Betfair from "../assets/betfair.png";
import Bet365 from "../assets/bet365.png";
import Superbet from "../assets/superbet.png";
import KTO from "../assets/kto.png";
import Pinnacle from "../assets/pinnacle.png";
import EstrelaBet from "../assets/estrelabet.png";
import SportingBet from "../assets/sportingbet.png";
import Novibet from "../assets/novibet.png";

export const getLogo = (name) => {
  const betName = name.toLowerCase();

  switch (betName) {
    case "betano":
      return Betano;
    case "betfair":
      return Betfair;
    case "bet365":
      return Bet365;
    case "superbet":
      return Superbet;
    case "kto":
      return KTO;
    case "pinnacle":
      return Pinnacle;
    case "estrelabet":
      return EstrelaBet;
    case "sportingbet":
      return SportingBet;
    case "novibet":
      return Novibet;
    default:
      break;
  }
};

export const allLogos = {
  Betano,
  Betfair,
  Bet365,
  Superbet,
  KTO,
  Pinnacle,
  EstrelaBet,
  SportingBet,
  Novibet,
};
