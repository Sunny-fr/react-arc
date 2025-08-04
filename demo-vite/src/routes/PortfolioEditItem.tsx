import PortfolioEditItemComponent from '../components/portfolio/components/PortfolioEditItemComponent.tsx'
import type {RouteComponentProps} from "react-router";

interface MatchParams {
    id: string;
}

interface PortfolioEditItemProps extends RouteComponentProps<MatchParams>{

}

export function PortfolioEditItem (props: PortfolioEditItemProps){
    return (<PortfolioEditItemComponent id={props.match.params.id} />)
}

export default PortfolioEditItem
