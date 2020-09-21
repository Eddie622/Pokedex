import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/dist/modal';
import axios from 'axios';

function App() {

  const [pokelist, setPokelist] = useState([]);
  const [todisplay, setTodisplay] = useState([]);
  const [search, setSearch] = useState("");
  const [pokedetails, setPokedetails] = useState({ name: "Pokemon", sprites: [] });

  const getPokemon = e => {
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=1000")
      .then(res => {
        console.log(res.data.results);
        setPokelist(res.data.results);
        setTodisplay(res.data.results);
      })
      .catch(err => console.log(err));
  }

  const getDetails = pkmn => {
    console.log(pkmn);
    axios.get(pkmn.url)
      .then(res => {
        console.log(res.data);
        setPokedetails(res.data);
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    getPokemon();
  }, []);

  useEffect(() => {
    setTodisplay(pokelist.filter(p => p.name.includes(search)));
  }, [search]);

  return (
    <div className="pokedex">
      <div className="jumbotron p-3 mb-3">
        <svg width="100" height="100">
          <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="4" fill="rgb(5, 251, 251)" />
          <svg width="80" height="80">
            <circle cx="30" cy="30" r="10" stroke="white" strokeWidth="4" fill="white" />
          </svg>
        </svg>
        <div className="d-inline-flex">
          <svg width="60" height="60">
            <circle cx="30" cy="25" r="18" stroke="black" strokeWidth="4" fill="red" />
          </svg>
          <svg width="60" height="60">
            <circle cx="30" cy="25" r="18" stroke="black" strokeWidth="4" fill="yellow" />
          </svg>
          <svg width="60" height="60">
            <circle cx="30" cy="25" r="18" stroke="black" strokeWidth="4" fill="green" />
          </svg>

        </div>
      </div>

      <div className="container border border-dark p-3 bg-secondary rounded">
        <div className="form-group">
          <input type="text" className="form-control border border-dark" placeholder="Search" onChange={e => setSearch(e.target.value)} />
        </div>

        <ul className="list-group is-scrollable border border-dark">
          {todisplay.map((pkmn, i) =>
            <li key={i} className="list-group-item" onClick={e => getDetails(pkmn)}>
              <button type="button" className="btn" data-toggle="modal" data-target="#pokeModal">
                {pkmn.name.charAt(0).toUpperCase() + pkmn.name.slice(1)}
              </button>
            </li>
          )}
        </ul>
      </div>
      
      <div className="d-flex justify-content-center">
      <svg width="60" height="45">
        <circle cx="25" cy="25" r="18" stroke="gray" strokeWidth="4" fill="blue" />
      </svg>

      <svg width="150" height="100">
        <rect x="15" y="10" rx="20" ry="20" width="130" height="30" style={{fill:"green", stroke:"black", strokeWidth:"2"}} />
      </svg>

      <svg width="150" height="100">
        <rect x="5" y="10" rx="20" ry="20" width="130" height="30" style={{fill:"orange", stroke:"black", strokeWidth:"2"}} />
      </svg>

      </div>


      <div className="modal fade" id="pokeModal" tabIndex="-1" role="dialog" aria-labelledby="pokeModalTitle" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="pokeModalTitle">{pokedetails.name.toUpperCase()}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body text-center">
              <img src={pokedetails.sprites.front_default} alt="" />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
