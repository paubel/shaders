
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

/* float sdBox(vec3 p,vec3 b){
    vec3 q=abs(p)-b;
    return length(max(q,0.))+min(max(q.x,max(q.y,q.z)),0.);
} */

// Mandelbulb distance estimator
float mandelbulbDE(vec3 p){
    vec3 z=p;
    float dr=1.;
    float r=0.;
    float power=8.;// Klassisk power 8
    
    for(int i=0;i<15;i++){
        r=length(z);
        
        // Escape condition
        if(r>2.)break;
        
        // Convert to polar coordinates
        float theta=acos(z.z/r);
        float phi=atan(z.y,z.x);
        dr=pow(r,power-1.)*power*dr+1.;
        
        // Scale and rotate the point
        float zr=pow(r,power);
        theta=theta*power;
        phi=phi*power;
        
        // Convert back to cartesian coordinates
        z=zr*vec3(sin(theta)*cos(phi),sin(phi)*sin(theta),cos(theta));
        z+=p;
    }
    
    return.5*log(r)*r/dr;
}

//Disance to the scene
float map(vec3 p){
    // Skala ner rymden lite för stabilare DE
    return mandelbulbDE(p*.3);
}

void main(){
    
    vec2 uv=(gl_FragCoord.xy*2.-u_resolution.xy)/u_resolution.y;
    vec2 m=(u_mouse.xy/u_resolution.xy)*2.-1.;
    m=clamp(m,-1.,1.);
    
    // Initialzation
    // Zoom styrs av musens Y-position (utan JS-wheel)
    float zoom=mix(8.,2.5,(m.y+1.)*.5);
    vec3 ro=vec3(0.,0.,-zoom);// ray origin
    vec3 rd=normalize(vec3(uv,1.));// ray direction
    // Mustyrning: rotera kameran
    float yaw=-m.x*.4;
    float pitch=0.;
    ro.xz=mat2(cos(yaw),-sin(yaw),sin(yaw),cos(yaw))*ro.xz;
    rd.xz=mat2(cos(yaw),-sin(yaw),sin(yaw),cos(yaw))*rd.xz;
    ro.yz=mat2(cos(pitch),-sin(pitch),sin(pitch),cos(pitch))*ro.yz;
    rd.yz=mat2(cos(pitch),-sin(pitch),sin(pitch),cos(pitch))*rd.yz;
    vec3 col=vec3(0.);//final pixel color
    
    float t=0.;//total distance traveled by the ray
    
    int steps=0;
    for(int i=0;i<100;i++){
        // Raymarching
        vec3 p=ro+rd*t;// position of the ray at distance t
        
        float d=map(p);// current distance to the scene
        
        t+=d;// "march" the ray forward by the distance to the scene
        steps=i;
        
        //col=vec3(i)/80.;//color based on the number of steps taken
        if(d<.001||t>100.)break;//  stop if we are close enough to the scene or if we have traveled too far
    }
    //Coloring
    col=palette(t*.06+float(steps)*.01);//color based in distance
    
    gl_FragColor=vec4(col,1.);
    
}
