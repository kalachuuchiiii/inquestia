/* eslint-disable react/prop-types */


import React from 'react'
import { genders } from '../data/genders'
import { capitalizeFirstLetter } from '../utils/formatTopicQuery'

const GenderOptions = ({ onClick = () => {}, selectedGenders = []}) => {

    
  return (
    <div className="text-xs space-x-2 text-zinc-950 dark:text-neutral-100">
      {genders.map((g, i) => {
        return (
          <button
            value={g}
            onClick={onClick}
            className={`py-1 px-4 rounded-lg outline ${
              selectedGenders.includes(g) ? " bg-blue-200 text-blue-400 dark:bg-blue-900/40" : "dark:bg-zinc-800 text-zinc-950 dark:text-neutral-100 bg-neutral-100"
            }   dark:outline-blue-900 outline-blue-300`}
            key={i}
          >
            {capitalizeFirstLetter(g)}
          </button>
        );
      })}
    </div>
  );
}

export default GenderOptions