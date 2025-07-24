
import PortfolioItemComponent from '../components/PortfolioItemComponent'
import type {RouteComponentProps} from "react-router";

interface MatchParams {
    id: string;
}

interface PortfolioEditItemProps extends RouteComponentProps<MatchParams>{

}

export const PortfolioItem:React.FC<PortfolioEditItemProps> = (props) => {
    return (<PortfolioItemComponent id={props.match.params.id} />)
}

export default PortfolioItem
