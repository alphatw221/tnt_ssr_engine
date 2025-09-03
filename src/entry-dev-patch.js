const originalInsert = document.head.appendChild;
document.head.appendChild = function (el) {
  console.log('head append child')
  console.log(el)
  if (el.tagName === 'STYLE') {
    document.head.insertBefore(el, document.head.firstChild);
    return el;
  }
  return originalInsert.call(document.head, el);
}