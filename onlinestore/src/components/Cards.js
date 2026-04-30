import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cards() {
     const nevigate = useNavigate();

  const [restaurants, setRestaurants] = useState([]);
  const [fillteredRestaurants, setFillteredRestaurants] = useState([]);
  const [search, setSearch] = useState("");
  const [topRated, setTopRated] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(
          "https://namastedev.com/api/v1/listRestaurants",
        );
        const data = await res.json();
        const list =
          data?.data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
            ?.restaurants || [];
        setFillteredRestaurants(list);
        setRestaurants(list);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, []);

  useEffect(() => {
    setTopRated(false);
    setFillteredRestaurants(
      restaurants.filter((e) => e.info.name.toLowerCase().includes(search)),
    );
  }, [search, restaurants]);

  const handleClick = () => {
    const data = fillteredRestaurants.filter((e) => e.info?.avgRating > 4.2);
    setFillteredRestaurants(data);
    setTopRated(true);
  };

  const handleReset = () => {
    setFillteredRestaurants(restaurants);
    setSearch("");
    setTopRated(false);
  };

  const handleItemClick = (item) => {
    nevigate(`/restaurants/${item.info.id}`);
  };

  return (
    <>
      <div className="searchBar">
        <input
          placeholder="Search Restaurants"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={handleClick}>Top Rated Restaurants</button>
        <button onClick={handleReset}>Reset</button>
      </div>

      <hr />

      <div>
        <h1 className="heading">
          {topRated ? "Top Rated Restaurants" : "All Restaurants"}
        </h1>

        <div className="restaurantsContainer">
          {fillteredRestaurants.length === 0 ? (
            <h2 className="noData">No Restaurants Found</h2>
          ) : (
            fillteredRestaurants?.map((e, i) => {
              return (
                <div key={i} className="card">
                  <div className="cardDetails">
                    <img
                      src={`https://media-assets.swiggy.com/swiggy/image/upload/${e.info?.cloudinaryImageId}`}
                      alt={e.info?.name}
                      onClick={() => handleItemClick(e)}
                    />

                    <h3>
                      {e.info?.name}{" "}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          ⭐{e.info?.avgRating}
                        </span>
                        <span>{e.info?.veg ? "🟢" : "🔴"}</span>
                      </div>
                    </h3>
                    <h4>{e.info?.cuisines.join(", ")}</h4>
                    <h4>{e.info?.costForTwo}</h4>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

export default Cards;
