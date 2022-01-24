import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../contexts/RecipesContext';
// import '../styles/IngredientsMeasure.css';
import Loading from './Loading';

function MealIngredientsMeasure({ detailsRecepie }) {
  const [checkedIngridientsState, setCheckedIngridientsState] = useState(0);
  const { idMeal } = detailsRecepie;
  const ingredientsStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const [doneIngredients, setDoneIngredients] = useState(
    ingredientsStorage.meals[idMeal] !== undefined
      ? ingredientsStorage.meals[idMeal] : [],
  );
  // const [cocktailsStorage, setcocktailsStorage] = useState({});
  const [allMealsStorage] = useState(
    ingredientsStorage.cocktails ? ingredientsStorage.cocktails : {},
  );

  const theXablauIsComming = () => {
    delete ingredientsStorage.meals[idMeal];
    return ingredientsStorage.meals;
  };

  const [otherStorageRecepies] = useState(
    Object.keys(ingredientsStorage.meals).length !== 0 ? theXablauIsComming() : {},
  );

  const { setAllChecked } = useContext(RecipesContext);

  const allIngredients = Object.entries(detailsRecepie)
    .filter((keys) => keys[0]
      .includes('strIngredient') && keys[1] !== null && keys[1] !== '');

  const allMeasure = Object.entries(detailsRecepie)
    .filter((keys) => keys[0]
      .includes('strMeasure') && keys[1] !== null && keys[1] !== '');

  const numberIngridients = allIngredients.length;

  function checkInputs() {
    if (numberIngridients === doneIngredients.length) {
      return setAllChecked(false);
    }
    return setAllChecked(true);
  }

  function upDateLocalStorage() {
    const newLocalStorage = {
      cocktails: allMealsStorage,
      meals: { ...otherStorageRecepies, [idMeal]: [...doneIngredients] },
    };
    const newLocalStorageString = JSON.stringify(newLocalStorage);
    localStorage.setItem('inProgressRecipes', newLocalStorageString);
  }

  useEffect(() => {
    checkInputs();
    upDateLocalStorage();
  }, [checkedIngridientsState]);

  function checkedListIngredients(e) {
    if (e.target.checked === true) {
      setCheckedIngridientsState(checkedIngridientsState + 1);
      return setDoneIngredients([...doneIngredients, e.target.id]);
    }
    setCheckedIngridientsState(checkedIngridientsState - 1);
    const newDoneIngredients = doneIngredients
      .filter((ingridient) => ingridient !== e.target.id);
    return setDoneIngredients(newDoneIngredients);
  }

  function getIngredientsList() {
    if (allIngredients === undefined) {
      return <Loading />;
    }

    return allIngredients.map((elem, index) => (
      <label
        key={ index }
        className="checked-ingredient"
        data-testid={ `${index}-ingredient-step` }
        htmlFor={ elem[1] }
      >
        <input
          className="checked-input"
          checked={ doneIngredients.some((element) => element === elem[1]) }
          id={ elem[1] }
          type="checkbox"
          onChange={ (e) => checkedListIngredients(e) }
        />
        <span className="checked-list">
          { `${elem[1]} - ${allMeasure[index][1]}` }
        </span>
      </label>
    ));
  }

  return (
    <div className="ingredients-box">
      <h3 className="inProgress-title">Ingredients</h3>
      { getIngredientsList() }
    </div>
  );
}

MealIngredientsMeasure.propTypes = {
  detailsRecepie: PropTypes.shape({
    idMeal: PropTypes.string,
  }).isRequired,
};

export default MealIngredientsMeasure;
