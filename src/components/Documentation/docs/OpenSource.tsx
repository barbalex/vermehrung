import dokuStyles from '../index.module.css'

export const OpenSource = () => (
  <>
    <h1>Open Source</h1>
    <p className={dokuStyles.dokuDate}>15.06.2019</p>
    <p>
      vermehrung.ch wird von{' '}
      <a
        href="//gabriel-software.ch"
        target="_blank"
        rel="noreferrer"
      >
        Gabriel-Software
      </a>{' '}
      für die{' '}
      <a
        href="//naturschutz.zh.ch"
        target="_blank"
        rel="noreferrer"
      >
        Fachstelle Naturschutz des Kantons Zürich
      </a>{' '}
      entwickelt und soll im Rahmen des{' '}
      <a
        href="//www.zh.ch/de/umwelt-tiere/naturschutz/artenschutz.html"
        target="_blank"
        rel="noreferrer"
      >
        Aktionsplans Flora
      </a>{' '}
      eingesetzt werden.
      <br />
    </p>
    <p>
      Der Code ist{' '}
      <a
        href="//github.com/barbalex/vermehrung/blob/master/LICENSE"
        target="_blank"
        rel="noreferrer"
      >
        open source
      </a>
      . Es steht allen frei, ihn zu kopieren und die App selber zu betreiben.
      <br />
    </p>
    <p>
      Es ist vorgesehen, dass auf vermehrung.ch weitere Projekte aufgeschaltet
      werden können. Interessiert? Melden Sie sich bei{' '}
      <a
        href="mailto:alex@gabriel-software.ch"
        target="_blank"
        rel="noreferrer"
      >
        Alex
      </a>
      .
    </p>
  </>
)
