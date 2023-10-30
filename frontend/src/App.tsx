import { useState, ChangeEvent, useEffect, FormEvent } from "react";

import "./App.css";

function App() {
  const [allCoffees, setAllCoffees] = useState([]);
  const [coffees, setCoffees] = useState<any>();
  const [selectedCoffee, setSelectedCoffee] = useState<string>("");
  const [makeCustom, setMakeCustom] = useState(false);
  const [customCoffeeName, setCustomCoffeeName] = useState<string>("");
  const [customIngredients, setCustomIngredients] = useState<string[]>([]);
  const ingredients: string[] = [
    "Milk",
    "Sugar",
    "Caramel",
    "Chocolate",
    "Whipped Cream",
    "Milk Foam",
    "Whiskey",
    "Brandy",
  ];

  const handleCustomCoffee = async (e: FormEvent) => {
    e.preventDefault();

    const customCoffeeData = {
      name: customCoffeeName,
      ingredients: customIngredients,
    };

    const res = await fetch("http://localhost:9000/api/v1/coffee/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customCoffeeData),
    });

    if (res.ok) {
      setMakeCustom(!makeCustom);
    }
  };

  //add toast?

  const handleCoffeeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCoffee(event.target.value);

    if (makeCustom) {
      setSelectedCoffee("");
    }
  };

  const handleCustomIngredientsChange = (ingredient: string) => {
    const isChecked = customIngredients.includes(ingredient);

    if (isChecked) {
      setCustomIngredients(
        customIngredients.filter((item) => item !== ingredient)
      );
    } else {
      setCustomIngredients([...customIngredients, ingredient]);
    }
  };

  const fetchCoffees = async () => {
    const res = await fetch("http://localhost:9000/api/v1/coffee/getAll", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    return data;
  };

  const fetchCoffeeTypes = async () => {
    const res = await fetch(
      `http://localhost:9000/api/v1/coffee/${selectedCoffee}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    return data;
  };

  useEffect(() => {
    fetchCoffees()
      .then((data) => {
        setAllCoffees(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [allCoffees]);

  useEffect(() => {
    if (selectedCoffee) {
      fetchCoffeeTypes()
        .then((data) => {
          setCoffees(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    if (makeCustom) {
      setSelectedCoffee("");
      setCoffees([]);
    }
  }, [makeCustom, selectedCoffee]);

  return (
    <div className="container">
      <div className="header">
        <h1>Coffee Customizer</h1>
      </div>
      <div className="content">
        {makeCustom ? (
          <div>
            <form onSubmit={handleCustomCoffee}>
              <h2>Make Your Own Coffee</h2>
              <input
                className="input"
                type="text"
                id="customCoffeeName"
                placeholder="Enter name of the coffee"
                value={customCoffeeName}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setCustomCoffeeName(event.target.value)
                }
                required
              />
              <h3>Choose Ingredients</h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                }}
              >
                {ingredients.map((ingredient) => (
                  <div
                    style={{
                      width: "100%",
                      display: "block",
                      textAlign: "start",
                      margin: "16px 25%",
                    }}
                    key={ingredient}
                  >
                    <input
                      type="checkbox"
                      value={ingredient}
                      checked={customIngredients.includes(ingredient)}
                      onChange={() => handleCustomIngredientsChange(ingredient)}
                    />
                    <span>{ingredient}</span>
                  </div>
                ))}
              </div>
              <button className="coffee-button" type="submit">
                Create Coffee
              </button>
            </form>
          </div>
        ) : (
          <div>
            <div className="coffee-selection">
              <h2>Select Coffee</h2>
              <select onChange={handleCoffeeSelect}>
                <option>Select coffee</option>
                {allCoffees &&
                  allCoffees.map((coffee: any) => (
                    <option key={coffee._id} value={coffee.name}>
                      {coffee.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="coffee-details">
              {coffees && (
                <>
                  <h2>Selected Coffee Details</h2>
                  <div>
                    <div>
                      <span>Ingredients:</span>
                      {coffees.ingredients && coffees.ingredients.length > 0 ? (
                        <ul>
                          {coffees.ingredients.map((i: string) => (
                            <li key={i}>{i}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>No ingredients selected.</p>
                      )}
                    </div>
                    <div>
                      <span>Price:</span>
                      <p>{coffees.price ?? 0} MKD</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="footer">
        <button onClick={() => setMakeCustom(!makeCustom)}>
          {makeCustom ? "Back to Select Coffee" : "Make Custom Coffee"}
        </button>
      </div>
    </div>
  );
}

export default App;
