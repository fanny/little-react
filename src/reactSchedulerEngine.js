const SchedulerEngine = require('./schedulerEngine');

let schedulerEngine = null; // singleton instance

const createSchedulerEngineInstance = () => {
  schedulerEngine = new SchedulerEngine();
}

const getSchedulerEngineInstance = () => {
  if(!schedulerEngine) {
    throw new Error('Missing scheduler engine')
  }

  return schedulerEngine;
}

module.exports = {
  createSchedulerEngineInstance,
  getSchedulerEngineInstance
}