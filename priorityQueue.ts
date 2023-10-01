export default class PriorityQueue<T> {
  private heap: { priority: number; item: T }[] = [];

  public enqueue(item: T, priority: number): void {
    this.heap.push({ item, priority });
    this.heap.sort((a, b) => a.priority - b.priority);
  }

  public dequeue(): T | undefined {
    const value = this.heap.shift();
    return value ? value.item : undefined;
  }

  public isEmpty(): boolean {
    return this.heap.length === 0;
  }
  public size(): number {
    return this.heap.length;
  }
}
