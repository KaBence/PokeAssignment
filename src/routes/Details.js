import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import "../style.css"

export default function Details(){
    const {id}=useParams();
    const [fetchedData,setFetchedData]=useState(null);

    useEffect(()=>{
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(response=>response.json())
            .then(setFetchedData);
    },[id])
    return <>
        {fetchedData && <Card pokemon={fetchedData} />}
        <Link to={"/"}> <button className="a" >Back</button></Link>
    </>
}

function Card({pokemon}){
    let classes="details "+pokemon.types[0].type.name;
    let types="types "+pokemon.types[0].type.name;

    return <>
        <div className={classes}>
        <div className="pic">
            <h1>{pokemon.name}</h1>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} alt="sometihn"/>
            <div className={types}>{pokemon.types[0].type.name}</div>
            <div className={types}>{pokemon.types[1]?.type.name}</div>
        </div>
        <div className="stats">
            <h1>STATS</h1>
            {
                pokemon.stats.map(stat=>(
                    <p>{stat.stat.name} : {stat.base_stat}</p>
                ))
            }
        </div>
        <Evolution pokemon={pokemon}/>
    </div>
    </>
}

function Evolution({pokemon}){
    const [poke1,setPoke1]=useState(null); 
    const [poke2,setPoke2]=useState(null); 
    const [poke3,setPoke3]=useState(null); 

    useEffect(()=>{
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon?.name}`)
            .then(res=>res.json())
            .then(url=>fetch(url.evolution_chain.url))
            .then(res=>res.json())
            .then(chainData=>{
                setPoke1(chainData.chain.species)
                setPoke2(chainData.chain.evolves_to[0]?.species)
                setPoke3(chainData.chain.evolves_to[0].evolves_to[0]?.species)
            })
    },[pokemon?.name])

    return <>{poke1&&poke2&&poke3 &&<div className="evolution">
        <h1>Evolution</h1>
        <Link to={`/pokemon/${poke1.name}`}style={{ textDecoration: 'none' ,color:'black'}}>
            <div className="evPoke">
                <img src={`https://img.pokemondb.net/artwork/large/${poke1.name}.jpg`} alt="soome"/>
                <h1>{poke1.name}</h1>
            </div>
        </Link>
        <Link to={`/pokemon/${poke2.name}`}style={{ textDecoration: 'none' ,color:'black'}}>
        <div className="evPoke">
            <img src={`https://img.pokemondb.net/artwork/large/${poke2.name}.jpg`} alt="soome"/>
            <h1>{poke2.name}</h1>
        </div>
        </Link>
        <Link to={`/pokemon/${poke3.name}`}style={{ textDecoration: 'none' ,color:'black'}}>
        <div className="evPoke">
            <img src={`https://img.pokemondb.net/artwork/large/${poke3.name}.jpg`} alt="soome"/>
            <h1>{poke3.name}</h1>
        </div>
        </Link>

    </div>
    }
    </>
}