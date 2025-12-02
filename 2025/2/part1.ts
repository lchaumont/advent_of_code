const main = (input: string) => {
    const lines: string[] = input
        .replaceAll("\r", "")
        .split(",")
        .filter((line: string) => line.trim() !== "");

    let answer = 0;

    for (const line of lines) {
        const [l, r] = line.split("-");
        
        const ll = l.length;
        const rl = r.length;

        if (ll % 2 === 1 && rl % 2 === 1) continue;

        const sl = l.substring(0, Math.max(1, Math.floor(ll / 2)));
        const sr = r.substring(0, Math.ceil(rl / 2));

        const nl = parseInt(l);
        const nr = parseInt(r);
        const snl = parseInt(sl);
        const snr = parseInt(sr);

        for (let i = snl; i <= snr; i++) {
            const toTest = parseInt(String(i) + String(i));
            if (toTest >= nl && toTest <= nr) {
                answer += toTest;
            }
        }
    }

    // 38310256125

    return answer;
};

export default main;