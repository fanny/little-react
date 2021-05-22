function reconcilerChildren(workInProgressFiber, elements, deletions){
  let index = 0;
  let oldFiber = 
    workInProgressFiber.alternate && workInProgressFiber.alternate.child;
  let prevSibling = null;

  while(index < elements.length || oldFiber != null) {
    const element = elements[index];
    let newFiber = null;

    const sameType = oldFiber && element && element.type === oldFiber.type;

    if (sameType) {
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        parent: workInProgressFiber,
        dom: oldFiber.parent,
        alternate: oldFiber,
        effectTag: 'UPDATE'
      }
    }

    if (element && !sameType) {
      newFiber = {
        type: element.type,
        props: element.props,
        parent: workInProgressFiber,
        dom: null,
        alternate: null,
        effectTag: 'PLACEMENT'
      }
    }

    if (oldFiber && !sameType) {
      oldFiber.effectTag = 'DELETION'
      deletions.push(oldFiber)
    }

    if(oldFiber) {
      oldFiber = oldFiber.sibling;
    }

    if(index === 0){
      workInProgressFiber.child = newFiber
    } else{
      prevSibling.sibling = newFiber
    }

    prevSibling = newFiber
    index++
  }
}

module.exports = {
  reconcilerChildren,
}