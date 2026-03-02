import { Link } from 'react-router-dom';

const CategoryCard = ({ icon, title, description, to }) => (
    <Link to={to} className="category-card">
        <span className="category-icon">{icon}</span>
        <h3>{title}</h3>
        <p>{description}</p>
    </Link>
);

export default CategoryCard;
