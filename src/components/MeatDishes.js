import React from 'react';

const MeatDishes = () => (
  <div className='Meat' id="meat">
    <h2>Meat Dishes</h2>
    <div className='Input1'>
      <h3>Kyckling Tikka Masala</h3>
      <input type="number" name="kycklingTikka" />
    </div>
    <div className='Input2'>
      <h3>Fläskfilé med gräddsås och potatisgratäng</h3>
      <input type="number" name="fläskfile" />
    </div>
    <div className='Input3'>
      <h3>Kyckling med couscous och fetaost</h3>
      <input type="number" name="kycklingCouscous" />
    </div>
    <div className='Input4'>
      <h3>Lax i ugn med citron och dill</h3>
      <input type="number" name="lax" />
    </div>
    <div className='Input5'>
      <h3>Spaghetti Carbonara</h3>
      <input type="number" name="carbonara" />
    </div>
    <div className='Input6'>
      <h3>Biff med rödvinssås och rostad potatis</h3>
      <input type="number" name="biff" />
    </div>
    <div className='Input7'>
      <h3>Köttbullar med potatis</h3>
      <input type="number" name="köttbullar" />
    </div>
  </div>
);

export default MeatDishes;
