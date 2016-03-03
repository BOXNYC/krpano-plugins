/*
		Follow Mouse
    krpanoJS javascript plugin
*/

var krpanoplugin = function() {
		
	var local = this,
		krpano = null;
	
	local.registerplugin = function(krpanointerface, pluginpath, pluginobject) {
		if(!pluginobject.enabled) return;
		krpano = krpanointerface;
		if(krpano.get('version') < '1.0.7') {
			krpano.call('error(followmouse plugin - wrong krpano version! 1.0.7 or higher needed);');
			return;
		};
		krpano.control.layer.addEventListener("mouseout", handleMouseOut, true);
		krpano.control.layer.addEventListener("mousemove", handleMouseMove, true);
	};
	
	local.unloadplugin = function() {
		plugin = null;
		krpano = null;
		krpano.control.layer.removeEventListener("mouseout", handleMouseOut);
		krpano.control.layer.removeEventListener("mousemove", handleMouseMove);
	};
	
	function handleMouseOut(event) {
		krpano.set('hlookat_moveforce', 0);
		krpano.set('vlookat_moveforce', 0);
	};
	
	function handleMouseMove(event) {
		var mx = event.layerX,
			my = event.layerY,
			sx = krpano.stagewidth * 0.5,
			sy = krpano.stageheight * 0.5,
			vx = (mx - sx) / sx,
			vy = (my - sy) / sy;
		if(vx > -0.5 && vx < 0.5 && vy > -0.5 && vy < 0.5) {
			krpano.set('hlookat_moveforce', 0);
			krpano.set('vlookat_moveforce', 0);
		} else {
			vx = 2.0 * (vx < 0 ? -1.0 : +1.0) * (Math.max(Math.abs(vx), 0.5) - 0.5);
			vy = 2.0 * (vy < 0 ? -1.0 : +1.0) * (Math.max(Math.abs(vy), 0.5) - 0.5);
			if(Math.abs(vx) < 0.01) vx = 0;
			if(Math.abs(vy) < 0.01) vy = 0;
			krpano.set('hlookat_moveforce', vx);
			krpano.set('vlookat_moveforce', vy);
		};
	};
	
};
