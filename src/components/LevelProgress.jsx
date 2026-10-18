
import {
  calculateXP,
  calculateLevel,
  calculateLevelProgress
} from "../Utils/calculations";

export default function LevelProgress({ transactions, balanceLabel }) {
  const xp = calculateXP(transactions);
  const level = calculateLevel(xp);
  const progress = calculateLevelProgress(xp);

  return (
    <section className="level-bar" aria-label="Player level progress">
      <span>✦ LEVEL {String(level).padStart(2, "0")}</span>

      <div
        className="xp-track"
        role="progressbar"
        aria-label="Progress to next level"
        aria-valuenow={progress.currentXP}
        aria-valuemin="0"
        aria-valuemax={progress.xpNeeded}
      >
        <span style={{ width: `${progress.percentage}%` }} />
      </div>

      <span>
        {progress.currentXP}/{progress.xpNeeded} XP
      </span>

      <span className="coin-count">
        🟡 {balanceLabel}
      </span>
    </section>
  );
}
