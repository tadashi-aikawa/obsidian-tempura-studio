import * as tempura from "obsidian-tempura/src/functions";

declare global {
  namespace tp {
    namespace user {
      const fryTempura: () => typeof tempura;
    }
  }
}
