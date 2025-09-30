import SettingCard from '../../components/card/SettingCard.jsx';
const Settings = () => {


  return (
    <div className="p-2">
      <SettingCard>
        <SettingCard.NewOption label="Account">
          <SettingCard.Theme />
          <SettingCard.Account />
          <SettingCard.ExchangeCenter />
          <SettingCard.Logout />
        </SettingCard.NewOption>
      </SettingCard>
    </div>
  );
}

export default Settings