const { createDom } = require("./reactDomComponent");
const { commitRoot } = require("./commit");
const { reconcilerChildren } = require("./reconciler");

function performUnitOfWork(fiber, currentRoot) {
  const isFunctionComponent = 
    fiber.type instanceof Function
  
  if(isFunctionComponent) {
    updateFunctionComponent(fiber)
  } else{
    updateHostComponent(fiber)
  }

  if (fiber.child) {
    return fiber.child
  }

  let nextFiber = fiber
  while(nextFiber) {
    commitRoot(nextFiber, currentRoot)
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }
    nextFiber = nextFiber.parent
  }
}

function updateFunctionComponent(fiber) {
  const children = [fiber.type(fiber.props)]
  reconcilerChildren(fiber, children)
}

function updateHostComponent(fiber) {
  if(!fiber.dom){
    fiber.dom = createDom(fiber);
  }
  reconcilerChildren(fiber, fiber.props.children);
}

module.exports = {
  performUnitOfWork
}

