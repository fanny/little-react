const reactDom = require("./reactDomComponent");
const { workLoop } = require("./scheduler");

var nextUnitOfWork = null
var currentRoot = null
var workInProgressRoot = null
var deletions = null

function render(element, container){
  workInProgressRoot = {
    dom: container,
    props: {
      children: [element]
    },
    alternate: currentRoot //old-fiber
  }
  deletions = []
  nextUnitOfWork = workInProgressRoot
  requestIdleCallback(
    workLoop(
      workInProgressRoot,
      deletions,
      nextUnitOfWork,
      currentRoot
    )
  );
}

module.exports = {
  ...reactDom,
  render
}