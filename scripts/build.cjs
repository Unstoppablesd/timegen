const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),source=path.join(root,'src'),dist=path.join(root,'dist');
fs.mkdirSync(dist,{recursive:true});
for(const name of fs.readdirSync(source)){if(fs.statSync(path.join(source,name)).isFile())fs.copyFileSync(path.join(source,name),path.join(dist,name))}
let html=fs.readFileSync(path.join(source,'index.html'),'utf8');
html=html.replace('<link rel="stylesheet" href="style.css">',()=>'<style>'+fs.readFileSync(path.join(source,'style.css'),'utf8')+'</style>');
html=html.replace(/<script src="([\w.-]+\.js)"><\/script>/g,(_,name)=>'<script>'+fs.readFileSync(path.join(source,name),'utf8').replace(/<\/script/gi,'<\\/script')+'</script>');
fs.writeFileSync(path.join(root,'Wavecraft.html'),html);
console.log('Built dist/ and offline Wavecraft.html');
