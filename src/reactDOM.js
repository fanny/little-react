const reactDom = require("./reactDOMComponent");
const { createSchedulerEngineInstance, getSchedulerEngineInstance } = require("./reactSchedulerEngine");
const { performUnitOfWork } = require("./fiberWorkUnit");

let currentRoot = null
let workInProgressRoot = null

createSchedulerEngineInstance();

function render(element, container){
  workInProgressRoot = {
    dom: container,
    props: {
      children: [element]
    },
    alternate: currentRoot,
    effects: [] //old-fiber
  }
  
  const scheduler = getSchedulerEngineInstance();
  scheduler.setNextUnitOfWork(workInProgressRoot);
  scheduler.jobMultipleRunner(performUnitOfWork, currentRoot);
}

module.exports = {
  ...reactDom,
  render
}