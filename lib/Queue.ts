interface IQueue<T> {
    enqueue(item: T): void;
    dequeue(): T | undefined;
    front(): T | undefined;
    isEmpty(): boolean;
    size(): number;
    log(): void;
}

class Node<T> {
    constructor(public data: T, public next: Node<T> | null = null) {}
}

export class Queue<T> implements IQueue<T> {
    private head: Node<T> | null = null;
    private tail: Node<T> | null = null;
    private count: number = 0;

    enqueue(item: T): void {
        const newNode = new Node(item);
        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            if (this.tail) {
                this.tail.next = newNode;
                this.tail = newNode;
            }
        }
        this.count++;
    }

    dequeue(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }

        const removedItem = this.head!.data;
        this.head = this.head!.next;
        this.count--;

        if (this.isEmpty()) {
            this.tail = null;
        }

        return removedItem;
    }

    front(): T | undefined {
        return this.head?.data;
    }

    isEmpty(): boolean {
        return this.count === 0;
    }

    size(): number {
        return this.count;
    }

    log(): void {
        let current = this.head;
        const elements: T[] = [];

        while (current) {
            elements.push(current.data);
            current = current.next;
        }

        console.log("Queue:", elements);
    }
}
