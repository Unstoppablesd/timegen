const StudioNav = (() => {
  function zoomAt({scale,scrollLeft,anchor,left=158,factor,min=.000001,max=10000}){
    const time=(scrollLeft+anchor-left)/scale;
    const next=Math.max(min,Math.min(max,scale*factor));
    return{scale:next,scrollLeft:Math.max(0,left+time*next-anchor)};
  }
  function viewport({duration,scale,scrollLeft,width,left=158}){
    const a=Math.max(0,Math.min(duration,(scrollLeft-left)/scale));
    const b=Math.max(a,Math.min(duration,(scrollLeft+width-left)/scale));
    return{a,b};
  }
  function measure(a,b){const delta=Math.abs(b-a);return{delta,frequencyMHz:delta>0?1000/delta:null}}
  function edgesInRange(signal,a,b){return signal.events.filter(e=>e.t>=Math.min(a,b)&&e.t<=Math.max(a,b)).length}
  return{zoomAt,viewport,measure,edgesInRange};
})();
if(typeof module!=='undefined')module.exports=StudioNav;
