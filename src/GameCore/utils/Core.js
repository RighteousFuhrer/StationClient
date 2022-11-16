export default class Core {
  timeout;
  start(runnable, delay) {
    (function loop() {
      setTimeout(() => {
        
        runnable();
        loop();
      }, delay/700);

    })();
  }

  stop() {
    this.timeout = clearInterval();
  }
}
