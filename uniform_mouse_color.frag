#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
	vec2 st=gl_FragCoord.xy/u_resolution;
	vec2 m=u_mouse/u_resolution;
	gl_FragColor=vec4(m.x,m.y,.5,1.);
}
