const {
  EFFECT_TAG_DELETION
} = require('./effects');
const {
  createFiberInsert,
  createFiberUpdate,
} = require('./fiberHelpers');

function reconcilerChildren(workInProgressFiber, elements){
  let oldFiber = 
    workInProgressFiber.alternate && workInProgressFiber.alternate.child;
  let prevSibling = null;
  const isFirst = (index) => index == 0

  elements.forEach((element, index) => {
    let newFiber = null
    const sameType = 
      oldFiber && element && element.type === oldFiber.type;
    if (sameType) {
      newFiber = createFiberUpdate(oldFiber, element, workInProgressFiber)
    }

    if (element && !sameType) {
      newFiber = createFiberInsert(element, workInProgressFiber)
    }

    if (oldFiber && !sameType) {
      oldFiber.effectTag = EFFECT_TAG_DELETION
      workInProgressFiber.effects = workInProgressFiber.effects || []
      workInProgressFiber.effects.push(oldFiber);
    }

    if(isFirst(index)){
      workInProgressFiber.child = newFiber
    } else {
      prevSibling.sibling = newFiber
    }

    prevSibling = newFiber
    if(oldFiber) {
      oldFiber = oldFiber.sibling;
    }
  });
}

module.exports = {
  reconcilerChildren,
}