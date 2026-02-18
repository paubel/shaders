

#ifdef GL_ES
precision mediump float;
#endif
uniform float u_time;

uniform vec2 u_resolution;
uniform vec2 u_mouse;

// cosine based palette - Landskaps färger
vec3 palette(float t){
    vec3 a=vec3(.5,.5,.5);
    vec3 b=vec3(.5,.5,.5);
    vec3 c=vec3(1.,1.,.5);
    vec3 d=vec3(.8,.9,.3);
    
    return a+b*cos(6.28318*(c*t+d));
}

// FBM noise för terräng
float hash(vec2 p){
    return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);
}

float noise(vec2 p){
    vec2 i=floor(p);
    vec2 f=fract(p);
    f=f*f*(3.-2.*f);
    
    float a=hash(i);
    float b=hash(i+vec2(1.,0.));
    float c=hash(i+vec2(0.,1.));
    float d=hash(i+vec2(1.,1.));
    
    return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);
}

float fbm(vec2 p){
    float value=0.;
    float amplitude=.5;
    for(int i=0;i<3;i++){
        value+=amplitude*noise(p);
        p*=2.;
        amplitude*=.5;
    }
    return value;
}

mat2 rot2D(float angle){
    float s=sin(angle);
    float c=cos(angle);
    return mat2(c,-s,s,c);
}

//Distance to the scene - Fraktalt landskap
float map(vec3 p){
    // Animated landskap
    vec2 pos=p.xz+u_time*.1;
    
    // FBM noise för höjd - mindre detaljer
    float height=fbm(pos*.5)*2.;
    
    // Bubblande/undulerande vågor
    height+=sin(p.x*1.+u_time)*.3;
    height+=sin(p.z*1.-u_time*1.3)*.3;
    height+=sin(length(p.xz)*3.-u_time*2.)*.2;
    
    // Terräng SDF
    float terrain=p.y-height;
    
    return terrain;
}

void main(){
    
    vec2 uv=(gl_FragCoord.xy*2.-u_resolution.xy)/u_resolution.y;
    vec2 m=(u_mouse.xy*2.-u_resolution.xy)/u_resolution.xy;
    
    // Initialzation
    vec3 ro=vec3(0.,2.,-5.);// ray origin - högre upp för att se landskapet
    vec3 rd=normalize(vec3(uv,1.));// ray direction
    vec3 col=vec3(0.);//final pixel color
    
    // Musstyrning - rotera kameran
    ro.yz*=rot2D(-m.y*.5);
    rd.yz*=rot2D(-m.y*.5);
    
    ro.xz*=rot2D(-m.x*3.14);
    rd.xz*=rot2D(-m.x*3.14);
    
    float t=0.;//total distance traveled by the ray
    
    int stepCount=0;
    for(int i=0;i<60;i++){
        // Raymarching
        vec3 p=ro+rd*t;// position of the ray at distance t
        
        float d=map(p);// current distance to the scene
        
        t+=d;// "march" the ray forward by the distance to the scene
        stepCount=i;
        
        if(d<.01||t>100.)break;//  stop if we are close enough to the scene or if we have traveled too far
    }
    //Coloring - Landskap färger
    col=palette(t*.02+float(stepCount)*.015);
    
    // Lägg till dimma för djup
    col=mix(col,vec3(.5,.6,.7),1.-exp(-t*.02));
    
    gl_FragColor=vec4(col,1.);
    
}
