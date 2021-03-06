const { updateDom } = require("./reactDOMComponent")
const {
  EFFECT_TAG_UPDATE,
  EFFECT_TAG_INSERTION,
  EFFECT_TAG_DELETION
} = require('./effects');

function commit(fiber, currentRoot) {
  fiber.effects.forEach(commitWork)
  commitWork(fiber.child)
  currentRoot = fiber
  fiber = null
}

function commitWork(fiber) {
  if(!fiber) {
    return;
  }
  let domParentFiber = fiber.parent
  while(!domParentFiber.dom) { // we need to find a node that has a dom, because of function components
    domParentFiber = domParentFiber.parent
  }
  const domParent = domParentFiber.dom
  if(fiber.effectTag === EFFECT_TAG_INSERTION && fiber.dom != null) {
    domParent.appendChild(fiber.dom);
  } else if(fiber.effectTag === EFFECT_TAG_DELETION) {
    commitDeletion(fiber, domParent);
  } else if(fiber.effectTag === EFFECT_TAG_UPDATE && fiber.dom != null) {
    updateDom(
      fiber.dom, 
      fiber.alternate.props,
      fiber.props
    );
  }

  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

function commitDeletion(fiber, domParent) {
  if (fiber.dom) {
    domParent.removeChild(fiber.dom)
  } else {
    commitDeletion(fiber.child, domParent) // fild the child that isn't a function component
  }
}

module.exports = {
  commit
}