import SettingForm from './SettingForm';
import './index.css';

export default function Settings() {
  // ローディング状態のUIを確認する場合はこちらをコメントイン:
  // return (
  //   <div className="settings-page">
  //     <div className="settings-loading">
  //       <div className="spinner" />
  //     </div>
  //   </div>
  // );

  return (
    <div className="settings-page">
      <div className="settings-container">
        <h1 className="settings-title">設定</h1>
        {/* タイマー動作中のバナーのUIを確認する場合はこちらをコメントイン: */}
        {/* <div className="settings-disabled-banner">
          タイマー動作中は設定を変更できません
        </div> */}
        <SettingForm />
      </div>
    </div>
  );
}
