import React, { useState, useEffect } from 'react';
import Ad from './Ad';

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [ads, setAds] = useState([]);

  useEffect(() => {
    fetch(`/api/ads?searchTerm=${searchTerm}`)
      .then(res => res.json())
      .then(data => setAds(data.ads))
      .catch(err => console.log(err));
  }, [searchTerm]);

  const handleInputChange = e => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleInputChange} />
      <div className="ads-grid">
        {ads.map(ad => (
          <Ad key={ad._id} ad={ad} />
        ))}
      </div>
    </div>
  );
}

export default SearchPage;