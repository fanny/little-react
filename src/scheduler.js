const { createDom } = require("./reactDomComponent");
const { commitRoot } = require("./commit");
const { reconcilerChildren } = require("./reconciler");

function workLoop(
  workInProgressRoot,
  deletions,
  nextUnitOfWork,
  currentRoot
) {
  return function workLoopHelper(deadline){
    let shouldYield = false
    while(nextUnitOfWork && !shouldYield){
      nextUnitOfWork = performUnitOfWork(nextUnitOfWork, deletions)
      shouldYield = deadline.timeRemaining() < 1
    }

    if(!nextUnitOfWork && workInProgressRoot){
      commitRoot(workInProgressRoot, deletions, currentRoot)
    }
    requestIdleCallback(workLoopHelper);
  }
}

function performUnitOfWork(fiber, deletions) {
  const isFunctionComponent = 
    fiber.type instanceof Function
  
  if(isFunctionComponent) {
    updateFunctionComponent(fiber, deletions);
  } else{
    updateHostComponent(fiber, deletions)
  }

  if (fiber.child) {
    return fiber.child
  }
  let nextFiber = fiber
  while(nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }
    nextFiber = nextFiber.parent
  }
}

function updateFunctionComponent(fiber, deletions) {
  const children = [fiber.type(fiber.props)]
  reconcilerChildren(fiber, children, deletions)
}

function updateHostComponent(fiber, deletions) {
  if(!fiber.dom){
    fiber.dom = createDom(fiber);
  }

  reconcilerChildren(
    fiber, 
    fiber.props.children, 
    deletions
  );
}

module.exports = {
  workLoop,
}

