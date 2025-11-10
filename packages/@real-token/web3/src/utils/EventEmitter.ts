/**
 * Simple EventEmitter implementation for browser environments
 */
export class EventEmitter {
  private events: Record<string, Function[]> = {};

  on(event: string, listener: Function): this {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
    return this;
  }

  emit(event: string, ...args: any[]): boolean {
    if (!this.events[event]) {
      return false;
    }

    this.events[event].forEach((listener) => {
      try {
        listener(...args);
      } catch (error) {
        console.error("Error in event listener:", error);
      }
    });

    return true;
  }

  off(event: string, listener?: Function): this {
    if (!this.events[event]) {
      return this;
    }

    if (!listener) {
      delete this.events[event];
      return this;
    }

    const index = this.events[event].indexOf(listener);
    if (index > -1) {
      this.events[event].splice(index, 1);
    }

    return this;
  }

  removeAllListeners(event?: string): this {
    if (event) {
      delete this.events[event];
    } else {
      this.events = {};
    }
    return this;
  }
}
