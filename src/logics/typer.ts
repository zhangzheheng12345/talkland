import { ref } from "vue";
import { sleep } from "./showUp";

export const useTyper = (delay: number) => {
  return {
    typer: ref(""),
    typeWords: async function () {
      const words = [
        "Say something...",
        "Wander.",
        "In an alley.",
        "Seventh Avenue.",
      ];
      await sleep(500);
      let i = 0;
      const typeWord = async () => {
        for (let j = 0; j <= words[i].length; j++) {
          this.typer.value = words[i].slice(0, j);
          await sleep(120);
        }
        await sleep(750);
        for (let j = words[i].length; j >= 0; j--) {
          this.typer.value = words[i].slice(0, j);
          await sleep(35);
        }
        await sleep(750);
      };
      while (true) {
        await typeWord();
        i++;
        if (i === words.length) i = 0;
      }
    },
  };
};
