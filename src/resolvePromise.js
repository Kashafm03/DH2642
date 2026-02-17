export function resolvePromise(prms, promiseState) {
  if (!prms) {
      promiseState.promise = null;
      promiseState.status = "idle";
      promiseState.data = null;
      promiseState.error = null;
      return;
  }

  promiseState.promise = prms;
  promiseState.status = "pending";
  promiseState.data = null;
  promiseState.error = null;

  prms
      .then(function (result) {
          if (promiseState.promise === prms) {
              promiseState.status = "resolved";
              promiseState.data = result;
          }
      })
      .catch(function (error) {
          if (promiseState.promise === prms) {
              promiseState.status = "rejected";
              promiseState.error = error;
          }
      });
}
