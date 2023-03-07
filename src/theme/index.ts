

type Template = {
  '--color-primary'?: string | undefined;
  '--color-secondary'?: string;
} 


const themeConfig = (template: Template) => {
  
  for (const key in template) {
    
    document.documentElement.style
    .setProperty(key, template[key! as keyof typeof template] ?? null);
  }
}

export default themeConfig