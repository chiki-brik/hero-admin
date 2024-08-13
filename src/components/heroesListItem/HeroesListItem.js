const HeroesListItem = ({ name, description, element, onDelete }) => {
	let elementClassName;

	switch (element) {
		case "fire":
			elementClassName = "bg-danger bg-gradient";
			break;
		case "water":
			elementClassName = "bg-primary bg-gradient";
			break;
		case "wind":
			elementClassName = "bg-success bg-gradient";
			break;
		case "earth":
			elementClassName = "bg-secondary bg-gradient";
			break;
		default:
			elementClassName = "bg-warning bg-gradient";
	}

	return (
		<li
			className={`card flex-row mb-4 shadow-lg text-white ${elementClassName}`}
		>
			<img
				src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/1200px-Unknown_person.jpg"
				className="img-fluid w-25 d-inline"
				alt="unknown hero"
				style={{ objectFit: "cover" }}
			/>
			<div className="card-body">
				<h3 className="card-title">{name}</h3>
				<p className="card-text">{description}</p>
			</div>
			<span
				onClick={onDelete}
				className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light"
			>
				<button
					type="button"
					className="btn-close btn-close"
					aria-label="Close"
				></button>
			</span>
		</li>
	);
};

export default HeroesListItem;
// import { useSelector, useDispatch } from "react-redux";
// import { heroDelete, heroesFetchingError } from "../../actions";
// import { useHttp } from "../../hooks/http.hook";

// const HeroesListItem = ({ name, description, element, uuid }) => {
// 	const heroes = useSelector(state => state.heroes);
// 	const dispatch = useDispatch();
// 	const {deleteItem} = useHttp();

// 	const onHeroDelete = () => {
// 		deleteItem(`http://localhost:3001/heroes/${uuid}`)
// 			.then(() => dispatch(heroDelete({
// 				id: uuid,
// 				heroes: heroes
// 			})))
// 			.catch(() => dispatch(heroesFetchingError()))
// 	}

// 	let elementClassName;

// 	switch (element) {
// 		case "fire":
// 			elementClassName = "bg-danger bg-gradient";
// 			break;
// 		case "water":
// 			elementClassName = "bg-primary bg-gradient";
// 			break;
// 		case "wind":
// 			elementClassName = "bg-success bg-gradient";
// 			break;
// 		case "earth":
// 			elementClassName = "bg-secondary bg-gradient";
// 			break;
// 		default:
// 			elementClassName = "bg-warning bg-gradient";
// 	}

// 	return (
// 		<li
// 			className={`card flex-row mb-4 shadow-lg text-white ${elementClassName}`}
// 		>
// 			<img
// 				src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/1200px-Unknown_person.jpg"
// 				className="img-fluid w-25 d-inline"
// 				alt="unknown hero"
// 				style={{ objectFit: "cover" }}
// 			/>
// 			<div className="card-body">
// 				<h3 className="card-title">{name}</h3>
// 				<p className="card-text">{description}</p>
// 			</div>
// 			<span className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light">
// 				<button
// 					onClick={onHeroDelete}
// 					type="button"
// 					className="btn-close btn-close"
// 					aria-label="Close"
// 				></button>
// 			</span>
// 		</li>
// 	);
// };

// export default HeroesListItem;
