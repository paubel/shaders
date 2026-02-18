
#ifdef GL_ES
precision mediump float;
#endif
uniform float u_time;

uniform vec2 u_resolution;

/*
vec4 red(){
  return vec4(1.,0.,0.,1.);
}
*/

void main(){
  
  // Normalisera pixelkoordinater till 0..1
  vec2 uv=gl_FragCoord.xy/u_resolution;
  
  // Visa uv som färg: R = x, G = y
  //gl_FragColor=vec4(uv.x,uv.y,0.,1.);
  //gl_FragColor=vec4(abs(sin(u_time)),0.,0.,1.);
  
  //samma resultat
  //gl_FragColor=vec4(uv,1.,1.);
  //gl_FragColor=vec4(uv.x,uv.y,1.,1.);
  
  //definiera två färger
  /*   vec4 c1=vec4(1.,0.,0.,1.);
  vec4 c2=vec4(0.,1.,0.,1.); */
  //blanda färgerna
  //gl_FragColor=mix(c1,c2,uv.x);
  
  /*   vec4 c1=vec4(1.,0.,0.,1.);
  vec4 c2=vec4(0.,1.,0.,1.);
  vec4 c3=vec4(0.,0.,1.,1.);
  vec4 c4=vec4(1.,1.,0.,1.); */
  //blanda färgerna
  //gl_FragColor=mix(mix(c1,c2,uv.x),mix(c3,c4,uv.x),uv.y);
  
  //skapa ett rutmönster
  /* vec2 newPos=fract(uv*10.);
  gl_FragColor=vec4(newPos,1.,1.); */
  
  //skapa ett randmönster
  /*   float c=(sin(uv.x*16.)+1.)/2.;
  gl_FragColor=vec4(c,0.,1.,1.); */
  
  //animerat randmönster
  float c=(sin(uv.x*16.+u_time)+1.)/2.;
  gl_FragColor=vec4(c,0.,1.,1.);
  
}
