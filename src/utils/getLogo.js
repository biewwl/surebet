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
import JogoDeOuro from "../assets/jogodeouro.png";
import Betfast from "../assets/betfast.png";
import UxBet from "../assets/uxbet.png";
import Bateu from "../assets/bateu.jpg";
import EsportivaBet from "../assets/esportivabet.png";
import Br4Bet from "../assets/br4.jpeg";
import VaiDeBet from "../assets/vaidebet.jpeg";
import BetfairExchange from "../assets/betfairexchange.webp";
import Betao from "../assets/betao.jpg";
import Lotogreen from "../assets/lotogreen.jpg";
import Blaze from "../assets/blaze.png";
import SeguroBet from "../assets/segurobet.jpeg";
import CasaDeApostas from "../assets/casadeapostas.png";

export const getLogo = (name) => {
  const betName = name.toLowerCase();

  const firstLetter = betName.charAt(0).toUpperCase();
  const restOfName = betName.slice(1);
  const formattedName = firstLetter + restOfName;

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
    case "jogodeouro":
      return { logo: JogoDeOuro, site: "https://jogodeouro.bet.br/pt/sports" };
    case "betfast":
      return { logo: Betfast, site: "https://betfast.bet.br/br" };
    case "uxbet":
      return { logo: UxBet, site: "https://www.ux.bet.br/home/events-area" };
    case "bateu":
      return { logo: Bateu, site: "https://bateu.bet.br/sports" };
    case "esportivabet":
      return { logo: EsportivaBet, site: "https://esportiva.bet.br/sports" };
    case "br4bet":
      return { logo: Br4Bet, site: "https://br4.bet.br/sports#/overview" };
    case "vaidebet":
      return { logo: VaiDeBet, site: "https://vaidebet.com/ptb/bet/main" };
    case "betfairexchange":
      return {
        logo: BetfairExchange,
        site: "https://www.betfair.bet.br/exchange/plus/",
      };
    case "betao":
      return {
        logo: Betao,
        site: "https://betao.bet.br/pb/sports/pre-match/event-view",
      };
    case "lotogreen":
      return {
        logo: Lotogreen,
        site: "https://lotogreen.bet.br/sports#/overview",
      };
    case "blaze":
      return {
        logo: Blaze,
        site: "https://blaze.bet.br/pt/sports",
      };
    case "segurobet":
      return {
        logo: SeguroBet,
        site: "https://segurobet.bet.br/pt/sports",
      };
    case "casadeapostas":
      return {
        logo: CasaDeApostas,
        site: "https://casadeapostas.bet.br/br/sports",
      };
    default:
      return {
        logo: `https://ui-avatars.com/api/?name=${formattedName}&background=99999925&color=999&uppercase=false`,
        site: "https://www.google.com",
      };
    // break;
  }
};

export const allLogos = {
  Betano,
  Betfair,
  BetfairExchange,
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
  ReiDoPitaco,
  JogoDeOuro,
  Betfast,
  UxBet,
  Bateu,
  EsportivaBet,
  Br4Bet,
  VaiDeBet,
  Betao,
  Lotogreen,
  Blaze,
  SeguroBet,
  CasaDeApostas,
};
