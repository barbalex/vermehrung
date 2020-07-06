import { createGlobalStyle } from 'styled-components'

export default () => createGlobalStyle`
  html {
    overflow: hidden !important;
  }

  

  /* https://stackoverflow.com/a/60660207/712005 */
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
      background-color: #fff;
      border: 1px solid;
      width: fit-content;
      padding: 3px;
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
  
  @page .hochformat {
    size: A4 portrait;
  }
  @page .querformat {
    size: A4 landscape;
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
    outline: none;
  }
  .uploadcare--widget__button,
  .uploadcare--widget__button:focus {
    color: #4a148c;
    font-size: 0.875rem;
    line-height: 24.5px;
    font-weight: 500;
    border-radius: 4px;
    padding: 5px 16px;
  }
  .uploadcare--widget__button:hover {
    color: #4a148c;
    font-size: 0.875rem;
    line-height: 24.5px;
    font-weight: 500;
    background-color: rgba(74, 20, 140, 0.08);
  }
`
