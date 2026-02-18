
#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
    
    //vec2 uv=gl_FragCoord.xy/u_resolution;
    vec2 uv=(gl_FragCoord.xy*2.-u_resolution.xy)/u_resolution.y;
    //float mouseX=u_mouse.x/u_resolution.x;
    //float mouseY=u_mouse.y/u_resolution.y;
    
    //vec2 mouse=vec2(u_mouse.x/u_resolution.x,u_mouse.y/u_resolution.y);
    //gl_FragColor=vec4(pos.x,1.,pos.y,1.);
    //gl_FragColor=vec4(abs(sin(u_time)),0.,0.,1.);
    /*    float d=length(uv);
    d=abs(d-.3);
    d=smoothstep(.01,.02,d);
    
    gl_FragColor=vec4(vec3(d),1.); */
    // gl_FragColor=vec4(mouse.x,mouse.y,0.,1.);
    //gl_FragColor=vec4(mouse.x,mouse.y,0.,1.);
    
    float beat=.2*sin(u_time*8.);
    vec2 p=uv*(1.8+beat);
    p.y+=.5;
    // Heart implicit function: x^2 + (y - sqrt(|x|))^2 = 1
    float h=p.x*p.x+pow(p.y*2.2-sqrt(abs(p.x)),2.)-1.;
    float glow=.2;
    float heart=smoothstep(0.,-glow,h);
    vec3 neonColor=vec3(1.,.1,.2);
    vec3 finalColor=heart*neonColor;
    
    gl_FragColor=vec4(finalColor,1.);
}
