import React from 'react';

const VegetarianDishes = () => (
  <div className='Vegetarian' id="vegetarian">
    <h2>Vegetarian Dishes</h2>
    <div className='Input1'>
      <h3>Vegetarisk lasagne</h3>
      <input type="number" name="lasagne" />
    </div>
    <div className='Input2'>
      <h3>Rödbetsbiffar med potatismos</h3>
      <input type="number" name="rödbetsbiffar" />
    </div>
    <div className='Input3'>
      <h3>Vegetarisk Pad Thai</h3>
      <input type="number" name="padThai" />
    </div>
    <div className='Input4'>
      <h3>Svamprisotto</h3>
      <input type="number" name="svamprisotto" />
    </div>
    <div className='Input5'>
      <h3>Grönsakscurry med kokosmjölk</h3>
      <input type="number" name="curry" />
    </div>
    <div className='Input6'>
      <h3>Falafel med bulgur och tahinisås</h3>
      <input type="number" name="falafel" />
    </div>
    <div className='Input7'>
      <h3>Quinoasallad med grillad halloumi</h3>
      <input type="number" name="quinoasallad" />
    </div>
  </div>
);

export default VegetarianDishes;
