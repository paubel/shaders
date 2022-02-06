#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define HALF_PI 3.14159265359/2.

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 colorA=vec3(.149,.141,.912);
vec3 colorB=vec3(1.,.833,.224);

float plot(vec2 st,float pct){
  return smoothstep(pct-.01,pct,st.y)-
  smoothstep(pct,pct+.01,st.y);
}

float bounceOut(float t){
  const float a=4./11.;
  const float b=8./11.;
  const float c=9./10.;
  
  const float ca=4356./361.;
  const float cb=35442./1805.;
  const float cc=16061./1805.;
  
  float t2=t*t;
  
  return t<a
  ?7.5625*t2
  :t<b
  ?9.075*t2-9.9*t+3.4
  :t<c
  ?ca*t2-cb*t+cc
  :10.8*t*t-20.52*t+10.72;
}

float bounceIn(float t){
  return 1.-bounceOut(1.-t);
}

float bounceInOut(float t){
  return t<.5
  ?.5*(1.-bounceOut(1.-t*2.))
  :.5*bounceOut(t*2.-1.)+.5;
}

float oscTime(float y){
  return 1.2+(cos(y+u_time));
}

void main(){
  vec2 st=gl_FragCoord.xy/u_resolution.xy;
  vec3 color=vec3(0.);
  
  vec3 pct=vec3(st.x);
  
  pct.r=st.y*oscTime(st.y)*2.;
  pct.g=st.y*oscTime(st.y)*.5;
  pct.b=st.y*3.;
  
  //pct.g=sin(st.y*PI);
  //pct.b=pow(st.y,.5);
  
  color=mix(colorA,colorB,pct);
  
  // Plot transition lines for each channel
  // color=mix(color,vec3(1.,0.,0.),plot(st,pct.r));
  // color=mix(color,vec3(0.,1.,0.),plot(st,pct.g));
  // color=mix(color,vec3(0.,0.,1.),plot(st,pct.b));
  
  gl_FragColor=vec4(color,1.);
}
