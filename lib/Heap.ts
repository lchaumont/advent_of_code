export type ComparatorFunction<V> = (a: V, b: V) => number;
export type ValueExtractorFunction<T, V> = (item: T) => V;

export class Heap<T, V> {
    private heap: T[] = [];
    private compare: ComparatorFunction<V>;
    private extractValue: ValueExtractorFunction<T, V>;

    constructor(compare: ComparatorFunction<V>, extractValue: ValueExtractorFunction<T, V>) {
        this.compare = compare;
        this.extractValue = extractValue;
    }

    insert(element: T): void {
        this.heap.push(element);
        this.heapifyUp();
    }

    extract(): T | undefined {
        const top = this.heap[0];
        const lastElement = this.heap.pop();

        if (this.heap.length > 0 && lastElement !== undefined) {
            this.heap[0] = lastElement;
            this.heapifyDown();
        }

        return top;
    }

    private heapifyUp(): void {
        let currentIndex = this.heap.length - 1;

        while (currentIndex > 0) {
            const parentIndex = Math.floor((currentIndex - 1) / 2);

            if (
                this.compare(this.extractValue(this.heap[currentIndex]), this.extractValue(this.heap[parentIndex])) < 0
            ) {
                [this.heap[currentIndex], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[currentIndex]];
                currentIndex = parentIndex;
            } else {
                break;
            }
        }
    }

    private heapifyDown(): void {
        let currentIndex = 0;

        while (true) {
            const leftChildIndex = 2 * currentIndex + 1;
            const rightChildIndex = 2 * currentIndex + 2;
            let smallestChildIndex = currentIndex;

            if (
                leftChildIndex < this.heap.length &&
                this.compare(
                    this.extractValue(this.heap[leftChildIndex]),
                    this.extractValue(this.heap[smallestChildIndex])
                ) < 0
            ) {
                smallestChildIndex = leftChildIndex;
            }

            if (
                rightChildIndex < this.heap.length &&
                this.compare(
                    this.extractValue(this.heap[rightChildIndex]),
                    this.extractValue(this.heap[smallestChildIndex])
                ) < 0
            ) {
                smallestChildIndex = rightChildIndex;
            }

            if (currentIndex !== smallestChildIndex) {
                [this.heap[currentIndex], this.heap[smallestChildIndex]] = [
                    this.heap[smallestChildIndex],
                    this.heap[currentIndex],
                ];
                currentIndex = smallestChildIndex;
            } else {
                break;
            }
        }
    }

    peek(): T | undefined {
        return this.heap[0];
    }

    size(): number {
        return this.heap.length;
    }

    isEmpty(): boolean {
        return this.heap.length === 0;
    }
}