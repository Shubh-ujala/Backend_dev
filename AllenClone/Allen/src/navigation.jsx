import AllenLogo from "./assets/logo.png"
import call from "./assets/call_icon.png"
import {useState} from 'react'
import { About } from "./aboutitem";

export function Navigation(){
    const[hoveredKey, sethoverKey] = useState(null);


    const styleDiv = {cursor:"pointer",position:"relative"}
    const navItems = [
        {label:"Courses",props:["NEET","JEE","Class 6-10","View All Options"]},
        {label:"Test Series",props:["NEET","JEE(Main+Advanced)","JEE Main"]},
        {label:"Classroom"},
        {label:"Results",props:["NEET","JEE","Class 6-10"]},
        {label:"Study Materials",props:["JEE Main","JEE Advnaced","NEET","NCERT Solutions","CBSE","Olympiad"]},
        {label:"Scholarships",props:["TALENTTEX","AOSAT"]},
        {label:"ALLEN E-Store"},
        {label:"More",props:["ALLEN for Schools","About ALLEN","Blogs","News","Careers"]}
    ];
    return <>
        <div style={{position:"relative"}}>
            <div style={{display:"flex",justifyContent:"space-between",padding:12,color:"black",backgroundColor:"white",paddingLeft:30,paddingRight:30}}>
                <div style={{display:"flex",gap:20,fontSize:10,fontWeight:500}}>
                    <div><img src={AllenLogo} alt="logo" style={{height:20}}/></div>
                    <div style={{display:"flex",gap:25,padding:3}}>
                        {navItems.map((item,index)=>(
                            <div key = {item.label} style={styleDiv} onMouseEnter={()=>{sethoverKey(index)}} onMouseLeave={()=>{sethoverKey(null)}}>
                                {item.label}
                                {item.label == "Results" && <div
                                    style ={{
                                        backgroundColor: "rgb(227, 136, 45)",
                                        color: "white",
                                        position:"absolute",
                                        bottom:15,
                                        left:30,
                                        borderRadius:5,
                                        paddingLeft:4,
                                        paddingRight:4,
                                        fontSize:8
                                    }}
                                        >New
                                </div>}
                                {hoveredKey == index && (
                                    <>
                                    <div style={{
                                        position:"absolute",
                                        border:"2px solid #0984e3",
                                        width:"100%",
                                        borderRadius:10,
                                        top:20,
                                        zIndex:2
                                    }}>
                                    </div>   
                                    <div 
                                        style={{
                                            position: "absolute",
                                            top: "100%", // adjust to avoid overlap
                                            left: 0,
                                            zIndex: 1,
                                            
                                        }}
                                    >
                                        <About items={item.props}/>
                                    </div> 
                                    </>                                
                                )}
                            </div>
                        ))
                        }
                    </div>
                </div>
                <div style={{display:"flex",gap:10,position:"relative"}}>
                    <div style={styleDiv} ><img src={call} alt="icon" style={{width:20,height:20,position:"absolute",right:0,top:2}} /></div>
                    <div style={{border:"solid blue 2px",borderRadius:10,cursor:"pointer",fontSize:10,paddingLeft:10,paddingRight:10,paddingTop:3}}>Login</div>
                </div>
            </div>


        </div>
    </>

}
