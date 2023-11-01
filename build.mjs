import * as fs from "fs";

const src = "./src";

function build(target, dist) {
  const ts = fs.readFileSync(`${src}/${target}`, { encoding: "utf8" });
  const transformed = ts
    .split("\n")
    .map((line) =>
      line.startsWith("///") ? line.replace(/\/\/\/\s*/, "") : line
    )
    .join("\n");
  fs.mkdirSync(dist, { recursive: true });
  const dst = `${dist}/${target.replace(/.ts$/, ".md")}`;
  fs.writeFileSync(dst, transformed);
  console.log(`[success build] ${dst}`);
}

function main() {
  try {
    const { dist } = JSON.parse(
      fs.readFileSync("./config.json", { encoding: "utf8" })
    );

    if (!dist) {
      console.error("The `dist` key in the `config.json` is required.");
      return;
    }

    fs.readdirSync(src).forEach((x) => build(x, dist));
  } catch (e) {
    console.error(e);
    console.error("Failed to parse ./config.json.");
  }
}

main();
