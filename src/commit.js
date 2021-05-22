const { updateDom } = require("./reactDomComponent")

function commitRoot(workInProgressRoot, deletions, currentRoot) {
  debugger;
  deletions.forEach(commitWork)
  commitWork(workInProgressRoot.child)
  currentRoot = workInProgressRoot
  workInProgressRoot = null
}

function commitWork(fiber) {
  if(!fiber) {
    return;
  }
  const domParent = fiber.parent.dom
  if(fiber.effectTag === 'PLACEMENT' &&
    fiber.dom != null
  ) {
    console.log(fiber, domParent);
    domParent.appendChild(fiber.dom);
  } else if(
    fiber.effectTag === 'DELETION'
  ) {
    domParent.removeChild(fiber.dom);
  } else if(
    fiber.effectTag === 'UPDATE' && 
    fiber.dom != null
  ) {
    updateDom(
      fiber.dom, 
      fiber.alternate.props,
      fiber.props
    );
  }

  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

module.exports = {
  commitRoot
}