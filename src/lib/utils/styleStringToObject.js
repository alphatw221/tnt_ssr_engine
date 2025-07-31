export const convertStyleStringToObject = (styleString)=>{
    const styles = styleString?.trim()?.split(';')?.filter(Boolean)||[];
    const styleObject = {};
    
    styles.forEach(style => {
      const [property, value] = style.split(':').map(s => s.trim());
      if (property && value) {
        styleObject[property] = value;
      }
    });
    
    return styleObject;
  }