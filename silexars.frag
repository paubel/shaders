#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
	
	float t=u_time;
	// float z=u_time;
	vec2 r=u_resolution;
	vec3 c;
	float l,z=t;
	for(int i=0;i<3;i++){
		vec2 uv,p=gl_FragCoord.xy/r;
		uv=p;
		p-=.5;
		p.x*=r.x/r.y;
		z+=.07;
		l=length(p);
		uv+=p/l*(tan(z)+2.)*floor(tan(l*9.-z-z));
		c[i]=.01/length(mod(uv,1.)-.5);
	}
	gl_FragColor=vec4(c/l,t);
}
