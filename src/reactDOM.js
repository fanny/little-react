function render(element, container){
  const rootNode = 
    element.type == 'TEXT_ELEMENT'
    ? document.createTextNode('')
    : document.createElement(element.type);
  
  const isProperty = key => key !== 'children';
  Object.keys(element.props)
    .filter(isProperty)
    .forEach(prop => {
      rootNode[prop] = element.props[prop] 
    });

  element.props.children.forEach((child) => render(child, rootNode));
  container.appendChild(rootNode);
}

module.exports = {
  render
}