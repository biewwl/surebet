import Betano from "../assets/betano.webp";
import Betfair from "../assets/betfair.png";
import Bet365 from "../assets/bet365.png";
import Superbet from "../assets/superbet.png";
import KTO from "../assets/kto.png";
import Pinnacle from "../assets/pinnacle.png";
import EstrelaBet from "../assets/estrelabet.webp";
import SportingBet from "../assets/sportingbet.png";
import Novibet from "../assets/novibet.png";
import CassinoBet from "../assets/cassinobet.png";
import ApostaGanha from "../assets/apostaganha.png";
import Bet7k from "../assets/bet7k.png";
import VeraBet from "../assets/verabet.jpeg";
import BetNacional from "../assets/betnacional.png";
import McGames from "../assets/mcgames.png";
import ApostaTudo from "../assets/apostatudo.png";
import ReiDoPitaco from "../assets/reidopitaco.png";

export const getLogo = (name) => {
  const betName = name.toLowerCase();

  switch (betName) {
    case "betano":
      return { logo: Betano, site: "https://www.betano.bet.br" };
    case "betfair":
      return { logo: Betfair, site: "https://www.betfair.bet.br/apostas/" };
    case "bet365":
      return { logo: Bet365, site: "https://www.bet365.bet.br/#/HO/" };
    case "superbet":
      return { logo: Superbet, site: "https://superbet.bet.br/" };
    case "kto":
      return { logo: KTO, site: "https://www.kto.bet.br/esportes/" };
    case "pinnacle":
      return { logo: Pinnacle, site: "https://pinnacle.bet.br/sportsbook" };
    case "estrelabet":
      return {
        logo: EstrelaBet,
        site: "https://www.estrelabet.bet.br/pb/esportes#/overview",
      };
    case "sportingbet":
      return {
        logo: SportingBet,
        site: "https://sports.sportingbet.bet.br/pt-br/sports",
      };
    case "novibet":
      return {
        logo: Novibet,
        site: "https://www.novibet.bet.br/apostas-esportivas",
      };
    case "cassinobet":
      return { logo: CassinoBet, site: "https://cassino.bet.br/sports" };
    case "apostaganha":
      return { logo: ApostaGanha, site: "https://apostaganha.bet.br/esportes" };
    case "bet7k":
      return { logo: Bet7k, site: "https://7k.bet.br/sports" };
    case "verabet":
      return { logo: VeraBet, site: "https://vera.bet.br/sports" };
    case "betnacional":
      return { logo: BetNacional, site: "https://betnacional.bet.br/" };
    case "mcgames":
      return { logo: McGames, site: "https://mcgames.bet.br/sports" };
    case "apostatudo":
      return { logo: ApostaTudo, site: "https://apostatudo.bet.br/sports" };
    case "reidopitaco":
      return { logo: ReiDoPitaco, site: "https://reidopitaco.bet.br/betting" };
    default:
      return "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.haworth.com%2Fna%2Fen%2Fdesign-resources%2Fsurfaces%2Fsurface%2F7R_10.html&psig=AOvVaw0PpMxq6uN3m6WOHGIrfK-L&ust=1740688082859000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOi0t8iW4osDFQAAAAAdAAAAABAE";
    // break;
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
  ApostaGanha,
  CassinoBet,
  Bet7k,
  VeraBet,
  BetNacional,
  McGames,
  ApostaTudo,
  ReiDoPitaco
};
