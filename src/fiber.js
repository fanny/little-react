const {
  EFFECT_TAG_UPDATE,
  EFFECT_TAG_INSERTION,
} = require('./effects');


function createFiberInsert(element, workInProgressFiber){
  return {
    type: element.type,
    props: element.props,
    parent: workInProgressFiber,
    dom: null,
    alternate: null,
    effectTag: EFFECT_TAG_INSERTION
  }
}

function createFiberUpdate(oldFiber, element, workInProgressFiber){
  return {
    type: oldFiber.type,
    props: element.props,
    parent: workInProgressFiber,
    dom: oldFiber.parent,
    alternate: oldFiber,
    effectTag: EFFECT_TAG_UPDATE
  }
}

module.exports = {
  createFiberInsert,
  createFiberUpdate,
}