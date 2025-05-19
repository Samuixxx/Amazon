import './PrefixButtonGroup.scss'
import Dropdown from 'react-bootstrap/Dropdown'
import { countryDialingCodes } from '../../utils/prefixes'
import i18n from '../../i18n'

const PrefixButtonGroup = ({ selected, onSelect }) => {
    return(
        <Dropdown className="prefix-dropdown" onSelect={onSelect}>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                {selected ? selected : i18n.t("Prefix")}
            </Dropdown.Toggle>

            <Dropdown.Menu className="prefix-menu"> 
                {countryDialingCodes.map(({ code, prefix}) => (
                    <Dropdown.Item key={code + '-' + prefix} eventKey={prefix}>
                        <img
                            src={`https://flagcdn.com/w40/${code}.png`}
                            alt={code}  // Use the code as the alt text for the flag
                            width="24"
                            height="18"
                        />
                        {' '}{prefix}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default PrefixButtonGroup
