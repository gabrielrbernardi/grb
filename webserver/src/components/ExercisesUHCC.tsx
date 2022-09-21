import React, {useState} from 'react';
import { InputNumber } from 'primereact/inputnumber';
import { SelectButton } from 'primereact/selectbutton';

const uriPatternLink = "https://www.beecrowd.com.br/judge/pt/problems/view/"
const nepsPatternLink = "https://neps.academy/br/exercise/"

const ExercisesUHCC = () => {
    const [getExerciseNumber, setExerciseNumber] = useState(0);
    const [getPlatform, setPlatform] = useState<any>("none");
    const platformOptions = [
        {name: "URI/Beecrowd", value: "uri"}, 
        {name: "Neps", value: "neps"}
    ];

    function generateLink(){
        if(getPlatform === "uri"){
            return uriPatternLink + getExerciseNumber;
        }else if(getPlatform === "neps"){
            return nepsPatternLink + getExerciseNumber;
        }else{
            return "Plataforma não selecionada!";
        }
    }

    const categories = [{name: 'Accounting', key: 'A'}, {name: 'Marketing', key: 'M'}, {name: 'Production', key: 'P'}, {name: 'Research', key: 'R'}];
    return (
        <div className="mx-auto text-center mb-4">
            <p className="text-center text-lg">Tipo de transformação</p>
            <SelectButton className="text-center" value={getPlatform} options={platformOptions} optionLabel="name" onChange={(e) => {setPlatform(e.value)}} unselectable={false}/>
            {getPlatform === "uri" && <div className="text-link-special-class-danger cursor-auto">Para conseguir visualizar o exercício, é necessário que já esteja conectado ao Beecrowd!</div>}
            <p>Digite o número do exercício: </p>
            <InputNumber value={getExerciseNumber} onChange={(e) => setExerciseNumber(e.value || 0)} mode="decimal" useGrouping={false} placeholder="Tamanho máximo" min={0} max={100000} autoFocus/>
            <br/>
            <p>Link gerado: </p>
            <a className={"text-link-special-class"} onClick={() => {window.open(generateLink(), "_blank")}}>{generateLink()}</a>

        </div>
    )
}

export default ExercisesUHCC;