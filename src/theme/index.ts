

type Template = {
  '--color-primary': string
} 


const themeConfig = (template: Template) => {
  
  for (const key in template) {
    document.documentElement.style
    .setProperty(key, template[key as keyof typeof template]);
  }
}

export default themeConfig