class SchedulerEngine {
  constructor(){
    this.nextUnitOfWork = null;
  }

  jobSingleRunner = (job, currentRoot) => job(this.nextUnitOfWork, currentRoot);

  jobMultipleRunner(job, currentRoot){
    function jobHelper(deadline){
      let shouldYield = false
      while(this.nextUnitOfWork && !shouldYield){
        this.nextUnitOfWork = this.jobSingleRunner(
          job,
          currentRoot
        )
        shouldYield = deadline.timeRemaining() < 1
      }
  
      requestIdleCallback(jobHelper.bind(this));
    }
    requestIdleCallback(jobHelper.bind(this));
  }

  setNextUnitOfWork(fiber){
    this.nextUnitOfWork = fiber;
  }
}

module.exports = SchedulerEngine