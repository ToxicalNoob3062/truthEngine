class Node<T> {
  constructor(public data: T, public next: Node<T> | null = null) {}
}

export default class Queue<T> {
  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;

  enqueue(data: T): void {
    const node = new Node(data);

    if (!this.head || !this.tail) {
      this.head = this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
  }

  dequeue(): T | undefined {
    if (!this.head) return undefined;

    const data = this.head.data;
    this.head = this.head.next;
    if (!this.head) this.tail = null;

    return data;
  }

  isEmpty(): boolean {
    return !this.head;
  }

  peek(): T | undefined {
    return this.head && this.head.data;
  }
  clear(): void {
    this.head = null;
    this.tail = null;
  }
}
