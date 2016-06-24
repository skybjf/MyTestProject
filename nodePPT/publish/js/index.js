window.onload=function(){
	var btnjiaozi = document.getElementById("btnjiaozi");
	var jiaozicon=document.getElementById("jiaozicon");
	btnjiaozi.onclick=function(){
		if(jiaozicon.style.height=="500px"){
			this.innerHTML="恢复";
			jiaozicon.style.height="auto";
		}else{
			this.innerHTML="变高";
			jiaozicon.style.height="500px";
		}
	}
}