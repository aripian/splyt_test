async function retryFailures(targetFunction, retries) {
  for (let i = 0; i < retries; i++) {
    try {
      return await targetFunction(retries);
    } catch (error) {
      console.log("Got exception: ", error);
    }
  }

  throw error;
}

function createTargetFunction(succeedsOnAttempt) {
	let attempt = 0;
	return async () => {
		if (++attempt === succeedsOnAttempt) {
			console.log('this is hit')
			return attempt;
		}
		throw Object.assign(new Error(`failure`), { attempt });
	};
}

// Examples
// succeeds on attempt number 3
retryFailures(createTargetFunction(3), 5).then((attempt) => {
	console.assert(attempt === 3);
});
//fails on attempt number 2 and throws last error
retryFailures(createTargetFunction(3), 2).then(() => {
	throw new Error('should not succeed');
	}, (e) => {
		console.assert(e.attempt === 2);
});
// succeeds
retryFailures(createTargetFunction(10), 10).then((attempt) => {
	console.assert(attempt === 10);
});