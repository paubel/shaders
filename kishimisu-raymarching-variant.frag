
#ifdef GL_ES
precision mediump float;
#endif
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

// cosine based palette, 4 vec3 params
vec3 palette(float t){
    vec3 a=vec3(.5,.5,.5);
    vec3 b=vec3(.5,.5,.5);
    vec3 c=vec3(1.,1.,1.);
    vec3 d=vec3(.263,.416,.557);
    
    return a+b*cos(6.28318*(c*t+d));
}

float sdSphere(vec3 p,float s){
    return length(p)-s;
}

float sdBox(vec3 p,vec3 b){
    vec3 q=abs(p)-b;
    return length(max(q,0.))+min(max(q.x,max(q.y,q.z)),0.);
}

float smin(float a,float b,float k){
    float h=max(k-abs(a-b),0.)/k;
    return min(a,b)-h*h*h*k*(1./6.);
}

mat2 rot2D(float angle){
    float s=sin(angle);
    float c=cos(angle);
    return mat2(c,-s,s,c);
}

float sdOctahedron(vec3 p,float s){
    p=abs(p);
    return(p.x+p.y+p.z-s)*.57735027;
}

float map(vec3 p){
    // vec3 spherePos=vec3(sin(u_time)*3.,0.,0.);// position of the sphere
    // float sphere=sdSphere(p-spherePos,1.);// SDF
    
    p.z+=u_time*.4;
    
    p.xy=(fract(p.xy)-.5);
    p.z=mod(p.z,1.)-1.;
    
    //float box=sdSphere(p,.15);
    float box=sdBox(p,vec3(.15,.15,.25));
    
    // We can combine SDFs using min and max functions. Here we take the minimum of the two SDFs to create a union of the sphere and the box.
    //float ground=p.y+.75;
    
    //return smin(ground,smin(sphere,box,2.),1.);// smooth minimum to blend the objects together
    return box;
}

void main(){
    
    vec2 uv=(gl_FragCoord.xy*2.-u_resolution.xy)/u_resolution.y;
    vec2 m=(u_mouse.xy*2.-u_resolution.xy)/u_resolution.y;
    
    // Initialzation
    vec3 ro=vec3(0.,0.,-3.);// ray origin
    vec3 rd=normalize(vec3(uv,1.));// ray direction
    vec3 col=vec3(0.);//final pixel color
    
    float t=0.;//total distance traveled by the ray
    
    // Vertical camera rotation
    ro.yz*=rot2D(-m.y);
    rd.yz*=rot2D(-m.y);
    
    // Horizontal camera rotation
    ro.xz*=rot2D(-m.x);
    rd.xz*=rot2D(-m.x);
    
    //m=vec2(cos(u_time*.2),sin(u_time*.2));
    
    int stepCount=0;
    for(int i=0;i<80;i++){
        // Raymarching
        vec3 p=ro+rd*t;// position of the ray at distance t
        
        //p.xy*=rot2D(t*.2*m.x);
        
        //p.y+=sin(t*(m.y+1.)*.5)*.35;
        
        float d=map(p);// current distance to the scene
        
        t+=d;// "march" the ray forward by the distance to the scene
        stepCount=i;
        //col=vec3(i)/80.;//color based on the number of steps taken
        if(d<.001||t>100.)break;//  stop if we are close enough to the scene or if we have traveled too far
    }
    //Coloring
    col=palette(t*.05+float(stepCount)*.005);//color based in distance
    
    gl_FragColor=vec4(col,1.);
    
}
