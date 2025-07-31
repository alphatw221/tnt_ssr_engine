export function rgba2hex(r,g,b,a){


  let R = (r||0).toString(16)
  let G = (g||0).toString(16)
  let B = (b||0).toString(16)

  let A = parseInt((a||0) * 255)
  A = A.toString(16)

  if(R.length==1)R="0"+R
  if(G.length==1)G="0"+G
  if(B.length==1)B="0"+B
  if(A.length==1)A="0"+A

  return "#"+R+G+B+A
}

export const getRandomColor = () => {
  // 生成三個隨機的色彩分量值 (RGB)
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  // 將 RGB 轉換為十六進制表示法
  const color = '#' + r.toString(16).padStart(2, '0') +
                       g.toString(16).padStart(2, '0') +
                       b.toString(16).padStart(2, '0');
  
  return color;
}