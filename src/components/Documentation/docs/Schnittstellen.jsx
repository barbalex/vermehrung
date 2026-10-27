import dokuStyles from '../index.module.css'

export const Schnittstellen = () => (
  <>
    <h1>Schnittstellen</h1>
    <p className={dokuStyles.dokuDate}>15.06.2019</p>
    <p>
      Brauchen Sie in anderen Anwendungen Zugriff auf Ihre Daten in
      vermehrung.ch? vermehrung.ch verfügt über eine öffentliche{' '}
      <a href="//postgrest.org" target="_blank" rel="noreferrer">
        PostgREST
      </a>
      -Schnittstelle.
      <br />
    </p>
    <p>
      Diese Schnittstelle wird auch von vermehrung.ch selber benutzt.
      <br />
    </p>
    <p>
      Für mehr Informationen wenden Sie sich an{' '}
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
