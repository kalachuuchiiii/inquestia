
const TemplateParams = function(){
  
  this.yesNoMaybe = [{
  question: "", 
  option: "yesNoMaybe", 
  choices: [{
    label: "Yes", 
    value: "yes"
  }, {
    label: "No", 
    value: "no"
  }, {
    label: "Maybe", 
    value: "maybe"
  }]
}]

this.custom = [{
  question: "", 
  option: "custom", 
  choices: []
}]

this.each = [{
  question: "", 
  option: "text", 
  choices: []
}, {
  question: "", 
  option: "yesNoMaybe"
}]

return this;
}

const urls = Object.entries(new TemplateParams()).map(([key, value]) => {
  const searchParams = new URLSearchParams({
    template: value
  })
  return
})

