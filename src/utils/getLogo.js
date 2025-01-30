import Betano from "../assets/betano.png";
import Betfair from "../assets/betfair.png";
import Bet365 from "../assets/bet365.png";
import Superbet from "../assets/superbet.png";
import Kto from "../assets/kto.png";
import Pinnacle from "../assets/pinnacle.png";

export const getLogo = (name) => {
  const [fixedName] = name.split(" |");

  const betName = fixedName.toLowerCase();

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
      return Kto;
    case "pinnacle":
      return Pinnacle;
    default:
      break;
  }
};

export const allLogos = {
  Betano,
  Betfair,
  Bet365,
  Superbet,
  Pinnacle,
};
