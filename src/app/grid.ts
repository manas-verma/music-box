import { toInt } from "radash";

export type Grid<T> = {
  grid: T[];
  bar_count: number;
};

export function makeGrid<T>(
  bar_count: number,
  pitch_count: number,
  value: () => T
): Grid<T> {
  const N = bar_count * pitch_count;
  const grid = new Array(N);
  for (let i = 0; i < N; i++) {
    grid[i] = value();
  }
  return {
    grid,
    bar_count,
  };
}

export function toggleGrid(grid: Grid<boolean>, bar: number, pitch: number) {
  const index = bar * grid.bar_count + pitch;
  grid.grid[index] = !grid.grid[index];
}

export function maskGrids<T>(
  grid: Grid<T>,
  mask: Grid<boolean>,
  bar: number
): {
  value: T;
  pitch: number;
}[] {
  const N = grid.grid.length;
  const result: { value: T; pitch: number }[] = [];
  for (let i = 0; i < N; i++) {
    if (i % grid.bar_count !== bar) continue;
    if (!mask.grid[i]) continue;
    result.push({
      value: grid.grid[i],
      pitch: toInt(N / i),
    });
  }
  return result;
}
