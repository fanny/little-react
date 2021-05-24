function createDom(fiber){
  const dom = 
    fiber.type == 'TEXT_ELEMENT'
    ? document.createTextNode('')
    : document.createElement(fiber.type);
  
  updateDom(dom, {}, fiber.props);

  return dom
}

const isEvent = key => key.startsWith('on')
const isProperty = key => 
  key !== 'children' && !isEvent(key)
const isNew = (prev, next) => key =>
  prev[key] !== next[key]
const isGone = (_prev, next) => key => !(key in next)

function updateDom(dom, prevProps, nextProps){
  removeOldEventListeners(dom, prevProps, nextProps)
  removeOldProperties(dom, prevProps, nextProps)
  addProperties(dom, prevProps, nextProps)
  addEventListeners(dom, prevProps, nextProps)
}

function removeOldEventListeners(dom, prevProps, nextProps){
  Object.keys(prevProps)
    .filter(isEvent)
    .filter(
      key =>
        !(key in nextProps) ||
        isNew(prevProps, nextProps)(key)
    )
    .forEach(name => {
      const eventType = name
        .toLowerCase()
        .substring(2)
      dom.removeEventListener(
        eventType,
        prevProps[name]
      )
    })
}

function addEventListeners(dom, prevProps, nextProps){
  Object.keys(nextProps)
  .filter(isEvent)
  .filter(isNew(prevProps, nextProps))
  .forEach(name => {
    const eventType = name
      .toLowerCase()
      .substring(2)
    dom.addEventListener(
      eventType,
      nextProps[name]
    )
  })
}

function removeOldProperties(dom, prevProps, nextProps){
  Object.keys(prevProps)
  .filter(isProperty)
  .filter(isGone(prevProps, nextProps))
  .forEach(name => {
    dom[name] = ""
  })
}

function addProperties(dom, prevProps, nextProps){
  Object.keys(nextProps)
  .filter(isProperty)
  .filter(isNew(prevProps, nextProps))
  .forEach(name => {
    dom[name] = nextProps[name]
  })
}

module.exports = {
  createDom,
  updateDom,
}