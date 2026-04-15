export function playNotificationSound() {
  // 1. Web Audio APIを利用するためのベースとなるAudioContextを作成する
  const ctx = new AudioContext();
  // 2. 音を発生させるためのオシレーター（発振器）を作成する
  const osc = ctx.createOscillator();
  // 3. 音量をコントロールするためのゲイン（音量調整ノード）を作成する
  const gain = ctx.createGain();
  // 4. 音の発生源（オシレーター）を、音量調整ノード（ゲイン）に繋ぐ
  osc.connect(gain);
  // 5. 音量調整ノードを、最終的な出力先（PCやスマホのスピーカー）に繋ぐ
  gain.connect(ctx.destination);
  // 6. 音の高さを 830Hz に設定する（「ポーン」という少し高めの音）
  osc.frequency.value = 830;
  // 7. 音の波形を「正弦波（sine wave）」に設定する（丸みのある、柔らかいピー音）
  osc.type = 'sine';
  // 8. 音が鳴り始める瞬間の音量（ゲイン）を 0.3（30%の音量）に設定する
  gain.gain.setValueAtTime(0.3, ctx.currentTime);
  // 9. 音が鳴り始めてから 0.8秒後 に向けて、音量を 0.01 まで滑らか（指数関数的）に減衰させる（フェードアウト効果）
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);
  // 10. 全ての設定が完了したので、オシレーターを今すぐ（ctx.currentTime）に再生開始する
  osc.start(ctx.currentTime);
  // 11. 0.8秒後にオシレーターの再生を完全に停止させる（音が鳴り終わる）
  osc.stop(ctx.currentTime + 0.8);
}

export function sendNotification(title: string, body: string) {
  if (Notification.permission === 'granted') {
    new Notification(title, { body });
  }
}
