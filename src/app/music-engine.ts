import { Soundfont } from "smplr";
import { Grid, makeGrid, maskGrids, toggleGrid } from "./grid";

// Pentatonic scale
const SCALE = [61, 63, 66, 68, 70, 73, 75, 78, 80, 82] as const;

export class MusicEngine {
  private grid: Grid<boolean>;
  private soundFonts: Record<string, Soundfont>;

  constructor(bar_count: number, pitch_count: number) {
    this.grid = makeGrid(bar_count, pitch_count, () => false);
    this.soundFonts = {};
  }

  public toggle(bar: number, pitch: number) {
    toggleGrid(this.grid, bar, pitch);
  }

  public play(currBar: number, context: AudioContext) {
    // Check if context is in suspended state (autoplay policy)
    // if (context.state === "suspended") {
    //   context.resume();
    // }
    Object.values(this.soundFonts).forEach((soundFont) => soundFont.stop());
    const toPlayList = maskGrids(this.grid, this.grid, currBar);
    for (const toPlay of toPlayList) {
      const { pitch } = toPlay;
      if (!this.soundFonts[pitch]) {
        this.soundFonts[pitch] = new Soundfont(context, {
          instrument: "marimba",
        });
      }
      this.soundFonts[pitch].start({ note: SCALE[pitch], velocity: 80 });
    }
  }
}
