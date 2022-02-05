#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.141592653589793
#define HALF_PI 1.5707963267948966

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Robert Penner's easing functions in GLSL
// https://github.com/stackgl/glsl-easings
float linear(float t){
  return t;
}

float exponentialIn(float t){
  return t==0.?t:pow(2.,10.*(t-1.));
}

float exponentialOut(float t){
  return t==1.?t:1.-pow(2.,-10.*t);
}

float exponentialInOut(float t){
  return t==0.||t==1.
  ?t
  :t<.5
  ?+.5*pow(2.,(20.*t)-10.)
  :-.5*pow(2.,10.-(t*20.))+1.;
}

float sineIn(float t){
  return sin((t-1.)*HALF_PI)+1.;
}

float sineOut(float t){
  return sin(t*HALF_PI);
}

float sineInOut(float t){
  return-.5*(cos(PI*t)-1.);
}

float qinticIn(float t){
  return pow(t,5.);
}

float qinticOut(float t){
  return 1.-(pow(t-1.,5.));
}

float qinticInOut(float t){
  return t<.5
  ?+16.*pow(t,5.)
  :-.5*pow(2.*t-2.,5.)+1.;
}

float quarticIn(float t){
  return pow(t,4.);
}

float quarticOut(float t){
  return pow(t-1.,3.)*(1.-t)+1.;
}

float quarticInOut(float t){
  return t<.5
  ?+8.*pow(t,4.)
  :-8.*pow(t-1.,4.)+1.;
}

float quadraticInOut(float t){
  float p=2.*t*t;
  return t<.5?p:-p+(4.*t)-1.;
}

float quadraticIn(float t){
  return t*t;
}

float quadraticOut(float t){
  return-t*(t-2.);
}

float cubicIn(float t){
  return t*t*t;
}

float cubicOut(float t){
  float f=t-1.;
  return f*f*f+1.;
}

float cubicInOut(float t){
  return t<.5
  ?4.*t*t*t
  :.5*pow(2.*t-2.,3.)+1.;
}

float elasticIn(float t){
  return sin(13.*t*HALF_PI)*pow(2.,10.*(t-1.));
}

float elasticOut(float t){
  return sin(-13.*(t+1.)*HALF_PI)*pow(2.,-10.*t)+1.;
}

float elasticInOut(float t){
  return t<.5
  ?.5*sin(+13.*HALF_PI*2.*t)*pow(2.,10.*(2.*t-1.))
  :.5*sin(-13.*HALF_PI*((2.*t-1.)+1.))*pow(2.,-10.*(2.*t-1.))+1.;
}

float circularIn(float t){
  return 1.-sqrt(1.-t*t);
}

float circularOut(float t){
  return sqrt((2.-t)*t);
}

float circularInOut(float t){
  return t<.5
  ?.5*(1.-sqrt(1.-4.*t*t))
  :.5*(sqrt((3.-2.*t)*(2.*t-1.))+1.);
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

float backIn(float t){
  return pow(t,3.)-t*sin(t*PI);
}

float backOut(float t){
  float f=1.-t;
  return 1.-(pow(f,3.)-f*sin(f*PI));
}

float backInOut(float t){
  float f=t<.5
  ?2.*t
  :1.-(2.*t-1.);
  
  float g=pow(f,3.)-f*sin(f*PI);
  
  return t<.5
  ?.5*g
  :.5*(1.-g)+.5;
}

void main(){
  vec3 colorA=vec3(.149,.141,.912);
  vec3 colorB=vec3(1.,.833,.224);
  
  float t=u_time*.5;
  float pct=backInOut(abs(fract(t)*2.-1.));
  
  gl_FragColor=vec4(vec3(mix(colorA,colorB,pct)),1.);
}
