
const SettingButton = ({children = null, onClick = () => {}}) => {
  return <button onClick = {onClick} className = "w-full flex justify-between items-center p-2">
    {children}
  </button>
}



const SettingCard = ({children = null}) => {

return <div>
    <div className = " my-8">
    <h1 className = " text-4xl lato">Settings</h1>
  <p className = "text-base">Adjust themes, and Manage your account, to your preferences
</p>
  </div>
  <div className = "space-y-4">
      {
    children
  }
  </div>
</div>
}

SettingCard.NewOption = ({label = "", children = null}) => {
  
  return <div className = "backdrop-brightness-50 rounded-lg py-3 px-6">
    <p className = "font-bold text-lg my-3">{label}</p>
    <div className = "flex flex-col gap-1 items-start divide-y-1">
      {children}
    </div>
  </div>
}

SettingCard.ThemeColor = () => {
  return <SettingButton>
              <button>Dark Mode</button>
          <button>On</button>
  </SettingButton>
}

SettingCard.ChangeName = () => {
  return <SettingButton>
    <button>Change Name</button>
  </SettingButton>
}

SettingCard.ChangeAvatar = () => {
  return <SettingButton>
    <button>Change Avatar</button>
  </SettingButton>
}

SettingCard.HideDesigns = () => {
  return (
    <SettingButton>
            <button>Hide Designs</button>
      <button>On
      </button>
    </SettingButton>
    )
}

SettingCard.Email = ({user = {}}) => {
  return (
    <SettingButton>
      <input type = "email" readOnly value = "parissrowlet@gmail.com" /> 
      <p className = "text-sm">Verified</p>
    </SettingButton>
    )
}

SettingCard.Logout = ({onClick = () => {}}) => {
  return <SettingButton>
    <button className = "text-red-400">Logout</button>
  </SettingButton>
}

SettingCard.ChangePassword = ({user = {}}) => {
  return <SettingButton>
    <p>Security</p> 
    <button className = "text-sm">Change Password</button>
  </SettingButton>
}

export default SettingCard