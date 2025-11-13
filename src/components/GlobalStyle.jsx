import { Global, css } from '@emotion/react'

export const GlobalStyle = () => (
  <Global
    styles={css`
   * on mobile titles are invisible
   * make them appear on press
   * source: https://stackoverflow.com/a/60660207/712005 
  */
      @media (pointer: coarse), (hover: none) {
        [title] {
          position: relative;
          display: inline-flex;
          justify-content: center;
        }
        [title]:focus::after {
          content: attr(title);
          position: absolute;
          top: 90%;
          color: #000;
          background-color: rgba(255, 255, 255, 0.8);
          border: 1px solid;
          width: fit-content;
          padding: 3px;
          font-size: 0.6em;
        }
      }

      @media print {
        /*
    * hide everything BUT what shall be printed
    */
        body * {
          visibility: hidden;
        }

        .printer-content,
        .printer-content * {
          visibility: visible !important;
        }

        .printer-content {
          position: absolute;
          left: 0;
          top: 0;
        }

        /**
    * ensure html and body
    * have no margins, no padding,
    * grow and overflow as needed
      necessary as hidden?
    */
        html,
        body,
        #root,
        #root > div {
          background-color: white !important;
          margin: 0 !important;
          padding: 0 !important;
          height: auto !important;
          width: auto !important;
          overflow: visible !important;
        }
      }


    `}
  />
)
