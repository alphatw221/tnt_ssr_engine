const htmlToReactPropMap = {
  class: "className",
  for: "htmlFor",
  readonly: "readOnly",
  maxlength: "maxLength",
  minlength: "minLength",
  tabindex: "tabIndex",
  colspan: "colSpan",
  rowspan: "rowSpan",
  enctype: "encType",
  autoplay: "autoPlay",
  autofocus: "autoFocus",
  spellcheck: "spellCheck",
  crossorigin: "crossOrigin",
  srcset: "srcSet",
  novalidate: "noValidate",
  playsinline: "playsInline",
  datetime: "dateTime"
  // 可自行擴充
};

export function htmlStyleToReactStyle(styleString) {
  const style = {};

  // Step 1: 暫時將 url(...) 的內容替換為佔位符
  const urlMatches = [];

  const safeStyleString = styleString?.replace?.(/url\(([^)]+)\)/g, (_, urlContent) => {
    const placeholder = `__URL_${urlMatches.length}__`;
    urlMatches.push(urlContent.trim());
    return placeholder;
  });

  // Step 2: 分割處理每個樣式項目
  safeStyleString.split(';').forEach(rule => {
    if (!rule.trim()) return;
    const [prop, ...valueParts] = rule.split(':');
    const value = valueParts.join(':'); // 防止值中也有冒號
    if (!prop || !value) return;

    if (prop?.startsWith("--")){
      style[prop] = value.trim();
    }else{
      const camelProp = prop.trim().replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
      let cleanedValue = value.trim();

      // 將佔位符還原為原始 URL
      const restoredValue = cleanedValue.replace(/__URL_(\d+)__/g, (_, index) => `url(${urlMatches[index]})`);

      style[camelProp] = restoredValue;
    }
    
  });

  return style;
}

export function convertToReactProps(htmlProps = {}) {
  const reactProps = {};

  for (const key in htmlProps) {
    const reactKey = htmlToReactPropMap[key.toLowerCase()] || key;

    if(key=='style'){
      const styleValue = htmlProps[key];
      reactProps[reactKey] = typeof styleValue === 'string'
        ? htmlStyleToReactStyle(styleValue)
        : styleValue;
    }else{
      reactProps[reactKey] = htmlProps[key];
    }
    
  }

  return reactProps;
}