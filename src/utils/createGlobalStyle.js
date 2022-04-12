import { createGlobalStyle } from 'styled-components'

const createGlobalStyleModule = () => createGlobalStyle`
  html {
    overflow: hidden !important;
  }

  #___gatsby{
  /* works in firefox, not yet in chrome. https://caniuse.com/?search=scrollbar-color */
  scrollbar-color: #4a148c rgba(0, 0, 0, 0.4);}

  /*
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
    #___gatsby,
    #___gatsby>div {
      background-color: white !important;
      margin: 0 !important;
      padding: 0 !important;
      height: auto !important;
      width: auto !important;
      overflow: visible !important;
      
    }
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
    box-shadow: inset 0 0 7px rgba(0, 0, 0, 0.4);
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 2px;
    -webkit-box-shadow: inset 0 0 7px #4a148c;
    box-shadow: inset 0 0 7px #4a148c;
    background: rgba(85, 85, 85, 0.05);
  }

  ::-webkit-scrollbar-corner {
    background: rgba(0, 0, 0, 0);
  }

  /* uploadcare */
  .uploadcare--button {
    background-color: #4a148c !important;
    background: #4a148c !important;
    border: 1px solid #4a148c !important;
    color: white !important;
  }
  .uploadcare--button:focus {
    outline: 2px solid rgba(74,20,140,.5) !important;
  }
  .uploadcare--button:hover {
    background: rgba(74,20,140,.8) !important;
    border-color: rgba(74,20,140,.8) !important;
    color: white !important;
  }
  .uploadcare--widget__button,
  .uploadcare--widget__button:active,
  .uploadcare--widget__button:focus {
    background:none !important;
    color: black !important;
    outline: none !important;
  }
  .uploadcare--widget__button,
  .uploadcare--widget__button:focus {
    color: #4a148c !important;
    font-size: 0.875rem !important;
    line-height: 24.5px !important;
    font-weight: 500 !important;
    border-radius: 4px !important;
    padding: 5px 16px !important;
  }
  .uploadcare--widget__button:hover {
    color: #4a148c !important;
    font-size: 0.875rem !important;
    line-height: 24.5px !important;
    font-weight: 500 !important;
    background-color: rgba(74, 20, 140, 0.08) !important;
  }
  .uploadcare--powered-by, .uploadcare--powered-by__link {
    display: none !important;
  }
`

export default createGlobalStyleModule
