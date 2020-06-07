export const StepStatus = {
  COMPLETED: 'completed',
  REJECTED: 'rejected',
  NEW: 'new',
};

export const getStepStatus = function(instance) {
  if (!instance.completed && !instance.rejected) {
    return StepStatus.NEW;
  }

  const completionTime = Date.parse(instance.completed) || -1;
  const rejectionTime = Date.parse(instance.rejected) || -1;

  if (completionTime > rejectionTime) {
    return StepStatus.COMPLETED;
  }

  return StepStatus.REJECTED;
}

export const isActionRequired = function(instance) {
  const stepStatus = getStepStatus(instance);
  return stepStatus === StepStatus.NEW || stepStatus === StepStatus.REJECTED;
}

export const nextStepRequiringAction = function(deliverable) {
  if (!deliverable) {
    return undefined;
  }

  const stepsById = {};
  deliverable.workflow.steps.forEach(template => {
    stepsById[template.id] = template;
  });

  const nextStepInstance = deliverable.workflow_data.find(instance => {
    return isActionRequired(instance);
  });

  return Object.assign({}, stepsById[nextStepInstance.step.id], nextStepInstance);
}
