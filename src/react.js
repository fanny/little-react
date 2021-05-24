function createElement(type, props, ...children){
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === "object" ? child : createTextElement(child) // primitive values are treated as text
      )
    }
  }
}

function createTextElement(text){
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: []
    }
  }
}

module.exports = {
  createElement,
}

// Usage: 
// const element = React.createElement(
//     "h1", 
//     {title: "foo"},
//     "Hello");

