// OPTCG Auth Gate — add to any page: <script src="optcg_auth.js"></script>
var OPTCG_PW_HASH='1fbf355b58eb7649b1a0cbd5d3b3c576b284c79c480a251200ec398ca4ca87be';

(function(){
  // Check if already authenticated
  try{if(sessionStorage.getItem('optcg_auth')==='1')return;}catch(e){}

  // Hide body
  document.documentElement.style.visibility='hidden';

  document.addEventListener('DOMContentLoaded',function(){
    document.documentElement.style.visibility='hidden';

    // Create overlay
    var ov=document.createElement('div');
    ov.style.cssText='position:fixed;inset:0;background:#0a0e14;z-index:99999;display:flex;align-items:center;justify-content:center;visibility:visible';
    ov.innerHTML='<div style="text-align:center;padding:40px">'
      +'<h2 style="color:#d4a017;font-size:20px;margin-bottom:16px;font-family:-apple-system,sans-serif">\u{1F3F4}\u200D\u2620\uFE0F OPTCG</h2>'
      +'<input id="_pw" type="password" placeholder="Enter password" style="padding:12px 20px;background:#1a2233;border:2px solid #2a3548;border-radius:10px;color:#e0e6f0;font-size:16px;text-align:center;outline:none;width:200px;font-family:-apple-system,sans-serif">'
      +'<div id="_pwerr" style="color:#e74c3c;font-size:12px;margin-top:8px;min-height:20px"></div>'
      +'<p style="color:#7888a0;font-size:12px;margin-top:12px;font-family:-apple-system,sans-serif">Enter password to access</p>'
      +'</div>';
    document.body.appendChild(ov);

    var inp=document.getElementById('_pw');
    inp.focus();
    inp.addEventListener('keydown',function(e){
      if(e.key==='Enter'){
        crypto.subtle.digest('SHA-256',new TextEncoder().encode(inp.value)).then(function(buf){
          var hash=Array.from(new Uint8Array(buf)).map(function(b){return b.toString(16).padStart(2,'0')}).join('');
          if(hash===OPTCG_PW_HASH){
            try{sessionStorage.setItem('optcg_auth','1')}catch(e){}
            ov.remove();
            document.documentElement.style.visibility='visible';
          }else{
            document.getElementById('_pwerr').textContent='Wrong password';
            inp.value='';
          }
        });
      }
    });
  });
})();
