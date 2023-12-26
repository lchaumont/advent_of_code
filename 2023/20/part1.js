import _ from "lodash";

const main = (input) => {
    class Node {
        constructor(data) {
            this.data = data;
            this.next = null;
            this.prev = null;
        }
    }

    class Deque {
        constructor() {
            this.head = null;
            this.tail = null;
            this.size = 0;
        }

        push(data) {
            const node = new Node(data);

            if (!this.head) {
                this.head = node;
                this.tail = node;
            } else {
                this.tail.next = node;
                node.prev = this.tail;
                this.tail = node;
            }

            this.size++;
        }

        shift() {
            if (!this.head) return null;

            const data = this.head.data;

            if (this.head === this.tail) {
                this.head = null;
                this.tail = null;
            } else {
                this.head = this.head.next;
                this.head.prev = null;
            }

            this.size--;

            return data;
        }

        length() {
            return this.size;
        }
    }

    input = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line) => line.trim() !== "");

    const data = {};
    input.forEach((line) => {
        let [name, to] = line.split(" -> ").map((x) => x.trim());
        const firstChar = name.charAt(0);

        let obj = {};

        if (firstChar === "b") {
            obj.type = "broadcaster";
            obj.to = to.split(", ");
        } else if (firstChar === "%") {
            obj.type = "flip-flop";
            obj.name = name.substring(1);
            obj.powered = false;
            obj.to = to.split(", ");
        } else {

            obj.type = "conjunction";
            obj.name = name.substring(1);
            obj.to = to.split(", ");
        }

        data[obj.name] = {
            ...obj,
        };
    });

    Object.values(data).filter((v) => v.type === "conjunction").forEach((c) => {
        c.memoized = new Map();

        Object.values(data).filter((v) => v.to.includes(c.name)).forEach((v) => {
            c.memoized.set(v.name, "low");
        });
    });

    function handleBroadcast(broadcaster, pulse, count) {
        count[pulse] += 1;

        const to = broadcaster.to;
        for (const t of to) {
            queue.push({
                name: t,
                pulse,
                from: broadcaster.name
            })
            count[pulse] += 1;
        }
    }

    function handleFlipFlop(flipflop, pulse, count) {
        if (pulse === "high") return;
        
        flipflop.powered = !flipflop.powered;
        const pulseToSend = flipflop.powered ? "high" : "low";
        const to = flipflop.to;
        for (const t of to) {
            queue.push({
                name: t,
                pulse: pulseToSend,
                from: flipflop.name
            })
            count[pulseToSend] += 1;
        }
    }

    function handleConjunction(conjunction, pulse, from, count, i) {
        conjunction.memoized.set(from, pulse);

        const mapIterator = conjunction.memoized.values();
        let pulseToSend = "low";
        let numberOfLow = 0;
        for (const v of mapIterator) {
            if (v === "low") {
                pulseToSend = "high";
                numberOfLow++;
            }
        }

        const to = conjunction.to;
        for (const t of to) {
            queue.push({
                name: t,
                pulse: pulseToSend,
                from: conjunction.name
            })
            count[pulseToSend] += 1;
        }

        if (conjunction.name === "tj" && numberOfLow !== 4) {
            console.log(i, conjunction.memoized);
        }
    }

    const queue = new Deque();
    const broadcaster = Object.values(data).find((v) => v.type === "broadcaster");
    
    const count = {"low": 0, "high": 0}

    for (let i = 0; i < 100000; i++) {
        handleBroadcast(broadcaster, "low", count);

        let safeLoop = 0;
        const maxSafeLoop = 50000;

        while(queue.length() > 0 && safeLoop < maxSafeLoop) {
            const {name, pulse, from} = queue.shift();
            const node = data[name];

            if (!node) continue;

            if (node.type === "broadcaster") {
                console.error("Broadcaster should not be in queue");
            } else if (node.type === "flip-flop") {
                handleFlipFlop(node, pulse, count);
            } else if (node.type === "conjunction") {
                handleConjunction(node, pulse, from, count, i);
            }
        }

        if (safeLoop === maxSafeLoop) {
            console.log("Max safe loop reached");
            break;
        }
    }

    function gcd(a, b) {
        return (!b) ? a : gcd(b, a % b);
    }
    
    function lcm(...args) {
        return args.reduce((a, b) => (a * b) / gcd(a, b));
    }

    console.log(lcm(3917, 3943, 4057, 3931))

    console.log(count);
};

export default main;
