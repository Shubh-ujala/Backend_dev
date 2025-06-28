import { useState,useEffect } from "react";

export default function App(){
    const [post,setpost] = useState([]);
    function renderPost(){
        setpost([...post,{
            url:"https://t4.ftcdn.net/jpg/02/52/93/81/360_F_252938192_JQQL8VoqyQVwVB98oRnZl83epseTVaHe.jpg",
            name:"Apple",
            about:"A fruit!",
            detail:"This is very healthy fruit ! ans there is a very famous line about this fruit ! one Apple a day keeps doctos away"
        }])
    }
    return <div style={{height:"100vh", backgroundColor:"#636e72",padding:10 ,}}>
        <button style={{cursor:"pointer",marginBottom:10}} onClick={renderPost}>Click me</button>
       <div style={{display:"flex",flexWrap: "wrap",}}>
            {post.map((p)=>{
                return <PostComponent
                    url = {p.url}
                    name={p.name}
                    about={p.about}
                    detail={p.detail}
                />
            })}
       </div>
    </div>
}
//https://t4.ftcdn.net/jpg/02/52/93/81/360_F_252938192_JQQL8VoqyQVwVB98oRnZl83epseTVaHe.jpg
function PostComponent(props){
    return <div style={{display:"flex",justifyContent:"center",height:200,
        marginBottom:10}}>
        <div style={{height:150, backgroundColor:"white",width:200,borderRadius:20,padding:10,marginLeft:10,paddingBottom:20}}>
        <div style={{display:"flex",margin:15,gap:10}}>
            <img src={props.url} alt="profile image" style={{height:30, width:30,borderRadius:["60%"]}}/>
            <div style={{fontSize:15}}>
                <div>{props.name}</div>
                <div>{props.about}</div>
            </div>
        </div>
        <div style={{fontSize:15,margin:10}}>{props.detail}</div>
        
    </div>
    </div>
}