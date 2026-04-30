import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ItemList() {
  const id = useParams();

  const [item, setItem] = useState("");
  const [groupData, setGroupData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(
          `https://namastedev.com/api/v1/listRestaurantMenu/${id.id}`,
        );
        const data = await res.json();
        const list = data;
        setItem(list?.data?.cards[2]?.card?.card?.info);

        const group =
          data?.data.cards[4].groupedCard?.cardGroupMap?.REGULAR?.cards || [];
        setGroupData(group);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [id]);

  return (
    <>
      <div>
        <div className="itemCard">
          <div className="itemImage">
            <img
              src={`https://media-assets.swiggy.com/swiggy/image/upload/${item?.cloudinaryImageId}`}
              alt=""
            />
          </div>
          <div className="itemDetails">
            <h3 style={{ display: "flex", gap: 30 }}>
              {item?.name}{" "}
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
                  ⭐{item?.avgRating}
                </span>
                <span>{item?.veg ? "🟢" : "🔴"}</span>
              </div>
            </h3>
            <h3>{item?.areaName}</h3>
            <h3>{item?.cuisines?.join(", ")}</h3>
            <h4>{item?.costForTwo}</h4>
          </div>
        </div>
        <hr style={{ marginTop: 30 }} />
      </div>

      <hr />

      <div className="groupItem">
        <ul>
          {!groupData
            ? " <h1>No Data</h1>"
            : groupData?.map((group, i) => {
                const items = group?.card?.card?.itemCards;

                return (
                  <div key={i}>
                    <h2 style={{ marginBottom: 10 }}>
                      {group?.card?.card?.title}
                    </h2>

                    <hr />

                    <ul className="inside">
                      {items?.map((item, index) => {
                        const info = item?.card?.info;

                        return (
                          <li key={info?.id}>
                            <div className="itemCard2">
                              <div className="itemImage2">
                                <img
                                  src={`https://media-assets.swiggy.com/swiggy/image/upload/${info?.imageId}`}
                                  alt={info?.name}
                                />
                              </div>

                              <div className="itemDetails2">
                                <h3>{info?.name}</h3>
                                <h4>₹ {info?.price / 100}</h4>
                                <p>{info?.description}</p>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
        </ul>
      </div>
    </>
  );
}

export default ItemList;
