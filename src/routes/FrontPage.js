import { useEffect, useRef, useState } from "react"
import "../style.css"
import { Link } from "react-router-dom";


export default function FrontPage(){
    const [list,setList]=useState([])
    const [nextUrl,setNextUrl]=useState('');
    const [previousUrl,setPreviousUrl]=useState('');
    const pageRef=useRef(null);

   
     useEffect(()=>{
        fetch("https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0")
            .then(response=> response.json())
            .then(data=>{
                setList(data.results);
                setNextUrl(data.next);
                setPreviousUrl(data.previous);
                pageRef.current= 0;
            });
    },[]) 
    
    

    const handleNextClick = () => {
        fetch(nextUrl)
          .then(response => response.json())
          .then(data => {
            setList(data.results);
            setNextUrl(data.next);
            setPreviousUrl(data.previous);
            pageRef.current= pageRef.current+1;
          })
      };
    
      const handlePrevClick = () => {
        fetch(previousUrl)
          .then(response => response.json())
          .then(data => {
            setList(data.results);
            setNextUrl(data.next);
            setPreviousUrl(data.previous);
            pageRef.current= pageRef.current-1;
          })
      };


    return <>
        <Table list={list} pageNumber={pageRef.current}/> 
        <button className="a" onClick={handlePrevClick} disabled={!previousUrl}>Previous</button>
        <button className="a right" onClick={handleNextClick} disabled={!nextUrl}>Next</button>
    </> 
}

function Card({pokemon}){
    let classes="card "+pokemon.types[0].type.name;
    return <Link to={`/pokemon/${pokemon.name}`}style={{ textDecoration: 'none' ,color:'black'}}>
        <div className={classes}>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} alt="something"/>
            <h3>#{pokemon.id}</h3>
            <h1>{pokemon.name}</h1>
        </div>

    </Link>

}

function Table({list,pageNumber}){

    const [fetchedList,setFetchedList]=useState(null);

    useEffect(()=>{
        const fetchData=async()=>{
            const temp= [];
            for(const item of list){
                await fetch(item.url)
                    .then(response=>response.json())
                    .then(response=> temp.push(response));
            }
    
            setFetchedList(temp);
        }
        fetchData();
    },[list]);


    

    let temp=(pageNumber*20)+1;
    return <>
        <div className="container">
        {
            fetchedList?.map((element,index)=>(
                <Card key={temp+index} pokemon={element}/>
            ))
        }
    </div>
    </>
}