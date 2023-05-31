function Css({cssString}:{cssString:string}) {
  const styleEl = document.createElement('style');
  styleEl.textContent = cssString;
  document.head.appendChild(styleEl);

  return null
}

export default Css;