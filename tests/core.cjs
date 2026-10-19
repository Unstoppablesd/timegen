const assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm'),WC=require('../src/core.js'),evaluate=require('../src/expression.js');
for(let f of ['core.js','expression.js','app.js','themes.js','navigation.js','workbench.js'])new vm.Script(fs.readFileSync(require('path').join(__dirname,'../src',f),'utf8'));
for(let k of ['spi','axi','pipeline','pcie','csi','dsi','dphy']){let d=WC.validate(WC.template(k));assert(d.signals.length>=4);assert.equal(WC.validate(JSON.parse(JSON.stringify(d))).duration,240)}
let d=WC.template('spi'),s=d.signals[1];WC.fill(s,33.25,68.125,'X',d.duration);assert.equal(WC.valueAt(s,34),'X');assert.equal(WC.valueAt(s,68.125),'0');assert(s.events.some(e=>e.t===33.25));
let clip=WC.copyRange(d,[s.id],32,72),original=WC.valueAt(s,150);WC.pasteRange(d,[s.id],clip,100);assert.equal(WC.valueAt(s,102),'X');assert.equal(WC.valueAt(s,150),original);
let clock=WC.signal('clk','clock');clock.period=12.5;clock.duty=35;clock.phase=3;WC.clock(clock,100);assert.equal(WC.valueAt(clock,0),'0');assert.equal(WC.valueAt(clock,3),'1');assert.equal(WC.valueAt(clock,7.375),'0');
let digital=WC.empty();digital.duration=100;digital.signals=[clock];const vcd=WC.exportVCD(digital),back=WC.parseVCD(vcd);assert.deepEqual(back.signals[0].events,clock.events);assert.equal(WC.valueAt(back.signals[0],3),'1');
const old={version:1,title:'Legacy test',count:4,step:2.5,signals:[{name:'data',type:'bus',color:'#123456',values:['IDLE','0x12','0x34','IDLE']}],notes:[{at:1,text:'Start'}]};let migrated=WC.validate(old);assert.equal(migrated.duration,10);assert(migrated.signals.every(s=>s.events[0].t===0));assert(migrated.annotations.length);
assert.equal(evaluate('i ^ (i >> 1)',{i:7}),4);assert.equal(evaluate('prev + s0 * 2',{prev:3,s0:5}),13);assert.equal(evaluate('floor(abs(sin(i)))',{i:0}),0);assert.throws(()=>evaluate('window.alert(1)',{}));assert.throws(()=>evaluate('1 / 0',{}));
let invalid=WC.copy(d);invalid.signals[0].events.push({t:-1,v:'1'});assert.throws(()=>WC.validate(invalid));assert.throws(()=>WC.clock({...clock,period:0},100));
assert.equal(WC.parseSequence('0*4,1*8,X*2').length,14);
const alias='$timescale 1 ps $end\n$scope module top $end\n$var wire 4 ! a $end\n$var wire 4 ! b $end\n$upscope $end\n$enddefinitions $end\n$dumpvars\nb1010 !\n$end\n#500\nbxxxx !\n#1000\nb1111 !';let imported=WC.parseVCD(alias);assert.equal(imported.signals[0].events[1].t,.5);assert.deepEqual(imported.signals[0].events,imported.signals[1].events);
console.log('PASS: syntax, seven templates, old-project migration, fractional events, range restore, clipboard, clock phase/duty, VCD roundtrip/aliases/ps, expression safety, input rejection');

const nav=require('../src/navigation.js');const z=nav.zoomAt({scale:5,scrollLeft:600,anchor:350,factor:1.5});assert.equal((600+350-158)/5,(z.scrollLeft+350-158)/z.scale);assert.deepEqual(nav.measure(12.5,32.5),{delta:20,frequencyMHz:50});assert.equal(nav.measure(10,10).frequencyMHz,null);assert.deepEqual(nav.viewport({duration:100,scale:2,scrollLeft:0,width:500}),{a:0,b:100});console.log('PASS: zoom anchor stability, viewport clamps, fractional A/B measurements');

const path=require('node:path'),offline=fs.readFileSync(path.join(__dirname,'../Wavecraft.html'),'utf8');let count=0;for(const m of offline.matchAll(/<script>([\s\S]*?)<\/script>/g)){new vm.Script(m[1]);count++}assert.equal(count,6);assert(!offline.includes('<script src='));console.log('PASS: offline bundle script syntax and no external script references');

