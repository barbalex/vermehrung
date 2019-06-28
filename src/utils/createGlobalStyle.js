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

  /* uploadcare */
  .uploadcare--button {
    background-color: #4a148c;
    background: #4a148c;
    border: 1px solid #4a148c;
    color: white;
  }
  .uploadcare--button:focus {
    color: #4a148c;
    outline: 2px solid rgba(74,20,140,.5);
  }
  .uploadcare--button:hover {
    background: rgba(74,20,140,.8);
    border-color: rgba(74,20,140,.8);
    color: white;
  }
  .uploadcare--widget__button,
  .uploadcare--widget__button:active,
  .uploadcare--widget__button:focus {
    background:none;
    color: black;
    border: 1px solid black;
    outline: none;
  }
  .uploadcare--widget__button,
  .uploadcare--widget__button:focus {
    color: #4a148c;
    font-size: 0.875rem;
    line-height: 24.5px;
    font-weight: 500;
    border: 1px solid rgba(74, 20, 140, 0.5);
    border-radius: 4px;
    padding: 5px 16px;
  }
  .uploadcare--widget__button:hover {
    color: #4a148c;
    font-size: 0.875rem;
    line-height: 24.5px;
    font-weight: 500;
    border: 1px solid #4a148c;
    background-color: rgba(74, 20, 140, 0.08);
  }
`
