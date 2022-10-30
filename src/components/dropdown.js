import { useState} from 'react';
import '../css/dropdown.css'

export default function Dropdwon ({ id, variables, change, dataDropdown }) {
    const [optionSelected, setOptionSelected] = useState(variables[0])

    const changeOption = async (e) => {
        e.preventDefault();
        change(dataDropdown, optionSelected).then(res => console.log(res))
    }

    return(
        <form onSubmit={changeOption}>
            <div className="dropdownbutton">
                <label>
                    <span>Change variable: </span> 
                    <select value={optionSelected} onChange={(e) => setOptionSelected(e.target.value)} 
                      name="cars" id={`cars${id}`}>
                        {variables.map((variable, index) => {
                            return <option key={index} value={variable}>{variable.replaceAll("_", " ")}</option>
                        })}
                    </select>
                    <input id={id} className="btn btn-outline-primary btns-graphic" value="Accept" type="submit" />
                </label>
            </div>
        </form>
    )
}