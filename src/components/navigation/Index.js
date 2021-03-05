import { NavLink } from "react-router-dom"

const Navigation = () => {
    return (
        <div>
            <NavLink to="/">Dashboard</NavLink>
            <NavLink to="/trade">Trade</NavLink>
        </div>
    )
}

export default Navigation;
