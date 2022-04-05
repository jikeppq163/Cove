<template>
	<view class="">
		<div class="circle" id="sun"></div>
		<div class="circle" id="moon"></div>
		<div id="perc">10%</div>
	</view>
</template>

<script>
export default {
	data(){
		return{
		}
	},
	mounted() {
		//Another contribution to the great Eclipse/Volume circlejerk		
		Math.hypot=(a,b)=>{
		  return Math.sqrt(a*a+b*b);
		};
		
		this.moon=document.getElementById("moon");
		this.perc=document.getElementById("perc");
		this.dragging=false;
		this.radius=75;
		this.area= Math.PI*this.radius*this.radius;
		this.offs=[0,0];
		
		this.init();
	},
	methods:{
		 init(){
		  this.moon.addEventListener("mousedown",this.selectMoon);
		  this.moon.addEventListener("touchstart",this.selectMoon);
		  document.body.addEventListener("mousemove",this.moveMoon);
		  document.body.addEventListener("touchmove",this.moveMoon);
		  document.body.addEventListener("mouseup",this.dropMoon);
		  document.body.addEventListener("touchend",this.dropMoon);
		  this.setMoonData(window.innerWidth/2+this.radius*2.5,window.innerHeight/2);
		},
		
		 selectMoon(evt){
		  this.dragging=true;
		  var coords=this.getCoords(evt),
		      bcr=this.moon.getBoundingClientRect();
		  this.offs=[coords[0]-bcr.left-this.radius,coords[1]-bcr.top-this.radius];
		},
		
		 moveMoon(evt){
		  if (!this.dragging)
		    return;
		  var coords=this.getCoords(evt);
		  this.setMoonData(coords[0]-this.offs[0],coords[1]-this.offs[1]);
		},
		
		 setMoonData(x,y){
		  this.moon.style.left=x/window.innerWidth*100+"%";
		  this.moon.style.top=y/window.innerHeight*100+"%";
		  
		  var offset=Math.hypot(x-window.innerWidth/2,y-window.innerHeight/2),
		      sector=Math.acos((offset/2)/this.radius)/Math.PI,
		      triangle=Math.sqrt(this.radius*this.radius-offset*offset/4)*(offset/2),
		      overlap=(this.area*sector-triangle)*2/this.area || 0,
		      opacity=Math.max(400-offset,0)/1000,
		      expOverlap=Math.pow(overlap,4);
		  
		  //Bling bling
		  this.moon.style.boxShadow="inset "+(x-window.innerWidth/2)/10+"px "+(y-window.innerHeight/2)/10+"px 50px rgba(255, 255, 119, "+opacity+")";
		  this.moon.style.background="hsl(194, 56%, "+(1-expOverlap)*60+"%)";
		  this.perc.innerHTML="Volume: "+(overlap*100).toPrecision(4)+"%";
		  document.body.style.background="hsl("+(194+Math.floor(166*expOverlap))+", 66%, "+(1-expOverlap)*50+"%)";
		  
		  //Oh yeah, set the volume, I guess.
		  //audio.volume=overlap;
		},
		
		dropMoon(){
		  this.dragging=false;
		},
		
		getCoords(evt){
		  return [(evt.touches || [evt])[0].clientX,(evt.touches || [evt])[0].clientY];
		},
	}
}
</script>

<style scoped lang="scss">	
	body {
	  margin: 0;
	  height: 100vh;
	  background: hsl(194, 66%, 49%);
	  overflow: hidden;
	  font-family: Inconsolata,sans-serif;
	  font-size: 20px;
	  -webkit-user-select: none;
	  -moz-user-select: none;
	  -ms-user-select: none;
	}
	
	.circle {
	  position: absolute;
	  width: 150px;
	  height: 150px;
	  margin: -75px;
	  background: red;
	  top: 50%;
	  left: 50%;
	  border-radius: 50%;
	}
	
	#sun {
	  background: #ffff77;
	  box-shadow: 0 0 50px #ffff77;
	}
	
	#moon {
	  background: #222;
	  left: 50%;
	}
	
	#perc {
	  position: absolute;
	  width: 100%;
	  text-align: center;
	  top: 50%;
	  margin-top: 110px;
	  color: white;
	  pointer-events: none;
	}
</style>