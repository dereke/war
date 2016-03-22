function WarPromise(stepName, cb, previous){
  var self = this;
  this.queue = [];
  this.stepName = stepName;
  function exec(){
    Promise.resolve(cb()).then(function(){
      var i = -1;
      var len = self.queue.length;
      while (++i < len) {
        self.queue[i].resolve();
      }
    }).catch(function(e){
      var i = -1;
      var len = self.queue.length;
      while (++i < len) {
        if (self.queue[i].reject) {
          self.queue[i].reject(e);
        }
      }
    });
  
  }
  if (previous) {
    previous.then(function(){
      exec();
    });
  } else {
    exec();
  }
}

WarPromise.prototype.given = function(stepName, cb){
  return new WarPromise(stepName, cb, this);
}

WarPromise.prototype.when = function(stepName, cb){
  return new WarPromise(stepName, cb, this);
}

WarPromise.prototype.and = function(stepName, cb){
  return new WarPromise(stepName, cb, this);
}

WarPromise.prototype.then = function(onResolve, onReject){
  if (typeof onResolve === 'string') {
    var stepName = onResolve;
    var cb = onReject;
    return new WarPromise(stepName, cb, this);
  } else {
    this.queue.push({ resolve: onResolve, reject: onReject });
    return this;
  }
}

module.exports = function given(stepName, cb){
  return new WarPromise(stepName, cb);
}
