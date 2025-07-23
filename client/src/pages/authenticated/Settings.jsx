import SettingCard from '../../components/card/SettingCard.jsx';
const Settings = () => {


return <div className = "px-4">
  <SettingCard >
    <SettingCard.NewOption label = "Theme"> 
     <SettingCard.ThemeColor /> 
     <SettingCard.HideDesigns />
    </SettingCard.NewOption>
    <SettingCard.NewOption label = "Account" >
      <SettingCard.Email />
      <SettingCard.ChangePassword />
          <SettingCard.Logout />
    </SettingCard.NewOption>
  </SettingCard>
</div>
}

export default Settings