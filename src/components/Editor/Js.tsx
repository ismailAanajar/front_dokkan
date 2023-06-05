import { useEffect } from 'react';

function Js({ htmlString }:{htmlString:string}) {
  const srcs:any[] = [];
  useEffect(() => {
    if(!htmlString) return;
   document.querySelectorAll('script.hello').forEach(sc=>sc.remove()) 
   document.querySelectorAll('link.hello').forEach(sc=>sc.remove()) 
   srcs.forEach(it => clearTimeout(it)) 
   var scripts = htmlString.match(/<script\b[^>]*>([\s\S]*?)<\/script>/gi);
    if (scripts) {
      
      scripts.forEach(function (script) {

        var srcMatch = script.match(/src="([^"]+)"/i);
        if (srcMatch) {
          var src = srcMatch[1];
          var scriptEl = document.createElement("script");
          scriptEl.src = src;
          scriptEl.onload = function() {
            // loadedCount++;
          };
          document.head.appendChild(scriptEl);
        } else {
          
          var scriptEl = document.createElement("script");
          scriptEl.className = 'hello'
          scriptEl.textContent = script.replace(/<\/?script>/g, "");
          // srcs.push(scriptEl)
          const t = setTimeout(() => {
            document.body.appendChild(scriptEl);
          }, 2000);
          srcs.push(t)
        }
      });
    } 
    var links = htmlString.match(/<link\b[^>]*>/gi);
    if (links) {
        links.forEach(function (link) {
          var hrefMatch = link.match(/href="([^"]+)"/i);
          if (hrefMatch) {
            var href = hrefMatch[1];
            var linkEl = document.createElement("link");
            linkEl.rel = "stylesheet";
            linkEl.href = href;
            linkEl.className = 'hello';
            document.head.appendChild(linkEl);
          }
          // jsCode = jsCode.replace(link, "");
        });
    }

  
  return () => {
    srcs.forEach(it => clearTimeout(it)) 
    setTimeout(() => {
      document.querySelectorAll('script.hello').forEach(sc=>sc.remove()) 
      document.querySelectorAll('link.hello').forEach(sc=>sc.remove()) 
      console.log();
    }, 3000); 
    
    
  }
  
  }, []);

  return (
    <div>
      {/* your component's content */}
    </div>
  );
}

export default Js