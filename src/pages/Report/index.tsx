import './index.css';

export default function Report() {
  // ローディング状態のUIを確認する場合はこちらをコメントイン:
  // return (
  //   <div className="report-page">
  //     <div className="report-loading">
  //       <div className="spinner" />
  //     </div>
  //   </div>
  // );

  return (
    <div className="report-page">
      <h1 className="report-title">レポート</h1>

      {/* Weekly Summary */}
      <div className="report-summary">
        <div className="summary-card">
          <span className="summary-label">今週の合計集中時間</span>
          <span className="summary-value">2h 30m</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">期間</span>
          <span className="summary-value summary-date">
            2026-04-09 〜 2026-04-15
          </span>
        </div>
      </div>

      <div className="report-grid">
        {/* Bar Chart */}
        <div className="report-card">
          <h2 className="card-heading">曜日別集中時間</h2>
          {/* chart.js を削除したためグラフは非表示（ライブラリ追加後に Bar コンポーネントを復元してください） */}
          <div className="chart-container" />
        </div>

        {/* Doughnut Chart */}
        <div className="report-card">
          <h2 className="card-heading">タスク別集中時間</h2>
          {/* chart.js を削除したためグラフは非表示（ライブラリ追加後に Doughnut コンポーネントを復元してください） */}
          <div className="chart-container" />
          {/* データなし状態のUIを確認する場合はコメントイン: */}
          {/* <p className="empty-message">データがありません</p> */}
        </div>
      </div>

      {/* Heatmap */}
      <div className="report-card heatmap-card">
        <h2 className="card-heading">集中カレンダー（直近90日）</h2>
        <div className="heatmap-wrapper">
          <div className="heatmap-day-labels">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(
              (label, i) => (
                <span key={i} className="heatmap-day-label">
                  {label}
                </span>
              ),
            )}
          </div>
          <div className="heatmap-grid">
            {/* Week 1 */}
            <div className="heatmap-column">
              <div className="heatmap-cell" style={{ backgroundColor: 'var(--heatmap-empty)' }} title="2026-03-16: 0m" />
              <div className="heatmap-cell" style={{ backgroundColor: 'var(--heatmap-level1)' }} title="2026-03-17: 20m" />
              <div className="heatmap-cell" style={{ backgroundColor: 'var(--heatmap-level2)' }} title="2026-03-18: 45m" />
              <div className="heatmap-cell" style={{ backgroundColor: 'var(--heatmap-level3)' }} title="2026-03-19: 90m" />
              <div className="heatmap-cell" style={{ backgroundColor: 'var(--heatmap-level4)' }} title="2026-03-20: 150m" />
              <div className="heatmap-cell" style={{ backgroundColor: 'var(--heatmap-empty)' }} title="2026-03-21: 0m" />
              <div className="heatmap-cell" style={{ backgroundColor: 'var(--heatmap-level2)' }} title="2026-03-22: 60m" />
            </div>
            {/* Week 2 */}
            <div className="heatmap-column">
              <div className="heatmap-cell" style={{ backgroundColor: 'var(--heatmap-level1)' }} title="2026-03-23: 25m" />
              <div className="heatmap-cell" style={{ backgroundColor: 'var(--heatmap-level3)' }} title="2026-03-24: 100m" />
              <div className="heatmap-cell" style={{ backgroundColor: 'var(--heatmap-empty)' }} title="2026-03-25: 0m" />
              <div className="heatmap-cell" style={{ backgroundColor: 'var(--heatmap-level2)' }} title="2026-03-26: 50m" />
              <div className="heatmap-cell" style={{ backgroundColor: 'var(--heatmap-level4)' }} title="2026-03-27: 200m" />
              <div className="heatmap-cell" style={{ backgroundColor: 'var(--heatmap-level1)' }} title="2026-03-28: 15m" />
              <div className="heatmap-cell" style={{ backgroundColor: 'var(--heatmap-empty)' }} title="2026-03-29: 0m" />
            </div>
            {/* Week 3 */}
            <div className="heatmap-column">
              <div className="heatmap-cell" style={{ backgroundColor: 'var(--heatmap-level2)' }} title="2026-03-30: 55m" />
              <div className="heatmap-cell" style={{ backgroundColor: 'var(--heatmap-level1)' }} title="2026-03-31: 25m" />
              <div className="heatmap-cell" style={{ backgroundColor: 'var(--heatmap-level3)' }} title="2026-04-01: 75m" />
              <div className="heatmap-cell" style={{ backgroundColor: 'var(--heatmap-level4)' }} title="2026-04-02: 130m" />
              <div className="heatmap-cell" style={{ backgroundColor: 'var(--heatmap-level2)' }} title="2026-04-03: 50m" />
              <div className="heatmap-cell" style={{ backgroundColor: 'var(--heatmap-empty)' }} title="2026-04-04: 0m" />
              <div className="heatmap-cell" style={{ backgroundColor: 'var(--heatmap-level1)' }} title="2026-04-05: 20m" />
            </div>
            {/* Week 4 */}
            <div className="heatmap-column">
              <div className="heatmap-cell" style={{ backgroundColor: 'var(--heatmap-level3)' }} title="2026-04-06: 80m" />
              <div className="heatmap-cell" style={{ backgroundColor: 'var(--heatmap-level4)' }} title="2026-04-07: 150m" />
              <div className="heatmap-cell" style={{ backgroundColor: 'var(--heatmap-level2)' }} title="2026-04-08: 45m" />
              <div className="heatmap-cell" style={{ backgroundColor: 'var(--heatmap-level1)' }} title="2026-04-09: 25m" />
              <div className="heatmap-cell" style={{ backgroundColor: 'var(--heatmap-level3)' }} title="2026-04-10: 90m" />
              <div className="heatmap-cell" style={{ backgroundColor: 'var(--heatmap-empty)' }} title="2026-04-11: 0m" />
              <div className="heatmap-cell" style={{ backgroundColor: 'var(--heatmap-level2)' }} title="2026-04-12: 60m" />
            </div>
            {/* Week 5 (current week) */}
            <div className="heatmap-column">
              <div className="heatmap-cell" style={{ backgroundColor: 'var(--heatmap-level2)' }} title="2026-04-13: 50m" />
              <div className="heatmap-cell" style={{ backgroundColor: 'var(--heatmap-level4)' }} title="2026-04-14: 150m" />
              <div className="heatmap-cell" style={{ backgroundColor: 'var(--heatmap-level1)' }} title="2026-04-15: 25m" />
              <div className="heatmap-cell" style={{ backgroundColor: 'var(--heatmap-empty)' }} title="2026-04-16: 0m" />
              <div className="heatmap-cell" style={{ backgroundColor: 'var(--heatmap-empty)' }} title="2026-04-17: 0m" />
              <div className="heatmap-cell" style={{ backgroundColor: 'var(--heatmap-empty)' }} title="2026-04-18: 0m" />
              <div className="heatmap-cell" style={{ backgroundColor: 'var(--heatmap-empty)' }} title="2026-04-19: 0m" />
            </div>
          </div>
        </div>
        <div className="heatmap-legend">
          <span className="heatmap-legend-label">少</span>
          <div
            className="heatmap-legend-cell"
            style={{ backgroundColor: 'var(--heatmap-empty)' }}
          />
          <div
            className="heatmap-legend-cell"
            style={{ backgroundColor: 'var(--heatmap-level1)' }}
          />
          <div
            className="heatmap-legend-cell"
            style={{ backgroundColor: 'var(--heatmap-level2)' }}
          />
          <div
            className="heatmap-legend-cell"
            style={{ backgroundColor: 'var(--heatmap-level3)' }}
          />
          <div
            className="heatmap-legend-cell"
            style={{ backgroundColor: 'var(--heatmap-level4)' }}
          />
          <span className="heatmap-legend-label">多</span>
        </div>
      </div>
    </div>
  );
}
