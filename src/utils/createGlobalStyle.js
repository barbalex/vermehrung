import { createGlobalStyle } from 'styled-components'

export default () => createGlobalStyle`
  html {
    overflow: hidden !important;
  }

  /* scrollbars */

  ::-webkit-scrollbar {
    width: 12px;
    background: rgba(255, 253, 231, 0.1);
  }

  ::-webkit-scrollbar:horizontal {
    height: 12px;
  }

  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 7px rgba(0, 0, 0, 0.4);
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 2px;
    -webkit-box-shadow: inset 0 0 7px rgba(0, 0, 0, 0.5);
    background: rgba(85, 85, 85, 0.05);
  }

  ::-webkit-scrollbar-corner {
    background: rgba(0, 0, 0, 0);
  }
`
