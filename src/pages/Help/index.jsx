import { useContext } from "react";
import Logo from "../../components/Logo";
import SectionTitle from "../../components/SectionTitle";
import "./styles/Help.css";
import { ThemeContext } from "../../context/ThemeContext";
import { Link } from "react-router-dom";

function Help() {
  const { theme } = useContext(ThemeContext);

  return (
    <main className="help">
      <Logo />
      <SectionTitle title="Guia" icon="nrk:media-programguide"/>
      <section className="help__steps content">
        <section className="help__steps__step">
          <SectionTitle title="Passo 1" icon="ic:twotone-flag" />
          <p className={`help__steps__step__text c-${theme}`}>
            Fazer uma cópia da{" "}
            <Link
              target="_blank"
              to="https://docs.google.com/spreadsheets/d/1QIL-vKp9TTjrRNj-Z2_Wrkc9sRtZaxm9uk54dcA1Lhw/edit?usp=sharing"
              className="help__steps__step__text__link"
            >
              Planilha do Google
            </Link>
            .
          </p>
          <span className={`c-${theme}-1 help__steps__step__guide`}>
            {"(Arquivo > Fazer uma cópia)"}
          </span>
        </section>
        <section className="help__steps__step">
          <SectionTitle title="Passo 2" icon="ant-design:form-outlined" />
          <p className={`help__steps__step__text c-${theme}`}>
            Preencha a planilha com os seus dados iniciais.
          </p>
          <span className={`c-${theme}-1 help__steps__step__guide`}>
            {"(Saldo Inicial e o que se aplicar)"}
          </span>
        </section>
        <section className="help__steps__step">
          <SectionTitle title="Passo 3" icon="hugeicons:file-script" />
          <p className={`help__steps__step__text c-${theme}`}>
            Ainda na planilha, configure o AppScript (somente pelo computador).
          </p>
          <span className={`c-${theme}-1 help__steps__step__guide`}>
            {"(Extensões > Apps Script)"}
          </span>
        </section>
        <section className="help__steps__step">
          <SectionTitle title="Passo 4" icon="material-symbols:deployed-code-outline" />
          <p className={`help__steps__step__text c-${theme}`}>Na tela do Apps Script, faça o deploy.</p>
          <span className={`c-${theme}-1 help__steps__step__guide`}>
            {"(Implantar > Nova implantação > Implantar)"}
          </span>
        </section>
        <section className="help__steps__step">
          <SectionTitle title="Passo 5" icon="ic:twotone-lock" />
          <p className={`help__steps__step__text c-${theme}`}>
            Autorize o Apps Script (caso necessário). "O app da Web exige que
            você autorize o acesso aos seus dados."
          </p>
          <span className={`c-${theme}-1 help__steps__step__guide`}>
            {"(Autorizar Acesso > Advanced > Go to DB Manager (unsafe))"}
          </span>
        </section>
        <section className="help__steps__step">
          <SectionTitle title="Passo 6" icon="ph:key-duotone" />
          <p className={`help__steps__step__text c-${theme}`}>
            Obtenha seu login. Após autorizar, você será redirecionado para a tela de nova implantação, então copie a URL App da Web. Esse é seu Login.
          </p>
          <span className={`c-${theme}-1 help__steps__step__guide`}>
            {"App da Web"}
          </span>
        </section>
      </section>
    </main>
  );
}

export default Help;
