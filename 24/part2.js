import _ from "lodash";
import {init} from "z3-solver";
const { Context } = await init();
const { Solver, Int, And, Real, Eq, BitVec } = new Context('main');

const main = async (input) => {
    input = input
        .replaceAll("\r", "")
        .split("\n")
        .filter((line) => line.trim() !== "");

    const data = input.map((line) => {
        const [positions, velocity] = line.split("@");
        const [px, py, pz] = positions.split(",").map((x) => parseInt(x.trim()));
        const [vx, vy, vz] = velocity.split(",").map((x) => parseInt(x.trim()));

        return {px, py, pz, vx, vy, vz};
    });

    const s = new Solver();
    let rx = Real.const("rx");
    let ry = Real.const("ry");
    let rz = Real.const("rz");
    let rvx = Real.const("rvx");
    let rvy = Real.const("rvy");
    let rvz = Real.const("rvz");

    for (let i = 0; i < 3; i++) {
        let {px, py, pz, vx, vy, vz} = data[i];
        let t = Real.const("t" + i);
        px = Real.val(px);
        py = Real.val(py);
        pz = Real.val(pz);
        vx = Real.val(vx);
        vy = Real.val(vy);
        vz = Real.val(vz);

        s.add(t.ge(0));
        s.add(Eq(rx.add(rvx.mul(t)), px.add(t.mul(vx))));
        s.add(Eq(ry.add(rvy.mul(t)), py.add(t.mul(vy))));
        s.add(Eq(rz.add(rvz.mul(t)), pz.add(t.mul(vz))));
    }

    console.log(await s.check());
    const m = s.model();
    console.log(m.eval(rx.add(ry.add(rz))).asString());
};

export default main;
